// // // import React, { useState, useRef, useEffect } from "react";

// // // const Navbar = () => {
// // //     const [isSearchOpen, setIsSearchOpen] = useState(false);
// // //     const searchRef = useRef(null);
// // //     const iconRef = useRef(null);

// // //     // Handle click outside to close search
// // //     useEffect(() => {
// // //         const handleClickOutside = (event) => {
// // //             if (
// // //                 searchRef.current &&
// // //                 !searchRef.current.contains(event.target) &&
// // //                 event.target !== iconRef.current
// // //             ) {
// // //                 setIsSearchOpen(false);
// // //             }
// // //         };
// // //         document.addEventListener("mousedown", handleClickOutside);
// // //         return () => document.removeEventListener("mousedown", handleClickOutside);
// // //     }, []);

// // //     return (
// // //         <>
// // //             <div className="w-full h-[90px] px-[80px] bg-navbar-gradient text-white flex items-center justify-between fixed top-0 left-0 z-50">
// // //                 {/* Logo or Brand Name */}
// // //                 <div className="text-xl font-bold">
// // //                     International Academy for Social Sciences <br /> Research and Development (IASSRD)
// // //                 </div>

// // //                 {/* Navigation Links */}
// // //                 <nav className="flex space-x-6">
// // //                     <a href="#home" className="hover:text-green-500">Home</a>
// // //                     <a href="#research" className="hover:text-green-500">Research</a>
// // //                     <a href="#publications" className="hover:text-green-500">Publications</a>
// // //                     <a href="#about" className="hover:text-green-500">About</a>
// // //                     <a href="#contact" className="hover:text-green-500">Contact</a>
// // //                 </nav>

// // //                 {/* Search Icon / Close Button */}
// // //                 <div
// // //                     ref={iconRef}
// // //                     className="cursor-pointer relative"
// // //                     onClick={() => setIsSearchOpen(!isSearchOpen)}
// // //                 >
// // //                     {isSearchOpen ? (
// // //                         <svg
// // //                             xmlns="http://www.w3.org/2000/svg"
// // //                             className="h-6 w-6"
// // //                             fill="none"
// // //                             viewBox="0 0 24 24"
// // //                             stroke="currentColor"
// // //                         >
// // //                             <path
// // //                                 strokeLinecap="round"
// // //                                 strokeLinejoin="round"
// // //                                 strokeWidth={2}
// // //                                 d="M6 18L18 6M6 6l12 12"
// // //                             />
// // //                         </svg>
// // //                     ) : (
// // //                         <svg
// // //                             xmlns="http://www.w3.org/2000/svg"
// // //                             className="h-6 w-6"
// // //                             fill="none"
// // //                             viewBox="0 0 24 24"
// // //                             stroke="currentColor"
// // //                         >
// // //                             <path
// // //                                 strokeLinecap="round"
// // //                                 strokeLinejoin="round"
// // //                                 strokeWidth={2}
// // //                                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
// // //                             />
// // //                         </svg>
// // //                     )}
// // //                 </div>
// // //             </div>

// // //             {/* Search Input (Expanded View) */}
// // //             <div
// // //                 ref={searchRef}
// // //                 className={`fixed top-[90px] px-[80px] bgnavbar-search w-full  text-black z-40 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
// // //                     isSearchOpen ? "max-h-[90px] py-5" : "max-h-0 p-0"
// // //                 }`}
// // //             >
// // //                 <div className=" h-10 flex flex-col justify-center">
// // //                     <input
// // //                         type="text"
// // //                         placeholder="Search IASSRD..."
// // //                         className="w-full p-2 border border-gray-300 rounded mb-2"
// // //                         onKeyPress={(e) => {
// // //                             if (e.key === "Enter") setIsSearchOpen(false);
// // //                         }}
// // //                     />

// // //                 </div>
// // //             </div>
// // //         </>
// // //     );
// // // };

// // // export default Navbar;




// // import React, { useState, useRef, useEffect } from "react";
// // import { FiSearch, FiX } from "react-icons/fi"; // Import icons from react-icons

// // const Navbar = () => {
// //   const [isSearchOpen, setIsSearchOpen] = useState(false);
// //   const searchRef = useRef(null);
// //   const iconRef = useRef(null);

