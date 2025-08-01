// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Sidebar from "../sidebar";
// import axios from "axios";
// import { Editor } from "@tinymce/tinymce-react";
// import { FaSearch } from "react-icons/fa";

// const BASE_URL = "https://iassrd.com:8081/api/v1";

// const AddNewArticle = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const articleToEdit = location.state?.article || null;
//     const dropdownRef = useRef(null);
//     const searchInputRef = useRef(null);

//     const [formData, setFormData] = useState({
//         articleKey: "",
//         articleTitle: "",
//         journalId: "",
//         doi: "",
//         pageFrom: "",
//         pageTo: "",
//         volume: "",
//         issue: "",
//         monthFrom: "",
//         monthTo: "",
//         year: "",
//         dateOfReceived: "",
//         dateOfAcceptance: "",
//         dateOfPublication: "",
//         abstractText: "",
//         copyright: "",
//         keywords: "",
//         reference: "",
//         authorIds: "",
//         correspondingAuthor: "",
//         downloads: "",
//         views: "",
//         citation: "",
//         shareCount: "",
//         googleScholar: "false",
//         status: 1,
//         createdUserId: "",
//         createdUserType: "",
//         updatedUserId: "",
//         updatedUserType: "",
//     });
//     const [articleFile, setArticleFile] = useState(null);
//     const [removeFile, setRemoveFile] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [modal, setModal] = useState({ show: false, type: "", message: "" });
//     const [showAuthorModal, setShowAuthorModal] = useState(false);
//     const [authors, setAuthors] = useState([]);
//     const [selectedAuthors, setSelectedAuthors] = useState([]);
//     const [correspondingAuthorId, setCorrespondingAuthorId] = useState(null);
//     const [searchAuthorTerm, setSearchAuthorTerm] = useState("");
//     const [journals, setJournals] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [journalIssues, setJournalIssues] = useState([]);
//     const [uniqueVolumes, setUniqueVolumes] = useState([]);
//     const [availableIssues, setAvailableIssues] = useState([]);
//     const [currentUser, setCurrentUser] = useState(null);

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

//     // Update formData when currentUser or articleToEdit changes
//     useEffect(() => {
//         if (currentUser) {
//             setFormData((prev) => ({
//                 ...prev,
//                 articleKey: articleToEdit?.articleKey || "",
//                 articleTitle: articleToEdit?.articleTitle || "",
//                 journalId: articleToEdit?.journalId?.toString() || "",
//                 doi: articleToEdit?.doi || "",
//                 pageFrom: articleToEdit?.pageFrom || "",
//                 pageTo: articleToEdit?.pageTo || "",
//                 volume: articleToEdit?.volume || "",
//                 issue: articleToEdit?.issue || "",
//                 monthFrom: articleToEdit?.monthFrom || "",
//                 monthTo: articleToEdit?.monthTo || "",
//                 year: articleToEdit?.year || "",
//                 dateOfReceived: articleToEdit?.dateOfReceived || "",
//                 dateOfAcceptance: articleToEdit?.dateOfAcceptance || "",
//                 dateOfPublication: articleToEdit?.dateOfPublication || "",
//                 abstractText: articleToEdit?.abstractText || "",
//                 copyright: articleToEdit?.copyright || "",
//                 keywords: articleToEdit?.keywords || "",
//                 reference: articleToEdit?.reference || "",
//                 authorIds: articleToEdit?.authorIds || "",
//                 correspondingAuthor: articleToEdit?.correspondingAuthor || "",
//                 downloads: articleToEdit?.downloads || "",
//                 views: articleToEdit?.views || "",
//                 citation: articleToEdit?.citation || "",
//                 shareCount: articleToEdit?.shareCount || "",
//                 googleScholar: articleToEdit?.googleScholar || "false",
//                 status: articleToEdit?.status !== undefined ? articleToEdit.status : 1,
//                 createdUserId: articleToEdit?.createdUserId || currentUser.userId,
//                 createdUserType: articleToEdit?.createdUserType || (currentUser.role === "ADMIN" ? 1 : 2),
//                 updatedUserId: currentUser.userId,
//                 updatedUserType: currentUser.role === "ADMIN" ? 1 : 2,
//             }));
//         }
//     }, [currentUser, articleToEdit]);

//     // Fetch journals and set journalId and searchTerm for articleToEdit
//     useEffect(() => {
//         const fetchJournals = async () => {
//             try {
//                 const response = await axios.get(`${BASE_URL}/journals`);
//                 if (response.data.success && Array.isArray(response.data.data)) {
//                     setJournals(response.data.data);
//                     if (articleToEdit && articleToEdit.journalId) {
//                         const selectedJournal = response.data.data.find(
//                             (journal) => journal.journalId.toString() === articleToEdit.journalId.toString()
//                         );
//                         if (selectedJournal) {
//                             setFormData((prev) => ({
//                                 ...prev,
//                                 journalId: articleToEdit.journalId.toString(),
//                             }));
//                             setSearchTerm(
//                                 selectedJournal.abbrevation
//                                     ? `${selectedJournal.journalName} (${selectedJournal.abbrevation})`
//                                     : selectedJournal.journalName
//                             );
//                         }
//                     }
//                 } else {
//                     setJournals([]);
//                     setModal({
//                         show: true,
//                         type: "error",
//                         message: "No journals found. Using default journal ID.",
//                     });
//                     setFormData((prev) => ({
//                         ...prev,
//                         journalId: "7",
//                     }));
//                 }
//             } catch (err) {
//                 console.error("Error fetching journals:", err);
//                 setModal({
//                     show: true,
//                     type: "error",
//                     message: "Error fetching journals: " + err.message,
//                 });
//                 setJournals([]);
//                 setFormData((prev) => ({
//                     ...prev,
//                     journalId: "7",
//                 }));
//             }
//         };
//         fetchJournals();
//     }, [articleToEdit]);

//     // Fetch journal issues and populate volumes
//     useEffect(() => {
//         if (formData.journalId) {
//             const fetchJournalIssues = async () => {
//                 try {
//                     const response = await axios.get(`${BASE_URL}/journal-issues`);
//                     if (!response.data.success || !Array.isArray(response.data.data)) {
//                         throw new Error("Invalid journal issues data received");
//                     }
//                     const filteredIssues = response.data.data.filter(
//                         (issue) => issue.journalsId && issue.journalsId.toString() === formData.journalId
//                     );
//                     setJournalIssues(filteredIssues);

//                     const volumes = [
//                         ...new Set(
//                             filteredIssues
//                                 .map((issue) => issue.volumeNo)
//                                 .filter((volume) => volume)
//                         ),
//                     ].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
//                     setUniqueVolumes(volumes);

//                     // Only reset volume/issue if they are not valid for the selected journal
//                     if (!volumes.includes(formData.volume)) {
//                         setFormData((prev) => ({ ...prev, volume: "", issue: "" }));
//                     }
//                 } catch (error) {
//                     console.error("Error fetching journal issues:", error);
//                     setModal({
//                         show: true,
//                         type: "error",
//                         message: "Error fetching journal issues: " + error.message,
//                     });
//                     setJournalIssues([]);
//                     setUniqueVolumes([]);
//                     setAvailableIssues([]);
//                 }
//             };
//             fetchJournalIssues();
//         } else {
//             setJournalIssues([]);
//             setUniqueVolumes([]);
//             setAvailableIssues([]);
//             setFormData((prev) => ({ ...prev, volume: "", issue: "" }));
//         }
//     }, [formData.journalId]);

