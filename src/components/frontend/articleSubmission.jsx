// import React, { useState, useEffect, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import ReCAPTCHA from "react-google-recaptcha";
// import Navbar from "./navbar";
// import Footer from "./footer";
// import { Helmet } from "react-helmet-async";

// const BASE_URL = "https://iassrd.com:8081/api/v1";

// const ArticleSubmission = () => {
//     useEffect(() => {
//         window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
//     }, []);

//     const location = useLocation();
//     const navigate = useNavigate();
//     const recaptchaRef = useRef(null);

//     const [formData, setFormData] = useState({
//         authorName: "",
//         lastName: "",
//         email: "",
//         country: "",
//         mobileNumber: "",
//         journalId: "",
//         articleTitle: "",
//         uploadManuscript: null,
//         recaptchaToken: "",
//     });
//     const [message, setMessage] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [journals, setJournals] = useState([]);
//     const [countries, setCountries] = useState([]);
//     const [countriesLoading, setCountriesLoading] = useState(true);
//     const [countriesError, setCountriesError] = useState(null);
//     const [isSearchOpen, setIsSearchOpen] = useState(false);

//     useEffect(() => {
//         const controller = new AbortController();
//         const signal = controller.signal;

//         const fetchData = async (url, setData, errorMessage) => {
//             try {
//                 const response = await fetch(url, { signal });
//                 if (!response.ok) throw new Error(errorMessage);
//                 const data = await response.json();
//                 return Array.isArray(data) ? data : data.data || [];
//             } catch (err) {
//                 if (err.name !== "AbortError") {
//                     console.error(errorMessage, err);
//                     setMessage(`Failed to load ${errorMessage.toLowerCase()}`);
//                 }
//                 return [];
//             }
//         };

//         const fetchAllData = async () => {
//             const [journalData, countryData] = await Promise.all([
//                 fetchData(`${BASE_URL}/journals`, setJournals, "Failed to fetch journals"),
//                 fetchData("https://restcountries.com/v3.1/all?fields=name,cca2", setCountries, "Failed to fetch countries").then(data =>
//                     data.sort((a, b) => a.name.common.localeCompare(b.name.common))
//                 ),
//             ]);

//             setJournals(journalData);
//             setCountries(countryData);
//             setCountriesLoading(false);
//         };

//         fetchAllData();

//         if (location.pathname !== "/submitarticle") {
//             navigate("/submitarticle");
//         }

//         return () => controller.abort();
//     }, [location.pathname, navigate]);

//     // const handleRecaptchaChange = (token) => {
//     //     setFormData((prev) => ({
//     //         ...prev,
//     //         recaptchaToken: token || "",
//     //     }));
//     // };

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: files ? files[0] : value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage("");

//         // if (!formData.recaptchaToken) {
//         //     setMessage("Please complete the reCAPTCHA verification.");
//         //     setLoading(false);
//         //     return;
//         // }

//         try {
//             const articleSubmission = {
//                 authorName: formData.authorName,
//                 lastName: formData.lastName,
//                 email: formData.email,
//                 country: formData.country,
//                 mobileNumber: formData.mobileNumber,
//                 journalId: formData.journalId,
//                 articleTitle: formData.articleTitle,
//                 // recaptchaToken: formData.recaptchaToken,
//             };

//             const formDataToSend = new FormData();
//             formDataToSend.append(
//                 "articleSubmission",
//                 new Blob([JSON.stringify(articleSubmission)], { type: "application/json" })
//             );
//             if (formData.uploadManuscript) {
//                 formDataToSend.append("file", formData.uploadManuscript);
//             }

//             const response = await fetch(`${BASE_URL}/article-submissions`, {
//                 method: "POST",
//                 body: formDataToSend,
//                 keepalive: true,
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
//             }

