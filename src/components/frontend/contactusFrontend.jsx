

// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
// import Navbar from "./navbar";
// import Footer from "./footer";

// const BASE_URL = "https://iassrd.com:8081/api/v1";

// const ContactUsFrontend = () => {
//     const [isSearchOpen, setIsSearchOpen] = useState(false);
//     const [formData, setFormData] = useState({
//         name: "",
//         country: "",
//         email: "",
//         contactNo: "",
//         message: "",
//     });
//     const [submissionStatus, setSubmissionStatus] = useState(null);
//     const [errorMessage, setErrorMessage] = useState("");
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const location = useLocation();
//     const navigate = useNavigate();

//     useEffect(() => {
//         window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

//         if (location.pathname !== "/contactus") {
//             navigate("/contactus");
//         }
//     }, [location.pathname, navigate]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSubmissionStatus(null);
//         setErrorMessage("");
//         setIsSubmitting(true);

//         try {
//             const response = await fetch(`${BASE_URL}/contactus`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(formData),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
//             }

//             setSubmissionStatus("success");
//             setErrorMessage("");
//             setFormData({
//                 name: "",
//                 country: "",
//                 email: "",
//                 contactNo: "",
//                 message: "",
//             });
//         } catch (error) {
//             setSubmissionStatus("error");
//             setErrorMessage(`Failed to submit the form: ${error.message}`);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const metaDescription =
//         "Contact IASSRD for journal inquiries, manuscript submissions, or support. Use our form or email us, and expect a response within 48 hours.";

//     const pageSchema = {
//         "@context": "https://schema.org",
//         "@type": "ContactPage",
//         name: "Contact Us - IASSRD",
//         description: metaDescription,
//         url: window.location.href,
//         publisher: {
//             "@type": "Organization",
//             name: "IASSRD",
//             url: "https://iassrd.com",
//             contactPoint: [
//                 {
//                     "@type": "ContactPoint",
//                     email: "iassrd.editor@gmail.com",
//                     contactType: "Submissions and Editorial Board",
//                 },
//                 {
//                     "@type": "ContactPoint",
//                     email: "iassrd.editor@gmail.com",
//                     contactType: "Journal Inquiries",
//                 },
//             ],
//         },
//     };

//     return (
//         <>


//             <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
//             {isSearchOpen && (
//                 <div
//                     className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10"
//                     aria-hidden="true"
//                 ></div>
//             )}

//             {isSubmitting && (
//                 <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50">
//                     <div className="w-12 h-12 border-4 border-t-teal-500 border-gray-300 rounded-full animate-spin"></div>
//                 </div>
//             )}

//             <div className={`${isSearchOpen ? "mt-40" : "mt-20"} bg-blue-50 min-h-screen`}>
//                 {/* Header */}
//                 <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center">
//                     <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight animate-fade-in">
//                         Get in Touch
//                     </h1>
//                     <p className="mt-4 text-lg sm:text-xl text-gray-200 max-w-3xl text-center">
//                         Have questions about your manuscript, our journals, or need support? We’re here to assist you promptly.
//                     </p>
//                 </div>

//                 {/* Form and Contact Info */}
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ">
//                     {/* Contact Info Box */}
//                     <div className="flex flex-col space-y-6">
//                         <div class='flex w-full space-x-10'>


