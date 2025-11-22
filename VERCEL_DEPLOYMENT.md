# Vercel Deployment Guide

This guide will help you deploy the TaskMaster application to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. A PostgreSQL database (recommended: Vercel Postgres, Supabase, or Railway)
3. Node.js installed locally (for testing)

## Step 1: Prepare Your Database

1. Set up a PostgreSQL database:
   - **Vercel Postgres**: Available in Vercel dashboard
   - **Supabase**: https://supabase.com (free tier available)
   - **Railway**: https://railway.app (free tier available)

2. Get your database connection string (DATABASE_URL)

## Step 2: Set Up Environment Variables

In your Vercel project dashboard, add these environment variables:

### Required Environment Variables:

```
DATABASE_URL=postgresql://user:password@host:port/database?schema=public
JWT_SECRET=your-super-secret-jwt-key-here
FRONTEND_URL=https://your-app.vercel.app
```

### Optional Environment Variables:

```
PORT=5000
NODE_ENV=production
```

## Step 3: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Navigate to your project root:
```bash
cd "C:\Users\hp\Desktop\Blys Assignment Full Stack"
```

4. Deploy:
```bash
vercel
```

5. Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? (Select your account)
   - Link to existing project? **No**
   - Project name? (Enter a name or press Enter for default)
   - Directory? **./frontend**
   - Override settings? **No**

6. For production deployment:
```bash
vercel --prod
```

### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "Add New Project"
3. Import your Git repository (GitHub, GitLab, or Bitbucket)
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variables (see Step 2)
6. Click "Deploy"

## Step 4: Configure API Routes

Since Vercel uses serverless functions, you need to:

1. The API routes are configured in `api/index.ts`
2. Make sure your frontend API URL points to `/api` (relative path)

## Step 5: Run Database Migrations

After deployment, run Prisma migrations:

1. Connect to your database
2. Run migrations:
```bash
cd backend
npx prisma migrate deploy
```

Or use Prisma Studio:
```bash
npx prisma studio
```

## Step 6: Update Frontend API URL

The frontend should automatically use relative paths (`/api`) when deployed. If you need to override:

1. In Vercel dashboard, add environment variable:
```
VITE_API_URL=/api
```

## Troubleshooting

### Database Connection Issues

- Verify DATABASE_URL is correct
- Check if your database allows connections from Vercel IPs
- Ensure SSL is enabled if required

### Build Errors

- Check that all dependencies are in package.json
- Verify Node.js version (Vercel uses Node 18+ by default)
- Check build logs in Vercel dashboard

### API Routes Not Working

- Verify `api/index.ts` exists
- Check Vercel function logs
- Ensure routes are properly configured in vercel.json

## Project Structure for Vercel

```
project-root/
├── frontend/          # Frontend React app
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── backend/           # Backend Express app
│   ├── src/
│   ├── prisma/
│   └── package.json
├── api/               # Vercel serverless functions
│   └── index.ts
├── vercel.json        # Vercel configuration
└── .vercelignore      # Files to ignore
```

## Additional Notes

- Vercel has a free tier with generous limits
- Serverless functions have a 10-second timeout on free tier
- Database connections should use connection pooling
- Consider using Prisma Data Proxy for better performance

## Support

For issues:
1. Check Vercel deployment logs
2. Check function logs in Vercel dashboard
3. Verify environment variables are set correctly
4. Test API endpoints using Vercel's function logs

