import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import FinancNav from "../Navigations/FinancNav";
import Footer from "../Navigations/Footer";
import financeImg from "../assets/finance-banner.jpg"; // 🖼️ Add image to src/assets/
import ChatBot from "../ChatBot/ChatWidget"; // ✅ Import ChatBot component
function FinanceDash() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    const [financeData] = useState({
        revenue: 12500000,
        netWorth: 9800000,
        salaries: 2500000,
        expenses: {
            rent: 150000,
            operations: 800000,
            marketing: 500000,
            utilities: 200000,
        },
        sales: [
            { month: "Jan", amount: 850000 },
            { month: "Feb", amount: 910000 },
            { month: "Mar", amount: 780000 },
            { month: "Apr", amount: 1000000 },
            { month: "May", amount: 950000 },
            { month: "Jun", amount: 1100000 },
        ],
    });

    // ✅ Theme handling
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);
    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    // ✅ Pie Chart (Expense Breakdown)
    const expenseChart = {
        labels: Object.keys(financeData.expenses),
        datasets: [
            {
                label: "Company Expenses",
                data: Object.values(financeData.expenses),
                backgroundColor: ["#3b82f6", "#f59e0b", "#10b981", "#ef4444"],
            },
        ],
    };

    // ✅ Bar Chart (Sales per Month)
    const salesChart = {
        labels: financeData.sales.map((s) => s.month),
        datasets: [
            {
                label: "Sales (in ₹)",
                data: financeData.sales.map((s) => s.amount),
                backgroundColor: "#3b82f6",
            },
        ],
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-900 transition-colors duration-500">
            <FinancNav />

            {/* ✅ Header Section (Toggle OUTSIDE the image) */}
            <div className="flex items-center justify-between mb-6 max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    💼 Finance Dashboard
                </h1>

                <button
                    onClick={toggleTheme}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl hover:scale-105 transition"
                >
                    {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
            </div>

            {/* ✅ Banner Image */}
            <div className="w-full max-w-6xl mx-auto rounded-2xl overflow-hidden mb-8 shadow-lg">
                <img
                    src={financeImg}
                    alt="Finance Dashboard"
                    className="w-full h-60 object-cover rounded-2xl"
                />
            </div>

            {/* ✅ Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 max-w-6xl mx-auto">
                {[
                    { title: "Company Revenue", value: `₹${financeData.revenue.toLocaleString()}` },
                    { title: "Net Worth", value: `₹${financeData.netWorth.toLocaleString()}` },
                    { title: "Total Salaries", value: `₹${financeData.salaries.toLocaleString()}` },
                    {
                        title: "Total Expenses",
                        value: `₹${Object.values(financeData.expenses)
                            .reduce((a, b) => a + b, 0)
                            .toLocaleString()}`,
                    },
                ].map((card, idx) => (
                    <div
                        key={idx}
                        className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-2xl text-center hover:scale-105 transition-transform"
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

            {/* ✅ Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold mb-4 dark:text-white">
                        📊 Expense Breakdown
                    </h3>
                    <Pie data={expenseChart} />
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold mb-4 dark:text-white">
                        📈 Monthly Sales Trend
                    </h3>
                    <Bar data={salesChart} />
                </div>
            </div>

            {/* ✅ Finance Manager Overview */}
            <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                    👤 Finance Manager Overview
                </h2>
                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                    <div>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Name:</strong> Priya Sharma
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Department:</strong> Finance & Accounts
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Email:</strong> finance@company.com
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Experience:</strong> 8 years
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Reports To:</strong> CEO Office
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Last Updated:</strong>{" "}
                            {new Date().toLocaleDateString()}
                        </p>
                    </div>
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

export default FinanceDash;
