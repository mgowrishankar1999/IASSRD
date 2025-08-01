// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../sidebar";

// const AddNewAuthor = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const authorToEdit = location.state?.author || null;

//     const user = JSON.parse(localStorage.getItem("user")) || {};
//     const currentUserId = user.userId || "1";
//     const currentUserType = user.userType || "1";

//     const [formData, setFormData] = useState({
//         authorCode: authorToEdit?.authorCode || "",
//         prefix: authorToEdit?.prefix || "",
//         firstName: authorToEdit?.firstName || "",
//         lastName: authorToEdit?.lastName || "",
//         alternateName: authorToEdit?.alternateName || "",
//         designation: authorToEdit?.designation || "",
//         department: authorToEdit?.department || "",
//         university: authorToEdit?.university || "",
//         address: authorToEdit?.address || "",
//         country: authorToEdit?.country || "",
//         profileViews: authorToEdit?.profileViews || "",
//         papersPublished: authorToEdit?.papersPublished || "",
//         status: authorToEdit?.status !== undefined ? authorToEdit.status : 1,
//     });
//     const [logoFile, setLogoFile] = useState(null);
//     const [removeLogo, setRemoveLogo] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [modal, setModal] = useState({ show: false, type: "", message: "" });

//     const [affiliations, setAffiliations] = useState([]);
//     const [filteredAffiliations, setFilteredAffiliations] = useState([]);
//     const [searchAffiliation, setSearchAffiliation] = useState(authorToEdit?.university || "");
//     const [showDropdown, setShowDropdown] = useState(false);

//     const BASE_URL = "https://iassrd.com:8081/api/v1";

//     // Fetch affiliations from API
//     useEffect(() => {
//         const fetchAffiliations = async () => {
//             try {
//                 const response = await axios.get(`${BASE_URL}/affiliations`, {
//                     params: { page: 1, limit: 100 },
//                 });
//                 if (response.data.success) {
//                     setAffiliations(response.data.data || []);
//                     setFilteredAffiliations(response.data.data || []);
//                 } else {
//                     setModal({ show: true, type: "error", message: "Failed to fetch affiliations" });
//                 }
//             } catch (err) {
//                 setModal({ show: true, type: "error", message: "Error fetching affiliations: " + err.message });
//             }
//         };
//         fetchAffiliations();
//     }, []);

//     // Filter affiliations based on search input
//     useEffect(() => {
//         if (searchAffiliation) {
//             const filtered = affiliations.filter((aff) =>
//                 aff?.affName?.toLowerCase().includes(searchAffiliation.toLowerCase())
//             );
//             setFilteredAffiliations(filtered);
//         } else {
//             setFilteredAffiliations(affiliations);
//         }
//         setShowDropdown(false);
//     }, [searchAffiliation, affiliations]);

