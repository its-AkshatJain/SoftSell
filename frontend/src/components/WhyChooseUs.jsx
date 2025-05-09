import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { BiRocket, BiLock, BiBuildings, BiDollar } from 'react-icons/bi';

const features = [
  {
    title: "Fast Payouts",
    icon: <BiRocket />,
    description: "We ensure you get paid quickly once your license is sold, with transactions processed within 48 hours.",
    color: "blue"
  },
  {
    title: "Secure Transactions",
    icon: <BiLock />,
    description: "All data and transactions are fully encrypted and protected with enterprise-grade security standards.",
    color: "green"
  },
  {
    title: "Trusted by Businesses",
    icon: <BiBuildings />,
    description: "Over 500 companies trust SoftSell to manage their surplus licenses and maximize return on investment.",
    color: "purple"
  },
  {
    title: "No Hidden Fees",
    icon: <BiDollar />,
    description: "Our pricing is completely transparent — what you see is what you get, with no surprise charges.",
    color: "orange"
  },
];

export default function WhyChooseUs() {
  const { darkMode } = useTheme();

  const getColor = (colorName, isBackground = false, isDark = darkMode) => {
    const colors = {
      blue: {
        bg: isDark ? 'bg-blue-900/30' : 'bg-blue-50',
        border: isDark ? 'border-blue-700' : 'border-blue-200',
        text: isDark ? 'text-blue-400' : 'text-blue-600',
        shadow: 'shadow-blue-500/20'
      },
      green: {
        bg: isDark ? 'bg-green-900/30' : 'bg-green-50',
        border: isDark ? 'border-green-700' : 'border-green-200',
        text: isDark ? 'text-green-400' : 'text-green-600',
        shadow: 'shadow-green-500/20'
      },
      purple: {
        bg: isDark ? 'bg-purple-900/30' : 'bg-purple-50',
        border: isDark ? 'border-purple-700' : 'border-purple-200',
        text: isDark ? 'text-purple-400' : 'text-purple-600',
        shadow: 'shadow-purple-500/20'
      },
      orange: {
        bg: isDark ? 'bg-orange-900/30' : 'bg-orange-50',
        border: isDark ? 'border-orange-700' : 'border-orange-200',
        text: isDark ? 'text-orange-400' : 'text-orange-600',
        shadow: 'shadow-orange-500/20'
      }
    };

    return isBackground 
      ? `${colors[colorName].bg} ${colors[colorName].border} ${colors[colorName].shadow}` 
      : colors[colorName].text;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 15 }
    }
  };

  return (
    <section
      id="why-choose-us"
      className={`py-24 transition-colors duration-300 relative overflow-hidden ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-32 -right-32 w-96 h-96 rounded-full ${
          darkMode ? 'bg-blue-900/10' : 'bg-blue-200/40'} blur-3xl`}></div>
        <div className={`absolute -bottom-32 -left-32 w-96 h-96 rounded-full ${
          darkMode ? 'bg-purple-900/10' : 'bg-purple-200/40'} blur-3xl`}></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <motion.div 
            className="inline-block mb-3"
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className={`mx-auto w-16 h-1 mb-4 ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
          </motion.div>
          
          <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className={`max-w-2xl mx-auto text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            SoftSell is designed to give you peace of mind and maximum value for your unused software licenses.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 300 }
              }}
              className={`flex flex-col h-full rounded-2xl border p-6 transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-800/60 backdrop-blur-sm border-gray-700' 
                  : 'bg-white/80 backdrop-blur-sm shadow-lg'
              }`}
            >
              <div className={`p-4 rounded-xl mb-6 self-start ${getColor(feature.color, true)}`}>
                <motion.div 
                  className={`text-3xl ${getColor(feature.color)}`}
                  whileHover={{ rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {feature.icon}
                </motion.div>
              </div>
              <h3 className={`text-xl font-bold mb-3 ${getColor(feature.color)}`}>{feature.title}</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}