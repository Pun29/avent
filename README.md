# 🎭 Avent — AI-Powered Event Discovery for ASU Students

Avent is an intelligent event recommendation platform that helps Arizona State University students discover campus events tailored to their interests. Select events you like, and Avent's multi-agent AI system analyzes your preferences, generates a personalized profile, recommends new events, creates daily schedules, and even suggests conversation icebreakers.

**🔗 [Try it live](https://avent-topaz.vercel.app/)**

---

## How It Works

1. **Browse & Select** — Pick 3+ events from the campus feed that interest you
2. **AI Analyzes** — Gemini API builds a profile of your interests and preferences
3. **Get Recommendations** — Receive personalized event suggestions you'd actually enjoy
4. **Plan Your Day** — AI generates a campus schedule around your recommended events
5. **Break the Ice** — Get contextual conversation starters for any event

## Features

- **Multi-agent AI pipeline** — Chained Gemini API calls for profile generation, event matching, schedule planning, and icebreaker creation
- **Dynamic theming** — UI colors adapt based on the dominant club/organizer in your selections
- **Fallback model support** — Automatic retry with fallback to `gemini-2.5-flash` if the primary model is unavailable
- **Responsive design** — Built with Tailwind CSS for mobile and desktop

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Tailwind CSS |
| AI/LLM | Google Gemini API (`gemini-3.5-flash`) |
| Agent Framework | Multi-step prompt chaining, structured JSON output |
| Deployment | GitHub Pages |

## Architecture

```
User selects events
       ↓
Gemini API: Profile Generation (free-text)
       ↓
Gemini API: Event Recommendation (JSON output)
       ↓
Gemini API: Daily Schedule Planning (free-text)
       ↓
Gemini API: Icebreaker Generation (JSON output)
       ↓
Dynamic UI rendering with club-themed colors
```

## Local Development

```bash
# Clone the repo
git clone https://github.com/Pun29/avent-.git
cd avent-

# Install dependencies
npm install

# Add your Gemini API key
echo "REACT_APP_GEMINI_API_KEY=your_key_here" > .env

# Start the dev server
npm start
```

Get a free Gemini API key at [aistudio.google.com](https://aistudio.google.com).

## Screenshots

| Event Discovery | AI Recommendations |
|---|---|
| Browse and select campus events | Personalized suggestions with icebreakers |

## What I Learned

- Designing multi-step LLM pipelines with structured JSON output constraints
- Handling API reliability (retry logic, fallback models, error states)
- Building dynamic theming systems with CSS custom properties
- Prompt engineering for consistent, production-quality AI outputs

## Author

**Punarva Bettadamane Channabasappa**
- [LinkedIn](https://linkedin.com/in/punarva-bc)
- [GitHub](https://github.com/Pun29)
- [Portfolio](https://pun29.github.io/punarva-portfolio)

---

Built as part of the Avent project • MS Computer Science (AI), Arizona State University
