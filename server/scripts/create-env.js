#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Function to create backend .env file
const createBackendEnv = () => {
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

  const envPath = path.join(__dirname, "..", ".env");

  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, backendEnv);
    console.log("✅ Created server/.env");
  } else {
    console.log("ℹ️  server/.env already exists");
  }
};

// Function to create frontend .env file
const createFrontendEnv = () => {
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

  const clientPath = path.join(__dirname, "..", "..", "client");
  const envPath = path.join(clientPath, ".env");

  if (fs.existsSync(clientPath)) {
    if (!fs.existsSync(envPath)) {
      fs.writeFileSync(envPath, frontendEnv);
      console.log("✅ Created client/.env");
    } else {
      console.log("ℹ️  client/.env already exists");
    }
  } else {
    console.log("⚠️  Client directory not found");
  }
};

// Main execution
console.log("🔧 Creating environment files...\n");

try {
  createBackendEnv();
  createFrontendEnv();

  console.log("\n✅ Environment setup complete!");
  console.log("\n📝 Next steps:");
  console.log(
    "1. Update EMAIL_USER and EMAIL_PASS in server/.env for email functionality"
  );
  console.log("2. Ensure MongoDB is running on mongodb://localhost:27017");
  console.log("3. Run 'npm install' in both server and client directories");
  console.log("4. Start development servers\n");
} catch (error) {
  console.error("❌ Failed to create environment files:", error.message);
  process.exit(1);
}
