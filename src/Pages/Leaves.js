// File: src/Pages/LeavePage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Empnav from "../Navigations/Empnav";
import ChatBot from "../ChatBot/ChatWidget"; // ✅ Import ChatBot component


function LeavePage() {
    const [userEmail] = useState(sessionStorage.getItem("email"));
    const [leaves, setLeaves] = useState([]);
    const [newLeave, setNewLeave] = useState({ from_date: "", to_date: "", reason: "" });

    const fetchLeaves = async () => {
        const res = await axios.get(`http://localhost:3001/api/employee/leaves?email=${userEmail}`);
        setLeaves(res.data);
    };

    useEffect(() => {
        if (userEmail) fetchLeaves();
    }, [userEmail]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:3001/api/employee/apply-leave", {
            email: userEmail,
            ...newLeave,
        });
        alert("Leave submitted!");
        setNewLeave({ from_date: "", to_date: "", reason: "" });
        fetchLeaves();
    };

    return (
        <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
            <Empnav />
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                    🏖 Apply for Leave
                </h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="date"
                        value={newLeave.from_date}
                        onChange={(e) => setNewLeave({ ...newLeave, from_date: e.target.value })}
                        className="p-2 border rounded"
                    />
                    <input
                        type="date"
                        value={newLeave.to_date}
                        onChange={(e) => setNewLeave({ ...newLeave, to_date: e.target.value })}
                        className="p-2 border rounded"
                    />
                    <textarea
                        placeholder="Reason"
                        value={newLeave.reason}
                        onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                        className="p-2 border rounded md:col-span-2"
                    />
                    <button className="md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        Submit
                    </button>
                </form>

                <h3 className="text-xl mt-6 mb-2 text-gray-700 dark:text-gray-300">
                    📄 Leave Status
                </h3>
                <table className="w-full text-sm">
                    <thead>
                        <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Reason</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaves.map((l, i) => (
                            <tr key={i}>
                                <td>{l.from_date}</td>
                                <td>{l.to_date}</td>
                                <td>{l.reason}</td>
                                <td>{l.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* ✅ Floating Chatbot */}
            <div className="fixed bottom-6 right-6 z-50">
                <ChatBot />
            </div>
        </div>
    );
}

export default LeavePage;
