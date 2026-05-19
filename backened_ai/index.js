const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

const PORT = 4000;

require('dotenv').config();
console.log("MONGO_URL:", process.env.MONGO_URL);

require('./conn');

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))

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