# Production Deployment Guide - Rayeva AI

Complete guide for deploying Rayeva AI to production environments.

## 🚀 Deployment Overview

```
Development
    │
    ├─► Staging (Optional)
    │
    └─► Production
        ├── Frontend (Vercel/Netlify)
        ├── Backend (Heroku/Railway/Render)
        ├── Database (MongoDB Atlas)
        └── External APIs (OpenAI)
```

## 📋 Pre-Deployment Checklist

- [ ] All tests passing
- [ ] No console errors in dev
- [ ] Environment variables configured
- [ ] Database migrations completed
- [ ] API endpoints tested
- [ ] Frontend builds successfully
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Error logging setup

## 🌐 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend for Production

```bash
cd frontend

# Build the project
npm run build

# Verify dist folder is created
ls dist/
```

### Step 2: Connect to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Select project settings and deploy
```

### Step 3: Configure Environment Variables

In Vercel Dashboard:
1. Go to Project Settings
2. Navigate to Environment Variables
3. Add variables:
   ```
   VITE_API_URL=https://rayeva-backend.herokuapp.com/api
   ```

### Step 4: Configure Deployment Settings

**vercel.json:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_API_URL": "@vite_api_url"
  }
}
```

### Deployment Link
- Your app will be at: `https://your-project-name.vercel.app`

## 🖥️ Backend Deployment (Heroku)

### Step 1: Create Heroku Account

1. Go to https://www.heroku.com
2. Create account
3. Verify email

### Step 2: Install Heroku CLI

```bash
# Windows
choco install heroku-cli

# Mac
brew tap heroku/brew && brew install heroku

# Verify
heroku --version
```

### Step 3: Deploy Backend

```bash
cd backend

# Login to Heroku
heroku login

# Create new app
heroku create rayeva-ai-backend

# Set environment variables
heroku config:set MONGO_URI=your_mongodb_uri
heroku config:set OPENAI_API_KEY=your_openai_key
heroku config:set NODE_ENV=production

# Create Procfile
echo "web: node server.js" > Procfile

# Add and commit
git add .
git commit -m "Prepare for deployment"

# Deploy
git push heroku main
```

### Step 4: Verify Deployment

```bash
# View logs
heroku logs --tail

# Visit app
heroku open /api/health

# Should return: {"success": true, "message": "Backend is running"}
```

### Alternative: Deployment on Railway.app

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initiate project
railway init

# Create service
railway add

# Set environment variables
railway variables

# Deploy
railway up
```

## 📊 MongoDB Atlas Configuration

### Step 1: Create Production Database

1. Go to MongoDB Atlas (https://www.mongodb.com/cloud/atlas)
2. Create new project
3. Create M10+ cluster (for production)
4. Enable backup
5. Set up auto-pausing (optional)

### Step 2: Security Setup

```
IP Whitelisting:
├── Add all backend IPs
├── Add 0.0.0.0/0 for dynamic IPs (less secure but convenient)
└── Monitor with Atlas alerts

Database Users:
├── Create production user with strong password
├── Separate read-only user for analytics
├── Rotate keys quarterly
└── Use network access policies
```

### Step 3: Backups and Recovery

```
Backup Strategy:
├── Enable continuous backups
├── Weekly snapshots to separate location
├── Test restore procedures monthly
├── Keep 30-day backup retention
└── Document recovery procedures
```

## 🔐 Security Configuration

### HTTPS Enforcement

```javascript
// In server.js
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}
```

### CORS Configuration for Production

```javascript
// In server.js
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'https://yourfrontend.com',
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
```

### Environment Variables

**Production .env:**
```env
# Database
MONGO_URI=mongodb+srv://prod_user:secure_password@prod-cluster.mongodb.net/rayeva-ai-prod

# OpenAI
OPENAI_API_KEY=sk-prod-api-key

# Server
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://rayeva-ai.vercel.app

# Monitoring (optional)
SENTRY_DSN=your-sentry-dsn
LOGGLY_TOKEN=your-loggly-token
```

## 📈 Performance Optimization

### Frontend Optimization

```bash
# Analyze bundle
npm install -g webpack-bundle-analyzer

# Build with analysis
npm run build --analyze

# Expected bundle size: < 100KB (gzipped)
```

### Backend Optimization

```javascript
// Add compression
const compression = require('compression');
app.use(compression());

// Add caching headers
app.use((req, res, next) => {
  if (req.path.includes('.')) {
    res.set('Cache-Control', 'public, max-age=31536000');
  } else {
    res.set('Cache-Control', 'public, max-age=60');
  }
  next();
});
```

### Database Optimization

```javascript
// Create indexes for production
db.products.createIndex({ product_name: 1, primary_category: 1 });
db.proposals.createIndex({ business_type: 1, createdAt: -1 });
db.logs.createIndex({ createdAt: 1 }, { expireAfterSeconds: 7776000 });
```

## 🔍 Monitoring and Logging

### Setup Error Tracking (Sentry)

```bash
# Install Sentry
npm install @sentry/node

