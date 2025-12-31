import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
// payment success
const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const isMounted = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [sessionId, axiosSecure]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const checkVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 200, damping: 15 },
    },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-30"
        />
        <motion.div
          animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-30"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md"
      >
        <motion.div
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-green-100 overflow-hidden"
          whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
          transition={{ duration: 0.3 }}
        >
          {/* Success Check Icon */}
          <motion.div
            variants={checkVariants}
            className="flex justify-center mb-8"
          >
            <motion.div variants={pulseVariants} animate="pulse">
              <AiOutlineCheckCircle className="text-green-500" size={100} />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4"
          >
            Payment Successful!
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-center text-base md:text-lg leading-relaxed mb-6"
          >
            Your payment has been processed successfully. Thank you for your
            purchase! A confirmation email has been sent to your inbox.
          </motion.p>

          {/* Transaction ID */}
          {paymentInfo.transactionId && (
            <motion.div
              variants={itemVariants}
              className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8 text-center"
            >
              <p className="text-sm text-gray-600 mb-1">Transaction ID</p>
              <p className="text-lg font-mono font-semibold text-green-700 break-all">
                {paymentInfo.transactionId}
              </p>
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="flex justify-center">
            <motion.button
              onClick={() => navigate(-2)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-linear-to-r from-green-600 to-teal-600 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 cursor-pointer"
            >
              <span>Go Back</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-gray-500">
            © 2025 TicketBari • Secure Payment Powered by Stripe
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
