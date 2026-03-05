# Rayeva AI - Eco-Commerce AI Solutions

A production-ready, full-stack AI-powered platform for sustainable e-commerce. This system implements two complete AI modules and provides architecture for two additional modules.

## 📋 Project Overview

Rayeva AI is an intelligent ecosystem designed to help eco-commerce businesses leverage artificial intelligence for product categorization, B2B proposal generation, environmental impact analysis, and customer support automation.

**Key Features:**
- ✅ AI Category & Tag Generator - Automatically classify products with sustainability filters
- ✅ AI B2B Proposal Generator - Create customized business proposals
- 📋 AI Impact Reporting Generator (Architecture provided)
- 💬 AI WhatsApp Support Bot (Architecture provided)

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **OpenAI API** - AI/ML engine
- **dotenv** - Environment management

### Frontend
- **React 18** - UI library
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Modern JavaScript (ES6+)** - Latest JavaScript standards

### Infrastructure
- **npm** - Package manager
- **REST API** - Communication protocol
- **JSON** - Data format

## 📁 Project Structure

```
rayeva-ai-assignment/
│
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   ├── Product.js            # Product schema
│   │   ├── Proposal.js           # B2B Proposal schema
│   │   └── Logs.js               # AI logging schema
│   ├── services/
│   │   └── aiService.js          # OpenAI API integration
│   ├── controllers/
│   │   ├── categoryController.js # Category generation logic
│   │   └── proposalController.js # Proposal generation logic
│   ├── routes/
│   │   ├── categoryRoutes.js     # Category endpoints
│   │   └── proposalRoutes.js     # Proposal endpoints
│   ├── prompts/
│   │   ├── categoryPrompt.js     # Category prompt templates
│   │   └── proposalPrompt.js     # Proposal prompt templates
│   ├── server.js                 # Express server
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation component
│   │   │   └── ResultCard.jsx    # Results display component
│   │   ├── pages/
│   │   │   ├── CategoryGenerator.jsx  # Category page
│   │   │   └── ProposalGenerator.jsx  # Proposal page
│   │   ├── App.jsx               # Main app component
│   │   ├── App.css               # App styles
│   │   ├── index.css             # Global styles
│   │   ├── main.jsx              # Entry point
│   ├── public/                   # Static assets
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   └── .gitignore
│
└── README.md                     # This file
```

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Layer (React)                    │
│  ┌──────────────────────┬──────────────────────┐            │
│  │  Category Generator  │  Proposal Generator  │            │
│  └──────────────────────┴──────────────────────┘            │
└────────────────────────────┬─────────────────────────────────┘
                             │ HTTP/AJAX
┌────────────────────────────▼─────────────────────────────────┐
│                    API Layer (Express.js)                     │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  POST /api/generate-category                            │ │
│  │  POST /api/generate-proposal                            │ │
│  │  GET  /api/categories                                   │ │
│  │  GET  /api/proposals                                    │ │
│  └─────────────────────────────────────────────────────────┘ │
└────────────┬─────────────────────────┬──────────────────────┘
             │                         │
      ┌──────▼────────┐        ┌──────▼─────────┐
      │ AI Service    │        │ Controllers    │
      │ (OpenAI API)  │        │ (Business Logic)
      └──────┬────────┘        └──────┬─────────┘
             │                        │
      ┌──────▼──────────────────────▼───────┐
      │    Data Layer (MongoDB)              │
      │  ┌───────────┐──────────┐──────┐    │
      │  │ Products  │Proposals │ Logs │    │
      │  └───────────┴──────────┴──────┘    │
      └─────────────────────────────────────┘
