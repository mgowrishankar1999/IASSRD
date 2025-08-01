





// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { Editor } from "@tinymce/tinymce-react";
// import Sidebar from "../sidebar";

// const AddNewJournalIssues = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const editorRef = useRef(null);
//     const refFromMonth = useRef(null);
//     const refToMonth = useRef(null);
//     const refYear = useRef(null);

//     const [modal, setModal] = useState({ show: false, type: "", message: "" });
//     const [journalIssue, setJournalIssue] = useState(null);
//     const [file, setFile] = useState(null);
//     const [journals, setJournals] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");
//     const [removeFile, setRemoveFile] = useState(false);
//     const [showdownfm, setShowdownfm] = useState(false);
//     const [showdowntm, setShowdowntm] = useState(false);
//     const [showdowny, setShowdowny] = useState(false);

//     const BASE_URL = "https://iassrd.com:8081/api/v1";

//     // Get user data from localStorage
//     const user = JSON.parse(localStorage.getItem("user")) || {};
//     const userId = user.userId || null;

//     // Handle outside click to close dropdowns
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
//         const cleanupFm = handleOutsideClick(refFromMonth, () => setShowdownfm(false));
//         const cleanupTm = handleOutsideClick(refToMonth, () => setShowdowntm(false));
//         const cleanupY = handleOutsideClick(refYear, () => setShowdowny(false));
//         return () => {
//             cleanupFm();
//             cleanupTm();
//             cleanupY();
//         };
//     }, []);

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

//     // Load journal issue data for editing or initialize for adding
//     useEffect(() => {
//         if (location.state && location.state.journalIssue) {
//             const { issueId, ...editableFields } = location.state.journalIssue;
//             setJournalIssue(editableFields);
//             if (location.state.journalIssue.filePath) {
//                 setFile(
//                     location.state.journalIssue.filePath.startsWith("/")
//                         ? `${BASE_URL}${location.state.journalIssue.filePath}`
//                         : location.state.journalIssue.filePath
//                 );
//             }
//         } else {
//             setJournalIssue({
//                 journalsId: "",
//                 volumeNo: "",
//                 issueNo: "",
//                 fromMonth: "",
//                 toMonth: "",
//                 year: "",
//                 specialIssue: "",
//                 title: "",
//                 tableOfContents: "",
//                 specialIssueTitle: "",
//                 status: "",
//                 createdUserid: userId,
//                 createdUsertype: 1,
//                 updatedUserid: userId,
//                 updatedUsertype: 1,
//             });
//         }
//     }, [location.state, userId]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setJournalIssue((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//         setRemoveFile(false);
//     };

//     const handleEditorChange = (content) => {
//         setJournalIssue((prev) => ({ ...prev, tableOfContents: content }));
//     };

//     const handleRemoveFile = () => {
//         setFile(null);
//         setRemoveFile(true);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage("");

//         try {
//             const formData = new FormData();

//             // Serialize the journalIssue object to a JSON string and append it as the 'journalIssue' part
//             const journalIssueData = {
//                 journalsId: journalIssue.journalsId || "",
//                 volumeNo: journalIssue.volumeNo || "",
//                 issueNo: journalIssue.issueNo || "",
//                 fromMonth: journalIssue.fromMonth || "",
//                 toMonth: journalIssue.toMonth || "",
//                 year: journalIssue.year || "",
//                 specialIssue: journalIssue.specialIssue || "",
//                 title: journalIssue.title || "",
//                 tableOfContents: journalIssue.tableOfContents || "",
//                 specialIssueTitle: journalIssue.specialIssueTitle || "",
//                 status: journalIssue.status || "",
//                 createdUserid: userId,
//                 createdUsertype: journalIssue.createdUsertype || 1,
//                 updatedUserid: userId,
//                 updatedUsertype: journalIssue.updatedUsertype || 1,
//             };
//             formData.append("journalIssue", new Blob([JSON.stringify(journalIssueData)], { type: "application/json" }));

//             // Append the file if it exists and is a file (not a URL string)
//             if (file && typeof file !== "string") {
//                 formData.append("file", file);
//             }

//             const config = { headers: { "Content-Type": "multipart/form-data" } };
//             let response;
//             const isEditing = location.state && location.state.journalIssue && location.state.journalIssue.issueId;
//             if (isEditing) {
//                 response = await axios.put(
//                     `${BASE_URL}/journal-issues/${location.state.journalIssue.issueId}`,
//                     formData,
//                     config
//                 );
//             } else {
//                 response = await axios.post(`${BASE_URL}/journal-issues`, formData, config);
//             }

