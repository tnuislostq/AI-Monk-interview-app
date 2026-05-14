# AI-Monk Interview App

An interactive philosophical conversation experience with a wise AI-powered monk. Engage in deep, thought-provoking dialogues to explore life's biggest questions and gain wisdom.

## 📖 Overview

This application creates an immersive environment where users can have meaningful philosophical conversations with an AI monk. The monk provides thoughtful guidance, asks probing questions, and shares wisdom from various philosophical traditions.

## ✨ Features

- **Philosophical Conversations** - Engage in deep discussions on life, meaning, and wisdom
- **Adaptive Responses** - AI learns context from previous messages for coherent dialogue
- **Multiple Wisdom Traditions** - Draws from Buddhist, Stoic, Zen, and other philosophical schools
- **Conversation History** - Save and revisit previous philosophical exchanges
- **Reflective Questions** - Monk poses thought-provoking questions to guide introspection
- **User-Friendly Interface** - Clean, intuitive chat interface

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- OpenAI API key (or alternative LLM provider)
- pip (Python package manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tnuislostq/AI-Monk-interview-app.git
   cd AI-Monk-interview-app
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your API keys
   ```

5. **Run the application**
   ```bash
   python src/app.py
   ```

6. **Access the interface**
   - Open your browser and navigate to `http://localhost:5000`

## 🏗️ Project Structure

```
AI-Monk-interview-app/
├── src/
│   ├── app.py                 # Main Flask application
│   ├── monk_ai.py             # AI model integration
│   ├── conversation.py        # Conversation management
│   └── utils.py               # Utility functions
├── config/
│   ├── prompts.json           # Monk personality & prompts
│   └── settings.py            # Configuration settings
├── static/
│   ├── css/
│   │   └── style.css          # UI styling
│   └── js/
│       └── chat.js            # Frontend logic
├── templates/
│   └── index.html             # Main HTML template
├── data/
│   └── conversations/         # Stored conversations
├── tests/
│   ├── test_monk_ai.py
│   └── test_conversation.py
├── requirements.txt           # Python dependencies
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

## 🔧 Technology Stack

- **Backend**: Flask (Python)
- **AI/LLM**: OpenAI GPT / Alternative LLM providers
- **Frontend**: HTML5, CSS3, JavaScript
- **Database**: SQLite (default, upgradable to PostgreSQL)
- **Environment Management**: python-dotenv

## 💬 Usage

### Starting a Conversation

1. Open the application in your browser
2. Type your philosophical question or topic
3. The monk will respond with thoughtful insights
4. Continue the dialogue to explore deeper

### Example Topics

- Meaning and purpose of life
- How to handle adversity
- The nature of happiness
- Decision-making and choices
- Understanding oneself
- Building meaningful relationships

## ⚙️ Configuration

### Customizing the Monk

Edit `config/prompts.json` to modify:
- Monk's personality traits
- Philosophy style (Zen, Stoic, Buddhist, etc.)
- Response tone and formality
- Special instructions and constraints

```json
{
  "system_prompt": "You are a wise monk...",
  "temperature": 0.7,
  "max_tokens": 500
}
```

### Environment Variables

Create a `.env` file with:
```
OPENAI_API_KEY=your_api_key_here
FLASK_ENV=development
DATABASE_URL=sqlite:///conversations.db
```

## 📚 API Reference

### Chat Endpoint

**POST** `/api/chat`

Request:
```json
{
  "message": "What is the meaning of life?",
  "session_id": "user_session_123"
}
```

Response:
```json
{
  "response": "The monk's thoughtful response...",
  "session_id": "user_session_123"
}
```

## 🧪 Testing

Run the test suite:

```bash
pytest tests/
```

Or with coverage:

```bash
pytest --cov=src tests/
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Areas for Contribution

- Enhancing AI responses
- Adding new philosophical frameworks
- Improving UI/UX
- Adding multilingual support
- Performance optimization
- Writing tests

## 🐛 Troubleshooting

### Issue: API Key Error
- Verify your `.env` file is in the root directory
- Check that your API key is valid and has proper permissions

### Issue: Port Already in Use
```bash
# Change the port in app.py or use environment variable
python src/app.py --port 5001
```

### Issue: Dependencies Not Installing
```bash
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall
```

## 📋 Roadmap

- [ ] User authentication and profiles
- [ ] Conversation analytics dashboard
- [ ] Multiple monk personas to choose from
- [ ] Voice input/output support
- [ ] Meditation and guided reflection features
- [ ] Community features and sharing
- [ ] Mobile app (React Native)
- [ ] Multilingual support
- [ ] Export conversations to PDF

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**tnuislostq**

- GitHub: [@tnuislostq](https://github.com/tnuislostq)

## 🙏 Acknowledgments

- Inspired by philosophical traditions and contemplative practices
- Built with OpenAI's GPT models
- Thanks to the open-source community

## 📞 Support

For issues, questions, or suggestions:
- Open an [Issue](https://github.com/tnuislostq/AI-Monk-interview-app/issues)
- Check existing [Discussions](https://github.com/tnuislostq/AI-Monk-interview-app/discussions)
- Contact via GitHub

---

**Start your philosophical journey today. Ask the monk a question.** 🧘‍♂️
