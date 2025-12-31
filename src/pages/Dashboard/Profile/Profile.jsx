import React from "react";
import UseAuth from "../../../hooks/UseAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "../../../context/ThemeContext/ThemeContext";
import useRole from "../../../hooks/useRole";
import {
  FaEnvelope,
  FaIdBadge,
  FaCalendarCheck,
  FaBan,
  FaShieldAlt,
  FaTicketAlt,
  FaDollarSign,
  FaPlane,
  FaCopy,
} from "react-icons/fa";
import Loading from "../../../components/Loading/Loading";
import { Link } from "react-router";
import { Tooltip } from "react-tooltip";
import { motion } from "framer-motion"; // ✅ import framer-motion
// profile 
const Profile = () => {
  const { user, loading: authLoading } = UseAuth();
  const { role } = useRole();
  const { isDarkMode } = useTheme();
  const axiosSecure = useAxiosSecure();

  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ["userData", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const { data: bookingData = {} } = useQuery({
    queryKey: ["bookingData", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/booking?email=${user?.email}`);
      return res.data;
    },
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment?email=${user?.email}`);
      return res.data;
    },
  });

  const { data: allTickets = [] } = useQuery({
    queryKey: ["tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/added-ticket/approved");
      return res.data;
    },
  });

  const totalSpent = payments.reduce((acc, p) => acc + p.amount, 0);

  if (authLoading || isLoading) return <Loading />;

  const photo = userData?.photoURL || user?.photoURL;
  const joinDate = userData?.createdAt
    ? new Date(userData.createdAt)
    : new Date();

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const formatJoinDate = (date) => {
    const diff = Date.now() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days < 30) return `${days} days ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen px-4 sm:px-6 lg:px-8 py-10 transition-colors ${
        isDarkMode ? "bg-gray-900" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-linear-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p
            className={`mt-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
          >
            Manage your account & track your journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Profile */}
          <motion.div
            layout
            className="lg:col-span-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className={`rounded-3xl overflow-hidden border shadow-xl transition-all
                ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-800"
                    : "bg-white border-gray-200"
                }`}
            >
              <div className="h-32 bg-linear-to-r from-orange-500 via-amber-400 to-yellow-400"></div>

              <div className="relative -mt-16 px-6 pb-8">
                <div className="flex justify-center relative">
                  <motion.img
                    src={photo}
                    alt="Profile"
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-xl ring-4 ring-orange-400/40 transition-transform hover:scale-105"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  {role === "admin" && (
                    <Tooltip id="admin-tooltip" content="Admin" />
                  )}
                  {role === "fraud" && (
                    <Tooltip id="fraud-tooltip" content="Restricted User" />
                  )}
                  {role === "admin" && (
                    <span
                      data-tooltip-id="admin-tooltip"
                      className="absolute -top-1 -right-1 bg-green-500 p-2 rounded-full text-white shadow-lg animate-pulse"
                    >
                      <FaShieldAlt size={16} />
                    </span>
                  )}
                  {role === "fraud" && (
                    <span
                      data-tooltip-id="fraud-tooltip"
                      className="absolute -top-1 -right-1 bg-red-600 p-2 rounded-full text-white shadow-lg animate-pulse"
                    >
                      <FaBan size={16} />
                    </span>
                  )}
                </div>

                <div className="text-center mt-4">
                  <h2
                    className={`text-xl sm:text-2xl font-bold ${
                      isDarkMode ? "text-gray-100" : "text-gray-800"
                    }`}
                  >
                    {userData?.displayName || user?.displayName || "Traveler"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    @{user?.email?.split("@")[0]}
                  </p>

                  {/* Role Badge */}
                  <div
                    className={`mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold text-orange-600 ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-orange-400"
                        : "bg-orange-50 border border-orange-200"
                    }`}
                  >
                    <FaIdBadge />
                    {role || "Passenger"}
                  </div>
                </div>

                <div className="mt-8 space-y-4 text-sm">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                      <FaEnvelope className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-gray-500">Email</p>
                      <p
                        className={`font-medium break-all flex items-center gap-2 ${
                          isDarkMode ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        {user?.email}
                        <button
                          onClick={() =>
                            navigator.clipboard.writeText(user?.email)
                          }
                          className="text-xs text-blue-500 cursor-pointer"
                        >
                          <FaCopy />
                        </button>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isDarkMode ? "bg-yellow-900" : "bg-yellow-100 "
                      }`}
                    >
                      <FaCalendarCheck className="text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-gray-500">Member Since</p>
                      <p
                        className={`font-medium ${
                          isDarkMode ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        {formatJoinDate(joinDate)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Actions */}
          <motion.div
            layout
            className="lg:col-span-8 space-y-8"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 sm:p-6 rounded-3xl border shadow-lg transition-transform hover:scale-105
              ${
                isDarkMode
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-200"
              }`}
            >
              {[
                {
                  label: "Bookings",
                  value: bookingData?.length || 0,
                  icon: <FaTicketAlt />,
                },
                {
                  label: "Spent",
                  value: formatCurrency(totalSpent),
                  icon: <FaDollarSign />,
                },
                {
                  label: "Active Tickets",
                  value: allTickets?.length || 0,
                  icon: <FaTicketAlt />,
                },
                {
                  label: "Trips",
                  value: userData?.completedTrips || 10,
                  icon: <FaPlane />,
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center flex flex-col items-center gap-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="h-20 sm:h-24 w-full rounded-2xl bg-linear-to-br from-amber-400 to-orange-500 p-1">
                    <div
                      className={`h-full w-full rounded-2xl flex items-center justify-center font-bold text-lg sm:text-xl gap-2 truncate ${
                        isDarkMode
                          ? "bg-gray-900 text-white"
                          : "bg-white text-gray-800"
                      }`}
                    >
                      {stat.icon}
                      {stat.value}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {role === "fraud" && (
              <motion.div
                className="p-6 rounded-2xl bg-linear-to-r from-red-700 to-red-600 text-white text-center shadow-xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <FaBan className="mx-auto text-3xl mb-2 animate-pulse" />
                <h3 className="font-bold text-xl">Account Restricted</h3>
                <p className="text-sm mt-1 opacity-90">
                  Your account is limited due to suspicious activity.
                </p>
                <button className="mt-3 px-4 py-2 bg-white text-red-600 rounded-lg font-semibold hover:scale-105 transition">
                  Contact Support
                </button>
              </motion.div>
            )}

            {/* Actions */}
            <motion.div
              className={`p-6 sm:p-8 rounded-3xl border shadow-lg transition-transform hover:scale-105
              ${
                isDarkMode
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-200"
              }`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold mb-5 text-orange-500">
                Account Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  to="/my-profile"
                  className="w-full text-center py-4 rounded-2xl font-bold text-white bg-linear-to-r from-amber-500 to-orange-500 hover:scale-105 transition shadow"
                >
                  Edit Profile
                </Link>

                <button className="w-full py-4 rounded-2xl font-bold text-white bg-linear-to-r from-gray-700 to-gray-900 hover:scale-105 transition shadow">
                  Security Settings
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