//     // Populate issues for selected volume
//     useEffect(() => {
//         if (formData.volume && journalIssues.length > 0) {
//             const issuesForVolume = [
//                 ...new Set(
//                     journalIssues
//                         .filter((issue) => issue.volumeNo === formData.volume)
//                         .map((issue) => issue.issueNo)
//                         .filter((issue) => issue)
//                 ),
//             ].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
//             setAvailableIssues(issuesForVolume);

//             // Only reset issue if it is not valid for the selected volume
//             if (!issuesForVolume.includes(formData.issue)) {
//                 setFormData((prev) => ({ ...prev, issue: "" }));
//             }
//         } else {
//             setAvailableIssues([]);
//             setFormData((prev) => ({ ...prev, issue: "" }));
//         }
//     }, [formData.volume, journalIssues]);

//     useEffect(() => {
//         if (showAuthorModal) {
//             const fetchAuthors = async () => {
//                 try {
//                     const response = await axios.get(`${BASE_URL}/authors`, {
//                         params: { page: 1, limit: 100 },
//                     });
//                     if (Array.isArray(response.data.data)) {
//                         setAuthors(response.data.data);
//                     } else if (Array.isArray(response.data)) {
//                         setAuthors(response.data);
//                     } else {
//                         setAuthors([]);
//                         setModal({
//                             show: true,
//                             type: "error",
//                             message: "Failed to load authors. Received invalid data from the server.",
//                         });
//                     }
//                 } catch (err) {
//                     setModal({
//                         show: true,
//                         type: "error",
//                         message: "Error fetching authors: " + err.message,
//                     });
//                     setAuthors([]);
//                 }
//             };
//             fetchAuthors();
//         }
//     }, [showAuthorModal]);

//     useEffect(() => {
//         if (articleToEdit && articleToEdit.authorIds) {
//             const preloadAuthors = async () => {
//                 try {
//                     const authorIds = articleToEdit.authorIds
//                         .split(",")
//                         .map((id) => parseInt(id.trim()))
//                         .filter((id) => !isNaN(id));
//                     const authorPromises = authorIds.map((id) =>
//                         axios.get(`${BASE_URL}/authors/${id}`).then((res) => res.data.data[0] || res.data)
//                     );
//                     const authorResponses = await Promise.all(authorPromises);
//                     setSelectedAuthors(authorResponses.filter((author) => author));
//                     setCorrespondingAuthorId(
//                         articleToEdit.correspondingAuthor
//                             ? parseInt(articleToEdit.correspondingAuthor)
//                             : null
//                     );
//                 } catch (err) {
//                     setModal({
//                         show: true,
//                         type: "error",
//                         message: "Error fetching selected authors: " + err.message,
//                     });
//                     setSelectedAuthors([]);
//                 }
//             };
//             preloadAuthors();
//         }
//     }, [articleToEdit]);

//     const filteredJournals = journals.filter(
//         (journal) =>
//             journal.journalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             (journal.abbrevation &&
//                 journal.abbrevation.toLowerCase().includes(searchTerm.toLowerCase()))
//     );

