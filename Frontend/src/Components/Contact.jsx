import React, { useState } from "react";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";
import Navbar from "./Navbar";
import { showToast } from "../utils/commonFunctions.jsx";
import Footer from "./Footer.jsx";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, message } = formData;

        if (!name || !email || !message) {
            showToast("All fields are required", "error", "dark");
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            showToast("Message sent successfully!", "success", "secondary");
            setFormData({ name: "", email: "", message: "" });
        } catch (err) {
            showToast("Failed to send message. Try again.", "error", "accent");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>

            <section className="min-h-screen bg-hero-gradient flex flex-col items-center justify-center px-6 py-12">
                <Navbar />

                <div className="w-full max-w-4xl bg-dark rounded-3xl shadow-clean-blue p-10 relative overflow-hidden mt-8">

                    {/* Background Gradient Glow */}
                    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary/10 blur-[200px] rounded-full -z-10 animate-pulse-slow"></div>
                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/10 blur-[150px] rounded-full -z-10 animate-pulse-slow-reverse"></div>

                    {/* Header */}
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-gray-300 text-center mb-10 max-w-2xl mx-auto">
                        Have any questions or need assistance? Reach out to us via the form below or our contact details.
                    </p>

                    {/* Contact Form + Info */}
                    <div className="flex flex-col md:flex-row gap-10">

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-5">
                            <input
                                type="text"
                                id="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="px-4 py-3 rounded-xl bg-dark border border-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary text-gray-100 placeholder-gray-500"
                            />
                            <input
                                type="email"
                                id="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                className="px-4 py-3 rounded-xl bg-dark border border-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary text-gray-100 placeholder-gray-500"
                            />
                            <textarea
                                id="message"
                                rows="5"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                className="px-4 py-3 rounded-xl bg-dark border border-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary text-gray-100 placeholder-gray-500 resize-none"
                            />

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-dark transition duration-300 ${isSubmitting
                                    ? "bg-accent/50 cursor-not-allowed"
                                    : "bg-accent hover:bg-secondary"
                                    }`}
                            >
                                {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : "Send Message"}
                            </button>
                        </form>

                        {/* Contact Info */}
                        <div className="flex-1 flex flex-col gap-6 text-gray-300">
                            <div className="flex items-center gap-3">
                                <Mail size={24} className="text-secondary" />
                                <span>contact@healthmind.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={24} className="text-secondary" />
                                <span>+92 300 1234567</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin size={24} className="text-secondary" />
                                <span>123 Health St., Wellness City</span>
                            </div>
                        </div>

                    </div>

                    {/* Animations */}
                    <style jsx>{`
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.15; }
          }
          @keyframes pulse-slow-reverse {
            0%, 100% { opacity: 0.15; }
            50% { opacity: 0.1; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 20s infinite;
          }
          .animate-pulse-slow-reverse {
            animation: pulse-slow-reverse 22s infinite;
          }
        `}</style>

                </div>
            </section>
            <Footer />
        </>
    );
};

export default Contact;