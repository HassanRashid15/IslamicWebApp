import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    setLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // TODO: Replace with actual API call
      console.log("Login data:", formData);

      // TODO: Handle successful login (store token, redirect, etc.)
      navigate("/");
    } catch (err) {
      setError(err.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
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

        <LoginForm onSubmit={handleLogin} loading={loading} />

        {/* Islamic Quote */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <p className="text-gray-600 italic mb-2 font-arabic">
              "وَقُل رَّبِّ زِدْنِي عِلْمًا"
            </p>
            <p className="text-sm text-gray-500">
              "And say: My Lord, increase me in knowledge" - Quran 20:114
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
