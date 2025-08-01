// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../sidebar"; // Adjust path to your Sidebar
// import { FaSearch, FaPlus, FaTrash, FaEdit, FaFileCsv, FaFilePdf, FaPrint } from "react-icons/fa";
// import { CSVLink } from "react-csv";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import axios from "axios";

// const BASE_URL = "https://iassrd.com:8081/api/v1";

// const ContactUs = () => {
//     const navigate = useNavigate();
//     const [selectedRows, setSelectedRows] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [contacts, setContacts] = useState([]);
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

//     // Fetch contact messages from API
//     useEffect(() => {
//         const fetchContacts = async () => {
//             try {
//                 const response = await axios.get(`${BASE_URL}/contactus`);
//                 console.log("API Response:", response.data); // Debug log
//                 let data = [];
//                 if (Array.isArray(response.data)) {
//                     data = response.data;
//                 } else if (response.data && typeof response.data === "object") {
//                     data = response.data.items || response.data.data || [response.data];
//                     if (!Array.isArray(data)) {
//                         data = [data];
//                     }
//                 }
//                 setContacts(data);
//             } catch (err) {
//                 console.error("Fetch Error:", err); // Debug log
//                 setError("Error fetching contact messages: " + err.message);
//                 setContacts([]);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchContacts();
//     }, []);

//     // Handle checkbox selection
//     const handleCheckboxChange = (contId) => {
//         setSelectedRows((prev) =>
//             prev.includes(contId)
//                 ? prev.filter((rowId) => rowId !== contId)
//                 : [...prev, contId]
//         );
//     };

//     // Handle search
//     const filteredContacts = contacts.filter(
//         (item) =>
//             (item.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//             (item.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//             (item.message || "").toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     // Pagination logic
//     const totalItems = filteredContacts.length;
//     const totalPages = Math.ceil(totalItems / itemsPerPage);
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const currentItems = filteredContacts.slice(startIndex, startIndex + itemsPerPage);

//     const handlePageChange = (page) => {
//         if (page >= 1 && page <= totalPages) {
//             setCurrentPage(page);
//         }
//     };

//     // Prepare data for CSV export
//     const csvHeaders = [
//         { label: "S.No", key: "sNo" },
//         { label: "Name", key: "name" },
//         { label: "Email", key: "email" },
//         { label: "Contact No", key: "contactNo" },
//         { label: "Message", key: "message" },
//         { label: "Created Date", key: "createdDate" },
//         { label: "Updated Date", key: "updatedDate" },
//     ];

//     const csvData = filteredContacts.map((item, index) => ({
//         sNo: index + 1,
//         name: item.name || "N/A",
//         email: item.email || "N/A",
//         contactNo: item.contactNo || "N/A",
//         message: item.message || "N/A",
//         createdDate: item.createdDate ? new Date(item.createdDate).toLocaleString() : "N/A",
//         updatedDate: item.updatedDate ? new Date(item.updatedDate).toLocaleString() : "N/A",
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

//             pdf.save("contactus-messages.pdf");
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
//         navigate("/addnewcontactus");
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
//             const deletePromises = selectedRows.map((contId) =>
//                 axios.delete(`${BASE_URL}/contactus/${contId}`).then((response) => {
//                     if (response.status !== 200) {
//                         throw new Error(`Failed to delete contact with ID ${contId}`);
//                     }
//                     return response.data;
//                 })
//             );

//             await Promise.all(deletePromises);

//             setContacts((prevContacts) =>
//                 prevContacts.filter((contact) => !selectedRows.includes(contact.contId))
//             );

//             setSelectedRows([]);

//             if (currentItems.length === selectedRows.length && currentPage > 1) {
//                 setCurrentPage(currentPage - 1);
//             }

//             setSuccess("Contact messages deleted successfully!");
//             setTimeout(() => setSuccess(null), 3000);

//             setShowDeleteModal(false);
//         } catch (err) {
//             setError("Error deleting contact messages: " + err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const cancelDelete = () => {
//         setShowDeleteModal(false);
//     };

