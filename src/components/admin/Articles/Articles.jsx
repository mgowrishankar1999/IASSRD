// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../sidebar";
// import { FaSearch, FaPlus, FaTrash, FaEdit, FaFileCsv, FaFilePdf, FaPrint } from "react-icons/fa";
// import { CSVLink } from "react-csv";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import axios from "axios";

// const BASE_URL = "https://iassrd.com:8081/api/v1";

// const Articles = () => {
//     const navigate = useNavigate();
//     const [selectedRows, setSelectedRows] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [articles, setArticles] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [modal, setModal] = useState({ show: false, type: "", message: "" });
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

//     // Fetch articles from API
//     useEffect(() => {
//         const fetchArticles = async () => {
//             try {
//                 const response = await axios.get(`${BASE_URL}/articles`);
//                 if (response.data.success) {
//                     setArticles(response.data.data || []);
//                 } else {
//                     setError("Failed to fetch articles");
//                     setArticles([]);
//                 }
//             } catch (err) {
//                 setError("Error fetching articles: " + err.message);
//                 setArticles([]);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchArticles();
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
//     const filteredArticles = articles.filter((item) =>
//         [item.articleKey, item.articleTitle, item.doi]
//             .filter(Boolean)
//             .some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()))
//     );

//     // Pagination logic
//     const totalItems = filteredArticles.length;
//     const totalPages = Math.ceil(totalItems / itemsPerPage);
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const currentItems = filteredArticles.slice(startIndex, startIndex + itemsPerPage);

//     const handlePageChange = (page) => {
//         if (page >= 1 && page <= totalPages) {
//             setCurrentPage(page);
//         }
//     };

//     // Prepare data for CSV export
//     const csvHeaders = [
//         { label: "S.No", key: "sNo" },
//         { label: "Article Key", key: "articleKey" },
//         { label: "Article Title", key: "articleTitle" },
//         { label: "Journal ID", key: "journalId" },
//         { label: "DOI", key: "doi" },
//         { label: "Pages", key: "pages" },
//         { label: "Volume/Issue", key: "volumeIssue" },
//         { label: "Year", key: "year" },
//         { label: "Date of Publication", key: "dateOfPublication" },
//         { label: "Corresponding Author", key: "correspondingAuthor" },
//         { label: "Downloads", key: "downloads" },
//         { label: "Views", key: "views" },
//         { label: "Created Date", key: "createdDate" },
//         { label: "Status", key: "status" },
//     ];

//     const csvData = filteredArticles.map((item, index) => ({
//         sNo: index + 1,
//         articleKey: item.articleKey || "N/A",
//         articleTitle: item.articleTitle || "N/A",
//         journalId: item.journalId || "N/A",
//         doi: item.doi || "N/A",
//         pages: `${item.pageFrom || "N/A"} - ${item.pageTo || "N/A"}`,
//         volumeIssue: `${item.volume || "N/A"}/${item.issue || "N/A"}`,
//         year: item.year || "N/A",
//         dateOfPublication: item.dateOfPublication || "N/A",
//         correspondingAuthor: item.correspondingAuthor || "N/A",
//         downloads: item.downloads || 0,
//         views: item.views || 0,
//         createdDate: item.createdDate ? new Date(item.createdDate).toLocaleString() : "N/A",
//         status: item.status === 1 ? "Active" : "Inactive",
//     }));

//     // Export to PDF
//     const handleExportPDF = async () => {
//         const table = tableRef.current;
//         if (!table) {
//             setModal({ show: true, type: "error", message: "Failed to export PDF: Table not found" });
//             return;
//         }
//         if (loading || currentItems.length === 0) {
//             setModal({ show: true, type: "error", message: "Failed to export PDF: No data available" });
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

//             pdf.save("articles.pdf");
//         } catch (error) {
//             setModal({ show: true, type: "error", message: "Failed to export PDF: " + error.message });
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
//         navigate("/addnewarticle");
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
//                 axios.delete(`${BASE_URL}/articles/${id}`).then((response) => {
//                     if (!response.data.success) {
//                         throw new Error(`Failed to delete article with ID ${id}`);
//                     }
//                     return response.data;
//                 })
//             );

//             await Promise.all(deletePromises);

//             setArticles((prev) =>
//                 prev.filter((article) => !selectedRows.includes(article.articleId))
//             );
//             setSelectedRows([]);

//             if (currentItems.length === selectedRows.length && currentPage > 1) {
//                 setCurrentPage(currentPage - 1);
//             }

