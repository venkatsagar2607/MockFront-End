import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navigatebaradmin from "../Navigations/Adminnavbar";
import Footer from "../Navigations/Footer";
import ChatBot from "../ChatBot/ChatWidget"; // ✅ Import ChatBot component


const ManageEmployees = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    phone: "",
  });

  // ✅ Apply theme
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // ✅ Fetch all employees
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/employees");
      setEmployees(res.data);
    } catch (err) {
      toast.error("Failed to fetch employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ✅ Handle input changes for add/edit
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  // ✅ Add new employee
  const handleAdd = async () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.role) {
      toast.warning("Please fill all required fields");
      return;
    }
    try {
      await axios.post("http://localhost:3001/api/admin/addEmployee", newEmployee);
      toast.success("Employee added successfully!");
      setNewEmployee({ name: "", email: "", role: "", department: "", phone: "" });
      fetchEmployees();
    } catch (err) {
      toast.error("Failed to add employee");
    }
  };

  // ✅ Delete employee
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await axios.delete(`http://localhost:3001/api/admin/delete/${id}`);
      toast.success("Employee deleted!");
      fetchEmployees();
    } catch (err) {
      toast.error("Failed to delete employee");
    }
  };

  // ✅ Filter employees by search
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()) ||
      emp.department?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      {/* 🧭 Admin Navbar */}
      <Navigatebaradmin />

      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Manage Employees
        </h1>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl hover:scale-105 transition"
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>

      {/* Add Employee Form */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-8">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          ➕ Add New Employee
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={newEmployee.name}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-100"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newEmployee.email}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-100"
          />
          <input
            type="text"
            name="role"
            placeholder="Role (e.g. Developer)"
            value={newEmployee.role}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-100"
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={newEmployee.department}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-100"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={newEmployee.phone}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-100"
          />
        </div>
        <button
          onClick={handleAdd}
          className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
        >
          Add Employee
        </button>
      </div>

      {/* Employee Table */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            👥 Employee List
          </h2>
          <input
            type="text"
            placeholder="🔍 Search by name, email, or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-100 w-80"
          />
        </div>

        <table className="min-w-full text-sm">
          <thead className="border-b dark:border-gray-600">
            <tr className="text-gray-600 dark:text-gray-300">
              <th className="px-3 py-2 text-left">ID</th>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Email</th>
              <th className="px-3 py-2 text-left">Role</th>
              <th className="px-3 py-2 text-left">Department</th>
              <th className="px-3 py-2 text-left">Phone</th>
              <th className="px-3 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="px-3 py-2">{emp.id}</td>
                  <td className="px-3 py-2">{emp.name}</td>
                  <td className="px-3 py-2">{emp.email}</td>
                  <td className="px-3 py-2">{emp.role}</td>
                  <td className="px-3 py-2">{emp.department}</td>
                  <td className="px-3 py-2">{emp.phone}</td>
                  <td className="px-3 py-2">
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* ✅ Floating Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        <ChatBot />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ManageEmployees;
