// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { Editor } from "@tinymce/tinymce-react";
// import Sidebar from "../sidebar";

// const JournalsAddNew = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const refStartMonth = useRef(null);
//     const refYear = useRef(null);

//     const [modal, setModal] = useState({ show: false, type: "", message: "" });
//     const [journal, setJournal] = useState(null);
//     const [coverPage, setCoverPage] = useState(null);
//     const [disciplines, setDisciplines] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");
//     const [removeImage, setRemoveImage] = useState(false);
//     const [showdownsm, setShowdownsm] = useState(false);
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
//         handleOutsideClick(refStartMonth, () => setShowdownsm(false));
//         handleOutsideClick(refYear, () => setShowdowny(false));
//     }, []);

//     // Fetch disciplines
//     useEffect(() => {
//         axios
//             .get(`${BASE_URL}/disciplines`)
//             .then((response) => {
//                 if (response.data.success) {
//                     setDisciplines(response.data.data);
//                 } else {
//                     setModal({
//                         show: true,
//                         type: "error",
//                         message: `Failed to fetch disciplines: ${response.data.message}`,
//                     });
//                 }
//             })
//             .catch((error) => {
//                 setModal({
//                     show: true,
//                     type: "error",
//                     message: `Error fetching disciplines: ${error.message}`,
//                 });
//             });
//     }, []);

//     // Load journal data for editing or initialize for adding
//     useEffect(() => {
//         if (location.state && location.state.journal) {
//             const { journalId, ...editableFields } = location.state.journal;
//             setJournal(editableFields);
//             if (location.state.journal.coverPage) {
//                 setCoverPage(
//                     location.state.journal.coverPage.startsWith("/")
//                         ? `${BASE_URL}${location.state.journal.coverPage}`
//                         : location.state.journal.coverPage
//                 );
//             }
//         } else {
//             setJournal({
//                 disciplineId: "",
//                 journalKey: "",
//                 journalName: "",
//                 abbreviation: "",
//                 topic: "",
//                 issnOnline: "",
//                 issnPrint: "",
//                 googleScholar: "",
//                 doi: "",
//                 publicationFrequency: "",
//                 subjectArea: "",
//                 about: "",
//                 aimandscope: "",
//                 indexing: "",
//                 coden: "",
//                 email: "",
//                 startMonth: "",
//                 startYear: "",
//                 coverPage: "",
//                 subPrice: "",
//                 createdUserId: userId,
//                 updatedUserId: userId,
//             });
//         }
//     }, [location.state, userId]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setJournal((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleFileChange = (e) => {
//         setCoverPage(e.target.files[0]);
//         setRemoveImage(false);
//     };

//     const handleEditorChange = (field) => (content) => {
//         setJournal((prev) => ({ ...prev, [field]: content }));
//     };

//     const handleRemoveImage = () => {
//         setCoverPage(null);
//         setRemoveImage(true);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage("");
//         setModal({ show: false, type: "", message: "" });

//         // Basic validation
//         if (!journal.disciplineId || !journal.journalKey || !journal.journalName || !journal.publicationFrequency || !journal.startMonth || !journal.startYear) {
//             setModal({
//                 show: true,
//                 type: "error",
//                 message: "Please fill in all required fields.",
//             });
//             setLoading(false);
//             return;
//         }

//         try {
//             const formData = new FormData();

//             // Serialize the journal object to a JSON string and append it as the 'journal' part
//             const journalData = {
//                 disciplineId: journal.disciplineId || "",
//                 journalKey: journal.journalKey || "",
//                 journalName: journal.journalName || "",
//                 abbreviation: journal.abbreviation || "",
//                 topic: journal.topic || "",
//                 issnOnline: journal.issnOnline || "",
//                 issnPrint: journal.issnPrint || "",
//                 googleScholar: journal.googleScholar || "",
//                 doi: journal.doi || "",
//                 publicationFrequency: journal.publicationFrequency || "",
//                 subjectArea: journal.subjectArea || "",
//                 about: journal.about || "",
//                 aimandscope: journal.aimandscope || "",
//                 indexing: journal.indexing || "",
//                 coden: journal.coden || "",
//                 email: journal.email || "",
//                 startMonth: journal.startMonth || "",
//                 startYear: journal.startYear || "",
//                 subPrice: journal.subPrice || "",
//                 createdUserId: userId,
//                 updatedUserId: userId,
//             };
//             formData.append("journal", new Blob([JSON.stringify(journalData)], { type: "application/json" }));

//             // Append the cover image if it exists and is a file (not a URL string)
//             if (coverPage && typeof coverPage !== "string") {
//                 formData.append("coverImage", coverPage);
//             }

//             // Append the removeImage flag
//             formData.append("removeImage", removeImage ? "true" : "false");

//             const config = { headers: { "Content-Type": "multipart/form-data" } };
//             let response;
//             const isEditing = location.state && location.state.journal && location.state.journal.journalId;
//             if (isEditing) {
//                 response = await axios.put(`${BASE_URL}/journals/${location.state.journal.journalId}`, formData, config);
//             } else {
//                 response = await axios.post(`${BASE_URL}/journals`, formData, config);
//             }

//             if (response && (response.status === 200 || response.status === 201)) {
//                 setModal({
//                     show: true,
//                     type: "success",
//                     message: isEditing ? "Journal updated successfully!" : "Journal added successfully!",
//                 });
//                 setTimeout(() => {
//                     setModal({ show: false, type: "", message: "" });
//                     navigate("/journals");
//                     window.scrollTo(0, 0);
//                 }, 800);
//             }
//         } catch (error) {
//             const errorMessage = error.response?.data?.message || error.message;
//             setModal({
//                 show: true,
//                 type: "error",
//                 message: `Failed to ${isEditing ? "update" : "add"} journal: ${errorMessage}`,
//             });
//             console.error("Error saving journal:", error);
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
//                     <span className="text-sm">Hi {user?.user_name}</span>
//                 </div>
//             </header>
//             <div className="w-[20%]">
//                 <Sidebar />
//             </div>
//             <div className="w-screen p-6 h-screen pt-20 overflow-y-auto">
//                 {/* Header */}
//                 <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-6 shadow-md">
//                     <h1 className="text-2xl font-bold">
//                         {location.state && location.state.journal ? "Edit Journal" : "Add New Journal"}
//                     </h1>
//                     <p className="text-sm opacity-90 mt-1">
//                         {location.state && location.state.journal
//                             ? "Update an existing journal entry."
//                             : "Create a new journal entry for your dashboard."}
//                     </p>
//                 </header>

//                 {/* Main Content */}
//                 <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
//                     <h2 className="text-xl font-semibold text-blue-600 mb-6">
//                         {location.state && location.state.journal ? "Edit Journal" : "Add New Journal"}
//                     </h2>

//                     {journal && (
//                         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {/* Discipline */}
//                             <div className="relative">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Discipline *
//                                 </label>
//                                 <select
//                                     name="disciplineId"
//                                     value={journal.disciplineId}
//                                     onChange={handleChange}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 >
//                                     <option value="">-- Select Discipline --</option>
//                                     {disciplines.length > 0 ? (
//                                         disciplines.map((discipline) => (
//                                             <option key={discipline.disciplineId} value={discipline.disciplineId}>
//                                                 {discipline.disciplineName}
//                                             </option>
//                                         ))
//                                     ) : (
//                                         <option disabled>No disciplines available</option>
//                                     )}
//                                 </select>
//                             </div>

//                             {/* Journal Key */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Journal Id *
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="journalKey"
//                                     value={journal.journalKey}
//                                     onChange={handleChange}
//                                     placeholder="e.g., JNL-CS-001"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>

//                             {/* Journal Name */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Journal Name *
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="journalName"
//                                     value={journal.journalName}
//                                     onChange={handleChange}
//                                     placeholder="e.g., Journal of Computer Science"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>

//                             {/* Abbreviation */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Abbreviation
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="abbreviation"
//                                     value={journal.abbreviation}
//                                     onChange={handleChange}
//                                     placeholder="e.g., JCS"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Topic */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Topic
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="topic"
//                                     value={journal.topic}
//                                     onChange={handleChange}
//                                     placeholder="e.g., Computer Science Research"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* ISSN Online */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     ISSN Online
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="issnOnline"
//                                     value={journal.issnOnline}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 1234-5678"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* ISSN Print */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     ISSN Print
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="issnPrint"
//                                     value={journal.issnPrint}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 4321-8765"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Google Scholar */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Google Scholar
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="googleScholar"
//                                     value={journal.googleScholar}
//                                     onChange={handleChange}
//                                     placeholder="e.g., https://scholar.google.com/jcs"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* DOI */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     DOI
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="doi"
//                                     value={journal.doi}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 10.1000/jcs001"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Publication Frequency */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Publication Frequency *
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="publicationFrequency"
//                                     value={journal.publicationFrequency}
//                                     onChange={handleChange}
//                                     placeholder="e.g., Monthly"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>

//                             {/* Coden */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Coden
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="coden"
//                                     value={journal.coden}
//                                     onChange={handleChange}
//                                     placeholder="e.g., C1234"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Email */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Email
//                                 </label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={journal.email}
//                                     onChange={handleChange}
//                                     placeholder="e.g., editor@jcs.com"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Start Month */}
//                             <div className="relative" ref={refStartMonth}>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Start Month *
//                                 </label>
//                                 <select
//                                     name="startMonth"
//                                     value={journal.startMonth}
//                                     onChange={handleChange}
//                                     onClick={() => setShowdownsm(!showdownsm)}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm appearance-none"
//                                     required
//                                 >
//                                     <option value="">Select Month</option>
//                                     {[
//                                         "January", "February", "March", "April", "May", "June",
//                                         "July", "August", "September", "October", "November", "December"
//                                     ].map((month) => (
//                                         <option key={month} value={month}>
//                                             {month}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                                     <svg
//                                         className={`fill-current h-5 w-5 mt-2 ${showdownsm ? "rotate-180" : "rotate-0"}`}
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 20 20"
//                                     >
//                                         <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
//                                     </svg>
//                                 </div>
//                             </div>

