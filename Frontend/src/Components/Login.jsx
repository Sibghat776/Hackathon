import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/Auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { showToast } from '../Functions/commonFunctions.jsx';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import { AccountCircle, Lock, Visibility, VisibilityOff } from '@mui/icons-material'; // You can replace this with SVGs if avoiding MUI icons

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const { dispatch, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => setShowPassword(prev => !prev);

    const handleChange = (e) => {
        setCredentials(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!credentials.username || !credentials.password) {
            showToast("Missing Fields!", "error", "dark");
            return;
        }

        dispatch({ type: "LOGIN_START" });

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            showToast("Login Successfully", "success", "light");
            navigate("/");
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
            showToast("Wrong Credentials", "error", "dark");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 flex items-center justify-center">
            <ToastContainer />
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <div className="bg-white rounded-3xl shadow-2xl p-10 w-[90vw] max-w-md">
                    <h2 className="text-2xl font-bold text-[#132a13] text-center mb-1">Welcome Back</h2>
                    <p className="text-gray-600 text-center mb-6">Login to continue your journey</p>

                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 mb-1">Username</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#31572c]">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A11.953 11.953 0 0112 15c2.485 0 4.779.755 6.879 2.047M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                <AccountCircle className="text-[#31572c]" />
                            </span>
                            <input
                                id="username"
                                type="text"
                                onChange={handleChange}
                                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                                placeholder="Enter username"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#31572c]">
                                <Lock className="text-[#31572c]" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.38 0 2.5-1.12 2.5-2.5S13.38 6 12 6s-2.5 1.12-2.5 2.5S10.62 11 12 11z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11v2m0 0v1m-6-1a6 6 0 0112 0v1H6v-1z" />
                            </span>
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                onChange={handleChange}
                                className="pl-10 pr-10 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                                placeholder="Enter password"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full bg-[#4f772d] text-white py-2 rounded-lg font-semibold text-lg mt-4 hover:bg-[#3a5a24] transition-all"
                    >
                        Login
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-5">
                        Don't have an account?{' '}
                        <a href="/register" className="text-[#4f772d] font-semibold hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
