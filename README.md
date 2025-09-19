# Tiny Webshop

A full-stack e-commerce web application built with React (frontend) and Node.js/TypeScript (backend) with PostgreSQL database. Includes authentication, and API testing via Postman.

# Features

1- User registration and login with JWT authentication

2- Browse products and view details

3- Add products to cart with stock validation

4- create, update, delete products (admin functionality-through postman)

# Tech Stack

1- Frontend: React, TypeScript, React Router

2- Backend: Node.js, TypeScript, Express

3- Database: PostgreSQL

4- Testing: Postman, Newman

# Environment Variables

  Create .env.example in the backend/ folder first. For example:

  `touch backend/.env.example`

  Then open it in your editor and add placeholder values:

    DB_USER=your_db_user
    DB_PASS=your_db_password
    DB_NAME=your_db_name
    DB_PORT=5432
    JWT_SECRET=your_jwt_secret
    
  Now you can safely copy it to `.env`:
  
  `cp backend/.env.example backend/.env`

  Edit backend/.env with your real credentials.


# Backend (Docker)

Run `cd backend` to navigate to the backend directory.

Run `docker compose up --build`

This will:

- Start a PostgreSQL container
- Start a backend server container
- Seed the database with products
- Automatically connect backend to the database via Docker networking

# Frontend (Without Docker)
Navigate to frontend folder:

- Run `cd frontend` to navigate to the frontend directory:

Install dependencies:

- Run `npm install`

Start frontend:

- Run `npm start`

# Frontend (Docker)
Navigate to frontend folder:

- Run `cd frontend` to navigate to the frontend directory:

- Run `docker compose up --build`

- Open a tab in your prowser and paste `http://localhost:3001/`

# Postman API Tests

Install Newman globally (if not already installed):

- `npm install -g newman`

- Run Postman collection in the backend directory:

  `npm run test:postman`

Ensure backend is running (via Docker) before running tests.





