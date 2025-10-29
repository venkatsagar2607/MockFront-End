// File: src/pages/Profile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigatebar from "../Navigations/Navigatebar";

const Profile = () => {
    const [profile, setProfile] = useState({
        name: localStorage.getItem("userName") || "",
        email: localStorage.getItem("userEmail") || "",
        role: localStorage.getItem("userRole") || "",
        phone: "",
        dob: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        pincode: "",
    });

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    // ✅ Theme handler
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    // ✅ Fetch profile details
    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (email) {
            axios
                .get(`http://localhost:3001/api/profile?email=${email}`)
                .then((res) => {
                    if (res.data.success && res.data.user) {
                        const user = res.data.user;
                        // Fix date format if present
                        if (user.dob) {
                            user.dob = user.dob.split("T")[0];
                        }
                        setProfile((prev) => ({ ...prev, ...user }));
                    }
                })
                .catch((err) => console.log("No existing profile found", err));
        }
    }, []);

    // ✅ Save or update profile
    const handleSave = async () => {
        try {
            const res = await axios.post("http://localhost:3001/api/profile", profile);
            alert(`✅ ${res.data.message}`);
        } catch (err) {
            console.error(err);
            alert("❌ Failed to save profile!");
        }
    };

    // ✅ Render
    return (
        <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
            <Navigatebar />

            {/* Header */}
            <div className="flex items-center justify-between mb-6 max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    👤 Profile Page
                </h1>
                <button
                    onClick={toggleTheme}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl hover:scale-105 transition"
                >
                    {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
            </div>

            {/* Profile Card */}
            <div className="bg-white dark:bg-gray-800 shadow-lg p-8 rounded-2xl max-w-5xl mx-auto">
                {/* Avatar */}
                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-blue-500 text-white text-3xl font-semibold mx-auto mb-6">
                    {profile.name ? profile.name.charAt(0).toUpperCase() : "P"}
                </div>

                {/* Form */}
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries({
                        name: "Full Name",
                        email: "Email Address",
                        role: "Designation / Role",
                        phone: "Phone Number",
                        dob: "Date of Birth",
                        pincode: "Pincode",
                        address1: "Address Line 1",
                        address2: "Address Line 2",
                        city: "City",
                        state: "State",
                    }).map(([key, label]) => (
                        <div
                            key={key}
                            className={["address1", "address2"].includes(key) ? "md:col-span-2" : ""}
                        >
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">
                                {label}
                            </label>
                            <input
                                type={key === "dob" ? "date" : "text"}
                                name={key}
                                value={profile[key] || ""}
                                onChange={handleChange}
                                readOnly={["email", "role"].includes(key)} // prevent editing
                                className={`w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                                bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 
                                focus:ring-2 focus:ring-blue-500 
                                ${["email", "role"].includes(key) ? "opacity-70 cursor-not-allowed" : ""}`}
                            />
                        </div>
                    ))}
                </form>

                {/* Save button */}
                <div className="text-center mt-8">
                    <button
                        type="button"
                        onClick={handleSave}
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-transform hover:scale-105"
                    >
                        💾 Save Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
