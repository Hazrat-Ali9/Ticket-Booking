import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext/ThemeContext";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Facebook,
  Instagram,
  MessageCircle,
  Globe,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Contact = () => {
  const { isDarkMode } = useTheme();

  return (
    <>
      {/*  HERO   */}
      <section
        className={`py-28 md:py-32 relative overflow-hidden ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="absolute inset-0 bg-linear-to-br from-yellow-400 via-orange-500 to-pink-600"></div>
        <div className="absolute inset-0 bg-black/40"></div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.9 }}
          className="relative max-w-6xl mx-auto px-6 text-center text-white"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-linear-to-r from-yellow-200 to-pink-200 drop-shadow-lg">
            Get in Touch
          </h1>

          <p className="text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Have questions about bus tickets, routes, or partnerships? Our team
            is here 24/7 to assist you.
          </p>
        </motion.div>
      </section>

      {/*  CONTACT   */}
      <section
        className={`py-20 md:py-24 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT SIDE */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="space-y-12"
          >
            {/* Info Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className={`p-8 md:p-10 rounded-3xl shadow-2xl backdrop-blur-md border ${
                isDarkMode
                  ? "bg-gray-800/80 border-gray-700"
                  : "bg-white/90 border-orange-200"
              }`}
            >
              <h2
                className={`text-3xl md:text-4xl font-bold mb-8 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                We're Here to Help
              </h2>

              <p
                className={`mb-10 text-lg leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Reach out anytime for ticket booking support, refunds, schedule
                inquiries, or business collaborations.
              </p>

              {/* Contact Details */}
              <div className="space-y-8">
                {[
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+880 1700 000 000",
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: "support@ticketbari.com",
                  },
                  {
                    icon: MapPin,
                    label: "Office",
                    value: "Bashundhara R/A, Dhaka, Bangladesh",
                  },
                ].map((item, idx) => (
                  <motion.div
                    variants={fadeUp}
                    transition={{ delay: idx * 0.2 }}
                    className="flex items-center gap-5 group"
                    key={idx}
                  >
                    <div className="p-3 rounded-full bg-orange-500/20 group-hover:bg-orange-500/40 transition">
                      <item.icon className="w-7 h-7 text-orange-500" />
                    </div>
                    <div>
                      <p
                        className={`text-sm opacity-75 ${
                          isDarkMode ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        {item.label}
                      </p>
                      <p
                        className={`text-lg md:text-xl font-medium ${
                          isDarkMode ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Icons */}
              <motion.div
                className="flex gap-5 md:gap-6 mt-10"
                variants={fadeUp}
                transition={{ delay: 0.6 }}
              >
                {[
                  { icon: Facebook, bg: "bg-blue-600" },
                  {
                    icon: Instagram,
                    bg: "bg-gradient-to-tr from-purple-500 to-pink-500",
                  },
                  { icon: MessageCircle, bg: "bg-green-500" },
                  { icon: Globe, bg: "bg-sky-500" },
                ].map((s, i) => (
                  <motion.a
                    key={i}
                    whileHover={{ scale: 1.12 }}
                    className={`p-3 rounded-full ${s.bg} text-white transition`}
                  >
                    <s.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* MAP */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="rounded-3xl overflow-hidden shadow-2xl h-64 md:h-80"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.915281859215!2d90.423169!3d23.8123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c5d8e7!2sBashundhara%20Residential%20Area!5e0!3m2!1sen!2sbd!4v1630000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>

          {/*  CONTACT FORM */}
          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className={`p-8 md:p-10 rounded-3xl shadow-2xl backdrop-blur-md border ${
              isDarkMode
                ? "bg-gray-800/80 border-gray-700"
                : "bg-white/90 border-orange-200"
            }`}
          >
            <h3
              className={`text-3xl md:text-4xl font-bold mb-10 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Send Us a Message
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className={`p-5 rounded-2xl border-2 w-full transition ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-700 text-white placeholder-gray-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                } focus:border-orange-500 focus:outline-none`}
              />

              <input
                type="email"
                placeholder="Your Email"
                className={`p-5 rounded-2xl border-2 w-full transition ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-700 text-white placeholder-gray-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                } focus:border-orange-500 focus:outline-none`}
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              className={`p-5 rounded-2xl w-full mt-6 border-2 transition ${
                isDarkMode
                  ? "bg-gray-900 border-gray-700 text-white placeholder-gray-500"
                  : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
              } focus:border-orange-500 focus:outline-none`}
            />

            <textarea
              rows="6"
              placeholder="Your Message"
              className={`p-5 rounded-2xl w-full mt-6 border-2 resize-none transition ${
                isDarkMode
                  ? "bg-gray-900 border-gray-700 text-white placeholder-gray-500"
                  : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
              } focus:border-orange-500 focus:outline-none`}
            ></textarea>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="mt-10 w-full py-5 text-xl font-bold rounded-2xl bg-linear-to-r from-yellow-500 to-orange-600 text-white shadow-xl flex items-center justify-center gap-3 group"
            >
              Send Message
              <Send className="w-6 h-6 group-hover:translate-x-1 transition" />
            </motion.button>
          </motion.form>
        </div>
      </section>
    </>
  );
};

export default Contact;
