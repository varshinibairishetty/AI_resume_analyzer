const UserModel = require('../Models/user');

exports.register = async (req, res) => {
    try {
        const { name, email, photoUrl } = req.body;
        const userExist = await UserModel.findOne({ email: email });
        if (!userExist) {
            let newUser = new UserModel({ name, email, photoUrl });
            await newUser.save();
            return res.status(200).json({
                message: "user Registered successfully",
                user: newUser
            })
        }

        userExist.photoUrl = photoUrl;
        await userExist.save();

        return res.status(200).json({
            message: "welcome back",
            user: userExist
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error', message: err.message });

    }

}