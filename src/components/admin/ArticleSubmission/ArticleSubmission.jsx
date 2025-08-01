// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import Sidebar from "../sidebar"; // Adjust path to your Sidebar
// // import { FaSearch, FaTrash } from "react-icons/fa";
// // import axios from "axios";

// // const BASE_URL = "https://iassrd.com:8081/api/v1";

// // const ArticleSubmission = () => {
// //     const navigate = useNavigate();
// //     const [selectedRows, setSelectedRows] = useState([]);
// //     const [searchTerm, setSearchTerm] = useState("");
// //     const [currentPage, setCurrentPage] = useState(1);
// //     const [submissions, setSubmissions] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);
// //     const [success, setSuccess] = useState(null);
// //     const [showDeleteModal, setShowDeleteModal] = useState(false);
// //     const itemsPerPage = 6;

// //     const [user, setUser] = useState(null);

// //     useEffect(() => {
// //         const storedUser = localStorage.getItem("user");
// //         if (storedUser) {
// //             setUser(JSON.parse(storedUser));
// //         } else {
// //             navigate("/login");
// //         }
// //     }, [navigate]);

// //     // Fetch article submissions from API
// //     useEffect(() => {
// //         const fetchSubmissions = async () => {
// //             try {
// //                 const response = await axios.get(`${BASE_URL}/article-submissions`);
// //                 console.log("API Response:", response.data); // Debug log
// //                 // Handle different response formats
// //                 let data = [];
// //                 if (Array.isArray(response.data)) {
// //                     data = response.data;
// //                 } else if (response.data && typeof response.data === "object") {
// //                     // Handle single object or nested array
// //                     data = response.data.items || response.data.data || [response.data];
// //                     if (!Array.isArray(data)) {
// //                         data = [data];
// //                     }
// //                 }
// //                 setSubmissions(data);
// //             } catch (err) {
// //                 console.error("Fetch Error:", err); // Debug log
// //                 setError("Error fetching article submissions: " + err.message);
// //                 setSubmissions([]);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };
// //         fetchSubmissions();
// //     }, []);

// //     // Handle checkbox selection
// //     const handleCheckboxChange = (absId) => {
// //         setSelectedRows((prev) =>
// //             prev.includes(absId)
// //                 ? prev.filter((rowId) => rowId !== absId)
// //                 : [...prev, absId]
// //         );
// //     };

// //     // Handle search
// //     const filteredSubmissions = submissions.filter(
// //         (item) =>
// //             (item.authorName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// //             (item.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// //             (item.articleTitle || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
// //             (item.country || "").toLowerCase().includes(searchTerm.toLowerCase())
// //     );

// //     // Pagination logic
// //     const totalItems = filteredSubmissions.length;
// //     const totalPages = Math.ceil(totalItems / itemsPerPage);
// //     const startIndex = (currentPage - 1) * itemsPerPage;
// //     const currentItems = filteredSubmissions.slice(startIndex, startIndex + itemsPerPage);

// //     const handlePageChange = (page) => {
// //         if (page >= 1 && page <= totalPages) {
// //             setCurrentPage(page);
// //         }
// //     };

// //     // Handle delete functionality
// //     const handleDelete = () => {
// //         if (selectedRows.length > 0) {
// //             setShowDeleteModal(true);
// //         }
// //     };

// //     const confirmDelete = async () => {
// //         try {
// //             setLoading(true);
// //             const deletePromises = selectedRows.map((absId) =>
// //                 axios.delete(`${BASE_URL}/article-submissions/${absId}`).then((response) => {
// //                     if (response.status !== 200) {
// //                         throw new Error(`Failed to delete submission with ID ${absId}`);
// //                     }
// //                     return response.data;
// //                 })
// //             );

// //             await Promise.all(deletePromises);

// //             setSubmissions((prevSubmissions) =>
// //                 prevSubmissions.filter((submission) => !selectedRows.includes(submission.absId))
// //             );

// //             setSelectedRows([]);

// //             if (currentItems.length === selectedRows.length && currentPage > 1) {
// //                 setCurrentPage(currentPage - 1);
// //             }

// //             setSuccess("Article submissions deleted successfully!");
// //             setTimeout(() => setSuccess(null), 3000);

// //             setShowDeleteModal(false);
// //         } catch (err) {
// //             setError("Error deleting article submissions: " + err.message);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const cancelDelete = () => {
// //         setShowDeleteModal(false);
// //     };

// //     if (loading) {
// //         return (
// //             <div className="flex h-screen w-screen bg-blue-50">
// //                 <div className="w-[20%]">
// //                     <Sidebar />
// //                 </div>
// //                 <div className="w-screen p-6 flex items-center justify-center">
// //                     <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
// //                 </div>
// //             </div>
// //         );
// //     }

// //     if (error) {
// //         return (
// //             <div className="flex min-h-screen bg-blue-50">
// //                 <div className="w-1/5">
// //                     <Sidebar />
// //                 </div>
// //                 <div className="w-4/5 p-6 flex items-center justify-center">
// //                     <p className="text-red-600 text-lg">{error}</p>
// //                 </div>
// //             </div>
// //         );
// //     }

// //     return (
// //         <div className="flex min-h-screen bg-blue-50">
// //             <header className="fixed top-0 left-0 w-full bg-blue-900 text-white py-4 px-6 flex items-center justify-between z-40">
// //                 <h1 className="text-xl font-semibold">
// //                     International Academy for Social Sciences Research and Development
// //                 </h1>
// //                 <div className="flex items-center space-x-4">
// //                     <span className="text-sm">Hi {user?.user_name}</span>
// //                 </div>
// //             </header>
// //             <div className="w-[20%]">
// //                 <Sidebar />
// //             </div>
// //             <div className="w-screen p-6 pt-20">
// //                 {/* Header */}
// //                 <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-4 shadow-md">
// //                     <h1 className="text-2xl font-bold">Article Submissions Dashboard</h1>
// //                     <p className="text-sm opacity-90 mt-1">Manage article submissions and their details.</p>
// //                 </header>

// //                 {/* Success/Error Messages */}
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

// //                 {/* Search and Actions */}
// //                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
// //                     <div className="flex flex-wrap gap-3">
// //                         {selectedRows.length > 0 && (
// //                             <button
// //                                 onClick={handleDelete}
// //                                 className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
// //                             >
// //                                 <FaTrash /> Delete
// //                             </button>
// //                         )}
// //                     </div>
// //                     <div className="relative w-full sm:w-72">
// //                         <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
// //                         <input
// //                             type="text"
// //                             placeholder="Search by author, email, title, or country..."
// //                             value={searchTerm}
// //                             onChange={(e) => setSearchTerm(e.target.value)}
// //                             className="w-full pl-10 pr-4 py-2 bg-white border border-blue-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
// //                         />
// //                     </div>
// //                 </div>

// //                 {/* Table with Horizontal Scroll */}
// //                 <div className="bg-white rounded-lg shadow-md overflow-x-auto">
// //                     <table className="w-full table-auto min-w-[1200px]">
// //                         <thead>
// //                             <tr className="bg-gray-200 text-gray-700 text-sm">
// //                                 <th className="p-3 text-left">
// //                                     <input
// //                                         type="checkbox"
// //                                         onChange={(e) => {
// //                                             if (e.target.checked) {
// //                                                 setSelectedRows(currentItems.map((item) => item.absId));
// //                                             } else {
// //                                                 setSelectedRows([]);
// //                                             }
// //                                         }}
// //                                         checked={
// //                                             currentItems.length > 0 &&
// //                                             currentItems.every((item) => selectedRows.includes(item.absId))
// //                                         }
// //                                         className="h-5 w-5 text-blue-500 border-blue-200 rounded focus:ring-blue-400"
// //                                     />
// //                                 </th>
// //                                 <th className="p-3 text-left">S.No</th>
// //                                 <th className="p-3 text-left">Author Name</th>
// //                                 <th className="p-3 text-left">Email</th>
// //                                 <th className="p-3 text-left">Country</th>
// //                                 <th className="p-3 text-left">Mobile Number</th>
// //                                 <th className="p-3 text-left">Journal ID</th>
// //                                 <th className="p-3 text-left">Article Title</th>
// //                                 <th className="p-3 text-left">Keywords</th>
// //                                 <th className="p-3 text-left">Created Date</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {currentItems.length === 0 ? (
// //                                 <tr>
// //                                     <td colSpan="10" className="p-3 text-center text-gray-600">
// //                                         No submissions found.
// //                                     </td>
// //                                 </tr>
// //                             ) : (
// //                                 currentItems.map((item, index) => (
// //                                     <tr
// //                                         key={item.absId}
// //                                         className="border-t border-gray-200 text-gray-600 text-sm hover:bg-blue-50 transition-colors"
// //                                     >
// //                                         <td className="p-3">
// //                                             <input
// //                                                 type="checkbox"
// //                                                 checked={selectedRows.includes(item.absId)}
// //                                                 onChange={() => handleCheckboxChange(item.absId)}
// //                                                 className="h-5 w-5 text-blue-500 border-blue-200 rounded focus:ring-blue-400"
// //                                             />
// //                                         </td>
// //                                         <td className="p-3">{startIndex + index + 1}</td>
// //                                         <td className="p-3">{item.authorName || "N/A"}</td>
// //                                         <td className="p-3">{item.email || "N/A"}</td>
// //                                         <td className="p-3">{item.country || "N/A"}</td>
// //                                         <td className="p-3">{item.mobileNumber || "N/A"}</td>
// //                                         <td className="p-3">{item.journalId || "N/A"}</td>
// //                                         <td className="p-3">{item.articleTitle || "N/A"}</td>
// //                                         <td className="p-3">{item.keywords || "N/A"}</td>
// //                                         <td className="p-3">
// //                                             {item.createdDate
// //                                                 ? new Date(item.createdDate).toLocaleString()
// //                                                 : "N/A"}
// //                                         </td>
// //                                     </tr>
// //                                 ))
// //                             )}
// //                         </tbody>
// //                     </table>
// //                 </div>

