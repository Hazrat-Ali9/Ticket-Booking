import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext/ThemeContext";
import { Globe, Ticket, Users, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  const { isDarkMode } = useTheme();

  return (
    <>
      {/*  HERO   */}
      <section
        className={`relative overflow-hidden py-24 lg:py-36 ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="absolute inset-0 bg-linear-to-br from-yellow-400 via-orange-500 to-pink-600 opacity-95"></div>
        <div className="absolute inset-0 bg-black/30"></div>

        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
          variants={fadeUp}
          className="relative max-w-7xl mx-auto px-6 text-center text-white"
        >
          <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-linear-to-r from-yellow-200 to-orange-100 drop-shadow-md">
            Welcome to TicketBari
          </h1>

          <p className="text-xl lg:text-2xl max-w-3xl mx-auto font-light leading-relaxed opacity-95">
            Bangladesh’s most trusted & fastest online ticketing platform — Bus,
            Launch, Train & Air Tickets in one place.
          </p>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-10 mt-14"
          >
            {[
              { icon: Ticket, text: "1M+ Tickets Sold" },
              { icon: Users, text: "500K+ Happy Travelers" },
              { icon: Star, text: "4.8 / 5 Rating" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-3 text-lg"
              >
                <item.icon className="w-8 h-8" />
                <span>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/*  OUR STORY  */}
      <section className={`py-24 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          {/* Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            variants={fadeUp}
          >
            <h2
              className={`text-4xl lg:text-5xl font-semibold mb-8 leading-tight ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Our Journey Started With a{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-orange-600 font-bold">
                Vision for Better Travel
              </span>
            </h2>

            <p
              className={`text-lg leading-relaxed mb-6 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              In 2020, during the lockdown, we noticed the biggest challenge for
              travelers — long queues, fake tickets, unreliable agents. To solve
              this, <strong>TicketBari</strong> was born.
            </p>

            <p
              className={`text-lg leading-relaxed ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Today, we proudly serve all 64 districts with top bus, launch,
              train, and airlines.
            </p>
          </motion.div>

          {/* Card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-linear-to-br from-yellow-400 to-orange-600 rounded-3xl p-0.5 shadow-2xl"
            >
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 shadow-xl">
                <Globe className="w-24 h-24 mx-auto mb-6 text-orange-500" />
                <h3 className="text-2xl font-bold text-center text-white mb-4">
                  Nationwide Coverage
                </h3>
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Serving 500+ routes across Bangladesh
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/*  WHY CHOOSE US  */}
      <WhyChooseUs />

      {/*  CTA   */}
      <section className="py-24 bg-linear-to-r from-yellow-500 to-orange-600">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
          variants={fadeUp}
          className="max-w-7xl mx-auto px-6 text-center text-white"
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-8 drop-shadow-xl">
            Start Your Journey with TicketBari
          </h2>

          <p className="text-xl mb-12 max-w-2xl mx-auto opacity-95">
            Get ৳100 cashback on your first ticket booking!
          </p>

          <Link to="/all-tickets">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-orange-600 font-bold text-lg px-14 py-5 rounded-full shadow-xl mx-auto flex items-center gap-3"
            >
              Book Tickets Now <ArrowRight className="w-6 h-6" />
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </>
  );
};

export default About;
