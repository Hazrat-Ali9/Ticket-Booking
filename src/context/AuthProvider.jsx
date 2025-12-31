import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthContext";
// auth provider
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emailInput, setEmailInput] = useState("");

  const setLoadingSystem = (state = true, delay = 2000) => {
    setLoading(state);

    if (state) {
      setTimeout(() => {
        setLoading(false);
      }, delay);
    }
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logoutUser = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#44C223",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Logged Out!",
              text: "You have been logged out successfully.",
              showConfirmButton: false,
              timer: 2000,
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.message,
            });
          })
          .finally(() => setLoading(false));
      }
    });
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserPersonProfile = async (name, photoURL) => {
    if (!user) return;

    setLoading(true);
    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your name and profile image have been updated successfully.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed!",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = (profile) => {
      return updateProfile(auth.currentUser, profile)
    }

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Email Sent!",
          text: "Password reset email has been sent. Check your inbox.",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      })
      .finally(() => setLoading(false));
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {unsubscribe()};
  }, []);

  const authInfo = {
    user,
    loading,
    setLoading: setLoadingSystem,
    createUser,
    loginUser,
    logoutUser,
    signInWithGoogle,
    resetPassword,
    emailInput,
    setEmailInput,
    updateUserProfile,
    updateUserPersonProfile
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
