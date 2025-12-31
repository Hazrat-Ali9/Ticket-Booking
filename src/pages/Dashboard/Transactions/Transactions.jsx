import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";
import Loading from "../../../components/Loading/Loading";
import { useTheme } from "../../../context/ThemeContext/ThemeContext";
import { format } from "date-fns";
import { CreditCard, Calendar, DollarSign, Hash } from "lucide-react";

const Transactions = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const { isDarkMode } = useTheme();

  const {
    data: payments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-orange-500 dark:text-orange-400 text-xl font-medium">
          Failed to load transactions
        </div>
      </div>
    );

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const totalSpent = payments.reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : ""}`}>
      {/* Header */}
      <div className="bg-linear-to-r from-orange-500 via-amber-500 to-yellow-500 px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
            Transaction History
          </h1>
          <p className="text-yellow-100 text-sm sm:text-base md:text-lg">
            All your payments in one beautiful place
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10">
        {payments.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-14">
            {[
              {
                title: "Total Transactions",
                value: payments.length,
                icon: (
                  <Hash className="w-6 h-6 sm:w-7 sm:h-7 text-orange-500" />
                ),
                color: "orange",
              },
              {
                title: "Total Spent",
                value: formatCurrency(totalSpent),
                icon: (
                  <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 text-amber-500" />
                ),
                color: "amber",
              },
              {
                title: "Latest Payment",
                value: formatCurrency(payments[0]?.amount || 0),
                icon: (
                  <CreditCard className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-500" />
                ),
                color: "yellow",
              },
              {
                title: "Last Activity",
                value: payments[0]
                  ? format(new Date(payments[0].paidAt), "dd MMM yyyy")
                  : "N/A",
                icon: (
                  <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-orange-500" />
                ),
                color: "orange",
              },
            ].map((card, i) => (
              <div
                key={i}
                className={`rounded-2xl shadow-lg p-5 sm:p-6 border backdrop-blur-md transition-transform hover:scale-[1.02] ${
                  isDarkMode
                    ? "bg-gray-800/90 border-gray-700"
                    : "bg-white/95 border-orange-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        isDarkMode ? "text-orange-200" : "text-orange-600"
                      }`}
                    >
                      {card.title}
                    </p>
                    <p
                      className={`text-2xl sm:text-3xl font-bold mt-2 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {card.value}
                    </p>
                  </div>
                  <div className="p-3 bg-orange-500/20 rounded-full">
                    {card.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Main Table/Card */}
        <div
          className={`rounded-2xl shadow-2xl overflow-hidden border-2 ${
            isDarkMode
              ? "bg-gray-800/95 border-orange-800/50"
              : "bg-white/98 border-orange-200"
          }`}
        >
          <div className="bg-linear-to-r from-orange-500 to-amber-500 p-5 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              All Transactions
            </h2>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead
                className={`${isDarkMode ? "bg-gray-700/60" : "bg-orange-50"}`}
              >
                <tr>
                  {["No.", "Transaction ID", "Ticket", "Amount", "Date"].map(
                    (head) => (
                      <th
                        key={head}
                        className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${isDarkMode ? "text-orange-300" : "text-orange-600"}`}
                      >
                        {head}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? "divide-gray-700" : "divide-orange-100"}`}>
                {payments.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-20">
                      <div className="text-orange-400 dark:text-orange-500">
                        <CreditCard className="w-20 h-20 mx-auto mb-4 opacity-40" />
                        <p className="text-xl font-medium">
                          No transactions yet
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  payments.map((payment, index) => (
                    <tr
                      key={payment._id}
                      className={`transition-colors ${isDarkMode ? "hover:bg-gray-700/50" : "hover:bg-orange-50"}`}
                    >
                      <td className={`px-6 py-5 text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        {index + 1}
                      </td>
                      <td className="px-6 py-5 font-mono text-sm text-orange-600 dark:text-orange-400 font-semibold">
                        {payment.transactionId}
                      </td>
                      <td
                        className={`px-6 py-5 text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        {payment.ticketName}
                      </td>
                      <td className={`px-6 py-5 text-lg font-bold ${isDarkMode ? "text-amber-400" : "text-amber-600"}`}>
                        {formatCurrency(payment.amount)}
                      </td>
                      <td className={`px-6 py-5 text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        {format(new Date(payment.paidAt), "dd MMM yyyy")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden mobile-wrapper p-4 space-y-4">
            {payments.length === 0 ? (
              <div className="text-center py-16">
                <CreditCard className="w-16 h-16 mx-auto mb-4 text-orange-400 opacity-40" />
                <p className="text-base font-medium text-orange-500 dark:text-orange-400">
                  No transactions found
                </p>
              </div>
            ) : (
              payments.map((payment, index) => (
                <div
                  key={payment._id}
                  className={`mobile-card rounded-xl p-4 shadow-md border transition-all ${
                    isDarkMode
                      ? "bg-gray-800/90 border-gray-700"
                      : "bg-white border-orange-200"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="mobile-card-title text-xs text-orange-600 dark:text-orange-400 font-semibold">
                        Transaction #{index + 1}
                      </p>
                      <p className="mobile-card-id font-mono text-xs font-bold text-orange-600 dark:text-orange-400 mt-1">
                        {payment.transactionId}
                      </p>
                    </div>
                    <span className="mobile-card-amount text-lg font-bold text-amber-600 dark:text-amber-400">
                      {formatCurrency(payment.amount)}
                    </span>
                  </div>

                  <h3
                    className={`mobile-card-title text-sm font-bold mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    {payment.ticketName}
                  </h3>

                  <div className="mobile-card-date flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {format(new Date(payment.paidAt), "dd MMM yyyy")}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
