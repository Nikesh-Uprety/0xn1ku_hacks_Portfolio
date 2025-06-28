
# Nikesh Uprety - Cybersecurity Portfolio

A modern cybersecurity portfolio with hacker-themed UI and full-stack capabilities.

## Features

- **Frontend**: React + TypeScript + Tailwind CSS
- **Security**: JWT-based authentication with encrypted secrets
- **Responsive**: Mobile-first design

## Quick Start

### Frontend Development
```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/          # React components
├── pages/              # Route pages
├── hooks/              # Custom hooks
└── utils/              # Utility functions

```

## Environment Variables


## API Routes

### Public Routes
- `GET /blogs` - Get all blogs
- `GET /hacks` - Get all hacks  
- `GET /secret` - Get all secrets
- `GET /admin` - admin page
- `GET /tools` - Get all tools


## Security Features

- JWT-based authentication
- AES-256 encryption for sensitive data
- PBKDF2 key derivation
- Rate limiting (recommended for production)
- CORS protection



## Technologies

- React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase for Backend
- JWT Authentication
- Crypto-js for encryption
