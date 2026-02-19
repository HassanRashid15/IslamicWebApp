// Environment configuration with fallbacks
const config = {
  // Server
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",

  // Database
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/islamic-app",

  // JWT
  JWT_SECRET:
    process.env.JWT_SECRET || "your-fallback-secret-key-change-in-production",
  JWT_EXPIRE: process.env.JWT_EXPIRE || "7d",
  JWT_RESET_EXPIRE: process.env.JWT_RESET_EXPIRE || "10m",
  JWT_COOKIE_EXPIRE: process.env.JWT_COOKIE_EXPIRE || 30,

  // Client
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",

  // Email (for production use)
  EMAIL_SERVICE: process.env.EMAIL_SERVICE || "gmail",
  EMAIL_USER: process.env.EMAIL_USER || "",
  EMAIL_PASS: process.env.EMAIL_PASS || "",
  EMAIL_FROM: process.env.EMAIL_FROM || "Islamic App <noreply@islamicapp.com>",

  // Security
  BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS) || 12,
};

// Validation
if (config.NODE_ENV === "production") {
  const requiredVars = ["JWT_SECRET", "MONGODB_URI"];
  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error(
      "❌ Missing required environment variables:",
      missingVars.join(", ")
    );
    console.error("Please check your .env file");
    process.exit(1);
  }
}

module.exports = config;
