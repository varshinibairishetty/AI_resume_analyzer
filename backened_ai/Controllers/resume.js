const ResumeModel = require('../Models/resume');
const multer = require("multer");
const pdfParse = require("pdf-parse");

const path = require("path");
const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
    token: "HZnCvc8UoAIbumIPKhQBgYcZAIyFDvecd7TsisJb",

});


exports.addResume = async (req, res) => {
    try {

        // const { job_desc, user } = req.body;
        const { job_desc } = req.body;
        const user = req.body.user;
        //console.log(req.file);
        //console.log(job_desc, user);


        const pdfBuffer = req.file.buffer || null;
        const pdfPath = req.file.path;
        const fs = require("fs");
        const dataBuffer = fs.readFileSync(pdfPath);
        const pdfData = await pdfParse(dataBuffer);

        const prompt = `
        Your are a resume screening assistant.
        Compare the following resume text with the provided Job Description (JD) and give a match score (0-100) and a brief explanation for the score.
            
        Resume:
        ${pdfData.text}

        Job Description:
        ${job_desc}

        Return the score and a brief explanation in this format:
        Score:XX
        Reason : ...


        `
            ;
        const response = await cohere.chat({
            model: "command-a-03-2025",
            message: prompt,
            temperature: 0.7
        });

        let result = response.text;
        console.log("RAW AI RESPONSE:", result);
        //console.log(result);

        const match = result.match(/Score:\s*(\d+)/);

        const score = match ? parseInt(match[1], 10) : null;

        //const reasonMatch = result.match(/Reason\s*:\s*(.*)/);
        const reasonMatch = result.match(/Reason\s*:\s*([\s\S]*)/);
        const reason = reasonMatch ? reasonMatch[1].trim() : null;
        console.log(req.file);
        const newResume = new ResumeModel({
            user: req.body.user,
            resume_name: req.file.originalname,
            job_desc,
            score,
            feedback: reason
        });

        await newResume.save();
        fs.unlinkSync(pdfPath);



        return res.status(200).json({
            message: "your analysis are ready",
            data: newResume
        });


    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'server error', message: err.message });
    }
}

exports.getAllResumeForUser = async (req, res) => {
    try {
        const { user } = req.params;
        let resume = await ResumeModel.find({ user: user }).sort({ createAt: -1 });
        return res.status(200).json({ message: "Your Previous History", resumes: resume });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'server error', message: err.message });


    }
}


exports.getResumeForAdmin = async (req, res) => {
    try {
        let resume = await ResumeModel.find({}).sort({ createAt: -1 }).populate('user');
        return res.status(200).json({ message: "Fetched All History", resumes: resume });

    } catch (err) {

        console.error(err);
        return res.status(500).json({ error: 'Server error', message: err.message });

    }
}
