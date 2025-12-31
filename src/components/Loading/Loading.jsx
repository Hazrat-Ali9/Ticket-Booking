import { motion } from "framer-motion";
import { Car } from "lucide-react";
import { useTheme } from "../../context/ThemeContext/ThemeContext";

const Loading = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Background */}
      <div
        className={`absolute inset-0 ${
          isDarkMode
            ? "bg-black"
            : "bg-transparent"
        }`}
        style={{
          backgroundImage: !isDarkMode
            ? "linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.03), transparent)"
            : "none",
        }}
      />

      {/* Loader */}
      <div className="relative flex flex-col items-center gap-8 pointer-events-none">

        {/* Speed Lines */}
        <div className="absolute -top-10 flex gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="h-1 w-8 rounded-full bg-orange-400/60"
              animate={{ x: [0, -80], opacity: [1, 0] }}
              transition={{
                repeat: Infinity,
                duration: 0.6,
                delay: i * 0.1,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Car */}
        <motion.div
          animate={{ x: [-20, 20, -20], y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
          className="relative"
        >
          <Car
            size={64}
            className={`drop-shadow-xl ${
              isDarkMode ? "text-orange-400" : "text-orange-600"
            }`}
          />

          {/* Head Light */}
          <motion.div
            className="absolute right-[-22px] top-[20px] h-3 w-6 rounded-full bg-yellow-400 blur-sm"
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
          />

          {/* Smoke */}
          <motion.div
            className="absolute left-[-20px] top-[28px] h-3 w-3 rounded-full bg-gray-400/40 blur-sm"
            animate={{ x: [-10, -30], opacity: [0.6, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "easeOut" }}
          />
        </motion.div>

        {/* Road */}
        <div className="relative w-72 h-2 overflow-hidden rounded-full bg-black/20">
          <motion.div
            className="absolute top-0 left-0 h-full w-20 rounded-full
            bg-gradient-to-r from-orange-500 to-yellow-400"
            animate={{ x: ["-30%", "400%"] }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
        </div>

        {/* Text */}
        <motion.p
          animate={{
            opacity: [0.3, 1, 0.3],
            letterSpacing: ["2px", "6px", "2px"],
          }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className={`text-sm font-semibold tracking-widest
          ${isDarkMode ? "text-gray-400" : "text-gray-700"}`}
        >
          TRAVELING...
        </motion.p>
      </div>
    </div>
  );
};

export default Loading;
