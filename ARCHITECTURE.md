# System Architecture - Rayeva AI

Detailed technical architecture and design patterns for the Rayeva AI system.

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                        │
│  ┌─────────────────────┐  ┌──────────────────────────────────┐  │
│  │   React Frontend    │  │  Tailwind CSS Styling            │  │
│  │ (Single Page App)   │  │  (Responsive Design)             │  │
│  └─────────────────────┘  └──────────────────────────────────┘  │
└──────────────────────────────────┬───────────────────────────────┘
                                   │ HTTP/REST
┌──────────────────────────────────▼───────────────────────────────┐
│                          API LAYER                                │
│  ┌──────────────────────────────────────────────────────────────┐│
│  │  Express.js Server                                           ││
│  │  ├── Routes: categoryRoutes, proposalRoutes                 ││
│  │  ├── Controllers: categoryController, proposalController   ││
│  │  ├── Middleware: CORS, JSON parsing, Error handling        ││
│  └──────────────────────────────────────────────────────────────┘│
└──────────────────────────────────┬───────────────────────────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
        ┌───────────▼──┐  ┌───────▼────────┐  ┌──▼─────────────┐
        │  AI Service  │  │   Controllers  │  │  Error Handler │
        │(OpenAI API)  │  │ (Business      │  │  & Logger      │
        │              │  │  Logic)        │  │                │
        └───────────┬──┘  └───────┬────────┘  └──┬─────────────┘
                    │              │              │
                    └──────────────┼──────────────┘
                                   │
                   ┌───────────────▼────────────────┐
                   │     DATABASE LAYER             │
                   │     (MongoDB + Mongoose)       │
                   │                                │
                   │  ├── Products Collection       │
                   │  ├── Proposals Collection      │
                   │  └── Logs Collection           │
                   │                                │
                   └────────────────────────────────┘
```

## 📊 Data Flow Diagram

### Category Generator Flow
```
User Input Form
      │
      ▼
Frontend Component (CategoryGenerator.jsx)
      │
      ├─► Form Validation
      │
      ▼
POST /api/generate-category
      │
      ▼
categoryController.generateCategory()
      │
      ├─► Input Validation
      │
      ▼
generateCategoryPrompt()
      │
      ▼
aiService.callOpenAI()
      │
      ├─► OpenAI API Call (gpt-3.5-turbo)
      │
      ├─► JSON Response Parsing
      │
      ▼
Response Validation
      │
      ├─► Check Structure
      ├─► Validate Fields
      │
      ▼
MongoDB Save (Product Model)
      │
      ├─► Save to Products Collection
      ├─► Log to Logs Collection
      │
      ▼
Response to Frontend (200)
      │
      ▼
Display Results in ResultCard Component
      │
      ▼
User Sees Classification
```

### Proposal Generator Flow
```
User Input Form
      │
      ▼
Frontend Component (ProposalGenerator.jsx)
      │
      ├─► Form Validation
      │
      ▼
POST /api/generate-proposal
      │
      ▼
proposalController.generateProposal()
      │
      ├─► Input Validation (budget > 0, etc)
      │
      ▼
getProposalPrompt()
      │
      ▼
aiService.callOpenAI()
      │
      ├─► OpenAI API Call (gpt-3.5-turbo)
      │
      ├─► JSON Response Parsing
      │
      ▼
Response Validation
      │
      ├─► Check Structure
      ├─► Verify Budget Compliance
      ├─► Validate Allocations
      │
      ▼
MongoDB Save (Proposal Model)
      │
      ├─► Save to Proposals Collection
      ├─► Log to Logs Collection
      │
      ▼
Response to Frontend (200)
      │
      ▼
Display Budget Breakdown in ResultCard
      │
      ▼
User Reviews Proposal
```

## 🔌 API Architecture

### Request/Response Flow

```
Client Browser
     │
     │ 1. HTTP Request
     │    (Method, Path, Headers, Body)
     ▼
Express Server
     │
     ├─► 2. Route Matching (/api/generate-category)
     │
     ├─► 3. Middleware Processing
     │       ├── CORS Check
     │       ├── JSON Parse
     │       ├── Error Handling
     │
     ├─► 4. Controller Handler
     │       ├── Input Validation
     │       ├── Business Logic
     │       ├── Service Calls
     │
     ├─► 5. Service Layer
     │       ├── AI API Calls
     │       ├── Response Parsing
     │       ├── Logging
     │
     ├─► 6. Data Access Layer
     │       ├── MongoDB Query
     │       ├── Document Save
     │
     ▼
