import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaQuoteLeft, FaQuoteRight, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "IT Director",
    company: "TechSolutions Inc.",
    image: "/1.jpg",
    quote: "SoftSell helped us recoup over $50,000 from unused enterprise licenses. Their process was seamless and the team was incredibly responsive.",
    stars: 5,
    color: "blue"
  },
  {
    name: "Michael Chen",
    role: "Finance Manager",
    company: "Global Systems Group",
    image: "/3.jpg",
    quote: "As someone responsible for our IT budget, finding SoftSell was a game-changer. We've turned idle software investments into actual returns with minimal effort.",
    stars: 5,
    color: "purple"
  },
  {
    name: "Jessica Williams",
    role: "Operations Lead",
    company: "Innovative Solutions",
    image: "/2.jpg",
    quote: "The security measures in place gave us confidence in the process. We've now made SoftSell part of our regular IT asset management strategy.",
    stars: 4,
    color: "green"
  }
];

export default function TestimonialsSection() {
  const { darkMode } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoplay]);

  const handleNext = () => {
    setAutoplay(false);
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setAutoplay(false);
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const getColor = (colorName, isBackground = false, isDark = darkMode) => {
    const colors = {
      blue: {
        bg: isDark ? 'bg-blue-900/30' : 'bg-blue-50',
        border: isDark ? 'border-blue-700' : 'border-blue-200',
        text: isDark ? 'text-blue-400' : 'text-blue-600',
        shadow: 'shadow-blue-500/20',
        accent: isDark ? 'bg-blue-500/10' : 'bg-blue-100/50',
        glow: isDark ? 'bg-blue-400/20' : 'bg-blue-200',
        highlight: isDark ? 'text-blue-300' : 'text-blue-500'
      },
      green: {
        bg: isDark ? 'bg-green-900/30' : 'bg-green-50',
        border: isDark ? 'border-green-700' : 'border-green-200',
        text: isDark ? 'text-green-400' : 'text-green-600',
        shadow: 'shadow-green-500/20',
        accent: isDark ? 'bg-green-500/10' : 'bg-green-100/50',
        glow: isDark ? 'bg-green-400/20' : 'bg-green-200',
        highlight: isDark ? 'text-green-300' : 'text-green-500'
      },
      purple: {
        bg: isDark ? 'bg-purple-900/30' : 'bg-purple-50',
        border: isDark ? 'border-purple-700' : 'border-purple-200',
        text: isDark ? 'text-purple-400' : 'text-purple-600',
        shadow: 'shadow-purple-500/20',
        accent: isDark ? 'bg-purple-500/10' : 'bg-purple-100/50',
        glow: isDark ? 'bg-purple-400/20' : 'bg-purple-200',
        highlight: isDark ? 'text-purple-300' : 'text-purple-500'
      },
      orange: {
        bg: isDark ? 'bg-orange-900/30' : 'bg-orange-50',
        border: isDark ? 'border-orange-700' : 'border-orange-200',
        text: isDark ? 'text-orange-400' : 'text-orange-600',
        shadow: 'shadow-orange-500/20',
        accent: isDark ? 'bg-orange-500/10' : 'bg-orange-100/50',
        glow: isDark ? 'bg-orange-400/20' : 'bg-orange-200',
        highlight: isDark ? 'text-orange-300' : 'text-orange-500'
      }
    };

    if (isBackground === 'accent') {
      return colors[colorName].accent;
    } else if (isBackground === 'glow') {
      return colors[colorName].glow;
    } else if (isBackground === 'highlight') {
      return colors[colorName].highlight;
    } else if (isBackground) {
      return `${colors[colorName].bg} ${colors[colorName].border} ${colors[colorName].shadow}`;
    } else {
      return colors[colorName].text;
    }
  };

  return (
    <section
      id="testimonials"
      className={`py-24 relative transition-colors duration-500 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Background decorations - matching the WhyChooseUs section */}
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
          
          <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className={`max-w-2xl mx-auto text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Don't just take our word for it. Hear from the businesses that have successfully recovered value with SoftSell.
          </p>
        </motion.div>

        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ type: "spring", damping: 25 }}
                className={`p-8 md:p-10 rounded-2xl backdrop-blur-sm border ${
                  darkMode 
                    ? 'bg-gray-800/60 border-gray-700' 
                    : 'bg-white/80 border-gray-200 shadow-xl'
                } overflow-hidden`}
              >
                {/* Decorative accent matching the testimonial color */}
                <div className={`absolute top-0 right-0 w-32 h-32 -mr-10 -mt-10 rounded-full ${
                  getColor(testimonials[activeIndex].color, 'accent')
                } blur-3xl opacity-50`}></div>
                <div className={`absolute bottom-0 left-0 w-24 h-24 -ml-10 -mb-10 rounded-full ${
                  getColor(testimonials[activeIndex].color, 'accent')
                } blur-3xl opacity-50`}></div>
                
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 relative z-10">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="relative">
                      <div className={`absolute inset-0 rounded-full blur-md ${
                        getColor(testimonials[activeIndex].color, 'glow')
                      }`}></div>
                      <img 
                        src={testimonials[activeIndex].image} 
                        alt={testimonials[activeIndex].name}
                        className={`w-20 h-20 rounded-full object-cover relative z-10 border-2 ${
                          darkMode ? 'border-gray-700' : 'border-white'
                        } shadow-lg`}
                      />
                    </div>
                    <div className="flex mt-4">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={i < testimonials[activeIndex].stars 
                            ? 'text-yellow-400 drop-shadow-sm' 
                            : `${darkMode ? 'text-gray-600' : 'text-gray-300'}`
                          } 
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="relative">
                      <FaQuoteLeft className={`absolute -top-6 -left-2 text-3xl opacity-30 ${
                        getColor(testimonials[activeIndex].color, 'highlight')
                      }`} />
                      <p className={`text-lg md:text-xl p-2 font-medium italic mb-6 leading-relaxed ${
                        darkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>
                        {testimonials[activeIndex].quote}
                      </p>
                      <FaQuoteRight className={`absolute bottom-0 right-0 text-3xl opacity-30 ${
                        getColor(testimonials[activeIndex].color, 'highlight')
                      }`} />
                    </div>
                    
                    <div className="mt-4">
                      <h3 className={`text-xl font-bold ${getColor(testimonials[activeIndex].color)}`}>
                        {testimonials[activeIndex].name}
                      </h3>
                      <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                        {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          
            {/* Controls */}
            <div className="flex justify-center mt-8 gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrev}
                className={`p-3 rounded-full transition-colors ${
                  darkMode 
                    ? 'bg-gray-800/80 hover:bg-gray-700/80 text-white border border-gray-700' 
                    : 'bg-white/80 hover:bg-gray-100 text-gray-800 border border-gray-200 shadow-md'
                }`}
                aria-label="Previous testimonial"
              >
                <FaChevronLeft className="text-lg" />
              </motion.button>
              
              <div className="flex space-x-3 items-center">
                {testimonials.map((testimonial, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setAutoplay(false);
                      setActiveIndex(idx);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      idx === activeIndex
                        ? getColor(testimonial.color)
                        : darkMode ? 'bg-gray-700' : 'bg-gray-300'
                    } ${idx === activeIndex ? 'scale-125' : ''}`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className={`p-3 rounded-full transition-colors ${
                  darkMode 
                    ? 'bg-gray-800/80 hover:bg-gray-700/80 text-white border border-gray-700' 
                    : 'bg-white/80 hover:bg-gray-100 text-gray-800 border border-gray-200 shadow-md'
                }`}
                aria-label="Next testimonial"
              >
                <FaChevronRight className="text-lg" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}