//             if (response && (response.status === 200 || response.status === 201)) {
//                 setModal({
//                     show: true,
//                     type: "success",
//                     message: isEditing ? "Journal issue updated successfully!" : "Journal issue added successfully!",
//                 });
//                 setMessage(isEditing ? "Journal issue updated successfully!" : "Journal issue added successfully!");
//                 setTimeout(() => {
//                     setModal({ show: false, type: "", message: "" });
//                     navigate("/journalissues");
//                     window.scrollTo(0, 0);
//                 }, 800);
//             }
//         } catch (error) {
//             setModal({
//                 show: true,
//                 type: "error",
//                 message: `Failed to ${location.state && location.state.journalIssue ? "update" : "add"} journal issue: ${
//                     error.message
//                 }`,
//             });
//             setMessage(
//                 `Failed to ${location.state && location.state.journalIssue ? "update" : "add"} journal issue: ${
//                     error.message
//                 }`
//             );
//             console.error("Error saving journal issue:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Helper function to get display name for file
//     const getFileDisplayName = (file) => {
//         if (typeof file === "string") {
//             return file.split("/").pop();
//         } else if (file instanceof File) {
//             return file.name;
//         }
//         return "No file selected";
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
//                         {location.state && location.state.journalIssue ? "Edit Journal Issue" : "Add New Journal Issue"}
//                     </h1>
//                     <p className="text-sm opacity-90 mt-1">
//                         {location.state && location.state.journalIssue
//                             ? "Update an existing journal issue."
//                             : "Create a new journal issue for your dashboard."}
//                     </p>
//                 </header>

//                 {/* Main Content */}
//                 <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
//                     <h2 className="text-xl font-semibold text-blue-600 mb-6">
//                         {location.state && location.state.journalIssue ? "Edit Journal Issue" : "Add New Journal Issue"}
//                     </h2>

//                     {message && (
//                         <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{message}</div>
//                     )}

//                     {journalIssue && (
//                         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {/* Journal */}
//                             <div className="relative">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Journal *</label>
//                                 <select
//                                     name="journalsId"
//                                     value={journalIssue.journalsId}
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

//                             {/* Volume No */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Volume No *</label>
//                                 <input
//                                     type="text"
//                                     name="volumeNo"
//                                     value={journalIssue.volumeNo}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 5"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>

//                             {/* Issue No */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Issue No *</label>
//                                 <input
//                                     type="text"
//                                     name="issueNo"
//                                     value={journalIssue.issueNo}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 2"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>

//                             {/* From Month */}
//                             <div className="relative" ref={refFromMonth}>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">From Month *</label>
//                                 <select
//                                     name="fromMonth"
//                                     value={journalIssue.fromMonth}
//                                     onChange={handleChange}
//                                     onClick={() => setShowdownfm(!showdownfm)}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm appearance-none"
//                                     required
//                                 >
//                                     <option value="">Select Month</option>
//                                     {[
//                                         "January",
//                                         "February",
//                                         "March",
//                                         "April",
//                                         "May",
//                                         "June",
//                                         "July",
//                                         "August",
//                                         "September",
//                                         "October",
//                                         "November",
//                                         "December",
//                                     ].map((month) => (
//                                         <option key={month} value={month}>
//                                             {month}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                                     <svg
//                                         className={`fill-current h-5 w-5 mt-2 ${
//                                             showdownfm ? "rotate-180" : "rotate-0"
//                                         }`}
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 20 20"
//                                     >
//                                         <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
//                                     </svg>
//                                 </div>
//                             </div>

//                             {/* To Month */}
//                             <div className="relative" ref={refToMonth}>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">To Month *</label>
//                                 <select
//                                     name="toMonth"
//                                     value={journalIssue.toMonth}
//                                     onChange={handleChange}
//                                     onClick={() => setShowdowntm(!showdowntm)}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm appearance-none"
//                                     required
//                                 >
//                                     <option value="">Select Month</option>
//                                     {[
//                                         "January",
//                                         "February",
//                                         "March",
//                                         "April",
//                                         "May",
//                                         "June",
//                                         "July",
//                                         "August",
//                                         "September",
//                                         "October",
//                                         "November",
//                                         "December",
//                                     ].map((month) => (
//                                         <option key={month} value={month}>
//                                             {month}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                                     <svg
//                                         className={`fill-current h-5 w-5 mt-2 ${
//                                             showdowntm ? "rotate-180" : "rotate-0"
//                                         }`}
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 20 20"
//                                     >
//                                         <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
//                                     </svg>
//                                 </div>
//                             </div>

//                             {/* Year */}
//                             <div className="relative" ref={refYear}>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Year *</label>
//                                 <select
//                                     name="year"
//                                     value={journalIssue.year}
//                                     onChange={handleChange}
//                                     onClick={() => setShowdowny(!showdowny)}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm appearance-none"
//                                     required
//                                 >
//                                     <option value="">Select Year</option>
//                                     {Array.from({ length: 21 }, (_, index) => 2010 + index).map((year) => (
//                                         <option key={year} value={year}>
//                                             {year}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                                     <svg
//                                         className={`fill-current h-5 w-5 mt-2 ${
//                                             showdowny ? "rotate-180" : "rotate-0"
//                                         }`}
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 20 20"
//                                     >
//                                         <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
//                                     </svg>
//                                 </div>
//                             </div>