Response Creation
     │
     ├─► 7. Construct JSON
     ├─► 8. Set Status Code
     ├─► 9. Set Headers
     │
     ▼
HTTP Response
     │
     │ 10. Response to Client
     │     (Status, Headers, Body)
     │
     ▼
Browser
     │
     ├─► Parse JSON
     ├─► Update DOM
     ├─► Display Results
```

## 🧩 Component Architecture

### Frontend Component Structure

```
App.jsx (Main Component)
├── useState (currentPage, etc)
├── renderPage()
│
├── Navbar.jsx
│   └── Navigation
│
└── Pages Router
    ├── HomePage
    │   └── Feature Cards
    │       ├── Category Card (→ CategoryGenerator)
    │       └── Proposal Card (→ ProposalGenerator)
    │
    ├── CategoryGenerator.jsx
    │   ├── State: formData, result, loading, error
    │   ├── Handlers: handleChange, handleSubmit
    │   ├── Form Input
    │   └── ResultCard
    │       └── Results Display
    │
    └── ProposalGenerator.jsx
        ├── State: formData, result, loading, error
        ├── Handlers: handleChange, handleSubmit
        ├── Form Input
        └── ResultCard
            └── Results Display

Helper Component:
└── ResultCard.jsx
    ├── Props: title, children, loading
    ├── Loading Spinner
    └── Content Display
```

### Backend Component Structure

```
server.js (Express App)
│
├── Middleware Setup
│   ├── CORS
│   ├── JSON Parser
│   ├── Error Handler
│
├── Database Connection
│   └── connectDB() from config/db.js
│
└── Routes Registration
    ├── categoryRoutes
    │   ├── POST /api/generate-category
    │   │   └── categoryController.generateCategory
    │   │       ├── Input Validation
    │       ├── Prompt Generation
    │       ├── AI Service Call
    │       ├── Data Persistence
    │       └── Response Formatting
    │   │
    │   └── GET /api/categories
    │       └── categoryController.getCategories
    │
    └── proposalRoutes
        ├── POST /api/generate-proposal
        │   └── proposalController.generateProposal
        │       ├── Input Validation
        │       ├── Prompt Generation
        │       ├── AI Service Call
        │       ├── Budget Validation
        │       ├── Data Persistence
        │       └── Response Formatting
        │
        └── GET /api/proposals
            └── proposalController.getProposals
```

## 🗄️ Database Schema Design

### Product Collection
```
Product {
  _id: ObjectId (Primary Key)
  product_name: String (Indexed)
  description: String (Text Index)
  primary_category: String (Indexed)
  sub_category: String
  seo_tags: [String] (Array Index)
  sustainability_filters: [String]
  createdAt: Date (Indexed)
  updatedAt: Date
}
```

**Indexes:**
- `product_name` - Fast search by name
- `primary_category` - Filter by category
- `createdAt` - Sort by creation date
- `description` - Full-text search

### Proposal Collection
```
Proposal {
  _id: ObjectId (Primary Key)
  business_type: String (Indexed)
  budget: Number (Range Index)
  event: String
  recommended_products: [String]
  budget_allocation: Object
  estimated_cost: Number
  impact_summary: String
  createdAt: Date (Indexed)
  updatedAt: Date
}
```

**Indexes:**
- `business_type` - Group by business type
- `budget` - Range queries
- `createdAt` - Sorting and archival

### Logs Collection
```
Logs {
  _id: ObjectId (Primary Key)
  module_name: String (Indexed, Enum)
  prompt: String
  response: Object
  status: String (Enum: success, error)
  error_message: String
  createdAt: Date (TTL Index - expires after 90 days)
  updatedAt: Date
}
```

**Indexes:**
- `module_name` - Filter by module
- `createdAt` - TTL Index for automatic deletion
- `status` - Find errors quickly

## 🔐 Security Architecture

### Authentication & Authorization
```
┌─────────────────┐
│  Client Request │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│ CORS Validation         │
│ (Allow localhost:5173)  │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Input Validation        │
│ (Sanitize & Validate)   │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Business Logic          │
│ (Execute securely)      │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Response Encryption     │
│ (HTTPS in production)   │
└─────────────────────────┘
```

### Environment Security
```
Production Secrets:
├── MONGO_URI (MongoDB Connection)
├── OPENAI_API_KEY (API Key)
├── NODE_ENV (Environment Flag)
└── PORT (Server Port)

