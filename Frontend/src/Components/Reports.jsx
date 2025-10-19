// src/pages/Reports.jsx

import React, { useState } from "react";
import { FileText, Download, Trash2, Loader2, Eye } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Reports = () => {
    const [reports, setReports] = useState([
        {
            id: 1,
            name: "Blood Test Report - John Doe",
            date: "2025-10-15",
            type: "PDF",
        },
        {
            id: 2,
            name: "MRI Scan - Jane Smith",
            date: "2025-10-12",
            type: "Image",
        },
        {
            id: 3,
            name: "Heart Checkup - Mike Lee",
            date: "2025-10-10",
            type: "PDF",
        },
    ]);

    const [loadingId, setLoadingId] = useState(null);

    const handleDownload = async (report) => {
        setLoadingId(report.id);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoadingId(null);
        alert(`Report "${report.name}" downloaded!`);
    };

    const handleDelete = (reportId) => {
        if (window.confirm("Are you sure you want to delete this report?")) {
            setReports((prev) => prev.filter((r) => r.id !== reportId));
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Processed":
                return "bg-green-500 text-white";
            case "Pending":
                return "bg-yellow-500 text-dark";
            default:
                return "bg-gray-500 text-white";
        }
    };

    return (
        <>
            <div className="min-h-fill bg-hero-gradient text-white flex flex-col">
                <Navbar />

                <section className="max-w-7xl mx-auto px-6 md:px-10 py-28 flex flex-col gap-8 w-full">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-8">
                        Your Medical Reports
                    </h1>

                    {reports.length === 0 ? (
                        <p className="text-gray-400 text-center text-lg">
                            No reports found. Upload some reports to see them here.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {reports.map((report) => (
                                <div
                                    key={report.id}
                                    className="bg-dark/80 backdrop-blur-md p-6 rounded-3xl shadow-clean-blue hover:shadow-2xl transition duration-300 flex flex-col justify-between border border-gray-700/50 hover:border-secondary/50"
                                >
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <FileText size={28} className="text-secondary" />
                                            <div className="flex flex-col">
                                                <h2 className="font-bold text-lg">{report.name}</h2>
                                                <span className="text-gray-400 text-sm">{report.date}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col gap-3 mt-2">
                                        <div className="flex gap-3 justify-between">
                                            <button
                                                onClick={() => handleDownload(report)}
                                                disabled={loadingId === report.id}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-dark transition duration-300 ${loadingId === report.id
                                                    ? "bg-secondary/50 cursor-not-allowed"
                                                    : "bg-accent hover:bg-secondary"
                                                    }`}
                                            >
                                                {loadingId === report.id ? (
                                                    <Loader2 className="animate-spin h-4 w-4" />
                                                ) : (
                                                    <Download size={16} />
                                                )}
                                                Download
                                            </button>

                                            <button
                                                onClick={() => handleDelete(report.id)}
                                                className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-red-600 hover:bg-red-500 transition duration-300"
                                            >
                                                <Trash2 size={16} /> Delete
                                            </button>
                                        </div>

                                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-600 hover:border-secondary transition duration-300 font-medium bg-dark/60 justify-center">
                                            <Eye size={16} /> Preview Report
                                        </button>
                                    </div>

                                    {/* Footer Info */}
                                    <div className="mt-4 flex items-center justify-between text-gray-400 text-sm">
                                        <span>Type: {report.type}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
            <Footer />
        </>
    );
};

export default Reports;