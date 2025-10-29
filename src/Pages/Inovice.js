import React, { useState, useEffect } from "react";
import FinancNav from "../Navigations/FinancNav";
import Footer from "../Navigations/Footer";
import ChatBot from "../ChatBot/ChatWidget"; // ✅ Import ChatBot component


function Invoices() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    // ✅ Sample Invoice List
    const [invoices] = useState([
        {
            id: "INV-2025-001",
            client: "NextGen Retail Pvt. Ltd.",
            amount: 85000,
            status: "Paid",
            date: "2025-10-10",
            dueDate: "2025-10-20",
            items: [
                { desc: "Cloud Hosting Services", qty: 2, price: 25000 },
                { desc: "CRM Software Subscription", qty: 1, price: 35000 },
            ],
        },
        {
            id: "INV-2025-002",
            client: "SmartTech Solutions",
            amount: 120000,
            status: "Pending",
            date: "2025-10-18",
            dueDate: "2025-10-30",
            items: [
                { desc: "Data Backup & Maintenance", qty: 3, price: 15000 },
                { desc: "Network Monitoring", qty: 1, price: 75000 },
            ],
        },
        {
            id: "INV-2025-003",
            client: "BlueOcean Logistics",
            amount: 98000,
            status: "Paid",
            date: "2025-09-25",
            dueDate: "2025-10-05",
            items: [
                { desc: "Server Security Audit", qty: 2, price: 40000 },
                { desc: "Cloud Setup Support", qty: 1, price: 18000 },
            ],
        },
    ]);

    const handleView = (invoice) => {
        setSelectedInvoice(invoice);
    };

    const handleCloseView = () => {
        setSelectedInvoice(null);
    };

    return (
        <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-500">
            <FinancNav />

            {/* Header */}
            <div className="flex items-center justify-between mb-8 max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    🧾 Finance Invoices
                </h1>
                <button
                    onClick={toggleTheme}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl hover:scale-105 transition"
                >
                    {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
            </div>

            {/* Invoice Table */}
            {!selectedInvoice ? (
                <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                                <th className="py-3 px-4 text-left">Invoice ID</th>
                                <th className="py-3 px-4 text-left">Client</th>
                                <th className="py-3 px-4 text-left">Amount</th>
                                <th className="py-3 px-4 text-left">Status</th>
                                <th className="py-3 px-4 text-left">Invoice Date</th>
                                <th className="py-3 px-4 text-left">Due Date</th>
                                <th className="py-3 px-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((invoice, index) => (
                                <tr
                                    key={index}
                                    className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                >
                                    <td className="py-3 px-4 font-semibold text-gray-800 dark:text-white">
                                        {invoice.id}
                                    </td>
                                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                                        {invoice.client}
                                    </td>
                                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                                        ₹{invoice.amount.toLocaleString()}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${invoice.status === "Paid"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {invoice.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                                        {invoice.date}
                                    </td>
                                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                                        {invoice.dueDate}
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <button
                                            onClick={() => handleView(invoice)}
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition"
                                        >
                                            🔍 View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                /* ✅ Invoice View Section */
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                            🧾 Invoice Details
                        </h2>
                        <button
                            onClick={handleCloseView}
                            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                        >
                            ✖ Close
                        </button>
                    </div>

                    <div className="flex justify-between border-b pb-4 mb-4">
                        <div>
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                                TechNova Solutions Pvt. Ltd.
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Plot 45, Sector 2, Bangalore, India
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                accounts@technova.com
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-gray-700 dark:text-gray-300">
                                Invoice No: {selectedInvoice.id}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Date: {selectedInvoice.date}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Due: {selectedInvoice.dueDate}
                            </p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                            Bill To:
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            {selectedInvoice.client}
                        </p>
                    </div>

                    <table className="w-full border-collapse text-sm mb-6">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                                <th className="p-2 text-left">Description</th>
                                <th className="p-2 text-left">Qty</th>
                                <th className="p-2 text-left">Unit Price</th>
                                <th className="p-2 text-left">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedInvoice.items.map((item, idx) => (
                                <tr
                                    key={idx}
                                    className="border-b dark:border-gray-700 text-gray-700 dark:text-gray-300"
                                >
                                    <td className="p-2">{item.desc}</td>
                                    <td className="p-2">{item.qty}</td>
                                    <td className="p-2">₹{item.price.toLocaleString()}</td>
                                    <td className="p-2">
                                        ₹{(item.qty * item.price).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="text-right text-gray-800 dark:text-gray-200">
                        <p>Subtotal: ₹{selectedInvoice.amount.toLocaleString()}</p>
                        <p>GST (18%): ₹{(selectedInvoice.amount * 0.18).toLocaleString()}</p>
                        <h3 className="font-bold text-lg mt-2">
                            Total: ₹{(selectedInvoice.amount * 1.18).toLocaleString()}
                        </h3>
                    </div>

                    <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center">
                        Thank you for your business. Please make the payment before the due date.
                    </p>
                </div>
            )}
            {/* ✅ Floating Chatbot */}
            <div className="fixed bottom-6 right-6 z-50">
                <ChatBot />
            </div>

            <Footer />
        </div>
    );
}

export default Invoices;
