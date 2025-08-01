// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../sidebar";

// const AddNewEditorial = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const refEditorType = useRef(null);

//     const [modal, setModal] = useState({ show: false, type: "", message: "" });
//     const [editorialMember, setEditorialMember] = useState(null);
//     const [file, setFile] = useState(null);
//     const [journals, setJournals] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");
//     const [removeFile, setRemoveFile] = useState(false);
//     const [showdownEditorType, setShowdownEditorType] = useState(false);

//     const BASE_URL = "https://iassrd.com:8081/api/v1";

//     // Get user data from localStorage
//     const user = JSON.parse(localStorage.getItem("user")) || {};
//     const userId = user.userId || null;

//     // Handle outside click to close dropdown
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
//         const cleanup = handleOutsideClick(refEditorType, () => setShowdownEditorType(false));
//         return cleanup;
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

//     // Load editorial member data for editing or initialize for adding
//     useEffect(() => {
//         if (location.state && location.state.editorialMember) {
//             const { memberId, ...editableFields } = location.state.editorialMember;
//             setEditorialMember(editableFields);
//             if (location.state.editorialMember.profilePhoto) {
//                 setFile(
//                     location.state.editorialMember.profilePhoto.startsWith("/")
//                         ? `${BASE_URL}${location.state.editorialMember.profilePhoto}`
//                         : location.state.editorialMember.profilePhoto
//                 );
//             }
//         } else {
//             setEditorialMember({
//                 journalId: "",
//                 prefix: "",
//                 editorName: "",
//                 editorAffiliation: "",
//                 editorEmail: "",
//                 editorType: "",
//                 profileLink: "",
//                 institutionalProfile: "",
//                 googleScholarProfile: "",
//                 orcidLink: "",
//                 publonLink: "",
//                 scopusAuthorId: "",
//                 researchGateProfile: "",
//                 status: "",
//                 linkedin: "",
//                 createdUserId: userId,
//                 createdUserType: 1,
//                 updatedUserId: userId,
//                 updatedUserType: 1,
//             });
//         }
//     }, [location.state, userId]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEditorialMember((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//         setRemoveFile(false);
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

//             // Serialize the editorialMember object to a JSON string and append it as the 'editorialBoard' part
//             const editorialMemberData = {
//                 journalId: editorialMember.journalId || "",
//                 prefix: editorialMember.prefix || "",
//                 editorName: editorialMember.editorName || "",
//                 editorAffiliation: editorialMember.editorAffiliation || "",
//                 editorEmail: editorialMember.editorEmail || "",
//                 editorType: editorialMember.editorType || "",
//                 profileLink: editorialMember.profileLink || "",
//                 institutionalProfile: editorialMember.institutionalProfile || "",
//                 googleScholarProfile: editorialMember.googleScholarProfile || "",
//                 orcidLink: editorialMember.orcidLink || "",
//                 publonLink: editorialMember.publonLink || "",
//                 scopusAuthorId: editorialMember.scopusAuthorId || "",
//                 researchGateProfile: editorialMember.researchGateProfile || "",
//                 status: editorialMember.status || "",
//                 linkedin: editorialMember.linkedin || "",
//                 createdUserId: userId,
//                 createdUserType: editorialMember.createdUserType || 1,
//                 updatedUserId: userId,
//                 updatedUserType: editorialMember.updatedUserType || 1,
//             };
//             formData.append("editorialBoard", new Blob([JSON.stringify(editorialMemberData)], { type: "application/json" }));

//             // Append the file if it exists and is a file (not a URL string)
//             if (file && typeof file !== "string") {
//                 formData.append("profilePhotoFile", file);
//             }

//             const config = { headers: { "Content-Type": "multipart/form-data" } };
//             let response;
//             const isEditing = location.state && location.state.editorialMember && location.state.editorialMember.memberId;
//             if (isEditing) {
//                 response = await axios.put(
//                     `${BASE_URL}/editorial-board/${location.state.editorialMember.memberId}`,
//                     formData,
//                     config
//                 );
//             } else {
//                 response = await axios.post(`${BASE_URL}/editorial-board`, formData, config);
//             }