// //                 {/* Pagination */}
// //                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 text-gray-600 text-sm gap-4">
// //                     <span>
// //                         Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of{" "}
// //                         {totalItems} submissions
// //                     </span>
// //                     <div className="flex gap-2">
// //                         <button
// //                             onClick={() => handlePageChange(currentPage - 1)}
// //                             disabled={currentPage === 1}
// //                             className="px-4 py-2 bg-white border border-blue-200 rounded-full hover:bg-blue-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors shadow-md"
// //                         >
// //                             Previous
// //                         </button>
// //                         <span className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md">
// //                             {currentPage}
// //                         </span>
// //                         <button
// //                             onClick={() => handlePageChange(currentPage + 1)}
// //                             disabled={currentPage === totalPages}
// //                             className="px-4 py-2 bg-white border border-blue-200 rounded-full hover:bg-blue-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors shadow-md"
// //                         >
// //                             Next
// //                         </button>
// //                     </div>
// //                 </div>

// //                 {/* Delete Confirmation Modal */}
// //                 {showDeleteModal && (
// //                     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
// //                         <div className="bg-white p-6 rounded-lg shadow-lg">
// //                             <p className="text-lg font-semibold text-gray-700 mb-4">
// //                                 Are you sure you want to delete {selectedRows.length} submission(s)?
// //                             </p>
// //                             <div className="flex justify-end gap-4">
// //                                 <button
// //                                     onClick={confirmDelete}
// //                                     className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-colors shadow-md"
// //                                 >
// //                                     Yes, Delete
// //                                 </button>
// //                                 <button
// //                                     onClick={cancelDelete}
// //                                     className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-full transition-colors shadow-md"
// //                                 >
// //                                     Cancel
// //                                 </button>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// // export default ArticleSubmission;


// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../sidebar"; // Adjust path to your Sidebar
// import { FaSearch, FaPlus, FaTrash, FaEdit, FaFileCsv, FaFilePdf, FaPrint } from "react-icons/fa";
// import { CSVLink } from "react-csv";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import axios from "axios";

// const BASE_URL = "https://iassrd.com:8081/api/v1";

// const ArticleSubmission = () => {
//     const navigate = useNavigate();
//     const [selectedRows, setSelectedRows] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [submissions, setSubmissions] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(null);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const itemsPerPage = 6;
//     const tableRef = useRef(null);

//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         if (storedUser) {
//             setUser(JSON.parse(storedUser));
//         } else {
//             navigate("/login");
//         }
//     }, [navigate]);

//     // Fetch article submissions from API
//     useEffect(() => {
//         const fetchSubmissions = async () => {
//             try {
//                 const response = await axios.get(`${BASE_URL}/article-submissions`);
//                 console.log("API Response:", response.data); // Debug log
//                 // Handle different response formats
//                 let data = [];
//                 if (Array.isArray(response.data)) {
//                     data = response.data;
//                 } else if (response.data && typeof response.data === "object") {
//                     data = response.data.items || response.data.data || [response.data];
//                     if (!Array.isArray(data)) {
//                         data = [data];
//                     }
//                 }
//                 setSubmissions(data);
//             } catch (err) {
//                 console.error("Fetch Error:", err); // Debug log
//                 setError("Error fetching article submissions: " + err.message);
//                 setSubmissions([]);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchSubmissions();
//     }, []);

//     // Handle checkbox selection
//     const handleCheckboxChange = (absId) => {
//         setSelectedRows((prev) =>
//             prev.includes(absId)
//                 ? prev.filter((rowId) => rowId !== absId)
//                 : [...prev, absId]
//         );
//     };

//     // Handle search
//     const filteredSubmissions = submissions.filter(
//         (item) =>
//             (item.authorName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//             (item.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//             (item.articleTitle || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//             (item.country || "").toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     // Pagination logic
//     const totalItems = filteredSubmissions.length;
//     const totalPages = Math.ceil(totalItems / itemsPerPage);
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const currentItems = filteredSubmissions.slice(startIndex, startIndex + itemsPerPage);

//     const handlePageChange = (page) => {
//         if (page >= 1 && page <= totalPages) {
//             setCurrentPage(page);
//         }
//     };

//     // Prepare data for CSV export
//     const csvHeaders = [
//         { label: "S.No", key: "sNo" },
//         { label: "Author Name", key: "authorName" },
//         { label: "Email", key: "email" },
//         { label: "Country", key: "country" },
//         { label: "Mobile Number", key: "mobileNumber" },
//         { label: "Journal ID", key: "journalId" },
//         { label: "Article Title", key: "articleTitle" },
//         { label: "Keywords", key: "keywords" },
//         { label: "Created Date", key: "createdDate" },
//     ];

//     const csvData = filteredSubmissions.map((item, index) => ({
//         sNo: index + 1,
//         authorName: item.authorName || "N/A",
//         email: item.email || "N/A",
//         country: item.country || "N/A",
//         mobileNumber: item.mobileNumber || "N/A",
//         journalId: item.journalId || "N/A",
//         articleTitle: item.articleTitle || "N/A",
//         // keywords: item.keywords || "N/A",
//         createdDate: item.createdDate ? new Date(item.createdDate).toLocaleString() : "N/A",
//     }));

//     // Export to PDF
//     const handleExportPDF = async () => {
//         const table = tableRef.current;
//         if (!table) {
//             setError("Failed to export PDF: Table not found");
//             return;
//         }
//         if (loading || error || currentItems.length === 0) {
//             setError("Failed to export PDF: No data available");
//             return;
//         }

//         try {
//             setLoading(true);

//             const tempContainer = document.createElement("div");
//             tempContainer.style.position = "absolute";
//             tempContainer.style.top = "-9999px";
//             tempContainer.style.backgroundColor = "#ffffff";
//             tempContainer.style.padding = "20px";
//             document.body.appendChild(tempContainer);

//             const clonedTable = table.cloneNode(true);
//             tempContainer.appendChild(clonedTable);

//             clonedTable.style.backgroundColor = "#ffffff";
//             clonedTable.style.color = "#4b5563";
//             clonedTable.style.borderCollapse = "collapse";
//             clonedTable.style.width = "100%";
//             clonedTable.style.fontSize = "14px";

//             const rows = clonedTable.querySelectorAll("tr");
//             rows.forEach((row) => {
//                 row.className = "";
//                 row.style.backgroundColor = row.parentElement.tagName === "THEAD" ? "#e5e7eb" : "#ffffff";
//                 row.style.color = "#4b5563";
//                 row.style.border = "1px solid #d1d5db";
//                 const cells = row.querySelectorAll("td, th");
//                 cells.forEach((cell) => {
//                     cell.className = "";
//                     cell.style.border = "1px solid #d1d5db";
//                     cell.style.padding = "12px";
//                     cell.style.textAlign = "left";
//                     cell.style.fontSize = "14px";
//                 });

//                 const inputs = row.querySelectorAll("input[type='checkbox']");
//                 inputs.forEach((input) => {
//                     input.className = "";
//                     input.style.border = "1px solid #d1d5db";
//                     input.style.backgroundColor = input.checked ? "#3b82f6" : "#ffffff";
//                     input.style.width = "20px";
//                     input.style.height = "20px";
//                 });
//             });

//             await new Promise((resolve) => setTimeout(resolve, 500));

//             const canvas = await html2canvas(clonedTable, {
//                 scale: 2,
//                 useCORS: true,
//                 logging: true,
//                 backgroundColor: "#ffffff",
//                 scrollX: 0,
//                 scrollY: 0,
//                 windowWidth: clonedTable.scrollWidth,
//             });

//             const imgData = canvas.toDataURL("image/jpeg", 0.98);
//             const pdf = new jsPDF("landscape", "mm", "a4");
//             const pdfWidth = pdf.internal.pageSize.getWidth();
//             const pdfHeight = pdf.internal.pageSize.getHeight();
//             const imgWidth = pdfWidth - 20;
//             const imgHeight = (canvas.height * imgWidth) / canvas.width;

//             let heightLeft = imgHeight;
//             let position = 0;

//             pdf.addImage(imgData, "JPEG", 10, 10, imgWidth, imgHeight);
//             heightLeft -= pdfHeight;

//             while (heightLeft > 0) {
//                 pdf.addPage();
//                 position -= pdfHeight;
//                 pdf.addImage(imgData, "JPEG", 10, position + 10, imgWidth, imgHeight);
//                 heightLeft -= pdfHeight;
//             }

//             pdf.save("article-submissions.pdf");
//         } catch (err) {
//             setError("Failed to export PDF: " + err.message);
//         } finally {
//             const tempContainer = document.querySelector("div[style*='position: absolute']");
//             if (tempContainer) {
//                 document.body.removeChild(tempContainer);
//             }
//             setLoading(false);
//         }
//     };

//     // Print functionality
//     const handlePrint = () => {
//         window.print();
//     };

//     // Navigation functions
//     const handleAddNew = () => {
//         navigate("/addnewarticlesubmission");
//         window.scrollTo(0, 0);
//     };

//     // Handle delete functionality
//     const handleDelete = () => {
//         if (selectedRows.length > 0) {
//             setShowDeleteModal(true);
//         }
//     };

//     const confirmDelete = async () => {
//         try {
//             setLoading(true);
//             const deletePromises = selectedRows.map((absId) =>
//                 axios.delete(`${BASE_URL}/article-submissions/${absId}`).then((response) => {
//                     if (response.status !== 200) {
//                         throw new Error(`Failed to delete submission with ID ${absId}`);
//                     }
//                     return response.data;
//                 })
//             );