//                             {/* Special Issue */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Special Issue</label>
//                                 <input
//                                     type="text"
//                                     name="specialIssue"
//                                     value={journalIssue.specialIssue}
//                                     onChange={handleChange}
//                                     placeholder="e.g., Yes/No"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Title */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Title *</label>
//                                 <input
//                                     type="text"
//                                     name="title"
//                                     value={journalIssue.title}
//                                     onChange={handleChange}
//                                     placeholder="e.g., Special Edition on AI"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>

//                             {/* Special Issue Title */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Special Issue Title
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="specialIssueTitle"
//                                     value={journalIssue.specialIssueTitle}
//                                     onChange={handleChange}
//                                     placeholder="e.g., AI and Future"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Status */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Status *</label>
//                                 <input
//                                     type="number"
//                                     name="status"
//                                     value={journalIssue.status}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 1"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>

//                             {/* Table of Contents */}
//                             <div className="col-span-2">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Table of Contents
//                                 </label>
//                                 <Editor
//                                     apiKey="nxdubw1uzkbvetym5t6krqxoi3rcxm1nz8xndt774kqqaji4"
//                                     onInit={(evt, editor) => (editorRef.current = editor)}
//                                     value={journalIssue.tableOfContents}
//                                     init={{
//                                         height: 300,
//                                         menubar: false,
//                                         plugins:
//                                             "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
//                                         toolbar:
//                                             "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
//                                     }}
//                                     onEditorChange={handleEditorChange}
//                                 />
//                             </div>

