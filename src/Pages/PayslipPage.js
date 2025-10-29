// File: src/Pages/PayslipPage.js
import React from "react";
import Empnav from "../Navigations/Empnav";
import ChatBot from "../ChatBot/ChatWidget"; // ✅ Import ChatBot component

function PayslipPage() {
    return (
        <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
            <Empnav />
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                    💰 Payslips
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Your payslip for October 2025 is ready to download.
                </p>
                <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
                    📥 Download Payslip
                </button>
            </div>
            {/* ✅ Floating Chatbot */}
            <div className="fixed bottom-6 right-6 z-50">
                <ChatBot />
            </div>
        </div>
    );
}

export default PayslipPage;
