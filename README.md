# Loop - AI-Powered Technical Interview Platform

Loop is a full-stack web application that simulates technical coding interviews using AI. It provides an interactive environment where users can practice solving LeetCode-style problems while receiving real-time guidance and feedback from an AI interviewer named "Loop" powered by Google's Gemini 2.5 Flash model.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [How It Works](#how-it-works)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)

## 🎯 Overview

Loop is designed to help developers prepare for technical interviews by providing an AI-powered mock interview experience. The platform combines:
- **Real LeetCode Problems**: Practice with actual coding challenges
- **AI Interview Simulation**: Interactive conversation with an AI technical interviewer
- **Code Editor**: Monaco-based editor with Python execution
- **Session Persistence**: All conversations and code states are saved
- **Voice Input**: Push-to-talk functionality for hands-free interaction

## 🏗️ Architecture

The application follows a modern full-stack architecture:

```
┌─────────────────────────────────────────────────────────┐
│                      Frontend (React)                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │  Landing │  │ Problems │  │Interview │             │
│  │   Page   │  │   Page   │  │   Page   │             │
│  └──────────┘  └──────────┘  └──────────┘             │
│         │            │              │                   │
└─────────┼────────────┼──────────────┼───────────────────┘
          │            │              │
          ▼            ▼              ▼
┌─────────────────────────────────────────────────────────┐
│              Backend API (Express.js)                    │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Routes → Controllers → Services → Models         │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
          │            │              │
          ▼            ▼              ▼
┌─────────────────────────────────────────────────────────┐
│         External Services & Database                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │ Supabase │  │PostgreSQL│  │  Gemini  │             │
│  │   Auth   │  │(Prisma)  │  │   API    │             │
│  └──────────┘  └──────────┘  └──────────┘             │
└─────────────────────────────────────────────────────────┘
```

### Key Design Patterns

**Backend:**
- **MVC Architecture**: Separation of concerns with routes, controllers, services, and models
- **Service Layer**: Business logic encapsulated in reusable services
- **LangChain Integration**: Conversational AI with memory management
- **Prisma ORM**: Type-safe database access with PostgreSQL

**Frontend:**
- **Component-Based Architecture**: Reusable React components
- **Context API**: Global state management for theming and authentication
- **Custom Hooks**: Reusable logic (useAuth, usePushToTalk, useTheme)
- **React Router**: Client-side routing

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Monaco Editor** - VSCode-based code editor
- **Axios** - HTTP client
- **Radix UI** - Accessible UI components
- **TensorFlow.js** - Speech recognition for voice input
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma** - ORM for PostgreSQL
- **LangChain** - AI orchestration framework
- **Google Gemini AI** - Large language model
- **Supabase** - Authentication and real-time features
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

### Database
- **PostgreSQL** - Primary database
- **Prisma** - Database ORM and migrations

### External Services
- **Google Gemini 2.5 Flash** - AI model for interview conversations
- **Supabase Auth** - User authentication
- **Piston API** - Code execution (implied from frontend)

## ✨ Features

### 1. **User Authentication**
- Sign up and sign in with email/password
- JWT-based authentication with HTTP-only cookies
- Protected routes and session management via Supabase

### 2. **Problem Discovery**
- Browse LeetCode problems stored in database
- Search problems by title
- Filter by difficulty (Easy, Medium, Hard) and tags
- View problem metadata (title, URL, difficulty, frontend ID)

### 3. **Interactive Interview Experience**
- **Code Editor**: Monaco editor with Python support and adjustable font size
- **Question Display**: Paraphrased problem statements with examples and constraints
- **AI Chat Assistant**: Real-time conversation with "Loop" the AI interviewer
- **Code Execution**: Run Python code and see output in real-time
- **Resizable Panels**: Customizable layout for optimal workflow

### 4. **AI Interview System**
The AI interviewer (Loop) follows a structured interview process:
- Provides clarifying questions (but never solves the problem)
- Discourages brute force solutions and hints at optimal approaches
- Asks candidates to explain their code
- Requests time and space complexity analysis
- Provides comprehensive feedback based on:
  - Following instructions
  - Working solution
  - Optimal solution
  - Clear explanation
  - Correct complexity analysis
  - Communication skills
  - Best practices

### 5. **Session & Memory Management**
- Each user-problem pair creates a unique session
- All messages (user and AI) are persisted in the database
- Conversation history loads automatically when revisiting a problem
- Chat memory maintained using LangChain's memory management

### 6. **Archive System**
- Archive completed conversations
- Store entire chat history as JSON
- Prevent data loss when starting new attempts

### 7. **Voice Input**
- Push-to-talk functionality using TensorFlow.js
- Speech-to-text for hands-free interaction
- Transcript appended to chat input

