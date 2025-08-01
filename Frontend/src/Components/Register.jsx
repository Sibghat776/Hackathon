// src/Pages/Register.jsx
import React, { useContext, useReducer, useState } from "react";
import { Person, Email, Lock } from "@mui/icons-material";
import axios from "axios";
import { showToast } from "../Functions/commonFunctions.jsx";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/Auth.jsx";
import { useRef } from "react";
import { ToastContainer } from "react-toastify";

const Register = () => {
    const { user, loading, error, dispatch } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const togglePasswordVisibility = () => setShowPassword(prev => !prev);
    let ref = useRef()
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        email: ""
    })

    let changeHandler = (e) => {
        setCredentials((prev) => (
            { ...prev, [e.target.id]: e.target.value }
        ))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!credentials.username || !credentials.email || !credentials.password) {
            showToast("Missing Fields", "error", "dark")
            return;
        }

        if (credentials.password.length < 6) {
            showToast("Password should contain 6 letters", "error", "dark")
            return
        }

        try {
            const res = await axios.post("http://localhost:3000/api/auth/register", credentials);
            showToast(res.data.message, "success", "light")
            console.log(res, "Response Data ")
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data });
            navigate("/")
        } catch (err) {
            console.log(err);
            showToast((err.response?.data?.message || err.message), "error", "dark")
        }
    };
    return (
        <div className="h-screen w-full bg-gradient-to-br from-green-900 via-green-800 to-green-700 flex items-center justify-center">
            <ToastContainer />
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-green-800 mb-6">Create Account</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Username */}
                    <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                        <Person className="text-green-700" />
                        <input
                            type="text"
                            placeholder="Username"
                            value={credentials.username}
                            onChange={changeHandler}
                            className="flex-1 ml-2 outline-none"
                            id="username"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                        <Email className="text-green-700" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={credentials.email}
                            onChange={changeHandler}
                            className="flex-1 ml-2 outline-none"
                            id="email"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                        <Lock className="text-green-700" />
                        <input
                            type={showPassword ? "text" : "password"} // ← toggle type here
                            placeholder="Password"
                            value={credentials.password}
                            onChange={changeHandler}
                            className="flex-1 ml-2 outline-none"
                            id="password"
                        />
                    </div>

                    {/* Show Password Checkbox */}
                    <div className="flex items-center gap-2 text-sm">
                        <input type="checkbox" onChange={togglePasswordVisibility} id="showPass" />
                        <label htmlFor="showPass" className="text-gray-700">Show Password</label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded transition"
                    >
                        Register
                    </button>
                    <p className="text-center">Already have an account? <a href="/login" className="text-blue-600">Login</a></p>
                </form>
            </div>
        </div>
    );
};

export default Register;