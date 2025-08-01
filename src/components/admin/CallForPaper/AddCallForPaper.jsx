// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Sidebar from "../sidebar";
// import axios from "axios";

// const BASE_URL = "https://iassrd.com:8081/api/v1";

// const AddNewCallForPapers = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const callForPaperToEdit = location.state?.callForPaper || null;

//     const user = JSON.parse(localStorage.getItem("user")) || {};
//     const currentUserId = user.userId || 1;
//     const currentUserType = user.userType || 1;

//     const [formData, setFormData] = useState({
//         issueMonth: callForPaperToEdit?.issueMonth || "",
//         issueYear: callForPaperToEdit?.issueYear || "",
//         deadline: callForPaperToEdit?.deadline ? new Date(callForPaperToEdit.deadline).toISOString().split("T")[0] : "",
//         dispatchMonth: callForPaperToEdit?.dispatchMonth || "",
//         dispatchYear: callForPaperToEdit?.dispatchYear || "",
//         dispatchDate: callForPaperToEdit?.dispatchDate ? new Date(callForPaperToEdit.dispatchDate).toISOString().split("T")[0] : "",
//         file: callForPaperToEdit?.file || "",
//         status: callForPaperToEdit?.status !== undefined ? callForPaperToEdit.status : 1,
//         createdUserId: callForPaperToEdit?.createdUserId || currentUserId,
//         createdUserType: callForPaperToEdit?.createdUserType || currentUserType,
//         updatedUserId: callForPaperToEdit?.updatedUserId || currentUserId,
//         updatedUserType: callForPaperToEdit?.updatedUserType || currentUserType,
//     });
//     const [file, setFile] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [modal, setModal] = useState({ show: false, type: "", message: "" });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setModal({ show: false, type: "", message: "" });

//         try {
//             const formDataToSend = new FormData();
//             // Ensure date fields are in YYYY-MM-DD format
//             const adjustedFormData = {
//                 ...formData,
//                 deadline: formData.deadline || new Date().toISOString().split("T")[0],
//                 dispatchDate: formData.dispatchDate || new Date().toISOString().split("T")[0],
//             };
//             formDataToSend.append("callForPaper", new Blob([JSON.stringify(adjustedFormData)], { type: "application/json" }));
//             if (file) {
//                 formDataToSend.append("file", file);
//             }

//             let response;
//             if (callForPaperToEdit) {
//                 response = await axios.put(`${BASE_URL}/call-for-papers/${callForPaperToEdit.callId}`, formDataToSend, {
//                     headers: { "Content-Type": "multipart/form-data" },
//                 });
//             } else {
//                 response = await axios.post(`${BASE_URL}/call-for-papers`, formDataToSend, {
//                     headers: { "Content-Type": "multipart/form-data" },
//                 });
//             }

//             if (response.data.success) {
//                 setModal({
//                     show: true,
//                     type: "success",
//                     message: callForPaperToEdit ? "Call for paper updated successfully!" : "Call for paper added successfully!",
//                 });
//                 setTimeout(() => {
//                     setModal({ show: false, type: "", message: "" });
//                     navigate("/callforpapers");
//                     window.scrollTo(0, 0);
//                 }, 800);
//             } else {
//                 setModal({
//                     show: true,
//                     type: "error",
//                     message: `Failed to ${callForPaperToEdit ? "update" : "add"} call for paper: ${response.data.message || "Unknown error"}`,
//                 });
//             }
//         } catch (err) {
//             setModal({
//                 show: true,
//                 type: "error",
//                 message: `Error: ${err.response?.data?.message || err.message}`,
//             });
//             console.error("Error saving call for paper:", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleCancel = () => {
//         navigate("/callforpapers");
//         window.scrollTo(0, 0);
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
//             <div className="w-screen p-6 pt-20 h-screen overflow-y-auto">
//                 <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-6 shadow-md">
//                     <h1 className="text-2xl font-bold">{callForPaperToEdit ? "Edit Call For Paper" : "Add New Call For Paper"}</h1>
//                     <p className="text-sm opacity-90 mt-1">
//                         {callForPaperToEdit ? "Update the call for paper details below." : "Fill in the details to add a new call for paper."}
//                     </p>
//                 </header>

//                 <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
//                     <h2 className="text-xl font-semibold text-blue-600 mb-6">
//                         {callForPaperToEdit ? "Edit Call For Paper" : "Add New Call For Paper"}
//                     </h2>

