const nodemailer = require("nodemailer");

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail",
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send verification code email
const sendVerificationCodeEmail = async (email, firstName, code) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || "Islamic App <noreply@islamicapp.com>",
      to: email,
      subject: "Email Verification Code - Islamic App",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #16a085 0%, #2980b9 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Islamic App</h1>
            <p style="color: #ecf0f1; margin: 10px 0 0 0;">Email Verification</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
            <h2 style="color: #2c3e50; margin-top: 0;">السلام عليكم ${firstName},</h2>
            
            <p>Thank you for registering with Islamic App. Please use the verification code below:</p>
            
            <div style="background: white; border: 2px solid #16a085; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
              <h3 style="margin: 0; color: #2c3e50;">Verification Code</h3>
              <div style="font-size: 32px; font-weight: bold; color: #16a085; letter-spacing: 3px; margin: 10px 0;">${code}</div>
              <p style="margin: 0; color: #7f8c8d; font-size: 14px;">This code expires in 15 minutes</p>
            </div>
            
            <p>If you didn't create an account, please ignore this email.</p>
            
            <div style="margin-top: 30px; padding: 20px; background: #e8f6f3; border-radius: 8px; text-align: center;">
              <p style="margin: 0; font-style: italic; color: #2c3e50;">
                <strong>وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا</strong><br>
                <span style="font-size: 14px;">"And whoever fears Allah - He will make for him a way out" - Quran 65:2</span>
              </p>
            </div>
          </div>
        </div>
      `,
      text: `السلام عليكم ${firstName}, Your Islamic App verification code is: ${code}. This code expires in 15 minutes.`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Verification code email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending verification code email:", error);
    return { success: false, error: error.message };
  }
};

// Send verification link email (backup method)
const sendVerificationLinkEmail = async (
  email,
  firstName,
  verificationLink
) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || "Islamic App <noreply@islamicapp.com>",
      to: email,
      subject: "Email Verification Link - Islamic App",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #16a085 0%, #2980b9 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Islamic App</h1>
            <p style="color: #ecf0f1; margin: 10px 0 0 0;">Email Verification</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
            <h2 style="color: #2c3e50; margin-top: 0;">السلام عليكم ${firstName},</h2>
            
            <p>Thank you for registering with Islamic App. Please click the button below to verify your email address:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationLink}" style="background: #16a085; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Verify Email Address</a>
            </div>
            
            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all; background: #ecf0f1; padding: 10px; border-radius: 5px; font-family: monospace;">${verificationLink}</p>
            
            <p>This link will expire in 24 hours.</p>
            
            <p>If you didn't create an account with Islamic App, please ignore this email.</p>
            
            <div style="margin-top: 30px; padding: 20px; background: #e8f6f3; border-radius: 8px; border-left: 4px solid #16a085;">
              <p style="margin: 0; font-style: italic; color: #2c3e50; text-align: center;">
                <strong>وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا</strong><br>
                <span style="font-size: 14px;">"And whoever fears Allah - He will make for him a way out" - Quran 65:2</span>
              </p>
            </div>
            
            <div style="margin-top: 20px; text-align: center; color: #7f8c8d; font-size: 12px;">
              <p>Islamic App - Your companion in faith</p>
              <p>This is an automated message, please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        السلام عليكم ${firstName},
        
        Thank you for registering with Islamic App.
        
        Please click the following link to verify your email address:
        ${verificationLink}
        
        This link will expire in 24 hours.
        
        If you didn't create an account with Islamic App, please ignore this email.
        
        Islamic App - Your companion in faith
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Verification link email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending verification link email:", error);
    return { success: false, error: error.message };
  }
};

// Send password reset email
const sendPasswordResetEmail = async (email, firstName, resetUrl) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || "Islamic App <noreply@islamicapp.com>",
      to: email,
      subject: "Password Reset Request - Islamic App",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #16a085 0%, #2980b9 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Islamic App</h1>
            <p style="color: #ecf0f1; margin: 10px 0 0 0;">Password Reset</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
            <h2 style="color: #2c3e50; margin-top: 0;">السلام عليكم ${firstName},</h2>
            
            <p>You have requested to reset your password for your Islamic App account.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background: #e74c3c; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password</a>
            </div>
            
            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all; background: #ecf0f1; padding: 10px; border-radius: 5px; font-family: monospace;">${resetUrl}</p>
            
            <p><strong>This link will expire in 10 minutes.</strong></p>
            
            <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
            
            <div style="margin-top: 30px; padding: 20px; background: #e8f6f3; border-radius: 8px; text-align: center;">
              <p style="margin: 0; font-style: italic; color: #2c3e50;">
                <strong>وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا</strong><br>
                <span style="font-size: 14px;">"And whoever fears Allah - He will make for him a way out" - Quran 65:2</span>
              </p>
            </div>
          </div>
        </div>
      `,
      text: `السلام عليكم ${firstName}, You have requested to reset your password. Please click the following link: ${resetUrl}. This link will expire in 10 minutes.`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return { success: false, error: error.message };
  }
};

// Test email configuration
const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log("✅ Email configuration is valid");
    return { success: true, message: "Email configuration is valid" };
  } catch (error) {
    console.error("❌ Email configuration error:", error.message);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendVerificationCodeEmail,
  sendVerificationLinkEmail,
  sendPasswordResetEmail,
  testEmailConfig,
};