# Initialize in server.js
const Sentry = require("@sentry/node");

Sentry.init({ 
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});

app.use(Sentry.Handlers.errorHandler());
```

### Setup Application Monitoring

```javascript
// Track important metrics
const startTime = Date.now();

app.post('/api/generate-category', (req, res, next) => {
  const requestTime = Date.now();
  
  try {
    // ... your code
    const duration = Date.now() - requestTime;
    
    // Log metrics
    console.log(`Category generation took ${duration}ms`);
    
  } catch (error) {
    console.error('Error:', error);
    next(error);
  }
});
```

### Health Check Monitoring

```bash
# External monitoring service
# Add to UptimeRobot or similar:
- Check: https://rayeva-backend.herokuapp.com/api/health
- Interval: 5 minutes
- Alert on failure
```

## 🚨 Incident Response Plan

### If Backend Goes Down

1. **Check Service Status**
   ```bash
   heroku status
   heroku logs --tail
   ```

2. **Restart Dyno**
   ```bash
   heroku restart
   ```

3. **Check Database Connection**
   ```bash
   heroku config | grep MONGO_URI
   mongo "mongodb+srv://..." --eval "db.adminCommand('ping')"
   ```

4. **Roll Back Recent Changes**
   ```bash
   heroku releases
   heroku rollback v123
   ```

### If Database Goes Down

1. **Check MongoDB Status**
   - Go to Atlas dashboard
   - Check replica set status
   - Check metrics

2. **Restore from Backup**
   - Go to Backups in MongoDB Atlas
   - Select latest backup
   - Restore to specific timestamp

3. **Notify Users**
   - Add status banner
   - Post update on status page

## 📊 Monitoring Dashboard

### Key Metrics to Track

```
Frontend:
- Page Load Time
- First Contentful Paint (FCP)
- Time to Interactive (TTI)
- Error Rate

Backend:
- API Response Time (target: < 200ms)
- Error Rate (target: < 0.1%)
- Database Query Time (target: < 50ms)
- OpenAI API Latency (target: < 5s)

Database:
- Connection Count
- Query Performance
- Replication Lag
- Disk Usage

Cost:
- OpenAI API Usage
- MongoDB Data Transfer
- App Hosting Cost
```

### Tools for Monitoring

```
Option 1: Free
├── New Relic (free tier)
├── DataDog (free tier)
└── Loggly (free tier)

Option 2: Paid
├── Datadog Pro ($15+/month)
├── New Relic Pro ($100+/month)
└── Sentry Pro ($29+/month)

Option 3: DIY
├── Prometheus + Grafana
├── ELK Stack
└── Custom logging service
```

## 🔄 Continuous Deployment

### GitHub Actions Workflow

**.github/workflows/deploy.yml:**
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy Backend
        run: |
          git push heroku main
      
      - name: Deploy Frontend
        run: |
          npm install -g vercel
          cd frontend
          vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

## 📝 Post-Deployment Testing

### Test Critical Paths

```bash
# Test 1: Backend is running
curl https://rayeva-backend.herokuapp.com/api/health

# Test 2: Category generation
curl -X POST https://rayeva-backend.herokuapp.com/api/generate-category \
  -H "Content-Type: application/json" \
  -d '{"product_name":"Test","description":"Test product"}'

# Test 3: Frontend loads
curl https://rayeva-ai.vercel.app
```

### Smoke Testing

1. Open frontend URL
2. Test category generator
3. Test proposal generator
4. Check database has records
5. Verify logs are created

## 🔄 Rollback Procedures

### Rollback Backend

```bash
# View releases
heroku releases

# Rollback to previous version
heroku rollback v123

# Verify
heroku open /api/health
```

### Rollback Frontend

1. Go to Vercel Dashboard
2. Navigate to Deployments
3. Click the previous stable deployment
4. Click "Promote to Production"

## 📋 Deployment Checklist

Before going live:
- [ ] All tests pass
- [ ] Environment variables set
- [ ] Database backed up
- [ ] Monitoring configured
- [ ] Error tracking enabled
- [ ] HTTPS enforced
- [ ] CORS configured correctly
- [ ] Rate limiting enabled
- [ ] API health check working
- [ ] Database connection verified
- [ ] API keys rotated
- [ ] Documentation updated
- [ ] Status page setup
- [ ] Support team trained
- [ ] Incident response plan ready

## 📞 Support Resources

### Deployment Issues

- **Heroku:** https://help.heroku.com
- **Vercel:** https://vercel.com/docs
- **MongoDB Atlas:** https://docs.mongodb.com/atlas
- **OpenAI:** https://platform.openai.com/docs

### Monitoring & Alerting

- **Sentry:** https://sentry.io/
- **New Relic:** https://newrelic.com/
- **DataDog:** https://www.datadoghq.com/
- **UptimeRobot:** https://uptimerobot.com/

---

**Production deployment for maximum reliability** 🚀
