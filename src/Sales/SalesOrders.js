import React, { useState, useEffect } from "react";
import SalesNav from "../Navigations/SalesNav";
import Footer from "../Navigations/Footer";
import ChatBot from "../ChatBot/ChatWidget"; // ✅ Import ChatBot component


function SalesOrders() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    const [orders, setOrders] = useState([
        {
            id: 1,
            orderId: "ORD-1023",
            client: "TechCorp Pvt Ltd",
            amount: 350000,
            date: "2025-10-10",
            status: "Processing",
            paymentStatus: "Paid",
            deliveryDate: "2025-10-25",
        },
        {
            id: 2,
            orderId: "ORD-1024",
            client: "Green Solutions",
            amount: 220000,
            date: "2025-10-12",
            status: "Delivered",
            paymentStatus: "Paid",
            deliveryDate: "2025-10-20",
        },
        {
            id: 3,
            orderId: "ORD-1025",
            client: "NextGen Tech",
            amount: 150000,
            date: "2025-10-15",
            status: "Pending",
            paymentStatus: "Unpaid",
            deliveryDate: "2025-10-30",
        },
    ]);

    // ✅ Theme toggle
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    return (
        <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
            <SalesNav />

            {/* Header */}
            <div className="flex items-center justify-between mb-8 max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    📦 Sales Orders & Transactions
                </h1>
                <button
                    onClick={toggleTheme}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl hover:scale-105 transition"
                >
                    {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 max-w-6xl mx-auto">
                {[
                    { title: "Total Orders", value: orders.length },
                    {
                        title: "Revenue",
                        value: `₹${orders.reduce((a, b) => a + b.amount, 0).toLocaleString()}`,
                    },
                    {
                        title: "Paid Orders",
                        value: orders.filter((o) => o.paymentStatus === "Paid").length,
                    },
                    {
                        title: "Pending Payments",
                        value: orders.filter((o) => o.paymentStatus === "Unpaid").length,
                    },
                ].map((card, idx) => (
                    <div
                        key={idx}
                        className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-2xl text-center"
                    >
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{card.title}</p>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            {card.value}
                        </h2>
                    </div>
                ))}
            </div>

            {/* Orders Table */}
            <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    📑 Order Details
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700">
                                <th className="p-2">Order ID</th>
                                <th className="p-2">Client</th>
                                <th className="p-2">Amount</th>
                                <th className="p-2">Order Date</th>
                                <th className="p-2">Delivery Date</th>
                                <th className="p-2">Status</th>
                                <th className="p-2">Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                >
                                    <td className="p-2 font-semibold text-gray-900 dark:text-gray-100">
                                        {order.orderId}
                                    </td>
                                    <td className="p-2 text-gray-800 dark:text-gray-200">
                                        {order.client}
                                    </td>
                                    <td className="p-2 text-gray-800 dark:text-gray-200">
                                        ₹{order.amount.toLocaleString()}
                                    </td>
                                    <td className="p-2 text-gray-800 dark:text-gray-200">
                                        {order.date}
                                    </td>
                                    <td className="p-2 text-gray-800 dark:text-gray-200">
                                        {order.deliveryDate}
                                    </td>
                                    <td
                                        className={`p-2 font-semibold ${order.status === "Delivered"
                                            ? "text-green-500"
                                            : order.status === "Pending"
                                                ? "text-yellow-400"
                                                : "text-blue-400"
                                            }`}
                                    >
                                        {order.status}
                                    </td>
                                    <td
                                        className={`p-2 font-semibold ${order.paymentStatus === "Paid"
                                            ? "text-green-500"
                                            : "text-red-400"
                                            }`}
                                    >
                                        {order.paymentStatus}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Analytics Summary */}
            <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 p-8 mt-8 rounded-2xl shadow">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    💡 Sales Insights
                </h2>
                <ul className="list-disc list-inside text-gray-800 dark:text-gray-300 leading-relaxed">
                    <li>Overall revenue this month increased by 18% compared to last month.</li>
                    <li>60% of total orders are processed within 5 business days.</li>
                    <li>Pending payments decreased by 12% this quarter.</li>
                    <li>Client retention rate is at 85%, showing consistent sales growth.</li>
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

export default SalesOrders;
