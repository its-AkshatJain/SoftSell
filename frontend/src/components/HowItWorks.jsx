import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiUpload, FiTrendingUp, FiDollarSign } from 'react-icons/fi';

const steps = [
  {
    title: "Upload License",
    icon: <FiUpload size={28} />,
    description: "Provide details of your unused software license with a few simple clicks through our secure portal.",
    color: "blue"
  },
  {
    title: "Get Valuation",
    icon: <FiTrendingUp size={28} />,
    description: "Our experts analyze the license and estimate its resale value within 24 hours based on market demand.",
    color: "purple"
  },
  {
    title: "Get Paid",
    icon: <FiDollarSign size={28} />,
    description: "Receive payment securely once a buyer is found. Fast and hassle-free transfer to your account.",
    color: "green"
  },
];

export default function HowItWorks() {
  const { darkMode } = useTheme();
  
  const getColor = (colorName, isBackground = false) => {
    const colors = {
      blue: {
        bg: darkMode ? 'bg-blue-900/20' : 'bg-blue-50',
        icon: darkMode ? 'text-blue-400' : 'text-blue-600',
        border: darkMode ? 'border-blue-800' : 'border-blue-200',
        number: darkMode ? 'text-blue-400 border-blue-400' : 'text-blue-600 border-blue-600'
      },
      purple: {
        bg: darkMode ? 'bg-purple-900/20' : 'bg-purple-50',
        icon: darkMode ? 'text-purple-400' : 'text-purple-600',
        border: darkMode ? 'border-purple-800' : 'border-purple-200',
        number: darkMode ? 'text-purple-400 border-purple-400' : 'text-purple-600 border-purple-600'
      },
      green: {
        bg: darkMode ? 'bg-green-900/20' : 'bg-green-50',
        icon: darkMode ? 'text-green-400' : 'text-green-600',
        border: darkMode ? 'border-green-800' : 'border-green-200',
        number: darkMode ? 'text-green-400 border-green-400' : 'text-green-600 border-green-600'
      }
    };

    return isBackground ? colors[colorName].bg : colors[colorName];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: { delay: 0.4, duration: 0.8 }
    }
  };

  return (
    <section
      id="how-it-works"
      className={`py-24 relative overflow-hidden transition-colors duration-300 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      {/* Background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -bottom-10 -left-20 w-96 h-96 rounded-full ${
          darkMode ? 'bg-blue-900/5' : 'bg-blue-100/60'} blur-3xl`}></div>
        <div className={`absolute top-20 right-5 w-64 h-64 rounded-full ${
          darkMode ? 'bg-purple-900/5' : 'bg-purple-100/50'} blur-3xl`}></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className={`mx-auto w-16 h-1 mb-4 ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className={`max-w-2xl mx-auto text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            A simple 3-step process to turn your unused software licenses into money.
          </p>
        </motion.div>
        
        <motion.div 
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Connection line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 transform -translate-y-1/2 z-0">
            <motion.div 
              className={`h-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
              variants={lineVariants}
            ></motion.div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="flex flex-col"
              >
                <div className={`relative p-6 rounded-2xl h-full ${
                  darkMode 
                    ? 'bg-gray-800/70 backdrop-blur-sm border border-gray-700 shadow-lg shadow-gray-900/20' 
                    : 'bg-white/90 backdrop-blur-sm border border-gray-100 shadow-xl shadow-gray-200/30'
                }`}>
                  <div className="flex items-center mb-6">
                    <div className={`relative flex items-center justify-center w-14 h-14 rounded-full ${getColor(step.color).bg}`}>
                      <div className={`absolute -inset-1 rounded-full opacity-50 blur ${getColor(step.color).bg}`}></div>
                      <span className={`relative z-10 ${getColor(step.color).icon}`}>{step.icon}</span>
                    </div>
                    <div className="ml-4">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full border-2 text-lg font-bold ${getColor(step.color).number}`}>
                        {idx + 1}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-3 ${getColor(step.color).icon}`}>
                    {step.title}
                  </h3>
                  
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {step.description}
                  </p>
                  
                  {/* Arrow for mobile */}
                  {idx < steps.length - 1 && (
                    <div className="md:hidden flex justify-center mt-6">
                      <svg 
                        className={darkMode ? 'text-gray-600' : 'text-gray-400'} 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <polyline points="19 12 12 19 5 12"></polyline>
                      </svg>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}