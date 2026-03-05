# Rayeva AI - Eco-Commerce AI Solutions

Hey there! This is a full-stack AI-powered platform I built for sustainable e-commerce. It includes two working AI modules and blueprints for two more. I focused on clean code, solid architecture, and making it production-ready.

## 📋 Project Overview

Rayeva AI helps eco-commerce businesses use AI for product categorization, B2B proposals, impact reporting, and customer support. I built this to show how AI can make e-commerce more sustainable and efficient.

**What it does:**
- ✅ AI Category & Tag Generator - Automatically tags products with eco-friendly filters
- ✅ AI B2B Proposal Generator - Creates custom business proposals
- 📋 AI Impact Reporting (architecture ready)
- 💬 AI WhatsApp Support Bot (architecture ready)

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for APIs
- **MySQL** - Database (with Sequelize ORM)
- **OpenAI API** - For AI magic
- **dotenv** - Keeps secrets safe

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Clean, responsive styling
- **Axios** - Handles API calls

### Infrastructure
- **npm** - Package management
- **REST API** - Clean communication
- **JSON** - Data exchange

## 🏗️ System Architecture

Here's how everything connects:

```
Frontend (React UI)
        │
        ▼
Express API Routes
        │
        ▼
Controllers
        │
        ▼
Service Layer
(Business Logic)
        │
        ▼
AI Service Layer
(OpenAI Prompt Engine)
        │
        ▼
MySQL Database
(Product / Proposal / Logs)
```

The project follows a clean layered architecture separating UI, business logic, AI processing, and database operations.

## 📁 Modules

### 1. Category & Tag Generator
Automatically categorizes products and adds SEO tags with sustainability filters.

### 2. B2B Proposal Generator
Creates tailored business proposals with budget breakdowns and eco-impact summaries.

### 3. Impact Reporting (Architecture)
Would generate environmental impact reports - database schema and API structure ready.

### 4. WhatsApp Support Bot (Architecture)
Would handle customer queries via WhatsApp - integration points defined.

## 📡 API Endpoints

POST /api/generate-category  
Generate product category and SEO tags using AI.

POST /api/generate-proposal  
Generate sustainable B2B proposal based on business input.

## 🤖 AI Prompt Design

I designed the prompts to be specific and reliable. Each module has its own prompt file that tells the AI exactly what to do and how to format the response.

## 📊 Database Schema

Using MySQL with Sequelize. Tables for products, proposals, and logs to track everything.

## 🚀 Setup Instructions

1. Clone the repo
2. Set up MySQL database
3. Install backend dependencies: `cd backend && npm install`
4. Install frontend dependencies: `cd frontend && npm install`
5. Add your OpenAI API key to backend/.env
6. Start backend: `npm start` (in backend folder)
7. Start frontend: `npm run dev` (in frontend folder)

## 🎥 Demo Video

Check out the demo video to see it in action!

## 🔗 GitHub Repo

Find the code and contribute here!


