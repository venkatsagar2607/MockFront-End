import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import FinancNav from "../Navigations/FinancNav";

function InvoiceView() {
    const { invoiceId } = useParams();
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    // ✅ 3 example invoices
    const invoices = {
        "INV-2025-001": {
            id: "INV-2025-001",
            client: "NextGen Retail Pvt. Ltd.",
            address: "123 MG Road, Mumbai, India",
            email: "finance@nextgenretail.com",
            phone: "+91 91234 56789",
            date: "2025-10-10",
            due: "2025-10-20",
            items: [
                { desc: "Cloud Hosting Services", qty: 2, price: 25000 },
                { desc: "CRM Software Subscription", qty: 1, price: 45000 },
                { desc: "Data Backup and Maintenance", qty: 3, price: 15000 },
            ],
        },
        "INV-2025-002": {
            id: "INV-2025-002",
            client: "SmartTech Solutions",
            address: "4th Floor, IT Park, Pune, India",
            email: "billing@smarttech.com",
            phone: "+91 98765 12345",
            date: "2025-10-18",
            due: "2025-10-30",
            items: [
                { desc: "AI Integration Services", qty: 1, price: 60000 },
                { desc: "Custom API Development", qty: 2, price: 30000 },
                { desc: "Technical Support", qty: 5, price: 8000 },
            ],
        },
        "INV-2025-003": {
            id: "INV-2025-003",
            client: "BlueOcean Logistics",
            address: "45, Port Street, Chennai, India",
            email: "accounts@blueocean.com",
            phone: "+91 97890 34567",
            date: "2025-09-25",
            due: "2025-10-05",
            items: [
                { desc: "Cloud Fleet Tracking", qty: 3, price: 25000 },
                { desc: "Data Storage Subscription", qty: 2, price: 20000 },
                { desc: "Maintenance Support", qty: 1, price: 15000 },
            ],
        },
    };

    const invoice = invoices[invoiceId];
    if (!invoice) return <div className="p-10 text-center text-xl text-red-500">Invoice not found!</div>;

    const subtotal = invoice.items.reduce((acc, item) => acc + item.qty * item.price, 0);
    const gst = subtotal * 0.18;
    const total = subtotal + gst;

    // ✅ PDF download
    const handleDownloadPDF = async () => {
        const input = document.getElementById("invoice-pdf");
        const canvas = await html2canvas(input, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 10, 20, imgWidth, imgHeight);
        pdf.save(`${invoice.id}.pdf`);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition duration-500">
            <FinancNav />
            <div className="max-w-5xl mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">📄 Finance Invoice</h1>
                    <div className="flex gap-3">
                        <button
                            onClick={handleDownloadPDF}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                        >
                            ⬇️ Download PDF
                        </button>
                        <button
                            onClick={toggleTheme}
                            className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-md hover:scale-105 transition"
                        >
                            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                        </button>
                    </div>
                </div>

                {/* Invoice Card */}
                <div id="invoice-pdf" className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                    <div className="flex justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                                TechNova Solutions Pvt. Ltd.
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Plot 45, Sector 2, Electronic City, Bangalore, India
                                <br />
                                accounts@technova.com | +91 98765 43210
                            </p>
                        </div>
                        <div className="text-right text-gray-700 dark:text-gray-200">
                            <p><strong>Invoice No:</strong> {invoice.id}</p>
                            <p><strong>Date:</strong> {invoice.date}</p>
                            <p><strong>Due Date:</strong> {invoice.due}</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <p className="font-semibold text-gray-800 dark:text-white">Bill To:</p>
                        <p className="text-gray-700 dark:text-gray-300">
                            {invoice.client} <br />
                            {invoice.address} <br />
                            {invoice.email} <br />
                            {invoice.phone}
                        </p>
                    </div>

                    <table className="w-full text-left border-t border-b dark:border-gray-700 mb-4">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                                <th className="py-2 px-3">Description</th>
                                <th className="py-2 px-3">Qty</th>
                                <th className="py-2 px-3">Unit Price</th>
                                <th className="py-2 px-3">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice.items.map((item, idx) => (
                                <tr key={idx} className="border-t dark:border-gray-700 text-gray-700 dark:text-gray-300">
                                    <td className="py-2 px-3">{item.desc}</td>
                                    <td className="py-2 px-3">{item.qty}</td>
                                    <td className="py-2 px-3">₹{item.price.toLocaleString()}</td>
                                    <td className="py-2 px-3">₹{(item.qty * item.price).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="text-right text-gray-700 dark:text-gray-200">
                        <p>Subtotal: ₹{subtotal.toLocaleString()}</p>
                        <p>GST (18%): ₹{gst.toLocaleString()}</p>
                        <p className="font-bold text-lg mt-2">Total: ₹{total.toLocaleString()}</p>
                    </div>

                    <p className="text-center text-gray-500 dark:text-gray-400 mt-6 text-sm">
                        Thank you for your business! Please make payment before due date.
                        For queries, contact <strong>accounts@technova.com</strong>
                    </p>
                </div>

                <footer className="text-center text-gray-400 dark:text-gray-500 text-sm mt-6">
                    © 2025 Intelligent Enterprise Automation Platform | HR Portal
                </footer>
            </div>
        </div>
    );
}

export default InvoiceView;
