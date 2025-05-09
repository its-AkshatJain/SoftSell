import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiMoon, FiSun, FiMenu, FiX, FiLogIn, FiUserPlus } from 'react-icons/fi';
import { FaRegLightbulb } from 'react-icons/fa';

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "How It Works", href: "#how-it-works" },
    { name: "Why Choose Us", href: "#why-choose-us" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 w-full p-4 transition-all duration-300 ${
        scrolled 
          ? darkMode 
            ? 'bg-gray-900/90 backdrop-blur-md shadow-lg shadow-blue-900/10' 
            : 'bg-white/90 backdrop-blur-md shadow-lg shadow-blue-200/20'
          : darkMode 
            ? 'bg-transparent' 
            : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold flex items-center"
        >
          <FaRegLightbulb className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <span className={`font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Soft<span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>Sell</span>
          </span>
        </motion.div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              whileHover={{ scale: 1.1 }}
              className={`relative text-sm font-medium transition-colors ${
                darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-800 hover:text-blue-600'
              }`}
            >
              {link.name}
              <motion.div
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500"
                whileHover={{ width: '100%' }}
                transition={{ type: 'tween' }}
              />
            </motion.a>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          {/* Login Button - Desktop */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/login"
            className={`hidden md:flex items-center text-sm font-medium px-3 py-2 rounded transition-colors ${
              darkMode 
                ? 'text-blue-300 hover:text-white' 
                : 'text-blue-600 hover:text-blue-800'
            }`}
          >
            <FiLogIn className="mr-1" />
            Log In
          </motion.a>

          {/* Sign Up Button - Desktop */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/signup"
            className={`hidden md:flex items-center text-sm font-medium px-4 py-2 rounded transition-colors ${
              darkMode 
                ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <FiUserPlus className="mr-1" />
            Sign Up
          </motion.a>
          
          {/* Theme Toggle Button */}
          <motion.button
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors ${
              darkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-yellow-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <FiSun size={20} />
            ) : (
              <FiMoon size={20} />
            )}
          </motion.button>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <FiX size={24} className={darkMode ? 'text-white' : 'text-gray-900'} />
            ) : (
              <FiMenu size={24} className={darkMode ? 'text-white' : 'text-gray-900'} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`md:hidden absolute top-full left-0 right-0 p-4 shadow-lg ${
            darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
          }`}
        >
          <div className="flex flex-col space-y-4">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-4 rounded-md ${
                  darkMode 
                    ? 'hover:bg-gray-800' 
                    : 'hover:bg-gray-100'
                }`}
              >
                {link.name}
              </a>
            ))}
            
            {/* Login & Sign Up - Mobile */}
            <div className="mt-2 pt-2 border-t border-gray-700 flex flex-col space-y-2">
              <a
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center py-2 px-4 rounded-md ${
                  darkMode 
                    ? 'hover:bg-gray-800 text-blue-300' 
                    : 'hover:bg-gray-100 text-blue-600'
                }`}
              >
                <FiLogIn className="mr-2" />
                Log In
              </a>
              
              <a
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center py-2 px-4 rounded-md ${
                  darkMode 
                    ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <FiUserPlus className="mr-2" />
                Sign Up
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}