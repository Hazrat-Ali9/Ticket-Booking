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
} from "react-icons/fa";
import Loading from "../Loading/Loading";

const AdvertisedTicket = () => {
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useTheme();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["advertisedTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/added-ticket/advertised");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />
  }


  return (
    <div
      className={`py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-700 ${
        isDarkMode ? "bg-[#0F172A]" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-extrabold bg-linear-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Featured Advertised Tickets
          </h1>
          <p
            className={`mt-4 text-lg ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {tickets.length} special ticket available
          </p>
        </div>

        {/* No Tickets */}
        {tickets.length === 0 ? (
          <div className="text-center py-32">
            <div className="text-8xl mb-6 opacity-10">No tickets</div>
            <p className="text-2xl font-medium text-gray-500">
              No advertised tickets available right now
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className={`group relative rounded-3xl overflow-hidden shadow-2xl border ${
                  isDarkMode
                    ? "bg-gray-900/80 border-gray-800 backdrop-blur-xl"
                    : "bg-white/90 border-gray-200 backdrop-blur-sm"
                } transition-all duration-500 hover:shadow-orange-500/20`}
              >
                {/* Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 text-xs font-bold tracking-wider text-white bg-linear-to-r from-orange-500 to-pink-600 rounded-full shadow-lg">
                    ADVERTISED
                  </span>
                </div>

                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={ticket.image}
                    alt={ticket.title}
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-5 text-white">
                    <p className="text-lg font-bold tracking-wider">
                      {ticket.from} → {ticket.to}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-5">
                  <h2 className="text-2xl font-bold line-clamp-1 bg-linear-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent">
                    {ticket.title}
                  </h2>

                  <div className="space-y-4 text-sm">
                    {/* Transport + Seats */}
                    <div className="flex items-center justify-between">
                      <p
                        className={`flex items-center gap-3 font-medium ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        <FaBus className="text-orange-500 text-lg" />
                        {ticket.transport}
                      </p>

                      <p className="text-xs bg-gray-800/50 px-3 py-1 rounded-full text-gray-300">
                        {ticket.quantity} seats
                      </p>
                    </div>

                    {/* Price + Perks */}
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-extrabold text-orange-500">
                        ৳ {ticket.price}
                        <span className="text-sm font-normal text-gray-500">
                          {" "}
                          /person
                        </span>
                      </p>

                      {ticket.perks?.length > 0 && (
                        <div className="flex items-center gap-2 text-pink-500">
                          <FaGift className="text-lg" />
                          <span className="text-xs line-clamp-1">
                            {ticket.perks.join(" • ")}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Date */}
                    <div
                      className={`flex items-center gap-3 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <FaCalendarAlt className="text-blue-500" />
                      <span className="font-medium">
                        {new Date(ticket.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span className="text-gray-500">• {ticket.time}</span>
                    </div>
                  </div>

                  {/* Ticket Details */}
                  <Link
                    to={`/all-tickets/${ticket._id}`}
                    className="flex items-center justify-center gap-3 w-full py-4 mt-6 text-white font-bold text-lg rounded-2xl bg-linear-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-xl"
                  >
                    View Details
                    <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvertisedTicket;
