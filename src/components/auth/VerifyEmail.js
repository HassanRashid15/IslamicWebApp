import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import IslamicQuote from "./IslamicQuote";
import { authAPI } from "../../services/api";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [verified, setVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [codeLoading, setCodeLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useParams();
  const email = location.state?.email || "";

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  // Check if there's a token in URL and verify automatically
  useEffect(() => {
    if (token) {
      handleVerifyToken();
    }
  }, [token]);

  const handleVerifyToken = async () => {
    setVerifying(true);
    setError("");
    setMessage("");

    try {
      const response = await authAPI.verifyEmail(token);

      if (response.success) {
        setVerified(true);
        setMessage(response.message);

        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/login", {
            state: { message: "Email verified successfully! Please login." },
          });
        }, 3000);
      } else {
        setError(response.message || "Verification failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setVerifying(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!verificationCode || verificationCode.length !== 6) {
      setError("Please enter a valid 6-digit verification code");
      return;
    }

    setCodeLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await authAPI.verifyEmailCode(email, verificationCode);

      if (response.success) {
        setVerified(true);
        setMessage(response.message);

        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/login", {
            state: { message: "Email verified successfully! Please login." },
          });
        }, 3000);
      } else {
        setError(response.message || "Verification failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setCodeLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await authAPI.resendVerification(email);

      if (response.success) {
        setMessage("Verification code sent successfully!");
        setTimeLeft(60);
        setCanResend(false);
      } else {
        setError(response.message || "Failed to resend verification email");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to resend verification email"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Islamic Quote at the top */}
        <IslamicQuote />

        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                verifying
                  ? "bg-yellow-100"
                  : verified
                  ? "bg-green-100"
                  : "bg-blue-100"
              }`}
            >
              {verifying ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
              ) : verified ? (
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {verifying
                ? "Verifying Email..."
                : verified
                ? "Email Verified!"
                : "Verify Your Email"}
            </h2>
            {!token && (
              <>
                <p className="text-gray-600">
                  We've sent a verification link to
                </p>
                <p className="text-green-600 font-medium">{email}</p>
              </>
            )}
            {verified && (
              <p className="text-gray-600">Redirecting to login page...</p>
            )}
          </div>

          {/* Messages */}
          {message && (
            <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {message}
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            </div>
          )}

          {/* Content */}
          {!verified && (
            <div className="space-y-6">
              {!token && (
                <>
                  <div className="text-center mb-6">
                    <p className="text-gray-600 mb-2">
                      We've sent a 6-digit verification code to your email.
                    </p>
                    <p className="text-sm text-gray-500">
                      Enter the code below to verify your account.
                    </p>
                  </div>

                  {/* Verification Code Form */}
                  <form onSubmit={handleVerifyCode} className="mb-6">
                    <div className="mb-4">
                      <label
                        htmlFor="verificationCode"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Verification Code
                      </label>
                      <input
                        type="text"
                        id="verificationCode"
                        value={verificationCode}
                        onChange={(e) =>
                          setVerificationCode(
                            e.target.value.replace(/[^0-9]/g, "").slice(0, 6)
                          )
                        }
                        placeholder="Enter 6-digit code"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-center text-lg font-mono tracking-widest"
                        maxLength={6}
                        disabled={codeLoading}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={
                        !verificationCode ||
                        verificationCode.length !== 6 ||
                        codeLoading
                      }
                      className={`w-full py-3 px-4 rounded-lg font-medium transition duration-200 ${
                        !verificationCode ||
                        verificationCode.length !== 6 ||
                        codeLoading
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700 text-white focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      }`}
                    >
                      {codeLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Verifying...
                        </div>
                      ) : (
                        "Verify Email"
                      )}
                    </button>
                  </form>

                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-500">
                      Didn't receive the code? Check your spam folder or request
                      a new one.
                    </p>
                  </div>

                  {/* Resend Button */}
                  <button
                    onClick={handleResendEmail}
                    disabled={!canResend || loading}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition duration-200 ${
                      !canResend || loading
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </div>
                    ) : !canResend ? (
                      `Resend in ${timeLeft}s`
                    ) : (
                      "Resend Verification Code"
                    )}
                  </button>
                </>
              )}

              {/* Back to Login */}
              <div className="text-center">
                <Link
                  to="/login"
                  className="text-green-600 hover:text-green-500 font-medium transition duration-200"
                >
                  ← Back to Login
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Islamic Quote */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <p className="text-gray-600 italic mb-2 font-arabic text-lg">
              وَبَشِّرِ الصَّابِرِينَ
            </p>
            <p className="text-sm text-gray-500">
              "And give good tidings to the patient" - Quran 2:155
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
