import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext/ThemeContext";
import {
  FaBus,
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCreditCard,
} from "react-icons/fa";

import { SiBabel, SiNamecheap } from "react-icons/si";
import { Link } from "react-router";
import { ArrowRightCircle } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Footer = () => {
  const { isDarkMode } = useTheme();

  return (
    <motion.footer
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.2 }}
      className={`w-full  pb-8 transition-colors duration-500 ${
        isDarkMode ? "bg-gray-900 text-gray-300" : "bg-gray-50 text-gray-800"
      }`}
    >
      <motion.div
        variants={fadeUp}
        className={`h-[1px] mb-3 md:mb-8 ${
          isDarkMode
            ? "bg-linear-to-r from-gray-700 to-slate-500"
            : "bg-gray-200"
        }`}
      ></motion.div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand Info */}
        <motion.div variants={fadeUp} className="space-y-4">
          <h2 className="flex items-center gap-3 text-3xl font-bold text-orange-500">
            <FaBus className="text-yellow-500 text-4xl" />
            TicketBari
          </h2>
          <p className="text-sm leading-relaxed opacity-90">
            Book bus, train, launch & flight tickets easily from one simple and reliable platform.
          </p>

          <div className="flex gap-4 mt-6 text-2xl">
            <FaFacebook className="hover:text-orange-500 transition-colors cursor-pointer" />
            <FaTwitter className="hover:text-orange-500 transition-colors cursor-pointer" />
            <FaInstagram className="hover:text-orange-500 transition-colors cursor-pointer" />
            <FaYoutube className="hover:text-orange-500 transition-colors cursor-pointer" />
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={fadeUp}>
          <h3 className="text-xl font-semibold mb-6 text-orange-500">
            Quick Links
          </h3>

          <ul className="space-y-4 text-sm">
            {[
              { label: "Home", to: "/" },
              { label: "All Tickets", to: "/all-tickets" },
              { label: "Contact Us", to: "/contact" },
              { label: "About Us", to: "/about" },
              { label: "FAQ", to: "/faq" },
            ].map((link, index) => (
              <motion.li
                key={index}
                whileHover={{ x: 5 }}
                className="flex items-center gap-2"
              >
                <ArrowRightCircle size={16} className="text-orange-500" />
                <Link
                  to={link.to}
                  className="hover:text-orange-500 hover:underline transition-colors"
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div variants={fadeUp}>
          <h3 className="text-xl font-semibold mb-6 text-orange-500">
            Contact Info
          </h3>

          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-orange-500" />
              support@ticketbari.com
            </li>
            <li className="flex items-center gap-3">
              <FaPhone className="text-orange-500" />
              +880 1700-000000
            </li>
            <li className="flex items-center gap-3">
              <FaFacebook className="text-orange-500" />
              facebook.com/ticketbari
            </li>
          </ul>
        </motion.div>

        {/* Payment */}
        <motion.div variants={fadeUp}>
          <h3 className="text-xl font-semibold mb-6 text-orange-500">
            Secure Payment Methods
          </h3>

          <div className="flex flex-wrap items-center gap-5 text-4xl">
            <SiBabel className="text-pink-600 hover:scale-110 transition-transform" />
            <SiNamecheap className="text-orange-600 hover:scale-110 transition-transform" />
            <FaCcVisa className="text-blue-600 hover:scale-110 transition-transform" />
            <FaCcMastercard className="text-red-600 hover:scale-110 transition-transform" />
            <FaCreditCard className="text-gray-600 hover:scale-110 transition-transform" />
          </div>

          <p className="text-xs mt-4 opacity-70">
            We accept all major payment gateways for your convenience.
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={fadeUp}
        className={`mt-12 pt-6 text-center text-sm border-t ${
          isDarkMode ? "border-gray-800" : "border-gray-200"
        }`}
      >
        © {new Date().getFullYear()} TicketBari. All rights reserved.
        <p>Developed By <a href="https://amdadislam.netlify.app/" className="text-orange-500 font-bold">MD Amdad Islam</a></p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