//             await Promise.all(deletePromises);

//             setSubmissions((prevSubmissions) =>
//                 prevSubmissions.filter((submission) => !selectedRows.includes(submission.absId))
//             );

//             setSelectedRows([]);

//             if (currentItems.length === selectedRows.length && currentPage > 1) {
//                 setCurrentPage(currentPage - 1);
//             }

//             setSuccess("Article submissions deleted successfully!");
//             setTimeout(() => setSuccess(null), 3000);

//             setShowDeleteModal(false);
//         } catch (err) {
//             setError("Error deleting article submissions: " + err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const cancelDelete = () => {
//         setShowDeleteModal(false);
//     };

//     const handleEdit = () => {
//         if (selectedRows.length === 1) {
//             const submissionToEdit = submissions.find((s) => s.absId === selectedRows[0]);
//             navigate("/addnewarticlesubmission", { state: { articleSubmission: submissionToEdit } });
//             window.scrollTo(0, 0);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="flex h-screen w-screen bg-blue-50">
//                 <div className="w-[20%]">
//                     <Sidebar />
//                 </div>
//                 <div className="w-screen p-6 flex items-center justify-center">
//                     <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex min-h-screen bg-blue-50">
//                 <div className="w-1/5">
//                     <Sidebar />
//                 </div>
//                 <div className="w-4/5 p-6 flex items-center justify-center">
//                     <p className="text-red-600 text-lg">{error}</p>
//                 </div>
//             </div>
//         );
//     }

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
//             <div className="w-screen p-6 pt-20">
//                 {/* Header */}
//                 <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-4 shadow-md">
//                     <h1 className="text-2xl font-bold">Article Submissions Dashboard</h1>
//                     <p className="text-sm opacity-90 mt-1">Manage article submissions and their details.</p>
//                 </header>

//                 {/* Success/Error Messages */}
//                 {success && (
//                     <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
//                         {success}
//                     </div>
//                 )}
//                 {error && (
//                     <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
//                         {error}
//                     </div>
//                 )}

//                 {/* Search and Actions */}
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//                     <div className="flex flex-wrap gap-3">
//                         <button
//                             onClick={handleAddNew}
//                             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
//                         >
//                             <FaPlus /> Add New
//                         </button>
//                         {selectedRows.length > 0 && (
//                             <>
//                                 <button
//                                     onClick={handleDelete}
//                                     className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
//                                 >
//                                     <FaTrash /> Delete
//                                 </button>
//                                 {selectedRows.length === 1 && (
//                                     <button
//                                         onClick={handleEdit}
//                                         className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
//                                     >
//                                         <FaEdit /> Edit
//                                     </button>
//                                 )}
//                             </>
//                         )}
//                         <CSVLink
//                             data={csvData}
//                             headers={csvHeaders}
//                             filename={"article-submissions.csv"}
//                             className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
//                         >
//                             <FaFileCsv /> Export CSV
//                         </CSVLink>
//                         <button
//                             onClick={handleExportPDF}
//                             className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
//                         >
//                             <FaFilePdf /> Export PDF
//                         </button>
//                         <button
//                             onClick={handlePrint}
//                             className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
//                         >
//                             <FaPrint /> Print
//                         </button>
//                     </div>
//                     <div className="relative w-full sm:w-72">
//                         <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
//                         <input
//                             type="text"
//                             placeholder="Search by author, email, title, or country..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="w-full pl-10 pr-4 py-2 bg-white border border-blue-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
//                         />
//                     </div>
//                 </div>

//                 {/* Table with Horizontal Scroll */}
//                 <div className="bg-white rounded-lg shadow-md overflow-x-auto">
//                     <table ref={tableRef} className="w-full table-auto min-w-[1200px]">
//                         <thead>
//                             <tr className="bg-gray-200 text-gray-700 text-sm">
//                                 <th className="p-3 text-left">
//                                     <input
//                                         type="checkbox"
//                                         onChange={(e) => {
//                                             if (e.target.checked) {
//                                                 setSelectedRows(currentItems.map((item) => item.absId));
//                                             } else {
//                                                 setSelectedRows([]);
//                                             }
//                                         }}
//                                         checked={
//                                             currentItems.length > 0 &&
//                                             currentItems.every((item) => selectedRows.includes(item.absId))
//                                         }
//                                         className="h-5 w-5 text-blue-500 border-blue-200 rounded focus:ring-blue-400"
//                                     />
//                                 </th>
//                                 <th className="p-3 text-left">S.No</th>
//                                 <th className="p-3 text-left">Author Name</th>
//                                 <th className="p-3 text-left">Email</th>
//                                 <th className="p-3 text-left">Country</th>
//                                 <th className="p-3 text-left">Mobile Number</th>
//                                 <th className="p-3 text-left">Journal ID</th>
//                                 <th className="p-3 text-left">Article Title</th>
//                                 {/* <th className="p-3 text-left">Keywords</th> */}
//                                 <th className="p-3 text-left">Created Date</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {currentItems.length === 0 ? (
//                                 <tr>
//                                     <td colSpan="10" className="p-3 text-center text-gray-600">
//                                         No submissions found.
//                                     </td>
//                                 </tr>
//                             ) : (
//                                 currentItems.map((item, index) => (
//                                     <tr
//                                         key={item.absId}
//                                         className="border-t border-gray-200 text-gray-600 text-sm hover:bg-blue-50 transition-colors"
//                                     >
//                                         <td className="p-3">
//                                             <input
//                                                 type="checkbox"
//                                                 checked={selectedRows.includes(item.absId)}
//                                                 onChange={() => handleCheckboxChange(item.absId)}
//                                                 className="h-5 w-5 text-blue-500 border-blue-200 rounded focus:ring-blue-400"
//                                             />
//                                         </td>
//                                         <td className="p-3">{startIndex + index + 1}</td>
//                                         <td className="p-3">{item.authorName || "N/A"}</td>
//                                         <td className="p-3">{item.email || "N/A"}</td>
//                                         <td className="p-3">{item.country || "N/A"}</td>
//                                         <td className="p-3">{item.mobileNumber || "N/A"}</td>
//                                         <td className="p-3">{item.journalId || "N/A"}</td>
//                                         <td className="p-3">{item.articleTitle || "N/A"}</td>
//                                         {/* <td className="p-3">{item.keywords || "N/A"}</td> */}
//                                         <td className="p-3">
//                                             {item.createdDate
//                                                 ? new Date(item.createdDate).toLocaleString()
//                                                 : "N/A"}
//                                         </td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Pagination */}
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 text-gray-600 text-sm gap-4">
//                     <span>
//                         Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of{" "}
//                         {totalItems} submissions
//                     </span>
//                     <div className="flex gap-2">
//                         <button
//                             onClick={() => handlePageChange(currentPage - 1)}
//                             disabled={currentPage === 1}
//                             className="px-4 py-2 bg-white border border-blue-200 rounded-full hover:bg-blue-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors shadow-md"
//                         >
//                             Previous
//                         </button>
//                         <span className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md">
//                             {currentPage}
//                         </span>
//                         <button
//                             onClick={() => handlePageChange(currentPage + 1)}
//                             disabled={currentPage === totalPages}
//                             className="px-4 py-2 bg-white border border-blue-200 rounded-full hover:bg-blue-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors shadow-md"
//                         >
//                             Next
//                         </button>
//                     </div>
//                 </div>

//                 {/* Delete Confirmation Modal */}
//                 {showDeleteModal && (
//                     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <p className="text-lg font-semibold text-gray-700 mb-4">
//                                 Are you sure you want to delete {selectedRows.length} submission(s)?
//                             </p>
//                             <div className="flex justify-end gap-4">
//                                 <button
//                                     onClick={confirmDelete}
//                                     className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-colors shadow-md"
//                                 >
//                                     Yes, Delete
//                                 </button>
//                                 <button
//                                     onClick={cancelDelete}
//                                     className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-full transition-colors shadow-md"
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ArticleSubmission;


// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../sidebar"; // Adjust path to your Sidebar
// import { FaSearch, FaPlus, FaTrash, FaEdit, FaFileCsv, FaFilePdf, FaPrint } from "react-icons/fa";
// import { CSVLink } from "react-csv";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import axios from "axios";

// const BASE_URL = "https://iassrd.com:8081/api/v1";

// const ArticleSubmission = () => {
//     const navigate = useNavigate();
//     const [selectedRows, setSelectedRows] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [submissions, setSubmissions] = useState([]);
//     const [journals, setJournals] = useState([]); // New state for journals
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(null);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const itemsPerPage = 6;
//     const tableRef = useRef(null);

//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         if (storedUser) {
//             setUser(JSON.parse(storedUser));
//         } else {
//             navigate("/login");
//         }
//     }, [navigate]);

//     // Fetch article submissions and journals from API
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true);

//                 // Fetch article submissions
//                 const submissionsResponse = await axios.get(`${BASE_URL}/article-submissions`);
//                 let data = [];
//                 if (Array.isArray(submissionsResponse.data)) {
//                     data = submissionsResponse.data;
//                 } else if (submissionsResponse.data && typeof submissionsResponse.data === "object") {
//                     data = submissionsResponse.data.items || submissionsResponse.data.data || [submissionsResponse.data];
//                     if (!Array.isArray(data)) {
//                         data = [data];
//                     }
//                 }
//                 setSubmissions(data);

//                 // Fetch journals
//                 const journalsResponse = await axios.get(`${BASE_URL}/journals`);
//                 if (journalsResponse.data.success) {
//                     setJournals(journalsResponse.data.data || []);
//                 } else {
//                     throw new Error("Failed to fetch journals");
//                 }
//             } catch (err) {
//                 console.error("Fetch Error:", err);
//                 setError("Error fetching data: " + err.message);
//                 setSubmissions([]);
//                 setJournals([]);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, []);

