const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// API helper function
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Add authorization header if token exists
  const token = localStorage.getItem("token");
  if (token) {
    defaultOptions.headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    // Check if response is ok before trying to parse JSON
    if (!response.ok) {
      // Try to parse JSON error response
      let errorData;
      try {
        errorData = await response.json();
      } catch (parseError) {
        // If JSON parsing fails, use the response text
        const errorText = await response.text();
        console.error("Failed to parse error response as JSON:", parseError);
        console.error("Raw error response:", errorText);
        throw new Error(
          `HTTP ${response.status}: ${errorText || "Unknown error"}`
        );
      }
      throw new Error(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`
      );
    }

    // Try to parse successful response
    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      const responseText = await response.text();
      console.error("Failed to parse success response as JSON:", parseError);
      console.error("Raw success response:", responseText);
      throw new Error("Server returned invalid JSON response");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Auth API functions
export const authAPI = {
  // Register new user
  register: async (userData) => {
    const response = await apiCall("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    if (response.success && response.token) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
    }

    return response;
  },

  // Login user
  login: async (credentials) => {
    const response = await apiCall("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (response.success && response.token) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
    }

    return response;
  },

  // Get current user
  getMe: async () => {
    return await apiCall("/auth/me");
  },

  // Forgot password
  forgotPassword: async (email) => {
    return await apiCall("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  // Reset password
  resetPassword: async (token, password) => {
    return await apiCall(`/auth/reset-password/${token}`, {
      method: "PUT",
      body: JSON.stringify({ password }),
    });
  },

  // Logout user
  logout: async () => {
    try {
      await apiCall("/auth/logout");
    } catch (error) {
      // Continue with local logout even if API call fails
      console.warn("Logout API call failed:", error);
    } finally {
      // Always clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },

  // Verify email with token (link method)
  verifyEmail: async (token) => {
    return await apiCall(`/auth/verify-email/${token}`);
  },

  // Verify email with code
  verifyEmailCode: async (email, code) => {
    return await apiCall("/auth/verify-code", {
      method: "POST",
      body: JSON.stringify({ email, code }),
    });
  },

  // Resend verification code
  resendVerification: async (email) => {
    return await apiCall("/auth/resend-verification", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },
};

// Helper functions
export const authHelpers = {
  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem("token");
    return !!token;
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // Get token from localStorage
  getToken: () => {
    return localStorage.getItem("token");
  },

  // Clear auth data
  clearAuth: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};

// Protected Routes API functions
export const protectedAPI = {
  // Get user profile
  getUserProfile: async () => {
    return await apiCall("/protected/profile");
  },

  // Update user profile
  updateProfile: async (profileData) => {
    return await apiCall("/protected/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  },

  // Get dashboard data
  getDashboard: async () => {
    return await apiCall("/protected/dashboard");
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    return await apiCall("/protected/change-password", {
      method: "PUT",
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },
};

export default { authAPI, authHelpers, protectedAPI };
