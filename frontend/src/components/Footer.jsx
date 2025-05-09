import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Footer() {
  const { darkMode } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const socialLinks = [
    { icon: <FiTwitter />, href: "#", label: "Twitter" },
    { icon: <FiLinkedin />, href: "#", label: "LinkedIn" },
    { icon: <FiGithub />, href: "#", label: "GitHub" },
    { icon: <FiMail />, href: "#", label: "Email" },
  ];

  const footerLinks = [
    { title: "Product", links: ["Features", "Pricing", "FAQ", "Success Stories"] },
    { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
    { title: "Resources", links: ["Documentation", "Help Center", "API", "Partners"] },
    { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
  ];

  return (
    <footer
      className={`relative py-16 overflow-hidden transition-colors duration-300 ${
        darkMode 
          ? 'bg-gradient-to-t from-gray-950 to-gray-900 text-white' 
          : 'bg-gradient-to-t from-gray-100 to-white text-gray-900'
      }`}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-0 left-1/4 w-64 h-64 rounded-full ${
          darkMode ? 'bg-blue-900/5' : 'bg-blue-100/50'
        } blur-3xl`}></div>
        <div className={`absolute bottom-0 right-1/4 w-80 h-80 rounded-full ${
          darkMode ? 'bg-purple-900/5' : 'bg-purple-100/50'
        } blur-3xl`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Brand Column */}
          <motion.div 
            className="lg:col-span-2"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-4">
              Soft<span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>Sell</span>
            </h2>
            <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Unlock hidden value from your unused software licenses with our secure marketplace platform.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  aria-label={link.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-full ${
                    darkMode 
                      ? 'bg-gray-800 hover:bg-blue-900/70 text-gray-300 hover:text-blue-300' 
                      : 'bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600'
                  } transition-colors`}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Links Columns */}
          {footerLinks.map((column, index) => (
            <motion.div key={index} variants={itemVariants}>
              <h3 className="font-bold mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className={`text-sm hover:underline ${
                        darkMode ? 'text-gray-300 hover:text-blue-300' : 'text-gray-600 hover:text-blue-600'
                      }`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className={`pt-8 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'} flex flex-col md:flex-row justify-between items-center`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className={`text-sm mb-4 md:mb-0 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            &copy; {new Date().getFullYear()} SoftSell - Akshat Jain. All rights reserved.
          </p>
          
          <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <span>Crafted with</span>
            <motion.span 
              animate={{ 
                scale: [1, 1.2, 1],
                transition: { duration: 1.5, repeat: Infinity }
              }}
              className={darkMode ? 'text-red-400' : 'text-red-500'}
            >
              ❤️
            </motion.span>
            <span>for better software resale</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}