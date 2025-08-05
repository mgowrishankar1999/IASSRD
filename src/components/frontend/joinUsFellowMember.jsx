import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

const JoinUsFellomember = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, []);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobileNumber: "",
        country: "",
        message: "",
        photo: null,
        cv: null,
        membershipType: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);


    // Refs for file inputs
    const photoInputRef = useRef(null);
    const cvInputRef = useRef(null);

    // Handle text input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle file input changes with validation
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files[0]) {
            // Validate file type and size
            if (name === "photo" && !files[0].type.startsWith("image/")) {
                setError("Photo must be an image file (e.g., JPG, PNG).");
                return;
            }
            if (name === "cv" && files[0].type !== "application/pdf") {
                setError("CV must be a PDF file.");
                return;
            }
            if (files[0].size > 5 * 1024 * 1024) {
                // 5MB limit
                setError("File size must not exceed 5MB.");
                return;
            }
            setError(""); // Clear previous errors
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        }
    };

    // Handle form submission with multipart/form-data
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");

        // Validate required fields
        if (!formData.name || !formData.email || !formData.mobileNumber || !formData.cv || !formData.membershipType) {
            setError("Please fill all required fields (Name, Email, Mobile Number, CV, Membership Type).");
            setLoading(false);
            return;
        }

        // Create FormData object
        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("mobileNumber", formData.mobileNumber);
        data.append("country", formData.country);
        data.append("message", formData.message);
        data.append("memberCategory", formData.membershipType);
        if (formData.photo) data.append("photo", formData.photo);
        if (formData.cv) data.append("cv", formData.cv);

        try {
            // Set up fetch with timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout

            const response = await fetch("https://iassrd.com:8081/api/v1/joinus", {
                method: "POST",
                body: data,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText || "Unknown server error"}`);
            }

            const result = await response.text();
            setSuccess(result || "Membership application submitted successfully!");
            setFormData({
                name: "",
                email: "",
                mobileNumber: "",
                country: "",
                message: "",
                photo: null,
                cv: null,
                membershipType: "",
            });

            // Reset file inputs using refs
            if (photoInputRef.current) photoInputRef.current.value = "";
            if (cvInputRef.current) cvInputRef.current.value = "";
        } catch (err) {
            if (err.name === "AbortError") {
                setError("Request timed out. Please try again later.");
            } else {
                setError(`Failed to submit request: ${err.message}`);
                console.error("Form submission error:", err); // Log for debugging
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
            <main className={`min-h-screen lg:px-[80px] pt-0 bg-gray-50 ${isSearchOpen ? 'mt-[190px]' : 'mt-[95px]'}`}>
                <div >
                    <div className="flex items-center justify-between h-full ">
                        <h1 className="text-4xl font-bold text-gray-700">Join as Fellow Member</h1>
                    </div>

                    {/* New Introduction Section */}
                    <section className="mt-8 font-IBM">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">About IASSRD Fellow Membership</h2>
                        <p className="text-gray-600 text-lg">
                            The <strong>International Academy for Social Sciences Research and Development (IASSRD)</strong> is dedicated to fostering innovation and collaboration in social sciences. Our fellow membership program connects researchers, academics, and professionals worldwide, providing access to exclusive resources, research opportunities, and a global network of thought leaders.
                        </p>
                        <p className="text-gray-600 text-lg">
                            By joining as a fellow member, you contribute to advancing interdisciplinary research and gain opportunities to shape the future of social sciences through publications, conferences, and collaborative projects.
                        </p>
                    </section>

                    {/* Benefits of Membership */}
                    <section className="mt-8 font-IBM">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Why Become a Fellow Member?</h3>
                        <ul className="list-disc list-inside text-gray-600 text-lg space-y-2">
                            <li>Access to IASSRD’s open-access journals and research publications.</li>
                            <li>Invitations to exclusive webinars, workshops, and international conferences.</li>
                            <li>Networking with global experts in social sciences and related fields.</li>
                            <li>Opportunities to contribute to peer review and editorial processes.</li>
                            <li>Recognition as a leader in the global research community.</li>
                        </ul>
                    </section>

                    {/* Membership Categories */}
                    <section className="mt-8 font-IBM">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Membership Categories</h3>
                        <p className="text-gray-600 text-lg">IASSRD offers a range of fellow membership categories tailored to your experience and qualifications:</p>
                        <ul className="list-disc list-inside text-gray-600 text-lg space-y-2 mt-2">
                            <li>
                                <strong>Fellow Member</strong>: For graduates/postgraduates with at least 5 years of professional experience in social sciences or related fields.
                            </li>
                            <li>
                                <strong>Senior Fellow Member</strong>: For individuals with 10+ years of professional experience in social sciences.
                            </li>
                            <li>
                                <strong>Executive Fellow Member</strong>: For professionals with 10–15 years of experience, demonstrating leadership in research or industry.
                            </li>
                            <li>
                                <strong>Honorary Fellow Member</strong>: For Ph.D. holders with 15+ years of research or 15–20 years of industry experience.
                            </li>
                            <li>
                                <strong>Advisory Member</strong>: For distinguished leaders contributing strategic expertise to IASSRD’s mission.
                            </li>
                        </ul>
                    </section>

                    {/* Membership Fee */}
                    <section className="mt-8 font-IBM">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Membership Fee</h3>
                        <p className="text-gray-600 text-lg">
                            The annual membership fee is <span className="font-bold">$125</span>, providing full access to IASSRD’s resources, including journal subscriptions, event participation, and networking platforms.
                        </p>
                    </section>

                    {/* Application Process */}
                    <section className="mt-8 font-IBM">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">How to Apply</h3>
                        <p className="text-gray-600 text-lg">
                            Join IASSRD by submitting your application through the form below or by emailing your CV to{" "}
                            <a
                                href="mailto:iassrd.editor@gmail.com"
                                className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-300"
                                aria-label="Email iassrd.editor@gmail.com for membership inquiries"
                            >
                                iassrd.editor@gmail.com
                            </a>
                            . We review applications promptly and will contact you regarding the next steps.
                        </p>
                    </section>

                    {/* Membership Application Form */}
                    <section className="mt-8 font-IBM" aria-labelledby="apply-membership-heading">
                        <h3 id="apply-membership-heading" className="text-xl font-bold mb-4 text-gray-800">
                            Fellow Membership Form
                        </h3>
                        <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md font-IBM">
                            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            placeholder="Enter your full name"
                                            aria-required="true"
                                        />
                                    </div>
                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            placeholder="Enter your email"
                                            aria-required="true"
                                        />
                                    </div>
                                    {/* Mobile Number */}
                                    <div>
                                        <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                            Mobile Number *
                                        </label>
                                        <input
                                            type="tel"
                                            id="mobileNumber"
                                            name="mobileNumber"
                                            value={formData.mobileNumber}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            placeholder="Enter your mobile number"
                                            aria-required="true"
                                        />
                                    </div>
                                    {/* Country */}
                                    <div>
                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                                            Country
                                        </label>
                                        <input
                                            type="text"
                                            id="country"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            placeholder="Enter your country"
                                            aria-required="false"
                                        />
                                    </div>
                                    {/* Membership Type */}
                                    <div>
                                        <label htmlFor="membershipType" className="block text-sm font-medium text-gray-700 mb-1">
                                            Membership Type *
                                        </label>
                                        <select
                                            id="membershipType"
                                            name="membershipType"
                                            value={formData.membershipType}
                                            onChange={handleInputChange}
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                            aria-required="true"
                                        >
                                            <option value="">Select Membership Type</option>
                                            <option value="Fellow Member">Fellow Member</option>
                                            <option value="Senior Fellow Member">Senior Fellow Member</option>
                                            <option value="Executive Fellow Member">Executive Fellow Member</option>
                                            <option value="Honorary Fellow Member">Honorary Fellow Member</option>
                                            <option value="Advisory Member">Advisory Member</option>
                                        </select>
                                    </div>
                                    {/* Photo */}
                                    <div className="md:col-span-2">
                                        <label htmlFor="photo" className="block text-sm font-medium text-gray-600 mb-1">
                                            Photo (Optional)
                                        </label>
                                        <input
                                            type="file"
                                            id="photo"
                                            name="photo"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            ref={photoInputRef}
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            aria-required="false"
                                        />
                                    </div>
                                    {/* CV */}
                                    <div className="md:col-span-2">
                                        <label htmlFor="cv" className="block text-sm font-medium text-gray-600 mb-1">
                                            CV *
                                        </label>
                                        <input
                                            type="file"
                                            id="cv"
                                            name="cv"
                                            accept=".pdf"
                                            onChange={handleFileChange}
                                            required
                                            ref={cvInputRef}
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            aria-required="true"
                                        />
                                    </div>
                                    {/* Message */}
                                    <div className="md:col-span-2">
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-600 mb-1">
                                            Message (Optional)
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows="4"
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            placeholder="Enter any additional information"
                                            aria-required="false"
                                        ></textarea>
                                    </div>
                                </div>
                                {/* Submit Button */}
                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`font-IBM w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                                        aria-label={loading ? "Submitting application" : "Submit membership application"}
                                    >
                                        {loading ? "Submitting..." : "Submit Application"}
                                    </button>
                                </div>
                                {/* Success/Error Messages */}
                                {success && (
                                    <p className="mt-4 text-green-600 text-sm" role="alert">
                                        {success}
                                    </p>
                                )}
                                {error && (
                                    <p className="mt-4 text-red-600 text-sm" role="alert">
                                        {error}
                                    </p>
                                )}
                            </form>
                        </div>
                    </section>
                </div>
                <br />
                <br />
            </main >
            <Footer />
        </>
    );
};

export default JoinUsFellomember;