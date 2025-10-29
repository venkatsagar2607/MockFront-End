import React, { useEffect, useState, useRef } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import FinancNav from "../Navigations/FinancNav";
import Footer from "../Navigations/Footer";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ChatBot from "../ChatBot/ChatWidget"; // ✅ Import ChatBot component



function Reports() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const reportRef = useRef();

    const [reportData] = useState({
        revenue: 1200000,
        totalExpenses: 820000,
        profit: 380000,
        expenseBreakdown: {
            Rent: 120000,
            Marketing: 90000,
            Operations: 180000,
            Utilities: 60000,
            Salaries: 370000,
        },
        monthlyProfit: [
            { month: "Jan", profit: 35000 },
            { month: "Feb", profit: 45000 },
            { month: "Mar", profit: 52000 },
            { month: "Apr", profit: 47000 },
            { month: "May", profit: 60000 },
            { month: "Jun", profit: 55000 },
            { month: "Jul", profit: 58000 },
            { month: "Aug", profit: 61000 },
            { month: "Sep", profit: 64000 },
            { month: "Oct", profit: 70000 },
        ],
        departmentSpend: [
            { dept: "HR", cost: 90000 },
            { dept: "IT", cost: 240000 },
            { dept: "Marketing", cost: 120000 },
            { dept: "Sales", cost: 160000 },
            { dept: "Finance", cost: 80000 },
        ],
        salaryDistribution: [
            { role: "Junior Staff", avg: 30000 },
            { role: "Senior Staff", avg: 55000 },
            { role: "Managers", avg: 90000 },
            { role: "Executives", avg: 150000 },
        ],
    });

    // ✅ Theme
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    // ✅ Chart Data

    // Expense Breakdown Pie
    const expensePie = {
        labels: Object.keys(reportData.expenseBreakdown),
        datasets: [
            {
                label: "Expenses (₹)",
                data: Object.values(reportData.expenseBreakdown),
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

    // Monthly Profit Trend Line
    const profitLine = {
        labels: reportData.monthlyProfit.map((m) => m.month),
        datasets: [
            {
                label: "Monthly Profit (₹)",
                data: reportData.monthlyProfit.map((m) => m.profit),
                fill: true,
                borderColor: "#10b981",
                backgroundColor: "rgba(16,185,129,0.2)",
                tension: 0.4,
            },
        ],
    };

    // Department Spend Bar
    const deptBar = {
        labels: reportData.departmentSpend.map((d) => d.dept),
        datasets: [
            {
                label: "Department Spend (₹)",
                data: reportData.departmentSpend.map((d) => d.cost),
                backgroundColor: "#3b82f6",
            },
        ],
    };

    // Salary Distribution Pie
    const salaryPie = {
        labels: reportData.salaryDistribution.map((s) => s.role),
        datasets: [
            {
                label: "Average Salary (₹)",
                data: reportData.salaryDistribution.map((s) => s.avg),
                backgroundColor: [
                    "#14b8a6",
                    "#f97316",
                    "#8b5cf6",
                    "#ef4444",
                ],
            },
        ],
    };

    // ✅ PDF Download setup (fixed)
    const handleDownloadPDF = async () => {
        try {
            const reportElement = reportRef.current;

            if (!reportElement) {
                alert("Report content not ready yet!");
                return;
            }

            // Capture the visible part of the report
            const canvas = await html2canvas(reportElement, {
                scale: 2,
                useCORS: true,
                logging: false,
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const imgWidth = 190;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.setFontSize(16);
            pdf.text("📊 Finance Report Summary", 14, 15);
            pdf.addImage(imgData, "PNG", 10, 25, imgWidth, imgHeight);
            pdf.save(`Finance_Report_${new Date().toLocaleDateString()}.pdf`);
        } catch (err) {
            console.error("PDF export error:", err);
            alert("Error exporting report. Please try again.");
        }
    };


    return (
        <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-900 transition-colors duration-500" ref={reportRef}>
            <FinancNav />

            {/* Header */}
            <div className="flex items-center justify-between mb-8 max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    📊 Financial Reports & Analytics
                </h1>
                <button
                    onClick={handleDownloadPDF}
                    className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition"
                >
                    ⬇️ Download Report as PDF
                </button>
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
                    { title: "Total Revenue", value: `₹${reportData.revenue.toLocaleString()}` },
                    { title: "Total Expenses", value: `₹${reportData.totalExpenses.toLocaleString()}` },
                    { title: "Net Profit", value: `₹${reportData.profit.toLocaleString()}` },
                    {
                        title: "Profit Margin",
                        value: `${((reportData.profit / reportData.revenue) * 100).toFixed(1)}%`,
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

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-10">
                {/* Expense Breakdown */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold mb-4 dark:text-white">
                        💸 Expense Breakdown
                    </h3>
                    <Pie data={expensePie} />
                </div>

                {/* Profit Trend */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold mb-4 dark:text-white">
                        📈 Monthly Profit Trend
                    </h3>
                    <Line data={profitLine} />
                </div>

                {/* Department Spend */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold mb-4 dark:text-white">
                        🏢 Departmental Spend Overview
                    </h3>
                    <Bar data={deptBar} />
                </div>

                {/* Salary Distribution */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                    <h3 className="text-lg font-semibold mb-4 dark:text-white">
                        💼 Salary Distribution by Role
                    </h3>
                    <Pie data={salaryPie} />
                </div>
            </div>

            {/* Insights Section */}
            <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                    📘 Financial Insights
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed">
                    <li>Marketing costs increased by 10% compared to the previous quarter.</li>
                    <li>Net profit margin remains stable above 30%, showing strong financial health.</li>
                    <li>HR and Operations departments consumed 45% of total expenses combined.</li>
                    <li>Sales revenue is projected to grow 8% next quarter due to new client acquisitions.</li>
                    <li>Average salary across departments has risen by 6% this fiscal year.</li>
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

export default Reports;
