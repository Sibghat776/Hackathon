import React, { useState } from "react";
import { Shield, Mail, Phone, MapPin, Linkedin, Twitter, Instagram, ChevronDown } from "lucide-react";

// Enhanced Footer Component (Replacing the stub)
const Footer = () => {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    const CurrentYear = new Date().getFullYear();

    return (
        // Footer now uses Dark background with dynamic glows (bg-dark is #1E293B)
        <footer className="bg-dark/95 text-gray-300 relative overflow-hidden pt-16 pb-10">

            {/* Background Gradient Glows (using defined colors) */}
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-secondary/10 blur-[200px] rounded-full -z-10 animate-pulse-slow"></div>
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-accent/10 blur-[150px] rounded-full -z-10 animate-pulse-slow-reverse"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Logo & Description */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        {/* Using Shield icon for logo consistency and adding spin effect */}
                        <Shield size={32} className="text-secondary object-contain" />
                        <span className="text-white font-extrabold text-2xl tracking-wider">HealthMind AI</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                        HealthMind AI is your trusted medical companion. Get instant summaries and insights from your health reports powered by cutting-edge intelligence.
                    </p>
                    {/* Social Icons with enhanced hover effects */}
                    <div className="flex gap-3 mt-2">
                        <a href="#" className="p-2 border border-gray-700 rounded-full hover:bg-secondary/20 hover:text-secondary transition duration-300" aria-label="Twitter"><Twitter size={18} /></a>
                        <a href="#" className="p-2 border border-gray-700 rounded-full hover:bg-secondary/20 hover:text-secondary transition duration-300" aria-label="LinkedIn"><Linkedin size={18} /></a>
                        <a href="#" className="p-2 border border-gray-700 rounded-full hover:bg-secondary/20 hover:text-secondary transition duration-300" aria-label="Instagram"><Instagram size={18} /></a>
                    </div>
                </div>

                {/* Quick Links (Mobile Accordion) */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-white font-bold text-lg mb-3 flex justify-between items-center md:block cursor-pointer" onClick={() => toggleSection("links")}>
                        Quick Links <ChevronDown className={`transition-transform duration-300 md:hidden ${openSection === "links" ? "rotate-180" : ""}`} />
                    </h3>
                    {/* The logic for hiding/showing links for mobile */}
                    <div className={`flex flex-col gap-3 text-sm md:block transition-all duration-300 ease-in-out overflow-hidden ${openSection === "links" ? "h-auto opacity-100 py-1" : "h-0 md:h-auto opacity-0 md:opacity-100"}`}>
                        <a href="#/" className="hover:text-accent block transition duration-200">Home</a>
                        <a href="#/about" className="hover:text-accent block transition duration-200">About Us</a>
                        <a href="#/reports" className="hover:text-accent block transition duration-200">My Reports</a>
                        <a href="#/assistant" className="hover:text-accent block transition duration-200">AI Analyzer</a>
                        <a href="#/privacy" className="hover:text-accent block transition duration-200">Privacy Policy</a>
                    </div>
                </div>

                {/* Contact Info (Mobile Accordion) */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-white font-bold text-lg mb-3 flex justify-between items-center md:block cursor-pointer" onClick={() => toggleSection("contact")}>
                        Contact Us <ChevronDown className={`transition-transform duration-300 md:hidden ${openSection === "contact" ? "rotate-180" : ""}`} />
                    </h3>
                    {/* The logic for hiding/showing links for mobile */}
                    <div className={`flex flex-col gap-3 text-sm md:block transition-all duration-300 ease-in-out overflow-hidden ${openSection === "contact" ? "h-auto opacity-100 py-1" : "h-0 md:h-auto opacity-0 md:opacity-100"}`}>
                        <a href="mailto:ullahsibghat786@gmail.com" target="_blank" className="flex items-start hover:cursor-pointer hover:text-accent gap-2"><Mail size={18} className="text-secondary mt-1" />ullahsibghat786@gmail.com</a>
                        <a href="https://wa.me/923343688913" target="_blank" className="flex items-start hover:cursor-pointer hover:text-green-500 gap-2"><Phone size={18} className="text-secondary mt-1" /> +92 334 3688913</a>
                        <a href="" className="flex items-start gap-2"><MapPin size={18} className="text-secondary mt-1" /> 123 MedTech Ave., Health City, PK</a>
                    </div>
                </div>

                {/* Newsletter Subscription (Enhanced Look) */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-white font-bold text-lg mb-3">Health Tips</h3>
                    <p className="text-gray-400 text-sm">Subscribe to get personalized AI health tips and news directly to your inbox.</p>
                    <div className="flex mt-2 shadow-xl">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-1 px-4 py-3 rounded-l-2xl bg-dark border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary transition duration-300"
                        />
                        <button className="px-5 py-3 rounded-r-2xl bg-accent text-dark font-bold hover:bg-secondary hover:text-white transition duration-300 whitespace-nowrap shadow-md">
                            Sign Up
                        </button>
                    </div>
                </div>

            </div>

            {/* Footer Bottom */}
            <div className="mt-12 border-t border-gray-700/50 pt-6 text-center text-gray-500 text-sm flex justify-center items-center gap-2">
                &copy; {CurrentYear} HealthMind AI. All rights reserved. | Secured by <Shield size={14} className="inline mb-1 text-secondary" /> Trust
            </div>

            {/* Animations */}
            <style jsx>{`
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.05; }
                    50% { opacity: 0.1; }
                }
                @keyframes pulse-slow-reverse {
                    0%, 100% { opacity: 0.1; }
                    50% { opacity: 0.05; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 25s infinite;
                }
                .animate-pulse-slow-reverse {
                    animation: pulse-slow-reverse 27s infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin 30s linear infinite;
                }
            `}</style>

        </footer>
    );
}
export default Footer