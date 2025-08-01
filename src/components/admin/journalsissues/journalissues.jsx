// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../sidebar"; // Adjust path to your Sidebar
// import { FaSearch, FaPlus, FaTrash, FaEdit, FaFileCsv, FaFilePdf, FaPrint } from "react-icons/fa";
// import { CSVLink } from "react-csv";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import axios from "axios";

// const BASE_URL = "https://iassrd.com:8081/api/v1";

// const JournalIssues = () => {
//     const navigate = useNavigate();
//     const [selectedRows, setSelectedRows] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [journalIssues, setJournalIssues] = useState([]);
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


//     // Fetch journal issues from API
//     useEffect(() => {
//         const fetchJournalIssues = async () => {
//             try {
//                 const response = await axios.get(`${BASE_URL}/journal-issues`);
//                 if (response.data.success) {
//                     setJournalIssues(response.data.data);
//                 } else {
//                     setError("Failed to fetch journal issues");
//                 }
//             } catch (err) {
//                 setError("Error fetching journal issues: " + err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchJournalIssues();
//     }, []);

//     // Handle checkbox selection
//     const handleCheckboxChange = (id) => {
//         setSelectedRows((prev) =>
//             prev.includes(id)
//                 ? prev.filter((rowId) => rowId !== id)
//                 : [...prev, id]
//         );
//     };

//     // Handle search
//     const filteredJournalIssues = journalIssues.filter(
//         (item) =>
//             item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             item.volumeNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             item.issueNo?.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     // Pagination logic
//     const totalItems = filteredJournalIssues.length;
//     const totalPages = Math.ceil(totalItems / itemsPerPage);
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const currentItems = filteredJournalIssues.slice(startIndex, startIndex + itemsPerPage);

//     const handlePageChange = (page) => {
//         if (page >= 1 && page <= totalPages) {
//             setCurrentPage(page);
//         }
//     };

//     // Prepare data for CSV export
//     const csvHeaders = [
//         { label: "S.No", key: "sNo" },
//         { label: "Journal ID", key: "journalsId" },
//         { label: "Volume No", key: "volumeNo" },
//         { label: "Issue No", key: "issueNo" },
//         { label: "From Month", key: "fromMonth" },
//         { label: "To Month", key: "toMonth" },
//         { label: "Year", key: "year" },
//         { label: "Special Issue", key: "specialIssue" },
//         { label: "Title", key: "title" },
//         { label: "Special Issue Title", key: "specialIssueTitle" },
//         { label: "Created Date", key: "createdDate" },
//         { label: "Status", key: "status" },
//     ];

//     const csvData = filteredJournalIssues.map((item, index) => ({
//         sNo: index + 1,
//         journalsId: item.journalsId,
//         volumeNo: item.volumeNo,
//         issueNo: item.issueNo,
//         fromMonth: item.fromMonth,
//         toMonth: item.toMonth,
//         year: item.year,
//         specialIssue: item.specialIssue,
//         title: item.title,
//         specialIssueTitle: item.specialIssueTitle,
//         createdDate: new Date(item.createdDate).toLocaleString(),
//         status: item.status,
//     }));

//     // Export to PDF
//     const handleExportPDF = async () => {
//         const table = tableRef.current;
//         if (!table) {
//             console.error("Table reference is null");
//             setError("Failed to export PDF: Table not found");
//             return;
//         }
//         if (loading || error || currentItems.length === 0) {
//             console.error("Cannot export PDF: Table not ready or no data");
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

//             pdf.save("journal-issues.pdf");
//         } catch (error) {
//             console.error("Error generating PDF:", error);
//             setError("Failed to export PDF: " + error.message);
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
//         navigate("/journalissuesaddnew");
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
//             const deletePromises = selectedRows.map((id) =>
//                 axios.delete(`${BASE_URL}/journal-issues/${id}`).then((response) => {
//                     if (!response.data.success) {
//                         throw new Error(`Failed to delete journal issue with ID ${id}`);
//                     }
//                     return response.data;
//                 })
//             );

//             await Promise.all(deletePromises);

//             setJournalIssues((prevJournalIssues) =>
//                 prevJournalIssues.filter((issue) => !selectedRows.includes(issue.issueId))
//             );

//             setSelectedRows([]);

//             if (currentItems.length === selectedRows.length && currentPage > 1) {
//                 setCurrentPage(currentPage - 1);
//             }

