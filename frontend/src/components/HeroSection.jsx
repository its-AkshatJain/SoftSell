import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiArrowRight } from 'react-icons/fi';
import { FaChartLine, FaShieldAlt, FaRocket } from 'react-icons/fa';

export default function HeroSection() {
  const { darkMode } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.3
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

  const floatingIconVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <section
      className={`relative min-h-[100vh] flex items-center justify-center px-6 overflow-hidden pt-16 transition-colors duration-300 ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white'
          : 'bg-gradient-to-br from-blue-50 via-white to-blue-50 text-gray-900'
      }`}
    >
      {/* Background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-20 left-10 w-64 h-64 rounded-full ${darkMode ? 'bg-blue-600/10' : 'bg-blue-200/40'} blur-3xl`}></div>
        <div className={`absolute bottom-20 right-10 w-80 h-80 rounded-full ${darkMode ? 'bg-purple-600/10' : 'bg-purple-200/40'} blur-3xl`}></div>
      </div>

      <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
        <motion.div 
          className="flex-1 text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight"
          >
            Sell Unused <span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>Software</span> Licenses Easily
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className={`text-lg sm:text-xl max-w-xl mb-8 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            SoftSell helps businesses unlock hidden value by reselling unused software licenses quickly, securely, and at the best market price.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`group flex items-center gap-2 bg-gradient-to-r ${
                darkMode 
                  ? 'from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400' 
                  : 'from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600'
              } text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all`}
            >
              Get a Quote
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </motion.button>
            
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#how-it-works"
              className={`font-medium border-b-2 ${
                darkMode 
                  ? 'border-blue-400 hover:border-blue-300 text-blue-400 hover:text-blue-300' 
                  : 'border-blue-600 hover:border-blue-800 text-blue-600 hover:text-blue-800'
              } transition-colors`}
            >
              Learn how it works
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex-1 max-w-md"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className={`relative p-8 rounded-2xl shadow-xl ${
            darkMode 
              ? 'bg-gray-800/50 backdrop-blur-lg border border-gray-700' 
              : 'bg-white/70 backdrop-blur-lg border border-gray-100'
          }`}>
            <div className="absolute -top-10 -left-10">
              <motion.div 
                variants={floatingIconVariants}
                animate="animate"
                className={`p-4 rounded-full ${
                  darkMode ? 'bg-blue-900/80' : 'bg-blue-100'
                }`}
              >
                <FaChartLine size={28} className={darkMode ? 'text-blue-300' : 'text-blue-600'} />
              </motion.div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                  <FaShieldAlt className={`text-xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Secure Transactions</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Fully encrypted and compliant
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                  <FaRocket className={`text-xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Fast Payouts</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Get paid in 48 hours or less
                  </p>
                </div>
              </div>
              
              <motion.div 
                className={`mt-8 p-3 text-center rounded-xl ${
                  darkMode 
                    ? 'bg-blue-900/30 border border-blue-800/50' 
                    : 'bg-blue-50 border border-blue-100'
                }`}
                whileHover={{ scale: 1.03 }}
              >
                <p className="font-medium text-sm">
                  <span className="font-bold block text-lg mb-1">$2.5M+</span>
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    recovered for our clients
                  </span>
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}