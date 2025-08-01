// // import React, { useState, useEffect, useRef } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import axios from "axios";
// // import Sidebar from "../sidebar";

// // const AddNewImpactFactors = () => {
// //     const navigate = useNavigate();
// //     const location = useLocation();
// //     const dropdownRef = useRef(null);
// //     const searchInputRef = useRef(null);

// //     const [modal, setModal] = useState({ show: false, type: "", message: "" });
// //     const [impactFactor, setImpactFactor] = useState(null);
// //     const [journals, setJournals] = useState([]);
// //     const [loading, setLoading] = useState(false);
// //     const [message, setMessage] = useState("");
// //     const [searchTerm, setSearchTerm] = useState("");
// //     const [showDropdown, setShowDropdown] = useState(false);
// //     const [currentUser, setCurrentUser] = useState(null);

// //     const BASE_URL = "https://iassrd.com:8081/api/v1";

// //     // Generate years from 2008 to 2027 for the dropdown
// //     const years = Array.from({ length: 2027 - 2008 + 1 }, (_, i) => 2008 + i);

// //     const handleOutsideClick = (ref, callback) => {
// //         const handleClickOutside = (event) => {
// //             if (ref.current && !ref.current.contains(event.target)) {
// //                 callback();
// //             }
// //         };
// //         document.addEventListener("mousedown", handleClickOutside);
// //         return () => document.removeEventListener("mousedown", handleClickOutside);
// //     };

// //     useEffect(() => {
// //         const cleanupDropdown = handleOutsideClick(dropdownRef, () => setShowDropdown(false));
// //         return cleanupDropdown;
// //     }, []);

// //     useEffect(() => {
// //         if (showDropdown && searchInputRef.current) {
// //             searchInputRef.current.focus();
// //         }
// //     }, [showDropdown]);

// //     // Fetch current user data by matching userName from localStorage
// //     useEffect(() => {
// //         const fetchCurrentUser = async () => {
// //             try {
// //                 const storedUser = JSON.parse(localStorage.getItem("user")) || {};
// //                 const userName = storedUser.userName || storedUser.user_name;
// //                 if (!userName) {
// //                     setModal({
// //                         show: true,
// //                         type: "error",
// //                         message: "No user data found in localStorage. Please log in again.",
// //                     });
// //                     return;
// //                 }

// //                 const response = await axios.get(`${BASE_URL}/users`);
// //                 if (response.data.success && Array.isArray(response.data.data)) {
// //                     const matchedUser = response.data.data.find(
// //                         (user) => user.userName.toLowerCase() === userName.toLowerCase()
// //                     );
// //                     if (matchedUser) {
// //                         setCurrentUser(matchedUser);
// //                     } else {
// //                         setModal({
// //                             show: true,
// //                             type: "error",
// //                             message: "User not found in the system. Please log in again.",
// //                         });
// //                     }
// //                 } else {
// //                     setModal({
// //                         show: true,
// //                         type: "error",
// //                         message: "Failed to fetch users data.",
// //                     });
// //                 }
// //             } catch (err) {
// //                 console.error("Error fetching users:", err);
// //                 setModal({
// //                     show: true,
// //                     type: "error",
// //                     message: "Error fetching user data: " + err.message,
// //                 });
// //             }
// //         };
// //         fetchCurrentUser();
// //     }, []);

// //     useEffect(() => {
// //         axios
// //             .get(`${BASE_URL}/journals`)
// //             .then((response) => {
// //                 if (response.data.success) {
// //                     setJournals(response.data.data);
// //                 } else {
// //                     console.error("Failed to fetch journals:", response.data.message);
// //                 }
// //             })
// //             .catch((error) => console.error("Error fetching journals:", error));
// //     }, []);

// //     useEffect(() => {
// //         if (location.state && location.state.impactFactor) {
// //             const { impactFactorId, createdUserId, createdUserType, ...editableFields } = location.state.impactFactor;
// //             setImpactFactor({
// //                 ...editableFields,
// //                 createdUserId: createdUserId || currentUser?.userId,
// //                 createdUserType: createdUserType || (currentUser?.role === "ADMIN" ? 1 : 2),
// //                 updatedUserId: currentUser?.userId,
// //                 updatedUserType: currentUser?.role === "ADMIN" ? 1 : 2,
// //             });
// //         } else if (currentUser) {
// //             setImpactFactor({
// //                 journalId: "",
// //                 imfPoints: "",
// //                 year: "",
// //                 issnPrint: "",
// //                 issnOnline: "",
// //                 status: "",
// //                 createdUserId: currentUser.userId,
// //                 createdUserType: currentUser.role === "ADMIN" ? 1 : 2,
// //                 updatedUserId: currentUser.userId,
// //                 updatedUserType: currentUser.role === "ADMIN" ? 1 : 2,
// //             });
// //         }
// //     }, [location.state, currentUser]);