//             setSuccess("Journal issues deleted successfully!");
//             setTimeout(() => setSuccess(null), 3000);

//             setShowDeleteModal(false);
//         } catch (err) {
//             setError("Error deleting journal issues: " + err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const cancelDelete = () => {
//         setShowDeleteModal(false);
//     };

//     const handleEdit = () => {
//         if (selectedRows.length === 1) {
//             const issueToEdit = journalIssues.find((j) => j.issueId === selectedRows[0]);
//             navigate("/journalissuesaddnew", { state: { journalIssue: issueToEdit } });
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
//                     <h1 className="text-2xl font-bold">Journal Issues Dashboard</h1>
//                     <p className="text-sm opacity-90 mt-1">Manage journal issues and their details.</p>
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
//                             filename={"journal-issues.csv"}
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
//                             placeholder="Search by title, volume, or issue..."
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
//                                                 setSelectedRows(currentItems.map((item) => item.issueId));
//                                             } else {
//                                                 setSelectedRows([]);
//                                             }
//                                         }}
//                                         checked={
//                                             currentItems.length > 0 &&
//                                             currentItems.every((item) => selectedRows.includes(item.issueId))
//                                         }
//                                         className="h-5 w-5 text-blue-500 border-blue-200 rounded focus:ring-blue-400"
//                                     />
//                                 </th>
//                                 <th className="p-3 text-left">S.No</th>
//                                 <th className="p-3 text-left">Journal ID</th>
//                                 <th className="p-3 text-left">Volume No</th>
//                                 <th className="p-3 text-left">Issue No</th>
//                                 <th className="p-3 text-left">From Month</th>
//                                 <th className="p-3 text-left">To Month</th>
//                                 <th className="p-3 text-left">Year</th>
//                                 <th className="p-3 text-left">Title</th>
//                                 <th className="p-3 text-left">Special Issue</th>
//                                 <th className="p-3 text-left">Created Date</th>
//                                 <th className="p-3 text-left">Status</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {currentItems.map((item, index) => (
//                                 <tr
//                                     key={item.issueId}
//                                     className="border-t border-gray-200 text-gray-600 text-sm hover:bg-blue-50 transition-colors"
//                                 >
//                                     <td className="p-3">
//                                         <input
//                                             type="checkbox"
//                                             checked={selectedRows.includes(item.issueId)}
//                                             onChange={() => handleCheckboxChange(item.issueId)}
//                                             className="h-5 w-5 text-blue-500 border-blue-200 rounded focus:ring-blue-400"
//                                         />
//                                     </td>
//                                     <td className="p-3">{startIndex + index + 1}</td>
//                                     <td className="p-3">{item.journalsId}</td>
//                                     <td className="p-3">{item.volumeNo}</td>
//                                     <td className="p-3">{item.issueNo}</td>
//                                     <td className="p-3">{item.fromMonth}</td>
//                                     <td className="p-3">{item.toMonth}</td>
//                                     <td className="p-3">{item.year}</td>
//                                     <td className="p-3">{item.title}</td>
//                                     <td className="p-3">{item.specialIssue}</td>
//                                     <td className="p-3">{new Date(item.createdDate).toLocaleString()}</td>
//                                     <td className="p-3">{item.status}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Pagination */}
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 text-gray-600 text-sm gap-4">
//                     <span>
//                         Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of{" "}
//                         {totalItems} journal issues
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
//                                 Are you sure you want to delete {selectedRows.length} journal issue(s)?
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

// export default JournalIssues;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar"; // Adjust path to your Sidebar
import { FaSearch, FaPlus, FaTrash, FaEdit, FaFileCsv, FaFilePdf, FaPrint } from "react-icons/fa";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";

const BASE_URL = "https://iassrd.com:8081/api/v1";