//     // Create a mapping of journalId to journalName
//     const journalMap = journals.reduce((map, journal) => {
//         map[journal.journalId] = journal.journalName || "Unknown Journal";
//         return map;
//     }, {});

//     // Handle checkbox selection
//     const handleCheckboxChange = (absId) => {
//         setSelectedRows((prev) =>
//             prev.includes(absId)
//                 ? prev.filter((rowId) => rowId !== absId)
//                 : [...prev, absId]
//         );
//     };

//     // Handle search
//     const filteredSubmissions = submissions.filter(
//         (item) =>
//             (item.authorName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//             (item.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//             (item.articleTitle || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//             (item.country || "").toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     // Pagination logic
//     const totalItems = filteredSubmissions.length;
//     const totalPages = Math.ceil(totalItems / itemsPerPage);
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const currentItems = filteredSubmissions.slice(startIndex, startIndex + itemsPerPage);

//     const handlePageChange = (page) => {
//         if (page >= 1 && page <= totalPages) {
//             setCurrentPage(page);
//         }
//     };

//     // Prepare data for CSV export (update Journal ID to Journal Name)
//     const csvHeaders = [
//         { label: "S.No", key: "sNo" },
//         { label: "Author Name", key: "authorName" },
//         { label: "Email", key: "email" },
//         { label: "Country", key: "country" },
//         { label: "Mobile Number", key: "mobileNumber" },
//         { label: "Journal Name", key: "journalName" }, // Updated header
//         { label: "Article Title", key: "articleTitle" },
//         { label: "Created Date", key: "createdDate" },
//     ];

//     const csvData = filteredSubmissions.map((item, index) => ({
//         sNo: index + 1,
//         authorName: item.authorName || "N/A",
//         email: item.email || "N/A",
//         country: item.country || "N/A",
//         mobileNumber: item.mobileNumber || "N/A",
//         journalName: journalMap[item.journalId] || "N/A", // Map journalId to journalName
//         articleTitle: item.articleTitle || "N/A",
//         createdDate: item.createdDate ? new Date(item.createdDate).toLocaleString() : "N/A",
//     }));

//     // Export to PDF
//     const handleExportPDF = async () => {
//         const table = tableRef.current;
//         if (!table) {
//             setError("Failed to export PDF: Table not found");
//             return;
//         }
//         if (loading || currentItems.length === 0) {
//             setError("Failed to export PDF: No data available");
//             return;
//         }

//         try {
//             setLoading(true);

//             const tempContainer = document.createElement("div");
//             tempContainer.style.position = "absolute";
//             tempContainer.style.top = "-9999px";
//             tempContainer.style.backgroundColor = "#ffffff";
//             tempContainer.style.padding = "20px";
//             document.body.appendChild(tempContainer);

//             const clonedTable = table.cloneNode(true);
//             tempContainer.appendChild(clonedTable);

//             clonedTable.style.backgroundColor = "#ffffff";
//             clonedTable.style.color = "#4b5563";
//             clonedTable.style.borderCollapse = "collapse";
//             clonedTable.style.width = "100%";
//             clonedTable.style.fontSize = "14px";

//             const rows = clonedTable.querySelectorAll("tr");
//             rows.forEach((row) => {
//                 row.className = "";
//                 row.style.backgroundColor = row.parentElement.tagName === "THEAD" ? "#e5e7eb" : "#ffffff";
//                 row.style.color = "#4b5563";
//                 row.style.border = "1px solid #d1d5db";
//                 const cells = row.querySelectorAll("td, th");
//                 cells.forEach((cell) => {
//                     cell.className = "";
//                     cell.style.border = "1px solid #d1d5db";
//                     cell.style.padding = "12px";
//                     cell.style.textAlign = "left";
//                     cell.style.fontSize = "14px";
//                 });

//                 const inputs = row.querySelectorAll("input[type='checkbox']");
//                 inputs.forEach((input) => {
//                     input.className = "";
//                     input.style.border = "1px solid #d1d5db";
//                     input.style.backgroundColor = input.checked ? "#3b82f6" : "#ffffff";
//                     input.style.width = "20px";
//                     input.style.height = "20px";
//                 });
//             });

//             await new Promise((resolve) => setTimeout(resolve, 500));

//             const canvas = await html2canvas(clonedTable, {
//                 scale: 2,
//                 useCORS: true,
//                 logging: true,
//                 backgroundColor: "#ffffff",
//                 scrollX: 0,
//                 scrollY: 0,
//                 windowWidth: clonedTable.scrollWidth,
//             });

//             const imgData = canvas.toDataURL("image/jpeg", 0.98);
//             const pdf = new jsPDF("landscape", "mm", "a4");
//             const pdfWidth = pdf.internal.pageSize.getWidth();
//             const pdfHeight = pdf.internal.pageSize.getHeight();
//             const imgWidth = pdfWidth - 20;
//             const imgHeight = (canvas.height * imgWidth) / canvas.width;

//             let heightLeft = imgHeight;
//             let position = 0;

//             pdf.addImage(imgData, "JPEG", 10, 10, imgWidth, imgHeight);
//             heightLeft -= pdfHeight;

//             while (heightLeft > 0) {
//                 pdf.addPage();
//                 position -= pdfHeight;
//                 pdf.addImage(imgData, "JPEG", 10, position + 10, imgWidth, imgHeight);
//                 heightLeft -= pdfHeight;
//             }

//             pdf.save("article-submissions.pdf");
//         } catch (err) {
//             setError("Failed to export PDF: " + err.message);
//         } finally {
//             const tempContainer = document.querySelector("div[style*='position: absolute']");
//             if (tempContainer) {
//                 document.body.removeChild(tempContainer);
//             }
//             setLoading(false);
//         }
//     };

//     // Print functionality
//     const handlePrint = () => {
//         window.print();
//     };

//     // Navigation functions
//     const handleAddNew = () => {
//         navigate("/addnewarticlesubmission");
//         window.scrollTo(0, 0);
//     };

//     // Handle delete functionality
//     const handleDelete = () => {
//         if (selectedRows.length > 0) {
//             setShowDeleteModal(true);
//         }
//     };

//     const confirmDelete = async () => {
//         try {
//             setLoading(true);
//             const deletePromises = selectedRows.map((absId) =>
//                 axios.delete(`${BASE_URL}/article-submissions/${absId}`).then((response) => {
//                     if (response.status !== 200) {
//                         throw new Error(`Failed to delete submission with ID ${absId}`);
//                     }
//                     return response.data;
//                 })
//             );

//             await Promise.all(deletePromises);

//             setSubmissions((prevSubmissions) =>
//                 prevSubmissions.filter((submission) => !selectedRows.includes(submission.absId))
//             );

//             setSelectedRows([]);

//             if (currentItems.length === selectedRows.length && currentPage > 1) {
//                 setCurrentPage(currentPage - 1);
//             }

//             setSuccess("Article submissions deleted successfully!");
//             setTimeout(() => setSuccess(null), 3000);

//             setShowDeleteModal(false);
//         } catch (err) {
//             setError("Error deleting article submissions: " + err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const cancelDelete = () => {
//         setShowDeleteModal(false);
//     };

//     const handleEdit = () => {
//         if (selectedRows.length === 1) {
//             const submissionToEdit = submissions.find((s) => s.absId === selectedRows[0]);
//             navigate("/addnewarticlesubmission", { state: { articleSubmission: submissionToEdit } });
//             window.scrollTo(0, 0);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="flex h-screen w-screen bg-blue-50">
//                 <div className="w-[20%]">
//                     <Sidebar />
//                 </div>
//                 <div className="w-screen p-6 flex items-center justify-center">
//                     <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex min-h-screen bg-blue-50">
//                 <div className="w-1/5">
//                     <Sidebar />
//                 </div>
//                 <div className="w-4/5 p-6 flex items-center justify-center">
//                     <p className="text-red-600 text-lg">{error}</p>
//                 </div>
//             </div>
//         );
//     }

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
//             <div className="w-screen p-6 pt-20">
//                 {/* Header */}
//                 <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-4 shadow-md">
//                     <h1 className="text-2xl font-bold">Article Submissions Dashboard</h1>
//                     <p className="text-sm opacity-90 mt-1">Manage article submissions and their details.</p>
//                 </header>

//                 {/* Success/Error Messages */}
//                 {success && (
//                     <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
//                         {success}
//                     </div>
//                 )}
//                 {error && (
//                     <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
//                         {error}
//                     </div>
//                 )}

//                 {/* Search and Actions */}
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//                     <div className="flex flex-wrap gap-3">
//                         {/* <button
//                             onClick={handleAddNew}
//                             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
//                         >
//                             <FaPlus /> Add New
//                         </button> */}
//                         {selectedRows.length > 0 && (
//                             <>
//                                 <button
//                                     onClick={handleDelete}
//                                     className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
//                                 >
//                                     <FaTrash /> Delete
//                                 </button>
//                                 {/* {selectedRows.length === 1 && (
//                                     <button
//                                         onClick={handleEdit}
//                                         className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
//                                     >
//                                         <FaEdit /> Edit
//                                     </button>
//                                 )} */}
//                             </>
//                         )}
//                         <CSVLink
//                             data={csvData}
//                             headers={csvHeaders}
//                             filename={"article-submissions.csv"}
//                             className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
//                         >
//                             <FaFileCsv /> Export CSV
//                         </CSVLink>
//                         <button
//                             onClick={handleExportPDF}
//                             className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
//                         >
//                             <FaFilePdf /> Export PDF
//                         </button>
//                         <button
//                             onClick={handlePrint}
//                             className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
//                         >
//                             <FaPrint /> Print
//                         </button>
//                     </div>
//                     <div className="relative w-full sm:w-72">
//                         <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
//                         <input
//                             type="text"
//                             placeholder="Search by author, email, title, or country..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="w-full pl-10 pr-4 py-2 bg-white border border-blue-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
//                         />
//                     </div>
//                 </div>