//                     <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Issue Month *</label>
//                             <input
//                                 type="text"
//                                 name="issueMonth"
//                                 value={formData.issueMonth}
//                                 onChange={handleChange}
//                                 placeholder="e.g., January"
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Issue Year *</label>
//                             <input
//                                 type="text"
//                                 name="issueYear"
//                                 value={formData.issueYear}
//                                 onChange={handleChange}
//                                 placeholder="e.g., 2025"
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Deadline *</label>
//                             <input
//                                 type="date"
//                                 name="deadline"
//                                 value={formData.deadline}
//                                 onChange={handleChange}
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Dispatch Month *</label>
//                             <input
//                                 type="text"
//                                 name="dispatchMonth"
//                                 value={formData.dispatchMonth}
//                                 onChange={handleChange}
//                                 placeholder="e.g., March"
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Dispatch Year *</label>
//                             <input
//                                 type="text"
//                                 name="dispatchYear"
//                                 value={formData.dispatchYear}
//                                 onChange={handleChange}
//                                 placeholder="e.g., 2025"
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Dispatch Date *</label>
//                             <input
//                                 type="date"
//                                 name="dispatchDate"
//                                 value={formData.dispatchDate}
//                                 onChange={handleChange}
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 required
//                             />
//                         </div>
//                         <div className="col-span-2">
//                             <label className="block text-sm font-medium text-blue-600 mb-1">File</label>
//                             <input
//                                 type="file"
//                                 name="file"
//                                 onChange={handleFileChange}
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 accept=".pdf"
//                             />
//                             {callForPaperToEdit && callForPaperToEdit.file && (
//                                 <p className="text-sm text-gray-500 mt-2">Current file: {callForPaperToEdit.file}</p>
//                             )}
//                         </div>
//                         {/* <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Status</label>
//                             <select
//                                 name="status"
//                                 value={formData.status}
//                                 onChange={handleChange}
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                             >
//                                 <option value={1}>Active</option>
//                                 <option value={0}>Inactive</option>
//                             </select>
//                         </div> */}
//                         <div className="flex justify-end gap-4 mt-6 col-span-2">
//                             <button
//                                 type="submit"
//                                 disabled={loading}
//                                 className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors shadow-md ${
//                                     loading ? "opacity-50 cursor-not-allowed" : ""
//                                 }`}
//                             >
//                                 {loading ? "Saving..." : callForPaperToEdit ? "Update" : "Save"}
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={handleCancel}
//                                 className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-full transition-colors shadow-md"
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </form>
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

// export default AddNewCallForPapers;



import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../sidebar";
import axios from "axios";

const BASE_URL = "https://iassrd.com:8081/api/v1";

