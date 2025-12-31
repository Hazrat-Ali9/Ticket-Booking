import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useTheme } from "../../../context/ThemeContext/ThemeContext";
import Swal from "sweetalert2";
import {
  User,
  Ticket,
  ShoppingBag,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CheckCircle2,
  XCircle as XCircleIcon,
  Hourglass,
} from "lucide-react";
import Loading from "../../../components/Loading/Loading";

const RequestedBooking = () => {
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useTheme();
  const [bookingStatus, setBookingStatus] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const {
    data: allBookings = [],
    isLoading: loadingAll,
    refetch: refetchAll,
  } = useQuery({
    queryKey: ["allBookingsStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/booking/all");
      return res.data;
    },
  });

  const {
    data: pendingBookings = [],
    isLoading: loadingPending,
    refetch: refetchPending,
  } = useQuery({
    queryKey: ["pendingBookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/booking/pending");
      return res.data;
    },
  });

  const refetch = () => {
    refetchAll();
    refetchPending();
  };

  const stats = useMemo(() => {
    const pending = allBookings.filter((b) => b.status === "pending").length;
    const approved = allBookings.filter((b) => b.status === "approved").length;
    const rejected = allBookings.filter((b) => b.status === "rejected").length;
    return { pending, approved, rejected, total: allBookings.length };
  }, [allBookings]);

  // Pagination
  const totalItems = pendingBookings.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedBookings = pendingBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAccept = async (id) => {
    try {
      await axiosSecure.patch(`/booking/status/${id}`, { status: "approved" });
      setBookingStatus((prev) => ({ ...prev, [id]: "approved" }));
      Swal.fire({
        title: "Approved!",
        text: "Booking has been approved",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    } catch (err) {
      Swal.fire("Error!", "Failed to approve", "error");
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(`/booking/status/${id}`, { status: "rejected" });
      setBookingStatus((prev) => ({ ...prev, [id]: "rejected" }));
      Swal.fire({
        title: "Rejected!",
        text: "Booking has been rejected",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    } catch (err) {
      Swal.fire("Error!", "Failed to reject", "error");
    }
  };

  const isLoading = loadingAll || loadingPending;
  const mutedText = isDarkMode ? "text-gray-400" : "text-gray-500";
  const hoverBg = isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50";

  return (
    <div
      className={`min-h-screen p-4 sm:p-6 lg:p-8 ${
        isDarkMode ? "text-gray-100" : "text-gray-900"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto rounded-2xl shadow-2xl overflow-hidden ${
          isDarkMode ? "" : "bg-white"
        }`}
      >
        {/* Header */}
        <div className="p-6 lg:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-linear-to-br from-orange-500 to-pink-600 shadow-xl">
                <Ticket className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-xl lg:text-4xl font-bold bg-linear-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent">
                  Booking Requests
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Review and manage all pending bookings
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                className={`p-5 rounded-2xl border ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-amber-50 border-amber-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${mutedText}`}>Pending</p>
                    <p className="text-4xl font-bold text-amber-500">
                      {stats.pending}
                    </p>
                  </div>
                  <Hourglass className="w-12 h-12 text-amber-500/20" />
                </div>
              </div>

              <div
                className={`p-5 rounded-2xl border ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-emerald-50 border-emerald-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Approved</p>
                    <p className="text-3xl font-bold text-emerald-500">
                      {stats.approved}
                    </p>
                  </div>
                  <CheckCircle2 className="w-12 h-12 text-emerald-500/20" />
                </div>
              </div>

              <div
                className={`p-5 rounded-2xl border ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Rejected</p>
                    <p className="text-3xl font-bold text-red-500">
                      {stats.rejected}
                    </p>
                  </div>
                  <XCircleIcon className="w-12 h-12 text-red-500/20" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="hidden lg:block px-6 lg:px-10 pb-8">
          <div className="overflow-hidden rounded-xl border border-gray-300 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead
                  className={`border-b ${
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <tr>
                    {[
                      "User",
                      "Ticket Title",
                      "Quantity",
                      "Total Price",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        className={`px-6 py-4 font-medium uppercase tracking-wider ${mutedText} ${
                          h === "Actions" ? "text-center" : ""
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          {h === "User" && <User className="w-4 h-4" />}
                          {h === "Ticket Title" && (
                            <Ticket className="w-4 h-4" />
                          )}
                          {h === "Quantity" && (
                            <ShoppingBag className="w-4 h-4" />
                          )}
                          {h === "Total Price" && (
                            <ShoppingBag className="w-4 h-4" />
                          )}
                          {h}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-700/50">
                  {isLoading ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-20 text-center">
                        <Loading />
                      </td>
                    </tr>
                  ) : paginatedBookings.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-20 text-center">
                        <Ticket className={`mx-auto w-16 h-16 ${mutedText}`} />
                        <p className="text-xl font-medium">
                          No pending requests
                        </p>
                      </td>
                    </tr>
                  ) : (
                    paginatedBookings.map((booking, i) => {
                      const isDisabled =
                        bookingStatus[booking._id] ||
                        booking.status === "approved" ||
                        booking.status === "rejected" ||
                        booking.status === "paid";

                      return (
                        <tr
                          key={booking._id}
                          className={`${
                            i % 2 === 0
                              ? isDarkMode
                                ? "bg-gray-800/30"
                                : "bg-gray-50"
                              : ""
                          } ${hoverBg} transition-all`}
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full bg-linear-to-br from-orange-500 to-pink-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                {booking.userName?.[0]?.toUpperCase()}
                              </div>
                              <div>
                                <div className="font-semibold">
                                  {booking.userName}
                                </div>
                                <div className={`text-xs ${mutedText}`}>
                                  {booking.userEmail}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-5 font-medium">
                            {booking.title}
                          </td>

                          <td className="px-6 py-5 text-center">
                            <span
                              className={`px-4 py-2 rounded-full text-sm font-bold ${
                                isDarkMode
                                  ? "bg-blue-900/50 text-blue-300"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {booking.quantity}
                            </span>
                          </td>

                          <td className="px-6 py-5 text-center">
                            <span className="text-xl font-bold text-green-500">
                              {(
                                booking.totalPrice * booking.quantity
                              ).toLocaleString()}{" "}
                              Tk
                            </span>
                          </td>

                          <td className="px-6 py-5">
                            <div className="flex justify-center gap-3">
                              {/* ACCEPT  */}
                              <button
                                onClick={() => handleAccept(booking._id)}
                                disabled={isDisabled}
                                className={`
                                  flex items-center gap-2 px-5 py-2 rounded-xl font-medium shadow-md transition-all
                                  ${
                                    bookingStatus[booking._id] === "approved" ||
                                    booking.status === "approved"
                                      ? "bg-cyan-600 text-white"
                                      : "bg-emerald-600 hover:bg-emerald-700 text-white"
                                  }
                                  ${
                                    isDisabled
                                      ? "opacity-50 cursor-not-allowed"
                                      : ""
                                  }
                                `}
                              >
                                <CheckCircle className="w-5 h-5" />
                                Accept
                              </button>

                              {/* REJECT  */}
                              <button
                                onClick={() => handleReject(booking._id)}
                                disabled={isDisabled}
                                className={`
                                  flex items-center gap-2 px-5 py-2 rounded-xl font-medium shadow-md transition-all
                                  ${
                                    bookingStatus[booking._id] === "rejected" ||
                                    booking.status === "rejected"
                                      ? "bg-red-800 text-white"
                                      : "bg-red-600 hover:bg-red-700 text-white"
                                  }
                                  ${
                                    isDisabled
                                      ? "opacity-50 cursor-not-allowed"
                                      : ""
                                  }
                                `}
                              >
                                <XCircle className="w-5 h-5" />
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Mobile Table  */}
        <div className="block lg:hidden px-4 sm:px-6 pb-8">
          {isLoading ? (
            <Loading />
          ) : paginatedBookings.length === 0 ? (
            <div className="text-center py-20">
              <Ticket className={`mx-auto w-20 h-20 ${mutedText} mb-4`} />
              <p className="text-xl font-semibold">No pending requests</p>
              <p className={`text-sm ${mutedText} mt-2`}>All caught up!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedBookings.map((booking) => {
                const isDisabled =
                  bookingStatus[booking._id] ||
                  booking.status === "approved" ||
                  booking.status === "rejected" ||
                  booking.status === "paid";

                return (
                  <div
                    key={booking._id}
                    className={`p-6 rounded-2xl border ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    } shadow-lg`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full flex justify-center items-center bg-linear-to-br from-orange-500 to-pink-600 text-white font-bold text-xl shadow-lg">
                        {booking.userName?.[0]?.toUpperCase() || "U"}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">
                          {booking.userName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {booking.userEmail}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Ticket</span>
                        <span className="font-medium">{booking.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Quantity</span>
                        <span
                          className={`px-4 py-1 rounded-full font-bold ${
                            isDarkMode
                              ? "bg-blue-900/50 text-blue-300"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {booking.quantity}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Total</span>
                        <span className="text-2xl font-bold text-green-500">
                          {(
                            booking.totalPrice * booking.quantity
                          ).toLocaleString()}{" "}
                          Tk
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => handleAccept(booking._id)}
                        disabled={isDisabled}
                        className={`flex-1 flex items-center justify-center gap-2 px-5 py-2 rounded-xl font-medium shadow-md transition-all ${
                          bookingStatus[booking._id] === "approved" ||
                          booking.status === "approved"
                            ? "bg-emerald-600 text-white"
                            : "bg-emerald-600 hover:bg-emerald-700 text-white"
                        } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <CheckCircle className="w-5 h-5" />
                        Accept
                      </button>

                      <button
                        onClick={() => handleReject(booking._id)}
                        disabled={isDisabled}
                        className={`flex-1 flex items-center justify-center gap-2 px-5 py-2 rounded-xl font-medium shadow-md transition-all ${
                          bookingStatus[booking._id] === "rejected" ||
                          booking.status === "rejected"
                            ? "bg-red-800 text-white"
                            : "bg-red-600 hover:bg-red-700 text-white"
                        } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <XCircle className="w-5 h-5" />
                        Reject
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div
            className={`p-4 border-t ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            } ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
          >
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
              <div className="text-gray-500">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, totalItems)} of{" "}
                {totalItems} requests
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => goToPage(1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded disabled:opacity-50"
                >
                  <ChevronsLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (page) =>
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - currentPage) <= 1
                  )
                  .map((page, idx, arr) => (
                    <React.Fragment key={page}>
                      {idx > 0 && arr[idx - 1] !== page - 1 && <span>...</span>}
                      <button
                        onClick={() => goToPage(page)}
                        className={`w-10 h-10 rounded-lg font-medium transition ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : isDarkMode
                            ? "hover:bg-gray-700"
                            : "hover:bg-gray-200"
                        }`}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded disabled:opacity-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => goToPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded disabled:opacity-50"
                >
                  <ChevronsRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestedBooking;