```

## 📡 API Endpoints

### Category Generator Endpoints

#### POST /api/generate-category
Generate category and tags for a product.

**Request:**
```json
{
  "product_name": "Reusable Bamboo Toothbrush",
  "description": "Eco-friendly bamboo toothbrush with biodegradable bristles"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Category generated successfully",
  "data": {
    "primary_category": "Personal Care",
    "sub_category": "Dental Care",
    "seo_tags": ["bamboo", "toothbrush", "eco-friendly", "sustainable", "biodegradable"],
    "sustainability_filters": ["vegan", "biodegradable", "eco-friendly", "zero-waste"]
  }
}
```

#### GET /api/categories
Retrieve all generated product categories.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "product_name": "...",
      "description": "...",
      "primary_category": "...",
      "sub_category": "...",
      "seo_tags": [...],
      "sustainability_filters": [...],
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Proposal Generator Endpoints

#### POST /api/generate-proposal
Generate B2B proposal with product recommendations.

**Request:**
```json
{
  "business_type": "Retail Store",
  "budget": 5000,
  "event": "Product Launch Event"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Proposal generated successfully",
  "data": {
    "recommended_products": ["Eco Bags", "Sustainable Packaging", "Green Filters", "Recycled Materials"],
    "budget_allocation": {
      "Eco Bags": 1200,
      "Sustainable Packaging": 1500,
      "Green Filters": 1000,
      "Recycled Materials": 800
    },
    "estimated_cost": 4500,
    "impact_summary": "This proposal leverages sustainable products to reduce environmental impact..."
  }
}
```

#### GET /api/proposals
Retrieve all generated proposals.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "business_type": "...",
      "budget": 5000,
      "event": "...",
      "recommended_products": [...],
      "budget_allocation": {...},
      "estimated_cost": 4500,
      "impact_summary": "...",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

## 🤖 AI Module Design

### 1. Category & Tag Generator

**Purpose:** Automatically classify e-commerce products with semantic analysis

**AI Engine:**
- Model: GPT-3.5-turbo
- Temperature: 0.7 (balanced creativity and consistency)
- Max Tokens: 1000

**Prompt Design:**
```
You are an expert eco-commerce product classifier. Analyze the product and return ONLY valid JSON with:
- primary_category: Main product category
- sub_category: Specific subcategory
- seo_tags: Array of 5 SEO-friendly keywords
- sustainability_filters: Array of eco-friendly attributes
```

**Output Validation:**
- Checks for valid JSON structure
- Validates required fields
- Ensures arrays are properly formatted

### 2. B2B Proposal Generator

**Purpose:** Create customized business proposals with budget allocation

**AI Engine:**
- Model: GPT-3.5-turbo
- Temperature: 0.7
- Max Tokens: 1000

**Prompt Design:**
```
Generate a sustainable B2B proposal based on:
- Business Type
- Available Budget
- Event/Purpose

Return ONLY valid JSON with:
- recommended_products: Array of 4 products
- budget_allocation: Object with product costs
- estimated_cost: Total cost number
- impact_summary: Environmental impact description
```

**Output Validation:**
- Checks JSON structure
- Validates budget doesn't exceed limit (with 10% flexibility)
- Ensures budget allocation sums correctly

### 3. AI Impact Reporting Generator (Architecture)

**Overview:**
Generates comprehensive environmental impact reports analyzing:
- Carbon footprint calculations
- Waste reduction metrics
- Water savings analysis
- Sustainability score
- Recommendations for improvement

**Architecture:**
```
Frontend: Impact Report Page
    ↓
Controllers: impactController.js
    ↓
Services: aiService.js (calls OpenAI)
    ↓
Prompts: impactPrompt.js
    ↓
Models: ImpactReport.js (MongoDB)
```

**Database Schema:**
```javascript
{
  product_ids: [String],
  date_range: {
    start: Date,
    end: Date
  },
  carbon_footprint: Number,
  waste_reduction: Number,
  water_savings: Number,
  sustainability_score: Number,
  recommendations: [String],
  report_data: Object
}
```

### 4. WhatsApp Support Bot (Architecture)

**Overview:**
Intelligent customer support bot integrated with WhatsApp for:
- Product queries
- Order tracking
- Sustainability tips
- Eco-recommendations

**Architecture:**
```
WhatsApp API (Twilio Integration)
    ↓
Express Webhook (/webhook/whatsapp)
    ↓
Controllers: whatsappController.js
    ↓
Services: aiService.js + messageProcessor.js
    ↓
Database: Conversation.js, UserProfile.js
```

**Database Schemas:**
```javascript
// UserProfile
{
  whatsapp_number: String,
  name: String,
  preferences: Object,
  conversation_history: [ObjectId]
}

// Conversation
{
  user_id: ObjectId,
  messages: [{
    type: String,      // 'user' or 'bot'
    content: String,
    timestamp: Date
  }],
  context: Object
}
```

## 🔐 Security & Environment Management

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/rayeva-ai

# OpenAI
OPENAI_API_KEY=sk-...

# Server
PORT=5000
NODE_ENV=development

# Frontend (VITE_)
VITE_API_URL=http://localhost:5000/api
```

**Security Best Practices:**
- Never commit `.env` files
- Use environment-specific keys
- Rotate API keys regularly
- Use MongoDB Atlas with IP whitelisting
- Implement rate limiting on API endpoints
- Validate all inputs
- Use CORS carefully

## 📦 Setup Instructions

### Prerequisites
- Node.js 16+ and npm 8+
- MongoDB Atlas account (free tier available)
- OpenAI API key
- Git

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create environment file:**
```bash
cp .env.example .env
```

4. **Configure `.env` with your credentials:**
```env
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
PORT=5000
```

5. **Start development server:**
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

### Full Project Setup

**One-command setup (from root directory):**
```bash
# Backend
cd backend && npm install && npm run dev &

# Frontend (in new terminal)
cd frontend && npm install && npm run dev
```

## 🎯 Demo Instructions

### Category Generator Demo

1. Navigate to `http://localhost:5173`
2. Click on "Category & Tag Generator"
3. Enter a product name: `Eco-Friendly Bamboo Cutlery Set`
4. Enter description: `Completely biodegradable cutlery set made from sustainable bamboo. Perfect for picnics, travel, and eco-conscious dining. Includes fork, knife, and spoon.`
5. Click "Generate Category"
6. View results with:
   - Primary Category
   - Sub Category
   - SEO Tags
   - Sustainability Filters

