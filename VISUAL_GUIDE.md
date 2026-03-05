# Rayeva AI - Visual Quick Reference Guide

## 🎯 System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                  USER (BROWSER)                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│            FRONTEND (React + Tailwind)                           │
│                    Port: 5173                                   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Home Page (Navigation)                      │  │
│  │  ┌──────────────────┐  ┌──────────────────┐            │  │
│  │  │ Category         │  │ Proposal         │            │  │
│  │  │ Generator Page   │  │ Generator Page   │            │  │
│  │  └──────────────────┘  └──────────────────┘            │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────┬──────────────────────────────────────┘
                          │
                          │ API Calls (Axios)
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│            BACKEND (Node.js + Express)                          │
│                    Port: 5000                                   │
│                                                                 │
│  Routes:                                                        │
│  ├── POST /api/generate-category                               │
│  ├── GET  /api/categories                                      │
│  ├── POST /api/generate-proposal                               │
│  ├── GET  /api/proposals                                       │
│  └── GET  /api/health                                          │
│                                                                 │
│  Controllers:                                                   │
│  ├── categoryController.js → generateCategory()                │
│  └── proposalController.js → generateProposal()                │
│                                                                 │
│  Services:                                                      │
│  └── aiService.js                                              │
│      ├── callOpenAI(prompt)                                    │
│      └── Logs response to MongoDB                              │
│                                                                 │
│  Prompts:                                                       │
│  ├── categoryPrompt.js                                         │
│  └── proposalPrompt.js                                         │
└─────────┬──────────────────────────────────────────────────┬──┘
          │                                                  │
          │ Database Operations                             │
          │                                                 │
          │         ┌──────────────────────────────┐        │ OpenAI API
          │         │                              │        │ Requests
          ▼         ▼                              │        ▼
┌──────────────────────────────────────────┐   ┌──────────────┐
│  MongoDB Atlas (Cloud)                  │   │  OpenAI API  │
│                                          │   │              │
│  Collections:                            │   │ GPT-3.5      │
│  ├── Products                            │   │ turbo        │
│  ├── Proposals                           │   │              │
│  └── Logs                                │   └──────────────┘
│                                          │
│  Features:                               │
│  ├── Automatic backups                   │
│  ├── IP whitelisting                     │
│  ├── User authentication                 │
│  └── Monitoring & alerts                 │
└──────────────────────────────────────────┘
```

## 📊 Data Flow: Category Generator

```
User Input
    │
    ├─ Product Name: "Bamboo Toothbrush"
    └─ Description: "Eco-friendly..."
                    │
                    ▼
            Form Validation
                    │
                    ├─ ✅ Valid
                    │
                    ▼
                Show Loading
                    │
                    ▼
    POST /api/generate-category
                    │
                    ▼
        categoryController.js
                    │
    ┌───────────────┼───────────────┐
    │               │               │
    ▼               ▼               ▼
Validate      Get Prompt       Send to OpenAI
Input         Template              │
    │               │               ▼
    └───────────────┼───────► OpenAI API
                    │           │
                    │           ├─ Analyzes product
                    │           ├─ Returns JSON
                    │           │
                    │           ▼
                    │         Parse & Validate
                    │           │
                    │           ├─ ✅ Valid JSON
                    │           │
                    │           ▼
                    │         Log Request
                    │         (MongoDB)
                    │           │
                    └───────────┼────────┐
                                │        │
                         Save Result    Send Response
                        (MongoDB)           │
                                │           ▼
                                └──────► Frontend
                                         │
                                         ▼
                                    Display Results
```

## 📊 Data Flow: Proposal Generator

```
User Input
    │
    ├─ Business Type: "Coffee Shop"
    ├─ Budget: 5000
    └─ Event: "Go Green Initiative"
                    │
                    ▼
            Form Validation
                    │
                    ├─ ✅ Valid
                    │
                    ▼
                Show Loading
                    │
                    ▼
    POST /api/generate-proposal
                    │
                    ▼
        proposalController.js
                    │
    ┌───────────────┼───────────────┐
    │               │               │
    ▼               ▼               ▼
Validate      Get Prompt       Send to OpenAI
Input         Template              │
(budget > 0)      │                ▼
    │             │           OpenAI API
    │             │               │
    │             │          ├─ Analyzes needs
    │             │          ├─ Recommends products
    │             │          ├─ Allocates budget
    │             │          └─ Returns JSON
    │             │               │
    │             ▼               ▼
    │         Parse & Validate
    │             │
    │         Check Budget
    │         Compliance
    │             │
    │         ✅ Valid &
    │        Budget OK
    │             │
    │             ▼
    │         Log Request
    │         (MongoDB)
    │             │
    └─────────────┼────────┐
                  │        │
           Save Result   Send Response
          (MongoDB)         │
                  │         ▼
                  └────► Frontend
                         │
                         ▼
                    Display Budget
                    Breakdown
