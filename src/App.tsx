import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Achievements from './components/sections/Achievements';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import { X } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(true);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-dark-500">
        <div className="text-center">
          <div className="terminal inline-block text-left p-6 min-w-80">
            <p className="terminal-line">initializing portfolio...</p>
            <p className="terminal-line mt-2">loading dependencies...</p>
            <p className="terminal-line mt-2">deploying application<span className="animate-terminal-cursor">_</span></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {showBanner && (
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 px-4 text-center relative">
          <p className="text-sm">
            Looking for DevOps & Cloud expertise? Contact me at{' '}
            <a href="mailto:abad.naseerfast@gmail.com" className="underline font-medium">
              abad.naseerfast@gmail.com
            </a>
          </p>
          <button 
            onClick={() => setShowBanner(false)} 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white"
            aria-label="Close banner"
          >
            <X size={16} />
          </button>
        </div>
      )}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;