### Proposal Generator Demo

1. Navigate to `http://localhost:5173`
2. Click on "B2B Proposal Generator"
3. Fill in the form:
   - **Business Type:** `Corporate Office`
   - **Budget:** `10000`
   - **Event:** `Sustainability Initiative Launch`
4. Click "Generate Proposal"
5. View results with:
   - Recommended Products
   - Budget Allocation Breakdown
   - Total Estimated Cost
   - Environmental Impact Summary

## 📊 Database Schemas

### Product Schema
```javascript
{
  _id: ObjectId,
  product_name: String,
  description: String,
  primary_category: String,
  sub_category: String,
  seo_tags: [String],
  sustainability_filters: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Proposal Schema
```javascript
{
  _id: ObjectId,
  business_type: String,
  budget: Number,
  event: String,
  recommended_products: [String],
  budget_allocation: Object,
  estimated_cost: Number,
  impact_summary: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Logs Schema
```javascript
{
  _id: ObjectId,
  module_name: String,  // 'category_generator' | 'proposal_generator'
  prompt: String,
  response: Object,
  status: String,       // 'success' | 'error'
  error_message: String,
  createdAt: Date,
  updatedAt: Date
}
```

## ✅ Error Handling

The system implements comprehensive error handling:

### API Error Responses

**400 - Bad Request:**
```json
{
  "success": false,
  "message": "Product name and description are required"
}
```

**500 - Server Error:**
```json
{
  "success": false,
  "message": "Failed to generate category"
}
```

### Frontend Error Handling
- Try/catch blocks in all API calls
- User-friendly error messages
- Automatic error logging
- Graceful degradation

## 🧪 Testing the APIs

### Using cURL

**Category Generator:**
```bash
curl -X POST http://localhost:5000/api/generate-category \
  -H "Content-Type: application/json" \
  -d '{
    "product_name": "Reusable Water Bottle",
    "description": "Stainless steel water bottle, BPA-free, eco-friendly"
  }'
```

**Proposal Generator:**
```bash
curl -X POST http://localhost:5000/api/generate-proposal \
  -H "Content-Type: application/json" \
  -d '{
    "business_type": "Coffee Shop",
    "budget": 3000,
    "event": "Go Green Initiative"
  }'
```

### Using Postman

1. Import these endpoints in Postman
2. Set request method to POST
3. Add JSON body from examples above
4. Send request and view response

## 📈 Scalability Considerations

### Database Optimization
- Add indexes on frequently queried fields
- Implement pagination for large datasets
- Archive old logs monthly
- Use MongoDB aggregation for reports

### API Performance
- Implement caching with Redis
- Use connection pooling
- Add rate limiting (express-rate-limit)
- Implement pagination for GET endpoints

### Frontend Performance
- Lazy load components
- Code splitting with Vite
- Image optimization
- Service workers for offline support

## 🔄 Prompt Engineering Best Practices

### Temperature Settings
- `0.0 - 0.3`: Deterministic (factual responses)
- `0.4 - 0.7`: Balanced (used in our modules)
- `0.8 - 1.0`: Creative (for content generation)

### Token Management
- Category Generator: Max 1000 tokens
- Proposal Generator: Max 1000 tokens
- Monitor token usage for cost optimization

### Prompt Versioning
Keep prompts in separate files for easy A/B testing and iteration:
- `/prompts/categoryPrompt.js`
- `/prompts/proposalPrompt.js`

## 📝 Logging & Monitoring

### What Gets Logged
- All AI prompts and responses
- API request/response times
- Errors and exceptions
- User actions (in production)

### Access Logs
View in MongoDB:
```javascript
db.logs.find({ module_name: 'category_generator' })
db.logs.find({ status: 'error' })
```

## 🚀 Production Deployment

### Backend Deployment (Heroku/Railway)
```bash
# Add Procfile
echo "web: node server.js" > Procfile

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)
```bash
# Build
npm run build

# Deploy built files from dist/
```

### Environment Setup
- Use production endpoints
- Enable HTTPS only
- Set NODE_ENV=production
- Use managed MongoDB Atlas
- Configure CORS for production domain

## 📚 API Documentation

Full API documentation available at:
- **Backend Health Check:** `GET /api/health`
- **Category Endpoints:** See API Endpoints section
- **Proposal Endpoints:** See API Endpoints section

## 🤝 Contributing

1. Create a feature branch
2. Make changes following the code structure
3. Test thoroughly
4. Submit pull request

## 📄 License

This project is provided as-is for the Rayeva AI Systems Assignment.

## 🔗 Useful Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Express.js Guide](https://expressjs.com)
- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 📞 Support

For issues or questions:
1. Check the error logs in MongoDB
2. Review the prompt design section
3. Verify API keys are correct
4. Ensure MongoDB is connected

---

**Built with ❤️ for sustainable e-commerce innovation**
