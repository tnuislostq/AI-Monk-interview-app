# 🧘 AI Monk — Mindful Interview Preparation Engine

[![Live Demo](https://img.shields.io/badge/Live_Demo-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://ai-monk-interview-app.onrender.com/)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5--Turbo-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

> A full-stack AI interview preparation assistant engineered to help job seekers turn interview anxiety into structured, grounded, and concise answers using conversational AI and stoic/mindful reflection principles.

🔗 **Live Production URL:** [https://ai-monk-interview-app.onrender.com/](https://ai-monk-interview-app.onrender.com/)

---

## 📌 Executive Summary & Motivation

Traditional mock interview tools often focus purely on technical accuracy while ignoring cognitive overload and performance anxiety. **AI Monk** addresses both:
1. **Interview Communication:** Promotes structured delivery (e.g., STAR technique, concise storytelling).
2. **Mental Centeredness:** Applies guided mindfulness techniques to calm nervous candidates before high-stakes technical or behavioral rounds.

Built with clean architecture, decoupled configuration modules, and production-ready WSGI deployment.

---

## 🏛️ System Architecture

```text
[ Client Browser (Vanilla JS / CSS3) ]
                 │
                 ▼  HTTP REST (JSON)
[ Gunicorn WSGI Server (Reverse Proxy on Render) ]
                 │
                 ▼
[ Flask Application Layer (`src/app.py`) ]
   ├── Config Engine (`config/settings.py` + `prompts.json`)
   ├── Conversation State Manager (`src/conversation.py`)
   └── LLM Orchestrator (`src/monk_ai.py`)
                 │
                 ▼  HTTPS / TLS 1.3
[ OpenAI API Engine (gpt-3.5-turbo) ]