const AddNewCallForPapers = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const callForPaperToEdit = location.state?.callForPaper || null;

    const [formData, setFormData] = useState({
        issueMonth: callForPaperToEdit?.issueMonth || "",
        issueYear: callForPaperToEdit?.issueYear || "",
        deadline: callForPaperToEdit?.deadline ? new Date(callForPaperToEdit.deadline).toISOString().split("T")[0] : "",
        dispatchMonth: callForPaperToEdit?.dispatchMonth || "",
        dispatchYear: callForPaperToEdit?.dispatchYear || "",
        dispatchDate: callForPaperToEdit?.dispatchDate ? new Date(callForPaperToEdit.dispatchDate).toISOString().split("T")[0] : "",
        file: callForPaperToEdit?.file || "",
        status: callForPaperToEdit?.status !== undefined ? callForPaperToEdit.status : 1,
        createdUserId: callForPaperToEdit?.createdUserId || "",
        createdUserType: callForPaperToEdit?.createdUserType || "",
        updatedUserId: callForPaperToEdit?.updatedUserId || "",
        updatedUserType: callForPaperToEdit?.updatedUserType || "",
    });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState({ show: false, type: "", message: "" });
    const [currentUser, setCurrentUser] = useState(null);

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

    // Update formData with currentUser details once fetched
    useEffect(() => {
        if (currentUser) {
            setFormData((prev) => ({
                ...prev,
                createdUserId: callForPaperToEdit?.createdUserId || currentUser.userId,
                createdUserType: callForPaperToEdit?.createdUserType || (currentUser.role === "ADMIN" ? 1 : 2),
                updatedUserId: currentUser.userId,
                updatedUserType: currentUser.role === "ADMIN" ? 1 : 2,
            }));
        }
    }, [currentUser, callForPaperToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
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
            // Ensure date fields are in YYYY-MM-DD format
            const adjustedFormData = {
                ...formData,
                deadline: formData.deadline || new Date().toISOString().split("T")[0],
                dispatchDate: formData.dispatchDate || new Date().toISOString().split("T")[0],
            };
            formDataToSend.append("callForPaper", new Blob([JSON.stringify(adjustedFormData)], { type: "application/json" }));
            if (file) {
                formDataToSend.append("file", file);
            }

            let response;
            if (callForPaperToEdit) {
                response = await axios.put(`${BASE_URL}/call-for-papers/${callForPaperToEdit.callId}`, formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                response = await axios.post(`${BASE_URL}/call-for-papers`, formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            if (response.data.success) {
                setModal({
                    show: true,
                    type: "success",
                    message: callForPaperToEdit ? "Call for paper updated successfully!" : "Call for paper added successfully!",
                });
                setTimeout(() => {
                    setModal({ show: false, type: "", message: "" });
                    navigate("/callforpapers");
                    window.scrollTo(0, 0);
                }, 800);
            } else {
                setModal({
                    show: true,
                    type: "error",
                    message: `Failed to ${callForPaperToEdit ? "update" : "add"} call for paper: ${response.data.message || "Unknown error"}`,
                });
            }
        } catch (err) {
            setModal({
                show: true,
                type: "error",
                message: `Error: ${err.response?.data?.message || err.message}`,
            });
            console.error("Error saving call for paper:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/callforpapers");
        window.scrollTo(0, 0);
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
            <div className="w-screen p-6 pt-20 h-screen overflow-y-auto">
                <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-6 shadow-md">
                    <h1 className="text-2xl font-bold">{callForPaperToEdit ? "Edit Call For Paper" : "Add New Call For Paper"}</h1>
                    <p className="text-sm opacity-90 mt-1">
                        {callForPaperToEdit ? "Update the call for paper details below." : "Fill in the details to add a new call for paper."}
                    </p>
                </header>

                <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
                    <h2 className="text-xl font-semibold text-blue-600 mb-6">
                        {callForPaperToEdit ? "Edit Call For Paper" : "Add New Call For Paper"}
                    </h2>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-blue-600 mb-1">Issue Month *</label>
                            <input
                                type="text"
                                name="issueMonth"
                                value={formData.issueMonth}
                                onChange={handleChange}
                                placeholder="e.g., January"
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-blue-600 mb-1">Issue Year *</label>
                            <input
                                type="text"
                                name="issueYear"
                                value={formData.issueYear}
                                onChange={handleChange}
                                placeholder="e.g., 2025"
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                required
                            />
                        </div>
                        {/* <div>
                            <label className="block text-sm font-medium text-blue-600 mb-1">Deadline *</label>
                            <input
                                type="date"
                                name="deadline"
                                value={formData.deadline}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-blue-600 mb-1">Dispatch Month *</label>
                            <input
                                type="text"
                                name="dispatchMonth"
                                value={formData.dispatchMonth}
                                onChange={handleChange}
                                placeholder="e.g., March"
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-blue-600 mb-1">Dispatch Year *</label>
                            <input
                                type="text"
                                name="dispatchYear"
                                value={formData.dispatchYear}
                                onChange={handleChange}
                                placeholder="e.g., 2025"
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-blue-600 mb-1">Dispatch Date *</label>
                            <input
                                type="date"
                                name="dispatchDate"
                                value={formData.dispatchDate}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                required
                            />
                        </div> */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-blue-600 mb-1">File</label>
                            <input
                                type="file"
                                name="file"
                                onChange={handleFileChange}
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                accept=".pdf"
                            />
                            {callForPaperToEdit && callForPaperToEdit.file && (
                                <p className="text-sm text-gray-500 mt-2">Current file: {callForPaperToEdit.file}</p>
                            )}
                        </div>
                        {/* <div>
                            <label className="block text-sm font-medium text-blue-600 mb-1">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                            >
                                <option value={1}>Active</option>
                                <option value={0}>Inactive</option>
                            </select>
                        </div> */}
                        <div className="flex justify-end gap-4 mt-6 col-span-2">
                            <button
                                type="submit"
                                disabled={loading || !currentUser}
                                className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors shadow-md ${
                                    loading || !currentUser ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            >
                                {loading ? "Saving..." : callForPaperToEdit ? "Update" : "Save"}
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

export default AddNewCallForPapers;