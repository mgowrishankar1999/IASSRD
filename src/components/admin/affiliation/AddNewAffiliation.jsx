// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../sidebar";

// const AddNewAffiliation = () => {
//     const navigate = useNavigate();
//     const location = useLocation();

//     const [modal, setModal] = useState({ show: false, type: "", message: "" });
//     const [affiliation, setAffiliation] = useState(null);
//     const [logoFile, setLogoFile] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");

//     const BASE_URL = "https://iassrd.com:8081/api/v1";

//     // Get user data from localStorage
//     const user = JSON.parse(localStorage.getItem("user")) || {};
//     const userId = user.userId || null;

//     // Load affiliation data for editing or initialize for adding
//     useEffect(() => {
//         if (location.state && location.state.affiliation) {
//             const { affId, ...editableFields } = location.state.affiliation;
//             setAffiliation(editableFields);
//         } else {
//             setAffiliation({
//                 affName: "",
//                 alternateName: "",
//                 address: "",
//                 country: "",
//                 website: "",
//                 papersPublished: 0,
//                 affCode: "",
//                 status: "",
//                 createdUserId: userId,
//                 createdUserType: 1,
//                 updatedUserId: userId,
//                 updatedUserType: 1,
//             });
//         }
//     }, [location.state, userId]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setAffiliation((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleFileChange = (e) => {
//         setLogoFile(e.target.files[0]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage("");

//         try {
//             const formData = new FormData();
//             formData.append(
//                 "affiliation",
//                 new Blob([JSON.stringify({
//                     affName: affiliation.affName || "",
//                     alternateName: affiliation.alternateName || "",
//                     address: affiliation.address || "",
//                     country: affiliation.country || "",
//                     website: affiliation.website || "",
//                     papersPublished: affiliation.papersPublished ? parseInt(affiliation.papersPublished) : 0,
//                     affCode: affiliation.affCode || "",
//                     status: affiliation.status ? parseInt(affiliation.status) : null,
//                     createdUserId: userId,
//                     createdUserType: affiliation.createdUserType || 1,
//                     updatedUserId: userId,
//                     updatedUserType: affiliation.updatedUserType || 1,
//                 })], { type: "application/json" })
//             );
//             if (logoFile) {
//                 formData.append("logoFile", logoFile);
//             }

//             let response;
//             const isEditing = location.state && location.state.affiliation && location.state.affiliation.affId;
//             if (isEditing) {
//                 response = await axios.put(`${BASE_URL}/affiliations/${location.state.affiliation.affId}`, formData, {
//                     headers: { "Content-Type": "multipart/form-data" },
//                 });
//             } else {
//                 response = await axios.post(`${BASE_URL}/affiliations`, formData, {
//                     headers: { "Content-Type": "multipart/form-data" },
//                 });
//             }

//             if (response && (response.status === 200 || response.status === 201)) {
//                 setModal({
//                     show: true,
//                     type: "success",
//                     message: isEditing ? "Affiliation record updated successfully!" : "Affiliation record added successfully!",
//                 });
//                 setMessage(isEditing ? "Affiliation record updated successfully!" : "Affiliation record added successfully!");
//                 setTimeout(() => {
//                     setModal({ show: false, type: "", message: "" });
//                     navigate("/affiliation");
//                     window.scrollTo(0, 0);
//                 }, 800);
//             }
//         } catch (error) {
//             setModal({
//                 show: true,
//                 type: "error",
//                 message: `Failed to ${location.state && location.state.affiliation ? "update" : "add"} affiliation record: ${error.message}`,
//             });
//             setMessage(`Failed to ${location.state && location.state.affiliation ? "update" : "add"} affiliation record: ${error.message}`);
//             console.error("Error saving affiliation record:", error);
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
//                         {location.state && location.state.affiliation ? "Edit Affiliation Record" : "Add New Affiliation Record"}
//                     </h1>
//                     <p className="text-sm opacity-90 mt-1">
//                         {location.state && location.state.affiliation
//                             ? "Update an existing affiliation record."
//                             : "Create a new affiliation record for your dashboard."}
//                     </p>
//                 </header>

//                 {/* Main Content */}
//                 <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
//                     <h2 className="text-xl font-semibold text-blue-600 mb-6">
//                         {location.state && location.state.affiliation ? "Edit Affiliation Record" : "Add New Affiliation Record"}
//                     </h2>