//     const handleSelect = (journalId) => {
//         const selectedJournal = journals.find((journal) => journal.journalId === journalId);
//         if (selectedJournal) {
//             setFormData((prev) => ({ ...prev, journalId: journalId.toString(), volume: "", issue: "" }));
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
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleEditorChange = (content, field) => {
//         setFormData((prev) => ({
//             ...prev,
//             [field]: content,
//         }));
//     };

//     const handleFileChange = (e) => {
//         setArticleFile(e.target.files[0]);
//         setRemoveFile(false);
//     };

//     const handleRemoveFile = () => {
//         setArticleFile(null);
//         setRemoveFile(true);
//     };

//     const handleAddAuthor = (author) => {
//         setSelectedAuthors((prev) => [...prev, author]);
//         setShowAuthorModal(false);
//         const newAuthorIds = [...selectedAuthors, author].map((a) => a.authorId).join(",");
//         setFormData((prev) => ({
//             ...prev,
//             authorIds: newAuthorIds,
//         }));
//     };

//     const handleRemoveAuthor = (authorId) => {
//         setSelectedAuthors((prev) => prev.filter((author) => author.authorId !== authorId));
//         if (correspondingAuthorId === authorId) {
//             setCorrespondingAuthorId(null);
//         }
//         const newAuthorIds = selectedAuthors
//             .filter((author) => author.authorId !== authorId)
//             .map((a) => a.authorId)
//             .join(",");
//         setFormData((prev) => ({
//             ...prev,
//             authorIds: newAuthorIds,
//         }));
//     };

//     const handleCorrespondingAuthorChange = (authorId) => {
//         setCorrespondingAuthorId(authorId);
//         setFormData((prev) => ({
//             ...prev,
//             correspondingAuthor: authorId,
//         }));
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
//         setModal({ show: false, type: "", message: "" });

//         try {
//             const formDataToSend = new FormData();
//             const authorIds = selectedAuthors.map((author) => author.authorId).join(",");
//             const correspondingAuthor = correspondingAuthorId || "";

//             const articleData = {
//                 articleKey: formData.articleKey,
//                 articleTitle: formData.articleTitle,
//                 journalId: parseInt(formData.journalId) || 7,
//                 doi: formData.doi,
//                 pageFrom: formData.pageFrom,
//                 pageTo: formData.pageTo,
//                 volume: formData.volume,
//                 issue: formData.issue,
//                 monthFrom: formData.monthFrom,
//                 monthTo: formData.monthTo,
//                 year: formData.year,
//                 dateOfReceived: formData.dateOfReceived,
//                 dateOfAcceptance: formData.dateOfAcceptance,
//                 dateOfPublication: formData.dateOfPublication,
//                 abstractText: formData.abstractText,
//                 copyright: formData.copyright,
//                 keywords: formData.keywords,
//                 reference: formData.reference,
//                 authorIds: authorIds,
//                 correspondingAuthor: correspondingAuthor,
//                 downloads: parseInt(formData.downloads) || 0,
//                 views: parseInt(formData.views) || 0,
//                 citation: parseInt(formData.citation) || 0,
//                 shareCount: parseInt(formData.shareCount) || 0,
//                 googleScholar: formData.googleScholar,
//                 status: parseInt(formData.status),
//                 createdUserId: parseInt(formData.createdUserId) || parseInt(currentUser.userId),
//                 createdUserType: parseInt(formData.createdUserType) || (currentUser.role === "ADMIN" ? 1 : 2),
//                 updatedUserId: parseInt(currentUser.userId),
//                 updatedUserType: currentUser.role === "ADMIN" ? 1 : 2,
//             };

//             formDataToSend.append("article", new Blob([JSON.stringify(articleData)], { type: "application/json" }));
//             if (articleFile && typeof articleFile !== "string") {
//                 formDataToSend.append("articleFile", articleFile);
//             }
//             formDataToSend.append("removeFile", removeFile ? "true" : "false");

//             const config = { headers: { "Content-Type": "multipart/form-data" } };
//             let response;
//             if (articleToEdit) {
//                 response = await axios.put(
//                     `${BASE_URL}/articles/${articleToEdit.articleId}`,
//                     formDataToSend,
//                     config
//                 );
//             } else {
//                 response = await axios.post(
//                     `${BASE_URL}/articles`,
//                     formDataToSend,
//                     config
//                 );
//             }

//             if (response.data.success) {
//                 setModal({
//                     show: true,
//                     type: "success",
//                     message: articleToEdit ? "Article updated successfully!" : "Article added successfully!",
//                 });
//                 setTimeout(() => {
//                     setModal({ show: false, type: "", message: "" });
//                     navigate("/articles");
//                 }, 2000);
//             } else {
//                 setModal({
//                     show: true,
//                     type: "error",
//                     message: `Failed to ${articleToEdit ? "update" : "add"} article: ${response.data.message || "Unknown error"}`,
//                 });
//             }
//         } catch (err) {
//             setModal({
//                 show: true,
//                 type: "error",
//                 message: `Error: ${err.response?.data?.message || err.message}`,
//             });
//             console.error("Error saving article:", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleCancel = () => {
//         navigate("/articles");
//     };

//     const filteredAuthors = authors.filter((author) => {
//         const fullName = `${author.prefix || ""} ${author.firstName || ""} ${author.lastName || ""}`.toLowerCase();
//         return fullName.includes(searchAuthorTerm.toLowerCase());
//     });

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
//             <div className="w-screen p-6 pt-20 h-screen overflow-y-auto">
//                 <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-6 shadow-md ">
//                     <h1 className="text-2xl font-bold">{articleToEdit ? "Edit Article" : "Add New Article"}</h1>
//                     <p className="text-sm opacity-90 mt-1">
//                         {articleToEdit ? "Update the article details below." : "Fill in the details to add a new article."}
//                     </p>
//                 </header>

//                 <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
//                     <h2 className="text-xl font-semibold text-blue-600 mb-6">
//                         {articleToEdit ? "Edit Article" : "Add New Article"}
//                     </h2>

//                     {formData && (
//                         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Article Key *</label>
//                                 <input
//                                     type="text"
//                                     name="articleKey"
//                                     value={formData.articleKey}
//                                     onChange={handleChange}
//                                     placeholder="e.g., ART001"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Article Title *</label>
//                                 <input
//                                     type="text"
//                                     name="articleTitle"
//                                     value={formData.articleTitle}
//                                     onChange={handleChange}
//                                     placeholder="e.g., AI in Healthcare"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>

//                             <div className="relative" ref={dropdownRef}>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Journal Name *</label>
//                                 <div
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     onClick={() => setShowDropdown(!showDropdown)}
//                                 >
//                                     {searchTerm || "Select Journal"}
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
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">DOI</label>
//                                 <input
//                                     type="text"
//                                     name="doi"
//                                     value={formData.doi}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 10.1234/aihc2024"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Pages (Start and Length)</label>
//                                 <div className="flex gap-2">
//                                     <input
//                                         type="text"
//                                         name="pageFrom"
//                                         value={formData.pageFrom}
//                                         onChange={handleChange}
//                                         placeholder="Start (e.g., 1)"
//                                         className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     />
//                                     <input
//                                         type="text"
//                                         name="pageTo"
//                                         value={formData.pageTo}
//                                         onChange={handleChange}
//                                         placeholder="Length (e.g., 10)"
//                                         className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     />
//                                 </div>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Volume *</label>
//                                 <select
//                                     name="volume"
//                                     value={formData.volume}
//                                     onChange={handleChange}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 >
//                                     <option value="">Select Volume</option>
//                                     {uniqueVolumes.length > 0 ? (
//                                         uniqueVolumes.map((volume) => (
//                                             <option key={volume} value={volume}>
//                                                 {volume}
//                                             </option>
//                                         ))
//                                     ) : (
//                                         <option value="" disabled>
//                                             No volumes available
//                                         </option>
//                                     )}
//                                 </select>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Issue *</label>
//                                 <select
//                                     name="issue"
//                                     value={formData.issue}
//                                     onChange={handleChange}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                     disabled={!formData.volume}
//                                 >
//                                     <option value="">Select Issue</option>
//                                     {availableIssues.length > 0 ? (
//                                         availableIssues.map((issue) => (
//                                             <option key={issue} value={issue}>
//                                                 {issue}
//                                             </option>
//                                         ))
//                                     ) : (
//                                         <option value="" disabled>
//                                             {formData.volume ? "No issues available" : "Select a volume first"}
//                                         </option>
//                                     )}
//                                 </select>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Month From</label>
//                                 <select
//                                     name="monthFrom"
//                                     value={formData.monthFrom}
//                                     onChange={handleChange}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 >
//                                     <option value="">Select Month</option>
//                                     {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
//                                         <option key={month} value={month}>{month}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Month To</label>
//                                 <select
//                                     name="monthTo"
//                                     value={formData.monthTo}
//                                     onChange={handleChange}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 >
//                                     <option value="">Select Month</option>
//                                     {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
//                                         <option key={month} value={month}>{month}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Year</label>
//                                 <select
//                                     name="year"
//                                     value={formData.year}
//                                     onChange={handleChange}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 >
//                                     <option value="">Select Year</option>
//                                     {Array.from({ length: 21 }, (_, index) => 2010 + index).map((year) => (
//                                         <option key={year} value={year}>{year}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Date of Received</label>
//                                 <input
//                                     type="date"
//                                     name="dateOfReceived"
//                                     value={formData.dateOfReceived}
//                                     onChange={handleChange}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Date of Acceptance</label>
//                                 <input
//                                     type="date"
//                                     name="dateOfAcceptance"
//                                     value={formData.dateOfAcceptance}
//                                     onChange={handleChange}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Date of Publication</label>
//                                 <input
//                                     type="date"
//                                     name="dateOfPublication"
//                                     value={formData.dateOfPublication}
//                                     onChange={handleChange}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             <div className="col-span-2">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Abstract Text</label>
//                                 <Editor
//                                     apiKey="nxdubw1uzkbvetym5t6krqxoi3rcxm1nz8xndt774kqqaji4"
//                                     value={formData.abstractText}
//                                     init={{
//                                         height: 300,
//                                         menubar: false,
//                                         plugins: "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
//                                         toolbar: "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
//                                     }}
//                                     onEditorChange={(content) => handleEditorChange(content, "abstractText")}
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Copyright</label>
//                                 <input
//                                     type="text"
//                                     name="copyright"
//                                     value={formData.copyright}
//                                     onChange={handleChange}
//                                     placeholder="e.g., © 2024 AI Journals"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Keywords</label>
//                                 <textarea
//                                     name="keywords"
//                                     value={formData.keywords}
//                                     onChange={handleChange}
//                                     placeholder="e.g., AI, Healthcare, Innovation"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             <div className="col-span-2">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Reference</label>
//                                 <Editor
//                                     apiKey="nxdubw1uzkbvetym5t6krqxoi3rcxm1nz8xndt774kqqaji4"
//                                     value={formData.reference}
//                                     init={{
//                                         height: 300,
//                                         menubar: false,
//                                         plugins: "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
//                                         toolbar: "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
//                                     }}
//                                     onEditorChange={(content) => handleEditorChange(content, "reference")}
//                                 />
//                             </div>

//                             <div className="col-span-2">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Article File</label>
//                                 <input
//                                     type="file"
//                                     name="articleFile"
//                                     onChange={handleFileChange}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     accept=".pdf,.doc,.docx"
//                                 />
//                                 {articleToEdit && articleToEdit.articleFile && !removeFile && (
//                                     <div className="mt-2">
//                                         <p className="text-sm text-gray-500">Current file: {articleToEdit.articleFile}</p>
//                                         <button
//                                             type="button"
//                                             onClick={handleRemoveFile}
//                                             className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs rounded-full mt-1"
//                                         >
//                                             Remove
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>

//                             <div className="col-span-2">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Authors</label>
//                                 <div className="flex items-center gap-2">
//                                     <button
//                                         type="button"
//                                         onClick={() => setShowAuthorModal(true)}
//                                         className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
//                                     >
//                                         <FaSearch /> Search Authors
//                                     </button>
//                                 </div>

//                                 {selectedAuthors.length > 0 && (
//                                     <div className="mt-4">
//                                         <h3 className="text-lg font-semibold text-gray-700 mb-2">Selected Authors</h3>
//                                         <div className="bg-white rounded-lg shadow-md overflow-x-auto">
//                                             <table className="w-full table-auto">
//                                                 <thead>
//                                                     <tr className="bg-gray-200 text-gray-700 text-sm">
//                                                         <th className="p-3 text-left">Author Name</th>
//                                                         <th className="p-3 text-left">Department</th>
//                                                         <th className="p-3 text-left">University</th>
//                                                         <th className="p-3 text-left">Corresponding</th>
//                                                         <th className="p-3 text-left">Action</th>
//                                                     </tr>
//                                                 </thead>
//                                                 <tbody>
//                                                     {selectedAuthors.map((author) => (
//                                                         <tr
//                                                             key={author.authorId}
//                                                             className="border-t border-gray-200 text-gray-600 text-sm hover:bg-blue-50 transition-colors"
//                                                         >
//                                                             <td className="p-3">{`${author.prefix || ""} ${author.firstName} ${author.lastName}`}</td>
//                                                             <td className="p-3">{author.department || "N/A"}</td>
//                                                             <td className="p-3">{author.university || "N/A"}</td>
//                                                             <td className="p-3">
//                                                                 <input
//                                                                     type="checkbox"
//                                                                     checked={correspondingAuthorId === author.authorId}
//                                                                     onChange={() => handleCorrespondingAuthorChange(author.authorId)}
//                                                                     className="h-5 w-5 text-blue-500 border-blue-200 rounded focus:ring-blue-400"
//                                                                 />
//                                                             </td>
//                                                             <td className="p-3">
//                                                                 <button
//                                                                     type="button"
//                                                                     onClick={() => handleRemoveAuthor(author.authorId)}
//                                                                     className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-colors"
//                                                                 >
//                                                                     Remove
//                                                                 </button>
//                                                             </td>
//                                                         </tr>
//                                                     ))}
//                                                 </tbody>
//                                             </table>
//                                         </div>
//                                     </div>
//                                 )}
//                                 {selectedAuthors.length === 0 && articleToEdit?.authorIds && (
//                                     <div className="mt-4 text-sm text-gray-500">
//                                         <p>Author IDs: {articleToEdit.authorIds}</p>
//                                         <p>(Note: Individual author details could not be loaded. Use the search to add authors manually.)</p>
//                                     </div>
//                                 )}
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Google Scholar</label>
//                                 <select
//                                     name="googleScholar"
//                                     value={formData.googleScholar}
//                                     onChange={handleChange}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 >
//                                     <option value="true">Yes</option>
//                                     <option value="false">No</option>
//                                 </select>
//                             </div>

//                             <div className="flex justify-end gap-4 mt-6 col-span-2">
//                                 <button
//                                     type="submit"
//                                     disabled={loading || !currentUser}
//                                     className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors shadow-md ${loading || !currentUser ? "opacity-50 cursor-not-allowed" : ""}`}
//                                 >
//                                     {loading ? "Saving..." : articleToEdit ? "Update" : "Add"}
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={handleCancel}
//                                     className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-full transition-colors shadow-md"
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </form>
//                     )}
//                 </div>

//                 {/* {showAuthorModal && (
//                     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//                         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
//                             <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Authors</h3>
//                             <div className="mb-4">
//                                 <div className="relative">
//                                     <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
//                                     <input
//                                         type="text"
//                                         placeholder="Search by author name..."
//                                         value={searchAuthorTerm}
//                                         onChange={(e) => setSearchAuthorTerm(e.target.value)}
//                                         className="w-full pl-10 pr-4 py-2 bg-white border border-blue-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="bg-white rounded-lg shadow-md overflow-x-auto">
//                                 <table className="w-full table-auto">
//                                     <thead>
//                                         <tr className="bg-gray-200 text-gray-700 text-sm">
//                                             <th className="p-3 text-left">Author Name</th>
//                                             <th className="p-3 text-left">Department</th>
//                                             <th className="p-3 text-left">University</th>
//                                             <th className="p-3 text-left">Country</th>
//                                             <th className="p-3 text-left">Action</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {filteredAuthors.length === 0 ? (
//                                             <tr>
//                                                 <td colSpan="5" className="p-3 text-center text-gray-500">
//                                                     No authors found.
//                                                 </td>
//                                             </tr>
//                                         ) : (
//                                             filteredAuthors.map((author) => (
//                                                 <tr
//                                                     key={author.authorId}
//                                                     className="border-t border-gray-200 text-gray-600 text-sm hover:bg-blue-50 transition-colors"
//                                                 >
//                                                     <td className="p-3">{`${author.prefix || ""} ${author.firstName} ${author.lastName}`}</td>
//                                                     <td className="p-3">{author.department || "N/A"}</td>
//                                                     <td className="p-3">{author.university || "N/A"}</td>
//                                                     <td className="p-3">{author.country || "N/A"}</td>
//                                                     <td className="p-3">
//                                                         <button
//                                                             type="button"
//                                                             onClick={() => handleAddAuthor(author)}
//                                                             className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition-colors"
//                                                             disabled={selectedAuthors.some((a) => a.authorId === author.authorId)}
//                                                         >
//                                                             Add
//                                                         </button>
//                                                     </td>
//                                                 </tr>
//                                             ))
//                                         )}
//                                     </tbody>
//                                 </table>
//                             </div>
//                             <div className="flex justify-end mt-4">
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowAuthorModal(false)}
//                                     className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-full transition-colors shadow-md"
//                                 >
//                                     Close
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )} */}


