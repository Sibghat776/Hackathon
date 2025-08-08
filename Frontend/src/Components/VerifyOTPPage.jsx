import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { showToast } from "../utils/commonFunctions.jsx";
import { baseUrl } from "../utils/baseUrl.jsx";
import { ShieldCheck } from "lucide-react";

const VerifyOTPPage = () => {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const handleVerify = async (e) => {
        e.preventDefault();

        if (!otp || otp.length < 4) {
            showToast("Please enter a valid OTP", "error", "dark");
            return;
        }

        try {
            let email = localStorage.getItem("email")
            const res = await axios.post(`${baseUrl}auth/verifyOtp`, {email, otp });
            showToast(res.data.message || "OTP Verified!", "success", "light");

            // Redirect if needed
            navigate("/");
        } catch (err) {
            showToast(err.response?.data?.message || "Invalid OTP", "error", "dark");
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-700 px-4">
            <ToastContainer />
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
                    Verify OTP
                </h2>

                <form onSubmit={handleVerify} className="flex flex-col gap-4">
                    <div className="flex items-center border border-gray-400 dark:border-gray-700 rounded-full px-4 py-2 bg-gray-50 dark:bg-gray-800 focus-within:ring-2 ring-indigo-500">
                        <ShieldCheck className="text-indigo-600 dark:text-indigo-400" />
                        <input
                            type="text"
                            maxLength="6"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="flex-1 ml-3 bg-transparent outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2 rounded-full transition shadow-lg"
                    >
                        Verify OTP
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyOTPPage;