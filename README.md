# Task Manager Dashboard - Full Stack Application

A secure, full-stack Task Manager application built with the MERN stack (MongoDB replaced with PostgreSQL) and TypeScript. The application features user authentication, task management, sorting, pagination, and a responsive UI.

## 🚀 Features

- **User Authentication**
  - User registration and login with JWT-based authentication
  - Secure password hashing using bcrypt
  - Protected API routes with authentication middleware
  - Token stored in localStorage (can be easily switched to HTTP-only cookies)

- **Task Management**
  - Create, read, update, and delete tasks
  - Task properties: title, description, priority (low/medium/high), end date
  - Visual highlighting of overdue tasks
  - Server-side pagination
  - Sorting by due date and priority (ascending/descending)

- **User Interface**
  - Clean, modern, and responsive design using Tailwind CSS
  - React Context API for global state management
  - Protected routes
  - Modal-based task creation/editing
  - Intuitive dashboard with sorting and pagination controls

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js with Express
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS

## 📁 Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts          # PostgreSQL connection and initialization
│   │   ├── controllers/
│   │   │   ├── authController.ts    # Authentication logic
│   │   │   └── taskController.ts    # Task CRUD operations
│   │   ├── middleware/
│   │   │   ├── auth.ts              # JWT authentication middleware
│   │   │   └── validation.ts        # Input validation rules
│   │   ├── models/
│   │   │   ├── User.ts              # User model and database operations
│   │   │   └── Task.ts              # Task model and database operations
│   │   ├── routes/
│   │   │   ├── authRoutes.ts        # Authentication routes
│   │   │   └── taskRoutes.ts        # Task routes
│   │   └── server.ts                # Express server setup
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProtectedRoute.tsx   # Route protection component
│   │   │   ├── TaskForm.tsx          # Task form component
│   │   │   ├── TaskList.tsx          # Task list display component
│   │   │   └── TaskModal.tsx         # Modal for task creation/editing
│   │   ├── context/
│   │   │   └── AuthContext.tsx       # Authentication context provider
│   │   ├── pages/
│   │   │   ├── Login.tsx             # Login page
│   │   │   ├── Register.tsx          # Registration page
│   │   │   └── Dashboard.tsx         # Main dashboard page
│   │   ├── services/
│   │   │   ├── authService.ts        # Authentication API calls
│   │   │   └── taskService.ts        # Task API calls
│   │   ├── types/
│   │   │   └── index.ts              # TypeScript type definitions
│   │   ├── App.tsx                   # Main app component with routing
│   │   ├── main.tsx                  # React entry point
│   │   └── index.css                 # Global styles
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
└── README.md
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  middle_name VARCHAR(255),
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  end_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env` (if it exists, or create a new `.env` file)
   - Update the following variables:
     ```env
     PORT=5000
     DATABASE_URL=postgresql://username:password@localhost:5432/taskmanager
     JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
     NODE_ENV=development
     ```

4. **Create PostgreSQL database:**
   ```bash
   # Connect to PostgreSQL
   psql -U postgres

   # Create database
   CREATE DATABASE taskmanager;

   # Exit psql
   \q
   ```

5. **Set up Prisma (ORM):**
   ```bash
   # Generate Prisma Client
   npm run prisma:generate

   # Create and run database migrations
   npm run prisma:migrate
   ```
   When prompted, give your migration a name (e.g., "init")

   **Note:** Prisma will automatically create all the necessary database tables based on the schema defined in `prisma/schema.prisma`.

6. **Run the backend server:**
   ```bash
   # Development mode (with hot reload)
   npm run dev

   # Production mode
   npm run build
   npm start
   ```

   The backend server will start on `http://localhost:5000` and automatically create the necessary database tables.

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables (optional):**
   - Create a `.env` file in the frontend directory:
     ```env
     VITE_API_URL=http://localhost:5000/api
     ```
   - If not set, it defaults to `http://localhost:5000/api`

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /api/register` - Register a new user
  - Body: `{ first_name: string, middle_name?: string, last_name: string, email: string, password: string }`
  - Returns: `{ message, token, user }`

- `POST /api/login` - Authenticate a user
  - Body: `{ email: string, password: string }`
  - Returns: `{ message, token, user }`

### Tasks (All require authentication)
- `GET /api/tasks` - Get user's tasks with pagination and sorting
  - Query params: `page`, `limit`, `sortBy` (end_date|priority), `sortOrder` (asc|desc)
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ tasks: Task[], pagination: {...} }`

