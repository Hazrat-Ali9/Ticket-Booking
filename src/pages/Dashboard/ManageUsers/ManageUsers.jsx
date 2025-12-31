import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "../../../context/ThemeContext/ThemeContext";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useTheme();
  const [loadingId, setLoadingId] = useState(null);

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const updateRole = async (id, role) => {
    const roleText =
      role === "admin" ? "Admin" : role === "vendor" ? "Vendor" : "Fraud";

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `You want to make this ${role} ${roleText}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm",
    });

    if (!confirm.isConfirmed) return;

    try {
      setLoadingId(id);
      await axiosSecure.patch(`/users/${id}/role`, { role });
      await refetch();

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: `${role} has been successfully made ${roleText}.`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong. Please try again.",
      });
      console.error("Role update error:", error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div
      className={`p-6 min-h-screen transition ${
        isDarkMode ? "bg-[#0f172a] text-white" : "text-gray-800"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      {/*  TABLET TABLE   */}
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
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={`border-b ${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4 font-medium">
                  {user.displayName}
                </td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4 capitalize">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      user.role === "admin"
                        ? "bg-blue-600/20 text-blue-400"
                        : user.role === "vendor"
                        ? "bg-purple-600/20 text-purple-400"
                        : user.role === "fraud"
                        ? "bg-red-600/20 text-red-400"
                        : "bg-gray-500/20 text-gray-300"
                    }`}
                  >
                    {user.role || "user"}
                  </span>
                </td>

                <td className="py-3 px-4 flex gap-3 justify-center flex-wrap">
                  <button
                    onClick={() => updateRole(user._id, "admin")}
                    disabled={loadingId === user._id || user.role === "admin"}
                    className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 disabled:opacity-40"
                  >
                    {loadingId === user._id ? "..." : "Make Admin"}
                  </button>

                  <button
                    onClick={() => updateRole(user._id, "vendor")}
                    disabled={loadingId === user._id || user.role === "vendor"}
                    className="px-3 py-1 rounded-md bg-purple-600 text-white text-sm hover:bg-purple-700 disabled:opacity-40"
                  >
                    {loadingId === user._id ? "..." : "Make Vendor"}
                  </button>

                  {user.role === "vendor" && (
                    <button
                      onClick={() => updateRole(user._id, "fraud")}
                      disabled={loadingId === user._id}
                      className="px-3 py-1 rounded-md bg-red-600 text-white text-sm hover:bg-red-700 disabled:opacity-40"
                    >
                      {loadingId === user._id ? "..." : "Mark as Fraud"}
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td className="text-center py-6 text-gray-400" colSpan={5}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/*  MOBILE  VIEW  */}
      <div className="md:hidden space-y-4">
        {users.map((user, index) => (
          <div
            key={user._id}
            className={`p-4 rounded-xl shadow ${
              isDarkMode ? "bg-[#1e293b]" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                {user.displayName || "No Name"}
              </h2>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  user.role === "admin"
                    ? "bg-blue-600/20 text-blue-400"
                    : user.role === "vendor"
                    ? "bg-purple-600/20 text-purple-400"
                    : user.role === "fraud"
                    ? "bg-red-600/20 text-red-400"
                    : "bg-gray-500/20 text-gray-300"
                }`}
              >
                {user.role}
              </span>
            </div>

            <p className="text-gray-400 text-sm mt-1">{user.email}</p>

            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={() => updateRole(user._id, "admin")}
                disabled={loadingId === user._id || user.role === "admin"}
                className="w-full py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 disabled:opacity-40"
              >
                {loadingId === user._id ? "..." : "Make Admin"}
              </button>

              <button
                onClick={() => updateRole(user._id, "vendor")}
                disabled={loadingId === user._id || user.role === "vendor"}
                className="w-full py-2 rounded-md bg-purple-600 text-white text-sm hover:bg-purple-700 disabled:opacity-40"
              >
                {loadingId === user._id ? "..." : "Make Vendor"}
              </button>

              {user.role === "vendor" && (
                <button
                  onClick={() => updateRole(user._id, "fraud")}
                  disabled={loadingId === user._id}
                  className="w-full py-2 rounded-md bg-red-600 text-white text-sm hover:bg-red-700 disabled:opacity-40"
                >
                  {loadingId === user._id ? "..." : "Mark as Fraud"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
