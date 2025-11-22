import type { VercelRequest, VercelResponse } from '@vercel/node';
import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import backend modules using require for Vercel compatibility
const path = require('path');

// Add backend to module path
const backendPath = path.join(__dirname, '../backend/src');
require('module')._initPaths();

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
let authRoutes: any;
let taskRoutes: any;

try {
  // Use dynamic import for routes
  const authRoutesPath = path.join(__dirname, '../backend/src/routes/authRoutes');
  const taskRoutesPath = path.join(__dirname, '../backend/src/routes/taskRoutes');
  
  delete require.cache[require.resolve(authRoutesPath)];
  delete require.cache[require.resolve(taskRoutesPath)];
  
  authRoutes = require(authRoutesPath).default;
  taskRoutes = require(taskRoutesPath).default;
} catch (error) {
  console.error('Error loading routes:', error);
}

// Routes
if (authRoutes) {
  app.use('/api', authRoutes);
}
if (taskRoutes) {
  app.use('/api/tasks', taskRoutes);
}

// Health check
app.get('/api/health', async (req: Request, res: Response) => {
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    await prisma.$queryRaw`SELECT 1`;
    await prisma.$disconnect();
    res.json({ status: 'OK', message: 'Server is running', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'ERROR', message: 'Database connection failed' });
  }
});

// Export for Vercel serverless
export default (req: VercelRequest, res: VercelResponse) => {
  return app(req, res);
};