//                 {/* Table with Horizontal Scroll */}
//                 <div className="bg-white rounded-lg shadow-md overflow-x-auto">
//                     <table ref={tableRef} className="w-full table-auto min-w-[1200px]">
//                         <thead>
//                             <tr className="bg-gray-200 text-gray-700 text-sm">
//                                 <th className="p-3 text-left">
//                                     <input
//                                         type="checkbox"
//                                         onChange={(e) => {
//                                             if (e.target.checked) {
//                                                 setSelectedRows(currentItems.map((item) => item.absId));
//                                             } else {
//                                                 setSelectedRows([]);
//                                             }
//                                         }}
//                                         checked={
//                                             currentItems.length > 0 &&
//                                             currentItems.every((item) => selectedRows.includes(item.absId))
//                                         }
//                                         className="h-5 w-5 text-blue-500 border-blue-200 rounded focus:ring-blue-400"
//                                     />
//                                 </th>
//                                 <th className="p-3 text-left">S.No</th>
//                                 <th className="p-3 text-left">Author Name</th>
//                                 <th className="p-3 text-left">Email</th>
//                                 <th className="p-3 text-left">Country</th>
//                                 <th className="p-3 text-left">Mobile Number</th>
//                                 <th className="p-3 text-left">Journal Name</th> {/* Updated header */}
//                                 <th className="p-3 text-left">Article Title</th>
//                                 <th className="p-3 text-left">Created Date</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {currentItems.length === 0 ? (
//                                 <tr>
//                                     <td colSpan="9" className="p-3 text-center text-gray-600">
//                                         No submissions found.
//                                     </td>
//                                 </tr>
//                             ) : (
//                                 currentItems.map((item, index) => (
//                                     <tr
//                                         key={item.absId}
//                                         className="border-t border-gray-200 text-gray-600 text-sm hover:bg-blue-50 transition-colors"
//                                     >
//                                         <td className="p-3">
//                                             <input
//                                                 type="checkbox"
//                                                 checked={selectedRows.includes(item.absId)}
//                                                 onChange={() => handleCheckboxChange(item.absId)}
//                                                 className="h-5 w-5 text-blue-500 border-blue-200 rounded focus:ring-blue-400"
//                                             />
//                                         </td>
//                                         <td className="p-3">{startIndex + index + 1}</td>
//                                         <td className="p-3">{item.authorName || "N/A"}</td>
//                                         <td className="p-3">{item.email || "N/A"}</td>
//                                         <td className="p-3">{item.country || "N/A"}</td>
//                                         <td className="p-3">{item.mobileNumber || "N/A"}</td>
//                                         <td className="p-3">{journalMap[item.journalId] || "N/A"}</td> {/* Show journalName */}
//                                         <td className="p-3">{item.articleTitle || "N/A"}</td>
//                                         <td className="p-3">
//                                             {item.createdDate
//                                                 ? new Date(item.createdDate).toLocaleString()
//                                                 : "N/A"}
//                                         </td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Pagination */}
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 text-gray-600 text-sm gap-4">
//                     <span>
//                         Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of{" "}
//                         {totalItems} submissions
//                     </span>
//                     <div className="flex gap-2">
//                         <button
//                             onClick={() => handlePageChange(currentPage - 1)}
//                             disabled={currentPage === 1}
//                             className="px-4 py-2 bg-white border border-blue-200 rounded-full hover:bg-blue-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors shadow-md"
//                         >
//                             Previous
//                         </button>
//                         <span className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md">
//                             {currentPage}
//                         </span>
//                         <button
//                             onClick={() => handlePageChange(currentPage + 1)}
//                             disabled={currentPage === totalPages}
//                             className="px-4 py-2 bg-white border border-blue-200 rounded-full hover:bg-blue-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors shadow-md"
//                         >
//                             Next
//                         </button>
//                     </div>
//                 </div>

//                 {/* Delete Confirmation Modal */}
//                 {showDeleteModal && (
//                     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <p className="text-lg font-semibold text-gray-700 mb-4">
//                                 Are you sure you want to delete {selectedRows.length} submission(s)?
//                             </p>
//                             <div className="flex justify-end gap-4">
//                                 <button
//                                     onClick={confirmDelete}
//                                     className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-colors shadow-md"
//                                 >
//                                     Yes, Delete
//                                 </button>
//                                 <button
//                                     onClick={cancelDelete}
//                                     className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-full transition-colors shadow-md"
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ArticleSubmission;




// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../sidebar"; // Adjust path to your Sidebar
// import { FaSearch, FaPlus, FaTrash, FaEdit, FaFileCsv, FaFilePdf, FaPrint, FaImage } from "react-icons/fa";
// import { CSVLink } from "react-csv";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import axios from "axios";

// const BASE_URL = "https://iassrd.com:8081/api/v1";

// const ArticleSubmission = () => {
//     const navigate = useNavigate();
//     const [selectedRows, setSelectedRows] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [submissions, setSubmissions] = useState([]);
//     const [journals, setJournals] = useState([]); // New state for journals
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(null);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const itemsPerPage = 6;
//     const tableRef = useRef(null);

//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         if (storedUser) {
//             setUser(JSON.parse(storedUser));
//         } else {
//             navigate("/login");
//         }
//     }, [navigate]);

//     // Fetch article submissions and journals from API
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true);

//                 // Fetch article submissions
//                 const submissionsResponse = await axios.get(`${BASE_URL}/article-submissions`);
//                 let data = [];
//                 if (Array.isArray(submissionsResponse.data)) {
//                     data = submissionsResponse.data;
//                 } else if (submissionsResponse.data && typeof submissionsResponse.data === "object") {
//                     data = submissionsResponse.data.items || submissionsResponse.data.data || [submissionsResponse.data];
//                     if (!Array.isArray(data)) {
//                         data = [data];
//                     }
//                 }
//                 setSubmissions(data);

//                 // Fetch journals
//                 const journalsResponse = await axios.get(`${BASE_URL}/journals`);
//                 if (journalsResponse.data.success) {
//                     setJournals(journalsResponse.data.data || []);
//                 } else {
//                     throw new Error("Failed to fetch journals");
//                 }
//             } catch (err) {
//                 console.error("Fetch Error:", err);
//                 setError("Error fetching data: " + err.message);
//                 setSubmissions([]);
//                 setJournals([]);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, []);

//     // Create a mapping of journalId to journalName
//     const journalMap = journals.reduce((map, journal) => {
//         map[journal.journalId] = journal.journalName || "Unknown Journal";
//         return map;
//     }, {});

//     // Handle checkbox selection
//     const handleCheckboxChange = (absId) => {
//         setSelectedRows((prev) =>
//             prev.includes(absId)
//                 ? prev.filter((rowId) => rowId !== absId)
//                 : [...prev, absId]
//         );
//     };

//     // Handle search
//     const filteredSubmissions = submissions.filter(
//         (item) =>
//             (item.authorName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//             (item.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//             (item.articleTitle || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//             (item.country || "").toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     // Pagination logic
//     const totalItems = filteredSubmissions.length;
//     const totalPages = Math.ceil(totalItems / itemsPerPage);
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const currentItems = filteredSubmissions.slice(startIndex, startIndex + itemsPerPage);

//     const handlePageChange = (page) => {
//         if (page >= 1 && page <= totalPages) {
//             setCurrentPage(page);
//         }
//     };

//     // Prepare data for CSV export (update Journal ID to Journal Name)
//     const csvHeaders = [
//         { label: "S.No", key: "sNo" },
//         { label: "Author Name", key: "authorName" },
//         { label: "Email", key: "email" },
//         { label: "Country", key: "country" },
//         { label: "Mobile Number", key: "mobileNumber" },
//         { label: "Journal Name", key: "journalName" }, // Updated header
//         { label: "Article Title", key: "articleTitle" },
//         { label: "Created Date", key: "createdDate" },
//     ];

//     const csvData = filteredSubmissions.map((item, index) => ({
//         sNo: index + 1,
//         authorName: item.authorName || "N/A",
//         email: item.email || "N/A",
//         country: item.country || "N/A",
//         mobileNumber: item.mobileNumber || "N/A",
//         journalName: journalMap[item.journalId] || "N/A", // Map journalId to journalName
//         articleTitle: item.articleTitle || "N/A",
//         createdDate: item.createdDate ? new Date(item.createdDate).toLocaleString() : "N/A",
//     }));

//     // Export to PDF
//     const handleExportPDF = async () => {
//         const table = tableRef.current;
//         if (!table) {
//             setError("Failed to export PDF: Table not found");
//             return;
//         }
//         if (loading || currentItems.length === 0) {
//             setError("Failed to export PDF: No data available");
//             return;
//         }

//         try {
//             setLoading(true);

//             const tempContainer = document.createElement("div");
//             tempContainer.style.position = "absolute";
//             tempContainer.style.top = "-9999px";
//             tempContainer.style.backgroundColor = "#ffffff";
//             tempContainer.style.padding = "20px";
//             document.body.appendChild(tempContainer);

//             const clonedTable = table.cloneNode(true);
//             tempContainer.appendChild(clonedTable);

//             clonedTable.style.backgroundColor = "#ffffff";
//             clonedTable.style.color = "#4b5563";
//             clonedTable.style.borderCollapse = "collapse";
//             clonedTable.style.width = "100%";
//             clonedTable.style.fontSize = "14px";

//             const rows = clonedTable.querySelectorAll("tr");
//             rows.forEach((row) => {
//                 row.className = "";
//                 row.style.backgroundColor = row.parentElement.tagName === "THEAD" ? "#e5e7eb" : "#ffffff";
//                 row.style.color = "#4b5563";
//                 row.style.border = "1px solid #d1d5db";
//                 const cells = row.querySelectorAll("td, th");
//                 cells.forEach((cell) => {
//                     cell.className = "";
//                     cell.style.border = "1px solid #d1d5db";
//                     cell.style.padding = "12px";
//                     cell.style.textAlign = "left";
//                     cell.style.fontSize = "14px";
//                 });

