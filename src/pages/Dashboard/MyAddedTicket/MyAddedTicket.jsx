import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import UseAuth from "../../../hooks/UseAuth";
import Loading from "../../../components/Loading/Loading";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// my added ticket
const MyAddedTicket = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketAddedDate, setTicketAddedDate] = useState(null);
  const [ticketTime, setTicketTime] = useState(null);

  const openUpdateModal = (ticket) => {
    setSelectedTicket(ticket);
    setTicketAddedDate(ticket.date ? new Date(ticket.date) : null);

    if (ticket.time) {
      const [hours, minutes, seconds] = ticket.time.split(":");
      const time = new Date();
      time.setHours(parseInt(hours));
      time.setMinutes(parseInt(minutes));
      time.setSeconds(parseInt(seconds));
      setTicketTime(time);
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
    setTicketAddedDate(null);
    setTicketTime(null);
  };

  const {
    data: tickets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myTickets", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/added-ticket?email=${user?.email}`
      );
      return data;
    },
    enabled: !!user?.email,
  });

  // Delete Ticket
  const handleDeleteTicket = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This Ticket will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/added-ticket/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              icon: "success",
              title: "Ticket Deleted",
              timer: 2000,
              showConfirmButton: false,
            });
            refetch();
          }
        });
      }
    });
  };

  // Ticket Update
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!ticketAddedDate) {
      Swal.fire("Error", "Please select a valid date!", "error");
      return;
    }

    if (!ticketTime) {
      Swal.fire("Error", "Please select a valid time!", "error");
      return;
    }

    const form = e.target;
    const updatedTicket = {
      title: form.title.value,
      from: form.from.value,
      to: form.to.value,
      transport: form.transport.value,
      price: parseInt(form.price.value),
      quantity: parseInt(form.quantity.value),
      date: ticketAddedDate.toISOString(),
      time: ticketTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }),
    };

    try {
      const res = await axiosSecure.patch(
        `/added-ticket/update/${selectedTicket._id}`,
        updatedTicket
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Updated Successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
        refetch();
        closeModal();
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto p-6"
    >
      <h2 className="text-4xl font-extrabold text-center text-orange-700 dark:text-orange-400 tracking-wide mb-12 drop-shadow">
        My Added Tickets
      </h2>

      {tickets.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
          You haven't added any tickets yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {tickets.map((ticket) => (
            <motion.div
              key={ticket._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ duration: 0.25 }}
              className="relative rounded-3xl bg-white dark:bg-gray-800 border border-orange-100 dark:border-gray-700 shadow-xl dark:shadow-lg hover:shadow-3xl transition-all duration-300 p-6"
            >
              {/* IMAGE */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="w-full h-44 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* STATUS */}
              <span
                className={`absolute top-6 right-6 px-4 py-1 text-sm font-semibold rounded-full shadow-md ${
                  ticket.status === "pending"
                    ? "bg-yellow-400 text-gray-900"
                    : ticket.status === "approved"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {ticket.status === "approved" && "✔ Approved"}
                {ticket.status === "pending" && "⏳ Pending"}
                {ticket.status === "rejected" && "❌ Rejected"}
              </span>

              {/* TITLE */}
              <h3 className="mt-5 text-2xl font-bold text-gray-900 dark:text-gray-100 leading-snug">
                {ticket.title}
              </h3>

              {/* INFO */}
              <div className="mt-4 grid grid-cols-2 gap-3 text-gray-700 dark:text-gray-300 text-sm">
                <p>
                  <strong>From:</strong> {ticket.from}
                </p>
                <p>
                  <strong>To:</strong> {ticket.to}
                </p>
                <p>
                  <strong>Transport:</strong> {ticket.transport}
                </p>
                <p>
                  <strong>Price:</strong> ৳ {ticket.price}
                </p>
                <p>
                  <strong>Quantity:</strong> {ticket.quantity}
                </p>

                <div className="flex items-center gap-2 col-span-2 mt-2">
                  <FaCalendarAlt className="text-orange-600 dark:text-orange-400" />
                  <span>{new Date(ticket.date).toLocaleDateString()}</span>

                  <FaClock className="text-orange-600 dark:text-orange-400 ml-4" />
                  <span>{ticket.time}</span>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-between mt-7">
                <button
                  onClick={() => openUpdateModal(ticket)}
                  className={`px-5 py-2 rounded-xl font-semibold text-white transition-all duration-300 shadow-md hover:scale-[1.02]${
                    ticket.status === "rejected"
                      ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-60 hover:scale-100"
                      : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  }`}
                >
                  Update
                </button>

                <button
                  onClick={() => handleDeleteTicket(ticket._id)}
                  disabled={ticket.status === "rejected"}
                  className={`px-5 py-2 rounded-xl font-semibold text-white transition-all duration-300 shadow-md hover:scale-[1.02] ${
                    ticket.status === "rejected"
                      ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-60 hover:scale-100"
                      : "bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                  }`}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}

          {/* Ticket Update Modal */}
          {isModalOpen && selectedTicket && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999]">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="bg-white dark:bg-gray-800 w-full max-w-lg p-6 rounded-2xl shadow-2xl"
              >
                <h2 className="text-2xl font-bold mb-4 text-orange-600 dark:text-orange-400">
                  Update Ticket
                </h2>

                <form onSubmit={handleUpdateSubmit} className="grid gap-4">
                  <input
                    name="title"
                    defaultValue={selectedTicket.title}
                    className="input"
                    placeholder="Title"
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      name="from"
                      defaultValue={selectedTicket.from}
                      className="input"
                      placeholder="From"
                      required
                    />
                    <input
                      name="to"
                      defaultValue={selectedTicket.to}
                      className="input"
                      placeholder="To"
                      required
                    />
                  </div>

                  <input
                    name="transport"
                    defaultValue={selectedTicket.transport}
                    className="input"
                    placeholder="Transport"
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      name="price"
                      defaultValue={selectedTicket.price}
                      className="input"
                      placeholder="Price"
                      required
                    />
                    <input
                      type="number"
                      name="quantity"
                      defaultValue={selectedTicket.quantity}
                      className="input"
                      placeholder="Quantity"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <DatePicker
                      selected={ticketAddedDate}
                      onChange={(date) => setTicketAddedDate(date)}
                      minDate={new Date()}
                      placeholderText="Select Ticket Date"
                      className="input-box"
                      dateFormat="yyyy-MM-dd"
                    />
                    <DatePicker
                      selected={ticketTime}
                      onChange={(date) => setTicketTime(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={1}
                      timeCaption="Time"
                      dateFormat="hh:mm:ss aa"
                      placeholderText="Select Time"
                      className="input-box"
                    />
                  </div>

                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 rounded-lg bg-gray-400 text-white"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default MyAddedTicket;
