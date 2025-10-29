// File: src/Pages/EmployeeDash.js
import React, { useEffect, useState } from "react";
import Empnav from "../Navigations/Empnav";
import axios from "axios";
import ChatBot from "../ChatBot/ChatWidget"; // ✅ Import ChatBot component
import Footer from "../Navigations/Footer";

function EmployeeDash() {
    const [userEmail] = useState(sessionStorage.getItem("email"));
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [loginTime, setLoginTime] = useState("");
    const [logoutTime, setLogoutTime] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [history, setHistory] = useState([]);

    // ✅ Theme logic
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    // ✅ Fetch today + history
    useEffect(() => {
        if (userEmail) {
            axios
                .get(`http://localhost:3001/api/employee/timelog?email=${userEmail}`)
                .then((res) => {
                    if (res.data) {
                        setLoginTime(res.data.login_time || "");
                        setLogoutTime(res.data.logout_time || "");
                        setIsLoggedIn(!!res.data.login_time && !res.data.logout_time);
                    }
                })
                .catch(() => console.log("No time log found"));
            fetchHistory();
        }
    }, [userEmail]);

    const fetchHistory = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/employee/timelog/history?email=${userEmail}`);
            setHistory(res.data || []);
        } catch (err) {
            console.error("Error fetching history:", err);
        }
    };

    const handleLoginTime = async () => {
        try {
            await axios.post("http://localhost:3001/api/employee/login-time", { email: userEmail });
            alert("Login time recorded!");
            setIsLoggedIn(true);
            setLoginTime(new Date().toLocaleTimeString());
            fetchHistory();
        } catch {
            alert("Error logging time!");
        }
    };

    const handleLogoutTime = async () => {
        try {
            await axios.post("http://localhost:3001/api/employee/logout-time", { email: userEmail });
            alert("Logout time recorded!");
            setIsLoggedIn(false);
            setLogoutTime(new Date().toLocaleTimeString());
            fetchHistory();
        } catch {
            alert("Error saving logout time!");
        }
    };

    return (
        <div
            className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500 relative"
            onClick={() => {
                // ✅ Closes chatbot when clicking outside
                const chatEvent = new CustomEvent("closeChatbot");
                window.dispatchEvent(chatEvent);
            }}
        >
            <Empnav />

            {/* Header */}
            <div className="flex items-center justify-between mb-8 max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    👋 Welcome Back, Employee
                </h1>

                <button
                    onClick={toggleTheme}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl hover:scale-105 transition"
                >
                    {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
            </div>

            {/* Time Tracker */}
            <div className="max-w-3xl mx-auto text-center">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                        ⏱️ Work Time Tracker
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                        Login Time: <span className="font-semibold">{loginTime || "--"}</span>
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Logout Time: <span className="font-semibold">{logoutTime || "--"}</span>
                    </p>

                    {!isLoggedIn ? (
                        <button
                            onClick={handleLoginTime}
                            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                        >
                            🟢 Mark Login
                        </button>
                    ) : (
                        <button
                            onClick={handleLogoutTime}
                            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                        >
                            🔴 Mark Logout
                        </button>
                    )}
                </div>

                {/* History */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-8 text-left">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                        📜 Login / Logout History
                    </h2>

                    {history.length > 0 ? (
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="border-b text-gray-600 dark:text-gray-300">
                                    <th className="p-2 text-left">Date</th>
                                    <th className="p-2 text-left">Login Time</th>
                                    <th className="p-2 text-left">Logout Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((entry, index) => (
                                    <tr
                                        key={index}
                                        className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <td className="p-2">
                                            {new Date(entry.login_time).toLocaleDateString()}
                                        </td>
                                        <td className="p-2">
                                            {entry.login_time
                                                ? new Date(entry.login_time).toLocaleTimeString()
                                                : "--"}
                                        </td>
                                        <td className="p-2">
                                            {entry.logout_time
                                                ? new Date(entry.logout_time).toLocaleTimeString()
                                                : "--"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">No history available.</p>
                    )}
                </div>

                {/* Company Updates */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                        🏢 Company Updates
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Stay updated with company announcements and HR policies.
                    </p>
                </div>
            </div>

            {/* ✅ Floating Chatbot */}
            <div className="fixed bottom-6 right-6 z-50">
                <ChatBot />
            </div>
            <Footer />
        </div>
    );
}

export default EmployeeDash;