//             if (response && (response.status === 200 || response.status === 201)) {
//                 setModal({
//                     show: true,
//                     type: "success",
//                     message: isEditing ? "Editorial board member updated successfully!" : "Editorial board member added successfully!",
//                 });
//                 setMessage(isEditing ? "Editorial board member updated successfully!" : "Editorial board member added successfully!");
//                 setTimeout(() => {
//                     setModal({ show: false, type: "", message: "" });
//                     navigate("/editorial");
//                     window.scrollTo(0, 0);
//                 }, 800);
//             }
//         } catch (error) {
//             setModal({
//                 show: true,
//                 type: "error",
//                 message: `Failed to ${location.state && location.state.editorialMember ? "update" : "add"} editorial board member: ${error.message}`,
//             });
//             setMessage(`Failed to ${location.state && location.state.editorialMember ? "update" : "add"} editorial board member: ${error.message}`);
//             console.error("Error saving editorial board member:", error);
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
//                         {location.state && location.state.editorialMember ? "Edit Editorial Board Member" : "Add New Editorial Board Member"}
//                     </h1>
//                     <p className="text-sm opacity-90 mt-1">
//                         {location.state && location.state.editorialMember
//                             ? "Update an existing editorial board member."
//                             : "Create a new editorial board member for your dashboard."}
//                     </p>
//                 </header>

//                 {/* Main Content */}
//                 <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
//                     <h2 className="text-xl font-semibold text-blue-600 mb-6">
//                         {location.state && location.state.editorialMember ? "Edit Editorial Board Member" : "Add New Editorial Board Member"}
//                     </h2>

//                     {message && (
//                         <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{message}</div>
//                     )}

//                     {editorialMember && (
//                         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {/* Journal */}
//                             <div className="relative">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Journal *</label>
//                                 <select
//                                     name="journalId"
//                                     value={editorialMember.journalId}
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

//                             {/* Prefix */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Prefix *</label>
//                                 <input
//                                     type="text"
//                                     name="prefix"
//                                     value={editorialMember.prefix}
//                                     onChange={handleChange}
//                                     placeholder="e.g., Dr."
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>

//                             {/* Editor Name */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Editor Name *</label>
//                                 <input
//                                     type="text"
//                                     name="editorName"
//                                     value={editorialMember.editorName}
//                                     onChange={handleChange}
//                                     placeholder="e.g., John Doe"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>

//                             {/* Editor Affiliation */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Affiliation *</label>
//                                 <input
//                                     type="text"
//                                     name="editorAffiliation"
//                                     value={editorialMember.editorAffiliation}
//                                     onChange={handleChange}
//                                     placeholder="e.g., University of XYZ"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>

//                             {/* Editor Email */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Email</label>
//                                 <input
//                                     type="email"
//                                     name="editorEmail"
//                                     value={editorialMember.editorEmail}
//                                     onChange={handleChange}
//                                     placeholder="e.g., john.doe@example.com"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Editor Type */}
//                             <div className="relative" ref={refEditorType}>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Editor Type *</label>
//                                 <select
//                                     name="editorType"
//                                     value={editorialMember.editorType}
//                                     onChange={handleChange}
//                                     onClick={() => setShowdownEditorType(!showdownEditorType)}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm appearance-none"
//                                     required
//                                 >
//                                     <option value="">Select Editor Type</option>
//                                     {["Editor-in-Chief", "Associate Editor", "Guest Editor", "Reviewer"].map((type) => (
//                                         <option key={type} value={type}>
//                                             {type}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                                     <svg
//                                         className={`fill-current h-5 w-5 mt-2 ${showdownEditorType ? "rotate-180" : "rotate-0"}`}
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 20 20"
//                                     >
//                                         <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
//                                     </svg>
//                                 </div>
//                             </div>

