

    // import React, { useState } from "react";
    // import axios from "axios";
    // import { useNavigate } from "react-router-dom";

    // const BASE_URL = "https://iassrd.com:8081/api/v1";

    // const LoginScreen = () => {
    //     const [formData, setFormData] = useState({
    //         userName: "",
    //         userPassword: "",
    //     });
    //     const [error, setError] = useState("");
    //     const navigate = useNavigate();

    //     const handleChange = (e) => {
    //         const { name, value } = e.target;
    //         setFormData((prev) => ({
    //             ...prev,
    //             [name]: value,
    //         }));
    //     };

    //     const handleSubmit = async (e) => {
    //         e.preventDefault();

    //         if (!formData.userName.trim() || !formData.userPassword.trim()) {
    //             setError("Please fill in all fields");
    //             return;
    //         }

    //         setError("");

    //         try {
    //             // ✅ POST login API call
    //             const response = await axios.post(`${BASE_URL}/auth/login`, formData);
    //             const result = response.data.data[0];

    //             console.log("Login Success:", result);

    //             // Save token and user info
    //             localStorage.setItem("token", result.token);
    //             localStorage.setItem("user", JSON.stringify(result.user));

    //             // Redirect to dashboard
    //             navigate("/dashboard");
    //         } catch (err) {
    //             console.error("Login error:", err);
    //             setError(err.response?.data?.message || "Login failed");
    //         }
    //     };

    //     return (
    //         <div className="min-h-screen w-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    //             <div className="sm:mx-auto sm:w-full sm:max-w-md">
    //                 <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
    //                     Sign in to your account
    //                 </h2>
    //             </div>

    //             <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    //                 <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
    //                     {error && (
    //                         <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
    //                             <div className="flex">
    //                                 <div className="flex-shrink-0">
    //                                     <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    //                                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    //                                     </svg>
    //                                 </div>
    //                                 <div className="ml-3">
    //                                     <p className="text-sm text-red-700">{error}</p>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     )}

    //                     <form className="space-y-6" onSubmit={handleSubmit}>
    //                         <div>
    //                             <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
    //                                 Username
    //                             </label>
    //                             <div className="mt-1">
    //                                 <input
    //                                     id="userName"
    //                                     name="userName"
    //                                     type="text"
    //                                     required
    //                                     value={formData.userName}
    //                                     onChange={handleChange}
    //                                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //                                 />
    //                             </div>
    //                         </div>

    //                         <div>
    //                             <label htmlFor="userPassword" className="block text-sm font-medium text-gray-700">
    //                                 Password
    //                             </label>
    //                             <div className="mt-1">
    //                                 <input
    //                                     id="userPassword"
    //                                     name="userPassword"
    //                                     type="password"
    //                                     required
    //                                     value={formData.userPassword}
    //                                     onChange={handleChange}
    //                                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //                                 />
    //                             </div>
    //                         </div>

    //                         <div>
    //                             <button
    //                                 type="submit"
    //                                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //                             >
    //                                 Sign in
    //                             </button>
    //                         </div>
    //                     </form>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };

    // export default LoginScreen;


    // import React, { useState } from "react";
    // import axios from "axios";
    // import { useNavigate } from "react-router-dom";

    // const BASE_URL = "https://iassrd.com:8081/api/v1";

    // const LoginScreen = () => {
    //     const [formData, setFormData] = useState({
    //         userName: "",
    //         userPassword: "",
    //     });
    //     const [error, setError] = useState("");
    //     const navigate = useNavigate();

    //     const handleChange = (e) => {
    //         const { name, value } = e.target;
    //         setFormData((prev) => ({
    //             ...prev,
    //             [name]: value,
    //         }));
    //     };

    //     const handleSubmit = async (e) => {
    //         e.preventDefault();

    //         if (!formData.userName.trim() || !formData.userPassword.trim()) {
    //             setError("Please fill in all fields");
    //             return;
    //         }

    //         setError("");

    //         try {
    //             const response = await axios.post(`${BASE_URL}/auth/login`, formData);
    //             const result = response.data.data[0];

    //             console.log("Login Success:", result);

    //             localStorage.setItem("token", result.token);
    //             localStorage.setItem("user", JSON.stringify(result.user));

    //             navigate("/dashboard");
    //         } catch (err) {
    //             console.error("Login error:", err);
    //             setError(err.response?.data?.message || "Login failed");
    //         }
    //     };

    //     return (
    //         <div className="min-h-screen w-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
    //             {/* Animated Background */}
    //             <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 animate-gradient-bg"></div>
    //             {/* Overlay to soften the background */}
    //             <div className="absolute inset-0 bg-black opacity-30"></div>

    //             {/* Custom Styles for Animations */}
    //             <style>
    //                 {`
    //                     @keyframes gradientBG {
    //                         0% { background-position: 0% 50%; }
    //                         50% { background-position: 100% 50%; }
    //                         100% { background-position: 0% 50%; }
    //                     }
    //                     .animate-gradient-bg {
    //                         background-size: 200% 200%;
    //                         animation: gradientBG 15s ease infinite;
    //                     }
    //                     @keyframes fadeInSlideUp {
    //                         0% {
    //                             opacity: 0;
    //                             transform: translateY(20px);
    //                         }
    //                         100% {
    //                             opacity: 1;
    //                             transform: translateY(0);
    //                         }
    //                     }
    //                     .animate-fade-in-slide-up {
    //                         animation: fadeInSlideUp 0.8s ease-out forwards;
    //                     }
    //                     .hover-scale {
    //                         transition: transform 0.3s ease, background-color 0.3s ease;
    //                     }
    //                     .hover-scale:hover {
    //                         transform: scale(1.05);
    //                         background-color: #4f46e5; /* Slightly darker indigo */
    //                     }
    //                     .focus-glow {
    //                         transition: box-shadow 0.3s ease, border-color 0.3s ease;
    //                     }
    //                     .focus-glow:focus {
    //                         box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
    //                         border-color: #6366f1;
    //                     }
    //                 `}
    //             </style>

    //             <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
    //                 <h2 className="mt-6 text-center text-3xl font-extrabold text-white drop-shadow-lg">
    //                     Sign in to your account
    //                 </h2>
    //             </div>

    //             <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
    //                 <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 animate-fade-in-slide-up">
    //                     {error && (
    //                         <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
    //                             <div className="flex">
    //                                 <div className="flex-shrink-0">
    //                                     <svg
    //                                         className="h-5 w-5 text-red-500"
    //                                         xmlns="http://www.w3.org/2000/svg"
    //                                         viewBox="0 0 20 20"
    //                                         fill="currentColor"
    //                                     >
    //                                         <path
    //                                             fillRule="evenodd"
    //                                             d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
    //                                             clipRule="evenodd"
    //                                         />
    //                                     </svg>
    //                                 </div>
    //                                 <div className="ml-3">
    //                                     <p className="text-sm text-red-700">{error}</p>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     )}

    //                     <form className="space-y-6" onSubmit={handleSubmit}>
    //                         <div>
    //                             <label
    //                                 htmlFor="userName"
    //                                 className="block text-sm font-medium text-gray-700"
    //                             >
    //                                 Username
    //                             </label>
    //                             <div className="mt-1">
    //                                 <input
    //                                     id="userName"
    //                                     name="userName"
    //                                     type="text"
    //                                     required
    //                                     value={formData.userName}
    //                                     onChange={handleChange}
    //                                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm focus-glow"
    //                                 />
    //                             </div>
    //                         </div>

    //                         <div>
    //                             <label
    //                                 htmlFor="userPassword"
    //                                 className="block text-sm font-medium text-gray-700"
    //                             >
    //                                 Password
    //                             </label>
    //                             <div className="mt-1">
    //                                 <input
    //                                     id="userPassword"
    //                                     name="userPassword"
    //                                     type="password"
    //                                     required
    //                                     value={formData.userPassword}
    //                                     onChange={handleChange}
    //                                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm focus-glow"
    //                                 />
    //                             </div>
    //                         </div>

    //                         <div>
    //                             <button
    //                                 type="submit"
    //                                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover-scale"
    //                             >
    //                                 Sign in
    //                             </button>
    //                         </div>
    //                     </form>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };

    // export default LoginScreen;

    // import React, { useState } from "react";
    // import axios from "axios";
    // import { useNavigate } from "react-router-dom";

    // const BASE_URL = "https://iassrd.com:8081/api/v1";

    // const LoginScreen = () => {
    //     const [formData, setFormData] = useState({
    //         userName: "",
    //         userPassword: "",
    //     });
    //     const [error, setError] = useState("");
    //     const navigate = useNavigate();

    //     const handleChange = (e) => {
    //         const { name, value } = e.target;
    //         setFormData((prev) => ({
    //             ...prev,
    //             [name]: value,
    //         }));
    //     };

    //     const handleSubmit = async (e) => {
    //         e.preventDefault();

    //         if (!formData.userName.trim() || !formData.userPassword.trim()) {
    //             setError("Please fill in all fields");
    //             return;
    //         }

    //         setError("");

    //         try {
    //             const response = await axios.post(`${BASE_URL}/auth/login`, formData);
    //             const result = response.data.data[0];

    //             console.log("Login Success:", result);

    //             localStorage.setItem("token", result.token);
    //             localStorage.setItem("user", JSON.stringify(result.user));

    //             navigate("/dashboard");
    //         } catch (err) {
    //             console.error("Login error:", err);
    //             setError(err.response?.data?.message || "Login failed");
    //         }
    //     };

    //     // Generate 50 bubbles with random properties
    //     const bubbles = Array.from({ length: 100 }, (_, index) => {
    //         const size = Math.random() * 15 + 5; // Random size between 5px and 20px
    //         const left = Math.random() * 100; // Random horizontal position (0% to 100%)
    //         const animationDuration = Math.random() * 5 + 5; // Random duration between 5s and 10s
    //         const animationDelay = Math.random() * 5; // Random delay between 0s and 5s
    //         return (
    //             <div
    //                 key={index}
    //                 className="bubble"
    //                 style={{
    //                     width: `${size}px`,
    //                     height: `${size}px`,
    //                     left: `${left}%`,
    //                     animationDuration: `${animationDuration}s`,
    //                     animationDelay: `${animationDelay}s`,
    //                 }}
    //             ></div>
    //         );
    //     });

    //     return (
    //         <div className="min-h-screen w-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
    //             {/* Animated Background */}
    //             <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 animate-gradient-bg"></div>
    //             {/* Overlay to soften the background */}
    //             <div className="absolute inset-0 bg-black opacity-30"></div>
    //             {/* Bubble Effect */}
    //             <div className="absolute inset-0 pointer-events-none">
    //                 {bubbles}
    //             </div>

    //             {/* Custom Styles for Animations */}
    //             <style>
    //                 {`
    //                     @keyframes gradientBG {
    //                         0% { background-position: 0% 50%; }
    //                         50% { background-position: 100% 50%; }
    //                         100% { background-position: 0% 50%; }
    //                     }
    //                     .animate-gradient-bg {
    //                         background-size: 200% 200%;
    //                         animation: gradientBG 15s ease infinite;
    //                     }
    //                     @keyframes fadeInSlideUp {
    //                         0% {
    //                             opacity: 0;
    //                             transform: translateY(20px);
    //                         }
    //                         100% {
    //                             opacity: 1;
    //                             transform: translateY(0);
    //                         }
    //                     }
    //                     .animate-fade-in-slide-up {
    //                         animation: fadeInSlideUp 0.8s ease-out forwards;
    //                     }
    //                     @keyframes fadeIn {
    //                         0% { opacity: 0; }
    //                         100% { opacity: 1; }
    //                     }
    //                     .animate-fade-in-username {
    //                         animation: fadeIn 0.5s ease-out 0.3s forwards;
    //                         opacity: 0;
    //                     }
    //                     .animate-fade-in-password {
    //                         animation: fadeIn 0.5s ease-out 0.5s forwards;
    //                         opacity: 0;
    //                     }
    //                     @keyframes pulse {
    //                         0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7); }
    //                         70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
    //                         100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
    //                     }
    //                     .animate-pulse {
    //                         animation: pulse 2s infinite;
    //                     }
    //                     .hover-scale {
    //                         transition: transform 0.3s ease, background-color 0.3s ease;
    //                     }
    //                     .hover-scale:hover {
    //                         transform: scale(1.05);
    //                         background-color: #4f46e5;
    //                     }
    //                     @keyframes slideInLeft {
    //                         0% {
    //                             opacity: 0;
    //                             transform: translateX(-20px);
    //                         }
    //                         100% {
    //                             opacity: 1;
    //                             transform: translateX(0);
    //                         }
    //                     }
    //                     .animate-slide-in-left {
    //                         animation: slideInLeft 0.5s ease-out forwards;
    //                     }
    //                     .focus-glow {
    //                         transition: box-shadow 0.3s ease, border-color 0.3s ease;
    //                     }
    //                     .focus-glow:focus {
    //                         box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
    //                         border-color: #6366f1;
    //                     }
    //                     .bubble {
    //                         position: absolute;
    //                         background: rgba(255, 255, 255, 0.3);
    //                         border-radius: 50%;
    //                         bottom: -50px; /* Start below the viewport */
    //                         opacity: 0;
    //                         animation: bubbleFloat linear infinite;
    //                     }
    //                     @keyframes bubbleFloat {
    //                         0% {
    //                             opacity: 0;
    //                             transform: translateY(0) translateX(0);
    //                         }
    //                         10% {
    //                             opacity: 0.7;
    //                         }
    //                         50% {
    //                             transform: translateY(-50vh) translateX(5px); /* Slight wobble */
    //                         }
    //                         90% {
    //                             opacity: 0.7;
    //                         }
    //                         100% {
    //                             opacity: 0;
    //                             transform: translateY(-100vh) translateX(-5px); /* Move up and wobble */
    //                         }
    //                     }
    //                 `}
    //             </style>

    //             <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
    //                 <h2 className="mt-6 text-center text-3xl font-extrabold text-white drop-shadow-lg">
    //                     Sign in to your account
    //                 </h2>
    //             </div>

    //             <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
    //                 <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 animate-fade-in-slide-up">
    //                     {error && (
    //                         <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 animate-slide-in-left">
    //                             <div className="flex">
    //                                 <div className="flex-shrink-0">
    //                                     <svg
    //                                         className="h-5 w-5 text-red-500"
    //                                         xmlns="http://www.w3.org/2000/svg"
    //                                         viewBox="0 0 20 20"
    //                                         fill="currentColor"
    //                                     >
    //                                         <path
    //                                             fillRule="evenodd"
    //                                             d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
    //                                             clipRule="evenodd"
    //                                         />
    //                                     </svg>
    //                                 </div>
    //                                 <div className="ml-3">
    //                                     <p className="text-sm text-red-700">{error}</p>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     )}

    //                     <form className="space-y-6" onSubmit={handleSubmit}>
    //                         <div>
    //                             <label
    //                                 htmlFor="userName"
    //                                 className="block text-sm font-medium text-gray-700"
    //                             >
    //                                 Username
    //                             </label>
    //                             <div className="mt-1">
    //                                 <input
    //                                     id="userName"
    //                                     name="userName"
    //                                     type="text"
    //                                     required
    //                                     value={formData.userName}
    //                                     onChange={handleChange}
    //                                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm focus-glow animate-fade-in-username"
    //                                 />
    //                             </div>
    //                         </div>

    //                         <div>
    //                             <label
    //                                 htmlFor="userPassword"
    //                                 className="block text-sm font-medium text-gray-700"
    //                             >
    //                                 Password
    //                             </label>
    //                             <div className="mt-1">
    //                                 <input
    //                                     id="userPassword"
    //                                     name="userPassword"
    //                                     type="password"
    //                                     required
    //                                     value={formData.userPassword}
    //                                     onChange={handleChange}
    //                                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm focus-glow animate-fade-in-password"
    //                                 />
    //                             </div>
    //                         </div>

    //                         <div>
    //                             <button
    //                                 type="submit"
    //                                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover-scale animate-pulse"
    //                             >
    //                                 Sign in
    //                             </button>
    //                         </div>
    //                     </form>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };

    // export default LoginScreen;


    import React, { useState } from "react";
    import axios from "axios";
    import { useNavigate } from "react-router-dom";

    const BASE_URL = "https://iassrd.com:8081/api/v1";

    const LoginScreen = () => {
        const [formData, setFormData] = useState({
            userName: "",
            userPassword: "",
        });
        const [error, setError] = useState("");
        const navigate = useNavigate();

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        };

        const handleSubmit = async (e) => {
            e.preventDefault();

            if (!formData.userName.trim() || !formData.userPassword.trim()) {
                setError("Please fill in all fields");
                return;
            }

            setError("");

            try {
                const response = await axios.post(`${BASE_URL}/auth/login`, formData);
                const result = response.data.data[0];

                // console.log("Login Success:", result);

                localStorage.setItem("token", result.token);
                localStorage.setItem("user", JSON.stringify(result.user));

                navigate("/dashboard");
            } catch (err) {
                console.error("Login error:", err);
                setError(err.response?.data?.message || "Login failed");
            }
        };

        // Generate 50 bubbles with random properties
        const bubbleCount = 50;
        const bubbles = Array.from({ length: bubbleCount }, (_, index) => {
            const size = Math.random() * 15 + 5; // Random size between 5px and 20px
            const left = Math.random() * 100; // Random horizontal position (0% to 100%)
            const animationDuration = Math.random() * 5 + 5; // Random duration between 5s and 10s
            const animationDelay = Math.random() * 5; // Random delay between 0s and 5s
            return (
                <div
                    key={index}
                    className="bubble"
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        left: `${left}%`,
                        animationDuration: `${animationDuration}s`,
                        animationDelay: `${animationDelay}s`,
                    }}
                ></div>
            );
        });

        // Generate a single "gowri" text with random position
        const nameStyle = {
            position: "absolute",
            left: `${Math.random() * 100}%`, // Random horizontal position
            top: `${Math.random() * 100}%`, // Random vertical position
            transform: "translate(-50%, -50%)", // Center the text
        };

        return (
            <div className="min-h-screen w-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 animate-gradient-bg"></div>
                {/* Overlay to soften the background */}
                <div className="absolute inset-0 bg-black opacity-30"></div>
                {/* Bubble Effect */}
                <div className="absolute inset-0 pointer-events-none">
                    {bubbles}
                    {/* Render "gowri" text once for 50 bubbles */}
                    {/* <div className="name-text " style={nameStyle}>
                    Hi gowri.... :)
                    </div> */}
                </div>

                {/* Custom Styles for Animations */}
                <style>
                    {`
                        @keyframes gradientBG {
                            0% { background-position: 0% 50%; }
                            50% { background-position: 100% 50%; }
                            100% { background-position: 0% 50%; }
                        }
                        .animate-gradient-bg {
                            background-size: 200% 200%;
                            animation: gradientBG 15s ease infinite;
                        }
                        @keyframes fadeInSlideUp {
                            0% {
                                opacity: 0;
                                transform: translateY(20px);
                            }
                            100% {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }
                        .animate-fade-in-slide-up {
                            animation: fadeInSlideUp 0.8s ease-out forwards;
                        }
                        @keyframes fadeIn {
                            0% { opacity: 0; }
                            100% { opacity: 1; }
                        }
                        .animate-fade-in-username {
                            animation: fadeIn 0.5s ease-out 0.3s forwards;
                            opacity: 0;
                        }
                        .animate-fade-in-password {
                            animation: fadeIn 0.5s ease-out 0.5s forwards;
                            opacity: 0;
                        }
                        @keyframes pulse {
                            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7); }
                            70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
                            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
                        }
                        .animate-pulse {
                            animation: pulse 2s infinite;
                        }
                        .hover-scale {
                            transition: transform 0.3s ease, background-color 0.3s ease;
                        }
                        .hover-scale:hover {
                            transform: scale(1.05);
                            background-color: #4f46e5;
                        }
                        @keyframes slideInLeft {
                            0% {
                                opacity: 0;
                                transform: translateX(-20px);
                            }
                            100% {
                                opacity: 1;
                                transform: translateX(0);
                            }
                        }
                        .animate-slide-in-left {
                            animation: slideInLeft 0.5s ease-out forwards;
                        }
                        .focus-glow {
                            transition: box-shadow 0.3s ease, border-color 0.3s ease;
                        }
                        .focus-glow:focus {
                            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
                            border-color: #6366f1;
                        }
                        .bubble {
                            position: absolute;
                            background: rgba(255, 255, 255, 0.3);
                            border-radius: 50%;
                            bottom: -50px; /* Start below the viewport */
                            opacity: 0;
                            animation: bubbleFloat linear infinite;
                        }
                        @keyframes bubbleFloat {
                            0% {
                                opacity: 0;
                                transform: translateY(0) translateX(0);
                            }
                            10% {
                                opacity: 0.7;
                            }
                            50% {
                                transform: translateY(-50vh) translateX(5px); /* Slight wobble */
                            }
                            90% {
                                opacity: 0.7;
                            }
                            100% {
                                opacity: 0;
                                transform: translateY(-100vh) translateX(-5px); /* Move up and wobble */
                            }
                        }
                        .name-text {
                            font-size: 9px; /* Very small font size */
                            color: rgba(255, 255, 255, 0.9);
                            font-family: Arial, sans-serif;

                            animation: nameAppear 3s ease-in-out forwards;
                        }
                        @keyframes nameAppear {
                            0% {
                                opacity: 0;
                            }
                            20% {
                                opacity: 1;
                            }
                            80% {
                                opacity: 1;
                            }
                            100% {
                                opacity: 0;
                            }
                        }
                    `}
                </style>

                <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white drop-shadow-lg">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                    <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 animate-fade-in-slide-up">
                        {error && (
                            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 animate-slide-in-left">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg
                                            className="h-5 w-5 text-red-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="userName"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Username
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="userName"
                                        name="userName"
                                        type="text"
                                        required
                                        value={formData.userName}
                                        onChange={handleChange}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm focus-glow animate-fade-in-username"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="userPassword"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="userPassword"
                                        name="userPassword"
                                        type="password"
                                        required
                                        value={formData.userPassword}
                                        onChange={handleChange}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm focus-glow animate-fade-in-password"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover-scale animate-pulse"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };

    export default LoginScreen;