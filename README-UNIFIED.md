# Islamic Web App - Unified Structure

This project now runs both frontend and backend from a single folder on localhost:3000.

## Project Structure

```
islamic-web-app/
├── build/                 # React production build
├── config/               # Server configuration
├── controllers/          # API controllers
├── middleware/           # Express middleware
├── models/              # Database models
├── routes/              # API routes
├── scripts/             # Utility scripts
├── src/                 # React source code
├── utils/               # Server utilities
├── public/              # React public files
├── server.js            # Main server file
├── package.json         # Unified dependencies
└── .env                 # Environment variables
```

## Available Scripts

### Development
```bash
npm run dev              # Run both server and client in development
npm run dev:server       # Run only server with nodemon
npm run dev:client       # Run only React development server
```

### Production
```bash
npm run build            # Build React app for production
npm start                # Run production server (serves React build)
```

### Other
```bash
npm test                 # Run React tests
npm run setup            # Setup database and environment
```

## Environment Variables

Create a `.env` file with:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/islamic-app
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:3000
```

## How It Works

1. **Development Mode**: 
   - React dev server runs on port 3000
   - API server runs on a different port
   - API calls are proxied to the server

2. **Production Mode**:
   - Single Node.js server on port 3000
   - Serves React build files statically
   - Handles API routes with `/api` prefix
   - All other routes serve the React app

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /quran/*` - Quran API routes

## Benefits

- Single deployment target
- Simplified development workflow
- Reduced configuration complexity
- Better performance in production
