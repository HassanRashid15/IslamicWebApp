import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import "./App.css";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import SurahDetail from "./pages/SurahDetail";
import HadithDisplay from "./components/HadithDisplay";
import HadithList from "./components/HadithList";

// Auth Pages
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import VerifyEmail from "./components/auth/VerifyEmail";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";

// Protected Pages
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

// Token redirect component for parametrized routes
const TokenRedirect = ({ newPath }) => {
  const { token } = useParams();
  return <Navigate to={`${newPath}/${token}`} replace />;
};

// Auth Route Wrapper - redirects authenticated users away from auth pages
const AuthRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Redirect immediately if already authenticated (no loading state for logged-in users)
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Show loading only for unauthenticated users during initial auth check
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/hadiths" element={<HadithDisplay />} />
              <Route path="/hadiths/:bookSlug" element={<HadithList />} />
              <Route
                path="/surah/:surahNumber/:translationEdition"
                element={<SurahDetail />}
              />

              {/* Redirect old /auth/* URLs to new structure */}
              <Route
                path="/auth/login"
                element={<Navigate to="/login" replace />}
              />
              <Route
                path="/auth/register"
                element={<Navigate to="/register" replace />}
              />
              <Route
                path="/auth/verify-email"
                element={<Navigate to="/verify-email" replace />}
              />
              <Route
                path="/auth/verify-email/:token"
                element={<TokenRedirect newPath="/verify-email" />}
              />
              <Route
                path="/auth/forgot-password"
                element={<Navigate to="/forgot-password" replace />}
              />
              <Route
                path="/auth/reset-password"
                element={<Navigate to="/reset-password" replace />}
              />

              {/* Authentication Routes - Updated without /auth/ prefix */}
              <Route
                path="/login"
                element={
                  <AuthRoute>
                    <Login />
                  </AuthRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <AuthRoute>
                    <Register />
                  </AuthRoute>
                }
              />
              <Route
                path="/verify-email"
                element={
                  <AuthRoute>
                    <VerifyEmail />
                  </AuthRoute>
                }
              />
              <Route
                path="/verify-email/:token"
                element={
                  <AuthRoute>
                    <VerifyEmail />
                  </AuthRoute>
                }
              />
              <Route
                path="/forgot-password"
                element={
                  <AuthRoute>
                    <ForgotPassword />
                  </AuthRoute>
                }
              />
              <Route
                path="/reset-password"
                element={
                  <AuthRoute>
                    <ResetPassword />
                  </AuthRoute>
                }
              />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
