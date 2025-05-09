import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FiUser, FiMail, FiBriefcase, FiList, FiMessageSquare, FiSend } from "react-icons/fi";

export default function ContactForm() {
  const { darkMode } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    licenseType: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const licenseOptions = [
    { value: "", label: "Select License Type" },
    { value: "Software", label: "Software Application" },
    { value: "OS", label: "Operating System" },
    { value: "Cloud", label: "Cloud Service" },
    { value: "Enterprise", label: "Enterprise Solution" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.licenseType) newErrors.licenseType = "License Type is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        licenseType: "",
        message: "",
      });
      
      // Reset submission state after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
  };

  const inputClasses = `w-full p-3 pl-10 rounded-lg transition-colors duration-200 ${
    darkMode
      ? 'bg-gray-800/70 text-white border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
      : 'bg-white/80 text-gray-900 border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
  }`;

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section
      id="contact"
      className={`py-24 relative transition-colors duration-300 ${
        darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-0 left-0 w-1/2 h-1/2 ${
          darkMode ? 'bg-blue-900/5' : 'bg-blue-100/30'} rounded-br-full blur-3xl`}></div>
        <div className={`absolute bottom-0 right-0 w-1/2 h-1/2 ${
          darkMode ? 'bg-purple-900/5' : 'bg-purple-100/30'} rounded-tl-full blur-3xl`}></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className={`mx-auto w-16 h-1 mb-6 ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className={`max-w-2xl mx-auto text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Have a question or need more information about selling your software licenses? 
            We'd love to hear from you.
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Information */}
          <motion.div 
            className="lg:w-1/3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className={`h-full p-8 rounded-2xl ${
              darkMode 
                ? 'bg-gray-800/50 backdrop-blur-md border border-gray-700' 
                : 'bg-white/90 backdrop-blur-md shadow-xl border border-gray-100'
            }`}>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className={`mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Our team is here to help you get the most value from your unused software licenses. Reach out to us today.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                    <FiMail className={`text-xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-500">Email</h4>
                    <p className="font-medium">support@softsell.example</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                    <FiBriefcase className={`text-xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-500">Business Hours</h4>
                    <p className="font-medium">Monday - Friday, 9am - 5pm PST</p>
                  </div>
                </div>
              </div>
              
              <div className={`mt-10 p-6 rounded-xl ${
                darkMode ? 'bg-blue-900/20 border border-blue-900/50' : 'bg-blue-50 border border-blue-100'
              }`}>
                <p className={`text-center text-sm ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                  <span className="block font-bold text-lg mb-2">Priority Support</span>
                  Need immediate assistance?<br />
                  Call 1-800-SOFTSELL
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            className="lg:w-2/3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className={`p-8 rounded-2xl ${
              darkMode 
                ? 'bg-gray-800/50 backdrop-blur-md border border-gray-700' 
                : 'bg-white/90 backdrop-blur-md shadow-xl border border-gray-100'
            }`}>
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-6 rounded-xl text-center ${
                    darkMode ? 'bg-green-900/30 border border-green-800' : 'bg-green-50 border border-green-200'
                  }`}
                >
                  <div className="text-5xl mb-4">✓</div>
                  <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                    Message Sent Successfully!
                  </h3>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Thank you for reaching out. Our team will get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                  variants={formVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants}>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiUser className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={inputClasses}
                          placeholder="John Doe"
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                      )}
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiMail className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={inputClasses}
                          placeholder="john@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                      )}
                    </motion.div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants}>
                      <label htmlFor="company" className="block text-sm font-medium mb-2">
                        Company Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiBriefcase className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
                        </div>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className={inputClasses}
                          placeholder="Acme Inc."
                        />
                      </div>
                      {errors.company && (
                        <p className="mt-1 text-sm text-red-500">{errors.company}</p>
                      )}
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label htmlFor="licenseType" className="block text-sm font-medium mb-2">
                        License Type
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiList className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
                        </div>
                        <select
                          id="licenseType"
                          name="licenseType"
                          value={formData.licenseType}
                          onChange={handleInputChange}
                          className={inputClasses}
                        >
                          {licenseOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.licenseType && (
                        <p className="mt-1 text-sm text-red-500">{errors.licenseType}</p>
                      )}
                    </motion.div>
                  </div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Your Message
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                        <FiMessageSquare className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleInputChange}
                        className={inputClasses}
                        placeholder="Tell us about your requirements..."
                      ></textarea>
                    </div>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                    )}
                  </motion.div>

                  <motion.div 
                    variants={itemVariants}
                    className="mt-2"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-white font-medium transition-all ${
                        isSubmitting
                          ? 'bg-gray-500 cursor-not-allowed'
                          : `bg-gradient-to-r ${
                              darkMode 
                                ? 'from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400' 
                                : 'from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600'
                            } shadow-lg hover:shadow-xl`
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Send Message
                          <FiSend />
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </motion.form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}