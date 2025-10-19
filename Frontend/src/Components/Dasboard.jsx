// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FileText, Download, Trash2, Eye, UserCheck, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";
import { showToast } from "../utils/commonFunctions";
import { useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";

const Dashboard = () => {

    const [user, setUser] = useState({
        username: "",
        email: "",
        profilePic: null,
        isVerified: false
    });

    const userRedux = useSelector((state) => state?.userReducer?.user)
    console.log(userRedux, "user from redux in dashboard");
    useEffect(() => {
        async function fetchUserData() {
            let res = await axios.get(`${baseUrl}auth/getUser/${userRedux.username}`)
            console.log(res?.data?.data, "Response from dashboard to get User")
            setUser(prev => ({
                username: res?.data?.data?.username,
                email: res?.data?.data?.email,
                isVerified: res?.data?.data?.isVerified
            }))
        }
        fetchUserData();
    }, [userRedux])

    const [reports, setReports] = useState([
        { id: 1, name: "Blood Test Report", date: "2025-10-15", type: "PDF" },
        { id: 2, name: "MRI Scan", date: "2025-10-12", type: "Image" },
        { id: 3, name: "Heart Checkup", date: "2025-10-10", type: "PDF" }
    ]);

    const [loadingId, setLoadingId] = useState(null);

    const handleDownload = async (report) => {
        setLoadingId(report.id);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        showToast(`Report "${report.name}" downloaded!`, "success", "light");
        setLoadingId(null);
    };

    const handleDelete = (reportId) => {
        if (!window.confirm("Are you sure you want to delete this report?")) return;
        setReports(reports.filter(r => r.id !== reportId));
    };

    return (
        <>
            <div className="min-h-screen bg-hero-gradient text-white flex flex-col">
                <Navbar />

                <section className="max-w-7xl mx-auto px-6 md:px-10 py-28 flex flex-col gap-12 w-full">

                    {/* User Card */}
                    {user && (
                        <div className="bg-dark/90 rounded-3xl shadow-clean-blue p-8 flex flex-col md:flex-row items-center gap-8 hover:shadow-2xl transition duration-300">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-accent flex items-center justify-center">
                                {user.profilePic ? (
                                    <img src={user.profilePic} alt={user.username} className="w-full h-full object-cover" />
                                ) : (
                                    <UserCheck size={64} className="text-accent" />
                                )}
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                <h1 className="text-3xl font-extrabold">{user.username}</h1>
                                <p className="text-gray-400">{user.email}</p>
                                <div className="flex items-center gap-4 mt-2">
                                    {user.isVerified ? (
                                        <span className="flex items-center gap-1 text-green-400 font-medium">
                                            <CheckCircle size={18} /> Verified
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1 text-yellow-400 font-medium">
                                            <AlertTriangle size={18} /> Not Verified
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Reports */}
                    <h2 className="text-2xl font-bold">Your Reports</h2>
                    {(!reports || reports.length === 0) ? (
                        <p className="text-gray-400 text-center text-lg">
                            No reports found. Upload some reports to see them here.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {reports.map((report) => (
                                <div key={report.id} className="bg-dark/90 p-6 rounded-3xl shadow-clean-blue hover:shadow-2xl transition duration-300 flex flex-col justify-between">
                                    <div className="flex items-center gap-3 mb-4">
                                        <FileText size={28} className="text-secondary" />
                                        <div className="flex flex-col">
                                            <h2 className="font-bold text-lg">{report.name}</h2>
                                            <span className="text-gray-400 text-sm">{report.date}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-evenly mt-4">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => handleDownload(report)}
                                                disabled={loadingId === report.id}
                                                className={`flex items-center gap-1 px-3 py-1 rounded-xl font-semibold text-dark transition duration-300 ${loadingId === report.id ? "bg-secondary/50 cursor-not-allowed" : "bg-accent hover:bg-secondary"}`}
                                            >
                                                {loadingId === report.id ? <Loader2 className="animate-spin h-4 w-4" /> : <Download size={16} />}
                                                Download
                                            </button>

                                            <button
                                                onClick={() => handleDelete(report.id)}
                                                className="flex items-center gap-1 px-3 py-1 rounded-xl font-semibold bg-red-600 hover:bg-red-500 transition duration-300"
                                            >
                                                <Trash2 size={16} /> Delete
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-4 p-4 rounded-xl border border-gray-700/50 bg-dark/70 flex items-center justify-center hover:bg-dark/60 transition duration-300 cursor-pointer">
                                        <Eye size={20} className="text-accent mr-2" />
                                        <span className="text-gray-300 font-medium">Preview Report</span>
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

export default Dashboard;
