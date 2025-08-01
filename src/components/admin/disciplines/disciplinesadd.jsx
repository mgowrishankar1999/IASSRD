// // import React, { useState } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import Sidebar from "../sidebar"; // Adjust path to your Sidebar
// // import axios from "axios";

// // const BASE_URL = "https://iassrd.com:8081/api/v1";

// // const AddNewDisciplines = () => {
// //     const navigate = useNavigate();
// //     const location = useLocation();
// //     const disciplineToEdit = location.state?.discipline || null;

// //     const user = JSON.parse(localStorage.getItem("user")) || {};
// //     const currentUserId = user.userId || "1";
// //     const currentUserType = user.userType || "1";

// //     const [formData, setFormData] = useState({
// //         disciplineName: disciplineToEdit?.disciplineName || "",
// //         department: disciplineToEdit?.department || "",
// //         status: disciplineToEdit?.status !== undefined ? disciplineToEdit.status : 1,
// //     });
// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState(null);
// //     const [success, setSuccess] = useState(null);

// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setFormData((prev) => ({
// //             ...prev,
// //             [name]: value,
// //         }));
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         setLoading(true);
// //         setError(null);
// //         setSuccess(null);

// //         try {
// //             const disciplineData = {
// //                 disciplineName: formData.disciplineName,
// //                 department: formData.department,
// //                 status: parseInt(formData.status),
// //                 createdUserId: parseInt(currentUserId),
// //                 createdUserType: parseInt(currentUserType),
// //                 updatedUserId: parseInt(currentUserId),
// //                 updatedUserType: parseInt(currentUserType),
// //             };

// //             let response;
// //             if (disciplineToEdit) {
// //                 response = await axios.put(
// //                     `${BASE_URL}/disciplines/${disciplineToEdit.disciplineId}`,
// //                     disciplineData
// //                 );
// //             } else {
// //                 response = await axios.post(`${BASE_URL}/disciplines`, disciplineData);
// //             }

// //             if (response.data.success) {
// //                 setSuccess(
// //                     disciplineToEdit
// //                         ? "Discipline updated successfully!"
// //                         : "Discipline added successfully!"
// //                 );
// //                 setTimeout(() => navigate("/disciplines"), 1500);
// //             } else {
// //                 setError(`Failed to ${disciplineToEdit ? "update" : "add"} discipline.`);
// //             }
// //         } catch (err) {
// //             const message = err.response?.data?.message || "Something went wrong";
// //             if (err.response?.status === 400) {
// //                 setError(`Invalid input: ${message}`);
// //             } else if (err.response?.status === 404) {
// //                 setError(`Discipline not found: ${message}`);
// //             } else {
// //                 setError(`Error: ${message}`);
// //             }
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const handleCancel = () => {
// //         navigate("/disciplines");
// //     };

// //     return (
// //         <div className="flex min-h-screen bg-blue-50">
// //             <div className="w-[20%]">
// //                 <Sidebar />
// //             </div>
// //             <div className="flex-1 p-6">
// //                 <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-4 shadow-md">
// //                     <h1 className="text-2xl font-bold">
// //                         {disciplineToEdit ? "Edit Discipline" : "Add New Discipline"}
// //                     </h1>
// //                 </header>

// //                 {success && (
// //                     <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
// //                         {success}
// //                     </div>
// //                 )}
// //                 {error && (
// //                     <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
// //                         {error}
// //                     </div>
// //                 )}

// //                 <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
// //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                         <div>
// //                             <label className="block text-gray-700 text-sm font-medium mb-2">
// //                                 Discipline Name
// //                             </label>
// //                             <input
// //                                 type="text"
// //                                 name="disciplineName"
// //                                 value={formData.disciplineName}
// //                                 onChange={handleChange}
// //                                 className="w-full px-4 py-2 border border-blue-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
// //                                 placeholder="Enter discipline name"
// //                                 required
// //                             />
// //                         </div>
// //                         <div>
// //                             <label className="block text-gray-700 text-sm font-medium mb-2">
// //                                 Department
// //                             </label>
// //                             <input
// //                                 type="text"
// //                                 name="department"
// //                                 value={formData.department}
// //                                 onChange={handleChange}
// //                                 className="w-full px-4 py-2 border border-blue-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
// //                                 placeholder="Enter department"
// //                                 required
// //                             />
// //                         </div>
// //                         <div>
// //                             <label className="block text-gray-700 text-sm font-medium mb-2">
// //                                 Status
// //                             </label>
// //                             <select
// //                                 name="status"
// //                                 value={formData.status}
// //                                 onChange={handleChange}
// //                                 className="w-full px-4 py-2 border border-blue-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
// //                                 required
// //                             >
// //                                 <option value="1">Active</option>
// //                                 <option value="0">Inactive</option>
// //                             </select>
// //                         </div>
// //                     </div>

// //                     <div className="mt-6 flex gap-4">
// //                         <button
// //                             type="submit"
// //                             disabled={loading}
// //                             className={`bg-blue-600 text-white px-6 py-2 rounded-full ${
// //                                 loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
// //                             }`}
// //                         >
// //                             {loading ? "Saving..." : disciplineToEdit ? "Update" : "Add"}
// //                         </button>
// //                         <button
// //                             type="button"
// //                             onClick={handleCancel}
// //                             className="bg-gray-600 text-white px-6 py-2 rounded-full hover:bg-gray-700"
// //                         >
// //                             Cancel
// //                         </button>
// //                     </div>
// //                 </form>
// //             </div>
// //         </div>
// //     );
// // };

// // export default AddNewDisciplines;


// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Sidebar from "../sidebar";
// import axios from "axios";

// const BASE_URL = "https://iassrd.com:8081/api/v1";

// const AddNewDisciplines = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const disciplineToEdit = location.state?.discipline || null;
//     const dropdownRef = useRef(null);
//     const searchInputRef = useRef(null);

//     const user = JSON.parse(localStorage.getItem("user")) || {};
//     const currentUserId = user.userId || "1";
//     const currentUserType = user.userType || "1";

//     const [formData, setFormData] = useState({
//         disciplineName: disciplineToEdit?.disciplineName || "",
//     });
//     const [loading, setLoading] = useState(false);
//     const [modal, setModal] = useState({ show: false, type: "", message: "" });
//     const [disciplines, setDisciplines] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [showDropdown, setShowDropdown] = useState(false);

//     const handleOutsideClick = (ref, callback) => {
//         const handleClickOutside = (event) => {
//             if (ref.current && !ref.current.contains(event.target)) {
//                 callback();
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     };

    

