import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { useTheme } from "../../context/ThemeContext/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";
import { FaBars, FaTimes, FaBus } from "react-icons/fa";
import UseAuth from "../../hooks/UseAuth";
import { Home, Ticket, LayoutDashboard, Info, Phone } from "lucide-react";
// Navbar
const Navbar = () => {
  const { user, loading, logoutUser } = UseAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "All Tickets", path: "/all-tickets", icon: Ticket },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "About", path: "/about", icon: Info },
    { name: "Contact", path: "/contact", icon: Phone },
  ];

  return (
    <nav
      className={`w-full sticky top-0 z-50 shadow-md transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <FaBus className="text-yellow-500" />
          <span className="text-orange-500">TicketBari</span>
        </Link>

        {/*  Menu */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition ${
                    isActive
                      ? "bg-orange-500 text-white"
                      : "hover:bg-yellow-100 hover:text-orange-600"
                  }`
                }
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`relative w-16 h-8 rounded-full flex items-center px-1 transition-all duration-500 ${
              isDarkMode
                ? "bg-linear-to-r from-gray-800 to-gray-900"
                : "bg-linear-to-r from-yellow-300 to-orange-400"
            } shadow-inner`}
          >
            <span
              className={`absolute w-6 h-6 rounded-full bg-white flex items-center justify-center transform transition-all duration-500 ${
                isDarkMode ? "translate-x-8" : "translate-x-0"
              } shadow-lg`}
            >
              {isDarkMode ? (
                <FiMoon className="text-gray-800 text-sm" />
              ) : (
                <FiSun className="text-yellow-500 text-sm" />
              )}
            </span>
          </button>

          {/* Auth Section */}
          {loading ? (
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          ) : !user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 bg-orange-600 text-white rounded-lg"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 border border-orange-600 text-orange-600 rounded-lg"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileMenu(!profileMenu)}
                className="flex items-center gap-2"
              >
                <img
                  src={user?.photoURL || user?.reloadUserInfo?.photoUrl}
                  alt="profile"
                  className="w-10 h-10 rounded-full border-2 border-yellow-500"
                />
              </button>

              {profileMenu && (
                <div
                  className={`absolute right-0 mt-2 w-44 rounded-md shadow-md p-2 ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <h3 className="text-center mb-2">{user.displayName}</h3>
                  <Link
                    to="/my-profile"
                    className="block px-4 py-2 rounded-md hover:bg-orange-500 hover:text-white"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logoutUser}
                    className="w-full text-left px-4 py-2 rounded-md hover:bg-red-500 hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile  Menu  */}
        <button
          className="lg:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile   */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-3/4 h-full shadow-lg transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } ${isDarkMode ? "bg-gray-900 text-white" : "bg-white"}`}
      >
        <div className="p-5 flex flex-col gap-4">
          <button
            className="self-end text-2xl"
            onClick={() => setMenuOpen(false)}
          >
            <FaTimes />
          </button>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-lg flex items-center gap-3 ${
                    isActive
                      ? "bg-orange-500 text-white"
                      : "hover:bg-yellow-100 hover:text-black"
                  }`
                }
              >
                <Icon size={20} />
                {item.name}
              </NavLink>
            );
          })}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`relative w-16 h-8 rounded-full flex items-center px-1 transition-all duration-500 ${
              isDarkMode
                ? "bg-linear-to-r from-gray-800 to-gray-900"
                : "bg-linear-to-r from-yellow-300 to-orange-400"
            } shadow-inner`}
          >
            <span
              className={`absolute w-6 h-6 rounded-full bg-white flex items-center justify-center transform transition-all duration-500 ${
                isDarkMode ? "translate-x-8" : "translate-x-0"
              } shadow-lg`}
            >
              {isDarkMode ? (
                <FiMoon className="text-gray-800 text-sm" />
              ) : (
                <FiSun className="text-yellow-500 text-sm" />
              )}
            </span>
          </button>

          {/* Auth */}
          {loading ? (
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
          ) : !user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-orange-600 text-white rounded-lg text-center"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 border border-orange-600 text-orange-600 rounded-lg text-center"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/my-profile"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white"
              >
                Profile
              </Link>
              <button
                onClick={logoutUser}
                className="px-4 py-2 rounded-lg bg-red-500 text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
