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
            href="/resume.pdf" 
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
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-dark-500/95 backdrop-blur-sm z-50 transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden flex flex-col`}
      >
        <div className="container-custom py-5 flex justify-between items-center">
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
          <button 
            className="text-white focus:outline-none"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              className="text-xl font-medium nav-link cursor-pointer"
              activeClass="active"
              onClick={closeMenu}
            >
              {link.name}
            </Link>
          ))}
          <a 
            href="/resume.pdf" 
            className="btn-primary flex items-center gap-2 mt-4"
            download="Abad-Naseer-Resume.pdf"
            onClick={(e) => {
              // Remove the preventDefault and alert, letting the natural download happen
              closeMenu();
            }}
          >
            <Download size={18} />
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;