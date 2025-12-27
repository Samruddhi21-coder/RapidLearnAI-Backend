# 🚀 RapidLearnAI  
### An AI-Powered Multimedia Learning Platform for Faster & Smarter Education

RapidLearnAI is an **AI-driven learning platform** designed to transform how learners consume educational content.  
It automatically converts any topic into **structured explanations, narrated audio, and short educational videos**, while tracking the learner’s progress in real time.

Unlike traditional e-learning platforms that rely on static videos and predefined courses, RapidLearnAI dynamically generates learning material on demand, making learning **adaptive, engaging, and efficient**.

---

## 📌 Motivation

Online learning today suffers from several critical limitations:

- Learners are forced to consume **static, pre-recorded content**
- No personalization based on learning pace or progress
- Lack of real-time feedback and session awareness
- High dropout rates due to poor engagement

RapidLearnAI was built to solve these problems by combining **AI-generated content, automated video creation, and session-based progress tracking** into a single intelligent learning pipeline.

---

## 🎯 Objectives

- Reduce learning time by providing **concise, structured explanations**
- Improve engagement using **audio-visual learning**
- Track learning progress in real time using session IDs
- Build a scalable AI-powered content generation system
- Create a foundation for future ML-based personalization

---

## 💡 What RapidLearnAI Does

RapidLearnAI converts a **learning intent** into a **complete multimedia learning experience**.

### Example Flow:
> User enters *“Binary Search Tree”*  
→ AI generates structured learning points  
→ Each point is converted into narrated audio  
→ Images and audio are merged into short video clips  
→ All clips are combined into a single lesson video  
→ User progress is tracked continuously  

---

## ✨ Key Features

### 📘 AI-Based Content Generation
- Automatically breaks down topics into clear, logical learning points
- Ensures explanations are concise and easy to understand
- Eliminates the need for manual content creation

---

### 🎧 Text-to-Speech Audio Generation
- Converts AI-generated explanations into natural-sounding audio
- Improves accessibility and supports auditory learners
- Enables learning without constant screen interaction

---

### 🎥 Automated Video Creation Pipeline
- Each learning point is converted into a short video clip
- Uses **FFmpeg** to merge images and audio
- Multiple clips are concatenated into a final lesson video
- Entire pipeline runs automatically without human intervention

---

### ⏱️ Real-Time Learning Session Tracking
- Every learning request is assigned a unique `chatId`
- Backend processes content asynchronously
- Frontend polls backend at regular intervals
- UI updates dynamically based on session progress (processing / completed)

This enables **session-aware learning**, which is missing in most EdTech platforms.

---

### 🔐 Secure and Scalable Backend
- Firebase Admin SDK for secure authentication
- Environment-based configuration
- Clean service-based backend architecture

---

## 🛠️ Technology Stack

### Frontend
- React.js
- Custom React Hooks
- REST API integration
- Polling-based real-time updates

### Backend
- Node.js
- Express.js
- FFmpeg for video processing
- Firebase Admin SDK

### AI & External Services
- OpenRouter / Replicate for AI content generation
- Text-to-Speech APIs for audio narration

---

## 🏗️ System Architecture (High-Level)

User
↓
React Frontend
↓
Node.js Backend (Express)
↓
AI APIs → Content Generation
↓
Text-to-Speech (Audio)
↓
Image + Audio → Video (FFmpeg)
↓
Video Concatenation
↓
Session Status API
↓
Frontend UI Updates


---

## 🔁 Learning Session Lifecycle

1. User initiates a learning request
2. Backend generates a unique `chatId`
3. AI generates structured content
4. Audio is generated for each point
5. Videos are created asynchronously
6. Frontend polls session status every few seconds
7. UI reflects live progress and completion

---

## 📂 Project Structure
RapidLearnAI/
│
├── frontend/
│ ├── src/
│ ├── pages/
│ ├── hooks/
│ └── services/
│
├── backend/
│ ├── src/
│ ├── routes/
│ ├── services/
│ ├── utils/
│ └── index.js
│
└── README.md


---

## ⚙️ Environment Configuration

Create a `.env` file in the backend directory:
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email

OPENROUTER_API_KEY=your_api_key
REPLICATE_API_KEY=your_api_key


---

## ▶️ Running the Project Locally

### Backend
```bash
cd backend
npm install
npm start

Frontend
cd frontend
npm install
npm run dev

