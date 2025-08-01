// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Sidebar from "../sidebar";
// import axios from "axios";

// const BASE_URL = "https://iassrd.com:8081/api/v1";

// const AddNewAward = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const awardToEdit = location.state?.award || null;

//     const user = JSON.parse(localStorage.getItem("user")) || {};
//     const currentUserId = user.userId || 1;
//     const currentUserType = user.userType || 1;

//     const [formData, setFormData] = useState({
//         name: awardToEdit?.name || "",
//         affiliation: awardToEdit?.affiliation || "",
//         email: awardToEdit?.email || "",
//         awardType: awardToEdit?.awardType || "",
//         content: awardToEdit?.content || "",
//         linkedin: awardToEdit?.linkedin || "",
//         researchgate: awardToEdit?.researchgate || "",
//         academia: awardToEdit?.academia || "",
//         googleScholar: awardToEdit?.googleScholar || "",
//         profilePhoto: awardToEdit?.profilePhoto || "",
//         orcid: awardToEdit?.orcid || "",
//         status: awardToEdit?.status !== undefined ? awardToEdit.status : 1,
//         createdUserId: awardToEdit?.createdUserId || currentUserId,
//         createdUserType: awardToEdit?.createdUserType || currentUserType,
//     });
//     const [photoFile, setPhotoFile] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [modal, setModal] = useState({ show: false, type: "", message: "" });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handlePhotoChange = (e) => {
//         setPhotoFile(e.target.files[0]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setModal({ show: false, type: "", message: "" });

//         try {
//             const formDataToSend = new FormData();
//             formDataToSend.append("award", new Blob([JSON.stringify(formData)], { type: "application/json" }));
//             if (photoFile) {
//                 formDataToSend.append("photoFile", photoFile);
//             }

//             let response;
//             if (awardToEdit) {
//                 response = await axios.put(`${BASE_URL}/awards/${awardToEdit.id}`, formDataToSend, {
//                     headers: { "Content-Type": "multipart/form-data" },
//                 });
//             } else {
//                 response = await axios.post(`${BASE_URL}/awards`, formDataToSend, {
//                     headers: { "Content-Type": "multipart/form-data" },
//                 });
//             }

//             if (response.data.success) {
//                 setModal({
//                     show: true,
//                     type: "success",
//                     message: awardToEdit ? "Award updated successfully!" : "Award added successfully!",
//                 });
//                 setTimeout(() => {
//                     setModal({ show: false, type: "", message: "" });
//                     navigate("/awards");
//                     window.scrollTo(0, 0);
//                 }, 800);
//             } else {
//                 setModal({
//                     show: true,
//                     type: "error",
//                     message: `Failed to ${awardToEdit ? "update" : "add"} award: ${response.data.message || "Unknown error"}`,
//                 });
//             }
//         } catch (err) {
//             setModal({
//                 show: true,
//                 type: "error",
//                 message: `Error: ${err.response?.data?.message || err.message}`,
//             });
//             console.error("Error saving award:", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleCancel = () => {
//         navigate("/awards");
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
//                     <h1 className="text-2xl font-bold">{awardToEdit ? "Edit Award" : "Add New Award"}</h1>
//                     <p className="text-sm opacity-90 mt-1">
//                         {awardToEdit ? "Update the award details below." : "Fill in the details to add a new award."}
//                     </p>
//                 </header>

//                 <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
//                     <h2 className="text-xl font-semibold text-blue-600 mb-6">
//                         {awardToEdit ? "Edit Award" : "Add New Award"}
//                     </h2>