//     useEffect(() => {
//         const cleanupDropdown = handleOutsideClick(dropdownRef, () => setShowDropdown(false));
//         return cleanupDropdown;
//     }, []);

//     useEffect(() => {
//         if (showDropdown && searchInputRef.current) {
//             searchInputRef.current.focus();
//         }
//     }, [showDropdown]);

//     useEffect(() => {
//         const fetchDisciplines = async () => {
//             try {
//                 const response = await axios.get(`${BASE_URL}/disciplines`);
//                 if (response.data.success && Array.isArray(response.data.data)) {
//                     setDisciplines(response.data.data);
//                     if (disciplineToEdit && disciplineToEdit.disciplineName) {
//                         setSearchTerm(disciplineToEdit.disciplineName);
//                     }
//                 } else {
//                     setDisciplines([]);
//                     setModal({
//                         show: true,
//                         type: "error",
//                         message: "No disciplines found.",
//                     });
//                 }
//             } catch (err) {
//                 console.error("Error fetching disciplines:", err);
//                 setModal({
//                     show: true,
//                     type: "error",
//                     message: "Error fetching disciplines: " + err.message,
//                 });
//                 setDisciplines([]);
//             }
//         };
//         fetchDisciplines();
//     }, [disciplineToEdit]);

//     useEffect(() => {
//         if (formData.disciplineName && disciplines.length > 0) {
//             const selectedDiscipline = disciplines.find(
//                 (discipline) => discipline.disciplineName.toLowerCase() === formData.disciplineName.toLowerCase()
//             );
//             setSearchTerm(selectedDiscipline ? selectedDiscipline.disciplineName : formData.disciplineName);
//         } else {
//             setSearchTerm(formData.disciplineName);
//         }
//     }, [formData.disciplineName, disciplines]);

//     const filteredDisciplines = disciplines.filter((discipline) =>
//         discipline.disciplineName.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const handleSelect = (disciplineName) => {
//         setFormData((prev) => ({ ...prev, disciplineName }));
//         setSearchTerm(disciplineName);
//         setShowDropdown(false);
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//         setSearchTerm(value);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setModal({ show: false, type: "", message: "" });

//         try {
//             const disciplineData = {
//                 disciplineName: formData.disciplineName,
//                 createdUserId: parseInt(currentUserId),
//                 createdUserType: parseInt(currentUserType),
//                 updatedUserId: parseInt(currentUserId),
//                 updatedUserType: parseInt(currentUserType),
//             };

