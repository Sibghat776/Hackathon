import React, { useState, useEffect } from "react";
import { ShieldCheck, Mail, Loader2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { showToast } from "../utils/commonFunctions.jsx";
import { baseUrl } from "../utils/baseUrl.jsx";
import { useDispatch } from "react-redux";
import { addUser } from "../features/userSlice.js";

// 🎨 Healthcare Color Theme
const colors = {
    primary: "#2E8BC0",   // Trust Blue
    secondary: "#B1D4E0", // Light Aqua
    accent: "#0C7B93",    // Deep Teal
    background: "#F7FBFC",// Soft White
    dark: "#1B262C",      // Text Dark
};

const VerifyOTPPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        if (storedEmail) {
            setEmail(storedEmail);
        } else {
            showToast("No registration email found. Redirecting to login.", "error", "dark");
            navigate("/login");
        }
    }, [navigate]);

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!otp || otp.length < 4) {
            showToast("Please enter a valid 4-digit OTP", "error", "dark");
            return;
        }

        setIsVerifying(true);
        try {
            const res = await axios.post(`${baseUrl}auth/verifyOtp`, { email, otp }, { withCredentials: true });
            showToast(res?.data?.data?.message || "OTP Verified Successfully!", "success", "light");

            dispatch(addUser({ username: res?.data?.data?.username, email: res?.data?.data?.email }));
            localStorage.setItem("user", JSON.stringify(res?.data?.data));

            navigate("/dashboard");
        } catch (err) {
            showToast(err.response?.data?.message || "Invalid OTP", "error", "dark");
        } finally {
            setIsVerifying(false);
        }
    };
    return (
        <div
            className="min-h-screen flex items-center justify-center px-4"
            style={{
                background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,
            }}
        >
            <ToastContainer />

            {/* Card */}
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-10 transform transition-all hover:scale-[1.01]">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div
                        className="p-4 rounded-full shadow-md"
                        style={{
                            backgroundColor: colors.secondary,
                        }}
                    >
                        <ShieldCheck size={42} className="text-white" />
                    </div>
                </div>

                {/* Heading */}
                <h2
                    className="text-3xl font-extrabold text-center mb-2"
                    style={{ color: colors.primary }}
                >
                    Verify Your Code
                </h2>
                <p className="text-center text-gray-600 mb-6">
                    We’ve sent a one-time code to{" "}
                    <span className="font-semibold" style={{ color: colors.accent }}>
                        {email || "your registered email"}
                    </span>
                </p>

                {/* Form */}
                <form onSubmit={handleVerify} className="flex flex-col gap-6">
                    <div
                        className="flex items-center border rounded-xl px-4 py-3 shadow-sm focus-within:ring-2"
                        style={{
                            borderColor: colors.secondary,
                            backgroundColor: colors.background,
                        }}
                    >
                        <Mail className="text-gray-500" size={20} />
                        <input
                            type="text"
                            maxLength="6"
                            placeholder="Enter 6-digit OTP"
                            value={otp}
                            onChange={(e) =>
                                setOtp(e.target.value.replace(/[^0-9]/g, ""))
                            }
                            className="flex-1 ml-3 bg-transparent outline-none text-lg font-bold tracking-widest text-center text-gray-800"
                            disabled={isVerifying}
                            autoFocus
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isVerifying}
                        className={`py-3 rounded-xl text-lg font-semibold flex items-center justify-center transition duration-300 shadow-md ${isVerifying
                            ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                            : "hover:shadow-lg"
                            }`}
                        style={{
                            background: isVerifying
                                ? "#A7BBC7"
                                : `linear-gradient(90deg, ${colors.primary}, ${colors.accent})`,
                            color: "white",
                        }}
                    >
                        {isVerifying ? (
                            <>
                                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                Verifying...
                            </>
                        ) : (
                            "Verify & Continue"
                        )}
                    </button>
                </form>

                {/* Links */}
                <div className="text-center mt-6 text-sm text-gray-500">
                    Didn’t receive code?{" "}
                    <a
                        href="#/resend-otp"
                        className="font-semibold transition duration-200 hover:underline"
                        style={{ color: colors.primary }}
                    >
                        Resend OTP
                    </a>
                </div>

                <div className="text-center mt-3">
                    <a
                        href="#/login"
                        className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                        ← Back to Login
                    </a>
                </div>
            </div>
        </div>
    );
};

export default VerifyOTPPage;