### 8. **Theme System**
- Multiple theme support via CSS variables
- Context-based theme management
- Separate themes for home and interview pages

## 🔄 How It Works

### User Flow

1. **Landing & Authentication**
   ```
   User visits Landing Page
   ↓
   Signs up/Signs in via Auth page
   ↓
   Supabase creates user account
   ↓
   Backend sets HTTP-only cookies (access + refresh tokens)
   ```

2. **Problem Selection**
   ```
   User navigates to Problems page
   ↓
   Searches/browses LeetCode problems
   ↓
   Backend queries PostgreSQL via Prisma
   ↓
   Displays problems with metadata
   ↓
   User selects a problem
   ↓
   Navigates to Interview page with problem slug
   ```

3. **Interview Session**
   ```
   Interview page loads
   ↓
   Frontend fetches problem details via /api/chat/paraphrase
   ↓
   Backend uses Gemini API to paraphrase LeetCode problem
   ↓
   Returns structured JSON (title, description, examples, constraints)
   ↓
   Frontend creates/retrieves session via /auth/ endpoint
   ↓
   Backend creates unique session (userId + problemSlug)
   ↓
   Frontend loads chat history via /api/chat/history
   ↓
   User starts coding and chatting with AI
   ```

4. **AI Conversation**
   ```
   User types message or uses voice input
   ↓
   Frontend sends message + code + question to /api/chat/
   ↓
   Backend stores user message in database
   ↓
   Backend invokes LangChain chain with:
     - System prompt (Loop's personality/instructions)
     - Chat history (retrieved from database)
     - Current message, code, and question
   ↓
   LangChain sends formatted prompt to Gemini API
   ↓
   Gemini generates response
   ↓
   Backend stores AI response in database
   ↓
   Frontend displays response in chat
   ```

5. **Code Execution**
   ```
   User clicks "Run" button
   ↓
   Frontend sends Python code to Piston API
   ↓
   Piston executes code in sandboxed environment
   ↓
   Returns stdout/stderr
   ↓
   Frontend displays output in OutputBox
   ```

6. **Session Persistence**
   ```
   All messages automatically saved to PostgreSQL
   ↓
   Each session has unique ID (UUID)
   ↓
   Messages include role (user/model), content (JSON), timestamp
   ↓
   History retrieved via sessionId when returning to problem
   ```

7. **Archive Conversation**
   ```
   User clicks "New Chat" or archive button
   ↓
   Frontend triggers archive dialog
   ↓
   Backend fetches all session messages
   ↓
   Converts to JSON array
   ↓
   Upserts to ArchivedConversation table
   ↓
   Optionally deletes current session messages
   ```

### Backend Data Flow

```
HTTP Request
    ↓
Route (defines endpoint)
    ↓
Controller (validates request, extracts data)
    ↓
Service (business logic, database operations)
    ↓
Prisma ORM (database queries)
    ↓
PostgreSQL (data storage)
    ↓
Service returns data
    ↓
Controller formats response
    ↓
HTTP Response
```

### LangChain Integration

The AI conversation uses LangChain's `RunnableWithMessageHistory`:

```javascript
// System prompt defines Loop's behavior
systemPrompt: ChatPromptTemplate
    ↓
// Combined with Gemini model
model: ChatGoogleGenerativeAI
    ↓
// Converts response to string
outputParser: StringOutputParser
    ↓
// Wraps chain with automatic history management
chainWithMemory: RunnableWithMessageHistory
    - Injects conversation history automatically
    - Saves each turn to database
    - Retrieves history per sessionId
```

## 🗄️ Database Schema

### Session
Represents a user's attempt at solving a specific problem.
```prisma
model Session {
  id          String   @id @default(uuid())
  title       String?
  model       String   // "gemini-2.5-flash"
  createdAt   DateTime @default(now())
  userId      String
  problemSlug String
  messages    Message[]
  problem     Problem? @relation(fields: [problemSlug], references: [slug])
  editorState EditorState?
  @@unique([userId, problemSlug])
}
```

### Message
Individual chat messages in a conversation.
```prisma
model Message {
  id        String   @id @default(uuid())
  sessionId String
  session   Session  @relation(fields: [sessionId], references: [id])
  role      String   // "user" or "model"
  content   Json     // { input, code, question } or { response }
  createdAt DateTime @default(now())
}
```

### Problem
LeetCode problems synced to the database.
```prisma
model Problem {
  slug        String   @id        // leetcode titleSlug (e.g., "two-sum")
  title       String               // "Two Sum"
  url         String               // LeetCode URL
  difficulty  Difficulty           // EASY, MEDIUM, HARD
  frontendId  String?              // LeetCode frontend ID
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  tags        Tag[]                // Many-to-many relationship
  sessions    Session[]
  @@index([title])
}
```