//                 const inputs = row.querySelectorAll("input[type='checkbox']");
//                 inputs.forEach((input) => {
//                     input.className = "";
//                     input.style.border = "1px solid #d1d5db";
//                     input.style.backgroundColor = input.checked ? "#3b82f6" : "#ffffff";
//                     input.style.width = "20px";
//                     input.style.height = "20px";
//                 });
//             });

//             await new Promise((resolve) => setTimeout(resolve, 500));

//             const canvas = await html2canvas(clonedTable, {
//                 scale: 2,
//                 useCORS: true,
//                 logging: true,
//                 backgroundColor: "#ffffff",
//                 scrollX: 0,
//                 scrollY: 0,
//                 windowWidth: clonedTable.scrollWidth,
//             });

//             const imgData = canvas.toDataURL("image/jpeg", 0.98);
//             const pdf = new jsPDF("landscape", "mm", "a4");
//             const pdfWidth = pdf.internal.pageSize.getWidth();
//             const pdfHeight = pdf.internal.pageSize.getHeight();
//             const imgWidth = pdfWidth - 20;
//             const imgHeight = (canvas.height * imgWidth) / canvas.width;

//             let heightLeft = imgHeight;
//             let position = 0;

//             pdf.addImage(imgData, "JPEG", 10, 10, imgWidth, imgHeight);
//             heightLeft -= pdfHeight;

//             while (heightLeft > 0) {
//                 pdf.addPage();
//                 position -= pdfHeight;
//                 pdf.addImage(imgData, "JPEG", 10, position + 10, imgWidth, imgHeight);
//                 heightLeft -= pdfHeight;
//             }

//             pdf.save("article-submissions.pdf");
//         } catch (err) {
//             setError("Failed to export PDF: " + err.message);
//         } finally {
//             const tempContainer = document.querySelector("div[style*='position: absolute']");
//             if (tempContainer) {
//                 document.body.removeChild(tempContainer);
//             }
//             setLoading(false);
//         }
//     };

//     // Print functionality
//     const handlePrint = () => {
//         window.print();
//     };

//     // Navigation functions
//     const handleAddNew = () => {
//         navigate("/addnewarticlesubmission");
//         window.scrollTo(0, 0);
//     };

//     // Handle delete functionality
//     const handleDelete = () => {
//         if (selectedRows.length > 0) {
//             setShowDeleteModal(true);
//         }
//     };

//     const confirmDelete = async () => {
//         try {
//             setLoading(true);
//             const deletePromises = selectedRows.map((absId) =>
//                 axios.delete(`${BASE_URL}/article-submissions/${absId}`).then((response) => {
//                     if (response.status !== 200) {
//                         throw new Error(`Failed to delete submission with ID ${absId}`);
//                     }
//                     return response.data;
//                 })
//             );

//             await Promise.all(deletePromises);

//             setSubmissions((prevSubmissions) =>
//                 prevSubmissions.filter((submission) => !selectedRows.includes(submission.absId))
//             );

//             setSelectedRows([]);

//             if (currentItems.length === selectedRows.length && currentPage > 1) {
//                 setCurrentPage(currentPage - 1);
//             }

//             setSuccess("Article submissions deleted successfully!");
//             setTimeout(() => setSuccess(null), 3000);

//             setShowDeleteModal(false);
//         } catch (err) {
//             setError("Error deleting article submissions: " + err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const cancelDelete = () => {
//         setShowDeleteModal(false);
//     };

//     const handleEdit = () => {
//         if (selectedRows.length === 1) {
//             const submissionToEdit = submissions.find((s) => s.absId === selectedRows[0]);
//             navigate("/addnewarticlesubmission", { state: { articleSubmission: submissionToEdit } });
//             window.scrollTo(0, 0);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="flex h-screen w-screen bg-blue-50">
//                 <div className="w-[20%]">
//                     <Sidebar />
//                 </div>
//                 <div className="w-screen p-6 flex items-center justify-center">
//                     <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex min-h-screen bg-blue-50">
//                 <div className="w-1/5">
//                     <Sidebar />
//                 </div>
//                 <div className="w-4/5 p-6 flex items-center justify-center">
//                     <p className="text-red-600 text-lg">{error}</p>
//                 </div>
//             </div>
//         );
//     }

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
//             <div className="w-screen p-6 pt-20">
//                 {/* Header */}
//                 <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-4 shadow-md">
//                     <h1 className="text-2xl font-bold">Article Submissions Dashboard</h1>
//                     <p className="text-sm opacity-90 mt-1">Manage article submissions and their details.</p>
//                 </header>

//                 {/* Success/Error Messages */}
//                 {success && (
//                     <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
//                         {success}
//                     </div>
//                 )}
//                 {error && (
//                     <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
//                         {error}
//                     </div>
//                 )}

//                 {/* Search and Actions */}
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//                     <div className="flex flex-wrap gap-3">
//                         {/* <button
//                             onClick={handleAddNew}
//                             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
//                         >
//                             <FaPlus /> Add New
//                         </button> */}
//                         {selectedRows.length > 0 && (
//                             <>
//                                 <button
//                                     onClick={handleDelete}
//                                     className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
//                                 >
//                                     <FaTrash /> Delete
//                                 </button>
//                                 {/* {selectedRows.length === 1 && (
//                                     <button
//                                         onClick={handleEdit}
//                                         className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
//                                     >
//                                         <FaEdit /> Edit
//                                     </button>
//                                 )} */}
//                             </>
//                         )}
//                         <CSVLink
//                             data={csvData}
//                             headers={csvHeaders}
//                             filename={"article-submissions.csv"}
//                             className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
//                         >
//                             <FaFileCsv /> Export CSV
//                         </CSVLink>
//                         <button
//                             onClick={handleExportPDF}
//                             className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
//                         >
//                             <FaFilePdf /> Export PDF
//                         </button>
//                         <button
//                             onClick={handlePrint}
//                             className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
//                         >
//                             <FaPrint /> Print
//                         </button>
//                     </div>
//                     <div className="relative w-full sm:w-72">
//                         <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
//                         <input
//                             type="text"
//                             placeholder="Search by author, email, title, or country..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="w-full pl-10 pr-4 py-2 bg-white border border-blue-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
//                         />
//                     </div>
//                 </div>

//                 {/* Table with Horizontal Scroll */}
//                 <div className="bg-white rounded-lg shadow-md overflow-x-auto">
//                     <table ref={tableRef} className="w-full table-auto min-w-[1200px]">
//                         <thead>
//                             <tr className="bg-gray-200 text-gray-700 text-sm">
//                                 <th className="p-3 text-left">
//                                     <input
//                                         type="checkbox"
//                                         onChange={(e) => {
//                                             if (e.target.checked) {
//                                                 setSelectedRows(currentItems.map((item) => item.absId));
//                                             } else {
//                                                 setSelectedRows([]);
//                                             }
//                                         }}
//                                         checked={
//                                             currentItems.length > 0 &&
//                                             currentItems.every((item) => selectedRows.includes(item.absId))
//                                         }
//                                         className="h-5 w-5 text-blue-500 border-blue-200 rounded focus:ring-blue-400"
//                                     />
//                                 </th>
//                                 <th className="p-3 text-left">S.No</th>
//                                 <th className="p-3 text-left">Author Name</th>
//                                 <th className="p-3 text-left">Email</th>
//                                 <th className="p-3 text-left">Country</th>
//                                 <th className="p-3 text-left">Mobile Number</th>
//                                 <th className="p-3 text-left">Journal Name</th>
//                                 <th className="p-3 text-left">Article Title</th>
//                                 <th className="p-3 text-left">Created Date</th>
//                                 <th className="p-3 text-left">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {currentItems.length === 0 ? (
//                                 <tr>
//                                     <td colSpan="10" className="p-3 text-center text-gray-600">
//                                         No submissions found.
//                                     </td>
//                                 </tr>
//                             ) : (
//                                 currentItems.map((item, index) => (
//                                     <tr
//                                         key={item.absId}
//                                         className="border-t border-gray-200 text-gray-600 text-sm hover:bg-blue-50 transition-colors"
//                                     >
//                                         <td className="p-3">
//                                             <input
//                                                 type="checkbox"
//                                                 checked={selectedRows.includes(item.absId)}
//                                                 onChange={() => handleCheckboxChange(item.absId)}
//                                                 className="h-5 w-5 text-blue-500 border-blue-200 rounded focus:ring-blue-400"
//                                             />
//                                         </td>
//                                         <td className="p-3">{startIndex + index + 1}</td>
//                                         <td className="p-3">{item.authorName || "N/A"}</td>
//                                         <td className="p-3">{item.email || "N/A"}</td>
//                                         <td className="p-3">{item.country || "N/A"}</td>
//                                         <td className="p-3">{item.mobileNumber || "N/A"}</td>
//                                         <td className="p-3">{journalMap[item.journalId] || "N/A"}</td>
//                                         <td className="p-3">{item.articleTitle || "N/A"}</td>
//                                         <td className="p-3">
//                                             {item.createdDate
//                                                 ? new Date(item.createdDate).toLocaleString()
//                                                 : "N/A"}
//                                         </td>
//                                         <td className="p-3 flex gap-2">
//                                             {item.uploadManuscript && (
//                                                 <a
//                                                     href={`https://iassrd.com:8081${item.uploadManuscript}`}
//                                                     target="_blank"
//                                                     rel="noopener noreferrer"
//                                                     className="text-red-600 hover:text-red-800"
//                                                     title="View Manuscript"
//                                                 >
//                                                     <FaFilePdf size={20} />
//                                                 </a>
//                                             )}
//                                         </td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Pagination */}
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 text-gray-600 text-sm gap-4">
//                     <span>
//                         Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of{" "}
//                         {totalItems} submissions
//                     </span>
//                     <div className="flex gap-2">
//                         <button
//                             onClick={() => handlePageChange(currentPage - 1)}
//                             disabled={currentPage === 1}
//                             className="px-4 py-2 bg-white border border-blue-200 rounded-full hover:bg-blue-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors shadow-md"
//                         >
//                             Previous
//                         </button>
//                         <span className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md">
//                             {currentPage}
//                         </span>
//                         <button
//                             onClick={() => handlePageChange(currentPage + 1)}
//                             disabled={currentPage === totalPages}
//                             className="px-4 py-2 bg-white border border-blue-200 rounded-full hover:bg-blue-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors shadow-md"
//                         >
//                             Next
//                         </button>
//                     </div>
//                 </div>

