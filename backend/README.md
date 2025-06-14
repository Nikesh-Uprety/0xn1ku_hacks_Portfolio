
# Nikesh Portfolio Backend API

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
```bash
cp .env.example .env
```
Edit `.env` file with your actual values:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT signing
- `ADMIN_PASSWORD`: Admin authentication password

### 3. Start MongoDB
Make sure MongoDB is running locally or use MongoDB Atlas.

### 4. Run the Server
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with password

### Blogs
- `GET /api/blogs` - Get all blogs (public)
- `POST /api/blogs` - Create blog (auth required)
- `PUT /api/blogs/:id` - Update blog (auth required)
- `DELETE /api/blogs/:id` - Delete blog (auth required)

### Hacks
- `GET /api/hacks` - Get all hacks (public)
- `POST /api/hacks` - Create hack (auth required)
- `PUT /api/hacks/:id` - Update hack (auth required)
- `DELETE /api/hacks/:id` - Delete hack (auth required)

### Secrets
- `GET /api/secret` - Get all secrets (public)
- `POST /api/secret` - Create secret (auth required)
- `PUT /api/secret/:id` - Update secret (auth required)
- `DELETE /api/secret/:id` - Delete secret (auth required)

## Authentication
Include JWT token in Authorization header:
```
Authorization: Bearer your-jwt-token
```

## Models

### Blog
- title (required)
- content (required)
- author (default: "Nikesh Uprety")
- tags (array)
- published (boolean)

### Hack
- title (required)
- description (required)
- category (Web/Network/Mobile/Crypto/Forensics/Misc)
- difficulty (Easy/Medium/Hard/Expert)
- tools (array)
- code (string)
- solution (string)

### Secret
- title (required)
- content (required)
- classification (TOP SECRET/SECRET/CONFIDENTIAL/RESTRICTED)
- accessLevel (1-5)
- encrypted (boolean)
