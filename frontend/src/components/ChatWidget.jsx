import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FaRobot } from "react-icons/fa";
import { FiMessageCircle, FiSend, FiLoader, FiX } from "react-icons/fi";

// Cohere API for Text Generation
const cohereApiKey = import.meta.env.VITE_COHERE_API_KEY;

const exampleQuestions = [
  "How do I sell my license?",
  "Is there a fee for using SoftSell?",
  "How fast will I receive payment?",
  "What types of software can I sell?",
];

const predefinedAnswers = {
  "How do I sell my license?": "To sell your license, go to the 'Get a Quote' tab, choose your software, and follow the on-screen steps.",
  "Is there a fee for using SoftSell?": "SoftSell charges a small service fee of 5% on every successful transaction.",
  "How fast will I receive payment?": "You’ll receive payment within 1-2 business days after the buyer confirms receipt.",
  "What types of software can I sell?": "You can sell licenses for most major software brands including Microsoft, Adobe, and more.",
};

export default function ChatWidget() {
  const { darkMode } = useTheme();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Simulate typing indicator
  useEffect(() => {
    if (loading && messages.length > 0) {
      setTyping(true);
    } else {
      setTyping(false);
    }
  }, [loading, messages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    
    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

     // Check for predefined answer
    if (predefinedAnswers[text]) {
        setLoading(true);
        setTimeout(() => {
        setMessages((prev) => [
            ...prev,
            { role: "assistant", content: predefinedAnswers[text] },
        ]);
        setLoading(false);
        }, 800); // Simulate delay
        return;
    }

    setLoading(true);

    let retryCount = 0;
    const maxRetries = 3;
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    while (retryCount < maxRetries) {
      try {
        // Make request to Cohere's text generation API
        const response = await fetch('https://api.cohere.ai/v1/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cohereApiKey}`,
          },
          body: JSON.stringify({
            model: 'command',  // Using Cohere's Command model
            prompt: [...messages.map(msg => `${msg.role}: ${msg.content}`), `User: ${text}`, 'Assistant:'].join('\n'),
            max_tokens: 250,
            temperature: 0.7,
          }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        const botReply = data?.generations[0]?.text.trim() || "Sorry, I couldn't generate a response.";

        // Add slight delay to simulate thinking/typing
        await delay(800);
        
        const botMsg = {
          role: "assistant",
          content: botReply,
        };
        
        setMessages((prev) => [...prev, botMsg]);
        break; // Exit loop if successful
      } catch (err) {
        console.error(err);
        if (err.message.includes("429")) {
          retryCount++;
          const backoffTime = 1000 * Math.pow(2, retryCount); // Exponential backoff
          await delay(backoffTime); // Wait before retrying
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: "Sorry, I'm having trouble connecting to our systems. Please try again in a moment.",
            },
          ]);
          break; // Exit the loop on non-rate-limit errors
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const chatContainerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        damping: 25, 
        stiffness: 300 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 20,
      transition: { 
        duration: 0.2 
      }
    }
  };
  
  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        damping: 25, 
        stiffness: 300 
      }
    }
  };

  // Add welcome message when chat first opens
  useEffect(() => {
    if (open && messages.length === 0) {
      setTimeout(() => {
        setMessages([{
          role: "assistant",
          content: "👋 Hi there! I'm your SoftSell assistant. How can I help you today?"
        }]);
      }, 500);
    }
  }, [open]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div 
            variants={chatContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`w-[90vw] max-w-sm sm:max-w-md md:max-w-lg ${
              darkMode 
                ? 'bg-gray-900 border border-gray-700' 
                : 'bg-white border border-gray-200'
            } shadow-2xl rounded-lg flex flex-col overflow-hidden`}
            style={{ 
              maxHeight: 'calc(100vh - 120px)',
              bottom: '80px',
              right: '0'
            }}
          >
            <div className={`flex items-center justify-between px-4 py-3 ${
              darkMode ? 'bg-gray-800' : 'bg-blue-600'
            } text-white`}>
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-full ${
                  darkMode ? 'bg-gray-700' : 'bg-blue-500'
                } flex items-center justify-center`}>
                  <FaRobot className="text-sm" />
                </div>
                <h3 className="font-medium text-base">SoftSell Assistant</h3>
              </div>
              <motion.button
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                onClick={() => setOpen(false)}
                className="p-1 rounded-full hover:bg-white/20 text-sm flex items-center justify-center"
                aria-label="Close chat"
              >
                <FiX size={18} />
              </motion.button>
            </div>
            
            <div 
              className={`flex-1 overflow-y-auto p-3 space-y-3 ${
                darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
              }`} 
              style={{ height: "320px", maxHeight: "calc(100vh - 200px)" }}
            >
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[75%] p-2.5 rounded-lg ${
                      msg.role === "user" 
                        ? darkMode 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-blue-600 text-white' 
                        : darkMode 
                          ? 'bg-gray-800 text-gray-100' 
                          : 'bg-white text-gray-800 shadow-sm'
                    }`}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {typing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className={`max-w-[75%] p-2.5 rounded-lg ${
                    darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800 shadow-sm'
                  }`}>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-75"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
                    </div>
                  </div>
                </motion.div>
              )}

              {messages.length === 0 || messages.length === 1 ? (
                <div className={`text-center p-3 rounded-lg ${
                    darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-500 shadow-sm'
                }`}>
                    <FiMessageCircle className="mx-auto text-xl mb-2" />
                    <p className="mb-2 font-medium text-sm">Welcome to SoftSell Support</p>
                    <p className="text-xs mb-3">Ask me anything about selling your software licenses:</p>
                    <div className="space-y-1.5">
                    {exampleQuestions.map((q, i) => (
                        <motion.button
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => sendMessage(q)}
                        className={`w-full p-2 text-xs text-left rounded ${
                            darkMode 
                            ? 'bg-gray-700 hover:bg-gray-600 text-blue-300' 
                            : 'bg-gray-100 hover:bg-gray-200 text-blue-600'
                        }`}
                        >
                        {q}
                        </motion.button>
                    ))}
                    </div>
                </div>
                ) : null}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className={`flex items-center p-2.5 gap-2 ${
                darkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-white border-t border-gray-200'
              }`}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={`flex-1 p-2 rounded-md text-sm outline-none ${
                  darkMode 
                    ? 'bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:border-blue-500' 
                    : 'bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-200 focus:border-blue-500'
                }`}
                placeholder="Type your message..."
                disabled={loading}
              />
              <motion.button
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                type="submit"
                disabled={loading || !input.trim()}
                className={`p-2 rounded-md ${
                  !input.trim() 
                    ? darkMode 
                      ? 'bg-gray-700 text-gray-500' 
                      : 'bg-gray-200 text-gray-400' 
                    : darkMode 
                      ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
                } disabled:cursor-not-allowed`}
              >
                {loading ? <FiLoader className="animate-spin" /> : <FiSend />}
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        variants={buttonVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg ${
          darkMode 
            ? open ? 'bg-gray-700 text-white' : 'bg-blue-600 text-white' 
            : open ? 'bg-gray-100 text-blue-600' : 'bg-blue-600 text-white'
        } relative transition-all duration-300`}
        aria-label="Chat with SoftSell Assistant"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ 
            scale: open ? 0 : 1,
            transition: { delay: open ? 0 : 0.2 }
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <FaRobot className="text-xl" />
        </motion.div>
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ 
            scale: open ? 1 : 0,
            transition: { delay: open ? 0.2 : 0 }
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <FiX className="text-xl" />
        </motion.div>
        
        {!open && messages.length > 1 && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold"
          >
            <span className="text-[8px]">●</span>
          </motion.div>
        )}
      </motion.button>
    </div>
  );
}