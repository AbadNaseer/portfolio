import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X, Server, Download } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Experience', to: 'experience' },
    { name: 'Projects', to: 'projects' },
    { name: 'Achievements', to: 'achievements' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-400/95 backdrop-blur-sm py-3 shadow-lg shadow-black/10' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <Link
          to="hero"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Server className="text-primary-500" size={24} />
          <span className="font-bold text-xl">Abad<span className="gradient-text">Naseer</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              className="nav-link font-medium cursor-pointer"
              activeClass="active"
            >
              {link.name}
            </Link>
          ))}
          <a 
            href="/resume-abad.pdf" 
            className="btn-primary flex items-center gap-2"
            download="Abad-Naseer-Resume.pdf"
            onClick={(e) => {
              // Remove the preventDefault and alert, letting the natural download happen
            }}
          >
            <Download size={18} />
            Resume
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none z-[101]"
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-dark-500/95 backdrop-blur-sm z-[100] transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="h-full flex flex-col">
          <div className="container-custom py-4 border-b border-slate-800">
            <div className="flex justify-between items-center">
              <Link
                to="hero"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className="flex items-center gap-2 cursor-pointer"
                onClick={closeMenu}
              >
                <Server className="text-primary-500" size={24} />
                <span className="font-bold text-xl">Abad<span className="gradient-text">Naseer</span></span>
              </Link>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="container-custom py-8 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  className="block text-lg font-medium text-slate-200 hover:text-white transition-colors duration-300"
                  activeClass="text-white"
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-slate-800">
                <a 
                  href="/resume-abad.pdf" 
                  className="btn-primary inline-flex items-center gap-2"
                  download="Abad-Naseer-Resume.pdf"
                  onClick={closeMenu}
                >
                  <Download size={18} />
                  Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;