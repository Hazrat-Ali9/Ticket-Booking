import React from "react";
import { useTheme } from "../../context/ThemeContext/ThemeContext";
import { ShieldCheck, Sparkles, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};
const WhyChooseUs = () => {
  const { isDarkMode } = useTheme();
  return (
    <section className={`py-24 ${isDarkMode ? "bg-[#0B1120]" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl text-center mb-12 md:mb-16 font-extrabold tracking-tight leading-tight"
        >
            <span className="bg-linear-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Why Choose TicketBari ?
            </span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            {
              icon: ShieldCheck,
              title: "100% Verified Tickets",
              desc: "Direct operator-issued tickets — zero fraud.",
            },
            {
              icon: Clock,
              title: "Instant Booking",
              desc: "Confirm your ticket in under 30 seconds.",
            },
            {
              icon: MapPin,
              title: "Nationwide Delivery",
              desc: "Home delivery or pickup from local counters.",
            },
            {
              icon: Sparkles,
              title: "Exclusive Daily Deals",
              desc: "Cashbacks, discounts & promotional offers.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              whileHover={{ scale: 1.07 }}
              className={`p-8 rounded-2xl border-2 transition-all hover:shadow-xl ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 hover:border-orange-500"
                  : "bg-orange-50 border-orange-200 hover:border-orange-500"
              }`}
            >
              <item.icon className="w-16 h-16 mx-auto mb-6 text-orange-500" />
              <h3
                className={`text-xl font-semibold text-center mb-3 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {item.title}
              </h3>
              <p
                className={`text-center ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
