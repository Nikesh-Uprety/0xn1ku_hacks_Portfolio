
# Nikesh Uprety - Cybersecurity Portfolio

A modern cybersecurity portfolio with hacker-themed UI and full-stack capabilities.

## Features

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Express.js + MongoDB + JWT Authentication
- **UI/UX**: Cyberpunk theme with animations
- **Security**: JWT-based authentication with encrypted secrets
- **Responsive**: Mobile-first design

## Quick Start

### Frontend Development
```bash
npm install
npm run dev
```

### Backend Development
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and secrets
npm run dev
```

## Project Structure

```
src/
├── components/          # React components
├── pages/              # Route pages
├── hooks/              # Custom hooks
└── utils/              # Utility functions

backend/
├── models/             # MongoDB models
├── server.js           # Express server
└── package.json        # Backend dependencies
```

## Environment Variables

### Backend (.env)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: JWT signing secret
- `ADMIN_PASSWORD`: Admin authentication password
- `PORT`: Server port (default: 5000)

## API Routes

### Public Routes
- `GET /api/blogs` - Get all blogs
- `GET /api/hacks` - Get all hacks  
- `GET /api/secret` - Get all secrets

### Protected Routes (require JWT)
- `POST|PUT|DELETE /api/blogs/*` - Blog CRUD operations
- `POST|PUT|DELETE /api/hacks/*` - Hack CRUD operations
- `POST|PUT|DELETE /api/secret/*` - Secret CRUD operations

## Security Features

- JWT-based authentication
- AES-256 encryption for sensitive data
- PBKDF2 key derivation
- Rate limiting (recommended for production)
- CORS protection

## Deployment

1. **Frontend**: Deploy to Vercel/Netlify
2. **Backend**: Deploy to Railway/Heroku
3. **Database**: Use MongoDB Atlas

## Technologies

- React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- Express.js + MongoDB
- JWT Authentication
- Crypto-js for encryption