Storage:
├── .env file (Local development)
├── Environment Variables (Production)
├── GitHub Secrets (CI/CD)
└── Secured .gitignore
```

## 🔄 Error Handling Architecture

```
Request
  │
  ├─► Validation Error
  │   └─► 400 Bad Request
  │
  ├─► Authentication Error
  │   └─► 401 Unauthorized
  │
  ├─► Authorization Error
  │   └─► 403 Forbidden
  │
  ├─► Not Found Error
  │   └─► 404 Not Found
  │
  ├─► AI API Error
  │   ├─► Log Error
  │   └─► 500 Internal Server Error
  │
  ├─► Database Error
  │   ├─► Log Error
  │   └─► 500 Internal Server Error
  │
  └─► Unexpected Error
      ├─► Log Stack Trace
      └─► 500 Internal Server Error
```

## 📝 Logging Architecture

```
Logging System
├── AI Module Logging
│   ├── Category Generator Logs
│   │   ├── Input: product_name, description
│   │   ├── Prompt: Generated prompt
│   │   ├── Response: AI JSON response
│   │   └── Metadata: timestamp, status
│   │
│   └── Proposal Generator Logs
│       ├── Input: business_type, budget, event
│       ├── Prompt: Generated prompt
│       ├── Response: AI JSON response
│       └── Metadata: timestamp, status
│
├── Error Logging
│   ├── API Errors (400, 500)
│   ├── Database Errors
│   ├── AI Service Errors
│   └── System Errors
│
└── Audit Logging
    ├── All Successful Generations
    ├── Failed Attempts
    ├── User Actions
    └── System Events
```

## 🚀 Deployment Architecture

### Local Development
```
Developer Machine
├── Backend (Port 5000)
│   ├── MongoDB Atlas (Cloud)
│   └── OpenAI API (Cloud)
│
└── Frontend (Port 5173/5174)
    └── Vite Dev Server
```

### Production Deployment
```
Domain: rayeva-ai.com

├── CDN (Cloudflare)
│   └── Cache Frontend Assets
│
├── Frontend (Vercel/Netlify)
│   ├── Static Files (dist/)
│   └── HTTPS Only
│
├── Backend (Heroku/Railway)
│   ├── Express Server
│   ├── Environment Variables
│   └── Health Checks
│
├── Database (MongoDB Atlas)
│   ├── Replica Set (HA)
│   ├── Regular Backups
│   └── Monitoring
│
└── External APIs
    └── OpenAI API (Secured)
```

## 📈 Scalability Strategy

### Horizontal Scaling
```
Load Balancer
├── Backend Instance 1
├── Backend Instance 2
├── Backend Instance 3
└── Backend Instance N

Shared Resources:
├── MongoDB Atlas (Cloud Database)
├── Redis Cache (Optional)
└── OpenAI API (External)
```

### Database Optimization
```
Optimization Strategies:
├── Indexes on frequent queries
├── Data archiving (old logs)
├── Connection pooling
├── Read replicas for scaling
├── Sharding (if data > 100GB)
└── Aggregation pipeline for reports
```

### Caching Strategy
```
Cache Layer (Optional Redis):
├── Category Results (1 hour TTL)
├── Proposal Templates (24 hour TTL)
├── API Responses (30 min TTL)
└── User Sessions (7 day TTL)
```

## 🔍 Monitoring & Observability

### Metrics to Track
```
Performance Metrics:
├── API Response Time (<200ms target)
├── Database Query Time (<50ms target)
├── OpenAI API Latency (<5s target)
└── Error Rate (<0.1% target)

Business Metrics:
├── Categories Generated (Daily)
├── Proposals Generated (Daily)
├── Average Cost per Request
└── User Engagement

System Metrics:
├── Server CPU Usage
├── Memory Usage
├── Database Connections
├── Disk Space
└── Network Bandwidth
```

### Alerting
```
Alert on:
├── API Error Rate > 5%
├── Database Connection Lost
├── OpenAI API Rate Limit Hit
├── Server Response Time > 1s
├── Disk Space < 10%
└── MongoDB Replica Set Issues
```

---

**Detailed technical architecture for production deployment** 🏗️
