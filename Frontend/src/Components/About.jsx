import React from "react";
import { ShieldCheck, Brain, ArrowRight, Users, HeartPulse } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const About = () => {
    // Tailwind classes for buttons (same as Hero.jsx)
    const primaryButtonClass =
        "flex items-center gap-2 px-10 py-3 bg-secondary text-[#0D1117] font-bold tracking-wide rounded-3xl shadow-xl shadow-secondary/30 transition duration-500 ease-in-out transform hover:scale-[1.02] hover:bg-accent hover:shadow-accent/50 focus:outline-none focus:ring-4 focus:ring-secondary/50";
    const secondaryButtonClass =
        "flex items-center gap-2 px-10 py-3 border-2 border-gray-600 text-gray-300 font-bold rounded-3xl transition duration-500 ease-in-out transform hover:scale-[1.02] hover:border-accent hover:text-accent hover:bg-[#161B22] focus:outline-none focus:ring-4 focus:ring-accent/50";

    return (
        <>

            <section className="relative overflow-hidden bg-hero-gradient text-white pt-24 pb-32 md:pt-32 md:pb-40">
                <Navbar />
                {/* Background Glows */}
                <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-secondary/5 blur-[250px] rounded-full -z-10 animate-pulse-slow"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[200px] rounded-full -z-10 animate-pulse-slow-reverse"></div>

                <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.15; }
        }
        @keyframes pulse-slow-reverse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.1; }
        }
        .animate-pulse-slow { animation: pulse-slow 20s infinite; }
        .animate-pulse-slow-reverse { animation: pulse-slow-reverse 22s infinite; }
      `}</style>

                <div className="max-w-5xl mx-auto px-6 md:px-10 flex flex-col items-center text-center">
                    {/* Heading */}
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-50 leading-tight tracking-tight mb-6">
                        About <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-secondary">HealthMate</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-secondary text-lg font-semibold tracking-wider uppercase mb-4">
                        Personalized AI Healthcare Solutions
                    </p>

                    {/* Description */}
                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
                        <span className="text-accent font-bold">HealthMate</span> leverages advanced AI and predictive modeling to empower patients and healthcare providers with real-time diagnostics, wellness insights, and customized treatment strategies.
                        Our mission is to make healthcare smarter, faster, and more reliable.
                    </p>

                    {/* Stats Section */}
                    <div className="flex flex-wrap justify-center gap-10 mb-10">
                        <div className="flex flex-col items-center gap-2">
                            <Users size={32} className="text-secondary" />
                            <span className="text-gray-50 font-semibold text-lg">Over 50,000 Users</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <HeartPulse size={32} className="text-accent" />
                            <span className="text-gray-50 font-semibold text-lg">24/7 Health Monitoring</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Brain size={32} className="text-accent" />
                            <span className="text-gray-50 font-semibold text-lg">99.9% AI Accuracy</span>
                        </div>
                    </div>

                    {/* Call-to-Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <button className={primaryButtonClass}>
                            Start Your Journey
                        </button>
                        <button className={secondaryButtonClass}>
                            <ArrowRight size={20} /> Watch Demo
                        </button>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap items-center gap-x-10 gap-y-3 pt-4 border-t border-gray-700/50 mt-8 justify-center">
                        <div className="flex items-center gap-2 text-gray-400">
                            <ShieldCheck size={20} className="text-secondary" />
                            <span className="font-medium text-base">HIPAA Compliant Data</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                            <Brain size={20} className="text-accent" />
                            <span className="font-medium text-base">AI-Powered Diagnostics</span>
                        </div>
                    </div>
                </div>

            </section>
            <Footer />
        </>
    );
};

export default About;
