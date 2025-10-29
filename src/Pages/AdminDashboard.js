import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { toast } from "react-toastify";
import Navigatebaradmin from "../Navigations/Adminnavbar";
import Footer from "../Navigations/Footer";
import ChatBot from "../ChatBot/ChatWidget"; // ✅ Import ChatBot component

const AdminDashboard = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [summary, setSummary] = useState({
        totalEmployees: 0,
        hrCount: 0,
        pendingLeaves: 0,
        departments: [],
    });
    const [employees, setEmployees] = useState([]);

    // Theme
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    // Fetch dashboard summary
    const fetchSummary = async () => {
        try {
            const res = await axios.get("http://localhost:3001/api/admin/summary");
            setSummary(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch summary");
        }
    };

    // Fetch employee list
    const fetchEmployees = async () => {
        try {
            const res = await axios.get("http://localhost:3001/api/employees");
            setEmployees(res.data);
        } catch (err) {
            toast.error("Failed to fetch employees");
        }
    };

    useEffect(() => {
        fetchSummary();
        fetchEmployees();
    }, []);

    // Delete user
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await axios.delete(`http://localhost:3001/api/admin/delete/${id}`);
            toast.success("User deleted successfully");
            fetchEmployees();
            fetchSummary();
        } catch (err) {
            toast.error("Failed to delete user");
        }
    };

    // Chart data
    const departmentChart = {
        labels: summary.departments.map((d) => d.department || "Unassigned"),
        datasets: [
            {
                label: "Employees per Department",
                data: summary.departments.map((d) => d.count),
                backgroundColor: [
                    "#3b82f6",
                    "#10b981",
                    "#f59e0b",
                    "#ef4444",
                    "#8b5cf6",
                    "#06b6d4",
                ],
            },
        ],
    };

    const barData = {
        labels: ["Total Employees", "HR Count", "Pending Leaves"],
        datasets: [
            {
                label: "Admin Overview",
                data: [
                    summary.totalEmployees,
                    summary.hrCount,
                    summary.pendingLeaves,
                ],
                backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
            },
        ],
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-900 transition-colors duration-500">
            <Navigatebaradmin />

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    Admin Dashboard
                </h1>
                <button
                    onClick={toggleTheme}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl hover:scale-105 transition"
                >
                    {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                    { title: "Total Employees", value: summary.totalEmployees },
                    { title: "HR Members", value: summary.hrCount },
                    { title: "Pending Leaves", value: summary.pendingLeaves },
                    { title: "Departments", value: summary.departments.length },
                ].map((card, idx) => (
                    <div
                        key={idx}
                        className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-2xl text-center"
                    >
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            {card.title}
                        </p>
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                            {card.value}
                        </h2>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold mb-2 dark:text-white">
                        Department Overview
                    </h3>
                    <Pie data={departmentChart} />
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold mb-2 dark:text-white">
                        Key Stats
                    </h3>
                    <Bar data={barData} />
                </div>
            </div>

            {/* Employee Management */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-10">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">
                    Employee Management
                </h3>
                <table className="min-w-full text-sm">
                    <thead className="border-b dark:border-gray-600">
                        <tr className="text-gray-600 dark:text-gray-300">
                            <th className="px-3 py-2 text-left">ID</th>
                            <th className="px-3 py-2 text-left">Name</th>
                            <th className="px-3 py-2 text-left">Email</th>
                            <th className="px-3 py-2 text-left">Role</th>
                            <th className="px-3 py-2 text-left">Department</th>
                            <th className="px-3 py-2 text-left">Action</th>
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
                                <td className="px-3 py-2">{emp.email}</td>
                                <td className="px-3 py-2">{emp.role}</td>
                                <td className="px-3 py-2">{emp.department || "N/A"}</td>
                                <td className="px-3 py-2">
                                    <button
                                        onClick={() => handleDelete(emp.id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
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

export default AdminDashboard;