// //   // Handle click outside to close search
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (
// //         searchRef.current &&
// //         !searchRef.current.contains(event.target) &&
// //         iconRef.current &&
// //         !iconRef.current.contains(event.target)
// //       ) {
// //         setIsSearchOpen(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   // Handle close action with a slight delay to prevent immediate reopen
// //   const handleCloseSearch = (event) => {
// //     event.stopPropagation(); // Prevent event from bubbling to the icon's onClick
// //     setTimeout(() => setIsSearchOpen(false), 100); // Delay to avoid rapid toggle
// //   };

// //   return (
// //     <>
// //       <div className="w-full h-[90px] px-[80px] bg-navbar-gradient text-white flex items-center justify-between fixed top-0 left-0 z-50">
// //         {/* Logo or Brand Name */}
// //         <div className="text-2xl font-bold">
// //           International Academy for Social Sciences <br /> Research and Development (IASSRD)
// //         </div>

// //         {/* Navigation Links */}
// //         <nav className="flex space-x-6">
// //           <a href="#home" className="hover:text-green-500">Home</a>
// //           <a href="#research" className="hover:text-green-500">Research</a>
// //           <a href="#publications" className="hover:text-green-500">Publications</a>
// //           <a href="#about" className="hover:text-green-500">About</a>
// //           <a href="#contact" className="hover:text-green-500">Contact</a>
// //         </nav>

// //         {/* Search Icon / Close Button */}
// //         <div
// //           ref={iconRef}
// //           className="cursor-pointer relative"
// //           onClick={() => setIsSearchOpen(!isSearchOpen)}
// //         >
// //           {isSearchOpen ? (
// //             <FiX className="h-6 w-6" />
// //           ) : (
// //             <FiSearch className="h-6 w-6" />
// //           )}
// //         </div>
// //       </div>

// //       {/* Search Input (Expanded View) */}
// //       <div
// //         ref={searchRef}
// //         className={`fixed top-[90px] px-[80px] bg-navbar-search w-full text-black z-40 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
// //           isSearchOpen ? "max-h-[90px] py-5" : "max-h-0 p-0"
// //         }`}
// //       >
// //         <div className="h-10 flex flex-col justify-center">
// //           <input
// //             type="text"
// //             placeholder="Search IASSRD..."
// //             className="w-full p-2 border border-gray-300 rounded mb-2"
// //             onKeyPress={(e) => {
// //               if (e.key === "Enter") {
// //                 e.stopPropagation(); // Prevent event from bubbling
// //                 handleCloseSearch(e);
// //               }
// //             }}
// //           />

// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default Navbar;



// // import React, { useRef, useEffect } from "react";
// // import { FiSearch, FiX } from "react-icons/fi";
// // import { useLocation } from "react-router-dom";
// // import Iassrdlogo from '../../assets/iassrdlogo.png'

// // const Navbar = ({ isSearchOpen, setIsSearchOpen }) => {
// //     const searchRef = useRef(null);
// //     const iconRef = useRef(null);

// //     const location = useLocation()
// //     console.log(location.pathname)



// //     const pathName = (path) => {

// //         return location.pathname === path || location.pathname.startsWith(path + "/");

// //     }
// //     // Handle click outside to close search
// //     useEffect(() => {
// //         const handleClickOutside = (event) => {
// //             if (
// //                 searchRef.current &&
// //                 !searchRef.current.contains(event.target) &&
// //                 iconRef.current &&
// //                 !iconRef.current.contains(event.target)
// //             ) {
// //                 setIsSearchOpen(false);
// //             }
// //         };
// //         document.addEventListener("mousedown", handleClickOutside);
// //         return () => document.removeEventListener("mousedown", handleClickOutside);
// //     }, [setIsSearchOpen]);

// //     // Handle close action with a slight delay to prevent immediate reopen
// //     const handleCloseSearch = (event) => {
// //         event.stopPropagation();
// //         setTimeout(() => setIsSearchOpen(false), 100);
// //     };

// //     return (
// //         <>
// //             <div className="w-full h-[90px] px-[80px] bg-navbar-gradient text-white flex items-center justify-between fixed top-0 left-0 z-50">
// //                 {/* Logo or Brand Name */}
// //                 <div className="text-2xl font-bold flex items-center justify-between space-x-2  ">
// //                     <div>
// //                         <a href="/">

// //                             <img class='object-contain h-20 w-[90px] rounded' src={Iassrdlogo} alt='iassrd Logo'/>
// //                         </a>
// //                     </div>
// //                     <div >

// //                         International Academy for Social Sciences <br /> Research and Development (IASSRD)
// //                     </div>
// //                 </div>

// //                 {/* Navigation Links */}
// //                 <nav className="flex items-center  space-x-6">
// //                     {/* <a href="#home" className={`hover:text-green-500  ${pathName('/') ? 'text-green-400 border-t-2 border-green-500' : 'null'}`}>Home</a> */}
// //                     <a href="/journal" className={`hover:text-green-500  ${pathName('/journal') ? 'text-green-400 border-t-2 border-green-500' : 'null'}`}>Journals</a>
// //                     <a href="#publications" className={`hover:text-green-500  ${pathName('/publication') ? 'text-green-400 border-t-2 border-green-500' : 'null'}`}>Publications</a>
// //                     <a href="#about" className={`hover:text-green-500  ${pathName('/about') ? 'text-green-400 border-t-2 border-green-500' : 'null'}`}>About</a>
// //                     <a href="#contact" className={`hover:text-green-500  ${pathName('/contact') ? 'text-green-400 border-t-2 border-green-500' : 'null'}`}>Contact</a>
// //                 </nav>

// //                 {/* Search Icon / Close Button */}
// //                 <div
// //                     ref={iconRef}
// //                     className="cursor-pointer relative"
// //                     onClick={() => setIsSearchOpen(!isSearchOpen)}
// //                     aria-label={isSearchOpen ? "Close search" : "Open search"}
// //                     aria-expanded={isSearchOpen}
// //                 >
// //                     {isSearchOpen ? (
// //                         <FiX className="h-6 w-6 text-red-600" />
// //                     ) : (
// //                         <FiSearch className="h-6 w-6" />
// //                     )}
// //                 </div>
// //             </div>

// //             {/* Search Input (Expanded View) */}
// //             <div
// //                 ref={searchRef}
// //                 className={`fixed top-[90px] px-[80px] bg-navbar-search w-full text-black z-40 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isSearchOpen ? "max-h-[90px] py-7" : "max-h-0 p-0"
// //                     }`}
// //             >
// //                 <div className="h-10 flex flex-row items-center gap-4">
// //                     <div className="relative flex-1">
// //                         <input
// //                             type="text"
// //                             placeholder="Search IASSRD..."
// //                             className="w-full p-2 pl-4 pr-10 border border-gray-500 rounded"
// //                             aria-label="Search IASSRD"
// //                             onKeyPress={(e) => {
// //                                 if (e.key === "Enter") {
// //                                     e.stopPropagation();
// //                                     handleCloseSearch(e);
// //                                 }
// //                             }}
// //                         />
// //                         <FiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-700" />
// //                     </div>
// //                 </div>
// //             </div>
// //         </>
// //     );
// // };

// // export default Navbar;










// // import React, { useRef, useEffect } from "react";
// // import { FiSearch, FiX } from "react-icons/fi";
// // import { useLocation } from "react-router-dom";
// // import Iassrdlogo from '../../assets/iassrdlogo.png'
// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // const Navbar = ({ isSearchOpen, setIsSearchOpen }) => {
// //     const searchRef = useRef(null);
// //     const iconRef = useRef(null);
// //     const navigate = useNavigate();


// //     const [searchQuery, setSearchQuery] = useState("");


// //     const location = useLocation()
// //     console.log(location.pathname)

// //     // console.log(searchQuery)

// //     const pathName = (path) => {

// //         return location.pathname === path || location.pathname.startsWith(path + "/");

// //     }
// //     // Handle click outside to close search
// //     useEffect(() => {
// //         const handleClickOutside = (event) => {
// //             if (
// //                 searchRef.current &&
// //                 !searchRef.current.contains(event.target) &&
// //                 iconRef.current &&
// //                 !iconRef.current.contains(event.target)
// //             ) {
// //                 setIsSearchOpen(false);
// //             }
// //         };
// //         document.addEventListener("mousedown", handleClickOutside);
// //         return () => document.removeEventListener("mousedown", handleClickOutside);
// //     }, [setIsSearchOpen]);

// //     // Handle close action with a slight delay to prevent immediate reopen
// //     const handleCloseSearch = (event) => {
// //         event.stopPropagation();
// //         setTimeout(() => setIsSearchOpen(false), 100);
// //     };

// //     const handleSearch = (e) => {
// //         e.preventDefault();
// //         if (searchQuery.trim()) {
// //             navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
// //             setIsDropdownOpen(false);
// //             setIsMenuOpen(false);
// //         }
// //     };

// //     return (
// //         <>
// //             <div className="w-full h-[90px] px-[80px] bg-navbar-gradient text-white flex items-center justify-between fixed top-0 left-0 z-50">
// //                 {/* Logo or Brand Name */}
// //                 <div className="text-2xl font-bold flex items-center justify-between space-x-2  ">
// //                     <div>
// //                         <a href="/">

// //                             <img class='object-contain h-20 w-24 rounded' src={Iassrdlogo} alt='iassrd Logo' />
// //                         </a>
// //                     </div>
// //                     <div >

// //                         International Academy for Social Sciences <br /> Research and Development (IASSRD)
// //                     </div>
// //                 </div>

// //                 {/* Navigation Links */}
// //                 <nav className="flex items-center  space-x-6">
// //                     {/* <a href="#home" className={`hover:text-green-500  ${pathName('/') ? 'text-green-400 border-t-2 border-green-500' : 'null'}`}>Home</a> */}
// //                     <a href="/about" className={`hover:text-green-500  ${pathName('/about') ? 'text-green-400 border-t-2 border-green-500' : 'null'}`}>About</a>
// //                     <a href="/journal" className={`hover:text-green-500  ${pathName('/journal') ? 'text-green-400 border-t-2 border-green-500' : 'null'}`}>Journals</a>
// //                     <a href="/apcs" className={`hover:text-green-500  ${pathName('/apc') ? 'text-green-400 border-t-2 border-green-500' : 'null'}`}>APC</a>
// //                     <a href="/fellowmembers" className={`hover:text-green-500  ${pathName('/members') ? 'text-green-400 border-t-2 border-green-500' : 'null'}`}>Members</a>
// //                     <a href="/contactus" className={`hover:text-green-500  ${pathName('/contactus') ? 'text-green-400 border-t-2 border-green-500' : 'null'}`}>Contact</a>
// //                 </nav>

// //                 {/* Search Icon / Close Button */}
// //                 <div
// //                     ref={iconRef}
// //                     className="cursor-pointer relative"
// //                     onClick={() => setIsSearchOpen(!isSearchOpen)}
// //                     aria-label={isSearchOpen ? "Close search" : "Open search"}
// //                     aria-expanded={isSearchOpen}
// //                     value={searchQuery}
// //                     onChange={(e) => setSearchQuery(e.target.value)}
// //                     autoFocus
// //                 >
// //                     {isSearchOpen ? (
// //                         <FiX className="h-6 w-6 text-red-600" />
// //                     ) : (
// //                         <FiSearch className="h-6 w-6" />
// //                     )}
// //                 </div>
// //             </div>

// //             {/* Search Input (Expanded View) */}
// //             <div
// //                 ref={searchRef}
// //                 className={`fixed top-[90px] px-[80px] bg-navbar-search w-full text-black z-40 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isSearchOpen ? "max-h-[90px] py-7" : "max-h-0 p-0"
// //                     }`}
// //             >
// //                 <div className="h-10 flex flex-row items-center gap-4">
// //                     <form
// //                         onSubmit={handleSearch}
// //                         className="relative flex-1">
// //                         <input
// //                             type="text"
// //                             placeholder="Search IASSRD..."
// //                             className="w-full p-2 pl-4 pr-10 border border-gray-500 rounded"
// //                             aria-label="Search IASSRD"
// //                         onKeyPress={(e) => {
// //                             if (e.key === "Enter") {
// //                                 e.stopPropagation();
// //                                 handleCloseSearch(e);
// //                             }
// //                         }}
// //                         />
// //                         <FiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-700" />
// //                     </form>
// //                 </div>
// //             </div>
// //         </>
// //     );
// // };

// // export default Navbar;





// import React, { useRef, useEffect, useState } from "react";
// import { FiSearch, FiX } from "react-icons/fi";
// import { useLocation, useNavigate } from "react-router-dom";
// import Iassrdlogo from '../../assets/iassrdlogo.png';

// const Navbar = ({ isSearchOpen, setIsSearchOpen }) => {
//     const searchRef = useRef(null);
//     const iconRef = useRef(null);
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [searchQuery, setSearchQuery] = useState("");

//     // Determine if a link is active based on the current path
//     const isPathActive = (path) => {
//         if (path === "/") {
//             return location.pathname === "/";
//         }
//         return location.pathname === path || location.pathname.startsWith(`${path}/`);
//     };

//     // Handle click outside to close search
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (
//                 searchRef.current &&
//                 !searchRef.current.contains(event.target) &&
//                 iconRef.current &&
//                 !iconRef.current.contains(event.target)
//             ) {
//                 setIsSearchOpen(false);
//                 setSearchQuery(""); // Clear search query on close
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, [setIsSearchOpen]);

//     // Handle search form submission
//     const handleSearch = (e) => {
//         e.preventDefault();
//         if (searchQuery.trim()) {
//             navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
//             setIsSearchOpen(false);
//             setSearchQuery("");
//         }
//     };

//     // Toggle search input visibility
//     const toggleSearch = () => {
//         setIsSearchOpen(!isSearchOpen);
//         if (isSearchOpen) {
//             setSearchQuery(""); // Clear query when closing
//         }
//     };

//     return (
//         <>
//             <div className="w-full h-[90px] px-[80px] bg-navbar-gradient text-white flex items-center justify-between fixed top-0 left-0 z-50">
//                 {/* Logo and Branding */}
//                 <div className="flex items-center space-x-4">
//                     <a href="/">
//                         <img
//                             className="object-contain h-20 w-24 rounded"
//                             src={Iassrdlogo}
//                             alt="IASSRD Logo"
//                         />
//                     </a>
//                     <div className="text-2xl font-bold">
//                         International Academy for Social Sciences <br />
//                         Research and Development (IASSRD)
//                     </div>
//                 </div>

//                 {/* Navigation Links */}
//                 <nav className="flex items-center space-x-6">
//                     {/* <a
//             href="/"
//             className={`hover:text-green-500 ${isPathActive("/") ? "text-green-400 border-t-2 border-green-500" : ""}`}
//           >
//             Home
//           </a> */}
//                     <a
//                         href="/about-us"
//                         className={`hover:text-green-500 ${isPathActive("/about") ? "text-green-400 border-t-2 border-green-500" : ""}`}
//                     >
//                         About
//                     </a>
//                     <a
//                         href="/journal"
//                         className={`hover:text-green-500 ${isPathActive("/journal") ? "text-green-400 border-t-2 border-green-500" : ""}`}
//                     >
//                         Journals
//                     </a>
//                     <a
//                         href="/apcs"
//                         className={`hover:text-green-500 ${isPathActive("/apcs") ? "text-green-400 border-t-2 border-green-500" : ""}`}
//                     >
//                         APC
//                     </a>
//                     <a
//                         href="/fellowmembers"
//                         className={`hover:text-green-500 ${isPathActive("/fellowmembers") ? "text-green-400 border-t-2 border-green-500" : ""}`}
//                     >
//                         Members
//                     </a>
//                     <a
//                         href="/contactus"
//                         className={`hover:text-green-500 ${isPathActive("/contactus") ? "text-green-400 border-t-2 border-green-500" : ""}`}
//                     >
//                         Contact
//                     </a>
//                 </nav>

//                 {/* Search Icon / Close Button */}
//                 <div
//                     ref={iconRef}
//                     className="cursor-pointer"
//                     onClick={toggleSearch}
//                     aria-label={isSearchOpen ? "Close search" : "Open search"}
//                     aria-expanded={isSearchOpen}
//                 >
//                     {isSearchOpen ? (
//                         <FiX className="h-6 w-6 text-red-600" />
//                     ) : (
//                         <FiSearch className="h-6 w-6" />
//                     )}
//                 </div>
//             </div>

//             {/* Search Input (Expanded View) */}
//             <div
//                 ref={searchRef}
//                 className={`fixed top-[90px] px-[80px] bg-navbar-search w-full text-black z-40 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isSearchOpen ? "max-h-[90px] py-7" : "max-h-0 p-0"
//                     }`}
//             >
//                 <form onSubmit={handleSearch} className="relative flex-1">
//                     <input
//                         type="text"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         placeholder="Search IASSRD..."
//                         className="w-full p-2 pl-4 pr-10 border border-gray-500 rounded"
//                         aria-label="Search IASSRD"
//                         autoFocus={isSearchOpen}
//                     />
//                     <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
//                         <FiSearch className="h-6 w-6 text-gray-700" />
//                     </button>
//                 </form>
//             </div>
//         </>
//     );
// };

// export default Navbar;


import React, { useRef, useEffect, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import Iassrdlogo from '../../assets/iassrdlogo.png';

const Navbar = ({ isSearchOpen, setIsSearchOpen }) => {
    const searchRef = useRef(null);
    const iconRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState("");

    // Determine if a link is active based on the current path
    const isPathActive = (path) => {
        if (path === "/") {
            return location.pathname === "/";
        }
        return location.pathname === path || location.pathname.startsWith(`${path}/`);
    };

    // Handle click outside to close search
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target) &&
                iconRef.current &&
                !iconRef.current.contains(event.target)
            ) {
                setIsSearchOpen(false);
                setSearchQuery(""); // Clear search query on close
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setIsSearchOpen]);

    // Handle search form submission
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
            setSearchQuery("");
        }
    };

    // Toggle search input visibility
    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (isSearchOpen) {
            setSearchQuery(""); // Clear query when closing
        }
    };

    return (
        <>
            <div className="w-full h-[90px] px-[80px] bg-navbar-gradient text-white flex items-center justify-between fixed top-0 left-0 z-50">
                {/* Logo and Branding */}
                <div className="flex items-center space-x-4">
                    <a href="/">
                        <img
                            className="object-contain h-20 w-24 rounded"
                            src={Iassrdlogo}
                            alt="IASSRD Logo"
                        />
                    </a>
                    <div className="text-2xl font-bold">
                        International Academy for Social Sciences <br />
                        Research and Development (IASSRD)
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex items-center space-x-6">
                    <a
                        href="/about-us"
                        className={`hover:text-green-500 hover:border-t-2 border-green-400 ${isPathActive("/about-us") ? "text-green-400 border-t-2 border-green-500" : ""}`}
                    >
                        About
                    </a>
                    <a
                        href="/journal"
                        className={`hover:text-green-500 hover:border-t-2 border-green-400 ${isPathActive("/journal") ? "text-green-400 border-t-2 border-green-500" : ""}`}
                    >
                        Journals
                    </a>
                    <a
                        href="/apcs"
                        className={`hover:text-green-500 hover:border-t-2 border-green-400 ${isPathActive("/apcs") ? "text-green-400 border-t-2 border-green-500" : ""}`}
                    >
                        APC
                    </a>
                    <a
                        href="/fellowmembers"
                        className={`hover:text-green-500 hover:border-t-2 border-green-400 ${isPathActive("/fellowmembers") ? "text-green-400 border-t-2 border-green-500" : ""}`}
                    >
                        Members
                    </a>
                    <a
                        href="/contactus"
                        className={`hover:text-green-500 hover:border-t-2 border-green-400 ${isPathActive("/contactus") ? "text-green-400 border-t-2 border-green-500" : ""}`}
                    >
                        Contact
                    </a>
                    {/* <button
                        onClick={() => navigate("/submitarticle")}
                        className={`bg-white text-green-400 border-2 border-green-500 hover:bg-red-500 hover:text-white ${isPathActive("/submitarticle") ? "text-green-400 border-t-2 border-green-500" : ""}`}
                    >
                        Submit Article
                    </button> */}

                    <button
                        onClick={() => navigate("/submitarticle")}
                        className={`bg-white text-green-700 font-semibold py-2 px-4 rounded hover:bg-red-600 hover:text-white transition-colors duration-300 ${isPathActive("/submitarticle") ? "border-t-2 border-green-500" : ""}`}
                    >
                        Submit Your Article
                    </button>

                </nav>

                {/* Search Icon / Close Button */}
                <div
                    ref={iconRef}
                    className="cursor-pointer"
                    onClick={toggleSearch}
                    aria-label={isSearchOpen ? "Close search" : "Open search"}
                    aria-expanded={isSearchOpen}
                >
                    {isSearchOpen ? (
                        <FiX className="h-6 w-6 text-red-600" />
                    ) : (
                        <FiSearch className="h-6 w-6" />
                    )}
                </div>
            </div>

            {/* Search Input (Expanded View) */}
            <div
                ref={searchRef}
                className={`fixed top-[90px] px-[80px] bg-navbar-search w-full text-black z-40 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isSearchOpen ? "max-h-[90px] py-7" : "max-h-0 p-0"
                    }`}
            >
                <form onSubmit={handleSearch} className="relative flex-1">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search IASSRD..."
                        className="w-full p-2 pl-4 pr-10 border border-gray-500 rounded"
                        aria-label="Search IASSRD"
                        autoFocus={isSearchOpen}
                    />
                    <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <FiSearch className="h-6 w-6 text-gray-700" />
                    </button>
                </form>
            </div>
        </>
    );
};

export default Navbar;