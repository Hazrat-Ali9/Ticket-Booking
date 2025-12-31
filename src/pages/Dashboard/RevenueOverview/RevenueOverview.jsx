import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useTheme } from "../../../context/ThemeContext/ThemeContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import Loading from "../../../components/Loading/Loading";
import UseAuth from "../../../hooks/UseAuth";

const RevenueOverview = () => {
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useTheme();
  const { user } = UseAuth();

  // Fetch Payments
  const { data: payments = [], isLoading: loadingPay } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payment");
      return res.data;
    },
  });

  // Fetch Bookings
  const { data: bookings = [], isLoading: loadingBook } = useQuery({
    queryKey: ["bookingAll"],
    queryFn: async () => {
      const res = await axiosSecure.get("/booking/all");
      return res.data;
    },
  });

  // Fetch Added Tickets
  const { data: tickets = [], isLoading: loadingTickets } = useQuery({
    queryKey: ["ticketsAdded", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/added-ticket?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const totalRevenue = payments.reduce((sum, pay) => sum + pay.amount, 0);
  const totalSold = bookings
    .filter((b) => b.status === "paid")
    .reduce((sum, b) => sum + (b.quantity || 0), 0);
  const totalAdded = tickets.length;

  if (loadingPay || loadingBook || loadingTickets) {
    return <Loading />;
  }

  const barData = [
    { name: "Revenue", value: totalRevenue, fill: "#FBBF24" },
    { name: "Tickets Sold", value: totalSold, fill: "#F59E0B" },
    { name: "Tickets Added", value: totalAdded, fill: "#FB923C" },
  ];

  const pieData = [
    { name: "Sold", value: totalSold },
    { name: "Available", value: totalAdded },
  ];

  const COLORS = ["#FBBF24", "#F59E0B"];

  return (
    <div
      className={`p-mx-4 sm:-mx-6 lg:mx-0 p-8 rounded-2xl shadow-2xl border ${
        isDarkMode
          ? "bg-linear-to-br from-gray-900 via-gray-800 to-amber-950/20 border-amber-800/30"
          : "bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 border-amber-200"
      }`}
    >
      <div className="text-center mb-10">
        <h2
          className={`text-4xl font-extrabold bg-linear-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent`}
        >
          Revenue Overview
        </h2>
        <p
          className={`mt-2 ${isDarkMode ? "text-amber-200" : "text-amber-700"}`}
        >
          Real-time business insights at a glance
        </p>
      </div>

      {/* Stats Cards  */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {[
          {
            label: "Total Revenue",
            value: `$${totalRevenue.toLocaleString()}`,
            icon: "💰",
          },
          {
            label: "Tickets Sold",
            value: totalSold.toLocaleString(),
            icon: "🎫",
          },
          {
            label: "Tickets Added",
            value: totalAdded.toLocaleString(),
            icon: "➕",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`relative overflow-hidden rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 ${
              isDarkMode
                ? "bg-white/5 backdrop-blur-xl border border-amber-700/30 shadow-2xl shadow-amber-900/30"
                : "bg-white/70 backdrop-blur-md border border-amber-300 shadow-2xl shadow-amber-300/40"
            }`}
          >
            <div className="text-5xl mb-4">{item.icon}</div>
            <p
              className={`text-sm font-medium ${
                isDarkMode ? "text-amber-300" : "text-amber-600"
              }`}
            >
              {item.label}
            </p>
            <h3
              className={`text-4xl font-bold mt-3 bg-linear-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent`}
            >
              {item.value}
            </h3>
            <div className="absolute inset-0 bg-linear-to-t from-amber-600/10 to-transparent pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Bar Chart */}
        <div
          className={`p-6 rounded-2xl ${
            isDarkMode ? "bg-black/40" : "bg-white/60"
          } backdrop-blur-lg border ${
            isDarkMode ? "border-amber-800/40" : "border-amber-200"
          }`}
        >
          <h3
            className={`text-xl font-bold text-center mb-6 ${
              isDarkMode ? "text-amber-400" : "text-amber-700"
            }`}
          >
            Performance Summary
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} barSize={60}>
              <XAxis
                dataKey="name"
                stroke={isDarkMode ? "#FDE68A" : "#92400E"}
              />
              <YAxis stroke={isDarkMode ? "#FDE68A" : "#92400E"} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? "#1F2937" : "#FFF7ED",
                  border: "1px solid #F59E0B",
                  borderRadius: "12px",
                  color: isDarkMode ? "#FBBF24" : "#92400E",
                }}
              />
              <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div
          className={`p-6 rounded-2xl ${
            isDarkMode ? "bg-black/40" : "bg-white/60"
          } backdrop-blur-lg border ${
            isDarkMode ? "border-amber-800/40" : "border-amber-200"
          }`}
        >
          <h3
            className={`text-xl font-bold text-center mb-6 ${
              isDarkMode ? "text-amber-400" : "text-amber-700"
            }`}
          >
            Ticket Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
                labelStyle={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  fill: isDarkMode ? "#FFF" : "#451A03",
                }}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? "#1F2937" : "#FFF7ED",
                  border: "1px solid #F59E0B",
                  borderRadius: "12px",
                }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RevenueOverview;
