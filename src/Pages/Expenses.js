import React, { useState, useEffect } from "react";
import FinancNav from "../Navigations/FinancNav";
import { useNavigate } from "react-router-dom";
import ChatBot from "../ChatBot/ChatWidget"; // ✅ Import ChatBot component
import Footer from "../Navigations/Footer";

function Expenses() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState({
        category: "",
        amount: "",
        description: "",
        date: "",
        status: "Pending",
    });

    const navigate = useNavigate();

    // ✅ Theme Handling
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    // ✅ Load from localStorage or default data
    useEffect(() => {
        const savedExpenses = JSON.parse(localStorage.getItem("expensesData"));
        if (savedExpenses && savedExpenses.length > 0) {
            setExpenses(savedExpenses);
        } else {
            const defaultData = [
                {
                    id: 1,
                    category: "Office Rent",
                    amount: 120000,
                    description: "Monthly building rent",
                    date: "2025-10-01",
                    status: "Approved",
                },
                {
                    id: 2,
                    category: "Marketing",
                    amount: 45000,
                    description: "Social media ads",
                    date: "2025-10-10",
                    status: "Pending",
                },
                {
                    id: 3,
                    category: "Utilities",
                    amount: 18000,
                    description: "Electricity & Internet",
                    date: "2025-10-12",
                    status: "Rejected",
                },
            ];
            setExpenses(defaultData);
            localStorage.setItem("expensesData", JSON.stringify(defaultData));
        }
    }, []);

    // ✅ Save updates to localStorage
    const saveExpenses = (updatedList) => {
        setExpenses(updatedList);
        localStorage.setItem("expensesData", JSON.stringify(updatedList));
    };

    // ✅ Handle Form Input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewExpense({ ...newExpense, [name]: value });
    };

    // ✅ Add Expense
    const handleAddExpense = (e) => {
        e.preventDefault();
        if (!newExpense.category || !newExpense.amount || !newExpense.date) {
            alert("Please fill all required fields!");
            return;
        }
        const updated = [
            ...expenses,
            { id: expenses.length + 1, ...newExpense },
        ];
        saveExpenses(updated);
        setNewExpense({
            category: "",
            amount: "",
            description: "",
            date: "",
            status: "Pending",
        });
        alert("Expense added successfully!");
    };

    // ✅ Approve / Reject Expense
    const updateStatus = (id, newStatus) => {
        const updated = expenses.map((exp) =>
            exp.id === id ? { ...exp, status: newStatus } : exp
        );
        saveExpenses(updated);
    };

    // ✅ Go to Invoice
    const goToInvoice = (exp) => {
        navigate("/invoice");
    };

    // ✅ Total Expense
    const totalExpense = expenses.reduce(
        (acc, curr) => acc + Number(curr.amount || 0),
        0
    );

    return (
        <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-900 transition-colors duration-500">
            <FinancNav />

            {/* Header */}
            <div className="flex items-center justify-between mb-8 max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    💸 Company Expenses
                </h1>
                <button
                    onClick={toggleTheme}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl hover:scale-105 transition"
                >
                    {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
            </div>

            {/* Add Expense Form */}
            <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    ➕ Add New Expense
                </h2>
                <form
                    onSubmit={handleAddExpense}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4"
                >
                    <input
                        type="text"
                        name="category"
                        value={newExpense.category}
                        onChange={handleChange}
                        placeholder="Category (e.g., Rent, Marketing)"
                        className="p-2 border rounded dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                    />
                    <input
                        type="number"
                        name="amount"
                        value={newExpense.amount}
                        onChange={handleChange}
                        placeholder="Amount (₹)"
                        className="p-2 border rounded dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                    />
                    <input
                        type="date"
                        name="date"
                        value={newExpense.date}
                        onChange={handleChange}
                        className="p-2 border rounded dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                    />
                    <input
                        type="text"
                        name="description"
                        value={newExpense.description}
                        onChange={handleChange}
                        placeholder="Description (optional)"
                        className="p-2 border rounded md:col-span-2 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                    />
                    <button
                        type="submit"
                        className="md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Add Expense
                    </button>
                </form>
            </div>

            {/* Expense Table */}
            <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    📊 Expense Records
                </h2>
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="text-gray-700 dark:text-gray-300 border-b dark:border-gray-700">
                            <th className="py-2 text-left">#</th>
                            <th className="py-2 text-left">Category</th>
                            <th className="py-2 text-left">Amount (₹)</th>
                            <th className="py-2 text-left">Date</th>
                            <th className="py-2 text-left">Status</th>
                            <th className="py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.length > 0 ? (
                            expenses.map((exp) => (
                                <tr
                                    key={exp.id}
                                    className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                >
                                    <td className="py-2 text-gray-800 dark:text-gray-200">
                                        {exp.id}
                                    </td>
                                    <td className="py-2 text-gray-800 dark:text-gray-200">
                                        {exp.category}
                                    </td>
                                    <td className="py-2 text-gray-800 dark:text-gray-200">
                                        ₹{exp.amount.toLocaleString()}
                                    </td>
                                    <td className="py-2 text-gray-800 dark:text-gray-200">
                                        {exp.date}
                                    </td>
                                    <td className="py-2">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold 
                                                ${exp.status === "Approved"
                                                    ? "bg-green-100 text-green-700"
                                                    : exp.status === "Rejected"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {exp.status}
                                        </span>
                                    </td>
                                    <td className="py-2 flex gap-2">
                                        {exp.status === "Pending" && (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        updateStatus(exp.id, "Approved")
                                                    }
                                                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        updateStatus(exp.id, "Rejected")
                                                    }
                                                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                        {exp.status === "Approved" && (
                                            <button
                                                onClick={() => goToInvoice(exp)}
                                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                            >
                                                View Invoice
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center py-4 text-gray-500 dark:text-gray-400"
                                >
                                    No expenses found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Total */}
                <div className="text-right mt-4 text-lg font-semibold text-gray-800 dark:text-white">
                    Total: ₹{totalExpense.toLocaleString()}
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

export default Expenses;
