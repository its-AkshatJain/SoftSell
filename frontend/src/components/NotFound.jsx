import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiHome, FiAlertCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function NotFound() {
  const { darkMode } = useTheme();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2
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

  return (
    <div className={`min-h-screen flex items-center justify-center p-5 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`max-w-lg w-full text-center p-8 rounded-lg shadow-xl ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <motion.div 
          variants={itemVariants}
          className="flex justify-center mb-6"
        >
          <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl ${
            darkMode 
              ? 'bg-blue-900/30 text-blue-400' 
              : 'bg-blue-100 text-blue-600'
          }`}>
            <FiAlertCircle />
          </div>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-5xl font-bold mb-2"
        >
          404
        </motion.h1>

        <motion.h2 
          variants={itemVariants}
          className="text-2xl font-medium mb-4"
        >
          Page Not Found
        </motion.h2>

        <motion.p 
          variants={itemVariants}
          className={`mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
        >
          Oops! The page you're looking for doesn't exist or has been moved.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center px-6 py-3 rounded-md shadow-md font-medium text-white ${
                darkMode 
                  ? 'bg-blue-600 hover:bg-blue-500' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              <FiHome className="mr-2" />
              Return Home
            </motion.button>
          </Link>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className={`mt-8 pt-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
        >
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            If you believe this is an error, please contact our support team.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}