//             let response;
//             if (disciplineToEdit) {
//                 response = await axios.put(
//                     `${BASE_URL}/disciplines/${disciplineToEdit.disciplineId}`,
//                     disciplineData
//                 );
//             } else {
//                 response = await axios.post(`${BASE_URL}/disciplines`, disciplineData);
//             }

//             if (response.data.success) {
//                 setModal({
//                     show: true,
//                     type: "success",
//                     message: disciplineToEdit
//                         ? "Discipline updated successfully!"
//                         : "Discipline added successfully!",
//                 });
//                 setTimeout(() => {
//                     setModal({ show: false, type: "", message: "" });
//                     navigate("/disciplines");
//                 }, 2000);
//             } else {
//                 setModal({
//                     show: true,
//                     type: "error",
//                     message: `Failed to ${disciplineToEdit ? "update" : "add"} discipline: ${response.data.message || "Unknown error"
//                         }`,
//                 });
//             }
//         } catch (err) {
//             setModal({
//                 show: true,
//                 type: "error",
//                 message: `Error: ${err.response?.data?.message || err.message}`,
//             });
//             console.error("Error saving discipline:", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleCancel = () => {
//         navigate("/disciplines");
//     };

//     return (
//         <div className="flex min-h-screen bg-blue-50">
//             <header className="fixed top-0 left-0 w-full bg-blue-900 text-white py-4 px-6 flex items-center justify-between z-40">
//                 <h1 className="text-xl font-semibold">
//                     International Academy for Social Sciences Research and Development
//                 </h1>
//                 <div className="flex items-center space-x-4">
//                     <span className="text-sm">Hi {user?.user_name}</span>
//                 </div>
//             </header>
//             <div className="w-[20%]">
//                 <Sidebar />
//             </div>
//             <div className="w-screen p-6 pt-20 h-screen overflow-y-auto">
//                 <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-6 shadow-md">
//                     <h1 className="text-2xl font-bold">
//                         {disciplineToEdit ? "Edit Discipline" : "Add New Discipline"}
//                     </h1>
//                     <p className="text-sm opacity-90 mt-1">
//                         {disciplineToEdit
//                             ? "Update the discipline details below."
//                             : "Fill in the details to add a new discipline."}
//                     </p>
//                 </header>

//                 <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
//                     <h2 className="text-xl font-semibold text-blue-600 mb-6">
//                         {disciplineToEdit ? "Edit Discipline" : "Add New Discipline"}
//                     </h2>

//                     <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
//                         <div className="relative" ref={dropdownRef}>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">
//                                 Discipline *
//                             </label>
//                             <input
//                                 type="text"
//                                 name="disciplineName"
//                                 value={formData.disciplineName}
//                                 onChange={handleChange}
//                                 placeholder="Enter or select discipline name"
//                                 className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 onClick={() => setShowDropdown(true)}
//                                 required
//                             />
//                             {showDropdown && (
//                                 <div className="absolute z-50 w-full border border-blue-200 rounded-lg bg-white shadow-lg max-h-60 overflow-y-auto mt-1">
//                                     <input
//                                         ref={searchInputRef}
//                                         type="text"
//                                         value={searchTerm}
//                                         onChange={(e) => {
//                                             setSearchTerm(e.target.value);
//                                             setFormData((prev) => ({
//                                                 ...prev,
//                                                 disciplineName: e.target.value,
//                                             }));
//                                             setShowDropdown(true);
//                                         }}
//                                         placeholder="Search Discipline..."
//                                         className="w-full px-3 py-2 border-b border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                                     />
//                                     {filteredDisciplines.length > 0 ? (
//                                         filteredDisciplines.map((discipline) => (
//                                             <div
//                                                 key={discipline.disciplineId}
//                                                 onClick={() => handleSelect(discipline.disciplineName)}
//                                                 className="px-3 py-2 cursor-pointer hover:bg-blue-100"
//                                             >
//                                                 {discipline.disciplineName}
//                                             </div>
//                                         ))
//                                     ) : (
//                                         <div className="px-3 py-2 text-gray-500">No results found</div>
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                         <div className="flex justify-end gap-4 mt-6">
//                             <button
//                                 type="submit"
//                                 disabled={loading}
//                                 className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors shadow-md ${loading ? "opacity-50 cursor-not-allowed" : ""
//                                     }`}
//                             >
//                                 {loading ? "Saving..." : disciplineToEdit ? "Update" : "Add"}
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={handleCancel}
//                                 className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-full transition-colors shadow-md"
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </form>
//                 </div>

