// File: src/pages/HRDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { toast } from "react-toastify";
import Navigatebar from "../Navigations/Navigatebar";
import Footer from "../Navigations/Footer";
import ChatBot from "../ChatBot/ChatWidget"; // ✅ Import ChatBot component


const HRDashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [leaves, setLeaves] = useState([]);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [stats, setStats] = useState({
        totalEmployees: 0,
        presentToday: 0,
        onLeave: 0,
        newHires: 0,
        attritionRate: 0,
    });

    // Theme toggle
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    // Fetch employees
    const fetchEmployees = async () => {
        try {
            const res = await axios.get("http://localhost:3001/api/employees");
            setEmployees(res.data);
            setStats({
                totalEmployees: res.data.length,
                presentToday: 110,
                onLeave: 8,
                newHires: 5,
                attritionRate: 3.5,
            });
        } catch (err) {
            toast.error("Failed to fetch employees");
        }
    };

    // Fetch leaves
    const fetchLeaves = async () => {
        try {
            const res = await axios.get("http://localhost:3001/api/leaves");
            setLeaves(res.data);
        } catch (err) {
            console.error("Error fetching leaves", err);
        }
    };

    useEffect(() => {
        fetchEmployees();
        fetchLeaves();
    }, []);

    // Approve / Reject leave
    const handleLeaveAction = async (id, status) => {
        try {
            await axios.post("http://localhost:3001/api/leaves/update", { id, status });
            toast.success(`Leave ${status.toLowerCase()} successfully`);
            fetchLeaves(); // refresh
        } catch (err) {
            toast.error("Failed to update leave status");
        }
    };

    // Charts
    const pieData = {
        labels: ["HR", "Finance", "Sales", "IT", "Support"],
        datasets: [
            {
                data: [12, 15, 25, 40, 8],
                backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
            },
        ],
    };

    const barData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "New Hires",
                data: [4, 5, 3, 7, 6, 5],
                backgroundColor: "#3b82f6",
            },
        ],
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-900 transition-colors duration-500">
            <Navigatebar />

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">HR Dashboard</h1>
                <button
                    onClick={toggleTheme}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl hover:scale-105 transition"
                >
                    {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                {[
                    { title: "Total Employees", value: stats.totalEmployees },
                    { title: "Present Today", value: stats.presentToday },
                    { title: "On Leave", value: stats.onLeave },
                    { title: "New Hires", value: stats.newHires },
                    { title: "Attrition Rate", value: `${stats.attritionRate}%` },
                ].map((card, idx) => (
                    <div
                        key={idx}
                        className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-2xl text-center"
                    >
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{card.title}</p>
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                            {card.value}
                        </h2>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold mb-2 dark:text-white">Department Distribution</h3>
                    <Pie data={pieData} />
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold mb-2 dark:text-white">Monthly Hiring Trend</h3>
                    <Bar data={barData} />
                </div>
            </div>

            {/* Employee Table */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-10">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Employee List</h3>
                <table className="min-w-full text-sm">
                    <thead className="border-b dark:border-gray-600">
                        <tr className="text-gray-600 dark:text-gray-300">
                            <th className="px-3 py-2 text-left">ID</th>
                            <th className="px-3 py-2 text-left">Name</th>
                            <th className="px-3 py-2 text-left">Designation</th>
                            <th className="px-3 py-2 text-left">Department</th>
                            <th className="px-3 py-2 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr
                                key={emp.id}
                                className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <td className="px-3 py-2">{emp.id}</td>
                                <td className="px-3 py-2">{emp.name}</td>
                                <td className="px-3 py-2">{emp.designation}</td>
                                <td className="px-3 py-2">{emp.department || "N/A"}</td>
                                <td className="px-3 py-2">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${emp.status === "Active"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {emp.status || "Active"}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Leave Management Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-10">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Leave Requests</h3>
                <table className="min-w-full text-sm">
                    <thead className="border-b dark:border-gray-600">
                        <tr className="text-gray-600 dark:text-gray-300">
                            <th className="px-3 py-2 text-left">Employee</th>
                            <th className="px-3 py-2 text-left">Email</th>
                            <th className="px-3 py-2 text-left">From</th>
                            <th className="px-3 py-2 text-left">To</th>
                            <th className="px-3 py-2 text-left">Reason</th>
                            <th className="px-3 py-2 text-left">Status</th>
                            <th className="px-3 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaves.map((leave) => (
                            <tr
                                key={leave.id}
                                className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <td className="px-3 py-2">{leave.employee_name}</td>
                                <td className="px-3 py-2">{leave.employee_email}</td>
                                <td className="px-3 py-2">{leave.start_date}</td>
                                <td className="px-3 py-2">{leave.end_date}</td>
                                <td className="px-3 py-2">{leave.reason}</td>
                                <td className="px-3 py-2">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${leave.status === "Approved"
                                            ? "bg-green-100 text-green-700"
                                            : leave.status === "Rejected"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {leave.status}
                                    </span>
                                </td>
                                <td className="px-3 py-2 space-x-2">
                                    {leave.status === "Pending" && (
                                        <>
                                            <button
                                                onClick={() => handleLeaveAction(leave.id, "Approved")}
                                                className="px-2 py-1 bg-green-500 text-white rounded text-xs"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleLeaveAction(leave.id, "Rejected")}
                                                className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* ✅ Floating Chatbot */}
            <div className="fixed bottom-6 right-6 z-50">
                <ChatBot />
            </div>

            <Footer />
        </div>
    );
};

export default HRDashboard;
