import React from "react";
import { useNavigate } from "react-router";
import { useTheme } from "../../context/ThemeContext/ThemeContext";
import { FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";

const ErrorPage = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen px-4 text-center transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
      >
        <FaExclamationTriangle className="text-yellow-500 text-9xl mb-6 animate-pulse" />
      </motion.div>

      <motion.h1
        className="text-6xl font-bold mb-4"
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        404
      </motion.h1>

      <motion.p
        className="text-2xl mb-6 max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Oops! Page not found. Looks like you took a wrong turn or the page doesn't exist.
      </motion.p>

      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
        >
          Go Back to Previous Page
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-orange-500 transition-colors"
        >
          Go Home Page
        </motion.button>
      </div>
    </div>
  );
};

export default ErrorPage;