//                             {/* File Upload */}
//                             <div className="col-span-2">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">File (PDF)</label>
//                                 <input
//                                     type="file"
//                                     name="file"
//                                     onChange={handleFileChange}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     accept=".pdf"
//                                 />
//                                 {location.state && location.state.journalIssue && file && !removeFile && (
//                                     <div className="mt-2">
//                                         <p className="text-sm text-gray-500">Current file:</p>
//                                         <div className="relative inline-block">
//                                             <a
//                                                 href={typeof file === "string" ? file : URL.createObjectURL(file)}
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                                 className="text-blue-500 underline"
//                                             >
//                                                 {getFileDisplayName(file)}
//                                             </a>
//                                             <button
//                                                 type="button"
//                                                 onClick={handleRemoveFile}
//                                                 className="absolute -top-2 -left-1 bg-red-500 text-white px-2 py-1 text-xs rounded-full"
//                                             >
//                                                 ✖
//                                             </button>
//                                         </div>
//                                     </div>
//                                 )}
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
//                                         : location.state && location.state.journalIssue
//                                         ? "Update"
//                                         : "Save"}
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => {
//                                         navigate("/journalissues");
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
//                             className={`p-6 rounded-lg shadow-lg ${
//                                 modal.type === "success" ? "bg-green-100" : "bg-red-100"
//                             }`}
//                         >
//                             <p
//                                 className={`text-lg font-semibold ${
//                                     modal.type === "success" ? "text-green-700" : "text-red-700"
//                                 }`}
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

// export default AddNewJournalIssues;


// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { Editor } from "@tinymce/tinymce-react";
// import Sidebar from "../sidebar";

// const AddNewJournalIssues = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const editorRef = useRef(null);
//     const refFromMonth = useRef(null);
//     const refToMonth = useRef(null);
//     const refYear = useRef(null);
//     const dropdownRef = useRef(null);
//     const searchInputRef = useRef(null);

//     const [modal, setModal] = useState({ show: false, type: "", message: "" });
//     const [journalIssue, setJournalIssue] = useState(null);
//     const [file, setFile] = useState(null);
//     const [journals, setJournals] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");
//     const [removeFile, setRemoveFile] = useState(false);
//     const [showdownfm, setShowdownfm] = useState(false);
//     const [showdowntm, setShowdowntm] = useState(false);
//     const [showdowny, setShowdowny] = useState(false);
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
//         const cleanupFm = handleOutsideClick(refFromMonth, () => setShowdownfm(false));
//         const cleanupTm = handleOutsideClick(refToMonth, () => setShowdowntm(false));
//         const cleanupY = handleOutsideClick(refYear, () => setShowdowny(false));
//         const cleanupDropdown = handleOutsideClick(dropdownRef, () => setShowDropdown(false));
//         return () => {
//             cleanupFm();
//             cleanupTm();
//             cleanupY();
//             cleanupDropdown();
//         };
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
//         if (location.state && location.state.journalIssue) {
//             const { issueId, ...editableFields } = location.state.journalIssue;
//             setJournalIssue(editableFields);
//             if (location.state.journalIssue.filePath) {
//                 setFile(
//                     location.state.journalIssue.filePath.startsWith("/")
//                         ? `${BASE_URL}${location.state.journalIssue.filePath}`
//                         : location.state.journalIssue.filePath
//                 );
//             }
//         } else {
//             setJournalIssue({
//                 journalsId: "",
//                 volumeNo: "",
//                 issueNo: "",
//                 fromMonth: "",
//                 toMonth: "",
//                 year: "",
//                 specialIssue: "",
//                 title: "",
//                 tableOfContents: "",
//                 specialIssueTitle: "",
//                 status: "",
//                 createdUserid: userId,
//                 createdUsertype: 1,
//                 updatedUserid: userId,
//                 updatedUsertype: 1,
//             });
//         }
//     }, [location.state, userId]);

//     useEffect(() => {
//         if (journalIssue?.journalsId) {
//             const selectedJournal = journals.find(
//                 (journal) => journal.journalId === journalIssue.journalsId
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
//     }, [journalIssue?.journalsId, journals]);

//     const filteredJournals = journals.filter(
//         (journal) =>
//             journal.journalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             (journal.abbrevation &&
//                 journal.abbrevation.toLowerCase().includes(searchTerm.toLowerCase()))
//     );

//     const handleSelect = (journalId) => {
//         const selectedJournal = journals.find((journal) => journal.journalId === journalId);
//         if (selectedJournal) {
//             setJournalIssue((prev) => ({ ...prev, journalsId: journalId }));
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
//         setJournalIssue((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//         setRemoveFile(false);
//     };

//     const handleEditorChange = (content) => {
//         setJournalIssue((prev) => ({ ...prev, tableOfContents: content }));
//     };

//     const handleRemoveFile = () => {
//         setFile(null);
//         setRemoveFile(true);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage("");

//         try {
//             const formData = new FormData();
//             const journalIssueData = {
//                 journalsId: journalIssue.journalsId || "",
//                 volumeNo: journalIssue.volumeNo || "",
//                 issueNo: journalIssue.issueNo || "",
//                 fromMonth: journalIssue.fromMonth || "",
//                 toMonth: journalIssue.toMonth || "",
//                 year: journalIssue.year || "",
//                 specialIssue: journalIssue.specialIssue || "",
//                 title: journalIssue.title || "",
//                 tableOfContents: journalIssue.tableOfContents || "",
//                 specialIssueTitle: journalIssue.specialIssueTitle || "",
//                 status: journalIssue.status || "",
//                 createdUserid: userId,
//                 createdUsertype: journalIssue.createdUsertype || 1,
//                 updatedUserid: userId,
//                 updatedUsertype: journalIssue.updatedUsertype || 1,
//             };
//             formData.append("journalIssue", new Blob([JSON.stringify(journalIssueData)], { type: "application/json" }));
//             if (file && typeof file !== "string") {
//                 formData.append("file", file);
//             }

//             const config = { headers: { "Content-Type": "multipart/form-data" } };
//             let response;
//             const isEditing = location.state && location.state.journalIssue && location.state.journalIssue.issueId;
//             if (isEditing) {
//                 response = await axios.put(
//                     `${BASE_URL}/journal-issues/${location.state.journalIssue.issueId}`,
//                     formData,
//                     config
//                 );
//             } else {
//                 response = await axios.post(`${BASE_URL}/journal-issues`, formData, config);
//             }

//             if (response && (response.status === 200 || response.status === 201)) {
//                 setModal({
//                     show: true,
//                     type: "success",
//                     message: isEditing ? "Journal issue updated successfully!" : "Journal issue added successfully!",
//                 });
//                 setMessage(isEditing ? "Journal issue updated successfully!" : "Journal issue added successfully!");
//                 setTimeout(() => {
//                     setModal({ show: false, type: "", message: "" });
//                     navigate("/journalissues");
//                     window.scrollTo(0, 0);
//                 }, 800);
//             }
//         } catch (error) {
//             setModal({
//                 show: true,
//                 type: "error",
//                 message: `Failed to ${location.state && location.state.journalIssue ? "update" : "add"} journal issue: ${
//                     error.message
//                 }`,
//             });
//             setMessage(
//                 `Failed to ${location.state && location.state.journalIssue ? "update" : "add"} journal issue: ${
//                     error.message
//                 }`
//             );
//             console.error("Error saving journal issue:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getFileDisplayName = (file) => {
//         if (typeof file === "string") {
//             return file.split("/").pop();
//         } else if (file instanceof File) {
//             return file.name;
//         }
//         return "No file selected";
//     };

//     return (
//         <div className="flex min-h-screen bg-blue-50">
//             <header className="fixed top-0 left-0 z-100 w-full bg-blue-900 text-white py-4 px-6 flex items-center justify-between z-40">
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
//             <div className="w-screen p-6 h-screen pt-20 overflow-y-auto">
//                 <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-6 shadow-md">
//                     <h1 className="text-2xl font-bold">
//                         {location.state && location.state.journalIssue ? "Edit Journal Issue" : "Add New Journal Issue"}
//                     </h1>
//                     <p className="text-sm opacity-90 mt-1">
//                         {location.state && location.state.journalIssue
//                             ? "Update an existing journal issue."
//                             : "Create a new journal issue for your dashboard."}
//                     </p>
//                 </header>
//                 <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
//                     <h2 className="text-xl font-semibold text-blue-600 mb-6">
//                         {location.state && location.state.journalIssue ? "Edit Journal Issue" : "Add New Journal Issue"}
//                     </h2>
//                     {message && (
//                         <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{message}</div>
//                     )}
//                     {journalIssue && (
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
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Volume No *</label>
//                                 <input
//                                     type="text"
//                                     name="volumeNo"
//                                     value={journalIssue.volumeNo}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 5"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Issue No *</label>
//                                 <input
//                                     type="text"
//                                     name="issueNo"
//                                     value={journalIssue.issueNo}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 2"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>
//                             <div className="relative" ref={refFromMonth}>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">From Month *</label>
//                                 <select
//                                     name="fromMonth"
//                                     value={journalIssue.fromMonth}
//                                     onChange={handleChange}
//                                     onClick={() => setShowdownfm(!showdownfm)}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm appearance-none"
//                                     required
//                                 >
//                                     <option value="">Select Month</option>
//                                     {[
//                                         "January",
//                                         "February",
//                                         "March",
//                                         "April",
//                                         "May",
//                                         "June",
//                                         "July",
//                                         "August",
//                                         "September",
//                                         "October",
//                                         "November",
//                                         "December",
//                                     ].map((month) => (
//                                         <option key={month} value={month}>
//                                             {month}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                                     <svg
//                                         className={`fill-current h-5 w-5 mt-2 ${
//                                             showdownfm ? "rotate-180" : "rotate-0"
//                                         }`}
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 20 20"
//                                     >
//                                         <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
//                                     </svg>
//                                 </div>
//                             </div>
//                             <div className="relative" ref={refToMonth}>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">To Month *</label>
//                                 <select
//                                     name="toMonth"
//                                     value={journalIssue.toMonth}
//                                     onChange={handleChange}
//                                     onClick={() => setShowdowntm(!showdowntm)}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm appearance-none"
//                                     required
//                                 >
//                                     <option value="">Select Month</option>
//                                     {[
//                                         "January",
//                                         "February",
//                                         "March",
//                                         "April",
//                                         "May",
//                                         "June",
//                                         "July",
//                                         "August",
//                                         "September",
//                                         "October",
//                                         "November",
//                                         "December",
//                                     ].map((month) => (
//                                         <option key={month} value={month}>
//                                             {month}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                                     <svg
//                                         className={`fill-current h-5 w-5 mt-2 ${
//                                             showdowntm ? "rotate-180" : "rotate-0"
//                                         }`}
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 20 20"
//                                     >
//                                         <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
//                                     </svg>
//                                 </div>
//                             </div>
//                             <div className="relative" ref={refYear}>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Year *</label>
//                                 <select
//                                     name="year"
//                                     value={journalIssue.year}
//                                     onChange={handleChange}
//                                     onClick={() => setShowdowny(!showdowny)}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm appearance-none"
//                                     required
//                                 >
//                                     <option value="">Select Year</option>
//                                     {Array.from({ length: 21 }, (_, index) => 2010 + index).map((year) => (
//                                         <option key={year} value={year}>
//                                             {year}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                                     <svg
//                                         className={`fill-current h-5 w-5 mt-2 ${
//                                             showdowny ? "rotate-180" : "rotate-0"
//                                         }`}
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 20 20"
//                                     >
//                                         <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
//                                     </svg>
//                                 </div>
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Special Issue</label>
//                                 <input
//                                     type="text"
//                                     name="specialIssue"
//                                     value={journalIssue.specialIssue}
//                                     onChange={handleChange}
//                                     placeholder="e.g., Yes/No"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Title</label>
//                                 <input
//                                     type="text"
//                                     name="title"
//                                     value={journalIssue.title}
//                                     onChange={handleChange}
//                                     placeholder="e.g., Special Edition on AI"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Special Issue Title
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="specialIssueTitle"
//                                     value={journalIssue.specialIssueTitle}
//                                     onChange={handleChange}
//                                     placeholder="e.g., AI and Future"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>
//                             {/* <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Status *</label>
//                                 <input
//                                     type="number"
//                                     name="status"
//                                     value={journalIssue.status}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 1"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div> */}
//                             <div className="col-span-2">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Table of Contents
//                                 </label>
//                                 <Editor
//                                     apiKey="nxdubw1uzkbvetym5t6krqxoi3rcxm1nz8xndt774kqqaji4"
//                                     onInit={(evt, editor) => (editorRef.current = editor)}
//                                     value={journalIssue.tableOfContents}
//                                     init={{
//                                         height: 300,
//                                         menubar: false,
//                                         plugins:
//                                             "advlist autolink lists link image charmap perceptual anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
//                                         toolbar:
//                                             "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
//                                     }}
//                                     onEditorChange={handleEditorChange}
//                                 />
//                             </div>
//                             <div className="col-span-2">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">File (PDF)</label>
//                                 <input
//                                     type="file"
//                                     name="file"
//                                     onChange={handleFileChange}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     accept=".pdf"
//                                 />
//                                 {location.state && location.state.journalIssue && file && !removeFile && (
//                                     <div className="mt-2">
//                                         <p className="text-sm text-gray-500">Current file:</p>
//                                         <div className="relative inline-block">
//                                             <a
//                                                 href={typeof file === "string" ? file : URL.createObjectURL(file)}
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                                 className="text-blue-500 underline"
//                                             >
//                                                 {getFileDisplayName(file)}
//                                             </a>
//                                             <button
//                                                 type="button"
//                                                 onClick={handleRemoveFile}
//                                                 className="absolute -top-2 -left-1 bg-red-500 text-white px-2 py-1 text-xs rounded-full"
//                                             >
//                                                 ✖
//                                             </button>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                             <div className="flex justify-end gap-4 mt-6 col-span-2">
//                                 <button
//                                     type="submit"
//                                     className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors shadow-md"
//                                     disabled={loading}
//                                 >
//                                     {loading
//                                         ? "Saving..."
//                                         : location.state && location.state.journalIssue
//                                         ? "Update"
//                                         : "Save"}
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => {
//                                         navigate("/journalissues");
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
//                             className={`p-6 rounded-lg shadow-lg ${
//                                 modal.type === "success" ? "bg-green-100" : "bg-red-100"
//                             }`}
//                         >
//                             <p
//                                 className={`text-lg font-semibold ${
//                                     modal.type === "success" ? "text-green-700" : "text-red-700"
//                                 }`}
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

// export default AddNewJournalIssues;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import Sidebar from "../sidebar";

const AddNewJournalIssues = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const editorRef = useRef(null);
    const refFromMonth = useRef(null);
    const refToMonth = useRef(null);
    const refYear = useRef(null);
    const dropdownRef = useRef(null);
    const searchInputRef = useRef(null);

    const [modal, setModal] = useState({ show: false, type: "", message: "" });
    const [journalIssue, setJournalIssue] = useState(null);
    const [file, setFile] = useState(null);
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [removeFile, setRemoveFile] = useState(false);
    const [showdownfm, setShowdownfm] = useState(false);
    const [showdowntm, setShowdowntm] = useState(false);
    const [showdowny, setShowdowny] = useState(false);
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
        const cleanupFm = handleOutsideClick(refFromMonth, () => setShowdownfm(false));
        const cleanupTm = handleOutsideClick(refToMonth, () => setShowdowntm(false));
        const cleanupY = handleOutsideClick(refYear, () => setShowdowny(false));
        const cleanupDropdown = handleOutsideClick(dropdownRef, () => setShowDropdown(false));
        return () => {
            cleanupFm();
            cleanupTm();
            cleanupY();
            cleanupDropdown();
        };
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
        if (location.state && location.state.journalIssue) {
            const { issueId, createdUserid, createdUsertype, ...editableFields } = location.state.journalIssue;
            setJournalIssue({
                ...editableFields,
                createdUserid: createdUserid || currentUser?.userId,
                createdUsertype: createdUsertype || (currentUser?.role === "ADMIN" ? 1 : 2),
                updatedUserid: currentUser?.userId,
                updatedUsertype: currentUser?.role === "ADMIN" ? 1 : 2,
            });
            if (location.state.journalIssue.filePath) {
                setFile(
                    location.state.journalIssue.filePath.startsWith("/")
                        ? `${BASE_URL}${location.state.journalIssue.filePath}`
                        : location.state.journalIssue.filePath
                );
            }
        } else if (currentUser) {
            setJournalIssue({
                journalsId: "",
                volumeNo: "",
                issueNo: "",
                fromMonth: "",
                toMonth: "",
                year: "",
                specialIssue: "",
                title: "",
                tableOfContents: "",
                specialIssueTitle: "",
                status: "",
                createdUserid: currentUser.userId,
                createdUsertype: currentUser.role === "ADMIN" ? 1 : 2,
                updatedUserid: currentUser.userId,
                updatedUsertype: currentUser.role === "ADMIN" ? 1 : 2,
            });
        }
    }, [location.state, currentUser]);

    useEffect(() => {
        if (journalIssue?.journalsId) {
            const selectedJournal = journals.find(
                (journal) => journal.journalId === journalIssue.journalsId
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
    }, [journalIssue?.journalsId, journals]);

    const filteredJournals = journals.filter(
        (journal) =>
            journal.journalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (journal.abbrevation &&
                journal.abbrevation.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleSelect = (journalId) => {
        const selectedJournal = journals.find((journal) => journal.journalId === journalId);
        if (selectedJournal) {
            setJournalIssue((prev) => ({ ...prev, journalsId: journalId }));
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
        setJournalIssue((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setRemoveFile(false);
    };

    const handleEditorChange = (content) => {
        setJournalIssue((prev) => ({ ...prev, tableOfContents: content }));
    };

    const handleRemoveFile = () => {
        setFile(null);
        setRemoveFile(true);
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
            const formData = new FormData();
            const journalIssueData = {
                journalsId: journalIssue.journalsId || "",
                volumeNo: journalIssue.volumeNo || "",
                issueNo: journalIssue.issueNo || "",
                fromMonth: journalIssue.fromMonth || "",
                toMonth: journalIssue.toMonth || "",
                year: journalIssue.year || "",
                specialIssue: journalIssue.specialIssue || "",
                title: journalIssue.title || "",
                tableOfContents: journalIssue.tableOfContents || "",
                specialIssueTitle: journalIssue.specialIssueTitle || "",
                status: journalIssue.status || "",
                createdUserid: journalIssue.createdUserid || currentUser.userId,
                createdUsertype: journalIssue.createdUsertype || (currentUser.role === "ADMIN" ? 1 : 2),
                updatedUserid: currentUser.userId,
                updatedUsertype: currentUser.role === "ADMIN" ? 1 : 2,
            };
            formData.append("journalIssue", new Blob([JSON.stringify(journalIssueData)], { type: "application/json" }));
            if (file && typeof file !== "string") {
                formData.append("file", file);
            }

            const config = { headers: { "Content-Type": "multipart/form-data" } };
            let response;
            const isEditing = location.state && location.state.journalIssue && location.state.journalIssue.issueId;
            if (isEditing) {
                response = await axios.put(
                    `${BASE_URL}/journal-issues/${location.state.journalIssue.issueId}`,
                    formData,
                    config
                );
            } else {
                response = await axios.post(`${BASE_URL}/journal-issues`, formData, config);
            }

            if (response && (response.status === 200 || response.status === 201)) {
                setModal({
                    show: true,
                    type: "success",
                    message: isEditing ? "Journal issue updated successfully!" : "Journal issue added successfully!",
                });
                setMessage(isEditing ? "Journal issue updated successfully!" : "Journal issue added successfully!");
                setTimeout(() => {
                    setModal({ show: false, type: "", message: "" });
                    navigate("/journalissues");
                    window.scrollTo(0, 0);
                }, 800);
            }
        } catch (error) {
            setModal({
                show: true,
                type: "error",
                message: `Failed to ${location.state && location.state.journalIssue ? "update" : "add"} journal issue: ${
                    error.message
                }`,
            });
            setMessage(
                `Failed to ${location.state && location.state.journalIssue ? "update" : "add"} journal issue: ${
                    error.message
                }`
            );
            console.error("Error saving journal issue:", error);
        } finally {
            setLoading(false);
        }
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
            <header className="fixed top-0 left-0 z-100 w-full bg-blue-900 text-white py-4 px-6 flex items-center justify-between z-40">
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
                        {location.state && location.state.journalIssue ? "Edit Journal Issue" : "Add New Journal Issue"}
                    </h1>
                    <p className="text-sm opacity-90 mt-1">
                        {location.state && location.state.journalIssue
                            ? "Update an existing journal issue."
                            : "Create a new journal issue for your dashboard."}
                    </p>
                </header>
                <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
                    <h2 className="text-xl font-semibold text-blue-600 mb-6">
                        {location.state && location.state.journalIssue ? "Edit Journal Issue" : "Add New Journal Issue"}
                    </h2>
                    {message && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{message}</div>
                    )}
                    {journalIssue && (
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
                                <label className="block text-sm font-medium text-blue-600 mb-1">Volume No *</label>
                                <input
                                    type="text"
                                    name="volumeNo"
                                    value={journalIssue.volumeNo}
                                    onChange={handleChange}
                                    placeholder="e.g., 5"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Issue No *</label>
                                <input
                                    type="text"
                                    name="issueNo"
                                    value={journalIssue.issueNo}
                                    onChange={handleChange}
                                    placeholder="e.g., 2"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    required
                                />
                            </div>
                            <div className="relative" ref={refFromMonth}>
                                <label className="block text-sm font-medium text-blue-600 mb-1">From Month *</label>
                                <select
                                    name="fromMonth"
                                    value={journalIssue.fromMonth}
                                    onChange={handleChange}
                                    onClick={() => setShowdownfm(!showdownfm)}
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm appearance-none"
                                    required
                                >
                                    <option value="">Select Month</option>
                                    {[
                                        "January",
                                        "February",
                                        "March",
                                        "April",
                                        "May",
                                        "June",
                                        "July",
                                        "August",
                                        "September",
                                        "October",
                                        "November",
                                        "December",
                                    ].map((month) => (
                                        <option key={month} value={month}>
                                            {month}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg
                                        className={`fill-current h-5 w-5 mt-2 ${
                                            showdownfm ? "rotate-180" : "rotate-0"
                                        }`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="relative" ref={refToMonth}>
                                <label className="block text-sm font-medium text-blue-600 mb-1">To Month *</label>
                                <select
                                    name="toMonth"
                                    value={journalIssue.toMonth}
                                    onChange={handleChange}
                                    onClick={() => setShowdowntm(!showdowntm)}
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm appearance-none"
                                    required
                                >
                                    <option value="">Select Month</option>
                                    {[
                                        "January",
                                        "February",
                                        "March",
                                        "April",
                                        "May",
                                        "June",
                                        "July",
                                        "August",
                                        "September",
                                        "October",
                                        "November",
                                        "December",
                                    ].map((month) => (
                                        <option key={month} value={month}>
                                            {month}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg
                                        className={`fill-current h-5 w-5 mt-2 ${
                                            showdowntm ? "rotate-180" : "rotate-0"
                                        }`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="relative" ref={refYear}>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Year *</label>
                                <select
                                    name="year"
                                    value={journalIssue.year}
                                    onChange={handleChange}
                                    onClick={() => setShowdowny(!showdowny)}
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm appearance-none"
                                    required
                                >
                                    <option value="">Select Year</option>
                                    {Array.from({ length: 21 }, (_, index) => 2010 + index).map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg
                                        className={`fill-current h-5 w-5 mt-2 ${
                                            showdowny ? "rotate-180" : "rotate-0"
                                        }`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Special Issue</label>
                                <input
                                    type="text"
                                    name="specialIssue"
                                    value={journalIssue.specialIssue}
                                    onChange={handleChange}
                                    placeholder="e.g., Yes/No"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={journalIssue.title}
                                    onChange={handleChange}
                                    placeholder="e.g., Special Edition on AI"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">
                                    Special Issue Title
                                </label>
                                <input
                                    type="text"
                                    name="specialIssueTitle"
                                    value={journalIssue.specialIssueTitle}
                                    onChange={handleChange}
                                    placeholder="e.g., AI and Future"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-blue-600 mb-1">
                                    Table of Contents
                                </label>
                                <Editor
                                    apiKey="nxdubw1uzkbvetym5t6krqxoi3rcxm1nz8xndt774kqqaji4"
                                    onInit={(evt, editor) => (editorRef.current = editor)}
                                    value={journalIssue.tableOfContents}
                                    init={{
                                        height: 300,
                                        menubar: false,
                                        plugins:
                                            "advlist autolink lists link image charmap perceptual anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
                                        toolbar:
                                            "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
                                    }}
                                    onEditorChange={handleEditorChange}
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-blue-600 mb-1">File (PDF)</label>
                                <input
                                    type="file"
                                    name="file"
                                    onChange={handleFileChange}
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    accept=".pdf"
                                />
                                {location.state && location.state.journalIssue && file && !removeFile && (
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">Current file:</p>
                                        <div className="relative inline-block">
                                            <a
                                                href={typeof file === "string" ? file : URL.createObjectURL(file)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 underline"
                                            >
                                                {getFileDisplayName(file)}
                                            </a>
                                            <button
                                                type="button"
                                                onClick={handleRemoveFile}
                                                className="absolute -top-2 -left-1 bg-red-500 text-white px-2 py-1 text-xs rounded-full"
                                            >
                                                ✖
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-end gap-4 mt-6 col-span-2">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors shadow-md"
                                    disabled={loading || !currentUser}
                                >
                                    {loading
                                        ? "Saving..."
                                        : location.state && location.state.journalIssue
                                        ? "Update"
                                        : "Save"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        navigate("/journalissues");
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
                            className={`p-6 rounded-lg shadow-lg ${
                                modal.type === "success" ? "bg-green-100" : "bg-red-100"
                            }`}
                        >
                            <p
                                className={`text-lg font-semibold ${
                                    modal.type === "success" ? "text-green-700" : "text-red-700"
                                }`}
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

export default AddNewJournalIssues;