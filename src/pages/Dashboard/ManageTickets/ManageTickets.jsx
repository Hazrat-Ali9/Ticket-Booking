import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";
import { useTheme } from "../../../context/ThemeContext/ThemeContext";
import Loading from "../../../components/Loading/Loading";
import Swal from "sweetalert2";
// manage tickets
const ManageTickets = () => {
  const axiosSecure = useAxiosSecure();
  const [tickets, setTickets] = useState([]);
  const { loading, setLoading } = UseAuth();
  const { isDarkMode } = useTheme();

  const fetchPendingTickets = async () => {
    try {
      const res = await axiosSecure.get("/added-ticket/pending");
      setTickets(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingTickets();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/added-ticket/update/${id}`, { status: "approved" });
      setTickets((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: "approved" } : t))
      );
      Swal.fire({ title: "Approved!", icon: "success" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(`/added-ticket/update/${id}`, { status: "rejected" });
      setTickets((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: "rejected" } : t))
      );
      Swal.fire({ title: "Rejected!", icon: "error" });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Loading />;

  return (
    <div
      className={`p-6 min-h-screen ${
        isDarkMode ? "bg-[#0f172a] text-white" : "text-gray-800"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">Manage Tickets</h1>

      {/*  TABLE  */}
      <div
        className={`hidden md:block overflow-x-auto rounded-xl shadow-lg p-4 ${
          isDarkMode ? "bg-[#1e293b]" : "bg-white"
        }`}
      >
        <table className="min-w-full table-auto">
          <thead>
            <tr
              className={`text-left ${
                isDarkMode
                  ? "bg-[#334155] text-gray-200"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Ticket Name</th>
              <th className="py-3 px-4">Vendor Email</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Quantity</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket, index) => (
              <tr
                key={ticket._id}
                className={`border-b ${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{ticket.title}</td>
                <td className="py-3 px-4">{ticket.vendorEmail}</td>
                <td className="py-3 px-4">৳ {ticket.price}</td>
                <td className="py-3 px-4">{ticket.quantity}</td>

                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      ticket.status === "approved"
                        ? "bg-green-600/20 text-green-400"
                        : ticket.status === "rejected"
                        ? "bg-red-600/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </td>

                <td className="py-3 px-4 flex gap-3 justify-center">
                  <button
                    onClick={() => handleApprove(ticket._id)}
                    disabled={ticket.status !== "pending"}
                    className="px-3 py-1 rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-40"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(ticket._id)}
                    disabled={ticket.status !== "pending"}
                    className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-40"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*  MOBILE CARD   */}
      <div className="md:hidden space-y-4">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            className={`p-4 rounded-xl shadow ${
              isDarkMode ? "bg-[#1e293b]" : "bg-white"
            }`}
          >
            <div className="flex justify-between mb-2">
              <h2 className="font-semibold text-lg">{ticket.title}</h2>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  ticket.status === "approved"
                    ? "bg-green-600/20 text-green-400"
                    : ticket.status === "rejected"
                    ? "bg-red-600/20 text-red-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {ticket.status}
              </span>
            </div>

            <p className="text-sm text-gray-400">{ticket.vendorEmail}</p>

            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <p><span className="font-semibold">Price:</span> ৳{ticket.price}</p>
              <p><span className="font-semibold">Qty:</span> {ticket.quantity}</p>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => handleApprove(ticket._id)}
                disabled={ticket.status !== "pending"}
                className="flex-1 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-40"
              >
                Approve
              </button>

              <button
                onClick={() => handleReject(ticket._id)}
                disabled={ticket.status !== "pending"}
                className="flex-1 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-40"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageTickets;
