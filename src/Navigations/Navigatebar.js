// File: src/Navigations/Navigatebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navigatebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { name: "Home", path: "/hr" },
        { name: "Employee Details", path: "/employee" },
        { name: "Profile", path: "/profile" },
    ];

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/Login");
    };

    return (
        <nav className="flex items-center justify-between bg-white dark:bg-gray-800 shadow px-6 py-3 rounded-2xl mb-6">
            {/* Left Logo / Title */}
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                🧩 IEAP HR Portal
            </h2>

            {/* Center Links */}
            <ul className="flex items-center space-x-6">
                {navItems.map((item) => (
                    <li key={item.name}>
                        <Link
                            to={item.path}
                            className={`text-sm font-medium px-3 py-2 rounded-lg transition ${location.pathname === item.path
                                ? "bg-blue-500 text-white"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                }`}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}

                {/* ✅ Plain Avatar Circle (No image) */}
                <li>
                    <Link to="/profile">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold text-lg hover:scale-105 transition">
                            P
                        </div>
                    </Link>
                </li>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition"
                >
                    Logout
                </button>
            </ul>
        </nav>
    );
};

export default Navigatebar;
