import React, { useState, useEffect } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import SalesNav from "../Navigations/SalesNav"; // create like FinancNav
import Footer from "../Navigations/Footer";
import ChatBot from "../ChatBot/ChatWidget"; // ✅ Import ChatBot component


function SalesDash() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    // ✅ Theme handling
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    // ✅ Mock Data
    const salesData = {
        totalSales: 1250000,
        monthlyTarget: 1500000,
        totalDeals: 58,
        conversionRate: 32,
        avgDealValue: 21500,
        topProducts: {
            "Software License": 450000,
            "Cloud Services": 320000,
            "Maintenance": 200000,
            "Training": 150000,
            "Consulting": 130000,
        },
        salesByRegion: [
            { region: "North", value: 350000 },
            { region: "South", value: 400000 },
            { region: "East", value: 200000 },
            { region: "West", value: 300000 },
        ],
        monthlyTrend: [
            { month: "Jan", value: 90000 },
            { month: "Feb", value: 110000 },
            { month: "Mar", value: 125000 },
            { month: "Apr", value: 95000 },
            { month: "May", value: 140000 },
            { month: "Jun", value: 160000 },
            { month: "Jul", value: 155000 },
            { month: "Aug", value: 170000 },
            { month: "Sep", value: 180000 },
            { month: "Oct", value: 195000 },
        ],
    };

    // ✅ Charts
    const productPie = {
        labels: Object.keys(salesData.topProducts),
        datasets: [
            {
                label: "Top Products (₹)",
                data: Object.values(salesData.topProducts),
                backgroundColor: [
                    "#3b82f6",
                    "#f59e0b",
                    "#10b981",
                    "#ef4444",
                    "#8b5cf6",
                ],
            },
        ],
    };

    const regionBar = {
        labels: salesData.salesByRegion.map((r) => r.region),
        datasets: [
            {
                label: "Sales by Region (₹)",
                data: salesData.salesByRegion.map((r) => r.value),
                backgroundColor: "#3b82f6",
            },
        ],
    };

    const trendLine = {
        labels: salesData.monthlyTrend.map((t) => t.month),
        datasets: [
            {
                label: "Monthly Sales Trend (₹)",
                data: salesData.monthlyTrend.map((t) => t.value),
                fill: true,
                borderColor: "#10b981",
                backgroundColor: "rgba(16,185,129,0.2)",
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
                    💼 Sales Dashboard
                </h1>
                <button
                    onClick={toggleTheme}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl hover:scale-105 transition"
                >
                    {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
            </div>

            {/* KPI Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 max-w-6xl mx-auto">
                {[
                    { title: "Total Sales", value: `₹${salesData.totalSales.toLocaleString()}` },
                    { title: "Deals Closed", value: salesData.totalDeals },
                    { title: "Conversion Rate", value: `${salesData.conversionRate}%` },
                    { title: "Avg Deal Value", value: `₹${salesData.avgDealValue.toLocaleString()}` },
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

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-10">
                {/* Monthly Trend */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold mb-4 dark:text-white">
                        📈 Monthly Sales Trend
                    </h3>
                    <Line data={trendLine} />
                </div>

                {/* Top Products */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold mb-4 dark:text-white">
                        🏆 Top Performing Products
                    </h3>
                    <Pie data={productPie} />
                </div>

                {/* Regional Sales */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow md:col-span-2">
                    <h3 className="text-lg font-semibold mb-4 dark:text-white">
                        🌍 Sales by Region
                    </h3>
                    <Bar data={regionBar} />
                </div>
            </div>

            {/* Insights */}
            <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                    📘 Sales Insights
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed">
                    <li>Sales have grown 15% compared to last quarter.</li>
                    <li>Cloud Services are the highest revenue generator this quarter.</li>
                    <li>South region achieved the highest sales performance.</li>
                    <li>Conversion rate improved by 5% due to better lead follow-ups.</li>
                    <li>Target completion stands at 83% for the current month.</li>
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

export default SalesDash;
