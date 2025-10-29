import React, { useState, useEffect } from "react";
import SalesNav from "../Navigations/SalesNav";
import Footer from "../Navigations/Footer";
import ChatBot from "../ChatBot/ChatWidget"; // ✅ Import ChatBot component


function SalesLeads() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [leads, setLeads] = useState([
        {
            id: 1,
            name: "TechCorp Pvt Ltd",
            contact: "Ravi Kumar",
            email: "ravi@techcorp.com",
            phone: "9876543210",
            status: "In Progress",
            value: 250000,
            source: "Website Inquiry",
        },
        {
            id: 2,
            name: "Green Solutions",
            contact: "Ananya Singh",
            email: "ananya@greensol.com",
            phone: "9988776655",
            status: "Closed Won",
            value: 500000,
            source: "Referral",
        },
        {
            id: 3,
            name: "NextGen Tech",
            contact: "Kiran Das",
            email: "kiran@nextgen.com",
            phone: "9123456789",
            status: "New Lead",
            value: 100000,
            source: "LinkedIn",
        },
    ]);

    const [newLead, setNewLead] = useState({
        name: "",
        contact: "",
        email: "",
        phone: "",
        status: "New Lead",
        value: "",
        source: "",
    });

    // ✅ Theme handling
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    // ✅ Add new lead
    const handleAddLead = (e) => {
        e.preventDefault();
        if (!newLead.name || !newLead.contact || !newLead.email) {
            alert("Please fill all required fields!");
            return;
        }
        setLeads([...leads, { id: leads.length + 1, ...newLead }]);
        setNewLead({
            name: "",
            contact: "",
            email: "",
            phone: "",
            status: "New Lead",
            value: "",
            source: "",
        });
        alert("New lead added successfully!");
    };

    return (
        <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
            <SalesNav />

            {/* Header */}
            <div className="flex items-center justify-between mb-8 max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    📋 Sales Leads & Client Management
                </h1>
                <button
                    onClick={toggleTheme}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl hover:scale-105 transition"
                >
                    {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
            </div>

            {/* Lead Form */}
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    ➕ Add New Lead
                </h2>
                <form onSubmit={handleAddLead} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Company Name"
                        value={newLead.name}
                        onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                        className="p-2 border rounded dark:bg-gray-700 dark:text-white"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Contact Person"
                        value={newLead.contact}
                        onChange={(e) => setNewLead({ ...newLead, contact: e.target.value })}
                        className="p-2 border rounded dark:bg-gray-700 dark:text-white"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newLead.email}
                        onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                        className="p-2 border rounded dark:bg-gray-700 dark:text-white"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        value={newLead.phone}
                        onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                        className="p-2 border rounded dark:bg-gray-700 dark:text-white"
                    />
                    <input
                        type="number"
                        placeholder="Deal Value (₹)"
                        value={newLead.value}
                        onChange={(e) => setNewLead({ ...newLead, value: e.target.value })}
                        className="p-2 border rounded dark:bg-gray-700 dark:text-white"
                    />
                    <input
                        type="text"
                        placeholder="Source (LinkedIn, Referral, etc)"
                        value={newLead.source}
                        onChange={(e) => setNewLead({ ...newLead, source: e.target.value })}
                        className="p-2 border rounded dark:bg-gray-700 dark:text-white"
                    />
                    <select
                        value={newLead.status}
                        onChange={(e) => setNewLead({ ...newLead, status: e.target.value })}
                        className="p-2 border rounded dark:bg-gray-700 dark:text-white md:col-span-2"
                    >
                        <option>New Lead</option>
                        <option>In Progress</option>
                        <option>Closed Won</option>
                        <option>Closed Lost</option>
                    </select>
                    <button
                        type="submit"
                        className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
                    >
                        Add Lead
                    </button>
                </form>
            </div>

            {/* Lead Table */}
            <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    📞 Current Leads
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                                <th className="p-2">#</th>
                                <th className="p-2">Company</th>
                                <th className="p-2">Contact</th>
                                <th className="p-2">Email</th>
                                <th className="p-2">Phone</th>
                                <th className="p-2">Value (₹)</th>
                                <th className="p-2">Source</th>
                                <th className="p-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.map((lead, index) => (
                                <tr
                                    key={lead.id}
                                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    <td className="p-2">{index + 1}</td>
                                    <td className="p-2 font-medium">{lead.name}</td>
                                    <td className="p-2">{lead.contact}</td>
                                    <td className="p-2">{lead.email}</td>
                                    <td className="p-2">{lead.phone}</td>
                                    <td className="p-2">₹{lead.value.toLocaleString()}</td>
                                    <td className="p-2">{lead.source}</td>
                                    <td
                                        className={`p-2 font-semibold ${lead.status === "Closed Won"
                                            ? "text-green-500"
                                            : lead.status === "Closed Lost"
                                                ? "text-red-500"
                                                : "text-yellow-500"
                                            }`}
                                    >
                                        {lead.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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

export default SalesLeads;
