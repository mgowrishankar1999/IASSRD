// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../sidebar";

// const AddNewApc = () => {
//     const navigate = useNavigate();
//     const location = useLocation();

//     const [modal, setModal] = useState({ show: false, type: "", message: "" });
//     const [apc, setApc] = useState(null);
//     const [journals, setJournals] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");

//     const BASE_URL = "https://iassrd.com:8081/api/v1";

//     // Get user data from localStorage
//     const user = JSON.parse(localStorage.getItem("user")) || {};
//     const userId = user.userId || null;

//     // Fetch journals for dropdown
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

//     // Load APC data for editing or initialize for adding
//     useEffect(() => {
//         if (location.state && location.state.apc) {
//             const { apcId, ...editableFields } = location.state.apc;
//             setApc(editableFields);
//         } else {
//             setApc({
//                 journalId: "",
//                 acceptanceRate: "",
//                 submissionFinal: "",
//                 acceptancePublication: "",
//                 citeScore: "",
//                 lowerMiddlePrice: "",
//                 indexing1: "",
//                 indexing2: "",
//                 issuePerYear: "",
//                 apcPrice: "",
//                 status: "",
//                 createdUserId: userId,
//                 createdUserType: 1,
//                 updatedUserId: userId,
//                 updatedUserType: 1,
//             });
//         }
//     }, [location.state, userId]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setApc((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage("");

//         try {
//             const apcData = {
//                 journalId: apc.journalId || "",
//                 acceptanceRate: apc.acceptanceRate ? parseFloat(apc.acceptanceRate) : null,
//                 submissionFinal: apc.submissionFinal ? parseInt(apc.submissionFinal) : null,
//                 acceptancePublication: apc.acceptancePublication ? parseInt(apc.acceptancePublication) : null,
//                 citeScore: apc.citeScore ? parseFloat(apc.citeScore) : null,
//                 lowerMiddlePrice: apc.lowerMiddlePrice || "",
//                 indexing1: apc.indexing1 || "",
//                 indexing2: apc.indexing2 || "",
//                 issuePerYear: apc.issuePerYear ? parseInt(apc.issuePerYear) : null,
//                 apcPrice: apc.apcPrice || "",
//                 status: apc.status ? parseInt(apc.status) : null,
//                 createdUserId: userId,
//                 createdUserType: apc.createdUserType || 1,
//                 updatedUserId: userId,
//                 updatedUserType: apc.updatedUserType || 1,
//             };

//             let response;
//             const isEditing = location.state && location.state.apc && location.state.apc.apcId;
//             if (isEditing) {
//                 response = await axios.put(`${BASE_URL}/apcs/${location.state.apc.apcId}`, apcData);
//             } else {
//                 response = await axios.post(`${BASE_URL}/apcs`, apcData);
//             }

//             if (response && (response.status === 200 || response.status === 201)) {
//                 setModal({
//                     show: true,
//                     type: "success",
//                     message: isEditing ? "APC record updated successfully!" : "APC record added successfully!",
//                 });
//                 setMessage(isEditing ? "APC record updated successfully!" : "APC record added successfully!");
//                 setTimeout(() => {
//                     setModal({ show: false, type: "", message: "" });
//                     navigate("/apc");
//                     window.scrollTo(0, 0);
//                 }, 800);
//             }
//         } catch (error) {
//             setModal({
//                 show: true,
//                 type: "error",
//                 message: `Failed to ${location.state && location.state.apc ? "update" : "add"} APC record: ${error.message}`,
//             });
//             setMessage(`Failed to ${location.state && location.state.apc ? "update" : "add"} APC record: ${error.message}`);
//             console.error("Error saving APC record:", error);
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
//                     <span className="text-sm">Hi</span>
//                 </div>
//             </header>
//             <div className="w-[20%]">
//                 <Sidebar />
//             </div>
//             <div className="w-screen p-6 h-screen pt-20 overflow-y-auto">
//                 {/* Header */}
//                 <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-6 shadow-md">
//                     <h1 className="text-2xl font-bold">
//                         {location.state && location.state.apc ? "Edit APC Record" : "Add New APC Record"}
//                     </h1>
//                     <p className="text-sm opacity-90 mt-1">
//                         {location.state && location.state.apc
//                             ? "Update an existing APC record."
//                             : "Create a new APC record for your dashboard."}
//                     </p>
//                 </header>

//                 {/* Main Content */}
//                 <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
//                     <h2 className="text-xl font-semibold text-blue-600 mb-6">
//                         {location.state && location.state.apc ? "Edit APC Record" : "Add New APC Record"}
//                     </h2>