```

## 🗄️ Database Schema Diagram

```
PRODUCTS Collection
┌─────────────────────────────────┐
│ _id                             │
│ product_name (INDEXED)          │
│ description                     │
│ primary_category (INDEXED)      │
│ sub_category                    │
│ seo_tags: [String]              │
│ sustainability_filters: [String]│
│ createdAt (INDEXED)             │
│ updatedAt                       │
└─────────────────────────────────┘

PROPOSALS Collection
┌─────────────────────────────────┐
│ _id                             │
│ business_type (INDEXED)         │
│ budget (INDEXED - Range)        │
│ event                           │
│ recommended_products: [String]  │
│ budget_allocation: Object       │
│ estimated_cost: Number          │
│ impact_summary: String          │
│ createdAt (INDEXED)             │
│ updatedAt                       │
└─────────────────────────────────┘

LOGS Collection
┌─────────────────────────────────┐
│ _id                             │
│ module_name (INDEXED)           │
│ prompt: String                  │
│ response: Object                │
│ status: success|error           │
│ error_message: String           │
│ createdAt (TTL Index-90 days)   │
│ updatedAt                       │
└─────────────────────────────────┘
```

## 🔄 Request/Response Cycle

```
┌─────────────────────────────────────────────────────────────────┐
│ BROWSER (Frontend)                                              │
├─────────────────────────────────────────────────────────────────┤
│ 1. User fills form                                              │
│ 2. Validates input locally                                      │
│ 3. Sends POST request with Axios                               │
│ 4. Shows loading spinner                                        │
│ 5. Waits for response                                           │
│ 6. Receives JSON response                                       │
│ 7. Displays results in UI                                       │
│                                                                 │
│ Example: Category Generator                                     │
│ POST /api/generate-category                                    │
│ Body: {                                                         │
│   "product_name": "Bamboo Brush",                              │
│   "description": "Eco-friendly..."                             │
│ }                                                               │
└─────────────────────┬──────────────────────────────────────────┘
                      │ (1) HTTP POST
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│ SERVER (Backend)                                                │
├─────────────────────────────────────────────────────────────────┤
│ (2) Express receives request                                    │
│ (3) Routes to controller                                        │
│ (4) Validates input                                             │
│ (5) Generates prompt                                            │
│ (6) Calls OpenAI API (async)                                   │
│ (7) Receives AI response                                        │
│ (8) Validates JSON structure                                    │
│ (9) Saves to MongoDB                                            │
│ (10) Logs the call                                              │
│ (11) Sends response back                                        │
│                                                                 │
│ Response:                                                       │
│ {                                                               │
│   "success": true,                                              │
│   "data": {                                                     │
│     "primary_category": "Personal Care",                        │
│     "sub_category": "Dental",                                   │
│     "seo_tags": [...],                                          │
│     "sustainability_filters": [...]                             │
│   }                                                             │
│ }                                                               │
└─────────────────────┬──────────────────────────────────────────┘
                      │ (2) HTTP 200 OK
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│ BROWSER (Frontend)                                              │
├─────────────────────────────────────────────────────────────────┤
│ (7) Receives response                                           │
│ (8) Parses JSON                                                 │
│ (9) Updates state                                               │
│ (10) Renders ResultCard                                         │
│ (11) Displays: Primary Category, Tags, Filters                 │
│ (12) Hides loading spinner                                      │
└─────────────────────────────────────────────────────────────────┘
```

## 🧪 Testing Endpoints

```
┌──────────────────────────────────────────────────────────────┐
│ CATEGORY GENERATOR TEST                                      │
├──────────────────────────────────────────────────────────────┤
│ POST http://localhost:5000/api/generate-category             │
│                                                              │
│ Content-Type: application/json                              │
│                                                              │
│ {                                                            │
│   "product_name": "Recycled Cotton T-Shirt",               │
│   "description": "100% recycled cotton, eco-friendly,      │
│                   fair trade certified"                      │
│ }                                                            │
│                                                              │
│ Expected Response:                                           │
│ {                                                            │
│   "success": true,                                           │
│   "message": "Category generated successfully",              │
│   "data": {                                                  │
│     "primary_category": "Clothing",                          │
│     "sub_category": "T-Shirts",                              │
│     "seo_tags": ["cotton", "recycled", "eco", ...],       │
│     "sustainability_filters": ["recyclable", ...]           │
│   }                                                          │
│ }                                                            │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ PROPOSAL GENERATOR TEST                                      │
├──────────────────────────────────────────────────────────────┤
│ POST http://localhost:5000/api/generate-proposal             │
│                                                              │
│ Content-Type: application/json                              │
│                                                              │
│ {                                                            │
│   "business_type": "Retail Store",                          │
│   "budget": 8000,                                            │
│   "event": "Sustainability Initiative Launch"               │
│ }                                                            │
│                                                              │
│ Expected Response:                                           │
│ {                                                            │
│   "success": true,                                           │
│   "message": "Proposal generated successfully",              │
│   "data": {                                                  │
│     "recommended_products": ["Eco Bags", "...", "..."],   │
│     "budget_allocation": {                                  │
│       "Eco Bags": 2000,                                     │
│       "...": 1500                                           │
│     },                                                       │
│     "estimated_cost": 7500,                                 │
│     "impact_summary": "..."                                 │
│   }                                                          │
│ }                                                            │
└──────────────────────────────────────────────────────────────┘
```

## 🔧 Quick Command Reference

```
BACKEND SETUP
└─ cd backend
   ├─ npm install
   ├─ cp .env.example .env
   ├─ (edit .env with MongoDB URI and OpenAI key)
   └─ npm run dev
      └─ Server on http://localhost:5000