//                 {modal.show && (
//                     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//                         <div
//                             className={`p-6 rounded-lg shadow-lg ${modal.type === "success" ? "bg-green-100" : "bg-red-100"
//                                 }`}
//                         >
//                             <p
//                                 className={`text-lg font-semibold ${modal.type === "success" ? "text-green-700" : "text-red-700"
//                                     }`}
//                             >
//                                 {modal.message}
//                             </p>
//                             <button
//                                 onClick={() => setModal({ show: false, type: "", message: "" })}
//                                 className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors shadow-md"
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>  
//     );
// };

// export default AddNewDisciplines;


import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../sidebar";
import axios from "axios";

const BASE_URL = "https://iassrd.com:8081/api/v1";

const AddNewDisciplines = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const disciplineToEdit = location.state?.discipline || null;
    const dropdownRef = useRef(null);
    const searchInputRef = useRef(null);

    const [formData, setFormData] = useState({
        disciplineName: disciplineToEdit?.disciplineName || "",
    });
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState({ show: false, type: "", message: "" });
    const [disciplines, setDisciplines] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const handleOutsideClick = (ref, callback) => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    };

    useEffect(() => {
        const cleanupDropdown = handleOutsideClick(dropdownRef, () => setShowDropdown(false));
        return cleanupDropdown;
    }, []);

    useEffect(() => {
        if (showDropdown && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [showDropdown]);

    // Fetch current user data by matching userName from localStorage
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem("user")) || {};
                const userName = storedUser.userName || storedUser.user_name;
                if (!userName) {
                    setModal({
                        show: true,
                        type: "error",
                        message: "No user data found in localStorage. Please log in again.",
                    });
                    return;
                }

                const response = await axios.get(`${BASE_URL}/users`);
                if (response.data.success && Array.isArray(response.data.data)) {
                    const matchedUser = response.data.data.find(
                        (user) => user.userName.toLowerCase() === userName.toLowerCase()
                    );
                    if (matchedUser) {
                        setCurrentUser(matchedUser);
                    } else {
                        setModal({
                            show: true,
                            type: "error",
                            message: "User not found in the system. Please log in again.",
                        });
                    }
                } else {
                    setModal({
                        show: true,
                        type: "error",
                        message: "Failed to fetch users data.",
                    });
                }
            } catch (err) {
                console.error("Error fetching users:", err);
                setModal({
                    show: true,
                    type: "error",
                    message: "Error fetching user data: " + err.message,
                });
            }
        };
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        const fetchDisciplines = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/disciplines`);
                if (response.data.success && Array.isArray(response.data.data)) {
                    setDisciplines(response.data.data);
                    if (disciplineToEdit && disciplineToEdit.disciplineName) {
                        setSearchTerm(disciplineToEdit.disciplineName);
                    }
                } else {
                    setDisciplines([]);
                    setModal({
                        show: true,
                        type: "error",
                        message: "No disciplines found.",
                    });
                }
            } catch (err) {
                console.error("Error fetching disciplines:", err);
                setModal({
                    show: true,
                    type: "error",
                    message: "Error fetching disciplines: " + err.message,
                });
                setDisciplines([]);
            }
        };
        fetchDisciplines();
    }, [disciplineToEdit]);

    useEffect(() => {
        if (formData.disciplineName && disciplines.length > 0) {
            const selectedDiscipline = disciplines.find(
                (discipline) => discipline.disciplineName.toLowerCase() === formData.disciplineName.toLowerCase()
            );
            setSearchTerm(selectedDiscipline ? selectedDiscipline.disciplineName : formData.disciplineName);
        } else {
            setSearchTerm(formData.disciplineName);
        }
    }, [formData.disciplineName, disciplines]);

    const filteredDisciplines = disciplines.filter((discipline) =>
        discipline.disciplineName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (disciplineName) => {
        setFormData((prev) => ({ ...prev, disciplineName }));
        setSearchTerm(disciplineName);
        setShowDropdown(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setSearchTerm(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            setModal({
                show: true,
                type: "error",
                message: "User data not available. Please try again.",
            });
            return;
        }

        setLoading(true);
        setModal({ show: false, type: "", message: "" });

        try {
            // Map role to userType (e.g., ADMIN -> 1, other roles can be mapped as needed)
            const userType = currentUser.role === "ADMIN" ? 1 : 2;

            const disciplineData = {
                disciplineName: formData.disciplineName,
                createdUserId: disciplineToEdit ? disciplineToEdit.createdUserId : currentUser.userId,
                createdUserType: disciplineToEdit ? disciplineToEdit.createdUserType : userType,
                updatedUserId: currentUser.userId,
                updatedUserType: userType,
            };

            let response;
            if (disciplineToEdit) {
                response = await axios.put(
                    `${BASE_URL}/disciplines/${disciplineToEdit.disciplineId}`,
                    disciplineData
                );
            } else {
                response = await axios.post(`${BASE_URL}/disciplines`, disciplineData);
            }

            if (response.data.success) {
                setModal({
                    show: true,
                    type: "success",
                    message: disciplineToEdit
                        ? "Discipline updated successfully!"
                        : "Discipline added successfully!",
                });
                setTimeout(() => {
                    setModal({ show: false, type: "", message: "" });
                    navigate("/disciplines");
                }, 2000);
            } else {
                setModal({
                    show: true,
                    type: "error",
                    message: `Failed to ${disciplineToEdit ? "update" : "add"} discipline: ${response.data.message || "Unknown error"}`,
                });
            }
        } catch (err) {
            setModal({
                show: true,
                type: "error",
                message: `Error: ${err.response?.data?.message || err.message}`,
            });
            console.error("Error saving discipline:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/disciplines");
    };

    return (
        <div className="flex min-h-screen bg-blue-50">
            <header className="fixed top-0 left-0 w-full bg-blue-900 text-white py-4 px-6 flex items-center justify-between z-40">
                <h1 className="text-xl font-semibold">
                    International Academy for Social Sciences Research and Development
                </h1>
                <div className="flex items-center space-x-4">
                    <span className="text-sm">Hi {currentUser?.userName || "User"}</span>
                </div>
            </header>
            <div className="w-[20%]">
                <Sidebar />
            </div>
            <div className="w-screen p-6 pt-20 h-screen overflow-y-auto">
                <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-6 shadow-md">
                    <h1 className="text-2xl font-bold">
                        {disciplineToEdit ? "Edit Discipline" : "Add New Discipline"}
                    </h1>
                    <p className="text-sm opacity-90 mt-1">
                        {disciplineToEdit
                            ? "Update the discipline details below."
                            : "Fill in the details to add a new discipline."}
                    </p>
                </header>

                <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
                    <h2 className="text-xl font-semibold text-blue-600 mb-6">
                        {disciplineToEdit ? "Edit Discipline" : "Add New Discipline"}
                    </h2>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                        <div className="relative" ref={dropdownRef}>
                            <label className="block text-sm font-medium text-blue-600 mb-1">
                                Discipline *
                            </label>
                            <input
                                type="text"
                                name="disciplineName"
                                value={formData.disciplineName}
                                onChange={handleChange}
                                placeholder="Enter or select discipline name"
                                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                onClick={() => setShowDropdown(true)}
                                required
                            />
                            {showDropdown && (
                                <div className="absolute z-50 w-full border border-blue-200 rounded-lg bg-white shadow-lg max-h-60 overflow-y-auto mt-1">
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setFormData((prev) => ({
                                                ...prev,
                                                disciplineName: e.target.value,
                                            }));
                                            setShowDropdown(true);
                                        }}
                                        placeholder="Search Discipline..."
                                        className="w-full px-3 py-2 border-b border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                    {filteredDisciplines.length > 0 ? (
                                        filteredDisciplines.map((discipline) => (
                                            <div
                                                key={discipline.disciplineId}
                                                onClick={() => handleSelect(discipline.disciplineName)}
                                                className="px-3 py-2 cursor-pointer hover:bg-blue-100"
                                            >
                                                {discipline.disciplineName}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="px-3 py-2 text-gray-500">No results found</div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                type="submit"
                                disabled={loading || !currentUser}
                                className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors shadow-md ${loading || !currentUser ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                {loading ? "Saving..." : disciplineToEdit ? "Update" : "Add"}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-full transition-colors shadow-md"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>

                {modal.show && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div
                            className={`p-6 rounded-lg shadow-lg ${modal.type === "success" ? "bg-green-100" : "bg-red-100"}`}
                        >
                            <p
                                className={`text-lg font-semibold ${modal.type === "success" ? "text-green-700" : "text-red-700"}`}
                            >
                                {modal.message}
                            </p>
                            <button
                                onClick={() => setModal({ show: false, type: "", message: "" })}
                                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors shadow-md"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddNewDisciplines;