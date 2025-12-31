import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useTheme } from "../../context/ThemeContext/ThemeContext";
import UseAuth from "../../hooks/UseAuth";
// Tickets booking
import { FaBus, FaClock, FaMapMarkerAlt, FaTicketAlt, FaTimes, FaInfoCircle } from "react-icons/fa";
import { MdOutlineAttachMoney, MdDateRange } from "react-icons/md";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import Swal from "sweetalert2";

import { motion, AnimatePresence } from "framer-motion";

const TicketDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useTheme();
  const { user } = UseAuth();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [countdown, setCountdown] = useState("");

  // Fetch ticket data
  const { data: ticket = {}, isLoading, error } = useQuery({
    queryKey: ["ticket", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/added-ticket/approved/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Countdown timer
  useEffect(() => {
    if (!ticket?.date) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const departure = new Date(ticket.date).getTime();
      const distance = departure - now;

      if (distance < 0) {
        setCountdown("Expired");
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, [ticket?.date]);

  if (isLoading) return <Loading />;
  if (error || !ticket?._id) {
    return (
      <div className="flex items-center justify-center min-h-screen text-3xl font-bold text-red-500">
        Ticket Not Found!
      </div>
    );
  }

  const isExpired = new Date(ticket.date) < new Date();
  const soldOut = ticket.quantity <= 0;

  const handleBooking = async () => {
    if (quantity > ticket.quantity) {
      toast.warning("Not enough tickets available!");
      return;
    }

    try {
      await axiosSecure.post("/booking", {
        userName: user?.displayName || "Guest",
        userEmail: user?.email || "guest@example.com",
        ticketId: ticket._id,
        title: ticket.title,
        image: ticket.image,
        from: ticket.from,
        to: ticket.to,
        transport: ticket.transport,
        quantity,
        ticketDate: ticket.date,
        time: ticket.time,
        totalPrice: ticket.price * quantity,
        status: "pending",
        bookingTime: new Date().toISOString(),
      });

      // Optimistic update
      ticket.quantity -= quantity;

      Swal.fire({
        icon: "success",
        title: "Booking Successful!",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate('/dashboard')

      setOpenModal(false);
      setQuantity(1);
    } catch (err) {
      toast.error("Booking failed. Please try again.");
    }
  };

  //  Description
  const description = `Embark on a seamless journey with our premium ${ticket.transport} service from ${ticket.from} to ${ticket.to}. Experience unparalleled comfort with modern amenities, air-conditioned cabins, and professional staff ensuring a safe and enjoyable trip. Whether you're traveling for business or leisure, this route offers scenic views and timely departures. Book now to secure your seat and enjoy a hassle-free travel experience at an unbeatable price of ${ticket.price} Tk per ticket. Limited seats available, so don't miss out!`;

  return (
    <>
      {/* Main Content */}
      <div
        className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Hero Image */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl mb-8"
          >
            <img
              src={ticket.image}
              alt={ticket.title}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover brightness-90"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
            <h1
              className="absolute bottom-6 left-6 text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg"
            >
              {ticket.title}
            </h1>
          </motion.div>

          {/*  Content Area */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Details  */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className={`lg:col-span-2 rounded-2xl shadow-xl p-6 sm:p-8 ${
                isDarkMode ? "bg-gray-800/90" : "bg-white/95"
              }`}
            >
              <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Trip Details</h2>
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <InfoItem
                  icon={<FaMapMarkerAlt className="text-orange-500" />}
                  label="Route"
                  value={`${ticket.from} → ${ticket.to}`}
                />
                <InfoItem
                  icon={<FaBus className="text-blue-500" />}
                  label="Transport"
                  value={ticket.transport}
                />
                <InfoItem
                  icon={<MdOutlineAttachMoney className="text-green-500" />}
                  label="Price per Ticket"
                  value={`${ticket.price} Tk`}
                  big
                />
                <InfoItem
                  icon={<FaTicketAlt className={ticket.quantity <= 5 ? "text-red-500" : "text-yellow-500"} />}
                  label="Available Tickets"
                  value={ticket.quantity}
                  warning={ticket.quantity <= 5}
                />
                <InfoItem
                  icon={<MdDateRange className="text-purple-500" />}
                  label="Departure"
                  value={`${new Date(ticket.date).toLocaleDateString("en-GB")} • ${ticket.time}`}
                />
              </div>

              {/* Countdown Timer */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                className="flex flex-col items-center my-10"
              >
                <FaClock className="text-yellow-400 text-5xl mb-4 drop-shadow-lg" />
                <div
                  className={`px-8 py-4 rounded-xl text-2xl sm:text-3xl font-extrabold tracking-wider shadow-xl ${
                    countdown === "Expired"
                      ? "bg-red-600 animate-pulse text-white"
                      : "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                  }`}
                >
                  {countdown === "Expired" ? "EXPIRED" : countdown}
                </div>
              </motion.div>

              {/* Book Button */}
              <motion.button
                whileHover={{ scale: isExpired || soldOut ? 1 : 1.05 }}
                whileTap={{ scale: isExpired || soldOut ? 1 : 0.95 }}
                onClick={() => setOpenModal(true)}
                disabled={isExpired || soldOut}
                className={`w-full py-4 sm:py-5 text-lg sm:text-xl font-semibold rounded-xl text-white transition-all shadow-lg ${
                  isExpired || soldOut
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
                }`}
              >
                {isExpired ? "Trip Expired" : soldOut ? "Sold Out" : "Book Now"}
              </motion.button>
            </motion.div>

            {/* Description Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className={`rounded-2xl shadow-xl p-6 sm:p-8 ${
                isDarkMode ? "bg-gray-800/90" : "bg-white/95"
              }`}
            >
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4 flex items-center gap-2">
                <FaInfoCircle className="text-orange-500" /> About This Trip
              </h2>
              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {description}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {openModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenModal(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-md rounded-2xl p-6 sm:p-8 shadow-2xl ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            >
              <button
                onClick={() => setOpenModal(false)}
                className="absolute top-4 right-4 text-2xl opacity-70 hover:opacity-100 transition"
              >
                <FaTimes />
              </button>

              <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">Confirm Booking</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Number of Tickets</label>
                  <input
                    type="number"
                    min="1"
                    max={ticket.quantity}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(ticket.quantity, +e.target.value)))}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500/50 ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  />
                </div>

                <div className={`text-center py-6  rounded-lg ${isDarkMode ? "bg-gray-700": "bg-gray-100"} `}>
                  <p className="text-lg font-medium">Total Amount</p>
                  <p className="text-3xl font-bold text-orange-500 mt-2">
                    {ticket.price * quantity} Tk
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setOpenModal(false)}
                  className={`flex-1 py-3 rounded-lg font-medium transition ${
                    isDarkMode
                      ? "bg-gray-600 hover:bg-gray-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                  }`}
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBooking}
                  className="flex-1 py-3 rounded-lg font-medium text-white bg-linear-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 shadow-md"
                >
                  Confirm Booking
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Reusable Info Item Component
const InfoItem = ({ icon, label, value, big = false, warning = false }) => (
  <div className="flex items-center gap-4">
    <div className={`text-2xl ${warning ? "text-red-500" : "text-orange-500"}`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p
        className={`font-semibold ${big ? "text-2xl text-green-500" : "text-lg"} ${
          warning ? "text-red-500" : ""
        }`}
      >
        {value}
      </p>
    </div>
  </div>
);

export default TicketDetails;