// {showAuthorModal && (
//                     <div className="fixed  mt-5 inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 h-[100vh] ">
//                         <div className="bg-white p-4 py-10 my-4 rounded-lg shadow-lg min-w-4xl  h-[100%]">
//                             <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Authors</h3>
//                             <div className="mb-4">
//                                 <div className="relative">
//                                     <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500" />
//                                     <input
//                                         type="text"
//                                         placeholder="Search by author name..."
//                                         value={searchAuthorTerm}
//                                         onChange={(e) => setSearchAuthorTerm(e.target.value)}
//                                         className="w-full pl-10 pr-4 py-2 bg-white border border-indigo-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-[0_2px_6px_rgba(0,0,0,0.1)]"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="bg-white rounded-lg shadow-md overflow-x-auto h-[78%]">
//                                 <table className="w-full table-auto ">
//                                     <thead>
//                                         <tr className="bg-gray-100 text-gray-700 text-sm">
//                                             <th className="p-3 text-left">Author Name</th>
//                                             <th className="p-3 text-left">Department</th>
//                                             <th className="p-3 text-left">University</th>
//                                             <th className="p-3 text-left">Country</th>
//                                             <th className="p-3 text-left">Action</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {filteredAuthors.length === 0 ? (
//                                             <tr>
//                                                 <td colSpan="5" className="p-3 text-center text-gray-500">
//                                                     No authors found.
//                                                 </td>
//                                             </tr>
//                                         ) : (
//                                             filteredAuthors.map((author) => (
//                                                 <tr
//                                                     key={author.authorId}
//                                                     className="border-t border-gray-200 text-gray-600 text-sm hover:bg-teal-50 transition-colors"
//                                                 >
//                                                     <td className="p-3">{`${author.prefix || ""} ${author.firstName} ${author.lastName}`}</td>
//                                                     <td className="p-3">{author.department || "N/A"}</td>
//                                                     <td className="p-3">{author.university || "N/A"}</td>
//                                                     <td className="p-3">{author.country || "N/A"}</td>
//                                                     <td className="p-3">
//                                                         <button
//                                                             type="button"
//                                                             onClick={() => handleAddAuthor(author)}
//                                                             className="bg-teal-400 hover:bg-teal-500 text-white px-3 py-1 rounded-lg transition-colors"
//                                                             disabled={selectedAuthors.some((a) => a.authorId === author.authorId)}
//                                                         >
//                                                             Add
//                                                         </button>
//                                                     </td>
//                                                 </tr>
//                                             ))
//                                         )}
//                                     </tbody>
//                                 </table>
//                             </div>
//                             <div className="flex justify-end mt-4">
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowAuthorModal(false)}
//                                     className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded-full transition-colors shadow-[0_2px_6px_rgba(0,0,0,0.1)]"
//                                 >
//                                     Close
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}

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