//     // Handle affiliation selection
//     const handleAffiliationSelect = (affiliation) => {
//         setFormData((prev) => ({
//             ...prev,
//             university: affiliation?.affName || "",
//             address: affiliation?.address || "",
//             country: affiliation?.country || "",
//         }));
//         setSearchAffiliation(affiliation?.affName || "");
//         setShowDropdown(false);
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleLogoChange = (e) => {
//         setLogoFile(e.target.files[0]);
//         setRemoveLogo(false);
//     };

//     const handleRemoveLogo = () => {
//         setLogoFile(null);
//         setRemoveLogo(true);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setModal({ show: false, type: "", message: "" });

//         try {
//             const formDataToSend = new FormData();
//             const authorData = {
//                 authorCode: formData.authorCode || "",
//                 prefix: formData.prefix || "",
//                 firstName: formData.firstName || "",
//                 lastName: formData.lastName || "",
//                 alternateName: formData.alternateName || "",
//                 designation: formData.designation || "",
//                 department: formData.department || "",
//                 university: formData.university || "",
//                 address: formData.address || "",
//                 country: formData.country || "",
//                 profileViews: formData.profileViews ? parseInt(formData.profileViews) : null,
//                 papersPublished: formData.papersPublished ? parseInt(formData.papersPublished) : null,
//                 status: parseInt(formData.status) || 1,
//                 createdUserId: parseInt(currentUserId) || 1,
//                 createdUserType: parseInt(currentUserType) || 1,
//                 updatedUserId: parseInt(currentUserId) || 1,
//                 updatedUserType: parseInt(currentUserType) || 1,
//             };

//             formDataToSend.append("author", new Blob([JSON.stringify(authorData)], { type: "application/json" }));
//             if (logoFile && typeof logoFile !== "string") {
//                 formDataToSend.append("logoFile", logoFile);
//             }
//             formDataToSend.append("removeLogo", removeLogo.toString());

//             const config = { headers: { "Content-Type": "multipart/form-data" } };
//             let response;
//             if (authorToEdit) {
//                 response = await axios.put(`${BASE_URL}/authors/${authorToEdit.authorId}`, formDataToSend, config);
//             } else {
//                 response = await axios.post(`${BASE_URL}/authors`, formDataToSend, config);
//             }

//             if (response.data.success) {
//                 setModal({
//                     show: true,
//                     type: "success",
//                     message: authorToEdit ? "Author updated successfully!" : "Author added successfully!",
//                 });
//                 setTimeout(() => {
//                     setModal({ show: false, type: "", message: "" });
//                     navigate("/author");
//                     window.scrollTo(0, 0);
//                 }, 800);
//             } else {
//                 setModal({
//                     show: true,
//                     type: "error",
//                     message: `Failed to ${authorToEdit ? "update" : "add"} author: ${response.data.message || "Unknown error"}`,
//                 });
//             }
//         } catch (err) {
//             setModal({
//                 show: true,
//                 type: "error",
//                 message: `Error: ${err.response?.data?.message || err.message}`,
//             });
//             console.error("Error saving author:", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleCancel = () => {
//         navigate("/author");
//         window.scrollTo(0, 0);
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
//                 {/* Header */}
//                 <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-6 shadow-md">
//                     <h1 className="text-2xl font-bold">{authorToEdit ? "Edit Author" : "Add New Author"}</h1>
//                     <p className="text-sm opacity-90 mt-1">
//                         {authorToEdit ? "Update the author details below." : "Fill in the details to add a new author."}
//                     </p>
//                 </header>

//                 {/* Main Content */}
//                 <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
//                     <h2 className="text-xl font-semibold text-blue-600 mb-6">
//                         {authorToEdit ? "Edit Author" : "Add New Author"}
//                     </h2>

//                     <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {/* Author Code */}
//                         {/* <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Author Code</label>
//                             <input
//                                 type="text"
//                                 name="authorCode"
//                                 value={formData.authorCode}
//                                 onChange={handleChange}
//                                 placeholder="e.g., AUTH002"
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                             />
//                         </div> */}

//                         {/* Prefix */}
//                         {/* <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Prefix</label>
//                             <input
//                                 type="text"
//                                 name="prefix"
//                                 value={formData.prefix}
//                                 onChange={handleChange}
//                                 placeholder="e.g., Prof."
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                             />
//                         </div> */}
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Prefix</label>
//                             <select
//                                 name="prefix"
//                                 value={formData.prefix}
//                                 onChange={handleChange}
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                             >
//                                 <option value="">Select Prefix</option>
//                                 <option value="Mr.">Mr.</option>
//                                 <option value="Dr.">Dr.</option>
//                                 <option value="Mrs.">Mrs.</option>
//                                 <option value="Ms.">Ms.</option>
//                                 <option value="Prof.">Prof.</option>
//                             </select>
//                         </div>


//                         {/* First Name */}
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">First Name *</label>
//                             <input
//                                 type="text"
//                                 name="firstName"
//                                 value={formData.firstName}
//                                 onChange={handleChange}
//                                 placeholder="e.g., Raj"
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 required
//                             />
//                         </div>

//                         {/* Last Name */}
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Last Name *</label>
//                             <input
//                                 type="text"
//                                 name="lastName"
//                                 value={formData.lastName}
//                                 onChange={handleChange}
//                                 placeholder="e.g., Mehta"
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 required
//                             />
//                         </div>

//                         {/* Alternate Name */}
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Alternate Name</label>
//                             <input
//                                 type="text"
//                                 name="alternateName"
//                                 value={formData.alternateName}
//                                 onChange={handleChange}
//                                 placeholder="e.g., R. Mehta"
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                             />
//                         </div>

//                         {/* Designation */}
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Designation</label>
//                             <input
//                                 type="text"
//                                 name="designation"
//                                 value={formData.designation}
//                                 onChange={handleChange}
//                                 placeholder="e.g., Associate Professor"
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                             />
//                         </div>

//                         {/* Department */}
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Department</label>
//                             <input
//                                 type="text"
//                                 name="department"
//                                 value={formData.department}
//                                 onChange={handleChange}
//                                 placeholder="e.g., Mechanical Engineering"
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                             />
//                         </div>

//                         {/* University (Dropdown with Search) */}
//                         <div className="relative">
//                             <label className="block text-sm font-medium text-blue-600 mb-1">University *</label>
//                             <input
//                                 type="text"
//                                 value={searchAffiliation}
//                                 onChange={(e) => setSearchAffiliation(e.target.value)}
//                                 onFocus={() => setShowDropdown(true)}
//                                 onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
//                                 placeholder="Search university..."
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 required
//                             />
//                             {showDropdown && filteredAffiliations.length > 0 && (
//                                 <ul className="absolute z-10 w-full bg-white border border-blue-200 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
//                                     {filteredAffiliations.map((aff) => (
//                                         <li
//                                             key={aff?.affId}
//                                             onClick={() => handleAffiliationSelect(aff)}
//                                             className="px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer"
//                                         >
//                                             {aff?.affName || "N/A"}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             )}
//                             {showDropdown && filteredAffiliations.length === 0 && (
//                                 <ul className="absolute z-10 w-full bg-white border border-blue-200 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
//                                     <li className="px-3 py-2 text-sm text-gray-500">No matching universities found</li>
//                                 </ul>
//                             )}
//                         </div>

//                         {/* Address (Read-only) */}
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Address *</label>
//                             <input
//                                 type="text"
//                                 name="address"
//                                 value={formData.address}
//                                 readOnly
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
//                                 required
//                             />
//                         </div>

//                         {/* Country (Read-only) */}
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Country</label>
//                             <input
//                                 type="text"
//                                 name="country"
//                                 value={formData.country}
//                                 readOnly
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
//                             />
//                         </div>

//                         {/* Profile Views */}
//                         {/* <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Profile Views</label>
//                             <input
//                                 type="number"
//                                 name="profileViews"
//                                 value={formData.profileViews}
//                                 onChange={handleChange}
//                                 placeholder="e.g., 85"
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                             />
//                         </div> */}

//                         {/* Papers Published */}
//                         {/* <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Papers Published</label>
//                             <input
//                                 type="number"
//                                 name="papersPublished"
//                                 value={formData.papersPublished}
//                                 onChange={handleChange}
//                                 placeholder="e.g., 12"
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                             />
//                         </div> */}

//                         {/* Status */}
//                         {/* <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Status</label>
//                             <select
//                                 name="status"
//                                 value={formData.status}
//                                 onChange={handleChange}
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                             >
//                                 <option value={1}>Active</option>
//                                 <option value={0}>Inactive</option>
//                             </select>
//                         </div> */}

//                         {/* Logo */}
//                         <div className="col-span-2">
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Logo</label>
//                             <input
//                                 type="file"
//                                 name="logo"
//                                 onChange={handleLogoChange}
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 accept="image/*"
//                             />
//                             {authorToEdit && authorToEdit.logo && !removeLogo && (
//                                 <div className="mt-2">
//                                     <p className="text-sm text-gray-500">Current logo: {authorToEdit.logo}</p>
//                                     <button
//                                         type="button"
//                                         onClick={handleRemoveLogo}
//                                         className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs rounded-full mt-1"
//                                     >
//                                         Remove
//                                     </button>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Form Actions */}
//                         <div className="flex justify-end gap-4 mt-6 col-span-2">
//                             <button
//                                 type="submit"
//                                 disabled={loading}
//                                 className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors shadow-md ${loading ? "opacity-50 cursor-not-allowed" : ""
//                                     }`}
//                             >
//                                 {loading ? "Saving..." : authorToEdit ? "Update" : "Save"}
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

//                 {/* Modal */}
//                 {modal.show && (
//                     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//                         <div
//                             className={`p-6 rounded-lg shadow-lg ${modal.type === "success" ? "bg-green-100" : "bg-red-100"}`}
//                         >
//                             <p
//                                 className={`text-lg font-semibold ${modal.type === "success" ? "text-green-700" : "text-red-700"}`}
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

// export default AddNewAuthor;


import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Sidebar from "../sidebar";

const AddNewAuthor = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const authorToEdit = location.state?.author || null;
    const dropdownRef = useRef(null);

    const [formData, setFormData] = useState(null);
    const [logoFile, setLogoFile] = useState(null);
    const [removeLogo, setRemoveLogo] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState({ show: false, type: "", message: "" });
    const [affiliations, setAffiliations] = useState([]);
    const [filteredAffiliations, setFilteredAffiliations] = useState([]);
    const [searchAffiliation, setSearchAffiliation] = useState(authorToEdit?.university || "");
    const [showDropdown, setShowDropdown] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const BASE_URL = "https://iassrd.com:8081/api/v1";

    // Handle outside click for dropdown
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

    // Initialize formData
    useEffect(() => {
        if (authorToEdit) {
            setFormData({
                authorCode: authorToEdit.authorCode || "",
                prefix: authorToEdit.prefix || "",
                firstName: authorToEdit.firstName || "",
                lastName: authorToEdit.lastName || "",
                alternateName: authorToEdit.alternateName || "",
                designation: authorToEdit.designation || "",
                department: authorToEdit.department || "",
                university: authorToEdit.university || "",
                address: authorToEdit.address || "",
                country: authorToEdit.country || "",
                profileViews: authorToEdit.profileViews || "",
                papersPublished: authorToEdit.papersPublished || "",
                status: authorToEdit.status !== undefined ? authorToEdit.status : 1,
                createdUserId: authorToEdit.createdUserId || currentUser?.userId,
                createdUserType: authorToEdit.createdUserType || (currentUser?.role === "ADMIN" ? 1 : 2),
                updatedUserId: currentUser?.userId,
                updatedUserType: currentUser?.role === "ADMIN" ? 1 : 2,
            });
            if (authorToEdit.logo) {
                setLogoFile(
                    authorToEdit.logo.startsWith("/")
                        ? `${BASE_URL}${authorToEdit.logo}`
                        : authorToEdit.logo
                );
            }
        } else if (currentUser) {
            setFormData({
                authorCode: "",
                prefix: "",
                firstName: "",
                lastName: "",
                alternateName: "",
                designation: "",
                department: "",
                university: "",
                address: "",
                country: "",
                profileViews: "",
                papersPublished: "",
                status: 1,
                createdUserId: currentUser.userId,
                createdUserType: currentUser.role === "ADMIN" ? 1 : 2,
                updatedUserId: currentUser.userId,
                updatedUserType: currentUser.role === "ADMIN" ? 1 : 2,
            });
        }
    }, [authorToEdit, currentUser]);

    // Fetch affiliations from API
    useEffect(() => {
        const fetchAffiliations = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/affiliations`, {
                    params: { page: 1, limit: 100 },
                });
                if (response.data.success) {
                    setAffiliations(response.data.data || []);
                    setFilteredAffiliations(response.data.data || []);
                } else {
                    setModal({ show: true, type: "error", message: "Failed to fetch affiliations" });
                }
            } catch (err) {
                setModal({ show: true, type: "error", message: "Error fetching affiliations: " + err.message });
            }
        };
        fetchAffiliations();
    }, []);

    // Filter affiliations based on search input
    useEffect(() => {
        if (searchAffiliation) {
            const filtered = affiliations.filter((aff) =>
                aff?.affName?.toLowerCase().includes(searchAffiliation.toLowerCase())
            );
            setFilteredAffiliations(filtered);
        } else {
            setFilteredAffiliations(affiliations);
        }
    }, [searchAffiliation, affiliations]);

    // Handle affiliation selection
    const handleAffiliationSelect = (affiliation) => {
        setFormData((prev) => ({
            ...prev,
            university: affiliation?.affName || "",
            address: affiliation?.address || "",
            country: affiliation?.country || "",
        }));
        setSearchAffiliation(affiliation?.affName || "");
        setShowDropdown(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogoChange = (e) => {
        setLogoFile(e.target.files[0]);
        setRemoveLogo(false);
    };

    const handleRemoveLogo = () => {
        setLogoFile(null);
        setRemoveLogo(true);
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
            const formDataToSend = new FormData();
            const authorData = {
                authorCode: formData.authorCode || "",
                prefix: formData.prefix || "",
                firstName: formData.firstName || "",
                lastName: formData.lastName || "",
                alternateName: formData.alternateName || "",
                designation: formData.designation || "",
                department: formData.department || "",
                university: formData.university || "",
                address: formData.address || "",
                country: formData.country || "",
                profileViews: formData.profileViews ? parseInt(formData.profileViews) : null,
                papersPublished: formData.papersPublished ? parseInt(formData.papersPublished) : null,
                status: parseInt(formData.status) || 1,
                createdUserId: formData.createdUserId || currentUser.userId,
                createdUserType: formData.createdUserType || (currentUser.role === "ADMIN" ? 1 : 2),
                updatedUserId: currentUser.userId,
                updatedUserType: currentUser.role === "ADMIN" ? 1 : 2,
            };

            formDataToSend.append("author", new Blob([JSON.stringify(authorData)], { type: "application/json" }));
            if (logoFile && typeof logoFile !== "string") {
                formDataToSend.append("logoFile", logoFile);
            }
            formDataToSend.append("removeLogo", removeLogo.toString());

            const config = { headers: { "Content-Type": "multipart/form-data" } };
            let response;
            if (authorToEdit) {
                response = await axios.put(`${BASE_URL}/authors/${authorToEdit.authorId}`, formDataToSend, config);
            } else {
                response = await axios.post(`${BASE_URL}/authors`, formDataToSend, config);
            }

            if (response.data.success) {
                setModal({
                    show: true,
                    type: "success",
                    message: authorToEdit ? "Author updated successfully!" : "Author added successfully!",
                });
                setTimeout(() => {
                    setModal({ show: false, type: "", message: "" });
                    navigate("/author");
                    window.scrollTo(0, 0);
                }, 800);
            } else {
                setModal({
                    show: true,
                    type: "error",
                    message: `Failed to ${authorToEdit ? "update" : "add"} author: ${response.data.message || "Unknown error"}`,
                });
            }
        } catch (err) {
            setModal({
                show: true,
                type: "error",
                message: `Error: ${err.response?.data?.message || err.message}`,
            });
            console.error("Error saving author:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/author");
        window.scrollTo(0, 0);
    };

    const getFileDisplayName = (file) => {
        if (typeof file === "string") {
            return file.split("/").pop();
        } else if (file instanceof File) {
            return file.name;
        }
        return "No file selected";
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
                {/* Header */}
                <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-6 shadow-md">
                    <h1 className="text-2xl font-bold">{authorToEdit ? "Edit Author" : "Add New Author"}</h1>
                    <p className="text-sm opacity-90 mt-1">
                        {authorToEdit ? "Update the author details below." : "Fill in the details to add a new author."}
                    </p>
                </header>

                {/* Main Content */}
                <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
                    <h2 className="text-xl font-semibold text-blue-600 mb-6">
                        {authorToEdit ? "Edit Author" : "Add New Author"}
                    </h2>

                    {formData && (
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Author Code */}
                            {/* <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Author Code</label>
                                <input
                                    type="text"
                                    name="authorCode"
                                    value={formData.authorCode}
                                    onChange={handleChange}
                                    placeholder="e.g., AUTH002"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div> */}

                            {/* Prefix */}
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Prefix</label>
                                <input
                                    type="text"
                                    name="prefix"
                                    value={formData.prefix}
                                    onChange={handleChange}
                                    placeholder="e.g., Prof."
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>

                            {/* First Name */}
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">First Name *</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="e.g., Raj"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    required
                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Last Name *</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="e.g., Mehta"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    required
                                />
                            </div>

                            {/* Alternate Name */}
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Alternate Name</label>
                                <input
                                    type="text"
                                    name="alternateName"
                                    value={formData.alternateName}
                                    onChange={handleChange}
                                    placeholder="e.g., R. Mehta"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>

                            {/* Designation */}
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Designation</label>
                                <input
                                    type="text"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    placeholder="e.g., Associate Professor"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>

                            {/* Department */}
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Department</label>
                                <input
                                    type="text"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    placeholder="e.g., Mechanical Engineering"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>

                            {/* University (Dropdown with Search) */}
                            <div className="relative" ref={dropdownRef}>
                                <label className="block text-sm font-medium text-blue-600 mb-1">University</label>
                                <input
                                    type="text"
                                    value={searchAffiliation}
                                    onChange={(e) => setSearchAffiliation(e.target.value)}
                                    onClick={() => setShowDropdown(true)}
                                    placeholder="Search university..."
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                                {showDropdown && filteredAffiliations.length > 0 && (
                                    <ul className="absolute z-10 w-full bg-white border border-blue-200 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                                        {filteredAffiliations.map((aff) => (
                                            <li
                                                key={aff?.affId}
                                                onClick={() => handleAffiliationSelect(aff)}
                                                className="px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer"
                                            >
                                                {aff?.affName ? aff.affName : `N/A${aff?.country ? ' / ' + aff.country : ''}`}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {showDropdown && filteredAffiliations.length === 0 && (
                                    <ul className="absolute z-10 w-full bg-white border border-blue-200 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                                        <li className="px-3 py-2 text-sm text-gray-500">No matching universities found</li>
                                    </ul>
                                )}
                            </div>

                            {/* Address (Read-only) */}
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    readOnly
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                                />
                            </div>

                            {/* Country (Read-only) */}
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    readOnly
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                                />
                            </div>

                            {/* Profile Views */}
                            {/* <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Profile Views</label>
                                <input
                                    type="number"
                                    name="profileViews"
                                    value={formData.profileViews}
                                    onChange={handleChange}
                                    placeholder="e.g., 85"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div> */}

                            {/* Papers Published */}
                            {/* <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Papers Published</label>
                                <input
                                    type="number"
                                    name="papersPublished"
                                    value={formData.papersPublished}
                                    onChange={handleChange}
                                    placeholder="e.g., 12"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div> */}

                            {/* Status */}
                            {/* <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                >
                                    <option value={1}>Active</option>
                                    <option value={0}>Inactive</option>
                                </select>
                            </div> */}

                            {/* Logo */}
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-blue-600 mb-1">Logo</label>
                                <input
                                    type="file"
                                    name="logo"
                                    onChange={handleLogoChange}
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    accept="image/*"
                                />
                                {authorToEdit && logoFile && !removeLogo && (
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">Current file:</p>
                                        <div className="relative inline-block">
                                            <a
                                                href={typeof logoFile === "string" ? logoFile : URL.createObjectURL(logoFile)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 underline"
                                            >
                                                {getFileDisplayName(logoFile)}
                                            </a>
                                            <button
                                                type="button"
                                                onClick={handleRemoveLogo}
                                                className="absolute -top-2 -left-1 bg-red-500 text-white px-2 py-1 text-xs rounded-full"
                                            >
                                                ✖
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Form Actions */}
                            <div className="flex justify-end gap-4 mt-6 col-span-2">
                                <button
                                    type="submit"
                                    disabled={loading || !currentUser}
                                    className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors shadow-md ${loading || !currentUser ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                    {loading ? "Saving..." : authorToEdit ? "Update" : "Save"}
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
                    )}
                </div>

                {/* Modal */}
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

export default AddNewAuthor;