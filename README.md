# 🤖 Kady AI — Premium AI Productivity Platform

**Kady AI** is an intelligent, AI-powered productivity companion designed to streamline workflows, manage contexts, and deliver smart conversational assistance. Built with a modern, high-end dark-mode aesthetic and fully optimized for secure API routing.

---

## 🎨 Key Features

### 1. **Premium Landing Page**
* **Modern Design**: Vibrant colors, glassmorphism header navigation, and custom radial gradient meshes.
* **Animated UI**: Interactive macOS-style window mockups, floating cards, and micro-animations powered by **Framer Motion**.
* **Responsive Layout**: Seamless styling across mobile, tablet, and desktop screens.

### 2. **Secure Chat Interface**
* **Secure Backend Proxy**: Direct OpenRouter API key transactions are handled securely by an Express server so they are never exposed to the client.
* **Session Persistence**: Chats and logs are saved dynamically using `localStorage`, keeping histories safe across sessions.
* **Streaming Responses**: Real-time word-by-word streaming generation complete with interactive typing indicators.

### 3. **Personalized Logic Interceptor**
* Built with custom identity rules that associate Kady AI with creator **Kelvin Agyare Yeboah** and brand partner **ByteBao**.

---

## 📂 Project Structure

```text
kady-ai/
├── backend/            # Express.js Server proxy
│   ├── server.js       # Main server entrypoint & streaming routing
│   ├── package.json    # Backend scripts & dependency settings
│   └── .env            # Private API keys (Git ignored)
├── frontend/           # React + Vite Client app
│   ├── src/
│   │   ├── components/ # Modular UI & Chat interfaces
│   │   ├── pages/      # LandingPageNew & ChatPage views
│   │   └── utils/      # Client API routing & markdown helpers
│   ├── package.json    # React compilation configuration
│   └── .env            # Client configurations
└── README.md
```

---
## 🛠️ Technology Stack

| Technology | Shield | Description |
|---|---|---|
| **React 18** | ![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white) | Modern JavaScript library for building fast and interactive user interfaces with reusable components. |
| **Vite** | ![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=for-the-badge&logo=vite&logoColor=white) | Lightning-fast frontend build tool and development server optimized for modern web applications. |
| **Framer Motion** | ![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animation-0055FF?style=for-the-badge&logo=framer&logoColor=white) | Powerful animation library for React used to create smooth transitions and interactive UI effects. |
| **Lucide React** | ![Lucide](https://img.shields.io/badge/Lucide_React-Icons-F56565?style=for-the-badge&logo=lucide&logoColor=white) | Beautiful and customizable open-source icon library for modern React applications. |
| **Vanilla CSS** | ![CSS](https://img.shields.io/badge/Vanilla_CSS-Styling-1572B6?style=for-the-badge&logo=css3&logoColor=white) | Pure CSS used for crafting responsive, clean, and fully customized user interface designs. |
| **Node.js** | ![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white) | JavaScript runtime environment used for building scalable and efficient server-side applications. |
| **Express.js** | ![Express](https://img.shields.io/badge/Express.js-Framework-000000?style=for-the-badge&logo=express&logoColor=white) | Minimal and flexible Node.js framework for creating robust APIs and backend services. |
| **CORS Middleware** | ![CORS](https://img.shields.io/badge/CORS-Middleware-FF9800?style=for-the-badge&logo=javascript&logoColor=white) | Middleware that enables secure cross-origin communication between frontend and backend services. |
| **Dotenv** | ![Dotenv](https://img.shields.io/badge/Dotenv-Environment_Configs-ECD53F?style=for-the-badge&logo=.env&logoColor=black) | Utility for managing environment variables securely across development and production environments. |
| **OpenRouter API** | ![OpenRouter](https://img.shields.io/badge/OpenRouter-API-7C3AED?style=for-the-badge&logo=openai&logoColor=white) | AI API gateway used to access advanced language models like `deepseek/deepseek-chat`. |
| **DeepSeek Chat** | ![DeepSeek](https://img.shields.io/badge/DeepSeek-LLM-0F172A?style=for-the-badge&logo=ai&logoColor=white) | Large Language Model powering intelligent AI conversations, responses, and automation features. |



## 🚀 Getting Started

Follow these instructions to run the project locally on your machine.

### Prerequisites
* Make sure you have **Node.js** (v18+) and **npm** installed.

---

### 1. Setup the Backend

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `/backend` folder and add your credentials:
   ```env
   PORT=5000
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   DEFAULT_MODEL=deepseek/deepseek-chat
   ```
4. Run the backend server in development mode:
   ```bash
   npm run dev
   ```
   *The server will spin up at `http://localhost:5000`.*

---

### 2. Setup the Frontend

1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `/frontend` folder:
   ```env
   VITE_BACKEND_URL=http://localhost:5000/api/chat
   VITE_DEFAULT_MODEL=deepseek/deepseek-chat
   VITE_APP_NAME=Kady AI
   VITE_APP_VERSION=1.0.0
   ```
4. Run the frontend development server:
   ```bash
   npm run dev
   ```
   *The client app will spin up (usually at `http://localhost:5173`).*

---

## 🔒 Security Note
Do **NOT** commit your `.env` files to Git. Both the `backend` and `frontend` folders have configured `.gitignore` setups that block environment configuration uploads to keep your API keys secure.

---

## 🤝 Credits
Created and engineered with ❤️ by **Kelvin Agyare Yeboah** 
