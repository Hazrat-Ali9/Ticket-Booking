import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useTheme } from "../../context/ThemeContext/ThemeContext";
// my profile
import {
  FiMail,
  FiUser,
  FiCamera,
  FiCheck,
  FiX,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiGithub,
  FiInstagram,
  FiGlobe,
} from "react-icons/fi";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOST;

const MyProfile = () => {
  const { user, updateUserPersonProfile } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { isDarkMode } = useTheme();
  const auth = getAuth();
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [preview, setPreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [social, setSocial] = useState({
    facebook: "",
    twitter: "",
    linkedin: "",
    github: "",
    instagram: "",
    website: "",
  });

  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["user-info", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("socialLinks");
    if (saved) setSocial(JSON.parse(saved));
  }, []);

  const handleSocialChange = (field, value) => {
    const updated = { ...social, [field]: value };
    setSocial(updated);
    localStorage.setItem("socialLinks", JSON.stringify(updated));
  };

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhoto(user.photoURL || "");
      setPreview(user.photoURL || "");
    }
    if (userInfo) {
      setName((p) => p || userInfo.displayName || "");
      setPhoto((p) => p || userInfo.photoURL || "");
      setPreview((p) => p || userInfo.photoURL || "");
    }
  }, [user, userInfo]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const mutation = useMutation({
    mutationFn: async () => {
      let uploadedImageUrl = photo;

      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${imageHostingKey}`,
          { method: "POST", body: formData }
        );

        const uploadData = await uploadRes.json();
        if (!uploadData.success) throw new Error("Image upload failed");

        uploadedImageUrl = uploadData.data.url;
      }

      await updateUserPersonProfile(name, uploadedImageUrl);
      await auth.currentUser.reload();

      const res = await axiosSecure.patch(`/users/${user.email}`, {
        displayName: name,
        photoURL: uploadedImageUrl,
      });

      return res.data;
    },

    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries(["user-info", user?.email]);
      setImageFile(null);
    },

    onError: (error) => {
      console.error("Full error:", error);
      toast.error("Update failed. Check console.");
    },
  });

  if (isLoading || !user) return <Loading />;

  const socialIcons = [
    { Icon: FiFacebook, color: "bg-blue-600", link: social.facebook },
    { Icon: FiTwitter, color: "bg-sky-500", link: social.twitter },
    { Icon: FiLinkedin, color: "bg-blue-700", link: social.linkedin },
    { Icon: FiGithub, color: "bg-gray-800", link: social.github },
    {
      Icon: FiInstagram,
      color: "bg-gradient-to-br from-purple-600 to-pink-600",
      link: social.instagram,
    },
    { Icon: FiGlobe, color: "bg-orange-600", link: social.website },
  ];

  const modeClass = (light, dark) => (isDarkMode ? dark : light);

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${modeClass(
        "bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50",
        "bg-[#101828]"
      )}`}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 bg-linear-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
          My Profile
        </h1>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Profile Card */}
          <div
            className={`rounded-3xl overflow-hidden shadow-2xl border ${modeClass(
              "bg-white/80 border-orange-100 backdrop-blur-md",
              "bg-gray-800/70 border-orange-800 backdrop-blur-xl"
            )}`}
          >
            <div className="h-52 bg-linear-to-r from-orange-500 via-amber-500 to-yellow-500 relative" />

            <div className="relative px-10 pb-12 -mt-16">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={photo || null}
                    alt="Profile"
                    className="w-40 h-40 rounded-full object-cover border-8 border-white dark:border-gray-800 shadow-2xl"
                  />

                  <div className="absolute bottom-3 right-2 bg-green-500 w-10 h-10 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                    <FiCheck className="text-white text-xl" />
                  </div>
                </div>

                <h2 className="text-3xl font-bold mt-6 bg-linear-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                  {name}
                </h2>

                {/* Social Icons */}
                <div className="flex gap-4 mt-8">
                  {socialIcons.map(
                    ({ Icon, color, link }, index) =>
                      link && (
                        <a
                          key={index}
                          href={
                            link.startsWith("http") ? link : `https://${link}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-12 h-12 ${color} text-white rounded-xl flex items-center justify-center`}
                        >
                          <Icon className="text-xl" />
                        </a>
                      )
                  )}
                </div>

                <div className="mt-10 w-full space-y-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${modeClass(
                        "bg-orange-100",
                        "bg-orange-900/50"
                      )} flex items-center justify-center`}
                    >
                      <FiMail
                        className={
                          modeClass("text-orange-600", "text-amber-400") +
                          " text-xl"
                        }
                      />
                    </div>
                    <div>
                      <p
                        className={`text-sm ${modeClass(
                          " text-black",
                          " text-white"
                        )}`}
                      >
                        Email
                      </p>
                      <p
                        className={`font-medium ${modeClass(
                          " text-black",
                          " text-white"
                        )}`}
                      >
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${modeClass(
                        "bg-amber-100",
                        "bg-amber-900/50"
                      )} flex items-center justify-center`}
                    >
                      <FiUser
                        className={
                          modeClass("text-amber-600", "text-yellow-400") +
                          " text-xl"
                        }
                      />
                    </div>
                    <div>
                      <p
                        className={`text-sm ${modeClass(
                          " text-black",
                          " text-white"
                        )}`}
                      >
                        Role
                      </p>
                      <p
                        className={`font-medium capitalize ${modeClass(
                          " text-black",
                          " text-white"
                        )}`}
                      >
                        {userInfo?.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Update Form */}
          <div
            className={`rounded-3xl p-10 shadow-2xl border ${modeClass(
              "bg-white/90 border-orange-100 backdrop-blur-md",
              "bg-gray-800/70 border-orange-800 backdrop-blur-xl"
            )}`}
          >
            <h3 className="text-2xl font-bold mb-8 bg-linear-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Update Profile
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                mutation.mutate();
              }}
              className="space-y-7"
            >
              {/* Photo */}
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <img
                    src={preview || null}
                    alt="Preview"
                    className="w-32 h-32 rounded-2xl object-cover shadow-xl border-4 border-orange-300"
                  />
                  <label className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <FiCamera className="text-white text-4xl" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Name */}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
                className={`w-full px-6 py-4 rounded-2xl text-lg border-2 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all ${modeClass(
                  "bg-gray-50 border-gray-200 text-black",
                  "bg-gray-700 border-gray-600 text-white"
                )}`}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  {
                    icon: FiFacebook,
                    placeholder: "facebook.com/username",
                    field: "facebook",
                  },
                  {
                    icon: FiTwitter,
                    placeholder: "twitter.com/username",
                    field: "twitter",
                  },
                  {
                    icon: FiLinkedin,
                    placeholder: "linkedin.com/in/username",
                    field: "linkedin",
                  },
                  {
                    icon: FiGithub,
                    placeholder: "github.com/username",
                    field: "github",
                  },
                  {
                    icon: FiInstagram,
                    placeholder: "instagram.com/username",
                    field: "instagram",
                  },
                  {
                    icon: FiGlobe,
                    placeholder: "yoursite.com",
                    field: "website",
                  },
                ].map(({ icon: Icon, placeholder, field }) => (
                  <div key={field} className="relative">
                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
                    <input
                      type="text"
                      value={social[field]}
                      onChange={(e) =>
                        handleSocialChange(field, e.target.value)
                      }
                      placeholder={placeholder}
                      className={`w-full pl-14 pr-5 py-4 rounded-xl border focus:border-orange-500 transition-all ${modeClass(
                        "bg-gray-50 border-gray-200 text-black",
                        "bg-gray-700 border-gray-600 text-white"
                      )}`}
                    />
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-5 pt-8">
                <button
                  type="button"
                  onClick={() => {
                    setPreview(photo);
                    setImageFile(null);
                  }}
                  className={`flex-1 py-4 rounded-2xl border-2 transition ${modeClass(
                    "bg-gray-50 border-gray-200 text-black",
                    "bg-gray-700 border-gray-600 text-white"
                  )}`}
                >
                  <FiX className="inline mr-2" /> Cancel
                </button>

                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="flex-1 py-4 bg-linear-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                >
                  {mutation.isPending ? (
                    "Saving..."
                  ) : (
                    <>
                      <FiCheck className="inline mr-2 text-xl" /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