//     const handleEdit = () => {
//         if (selectedRows.length === 1) {
//             const contactToEdit = contacts.find((c) => c.contId === selectedRows[0]);
//             navigate("/addnewcontactus", { state: { contact: contactToEdit } });
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
//                     <h1 className="text-2xl font-bold">Contact Us Dashboard</h1>
//                     <p className="text-sm opacity-90 mt-1">Manage contact messages and their details.</p>
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
//                             filename={"contactus-messages.csv"}
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
//                             placeholder="Search by name, email, or message..."
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
//                                                 setSelectedRows(currentItems.map((item) => item.contId));
//                                             } else {
//                                                 setSelectedRows([]);
//                                             }
//                                         }}
//                                         checked={
//                                             currentItems.length > 0 &&
//                                             currentItems.every((item) => selectedRows.includes(item.contId))
//                                         }
//                                         className="h-5 w-5 text-blue-500 border-blue-200 rounded focus:ring-blue-400"
//                                     />
//                                 </th>
//                                 <th className="p-3 text-left">S.No</th>
//                                 <th className="p-3 text-left">Name</th>
//                                 <th className="p-3 text-left">Email</th>
//                                 <th className="p-3 text-left">Contact No</th>
//                                 <th className="p-3 text-left">Message</th>
//                                 <th className="p-3 text-left">Created Date</th>
//                                 <th className="p-3 text-left">Updated Date</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {currentItems.length === 0 ? (
//                                 <tr>
//                                     <td colSpan="8" className="p-3 text-center text-gray-600">
//                                         No contact messages found.
//                                     </td>
//                                 </tr>
//                             ) : (
//                                 currentItems.map((item, index) => (
//                                     <tr
//                                         key={item.contId}
//                                         className="border-t border-gray-200 text-gray-600 text-sm hover:bg-blue-50 transition-colors"
//                                     >
//                                         <td className="p-3">
//                                             <input
//                                                 type="checkbox"
//                                                 checked={selectedRows.includes(item.contId)}
//                                                 onChange={() => handleCheckboxChange(item.contId)}
//                                                 className="h-5 w-5 text-blue-500 border-blue-200 rounded focus:ring-blue-400"
//                                             />
//                                         </td>
//                                         <td className="p-3">{startIndex + index + 1}</td>
//                                         <td className="p-3">{item.name || "N/A"}</td>
//                                         <td className="p-3">{item.email || "N/A"}</td>
//                                         <td className="p-3">{item.contactNo || "N/A"}</td>
//                                         <td className="p-3">{item.message || "N/A"}</td>
//                                         <td className="p-3">
//                                             {item.createdDate
//                                                 ? new Date(item.createdDate).toLocaleString()
//                                                 : "N/A"}
//                                         </td>
//                                         <td className="p-3">
//                                             {item.updatedDate
//                                                 ? new Date(item.updatedDate).toLocaleString()
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
//                         {totalItems} messages
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
//                                 Are you sure you want to delete {selectedRows.length} message(s)?
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

// export default ContactUs;



import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar"; // Adjust path to your Sidebar
import { FaSearch, FaPlus, FaTrash, FaEdit, FaFileCsv, FaFilePdf, FaPrint } from "react-icons/fa";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";

const BASE_URL = "https://iassrd.com:8081/api/v1";

