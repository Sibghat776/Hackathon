// src/components/Navbar.jsx

import React, { useEffect, useState } from "react";
import { Menu, X, User } from "lucide-react"; // 'User' icon added for clarity
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../assets/Logo.jpg"; // Apne logo path ko adjust kar lijiyega
import { showToast } from "../utils/commonFunctions";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";

const Navbar = () => {
    // State for Mobile Menu visibility
    const [open, setOpen] = useState(false);
    // State for Scroll-aware background
    const dispatch = useDispatch();
    const [isScrolled, setIsScrolled] = useState(false);

    const location = useLocation();

    // REDUX STATE: Assuming your user data is stored in state.auth.user
    // Agar aapka Redux store path alag hai, toh yahan change kar lijiyega.
    const user = useSelector((state) => state);
    const isLoggedIn = !!user;
    // Scroll Effect: Navbar background change after 10px scroll
    useEffect(() => {
        console.log(user, "data from navbar");
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Function to handle active link styling
    const getNavLinkClass = (path) =>
        `relative text-sm font-medium transition duration-300 hover:text-accent ${location.pathname === path ? "text-accent border-b-2 border-accent pb-0.5" : "text-gray-200"
        }`;

    // Function to close mobile menu on link click
    const closeMobileMenu = () => setOpen(false);
    const handleLogout = async () => {
        try {
            axios.post(`${baseUrl}/auth/logout`, {}, {
                withCredentials: true, // ✅ needed if using cookies/session
            })
                .then(res => {
                    // handle redirect or state reset
                })
                .catch(err => {
                    console.error("Logout Error:", err);
                });
            dispatch(removeUser());
            localStorage.removeItem("user");
            showToast("Logged out successfully", "success", "light");
        } catch (err) {
            console.error(err);
            showToast("Error logging out", "error", "light");
        }
    };


    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
                ? "bg-dark/95 shadow-2xl backdrop-blur-lg"
                : "bg-dark/80" // Dikhne ke liye transparent se thoda kam par 'dark/80' set kiya gaya hai.
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                <div className="flex justify-between items-center h-16">
                    {/* 1. Logo and App Name */}
                    <Link to="/" className="flex items-center gap-3" onClick={closeMobileMenu}>
                        <img src={Logo} alt="HealthMate Logo" className="h-9 w-9 rounded-full object-contain" />
                        <span className="text-white font-extrabold text-xl tracking-wider">
                            HealthMate
                        </span>
                    </Link>

                    {/* 2. Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className={getNavLinkClass("/")}>Home</Link>
                        {/* 'About' link (Hash link, so no active state logic) */}
                        <Link to="/about" className={getNavLinkClass("/about")}>About</Link>
                        <Link to="/reports" className={getNavLinkClass("/reports")}>Reports</Link>
                        <Link to="/assistant" className={getNavLinkClass("/assistant")}>AI Assistant</Link>
                        {/* 'Contact' link (Conditional, maybe show only if needed) */}
                        <Link to="/contact" className={getNavLinkClass("/contact")}>Contact</Link>

                        {/* Desktop Auth/User Section */}
                        <div className="ml-4 flex gap-3">
                            {isLoggedIn ? (
                                <>
                                    {/* User is Logged In */}
                                    <Link to="/dashboard">
                                        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-accent text-accent rounded-full hover:bg-accent hover:text-dark transition duration-200 text-sm font-medium">
                                            <User size={18} /> Dashboard
                                        </button>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-1.5 bg-accent text-dark font-medium rounded-full hover:bg-accent/90 transition duration-200 text-sm"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    {/* User is Logged Out */}
                                    <Link to="/login">
                                        <button className="px-4 py-1.5 border border-accent text-accent rounded-full hover:bg-accent hover:text-dark transition duration-200 text-sm font-medium">
                                            Login
                                        </button>
                                    </Link>
                                    <Link to="/register">
                                        <button className="px-4 py-1.5 bg-secondary text-dark font-medium rounded-full hover:bg-secondary/90 transition duration-200 text-sm">
                                            Register
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* 3. Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setOpen(!open)}
                            className="text-accent focus:outline-none p-1 rounded-md hover:bg-dark/50"
                            aria-label={open ? "Close menu" : "Open menu"}
                        >
                            {open ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* 4. Mobile Menu Drawer */}
            {open && (
                <div className="md:hidden bg-dark/95 backdrop-blur-md px-6 py-5 space-y-4 shadow-xl border-t border-gray-700/50 absolute w-full top-16">

                    {/* Mobile Nav Links */}
                    <Link to="/" className="block text-gray-200 hover:text-accent transition duration-150" onClick={closeMobileMenu}>Home</Link>
                    <a href="#about" className="block text-gray-200 hover:text-accent transition duration-150" onClick={closeMobileMenu}>About</a>
                    <Link to="/reports" className="block text-gray-200 hover:text-accent transition duration-150" onClick={closeMobileMenu}>Reports</Link>
                    <Link to="/assistant" className="block text-gray-200 hover:text-accent transition duration-150" onClick={closeMobileMenu}>AI Assistant</Link>
                    <Link to="/contact" className="block text-gray-200 hover:text-accent transition duration-150" onClick={closeMobileMenu}>Contact</Link>

                    {/* Mobile Auth Buttons */}
                    <div className="pt-4 space-y-2 border-t border-gray-700/50">
                        {isLoggedIn ? (
                            <>
                                <Link to="/dashboard" onClick={closeMobileMenu}>
                                    <button className="w-full py-2 border border-accent text-accent rounded-full hover:bg-accent hover:text-dark transition duration-200 font-medium">
                                        Dashboard
                                    </button>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full py-2 bg-accent text-dark font-medium rounded-full hover:bg-accent/90 transition duration-200"

                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={closeMobileMenu}>
                                    <button className="w-full py-2 border border-accent text-accent rounded-full hover:bg-accent hover:text-dark transition duration-200 font-medium">
                                        Login
                                    </button>
                                </Link>
                                <Link to="/register" onClick={closeMobileMenu}>
                                    <button className="w-full py-2 bg-secondary text-dark font-medium rounded-full hover:bg-secondary/90 transition duration-200">
                                        Register
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;