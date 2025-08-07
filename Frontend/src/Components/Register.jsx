// src/Pages/Register.jsx
import React, { useState } from "react";
import { UserRound, Mail, Lock, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { showToast } from "../Functions/commonFunctions.jsx";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../baseUrl.jsx";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        profilePic: null,
    });

    const navigate = useNavigate();
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const changeHandler = (e) => {
        const { id, value, files } = e.target;
        setCredentials((prev) => ({
            ...prev,
            [id]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { firstName, lastName, username, email, password, profilePic } = credentials;

        if (!firstName || !lastName || !username || !profilePic || !email || !password) {
            showToast("All fields are required", "error", "dark");
            return;
        }

        if (password.length < 6) {
            showToast("Password must be at least 6 characters", "error", "dark");
            return;
        }

        try {
            const formData = new FormData();
            Object.entries(credentials).forEach(([key, value]) => {
                formData.append(key, value);
            });
            localStorage.setItem("email", email)
            const res = await axios.post(`${baseUrl}auth/register`, formData);
            showToast(res.data.message, "success", "light");
            setCredentials({
                firstName: "",
                lastName: "",
                username: "",
                email: "",
                password: "",
                profilePic: null,
            });
            navigate("/verifyOtp");
        } catch (err) {
            showToast(err.response?.data?.message || err.message, "error", "dark");
        }
    };

    return (
        <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center px-4">
            <ToastContainer />
            <div className="bg-white w-full max-w-xl p-8 rounded-xl shadow-xl">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                    Create Your Account
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* First Name */}
                    <input
                        type="text"
                        id="firstName"
                        placeholder="First Name"
                        value={credentials.firstName}
                        onChange={changeHandler}
                        className="col-span-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />

                    {/* Last Name */}
                    <input
                        type="text"
                        id="lastName"
                        placeholder="Last Name"
                        value={credentials.lastName}
                        onChange={changeHandler}
                        className="col-span-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />

                    {/* Username */}
                    <div className="col-span-1 sm:col-span-2 flex items-center border border-gray-300 rounded-md px-4 py-2 bg-white">
                        <UserRound className="text-gray-700" />
                        <input
                            type="text"
                            id="username"
                            placeholder="Username"
                            value={credentials.username}
                            onChange={changeHandler}
                            className="ml-3 w-full bg-transparent focus:outline-none text-gray-800"
                        />
                    </div>

                    {/* Email */}
                    <div className="col-span-1 sm:col-span-2 flex items-center border border-gray-300 rounded-md px-4 py-2 bg-white">
                        <Mail className="text-gray-700" />
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={credentials.email}
                            onChange={changeHandler}
                            className="ml-3 w-full bg-transparent focus:outline-none text-gray-800"
                        />
                    </div>

                    {/* Password */}
                    <div className="col-span-1 sm:col-span-2 flex items-center border border-gray-300 rounded-md px-4 py-2 bg-white">
                        <Lock className="text-gray-700" />
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Password"
                            value={credentials.password}
                            onChange={changeHandler}
                            className="ml-3 w-full bg-transparent focus:outline-none text-gray-800"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="ml-2 text-gray-500"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {/* Profile Pic Upload */}
                    <div className="col-span-1 sm:col-span-2">
                        <label className="block mb-1 text-sm text-gray-700">Profile Picture</label>
                        <input
                            type="file"
                            id="profilePic"
                            accept="image/*"
                            onChange={changeHandler}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 file:mr-4 file:py-1 file:px-2 file:border-0 file:text-sm file:bg-gray-800 file:text-white hover:file:bg-gray-700"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-1 sm:col-span-2 mt-2">
                        <button
                            type="submit"
                            className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 rounded-md transition duration-200"
                        >
                            Register
                        </button>
                    </div>

                    <div className="col-span-1 sm:col-span-2 text-center text-sm text-gray-600 mt-2">
                        Already have an account?{" "}
                        <a href="/login" className="text-gray-800 hover:underline font-medium">
                            Login here
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;