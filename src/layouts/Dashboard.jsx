import React, { useState, useEffect } from "react";
import { FaUser, FaTicketAlt, FaHistory, FaBus, FaTimes } from "react-icons/fa";
import { CiSquareQuestion } from "react-icons/ci";
import { GrOverview } from "react-icons/gr";
import { LuTicketsPlane } from "react-icons/lu";
import { RiTicket2Fill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";
import { VscDiffAdded } from "react-icons/vsc";
import { useTheme } from "../context/ThemeContext/ThemeContext";
import { Link } from "react-router";
import AddedTickets from "../pages/Dashboard/AddedTickets/AddedTickets";
import useRole from "../hooks/useRole";
import Profile from "../pages/Dashboard/Profile/Profile";
import MyAddedTicket from "../pages/Dashboard/MyAddedTicket/MyAddedTicket";
import ManageTickets from "../pages/Dashboard/ManageTickets/ManageTickets";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import MyAddedBooking from "../pages/Dashboard/MyAddedBooking/MyAddedBooking";
import RequestedBooking from "../pages/Dashboard/RequestedBooking/RequestedBooking";
import Transactions from "../pages/Dashboard/Transactions/Transactions";
import AdvertiseTickets from "../pages/Dashboard/AdvertiseTickets/AdvertiseTickets";
import RevenueOverview from "../pages/Dashboard/RevenueOverview/RevenueOverview";
// Dashboard
const Dashboard = () => {
  const { role } = useRole();
  const { isDarkMode } = useTheme();
  const [active, setActive] = useState(localStorage.getItem("dashboardActive") || "profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuChange = (key) => {
    setActive(key);
    localStorage.setItem("dashboardActive", key);
    setIsMobileMenuOpen(false); 
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Role-based menu items
  const menuItems =
    role === "user"
      ? [
          { key: "profile", label: "Profile", icon: <FaUser /> },
          { key: "book-tickets", label: "My Booked Tickets", icon: <FaTicketAlt /> },
          { key: "transactions", label: "Transaction History", icon: <FaHistory /> },
        ]
      : role === "vendor" || role === "fraud"
      ? [
          { key: "profile", label: "Profile", icon: <FaUser /> },
          { key: "added-ticket", label: "Add Ticket", icon: <VscDiffAdded /> },
          { key: "my-tickets", label: "My Added Tickets", icon: <FaTicketAlt /> },
          { key: "request-booking", label: "Requested Bookings", icon: <CiSquareQuestion /> },
          { key: "revenue-overview", label: "Revenue Overview", icon: <GrOverview /> },
        ]
      : role === "admin"
      ? [
          { key: "profile", label: "Profile", icon: <FaUser /> },
          { key: "manage-tickets", label: "Manage Tickets", icon: <LuTicketsPlane /> },
          { key: "manage-users", label: "Manage Users", icon: <HiUsers /> },
          { key: "advertise-tickets", label: "Advertise Tickets", icon: <RiTicket2Fill /> },
        ]
      : [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Mobile Header */}
      <header
        className={`md:hidden flex justify-between items-center px-5 py-4 shadow-lg sticky top-0 z-50 transition-colors ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <FaBus className="text-yellow-500 text-2xl" />
          <span className="text-orange-500">TicketBari</span>
        </Link>

        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="text-3xl text-yellow-500 focus:outline-none"
          aria-label="Open menu"
        >
          ☰
        </button>
      </header>

      {/* Mobile  Sidebar */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />

        <div
          className={`absolute left-0 top-0 h-full w-80 shadow-2xl transform transition-transform ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
                <FaBus className="text-yellow-500" />
                <span className="text-orange-500">TicketBari</span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl text-gray-500 hover:text-red-500 transition"
              >
                <FaTimes />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleMenuChange(item.key)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all font-medium ${
                    active === item.key
                      ? "bg-yellow-400 text-orange-600 shadow-md"
                      : isDarkMode
                      ? "hover:bg-gray-700 text-gray-300"
                      : "hover:bg-yellow-50 text-gray-700"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/*  Footer */}
            {role === "fraud" && (
              <div className="p-5 border-t border-red-800 bg-red-900 bg-opacity-20">
                <p className="text-red-400 text-sm font-semibold text-center">
                  ⚠️ You are marked as <strong>FRAUD</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        <aside
          className={`hidden md:flex flex-col w-64 border-r sticky top-0 h-screen ${
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <div className={`p-6 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
              <FaBus className="text-yellow-500" />
              <span className="text-orange-500">TicketBari</span>
            </Link>
          </div>

          <nav className="flex-1 p-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleMenuChange(item.key)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all font-medium ${
                  active === item.key
                    ? "bg-yellow-400 text-orange-600 shadow-md"
                    : isDarkMode
                    ? "hover:bg-gray-700 text-gray-300"
                    : "hover:bg-yellow-50 text-gray-700"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className={`flex-1 p-5 md:p-8 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
          {role === "fraud" && (
            <div className="p-6 mb-6 bg-red-100 border border-red-400 text-red-700 rounded-xl text-center font-semibold">
              You are marked as <strong>FRAUD</strong>. You cannot add or manage tickets anymore.
            </div>
          )}
          {/* User Dashboard */}
          {active === "profile" && <Profile />}
          {active === "book-tickets" && <MyAddedBooking />}
          {active === "transactions" && <Transactions />}
          {/* Vendor Dashboard */}
          {active === "added-ticket" &&  <AddedTickets role={role} />}
          {active === "request-booking" && <RequestedBooking />}
          {active === "my-tickets" && <MyAddedTicket />}
          {active === "revenue-overview" && <RevenueOverview />}
          {/* Admin Dashboard */}
          {active === "manage-users" && <ManageUsers />}
          {active === "manage-tickets" && <ManageTickets />}        
          {active === "advertise-tickets" && <AdvertiseTickets />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;