import React from "react";
import { useNavigate } from "react-router";
import { AiOutlineCheckCircle } from "react-icons/ai";
// payment cencel
const PaymentCencel = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="bg-transparent shadow-xl rounded-lg p-10 text-center max-w-md">
        <div className="flex justify-center mb-5">
          <AiOutlineCheckCircle className="text-green-500" size={80} />
        </div>

        <h2 className="text-3xl font-bold text-green-600 mb-3">
           Payment Canceled
        </h2>

        <p className="text-gray-600 mb-6">
          Your payment was not completed.  
          If this was a mistake, you can try again anytime.
        </p>

        <button
          onClick={() => navigate(-2)}
          className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition duration-300 cursor-pointer"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PaymentCencel;
