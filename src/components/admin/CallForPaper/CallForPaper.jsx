import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar";
import { FaSearch, FaPlus, FaTrash, FaEdit, FaFileCsv, FaFilePdf, FaPrint } from "react-icons/fa";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";

const BASE_URL = "https://iassrd.com:8081/api/v1";

const CallForPapers = () => {
    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [callForPapers, setCallForPapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState({ show: false, type: "", message: "" });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const itemsPerPage = 50;
    const tableRef = useRef(null);

    useEffect(() => {
        const fetchCallForPapers = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/call-for-papers`);
                if (response.data.success) {
                    setCallForPapers(response.data.data);
                } else {
                    setError(response.data.message || "Failed to fetch call for papers");
                }
            } catch (err) {
                setError("Error fetching call for papers: " + err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCallForPapers();
    }, []);

    const handleCheckboxChange = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };

    const filteredCallForPapers = callForPapers.filter((item) =>
        (item.issueMonth || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.issueYear || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.dispatchMonth || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalItems = filteredCallForPapers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredCallForPapers.slice(startIndex, startIndex + itemsPerPage);

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
        // console.log(roletype);
    } catch (error) {
        console.error("Error parsing user from localStorage:", error);
    }

    const csvHeaders = [
        { label: "S.No", key: "sNo" },
        { label: "Issue Month", key: "issueMonth" },
        { label: "Issue Year", key: "issueYear" },
        // { label: "Deadline", key: "deadline" },
        // { label: "Dispatch Month", key: "dispatchMonth" },
        // { label: "Dispatch Year", key: "dispatchYear" },
        // { label: "Dispatch Date", key: "dispatchDate" },
        { label: "File", key: "file" },
        { label: "Created User ID", key: "createdUserId" },
        { label: "Created Date", key: "createdDate" },
        { label: "Updated Date", key: "updatedDate" },
        // { label: "Status", key: "status" },
    ];

    const csvData = filteredCallForPapers.map((item, index) => ({
        sNo: startIndex + index + 1,
        issueMonth: item.issueMonth || "N/A",
        issueYear: item.issueYear || "N/A",
        deadline: item.deadline ? new Date(item.deadline).toLocaleDateString() : "N/A",
        dispatchMonth: item.dispatchMonth || "N/A",
        dispatchYear: item.dispatchYear || "N/A",
        dispatchDate: item.dispatchDate ? new Date(item.dispatchDate).toLocaleDateString() : "N/A",
        file: item.file || "N/A",
        createdUserId: item.createdUserId || "N/A",
        createdDate: item.createdDate ? new Date(item.createdDate).toLocaleString() : "N/A",
        updatedDate: item.updatedDate ? new Date(item.updatedDate).toLocaleString() : "N/A",
        status: item.status === 1 ? "Active" : "Inactive",
    }));

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

            pdf.save("callforpapers.pdf");
        } catch (error) {
            setModal({ show: true, type: "error", message: "Failed to export PDF: " + error.message });
        } finally {
            const tempContainer = document.querySelector("div[style*='position: absolute']");
            if (tempContainer) document.body.removeChild(tempContainer);
            setLoading(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleAddNew = () => {
        navigate("/addnewcallforpapers");
        window.scrollTo(0, 0);
    };

    const handleDelete = () => {
        if (selectedRows.length > 0) setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            setLoading(true);
            const deletePromises = selectedRows.map((id) =>
                axios.delete(`${BASE_URL}/call-for-papers/${id}`).then((response) => {
                    if (!response.data.success) throw new Error(`Failed to delete call for paper with ID ${id}`);
                    return response.data;
                })
            );
            await Promise.all(deletePromises);
            setCallForPapers((prevCallForPapers) => prevCallForPapers.filter((cfp) => !selectedRows.includes(cfp.callId)));
            setSelectedRows([]);
            if (currentItems.length === selectedRows.length && currentPage > 1) setCurrentPage(currentPage - 1);
            setModal({ show: true, type: "success", message: "Call for papers deleted successfully!" });
            setTimeout(() => setModal({ show: false, type: "", message: "" }), 3000);
            setShowDeleteModal(false);
        } catch (err) {
            setModal({ show: true, type: "error", message: "Error deleting call for papers: " + err.message });
        } finally {
            setLoading(false);
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
    };

    const handleEdit = () => {
        if (selectedRows.length === 1) {
            const cfpToEdit = callForPapers.find((cfp) => cfp.callId === selectedRows[0]);
            navigate("/addnewcallforpapers", { state: { callForPaper: cfpToEdit } });
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
                    <span className="text-sm">Hi</span>
                </div>
            </header>
            <div className="w-[20%]">
                <Sidebar />
            </div>
            <div className="w-screen p-6 pt-20">
                <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-4 shadow-md">
                    <h1 className="text-2xl font-bold">Call For Papers Dashboard</h1>
                    <p className="text-sm opacity-90 mt-1">Manage call for papers and their details.</p>
                </header>

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
                            filename={"callforpapers.csv"}
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
                            placeholder="Search by issue month, year, or dispatch month..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-blue-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                    <table ref={tableRef} className="w-full table-auto min-w-[800px]">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700 text-sm">
                                <th className="p-3 text-left">
                                    <input
                                        type="checkbox"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedRows(currentItems.map((item) => item.callId));
                                            } else {
                                                setSelectedRows([]);
                                            }
                                        }}
                                        checked={
                                            currentItems.length > 0 &&
                                            currentItems.every((item) => selectedRows.includes(item.callId))
                                        }
                                        className="h-5 w-5 text-blue-500 border-blue-200 rounded focus:ring-blue-400"
                                    />
                                </th>
                                <th className="p-3 text-left">S.No</th>
                                <th className="p-3 text-left">Issue Month</th>
                                <th className="p-3 text-left">Issue Year</th>
                                {/* <th className="p-3 text-left">Deadline</th>
                                <th className="p-3 text-left">Dispatch Month</th>
                                <th className="p-3 text-left">Dispatch Year</th>
                                <th className="p-3 text-left">Dispatch Date</th> */}
                                <th className="p-3 text-left">Created User ID</th>
                                <th className="p-3 text-left">Created Date</th>
                                <th className="p-3 text-left">Updated Date</th>
                                {/* <th className="p-3 text-left">Status</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr
                                    key={item.callId}
                                    className="border-t border-gray-200 text-gray-600 text-sm hover:bg-blue-50 transition-colors"
                                >
                                    <td className="p-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(item.callId)}
                                            onChange={() => handleCheckboxChange(item.callId)}
                                            className="h-5 w-5 text-blue-500 border-blue-200 rounded focus:ring-blue-400"
                                        />
                                    </td>
                                    <td className="p-3">{startIndex + index + 1}</td>
                                    <td className="p-3">{item.issueMonth || "N/A"}</td>
                                    <td className="p-3">{item.issueYear || "N/A"}</td>
                                    {/* <td className="p-3">{item.deadline ? new Date(item.deadline).toLocaleDateString() : "N/A"}</td>
                                    <td className="p-3">{item.dispatchMonth || "N/A"}</td>
                                    <td className="p-3">{item.dispatchYear || "N/A"}</td>
                                    <td className="p-3">{item.dispatchDate ? new Date(item.dispatchDate).toLocaleDateString() : "N/A"}</td> */}
                                    <td className="p-3">{item.createdUserId || "N/A"}</td>
                                    <td className="p-3">{item.createdDate ? new Date(item.createdDate).toLocaleString() : "N/A"}</td>
                                    <td className="p-3">{item.updatedDate ? new Date(item.updatedDate).toLocaleString() : "N/A"}</td>
                                    {/* <td className="p-3">{item.status === 1 ? "Active" : "Inactive"}</td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 text-gray-600 text-sm gap-4">
                    <span>
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} call for papers
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
                                Are you sure you want to delete {selectedRows.length} call for paper(s)?
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

export default CallForPapers;