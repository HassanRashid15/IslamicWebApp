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
import { PrayerProvider } from "./contexts/PrayerContext";
import { IslamicDateProvider } from "./contexts/IslamicDateContext";
import { AzkharProvider } from "./contexts/AzkharContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar, Footer, WelcomeModal, ProtectedRoute, PrayerTimings, HadithDisplay, HadithList, Login, Register, VerifyEmail, ForgotPassword, ResetPassword } from "./components";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import SurahDetail from "./pages/SurahDetail";
import QuranDisplay from "./pages/HolyBookDisplay";

// Protected Pages
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

// Kids Zone Pages
import ArabicAlphabet from "./pages/kids/ArabicAlphabet";
import DailyDuas from "./pages/kids/DailyDuas";
import ProphetStories from "./pages/kids/ProphetStories";
import FivePillars from "./pages/kids/FivePillars";
import ShortSurahs from "./pages/kids/ShortSurahs";
import IslamicGames from "./pages/kids/IslamicGames";

// Blog Pages
import BlogPage from "./pages/BlogPage";
import ArticleDetail from "./pages/ArticleDetail";
import BlogsPage from "./pages/BlogsPage";

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
      <AzkharProvider>
        <PrayerProvider>
          <IslamicDateProvider>
            <Router>
              <div className="min-h-screen flex flex-col">
                <WelcomeModal />
                <ToastContainer position="top-right" autoClose={5000} />
                <Navbar />
                <main className="flex-grow">
                <Routes>
                  {/* ... existing routes ... */}
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
                  <Route
                    path="/quran/:translation"
                    element={<QuranDisplay />}
                  />

                  {/* Blog Routes */}
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blogs" element={<BlogsPage />} />
                  <Route 
                    path="/article/:id/:category" 
                    element={<ArticleDetail />} 
                  />

                  {/* Kids Zone Routes */}
                  <Route path="/kids/alphabet" element={<ArabicAlphabet />} />
                  <Route path="/kids/duas" element={<DailyDuas />} />
                  <Route path="/kids/stories" element={<ProphetStories />} />
                  <Route path="/kids/pillars" element={<FivePillars />} />
                  <Route path="/kids/surahs" element={<ShortSurahs />} />
                  <Route path="/kids/games" element={<IslamicGames />} />

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

                  {/* Authentication Routes */}
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
        </IslamicDateProvider>
      </PrayerProvider>
    </AzkharProvider>
  </AuthProvider>
);
}

export default App;