// export default AddNewArticle;


import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../sidebar";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { FaSearch } from "react-icons/fa";

const BASE_URL = "https://iassrd.com:8081/api/v1";

const AddNewArticle = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const articleToEdit = location.state?.article || null;
    const dropdownRef = useRef(null);
    const searchInputRef = useRef(null);

    const [formData, setFormData] = useState({
        articleKey: "",
        articleTitle: "",
        journalId: "",
        doi: "",
        pageFrom: "",
        pageTo: "",
        volume: "",
        issue: "",
        monthFrom: "",
        monthTo: "",
        year: "",
        dateOfReceived: "",
        dateOfAcceptance: "",
        dateOfPublication: "",
        abstractText: "",
        copyright: "",
        keywords: "",
        reference: "",
        authorIds: "",
        correspondingAuthor: "",
        downloads: "",
        views: "",
        citation: "",
        shareCount: "",
        googleScholar: "false",
        status: 1,
        createdUserId: "",
        createdUserType: "",
        updatedUserId: "",
        updatedUserType: "",
        abbr: "",
    });
    const [articleFile, setArticleFile] = useState(null);
    const [removeFile, setRemoveFile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState({ show: false, type: "", message: "" });
    const [showAuthorModal, setShowAuthorModal] = useState(false);
    const [authors, setAuthors] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [correspondingAuthorId, setCorrespondingAuthorId] = useState(null);
    const [searchAuthorTerm, setSearchAuthorTerm] = useState("");
    const [journals, setJournals] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [journalIssues, setJournalIssues] = useState([]);
    const [uniqueVolumes, setUniqueVolumes] = useState([]);
    const [availableIssues, setAvailableIssues] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [journalAbbreviation, setJournalAbbreviation] = useState("");

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
        if (currentUser) {
            setFormData((prev) => ({
                ...prev,
                articleKey: articleToEdit?.articleKey || "",
                articleTitle: articleToEdit?.articleTitle || "",
                journalId: articleToEdit?.journalId?.toString() || "",
                doi: articleToEdit?.doi || "",
                pageFrom: articleToEdit?.pageFrom || "",
                pageTo: articleToEdit?.pageTo || "",
                volume: articleToEdit?.volume || "",
                issue: articleToEdit?.issue || "",
                monthFrom: articleToEdit?.monthFrom || "",
                monthTo: articleToEdit?.monthTo || "",
                year: articleToEdit?.year || "",
                dateOfReceived: articleToEdit?.dateOfReceived || "",
                dateOfAcceptance: articleToEdit?.dateOfAcceptance || "",
                dateOfPublication: articleToEdit?.dateOfPublication || "",
                abstractText: articleToEdit?.abstractText || "",
                copyright: articleToEdit?.copyright || "",
                keywords: articleToEdit?.keywords || "",
                reference: articleToEdit?.reference || "",
                authorIds: articleToEdit?.authorIds || "",
                correspondingAuthor: articleToEdit?.correspondingAuthor || "",
                downloads: articleToEdit?.downloads || "",
                views: articleToEdit?.views || "",
                citation: articleToEdit?.citation || "",
                shareCount: articleToEdit?.shareCount || "",
                googleScholar: articleToEdit?.googleScholar || "false",
                status: articleToEdit?.status !== undefined ? articleToEdit.status : 1,
                createdUserId: articleToEdit?.createdUserId || currentUser.userId,
                createdUserType: articleToEdit?.createdUserType || (currentUser.role === "ADMIN" ? 1 : 2),
                updatedUserId: currentUser.userId,
                updatedUserType: currentUser.role === "ADMIN" ? 1 : 2,
                abbr: articleToEdit?.abbr || "",
            }));
        }
    }, [currentUser, articleToEdit]);

    useEffect(() => {
        const fetchJournals = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/journals`);
                if (response.data.success && Array.isArray(response.data.data)) {
                    setJournals(response.data.data);
                    if (articleToEdit && articleToEdit.journalId) {
                        const selectedJournal = response.data.data.find(
                            (journal) => journal.journalId.toString() === articleToEdit.journalId.toString()
                        );
                        if (selectedJournal) {
                            setFormData((prev) => ({
                                ...prev,
                                journalId: articleToEdit.journalId.toString(),
                                abbr: selectedJournal.abbrevation || "",
                            }));
                            setSearchTerm(
                                selectedJournal.abbrevation
                                    ? `${selectedJournal.journalName} (${selectedJournal.abbrevation})`
                                    : selectedJournal.journalName
                            );
                            setJournalAbbreviation(selectedJournal.abbrevation || "");
                        }
                    }
                } else {
                    setJournals([]);
                    setModal({
                        show: true,
                        type: "error",
                        message: "No journals found. Using default journal ID.",
                    });
                    setFormData((prev) => ({
                        ...prev,
                        journalId: "7",
                        abbr: "",
                    }));
                    setJournalAbbreviation("");
                }
            } catch (err) {
                console.error("Error fetching journals:", err);
                setModal({
                    show: true,
                    type: "error",
                    message: "Error fetching journals: " + err.message,
                });
                setJournals([]);
                setFormData((prev) => ({
                    ...prev,
                    journalId: "7",
                    abbr: "",
                }));
                setJournalAbbreviation("");
            }
        };
        fetchJournals();
    }, [articleToEdit]);

    useEffect(() => {
        if (formData.journalId) {
            const fetchJournalIssues = async () => {
                try {
                    const response = await axios.get(`${BASE_URL}/journal-issues`);
                    if (!response.data.success || !Array.isArray(response.data.data)) {
                        throw new Error("Invalid journal issues data received");
                    }
                    const filteredIssues = response.data.data.filter(
                        (issue) => issue.journalsId && issue.journalsId.toString() === formData.journalId
                    );
                    setJournalIssues(filteredIssues);

                    const volumes = [
                        ...new Set(
                            filteredIssues
                                .map((issue) => issue.volumeNo)
                                .filter((volume) => volume)
                        ),
                    ].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
                    setUniqueVolumes(volumes);

                    if (!volumes.includes(formData.volume)) {
                        setFormData((prev) => ({ ...prev, volume: "", issue: "" }));
                    }
                } catch (error) {
                    console.error("Error fetching journal issues:", error);
                    setModal({
                        show: true,
                        type: "error",
                        message: "Error fetching journal issues: " + error.message,
                    });
                    setJournalIssues([]);
                    setUniqueVolumes([]);
                    setAvailableIssues([]);
                }
            };
            fetchJournalIssues();
        } else {
            setJournalIssues([]);
            setUniqueVolumes([]);
            setAvailableIssues([]);
            setFormData((prev) => ({ ...prev, volume: "", issue: "" }));
        }
    }, [formData.journalId]);

    // useEffect(() => {
    //     if (formData.volume && journalIssues.length > 0) {
    //         const issuesForVolume = [
    //             ...new Set(
    //                 journalIssues
    //                     .filter((issue) => issue.volumeNo === formData.volume)
    //                     .map((issue) => issue.issueNo)
    //                     .filter((issue) => issue)
    //             ),
    //         ].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    //         setAvailableIssues(issuesForVolume);

    //         if (!issuesForVolume.includes(formData.issue)) {
    //             setFormData((prev) => ({ ...prev, issue: "" }));
    //         }
    //     } else {
    //         setAvailableIssues([]);
    //         setFormData((prev) => ({ ...prev, issue: "" }));
    //     }
    // }, [formData.volume, journalIssues]);


    useEffect(() => {
        if (formData.volume && journalIssues.length > 0) {
            const issuesForVolume = [
                ...new Set(
                    journalIssues
                        .filter(
                            (issue) =>
                                issue.journalsId.toString() === formData.journalId &&
                                issue.volumeNo === formData.volume
                        )
                        .map((issue) => issue.issueNo)
                        .filter((issue) => issue)
                ),
            ].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
            setAvailableIssues(issuesForVolume);

            // In edit mode, preserve the issue if it is valid for the selected volume and journal
            if (
                articleToEdit &&
                formData.issue &&
                !issuesForVolume.includes(formData.issue)
            ) {
                setFormData((prev) => ({
                    ...prev,
                    issue: "",
                    monthFrom: "",
                    monthTo: "",
                    year: "",
                }));
            } else if (articleToEdit && formData.issue && issuesForVolume.includes(formData.issue)) {
                // Ensure monthFrom, monthTo, and year are set based on the selected issue
                const selectedIssue = journalIssues.find(
                    (issue) =>
                        issue.journalsId.toString() === formData.journalId &&
                        issue.volumeNo === formData.volume &&
                        issue.issueNo === formData.issue
                );
                if (selectedIssue) {
                    setFormData((prev) => ({
                        ...prev,
                        monthFrom: selectedIssue.fromMonth || "",
                        monthTo: selectedIssue.toMonth || "",
                        year: selectedIssue.year ? selectedIssue.year.toString() : "",
                    }));
                }
            }
        } else {
            setAvailableIssues([]);
            // Only reset issue and related fields if not in edit mode or volume is empty
            if (!formData.volume) {
                setFormData((prev) => ({
                    ...prev,
                    issue: "",
                    monthFrom: "",
                    monthTo: "",
                    year: "",
                }));
            }
        }
    }, [formData.volume, formData.journalId, journalIssues, articleToEdit]);

    useEffect(() => {
        if (showAuthorModal) {
            const fetchAuthors = async () => {
                try {
                    const response = await axios.get(`${BASE_URL}/authors`, {
                        params: { page: 1, limit: 100 },
                    });
                    if (Array.isArray(response.data.data)) {
                        setAuthors(response.data.data);
                    } else if (Array.isArray(response.data)) {
                        setAuthors(response.data);
                    } else {
                        setAuthors([]);
                        setModal({
                            show: true,
                            type: "error",
                            message: "Failed to load authors. Received invalid data from the server.",
                        });
                    }
                } catch (err) {
                    setModal({
                        show: true,
                        type: "error",
                        message: "Error fetching authors: " + err.message,
                    });
                    setAuthors([]);
                }
            };
            fetchAuthors();
        }
    }, [showAuthorModal]);

    useEffect(() => {
        if (articleToEdit && articleToEdit.authorIds) {
            const preloadAuthors = async () => {
                try {
                    const authorIds = articleToEdit.authorIds
                        .split(",")
                        .map((id) => parseInt(id.trim()))
                        .filter((id) => !isNaN(id));
                    const authorPromises = authorIds.map((id) =>
                        axios.get(`${BASE_URL}/authors/${id}`).then((res) => res.data.data[0] || res.data)
                    );
                    const authorResponses = await Promise.all(authorPromises);
                    setSelectedAuthors(authorResponses.filter((author) => author));
                    setCorrespondingAuthorId(
                        articleToEdit.correspondingAuthor
                            ? parseInt(articleToEdit.correspondingAuthor)
                            : null
                    );
                } catch (err) {
                    setModal({
                        show: true,
                        type: "error",
                        message: "Error fetching selected authors: " + err.message,
                    });
                    setSelectedAuthors([]);
                }
            };
            preloadAuthors();
        }
    }, [articleToEdit]);

    const filteredJournals = journals.filter(
        (journal) =>
            journal.journalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (journal.abbrevation &&
                journal.abbrevation.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleSelect = (journalId) => {
        const selectedJournal = journals.find((journal) => journal.journalId === journalId);
        if (selectedJournal) {
            setFormData((prev) => ({
                ...prev,
                journalId: journalId.toString(),
                volume: "",
                issue: "",
                abbr: selectedJournal.abbrevation || "",
            }));
            setSearchTerm(
                selectedJournal.abbrevation
                    ? `${selectedJournal.journalName} (${selectedJournal.abbrevation})`
                    : selectedJournal.journalName
            );
            setJournalAbbreviation(selectedJournal.abbrevation || "");
        }
        setShowDropdown(false);
    };

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData((prev) => ({
    //         ...prev,
    //         [name]: value,
    //     }));
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "volume") {
            // Reset issue, monthFrom, monthTo, and year when volume changes
            setFormData((prev) => ({
                ...prev,
                [name]: value,
                issue: "",
                monthFrom: "",
                monthTo: "",
                year: "",
            }));
        } else if (name === "issue" && value) {
            // Find the selected issue in journalIssues
            const selectedIssue = journalIssues.find(
                (issue) =>
                    issue.journalsId.toString() === formData.journalId &&
                    issue.volumeNo === formData.volume &&
                    issue.issueNo === value
            );
            if (selectedIssue) {
                setFormData((prev) => ({
                    ...prev,
                    [name]: value,
                    monthFrom: selectedIssue.fromMonth || "",
                    monthTo: selectedIssue.toMonth || "",
                    year: selectedIssue.year ? selectedIssue.year.toString() : "",
                }));
            } else {
                setFormData((prev) => ({
                    ...prev,
                    [name]: value,
                }));
            }
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleEditorChange = (content, field) => {
        setFormData((prev) => ({
            ...prev,
            [field]: content,
        }));
    };

    const handleFileChange = (e) => {
        setArticleFile(e.target.files[0]);
        setRemoveFile(false);
    };

    const handleRemoveFile = () => {
        setArticleFile(null);
        setRemoveFile(true);
    };

    const handleAddAuthor = (author) => {
        setSelectedAuthors((prev) => [...prev, author]);
        setShowAuthorModal(false);
        const newAuthorIds = [...selectedAuthors, author].map((a) => a.authorId).join(",");
        setFormData((prev) => ({
            ...prev,
            authorIds: newAuthorIds,
        }));
    };

    const handleRemoveAuthor = (authorId) => {
        setSelectedAuthors((prev) => prev.filter((author) => author.authorId !== authorId));
        if (correspondingAuthorId === authorId) {
            setCorrespondingAuthorId(null);
        }
        const newAuthorIds = selectedAuthors
            .filter((author) => author.authorId !== authorId)
            .map((a) => a.authorId)
            .join(",");
        setFormData((prev) => ({
            ...prev,
            authorIds: newAuthorIds,
        }));
    };

    const handleCorrespondingAuthorChange = (authorId) => {
        setCorrespondingAuthorId(authorId);
        setFormData((prev) => ({
            ...prev,
            correspondingAuthor: authorId,
        }));
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
            const authorIds = selectedAuthors.map((author) => author.authorId).join(",");
            const correspondingAuthor = correspondingAuthorId || "";

            const articleData = {
                articleKey: formData.articleKey,
                articleTitle: formData.articleTitle,
                journalId: parseInt(formData.journalId) || 7,
                doi: formData.doi,
                pageFrom: formData.pageFrom,
                pageTo: formData.pageTo,
                volume: formData.volume,
                issue: formData.issue,
                monthFrom: formData.monthFrom,
                monthTo: formData.monthTo,
                year: formData.year,
                dateOfReceived: formData.dateOfReceived,
                dateOfAcceptance: formData.dateOfAcceptance,
                dateOfPublication: formData.dateOfPublication,
                abstractText: formData.abstractText,
                copyright: formData.copyright,
                keywords: formData.keywords,
                reference: formData.reference,
                authorIds: authorIds,
                correspondingAuthor: correspondingAuthor,
                downloads: parseInt(formData.downloads) || 0,
                views: parseInt(formData.views) || 0,
                citation: parseInt(formData.citation) || 0,
                shareCount: parseInt(formData.shareCount) || 0,
                googleScholar: formData.googleScholar,
                status: parseInt(formData.status),
                createdUserId: parseInt(formData.createdUserId) || parseInt(currentUser.userId),
                createdUserType: parseInt(formData.createdUserType) || (currentUser.role === "ADMIN" ? 1 : 2),
                updatedUserId: parseInt(currentUser.userId),
                updatedUserType: currentUser.role === "ADMIN" ? 1 : 2,
                abbr: formData.abbr,
            };

            formDataToSend.append("article", new Blob([JSON.stringify(articleData)], { type: "application/json" }));
            if (articleFile && typeof articleFile !== "string") {
                formDataToSend.append("articleFile", articleFile);
            }
            formDataToSend.append("removeFile", removeFile ? "true" : "false");

            const config = { headers: { "Content-Type": "multipart/form-data" } };
            let response;
            if (articleToEdit) {
                response = await axios.put(
                    `${BASE_URL}/articles/${articleToEdit.articleId}`,
                    formDataToSend,
                    config
                );
            } else {
                response = await axios.post(
                    `${BASE_URL}/articles`,
                    formDataToSend,
                    config
                );
            }

            if (response.data.success) {
                setModal({
                    show: true,
                    type: "success",
                    message: articleToEdit ? "Article updated successfully!" : "Article added successfully!",
                });
                setTimeout(() => {
                    setModal({ show: false, type: "", message: "" });
                    navigate("/articles");
                }, 2000);
            } else {
                setModal({
                    show: true,
                    type: "error",
                    message: `Failed to ${articleToEdit ? "update" : "add"} article: ${response.data.message || "Unknown error"}`,
                });
            }
        } catch (err) {
            setModal({
                show: true,
                type: "error",
                message: `Error: ${err.response?.data?.message || err.message}`,
            });
            console.error("Error saving article:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/articles");
    };

    const filteredAuthors = authors.filter((author) => {
        const fullName = `${author.prefix || ""} ${author.firstName || ""} ${author.lastName || ""}`.toLowerCase();
        return fullName.includes(searchAuthorTerm.toLowerCase());
    });

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
            <div className="w-screen p-6 pt-20 h-screen overflow-y-auto">
                <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-6 shadow-md ">
                    <h1 className="text-2xl font-bold">{articleToEdit ? "Edit Article" : "Add New Article"}</h1>
                    <p className="text-sm opacity-90 mt-1">
                        {articleToEdit ? "Update the article details below." : "Fill in the details to add a new article."}
                    </p>
                </header>

                <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
                    <h2 className="text-xl font-semibold text-blue-600 mb-6">
                        {articleToEdit ? "Edit Article" : "Add New Article"}
                    </h2>

                    {formData && (
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Article Key *</label>
                                <input
                                    type="text"
                                    name="articleKey"
                                    value={formData.articleKey}
                                    onChange={handleChange}
                                    placeholder="e.g., ART001"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Article Title *</label>
                                <input
                                    type="text"
                                    name="articleTitle"
                                    value={formData.articleTitle}
                                    onChange={handleChange}
                                    placeholder="e.g., AI in Healthcare"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    required
                                />
                            </div>

                            <div className="relative" ref={dropdownRef}>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Journal Name *</label>
                                <div
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    onClick={() => setShowDropdown(!showDropdown)}
                                >
                                    {searchTerm || "Select Journal"}
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
                                <label className="block text-sm font-medium text-blue-600 mb-1">Abbreviation</label>
                                <input
                                    type="text"
                                    name="abbr"
                                    value={journalAbbreviation}
                                    readOnly
                                    placeholder="Journal abbreviation"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg bg-gray-100 cursor-not-allowed shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">DOI</label>
                                <input
                                    type="text"
                                    name="doi"
                                    value={formData.doi}
                                    onChange={handleChange}
                                    placeholder="e.g., 10.1234/aihc2024"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Pages (Start and Length)</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        name="pageFrom"
                                        value={formData.pageFrom}
                                        onChange={handleChange}
                                        placeholder="Start (e.g., 1)"
                                        className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    />
                                    <input
                                        type="text"
                                        name="pageTo"
                                        value={formData.pageTo}
                                        onChange={handleChange}
                                        placeholder="Length (e.g., 10)"
                                        className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Volume *</label>
                                <select
                                    name="volume"
                                    value={formData.volume}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    required
                                >
                                    <option value="">Select Volume</option>
                                    {uniqueVolumes.length > 0 ? (
                                        uniqueVolumes.map((volume) => (
                                            <option key={volume} value={volume}>
                                                {volume}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>
                                            No volumes available
                                        </option>
                                    )}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Issue *</label>
                                <select
                                    name="issue"
                                    value={formData.issue}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    required
                                    disabled={!formData.volume}
                                >
                                    <option value="">Select Issue</option>
                                    {availableIssues.length > 0 ? (
                                        availableIssues.map((issue) => (
                                            <option key={issue} value={issue}>
                                                {issue}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>
                                            {formData.volume ? "No issues available" : "Select a volume first"}
                                        </option>
                                    )}
                                </select>
                            </div>

                            {/* <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Month From</label>
                                <select
                                    name="monthFrom"
                                    value={formData.monthFrom}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                >
                                    <option value="">Select Month</option>
                                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                                        <option key={month} value={month}>{month}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Month To</label>
                                <select
                                    name="monthTo"
                                    value={formData.monthTo}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                >
                                    <option value="">Select Month</option>
                                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                                        <option key={month} value={month}>{month}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Year</label>
                                <select
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                >
                                    <option value="">Select Year</option>
                                    {Array.from({ length: 21 }, (_, index) => 2010 + index).map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div> */}

                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Month From</label>
                                <select
                                    name="monthFrom"
                                    value={formData.monthFrom}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    disabled={formData.issue}
                                >
                                    <option value="">Select Month</option>
                                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                                        <option key={month} value={month}>{month}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Month To</label>
                                <select
                                    name="monthTo"
                                    value={formData.monthTo}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    disabled={formData.issue}
                                >
                                    <option value="">Select Month</option>
                                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                                        <option key={month} value={month}>{month}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Year</label>
                                <select
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    disabled={formData.issue}
                                >
                                    <option value="">Select Year</option>
                                    {Array.from({ length: 21 }, (_, index) => 2010 + index).map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Date of Received</label>
                                <input
                                    type="date"
                                    name="dateOfReceived"
                                    value={formData.dateOfReceived}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Date of Acceptance</label>
                                <input
                                    type="date"
                                    name="dateOfAcceptance"
                                    value={formData.dateOfAcceptance}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Date of Publication</label>
                                <input
                                    type="date"
                                    name="dateOfPublication"
                                    value={formData.dateOfPublication}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-blue-600 mb-1">Abstract Text</label>
                                <Editor
                                    apiKey="nxdubw1uzkbvetym5t6krqxoi3rcxm1nz8xndt774kqqaji4"
                                    value={formData.abstractText}
                                    init={{
                                        height: 300,
                                        menubar: false,
                                        plugins: "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
                                        toolbar: "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
                                    }}
                                    onEditorChange={(content) => handleEditorChange(content, "abstractText")}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Copyright</label>
                                <input
                                    type="text"
                                    name="copyright"
                                    value={formData.copyright}
                                    onChange={handleChange}
                                    placeholder="e.g., © 2024 AI Journals"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Keywords</label>
                                <textarea
                                    name="keywords"
                                    value={formData.keywords}
                                    onChange={handleChange}
                                    placeholder="e.g., AI, Healthcare, Innovation"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-blue-600 mb-1">Reference</label>
                                <Editor
                                    apiKey="nxdubw1uzkbvetym5t6krqxoi3rcxm1nz8xndt774kqqaji4"
                                    value={formData.reference}
                                    init={{
                                        height: 300,
                                        menubar: false,
                                        plugins: "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
                                        toolbar: "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
                                    }}
                                    onEditorChange={(content) => handleEditorChange(content, "reference")}
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-blue-600 mb-1">Article File</label>
                                <input
                                    type="file"
                                    name="articleFile"
                                    onChange={handleFileChange}
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    accept=".pdf,.doc,.docx"
                                />
                                {articleToEdit && articleToEdit.articleFile && !removeFile && (
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">Current file: {articleToEdit.articleFile}</p>
                                        <button
                                            type="button"
                                            onClick={handleRemoveFile}
                                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs rounded-full mt-1"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-blue-600 mb-1">Authors</label>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowAuthorModal(true)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
                                    >
                                        <FaSearch /> Search Authors
                                    </button>
                                </div>

                                {selectedAuthors.length > 0 && (
                                    <div className="mt-4">
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Selected Authors</h3>
                                        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                                            <table className="w-full table-auto">
                                                <thead>
                                                    <tr className="bg-gray-200 text-gray-700 text-sm">
                                                        <th className="p-3 text-left">Author Name</th>
                                                        <th className="p-3 text-left">Department</th>
                                                        <th className="p-3 text-left">University</th>
                                                        <th className="p-3 text-left">Corresponding</th>
                                                        <th className="p-3 text-left">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {selectedAuthors.map((author) => (
                                                        <tr
                                                            key={author.authorId}
                                                            className="border-t border-gray-200 text-gray-600 text-sm hover:bg-blue-50 transition-colors"
                                                        >
                                                            <td className="p-3">{`${author.prefix || ""} ${author.firstName} ${author.lastName}`}</td>
                                                            <td className="p-3">{author.department || "N/A"}</td>
                                                            <td className="p-3">{author.university || "N/A"}</td>
                                                            <td className="p-3">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={correspondingAuthorId === author.authorId}
                                                                    onChange={() => handleCorrespondingAuthorChange(author.authorId)}
                                                                    className="h-5 w-5 text-blue-500 border-blue-200 rounded focus:ring-blue-400"
                                                                />
                                                            </td>
                                                            <td className="p-3">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveAuthor(author.authorId)}
                                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-colors"
                                                                >
                                                                    Remove
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                                {selectedAuthors.length === 0 && articleToEdit?.authorIds && (
                                    <div className="mt-4 text-sm text-gray-500">
                                        <p>Author IDs: {articleToEdit.authorIds}</p>
                                        <p>(Note: Individual author details could not be loaded. Use the search to add authors manually.)</p>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Google Scholar</label>
                                <select
                                    name="googleScholar"
                                    value={formData.googleScholar}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-4 mt-6 col-span-2">
                                <button
                                    type="submit"
                                    disabled={loading || !currentUser}
                                    className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors shadow-md ${loading || !currentUser ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                    {loading ? "Saving..." : articleToEdit ? "Update" : "Add"}
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

                {showAuthorModal && (
                    <div className="fixed mt-5 inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 h-[100vh]">
                        <div className="bg-white p-4 py-10 my-4 rounded-lg shadow-lg min-w-4xl h-[100%]">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Authors</h3>
                            <div className="mb-4">
                                <div className="relative">
                                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500" />
                                    <input
                                        type="text"
                                        placeholder="Search by author name..."
                                        value={searchAuthorTerm}
                                        onChange={(e) => setSearchAuthorTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 bg-white border border-indigo-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-[0_2px_6px_rgba(0,0,0,0.1)]"
                                    />
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-md overflow-x-auto h-[78%]">
                                <table className="w-full table-auto">
                                    <thead>
                                        <tr className="bg-gray-100 text-gray-700 text-sm">
                                            <th className="p-3 text-left">Author Name</th>
                                            <th className="p-3 text-left">Department</th>
                                            <th className="p-3 text-left">University</th>
                                            <th className="p-3 text-left">Country</th>
                                            <th className="p-3 text-left">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredAuthors.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="p-3 text-center text-gray-500">
                                                    No authors found.
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredAuthors.map((author) => (
                                                <tr
                                                    key={author.authorId}
                                                    className="border-t border-gray-200 text-gray-600 text-sm hover:bg-teal-50 transition-colors"
                                                >
                                                    <td className="p-3">{`${author.prefix || ""} ${author.firstName} ${author.lastName}`}</td>
                                                    <td className="p-3">{author.department || "N/A"}</td>
                                                    <td className="p-3">{author.university || "N/A"}</td>
                                                    <td className="p-3">{author.country || "N/A"}</td>
                                                    <td className="p-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleAddAuthor(author)}
                                                            className="bg-teal-400 hover:bg-teal-500 text-white px-3 py-1 rounded-lg transition-colors"
                                                            disabled={selectedAuthors.some((a) => a.authorId === author.authorId)}
                                                        >
                                                            Add
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowAuthorModal(false)}
                                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded-full transition-colors shadow-[0_2px_6px_rgba(0,0,0,0.1)]"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

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

export default AddNewArticle;