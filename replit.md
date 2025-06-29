# Portfolio Website with Node.js & React

## Overview

This is a full-stack portfolio website built with a React frontend and Express.js backend. The application features a cybersecurity-themed design with hacker aesthetic elements, including blogs, tools, hacks resources, and an admin panel. It uses modern web technologies including Vite for development, Tailwind CSS for styling, and shadcn/ui for components.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with hot module replacement
- **Styling**: Tailwind CSS with custom cyberpunk/hacker theme
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **State Management**: React Query for server state, React Context for auth
- **Routing**: React Router for client-side navigation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Development**: tsx for TypeScript execution in development
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Authentication**: Supabase for user authentication and session management

### Build System
- **Frontend**: Vite bundler with React plugin
- **Backend**: esbuild for production bundling
- **TypeScript**: Shared types between client and server via `shared/` directory
- **Development**: Concurrent frontend and backend development with Vite middleware

## Key Components

### Client-Side Components
- **Portfolio Sections**: Hero, About, Skills, Projects, Contact
- **Interactive Elements**: Matrix rain animation, custom cursor, floating navigation
- **Admin Interface**: Dashboard for content management (blogs, hacks, secrets)
- **Security Tools**: URL encoder/decoder, Base64 converter, cipher tools
- **Hacker Aesthetics**: Terminal-style components, cyberpunk color scheme

### Server-Side Components
- **API Routes**: RESTful endpoints prefixed with `/api`
- **Storage Layer**: Abstracted storage interface with in-memory implementation
- **Authentication**: Integrated with Supabase auth system
- **Development Server**: Vite integration for seamless development experience

## Data Flow

1. **Client Requests**: React components make API calls using React Query
2. **API Layer**: Express routes handle requests and interact with storage
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **Authentication**: Supabase handles user sessions and auth state
5. **Real-time Updates**: React Query manages cache invalidation and updates

## External Dependencies

### Core Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **Authentication**: Supabase (user management and auth)
- **Form Handling**: Formcarry for contact form submissions
- **UI Framework**: Radix UI primitives for accessible components

### Development Tools
- **Replit Integration**: Cartographer plugin for Replit environment
- **Error Handling**: Runtime error overlay for development
- **TypeScript**: Strict type checking across the entire stack

### Security Libraries
- **Crypto**: CryptoJS for client-side encryption in secret management
- **Validation**: Zod for runtime type validation with Drizzle

## Deployment Strategy

### Development
- Run `npm run dev` to start both frontend and backend in development mode
- Vite handles frontend with HMR
- tsx runs the Express server with TypeScript support
- Database migrations via `npm run db:push`

### Production Build
1. `npm run build` creates optimized frontend build and bundles backend
2. Frontend assets built to `dist/public`
3. Backend bundled to `dist/index.js` with esbuild
4. `npm start` runs the production server

### Environment Setup
- Requires `DATABASE_URL` environment variable for PostgreSQL connection
- Optional Supabase credentials for authentication features
- Fallback to in-memory storage when database is not configured

## Changelog
- June 29, 2025. Initial setup and Lovable to Replit migration
- June 29, 2025. Created terminal-aesthetic admin login page
- June 29, 2025. Completely redesigned admin dashboard with cyberpunk theme
- June 29, 2025. Fixed CRUD operations for all content types (blogs, hacks, secrets, projects)
- June 29, 2025. Updated all pages to use Supabase database instead of static data

## User Preferences

Preferred communication style: Simple, everyday language.