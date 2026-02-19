import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-emerald-950 text-white pt-20 pb-10 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full opacity-5 pointer-events-none">
        <svg width="100%" height="100" viewBox="0 0 1440 100" fill="none">
          <path d="M0 0H1440V100C1440 100 1080 30 720 30C360 30 0 100 0 100V0Z" fill="white" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="heading-font text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-gold" style={{ color: '#d4af37' }}>Islamic</span> App
            </h3>
            <p className="body-font text-emerald-100/70 text-lg max-w-md leading-relaxed mb-8">
              Your faithful companion for daily Islamic life. Providing authentic resources,
              sacred knowledge, and a peaceful user experience for Muslims worldwide.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-emerald-800 flex items-center justify-center hover:bg-emerald-800 transition-colors pointer-events-none">
                <span className="text-xs">FB</span>
              </div>
              <div className="w-10 h-10 rounded-full border border-emerald-800 flex items-center justify-center hover:bg-emerald-800 transition-colors pointer-events-none">
                <span className="text-xs">TW</span>
              </div>
              <div className="w-10 h-10 rounded-full border border-emerald-800 flex items-center justify-center hover:bg-emerald-800 transition-colors pointer-events-none">
                <span className="text-xs">IG</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="heading-font text-lg font-bold mb-6 text-gold" style={{ color: '#d4af37' }}>Quick Links</h4>
            <ul className="space-y-4 text-emerald-100/60 body-font">
              <li><Link to="/" className="hover:text-white transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/hadiths" className="hover:text-white transition-colors">Hadith Library</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="heading-font text-lg font-bold mb-6 text-gold" style={{ color: '#d4af37' }}>Resources</h4>
            <ul className="space-y-4 text-emerald-100/60 body-font">
              <li><Link to="/kids/duas" className="hover:text-white transition-colors">Kids Zone</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">User Dashboard</Link></li>
              <li><button className="text-left hover:text-white transition-colors pointer-events-none">Privacy Policy</button></li>
              <li><button className="text-left hover:text-white transition-colors pointer-events-none">Terms of Service</button></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-emerald-900 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-emerald-100/30">
          <p>© {new Date().getFullYear()} Islamic Web App. All rights reserved.</p>
          <p>Made with ❤️ for the Ummah</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