//             setModal({ show: true, type: "success", message: "Articles deleted successfully!" });
//             setTimeout(() => setModal({ show: false, type: "", message: "" }), 3000);
//             setShowDeleteModal(false);
//         } catch (err) {
//             setModal({ show: true, type: "error", message: "Error deleting articles: " + err.message });
//         } finally {
//             setLoading(false);
//         }
//     };

//     const cancelDelete = () => {
//         setShowDeleteModal(false);
//     };

//     const handleEdit = () => {
//         if (selectedRows.length === 1) {
//             const articleToEdit = articles.find((a) => a.articleId === selectedRows[0]);
//             navigate("/addnewarticle", { state: { article: articleToEdit } });
//             window.scrollTo(0, 0);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="flex min-h-screen bg-blue-50">
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
//                 <div className="w-[20%]">
//                     <Sidebar />
//                 </div>
//                 <div className="w-screen p-6 flex items-center justify-center">
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
//             <div className="w-screen p-6 pt-20 overflow-auto max-h-screen">
//                 <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-6 shadow-md">
//                     <h1 className="text-2xl font-bold">Articles Dashboard</h1>
//                     <p className="text-sm opacity-90 mt-1">Manage articles and their details.</p>
//                 </header>

//                 {modal.show && (
//                     <div className="mb-4 p-3 rounded-lg shadow-md bg-green-100 text-green-700">
//                         {modal.message}
//                     </div>
//                 )}

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
//                             filename={"articles.csv"}
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
//                             placeholder="Search by key, title, or DOI..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="w-full pl-10 pr-4 py-2 bg-white border border-blue-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
//                         />
//                     </div>
//                 </div>

//                 <div className="bg-white rounded-lg shadow-md overflow-x-auto">
//                     <table ref={tableRef} className="w-full table-auto min-w-[1200px]">
//                         <thead>
//                             <tr className="bg-gray-200 text-gray-700 text-sm">
//                                 <th className="p-3 text-left">
//                                     <input
//                                         type="checkbox"
//                                         onChange={(e) => {
//                                             if (e.target.checked) {
//                                                 setSelectedRows(currentItems.map((item) => item.articleId));
//                                             } else {
//                                                 setSelectedRows([]);
//                                             }
//                                         }}
//                                         checked={
//                                             currentItems.length > 0 &&
//                                             currentItems.every((item) => selectedRows.includes(item.articleId))
//                                         }
//                                         className="h-5 w-5 text-blue-500 border-blue-200 rounded focus:ring-blue-400"
//                                     />
//                                 </th>
//                                 <th className="p-3 text-left">S.No</th>
//                                 <th className="p-3 text-left">Article Key</th>
//                                 <th className="p-3 text-left">Title</th>
//                                 <th className="p-3 text-left">Journal ID</th>
//                                 <th className="p-3 text-left">DOI</th>
//                                 <th className="p-3 text-left">Pages</th>
//                                 <th className="p-3 text-left">Vol/Issue</th>
//                                 <th className="p-3 text-left">Year</th>
//                                 <th className="p-3 text-left">Publication Date</th>
//                                 <th className="p-3 text-left">Author</th>
//                                 <th className="p-3 text-left">Downloads</th>
//                                 <th className="p-3 text-left">Views</th>
//                                 <th className="p-3 text-left">Created</th>
//                                 <th className="p-3 text-left">Status</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {currentItems.map((item, index) => (
//                                 <tr
//                                     key={item.articleId}
//                                     className="border-t border-gray-200 text-gray-600 text-sm hover:bg-blue-50 transition-colors"
//                                 >
//                                     <td className="p-3">
//                                         <input
//                                             type="checkbox"
//                                             checked={selectedRows.includes(item.articleId)}
//                                             onChange={() => handleCheckboxChange(item.articleId)}
//                                             className="h-5 w-5 text-blue-500 border-blue-200 rounded focus:ring-blue-400"
//                                         />
//                                     </td>
//                                     <td className="p-3">{startIndex + index + 1}</td>
//                                     <td className="p-3">{item.articleKey || "N/A"}</td>
//                                     <td className="p-3">{item.articleTitle || "N/A"}</td>
//                                     <td className="p-3">{item.journalId || "N/A"}</td>
//                                     <td className="p-3">{item.doi || "N/A"}</td>
//                                     <td className="p-3">{`${item.pageFrom || "N/A"}-${item.pageTo || "N/A"}`}</td>
//                                     <td className="p-3">{`${item.volume || "N/A"}/${item.issue || "N/A"}`}</td>
//                                     <td className="p-3">{item.year || "N/A"}</td>
//                                     <td className="p-3">{item.dateOfPublication || "N/A"}</td>
//                                     <td className="p-3">{item.correspondingAuthor || "N/A"}</td>
//                                     <td className="p-3">{item.downloads || 0}</td>
//                                     <td className="p-3">{item.views || 0}</td>
//                                     <td className="p-3">
//                                         {item.createdDate ? new Date(item.createdDate).toLocaleString() : "N/A"}
//                                     </td>
//                                     <td className="p-3">{item.status === 1 ? "Active" : "Inactive"}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 text-gray-600 text-sm gap-4">
//                     <span>
//                         Showing {startIndex + 1} to{" "}
//                         {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} articles
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

