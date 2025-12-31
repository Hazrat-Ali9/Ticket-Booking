import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useTheme } from "../../../context/ThemeContext/ThemeContext";
import Loading from "../../../components/Loading/Loading";
import { Megaphone, Ticket, Calendar, DollarSign } from "lucide-react";

const AdvertiseTickets = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { isDarkMode } = useTheme();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["approved-tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/added-ticket/approved");
      return res.data;
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, advertise }) => {
      const res = await axiosSecure.patch(`/added-ticket/advertise/${id}`, {
        advertise,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["approved-tickets"]);
    },
  });

  const handleToggle = (id, current) => {
    toggleMutation.mutate({ id, advertise: !current });
  };

  if (isLoading) return <Loading />;

  return (
    <div
      className={`p-6 min-h-screen transition-all duration-300 ${
        isDarkMode ? "text-gray-100" : "text-gray-900"
      }`}
    >
      <h1
        className={`text-4xl font-bold mb-8 text-center flex justify-center items-center gap-3 ${
          isDarkMode ? "text-yellow-400" : "text-orange-600"
        }`}
      >
        <Megaphone size={36} />
        Advertise Tickets
      </h1>

      <div
        className={`rounded-xl shadow-xl overflow-hidden backdrop-blur-md ${
          isDarkMode
            ? "bg-[#242424]/80 border border-gray-700"
            : "bg-white/80 border border-orange-200"
        }`}
      >
        {/* DESKTOP TABLE */}
        <div className="hidden md:block overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr
                className={`text-left text-base ${
                  isDarkMode ? "bg-[#333]" : "bg-orange-100"
                }`}
              >
                <th className={`p-4 w-16 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>SL</th>
                <th className={`p-4 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>Title</th>
                <th className={`p-4 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>Price</th>
                <th className={`p-4 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>Date</th>
                <th className={`p-4 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>Advertise</th>
              </tr>
            </thead>

            <tbody>
              {tickets.map((ticket, index) => (
                <tr
                  key={ticket._id}
                  className={`border-b transition-all ${
                    isDarkMode
                      ? "border-gray-700 hover:bg-[#3a3a3a]"
                      : "border-orange-200 hover:bg-orange-50"
                  }`}
                >
                  <td className="p-4 font-bold">{index + 1}</td>
                  <td className="p-4 font-medium">{ticket.title}</td>
                  <td className="p-4">৳ {ticket.price}</td>
                  <td className="p-4">
                    {new Date(ticket.date).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className={`toggle ${
                          ticket.advertise
                            ? "toggle-warning"
                            : "toggle-secondary"
                        }`}
                        checked={ticket.advertise}
                        onChange={() =>
                          handleToggle(ticket._id, ticket.advertise)
                        }
                      />

                      <span
                        className={`font-semibold ${
                          ticket.advertise
                            ? isDarkMode
                              ? "text-yellow-300"
                              : "text-orange-600"
                            : "text-gray-500"
                        }`}
                      >
                        {ticket.advertise ? "Advertised" : "Not Advertised"}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARD VIEW */}
        <div className="md:hidden p-4">
          {tickets.map((ticket, index) => (
            <div
              key={ticket._id}
              className={`mb-4 p-4 rounded-xl border shadow ${
                isDarkMode
                  ? "bg-[#2d2d2d] border-gray-700"
                  : "bg-orange-50 border-orange-200"
              }`}
            >
              <div className="text-lg font-bold mb-2">
                #{index + 1} — {ticket.title}
              </div>

              <div className="mb-1 flex items-center gap-2">
                <DollarSign size={16} /> ${ticket.price}
              </div>

              <div className="mb-3 flex items-center gap-2">
                <Calendar size={16} />{" "}
                {new Date(ticket.date).toLocaleDateString()}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className={`toggle ${
                    ticket.advertise ? "toggle-warning" : "toggle-secondary"
                  }`}
                  checked={ticket.advertise}
                  onChange={() => handleToggle(ticket._id, ticket.advertise)}
                />

                <span
                  className={`font-semibold ${
                    ticket.advertise
                      ? isDarkMode
                        ? "text-yellow-300"
                        : "text-orange-600"
                      : "text-gray-500"
                  }`}
                >
                  {ticket.advertise ? "Advertised" : "Not Advertised"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvertiseTickets;
