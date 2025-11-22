# Quick Start: Deploy to Render

## 🚀 Fast Deployment Steps

### 1. Create PostgreSQL Database
- Render Dashboard → New + → PostgreSQL
- Save the **Internal Database URL**

### 2. Create Web Service
- Render Dashboard → New + → Web Service
- Connect your GitHub repo
- **Root Directory**: `backend`
- **Build Command**: `npm install && npm run build && npx prisma migrate deploy`

**Important**: Use `npm install` (not `npm ci`) to ensure all dependencies including type definitions are installed.
- **Start Command**: `npm start`

### 3. Set Environment Variables
```
NODE_ENV=production
DATABASE_URL=<Internal Database URL>
JWT_SECRET=<Generate with: openssl rand -base64 32>
JWT_EXPIRES_IN=7d
FRONTEND_URL=<Your frontend URL>
```

### 4. Deploy!
- Click "Create Web Service"
- Wait for build to complete
- Test: `https://your-service.onrender.com/api/health`

## ✅ Verification
Visit: `https://your-service.onrender.com/api/health`

Expected response:
```json
{
  "status": "OK",
  "message": "Server is running",
  "database": "connected"
}
```

## 📝 Notes
- Use **Internal Database URL** (not external) for better performance
- Render automatically sets `PORT` environment variable
- Database migrations run automatically during build

For detailed instructions, see `RENDER_DEPLOYMENT.md`

