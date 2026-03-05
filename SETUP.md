# Quick Start Guide - Rayeva AI

Complete setup instructions for running the Rayeva AI project locally.

## ⚡ Prerequisites

Before starting, ensure you have:
- **Node.js** v16 or higher
- **npm** v8 or higher
- **MongoDB Atlas** account (free tier available at https://www.mongodb.com/cloud/atlas)
- **OpenAI API Key** (get at https://platform.openai.com/api-keys)

### Verify Installations

```bash
node --version
npm --version
```

## 📋 Step 1: MongoDB Setup

### 1.1 Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new project
4. Create a cluster (M0 free tier is sufficient)
5. Create a database user with password
6. Whitelist your IP address

### 1.2 Get Connection String
1. Click "Connect" on your cluster
2. Select "Connect your application"
3. Copy the connection string
4. Replace `<username>` and `<password>` with your credentials
5. Format: `mongodb+srv://username:password@cluster.mongodb.net/rayeva-ai?retryWrites=true&w=majority`

## 🔑 Step 2: OpenAI API Setup

### 2.1 Get API Key
1. Go to https://platform.openai.com/api-keys
2. Sign up or log in with your OpenAI account
3. Click "Create new secret key"
4. Copy the key (you won't see it again!)
5. Store it securely

### 2.2 Check API Limits
- Free trial: $5 credit (expires after 3 months)
- Verify your usage at https://platform.openai.com/account/usage/overview

## 🚀 Step 3: Project Installation

### 3.1 Clone or Extract Project
```bash
# If you have it as a zip
unzip rayeva-ai-assignment.zip
cd rayeva-ai-assignment
```

### 3.2 Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials
# On Windows (using NotePad or any editor)
# On Mac/Linux
nano .env
```

**Edit `.backend/.env`:**
```env
MONGO_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/rayeva-ai?retryWrites=true&w=majority
OPENAI_API_KEY=sk-your-api-key-here
PORT=5000
NODE_ENV=development
```

### 3.3 Frontend Setup

```bash
# Navigate to frontend (in new terminal/tab)
cd frontend

# Install dependencies
npm install
```

## ▶️ Step 4: Run the Project

### Terminal 1: Run Backend
```bash
cd backend
npm run dev
```

**Expected Output:**
```
[nodemon] restarting due to changes...
MongoDB connected successfully
Server running on port 5000
```

### Terminal 2: Run Frontend
```bash
cd frontend
npm run dev
```

**Expected Output:**
```
  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

## 🌐 Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

## ✅ Verification Checklist

Before using the application, verify:

- [ ] MongoDB is connected (check backend logs)
- [ ] OpenAI API key is valid
- [ ] Frontend loads at `http://localhost:5173`
- [ ] Backend is running on port 5000
- [ ] No console errors in either terminal

### Test Backend Health

```bash
curl http://localhost:5000/api/health
```

Should return:
```json
{
  "success": true,
  "message": "Backend is running"
}
```

## 🎯 First Test

### Test Category Generator

1. Go to http://localhost:5173
2. Click "Category & Tag Generator"
3. Fill in the form:
   - **Product Name:** `Organic Cotton T-Shirt`
   - **Description:** `100% organic cotton t-shirt, sustainably made, fair-trade certified`
4. Click "Generate Category"
5. You should see results within 5-10 seconds

### Test Proposal Generator

1. Go to http://localhost:5173
2. Click "B2B Proposal Generator"
3. Fill in the form:
   - **Business Type:** `Clothing Store`
   - **Budget:** `5000`
   - **Event:** `Eco-Friendly Collection Launch`
4. Click "Generate Proposal"
5. You should see a budget breakdown

## 🔧 Troubleshooting

### MongoDB Connection Error

**Problem:** `MongooseServerSelectionError: connection string error`

**Solutions:**
1. Verify connection string is correct (check for typos)
2. Check if IP is whitelisted in MongoDB Atlas
3. Verify username/password are correct
4. Ensure network access is enabled

```bash
# Test connection
mongo "mongodb+srv://your-username:your-password@your-cluster.mongodb.net/test"
```

### OpenAI API Error

**Problem:** `401 Unauthorized` or `Invalid API key`

**Solutions:**
1. Verify API key is copied correctly (no extra spaces)
2. Check if API key is valid at https://platform.openai.com/api-keys
3. Ensure you have API credits remaining
4. Check if API key has appropriate permissions

### Port Already in Use

**Problem:** `listen EADDRINUSE: address already in use :::5000`

**Solutions:**
1. Kill the process using that port:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   
   # Mac/Linux
   lsof -i :5000
   kill -9 <PID>
   ```
2. Use a different port:
   ```bash
   PORT=5001 npm run dev
   ```

### CORS Errors

**Problem:** `Access to XMLHttpRequest blocked by CORS policy`

**Solutions:**
1. Ensure backend is running on port 5000
2. Check CORS is enabled in `server.js`
3. Restart both servers

## 📦 Building for Production

### Build Frontend
```bash
cd frontend
npm run build
```

Output will be in `frontend/dist/` directory.

### Deploy Backend
1. Use a hosting service (Heroku, Railway, Render)
2. Set environment variables in the hosting platform
3. Deploy using git or CLI

## 🆘 Ask for Help

If you encounter issues:
1. Check all environment variables are set
2. Verify service credentials are correct
3. Check backend logs for errors
4. Check browser console for frontend errors
5. Review the main README.md for detailed documentation

## 📚 Next Steps

After successful setup:
1. Explore the Category Generator
2. Try the Proposal Generator
3. Check MongoDB Atlas to see stored data
4. Review the API responses
5. Read the architecture documentation

---

**Happy building! 🚀**
