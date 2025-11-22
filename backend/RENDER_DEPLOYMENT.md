# Render Deployment Guide

This guide will help you deploy the Task Manager Backend to Render.

## Prerequisites

1. A Render account (sign up at https://render.com)
2. A PostgreSQL database (can be created on Render)
3. Your frontend URL (for CORS configuration)

## Step 1: Create PostgreSQL Database on Render

1. Go to your Render Dashboard
2. Click "New +" → "PostgreSQL"
3. Configure:
   - **Name**: `task-manager-db` (or your preferred name)
   - **Database**: `taskmanager`
   - **User**: Auto-generated
   - **Region**: Choose closest to your users
4. Click "Create Database"
5. **Save the Internal Database URL** - you'll need this for the backend service

## Step 2: Create Web Service

1. In Render Dashboard, click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure the service:

### Basic Settings
- **Name**: `task-manager-backend`
- **Region**: Same as your database
- **Branch**: `main` (or your default branch)
- **Root Directory**: `backend`

### Build & Deploy
- **Environment**: `Node`
- **Build Command**: `npm install && npm run build && npx prisma migrate deploy`
- **Start Command**: `npm start`

### Environment Variables

Add these environment variables in the Render dashboard:

```
NODE_ENV=production
DATABASE_URL=<Your PostgreSQL Internal Database URL from Step 1>
JWT_SECRET=<Generate a strong random secret key>
JWT_EXPIRES_IN=7d
FRONTEND_URL=<Your frontend URL, e.g., https://your-frontend.onrender.com>
PORT=10000
```

**Important Notes:**
- Use the **Internal Database URL** (not external) for better performance
- Generate a strong `JWT_SECRET` (you can use: `openssl rand -base64 32`)
- Set `FRONTEND_URL` to your deployed frontend URL

## Step 3: Deploy

1. Click "Create Web Service"
2. Render will automatically:
   - Install dependencies
   - Build the TypeScript code
   - Run Prisma migrations
   - Start the server

## Step 4: Verify Deployment

1. Check the logs to ensure the server started successfully
2. Visit: `https://your-service.onrender.com/api/health`
3. You should see: `{"status":"OK","message":"Server is running","database":"connected"}`

## Step 5: Update Frontend

Update your frontend's API URL to point to your Render backend:
- Production API URL: `https://your-service.onrender.com/api`

## Troubleshooting

### Database Connection Issues
- Ensure you're using the **Internal Database URL** (not external)
- Check that the database is in the same region as your web service
- Verify the DATABASE_URL format: `postgresql://user:password@host:port/database`

### Build Failures
- Check that all dependencies are in `package.json`
- Ensure TypeScript compiles without errors
- Verify Prisma schema is valid

### Migration Issues
- If migrations fail, you can manually run: `npx prisma migrate deploy`
- Or use: `npx prisma db push` (for development only)

### CORS Issues
- Ensure `FRONTEND_URL` environment variable matches your frontend URL exactly
- Check that CORS is properly configured in `server.ts`

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-super-secret-key` |
| `JWT_EXPIRES_IN` | JWT token expiration | `7d` |
| `FRONTEND_URL` | Frontend application URL | `https://your-frontend.onrender.com` |
| `PORT` | Server port (Render sets this automatically) | `10000` |

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)
- [Node.js on Render](https://render.com/docs/node-version)

