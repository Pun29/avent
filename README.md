# Avent — AI-Powered Event Discovery Agent for ASU Students

Avent is an AI-powered event discovery and planning system built for Arizona State University students. It helps students find relevant campus events, generate personalized schedules, and create useful social context such as conversation starters and icebreakers.

Instead of manually searching across multiple event sources, users enter their interests and preferences once. Avent then runs an automated multi-step workflow using AI agents, APIs, and structured reasoning to return personalized recommendations.

---

## What Avent Does

Avent helps students answer questions like:

- What events should I attend this week?
- Which events match my interests, schedule, and goals?
- How can I plan my day around campus activities?
- What should I talk about when I meet people at an event?

The system takes user preferences and turns them into structured, personalized event plans.

---

## Key Features

- **AI-powered event recommendations**
  - Matches events to user interests, preferences, and goals.

- **Multi-agent workflow**
  - Uses agent-style reasoning to break the task into smaller steps such as understanding preferences, analyzing event data, and generating final recommendations.

- **Personalized daily schedule generation**
  - Produces structured event plans instead of generic suggestions.

- **Conversation icebreakers**
  - Generates contextual talking points for selected events.

- **API-driven architecture**
  - Designed to connect event data sources through REST APIs.

- **Modern frontend**
  - React-based interface for a clean and interactive user experience.

- **Built with real users in mind**
  - Designed as a working tool, not just a demo.

---

## Tech Stack

### AI / Automation

- Google Gemini API
- AutoGen
- Agentic workflows
- Prompt engineering
- Structured output generation

### Backend / Data

- Python
- REST API integration
- JSON-based data processing
- Workflow orchestration logic

### Frontend

- React.js
- JavaScript
- Responsive UI components

### Development Tools

- Git / GitHub
- Claude Code
- API testing and debugging tools

---

## System Architecture

```text
User Preferences
        ↓
React Frontend
        ↓
Backend / API Layer
        ↓
Agent Workflow Orchestration
        ↓
Event Data Retrieval through APIs
        ↓
Gemini API Reasoning
        ↓
Personalized Schedule Generation
        ↓
Structured Recommendations + Icebreakers
        ↓
Frontend Display
