import React from "react";
import { useTheme } from "../../context/ThemeContext/ThemeContext";
import { MapPin, ArrowUpRight, Flame } from "lucide-react";
// Popular Routes
const routes = [
  { from: "Dhaka", to: "Chittagong", price: "৳1200" },
  { from: "Dhaka", to: "Cox's Bazar", price: "৳1500" },
  { from: "Dhaka", to: "Sylhet", price: "৳1100" },
  { from: "Dhaka", to: "Rajshahi", price: "৳1000" },
  { from: "Dhaka", to: "Khulna", price: "৳1050" },
  { from: "Dhaka", to: "Barishal", price: "৳900" },
  { from: "Dhaka", to: "Rangpur", price: "৳1150" },
  { from: "Dhaka", to: "Mymensingh", price: "৳850" },
];

const PopularRoutes = () => {
  const { isDarkMode } = useTheme();

  return (
    <section
      className={`relative py-20 overflow-hidden ${
        isDarkMode ? "bg-[#0F172A] text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Background  */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-400/30 rounded-full blur-3xl" />
      <div className="absolute top-20 -right-32 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-linear-to-r from-orange-500 to-pink-600 text-white font-semibold mb-4 shadow-lg">
            <Flame size={18} />
            Trending Routes
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl text-center mb-2 md:mb-4 font-extrabold tracking-tight leading-tight">
            <span className="bg-linear-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Popular Routes
            </span>
          </h2>
          <p
            className={`mt-4 max-w-xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Discover the most booked bus routes on TicketBari
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {routes.map((route, index) => (
            <div
              key={index}
              className="group relative rounded-3xl p-[1.5px] transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-orange-500 to-pink-600 opacity-70" />

              <div
                className={`relative rounded-3xl p-6 h-full backdrop-blur-xl ${
                  isDarkMode ? "bg-gray-900/80" : "bg-white/80"
                }`}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2 text-orange-500 font-semibold">
                    <MapPin size={20} />
                    {route.from}
                  </div>

                  <ArrowUpRight className="text-pink-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
                </div>

                <h3 className="text-xl font-bold mb-4">{route.to}</h3>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-2xl font-extrabold bg-linear-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">
                    {route.price}
                  </span>

                  <button
                    className="
                      px-5 py-2 rounded-full text-sm font-semibold text-white
                      bg-linear-to-r from-orange-500 to-pink-600
                      hover:from-orange-600 hover:to-pink-700
                      shadow-md hover:shadow-xl transition
                    "
                  >
                    View Ticket
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;
