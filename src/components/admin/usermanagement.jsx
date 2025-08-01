import React, { useState, useEffect } from "react";
import Sidebar from "../admin/sidebar";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [formData, setFormData] = useState({
        userName: "",
        userPassword: "",
        role: "",
    });
    
    const [user, setUser] = useState(null);
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate("/login");
        }
    }, [navigate]);

    // Fetch users from API
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch("https://iassrd.com:8081/api/v1/users");
            const result = await response.json();
            if (result.success) {
                setUsers(result.data);
                setSuccess(result.message);
                setTimeout(() => setSuccess(""), 3000);
            } else {
                setError("Failed to fetch users");
                setTimeout(() => setError(""), 3000);
            }
        } catch (err) {
            setError("Error fetching users");
            setTimeout(() => setError(""), 3000);
        }
    };

    // POST: Add new user
    const handleAddUser = async () => {
        try {
            const response = await fetch("https://iassrd.com:8081/api/v1/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (result.success) {
                const newUser = {
                    userId: result.data[0].userId,
                    userName: result.data[0].userName,
                    role: result.data[0].role,
                    userCreatedAt: result.data[0].userCreatedAt,
                    userUpdatedAt: result.data[0].userUpdatedAt,
                };
                setUsers([...users, newUser]);
                setSuccess("User added successfully");
                setShowUserModal(false);
                resetForm();
                setTimeout(() => setSuccess(""), 3000);
            } else {
                setError("Failed to add user: " + (result.message || "Unknown error"));
                setTimeout(() => setError(""), 3000);
            }
        } catch (err) {
            setError("Error adding user: " + err.message);
            setTimeout(() => setError(""), 3000);
        }
    };

    // PUT: Update user
    const handleUpdateUser = async () => {
        try {
            const response = await fetch(
                `https://iassrd.com:8081/api/v1/users/${currentUser.userId}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );
            const result = await response.json();
            if (result.success) {
                const updatedUser = {
                    userId: result.data[0].userId,
                    userName: result.data[0].userName,
                    role: result.data[0].role,
                    userCreatedAt: result.data[0].userCreatedAt,
                    userUpdatedAt: result.data[0].userUpdatedAt,
                };
                setUsers(
                    users.map((user) =>
                        user.userId === currentUser.userId ? updatedUser : user
                    )
                );
                setSuccess("User updated successfully");
                setShowUserModal(false);
                resetForm();
                setTimeout(() => setSuccess(""), 3000);
            } else {
                setError("Failed to update user: " + (result.message || "Unknown error"));
                setTimeout(() => setError(""), 3000);
            }
        } catch (err) {
            setError("Error updating user: " + err.message);
            setTimeout(() => setError(""), 3000);
        }
    };

    // DELETE: Delete selected users
    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await Promise.all(
                selectedRows.map((id) =>
                    fetch(`https://iassrd.com:8081/api/v1/users/${id}`, {
                        method: "DELETE",
                    })
                )
            );
            setUsers(users.filter((user) => !selectedRows.includes(user.userId)));
            setSelectedRows([]);
            setSuccess("User(s) deleted successfully");
            setShowDeleteModal(false);
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError("Error deleting user(s)");
            setShowDeleteModal(false);
            setTimeout(() => setError(""), 3000);
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
    };

    // Handle edit button
    const handleEdit = () => {
        const user = users.find((u) => u.userId === selectedRows[0]);
        setCurrentUser(user);
        setFormData({
            userName: user.userName || "",
            userPassword: "",
            role: user.role || "",
        });
        setShowUserModal(true);
    };

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Reset form
    const resetForm = () => {
        setFormData({ userName: "", userPassword: "", role: "" });
        setCurrentUser(null);
    };

    // Handle checkbox change
    const handleCheckboxChange = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };

    // Pagination
    const filteredUsers = users.filter((user) =>
        (user.userName ? user.userName.toLowerCase().includes(searchTerm.toLowerCase()) : false) ||
        (user.role ? user.role.toLowerCase().includes(searchTerm.toLowerCase()) : false)
    );
    const totalItems = filteredUsers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="flex min-h-screen bg-blue-50">
            <header className="fixed top-0 left-0 w-full bg-blue-900 text-white py-4 px-6 flex items-center justify-between z-40">
                <h1 className="text-xl font-semibold">
                    International Academy for Social Sciences Research and Development
                </h1>
                <div className="flex items-center space-x-4">
                    <span className="text-sm">Hi {user?.user_name}</span>
                </div>
            </header>
            <div className="w-[20%]">
                <Sidebar />
            </div>
            <div className="w-screen p-6 mt-10">
                <header className="bg-cyan-500 text-white my-15 p-4 rounded-t-lg mb-4 shadow-md">
                    <h1 className="text-2xl font-bold">Users Roles Dashboard</h1>
                    <p className="text-sm opacity-90 mt-1">Manage USERS AND ROLES.</p>
                </header>

                {success && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                        {success}
                    </div>
                )}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setShowUserModal(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
                        >
                            Add User
                        </button>
                        {selectedRows.length > 0 && (
                            <>
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
                                >
                                    <FaTrash /> Delete
                                </button>
                                {selectedRows.length === 1 && (
                                    <button
                                        onClick={handleEdit}
                                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
                                    >
                                        <FaEdit /> Edit
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                    <div className="relative w-full sm:w-72">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                        <input
                            type="text"
                            placeholder="Search by name or role..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-blue-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                    <table className="w-full table-auto min-w-[1000px]">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700 text-sm">
                                <th className="p-3 text-left">
                                    <input
                                        type="checkbox"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedRows(currentItems.map((item) => item.userId));
                                            } else {
                                                setSelectedRows([]);
                                            }
                                        }}
                                        checked={
                                            currentItems.length > 0 &&
                                            currentItems.every((item) =>
                                                selectedRows.includes(item.userId)
                                            )
                                        }
                                        className="h-5 w-5 text-blue-500 border-blue-200 rounded focus:ring-blue-400"
                                    />
                                </th>
                                <th className="p-3 text-left">S.No</th>
                                <th className="p-3 text-left">User Name</th>
                                <th className="p-3 text-left">Role</th>
                                <th className="p-3 text-left">Created At</th>
                                <th className="p-3 text-left">Updated At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr
                                    key={item.userId}
                                    className="border-t border-gray-200 text-gray-600 text-sm hover:bg-blue-50 transition-colors"
                                >
                                    <td className="p-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(item.userId)}
                                            onChange={() => handleCheckboxChange(item.userId)}
                                            className="h-5 w-5 text-blue-500 border-blue-200 rounded focus:ring-blue-400"
                                        />
                                    </td>
                                    <td className="p-3">{startIndex + index + 1}</td>
                                    <td className="p-3">{item.userName || "-"}</td>
                                    <td className="p-3">{item.role || "-"}</td>
                                    <td className="p-3">
                                        {item.userCreatedAt ? new Date(item.userCreatedAt).toLocaleString() : "-"}
                                    </td>
                                    <td className="p-3">
                                        {item.userUpdatedAt ? new Date(item.userUpdatedAt).toLocaleString() : "-"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 text-gray-600 text-sm gap-4">
                    <span>
                        Showing {startIndex + 1} to{" "}
                        {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems}{" "}
                        users
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-white border border-blue-200 rounded-full hover:bg-blue-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors shadow-md"
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md">
                            {currentPage}
                        </span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-white border border-blue-200 rounded-full hover:bg-blue-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors shadow-md"
                        >
                            Next
                        </button>
                    </div>
                </div>

                {showDeleteModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <p className="text-lg font-semibold text-gray-700 mb-4">
                                Are you sure you want to delete {selectedRows.length} user(s)?
                            </p>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={confirmDelete}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-colors shadow-md"
                                >
                                    Yes, Delete
                                </button>
                                <button
                                    onClick={cancelDelete}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-full transition-colors shadow-md"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showUserModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                            <h2 className="text-xl font-semibold mb-4">
                                {currentUser ? "Edit User" : "Add User"}
                            </h2>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    User Name
                                </label>
                                <input
                                    type="text"
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="userPassword"
                                    value={formData.userPassword}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder={currentUser ? "Leave blank to keep unchanged" : ""}
                                    required={!currentUser}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Role
                                </label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Role</option>
                                    <option value="ADMIN">ADMIN</option>
                                    <option value="USER">USER</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={currentUser ? handleUpdateUser : handleAddUser}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors shadow-md"
                                >
                                    {currentUser ? "Update" : "Add"}
                                </button>
                                <button
                                    onClick={() => {
                                        setShowUserModal(false);
                                        resetForm();
                                    }}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-full transition-colors shadow-md"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserManagement;