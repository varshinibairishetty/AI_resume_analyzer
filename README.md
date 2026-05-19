<div align="center">

# 🤖 ResumeX — AI Resume Analyzer

### An intelligent full-stack web application that analyzes your resume against job descriptions using AI and provides a match score with detailed feedback.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://ai-resume-analyzer-ochre-three.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Render-blue?style=for-the-badge&logo=render)](https://ai-resume-analyzer-1-0l5v.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-green?style=for-the-badge&logo=github)](https://github.com/varshinibairishetty/AI_resume_analyzer)

</div>

---

## 🌐 Live Demo

| Service | URL |
|---------|-----|
| 🖥️ Frontend | https://ai-resume-analyzer-ochre-three.vercel.app |
| ⚙️ Backend | https://ai-resume-analyzer-1-0l5v.onrender.com |

---

## ✨ Features

- 🔐 **Google OAuth Authentication** via Firebase
- 📄 **PDF Resume Upload** and automatic text extraction
- 🤖 **AI-Powered Analysis** using Cohere AI
- 📊 **Match Score (0–100%)** based on Job Description
- 💬 **Detailed AI Feedback** on resume strengths and gaps
- 📜 **Resume History** — view all past analyses
- 👑 **Admin Panel** — view all users' resume analyses
- 📱 **Fully Responsive** modern UI

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React.js (Vite) | UI Framework |
| React Router DOM | Client-side Routing |
| Axios | HTTP Requests |
| Firebase | Google OAuth |
| Material UI | UI Components |
| CSS Modules | Styling |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | Web Framework |
| MongoDB + Mongoose | Database |
| Multer | PDF File Upload |
| pdf-parse | PDF Text Extraction |
| Cohere AI | Resume Analysis |
| CORS | Cross-Origin Requests |

### Deployment
| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

---

## 📁 Project Structure

```
AI_resume_analyzer/
│
├── backened_ai/                  # Node.js Backend
│   ├── Controllers/
│   │   ├── resume.js             # Resume logic & AI analysis
│   │   └── user.js               # User registration/login
│   ├── Models/
│   │   ├── resume.js             # Resume schema
│   │   └── user.js               # User schema
│   ├── Routes/
│   │   ├── resume.js             # Resume routes
│   │   └── user.js               # User routes
│   ├── utils/
│   │   └── multer.js             # File upload config
│   ├── conn.js                   # MongoDB connection
│   ├── index.js                  # Express server entry
│   └── package.json
│
├── mern_ai/                      # React Frontend
│   ├── src/
│   │   ├── component/
│   │   │   ├── Dashboard/        # Resume upload & analysis
│   │   │   ├── History/          # Past resume analyses
│   │   │   ├── Admin/            # Admin panel
│   │   │   ├── Login/            # Google OAuth login
│   │   │   └── Sidebar/          # Navigation
│   │   ├── utils/
│   │   │   ├── HOC/
│   │   │   │   └── AuthContext.jsx  # Auth state management
│   │   │   ├── axios.js          # Axios instance
│   │   │   └── firebase.js       # Firebase config
│   │   └── App.jsx
│   ├── vercel.json               # Vercel routing config
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Firebase project with Google Auth enabled
- Cohere AI API key

---

### 1. Clone the Repository

```bash
git clone https://github.com/varshinibairishetty/AI_resume_analyzer.git
cd AI_resume_analyzer
```

---

### 2. Backend Setup

```bash
cd backened_ai
npm install
```

Create a `.env` file inside `backened_ai/`:

```env
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/resume_ai
COHERE_API_KEY=your_cohere_api_key
```

Start the backend:

```bash
node index.js
```

Backend runs on: `http://localhost:4000`

---

### 3. Frontend Setup

```bash
cd ../mern_ai
npm install
```

Update `src/utils/axios.js`:

```js
import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:4000"
});

export default instance;
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## 📡 API Endpoints

### User Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/user` | Register or login user |

### Resume Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/resume/addResume` | Upload & analyze resume |
| GET | `/api/resume/get/:userId` | Get user's resume history |
| GET | `/api/resume/get` | Get all resumes (admin only) |

---

## 🔑 Environment Variables

### Backend
| Variable | Description |
|----------|-------------|
| `MONGO_URL` | MongoDB Atlas connection string |
| `COHERE_API_KEY` | Cohere AI API key |

---

## 🔒 Security Notes

- Never push `.env` file to GitHub
- `.env` is included in `.gitignore`
- All API keys are stored as environment variables
- MongoDB credentials are kept private

---

## 🗺️ Future Improvements

- [ ] ATS (Applicant Tracking System) compatibility check
- [ ] Resume templates and builder
- [ ] Multi-language support
- [ ] Interview preparation suggestions
- [ ] Email notifications for analysis results
- [ ] Resume ranking system
- [ ] JWT-based authentication

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Commit: `git commit -m "Add your feature"`
5. Push: `git push origin feature/your-feature`
6. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

### 👩‍💻 Developed by Varshini Bairishetty

[![GitHub](https://img.shields.io/badge/GitHub-varshinibairishetty-black?style=flat&logo=github)](https://github.com/varshinibairishetty)

⭐ Star this repo if you found it helpful!

</div>