//                     {message && (
//                         <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{message}</div>
//                     )}

//                     {apc && (
//                         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {/* Journal */}
//                             <div className="relative">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Journal *</label>
//                                 <select
//                                     name="journalId"
//                                     value={apc.journalId}
//                                     onChange={handleChange}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 >
//                                     <option value="">-- Select Journal --</option>
//                                     {journals.length > 0 ? (
//                                         journals.map((journal) => (
//                                             <option key={journal.journalId} value={journal.journalId}>
//                                                 {journal.journalName}
//                                             </option>
//                                         ))
//                                     ) : (
//                                         <option disabled>Loading journals...</option>
//                                     )}
//                                 </select>
//                             </div>

//                             {/* Acceptance Rate */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Acceptance Rate (%) *</label>
//                                 <input
//                                     type="number"
//                                     step="0.01"
//                                     name="acceptanceRate"
//                                     value={apc.acceptanceRate}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 25.5"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>

//                             {/* Submission to Final Decision */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Submission to Final Decision (Days) *</label>
//                                 <input
//                                     type="number"
//                                     name="submissionFinal"
//                                     value={apc.submissionFinal}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 30"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>

//                             {/* Acceptance to Publication */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Acceptance to Publication (Days) *</label>
//                                 <input
//                                     type="number"
//                                     name="acceptancePublication"
//                                     value={apc.acceptancePublication}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 45"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>

//                             {/* Cite Score */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Cite Score</label>
//                                 <input
//                                     type="number"
//                                     step="0.01"
//                                     name="citeScore"
//                                     value={apc.citeScore}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 3.2"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Lower Middle Price */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Lower Middle Price</label>
//                                 <input
//                                     type="text"
//                                     name="lowerMiddlePrice"
//                                     value={apc.lowerMiddlePrice}
//                                     onChange={handleChange}
//                                     placeholder="e.g., $500"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Indexing 1 */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Indexing 1</label>
//                                 <input
//                                     type="text"
//                                     name="indexing1"
//                                     value={apc.indexing1}
//                                     onChange={handleChange}
//                                     placeholder="e.g., Scopus"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Indexing 2 */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Indexing 2</label>
//                                 <input
//                                     type="text"
//                                     name="indexing2"
//                                     value={apc.indexing2}
//                                     onChange={handleChange}
//                                     placeholder="e.g., Web of Science"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Issues Per Year */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Issues Per Year *</label>
//                                 <input
//                                     type="number"
//                                     name="issuePerYear"
//                                     value={apc.issuePerYear}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 12"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>

//                             {/* APC Price */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">APC Price *</label>
//                                 <input
//                                     type="text"
//                                     name="apcPrice"
//                                     value={apc.apcPrice}
//                                     onChange={handleChange}
//                                     placeholder="e.g., $1000"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>