//             await response.json();
//             setMessage("Submission successful!");
//             setFormData({
//                 authorName: "",
//                 lastName: "",
//                 email: "",
//                 country: "",
//                 mobileNumber: "",
//                 journalId: "",
//                 articleTitle: "",
//                 uploadManuscript: null,
//                 // recaptchaToken: "",
//             });
//             document.querySelector('input[type="file"]').value = null;
//             if (recaptchaRef.current) {
//                 recaptchaRef.current.reset();
//             }
//         } catch (err) {
//             console.error("Submission error:", err);
//             setMessage(`Submission failed: ${err.message}`);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const metaDescription =
//         "Submit your manuscript to IASSRD journals using our streamlined online form. Upload your article and receive a response within 3 working days.";

//     const pageSchema = {
//         "@context": "https://schema.org",
//         "@type": "WebPage",
//         name: "Article Submission - IASSRD",
//         description: metaDescription,
//         url: window.location.href,
//         publisher: {
//             "@type": "Organization",
//             name: "IASSRD",
//             url: "https://iassrd.com",
//         },
//     };

//     return (
//         <>


//             <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />


//             <div className={`  py-[30px] ${isSearchOpen ? "mt-[160px]" : "mt-[80px]"}`}>
//                 <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
//                     <div>
//                         <h2 className="text-3xl font-extrabold text-purple-900 text-center">
//                             Submit Your Manuscript
//                         </h2>
//                         <p className="mt-2 text-center text-sm text-gray-600">
//                             Complete the form below or email your manuscript to
//                             <a
//                                 href="mailto:iassrd.editor@gmail.com"
//                                 className="text-purple-600 hover:text-purple-800 ml-1 underline"
//                             >
//                                 iassrd.editor@gmail.com
//                             </a>
//                         </p>
//                     </div>
//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         <div className="space-y-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700">
//                                     Journal <span className="text-red-500">*</span>
//                                 </label>
//                                 <select
//                                     name="journalId"
//                                     value={formData.journalId}
//                                     onChange={handleChange}
//                                     className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
//                                     required
//                                 >
//                                     <option value="">Select Journal</option>
//                                     {journals.map((journal) => (
//                                         <option key={journal.journalId} value={journal.journalId}>
//                                             {journal.journalName}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700">
//                                     Article Title <span className="text-red-500">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="articleTitle"
//                                     value={formData.articleTitle}
//                                     onChange={handleChange}
//                                     className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700">
//                                     Upload Manuscript <span className="text-red-500">*</span>
//                                 </label>
//                                 <input
//                                     type="file"
//                                     name="uploadManuscript"
//                                     accept=".pdf,.doc,.docx,.tex"
//                                     onChange={handleChange}
//                                     className="mt-1 block w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-purple-500 focus:border-purple-500"
//                                     required
//                                 />
//                             </div>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">
//                                         First Name <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="authorName"
//                                         value={formData.authorName}
//                                         onChange={handleChange}
//                                         className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">
//                                         Last Name <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="lastName"
//                                         value={formData.lastName}
//                                         onChange={handleChange}
//                                         className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
//                                         required
//                                     />
//                                 </div>
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700">
//                                     Email Address <span className="text-red-500">*</span>
//                                 </label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
//                                     required
//                                 />
//                                 <p className="mt-1 text-sm text-gray-500">
//                                     We will respond within 3 working days.
//                                 </p>
//                             </div>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">
//                                         Country <span className="text-red-500">*</span>
//                                     </label>
//                                     <select
//                                         name="country"
//                                         value={formData.country}
//                                         onChange={handleChange}
//                                         className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
//                                         required
//                                         disabled={countriesLoading || countriesError}
//                                     >
//                                         <option value="">Select Country</option>
//                                         {countries.map((country) => (
//                                             <option key={country.cca2} value={country.name.common}>
//                                                 {country.name.common}
//                                             </option>
//                                         ))}
//                                     </select>
//                                     {countriesLoading && (
//                                         <p className="mt-1 text-sm text-gray-500">Loading countries...</p>
//                                     )}
//                                     {countriesError && (
//                                         <p className="mt-1 text-sm text-red-500">{countriesError}</p>
//                                     )}
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">
//                                         Mobile Number <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="mobileNumber"
//                                         value={formData.mobileNumber}
//                                         onChange={handleChange}
//                                         className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
//                                         required
//                                     />
//                                 </div>
//                             </div>
//                             {/* <div>
//                                 <label className="block text-sm font-medium text-gray-700">
//                                     Verify You're Not a Robot <span className="text-red-500">*</span>
//                                 </label>
//                                 <ReCAPTCHA
//                                     ref={recaptchaRef}
//                                     sitekey="6Le9dlwrAAAAANtV605egMqLQ_sadO95xEdixF4U"
//                                     onChange={handleRecaptchaChange}
//                                     className="mt-2"
//                                 />
//                             </div> */}
//                             <button
//                                 type="submit"
//                                 className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300"
//                                 disabled={loading}
//                             >
//                                 {loading ? "Submitting..." : "Submit Article"}
//                             </button>
//                             {message && (
//                                 <p
//                                     className={`mt-4 text-center text-sm ${message.includes("successful") ? "text-green-600" : "text-red-600"
//                                         }`}
//                                 >
//                                     {message}
//                                 </p>
//                             )}
//                         </div>
//                     </form>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default ArticleSubmission;














