import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import SurahDetail from "./pages/SurahDetail";
import HadithDisplay from "./components/HadithDisplay";
import HadithList from "./components/HadithList";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