//                             {/* Profile Link */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Profile Link</label>
//                                 <input
//                                     type="url"
//                                     name="profileLink"
//                                     value={editorialMember.profileLink}
//                                     onChange={handleChange}
//                                     placeholder="e.g., https://example.com/profile"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Institutional Profile */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Institutional Profile</label>
//                                 <input
//                                     type="url"
//                                     name="institutionalProfile"
//                                     value={editorialMember.institutionalProfile}
//                                     onChange={handleChange}
//                                     placeholder="e.g., https://university.edu/profile"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Google Scholar Profile */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Google Scholar Profile</label>
//                                 <input
//                                     type="url"
//                                     name="googleScholarProfile"
//                                     value={editorialMember.googleScholarProfile}
//                                     onChange={handleChange}
//                                     placeholder="e.g., https://scholar.google.com/citations?user=xxx"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* ORCID Link */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">ORCID Link</label>
//                                 <input
//                                     type="url"
//                                     name="orcidLink"
//                                     value={editorialMember.orcidLink}
//                                     onChange={handleChange}
//                                     placeholder="e.g., https://orcid.org/xxx"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Publon Link */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Publon Link</label>
//                                 <input
//                                     type="url"
//                                     name="publonLink"
//                                     value={editorialMember.publonLink}
//                                     onChange={handleChange}
//                                     placeholder="e.g., https://publons.com/researcher/xxx"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Scopus Author ID */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Scopus Author ID</label>
//                                 <input
//                                     type="text"
//                                     name="scopusAuthorId"
//                                     value={editorialMember.scopusAuthorId}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 12345678900"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* ResearchGate Profile */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">ResearchGate Profile</label>
//                                 <input
//                                     type="url"
//                                     name="researchGateProfile"
//                                     value={editorialMember.researchGateProfile}
//                                     onChange={handleChange}
//                                     placeholder="e.g., https://researchgate.net/profile/xxx"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* LinkedIn */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">LinkedIn</label>
//                                 <input
//                                     type="url"
//                                     name="linkedin"
//                                     value={editorialMember.linkedin}
//                                     onChange={handleChange}
//                                     placeholder="e.g., https://linkedin.com/in/xxx"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Status */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Status *</label>
//                                 <input
//                                     type="number"
//                                     name="status"
//                                     value={editorialMember.status}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 1"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>