//                             {/* Status */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Status</label>
//                                 <input
//                                     type="number"
//                                     name="status"
//                                     value={apc.status}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 1"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Buttons */}
//                             <div className="flex justify-end gap-4 mt-6 col-span-2">
//                                 <button
//                                     type="submit"
//                                     className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors shadow-md"
//                                     disabled={loading}
//                                 >
//                                     {loading
//                                         ? "Saving..."
//                                         : location.state && location.state.apc
//                                         ? "Update"
//                                         : "Save"}
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => {
//                                         navigate("/apc");
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

// export default AddNewApc;



// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../sidebar";

// const AddNewApc = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const dropdownRef = useRef(null);
//     const searchInputRef = useRef(null);

//     const [modal, setModal] = useState({ show: false, type: "", message: "" });
//     const [apc, setApc] = useState(null);
//     const [journals, setJournals] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");
//     const [showDropdown, setShowDropdown] = useState(false);

//     const BASE_URL = "https://iassrd.com:8081/api/v1";

//     const user = JSON.parse(localStorage.getItem("user")) || {};
//     const userId = user.userId || null;

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

//     useEffect(() => {
//         if (location.state && location.state.apc) {
//             const { apcId, ...editableFields } = location.state.apc;
//             setApc(editableFields);
//         } else {
//             setApc({
//                 journalId: "",
//                 acceptanceRate: "",
//                 submissionFinal: "",
//                 acceptancePublication: "",
//                 citeScore: "",
//                 lowerMiddlePrice: "",
//                 indexing1: "",
//                 indexing2: "",
//                 issuePerYear: "",
//                 apcPrice: "",
//                 status: "",
//                 createdUserId: userId,
//                 createdUserType: 1,
//                 updatedUserId: userId,
//                 updatedUserType: 1,
//             });
//         }
//     }, [location.state, userId]);

//     useEffect(() => {
//         if (apc?.journalId) {
//             const selectedJournal = journals.find(
//                 (journal) => journal.journalId === apc.journalId
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
//     }, [apc?.journalId, journals]);

//     const filteredJournals = journals.filter(
//         (journal) =>
//             journal.journalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             (journal.abbrevation &&
//                 journal.abbrevation.toLowerCase().includes(searchTerm.toLowerCase()))
//     );

//     const handleSelect = (journalId) => {
//         const selectedJournal = journals.find((journal) => journal.journalId === journalId);
//         if (selectedJournal) {
//             setApc((prev) => ({ ...prev, journalId }));
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
//         setApc((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage("");

//         try {
//             const apcData = {
//                 journalId: apc.journalId || "",
//                 acceptanceRate: apc.acceptanceRate ? parseFloat(apc.acceptanceRate) : null,
//                 submissionFinal: apc.submissionFinal ? parseInt(apc.submissionFinal) : null,
//                 acceptancePublication: apc.acceptancePublication ? parseInt(apc.acceptancePublication) : null,
//                 citeScore: apc.citeScore ? parseFloat(apc.citeScore) : null,
//                 lowerMiddlePrice: apc.lowerMiddlePrice || "",
//                 indexing1: apc.indexing1 || "",
//                 indexing2: apc.indexing2 || "",
//                 issuePerYear: apc.issuePerYear ? parseInt(apc.issuePerYear) : null,
//                 apcPrice: apc.apcPrice || "",
//                 status: apc.status ? parseInt(apc.status) : null,
//                 createdUserId: userId,
//                 createdUserType: apc.createdUserType || 1,
//                 updatedUserId: userId,
//                 updatedUserType: apc.updatedUserType || 1,
//             };

//             let response;
//             const isEditing = location.state && location.state.apc && location.state.apc.apcId;
//             if (isEditing) {
//                 response = await axios.put(`${BASE_URL}/apcs/${location.state.apc.apcId}`, apcData);
//             } else {
//                 response = await axios.post(`${BASE_URL}/apcs`, apcData);
//             }

//             if (response && (response.status === 200 || response.status === 201)) {
//                 setModal({
//                     show: true,
//                     type: "success",
//                     message: isEditing ? "APC record updated successfully!" : "APC record added successfully!",
//                 });
//                 setMessage(isEditing ? "APC record updated successfully!" : "APC record added successfully!");
//                 setTimeout(() => {
//                     setModal({ show: false, type: "", message: "" });
//                     navigate("/apc");
//                     window.scrollTo(0, 0);
//                 }, 800);
//             }
//         } catch (error) {
//             setModal({
//                 show: true,
//                 type: "error",
//                 message: `Failed to ${location.state && location.state.apc ? "update" : "add"} APC record: ${error.message}`,
//             });
//             setMessage(`Failed to ${location.state && location.state.apc ? "update" : "add"} APC record: ${error.message}`);
//             console.error("Error saving APC record:", error);
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
//                     <span className="text-sm">Hi</span>
//                 </div>
//             </header>
//             <div className="w-[20%]">
//                 <Sidebar />
//             </div>
//             <div className="w-screen p-6 h-screen pt-20 overflow-y-auto">
//                 <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-6 shadow-md">
//                     <h1 className="text-2xl font-bold">
//                         {location.state && location.state.apc ? "Edit APC Record" : "Add New APC Record"}
//                     </h1>
//                     <p className="text-sm opacity-90 mt-1">
//                         {location.state && location.state.apc
//                             ? "Update an existing APC record."
//                             : "Create a new APC record for your dashboard."}
//                     </p>
//                 </header>
//                 <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
//                     <h2 className="text-xl font-semibold text-blue-600 mb-6">
//                         {location.state && location.state.apc ? "Edit APC Record" : "Add New APC Record"}
//                     </h2>
//                     {message && (
//                         <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{message}</div>
//                     )}
//                     {apc && (
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
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Acceptance Rate (%) *</label>
//                                 <input
//                                     type="number"
//                                     step="0.01"
//                                     name="acceptanceRate"
//                                     value={apc.acceptanceRate}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 25.5"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Submission to Final Decision (Days) *</label>
//                                 <input
//                                     type="number"
//                                     name="submissionFinal"
//                                     value={apc.submissionFinal}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 30"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Acceptance to Publication (Days) *</label>
//                                 <input
//                                     type="number"
//                                     name="acceptancePublication"
//                                     value={apc.acceptancePublication}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 45"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Cite Score</label>
//                                 <input
//                                     type="number"
//                                     step="0.01"
//                                     name="citeScore"
//                                     value={apc.citeScore}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 3.2"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Lower Middle Price</label>
//                                 <input
//                                     type="text"
//                                     name="lowerMiddlePrice"
//                                     value={apc.lowerMiddlePrice}
//                                     onChange={handleChange}
//                                     placeholder="e.g., $500"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Indexing 1</label>
//                                 <input
//                                     type="text"
//                                     name="indexing1"
//                                     value={apc.indexing1}
//                                     onChange={handleChange}
//                                     placeholder="e.g., Scopus"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Indexing 2</label>
//                                 <input
//                                     type="text"
//                                     name="indexing2"
//                                     value={apc.indexing2}
//                                     onChange={handleChange}
//                                     placeholder="e.g., Web of Science"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Issues Per Year *</label>
//                                 <input
//                                     type="number"
//                                     name="issuePerYear"
//                                     value={apc.issuePerYear}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 12"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">APC Price *</label>
//                                 <input
//                                     type="text"
//                                     name="apcPrice"
//                                     value={apc.apcPrice}
//                                     onChange={handleChange}
//                                     placeholder="e.g., $1000"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>
//                             {/* <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Status</label>
//                                 <input
//                                     type="number"
//                                     name="status"
//                                     value={apc.status}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 1"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div> */}
//                             <div className="flex justify-end gap-4 mt-6 col-span-2">
//                                 <button
//                                     type="submit"
//                                     className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors shadow-md"
//                                     disabled={loading}
//                                 >
//                                     {loading
//                                         ? "Saving..."
//                                         : location.state && location.state.apc
//                                         ? "Update"
//                                         : "Save"}
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => {
//                                         navigate("/apc");
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

// export default AddNewApc;



import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Sidebar from "../sidebar";

const AddNewApc = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef(null);
    const searchInputRef = useRef(null);

    const [modal, setModal] = useState({ show: false, type: "", message: "" });
    const [apc, setApc] = useState(null);
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const BASE_URL = "https://iassrd.com:8081/api/v1";

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

    useEffect(() => {
        if (location.state && location.state.apc) {
            const { apcId, createdUserId, createdUserType, ...editableFields } = location.state.apc;
            setApc({
                ...editableFields,
                createdUserId: createdUserId || currentUser?.userId,
                createdUserType: createdUserType || (currentUser?.role === "ADMIN" ? 1 : 2),
                updatedUserId: currentUser?.userId,
                updatedUserType: currentUser?.role === "ADMIN" ? 1 : 2,
            });
        } else if (currentUser) {
            setApc({
                journalId: "",
                acceptanceRate: "",
                submissionFinal: "",
                acceptancePublication: "",
                citeScore: "",
                lowerMiddlePrice: "",
                indexing1: "",
                indexing2: "",
                issuePerYear: "",
                apcPrice: "",
                status: "",
                createdUserId: currentUser.userId,
                createdUserType: currentUser.role === "ADMIN" ? 1 : 2,
                updatedUserId: currentUser.userId,
                updatedUserType: currentUser.role === "ADMIN" ? 1 : 2,
            });
        }
    }, [location.state, currentUser]);

    useEffect(() => {
        if (apc?.journalId) {
            const selectedJournal = journals.find(
                (journal) => journal.journalId === apc.journalId
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
    }, [apc?.journalId, journals]);

    const filteredJournals = journals.filter(
        (journal) =>
            journal.journalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (journal.abbrevation &&
                journal.abbrevation.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleSelect = (journalId) => {
        const selectedJournal = journals.find((journal) => journal.journalId === journalId);
        if (selectedJournal) {
            setApc((prev) => ({ ...prev, journalId }));
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
        setApc((prev) => ({ ...prev, [name]: value }));
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
            const apcData = {
                journalId: apc.journalId || "",
                acceptanceRate: apc.acceptanceRate ? parseFloat(apc.acceptanceRate) : null,
                submissionFinal: apc.submissionFinal ? parseInt(apc.submissionFinal) : null,
                acceptancePublication: apc.acceptancePublication ? parseInt(apc.acceptancePublication) : null,
                citeScore: apc.citeScore ? parseFloat(apc.citeScore) : null,
                lowerMiddlePrice: apc.lowerMiddlePrice || "",
                indexing1: apc.indexing1 || "",
                indexing2: apc.indexing2 || "",
                issuePerYear: apc.issuePerYear ? parseInt(apc.issuePerYear) : null,
                apcPrice: apc.apcPrice || "",
                status: apc.status ? parseInt(apc.status) : null,
                createdUserId: apc.createdUserId || currentUser.userId,
                createdUserType: apc.createdUserType || (currentUser.role === "ADMIN" ? 1 : 2),
                updatedUserId: currentUser.userId,
                updatedUserType: currentUser.role === "ADMIN" ? 1 : 2,
            };

            let response;
            const isEditing = location.state && location.state.apc && location.state.apc.apcId;
            if (isEditing) {
                response = await axios.put(`${BASE_URL}/apcs/${location.state.apc.apcId}`, apcData);
            } else {
                response = await axios.post(`${BASE_URL}/apcs`, apcData);
            }

            if (response && (response.status === 200 || response.status === 201)) {
                setModal({
                    show: true,
                    type: "success",
                    message: isEditing ? "APC record updated successfully!" : "APC record added successfully!",
                });
                setMessage(isEditing ? "APC record updated successfully!" : "APC record added successfully!");
                setTimeout(() => {
                    setModal({ show: false, type: "", message: "" });
                    navigate("/apc");
                    window.scrollTo(0, 0);
                }, 800);
            }
        } catch (error) {
            setModal({
                show: true,
                type: "error",
                message: `Failed to ${isEditing ? "update" : "add"} APC record: ${error.message}`,
            });
            setMessage(`Failed to ${isEditing ? "update" : "add"} APC record: ${error.message}`);
            console.error("Error saving APC record:", error);
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
                        {location.state && location.state.apc ? "Edit APC Record" : "Add New APC Record"}
                    </h1>
                    <p className="text-sm opacity-90 mt-1">
                        {location.state && location.state.apc
                            ? "Update an existing APC record."
                            : "Create a new APC record for your dashboard."}
                    </p>
                </header>
                <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
                    <h2 className="text-xl font-semibold text-blue-600 mb-6">
                        {location.state && location.state.apc ? "Edit APC Record" : "Add New APC Record"}
                    </h2>
                    {message && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{message}</div>
                    )}
                    {apc && (
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
                                <label className="block text-sm font-medium text-blue-600 mb-1">Acceptance Rate (%) *</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="acceptanceRate"
                                    value={apc.acceptanceRate}
                                    onChange={handleChange}
                                    placeholder="e.g., 25.5"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Submission to Final Decision (Days) *</label>
                                <input
                                    type="number"
                                    name="submissionFinal"
                                    value={apc.submissionFinal}
                                    onChange={handleChange}
                                    placeholder="e.g., 30"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Acceptance to Publication (Days) *</label>
                                <input
                                    type="number"
                                    name="acceptancePublication"
                                    value={apc.acceptancePublication}
                                    onChange={handleChange}
                                    placeholder="e.g., 45"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Cite Score</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="citeScore"
                                    value={apc.citeScore}
                                    onChange={handleChange}
                                    placeholder="e.g., 3.2"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Lower Middle Price</label>
                                <input
                                    type="text"
                                    name="lowerMiddlePrice"
                                    value={apc.lowerMiddlePrice}
                                    onChange={handleChange}
                                    placeholder="e.g., $500"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Indexing 1</label>
                                <input
                                    type="text"
                                    name="indexing1"
                                    value={apc.indexing1}
                                    onChange={handleChange}
                                    placeholder="e.g., Scopus"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Indexing 2</label>
                                <input
                                    type="text"
                                    name="indexing2"
                                    value={apc.indexing2}
                                    onChange={handleChange}
                                    placeholder="e.g., Web of Science"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Issues Per Year *</label>
                                <input
                                    type="number"
                                    name="issuePerYear"
                                    value={apc.issuePerYear}
                                    onChange={handleChange}
                                    placeholder="e.g., 12"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">APC Price *</label>
                                <input
                                    type="text"
                                    name="apcPrice"
                                    value={apc.apcPrice}
                                    onChange={handleChange}
                                    placeholder="e.g., $1000"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    required
                                />
                            </div>
                            {/* <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Status</label>
                                <input
                                    type="number"
                                    name="status"
                                    value={apc.status}
                                    onChange={handleChange}
                                    placeholder="e.g., 1"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div> */}
                            <div className="flex justify-end gap-4 mt-6 col-span-2">
                                <button
                                    type="submit"
                                    className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors shadow-md ${loading || !currentUser ? "opacity-50 cursor-not-allowed" : ""}`}
                                    disabled={loading || !currentUser}
                                >
                                    {loading
                                        ? "Saving..."
                                        : location.state && location.state.apc
                                        ? "Update"
                                        : "Save"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        navigate("/apc");
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

export default AddNewApc;   