//                     {message && (
//                         <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{message}</div>
//                     )}

//                     {affiliation && (
//                         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {/* Affiliation Name */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Affiliation Name *</label>
//                                 <input
//                                     type="text"
//                                     name="affName"
//                                     value={affiliation.affName}
//                                     onChange={handleChange}
//                                     placeholder="e.g., University of Example"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>

//                             {/* Alternate Name */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Alternate Name</label>
//                                 <input
//                                     type="text"
//                                     name="alternateName"
//                                     value={affiliation.alternateName}
//                                     onChange={handleChange}
//                                     placeholder="e.g., Example Univ"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Address */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Address</label>
//                                 <input
//                                     type="text"
//                                     name="address"
//                                     value={affiliation.address}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 123 Main St, City"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"                            
//                                 />
//                             </div>

//                             {/* Country */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Country *</label>
//                                 <input
//                                     type="text"
//                                     name="country"
//                                     value={affiliation.country}
//                                     onChange={handleChange}
//                                     placeholder="e.g., United States"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                     required
//                                 />
//                             </div>

//                             {/* Website */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Website</label>
//                                 <input
//                                     type="url"
//                                     name="website"
//                                     value={affiliation.website}
//                                     onChange={handleChange}
//                                     placeholder="e.g., https://example.com"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Papers Published */}
//                             <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Papers Published</label>
//                                 <input
//                                     type="number"
//                                     name="papersPublished"
//                                     value={affiliation.papersPublished}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 100"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div>

//                             {/* Affiliation Code */}
//                             {/* <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Affiliation Code</label>
//                                 <input
//                                     type="text"
//                                     name="affCode"
//                                     value={affiliation.affCode}
//                                     onChange={handleChange}
//                                     placeholder="e.g., UNI123"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div> */}

//                             {/* Status */}
//                             {/* <div>
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Status</label>
//                                 <input
//                                     type="number"
//                                     name="status"
//                                     value={affiliation.status}
//                                     onChange={handleChange}
//                                     placeholder="e.g., 1"
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                             </div> */}

//                             {/* Logo File */}
//                             <div className="col-span-2">
//                                 <label className="block text-sm font-medium text-blue-600 mb-1">Logo</label>
//                                 <input
//                                     type="file"
//                                     name="logoFile"
//                                     accept="image/*"
//                                     onChange={handleFileChange}
//                                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 />
//                                 {location.state && location.state.affiliation && location.state.affiliation.logo && (
//                                     <p className="text-sm text-gray-600 mt-1">Current logo: {location.state.affiliation.logo}</p>
//                                 )}
//                             </div>

