import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaChartLine,
  FaRegChartBar,
  FaShieldAlt,
  FaBus,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext/ThemeContext";
import { useForm } from "react-hook-form";
import UseAuth from "../../hooks/UseAuth";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const { loginUser, signInWithGoogle } = UseAuth();
  const { isDarkMode } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (data) => {
    loginUser(data.email, data.password)
      .then((result) => {
        console.log(result);
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Login Failed!",
          text: error.message,
        });
      });
  };

  const handleGoogleSignIn = () => {
      signInWithGoogle()
        .then((result) => {
          const loggedUser = result.user;
  
          const userInfo = {
            email: loggedUser.email,
            displayName: loggedUser.displayName,
            photoURL: loggedUser.photoURL,
          };
  
          axiosSecure.post("/users", userInfo);
  
          Swal.fire({
            icon: "success",
            title: "Login Successful!",
            timer: 1500,
            showConfirmButton: false,
          });
  
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Google Login Failed!",
            text: error.message,
          });
        });
    };

  return (
    <div
      className={`flex min-h-screen items-center justify-center p-5 transition-all duration-500 ${
        isDarkMode
          ? "bg-linear-to-r from-gray-900 via-gray-800 to-gray-900"
          : "bg-linear-to-r from-yellow-100 via-white to-[#FFEBD0]"
      }`}
    >
      <div
        className={`w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2 transition-all duration-500 ${
          isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
        }`}
      >
        {/* Login Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2 text-center text-yellow-500">
            Welcome Back
          </h2>
          <p
            className={`text-center mb-6 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Access your TicketBari account and manage your bookings.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit(handleLogin)}>
            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <div
                className={`flex items-center rounded-lg p-3 border transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-300"
                }`}
              >
                <FaEnvelope className="text-yellow-500 mr-3" />
                <input
                  type="email"
                  placeholder="Your email address"
                  {...register("email", { required: true })}
                  className={`w-full outline-none bg-transparent ${
                    isDarkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                />
              </div>
              {errors.email && (
                <span className="text-red-500 text-sm">Email is required</span>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <div
                className={`flex items-center rounded-lg p-3 border transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-300"
                }`}
              >
                <FaLock className="text-yellow-500 mr-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/~`]).{8,}$/,
                  })}
                  className={`w-full outline-none bg-transparent ${
                    isDarkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm">
                  Password is required
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-yellow-400 to-orange-500 text-white py-2.5 rounded-lg font-medium hover:opacity-95 hover:shadow-md transition-all cursor-pointer"
            >
              Login
            </button>

            {/* Google Login */}
            <div className="w-full flex items-center justify-center mt-4">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition cursor-pointer ${
                  isDarkMode
                    ? "bg-gray-700 text-yellow-500 hover:bg-gray-600"
                    : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                }`}
              >
                <FaGoogle /> Continue with Google
              </button>
            </div>

            <p
              className={`text-center text-sm mt-4 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-yellow-600 dark:text-yellow-400 font-semibold hover:underline"
              >
                Register Now
              </a>
            </p>
          </form>
        </div>

        {/* Info  */}
        <div
          className={`hidden md:flex flex-col justify-center items-center p-10 space-y-6 transition-all duration-500 ${
            isDarkMode
              ? "bg-linear-to-r from-yellow-600 to-orange-500 text-gray-100"
              : "bg-linear-to-r from-yellow-400 to-orange-400 text-white"
          }`}
        >
          <h2 className="flex items-center gap-2 text-4xl font-extrabold">
            <FaBus className="text-white" />
            TicketBari
          </h2>
          <p className="text-center text-lg leading-relaxed max-w-md">
            Book bus, train, launch & flight tickets easily in one place. Fast,
            secure, and reliable.
          </p>

          <div className="space-y-4 w-full max-w-sm">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <FaChartLine className="text-2xl" />
              <div>
                <p className="font-semibold">Easy Booking</p>
                <p className="text-sm opacity-90">
                  Book tickets in just a few clicks.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <FaRegChartBar className="text-2xl" />
              <div>
                <p className="font-semibold">Manage Trips</p>
                <p className="text-sm opacity-90">
                  Keep track of all your bookings.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <FaShieldAlt className="text-2xl" />
              <div>
                <p className="font-semibold">Secure Payments</p>
                <p className="text-sm opacity-90">
                  Your data and payments are safe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
