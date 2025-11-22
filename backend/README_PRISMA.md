# Prisma Setup Instructions

This project now uses Prisma ORM for database management.

## Initial Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Generate Prisma Client:**
   ```bash
   npm run prisma:generate
   ```
   This creates the Prisma Client based on your schema.

3. **Run database migrations:**
   ```bash
   npm run prisma:migrate
   ```
   This will:
   - Create the database tables if they don't exist
   - Create a migration file
   - Apply the migration to your database

   When prompted, give your migration a name (e.g., "init" or "initial_schema")

## Development Workflow

### After schema changes:

1. **Update `prisma/schema.prisma`** with your changes

2. **Create a migration:**
   ```bash
   npm run prisma:migrate
   ```

3. **Generate Prisma Client:**
   ```bash
   npm run prisma:generate
   ```
   (Note: This is automatically run in the `dev` script)

### Alternative: Push schema changes directly (for development only)

If you want to sync your schema without creating migration files:

```bash
npm run prisma:push
```

**Warning:** This is not recommended for production. Use migrations instead.

## Useful Commands

- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Create and apply migrations
- `npm run prisma:push` - Push schema changes directly (dev only)
- `npm run prisma:studio` - Open Prisma Studio (database GUI)

## Prisma Studio

Prisma Studio is a visual database browser. Run:

```bash
npm run prisma:studio
```

This opens a web interface at `http://localhost:5555` where you can view and edit your database records.

## Migration from Raw SQL

If you had an existing database with the old schema:

1. The Prisma migration will attempt to create the tables
2. If tables already exist, you may need to:
   - Drop existing tables (if you don't need the data)
   - Or manually migrate the data
   - Or use `prisma db pull` to introspect your existing database

## Environment Variables

Make sure your `.env` file has:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/taskmanager
```

The Prisma schema reads from this environment variable.

