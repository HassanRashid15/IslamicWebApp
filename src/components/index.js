// UI Components
export * from './ui';

// Layout Components
export { default as Navbar } from './layout/Navbar';
export { default as Footer } from './layout/Footer';

// Common Components
export { default as WelcomeModal } from './common/WelcomeModal';
export { default as ProtectedRoute } from './ProtectedRoute';

// Feature Components (for backward compatibility)
export { default as DailyAzkharModal } from '../features/azkhar/components/DailyAzkharModal';
export { default as DailyAzkharDisplay } from '../features/azkhar/components/DailyAzkharDisplay';
export { default as AzkharResetButton } from '../features/azkhar/components/AzkharResetButton';
export { default as PrayerTimings } from '../features/prayer/components/PrayerTimings';
export { default as HadithDisplay } from '../features/hadith/components/HadithDisplay';
export { default as HadithList } from '../features/hadith/components/HadithList';

// Legacy exports (for components still in root)
export { default as EidAnimations } from './EidAnimations';
export { default as InspirationSection } from './InspirationSection';
export { default as IslamicDateBackground } from './IslamicDateBackground';
export { default as IslamicNewsBlogs } from './IslamicNewsBlogs';
export { default as KidsZone } from './KidsZone';
export { default as MongoStats } from './MongoStats';
export { default as RamadanDuas } from './RamadanDuas';
export { default as SalahSteps } from './SalahSteps';

// Auth Components
export { default as Login } from '../features/auth/components/Login';
export { default as Register } from '../features/auth/components/Register';
export { default as ForgotPassword } from '../features/auth/components/ForgotPassword';
export { default as ResetPassword } from '../features/auth/components/ResetPassword';
export { default as VerifyEmail } from '../features/auth/components/VerifyEmail';
export { default as LoginForm } from '../features/auth/components/LoginForm';
export { default as RegisterForm } from '../features/auth/components/RegisterForm';
export { default as IslamicQuote } from '../features/auth/components/IslamicQuote';
