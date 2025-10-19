import React from "react";
import { ShieldCheck, Brain, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Image import/placeholder hata diya gaya hai jaisa ki nirdesh diya gaya tha.

const Hero = () => {
    // Tailwind Class for a premium, subtle hover effect on buttons
    const primaryButtonClass = "flex items-center gap-2 px-10 py-3 bg-secondary text-[#0D1117] font-bold tracking-wide rounded-3xl shadow-xl shadow-secondary/30 transition duration-500 ease-in-out transform hover:scale-[1.02] hover:bg-accent hover:shadow-accent/50 focus:outline-none focus:ring-4 focus:ring-secondary/50";
    const secondaryButtonClass = "flex items-center gap-2 px-10 py-3 border-2 border-gray-600 text-gray-300 font-bold rounded-3xl transition duration-500 ease-in-out transform hover:scale-[1.02] hover:border-accent hover:text-accent hover:bg-[#161B22] focus:outline-none focus:ring-4 focus:ring-accent/50";

    return (
        <section className="relative overflow-hidden bg-hero-gradient text-white pt-hero-pt pb-hero-pb md:pt-hero-pt-md">

            {/* Classy Background Gradients/Glows - Softer and wider spread */}
            <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-secondary/5 blur-[250px] rounded-full -z-10 animate-pulse-slow"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/5 blur-[200px] rounded-full -z-10 animate-pulse-slow-reverse"></div>

            {/* Custom CSS for Animations (No Framer Motion) - Floating icon animations ab zaroorat nahi hain */}
            <style jsx>{`
                /* Slow pulse animation for background glow */
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


            {/* Content ab center mein hai aur full width le raha hai */}
            <div className="max-w-4xl mx-auto px-6 md:px-10 flex flex-col items-center justify-center text-center">

                {/* Text Section - Full width aur centered */}
                <div className="w-full space-y-7 max-w-3xl">

                    {/* Subtitle/Tagline */}
                    <p className="text-secondary text-lg font-semibold tracking-wider uppercase">
                        The Future of Personalized Health
                    </p>

                    {/* Header with gradient text for a premium look */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tighter">
                        <span className="text-gray-50">Precision Health.</span>
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-secondary">
                            Powered by AI.
                        </span>
                    </h1>

                    <p className="text-gray-400 text-xl leading-relaxed max-w-lg pt-2 mx-auto">
                        <span className="text-accent font-bold">HealthMind</span> is your revolutionary medical co-pilot, using advanced predictive modeling to deliver accurate diagnostics and customized wellness strategies instantly.
                    </p>

                    {/* Buttons - Centered */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center">
                        <Link to={"/assistant"} className={primaryButtonClass}>
                            Start AI Consultation
                        </Link>
                        <button className={secondaryButtonClass}>
                            <ArrowRight size={20} /> Watch Demo
                        </button>
                    </div>

                    {/* Trust Badges - Centered and Clean */}
                    <div className="flex flex-wrap items-center gap-x-10 gap-y-3 pt-8 border-t border-gray-700/50 mt-12 justify-center">
                        <div className="flex items-center gap-2 text-gray-400">
                            <ShieldCheck size={20} className="text-secondary" />
                            <span className="font-medium text-base">HIPAA Compliant Data</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                            <Brain size={20} className="text-accent" />
                            <span className="font-medium text-base">99.9% AI Accuracy</span>
                        </div>
                    </div>
                </div>

                {/* Right Image Section hata diya gaya hai */}
            </div>
        </section>
    );
};

export default Hero;
