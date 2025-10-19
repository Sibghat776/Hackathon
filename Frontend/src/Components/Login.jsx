// src/pages/Login.jsx
import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { showToast } from "../utils/commonFunctions.jsx";
import { useNavigate, Link } from "react-router-dom";
import { baseUrl } from "../utils/baseUrl.jsx";
import { useDispatch } from "react-redux";
import { addUser, setLoading } from "../features/userSlice.js";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredentials((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = credentials;

        if (!email || !password)
            return showToast("All fields are required", "error", "dark");

        setIsLoading(true);
        dispatch(setLoading(true));

        try {
            const res = await axios.post(`${baseUrl}auth/login`, credentials, {
                withCredentials: true,
            });

            showToast(res.data.message || "Login successful!", "success", "light");

            dispatch(
                addUser({
                    username: res.data.username,
                    email: res.data.email,
                })
            );

            navigate("/dashboard");
        } catch (err) {
            showToast(
                err.response?.data?.message || "Invalid credentials",
                "error",
                "dark"
            );
        } finally {
            setIsLoading(false);
            dispatch(setLoading(false));
        }
    };

    // Shared style constants
    const inputWrapperClass =
        "col-span-1 sm:col-span-2 flex items-center border border-gray-700/80 rounded-xl px-4 py-3 bg-dark transition duration-300 shadow-inner shadow-gray-900 focus-within:ring-2 focus-within:ring-secondary focus-within:border-secondary";
    const inputBaseClass =
        "ml-3 w-full bg-transparent outline-none text-gray-100 placeholder-gray-500";
    const iconClass = "text-secondary/80 group-focus-within:text-secondary";

    return (
        <div className="min-h-screen w-full bg-dark flex items-center justify-center px-4 py-12">
            <ToastContainer />

            <div className="bg-dark w-full max-w-lg p-10 rounded-3xl shadow-[0_0_80px_rgba(78,205,196,0.1),0_0_20px_rgba(255,107,107,0.15)] border border-gray-800">
                {/* Header */}
                <h2 className="text-4xl font-extrabold text-center mb-10 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-secondary to-accent">
                    Welcome Back 👋
                </h2>
                <p className="text-center text-gray-400 mb-8">
                    Login to your <span className="text-accent font-semibold">HealthMate</span> account
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email */}
                    <div className={`${inputWrapperClass} col-span-2 group`}>
                        <Mail className={iconClass} size={20} />
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your Gmail"
                            value={credentials.email}
                            onChange={handleChange}
                            className={inputBaseClass}
                            autoComplete="email"
                        />
                    </div>

                    {/* Password */}
                    <div className={`${inputWrapperClass} col-span-2 group`}>
                        <Lock className={iconClass} size={20} />
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Enter your password"
                            value={credentials.password}
                            onChange={handleChange}
                            className={inputBaseClass}
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="ml-2 text-gray-500 hover:text-accent transition duration-200"
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {/* Submit */}
                    <div className="col-span-2 mt-6">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-4 rounded-xl text-lg font-extrabold tracking-wider transition duration-300 flex items-center justify-center gap-2 ${isLoading
                                    ? "bg-secondary/40 text-gray-400 cursor-not-allowed shadow-none"
                                    : "bg-accent hover:bg-secondary text-dark shadow-2xl shadow-accent/40 hover:shadow-secondary/40"
                                }`}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin h-5 w-5" /> Logging in...
                                </>
                            ) : (
                                <>
                                    <LogIn size={22} />
                                    Login to HealthMate
                                </>
                            )}
                        </button>
                    </div>

                    {/* Links */}
                    <div className="col-span-2 text-center text-sm text-gray-400 mt-4">
                        Don’t have an account?{" "}
                        <Link
                            to="/register"
                            className="text-secondary hover:text-accent font-semibold transition duration-200"
                        >
                            Register here
                        </Link>
                    </div>

                    <div className="col-span-2 text-center text-sm mt-2">
                        <Link
                            to="/forgot-password"
                            className="text-gray-400 hover:text-secondary transition duration-200"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;