- `POST /api/tasks` - Create a new task
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ title: string, description?: string, priority?: 'low'|'medium'|'high', end_date?: string }`
  - Returns: `{ message, task }`

- `PUT /api/tasks/:id` - Update a task
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ title?: string, description?: string, priority?: 'low'|'medium'|'high', end_date?: string }`
  - Returns: `{ message, task }`

- `DELETE /api/tasks/:id` - Delete a task
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ message }`

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. The token is stored in `localStorage` on the client side and sent with each request in the `Authorization` header as `Bearer <token>`.

**Note on Token Storage:**
- Currently using `localStorage` for simplicity and ease of implementation
- For production, consider using HTTP-only cookies for enhanced security against XSS attacks
- The current implementation can be easily modified to use cookies by updating the backend to set cookies and the frontend to handle cookie-based authentication

## 🎨 Features in Detail

### Task Management
- **Create Tasks**: Users can create tasks with title, description, priority, and end date
- **View Tasks**: Tasks are displayed in a paginated list with all relevant information
- **Update Tasks**: Users can edit any field of their tasks
- **Delete Tasks**: Users can delete tasks with a confirmation prompt
- **Overdue Highlighting**: Tasks past their end date are visually highlighted with a red border and "OVERDUE" badge

### Sorting
- Sort by **Due Date**: Ascending or descending order
- Sort by **Priority**: High → Medium → Low (or reverse)
- Sorting is performed server-side for efficiency

### Pagination
- Server-side pagination with configurable page size (default: 10 tasks per page)
- Navigation controls for moving between pages
- Displays current page and total pages

## 🚀 Deployment

### Backend Deployment (Render, Railway, etc.)

1. Set environment variables in your hosting platform:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `JWT_SECRET` - A strong secret key
   - `NODE_ENV` - Set to `production`
   - `PORT` - Usually provided by the platform

2. Run Prisma migrations: `npx prisma migrate deploy` (for production)
3. Build command: `npm run build`
4. Start command: `npm start`

### Frontend Deployment (Vercel, Netlify, etc.)

1. Set environment variable:
   - `VITE_API_URL` - Your backend API URL

2. Build command: `npm run build`
3. Output directory: `dist`

## 🧪 Testing the Application

1. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend server:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the application:**
   - Open `http://localhost:3000` in your browser
   - Register a new account
   - Login with your credentials
   - Create, view, edit, and delete tasks
   - Test sorting and pagination features

## 📝 Code Quality

- **TypeScript**: Full type safety across the application
- **Prisma ORM**: Type-safe database access with automatic migrations
- **Modular Structure**: Clear separation of concerns (controllers, models, routes, middleware)
- **Error Handling**: Comprehensive error handling with meaningful error messages
- **Input Validation**: Server-side validation using express-validator
- **Security**: Password hashing, JWT authentication, protected routes
- **Comments**: Code is well-documented where necessary

## 🔒 Security Considerations

- Passwords are hashed using bcrypt (10 rounds)
- JWT tokens expire after 7 days
- All task routes are protected by authentication middleware
- Users can only access their own tasks
- Input validation on all user inputs
- SQL injection protection through parameterized queries

## 📄 License

ISC

## 👤 Author

Built as a full-stack assignment demonstrating intermediate-level development capabilities.

---

**Note**: Make sure to change the `JWT_SECRET` in production to a strong, randomly generated secret key. Never commit `.env` files to version control.