FRONTEND SETUP
└─ cd frontend
   ├─ npm install
   └─ npm run dev
      └─ Frontend on http://localhost:5173

BUILD FOR PRODUCTION
├─ Frontend:
│  └─ cd frontend && npm run build
│     └─ Creates dist/ folder
└─ Backend:
   └─ Deploy server.js to Heroku/Railway

VERIFY EVERYTHING
├─ Health Check:
│  └─ curl http://localhost:5000/api/health
├─ Category Test:
│  └─ curl -X POST http://localhost:5000/api/generate-category \
│        -H "Content-Type: application/json" \
│        -d '{"product_name":"Test","description":"Test"}'
└─ Frontend:
   └─ Open http://localhost:5173 in browser
```

## 📊 Project Stats

```
BACKEND
├─ Files: 12
├─ Lines of Code: ~1200
├─ Dependencies: 5 main + 1 dev
├─ API Endpoints: 5
└─ Database Collections: 3

FRONTEND
├─ Files: 11
├─ Lines of Code: ~1500
├─ Dependencies: 5 main + 5 dev
├─ Pages: 2 + 1 home
├─ Components: 2
└─ Colors (Tailwind): 10+

DOCUMENTATION
├─ README.md
├─ SETUP.md
├─ ARCHITECTURE.md
├─ DEPLOYMENT.md
├─ PROMPTS.md
├─ FILE_REFERENCE.md
└─ PROJECT_SUMMARY.md

TOTAL
├─ Complete Files: 23
├─ Documentation Files: 7
├─ Lines of Code: ~2700
└─ Production Ready: ✅ YES
```

## 🎯 Feature Coverage

```
CATEGORY GENERATOR
├─ Input Validation       ✅
├─ Prompt Generation      ✅
├─ OpenAI Integration     ✅
├─ Response Parsing       ✅
├─ JSON Validation        ✅
├─ Error Handling         ✅
├─ MongoDB Storage        ✅
├─ Logging                ✅
├─ Frontend Form          ✅
└─ Results Display        ✅

PROPOSAL GENERATOR
├─ Input Validation       ✅
├─ Budget Validation      ✅
├─ Prompt Generation      ✅
├─ OpenAI Integration     ✅
├─ Response Parsing       ✅
├─ JSON Validation        ✅
├─ Budget Compliance      ✅
├─ MongoDB Storage        ✅
├─ Logging                ✅
├─ Frontend Form          ✅
└─ Results Display        ✅

ADDITIONAL FEATURES
├─ Navbar Component       ✅
├─ ResultCard Component   ✅
├─ Loading Spinner        ✅
├─ Error Messages         ✅
├─ CORS Configuration     ✅
├─ Environment Management ✅
├─ Database Indexes       ✅
├─ API Health Check       ✅
└─ GET Data Endpoints     ✅
```

## 🚀 Performance Targets

```
Frontend
├─ Page Load:           < 2s
├─ Response Display:    < 100ms
├─ Animation Smoothness: 60fps
└─ Bundle Size:         < 150KB

Backend
├─ Health Check:        < 50ms
├─ Category Generate:   < 5s (mostly OpenAI)
├─ Proposal Generate:   < 5s (mostly OpenAI)
├─ Database Query:      < 100ms
└─ Error Response:      < 100ms

Total System
├─ E2E Category:        < 7s
├─ E2E Proposal:        < 7s
└─ Success Rate:        > 99%
```

---

**Visual reference for the complete Rayeva AI system** 📊
