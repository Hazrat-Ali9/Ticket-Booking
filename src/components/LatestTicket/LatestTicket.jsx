import React from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useTheme } from "../../context/ThemeContext/ThemeContext";
import {
  FaBus,
  FaGift,
  FaCalendarAlt,
  FaArrowRight,
  FaTicketAlt,
} from "react-icons/fa";
import Loading from "../Loading/Loading";

const LatestTicket = () => {
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useTheme();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["latestTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/latest-ticket");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      className={`py-16 md:py-20 px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
        isDarkMode ? "bg-[#0B1120]" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/*  Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            <span className="bg-linear-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Latest Tickets
            </span>
          </h1>
          <p className={`mt-3 text-base sm:text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Grab your seat before they're gone!
          </p>
        </div>

        {/* No Tickets  */}
        {tickets.length === 0 ? (
          <div className="text-center py-32 sm:py-40">
            <FaTicketAlt className="mx-auto text-7xl sm:text-9xl opacity-10 text-gray-500 mb-6 sm:mb-8" />
            <p className="text-2xl sm:text-3xl font-semibold text-gray-500">
              No latest tickets available
            </p>
            <p className={`mt-3 text-base sm:text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Check back soon for new journeys!
            </p>
          </div>
        ) : (
          <>
            {/*  Tickets  */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
              {tickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className={`group relative rounded-2xl overflow-hidden shadow-xl border ${
                    isDarkMode
                      ? "bg-gray-900/90 border-gray-800"
                      : "bg-white border-gray-200"
                  } transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-2`}
                >
                  {/*  Badge */}
                  <div className="absolute top-3 right-3 z-20">
                    <span className="px-3 sm:px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-linear-to-r from-orange-500 to-pink-600 rounded-full shadow-lg flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                      Live
                    </span>
                  </div>

                  {/* Image  */}
                  <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden">
                    <img
                      src={ticket.image}
                      alt={ticket.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-4 text-white">
                      <p className="text-base sm:text-lg md:text-xl font-extrabold tracking-wide drop-shadow-lg">
                        {ticket.from} → {ticket.to}
                      </p>
                    </div>
                  </div>

                  {/* Card  */}
                  <div className="p-5 sm:p-6 space-y-3 sm:space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold line-clamp-2 bg-linear-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent">
                      {ticket.title}
                    </h3>

                    {/* Transport & Remaining Seats */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <FaBus className="text-orange-500 text-base" />
                        <span className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          {ticket.transport}
                        </span>
                      </div>
                      <span className="text-xs bg-linear-to-r from-purple-600 to-pink-600 text-white px-2.5 py-1 rounded-full">
                        {ticket.quantity} left
                      </span>
                    </div>

                    {/* Price & Perks */}
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-2xl sm:text-3xl font-black text-orange-500">
                          ৳ {ticket.price}
                        </p>
                        <p className="text-xs text-gray-500 -mt-1">per person</p>
                      </div>

                      {ticket.perks?.length > 0 && (
                        <div className="flex items-center gap-2 text-pink-500">
                          <FaGift className="text-lg sm:text-xl" />
                          <span className="text-xs font-medium">+ Perks</span>
                        </div>
                      )}
                    </div>

                    {/* Date & Time */}
                    <div className={`flex items-center gap-3 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      <FaCalendarAlt className="text-purple-500 shrink-0" />
                      <span className="truncate">
                        {new Date(ticket.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                        {" • "}
                        {ticket.time}
                      </span>
                    </div>

                    <Link
                      to={`/all-tickets/${ticket._id}`}
                      className="mt-4 sm:mt-5 w-full block text-center py-3.5 text-sm sm:text-base font-bold text-white rounded-xl bg-linear-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                    >
                      View Details
                      <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Tickets Button */}
            <div className="text-center mt-12 sm:mt-16">
              <Link
                to="/all-tickets"
                className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold text-white bg-linear-to-r from-purple-600 via-pink-600 to-orange-500 rounded-full shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-500"
              >
                View All Tickets
                <FaArrowRight className="text-lg sm:text-xl" />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LatestTicket;