import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

const BASE_URL = "https://iassrd.com:8081/api/v1";

const ArticleSubmission = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, []);

    const location = useLocation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        authorName: "",
        lastName: "",
        email: "",
        country: "",
        mobileNumber: "",
        journalId: "",
        articleTitle: "",
        uploadManuscript: null,
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [journals, setJournals] = useState([]);
    const [countries, setCountries] = useState([]);
    const [countriesLoading, setCountriesLoading] = useState(true);
    const [countriesError, setCountriesError] = useState(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async (url, setData, errorMessage) => {
            try {
                const response = await fetch(url, { signal });
                if (!response.ok) throw new Error(errorMessage);
                const data = await response.json();
                return Array.isArray(data) ? data : data.data || [];
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error(errorMessage, err);
                    setMessage(`Failed to load ${errorMessage.toLowerCase()}`);
                }
                return [];
            }
        };

        const fetchAllData = async () => {
            const [journalData, countryData] = await Promise.all([
                fetchData(`${BASE_URL}/journals`, setJournals, "Failed to fetch journals"),
                fetchData("https://restcountries.com/v3.1/all?fields=name,cca2", setCountries, "Failed to fetch countries").then(data =>
                    data.sort((a, b) => a.name.common.localeCompare(b.name.common))
                ),
            ]);

            setJournals(journalData);
            setCountries(countryData);
            setCountriesLoading(false);
        };

        fetchAllData();

        if (location.pathname !== "/submitarticle") {
            navigate("/submitarticle");
        }

        return () => controller.abort();
    }, [location.pathname, navigate]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const articleSubmission = {
                authorName: formData.authorName,
                lastName: formData.lastName,
                email: formData.email,
                country: formData.country,
                mobileNumber: formData.mobileNumber,
                journalId: formData.journalId,
                articleTitle: formData.articleTitle,
            };

            const formDataToSend = new FormData();
            formDataToSend.append(
                "articleSubmission",
                new Blob([JSON.stringify(articleSubmission)], { type: "application/json" })
            );
            if (formData.uploadManuscript) {
                formDataToSend.append("file", formData.uploadManuscript);
            }

            const response = await fetch(`${BASE_URL}/article-submissions`, {
                method: "POST",
                body: formDataToSend,
                keepalive: true,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
            }

            await response.json();
            setMessage("Submission successful!");
            setFormData({
                authorName: "",
                lastName: "",
                email: "",
                country: "",
                mobileNumber: "",
                journalId: "",
                articleTitle: "",
                uploadManuscript: null,
            });
            document.querySelector('input[type="file"]').value = null;
        } catch (err) {
            console.error("Submission error:", err);
            setMessage(`Submission failed: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const metaDescription =
        "Submit your manuscript to IASSRD journals using our streamlined online form. Upload your article and receive a response within 3 working days.";

    const pageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Article Submission - IASSRD",
        description: metaDescription,
        url: window.location.href,
        publisher: {
            "@type": "Organization",
            name: "IASSRD",
            url: "https://iassrd.com",
        },
    };

    return (
        <>


            <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />

            {isSearchOpen && (
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10"
                    aria-hidden="true"
                ></div>
            )}
            <div className={`px-[90px] ${isSearchOpen ? "mt-[160px]" : "mt-[80px]"}`}>
                <div className=" space-y-8  p-10 rounded-xl   ">
                    <div class=''>
                        <h2 className="text-3xl font-extrabold text-purple-900 text-center ">
                            Submit Your Manuscript
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Complete the form below or email your manuscript to
                            <a
                                href="mailto:iassrd.editor@gmail.com"
                                className="text-purple-600 hover:text-purple-800 ml-1 underline"
                            >
                                iassrd.editor@gmail.com
                            </a>
                        </p>
                    </div>
                    <div class='md:flex w-full '>



                        <form onSubmit={handleSubmit} className="space-y-6 space-x-4 w-3/4 mr-10">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Journal <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="journalId"
                                        value={formData.journalId}
                                        onChange={handleChange}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                                        required
                                    >
                                        <option value="">Select Journal</option>
                                        {journals.map((journal) => (
                                            <option key={journal.journalId} value={journal.journalId}>
                                                {journal.journalName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Article Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="articleTitle"
                                        value={formData.articleTitle}
                                        onChange={handleChange}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Upload Manuscript <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="file"
                                        name="uploadManuscript"
                                        accept=".pdf,.doc,.docx,.tex"
                                        onChange={handleChange}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:ring-purple-500 focus:border-purple-500"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="authorName"
                                            value={formData.authorName}
                                            onChange={handleChange}
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Last Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                                        required
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        We will respond within 3 working days.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Country <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                                            required
                                            disabled={countriesLoading || countriesError}
                                        >
                                            <option value="">Select Country</option>
                                            {countries.map((country) => (
                                                <option key={country.cca2} value={country.name.common}>
                                                    {country.name.common}
                                                </option>
                                            ))}
                                        </select>
                                        {countriesLoading && (
                                            <p className="mt-1 text-sm text-gray-500">Loading countries...</p>
                                        )}
                                        {countriesError && (
                                            <p className="mt-1 text-sm text-red-500">{countriesError}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Mobile Number <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="mobileNumber"
                                            value={formData.mobileNumber}
                                            onChange={handleChange}
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                                            required
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300"
                                    disabled={loading}
                                >
                                    {loading ? "Submitting..." : "Submit Article"}
                                </button>
                                {message && (
                                    <p
                                        className={`mt-4 text-center text-sm ${message.includes("successful") ? "text-green-600" : "text-red-600"}`}
                                    >
                                        {message}
                                    </p>
                                )}
                            </div>
                        </form>

                        <aside className="w-full lg:w-1/3 bg-gradient-to-br from-white to-blue-50 p-6  rounded-2xl shadow-xl border border-gray-100 backdrop-blur-sm bg-opacity-90">
                            <h3 className="text-xl font-semibold text-blue-700 mb-4">
                                Download Template
                            </h3>
                            <p className="text-gray-700 text-base mb-6">
                                Prepare your manuscript using our templates for a smoother review process. Ensure clear headings and sections if not using a template.
                            </p>
                            <div className="space-y-4 text-center">
                                <p className="text-base font-medium text-gray-800">
                                    Available Formats
                                </p>
                                <a
                                    href="https://iassrd.com/uploads/template/IASSRD-Article_Template.docx"
                                    className="transition-transform duration-200 ease-in-out hover:-translate-y-1 block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
                                >
                                    Download Word Template
                                </a>
                                <a
                                    href="https://iassrd.com/uploads/template/IASSRD-Article_Template.pdf"
                                    className="transition-transform duration-200 ease-in-out hover:-translate-y-1 block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
                                >
                                    Download PDF Template
                                </a>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ArticleSubmission;