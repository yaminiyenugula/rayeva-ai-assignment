# Rayeva AI - Complete Project File Reference

This file lists all project files and their purposes.

## 📁 Project Structure Overview

```
rayeva-ai-assignment/
├── README.md                          # Main project documentation
├── SETUP.md                           # Quick start setup guide
├── ARCHITECTURE.md                    # Technical architecture docs
├── PROMPTS.md                         # AI prompt engineering guide
├── .gitignore                         # Git ignore rules
│
├── backend/
│   ├── package.json                   # Backend dependencies
│   ├── server.js                      # Express server entry point
│   ├── .env.example                   # Environment variables template
│   ├── .gitignore                     # Backend git ignore
│   │
│   ├── config/
│   │   └── db.js                      # MongoDB connection setup
│   │
│   ├── models/
│   │   ├── Product.js                 # Product Mongoose schema
│   │   ├── Proposal.js                # Proposal Mongoose schema
│   │   └── Logs.js                    # Logging Mongoose schema
│   │
│   ├── services/
│   │   └── aiService.js               # OpenAI API integration service
│   │
│   ├── controllers/
│   │   ├── categoryController.js      # Category generation logic
│   │   └── proposalController.js      # Proposal generation logic
│   │
│   ├── routes/
│   │   ├── categoryRoutes.js          # Category API routes
│   │   └── proposalRoutes.js          # Proposal API routes
│   │
│   └── prompts/
│       ├── categoryPrompt.js          # Category prompt template
│       └── proposalPrompt.js          # Proposal prompt template
│
└── frontend/
    ├── package.json                   # Frontend dependencies
    ├── index.html                     # HTML entry point
    ├── vite.config.js                 # Vite configuration
    ├── tailwind.config.js             # Tailwind CSS configuration
    ├── postcss.config.js              # PostCSS configuration
    ├── .gitignore                     # Frontend git ignore
    │
    ├── src/
    │   ├── main.jsx                   # React entry point
    │   ├── index.css                  # Global styles
    │   ├── App.jsx                    # Main App component
    │   ├── App.css                    # App specific styles
    │   │
    │   ├── components/
    │   │   ├── Navbar.jsx             # Navigation bar component
    │   │   └── ResultCard.jsx         # Result display component
    │   │
    │   └── pages/
    │       ├── CategoryGenerator.jsx  # Category generation page
    │       └── ProposalGenerator.jsx  # Proposal generation page
    │
    └── public/                        # Static assets directory
```

## 📋 File Descriptions

### Root Level Files

| File | Purpose |
|------|---------|
| README.md | Complete project documentation, API reference, setup instructions |
| SETUP.md | Step-by-step setup guide for developers |
| ARCHITECTURE.md | Detailed technical architecture and design patterns |
| PROMPTS.md | AI prompt engineering guide and best practices |
| .gitignore | Global git ignore patterns |

### Backend Files

#### Configuration
| File | Purpose | Key Exports |
|------|---------|-------------|
| backend/package.json | Dependencies: express, mongoose, openai, cors, dotenv | npm scripts |
| backend/server.js | Express server setup, routes registration, middleware setup | app.listen() |
| backend/config/db.js | MongoDB connection with Mongoose | connectDB() |
| backend/.env.example | Template for environment variables | Configuration template |
| backend/.gitignore | Node modules and sensitive files | Git patterns |

#### Data Models
| File | Purpose | Collections |
|------|---------|-------------|
| backend/models/Product.js | Product schema for category results | Products |
| backend/models/Proposal.js | Proposal schema for B2B proposals | Proposals |
| backend/models/Logs.js | Logging schema for AI calls | Logs |

#### Services & Controllers
| File | Purpose | Exports |
|------|---------|---------|
| backend/services/aiService.js | OpenAI API integration with error handling | callOpenAI() |
| backend/controllers/categoryController.js | Category generation business logic | generateCategory(), getCategories() |
| backend/controllers/proposalController.js | Proposal generation business logic | generateProposal(), getProposals() |

#### Routes & Prompts
| File | Purpose | Routes |
|------|---------|--------|
| backend/routes/categoryRoutes.js | Category API endpoints | POST generate-category, GET categories |
| backend/routes/proposalRoutes.js | Proposal API endpoints | POST generate-proposal, GET proposals |
| backend/prompts/categoryPrompt.js | Category generation prompt | getCategoryPrompt() |
| backend/prompts/proposalPrompt.js | Proposal generation prompt | getProposalPrompt() |

### Frontend Files