//                             {/* File Upload */}
//                             <div className="col-span-2">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Profile Photo</label>
//                                 <input
//                                     type="file"
//                                     name="profilePhotoFile"
//                                     onChange={handleFileChange}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     accept="image/*"
//                                 />
//                                 {location.state && location.state.editorialMember && file && !removeFile && (
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
//                                         : location.state && location.state.editorialMember
//                                         ? "Update"
//                                         : "Save"}
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => {
//                                         navigate("/editorial");
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

// export default AddNewEditorial;



// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../sidebar";

// const AddNewEditorial = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const refEditorType = useRef(null);
//     const dropdownRef = useRef(null);
//     const searchInputRef = useRef(null);

//     const [modal, setModal] = useState({ show: false, type: "", message: "" });
//     const [editorialMember, setEditorialMember] = useState(null);
//     const [file, setFile] = useState(null);
//     const [journals, setJournals] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");
//     const [removeFile, setRemoveFile] = useState(false);
//     const [showdownEditorType, setShowdownEditorType] = useState(false);
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
//         const cleanupEditorType = handleOutsideClick(refEditorType, () => setShowdownEditorType(false));
//         const cleanupDropdown = handleOutsideClick(dropdownRef, () => setShowDropdown(false));
//         return () => {
//             cleanupEditorType();
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
//         if (location.state && location.state.editorialMember) {
//             const { memberId, ...editableFields } = location.state.editorialMember;
//             setEditorialMember(editableFields);
//             if (location.state.editorialMember.profilePhoto) {
//                 setFile(
//                     location.state.editorialMember.profilePhoto.startsWith("/")
//                         ? `${BASE_URL}${location.state.editorialMember.profilePhoto}`
//                         : location.state.editorialMember.profilePhoto
//                 );
//             }
//         } else {
//             setEditorialMember({
//                 journalId: "",
//                 prefix: "",
//                 editorName: "",
//                 editorAffiliation: "",
//                 editorEmail: "",
//                 editorType: "",
//                 profileLink: "",
//                 institutionalProfile: "",
//                 googleScholarProfile: "",
//                 orcidLink: "",
//                 publonLink: "",
//                 scopusAuthorId: "",
//                 researchGateProfile: "",
//                 status: "",
//                 linkedin: "",
//                 createdUserId: userId,
//                 createdUserType: 1,
//                 updatedUserId: userId,
//                 updatedUserType: 1,
//             });
//         }
//     }, [location.state, userId]);

//     useEffect(() => {
//         if (editorialMember?.journalId) {
//             const selectedJournal = journals.find(
//                 (journal) => journal.journalId === editorialMember.journalId
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
//     }, [editorialMember?.journalId, journals]);

//     const filteredJournals = journals.filter(
//         (journal) =>
//             journal.journalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             (journal.abbrevation &&
//                 journal.abbrevation.toLowerCase().includes(searchTerm.toLowerCase()))
//     );

//     const handleSelect = (journalId) => {
//         const selectedJournal = journals.find((journal) => journal.journalId === journalId);
//         if (selectedJournal) {
//             setEditorialMember((prev) => ({ ...prev, journalId }));
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
//         setEditorialMember((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//         setRemoveFile(false);
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
//             const editorialMemberData = {
//                 journalId: editorialMember.journalId || "",
//                 prefix: editorialMember.prefix || "",
//                 editorName: editorialMember.editorName || "",
//                 editorAffiliation: editorialMember.editorAffiliation || "",
//                 editorEmail: editorialMember.editorEmail || "",
//                 editorType: editorialMember.editorType || "",
//                 profileLink: editorialMember.profileLink || "",
//                 institutionalProfile: editorialMember.institutionalProfile || "",
//                 googleScholarProfile: editorialMember.googleScholarProfile || "",
//                 orcidLink: editorialMember.orcidLink || "",
//                 publonLink: editorialMember.publonLink || "",
//                 scopusAuthorId: editorialMember.scopusAuthorId || "",
//                 researchGateProfile: editorialMember.researchGateProfile || "",
//                 status: editorialMember.status || "",
//                 linkedin: editorialMember.linkedin || "",
//                 createdUserId: userId,
//                 createdUserType: editorialMember.createdUserType || 1,
//                 updatedUserId: userId,
//                 updatedUserType: editorialMember.updatedUserType || 1,
//             };
//             formData.append("editorialBoard", new Blob([JSON.stringify(editorialMemberData)], { type: "application/json" }));
//             if (file && typeof file !== "string") {
//                 formData.append("profilePhotoFile", file);
//             }

//             const config = { headers: { "Content-Type": "multipart/form-data" } };
//             let response;
//             const isEditing = location.state && location.state.editorialMember && location.state.editorialMember.memberId;
//             if (isEditing) {
//                 response = await axios.put(
//                     `${BASE_URL}/editorial-board/${location.state.editorialMember.memberId}`,
//                     formData,
//                     config
//                 );
//             } else {
//                 response = await axios.post(`${BASE_URL}/editorial-board`, formData, config);
//             }

//             if (response && (response.status === 200 || response.status === 201)) {
//                 setModal({
//                     show: true,
//                     type: "success",
//                     message: isEditing ? "Editorial board member updated successfully!" : "Editorial board member added successfully!",
//                 });
//                 setMessage(isEditing ? "Editorial board member updated successfully!" : "Editorial board member added successfully!");
//                 setTimeout(() => {
//                     setModal({ show: false, type: "", message: "" });
//                     navigate("/editorial");
//                     window.scrollTo(0, 0);
//                 }, 800);
//             }
//         } catch (error) {
//             setModal({
//                 show: true,
//                 type: "error",
//                 message: `Failed to ${location.state && location.state.editorialMember ? "update" : "add"} editorial board member: ${error.message}`,
//             });
//             setMessage(`Failed to ${location.state && location.state.editorialMember ? "update" : "add"} editorial board member: ${error.message}`);
//             console.error("Error saving editorial board member:", error);
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
//             <div className="w-screen p-6 h-screen pt-20 overflow-y-auto">
//                 <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-6 shadow-md">
//                     <h1 className="text-2xl font-bold">
//                         {location.state && location.state.editorialMember ? "Edit Editorial Board Member" : "Add New Editorial Board Member"}
//                     </h1>
//                     <p className="text-sm opacity-90 mt-1">
//                         {location.state && location.state.editorialMember
//                             ? "Update an existing editorial board member."
//                             : "Create a new editorial board member for your dashboard."}
//                     </p>
//                 </header>
//                 <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
//                     <h2 className="text-xl font-semibold text-blue-600 mb-6">
//                         {location.state && location.state.editorialMember ? "Edit Editorial Board Member" : "Add New Editorial Board Member"}
//                     </h2>
//                     {message && (
//                         <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{message}</div>
//                     )}
//                     {editorialMember && (
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
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Prefix *</label>
//                                 <input
//                                     type="text"
//                                     name="prefix"
//                                     value={editorialMember.prefix}
//                                     onChange={handleChange}
//                                     placeholder="e.g., Dr."
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Editor Name *</label>
//                                 <input
//                                     type="text"
//                                     name="editorName"
//                                     value={editorialMember.editorName}
//                                     onChange={handleChange}
//                                     placeholder="e.g., John Doe"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Affiliation *</label>
//                                 <input
//                                     type="text"
//                                     name="editorAffiliation"
//                                     value={editorialMember.editorAffiliation}
//                                     onChange={handleChange}
//                                     placeholder="e.g., University of XYZ"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Email</label>
//                                 <input
//                                     type="email"
//                                     name="editorEmail"
//                                     value={editorialMember.editorEmail}
//                                     onChange={handleChange}
//                                     placeholder="e.g., john.doe@example.com"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>
//                             <div className="relative" ref={refEditorType}>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Editor Type *</label>
//                                 <select
//                                     name="editorType"
//                                     value={editorialMember.editorType}
//                                     onChange={handleChange}
//                                     onClick={() => setShowdownEditorType(!showdownEditorType)}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm appearance-none"
//                                     required
//                                 >
//                                     <option value="">Select Editor Type</option>
//                                     {["Editor-in-Chief", "Associate Editor", "Guest Editor", "Reviewer"].map((type) => (
//                                         <option key={type} value={type}>
//                                             {type}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                                     <svg
//                                         className={`fill-current h-5 w-5 mt-2 ${showdownEditorType ? "rotate-180" : "rotate-0"}`}
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 20 20"
//                                     >
//                                         <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
//                                     </svg>
//                                 </div>
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Profile Link</label>
//                                 <input
//                                     type="url"
//                                     name="profileLink"
//                                     value={editorialMember.profileLink}
//                                     onChange={handleChange}
//                                     placeholder="e.g., https://example.com/profile"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Institutional Profile</label>
//                                 <input
//                                     type="url"
//                                     name="institutionalProfile"
//                                     value={editorialMember.institutionalProfile}
//                                     onChange={handleChange}
//                                     placeholder="e.g., https://university.edu/profile"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Google Scholar Profile</label>
//                                 <input
//                                     type="url"
//                                     name="googleScholarProfile"
//                                     value={editorialMember.googleScholarProfile}
//                                     onChange={handleChange}
//                                     placeholder="e.g., https://scholar.google.com/citations?user=xxx"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">ORCID Link</label>
//                                 <input
//                                     type="url"
//                                     name="orcidLink"
//                                     value={editorialMember.orcidLink}
//                                     onChange={handleChange}
//                                     placeholder="e.g., https://orcid.org/xxx"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Publon Link</label>
//                                 <input
//                                     type="url"
//                                     name="publonLink"
//                                     value={editorialMember.publonLink}
//                                     onChange={handleChange}
//                                     placeholder="e.g., https://publons.com/researcher/xxx"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Scopus Author ID</label>
//                                 <input
//                                     type="text"
//                                     name="scopusAuthorId"
//                                     value={editorialMember.scopusAuthorId}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 12345678900"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">ResearchGate Profile</label>
//                                 <input
//                                     type="url"
//                                     name="researchGateProfile"
//                                     value={editorialMember.researchGateProfile}
//                                     onChange={handleChange}
//                                     placeholder="e.g., https://researchgate.net/profile/xxx"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">LinkedIn</label>
//                                 <input
//                                     type="url"
//                                     name="linkedin"
//                                     value={editorialMember.linkedin}
//                                     onChange={handleChange}
//                                     placeholder="e.g., https://linkedin.com/in/xxx"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>
//                             {/* <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Status *</label>
//                                 <input
//                                     type="number"
//                                     name="status"
//                                     value={editorialMember.status}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 1"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div> */}
//                             <div className="col-span-2">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Profile Photo</label>
//                                 <input
//                                     type="file"
//                                     name="profilePhotoFile"
//                                     onChange={handleFileChange}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     accept="image/*"
//                                 />
//                                 {location.state && location.state.editorialMember && file && !removeFile && (
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
//                                         : location.state && location.state.editorialMember
//                                         ? "Update"
//                                         : "Save"}
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => {
//                                         navigate("/editorial");
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

// export default AddNewEditorial;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Sidebar from "../sidebar";

const AddNewEditorial = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const refEditorType = useRef(null);
    const dropdownRef = useRef(null);
    const searchInputRef = useRef(null);

    const [modal, setModal] = useState({ show: false, type: "", message: "" });
    const [editorialMember, setEditorialMember] = useState(null);
    const [file, setFile] = useState(null);
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [removeFile, setRemoveFile] = useState(false);
    const [showdownEditorType, setShowdownEditorType] = useState(false);
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
        const cleanupEditorType = handleOutsideClick(refEditorType, () => setShowdownEditorType(false));
        const cleanupDropdown = handleOutsideClick(dropdownRef, () => setShowDropdown(false));
        return () => {
            cleanupEditorType();
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
        if (location.state && location.state.editorialMember) {
            const { memberId, createdUserId, createdUserType, ...editableFields } = location.state.editorialMember;
            setEditorialMember({
                ...editableFields,
                createdUserId: createdUserId || currentUser?.userId,
                createdUserType: createdUserType || (currentUser?.role === "ADMIN" ? 1 : 2),
                updatedUserId: currentUser?.userId,
                updatedUserType: currentUser?.role === "ADMIN" ? 1 : 2,
            });
            if (location.state.editorialMember.profilePhoto) {
                setFile(
                    location.state.editorialMember.profilePhoto.startsWith("/")
                        ? `${BASE_URL}${location.state.editorialMember.profilePhoto}`
                        : location.state.editorialMember.profilePhoto
                );
            }
        } else if (currentUser) {
            setEditorialMember({
                journalId: "",
                prefix: "",
                editorName: "",
                editorAffiliation: "",
                editorEmail: "",
                editorType: "",
                profileLink: "",
                institutionalProfile: "",
                googleScholarProfile: "",
                orcidLink: "",
                publonLink: "",
                scopusAuthorId: "",
                researchGateProfile: "",
                status: "",
                linkedin: "",
                createdUserId: currentUser.userId,
                createdUserType: currentUser.role === "ADMIN" ? 1 : 2,
                updatedUserId: currentUser.userId,
                updatedUserType: currentUser.role === "ADMIN" ? 1 : 2,
            });
        }
    }, [location.state, currentUser]);

    useEffect(() => {
        if (editorialMember?.journalId) {
            const selectedJournal = journals.find(
                (journal) => journal.journalId === editorialMember.journalId
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
    }, [editorialMember?.journalId, journals]);

    const filteredJournals = journals.filter(
        (journal) =>
            journal.journalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (journal.abbrevation &&
                journal.abbrevation.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleSelect = (journalId) => {
        const selectedJournal = journals.find((journal) => journal.journalId === journalId);
        if (selectedJournal) {
            setEditorialMember((prev) => ({ ...prev, journalId }));
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
        setEditorialMember((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setRemoveFile(false);
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
            const editorialMemberData = {
                journalId: editorialMember.journalId || "",
                prefix: editorialMember.prefix || "",
                editorName: editorialMember.editorName || "",
                editorAffiliation: editorialMember.editorAffiliation || "",
                editorEmail: editorialMember.editorEmail || "",
                editorType: editorialMember.editorType || "",
                profileLink: editorialMember.profileLink || "",
                institutionalProfile: editorialMember.institutionalProfile || "",
                googleScholarProfile: editorialMember.googleScholarProfile || "",
                orcidLink: editorialMember.orcidLink || "",
                publonLink: editorialMember.publonLink || "",
                scopusAuthorId: editorialMember.scopusAuthorId || "",
                researchGateProfile: editorialMember.researchGateProfile || "",
                status: editorialMember.status || "",
                linkedin: editorialMember.linkedin || "",
                createdUserId: editorialMember.createdUserId || currentUser.userId,
                createdUserType: editorialMember.createdUserType || (currentUser.role === "ADMIN" ? 1 : 2),
                updatedUserId: currentUser.userId,
                updatedUserType: currentUser.role === "ADMIN" ? 1 : 2,
            };
            formData.append("editorialBoard", new Blob([JSON.stringify(editorialMemberData)], { type: "application/json" }));
            if (file && typeof file !== "string") {
                formData.append("profilePhotoFile", file);
            }

            const config = { headers: { "Content-Type": "multipart/form-data" } };
            let response;
            const isEditing = location.state && location.state.editorialMember && location.state.editorialMember.memberId;
            if (isEditing) {
                response = await axios.put(
                    `${BASE_URL}/editorial-board/${location.state.editorialMember.memberId}`,
                    formData,
                    config
                );
            } else {
                response = await axios.post(`${BASE_URL}/editorial-board`, formData, config);
            }

            if (response && (response.status === 200 || response.status === 201)) {
                setModal({
                    show: true,
                    type: "success",
                    message: isEditing ? "Editorial board member updated successfully!" : "Editorial board member added successfully!",
                });
                setMessage(isEditing ? "Editorial board member updated successfully!" : "Editorial board member added successfully!");
                setTimeout(() => {
                    setModal({ show: false, type: "", message: "" });
                    navigate("/editorial");
                    window.scrollTo(0, 0);
                }, 800);
            }
        } catch (error) {
            setModal({
                show: true,
                type: "error",
                message: `Failed to ${isEditing ? "update" : "add"} editorial board member: ${error.message}`,
            });
            setMessage(`Failed to ${isEditing ? "update" : "add"} editorial board member: ${error.message}`);
            console.error("Error saving editorial board member:", error);
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
                        {location.state && location.state.editorialMember ? "Edit Editorial Board Member" : "Add New Editorial Board Member"}
                    </h1>
                    <p className="text-sm opacity-90 mt-1">
                        {location.state && location.state.editorialMember
                            ? "Update an existing editorial board member."
                            : "Create a new editorial board member for your dashboard."}
                    </p>
                </header>
                <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
                    <h2 className="text-xl font-semibold text-blue-600 mb-6">
                        {location.state && location.state.editorialMember ? "Edit Editorial Board Member" : "Add New Editorial Board Member"}
                    </h2>
                    {message && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{message}</div>
                    )}
                    {editorialMember && (
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
                                <label className="block text-sm font-medium text-blue-600 mb-1">Prefix</label>
                                <input
                                    type="text"
                                    name="prefix"
                                    value={editorialMember.prefix}
                                    onChange={handleChange}
                                    placeholder="e.g., Dr."
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Editor Name *</label>
                                <input
                                    type="text"
                                    name="editorName"
                                    value={editorialMember.editorName}
                                    onChange={handleChange}
                                    placeholder="e.g., John Doe"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Affiliation *</label>
                                <input
                                    type="text"
                                    name="editorAffiliation"
                                    value={editorialMember.editorAffiliation}
                                    onChange={handleChange}
                                    placeholder="e.g., University of XYZ"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="editorEmail"
                                    value={editorialMember.editorEmail}
                                    onChange={handleChange}
                                    placeholder="e.g., john.doe@example.com"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>
                            <div className="relative" ref={refEditorType}>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Editor Type *</label>
                                <select
                                    name="editorType"
                                    value={editorialMember.editorType}
                                    onChange={handleChange}
                                    onClick={() => setShowdownEditorType(!showdownEditorType)}
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm appearance-none"
                                    required
                                >
                                    <option value="">Select Editor Type</option>
                                    {["Editor-in-Chief", "Associate Editor", "Guest Editor", "Reviewer"].map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg
                                        className={`fill-current h-5 w-5 mt-2 ${showdownEditorType ? "rotate-180" : "rotate-0"}`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Profile Link</label>
                                <input
                                    type="url"
                                    name="profileLink"
                                    value={editorialMember.profileLink}
                                    onChange={handleChange}
                                    placeholder="e.g., https://example.com/profile"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Institutional Profile</label>
                                <input
                                    type="url"
                                    name="institutionalProfile"
                                    value={editorialMember.institutionalProfile}
                                    onChange={handleChange}
                                    placeholder="e.g., https://university.edu/profile"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Google Scholar Profile</label>
                                <input
                                    type="url"
                                    name="googleScholarProfile"
                                    value={editorialMember.googleScholarProfile}
                                    onChange={handleChange}
                                    placeholder="e.g., https://scholar.google.com/citations?user=xxx"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">ORCID Link</label>
                                <input
                                    type="url"
                                    name="orcidLink"
                                    value={editorialMember.orcidLink}
                                    onChange={handleChange}
                                    placeholder="e.g., https://orcid.org/xxx"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Publon Link</label>
                                <input
                                    type="url"
                                    name="publonLink"
                                    value={editorialMember.publonLink}
                                    onChange={handleChange}
                                    placeholder="e.g., https://publons.com/researcher/xxx"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Scopus Author ID</label>
                                <input
                                    type="text"
                                    name="scopusAuthorId"
                                    value={editorialMember.scopusAuthorId}
                                    onChange={handleChange}
                                    placeholder="e.g., 12345678900"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">ResearchGate Profile</label>
                                <input
                                    type="url"
                                    name="researchGateProfile"
                                    value={editorialMember.researchGateProfile}
                                    onChange={handleChange}
                                    placeholder="e.g., https://researchgate.net/profile/xxx"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">LinkedIn</label>
                                <input
                                    type="url"
                                    name="linkedin"
                                    value={editorialMember.linkedin}
                                    onChange={handleChange}
                                    placeholder="e.g., https://linkedin.com/in/xxx"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>
                            {/* <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Status *</label>
                                <input
                                    type="number"
                                    name="status"
                                    value={editorialMember.status}
                                    onChange={handleChange}
                                    placeholder="e.g., 1"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    required
                                />
                            </div> */}
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-blue-600 mb-1">Profile Photo</label>
                                <input
                                    type="file"
                                    name="profilePhotoFile"
                                    onChange={handleFileChange}
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    accept="image/*"
                                />
                                {location.state && location.state.editorialMember && file && !removeFile && (
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
                                    className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors shadow-md ${loading || !currentUser ? "opacity-50 cursor-not-allowed" : ""}`}
                                    disabled={loading || !currentUser}
                                >
                                    {loading
                                        ? "Saving..."
                                        : location.state && location.state.editorialMember
                                        ? "Update"
                                        : "Save"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        navigate("/editorial");
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

export default AddNewEditorial;