//                     <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Name *</label>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 placeholder="e.g., John Doe"
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Affiliation</label>
//                             <input
//                                 type="text"
//                                 name="affiliation"
//                                 value={formData.affiliation}
//                                 onChange={handleChange}
//                                 placeholder="e.g., University of Example"
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Email *</label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 placeholder="e.g., johndoe@example.com"
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Award Type</label>
//                             <input
//                                 type="text"
//                                 name="awardType"
//                                 value={formData.awardType}
//                                 onChange={handleChange}
//                                 placeholder="e.g., Best Researcher"
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                             />
//                         </div>
//                         <div className="col-span-2">
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Content</label>
//                             <input
//                                 type="text"
//                                 name="content"
//                                 value={formData.content}
//                                 onChange={handleChange}
//                                 placeholder="e.g., Awarded for outstanding contribution"
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">LinkedIn</label>
//                             <input
//                                 type="url"
//                                 name="linkedin"
//                                 value={formData.linkedin}
//                                 onChange={handleChange}
//                                 placeholder="e.g., https://linkedin.com/in/johndoe"
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">ResearchGate</label>
//                             <input
//                                 type="url"
//                                 name="researchgate"
//                                 value={formData.researchgate}
//                                 onChange={handleChange}
//                                 placeholder="e.g., https://researchgate.net/profile/JohnDoe"
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Academia</label>
//                             <input
//                                 type="url"
//                                 name="academia"
//                                 value={formData.academia}
//                                 onChange={handleChange}
//                                 placeholder="e.g., https://johndoe.academia.edu"
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Google Scholar</label>
//                             <input
//                                 type="url"
//                                 name="googleScholar"
//                                 value={formData.googleScholar}
//                                 onChange={handleChange}
//                                 placeholder="e.g., https://scholar.google.com/citations?user=..."
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                             />
//                         </div>
//                         <div className="col-span-2">
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Profile Photo</label>
//                             <input
//                                 type="file"
//                                 name="photoFile"
//                                 onChange={handlePhotoChange}
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 accept="image/*"
//                             />
//                             {awardToEdit && awardToEdit.profilePhoto && (
//                                 <p className="text-sm text-gray-500 mt-2">Current photo: {awardToEdit.profilePhoto}</p>
//                             )}
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">ORCID</label>
//                             <input
//                                 type="text"
//                                 name="orcid"
//                                 value={formData.orcid}
//                                 onChange={handleChange}
//                                 placeholder="e.g., 0000-0002-1825-0097"
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                             />
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
//                                 {loading ? "Saving..." : awardToEdit ? "Update" : "Save"}
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

// export default AddNewAward;



import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../sidebar";
import axios from "axios";

const BASE_URL = "https://iassrd.com:8081/api/v1";

