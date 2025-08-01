import React, { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
// import ReCAPTCHA from "react-google-recaptcha";
import Navbar from "./navbar";
import Footer from "./footer";
import { Helmet } from "react-helmet-async";
import JournalContext from "../common/journalContext";
// import Space from "../../assets/herologo3.jpg"; 

const JoinUsFontend = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, []);

    const { journals, loading: contextLoading, error: contextError } = useContext(JournalContext);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobileNumber: "",
        country: "",
        message: "",
        photo: null,
        cv: null,

    });


    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // const [recaptchaToken, setRecaptchaToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    // const recaptchaRef = useRef(null);

    // Handle text input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle file input changes
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prev) => ({ ...prev, [name]: files[0] }));
    };

    // Handle reCAPTCHA verification
    // const handleRecaptchaChange = (token) => {
    //     setRecaptchaToken(token);
    // };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");

        // Validate required fields
        if (!formData.name || !formData.email || !formData.mobileNumber || !formData.cv) {
            setError("Please fill all required fields (Name, Email, Mobile Number, CV).");
            setLoading(false);
            return;
        }

        // Validate reCAPTCHA
        // if (!recaptchaToken) {
        //     setError("Please complete the reCAPTCHA verification.");
        //     setLoading(false);
        //     return;
        // }

        // Create FormData object
        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("mobileNumber", formData.mobileNumber);
        data.append("country", formData.country);
        data.append("message", formData.message);

        // data.append("recaptchaToken", recaptchaToken);
        if (formData.photo) data.append("photo", formData.photo);
        if (formData.cv) data.append("cv", formData.cv);

        try {
            const response = await fetch("https://iassrd.com:8081/api/v1/joinus", {
                method: "POST",
                body: data,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
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

            });
            // setRecaptchaToken(null);
            document.getElementById("photo").value = "";
            document.getElementById("cv").value = "";

            // recaptchaRef.current.reset();
        } catch (err) {
            setError("Failed to submit request: " + err.message);
        } finally {
            setLoading(false);
        }
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

            <main className={`min-h-screen lg:px-55 px-[80px] bg-gray-50 ${isSearchOpen ? 'mt-[160px]' : 'mt-[80px]'}`}>
                <div className="py-10">
                    {/* <div
                        className="w-auto h-48 bg-cover bg-right bg-no-repeat box-border"
                        style={{
                            backgroundImage: `url(${Space})`,
                        }}
                    > */}
                    <div className="flex items-center justify-between  h-full ">
                        <h1 className="text-4xl font-bold text-gray-800">Join as Ediotorial Board</h1>
                    </div>
                    {/* </div> */}

                    {/* Introduction Section */}
                    <section className="mt-8">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 font-IBM">

                            International Academy for Social Sciences
                            Research and Development (IASSRD)
                        </h2>
                        <p className="font-IBM text-gray-600 text-lg">
                            Research and Development (IASSRD) is a leading publisher of {journals.length} open-access, peer-reviewed journals in the fields of Social and Sciences. Our mission is to provide a platform for researchers, academics, and professionals to contribute to and benefit from the latest advancements in these dynamic fields.
                        </p>
                        <p className="font-IBM text-gray-600 text-lg">
                            We invite you to become part of our global community of scholars, researchers, and industry professionals. As a member of IASSRD, you will gain access to cutting-edge research, networking opportunities, and the ability to collaborate with top-tier experts worldwide.
                        </p>
                    </section>

                    <div className="flex items-center justify-between mt-4 mb-3 h-full ">
                        <h1 className="text-4xl font-bold text-gray-800">Why Join the IASSRD Editorial Board?</h1>
                    </div>
                    <p className="font-IBM text-gray-600 text-lg ">
                        Becoming a member of the Editorial Board at the International Academy for Social Sciences Research and Development (IASSRD) is a prestigious opportunity for scholars, researchers, and academicians passionate about advancing knowledge in the field of social sciences. Here's why you should consider joining:
                    </p>





                    <h2 className="text-xl font-bold mb-1 text-gray-800 font-IBM mt-6">

                        1. Academic Recognition
                    </h2>
                    <p class='text-gray-600 text-lg'>
                        Joining the IASSRD Editorial Board enhances your academic profile and professional credibility. Editorial board members are recognized for their expertise and leadership within their disciplines.
                    </p>

                    <h2 className="text-xl font-bold mb-1 text-gray-800 font-IBM mt-6">
                        2. Contribute to Research Excellence
                    </h2>
                    <p class='text-gray-600 text-lg'>
                        As a board member, you will play a vital role in maintaining the quality and integrity of scholarly publications. Your input helps ensure that only high-quality, peer-reviewed research reaches the academic community.
                    </p>

                    <h2 className="text-xl font-bold mb-1 text-gray-800 font-IBM mt-6">

                        3. Stay Updated With Latest Developments
                    </h2>
                    <p class='text-gray-600 text-lg'>
                        Engaging with cutting-edge research before it’s published allows you to stay informed about the latest theories, methodologies, and trends in the social sciences.
                    </p>

                    <h2 className="text-xl font-bold mb-1 text-gray-800 font-IBM mt-6">

                        4. Network With Global Experts

                    </h2>
                    <p class='text-gray-600 text-lg'>
                        IASSRD brings together a diverse, international group of researchers and thought leaders. As a board member, you'll have opportunities to connect and collaborate with professionals from around the world.
                    </p>
                    <h2 className="text-xl font-bold mb-1 text-gray-800 font-IBM mt-6">

                        5. Shape the Future of Social Science Research

                    </h2>
                    <p class='text-gray-600 text-lg'>
                        Your feedback and editorial guidance help shape the direction of emerging research. You’ll contribute to setting research agendas and encouraging innovative ideas.
                    </p>
                    <h2 className="text-xl font-bold mb-1 text-gray-800 font-IBM mt-6">

                        6. Enhance Your Editorial and Leadership Skills

                    </h2>
                    <p class='text-gray-600 text-lg'>
                        Serving on the board allows you to gain experience in the peer-review process, manuscript evaluation, and publication ethics—skills that are valuable for academic and professional development.
                    </p>
                    <h2 className="text-xl font-bold mb-1 text-gray-800 font-IBM mt-6">

                        7. Support Young Researchers

                    </h2>
                    <p class='text-gray-600 text-lg'>
                        Serving on the board allows you to gain experience in the peer-review process, manuscript evaluation, and publication ethics—skills that are valuable for academic and professional development.
                    </p>





                    {/* How to Apply Section */}
                    <section className="mt-8 font-IBM">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">How to Apply</h3>
                        <p className="font-IBM text-gray-600 text-lg">
                            You can submit your CV to{" "}
                            <a
                                href="mailto:iassrd.editor@gmail.com"
                                className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-300"
                                aria-label="Email iassrd.editor@gmail.com for Join Us "
                            >
                                iassrd.editor@gmail.com
                            </a>{" "}
                            for Join Us consideration, or you can apply via the Form below.
                        </p>
                    </section>

                    {/* Membership Application Form */}
                    <section className="mt-8 font-IBM" aria-labelledby="join Us">

                        <div className=" bg-white p-6 rounded-lg shadow-md font-IBM">
                            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
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
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
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
                                        <label
                                            htmlFor="mobileNumber"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
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
                                        <label
                                            htmlFor="country"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
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



                                    {/* Photo */}
                                    <div className="md:col-span-2">
                                        <label
                                            htmlFor="photo"
                                            className="block text-sm font-medium text-gray-600 mb-1"
                                        >
                                            Photo (Optional)
                                        </label>
                                        <input
                                            type="file"
                                            id="photo"
                                            name="photo"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            aria-required="false"
                                        />
                                    </div>

                                    {/* CV */}
                                    <div className="md:col-span-2">
                                        <label
                                            htmlFor="cv"
                                            className="block text-sm font-medium text-gray-600 mb-1"
                                        >
                                            CV *
                                        </label>
                                        <input
                                            type="file"
                                            id="cv"
                                            name="cv"
                                            accept=".pdf"
                                            onChange={handleFileChange}
                                            required
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            aria-required="true"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div className="md:col-span-2">
                                        <label
                                            htmlFor="message"
                                            className="block text-sm font-medium text-gray-600 mb-1"
                                        >
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

                                    {/* reCAPTCHA */}
                                    {/* <div className="md:col-span-2">
                                        <label
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                            id="recaptcha-label"
                                        >
                                            Verify You're Not a Robot *
                                        </label>
                                        <ReCAPTCHA
                                            ref={recaptchaRef}
                                            sitekey="6Lf4-FArAAAAAErrK38umnaISRK3yw9BEyjME_CF" // Replace with your actual reCAPTCHA site key
                                            onChange={handleRecaptchaChange}
                                            className="mt-2"
                                            aria-labelledby="recaptcha-label"
                                            aria-required="true"
                                        />
                                    </div> */}
                                </div>

                                {/* Submit Button */}
                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`font-IBM w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                                        aria-label="Submitting application"
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
            </main>
            <Footer />
        </>
    );
};

export default JoinUsFontend;