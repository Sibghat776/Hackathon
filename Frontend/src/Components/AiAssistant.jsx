import React, { useState } from "react";
import { UploadCloud, FileText, Loader2, CheckCircle, AlertTriangle, XCircle, Type, Heart } from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { baseUrl } from "../utils/baseUrl";


const AiAssistant = () => {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [textInput, setTextInput] = useState("");
    const [summary, setSummary] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setTextInput(""); // Clear text input when file is selected
        setSummary("");
        setError("");

        if (selectedFile) {
            if (selectedFile.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = () => setPreviewUrl(reader.result);
                reader.readAsDataURL(selectedFile);
            } else {
                // Handle non-image files (PDFs)
                setPreviewUrl(null);
            }
        }
    };

    const removeFile = () => {
        setFile(null);
        setPreviewUrl(null);
        setSummary("");
        setError("");
    };


    const handleAnalyze = async () => {
        if (!file && textInput.trim() === "") {
            setError("Please provide a medical report (text or file) first.");
            return;
        }

        setIsProcessing(true);
        setSummary("");
        setError("");

        try {
            const formData = new FormData();
            if (file) formData.append("file", file);
            if (textInput.trim()) formData.append("text", textInput);

            // ✅ Replace this with your real backend API endpoint
            const res = await fetch(`${baseUrl}geminiApi/analyze`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Analysis failed.");
            setSummary(data.data.analysis || "No summary generated.");
        } catch (err) {
            console.error("❌ API Error:", err);
            setError("Failed to analyze the report using Gemini API.");
        } finally {
            setIsProcessing(false);
        }
    };


    // Helper: convert File → Base64
    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white font-sans">
            <Navbar />

            <section className="relative z-10 flex flex-col items-center justify-start py-16 px-4 sm:px-6 lg:px-12 w-full">

                {/* Hero Section */}
                <div className="text-center mb-16 max-w-5xl">
                    <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4">
                        AI Health Report Analyzer
                    </h1>
                    <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                        Upload your medical documents or lab results to receive instant, concise, and easy-to-understand summaries.
                        <span className="font-semibold text-secondary"> Your health data remains safe & private.</span>
                    </p>
                </div>

                {/* Panels */}
                <div className="w-full max-w-7xl grid md:grid-cols-2 gap-10 lg:gap-16">

                    {/* Left Panel: Input */}
                    <div className="flex flex-col gap-6 p-8 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-200 transition hover:shadow-2xl">
                        <h2 className="text-2xl font-semibold text-dark flex items-center gap-2 border-b pb-3 mb-4">
                            <Type size={24} className="text-secondary animate-pulse" />
                            Input Health Data
                        </h2>

                        {/* File Upload */}
                        <label className={`flex items-center gap-4 px-6 py-4 border-2 rounded-3xl cursor-pointer transition duration-300 ${file ? "border-secondary bg-secondary/10 hover:bg-secondary/20" : "border-primary/30 hover:border-secondary bg-gray-50 hover:bg-gray-100"}`}>
                            <UploadCloud size={28} className={file ? "text-primary" : "text-secondary"} />
                            <span className="text-dark font-medium truncate flex-1">
                                {file ? file.name : "Choose a medical report (PDF, Image, or Text)"}
                            </span>
                            {file && <XCircle size={20} className="text-red-500 hover:text-red-700" onClick={(e) => { e.preventDefault(); removeFile(); }} />}
                            <input type="file" className="hidden" onChange={handleFileChange} />
                        </label>

                        {/* OR Divider */}
                        <div className="relative flex items-center my-2">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="flex-shrink mx-4 text-gray-500 font-medium">OR</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        {/* Text Input */}
                        <textarea
                            placeholder="Paste your medical report text here..."
                            value={textInput}
                            onChange={(e) => { setTextInput(e.target.value); setFile(null); setSummary(""); setError(""); }}
                            rows={8}
                            disabled={!!file}
                            className={`w-full px-4 py-4 rounded-3xl border border-gray-300 text-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50 transition shadow-inner ${file ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                        />

                        {/* Analyze Button */}
                        <button
                            onClick={handleAnalyze}
                            disabled={isProcessing || (!file && textInput.trim() === "")}
                            className={`flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-extrabold text-white transition duration-300 shadow-lg mt-4 ${isProcessing || (!file && textInput.trim() === "") ? "bg-accent/60 cursor-not-allowed" : "bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary shadow-primary/40 hover:shadow-lg"}`}
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="animate-spin h-6 w-6" />
                                    Analyzing Report...
                                </>
                            ) : (
                                <>
                                    <Heart size={20} />
                                    Get AI Summary
                                </>
                            )}
                        </button>

                        {/* Error/Info */}
                        {error && (
                            <div className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-3 rounded-xl border border-red-300 shadow-md animate-pulse">
                                <AlertTriangle size={20} /> <span className="font-medium">{error}</span>
                            </div>
                        )}
                    </div>

                    {/* Right Panel: Preview + Summary */}
                    <div className="flex flex-col gap-6">

                        {/* File/Image Preview */}
                        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-200 p-6 flex flex-col items-center transition hover:shadow-2xl">
                            <h2 className="text-xl font-semibold text-dark flex items-center gap-2 border-b pb-3 w-full mb-4">
                                <FileText size={24} className="text-primary animate-pulse" />
                                Document Preview
                            </h2>

                            {previewUrl ? (
                                <div className="w-full h-80 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                                    <img src={previewUrl} alt="Report Preview" className="object-contain w-full h-full transition-transform hover:scale-105 duration-300" />
                                </div>
                            ) : file && !previewUrl ? (
                                <div className="flex flex-col items-center justify-center border border-dashed border-primary/50 rounded-xl p-8 bg-primary/5 h-64 text-primary w-full">
                                    <FileText size={40} className="mb-3" />
                                    <span className="font-semibold">{file.name}</span>
                                    <span className="text-sm text-gray-500">Document ready for analysis.</span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-xl p-8 h-64 text-gray-500 w-full">
                                    <FileText size={40} className="mb-3" />
                                    <span className="font-semibold">No Document Selected</span>
                                    <span className="text-sm">Upload a file or type text to see the summary.</span>
                                </div>
                            )}
                        </div>

                        {/* Summary Result Panel */}
                        {summary && (
                            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border-l-4 border-secondary transition-all duration-500 hover:shadow-3xl relative">
                                <div className="flex items-center gap-3 mb-4 border-b pb-3">
                                    <CheckCircle size={28} className="text-secondary animate-bounce" />
                                    <h2 className="text-2xl font-bold text-primary">AI Analysis Complete</h2>
                                </div>
                                <pre className="whitespace-pre-wrap font-sans text-dark leading-relaxed text-base bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-inner">
                                    {summary}
                                </pre>

                                {/* Copy & Download Buttons */}
                                <div className="flex gap-3 mt-4 justify-end">
                                    <button
                                        onClick={() => navigator.clipboard.writeText(summary)}
                                        className="px-4 py-2 bg-primary/80 hover:bg-primary text-white rounded-xl shadow hover:shadow-lg transition"
                                    >
                                        Copy
                                    </button>
                                    <button
                                        onClick={() => {
                                            const blob = new Blob([summary], { type: 'text/plain' });
                                            const link = document.createElement('a');
                                            link.href = URL.createObjectURL(blob);
                                            link.download = 'AI_Report_Summary.txt';
                                            link.click();
                                        }}
                                        className="px-4 py-2 bg-secondary/80 hover:bg-secondary text-white rounded-xl shadow hover:shadow-lg transition"
                                    >
                                        Download
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Processing Placeholder */}
                        {isProcessing && (
                            <div className="flex flex-col items-center justify-center bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl p-8 h-64 border border-gray-200 animate-pulse">
                                <Loader2 className="animate-spin h-10 w-10 text-secondary mb-3" />
                                <h3 className="text-xl font-semibold text-dark">Analyzing Data...</h3>
                                <p className="text-gray-500 mt-1">Please wait, this may take a moment to interpret the report.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </div>

    );
};

export default AiAssistant;