// //     useEffect(() => {
// //         if (impactFactor?.journalId) {
// //             const selectedJournal = journals.find(
// //                 (journal) => journal.journalId === impactFactor.journalId
// //             );
// //             if (selectedJournal) {
// //                 setSearchTerm(
// //                     selectedJournal.abbrevation
// //                         ? `${selectedJournal.journalName} (${selectedJournal.abbrevation})`
// //                         : selectedJournal.journalName
// //                 );
// //             }
// //         } else {
// //             setSearchTerm("");
// //         }
// //     }, [impactFactor?.journalId, journals]);

// //     const filteredJournals = journals.filter(
// //         (journal) =>
// //             journal.journalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //             (journal.abbrevation &&
// //                 journal.abbrevation.toLowerCase().includes(searchTerm.toLowerCase()))
// //     );

// //     const handleSelect = (journalId) => {
// //         const selectedJournal = journals.find((journal) => journal.journalId === journalId);
// //         if (selectedJournal) {
// //             setImpactFactor((prev) => ({ ...prev, journalId }));
// //             setSearchTerm(
// //                 selectedJournal.abbrevation
// //                     ? `${selectedJournal.journalName} (${selectedJournal.abbrevation})`
// //                     : selectedJournal.journalName
// //             );
// //         }
// //         setShowDropdown(false);
// //     };

// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setImpactFactor((prev) => ({ ...prev, [name]: value }));
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         if (!currentUser) {
// //             setModal({
// //                 show: true,
// //                 type: "error",
// //                 message: "User data not available. Please try again.",
// //             });
// //             return;
// //         }

// //         setLoading(true);
// //         setMessage("");

// //         try {
// //             const impactFactorData = {
// //                 journalId: impactFactor.journalId || "",
// //                 impactFactor: impactFactor.imfPoints ? parseFloat(impactFactor.impactFactor) : null,
// //                 year: impactFactor.year ? parseInt(impactFactor.year) : null,
// //                 issnPrint: impactFactor.issnPrint || null,
// //                 issnOnline: impactFactor.issnOnline || null,
// //                 status: impactFactor.status ? parseInt(impactFactor.status) : null,
// //                 createdUserId: impactFactor.createdUserId || currentUser.userId,
// //                 createdUserType: impactFactor.createdUserType || (currentUser.role === "ADMIN" ? 1 : 2),
// //                 updatedUserId: currentUser.userId,
// //                 updatedUserType: currentUser.role === "ADMIN" ? 1 : 2,
// //             };

// //             let response;
// //             const isEditing = location.state && location.state.impactFactor && location.state.impactFactor.impactFactorId;
// //             if (isEditing) {
// //                 response = await axios.put(`${BASE_URL}/impactfactors/${location.state.impactFactor.impactFactorId}`, impactFactorData);
// //             } else {
// //                 response = await axios.post(`${BASE_URL}/impactfactors`, impactFactorData);
// //             }

// //             if (response && (response.status === 200 || response.status === 201)) {
// //                 setModal({
// //                     show: true,
// //                     type: "success",
// //                     message: isEditing ? "Impact Factor record updated successfully!" : "Impact Factor record added successfully!",
// //                 });
// //                 setMessage(isEditing ? "Impact Factor record updated successfully!" : "Impact Factor record added successfully!");
// //                 setTimeout(() => {
// //                     setModal({ show: false, type: "", message: "" });
// //                     navigate("/impactfactorstab");
// //                     window.scrollTo(0, 0);
// //                 }, 800);
// //             }
// //         } catch (error) {
// //             setModal({
// //                 show: true,
// //                 type: "error",
// //                 message: `Failed to ${isEditing ? "update" : "add"} Impact Factor record: ${error.message}`,
// //             });
// //             setMessage(`Failed to ${isEditing ? "update" : "add"} Impact Factor record: ${error.message}`);
// //             console.error("Error saving Impact Factor record:", error);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     return (
// //         <div className="flex min-h-screen bg-blue-50">
// //             <header className="fixed top-0 left-0 w-full bg-blue-900 text-white py-4 px-6 flex items-center justify-between z-40">
// //                 <h1 className="text-xl font-semibold">
// //                     International Academy for Social Sciences Research and Development
// //                 </h1>
// //                 <div className="flex items-center space-x-4">
// //                     <span className="text-sm">Hi {currentUser?.userName || "User"}</span>
// //                 </div>
// //             </header>
// //             <div className="w-[20%]">
// //                 <Sidebar />
// //             </div>
// //             <div className="w-screen p-6 h-screen pt-20 overflow-y-auto">
// //                 <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-6 shadow-md">
// //                     <h1 className="text-2xl font-bold">
// //                         {location.state && location.state.impactFactor ? "Edit Impact Factor Record" : "Add New Impact Factor Record"}
// //                     </h1>
// //                     <p className="text-sm opacity-90 mt-1">
// //                         {location.state && location.state.impactFactor
// //                             ? "Update an existing Impact Factor record."
// //                             : "Create a new Impact Factor record for your dashboard."}
// //                     </p>
// //                 </header>
// //                 <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
// //                     <h2 className="text-xl font-semibold text-blue-600 mb-6">
// //                         {location.state && location.state.impactFactor ? "Edit Impact Factor Record" : "Add New Impact Factor Record"}
// //                     </h2>
// //                     {message && (
// //                         <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{message}</div>
// //                     )}
// //                     {impactFactor && (
// //                         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                             <div className="relative" ref={dropdownRef}>
// //                                 <label className="block text-sm font-medium text-blue-600 mb-1">Journal *</label>
// //                                 <div
// //                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
// //                                     onClick={() => setShowDropdown(!showDropdown)}
// //                                 >
// //                                     {searchTerm || "-- Select Journal --"}
// //                                 </div>
// //                                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
// //                                     <svg
// //                                         className={`fill-current h-5 w-5 mt-2 ${showDropdown ? "rotate-180" : "rotate-0"}`}
// //                                         xmlns="http://www.w3.org/2000/svg"
// //                                         viewBox="0 0 20 20"
// //                                     >
// //                                         <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
// //                                     </svg>
// //                                 </div>
// //                                 {showDropdown && (
// //                                     <div className="absolute z-50 w-full border border-blue-200 rounded-lg bg-white shadow-lg max-h-60 overflow-y-auto mt-1">
// //                                         <input
// //                                             ref={searchInputRef}
// //                                             type="text"
// //                                             value={searchTerm}
// //                                             onChange={(e) => {
// //                                                 setSearchTerm(e.target.value);
// //                                                 setShowDropdown(true);
// //                                             }}
// //                                             placeholder="Search Journal..."
// //                                             className="w-full px-3 py-2 border-b border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
// //                                         />
// //                                         {filteredJournals.length > 0 ? (
// //                                             filteredJournals.map((journal) => (
// //                                                 <div
// //                                                     key={journal.journalId}
// //                                                     onClick={() => handleSelect(journal.journalId)}
// //                                                     className="px-3 py-2 cursor-pointer hover:bg-blue-100"
// //                                                 >
// //                                                     {journal.abbrevation
// //                                                         ? `${journal.journalName} (${journal.abbrevation})`
// //                                                         : journal.journalName}
// //                                                 </div>
// //                                             ))
// //                                         ) : (
// //                                             <div className="px-3 py-2 text-gray-500">No results found</div>
// //                                         )}
// //                                     </div>
// //                                 )}
// //                             </div>
// //                             <div>
// //                                 <label className="block text-sm font-medium text-blue-600 mb-1">Impact Factor *</label>
// //                                 <input
// //                                     type="number"
// //                                     step="0.01"
// //                                     name="impactFactor"
// //                                     value={impactFactor.imfPoints}
// //                                     onChange={handleChange}
// //                                     placeholder="e.g., 5.32"
// //                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
// //                                     required
// //                                 />
// //                             </div>
// //                             <div>
// //                                 <label className="block text-sm font-medium text-blue-600 mb-1">Year *</label>
// //                                 <select
// //                                     name="year"
// //                                     value={impactFactor.year}
// //                                     onChange={handleChange}
// //                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
// //                                     required
// //                                 >
// //                                     <option value="">-- Select Year --</option>
// //                                     {years.map((year) => (
// //                                         <option key={year} value={year}>
// //                                             {year}
// //                                         </option>
// //                                     ))}
// //                                 </select>
// //                             </div>
// //                             <div>
// //                                 <label className="block text-sm font-medium text-blue-600 mb-1">ISSN Print</label>
// //                                 <input
// //                                     type="text"
// //                                     name="issnPrint"
// //                                     value={impactFactor.issnPrint}
// //                                     onChange={handleChange}
// //                                     placeholder="e.g., 1234-5678"
// //                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
// //                                 />
// //                             </div>
// //                             <div>
// //                                 <label className="block text-sm font-medium text-blue-600 mb-1">ISSN Online</label>
// //                                 <input
// //                                     type="text"
// //                                     name="issnOnline"
// //                                     value={impactFactor.issnOnline}
// //                                     onChange={handleChange}
// //                                     placeholder="e.g., 9876-5432"
// //                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
// //                                 />
// //                             </div>
// //                             <div className="flex justify-end gap-4 mt-6 col-span-2">
// //                                 <button
// //                                     type="submit"
// //                                     className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors shadow-md ${loading || !currentUser ? "opacity-50 cursor-not-allowed" : ""}`}
// //                                     disabled={loading || !currentUser}
// //                                 >
// //                                     {loading
// //                                         ? "Saving..."
// //                                         : location.state && location.state.impactFactor
// //                                         ? "Update"
// //                                         : "Save"}
// //                                 </button>
// //                                 <button
// //                                     type="button"
// //                                     onClick={() => {
// //                                         navigate("/impactfactorstab");
// //                                         window.scrollTo(0, 0);
// //                                     }}
// //                                     className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-full transition-colors shadow-md"
// //                                 >
// //                                     Cancel
// //                                 </button>
// //                             </div>
// //                         </form>
// //                     )}
// //                 </div>
// //                 {modal.show && (
// //                     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
// //                         <div
// //                             className={`p-6 rounded-lg shadow-lg ${modal.type === "success" ? "bg-green-100" : "bg-red-100"}`}
// //                         >
// //                             <p
// //                                 className={`text-lg font-semibold ${modal.type === "success" ? "text-green-700" : "text-red-700"}`}
// //                             >
// //                                 {modal.message}
// //                             </p>
// //                             <button
// //                                 onClick={() => setModal({ show: false, type: "", message: "" })}
// //                                 className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors"
// //                             >
// //                                 Close
// //                             </button>
// //                         </div>
// //                     </div>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// // export default AddNewImpactFactors;



// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../sidebar";

// const AddNewImpactFactors = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const dropdownRef = useRef(null);
//     const searchInputRef = useRef(null);

//     const [modal, setModal] = useState({ show: false, type: "", message: "" });
//     const [impactFactor, setImpactFactor] = useState(null);
//     const [journals, setJournals] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [currentUser, setCurrentUser] = useState(null);

//     const BASE_URL = "https://iassrd.com:8081/api/v1";

//     // Generate years from 2008 to 2027 for the dropdown
//     const years = Array.from({ length: 2027 - 2008 + 1 }, (_, i) => 2008 + i);

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

//     // Fetch current user data
//     useEffect(() => {
//         const fetchCurrentUser = async () => {
//             try {
//                 const storedUser = JSON.parse(localStorage.getItem("user")) || {};
//                 const userName = storedUser.userName || storedUser.user_name;
//                 if (!userName) {
//                     setModal({
//                         show: true,
//                         type: "error",
//                         message: "No user data found in localStorage. Please log in again.",
//                     });
//                     return;
//                 }

//                 const response = await axios.get(`${BASE_URL}/users`);
//                 if (response.data.success && Array.isArray(response.data.data)) {
//                     const matchedUser = response.data.data.find(
//                         (user) => user.userName.toLowerCase() === userName.toLowerCase()
//                     );
//                     if (matchedUser) {
//                         setCurrentUser(matchedUser);
//                     } else {
//                         setModal({
//                             show: true,
//                             type: "error",
//                             message: "User not found in the system. Please log in again.",
//                         });
//                     }
//                 } else {
//                     setModal({
//                         show: true,
//                         type: "error",
//                         message: "Failed to fetch users data.",
//                     });
//                 }
//             } catch (err) {
//                 console.error("Error fetching users:", err);
//                 setModal({
//                     show: true,
//                     type: "error",
//                     message: "Error fetching user data: " + err.message,
//                 });
//             }
//         };
//         fetchCurrentUser();
//     }, []);

//     // Fetch journals
//     useEffect(() => {
//         axios
//             .get(`${BASE_URL}/journals`)
//             .then((response) => {
//                 if (response.data.success) {
//                     setJournals(response.data.data);
//                 } else {
//                     console.error("Failed to fetch journals:", response.data.message);
//                 }
//             })
//             .catch((error) => console.error("Error fetching journals:", error));
//     }, []);

//     // Initialize impactFactor state
//     useEffect(() => {
//         if (location.state && location.state.impactFactor) {
//             const { imfId, createdUserId, createdUserType, ...editableFields } = location.state.impactFactor;
//             setImpactFactor({
//                 ...editableFields,
//                 imfPoints: editableFields.imfPoints || "",
//                 createdUserId: createdUserId || currentUser?.userId,
//                 createdUserType: createdUserType || (currentUser?.role === "ADMIN" ? 1 : 2),
//                 updatedUserId: currentUser?.userId,
//                 updatedUserType: currentUser?.role === "ADMIN" ? 1 : 2,
//             });
//         } else if (currentUser) {
//             setImpactFactor({
//                 journalId: "",
//                 imfPoints: "",
//                 year: "",
//                 issnPrint: "",
//                 issnOnline: "",
//                 status: "",
//                 createdUserId: currentUser.userId,
//                 createdUserType: currentUser.role === "ADMIN" ? 1 : 2,
//                 updatedUserId: currentUser.userId,
//                 updatedUserType: currentUser.role === "ADMIN" ? 1 : 2,
//             });
//         }
//     }, [location.state, currentUser]);

//     // Update search term when journalId changes
//     useEffect(() => {
//         if (impactFactor?.journalId) {
//             const selectedJournal = journals.find(
//                 (journal) => journal.journalId === impactFactor.journalId
//             );
//             if (selectedJournal) {
//                 setSearchTerm(
//                     selectedJournal.abbrevation
//                         ? `${selectedJournal.journalName} (${selectedJournal.abbrevation})`
//                         : selectedJournal.journalName
//                 );
//             }
//         } else {
//             setSearchTerm("");
//         }
//     }, [impactFactor?.journalId, journals]);

//     const filteredJournals = journals.filter(
//         (journal) =>
//             journal.journalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             (journal.abbrevation &&
//                 journal.abbrevation.toLowerCase().includes(searchTerm.toLowerCase()))
//     );

//     const handleSelect = (journalId) => {
//         const selectedJournal = journals.find((journal) => journal.journalId === journalId);
//         if (selectedJournal) {
//             setImpactFactor((prev) => ({ ...prev, journalId }));
//             setSearchTerm(
//                 selectedJournal.abbrevation
//                     ? `${selectedJournal.journalName} (${selectedJournal.abbrevation})`
//                     : selectedJournal.journalName
//             );
//         }
//         setShowDropdown(false);
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setImpactFactor((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!currentUser) {
//             setModal({
//                 show: true,
//                 type: "error",
//                 message: "User data not available. Please try again.",
//             });
//             return;
//         }

//         setLoading(true);
//         setMessage("");

//         try {
//             const impactFactorData = {
//                 journalId: impactFactor.journalId || null,
//                 imfPoints: impactFactor.imfPoints ? parseFloat(impactFactor.imfPoints) : null,
//                 year: impactFactor.year ? parseInt(impactFactor.year) : null,
//                 issnPrint: impactFactor.issnPrint || null,
//                 issnOnline: impactFactor.issnOnline || null,
//                 status: impactFactor.status ? parseInt(impactFactor.status) : null,
//                 createdUserId: impactFactor.createdUserId || currentUser.userId,
//                 createdUserType: impactFactor.createdUserType || (currentUser.role === "ADMIN" ? 1 : 2),
//                 updatedUserId: currentUser.userId,
//                 updatedUserType: currentUser.role === "ADMIN" ? 1 : 2,
//             };

//             let response;
//             const isEditing = location.state && location.state.impactFactor && location.state.impactFactor.imfId;
//             if (isEditing) {
//                 response = await axios.put(`${BASE_URL}/impactfactors/${location.state.impactFactor.imfId}`, impactFactorData);
//             } else {
//                 response = await axios.post(`${BASE_URL}/impactfactors`, impactFactorData);
//             }

//             if (response && (response.status === 200 || response.status === 201)) {
//                 setModal({
//                     show: true,
//                     type: "success",
//                     message: isEditing ? "Impact Factor record updated successfully!" : "Impact Factor record added successfully!",
//                 });
//                 setMessage(isEditing ? "Impact Factor record updated successfully!" : "Impact Factor record added successfully!");
//                 setTimeout(() => {
//                     setModal({ show: false, type: "", message: "" });
//                     navigate("/impactfactorstab");
//                     window.scrollTo(0, 0);
//                 }, 800);
//             }
//         } catch (error) {
//             setModal({
//                 show: true,
//                 type: "error",
//                 message: `Failed to ${isEditing ? "update" : "add"} Impact Factor record: ${error.message}`,
//             });
//             setMessage(`Failed to ${isEditing ? "update" : "add"} Impact Factor record: ${error.message}`);
//             console.error("Error saving Impact Factor record:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex min-h-screen bg-blue-50">
//             <header className="fixed top-0 left-0 w-full bg-blue-900 text-white py-4 px-6 flex items-center justify-between z-40">
//                 <h1 className="text-xl font-semibold">
//                     International Academy for Social Sciences Research and Development
//                 </h1>
//                 <div className="flex items-center space-x-4">
//                     <span className="text-sm">Hi {currentUser?.userName || "User"}</span>
//                 </div>
//             </header>
//             <div className="w-[20%]">
//                 <Sidebar />
//             </div>
//             <div className="w-screen p-6 h-screen pt-20 overflow-y-auto">
//                 <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-6 shadow-md">
//                     <h1 className="text-2xl font-bold">
//                         {location.state && location.state.impactFactor ? "Edit Impact Factor Record" : "Add New Impact Factor Record"}
//                     </h1>
//                     <p className="text-sm opacity-90 mt-1">
//                         {location.state && location.state.impactFactor
//                             ? "Update an existing Impact Factor record."
//                             : "Create a new Impact Factor record for your dashboard."}
//                     </p>
//                 </header>
//                 <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
//                     <h2 className="text-xl font-semibold text-blue-600 mb-6">
//                         {location.state && location.state.impactFactor ? "Edit Impact Factor Record" : "Add New Impact Factor Record"}
//                     </h2>
//                     {message && (
//                         <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{message}</div>
//                     )}
//                     {impactFactor && (
//                         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div className="relative" ref={dropdownRef}>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Journal *</label>
//                                 <div
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     onClick={() => setShowDropdown(!showDropdown)}
//                                 >
//                                     {searchTerm || "-- Select Journal --"}
//                                 </div>
//                                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                                     <svg
//                                         className={`fill-current h-5 w-5 mt-2 ${showDropdown ? "rotate-180" : "rotate-0"}`}
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 20 20"
//                                     >
//                                         <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
//                                     </svg>
//                                 </div>
//                                 {showDropdown && (
//                                     <div className="absolute z-50 w-full border border-blue-200 rounded-lg bg-white shadow-lg max-h-60 overflow-y-auto mt-1">
//                                         <input
//                                             ref={searchInputRef}
//                                             type="text"
//                                             value={searchTerm}
//                                             onChange={(e) => {
//                                                 setSearchTerm(e.target.value);
//                                                 setShowDropdown(true);
//                                             }}
//                                             placeholder="Search Journal..."
//                                             className="w-full px-3 py-2 border-b border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                                         />
//                                         {filteredJournals.length > 0 ? (
//                                             filteredJournals.map((journal) => (
//                                                 <div
//                                                     key={journal.journalId}
//                                                     onClick={() => handleSelect(journal.journalId)}
//                                                     className="px-3 py-2 cursor-pointer hover:bg-blue-100"
//                                                 >
//                                                     {journal.abbrevation
//                                                         ? `${journal.journalName} (${journal.abbrevation})`
//                                                         : journal.journalName}
//                                                 </div>
//                                             ))
//                                         ) : (
//                                             <div className="px-3 py-2 text-gray-500">No results found</div>
//                                         )}
//                                     </div>
//                                 )}
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Impact Factor *</label>
//                                 <input
//                                     type="number"
//                                     step="0.01"
//                                     name="imfPoints"
//                                     value={impactFactor.imfPoints}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 5.32"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Year *</label>
//                                 <select
//                                     name="year"
//                                     value={impactFactor.year}
//                                     onChange={handleChange}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 >
//                                     <option value="">-- Select Year --</option>
//                                     {years.map((year) => (
//                                         <option key={year} value={year}>
//                                             {year}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">ISSN Print</label>
//                                 <input
//                                     type="text"
//                                     name="issnPrint"
//                                     value={impactFactor.issnPrint}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 1234-5678"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">ISSN Online</label>
//                                 <input
//                                     type="text"
//                                     name="issnOnline"
//                                     value={impactFactor.issnOnline}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 9876-5432"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>
//                             <div className="flex justify-end gap-4 mt-6 col-span-2">
//                                 <button
//                                     type="submit"
//                                     className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors shadow-md ${loading || !currentUser ? "opacity-50 cursor-not-allowed" : ""}`}
//                                     disabled={loading || !currentUser}
//                                 >
//                                     {loading
//                                         ? "Saving..."
//                                         : location.state && location.state.impactFactor
//                                         ? "Update"
//                                         : "Save"}
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => {
//                                         navigate("/impactfactorstab");
//                                         window.scrollTo(0, 0);
//                                     }}
//                                     className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-full transition-colors shadow-md"
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </form>
//                     )}
//                 </div>
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
//                                 className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors"
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

// export default AddNewImpactFactors;










import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Sidebar from "../sidebar";

const AddNewImpactFactors = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef(null);
    const searchInputRef = useRef(null);

    const [modal, setModal] = useState({ show: false, type: "", message: "" });
    const [impactFactor, setImpactFactor] = useState(null);
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const BASE_URL = "https://iassrd.com:8081/api/v1";

    // Generate years from 2008 to 2027 for the dropdown
    const years = Array.from({ length: 2027 - 2008 + 1 }, (_, i) => 2008 + i);

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

    // Fetch current user data
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

    // Fetch journals
    useEffect(() => {
        axios
            .get(`${BASE_URL}/journals`)
            .then((response) => {
                if (response.data.success) {
                    setJournals(response.data.data);
                } else {
                    console.error("Failed to fetch journals:", response.data.message);
                }
            })
            .catch((error) => console.error("Error fetching journals:", error));
    }, []);

    // Initialize impactFactor state
    useEffect(() => {
        if (location.state && location.state.impactFactor) {
            const { imfId, createdUserId, createdUserType, ...editableFields } = location.state.impactFactor;
            setImpactFactor({
                ...editableFields,
                imfPoints: editableFields.imfPoints || "",
                journalKey: editableFields.journalKey || "", // Include journalKey
                createdUserId: createdUserId || currentUser?.userId,
                createdUserType: createdUserType || (currentUser?.role === "ADMIN" ? 1 : 2),
                updatedUserId: currentUser?.userId,
                updatedUserType: currentUser?.role === "ADMIN" ? 1 : 2,
            });
        } else if (currentUser) {
            setImpactFactor({
                journalId: "",
                imfPoints: "",
                year: "",
                journalKey: "", // Initialize journalKey
                issnPrint: "",
                issnOnline: "",
                status: "",
                createdUserId: currentUser.userId,
                createdUserType: currentUser.role === "ADMIN" ? 1 : 2,
                updatedUserId: currentUser.userId,
                updatedUserType: currentUser.role === "ADMIN" ? 1 : 2,
            });
        }
    }, [location.state, currentUser]);

    // Update search term when journalId changes
    useEffect(() => {
        if (impactFactor?.journalId) {
            const selectedJournal = journals.find(
                (journal) => journal.journalId === impactFactor.journalId
            );
            if (selectedJournal) {
                setSearchTerm(
                    selectedJournal.abbrevation
                        ? `${selectedJournal.journalName} (${selectedJournal.abbrevation})`
                        : selectedJournal.journalName
                );
            }
        } else {
            setSearchTerm("");
        }
    }, [impactFactor?.journalId, journals]);

    const filteredJournals = journals.filter(
        (journal) =>
            journal.journalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (journal.abbrevation &&
                journal.abbrevation.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleSelect = (journalId) => {
        const selectedJournal = journals.find((journal) => journal.journalId === journalId);
        if (selectedJournal) {
            setImpactFactor((prev) => ({ ...prev, journalId }));
            setSearchTerm(
                selectedJournal.abbrevation
                    ? `${selectedJournal.journalName} (${selectedJournal.abbrevation})`
                    : selectedJournal.journalName
            );
        }
        setShowDropdown(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setImpactFactor((prev) => ({ ...prev, [name]: value }));
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
        setMessage("");

        try {
            const impactFactorData = {
                journalId: impactFactor.journalId || null,
                imfPoints: impactFactor.imfPoints ? parseFloat(impactFactor.imfPoints) : null,
                year: impactFactor.year ? parseInt(impactFactor.year) : null,
                journalKey: impactFactor.journalKey || null, // Include journalKey
                issnPrint: impactFactor.issnPrint || null,
                issnOnline: impactFactor.issnOnline || null,
                status: impactFactor.status ? parseInt(impactFactor.status) : null,
                createdUserId: impactFactor.createdUserId || currentUser.userId,
                createdUserType: impactFactor.createdUserType || (currentUser.role === "ADMIN" ? 1 : 2),
                updatedUserId: currentUser.userId,
                updatedUserType: currentUser.role === "ADMIN" ? 1 : 2,
            };

            let response;
            const isEditing = location.state && location.state.impactFactor && location.state.impactFactor.imfId;
            if (isEditing) {
                response = await axios.put(`${BASE_URL}/impactfactors/${location.state.impactFactor.imfId}`, impactFactorData);
            } else {
                response = await axios.post(`${BASE_URL}/impactfactors`, impactFactorData);
            }

            if (response && (response.status === 200 || response.status === 201)) {
                setModal({
                    show: true,
                    type: "success",
                    message: isEditing ? "Impact Factor record updated successfully!" : "Impact Factor record added successfully!",
                });
                setMessage(isEditing ? "Impact Factor record updated successfully!" : "Impact Factor record added successfully!");
                setTimeout(() => {
                    setModal({ show: false, type: "", message: "" });
                    navigate("/impactfactorstab");
                    window.scrollTo(0, 0);
                }, 800);
            }
        } catch (error) {
            setModal({
                show: true,
                type: "error",
                message: `Failed to ${isEditing ? "update" : "add"} Impact Factor record: ${error.message}`,
            });
            setMessage(`Failed to ${isEditing ? "update" : "add"} Impact Factor record: ${error.message}`);
            console.error("Error saving Impact Factor record:", error);
        } finally {
            setLoading(false);
        }
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
            <div className="w-screen p-6 h-screen pt-20 overflow-y-auto">
                <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-6 shadow-md">
                    <h1 className="text-2xl font-bold">
                        {location.state && location.state.impactFactor ? "Edit Impact Factor Record" : "Add New Impact Factor Record"}
                    </h1>
                    <p className="text-sm opacity-90 mt-1">
                        {location.state && location.state.impactFactor
                            ? "Update an existing Impact Factor record."
                            : "Create a new Impact Factor record for your dashboard."}
                    </p>
                </header>
                <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
                    <h2 className="text-xl font-semibold text-blue-600 mb-6">
                        {location.state && location.state.impactFactor ? "Edit Impact Factor Record" : "Add New Impact Factor Record"}
                    </h2>
                    {message && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{message}</div>
                    )}
                    {impactFactor && (
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative" ref={dropdownRef}>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Journal *</label>
                                <div
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    onClick={() => setShowDropdown(!showDropdown)}
                                >
                                    {searchTerm || "-- Select Journal --"}
                                </div>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg
                                        className={`fill-current h-5 w-5 mt-2 ${showDropdown ? "rotate-180" : "rotate-0"}`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </div>
                                {showDropdown && (
                                    <div className="absolute z-50 w-full border border-blue-200 rounded-lg bg-white shadow-lg max-h-60 overflow-y-auto mt-1">
                                        <input
                                            ref={searchInputRef}
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => {
                                                setSearchTerm(e.target.value);
                                                setShowDropdown(true);
                                            }}
                                            placeholder="Search Journal..."
                                            className="w-full px-3 py-2 border-b border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                        {filteredJournals.length > 0 ? (
                                            filteredJournals.map((journal) => (
                                                <div
                                                    key={journal.journalId}
                                                    onClick={() => handleSelect(journal.journalId)}
                                                    className="px-3 py-2 cursor-pointer hover:bg-blue-100"
                                                >
                                                    {journal.abbrevation
                                                        ? `${journal.journalName} (${journal.abbrevation})`
                                                        : journal.journalName}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="px-3 py-2 text-gray-500">No results found</div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Impact Factor *</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="imfPoints"
                                    value={impactFactor.imfPoints}
                                    onChange={handleChange}
                                    placeholder="e.g., 5.32"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Year *</label>
                                <select
                                    name="year"
                                    value={impactFactor.year}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    required
                                >
                                    <option value="">-- Select Year --</option>
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Journal Key</label>
                                <input
                                    type="text"
                                    name="journalKey"
                                    value={impactFactor.journalKey}
                                    onChange={handleChange}
                                    placeholder="e.g., JKEY123"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">ISSN Print</label>
                                <input
                                    type="text"
                                    name="issnPrint"
                                    value={impactFactor.issnPrint}
                                    onChange={handleChange}
                                    placeholder="e.g., 1234-5678"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">ISSN Online</label>
                                <input
                                    type="text"
                                    name="issnOnline"
                                    value={impactFactor.issnOnline}
                                    onChange={handleChange}
                                    placeholder="e.g., 9876-5432"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>
                            <div className="flex justify-end gap-4 mt-6 col-span-2">
                                <button
                                    type="submit"
                                    className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors shadow-md ${loading || !currentUser ? "opacity-50 cursor-not-allowed" : ""}`}
                                    disabled={loading || !currentUser}
                                >
                                    {loading
                                        ? "Saving..."
                                        : location.state && location.state.impactFactor
                                        ? "Update"
                                        : "Save"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        navigate("/impactfactorstab");
                                        window.scrollTo(0, 0);
                                    }}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-full transition-colors shadow-md"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
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
                                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors"
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

export default AddNewImpactFactors;