### Tag
Problem tags for categorization.
```prisma
model Tag {
  id        Int       @id @default(autoincrement())
  name      String    @unique
  problems  Problem[]
}
```

### ArchivedConversation
Stores completed interview sessions.
```prisma
model ArchivedConversation {
  id          String @id @default(cuid())
  sessionId   String @unique
  userId      String
  data        Json   // Array of { role, content } objects
  problemSlug String
  archivedAt  DateTime @default(now())
}
```

### EditorState
Saves code editor state per session.
```prisma
model EditorState {
  id        String   @id @default(uuid())
  sessionId String   @unique
  session   Session  @relation(fields: [sessionId], references: [id])
  code      String?  @db.Text
  language  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 📁 Project Structure

```
ai-agent/
├── backend/                    # Express.js API server
│   ├── config/
│   │   └── database.js         # Prisma client configuration
│   ├── constants/
│   │   └── index.js            # HTTP status codes
│   ├── controllers/            # Request handlers
│   │   ├── auth.controller.js
│   │   ├── chat.controller.js
│   │   ├── search.controller.js
│   │   ├── paraphrase.controller.js
│   │   └── archive.controller.js
│   ├── lib/                    # Core libraries
│   │   ├── chain.js            # LangChain conversation chain
│   │   ├── llm.js              # Gemini model configuration
│   │   ├── paraphrase.js       # Problem paraphrasing service
│   │   ├── supabase.js         # Supabase client
│   │   └── systemPrompts.js    # AI interviewer prompts
│   ├── middleware/
│   │   └── errorHandler.js     # Global error handling
│   ├── models/                 # Database models (legacy)
│   ├── prisma/
│   │   ├── migrations/         # Database migrations
│   │   └── schema.prisma       # Database schema
│   ├── routes/                 # API route definitions
│   │   ├── auth.route.js
│   │   ├── chat.route.js
│   │   ├── search.route.js
│   │   └── archive.route.js
│   ├── services/               # Business logic
│   │   ├── auth.service.js
│   │   ├── chat.service.js
│   │   ├── memory.service.js
│   │   ├── search.service.js
│   │   ├── sessions.service.js
│   │   └── archive.service.js
│   ├── server.js               # Main server entry point
│   └── package.json
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── auth/           # Authentication components
│   │   │   ├── common/         # Shared components
│   │   │   ├── home/           # Problem selection components
│   │   │   ├── ide/            # Interview IDE components
│   │   │   ├── landing/        # Landing page components
│   │   │   ├── layout/         # Layout components
│   │   │   ├── magicui/        # Custom UI components
│   │   │   └── ui/             # Base UI components
│   │   ├── constants/          # Frontend constants
│   │   ├── context/            # React contexts
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/                # Frontend utilities
│   │   ├── pages/              # Page components
│   │   ├── services/           # API services
│   │   └── utils/              # Helper functions
│   ├── public/                 # Static assets
│   ├── dist/                   # Build output
│   └── package.json
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- Google Gemini API key
- Supabase account

### Backend Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Database setup:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Install dependencies:**
   ```bash
   cd client
   npm install
   ```

2. **Environment setup:**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## 📡 API Endpoints

### Authentication (`/auth`)
- `POST /auth/` - Create/retrieve session for user-problem pair
- `POST /auth/signin` - User sign in
- `POST /auth/signup` - User sign up
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user data

### Chat (`/api/chat`)
- `POST /api/chat/` - Send message to AI interviewer
- `GET /api/chat/paraphrase` - Get paraphrased problem statement
- `GET /api/chat/session` - Get session ID
- `GET /api/chat/history` - Get conversation history

### Search (`/search`)
- `GET /search?keyword=<term>` - Search problems by keyword

### Archive (`/archive`)
- `POST /archive` - Archive conversation
- `GET /archive` - Get archived conversations

## 🔧 Environment Variables

### Backend (.env)
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ai_agent"

# Supabase
SUPABASE_URL="your-supabase-url"
SUPABASE_ANON_KEY="your-supabase-anon-key"

# Google Gemini
GEMINI_API_KEY="your-gemini-api-key"

# Server
PORT=8080
NODE_ENV=development
```

### Frontend (.env)
```env
# API Configuration
VITE_API_URL=http://localhost:8080

# Supabase
VITE_SUPABASE_URL="your-supabase-url"
VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"

# App Configuration
VITE_APP_NAME=Loop
VITE_APP_VERSION=1.0.0
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Google Gemini for AI capabilities
- Supabase for authentication
- LangChain for AI orchestration
- LeetCode for problem inspiration
- The open-source community for amazing tools and libraries