//                             {/* Start Year */}
//                             <div className="relative" ref={refYear}>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Start Year *
//                                 </label>
//                                 <select
//                                     name="startYear"
//                                     value={journal.startYear}
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
//                                         className={`fill-current h-5 w-5 mt-2 ${showdowny ? "rotate-180" : "rotate-0"}`}
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 20 20"
//                                     >
//                                         <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
//                                     </svg>
//                                 </div>
//                             </div>

//                             {/* Subscription Price */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Subscription Price
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="subPrice"
//                                     value={journal.subPrice}
//                                     onChange={handleChange}
//                                     placeholder="e.g., $100"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Subject Area */}
//                             <div className="col-span-2">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Subject Area *
//                                 </label>
//                                 <Editor
//                                     apiKey="nxdubw1uzkbvetym5t6krqxoi3rcxm1nz8xndt774kqqaji4"
//                                     value={journal.subjectArea}
//                                     init={{
//                                         height: 300,
//                                         menubar: false,
//                                         plugins:
//                                             "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
//                                         toolbar:
//                                             "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
//                                     }}
//                                     onEditorChange={handleEditorChange("subjectArea")}
//                                 />
//                             </div>

//                             {/* About */}
//                             <div className="col-span-2">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     About
//                                 </label>
//                                 <Editor
//                                     apiKey="nxdubw1uzkbvetym5t6krqxoi3rcxm1nz8xndt774kqqaji4"
//                                     value={journal.about}
//                                     init={{
//                                         height: 300,
//                                         menubar: false,
//                                         plugins:
//                                             "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
//                                         toolbar:
//                                             "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
//                                     }}
//                                     onEditorChange={handleEditorChange("about")}
//                                 />
//                             </div>

//                             {/* Aim and Scope */}
//                             <div className="col-span-2">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Aim and Scope
//                                 </label>
//                                 <Editor
//                                     apiKey="nxdubw1uzkbvetym5t6krqxoi3rcxm1nz8xndt774kqqaji4"
//                                     value={journal.aimandscope}
//                                     init={{
//                                         height: 300,
//                                         menubar: false,
//                                         plugins:
//                                             "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
//                                         toolbar:
//                                             "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
//                                     }}
//                                     onEditorChange={handleEditorChange("aimandscope")}
//                                 />
//                             </div>

//                             {/* Indexing */}
//                             <div className="col-span-2">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Indexing
//                                 </label>
//                                 <Editor
//                                     apiKey="nxdubw1uzkbvetym5t6krqxoi3rcxm1nz8xndt774kqqaji4"
//                                     value={journal.indexing}
//                                     init={{
//                                         height: 300,
//                                         menubar: false,
//                                         plugins:
//                                             "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
//                                         toolbar:
//                                             "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
//                                     }}
//                                     onEditorChange={handleEditorChange("indexing")}
//                                 />
//                             </div>

