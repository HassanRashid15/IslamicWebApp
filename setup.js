const fs = require("fs");
const path = require("path");

// Create backend .env file
const createBackendEnvFile = () => {
  const backendEnv = `# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration  
MONGODB_URI=mongodb://localhost:27017/islamic-app

# JWT Configuration
JWT_SECRET=islamic-app-secret-key-${Date.now()}
JWT_EXPIRE=7d

# Client URL (Frontend)
CLIENT_URL=http://localhost:3000

# Email Configuration (Gmail SMTP)
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=Islamic App <noreply@islamicapp.com>

# Security
BCRYPT_ROUNDS=12

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# Session Configuration
SESSION_SECRET=islamic-app-session-secret-${Date.now()}
`;

  const envPath = path.join(__dirname, ".env");

  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, backendEnv);
    console.log("✅ Created backend .env file");
  } else {
    console.log("ℹ️  Backend .env file already exists");
  }
};

// Create frontend .env file
const createFrontendEnvFile = () => {
  const frontendEnv = `# React App Configuration
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_APP_NAME=Islamic App
REACT_APP_VERSION=1.0.0

# Development Configuration
GENERATE_SOURCEMAP=true
REACT_APP_ENV=development

# API Endpoints
REACT_APP_AUTH_ENDPOINT=/auth
REACT_APP_PROTECTED_ENDPOINT=/protected

# Features
REACT_APP_ENABLE_NOTIFICATIONS=true
REACT_APP_ENABLE_ANALYTICS=false

# Theme Configuration
REACT_APP_PRIMARY_COLOR=green
REACT_APP_SECONDARY_COLOR=blue
`;

  const clientPath = path.join(__dirname, "..", "client");
  const envPath = path.join(clientPath, ".env");

  // Check if client directory exists
  if (fs.existsSync(clientPath)) {
    if (!fs.existsSync(envPath)) {
      fs.writeFileSync(envPath, frontendEnv);
      console.log("✅ Created frontend .env file");
    } else {
      console.log("ℹ️  Frontend .env file already exists");
    }
  } else {
    console.log(
      "⚠️  Client directory not found, skipping frontend .env creation"
    );
  }
};

// Setup script
const setup = () => {
  console.log("🚀 Setting up Islamic App (Full Stack)...\n");

  try {
    // Create environment files
    console.log("📁 Creating environment files...");
    createBackendEnvFile();
    createFrontendEnvFile();

    console.log("\n📋 Setup complete! Next steps:");
    console.log("1. Make sure MongoDB is running");
    console.log("2. Install backend dependencies: npm install");
    console.log(
      "3. Install frontend dependencies: cd ../client && npm install"
    );
    console.log(
      "4. Start backend server: npm run dev (runs on http://localhost:5000)"
    );
    console.log(
      "5. Start frontend server: cd ../client && npm start (runs on http://localhost:3000)\n"
    );

    console.log("🔗 Backend API Endpoints:");
    console.log("- POST /api/auth/register - Register user");
    console.log("- POST /api/auth/login - Login user");
    console.log("- GET /api/auth/me - Get current user");
    console.log("- GET /api/auth/verify-email/:token - Verify email");
    console.log("- POST /api/auth/resend-verification - Resend verification");
    console.log("- POST /api/auth/forgot-password - Forgot password");
    console.log("- PUT /api/auth/reset-password/:token - Reset password");
    console.log("- GET /api/auth/logout - Logout user");
    console.log("- GET /api/protected/profile - Get user profile");
    console.log("- PUT /api/protected/profile - Update user profile");
    console.log("- GET /api/protected/dashboard - Get dashboard data");
    console.log("- PUT /api/protected/change-password - Change password");
    console.log("- GET /api/health - Health check\n");

    console.log("🌐 Frontend Routes:");
    console.log("- / - Home page");
    console.log("- /auth/login - Login page");
    console.log("- /auth/register - Registration page");
    console.log("- /auth/verify-email - Email verification page");
    console.log("- /auth/forgot-password - Forgot password page");
    console.log("- /auth/reset-password - Reset password page");
    console.log("- /dashboard - User dashboard (protected)");
    console.log("- /profile - User profile (protected)\n");

    console.log("⚙️  Environment Files Created:");
    console.log("- server/.env - Backend configuration");
    console.log("- client/.env - Frontend configuration\n");

    console.log("📧 Email Setup (Optional):");
    console.log("- Update EMAIL_USER and EMAIL_PASS in server/.env");
    console.log("- For Gmail: Use App Password instead of regular password");
    console.log(
      "- Enable 2FA and generate App Password in Google Account settings\n"
    );
  } catch (error) {
    console.error("❌ Setup failed:", error.message);
  }
};

setup();
