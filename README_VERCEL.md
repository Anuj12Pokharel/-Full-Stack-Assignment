# Quick Vercel Deployment Guide

## Quick Start

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Login:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel
```

4. **Set Environment Variables in Vercel Dashboard:**
   - Go to your project settings
   - Add these variables:
     - `DATABASE_URL` - Your PostgreSQL connection string
     - `JWT_SECRET` - A random secret string
     - `FRONTEND_URL` - Your Vercel app URL (e.g., https://your-app.vercel.app)

5. **Run Database Migrations:**
```bash
cd backend
npx prisma migrate deploy
```

## Important Notes

- The frontend will be deployed as a static site
- The backend API runs as serverless functions in `/api`
- Make sure your database allows connections from Vercel
- Use connection pooling for better performance

## Project Structure

```
├── frontend/     # React app (deployed as static site)
├── backend/      # Express API (runs as serverless functions)
├── api/          # Vercel serverless function entry point
└── vercel.json   # Vercel configuration
```

For detailed instructions, see `VERCEL_DEPLOYMENT.md`