const AddNewAward = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const awardToEdit = location.state?.award || null;

    const [formData, setFormData] = useState({
        name: awardToEdit?.name || "",
        affiliation: awardToEdit?.affiliation || "",
        email: awardToEdit?.email || "",
        awardType: awardToEdit?.awardType || "",
        content: awardToEdit?.content || "",
        linkedin: awardToEdit?.linkedin || "",
        researchgate: awardToEdit?.researchgate || "",
        academia: awardToEdit?.academia || "",
        googleScholar: awardToEdit?.googleScholar || "",
        profilePhoto: awardToEdit?.profilePhoto || "",
        orcid: awardToEdit?.orcid || "",
        status: awardToEdit?.status !== undefined ? awardToEdit.status : 1,
        createdUserId: awardToEdit?.createdUserId || "",
        createdUserType: awardToEdit?.createdUserType || "",
        updatedUserId: awardToEdit?.updatedUserId || "",
        updatedUserType: awardToEdit?.updatedUserType || "",
    });
    const [photoFile, setPhotoFile] = useState(null);
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
                createdUserId: awardToEdit?.createdUserId || currentUser.userId,
                createdUserType: awardToEdit?.createdUserType || (currentUser.role === "ADMIN" ? 1 : 2),
                updatedUserId: currentUser.userId,
                updatedUserType: currentUser.role === "ADMIN" ? 1 : 2,
            }));
        }
    }, [currentUser, awardToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePhotoChange = (e) => {
        setPhotoFile(e.target.files[0]);
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
            const awardData = {
                ...formData,
                createdUserId: parseInt(formData.createdUserId) || currentUser.userId,
                createdUserType: parseInt(formData.createdUserType) || (currentUser.role === "ADMIN" ? 1 : 2),
                updatedUserId: parseInt(formData.updatedUserId) || currentUser.userId,
                updatedUserType: parseInt(formData.updatedUserType) || (currentUser.role === "ADMIN" ? 1 : 2),
            };
            formDataToSend.append("award", new Blob([JSON.stringify(awardData)], { type: "application/json" }));
            if (photoFile) {
                formDataToSend.append("photoFile", photoFile);
            }

            let response;
            if (awardToEdit) {
                response = await axios.put(`${BASE_URL}/awards/${awardToEdit.id}`, formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                response = await axios.post(`${BASE_URL}/awards`, formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            if (response.data.success) {
                setModal({
                    show: true,
                    type: "success",
                    message: awardToEdit ? "Award updated successfully!" : "Award added successfully!",
                });
                setTimeout(() => {
                    setModal({ show: false, type: "", message: "" });
                    navigate("/awards");
                    window.scrollTo(0, 0);
                }, 800);
            } else {
                setModal({
                    show: true,
                    type: "error",
                    message: `Failed to ${awardToEdit ? "update" : "add"} award: ${response.data.message || "Unknown error"}`,
                });
            }
        } catch (err) {
            setModal({
                show: true,
                type: "error",
                message: `Error: ${err.response?.data?.message || err.message}`,
            });
            console.error("Error saving award:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/awards");
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
                    <h1 className="text-2xl font-bold">{awardToEdit ? "Edit Award" : "Add New Award"}</h1>
                    <p className="text-sm opacity-90 mt-1">
                        {awardToEdit ? "Update the award details below." : "Fill in the details to add a new award."}
                    </p>
                </header>

                <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
                    <h2 className="text-xl font-semibold text-blue-600 mb-6">
                        {awardToEdit ? "Edit Award" : "Add New Award"}
                    </h2>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-blue-600 mb-1">Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g., John Doe"
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-blue-600 mb-1">Affiliation</label>
                            <input
                                type="text"
                                name="affiliation"
                                value={formData.affiliation}
                                onChange={handleChange}
                                placeholder="e.g., University of Example"
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-blue-600 mb-1">Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="e.g., johndoe@example.com"
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-blue-600 mb-1">Award Type</label>
                            <input
                                type="text"
                                name="awardType"
                                value={formData.awardType}
                                onChange={handleChange}
                                placeholder="e.g., Best Researcher"
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-blue-600 mb-1">Content</label>
                            <input
                                type="text"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="e.g., Awarded for outstanding contribution"
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-blue-600 mb-1">LinkedIn</label>
                            <input
                                type="url"
                                name="linkedin"
                                value={formData.linkedin}
                                onChange={handleChange}
                                placeholder="e.g., https://linkedin.com/in/johndoe"
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-blue-600 mb-1">ResearchGate</label>
                            <input
                                type="url"
                                name="researchgate"
                                value={formData.researchgate}
                                onChange={handleChange}
                                placeholder="e.g., https://researchgate.net/profile/JohnDoe"
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-blue-600 mb-1">Academia</label>
                            <input
                                type="url"
                                name="academia"
                                value={formData.academia}
                                onChange={handleChange}
                                placeholder="e.g., https://johndoe.academia.edu"
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-blue-600 mb-1">Google Scholar</label>
                            <input
                                type="url"
                                name="googleScholar"
                                value={formData.googleScholar}
                                onChange={handleChange}
                                placeholder="e.g., https://scholar.google.com/citations?user=..."
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-blue-600 mb-1">Profile Photo</label>
                            <input
                                type="file"
                                name="photoFile"
                                onChange={handlePhotoChange}
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                accept="image/*"
                            />
                            {awardToEdit && awardToEdit.profilePhoto && (
                                <p className="text-sm text-gray-500 mt-2">Current photo: {awardToEdit.profilePhoto}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-blue-600 mb-1">ORCID</label>
                            <input
                                type="text"
                                name="orcid"
                                value={formData.orcid}
                                onChange={handleChange}
                                placeholder="e.g., 0000-0002-1825-0097"
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                            />
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
                                {loading ? "Saving..." : awardToEdit ? "Update" : "Save"}
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

export default AddNewAward;