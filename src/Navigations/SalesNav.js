import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function FinancNav() {
    const location = useLocation();
    const navigate = useNavigate();


    const [profile] = useState({
        name: localStorage.getItem("userName") || "",
        email: localStorage.getItem("userEmail") || "",
        role: localStorage.getItem("userRole") || "",
    });

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/Login");
    };

    const navItems = [
        { name: "Dashboard", path: "/salesdash" },
        { name: "Leads", path: "/leads" },
        { name: "Orders", path: "/orders" },
        { name: "Reports", path: "/salesreports" },
    ];

    return (
        <nav className="flex items-center justify-between bg-white dark:bg-gray-800 shadow px-6 py-3 rounded-2xl mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                💰 Sales Portal
            </h2>

            <ul className="flex items-center space-x-5">
                {navItems.map((item) => (
                    <li key={item.name}>
                        <Link
                            to={item.path}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${location.pathname === item.path
                                ? "bg-blue-500 text-white"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                }`}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}

                {/* Profile avatar small & clean */}
                <li>
                    <Link to="/salesprf" className="block">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white text-lg font-semibold hover:scale-105 transition">
                            {profile.name ? profile.name.charAt(0).toUpperCase() : "F"}
                        </div>
                    </Link>
                </li>
                <li>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition"
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default FinancNav;