//                             <div className="bg-white w-1/2 text-center min-h-[200px] rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-xl">
//                                 <h3 className="text-xl font-semibold text-title mb-4">Contact Information</h3>
//                                 <div className="space-y-4">
//                                     <div>
//                                         <h4 className="font-medium text-gray-800 text-sm">Email Us</h4>
//                                         <p className="text-gray-600 text-sm">
//                                             {/* <a href="mailto:iassrd.editor@gmail.com" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
//                                                 iassrd.editor@gmail.com
//                                             </a> */}
//                                             <br />
//                                             <a href="mailto:iassrd.editor@gmail.com" className="text-blue-600 hover:text-blue-800 transition-colors duration-200 mt-1 block">
//                                                 iassrd.editor@gmail.com
//                                             </a>
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className=" w-1/2  gap-8 text-center">
//                                 {/* Form Box */}
//                                 <div className="bg-white rounded-2xl min-h-[200px] shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-xl">
//                                     <div className="space-y-4">
//                                         <div>
//                                             <h4 className="font-medium text-gray-800 text-sm">Visit Us</h4>
//                                             <p className="text-gray-600 text-sm">IASSRD Research, India</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-xl">
//                             <h2 className="text-2xl sm:text-3xl font-semibold text-title text-center mb-4">
//                                 Send Us a Message
//                             </h2>
//                             <p className="text-center text-gray-600 text-sm mb-6">
//                                 Our team will respond within 48 hours.
//                             </p>
//                             <form onSubmit={handleSubmit} className="space-y-6">
//                                 {submissionStatus === "success" && (
//                                     <p className="text-hero text-center text-sm font-medium bg-title py-3 rounded-lg" role="alert">
//                                         Message sent successfully!
//                                     </p>
//                                 )}
//                                 {submissionStatus === "error" && (
//                                     <p className="text-red-600 text-center text-sm font-medium bg-red-50 py-3 rounded-lg" role="alert">
//                                         {errorMessage}
//                                     </p>
//                                 )}
//                                 <div className="space-y-5">
//                                     <div>
//                                         <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                                             Full Name <span className="text-red-500">*</span>
//                                         </label>
//                                         <input
//                                             type="text"
//                                             id="name"
//                                             name="name"
//                                             value={formData.name}
//                                             onChange={handleInputChange}
//                                             className="mt-1 w-full p-3 border border-gray-300 rounded-lg   text-sm transition-all duration-200 bg-white"
//                                             placeholder="Your Full Name"
//                                             required
//                                             disabled={isSubmitting}
//                                             aria-required="true"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                                             Email <span className="text-red-500">*</span>
//                                         </label>
//                                         <input
//                                             type="email"
//                                             id="email"
//                                             name="email"
//                                             value={formData.email}
//                                             onChange={handleInputChange}
//                                             className="mt-1 w-full p-3 border border-gray-300 rounded-lg  focus:border-teal-500 text-sm transition-all duration-200 bg-white"
//                                             placeholder="Your Email Address"
//                                             required
//                                             disabled={isSubmitting}
//                                             aria-required="true"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700">
//                                             Contact Number <span className="text-red-500">*</span>
//                                         </label>
//                                         <input
//                                             type="text"
//                                             id="contactNo"
//                                             name="contactNo"
//                                             value={formData.contactNo}
//                                             onChange={handleInputChange}
//                                             className="mt-1 w-full p-3 border border-gray-300 rounded-lg  focus:border-teal-500 text-sm transition-all duration-200 bg-white"
//                                             placeholder="Your Contact Number"
//                                             required
//                                             disabled={isSubmitting}
//                                             aria-required="true"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label htmlFor="country" className="block text-sm font-medium text-gray-700">
//                                             Country <span className="text-red-500">*</span>
//                                         </label>
//                                         <input
//                                             type="text"
//                                             id="country"
//                                             name="country"
//                                             value={formData.country}
//                                             onChange={handleInputChange}
//                                             className="mt-1 w-full p-3 border border-gray-300 rounded-lg  focus:border-teal-500 text-sm transition-all duration-200 bg-white"
//                                             placeholder="Your Country"
//                                             required
//                                             disabled={isSubmitting}
//                                             aria-required="true"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label htmlFor="message" className="block text-sm font-medium text-gray-700">
//                                             Message <span className="text-red-500">*</span>
//                                         </label>
//                                         <textarea
//                                             id="message"
//                                             name="message"
//                                             value={formData.message}
//                                             onChange={handleInputChange}
//                                             className="mt-1 w-full p-3 border border-gray-300 rounded-lg text-sm bg-white"
//                                             rows="5"
//                                             placeholder="Your Message"
//                                             required
//                                             disabled={isSubmitting}
//                                             aria-required="true"
//                                         ></textarea>
//                                     </div>
//                                 </div>
//                                 <div className="text-center">
//                                     <button
//                                         type="submit"
//                                         className="w-full bg-hero text-white py-3 px-4 rounded-lg hover:bg-blue-800 focus:outline-none  focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 text-sm font-medium"
//                                         disabled={isSubmitting}
//                                         aria-label="Submit contact form"
//                                     >
//                                         {isSubmitting ? "Sending..." : "Send Message"}
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>


//                     </div>
//                 </div>
//             </div>

//             <Footer />
//         </>
//     );
// };

// export default ContactUsFrontend;


import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "./navbar";
import Footer from "./footer";
import Contactus from '../../assets/contactus.jpg'

const BASE_URL = "https://iassrd.com:8081/api/v1";