//                             {/* Buttons */}
//                             <div className="flex justify-end gap-4 mt-6 col-span-2">
//                                 <button
//                                     type="submit"
//                                     className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors shadow-md"
//                                     disabled={loading}
//                                 >
//                                     {loading
//                                         ? "Saving..."
//                                         : location.state && location.state.affiliation
//                                             ? "Update"
//                                             : "Save"}
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => {
//                                         navigate("/affiliation");
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
//                                 className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors"
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

// export default AddNewAffiliation;


import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Sidebar from "../sidebar";

const AddNewAffiliation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [modal, setModal] = useState({ show: false, type: "", message: "" });
    const [affiliation, setAffiliation] = useState(null);
    const [logoFile, setLogoFile] = useState(null);
    const [removeLogo, setRemoveLogo] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [countries, setCountries] = useState([]);
    const [countriesLoading, setCountriesLoading] = useState(true);
    const [countriesError, setCountriesError] = useState(null);


    const BASE_URL = "https://iassrd.com:8081/api/v1";
    const COUNTRIES_API = "https://restcountries.com/v3.1/all?fields=name,cca2";


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


    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchCountries = async () => {
            try {
                setCountriesLoading(true);
                setCountriesError(null);
                const response = await fetch(COUNTRIES_API, { signal });
                if (!response.ok) throw new Error("Failed to fetch countries");
                const data = await response.json();
                const sortedCountries = (Array.isArray(data) ? data : data.data || [])
                    .map((country) => ({
                        name: country.name?.common || "Unknown",
                        code: country.cca2 || "XX",
                    }))
                    .filter((country) => country.name && country.code)
                    .sort((a, b) => a.name.localeCompare(b.name));
                setCountries(sortedCountries);
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error("Error fetching countries:", err);
                    setCountriesError("Failed to load countries. Please try again.");
                    setCountries([]); // Fallback to empty list instead of hard-coded countries
                    setModal({
                        show: true,
                        type: "error",
                        message: "Error fetching countries: " + err.message,
                    });
                }
            } finally {
                setCountriesLoading(false);
            }
        };

        fetchCountries();

        return () => controller.abort();
    }, []);

    // Load affiliation data for editing or initialize for adding
    useEffect(() => {
        if (location.state && location.state.affiliation) {
            const { affId, createdUserId, createdUserType, ...editableFields } = location.state.affiliation;
            setAffiliation({
                ...editableFields,
                createdUserId: createdUserId || currentUser?.userId,
                createdUserType: createdUserType || (currentUser?.role === "ADMIN" ? 1 : 2),
                updatedUserId: currentUser?.userId,
                updatedUserType: currentUser?.role === "ADMIN" ? 1 : 2,
            });
            if (location.state.affiliation.logo) {
                setLogoFile(
                    location.state.affiliation.logo.startsWith("/")
                        ? `${BASE_URL}${location.state.affiliation.logo}`
                        : location.state.affiliation.logo
                );
            }
        } else if (currentUser) {
            setAffiliation({
                affName: "",
                alternateName: "",
                address: "",
                country: "",
                website: "",
                papersPublished: 0,
                affCode: "",
                status: "",
                createdUserId: currentUser.userId,
                createdUserType: currentUser.role === "ADMIN" ? 1 : 2,
                updatedUserId: currentUser.userId,
                updatedUserType: currentUser.role === "ADMIN" ? 1 : 2,
            });
        }
    }, [location.state, currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAffiliation((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setLogoFile(e.target.files[0]);
        setRemoveLogo(false);
    };

    const handleRemoveLogo = () => {
        setLogoFile(null);
        setRemoveLogo(true);
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
        setMessage("");

        try {
            const formData = new FormData();
            formData.append(
                "affiliation",
                new Blob([JSON.stringify({
                    affName: affiliation.affName || "",
                    alternateName: affiliation.alternateName || "",
                    address: affiliation.address || "",
                    country: affiliation.country || "",
                    website: affiliation.website || "",
                    papersPublished: affiliation.papersPublished ? parseInt(affiliation.papersPublished) : 0,
                    affCode: affiliation.affCode || "",
                    status: affiliation.status ? parseInt(affiliation.status) : null,
                    createdUserId: affiliation.createdUserId || currentUser.userId,
                    createdUserType: affiliation.createdUserType || (currentUser.role === "ADMIN" ? 1 : 2),
                    updatedUserId: currentUser.userId,
                    updatedUserType: currentUser.role === "ADMIN" ? 1 : 2,
                })], { type: "application/json" })
            );
            if (logoFile && typeof logoFile !== "string") {
                formData.append("logoFile", logoFile);
            }

            let response;
            const isEditing = location.state && location.state.affiliation && location.state.affiliation.affId;
            if (isEditing) {
                response = await axios.put(`${BASE_URL}/affiliations/${location.state.affiliation.affId}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                response = await axios.post(`${BASE_URL}/affiliations`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            if (response && (response.status === 200 || response.status === 201)) {
                setModal({
                    show: true,
                    type: "success",
                    message: isEditing ? "Affiliation record updated successfully!" : "Affiliation record added successfully!",
                });
                setMessage(isEditing ? "Affiliation record updated successfully!" : "Affiliation record added successfully!");
                setTimeout(() => {
                    setModal({ show: false, type: "", message: "" });
                    navigate("/affiliation");
                    window.scrollTo(0, 0);
                }, 800);
            }
        } catch (error) {
            setModal({
                show: true,
                type: "error",
                message: `Failed to ${isEditing ? "update" : "add"} affiliation record: ${error.message}`,
            });
            setMessage(`Failed to ${isEditing ? "update" : "add"} affiliation record: ${error.message}`);
            console.error("Error saving affiliation record:", error);
        } finally {
            setLoading(false);
        }
    };

    const getFileDisplayName = (file) => {
        if (typeof file === "string") {
            return file.split("/").pop();
        } else if (file instanceof File) {
            return file.name;
        }
        return "No file selected";
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
            <div className="w-screen p-6 h-screen pt-20 overflow-y-auto">
                {/* Header */}
                <header className="bg-cyan-500 text-white p-4 rounded-t-lg mb-6 shadow-md">
                    <h1 className="text-2xl font-bold">
                        {location.state && location.state.affiliation ? "Edit Affiliation Record" : "Add New Affiliation Record"}
                    </h1>
                    <p className="text-sm opacity-90 mt-1">
                        {location.state && location.state.affiliation
                            ? "Update an existing affiliation record."
                            : "Create a new affiliation record for your dashboard."}
                    </p>
                </header>

                {/* Main Content */}
                <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
                    <h2 className="text-xl font-semibold text-blue-600 mb-6">
                        {location.state && location.state.affiliation ? "Edit Affiliation Record" : "Add New Affiliation Record"}
                    </h2>

                    {message && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{message}</div>
                    )}

                    {affiliation && (
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Affiliation Name */}
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Affiliation Name </label>
                                <input
                                    type="text"
                                    name="affName"
                                    value={affiliation.affName}
                                    onChange={handleChange}
                                    placeholder="e.g., University of Example"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>

                            {/* Alternate Name */}
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Alternate Name</label>
                                <input
                                    type="text"
                                    name="alternateName"
                                    value={affiliation.alternateName}
                                    onChange={handleChange}
                                    placeholder="e.g., Example Univ"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={affiliation.address}
                                    onChange={handleChange}
                                    placeholder="e.g., 123 Main St, City"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>

                            {/* Country */}
                            {/* <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Country *</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={affiliation.country}
                                    onChange={handleChange}
                                    placeholder="e.g., United States"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    required
                                />
                            </div> */}
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Country *</label>
                                <select
                                    name="country"
                                    value={affiliation.country}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                    required
                                    disabled={countriesLoading || countriesError}
                                >
                                    <option value="">Select a country</option>
                                    {countries.map((country) => (
                                        <option key={country.code} value={country.name}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                                {countriesLoading && <p className="text-sm text-gray-500 mt-1">Loading countries...</p>}
                            </div>

                            {/* Website */}
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Website</label>
                                <input
                                    type="url"
                                    name="website"
                                    value={affiliation.website}
                                    onChange={handleChange}
                                    placeholder="e.g., https://example.com"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>

                            {/* Papers Published */}
                            <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Papers Published</label>
                                <input
                                    type="number"
                                    name="papersPublished"
                                    value={affiliation.papersPublished}
                                    onChange={handleChange}
                                    placeholder="e.g., 100"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div>

                            {/* Affiliation Code */}
                            {/* <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Affiliation Code</label>
                                <input
                                    type="text"
                                    name="affCode"
                                    value={affiliation.affCode}
                                    onChange={handleChange}
                                    placeholder="e.g., UNI123"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div> */}

                            {/* Status */}
                            {/* <div>
                                <label className="block text-sm font-medium text-blue-600 mb-1">Status</label>
                                <input
                                    type="number"
                                    name="status"
                                    value={affiliation.status}
                                    onChange={handleChange}
                                    placeholder="e.g., 1"
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                            </div> */}

                            {/* Logo File */}
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-blue-600 mb-1">Logo</label>
                                <input
                                    type="file"
                                    name="logoFile"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                />
                                {location.state && location.state.affiliation && logoFile && !removeLogo && (
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">Current file:</p>
                                        <div className="relative inline-block">
                                            <a
                                                href={typeof logoFile === "string" ? logoFile : URL.createObjectURL(logoFile)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 underline"
                                            >
                                                {getFileDisplayName(logoFile)}
                                            </a>
                                            <button
                                                type="button"
                                                onClick={handleRemoveLogo}
                                                className="absolute -top-2 -left-1 bg-red-500 text-white px-2 py-1 text-xs rounded-full"
                                            >
                                                ✖
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-4 mt-6 col-span-2">
                                <button
                                    type="submit"
                                    className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors shadow-md ${loading || !currentUser ? "opacity-50 cursor-not-allowed" : ""}`}
                                    disabled={loading || !currentUser}
                                >
                                    {loading
                                        ? "Saving..."
                                        : location.state && location.state.affiliation
                                            ? "Update"
                                            : "Save"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        navigate("/affiliation");
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
                                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors"
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

export default AddNewAffiliation;