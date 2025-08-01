// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../sidebar";

// const AddNewMembership = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const membershipToEdit = location.state?.membership || null;
//     const refMembershipYear = useRef(null);

//     const user = JSON.parse(localStorage.getItem("user")) || {};
//     const currentUserId = user.userId || "1";
//     const currentUserType = user.userType || "1";

//     const [formData, setFormData] = useState({
//         membershipType: membershipToEdit?.membershipType || "",
//         membershipYear: membershipToEdit?.membershipYear || "",
//         name: membershipToEdit?.name || "",
//         affiliation: membershipToEdit?.affiliation || "",
//         specialization: membershipToEdit?.specialization || "",
//         googleScholarLink: membershipToEdit?.googleScholarLink || "",
//         researchgateLink: membershipToEdit?.researchgateLink || "",
//         academiaLink: membershipToEdit?.academiaLink || "",
//         orcid: membershipToEdit?.orcid || "",
//         ssrn: membershipToEdit?.ssrn || "",
//         github: membershipToEdit?.github || "",
//         institutionProfileLink: membershipToEdit?.institutionProfileLink || "",
//         scopusLink: membershipToEdit?.scopusLink || "",
//         wosLink: membershipToEdit?.wosLink || "",
//         photo: membershipToEdit?.photo || "",
//         email: membershipToEdit?.email || "",
//         mobileNumber: membershipToEdit?.mobileNumber || "",
//         status: membershipToEdit?.status !== undefined ? membershipToEdit.status : 1,
//     });
//     const [photoFile, setPhotoFile] = useState(null);
//     const [removePhoto, setRemovePhoto] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [modal, setModal] = useState({ show: false, type: "", message: "" });
//     const [showYearDropdown, setShowYearDropdown] = useState(false);

//     const BASE_URL = "https://iassrd.com:8081/api/v1";