//                             {/* Cover Image */}
//                             <div className="col-span-2">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Cover Image
//                                 </label>
//                                 <input
//                                     type="file"
//                                     name="coverImage"
//                                     onChange={handleFileChange}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     accept="image/*"
//                                 />
//                                 {location.state && location.state.journal && coverPage && !removeImage && (
//                                     <div className="mt-2">
//                                         <p className="text-sm text-gray-500">Current cover:</p>
//                                         <div className="relative inline-block">
//                                             <img
//                                                 src={coverPage}
//                                                 alt="Cover"
//                                                 className="w-32 h-32 object-cover border"
//                                                 onError={(e) => {
//                                                     e.target.src = "/default-image.png";
//                                                 }}
//                                             />
//                                             <button
//                                                 type="button"
//                                                 onClick={handleRemoveImage}
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
//                                     className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors shadow-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
//                                     disabled={loading}
//                                 >
//                                     {loading
//                                         ? "Saving..."
//                                         : location.state && location.state.journal
//                                             ? "Update"
//                                             : "Save"}
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => {
//                                         navigate("/journals");
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

// export default JournalsAddNew;

// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { Editor } from "@tinymce/tinymce-react";
// import Sidebar from "../sidebar";

// const JournalsAddNew = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const refStartMonth = useRef(null);
//     const refYear = useRef(null);

//     const [modal, setModal] = useState({ show: false, type: "", message: "" });
//     const [journal, setJournal] = useState(null);
//     const [coverPage, setCoverPage] = useState(null);
//     const [disciplines, setDisciplines] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");
//     const [removeImage, setRemoveImage] = useState(false);
//     const [showdownsm, setShowdownsm] = useState(false);
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
//         handleOutsideClick(refStartMonth, () => setShowdownsm(false));
//         handleOutsideClick(refYear, () => setShowdowny(false));
//     }, []);

//     // Fetch disciplines
//     useEffect(() => {
//         axios
//             .get(`${BASE_URL}/disciplines`)
//             .then((response) => {
//                 if (response.data.success) {
//                     setDisciplines(response.data.data);
//                 } else {
//                     setModal({
//                         show: true,
//                         type: "error",
//                         message: `Failed to fetch disciplines: ${response.data.message}`,
//                     });
//                 }
//             })
//             .catch((error) => {
//                 setModal({
//                     show: true,
//                     type: "error",
//                     message: `Error fetching disciplines: ${error.message}`,
//                 });
//             });
//     }, []);

//     // Load journal data for editing or initialize for adding
//     useEffect(() => {
//         if (location.state && location.state.journal) {
//             const { journalId, ...editableFields } = location.state.journal;
//             setJournal(editableFields);
//             if (location.state.journal.coverPage) {
//                 setCoverPage(
//                     location.state.journal.coverPage.startsWith("/")
//                         ? `${BASE_URL}${location.state.journal.coverPage}`
//                         : location.state.journal.coverPage
//                 );
//             }
//         } else {
//             setJournal({
//                 disciplineId: "",
//                 journalKey: "",
//                 journalName: "",
//                 abbrevation: "",
//                 topic: "",
//                 issnOnline: "",
//                 issnPrint: "",
//                 googleScholar: "",
//                 doi: "",
//                 publicationFrequency: "",
//                 subjectArea: "",
//                 about: "",
//                 aimandscope: "",
//                 indexing: "",
//                 coden: "",
//                 email: "",
//                 startMonth: "",
//                 startYear: "",
//                 coverPage: "",
//                 subPrice: "",
//                 createdUserId: userId,
//                 updatedUserId: userId,
//             });
//         }
//     }, [location.state, userId]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setJournal((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleFileChange = (e) => {
//         setCoverPage(e.target.files[0]);
//         setRemoveImage(false);
//     };

//     const handleEditorChange = (field) => (content) => {
//         setJournal((prev) => ({ ...prev, [field]: content }));
//     };

//     const handleRemoveImage = () => {
//         setCoverPage(null);
//         setRemoveImage(true);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage("");
//         setModal({ show: false, type: "", message: "" });

//         // Basic validation
//         if (!journal.disciplineId || !journal.journalKey || !journal.journalName || !journal.publicationFrequency || !journal.startMonth || !journal.startYear) {
//             setModal({
//                 show: true,
//                 type: "error",
//                 message: "Please fill in all required fields.",
//             });
//             setLoading(false);
//             return;
//         }

//         try {
//             const formData = new FormData();

//             // Serialize the journal object to a JSON string and append it as the 'journal' part
//             const journalData = {
//                 disciplineId: journal.disciplineId || "",
//                 journalKey: journal.journalKey || "",
//                 journalName: journal.journalName || "",
//                 abbrevation: journal.abbrevation || "",
//                 topic: journal.topic || "",
//                 issnOnline: journal.issnOnline || "",
//                 issnPrint: journal.issnPrint || "",
//                 googleScholar: journal.googleScholar || "",
//                 doi: journal.doi || "",
//                 publicationFrequency: journal.publicationFrequency || "",
//                 subjectArea: journal.subjectArea || "",
//                 about: journal.about || "",
//                 aimandscope: journal.aimandscope || "",
//                 indexing: journal.indexing || "",
//                 coden: journal.coden || "",
//                 email: journal.email || "",
//                 startMonth: journal.startMonth || "",
//                 startYear: journal.startYear || "",
//                 subPrice: journal.subPrice || "",
//                 createdUserId: userId,
//                 updatedUserId: userId,
//             };
//             formData.append("journal", new Blob([JSON.stringify(journalData)], { type: "application/json" }));

//             // Append the cover image if it exists and is a file (not a URL string)
//             if (coverPage && typeof coverPage !== "string") {
//                 formData.append("coverImage", coverPage);
//             }

//             // Append the removeImage flag
//             formData.append("removeImage", removeImage ? "true" : "false");

//             const config = { headers: { "Content-Type": "multipart/form-data" } };
//             let response;
//             const isEditing = location.state && location.state.journal && location.state.journal.journalId;
//             if (isEditing) {
//                 response = await axios.put(`${BASE_URL}/journals/${location.state.journal.journalId}`, formData, config);
//             } else {
//                 response = await axios.post(`${BASE_URL}/journals`, formData, config);
//             }

//             if (response && (response.status === 200 || response.status === 201)) {
//                 setModal({
//                     show: true,
//                     type: "success",
//                     message: isEditing ? "Journal updated successfully!" : "Journal added successfully!",
//                 });
//                 setTimeout(() => {
//                     setModal({ show: false, type: "", message: "" });
//                     navigate("/journals");
//                     window.scrollTo(0, 0);
//                 }, 800);
//             }
//         } catch (error) {
//             const errorMessage = error.response?.data?.message || error.message;
//             setModal({
//                 show: true,
//                 type: "error",
//                 message: `Failed to ${isEditing ? "update" : "add"} journal: ${errorMessage}`,
//             });
//             console.error("Error saving journal:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex min-h-screen bg-blue-50">
//             <header className="fixed top-0 left-0 w-full z-100 bg-blue-900 text-white py-4 px-6 flex items-center justify-between z-40">
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
//                         {location.state && location.state.journal ? "Edit Journal" : "Add New Journal"}
//                     </h1>
//                     <p className="text-sm opacity-90 mt-1">
//                         {location.state && location.state.journal
//                             ? "Update an existing journal entry."
//                             : "Create a new journal entry for your dashboard."}
//                     </p>
//                 </header>

//                 {/* Main Content */}
//                 <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
//                     <h2 className="text-xl font-semibold text-blue-600 mb-6">
//                         {location.state && location.state.journal ? "Edit Journal" : "Add New Journal"}
//                     </h2>

//                     {journal && (
//                         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {/* Discipline */}
//                             <div className="relative">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Discipline *
//                                 </label>
//                                 <select
//                                     name="disciplineId"
//                                     value={journal.disciplineId}
//                                     onChange={handleChange}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 >
//                                     <option value="">-- Select Discipline --</option>
//                                     {disciplines.length > 0 ? (
//                                         disciplines.map((discipline) => (
//                                             <option key={discipline.disciplineId} value={discipline.disciplineId}>
//                                                 {discipline.disciplineName}
//                                             </option>
//                                         ))
//                                     ) : (
//                                         <option disabled>No disciplines available</option>
//                                     )}
//                                 </select>
//                             </div>

//                             {/* Journal Key */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Journal ID *
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="journalKey"
//                                     value={journal.journalKey}
//                                     onChange={handleChange}
//                                     placeholder="e.g., JNL-CS-001"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>

//                             {/* Journal Name */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Journal Name *
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="journalName"
//                                     value={journal.journalName}
//                                     onChange={handleChange}
//                                     placeholder="e.g., Journal of Computer Science"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>

//                             {/* Abbreviation */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Abbreviation
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="abbrevation"
//                                     value={journal.abbrevation}
//                                     onChange={handleChange}
//                                     placeholder="e.g., JCS"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Topic */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Topic
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="topic"
//                                     value={journal.topic}
//                                     onChange={handleChange}
//                                     placeholder="e.g., Computer Science Research"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* ISSN Online */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     ISSN Online
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="issnOnline"
//                                     value={journal.issnOnline}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 1234-5678"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* ISSN Print */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     ISSN Print
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="issnPrint"
//                                     value={journal.issnPrint}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 4321-8765"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Google Scholar */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Google Scholar
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="googleScholar"
//                                     value={journal.googleScholar}
//                                     onChange={handleChange}
//                                     placeholder="e.g., https://scholar.google.com/jcs"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* DOI */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     DOI
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="doi"
//                                     value={journal.doi}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 10.1000/jcs001"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Publication Frequency */}
//                             <div className="relative">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Publication Frequency *
//                                 </label>
//                                 <select
//                                     name="publicationFrequency"
//                                     value={journal.publicationFrequency}
//                                     onChange={handleChange}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm appearance-none"
//                                     required
//                                 >
//                                     <option value="">Select Frequency</option>
//                                     <option value="One issue per year">One issue per year</option>
//                                     <option value="Two issues per year">Two issues per year</option>
//                                     <option value="Three issues per year">Three issues per year</option>
//                                     <option value="Four issues per year">Four issues per year</option>
//                                 </select>
//                             </div>

//                             {/* Coden */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Coden
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="coden"
//                                     value={journal.coden}
//                                     onChange={handleChange}
//                                     placeholder="e.g., C1234"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Email */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Email
//                                 </label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={journal.email}
//                                     onChange={handleChange}
//                                     placeholder="e.g., editor@jcs.com"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Start Month */}
//                             <div className="relative" ref={refStartMonth}>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Start Month *
//                                 </label>
//                                 <select
//                                     name="startMonth"
//                                     value={journal.startMonth}
//                                     onChange={handleChange}
//                                     onClick={() => setShowdownsm(!showdownsm)}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm appearance-none"
//                                     required
//                                 >
//                                     <option value="">Select Month</option>
//                                     {[
//                                         "January", "February", "March", "April", "May", "June",
//                                         "July", "August", "September", "October", "November", "December"
//                                     ].map((month) => (
//                                         <option key={month} value={month}>
//                                             {month}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                                     <svg
//                                         className={`fill-current h-5 w-5 mt-2 ${showdownsm ? "rotate-180" : "rotate-0"}`}
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 20 20"
//                                     >
//                                         <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
//                                     </svg>
//                                 </div>
//                             </div>

//                             {/* Start Year */}
//                             <div className="relative" ref={refYear}>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Start Year *
//                                 </label>
//                                 <select
//                                     name="startYear"
//                                     value={journal.startYear}
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
//                                         className={`fill-current h-5 w-5 mt-2 ${showdowny ? "rotate-180" : "rotate-0"}`}
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 20 20"
//                                     >
//                                         <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
//                                     </svg>
//                                 </div>
//                             </div>

//                             {/* Subscription Price */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Subscription Price
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="subPrice"
//                                     value={journal.subPrice}
//                                     onChange={handleChange}
//                                     placeholder="e.g., $100"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Subject Area */}
//                             <div className="col-span-2">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Subject Area *
//                                 </label>
//                                 <Editor
//                                     apiKey="nxdubw1uzkbvetym5t6krqxoi3rcxm1nz8xndt774kqqaji4"
//                                     value={journal.subjectArea}
//                                     init={{
//                                         height: 300,
//                                         menubar: false,
//                                         plugins:
//                                             "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
//                                         toolbar:
//                                             "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
//                                     }}
//                                     onEditorChange={handleEditorChange("subjectArea")}
//                                 />
//                             </div>

//                             {/* About */}
//                             <div className="col-span-2">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     About
//                                 </label>
//                                 <Editor
//                                     apiKey="nxdubw1uzkbvetym5t6krqxoi3rcxm1nz8xndt774kqqaji4"
//                                     value={journal.about}
//                                     init={{
//                                         height: 300,
//                                         menubar: false,
//                                         plugins:
//                                             "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
//                                         toolbar:
//                                             "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
//                                     }}
//                                     onEditorChange={handleEditorChange("about")}
//                                 />
//                             </div>

//                             {/* Aim and Scope */}
//                             <div className="col-span-2">
//                                 <label className="block text-sm font-animation text-blue-600 mb-1">
//                                     Aim and Scope
//                                 </label>
//                                 <Editor
//                                     apiKey="nxdubw1uzkbvetym5t6krqxoi3rcxm1nz8xndt774kqqaji4"
//                                     value={journal.aimandscope}
//                                     init={{
//                                         height: 300,
//                                         menubar: false,
//                                         plugins:
//                                             "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
//                                         toolbar:
//                                             "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
//                                     }}
//                                     onEditorChange={handleEditorChange("aimandscope")}
//                                 />
//                             </div>

//                             {/* Indexing */}
//                             <div className="col-span-2">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Indexing
//                                 </label>
//                                 <Editor
//                                     apiKey="nxdubw1uzkbvetym5t6krqxoi3rcxm1nz8xndt774kqqaji4"
//                                     value={journal.indexing}
//                                     init={{
//                                         height: 300,
//                                         menubar: false,
//                                         plugins:
//                                             "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
//                                         toolbar:
//                                             "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
//                                     }}
//                                     onEditorChange={handleEditorChange("indexing")}
//                                 />
//                             </div>

//                             {/* Cover Image */}
//                             <div className="col-span-2">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Cover Image
//                                 </label>
//                                 <input
//                                     type="file"
//                                     name="coverImage"
//                                     onChange={handleFileChange}
//                                     className="w-full px-обус py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     accept="image/*"
//                                 />
//                                 {location.state && location.state.journal && coverPage && !removeImage && (
//                                     <div className="mt-2">
//                                         <p className="text-sm text-gray-500">Current cover:</p>
//                                         <div className="relative inline-block">
//                                             <img
//                                                 src={coverPage}
//                                                 alt="Cover"
//                                                 className="w-32 h-32 object-cover border"
//                                                 onError={(e) => {
//                                                     e.target.src = "/default-image.png";
//                                                 }}
//                                             />
//                                             <button
//                                                 type="button"
//                                                 onClick={handleRemoveImage}
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
//                                     className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors shadow-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
//                                     disabled={loading}
//                                 >
//                                     {loading
//                                         ? "Saving..."
//                                         : location.state && location.state.journal
//                                             ? "Update"
//                                             : "Save"}
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => {
//                                         navigate("/journals");
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

// export default JournalsAddNew;



// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { Editor } from "@tinymce/tinymce-react";
// import Sidebar from "../sidebar";

// const JournalsAddNew = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const refStartMonth = useRef(null);
//     const refYear = useRef(null);

//     const [modal, setModal] = useState({ show: false, type: "", message: "" });
//     const [journal, setJournal] = useState(null);
//     const [coverPage, setCoverPage] = useState(null);
//     const [disciplines, setDisciplines] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");
//     const [removeImage, setRemoveImage] = useState(false);
//     const [showdownsm, setShowdownsm] = useState(false);
//     const [showdowny, setShowdowny] = useState(false);
//     const [currentUser, setCurrentUser] = useState(null);

//     const BASE_URL = "https://iassrd.com:8081/api/v1";

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
//         handleOutsideClick(refStartMonth, () => setShowdownsm(false));
//         handleOutsideClick(refYear, () => setShowdowny(false));
//     }, []);

//     // Fetch current user data by matching userName from localStorage
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

//     // Fetch disciplines
//     useEffect(() => {
//         axios
//             .get(`${BASE_URL}/disciplines`)
//             .then((response) => {
//                 if (response.data.success) {
//                     setDisciplines(response.data.data);
//                 } else {
//                     setModal({
//                         show: true,
//                         type: "error",
//                         message: `Failed to fetch disciplines: ${response.data.message}`,
//                     });
//                 }
//             })
//             .catch((error) => {
//                 setModal({
//                     show: true,
//                     type: "error",
//                     message: `Error fetching disciplines: ${error.message}`,
//                 });
//             });
//     }, []);

//     // Load journal data for editing or initialize for adding
//     useEffect(() => {
//         if (location.state && location.state.journal) {
//             const { journalId, createdUserId, createdUserType, ...editableFields } = location.state.journal;
//             setJournal({
//                 ...editableFields,
//                 createdUserId: createdUserId || currentUser?.userId,
//                 createdUserType: createdUserType || (currentUser?.role === "ADMIN" ? 1 : 2),
//                 updatedUserId: currentUser?.userId,
//                 updatedUserType: currentUser?.role === "ADMIN" ? 1 : 2,
//             });
//             if (location.state.journal.coverPage) {
//                 setCoverPage(
//                     location.state.journal.coverPage.startsWith("/")
//                         ? `${BASE_URL}${location.state.journal.coverPage}`
//                         : location.state.journal.coverPage
//                 );
//             }
//         } else if (currentUser) {
//             setJournal({
//                 disciplineId: "",
//                 journalKey: "",
//                 journalName: "",
//                 abbrevation: "",
//                 topic: "",
//                 issnOnline: "",
//                 issnPrint: "",
//                 googleScholar: "",
//                 doi: "",
//                 publicationFrequency: "",
//                 subjectArea: "",
//                 about: "",
//                 aimandscope: "",
//                 indexing: "",
//                 coden: "",
//                 email: "",
//                 startMonth: "",
//                 startYear: "",
//                 coverPage: "",
//                 subPrice: "",
//                 createdUserId: currentUser.userId,
//                 createdUserType: currentUser.role === "ADMIN" ? 1 : 2,
//                 updatedUserId: currentUser.userId,
//                 updatedUserType: currentUser.role === "ADMIN" ? 1 : 2,
//             });
//         }
//     }, [location.state, currentUser]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setJournal((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleFileChange = (e) => {
//         setCoverPage(e.target.files[0]);
//         setRemoveImage(false);
//     };

//     const handleEditorChange = (field) => (content) => {
//         setJournal((prev) => ({ ...prev, [field]: content }));
//     };

//     const handleRemoveImage = () => {
//         setCoverPage(null);
//         setRemoveImage(true);
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
//         setModal({ show: false, type: "", message: "" });

//         // Basic validation
//         if (!journal.disciplineId || !journal.journalKey || !journal.journalName || !journal.publicationFrequency || !journal.startMonth || !journal.startYear) {
//             setModal({
//                 show: true,
//                 type: "error",
//                 message: "Please fill in all required fields.",
//             });
//             setLoading(false);
//             return;
//         }

//         try {
//             const formData = new FormData();

//             // Serialize the journal object to a JSON string and append it as the 'journal' part
//             const journalData = {
//                 disciplineId: journal.disciplineId || "",
//                 journalKey: journal.journalKey || "",
//                 journalName: journal.journalName || "",
//                 abbrevation: journal.abbrevation || "",
//                 topic: journal.topic || "",
//                 issnOnline: journal.issnOnline || "",
//                 issnPrint: journal.issnPrint || "",
//                 googleScholar: journal.googleScholar || "",
//                 doi: journal.doi || "",
//                 publicationFrequency: journal.publicationFrequency || "",
//                 subjectArea: journal.subjectArea || "",
//                 about: journal.about || "",
//                 aimandscope: journal.aimandscope || "",
//                 indexing: journal.indexing || "",
//                 coden: journal.coden || "",
//                 email: journal.email || "",
//                 startMonth: journal.startMonth || "",
//                 startYear: journal.startYear || "",
//                 subPrice: journal.subPrice || "",
//                 createdUserId: journal.createdUserId || currentUser.userId,
//                 createdUserType: journal.createdUserType || (currentUser.role === "ADMIN" ? 1 : 2),
//                 updatedUserId: currentUser.userId,
//                 updatedUserType: currentUser.role === "ADMIN" ? 1 : 2,
//             };
//             formData.append("journal", new Blob([JSON.stringify(journalData)], { type: "application/json" }));

//             // Append the cover image if it exists and is a file (not a URL string)
//             if (coverPage && typeof coverPage !== "string") {
//                 formData.append("coverImage", coverPage);
//             }

//             // Append the removeImage flag
//             formData.append("removeImage", removeImage ? "true" : "false");

//             const config = { headers: { "Content-Type": "multipart/form-data" } };
//             let response;
//             const isEditing = location.state && location.state.journal && location.state.journal.journalId;
//             if (isEditing) {
//                 response = await axios.put(`${BASE_URL}/journals/${location.state.journal.journalId}`, formData, config);
//             } else {
//                 response = await axios.post(`${BASE_URL}/journals`, formData, config);
//             }

//             if (response && (response.status === 200 || response.status === 201)) {
//                 setModal({
//                     show: true,
//                     type: "success",
//                     message: isEditing ? "Journal updated successfully!" : "Journal added successfully!",
//                 });
//                 setTimeout(() => {
//                     setModal({ show: false, type: "", message: "" });
//                     navigate("/journals");
//                     window.scrollTo(0, 0);
//                 }, 800);
//             }
//         } catch (error) {
//             const errorMessage = error.response?.data?.message || error.message;
//             setModal({
//                 show: true,
//                 type: "error",
//                 message: `Failed to ${isEditing ? "update" : "add"} journal: ${errorMessage}`,
//             });
//             console.error("Error saving journal:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex min-h-screen bg-blue-50">
//             <header className="fixed top-0 left-0 w-full z-100 bg-blue-900 text-white py-4 px-6 flex items-center justify-between z-40">
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
//                 {/* Header */}
//                 <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-6 shadow-md">
//                     <h1 className="text-2xl font-bold">
//                         {location.state && location.state.journal ? "Edit Journal" : "Add New Journal"}
//                     </h1>
//                     <p className="text-sm opacity-90 mt-1">
//                         {location.state && location.state.journal
//                             ? "Update an existing journal entry."
//                             : "Create a new journal entry for your dashboard."}
//                     </p>
//                 </header>

//                 {/* Main Content */}
//                 <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
//                     <h2 className="text-xl font-semibold text-blue-600 mb-6">
//                         {location.state && location.state.journal ? "Edit Journal" : "Add New Journal"}
//                     </h2>

//                     {journal && (
//                         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {/* Discipline */}
//                             <div className="relative">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Discipline *
//                                 </label>
//                                 <select
//                                     name="disciplineId"
//                                     value={journal.disciplineId}
//                                     onChange={handleChange}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 >
//                                     <option value="">-- Select Discipline --</option>
//                                     {disciplines.length > 0 ? (
//                                         disciplines.map((discipline) => (
//                                             <option key={discipline.disciplineId} value={discipline.disciplineId}>
//                                                 {discipline.disciplineName}
//                                             </option>
//                                         ))
//                                     ) : (
//                                         <option disabled>No disciplines available</option>
//                                     )}
//                                 </select>
//                             </div>

//                             {/* Journal Key */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Journal ID *
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="journalKey"
//                                     value={journal.journalKey}
//                                     onChange={handleChange}
//                                     placeholder="e.g., JNL-CS-001"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>

//                             {/* Journal Name */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Journal Name *
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="journalName"
//                                     value={journal.journalName}
//                                     onChange={handleChange}
//                                     placeholder="e.g., Journal of Computer Science"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>

//                             {/* Abbreviation */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Abbreviation
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="abbrevation"
//                                     value={journal.abbrevation}
//                                     onChange={handleChange}
//                                     placeholder="e.g., JCS"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Topic */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Topic
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="topic"
//                                     value={journal.topic}
//                                     onChange={handleChange}
//                                     placeholder="e.g., Computer Science Research"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* ISSN Online */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     ISSN Online
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="issnOnline"
//                                     value={journal.issnOnline}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 1234-5678"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* ISSN Print */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     ISSN Print
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="issnPrint"
//                                     value={journal.issnPrint}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 4321-8765"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Google Scholar */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Google Scholar
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="googleScholar"
//                                     value={journal.googleScholar}
//                                     onChange={handleChange}
//                                     placeholder="e.g., https://scholar.google.com/jcs"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* DOI */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     DOI
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="doi"
//                                     value={journal.doi}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 10.1000/jcs001"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Publication Frequency */}
//                             <div className="relative">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Publication Frequency *
//                                 </label>
//                                 <select
//                                     name="publicationFrequency"
//                                     value={journal.publicationFrequency}
//                                     onChange={handleChange}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm appearance-none"
//                                     required
//                                 >
//                                     <option value="">Select Frequency</option>
//                                     <option value="One issue per year">One issue per year</option>
//                                     <option value="Two issues per year">Two issues per year</option>
//                                     <option value="Three issues per year">Three issues per year</option>
//                                     <option value="Four issues per year">Four issues per year</option>
//                                 </select>
//                             </div>

//                             {/* Coden */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Coden
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="coden"
//                                     value={journal.coden}
//                                     onChange={handleChange}
//                                     placeholder="e.g., C1234"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Email */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Email
//                                 </label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={journal.email}
//                                     onChange={handleChange}
//                                     placeholder="e.g., editor@jcs.com"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Start Month */}
//                             <div className="relative" ref={refStartMonth}>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Start Month *
//                                 </label>
//                                 <select
//                                     name="startMonth"
//                                     value={journal.startMonth}
//                                     onChange={handleChange}
//                                     onClick={() => setShowdownsm(!showdownsm)}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm appearance-none"
//                                     required
//                                 >
//                                     <option value="">Select Month</option>
//                                     {[
//                                         "January", "February", "March", "April", "May", "June",
//                                         "July", "August", "September", "October", "November", "December"
//                                     ].map((month) => (
//                                         <option key={month} value={month}>
//                                             {month}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                                     <svg
//                                         className={`fill-current h-5 w-5 mt-2 ${showdownsm ? "rotate-180" : "rotate-0"}`}
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 20 20"
//                                     >
//                                         <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
//                                     </svg>
//                                 </div>
//                             </div>

//                             {/* Start Year */}
//                             <div className="relative" ref={refYear}>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Start Year *
//                                 </label>
//                                 <select
//                                     name="startYear"
//                                     value={journal.startYear}
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
//                                         className={`fill-current h-5 w-5 mt-2 ${showdowny ? "rotate-180" : "rotate-0"}`}
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 20 20"
//                                     >
//                                         <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
//                                     </svg>
//                                 </div>
//                             </div>

//                             {/* Subscription Price */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Subscription Price
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="subPrice"
//                                     value={journal.subPrice}
//                                     onChange={handleChange}
//                                     placeholder="e.g., $100"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Subject Area */}
//                             <div className="col-span-2">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Subject Area *
//                                 </label>
//                                 <Editor
//                                     apiKey="nxdubw1uzkbvetym5t6krqxoi3rcxm1nz8xndt774kqqaji4"
//                                     value={journal.subjectArea}
//                                     init={{
//                                         height: 300,
//                                         menubar: false,
//                                         plugins:
//                                             "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
//                                         toolbar:
//                                             "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
//                                     }}
//                                     onEditorChange={handleEditorChange("subjectArea")}
//                                 />
//                             </div>

//                             {/* About */}
//                             <div className="col-span-2">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     About
//                                 </label>
//                                 <Editor
//                                     apiKey="nxdubw1uzkbvetym5t6krqxoi3rcxm1nz8xndt774kqqaji4"
//                                     value={journal.about}
//                                     init={{
//                                         height: 300,
//                                         menubar: false,
//                                         plugins:
//                                             "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
//                                         toolbar:
//                                             "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
//                                     }}
//                                     onEditorChange={handleEditorChange("about")}
//                                 />
//                             </div>

//                             {/* Aim and Scope */}
//                             <div className="col-span-2">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Aim and Scope
//                                 </label>
//                                 <Editor
//                                     apiKey="nxdubw1uzkbvetym5t6krqxoi3rcxm1nz8xndt774kqqaji4"
//                                     value={journal.aimandscope}
//                                     init={{
//                                         height: 300,
//                                         menubar: false,
//                                         plugins:
//                                             "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
//                                         toolbar:
//                                             "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
//                                     }}
//                                     onEditorChange={handleEditorChange("aimandscope")}
//                                 />
//                             </div>

//                             {/* Indexing */}
//                             <div className="col-span-2">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Indexing
//                                 </label>
//                                 <Editor
//                                     apiKey="nxdubw1uzkbvetym5t6krqxoi3rcxm1nz8xndt774kqqaji4"
//                                     value={journal.indexing}
//                                     init={{
//                                         height: 300,
//                                         menubar: false,
//                                         plugins:
//                                             "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
//                                         toolbar:
//                                             "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
//                                     }}
//                                     onEditorChange={handleEditorChange("indexing")}
//                                 />
//                             </div>

//                             {/* Cover Image */}
//                             <div className="col-span-2">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Cover Image
//                                 </label>
//                                 <input
//                                     type="file"
//                                     name="coverImage"
//                                     onChange={handleFileChange}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     accept="image/*"
//                                 />
//                                 {location.state && location.state.journal && coverPage && !removeImage && (
//                                     <div className="mt-2">
//                                         <p className="text-sm text-gray-500">Current cover:</p>
//                                         <div className="relative inline-block">
//                                             <img
//                                                 src={coverPage}
//                                                 alt="Cover"
//                                                 className="w-32 h-32 object-cover border"
//                                                 onError={(e) => {
//                                                     e.target.src = "/default-image.png";
//                                                 }}
//                                             />
//                                             <button
//                                                 type="button"
//                                                 onClick={handleRemoveImage}
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
//                                     className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors shadow-md ${loading || !currentUser ? "opacity-50 cursor-not-allowed" : ""}`}
//                                     disabled={loading || !currentUser}
//                                 >
//                                     {loading
//                                         ? "Saving..."
//                                         : location.state && location.state.journal
//                                         ? "Update"
//                                         : "Save"}
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => {
//                                         navigate("/journals");
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

// export default JournalsAddNew;



// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { Editor } from "@tinymce/tinymce-react";
// import Sidebar from "../sidebar";

// const JournalsAddNew = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const refStartMonth = useRef(null);
//     const refYear = useRef(null);

//     const [modal, setModal] = useState({ show: false, type: "", message: "" });
//     const [journal, setJournal] = useState(null);
//     const [coverPage, setCoverPage] = useState(null);
//     const [disciplines, setDisciplines] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");
//     const [removeImage, setRemoveImage] = useState(false);
//     const [showdownsm, setShowdownsm] = useState(false);
//     const [showdowny, setShowdowny] = useState(false);
//     const [currentUser, setCurrentUser] = useState(null);
//     const [validUserIds, setValidUserIds] = useState([]); // Store valid user IDs from backend

//     const BASE_URL = "https://iassrd.com:8081/api/v1";

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
//         handleOutsideClick(refStartMonth, () => setShowdownsm(false));
//         handleOutsideClick(refYear, () => setShowdowny(false));
//     }, []);

//     // Fetch current user data by matching userName from localStorage
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
//                     if (matchedUser && matchedUser.userId) {
//                         setCurrentUser(matchedUser);
//                         // Store all valid user IDs for validation
//                         setValidUserIds(response.data.data.map(user => user.userId));
//                     } else {
//                         setModal({
//                             show: true,
//                             type: "error",
//                             message: "User not found or invalid user data. Please log in again.",
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

//     // Fetch disciplines
//     useEffect(() => {
//         axios
//             .get(`${BASE_URL}/disciplines`)
//             .then((response) => {
//                 if (response.data.success) {
//                     setDisciplines(response.data.data);
//                 } else {
//                     setModal({
//                         show: true,
//                         type: "error",
//                         message: `Failed to fetch disciplines: ${response.data.message}`,
//                     });
//                 }
//             })
//             .catch((error) => {
//                 setModal({
//                     show: true,
//                     type: "error",
//                     message: `Error fetching disciplines: ${error.message}`,
//                 });
//             });
//     }, []);

//     // Load journal data for editing or initialize for adding
//     useEffect(() => {
//         console.log("location.state.journal:", location.state.journal); // Debug log
//         if (location.state && location.state.journal) {
//             const { journalId, createdUserId, createdUserType, ...editableFields } = location.state.journal;
//             if (!createdUserId) {
//                 console.warn("Missing createdUserId in location.state.journal:", location.state.journal);
//                 setModal({
//                     show: true,
//                     type: "error",
//                     message: "Invalid journal data: Missing created user ID.",
//                 });
//                 return;
//             }
//             setJournal({
//                 ...editableFields,
//                 createdUserId,
//                 createdUserType: createdUserType || 2, // Default to non-ADMIN if not provided
//                 updatedUserId: currentUser?.userId || editableFields.updatedUserId,
//                 updatedUserType: currentUser?.role === "ADMIN" ? 1 : 2,
//             });
//             if (location.state.journal.coverPage) {
//                 setCoverPage(
//                     location.state.journal.coverPage.startsWith("/")
//                         ? `${BASE_URL}${location.state.journal.coverPage}`
//                         : location.state.journal.coverPage
//                 );
//             }
//         } else if (currentUser && currentUser.userId) {
//             setJournal({
//                 disciplineId: "",
//                 journalKey: "",
//                 journalName: "",
//                 abbrevation: "",
//                 topic: "",
//                 issnOnline: "",
//                 issnPrint: "",
//                 googleScholar: "",
//                 doi: "",
//                 publicationFrequency: "",
//                 subjectArea: "",
//                 about: "",
//                 aimandscope: "",
//                 indexing: "",
//                 coden: "",
//                 email: "",
//                 startMonth: "",
//                 startYear: "",
//                 coverPage: "",
//                 subPrice: "",
//                 createdUserId: currentUser.userId,
//                 createdUserType: currentUser.role === "ADMIN" ? 1 : 2,
//                 updatedUserId: currentUser.userId,
//                 updatedUserType: currentUser.role === "ADMIN" ? 1 : 2,
//             });
//         }
//     }, [location.state, currentUser]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setJournal((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleFileChange = (e) => {
//         setCoverPage(e.target.files[0]);
//         setRemoveImage(false);
//     };

//     const handleEditorChange = (field) => (content) => {
//         setJournal((prev) => ({ ...prev, [field]: content }));
//     };

//     const handleRemoveImage = () => {
//         setCoverPage(null);
//         setRemoveImage(true);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!currentUser || !currentUser.userId) {
//             setModal({
//                 show: true,
//                 type: "error",
//                 message: "User data not available. Please try again.",
//             });
//             return;
//         }

//         setLoading(true);
//         setMessage("");
//         setModal({ show: false, type: "", message: "" });

//         // Basic validation
//         if (!journal.disciplineId || !journal.journalKey || !journal.journalName || !journal.publicationFrequency || !journal.startMonth || !journal.startYear) {
//             setModal({
//                 show: true,
//                 type: "error",
//                 message: "Please fill in all required fields.",
//             });
//             setLoading(false);
//             return;
//         }

//         // Validate createdUserId against valid user IDs from backend
//         if (!journal.createdUserId) {
//             setModal({
//                 show: true,
//                 type: "error",
//                 message: "Invalid created user ID. Please ensure the journal data is correct.",
//             });
//             setLoading(false);
//             return;
//         }

//         // Check if createdUserId exists in the backend's user list
//         const isValidCreatedUserId = validUserIds.includes(journal.createdUserId);
//         let finalCreatedUserId = journal.createdUserId;
//         if (!isValidCreatedUserId) {
//             console.warn(`createdUserId ${journal.createdUserId} is not valid. Falling back to currentUser.userId: ${currentUser.userId}`);
//             finalCreatedUserId = currentUser.userId; // Fallback to current user if createdUserId is invalid
//         }

//         // Define isEditing outside the try block
//         const isEditing = location.state && location.state.journal && location.state.journal.journalId;

//         try {
//             const formData = new FormData();

//             // Serialize the journal object to a JSON string and append it as the 'journal' part
//             const journalData = {
//                 disciplineId: journal.disciplineId || "",
//                 journalKey: journal.journalKey || "",
//                 journalName: journal.journalName || "",
//                 abbrevation: journal.abbrevation || "",
//                 topic: journal.topic || "",
//                 issnOnline: journal.issnOnline || "",
//                 issnPrint: journal.issnPrint || "",
//                 googleScholar: journal.googleScholar || "",
//                 doi: journal.doi || "",
//                 publicationFrequency: journal.publicationFrequency || "",
//                 subjectArea: journal.subjectArea || "",
//                 about: journal.about || "",
//                 aimandscope: journal.aimandscope || "",
//                 indexing: journal.indexing || "",
//                 coden: journal.coden || "",
//                 email: journal.email || "",
//                 startMonth: journal.startMonth || "",
//                 startYear: journal.startYear || "",
//                 subPrice: journal.subPrice || "",
//                 createdUserId: finalCreatedUserId,
//                 createdUserType: journal.createdUserType || (currentUser.role === "ADMIN" ? 1 : 2),
//                 updatedUserId: currentUser.userId,
//                 updatedUserType: currentUser.role === "ADMIN" ? 1 : 2,
//             };

//             // Log journalData for debugging
//             console.log("Submitting journalData:", journalData);
//             console.log("Valid user IDs from backend:", validUserIds);

//             formData.append("journal", new Blob([JSON.stringify(journalData)], { type: "application/json" }));

//             // Append the cover image if it exists and is a file (not a URL string)
//             if (coverPage && typeof coverPage !== "string") {
//                 formData.append("coverImage", coverPage);
//             }

//             // Append the removeImage flag
//             formData.append("removeImage", removeImage ? "true" : "false");

//             const config = { headers: { "Content-Type": "multipart/form-data" } };
//             let response;
//             if (isEditing) {
//                 response = await axios.put(`${BASE_URL}/journals/${location.state.journal.journalId}`, formData, config);
//             } else {
//                 response = await axios.post(`${BASE_URL}/journals`, formData, config);
//             }

//             if (response && (response.status === 200 || response.status === 201)) {
//                 setModal({
//                     show: true,
//                     type: "success",
//                     message: isEditing ? "Journal updated successfully!" : "Journal added successfully!",
//                 });
//                 setMessage(isEditing ? "Journal updated successfully!" : "Journal added successfully!");
//                 setTimeout(() => {
//                     setModal({ show: false, type: "", message: "" });
//                     navigate("/journals");
//                     window.scrollTo(0, 0);
//                 }, 800);
//             }
//         } catch (error) {
//             const errorMessage = error.response?.data?.message || error.message;
//             setModal({
//                 show: true,
//                 type: "error",
//                 message: `Failed to ${isEditing ? "update" : "add"} journal: ${errorMessage}`,
//             });
//             setMessage(`Failed to ${isEditing ? "update" : "add"} journal: ${errorMessage}`);
//             console.error("Error saving journal:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex min-h-screen bg-blue-50">
//             <header className="fixed top-0 left-0 w-full z-100 bg-blue-900 text-white py-4 px-6 flex items-center justify-between z-40">
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
//                 {/* Header */}
//                 <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-6 shadow-md">
//                     <h1 className="text-2xl font-bold">
//                         {location.state && location.state.journal ? "Edit Journal" : "Add New Journal"}
//                     </h1>
//                     <p className="text-sm opacity-90 mt-1">
//                         {location.state && location.state.journal
//                             ? "Update an existing journal entry."
//                             : "Create a new journal entry for your dashboard."}
//                     </p>
//                 </header>

//                 {/* Main Content */}
//                 <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
//                     <h2 className="text-xl font-semibold text-blue-600 mb-6">
//                         {location.state && location.state.journal ? "Edit Journal" : "Add New Journal"}
//                     </h2>

//                     {message && (
//                         <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
//                             {message}
//                         </div>
//                     )}

//                     {journal && (
//                         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {/* Discipline */}
//                             <div className="relative">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Discipline *
//                                 </label>
//                                 <select
//                                     name="disciplineId"
//                                     value={journal.disciplineId}
//                                     onChange={handleChange}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 >
//                                     <option value="">-- Select Discipline --</option>
//                                     {disciplines.length > 0 ? (
//                                         disciplines.map((discipline) => (
//                                             <option key={discipline.disciplineId} value={discipline.disciplineId}>
//                                                 {discipline.disciplineName}
//                                             </option>
//                                         ))
//                                     ) : (
//                                         <option disabled>No disciplines available</option>
//                                     )}
//                                 </select>
//                             </div>

//                             {/* Journal Key */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Journal ID *
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="journalKey"
//                                     value={journal.journalKey}
//                                     onChange={handleChange}
//                                     placeholder="e.g., JNL-CS-001"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>

//                             {/* Journal Name */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Journal Name *
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="journalName"
//                                     value={journal.journalName}
//                                     onChange={handleChange}
//                                     placeholder="e.g., Journal of Computer Science"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>

//                             {/* Abbreviation */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Abbreviation
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="abbrevation"
//                                     value={journal.abbrevation}
//                                     onChange={handleChange}
//                                     placeholder="e.g., JCS"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Topic */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Topic
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="topic"
//                                     value={journal.topic}
//                                     onChange={handleChange}
//                                     placeholder="e.g., Computer Science Research"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* ISSN Online */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     ISSN Online
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="issnOnline"
//                                     value={journal.issnOnline}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 1234-5678"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* ISSN Print */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     ISSN Print
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="issnPrint"
//                                     value={journal.issnPrint}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 4321-8765"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Google Scholar */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Google Scholar
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="googleScholar"
//                                     value={journal.googleScholar}
//                                     onChange={handleChange}
//                                     placeholder="e.g., https://scholar.google.com/jcs"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* DOI */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     DOI
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="doi"
//                                     value={journal.doi}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 10.1000/jcs001"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Publication Frequency */}
//                             <div className="relative">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Publication Frequency *
//                                 </label>
//                                 <select
//                                     name="publicationFrequency"
//                                     value={journal.publicationFrequency}
//                                     onChange={handleChange}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm appearance-none"
//                                     required
//                                 >
//                                     <option value="">Select Frequency</option>
//                                     <option value="One issue per year">One issue per year</option>
//                                     <option value="Two issues per year">Two issues per year</option>
//                                     <option value="Three issues per year">Three issues per year</option>
//                                     <option value="Four issues per year">Four issues per year</option>
//                                 </select>
//                             </div>

//                             {/* Coden */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Coden
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="coden"
//                                     value={journal.coden}
//                                     onChange={handleChange}
//                                     placeholder="e.g., C1234"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Email */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Email
//                                 </label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={journal.email}
//                                     onChange={handleChange}
//                                     placeholder="e.g., editor@jcs.com"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Start Month */}
//                             <div className="relative" ref={refStartMonth}>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Start Month *
//                                 </label>
//                                 <select
//                                     name="startMonth"
//                                     value={journal.startMonth}
//                                     onChange={handleChange}
//                                     onClick={() => setShowdownsm(!showdownsm)}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm appearance-none"
//                                     required
//                                 >
//                                     <option value="">Select Month</option>
//                                     {[
//                                         "January", "February", "March", "April", "May", "June",
//                                         "July", "August", "September", "October", "November", "December"
//                                     ].map((month) => (
//                                         <option key={month} value={month}>
//                                             {month}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                                     <svg
//                                         className={`fill-current h-5 w-5 mt-2 ${showdownsm ? "rotate-180" : "rotate-0"}`}
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 20 20"
//                                     >
//                                         <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
//                                     </svg>
//                                 </div>
//                             </div>

//                             {/* Start Year */}
//                             <div className="relative" ref={refYear}>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Start Year *
//                                 </label>
//                                 <select
//                                     name="startYear"
//                                     value={journal.startYear}
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
//                                         className={`fill-current h-5 w-5 mt-2 ${showdowny ? "rotate-180" : "rotate-0"}`}
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 20 20"
//                                     >
//                                         <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
//                                     </svg>
//                                 </div>
//                             </div>

//                             {/* Subscription Price */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Subscription Price
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="subPrice"
//                                     value={journal.subPrice}
//                                     onChange={handleChange}
//                                     placeholder="e.g., $100"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Subject Area */}
//                             <div className="col-span-2">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Subject Area *
//                                 </label>
//                                 <Editor
//                                     apiKey="nxdubw1uzkbvetym5t6krqxoi3rcxm1nz8xndt774kqqaji4"
//                                     value={journal.subjectArea}
//                                     init={{
//                                         height: 300,
//                                         menubar: false,
//                                         plugins:
//                                             "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
//                                         toolbar:
//                                             "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
//                                     }}
//                                     onEditorChange={handleEditorChange("subjectArea")}
//                                 />
//                             </div>

//                             {/* About */}
//                             <div className="col-span-2">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     About
//                                 </label>
//                                 <Editor
//                                     apiKey="nxdubw1uzkbvetym5t6krqxoi3rcxm1nz8xndt774kqqaji4"
//                                     value={journal.about}
//                                     init={{
//                                         height: 300,
//                                         menubar: false,
//                                         plugins:
//                                             "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
//                                         toolbar:
//                                             "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
//                                     }}
//                                     onEditorChange={handleEditorChange("about")}
//                                 />
//                             </div>

//                             {/* Aim and Scope */}
//                             <div className="col-span-2">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Aim and Scope
//                                 </label>
//                                 <Editor
//                                     apiKey="nxdubw1uzkbvetym5t6krqxoi3rcxm1nz8xndt774kqqaji4"
//                                     value={journal.aimandscope}
//                                     init={{
//                                         height: 300,
//                                         menubar: false,
//                                         plugins:
//                                             "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
//                                         toolbar:
//                                             "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
//                                     }}
//                                     onEditorChange={handleEditorChange("aimandscope")}
//                                 />
//                             </div>

//                             {/* Indexing */}
//                             <div className="col-span-2">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Indexing
//                                 </label>
//                                 <Editor
//                                     apiKey="nxdubw1uzkbvetym5t6krqxoi3rcxm1nz8xndt774kqqaji4"
//                                     value={journal.indexing}
//                                     init={{
//                                         height: 300,
//                                         menubar: false,
//                                         plugins:
//                                             "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
//                                         toolbar:
//                                             "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
//                                     }}
//                                     onEditorChange={handleEditorChange("indexing")}
//                                 />
//                             </div>

//                             {/* Cover Image */}
//                             <div className="col-span-2">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">
//                                     Cover Image
//                                 </label>
//                                 <input
//                                     type="file"
//                                     name="coverImage"
//                                     onChange={handleFileChange}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     accept="image/*"
//                                 />
//                                 {location.state && location.state.journal && coverPage && !removeImage && (
//                                     <div className="mt-2">
//                                         <p className="text-sm text-gray-500">Current cover:</p>
//                                         <div className="relative inline-block">
//                                             <img
//                                                 src={coverPage}
//                                                 alt="Cover"
//                                                 className="w-32 h-32 object-cover border"
//                                                 onError={(e) => {
//                                                     e.target.src = "/default-image.png";
//                                                 }}
//                                             />
//                                             <button
//                                                 type="button"
//                                                 onClick={handleRemoveImage}
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
//                                     className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors shadow-md ${loading || !currentUser ? "opacity-50 cursor-not-allowed" : ""}`}
//                                     disabled={loading || !currentUser}
//                                 >
//                                     {loading
//                                         ? "Saving..."
//                                         : location.state && location.state.journal
//                                             ? "Update"
//                                             : "Save"}
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => {
//                                         navigate("/journals");
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

// export default JournalsAddNew;


import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import Sidebar from "../sidebar";

const JournalsAddNew = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const refStartMonth = useRef(null);
    const refYear = useRef(null);

    const [modal, setModal] = useState({ show: false, type: "", message: "" });
    const [journal, setJournal] = useState(null);
    const [coverPage, setCoverPage] = useState(null);
    const [disciplines, setDisciplines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [removeImage, setRemoveImage] = useState(false);
    const [showdownsm, setShowdownsm] = useState(false);
    const [showdowny, setShowdowny] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [validUserIds, setValidUserIds] = useState([]);

    const BASE_URL = "https://iassrd.com:8081/api/v1";

    // Handle outside click to close dropdowns
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
        handleOutsideClick(refStartMonth, () => setShowdownsm(false));
        handleOutsideClick(refYear, () => setShowdowny(false));
    }, []);

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
                    if (matchedUser && matchedUser.userId) {
                        setCurrentUser(matchedUser);
                        setValidUserIds(response.data.data.map((user) => user.userId));
                    } else {
                        setModal({
                            show: true,
                            type: "error",
                            message: "User not found or invalid user data. Please log in again.",
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
            
                setModal({
                    show: true,
                    type: "error",
                    message: "Error fetching user data: " + err.message,
                });
            }
        };
        fetchCurrentUser();
    }, []);

    // Fetch disciplines
    useEffect(() => {
        axios
            .get(`${BASE_URL}/disciplines`)
            .then((response) => {
                if (response.data.success) {
                    setDisciplines(response.data.data);
                } else {
                    setModal({
                        show: true,
                        type: "error",
                        message: `Failed to fetch disciplines: ${response.data.message}`,
                    });
                }
            })
            .catch((error) => {
                setModal({
                    show: true,
                    type: "error",
                    message: `Error fetching disciplines: ${error.message}`,
                });
            });
    }, []);

    // Initialize journal state
    useEffect(() => {
        
        if (location.state?.journal) {
            const { journalId, createdUserId, createdUserType, ...editableFields } = location.state.journal;
            if (!createdUserId) {
                console.warn("Missing createdUserId in location.state.journal:", location.state.journal);
                setModal({
                    show: true,
                    type: "error",
                    message: "Invalid journal data: Missing created user ID.",
                });
                return;
            }
            setJournal({
                ...editableFields,
                createdUserId,
                createdUserType: createdUserType || 2,
                updatedUserId: currentUser?.userId || editableFields.updatedUserId,
                updatedUserType: currentUser?.role === "ADMIN" ? 1 : 2,
            });
            if (location.state.journal.coverPage) {
                setCoverPage(
                    location.state.journal.coverPage.startsWith("/")
                        ? `${BASE_URL}${location.state.journal.coverPage}`
                        : location.state.journal.coverPage
                );
            }
        } else if (currentUser?.userId) {
            setJournal({
                disciplineId: "",
                journalKey: "",
                journalName: "",
                abbrevation: "",
                topic: "",
                issnOnline: "",
                issnPrint: "",
                googleScholar: "",
                doi: "",
                publicationFrequency: "",
                subjectArea: "",
                about: "",
                aimandscope: "",
                indexing: "",
                coden: "",
                email: "",
                startMonth: "",
                startYear: "",
                coverPage: "",
                subPrice: "",
                createdUserId: currentUser.userId,
                createdUserType: currentUser.role === "ADMIN" ? 1 : 2,
                updatedUserId: currentUser.userId,
                updatedUserType: currentUser.role === "ADMIN" ? 1 : 2,
            });
        }
    }, [location.state, currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJournal((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setCoverPage(e.target.files[0]);
        setRemoveImage(false);
    };

    const handleEditorChange = (field) => (content) => {
        setJournal((prev) => ({ ...prev, [field]: content }));
    };

    const handleRemoveImage = () => {
        setCoverPage(null);
        setRemoveImage(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser || !currentUser.userId) {
            setModal({
                show: true,
                type: "error",
                message: "User data not available. Please try again.",
            });
            return;
        }

        setLoading(true);
        setMessage("");
        setModal({ show: false, type: "", message: "" });

        // Basic validation
        if (!journal.disciplineId || !journal.journalKey || !journal.journalName || !journal.publicationFrequency || !journal.startMonth || !journal.startYear) {
            setModal({
                show: true,
                type: "error",
                message: "Please fill in all required fields.",
            });
            setLoading(false);
            return;
        }

        // Validate createdUserId
        const isValidCreatedUserId = validUserIds.includes(journal.createdUserId);
        let finalCreatedUserId = journal.createdUserId;
        if (!isValidCreatedUserId) {
            console.warn(`createdUserId ${journal.createdUserId} is not valid. Falling back to currentUser.userId: ${currentUser.userId}`);
            finalCreatedUserId = currentUser.userId;
        }

        const isEditing = location.state?.journal?.journalId;

        try {
            const formData = new FormData();
            const journalData = {
                disciplineId: journal.disciplineId || "",
                journalKey: journal.journalKey || "",
                journalName: journal.journalName || "",
                abbrevation: journal.abbrevation || "",
                topic: journal.topic || "",
                issnOnline: journal.issnOnline || "",
                issnPrint: journal.issnPrint || "",
                googleScholar: journal.googleScholar || "",
                doi: journal.doi || "",
                publicationFrequency: journal.publicationFrequency || "",
                subjectArea: journal.subjectArea || "",
                about: journal.about || "",
                aimandscope: journal.aimandscope || "",
                indexing: journal.indexing || "",
                coden: journal.coden || "",
                email: journal.email || "",
                startMonth: journal.startMonth || "",
                startYear: journal.startYear || "",
                subPrice: journal.subPrice || "",
                createdUserId: finalCreatedUserId,
                createdUserType: journal.createdUserType || (currentUser.role === "ADMIN" ? 1 : 2),
                updatedUserId: currentUser.userId,
                updatedUserType: currentUser.role === "ADMIN" ? 1 : 2,
            };

   

            formData.append("journal", new Blob([JSON.stringify(journalData)], { type: "application/json" }));

            if (coverPage && typeof coverPage !== "string") {
                formData.append("coverImage", coverPage);
            }

            formData.append("removeImage", removeImage ? "true" : "false");

            const config = { headers: { "Content-Type": "multipart/form-data" } };
            let response;
            if (isEditing) {
                response = await axios.put(`${BASE_URL}/journals/${location.state.journal.journalId}`, formData, config);
            } else {
                response = await axios.post(`${BASE_URL}/journals`, formData, config);
            }

            if (response && (response.status === 200 || response.status === 201)) {
                setModal({
                    show: true,
                    type: "success",
                    message: isEditing ? "Journal updated successfully!" : "Journal added successfully!",
                });
                setMessage(isEditing ? "Journal updated successfully!" : "Journal added successfully!");
                setTimeout(() => {
                    setModal({ show: false, type: "", message: "" });
                    navigate("/journals");
                    window.scrollTo(0, 0);
                }, 800);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            setModal({
                show: true,
                type: "error",
                message: `Failed to ${isEditing ? "update" : "add"} journal: ${errorMessage}`,
            });
            setMessage(`Failed to ${isEditing ? "update" : "add"} journal: ${errorMessage}`);
      
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-blue-50">
            <header className="fixed top-0 left-0 w-full z-100 bg-blue-900 text-white py-4 px-6 flex items-center justify-between z-40">
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
                        {location.state?.journal ? "Edit Journal" : "Add New Journal"}
                    </h1>
                    <p className="text-sm opacity-90 mt-1">
                        {location.state?.journal
                            ? "Update an existing journal entry."
                            : "Create a new journal entry for your dashboard."}
                    </p>
                </header>

                <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
                    <h2 className="text-xl font-semibold text-blue-600 mb-6">
                        {location.state?.journal ? "Edit Journal" : "Add New Journal"}
                    </h2>

                    {message && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                            {message}
                        </div>
                    )}

                    {journal && (
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative">
                                <label className="block text-sm font-medium text-blue-600 mb-1">
                                    Discipline *
                                </label>
                                <select
                                    name="disciplineId"
                                    value={journal.disciplineId}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    required
                                >
                                    <option value="">-- Select Discipline --</option>
                                    {disciplines.length > 0 ? (
                                        disciplines.map((discipline) => (
                                            <option key={discipline.disciplineId} value={discipline.disciplineId}>
                                                {discipline.disciplineName}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>No disciplines available</option>
                                    )}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">
                                    Journal ID *
                                </label>
                                <input
                                    type="text"
                                    name="journalKey"
                                    value={journal.journalKey}
                                    onChange={handleChange}
                                    placeholder="e.g., JNL-CS-001"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">
                                    Journal Name *
                                </label>
                                <input
                                    type="text"
                                    name="journalName"
                                    value={journal.journalName}
                                    onChange={handleChange}
                                    placeholder="e.g., Journal of Social Science"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">
                                    Abbreviation
                                </label>
                                <input
                                    type="text"
                                    name="abbrevation"
                                    value={journal.abbrevation}
                                    onChange={handleChange}
                                    placeholder="e.g., JCS"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">
                                    Topic
                                </label>
                                <input
                                    type="text"
                                    name="topic"
                                    value={journal.topic}
                                    onChange={handleChange}
                                    placeholder="e.g., Computer Social Science Research"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">
                                    ISSN Online
                                </label>
                                <input
                                    type="text"
                                    name="issnOnline"
                                    value={journal.issnOnline}
                                    onChange={handleChange}
                                    placeholder="e.g., 1234-5678"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">
                                    ISSN Print
                                </label>
                                <input
                                    type="text"
                                    name="issnPrint"
                                    value={journal.issnPrint}
                                    onChange={handleChange}
                                    placeholder="e.g., 4321-8765"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">
                                    Google Scholar
                                </label>
                                <input
                                    type="text"
                                    name="googleScholar"
                                    value={journal.googleScholar}
                                    onChange={handleChange}
                                    placeholder="e.g., https://scholar.google.com/jcs"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">
                                    DOI
                                </label>
                                <input
                                    type="text"
                                    name="doi"
                                    value={journal.doi}
                                    onChange={handleChange}
                                    placeholder="e.g., 10.1000/jcs001"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-blue-600 mb-1">
                                    Publication Frequency *
                                </label>
                                <select
                                    name="publicationFrequency"
                                    value={journal.publicationFrequency}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm appearance-none"
                                    required
                                >
                                    <option value="">Select Frequency</option>
                                    <option value="One issue per year">One issue per year</option>
                                    <option value="Two issues per year">Two issues per year</option>
                                    <option value="Three issues per year">Three issues per year</option>
                                    <option value="Four issues per year">Four issues per year</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">
                                    Coden
                                </label>
                                <input
                                    type="text"
                                    name="coden"
                                    value={journal.coden}
                                    onChange={handleChange}
                                    placeholder="e.g., C1234"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={journal.email}
                                    onChange={handleChange}
                                    placeholder="e.g., editor@jcs.com"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>

                            <div className="relative" ref={refStartMonth}>
                                <label className="block text-sm font-medium text-blue-600 mb-1">
                                    Start Month *
                                </label>
                                <select
                                    name="startMonth"
                                    value={journal.startMonth}
                                    onChange={handleChange}
                                    onClick={() => setShowdownsm(!showdownsm)}
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm appearance-none"
                                    required
                                >
                                    <option value="">Select Month</option>
                                    {[
                                        "January", "February", "March", "April", "May", "June",
                                        "July", "August", "September", "October", "November", "December"
                                    ].map((month) => (
                                        <option key={month} value={month}>
                                            {month}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg
                                        className={`fill-current h-5 w-5 mt-2 ${showdownsm ? "rotate-180" : "rotate-0"}`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="relative" ref={refYear}>
                                <label className="block text-sm font-medium text-blue-600 mb-1">
                                    Start Year *
                                </label>
                                <select
                                    name="startYear"
                                    value={journal.startYear}
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
                                        className={`fill-current h-5 w-5 mt-2 ${showdowny ? "rotate-180" : "rotate-0"}`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">
                                    Subscription Price
                                </label>
                                <input
                                    type="text"
                                    name="subPrice"
                                    value={journal.subPrice}
                                    onChange={handleChange}
                                    placeholder="e.g., $100"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-blue-600 mb-1">
                                    Subject Area *
                                </label>
                                <Editor
                                    apiKey="nxdubw1uzkbvetym5t6krqxoi3rcxm1nz8xndt774kqqaji4"
                                    value={journal.subjectArea}
                                    init={{
                                        height: 300,
                                        menubar: false,
                                        plugins:
                                            "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
                                        toolbar:
                                            "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
                                    }}
                                    onEditorChange={handleEditorChange("subjectArea")}
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-blue-600 mb-1">
                                    About
                                </label>
                                <Editor
                                    apiKey="nxdubw1uzkbvetym5t6krqxoi3rcxm1nz8xndt774kqqaji4"
                                    value={journal.about}
                                    init={{
                                        height: 300,
                                        menubar: false,
                                        plugins:
                                            "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
                                        toolbar:
                                            "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
                                    }}
                                    onEditorChange={handleEditorChange("about")}
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-blue-600 mb-1">
                                    Aim and Scope
                                </label>
                                <Editor
                                    apiKey="nxdubw1uzkbvetym5t6krqxoi3rcxm1nz8xndt774kqqaji4"
                                    value={journal.aimandscope}
                                    init={{
                                        height: 300,
                                        menubar: false,
                                        plugins:
                                            "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
                                        toolbar:
                                            "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
                                    }}
                                    onEditorChange={handleEditorChange("aimandscope")}
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-blue-600 mb-1">
                                    Indexing
                                </label>
                                <Editor
                                    apiKey="nxdubw1uzkbvetym5t6krqxoi3rcxm1nz8xndt774kqqaji4"
                                    value={journal.indexing}
                                    init={{
                                        height: 300,
                                        menubar: false,
                                        plugins:
                                            "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
                                        toolbar:
                                            "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
                                    }}
                                    onEditorChange={handleEditorChange("indexing")}
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-blue-600 mb-1">
                                    Cover Image
                                </label>
                                <input
                                    type="file"
                                    name="coverImage"
                                    onChange={handleFileChange}
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    accept="image/*"
                                />
                                {location.state?.journal && coverPage && !removeImage && (
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">Current cover:</p>
                                        <div className="relative inline-block">
                                            <img
                                                src={coverPage}
                                                alt="Cover"
                                                className="w-32 h-32 object-cover border"
                                                onError={(e) => {
                                                    e.target.src = "/default-image.png";
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={handleRemoveImage}
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
                                        : location.state?.journal
                                        ? "Update"
                                        : "Save"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        navigate("/journals");
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

export default JournalsAddNew;