const ContactUsFrontend = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        country: "",
        email: "",
        contactNo: "",
        message: "",
    });
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const [countries, setCountries] = useState([]);
    const [countriesLoading, setCountriesLoading] = useState(true);
    const [countriesError, setCountriesError] = useState(null);

    const COUNTRIES_API = "https://restcountries.com/v3.1/all?fields=name,cca2";


    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

        if (location.pathname !== "/contactus") {
            navigate("/contactus");
        }
    }, [location.pathname, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus(null);
        setErrorMessage("");
        setIsSubmitting(true);

        try {
            const response = await fetch(`${BASE_URL}/contactus`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
            }

            setSubmissionStatus("success");
            setErrorMessage("");
            setFormData({
                name: "",
                country: "",
                email: "",
                contactNo: "",
                message: "",
            });
        } catch (error) {
            setSubmissionStatus("error");
            setErrorMessage(`Failed to submit the form: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const metaDescription =
        "Contact IASSRD for journal inquiries, manuscript submissions, or support. Use our form or email us, and expect a response within 48 hours.";

    const pageSchema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact Us - IASSRD",
        description: metaDescription,
        url: window.location.href,
        publisher: {
            "@type": "Organization",
            name: "IASSRD",
            url: "https://iassrd.com",
            contactPoint: [
                {
                    "@type": "ContactPoint",
                    email: "iassrd.editor@gmail.com",
                    contactType: "Submissions and Editorial Board",
                },
                {
                    "@type": "ContactPoint",
                    email: "iassrd.editor@gmail.com",
                    contactType: "Journal Inquiries",
                },
            ],
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

            {isSubmitting && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50">
                    <div className="w-12 h-12 border-4 border-t-teal-500 border-gray-300 rounded-full animate-spin"></div>
                </div>
            )}

            <div className={`${isSearchOpen ? "mt-40" : "mt-20"} min-h-screen`}>
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 sm:px-6 lg:px-8 py-4 flex flex-col items-center justify-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight animate-fade-in">
                        Get in Touch
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-200 max-w-3xl text-center">
                        Have questions about your manuscript, our journals, or need support? We’re here to assist you promptly.
                    </p>
                </div>

                {/* Form and Contact Info */}
                <div className="px-4 sm:px-6 lg:px-20 ">
                    <div className="flex flex-col lg:flex-row  gap-8">
                        {/* Form (60% width) */}
                        <div className="lg:w-[60%] rounded-2xl bg-white  py-3  transition-all duration-300">
                            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center mb-3">
                                Send Us a Message
                            </h2>
                            <p className="text-center text-gray-600 text-sm mb-6">
                                Our team will respond within 48 hours.
                            </p>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {submissionStatus === "success" && (
                                    <p className="text-green-600 text-center text-sm font-medium bg-green-50 py-3 rounded-lg" role="alert">
                                        Message sent successfully!
                                    </p>
                                )}
                                {submissionStatus === "error" && (
                                    <p className="text-red-600 text-center text-sm font-medium bg-red-50 py-3 rounded-lg" role="alert">
                                        {errorMessage}
                                    </p>
                                )}
                                <div className="space-y-5">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg text-sm transition-all duration-200 bg-white focus:border-teal-500 focus:ring-teal-500"
                                            placeholder="Your Full Name"
                                            required
                                            disabled={isSubmitting}
                                            aria-required="true"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg text-sm transition-all duration-200 bg-white focus:border-teal-500 focus:ring-teal-500"
                                            placeholder="Your Email Address"
                                            required
                                            disabled={isSubmitting}
                                            aria-required="true"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700">
                                            Contact Number <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="contactNo"
                                            name="contactNo"
                                            value={formData.contactNo}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg text-sm transition-all duration-200 bg-white focus:border-teal-500 focus:ring-teal-500"
                                            placeholder="Your Contact Number"
                                            required
                                            disabled={isSubmitting}
                                            aria-required="true"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                            Country <span className="text-red-500">*</span>
                                        </label>
                                        {/* <input
                                            type="text"
                                            id="country"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg text-sm transition-all duration-200 bg-white focus:border-teal-500 focus:ring-teal-500"
                                            placeholder="Your Country"
                                            required
                                            disabled={isSubmitting}
                                            aria-required="true"
                                        /> */}


                                        <div>

                                            <select
                                                name="country"
                                                value={formData.country}
                                                onChange={handleInputChange}
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
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                            Message <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg text-sm bg-white focus:border-teal-500 focus:ring-teal-500"
                                            rows="5"
                                            placeholder="Your Message"
                                            required
                                            disabled={isSubmitting}
                                            aria-required="true"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 text-sm font-medium"
                                        disabled={isSubmitting}
                                        aria-label="Submit contact form"
                                    >
                                        {isSubmitting ? "Sending..." : "Send Message"}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Combined Contact Info and Visit Us (40% width) */}
                        <div className="lg:w-[40%] rounded-2xl py-3   transition-all duration-300">
                            <h3 className="text-3xl font-semibold text-gray-800 text-center">Contact Us</h3>
                            <p className="text-lg text-gray-700 mt-3 text-justify px-10">
                                To contact us, please send your inquiry to{" "}
                                <a href="mailto:iassrd.editor@gmail.com" className="text-blue-600 hover:text-blue-800">
                                    iassrd.editor@gmail.com
                                </a>
                                . We will respond promptly to assist you.
                            </p>
                            <div className="mt-6">
                                <img
                                    src={Contactus}
                                    alt="Contact Us Illustration"
                                    className="w-full h-auto max-h-[40vh] object-cover"
                                />
                            </div>
                            <div className="mt-6 px-10 space-y-4">
                                <p className="text-2xl font-semibold text-gray-800">How to Reach Us?</p>
                                <div>
                                    <h4 className="font-medium text-gray-800 text-lg">Email Us</h4>
                                    <p className="text-gray-600 text-sm mt-1">
                                        <a href="mailto:iassrd.editor@gmail.com" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                                            iassrd.editor@gmail.com
                                        </a>
                                    </p>
                                </div>
                                {/* <div>
                                    <h4 className="font-medium text-gray-800 text-lg">Visit Us</h4>
                                    <p className="text-gray-600 text-sm mt-1">IASSRD Research, India</p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ContactUsFrontend;


