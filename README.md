# 🧘 ZenMonk® (AI Monk) — Mindful Interview Preparation & Simulation Engine

[![Live Demo](https://img.shields.io/badge/Live_Demo-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://ai-monk-interview-app.onrender.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5--Turbo-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

Live demo: [https://ai-monk-interview-app.onrender.com/](https://ai-monk-interview-app.onrender.com/)

---

## 🌟 Overview

**ZenMonk® (AI Monk)** is a production-grade interview preparation and simulation platform that marries high-stakes behavioral and technical interview coaching with grounding mindfulness practices. 

Featuring a modern React + TypeScript + Vite frontend with glassmorphism aesthetics, candidate session history persistence, multi-industry question discovery (Technology, Healthcare, Finance, Design, Leadership, Sales), real-time answer diagnostic scoring, and an intelligent Python/Flask backend.

---

## ✨ Features & Architecture Highlights

### 1. Modern Glassmorphism Experience
- **Glassmorphic Navigation (`ZenNavbar.tsx`)**: High-end frosted glass bar (`backdrop-blur-2xl`, subtle borders), tab favicon branding, quick anchor navigation, dark/light theme switcher, and Candidate Account portal.
- **Mouse-Scrubbed Cinematic Video**: Full-screen atmospheric background video responding smoothly to horizontal cursor physics (`(delta / innerWidth) * 0.8 * duration`) with `onSeeked` queue throttling.
- **Hero & Discovery**: Clean typography, value proposition presentation, and multi-field career questionnaire that tailors interview scenarios.

### 2. Live Interview Studio & Simulation Room
- **Multi-Industry Question Bank**: Dedicated drills across Software Engineering, Clinical Healthcare, Quantitative Finance, Product & Design, Executive Leadership, and Sales.
- **Real-Time Simulation Feed**: Visual temple sanctum interview environment featuring Master Zen Bodhi.
- **Instant Diagnostic Engine**:
  - Word count & pacing checks.
  - Ownership & agency detection (identifies passive "we" vs. active "I led/decided").
  - Quantifiable metrics analysis (validates percentages, currency, and timeline gains).
  - Four-part feedback breakdown: Score, What Went Wrong, What Was Strong, and Master Bodhi's Model Polish.

### 3. Candidate Profile & Session Persistence
- **Client & Backend Authentication**: Seamless sign-in supporting candidate target field, target role, and past interview transcripts.
- **Transcript History**: View, re-inspect, and manage past simulated interview rounds directly from the account modal.

### 4. Grounding & Mindfulness
- **4-7-8 Breathing Pacer**: Calibrates parasympathetic response before entering high-stakes questions.
- **Quiet Mindfulness**: Thoughtfully engineered without disruptive audio cues, honoring candidate focus and tranquility.

---
## 📁 Repository Structure

```
AI-Monk-interview-app/
├── dist/                      # Pre-built production SPA ready for Render deployment
├── public/                    # Favicon svg and temple interviewer visual assets
├── src-client/                # Modern React 18 + TypeScript + Tailwind source
│   ├── components/            # ZenNavbar, ZenHero, InterviewStudio, AuthModal, etc.
│   ├── context/               # AuthContext (persistence) and ThemeContext
│   └── __tests__/             # Unit, Integration, and End-to-End Vitest suites
├── src/                       # Flask application & AI orchestration
│   ├── app.py                 # Primary entrypoint serving SPA & Auth/Chat APIs
│   ├── auth.py                # SQLite UserStore and authentication hashing
│   ├── monk_ai.py             # LLM orchestration and prompt handling
│   └── conversation.py        # Conversation state manager
├── config/                    # Settings and prompt configurations
├── tests/                     # Pytest backend test suite
├── Procfile                   # Render WSGI deployment command (gunicorn src.app:app)
└── requirements.txt           # Python dependencies
```

---

## 🚢 Deployment (Render)

This repository is optimized for one-click deployment on [Render](https://render.com/):
1. **Build Command**: `pip install -r requirements.txt`
2. **Start Command**: `gunicorn -w 4 "src.app:app"`
3. Flask automatically serves the pre-compiled `dist/` production assets, ensuring instantaneous loading without requiring a Node runtime on the production Python container.

---

## 📄 License
MIT License. Created with focus and clarity.