const JournalIssues = () => {
    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [journalIssues, setJournalIssues] = useState([]);
    const [journals, setJournals] = useState({});
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

    // Fetch journals from API to map journalId to journalName
    useEffect(() => {
        const fetchJournals = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/journals`);
                let journalsData = [];
                if (Array.isArray(response.data)) {
                    journalsData = response.data;
                } else if (response.data.success && Array.isArray(response.data.data)) {
                    journalsData = response.data.data;
                } else {
                    throw new Error("Invalid journals data format");
                }
                const journalMap = journalsData.reduce((map, journal) => {
                    map[journal.journalId] = journal.journalName;
                    return map;
                }, {});
                setJournals(journalMap);
            } catch (err) {
                console.error("Error fetching journals:", err);
                setError("Error fetching journals: " + err.message);
            }
        };
        fetchJournals();
    }, []);

    // Fetch journal issues from API
    useEffect(() => {
        const fetchJournalIssues = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/journal-issues`);
                if (response.data.success && Array.isArray(response.data.data)) {
                    setJournalIssues(response.data.data);
                } else {
                    throw new Error("Invalid journal issues data format");
                }
            } catch (err) {
                setError("Error fetching journal issues: " + err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchJournalIssues();
    }, []);

    // Handle checkbox selection
    const handleCheckboxChange = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id)
                ? prev.filter((rowId) => rowId !== id)
                : [...prev, id]
        );
    };

    // Handle search
    const filteredJournalIssues = journalIssues.filter(
        (item) =>
            (item.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.volumeNo || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.issueNo || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (journals[item.journalsId] || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const totalItems = filteredJournalIssues.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredJournalIssues.slice(startIndex, startIndex + itemsPerPage);

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


    // Prepare data for CSV export
    const csvHeaders = [
        { label: "S.No", key: "sNo" },
        { label: "Journal Name", key: "journalName" },
        { label: "Volume No", key: "volumeNo" },
        { label: "Issue No", key: "issueNo" },
        { label: "From Month", key: "fromMonth" },
        { label: "To Month", key: "toMonth" },
        { label: "Year", key: "year" },
        { label: "Special Issue", key: "specialIssue" },
        { label: "Title", key: "title" },
        { label: "Special Issue Title", key: "specialIssueTitle" },
        { label: "Created Date", key: "createdDate" },
        { label: "Status", key: "status" },
    ];

    const csvData = filteredJournalIssues.map((item, index) => ({
        sNo: index + 1,
        journalName: journals[item.journalsId] || "Unknown Journal",
        volumeNo: item.volumeNo || "N/A",
        issueNo: item.issueNo || "N/A",
        fromMonth: item.fromMonth || "N/A",
        toMonth: item.toMonth || "N/A",
        year: item.year || "N/A",
        specialIssue: item.specialIssue || "N/A",
        title: item.title || "N/A",
        specialIssueTitle: item.specialIssueTitle || "N/A",
        createdDate: item.createdDate ? new Date(item.createdDate).toLocaleString() : "N/A",
        status: item.status || "N/A",
    }));

    // Export to PDF
    const handleExportPDF = async () => {
        const table = tableRef.current;
        if (!table) {
            console.error("Table reference is null");
            setError("Failed to export PDF: Table not found");
            return;
        }
        if (loading || error || currentItems.length === 0) {
            console.error("Cannot export PDF: Table not ready or no data");
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

            pdf.save("journal-issues.pdf");
        } catch (error) {
            console.error("Error generating PDF:", error);
            setError("Failed to export PDF: " + error.message);
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
        navigate("/journalissuesaddnew");
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
            const deletePromises = selectedRows.map((id) =>
                axios.delete(`${BASE_URL}/journal-issues/${id}`).then((response) => {
                    if (!response.data.success) {
                        throw new Error(`Failed to delete journal issue with ID ${id}`);
                    }
                    return response.data;
                })
            );

            await Promise.all(deletePromises);

            setJournalIssues((prevJournalIssues) =>
                prevJournalIssues.filter((issue) => !selectedRows.includes(issue.issueId))
            );

            setSelectedRows([]);

            if (currentItems.length === selectedRows.length && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }

            setSuccess("Journal issues deleted successfully!");
            setTimeout(() => setSuccess(null), 3000);

            setShowDeleteModal(false);
        } catch (err) {
            setError("Error deleting journal issues: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
    };

    const handleEdit = () => {
        if (selectedRows.length === 1) {
            const issueToEdit = journalIssues.find((j) => j.issueId === selectedRows[0]);
            navigate("/journalissuesaddnew", { state: { journalIssue: issueToEdit } });
            window.scrollTo(0, 0);
        }
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
                    <p className="text-red-600 text-lg">{error}</p>
                </div>
            </div>
        );
    }

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
            <div className="w-screen p-6 pt-20">
                {/* Header */}
                <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-4 shadow-md">
                    <h1 className="text-2xl font-bold">Journal Issues Dashboard</h1>
                    <p className="text-sm opacity-90 mt-1">Manage journal issues and their details.</p>
                </header>

                {/* Success/Error Messages */}
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

                {/* Search and Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={handleAddNew}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
                        >
                            <FaPlus /> Add New
                        </button>
                        {selectedRows.length > 0 && (
                            <>
                                {roletype === "admin" || roletype === "ADMIN" && (

                                    <button
                                        onClick={handleDelete}
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
                                    >
                                        <FaTrash /> Delete
                                    </button>
                                )}
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
                        <CSVLink
                            data={csvData}
                            headers={csvHeaders}
                            filename={"journal-issues.csv"}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
                        >
                            <FaFileCsv /> Export CSV
                        </CSVLink>
                        <button
                            onClick={handleExportPDF}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
                        >
                            <FaFilePdf /> Export PDF
                        </button>
                        <button
                            onClick={handlePrint}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
                        >
                            <FaPrint /> Print
                        </button>
                    </div>
                    <div className="relative w-full sm:w-72">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                        <input
                            type="text"
                            placeholder="Search by title, volume, issue, or journal..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-blue-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
                        />
                    </div>
                </div>

                {/* Table with Horizontal Scroll */}
                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                    <table ref={tableRef} className="w-full table-auto min-w-[1200px]">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700 text-sm">
                                <th className="p-3 text-left">
                                    <input
                                        type="checkbox"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedRows(currentItems.map((item) => item.issueId));
                                            } else {
                                                setSelectedRows([]);
                                            }
                                        }}
                                        checked={
                                            currentItems.length > 0 &&
                                            currentItems.every((item) => selectedRows.includes(item.issueId))
                                        }
                                        className="h-5 w-5 text-blue-500 border-blue-200 rounded focus:ring-blue-400"
                                    />
                                </th>
                                <th className="p-3 text-left">S.No</th>
                                <th className="p-3 text-left">Journal Name</th>
                                <th className="p-3 text-left">Volume No</th>
                                <th className="p-3 text-left">Issue No</th>
                                <th className="p-3 text-left">From Month</th>
                                <th className="p-3 text-left">To Month</th>
                                <th className="p-3 text-left">Year</th>
                                <th className="p-3 text-left">Title</th>
                                <th className="p-3 text-left">Special Issue</th>
                                <th className="p-3 text-left">Created Date</th>
                                <th className="p-3 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length === 0 ? (
                                <tr>
                                    <td colSpan="12" className="p-3 text-center text-gray-600">
                                        No journal issues found.
                                    </td>
                                </tr>
                            ) : (
                                currentItems.map((item, index) => (
                                    <tr
                                        key={item.issueId}
                                        className="border-t border-gray-200 text-gray-600 text-sm hover:bg-blue-50 transition-colors"
                                    >
                                        <td className="p-3">
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(item.issueId)}
                                                onChange={() => handleCheckboxChange(item.issueId)}
                                                className="h-5 w-5 text-blue-500 border-blue-200 rounded focus:ring-blue-400"
                                            />
                                        </td>
                                        <td className="p-3">{startIndex + index + 1}</td>
                                        <td className="p-3">{journals[item.journalsId] || "Unknown Journal"}</td>
                                        <td className="p-3">{item.volumeNo || "N/A"}</td>
                                        <td className="p-3">{item.issueNo || "N/A"}</td>
                                        <td className="p-3">{item.fromMonth || "N/A"}</td>
                                        <td className="p-3">{item.toMonth || "N/A"}</td>
                                        <td className="p-3">{item.year || "N/A"}</td>
                                        <td className="p-3">{item.title || "N/A"}</td>
                                        <td className="p-3">{item.specialIssue || "N/A"}</td>
                                        <td className="p-3">
                                            {item.createdDate ? new Date(item.createdDate).toLocaleString() : "N/A"}
                                        </td>
                                        <td className="p-3">{item.status || "N/A"}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 text-gray-600 text-sm gap-4">
                    <span>
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of{" "}
                        {totalItems} journal issues
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

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <p className="text-lg font-semibold text-gray-700 mb-4">
                                Are you sure you want to delete {selectedRows.length} journal issue(s)?
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
            </div>
        </div>
    );
};

export default JournalIssues;