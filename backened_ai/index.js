const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

require('./conn');

app.use(express.json());

const allowedOrigins = [
    "https://ai-resume-analyzer-ochre-three.vercel.app",
    "http://localhost:5173"
];

app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("CORS policy: Origin not allowed"));
    }
}));

const userRoutes = require('./Routes/user');
const resumeRoutes = require('./Routes/resume');

app.use('/api/user', userRoutes);
app.use('/api/resume', resumeRoutes);

app.get("/", (req, res) => {
    res.send("Backend running");
});

app.listen(PORT, () => {
    console.log("backend is running on port", PORT);
});