//     // Handle outside click to close year dropdown
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
//         handleOutsideClick(refMembershipYear, () => setShowYearDropdown(false));
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handlePhotoChange = (e) => {
//         setPhotoFile(e.target.files[0]);
//         setRemovePhoto(false);
//     };

//     const handleRemovePhoto = () => {
//         setPhotoFile(null);
//         setRemovePhoto(true);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setModal({ show: false, type: "", message: "" });

//         try {
//             const formDataToSend = new FormData();
//             const membershipData = {
//                 membershipType: formData.membershipType || "",
//                 membershipYear: formData.membershipYear ? parseInt(formData.membershipYear) : null,
//                 name: formData.name || "",
//                 affiliation: formData.affiliation || "",
//                 specialization: formData.specialization || "",
//                 googleScholarLink: formData.googleScholarLink || "",
//                 researchgateLink: formData.researchgateLink || "",
//                 academiaLink: formData.academiaLink || "",
//                 orcid: formData.orcid || "",
//                 ssrn: formData.ssrn || "",
//                 github: formData.github || "",
//                 institutionProfileLink: formData.institutionProfileLink || "",
//                 scopusLink: formData.scopusLink || "",
//                 wosLink: formData.wosLink || "",
//                 photo: formData.photo || "",
//                 email: formData.email || "",
//                 mobileNumber: formData.mobileNumber || "",
//                 status: parseInt(formData.status) || 1,
//                 createdUserId: parseInt(currentUserId) || 1,
//                 createdUserType: parseInt(currentUserType) || 1,
//                 updatedUserId: parseInt(currentUserId) || 1,
//                 updatedUserType: parseInt(currentUserType) || 1,
//             };

//             formDataToSend.append("membership", new Blob([JSON.stringify(membershipData)], { type: "application/json" }));
//             if (photoFile && typeof photoFile !== "string") {
//                 formDataToSend.append("photoFile", photoFile);
//             }
//             formDataToSend.append("removePhoto", removePhoto.toString());

//             const config = { headers: { "Content-Type": "multipart/form-data" } };
//             let response;
//             if (membershipToEdit) {
//                 response = await axios.put(
//                     `${BASE_URL}/memberships/${membershipToEdit.membershipId}`,
//                     formDataToSend,
//                     config
//                 );
//             } else {
//                 response = await axios.post(`${BASE_URL}/memberships`, formDataToSend, config);
//             }

//             if (response.data.success) {
//                 setModal({
//                     show: true,
//                     type: "success",
//                     message: membershipToEdit ? "Membership updated successfully!" : "Membership added successfully!",
//                 });
//                 setTimeout(() => {
//                     setModal({ show: false, type: "", message: "" });
//                     navigate("/memberships");
//                     window.scrollTo(0, 0);
//                 }, 800);
//             } else {
//                 setModal({
//                     show: true,
//                     type: "error",
//                     message: `Failed to ${membershipToEdit ? "update" : "add"} membership: ${response.data.message || "Unknown error"}`,
//                 });
//             }
//         } catch (err) {
//             setModal({
//                 show: true,
//                 type: "error",
//                 message: `Error: ${err.response?.data?.message || err.message}`,
//             });
//             console.error("Error saving membership:", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleCancel = () => {
//         navigate("/memberships");
//         window.scrollTo(0, 0);
//     };

//     const years = Array.from({ length: 21 }, (_, index) => 2010 + index);

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
//                 {/* Header */}
//                 <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-6 shadow-md">
//                     <h1 className="text-2xl font-bold">{membershipToEdit ? "Edit Membership" : "Add New Fellow Membership"}</h1>
//                     <p className="text-sm opacity-90 mt-1">
//                         {membershipToEdit ? "Update the membership details below." : "Fill in the details to add a new membership."}
//                     </p>
//                 </header>

//                 {/* Main Content */}
//                 <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
//                     <h2 className="text-xl font-semibold text-blue-600 mb-6">
//                         {membershipToEdit ? "Edit Membership" : "Add New Fellow Membership"}
//                     </h2>

//                     <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {/* Membership Type */}
//                         {/* <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Membership Type *</label>
//                             <input
//                                 type="text"
//                                 name="membershipType"
//                                 value={formData.membershipType}
//                                 onChange={handleChange}
//                                 placeholder="e.g., Professional"
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 required
//                             />                           
//                         </div> */}

//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Membership Type *</label>
//                             <select
//                                 name="membershipType"
//                                 value={formData.membershipType}
//                                 onChange={handleChange}
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 required
//                             >
//                                 <option value="">Select Membership Type</option>
//                                 <option value="Fellow Members">Fellow Members</option>
//                                 <option value="Advisory Members">Advisory Members</option>
//                                 <option value="Honorary Fellow Membership">Honorary Fellow Membership</option>
//                                 <option value="Senior Fellow Members">Senior Fellow Members</option>
//                             </select>
//                         </div>


//                         {/* Membership Year */}
//                         <div className="relative" ref={refMembershipYear}>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Membership Year *</label>
//                             <select
//                                 name="membershipYear"
//                                 value={formData.membershipYear}
//                                 onChange={handleChange}
//                                 onClick={() => setShowYearDropdown(!showYearDropdown)}
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm appearance-none"
//                                 required
//                             >
//                                 <option value="">Select Year</option>
//                                 {years.map((year) => (
//                                     <option key={year} value={year}>
//                                         {year}
//                                     </option>
//                                 ))}
//                             </select>
//                             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                                 <svg
//                                     className={`fill-current h-5 w-5 mt-2 ${showYearDropdown ? "rotate-180" : "rotate-0"}`}
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                 >
//                                     <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
//                                 </svg>
//                             </div>
//                         </div>

//                         {/* Name */}
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

//                         {/* Affiliation */}
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

//                         {/* Specialization */}
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Specialization</label>
//                             <input
//                                 type="text"
//                                 name="specialization"
//                                 value={formData.specialization}
//                                 onChange={handleChange}
//                                 placeholder="e.g., Artificial Intelligence"
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                             />
//                         </div>

//                         {/* Google Scholar Link */}
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Google Scholar Link</label>
//                             <input
//                                 type="url"
//                                 name="googleScholarLink"
//                                 value={formData.googleScholarLink}
//                                 onChange={handleChange}
//                                 placeholder="e.g., https://scholar.google.com/..."
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                             />
//                         </div>

//                         {/* ResearchGate Link */}
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">ResearchGate Link</label>
//                             <input
//                                 type="url"
//                                 name="researchgateLink"
//                                 value={formData.researchgateLink}
//                                 onChange={handleChange}
//                                 placeholder="e.g., https://www.researchgate.net/..."
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                             />
//                         </div>

//                         {/* Academia Link */}
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Academia Link</label>
//                             <input
//                                 type="url"
//                                 name="academiaLink"
//                                 value={formData.academiaLink}
//                                 onChange={handleChange}
//                                 placeholder="e.g., https://john-doe.academia.edu"
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                             />
//                         </div>

//                         {/* ORCID */}
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

//                         {/* SSRN */}
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">SSRN</label>
//                             <input
//                                 type="url"
//                                 name="ssrn"
//                                 value={formData.ssrn}
//                                 onChange={handleChange}
//                                 placeholder="e.g., https://ssrn.com/author=..."
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                             />
//                         </div>

//                         {/* GitHub */}
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">GitHub</label>
//                             <input
//                                 type="url"
//                                 name="github"
//                                 value={formData.github}
//                                 onChange={handleChange}
//                                 placeholder="e.g., https://github.com/johndoe"
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                             />
//                         </div>

//                         {/* Institution Profile Link */}
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Institution Profile Link</label>
//                             <input
//                                 type="url"
//                                 name="institutionProfileLink"
//                                 value={formData.institutionProfileLink}
//                                 onChange={handleChange}
//                                 placeholder="e.g., https://university.example.edu/..."
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                             />
//                         </div>

//                         {/* Scopus Link */}
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Scopus Link</label>
//                             <input
//                                 type="url"
//                                 name="scopusLink"
//                                 value={formData.scopusLink}
//                                 onChange={handleChange}
//                                 placeholder="e.g., https://www.scopus.com/..."
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                             />
//                         </div>

//                         {/* WoS Link */}
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Web of Science Link</label>
//                             <input
//                                 type="url"
//                                 name="wosLink"
//                                 value={formData.wosLink}
//                                 onChange={handleChange}
//                                 placeholder="e.g., https://www.webofscience.com/..."
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                             />
//                         </div>

//                         {/* Email */}
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

//                         {/* Mobile Number */}
//                         <div>
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Mobile Number</label>
//                             <input
//                                 type="text"
//                                 name="mobileNumber"
//                                 value={formData.mobileNumber}
//                                 onChange={handleChange}
//                                 placeholder="e.g., +1234567890"
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                             />
//                         </div>

//                         {/* Photo */}
//                         <div className="col-span-2">
//                             <label className="block text-sm font-medium text-blue-600 mb-1">Photo</label>
//                             <input
//                                 type="file"
//                                 name="photoFile"
//                                 onChange={handlePhotoChange}
//                                 className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 accept="image/*"
//                             />
//                             {membershipToEdit && membershipToEdit.photo && !removePhoto && (
//                                 <div className="mt-2">
//                                     <p className="text-sm text-gray-500">Current photo: {membershipToEdit.photo}</p>
//                                     <button
//                                         type="button"
//                                         onClick={handleRemovePhoto}
//                                         className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs rounded-full mt-1"
//                                     >
//                                         Remove
//                                     </button>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Status */}
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

//                         {/* Form Actions */}
//                         <div className="flex justify-end gap-4 mt-6 col-span-2">
//                             <button
//                                 type="submit"
//                                 disabled={loading}
//                                 className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors shadow-md ${loading ? "opacity-50 cursor-not-allowed" : ""
//                                     }`}
//                             >
//                                 {loading ? "Saving..." : membershipToEdit ? "Update" : "Save"}
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

// export default AddNewMembership;



import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Sidebar from "../sidebar";

const AddNewMembership = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const membershipToEdit = location.state?.membership || null;
    const refMembershipYear = useRef(null);

    const [formData, setFormData] = useState({
        membershipType: membershipToEdit?.membershipType || "",
        membershipYear: membershipToEdit?.membershipYear || "",
        name: membershipToEdit?.name || "",
        affiliation: membershipToEdit?.affiliation || "",
        specialization: membershipToEdit?.specialization || "",
        googleScholarLink: membershipToEdit?.googleScholarLink || "",
        researchgateLink: membershipToEdit?.researchgateLink || "",
        academiaLink: membershipToEdit?.academiaLink || "",
        orcid: membershipToEdit?.orcid || "",
        ssrn: membershipToEdit?.ssrn || "",
        github: membershipToEdit?.github || "",
        institutionProfileLink: membershipToEdit?.institutionProfileLink || "",
        scopusLink: membershipToEdit?.scopusLink || "",
        wosLink: membershipToEdit?.wosLink || "",
        photo: membershipToEdit?.photo || "",
        email: membershipToEdit?.email || "",
        mobileNumber: membershipToEdit?.mobileNumber || "",
        status: membershipToEdit?.status !== undefined ? membershipToEdit.status : 1,
        createdUserId: membershipToEdit?.createdUserId || "",
        createdUserType: membershipToEdit?.createdUserType || "",
        updatedUserId: membershipToEdit?.updatedUserId || "",
        updatedUserType: membershipToEdit?.updatedUserType || "",
    });
    const [photoFile, setPhotoFile] = useState(null);
    const [removePhoto, setRemovePhoto] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState({ show: false, type: "", message: "" });
    const [showYearDropdown, setShowYearDropdown] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const BASE_URL = "https://iassrd.com:8081/api/v1";

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
                createdUserId: membershipToEdit?.createdUserId || currentUser.userId,
                createdUserType: membershipToEdit?.createdUserType || (currentUser.role === "ADMIN" ? 1 : 2),
                updatedUserId: currentUser.userId,
                updatedUserType: currentUser.role === "ADMIN" ? 1 : 2,
            }));
        }
    }, [currentUser, membershipToEdit]);

    // Handle outside click to close year dropdown
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
        handleOutsideClick(refMembershipYear, () => setShowYearDropdown(false));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePhotoChange = (e) => {
        setPhotoFile(e.target.files[0]);
        setRemovePhoto(false);
    };

    const handleRemovePhoto = () => {
        setPhotoFile(null);
        setRemovePhoto(true);
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
            const membershipData = {
                membershipType: formData.membershipType || "",
                membershipYear: formData.membershipYear ? parseInt(formData.membershipYear) : null,
                name: formData.name || "",
                affiliation: formData.affiliation || "",
                specialization: formData.specialization || "",
                googleScholarLink: formData.googleScholarLink || "",
                researchgateLink: formData.researchgateLink || "",
                academiaLink: formData.academiaLink || "",
                orcid: formData.orcid || "",
                ssrn: formData.ssrn || "",
                github: formData.github || "",
                institutionProfileLink: formData.institutionProfileLink || "",
                scopusLink: formData.scopusLink || "",
                wosLink: formData.wosLink || "",
                photo: formData.photo || "",
                email: formData.email || "",
                mobileNumber: formData.mobileNumber || "",
                status: parseInt(formData.status) || 1,
                createdUserId: parseInt(formData.createdUserId) || currentUser.userId,
                createdUserType: parseInt(formData.createdUserType) || (currentUser.role === "ADMIN" ? 1 : 2),
                updatedUserId: parseInt(formData.updatedUserId) || currentUser.userId,
                updatedUserType: parseInt(formData.updatedUserType) || (currentUser.role === "ADMIN" ? 1 : 2),
            };

            formDataToSend.append("membership", new Blob([JSON.stringify(membershipData)], { type: "application/json" }));
            if (photoFile && typeof photoFile !== "string") {
                formDataToSend.append("photoFile", photoFile);
            }
            formDataToSend.append("removePhoto", removePhoto.toString());

            const config = { headers: { "Content-Type": "multipart/form-data" } };
            let response;
            if (membershipToEdit) {
                response = await axios.put(
                    `${BASE_URL}/memberships/${membershipToEdit.membershipId}`,
                    formDataToSend,
                    config
                );
            } else {
                response = await axios.post(`${BASE_URL}/memberships`, formDataToSend, config);
            }

            if (response.data.success) {
                setModal({
                    show: true,
                    type: "success",
                    message: membershipToEdit ? "Membership updated successfully!" : "Membership added successfully!",
                });
                setTimeout(() => {
                    setModal({ show: false, type: "", message: "" });
                    navigate("/memberships");
                    window.scrollTo(0, 0);
                }, 800);
            } else {
                setModal({
                    show: true,
                    type: "error",
                    message: `Failed to ${membershipToEdit ? "update" : "add"} membership: ${response.data.message || "Unknown error"}`,
                });
            }
        } catch (err) {
            setModal({
                show: true,
                type: "error",
                message: `Error: ${err.response?.data?.message || err.message}`,
            });
            console.error("Error saving membership:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/memberships");
        window.scrollTo(0, 0);
    };

    const years = Array.from({ length: 21 }, (_, index) => 2010 + index);

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
                {/* Header */}
                <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-6 shadow-md">
                    <h1 className="text-2xl font-bold">{membershipToEdit ? "Edit Membership" : "Add New Fellow Membership"}</h1>
                    <p className="text-sm opacity-90 mt-1">
                        {membershipToEdit ? "Update the membership details below." : "Fill in the details to add a new membership."}
                    </p>
                </header>

                {/* Main Content */}
                <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
                    <h2 className="text-xl font-semibold text-blue-600 mb-6">
                        {membershipToEdit ? "Edit Membership" : "Add New Fellow Membership"}
                    </h2>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Membership Type */}
                        <div>
                            <label className="block text-sm font-medium text-blue-600 mb-1">Membership Type *</label>
                            <select
                                name="membershipType"
                                value={formData.membershipType}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                required
                            >
                                <option value="">Select Membership Type</option>
                                <option value="Fellow Members">Fellow Members</option>
                                <option value="Advisory Members">Advisory Members</option>
                                <option value="Executive Fellow Member">Executive Fellow Member</option>
                                <option value="Honorary Fellow Membership">Honorary Fellow Membership</option>
                                <option value="Senior Fellow Members">Senior Fellow Members</option>
                            </select>
                        </div>

                        {/* Membership Year */}
                        <div className="relative" ref={refMembershipYear}>
                            <label className="block text-sm font-medium text-blue-600 mb-1">Membership Year</label>
                            <select
                                name="membershipYear"
                                value={formData.membershipYear}
                                onChange={handleChange}
                                onClick={() => setShowYearDropdown(!showYearDropdown)}
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm appearance-none"
                               
                            >
                                <option value="">Select Year</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                    className={`fill-current h-5 w-5 mt-2 ${showYearDropdown ? "rotate-180" : "rotate-0"}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                </svg>
                            </div>
                        </div>

                        {/* Name */}
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

                        {/* Affiliation */}
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

                        {/* Specialization */}
                        <div>
                            <label className="block text-sm font-medium text-blue-600 mb-1">Specialization</label>
                            <input
                                type="text"
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleChange}
                                placeholder="e.g., Artificial Intelligence"
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                            />
                        </div>

                        {/* Google Scholar Link */}
                        <div>
                            <label className="block text-sm font-medium text-blue-600 mb-1">Google Scholar Link</label>
                            <input
                                type="url"
                                name="googleScholarLink"
                                value={formData.googleScholarLink}
                                onChange={handleChange}
                                placeholder="e.g., https://scholar.google.com/..."
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                            />
                        </div>

                        {/* ResearchGate Link */}
                        <div>
                            <label className="block text-sm font-medium text-blue-600 mb-1">ResearchGate Link</label>
                            <input
                                type="url"
                                name="researchgateLink"
                                value={formData.researchgateLink}
                                onChange={handleChange}
                                placeholder="e.g., https://www.researchgate.net/..."
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                            />
                        </div>

                        {/* Academia Link */}
                        <div>
                            <label className="block text-sm font-medium text-blue-600 mb-1">Academia Link</label>
                            <input
                                type="url"
                                name="academiaLink"
                                value={formData.academiaLink}
                                onChange={handleChange}
                                placeholder="e.g., https://john-doe.academia.edu"
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                            />
                        </div>

                        {/* ORCID */}
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

                        {/* SSRN */}
                        <div>
                            <label className="block text-sm font-medium text-blue-600 mb-1">SSRN</label>
                            <input
                                type="url"
                                name="ssrn"
                                value={formData.ssrn}
                                onChange={handleChange}
                                placeholder="e.g., https://ssrn.com/author=..."
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                            />
                        </div>

                        {/* GitHub */}
                        <div>
                            <label className="block text-sm font-medium text-blue-600 mb-1">GitHub</label>
                            <input
                                type="url"
                                name="github"
                                value={formData.github}
                                onChange={handleChange}
                                placeholder="e.g., https://github.com/johndoe"
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                            />
                        </div>

                        {/* Institution Profile Link */}
                        <div>
                            <label className="block text-sm font-medium text-blue-600 mb-1">Institution Profile Link</label>
                            <input
                                type="url"
                                name="institutionProfileLink"
                                value={formData.institutionProfileLink}
                                onChange={handleChange}
                                placeholder="e.g., https://university.example.edu/..."
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                            />
                        </div>

                        {/* Scopus Link */}
                        <div>
                            <label className="block text-sm font-medium text-blue-600 mb-1">Scopus Link</label>
                            <input
                                type="url"
                                name="scopusLink"
                                value={formData.scopusLink}
                                onChange={handleChange}
                                placeholder="e.g., https://www.scopus.com/..."
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                            />
                        </div>

                        {/* WoS Link */}
                        <div>
                            <label className="block text-sm font-medium text-blue-600 mb-1">Web of Science Link/LinkedIn</label>
                            <input
                                type="url"
                                name="wosLink"
                                value={formData.wosLink}
                                onChange={handleChange}
                                placeholder="e.g., https://www.webofscience.com/..."
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-blue-600 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="e.g., johndoe@example.com"
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                
                            />
                        </div>

                        {/* Mobile Number */}
                        <div>
                            <label className="block text-sm font-medium text-blue-600 mb-1">Mobile Number</label>
                            <input
                                type="text"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                placeholder="e.g., +1234567890"
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                            />
                        </div>

                        {/* Photo */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-blue-600 mb-1">Photo</label>
                            <input
                                type="file"
                                name="photoFile"
                                onChange={handlePhotoChange}
                                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                accept="image/*"
                            />
                            {membershipToEdit && membershipToEdit.photo && !removePhoto && (
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">Current photo: {membershipToEdit.photo}</p>
                                    <button
                                        type="button"
                                        onClick={handleRemovePhoto}
                                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs rounded-full mt-1"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Status */}
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

                        {/* Form Actions */}
                        <div className="flex justify-end gap-4 mt-6 col-span-2">
                            <button
                                type="submit"
                                disabled={loading || !currentUser}
                                className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors shadow-md ${loading || !currentUser ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                {loading ? "Saving..." : membershipToEdit ? "Update" : "Save"}
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

                {/* Modal */}
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

export default AddNewMembership;