#### Configuration & Entry Point
| File | Purpose | Description |
|------|---------|-------------|
| frontend/package.json | Dependencies: react, vite, tailwindcss, axios | npm scripts |
| frontend/index.html | HTML root document | React app mount point |
| frontend/vite.config.js | Vite build configuration | Dev server, proxy settings |
| frontend/tailwind.config.js | Tailwind CSS theme configuration | Color, size customization |
| frontend/postcss.config.js | PostCSS plugin configuration | Tailwind processing |
| frontend/.gitignore | Node modules, dist, env files | Git patterns |

#### React Components
| File | Purpose | Props/State |
|------|---------|-------------|
| frontend/src/main.jsx | React DOM render entry | React app initialization |
| frontend/src/App.jsx | Main app component with routing | currentPage state |
| frontend/src/index.css | Global styles, animations | Loading spinner CSS |
| frontend/src/App.css | App specific styles | Fade-in animations |
| frontend/src/components/Navbar.jsx | Navigation header | Navigation UI |
| frontend/src/components/ResultCard.jsx | Results display component | title, children, loading |

#### Pages
| File | Purpose | Features |
|------|---------|----------|
| frontend/src/pages/CategoryGenerator.jsx | Category classification page | Form, results, error handling |
| frontend/src/pages/ProposalGenerator.jsx | Proposal generation page | Form, results, error handling |

## 🚀 How to Use Each File

### To Start the Backend
1. Navigate to `backend/`
2. Create `.env` file from `.env.example`
3. Run `npm install`
4. Run `npm run dev`
5. Server will use `server.js` to start on port 5000

### To Start the Frontend
1. Navigate to `frontend/`
2. Run `npm install`
3. Run `npm run dev`
4. Open `index.html` through Vite dev server on port 5173

### To Add a New AI Module
1. Create new model in `backend/models/NewModule.js`
2. Create prompt in `backend/prompts/newModulePrompt.js`
3. Create controller in `backend/controllers/newModuleController.js`
4. Create routes in `backend/routes/newModuleRoutes.js`
5. Register in `server.js`

### To Add a New Frontend Page
1. Create component in `frontend/src/pages/NewPage.jsx`
2. Import in `App.jsx`
3. Add routing logic in `App.jsx`
4. Add navigation button in `HomePage`

## 📦 Dependencies Summary

### Backend Dependencies
```json
{
  "express": "^4.18.2",              // Web framework
  "mongoose": "^7.5.0",              // MongoDB ODM
  "openai": "^4.11.1",               // OpenAI API client
  "cors": "^2.8.5",                  // Cross-origin requests
  "dotenv": "^16.3.1"                // Environment variables
}
```

### Frontend Dependencies
```json
{
  "react": "^18.2.0",                // UI framework
  "react-dom": "^18.2.0",            // DOM rendering
  "axios": "^1.5.0",                 // HTTP client
  "vite": "^4.4.5",                  // Build tool
  "tailwindcss": "^3.3.0"            // CSS framework
}
```

## 🔄 API Endpoints Implemented

### Category Endpoints
- `POST /api/generate-category` - Generate product categories
- `GET /api/categories` - Retrieve all generated categories

### Proposal Endpoints
- `POST /api/generate-proposal` - Generate B2B proposals
- `GET /api/proposals` - Retrieve all proposals

### Health Check
- `GET /api/health` - Server health status

## 🗄️ Database Collections

### Products Collection
- Stores categorized products
- Indexes: product_name, primary_category, createdAt

### Proposals Collection
- Stores B2B proposals
- Indexes: business_type, budget, createdAt

### Logs Collection
- Stores all AI API calls
- TTL Index on createdAt (90 days)
- Tracks success/failures

## ✅ Verification Checklist

After setup, verify:
- [ ] Backend server running on port 5000
- [ ] Frontend running on port 5173
- [ ] MongoDB connection successful
- [ ] OpenAI API responding
- [ ] Both modules generating results
- [ ] Data being stored in MongoDB
- [ ] Logs being recorded
- [ ] No console errors

## 📚 Key Files for Learning

1. **To understand API design:** `backend/server.js`
2. **To understand AI integration:** `backend/services/aiService.js`
3. **To understand data models:** `backend/models/*.js`
4. **To understand prompts:** `backend/prompts/*.js`
5. **To understand frontend:** `frontend/src/App.jsx`
6. **To understand styling:** `frontend/src/index.css`

## 🔗 File Dependencies

```
server.js
├── config/db.js
├── routes/categoryRoutes.js
│   └── controllers/categoryController.js
│       ├── services/aiService.js
│       │   └── openai library
│       ├── models/Product.js
│       ├── models/Logs.js
│       └── prompts/categoryPrompt.js
└── routes/proposalRoutes.js
    └── controllers/proposalController.js
        ├── services/aiService.js
        ├── models/Proposal.js
        ├── models/Logs.js
        └── prompts/proposalPrompt.js
```

---

**Complete file reference for the Rayeva AI project** 📝
