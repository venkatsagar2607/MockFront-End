import React, { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import SalesNav from "../Navigations/SalesNav";
import Footer from "../Navigations/Footer";
import ChatBot from "../ChatBot/ChatWidget"; // ✅ Import ChatBot component


function SalesReports() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    const [reportData] = useState({
        totalSales: 1250000,
        totalOrders: 320,
        topProducts: [
            { name: "Cloud CRM Suite", sales: 320000 },
            { name: "Data Analytics Pro", sales: 260000 },
            { name: "HR Management Tool", sales: 180000 },
            { name: "E-Commerce Platform", sales: 150000 },
            { name: "Payroll System", sales: 90000 },
        ],
        regionWise: {
            "North India": 350000,
            "South India": 280000,
            "East India": 200000,
            "West India": 220000,
        },
        monthlySales: [
            { month: "Jan", sales: 85000 },
            { month: "Feb", sales: 90000 },
            { month: "Mar", sales: 120000 },
            { month: "Apr", sales: 95000 },
            { month: "May", sales: 130000 },
            { month: "Jun", sales: 115000 },
            { month: "Jul", sales: 125000 },
            { month: "Aug", sales: 110000 },
            { month: "Sep", sales: 145000 },
            { month: "Oct", sales: 140000 },
        ],
    });

    // ✅ Theme toggle
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);
    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    // ✅ Charts
    const productChart = {
        labels: reportData.topProducts.map((p) => p.name),
        datasets: [
            {
                label: "Top Product Sales (₹)",
                data: reportData.topProducts.map((p) => p.sales),
                backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"],
            },
        ],
    };

    const regionChart = {
        labels: Object.keys(reportData.regionWise),
        datasets: [
            {
                label: "Region-wise Sales (₹)",
                data: Object.values(reportData.regionWise),
                backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
            },
        ],
    };

    const monthlyLineChart = {
        labels: reportData.monthlySales.map((m) => m.month),
        datasets: [
            {
                label: "Monthly Sales (₹)",
                data: reportData.monthlySales.map((m) => m.sales),
                fill: true,
                borderColor: "#14b8a6",
                backgroundColor: "rgba(20,184,166,0.2)",
                tension: 0.4,
            },
        ],
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-900 transition-colors duration-500">
            <SalesNav />

            {/* Header */}
            <div className="flex items-center justify-between mb-8 max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    📈 Sales Performance Reports
                </h1>
                <button
                    onClick={toggleTheme}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl hover:scale-105 transition"
                >
                    {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 max-w-6xl mx-auto">
                {[
                    { title: "Total Sales", value: `₹${reportData.totalSales.toLocaleString()}` },
                    { title: "Total Orders", value: reportData.totalOrders },
                    {
                        title: "Average Order Value",
                        value: `₹${(reportData.totalSales / reportData.totalOrders).toFixed(0)}`,
                    },
                    {
                        title: "Top Product",
                        value: reportData.topProducts[0].name,
                    },
                ].map((card, idx) => (
                    <div
                        key={idx}
                        className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-2xl text-center"
                    >
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{card.title}</p>
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                            {card.value}
                        </h2>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-10">
                {/* Top Products */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold mb-4 dark:text-white">
                        🛒 Top Selling Products
                    </h3>
                    <Bar data={productChart} />
                </div>

                {/* Region-wise Sales */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold mb-4 dark:text-white">
                        🌍 Region-wise Sales Distribution
                    </h3>
                    <Pie data={regionChart} />
                </div>

                {/* Monthly Sales */}
                <div className="md:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold mb-4 dark:text-white">
                        📅 Monthly Sales Trend
                    </h3>
                    <Line data={monthlyLineChart} />
                </div>
            </div>

            {/* Insights Section */}
            <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                    💡 Sales Insights & Observations
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed">
                    <li>North India contributed 28% of overall sales this quarter.</li>
                    <li>Top three products generate 60% of total revenue.</li>
                    <li>Sales growth has remained consistent over the last six months.</li>
                    <li>Customer retention rate is at 87%, indicating stable client satisfaction.</li>
                    <li>Sales target for next quarter is ₹1.5 crore with 12% projected growth.</li>
                </ul>
            </div>
            {/* ✅ Floating Chatbot */}
            <div className="fixed bottom-6 right-6 z-50">
                <ChatBot />
            </div>
            <Footer />
        </div>
    );
}

export default SalesReports;
