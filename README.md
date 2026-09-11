# 🧘 AI Monk — Mindful Interview Preparation Engine

[![Live Demo](https://img.shields.io/badge/Live_Demo-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://ai-monk-interview-app.onrender.com/)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5--Turbo-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

Live demo: https://ai-monk-interview-app.onrender.com/

---

TL;DR

AI Monk is a polished, production-ready interview coaching assistant that blends LLM-driven coaching with short mindfulness routines to reduce interview anxiety and improve answer clarity. Built in Flask, deployed on Render, and designed to be easy to customize for any role or seniority level.

Why this project will impress your recruiter

- Human-centered product: combines technical interview practice with guided grounding exercises to improve performance under pressure.
- Production mindset: uses Gunicorn + WSGI, environment-driven configuration, and a modular codebase (clear separation of prompts, orchestration, and state management).
- Ready-to-demo: live deployment available and reproducible local setup.
- Extensible: prompts.json and config allow fast tailoring for role-specific coaching (frontend/backend/ML/PM).

Highlights

- Structured answer coaching (STAR, concise storytelling)
- Behavioral + technical mock interviews in a conversational UX
- Short breathing/grounding prompts to reduce cognitive load
- Configurable prompt templates and session persistence
- Lightweight client (vanilla JS + CSS) for quick iteration

Tech snapshot

- Language: Python 3.10+
- Web: Flask, Gunicorn
- AI: OpenAI GPT-3.5-turbo (configurable)
- Hosting: Render (production demo linked above)

Quick demo script for a recruiter

1. Open the live demo (link above).
2. Ask for a behavioral question (e.g., "Tell me about a time you led a difficult project").
3. Practice an answer and request structured feedback — observe the concise rewrite and coaching tips.
4. Try a 60-second grounding prompt and then another mock question to compare clarity/confidence.

Installer-friendly Quickstart (local)

1. Clone

   ```bash
   git clone https://github.com/tnuislostq/AI-Monk-interview-app.git
   cd AI-Monk-interview-app
   ```

2. Virtualenv

   ```bash
   python3 -m venv venv
   source venv/bin/activate   # macOS / Linux
   # venv\Scripts\activate  # Windows (PowerShell)
   pip install -r requirements.txt
   ```

3. Configure

   Create a `.env` at project root or export environment variables:

   ```env
   OPENAI_API_KEY=sk-...
   FLASK_ENV=development
   SECRET_KEY=replace-with-secure-value
   ```

4. Run (development)

   ```bash
   export FLASK_APP=src.app
   export FLASK_ENV=development
   flask run --host=0.0.0.0 --port=5000
   # browse http://localhost:5000
   ```

5. Run (production-similar)

   ```bash
   gunicorn -w 4 "src.app:app"
   ```

Notes

- Keep your OpenAI key secret and out of source control.
- Adjust `FLASK_APP` if your entrypoint differs.

Repository structure (concise)

```
src/
  ├─ app.py            # Flask app entrypoint
  ├─ conversation.py   # Conversation state manager
  ├─ monk_ai.py        # LLM orchestration and prompt handling
config/
  ├─ settings.py      # Environment-based configuration
  └─ prompts.json     # Centralized prompt templates
requirements.txt
README.md
LICENSE
```

Architecture (high level)

[ Client (Browser) ]
       ▼
[ Gunicorn WSGI ]
       ▼
[ Flask (src.app) ]
  ├─ prompts.json & config
  ├─ conversation manager
  └─ monk_ai (LLM orchestrator)
       ▼
[ OpenAI API ]

Customization & tuning

- Role presets: add role-specific prompt templates in `config/prompts.json` (e.g., `frontend`, `data-science`, `product`).
- Tone & length: adjust temperature, max tokens and the feedback template in `monk_ai.py`.

What to show your recruiter (recommended talking points)

- Live demo and a short before/after: run a 2-question sequence with and without grounding to demonstrate improved concision.
- Explain how prompts are versioned and isolated from code (prompts.json) — this shows product maturity.
- Mention how easy it is to add role-specific coaching or integrate auth/persistence for a multi-user product.

Polish: sample polished summary to read aloud

"AI Monk is a focused interview-coaching tool that blends LLM-driven feedback with short mindfulness routines so candidates answer more clearly and with less anxiety. It’s built for product-quality demos — modular, environment-driven, and ready to extend for role-focused coaching."

Contributing

Contributions are welcome. Suggested workflow:

1. Open an issue describing the feature/bug.
2. Fork and create a feature branch.
3. Add tests where reasonable and open a PR with a clear description and screenshots/demos if applicable.

License

MIT — see LICENSE

Contact

Created by tnuislostq. For interview/demo requests or quick walkthroughs, open an issue or DM me on GitHub.