const ContactUs = () => {
    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [contacts, setContacts] = useState([]);
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

    // Fetch contact messages from API
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/contactus`);
                console.log("API Response:", response.data); // Debug log
                let data = [];
                if (Array.isArray(response.data)) {
                    data = response.data;
                } else if (response.data && typeof response.data === "object") {
                    data = response.data.items || response.data.data || [response.data];
                    if (!Array.isArray(data)) {
                        data = [data];
                    }
                }
                setContacts(data);
            } catch (err) {
                console.error("Fetch Error:", err); // Debug log
                setError("Error fetching contact messages: " + err.message);
                setContacts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchContacts();
    }, []);

    // Handle checkbox selection
    const handleCheckboxChange = (contId) => {
        setSelectedRows((prev) =>
            prev.includes(contId)
                ? prev.filter((rowId) => rowId !== contId)
                : [...prev, contId]
        );
    };

    // Handle search
    const filteredContacts = contacts.filter(
        (item) =>
            (item.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.message || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const totalItems = filteredContacts.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredContacts.slice(startIndex, startIndex + itemsPerPage);

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
        { label: "Name", key: "name" },
        { label: "Email", key: "email" },
        { label: "Contact No", key: "contactNo" },
        { label: "Message", key: "message" },
        { label: "Created Date", key: "createdDate" },
        { label: "Updated Date", key: "updatedDate" },
    ];

    const csvData = filteredContacts.map((item, index) => ({
        sNo: index + 1,
        name: item.name || "N/A",
        email: item.email || "N/A",
        contactNo: item.contactNo || "N/A",
        message: item.message || "N/A",
        createdDate: item.createdDate ? new Date(item.createdDate).toLocaleString() : "N/A",
        updatedDate: item.updatedDate ? new Date(item.updatedDate).toLocaleString() : "N/A",
    }));

    // Export to PDF
    const handleExportPDF = async () => {
        const table = tableRef.current;
        if (!table) {
            setError("Failed to export PDF: Table not found");
            return;
        }
        if (loading || error || currentItems.length === 0) {
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

            pdf.save("contactus-messages.pdf");
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
        navigate("/addnewcontactus");
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
            const deletePromises = selectedRows.map((contId) =>
                axios.delete(`${BASE_URL}/contactus/${contId}`).then((response) => {
                    if (response.status !== 200) {
                        throw new Error(`Failed to delete contact with ID ${contId}`);
                    }
                    return response.data;
                })
            );

            await Promise.all(deletePromises);

            setContacts((prevContacts) =>
                prevContacts.filter((contact) => !selectedRows.includes(contact.contId))
            );

            setSelectedRows([]);

            if (currentItems.length === selectedRows.length && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }

            setSuccess("Contact messages deleted successfully!");
            setTimeout(() => setSuccess(null), 3000);

            setShowDeleteModal(false);
        } catch (err) {
            setError("Error deleting contact messages: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
    };

    const handleEdit = () => {
        if (selectedRows.length === 1) {
            const contactToEdit = contacts.find((c) => c.contId === selectedRows[0]);
            navigate("/addnewcontactus", { state: { contact: contactToEdit } });
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
                    <h1 className="text-2xl font-bold">Contact Us Dashboard</h1>
                    <p className="text-sm opacity-90 mt-1">Manage contact messages and their details.</p>
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
                        {/* <button
                            onClick={handleAddNew}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
                        >
                            <FaPlus /> Add New
                        </button> */}
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
                                {/* {selectedRows.length === 1 && (
                                    <button
                                        onClick={handleEdit}
                                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors shadow-md"
                                    >
                                        <FaEdit /> Edit
                                    </button>
                                )} */}
                            </>
                        )}
                        <CSVLink
                            data={csvData}
                            headers={csvHeaders}
                            filename={"contactus-messages.csv"}
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
                            placeholder="Search by name, email, or message..."
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
                                                setSelectedRows(currentItems.map((item) => item.contId));
                                            } else {
                                                setSelectedRows([]);
                                            }
                                        }}
                                        checked={
                                            currentItems.length > 0 &&
                                            currentItems.every((item) => selectedRows.includes(item.contId))
                                        }
                                        className="h-5 w-5 text-blue-500 border-blue-200 rounded focus:ring-blue-400"
                                    />
                                </th>
                                <th className="p-3 text-left">S.No</th>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-left">Contact No</th>
                                <th className="p-3 text-left">Message</th>
                                <th className="p-3 text-left">Created Date</th>
                                <th className="p-3 text-left">Updated Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="p-3 text-center text-gray-600">
                                        No contact messages found.
                                    </td>
                                </tr>
                            ) : (
                                currentItems.map((item, index) => (
                                    <tr
                                        key={item.contId}
                                        className="border-t border-gray-200 text-gray-600 text-sm hover:bg-blue-50 transition-colors"
                                    >
                                        <td className="p-3">
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(item.contId)}
                                                onChange={() => handleCheckboxChange(item.contId)}
                                                className="h-5 w-5 text-blue-500 border-blue-200 rounded focus:ring-blue-400"
                                            />
                                        </td>
                                        <td className="p-3">{startIndex + index + 1}</td>
                                        <td className="p-3">{item.name || "N/A"}</td>
                                        <td className="p-3">{item.email || "N/A"}</td>
                                        <td className="p-3">{item.contactNo || "N/A"}</td>
                                        <td className="p-3">{item.message || "N/A"}</td>
                                        <td className="p-3">
                                            {item.createdDate
                                                ? new Date(item.createdDate).toLocaleString()
                                                : "N/A"}
                                        </td>
                                        <td className="p-3">
                                            {item.updatedDate
                                                ? new Date(item.updatedDate).toLocaleString()
                                                : "N/A"}
                                        </td>
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
                        {totalItems} messages
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
                                Are you sure you want to delete {selectedRows.length} message(s)?
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

export default ContactUs;