//                 {showDeleteModal && (
//                     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             <p className="text-lg font-semibold text-gray-700 mb-4">
//                                 Are you sure you want to delete {selectedRows.length} article(s)?
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

// export default Articles;




import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar";
import { FaSearch, FaPlus, FaTrash, FaEdit, FaFileCsv, FaFilePdf, FaPrint } from "react-icons/fa";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";

const BASE_URL = "https://iassrd.com:8081/api/v1";

const Articles = () => {
    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [articles, setArticles] = useState([]);
    const [journals, setJournals] = useState([]); // New state for journals
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState({ show: false, type: "", message: "" });
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

    // Fetch articles and journals from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch articles
                const articlesResponse = await axios.get(`${BASE_URL}/articles`);
                if (articlesResponse.data.success) {
                    setArticles(articlesResponse.data.data || []);
                } else {
                    throw new Error("Failed to fetch articles");
                }

                // Fetch journals
                const journalsResponse = await axios.get(`${BASE_URL}/journals`);
                if (journalsResponse.data.success) {
                    setJournals(journalsResponse.data.data || []);
                } else {
                    throw new Error("Failed to fetch journals");
                }
            } catch (err) {
                setError("Error fetching data: " + err.message);
                setArticles([]);
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
    const handleCheckboxChange = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id)
                ? prev.filter((rowId) => rowId !== id)
                : [...prev, id]
        );
    };

    // Handle search
    const filteredArticles = articles.filter((item) =>
        [item.articleKey, item.articleTitle, item.doi]
            .filter(Boolean)
            .some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Pagination logic
    const totalItems = filteredArticles.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredArticles.slice(startIndex, startIndex + itemsPerPage);

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
        { label: "Article Key", key: "articleKey" },
        { label: "Article Title", key: "articleTitle" },
        { label: "Journal Name", key: "journalName" }, // Updated header
        { label: "DOI", key: "doi" },
        { label: "Pages", key: "pages" },
        { label: "Volume/Issue", key: "volumeIssue" },
        { label: "Year", key: "year" },
        { label: "Date of Publication", key: "dateOfPublication" },
        { label: "Corresponding Author", key: "correspondingAuthor" },
        { label: "Downloads", key: "downloads" },
        { label: "Views", key: "views" },
        { label: "Created Date", key: "createdDate" },
        { label: "Status", key: "status" },
    ];

    const csvData = filteredArticles.map((item, index) => ({
        sNo: index + 1,
        articleKey: item.articleKey || "N/A",
        articleTitle: item.articleTitle || "N/A",
        journalName: journalMap[item.journalId] || "N/A", // Map journalId to journalName
        doi: item.doi || "N/A",
        pages: `${item.pageFrom || "N/A"} - ${item.pageTo || "N/A"}`,
        volumeIssue: `${item.volume || "N/A"}/${item.issue || "N/A"}`,
        year: item.year || "N/A",
        dateOfPublication: item.dateOfPublication || "N/A",
        correspondingAuthor: item.correspondingAuthor || "N/A",
        downloads: item.downloads || 0,
        views: item.views || 0,
        createdDate: item.createdDate ? new Date(item.createdDate).toLocaleString() : "N/A",
        status: item.status === 1 ? "Active" : "Inactive",
    }));

    // Export to PDF
    const handleExportPDF = async () => {
        const table = tableRef.current;
        if (!table) {
            setModal({ show: true, type: "error", message: "Failed to export PDF: Table not found" });
            return;
        }
        if (loading || currentItems.length === 0) {
            setModal({ show: true, type: "error", message: "Failed to export PDF: No data available" });
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

            pdf.save("articles.pdf");
        } catch (error) {
            setModal({ show: true, type: "error", message: "Failed to export PDF: " + error.message });
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
        navigate("/addnewarticle");
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
                axios.delete(`${BASE_URL}/articles/${id}`).then((response) => {
                    if (!response.data.success) {
                        throw new Error(`Failed to delete article with ID ${id}`);
                    }
                    return response.data;
                })
            );

            await Promise.all(deletePromises);

            setArticles((prev) =>
                prev.filter((article) => !selectedRows.includes(article.articleId))
            );
            setSelectedRows([]);

            if (currentItems.length === selectedRows.length && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }

            setModal({ show: true, type: "success", message: "Articles deleted successfully!" });
            setTimeout(() => setModal({ show: false, type: "", message: "" }), 3000);
            setShowDeleteModal(false);
        } catch (err) {
            setModal({ show: true, type: "error", message: "Error deleting articles: " + err.message });
        } finally {
            setLoading(false);
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
    };

    const handleEdit = () => {
        if (selectedRows.length === 1) {
            const articleToEdit = articles.find((a) => a.articleId === selectedRows[0]);
            navigate("/addnewarticle", { state: { article: articleToEdit } });
            window.scrollTo(0, 0);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-blue-50">
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
                <div className="w-[20%]">
                    <Sidebar />
                </div>
                <div className="w-screen p-6 flex items-center justify-center">
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
            <div className="w-screen p-6 pt-20 overflow-auto max-h-screen">
                <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-6 shadow-md">
                    <h1 className="text-2xl font-bold">Articles Dashboard</h1>
                    <p className="text-sm opacity-90 mt-1">Manage articles and their details.</p>
                </header>

                {modal.show && (
                    <div className="mb-4 p-3 rounded-lg shadow-md bg-green-100 text-green-700">
                        {modal.message}
                    </div>
                )}

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
                            filename={"articles.csv"}
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
                            placeholder="Search by key, title, or DOI..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-blue-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                    <table ref={tableRef} className="w-full table-auto min-w-[1200px]">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700 text-sm">
                                <th className="p-3 text-left">
                                    <input
                                        type="checkbox"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedRows(currentItems.map((item) => item.articleId));
                                            } else {
                                                setSelectedRows([]);
                                            }
                                        }}
                                        checked={
                                            currentItems.length > 0 &&
                                            currentItems.every((item) => selectedRows.includes(item.articleId))
                                        }
                                        className="h-5 w-5 text-blue-500 border-blue-200 rounded focus:ring-blue-400"
                                    />
                                </th>
                                <th className="p-3 text-left">S.No</th>
                                <th className="p-3 text-left">Article Key</th>
                                <th className="p-3 text-left">Title</th>
                                <th className="p-3 text-left">Journal Name</th> {/* Updated header */}
                                <th className="p-3 text-left">DOI</th>
                                <th className="p-3 text-left">Pages</th>
                                <th className="p-3 text-left">Vol/Issue</th>
                                <th className="p-3 text-left">Year</th>
                                <th className="p-3 text-left">Publication Date</th>
                                <th className="p-3 text-left">Author</th>
                                <th className="p-3 text-left">Downloads</th>
                                <th className="p-3 text-left">Views</th>
                                <th className="p-3 text-left">Created</th>
                                {/* <th className="p-3 text-left">Status</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr
                                    key={item.articleId}
                                    className="border-t border-gray-200 text-gray-600 text-sm hover:bg-blue-50 transition-colors"
                                >
                                    <td className="p-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(item.articleId)}
                                            onChange={() => handleCheckboxChange(item.articleId)}
                                            className="h-5 w-5 text-blue-500 border-blue-200 rounded focus:ring-blue-400"
                                        />
                                    </td>
                                    <td className="p-3">{startIndex + index + 1}</td>
                                    <td className="p-3">{item.articleKey || "N/A"}</td>
                                    <td className="p-3">{item.articleTitle || "N/A"}</td>
                                    <td className="p-3">{journalMap[item.journalId] || "N/A"}</td> {/* Show journalName */}
                                    <td className="p-3">{item.doi || "N/A"}</td>
                                    <td className="p-3">{`${item.pageFrom || "N/A"}-${item.pageTo || "N/A"}`}</td>
                                    <td className="p-3">{`${item.volume || "N/A"}/${item.issue || "N/A"}`}</td>
                                    <td className="p-3">{item.year || "N/A"}</td>
                                    <td className="p-3">{item.dateOfPublication || "N/A"}</td>
                                    <td className="p-3">{item.correspondingAuthor || "N/A"}</td>
                                    <td className="p-3">{item.downloads || 0}</td>
                                    <td className="p-3">{item.views || 0}</td>
                                    <td className="p-3">
                                        {item.createdDate ? new Date(item.createdDate).toLocaleString() : "N/A"}
                                    </td>
                                    {/* <td className="p-3">{item.status === 1 ? "Active" : "Inactive"}</td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 text-gray-600 text-sm gap-4">
                    <span>
                        Showing {startIndex + 1} to{" "}
                        {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} articles
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

                {showDeleteModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <p className="text-lg font-semibold text-gray-700 mb-4">
                                Are you sure you want to delete {selectedRows.length} article(s)?
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

export default Articles;