import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navigatebaradmin = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { name: "Home", path: "/employee" },
        // { name: "Manage Employees", path: "/manageemployees" },
        { name: "Leaves", path: "/leaves" },
        { name: "Payslips", path: "/payslips" },
        // { name: "Profile", path: "/EmployeeProfile" },
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
                Employee Portal
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

                {/* Avatar Circle (Plain) */}
                <li>
                    <Link to="/EmployeeProfile">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold text-lg hover:scale-105 transition">
                            A
                        </div>
                    </Link>
                </li>

                {/* Logout Button */}
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
};

export default Navigatebaradmin;
