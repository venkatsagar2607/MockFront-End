// File: src/pages/SigninForm.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const sunIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 12a5 5 0 100-10 5 5 0 000 10z" />
    </svg>
);
const moonIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

function SigninForm() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        const root = window.document.documentElement;
        theme === 'dark' ? root.classList.add('dark') : root.classList.remove('dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {
                // alert(data.message);
                toast.success(data.message || 'Login successful', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    style:
                    {
                        fontFamily: "'Noto Sans', sans-serif",
                    },
                });

                // ✅ store name, email, role
                localStorage.setItem("userName", data.name);
                localStorage.setItem("userEmail", data.email);
                localStorage.setItem("userRole", data.role);

                sessionStorage.setItem("login", true);
                sessionStorage.setItem("email", data.email);  // ✅ Add this
                sessionStorage.setItem("role", data.role);
                sessionStorage.setItem("name", data.name);

                // redirect by role
                switch (data.role) {
                    case 'Employee':
                        navigate('/employee');
                        break;
                    case 'HR':
                        navigate('/hr');
                        break;
                    case 'Admin':
                        navigate('/admin');
                        break;
                    case 'Finance':
                        navigate('/finance');
                        break;
                    case 'Sales':
                        navigate('/salesdash');
                        break;

                    default:
                        navigate('/profile');
                }
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (err) {
            console.error(err);
            alert('Error during login');
        }
    };

    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 transition-colors duration-300 dark:bg-gray-900">
                <div className="relative w-full max-w-md rounded-xl bg-white p-8 shadow-2xl transition-colors duration-300 dark:bg-gray-800">
                    <button
                        onClick={toggleTheme}
                        className="absolute top-4 right-4 rounded-full p-2 text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
                    >
                        {theme === 'light' ? moonIcon : sunIcon}
                    </button>

                    <h2 className="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
                        Sign In
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                Sign In
                            </button>
                        </div>

                        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                            Don't have an account?{' '}
                            <Link to="/" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SigninForm;
