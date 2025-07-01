const express = require("express");
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  logout,
  verifyEmail,
  verifyEmailCode,
  resendVerification,
} = require("../controllers/authController");

const { protect } = require("../middleware/auth");
const {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
} = require("../middleware/validation");

// Import email service for testing
const {
  sendVerificationCodeEmail,
  testEmailConfig,
} = require("../utils/emailService");

const router = express.Router();

// @route   POST /api/auth/test-email
// @desc    Test email configuration (development only)
// @access  Public
router.post("/test-email", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required for testing",
      });
    }

    console.log("🔧 Testing email configuration...");

    // First test the email configuration
    const configTest = await testEmailConfig();

    if (!configTest.success) {
      return res.json({
        success: false,
        message: "❌ Email configuration failed",
        details: configTest,
      });
    }

    console.log("✅ Email configuration is valid, sending test email...");

    const testCode = "123456";
    const result = await sendVerificationCodeEmail(
      email,
      "Test User",
      testCode
    );

    console.log("📧 Email test result:", result);

    res.json({
      success: result.success,
      message: result.success
        ? "✅ Test email sent successfully! Check your inbox."
        : "❌ Failed to send test email",
      details: result,
      configTest: configTest,
    });
  } catch (error) {
    console.error("❌ Email test error:", error);
    res.status(500).json({
      success: false,
      message: "Email test failed",
      error: error.message,
    });
  }
});

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", validateRegister, register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post("/login", validateLogin, login);

// @route   GET /api/auth/me
// @desc    Get current logged in user
// @access  Private
router.get("/me", protect, getMe);

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post("/forgot-password", validateForgotPassword, forgotPassword);

// @route   PUT /api/auth/reset-password/:resettoken
// @desc    Reset password
// @access  Public
router.put("/reset-password/:resettoken", validateResetPassword, resetPassword);

// @route   GET /api/auth/logout
// @desc    Logout user
// @access  Private
router.get("/logout", protect, logout);

// @route   GET /api/auth/verify-email/:token
// @desc    Verify email with token (link method)
// @access  Public
router.get("/verify-email/:token", verifyEmail);

// @route   POST /api/auth/verify-code
// @desc    Verify email with code
// @access  Public
router.post("/verify-code", verifyEmailCode);

// @route   POST /api/auth/resend-verification
// @desc    Resend verification code
// @access  Public
router.post("/resend-verification", resendVerification);

module.exports = router;