//                 {/* Delete Confirmation Modal */}
//                 {showDeleteModal && (
//                     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <p className="text-lg font-semibold text-gray-700 mb-4">
//                                 Are you sure you want to delete {selectedRows.length} submission(s)?
//                             </p>
//                             <div className="flex justify-end gap-4">
//                                 <button
//                                     onClick={confirmDelete}
//                                     className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-colors shadow-md"
//                                 >
//                                     Yes, Delete
//                                 </button>
//                                 <button
//                                     onClick={cancelDelete}
//                                     className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-full transition-colors shadow-md"
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ArticleSubmission;


import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../sidebar"; // Adjust path to your Sidebar
import { FaSearch, FaPlus, FaTrash, FaEdit, FaFileCsv, FaFilePdf, FaPrint } from "react-icons/fa";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import { Helmet } from "react-helmet-async"; // Import Helmet for meta tags

const BASE_URL = "https://iassrd.com:8081/api/v1";

const ArticleSubmission = () => {
    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [submissions, setSubmissions] = useState([]);
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const itemsPerPage = 50;
    const tableRef = useRef(null);

    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate("/login");
        }
    }, [navigate]);

    // Fetch article submissions and journals from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch article submissions
                const submissionsResponse = await axios.get(`${BASE_URL}/article-submissions`);
                let data = [];
                if (Array.isArray(submissionsResponse.data)) {
                    data = submissionsResponse.data;
                } else if (submissionsResponse.data && typeof submissionsResponse.data === "object") {
                    data = submissionsResponse.data.items || submissionsResponse.data.data || [submissionsResponse.data];
                    if (!Array.isArray(data)) {
                        data = [data];
                    }
                }
                setSubmissions(data);

                // Fetch journals
                const journalsResponse = await axios.get(`${BASE_URL}/journals`);
                if (journalsResponse.data.success) {
                    setJournals(journalsResponse.data.data || []);
                } else {
                    throw new Error("Failed to fetch journals");
                }
            } catch (err) {
                console.error("Fetch Error:", err);
                setError("Error fetching data: " + err.message);
                setSubmissions([]);
                setJournals([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Create a mapping of journalId to journalName
    const journalMap = journals.reduce((map, journal) => {
        map[journal.journalId] = journal.journalName || "Unknown Journal";
        return map;
    }, {});

    // Handle checkbox selection
    const handleCheckboxChange = (absId) => {
        setSelectedRows((prev) =>
            prev.includes(absId)
                ? prev.filter((rowId) => rowId !== absId)
                : [...prev, absId]
        );
    };

    // Handle search
    const filteredSubmissions = submissions.filter(
        (item) =>
            (item.authorName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.articleTitle || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.country || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const totalItems = filteredSubmissions.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredSubmissions.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // getting role type from localstorage  after login successfully
    let roletype = null;
    try {
        const user = localStorage.getItem("user");
        if (user) {
            const role = JSON.parse(user);
            roletype = role?.role || null; // Fallback to null if role is undefined
        }
        console.log(roletype);
    } catch (error) {
        console.error("Error parsing user from localStorage:", error);
    }
    // Prepare data for CSV export (update Journal ID to Journal Name)
    const csvHeaders = [
        { label: "S.No", key: "sNo" },
        { label: "Author Name", key: "authorName" },
        { label: "Email", key: "email" },
        { label: "Country", key: "country" },
        { label: "Mobile Number", key: "mobileNumber" },
        { label: "Journal Name", key: "journalName" },
        { label: "Article Title", key: "articleTitle" },
        { label: "Created Date", key: "createdDate" },
    ];

    const csvData = filteredSubmissions.map((item, index) => ({
        sNo: index + 1,
        authorName: item.authorName || "N/A",
        email: item.email || "N/A",
        country: item.country || "N/A",
        mobileNumber: item.mobileNumber || "N/A",
        journalName: journalMap[item.journalId] || "N/A",
        articleTitle: item.articleTitle || "N/A",
        createdDate: item.createdDate ? new Date(item.createdDate).toLocaleString() : "N/A",
    }));

    // Export to PDF
    const handleExportPDF = async () => {
        const table = tableRef.current;
        if (!table) {
            setError("Failed to export PDF: Table not found");
            return;
        }
        if (loading || currentItems.length === 0) {
            setError("Failed to export PDF: No data available");
            return;
        }

        try {
            setLoading(true);

            const tempContainer = document.createElement("div");
            tempContainer.style.position = "absolute";
            tempContainer.style.top = "-9999px";
            tempContainer.style.backgroundColor = "#ffffff";
            tempContainer.style.padding = "20px";
            document.body.appendChild(tempContainer);

            const clonedTable = table.cloneNode(true);
            tempContainer.appendChild(clonedTable);

            clonedTable.style.backgroundColor = "#ffffff";
            clonedTable.style.color = "#4b5563";
            clonedTable.style.borderCollapse = "collapse";
            clonedTable.style.width = "100%";
            clonedTable.style.fontSize = "14px";

            const rows = clonedTable.querySelectorAll("tr");
            rows.forEach((row) => {
                row.className = "";
                row.style.backgroundColor = row.parentElement.tagName === "THEAD" ? "#e5e7eb" : "#ffffff";
                row.style.color = "#4b5563";
                row.style.border = "1px solid #d1d5db";
                const cells = row.querySelectorAll("td, th");
                cells.forEach((cell) => {
                    cell.className = "";
                    cell.style.border = "1px solid #d1d5db";
                    cell.style.padding = "12px";
                    cell.style.textAlign = "left";
                    cell.style.fontSize = "14px";
                });

                const inputs = row.querySelectorAll("input[type='checkbox']");
                inputs.forEach((input) => {
                    input.className = "";
                    input.style.border = "1px solid #d1d5db";
                    input.style.backgroundColor = input.checked ? "#3b82f6" : "#ffffff";
                    input.style.width = "20px";
                    input.style.height = "20px";
                });
            });

            await new Promise((resolve) => setTimeout(resolve, 500));

            const canvas = await html2canvas(clonedTable, {
                scale: 2,
                useCORS: true,
                logging: true,
                backgroundColor: "#ffffff",
                scrollX: 0,
                scrollY: 0,
                windowWidth: clonedTable.scrollWidth,
            });

            const imgData = canvas.toDataURL("image/jpeg", 0.98);
            const pdf = new jsPDF("landscape", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = pdfWidth - 20;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, "JPEG", 10, 10, imgWidth, imgHeight);
            heightLeft -= pdfHeight;

            while (heightLeft > 0) {
                pdf.addPage();
                position -= pdfHeight;
                pdf.addImage(imgData, "JPEG", 10, position + 10, imgWidth, imgHeight);
                heightLeft -= pdfHeight;
            }

            pdf.save("article-submissions.pdf");
        } catch (err) {
            setError("Failed to export PDF: " + err.message);
        } finally {
            const tempContainer = document.querySelector("div[style*='position: absolute']");
            if (tempContainer) {
                document.body.removeChild(tempContainer);
            }
            setLoading(false);
        }
    };

    // Print functionality
    const handlePrint = () => {
        window.print();
    };

    // Navigation functions
    const handleAddNew = () => {
        navigate("/addnewarticlesubmission");
        window.scrollTo(0, 0);
    };

    // Handle delete functionality
    const handleDelete = () => {
        if (selectedRows.length > 0) {
            setShowDeleteModal(true);
        }
    };

    const confirmDelete = async () => {
        try {
            setLoading(true);
            const deletePromises = selectedRows.map((absId) =>
                axios.delete(`${BASE_URL}/article-submissions/${absId}`).then((response) => {
                    if (response.status !== 200) {
                        throw new Error(`Failed to delete submission with ID ${absId}`);
                    }
                    return response.data;
                })
            );

            await Promise.all(deletePromises);

            setSubmissions((prevSubmissions) =>
                prevSubmissions.filter((submission) => !selectedRows.includes(submission.absId))
            );

            setSelectedRows([]);

            if (currentItems.length === selectedRows.length && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }

            setSuccess("Article submissions deleted successfully!");
            setTimeout(() => setSuccess(null), 3000);

            setShowDeleteModal(false);
        } catch (err) {
            setError("Error deleting article submissions: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
    };

    const handleEdit = () => {
        if (selectedRows.length === 1) {
            const submissionToEdit = submissions.find((s) => s.absId === selectedRows[0]);
            navigate("/addnewarticlesubmission", { state: { articleSubmission: submissionToEdit } });
            window.scrollTo(0, 0);
        }
    };

    // Meta description
    const metaDescription =
        "Manage article submissions on the IASSRD dashboard. View, edit, delete, and export submissions as CSV or PDF for academic publishing.";

    // Structured data (JSON-LD) for the page
    const pageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Article Submissions Dashboard - IASSRD",
        "description": metaDescription,
        "url": window.location.href,
        "publisher": {
            "@type": "Organization",
            "name": "IASSRD", // Replace with your actual publisher name
            "url": "https://iassrd.com", // Replace with your actual website URL
        },
        "mainEntity": {
            "@type": "ItemList",
            "name": "Article Submissions",
            "itemListElement": submissions.slice(0, 5).map((submission, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "CreativeWork",
                    "name": submission.articleTitle || "Untitled Submission",
                    "author": {
                        "@type": "Person",
                        "name": submission.authorName || "Unknown Author",
                    },
                    "description": `Article submission by ${submission.authorName} for ${journalMap[submission.journalId] || "Unknown Journal"
                        }`,
                    "dateCreated": submission.createdDate || null,
                },
            })),
        },
    };

    if (loading) {
        return (
            <div className="flex h-screen w-screen bg-blue-50">
                <div className="w-[20%]">
                    <Sidebar />
                </div>
                <div className="w-screen p-6 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen bg-blue-50">
                <div className="w-1/5">
                    <Sidebar />
                </div>
                <div className="w-4/5 p-6 flex items-center justify-center">
                    <p className="text-red-600 text-lg" role="alert">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Helmet for meta tags and structured data */}
            <Helmet>
                {/* Primary Meta Tags */}
                <title>Article Submissions Dashboard - IASSRD</title>
                <meta name="description" content={metaDescription} />
                <meta
                    name="keywords"
                    content="article submissions, IASSRD dashboard, manage submissions, academic publishing, export submissions, journal submissions"
                />
                <meta name="robots" content="noindex, follow" /> {/* Dashboard pages are typically not indexed */}
                <meta name="author" content="IASSRD" /> {/* Replace with your publisher name */}
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                {/* Open Graph Tags for Social Media */}
                <meta property="og:title" content="Article Submissions Dashboard - IASSRD" />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image" content="https://yourwebsite.com/dashboard-image.jpg" />
                <meta property="og:image:alt" content="IASSRD Article Submissions Dashboard" />

                {/* Twitter Card Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="Article Submissions Dashboard - IASSRD" />
                <meta name="twitter:description" content={metaDescription} />
                <meta name="twitter:image" content="https://yourwebsite.com/dashboard-image.jpg" />
                <meta name="twitter:image:alt" content="IASSRD Article Submissions Dashboard" />

                {/* Structured Data (JSON-LD) */}
                <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
            </Helmet>

            <div className="flex min-h-screen bg-blue-50">
                <header className="fixed top-0 left-0 w-full bg-blue-900 text-white py-4 px-6 flex items-center justify-between z-40">
                    <h1 className="text-xl font-semibold">
                        International Academy for Social Sciences Research and Development
                    </h1>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm">Hi {user?.user_name}</span>
                    </div>
                </header>
                <aside className="w-[20%]">
                    <Sidebar />
                </aside>
                <main className="w-screen p-6 pt-20">
                    {/* Breadcrumb Navigation */}
                    <nav aria-label="Breadcrumb" className="text-sm text-gray-600 mb-4">
                        <ol className="list-none inline-flex items-center space-x-1">
                            <li className="inline-flex items-center">
                                <Link to="/" className="text-blue-600 hover:underline">
                                    Home
                                </Link>
                            </li>
                            <li className="inline-flex items-center">
                                <span className="mx-1">›</span>
                                <span>Article Submissions Dashboard</span>
                            </li>
                        </ol>
                    </nav>

                    {/* Header */}
                    <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-4 shadow-md">
                        <h1 className="text-2xl font-bold">Article Submissions Dashboard</h1>
                        <p className="text-sm opacity-90 mt-1">Manage article submissions and their details.</p>
                    </header>

                    {/* Success/Error Messages */}
                    {success && (
                        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg" role="alert">
                            {success}
                        </div>
                    )}
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg" role="alert">
                            {error}
                        </div>
                    )}

                    {/* Search and Actions */}
                    <section aria-label="Actions and Search" className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={handleAddNew}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
                                aria-label="Add new article submission"
                            >
                                <FaPlus /> Add New
                            </button>
                            {selectedRows.length > 0 && (
                                <>
                                    <button
                                        onClick={handleDelete}
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
                                        aria-label={`Delete ${selectedRows.length} selected submissions`}
                                    >
                                        <FaTrash /> Delete
                                    </button>
                                    {selectedRows.length === 1 && (
                                        <button
                                            onClick={handleEdit}
                                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
                                            aria-label="Edit selected submission"
                                        >
                                            <FaEdit /> Edit
                                        </button>
                                    )}
                                </>
                            )}
                            <CSVLink
                                data={csvData}
                                headers={csvHeaders}
                                filename={"article-submissions.csv"}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
                                aria-label="Export submissions as CSV"
                            >
                                <FaFileCsv /> Export CSV
                            </CSVLink>
                            <button
                                onClick={handleExportPDF}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
                                aria-label="Export submissions as PDF"
                            >
                                <FaFilePdf /> Export PDF
                            </button>
                            <button
                                onClick={handlePrint}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
                                aria-label="Print submissions"
                            >
                                <FaPrint /> Print
                            </button>
                        </div>
                        <div className="relative w-full sm:w-72">
                            <label htmlFor="search-input" className="sr-only">
                                Search by author, email, title, or country
                            </label>
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                            <input
                                type="text"
                                id="search-input"
                                placeholder="Search by author, email, title, or country..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-white border border-blue-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
                                aria-label="Search submissions"
                            />
                        </div>
                    </section>

                    {/* Table with Horizontal Scroll */}
                    <section aria-label="Submissions Table">
                        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                            <table ref={tableRef} className="w-full table-auto min-w-[1200px]">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-700 text-sm">
                                        <th className="p-3 text-left">
                                            <input
                                                type="checkbox"
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedRows(currentItems.map((item) => item.absId));
                                                    } else {
                                                        setSelectedRows([]);
                                                    }
                                                }}
                                                checked={
                                                    currentItems.length > 0 &&
                                                    currentItems.every((item) => selectedRows.includes(item.absId))
                                                }
                                                className="h-5 w-5 text-blue-500 border-blue-200 rounded focus:ring-blue-400"
                                                aria-label="Select all submissions on this page"
                                            />
                                        </th>
                                        <th className="p-3 text-left" scope="col">S.No</th>
                                        <th className="p-3 text-left" scope="col">Author Name</th>
                                        <th className="p-3 text-left" scope="col">Email</th>
                                        <th className="p-3 text-left" scope="col">Country</th>
                                        <th className="p-3 text-left" scope="col">Mobile Number</th>
                                        <th className="p-3 text-left" scope="col">Journal Name</th>
                                        <th className="p-3 text-left" scope="col">Article Title</th>
                                        <th className="p-3 text-left" scope="col">Created Date</th>
                                        <th className="p-3 text-left" scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.length === 0 ? (
                                        <tr>
                                            <td colSpan="10" className="p-3 text-center text-gray-600">
                                                No submissions found.
                                            </td>
                                        </tr>
                                    ) : (
                                        currentItems.map((item, index) => (
                                            <tr
                                                key={item.absId}
                                                className="border-t border-gray-200 text-gray-600 text-sm hover:bg-blue-50 transition-colors"
                                            >
                                                <td className="p-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedRows.includes(item.absId)}
                                                        onChange={() => handleCheckboxChange(item.absId)}
                                                        className="h-5 w-5 text-blue-500 border-blue-200 rounded focus:ring-blue-400"
                                                        aria-label={`Select submission by ${item.authorName || "unknown author"}`}
                                                    />
                                                </td>
                                                <td className="p-3">{startIndex + index + 1}</td>
                                                <td className="p-3">{item.authorName || "N/A"}</td>
                                                <td className="p-3">{item.email || "N/A"}</td>
                                                <td className="p-3">{item.country || "N/A"}</td>
                                                <td className="p-3">{item.mobileNumber || "N/A"}</td>
                                                <td className="p-3">{journalMap[item.journalId] || "N/A"}</td>
                                                <td className="p-3">{item.articleTitle || "N/A"}</td>
                                                <td className="p-3">
                                                    {item.createdDate
                                                        ? new Date(item.createdDate).toLocaleString()
                                                        : "N/A"}
                                                </td>
                                                <td className="p-3 flex gap-2">
                                                    {item.uploadManuscript && (
                                                        <a
                                                            href={`https://.com/uploads${item.uploadManuscript}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-red-600 hover:text-red-800"
                                                            title="View Manuscript"
                                                            aria-label={`View manuscript for ${item.articleTitle || "submission"}`}
                                                        >
                                                            <FaFilePdf size={20} />
                                                        </a>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Pagination */}
                    <nav
                        aria-label="Pagination"
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 text-gray-600 text-sm gap-4"
                    >
                        <span>
                            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} submissions
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-white border border-blue-200 rounded-full hover:bg-blue-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors shadow-md"
                                aria-label="Previous page"
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md" aria-current="page">
                                {currentPage}
                            </span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-white border border-blue-200 rounded-full hover:bg-blue-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors shadow-md"
                                aria-label="Next page"
                            >
                                Next
                            </button>
                        </div>
                    </nav>

                    {/* Delete Confirmation Modal */}
                    {showDeleteModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg" role="dialog" aria-modal="true">
                                <p className="text-lg font-semibold text-gray-700 mb-4">
                                    Are you sure you want to delete {selectedRows.length} submission(s)?
                                </p>
                                <div className="flex justify-end gap-4">
                                    <button
                                        onClick={confirmDelete}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-colors shadow-md"
                                        aria-label="Confirm deletion"
                                    >
                                        Yes, Delete
                                    </button>
                                    <button
                                        onClick={cancelDelete}
                                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-full transition-colors shadow-md"
                                        aria-label="Cancel deletion"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
};

export default ArticleSubmission;