import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
  FaGoogle,
  FaChartLine,
  FaRegChartBar,
  FaShieldAlt,
  FaBus,
  FaImage,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext/ThemeContext";
import { useForm } from "react-hook-form";
import UseAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, signInWithGoogle, updateUserProfile } = UseAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleRegister = (data) => {
    const profileImage = data.photo[0];

    createUser(data.email, data.password)
      .then((result) => {
        const formData = new FormData();
        formData.append("image", profileImage);

        const imageAPI = `https://api.imgbb.com/1/upload?&key=${
          import.meta.env.VITE_IMAGE_HOST
        }`;

        axios.post(imageAPI, formData).then((res) => {
          const photoURL = res.data.data.url;

          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
          };

          axiosSecure.post("/users", userInfo);

          updateUserProfile({
            displayName: data.name,
            photoURL: photoURL,
          });
        });

        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "Your account has been created",
          timer: 2000,
          showConfirmButton: false,
        });

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Registration Failed!",
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
        {/*  Info  */}
        <div
          className={`hidden md:flex flex-col justify-center items-center p-10 space-y-6 transition-all duration-500 ${
            isDarkMode
              ? "bg-linear-to-r from-yellow-600 to-orange-500 text-gray-100"
              : "bg-linear-to-r from-yellow-400 to-orange-400 text-white"
          }`}
        >
          <h2 className="flex items-center gap-2 text-4xl font-extrabold">
            <FaBus className="text-white" /> TicketBari
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

        {/* Right Form  */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2 text-center text-yellow-500">
            Create Account
          </h2>
          <p
            className={`text-center mb-6 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Join TicketBari and book your tickets easily today.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit(handleRegister)}>
            {/* Name */}
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <div
                className={`flex items-center rounded-lg p-3 border transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-300"
                }`}
              >
                <FaUser className="text-yellow-500 mr-3" />
                <input
                  type="text"
                  placeholder="Your full name"
                  {...register("name", { required: true })}
                  className={`w-full outline-none bg-transparent ${
                    isDarkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                />
              </div>
              {errors.name && (
                <span className="text-red-500 text-sm">Name is required</span>
              )}
            </div>
            {/* Photo */}
            <div>
              <label className="block mb-1 font-medium">Photo</label>
              <div
                className={`flex items-center rounded-lg p-3 border transition-all duration-300 gap-3 ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-300"
                }`}
              >
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="preview"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <FaImage className="text-yellow-500 mr-3" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  {...register("photo", { required: true })}
                  onChange={handlePhotoChange}
                  className={`w-full outline-none bg-transparent ${
                    isDarkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                />
              </div>
              {errors.photo && (
                <span className="text-red-500 text-sm">Photo is required</span>
              )}
            </div>
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
              <FaUserPlus /> Register
            </button>
            {/* Google */}
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
              Already have an account?{" "}
              <a
                href="/login"
                className="text-yellow-600 dark:text-yellow-400 font-semibold hover:underline"
              >
                Login Now
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
