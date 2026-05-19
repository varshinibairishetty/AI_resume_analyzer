const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

const PORT = 4000;

require('dotenv').config();
console.log("MONGO_URL:", process.env.MONGO_URL);

require('./conn');

app.use(express.json());

const allowedOrigins = [
    process.env.FRONTEND_URL || "https://ai-resume-analyzer-ochre-three.vercel.app",
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