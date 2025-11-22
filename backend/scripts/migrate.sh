#!/bin/bash
# Migration script for Render deployment
echo "Running Prisma migrations..."
npx prisma migrate deploy
echo "Migrations completed!"

