// import React, { useState, useEffect } from "react";
// import { X, Home, Users, LogOut, Newspaper, ChevronDown, ChevronUp } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";

// const Sidebar = () => {
//     const [user, setUser] = useState(null);
//     const [openDropdown, setOpenDropdown] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const navigate = useNavigate();
//     const location = useLocation();

//     // Retrieve user data from localStorage on mount
//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         if (storedUser) {
//             setUser(JSON.parse(storedUser));
//         } else {
//             navigate("/login");
//         }
//     }, [navigate]);

//     // Handle logout
//     const handleLogout = () => {
//         localStorage.removeItem("user");
//         navigate("/login");
//     };

//     // Toggle dropdown
//     const toggleDropdown = (menu) => {
//         setOpenDropdown(openDropdown === menu ? null : menu);
//     };

//     const isAdmin = user?.role === "ADMIN" || user?.role === "Admin" || user?.role === "admin";

//     // Define menu items with dropdowns
//     const menuItems = [
//         { path: "/dashboard", label: "Home", icon: <Home size={20} className="mr-3" />, onClick: () => navigate("/dashboard") },
//         ...(isAdmin
//             ? [
//                 {
//                     path: "/usermanagement",
//                     label: "User Management",
//                     icon: <Users size={20} className="mr-3" />,
//                     onClick: () => navigate("/usermanagement"),
//                 },
//             ]
//             : []),
//         {
//             label: "Journal Info",
//             icon: <Newspaper size={20} className="mr-3" />,
//             dropdown: [
//                 { path: "/disciplines", label: "Disciplines", onClick: () => navigate("/disciplines"), relatedPaths: ["/addnewdisciplines"] },
//                 { path: "/journals", label: "Journals", onClick: () => navigate("/journals") },
//                 { path: "/journalissues", label: "Journal Issues", onClick: () => navigate("/journalissues") },
//                 { path: "/editorial", label: "Editorial Board", onClick: () => navigate("/editorial") },
//                 { path: "/apc", label: "APC", onClick: () => navigate("/apc") },
//             ],
//         },
//         {
//             label: "Articles",
//             icon: <Newspaper size={20} className="mr-3" />,
//             dropdown: [
//                 { path: "/affiliation", label: "Affiliations", onClick: () => navigate("/affiliation") },
//                 { path: "/author", label: "Author", onClick: () => navigate("/author") },
//                 { path: "/articles", label: "Articles", onClick: () => navigate("/articles") },
//             ],
//         },
//         { path: "/memberships", label: "Membership", icon: <Users size={20} className="mr-3" />, onClick: () => navigate("/memberships") },
//         { path: "/login", label: "Logout", icon: <LogOut size={20} className="mr-3" />, onClick: handleLogout },
//     ];

//     // Filter menu items based on search term
//     const filteredMenu = menuItems.filter((item) => {
//         if (item.label.toLowerCase().includes(searchTerm.toLowerCase())) return true;
//         if (item.dropdown) {
//             return item.dropdown.some((subItem) =>
//                 subItem.label.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }
//         return false;
//     });

//     // Determine if a menu item or its sub-item is active
//     const isItemActive = (item) => {
//         if (item.path && location.pathname === item.path) return true;
//         if (item.dropdown) {
//             return item.dropdown.some(
//                 (subItem) =>
//                     location.pathname === subItem.path ||
//                     (subItem.relatedPaths && subItem.relatedPaths.includes(location.pathname))
//             );
//         }
//         return false;
//     };

//     return (
//         <div className="fixed inset-y-0 left-0 top-15 w-64 bg-gradient-to-b from-stone-900 to-cyan-950 text-white shadow-lg z-30 flex flex-col">
//             <div className="p-4 border-b border-blue-400">
//                 <h2 className="text-xl font-semibold tracking-wide">Dashboard</h2>
//                 <button className="md:hidden absolute top-4 right-4">
//                     <X size={24} />
//                 </button>
//             </div>
//             <div className="px-4 pt-4">
//                 <input
//                     type="text"
//                     placeholder="Search..."
//                     className="w-full px-3 py-2 bg-gray-800 text-white border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//             </div>
//             <nav className="flex-grow mt-4 overflow-y-auto">
//                 <ul className="space-y-1">
//                     {filteredMenu.map((item) => (
//                         <li key={item.label}>
//                             {item.dropdown ? (
//                                 <>
//                                     <div
//                                         className={`flex items-center justify-between px-4 py-3 mx-2 rounded-lg cursor-pointer transition-all duration-200 ${isItemActive(item)
//                                             ? "bg-red-400 text-white font-semibold shadow-md"
//                                             : "text-blue-100 hover:bg-red-500 hover:text-white"
//                                             }`}
//                                         onClick={() => toggleDropdown(item.label)}
//                                     >
//                                         <div className="flex items-center">
//                                             {item.icon}
//                                             {item.label}
//                                         </div>
//                                         {openDropdown === item.label ? (
//                                             <ChevronUp size={20} />
//                                         ) : (
//                                             <ChevronDown size={20} />
//                                         )}
//                                     </div>
//                                     {openDropdown === item.label && (
//                                         <ul className="ml-6 space-y-1">
//                                             {item.dropdown
//                                                 .filter((subItem) =>
//                                                     subItem.label.toLowerCase().includes(searchTerm.toLowerCase())
//                                                 )
//                                                 .map((subItem) => (
//                                                     <li key={subItem.label}>
//                                                         <div
//                                                             className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${location.pathname === subItem.path ||
//                                                                 (subItem.relatedPaths &&
//                                                                     subItem.relatedPaths.includes(location.pathname))
//                                                                 ? "text-blue-400  font-semibold shadow-md"
//                                                                 : " hover:bg-red-500 hover:text-white"
//                                                                 }`}
//                                                             onClick={subItem.onClick}
//                                                         >
//                                                             {subItem.label}
//                                                         </div>
//                                                     </li>
//                                                 ))}
//                                         </ul>
//                                     )}
//                                 </>
//                             ) : (
//                                 <div
//                                     className={`flex items-center px-4 py-3 mx-2 rounded-lg cursor-pointer transition-all duration-200 ${isItemActive(item)
//                                         ? "bg-red-400 text-white font-semibold shadow-md"
//                                         : "text-blue-100 hover:bg-red-500 hover:text-white"
//                                         }`}
//                                     onClick={item.onClick}
//                                 >
//                                     {item.icon}
//                                     {item.label}
//                                 </div>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             </nav>
//             <div className="p-4 border-t border-blue-400 text-center text-blue-200">
//                 <small>© 2025 Your Company</small>
//             </div>
//             <style>
//                 {`
//                 nav {
//                     overflow-y: auto;
//                     scrollbar-width: none; /* Firefox */
//                     -ms-overflow-style: none; /* IE and Edge */
//                 }
//                 nav::-webkit-scrollbar {
//                     width: 0; /* Chrome, Safari, Edge */
//                 }
//                 nav:hover {
//                     scrollbar-width: thin; /* Firefox */
//                     scrollbar-color: rgba(255, 255, 255, 0.4) transparent; /* Firefox */
//                 }
//                 nav:hover::-webkit-scrollbar {
//                     width: 6px; /* Chrome, Safari, Edge */
//                 }
//                 nav:hover::-webkit-scrollbar-track {
//                     background: transparent;
//                 }
//                 nav:hover::-webkit-scrollbar-thumb {
//                     background: rgba(255, 255, 255, 0.4);
//                     border-radius: 10px;
//                 }
//                 `}
//             </style>
//         </div>
//     );
// };

// export default Sidebar;


// import React, { useState, useEffect } from "react";
// import { X, Home, Users, LogOut, Newspaper, ChevronDown, ChevronUp } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";

// const Sidebar = () => {
//     const [user, setUser] = useState(null);
//     const [openDropdown, setOpenDropdown] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const navigate = useNavigate();
//     const location = useLocation();

//     // Retrieve user data from localStorage on mount
//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         if (storedUser) {
//             setUser(JSON.parse(storedUser));
//         } else {
//             navigate("/login");
//         }
//     }, [navigate]);

//     // Handle logout
//     const handleLogout = () => {
//         localStorage.removeItem("user");
//         navigate("/login");
//     };

//     // Toggle dropdown
//     const toggleDropdown = (menu) => {
//         setOpenDropdown(openDropdown === menu ? null : menu);
//     };

//     const isAdmin = user?.role === "ADMIN" || user?.role === "Admin" || user?.role === "admin";

//     // Define menu items with dropdowns
//     const menuItems = [
//         { path: "/dashboard", label: "Home", icon: <Home size={20} className="mr-3" />, onClick: () => navigate("/dashboard") },
//         ...(isAdmin
//             ? [
//                 {
//                     path: "/usermanagement",
//                     label: "User Management",
//                     icon: <Users size={20} className="mr-3" />,
//                     onClick: () => navigate("/usermanagement"),
//                 },
//             ]
//             : []),
//         {
//             label: "Journal Info",
//             icon: <Newspaper size={20} className="mr-3" />,
//             dropdown: [
//                 { path: "/disciplines", label: "Disciplines", onClick: () => navigate("/disciplines"), relatedPaths: ["/addnewdisciplines"] },
//                 { path: "/journalissues", label: "Journal Issues", onClick: () => navigate("/journalissues") },
//                 { path: "/journals", label: "Journals", onClick: () => navigate("/journals") },
//                 { path: "/editorial", label: "Editorial Board", onClick: () => navigate("/editorial") },
//                 { path: "/apc", label: "APC", onClick: () => navigate("/apc") },
//             ],
//         },
//         {
//             label: "Articles",
//             icon: <Newspaper size={20} className="mr-3" />,
//             dropdown: [
//                 { path: "/affiliation", label: "Affiliations", onClick: () => navigate("/affiliation") },
//                 { path: "/author", label: "Author", onClick: () => navigate("/author") },
//                 { path: "/articles", label: "Articles", onClick: () => navigate("/articles") },
//             ],
//         },
//         { path: "/callforpapers", label: "CallforPapers", icon: <Newspaper size={20} className="mr-3" />, onClick: () => navigate("/callforpapers") },
//         { path: "/memberships", label: "Fellow Memberships", icon: <Newspaper size={20} className="mr-3" />, onClick: () => navigate("/memberships") },
//         { path: "/awards", label: "Awards", icon: <Newspaper size={20} className="mr-3" />, onClick: () => navigate("/awards") },
//         { path: "/login", label: "Logout", icon: <LogOut size={20} className="mr-3" />, onClick: handleLogout },
//     ];

//     // Filter menu items based on search term
//     const filteredMenu = menuItems.filter((item) => {
//         if (item.label.toLowerCase().includes(searchTerm.toLowerCase())) return true;
//         if (item.dropdown) {
//             return item.dropdown.some((subItem) =>
//                 subItem.label.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }
//         return false;
//     });

//     // Determine if a menu item or its sub-item is active
//     const isItemActive = (item) => {
//         if (item.path && location.pathname === item.path) return true;
//         if (item.dropdown) {
//             return item.dropdown.some(
//                 (subItem) =>
//                     location.pathname === subItem.path ||
//                     (subItem.relatedPaths && subItem.relatedPaths.includes(location.pathname))
//             );
//         }
//         return false;
//     };

//     return (
//         <div className="fixed inset-y-0 left-0 top-15 w-64 bg-gradient-to-b from-stone-900 to-cyan-950 text-white shadow-lg z-30 flex flex-col">
//             <div className="p-4 border-b border-blue-400">
//                 <h2 className="text-xl font-semibold tracking-wide">Dashboard</h2>
//                 <button className="md:hidden absolute top-4 right-4">
//                     <X size={24} />
//                 </button>
//             </div>
//             <div className="px-4 pt-4">
//                 <input
//                     type="text"
//                     placeholder="Search..."
//                     className="w-full px-3 py-2 bg-gray-800 text-white border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//             </div>
//             <nav className="flex-grow mt-4 overflow-y-auto">
//                 <ul className="space-y-1">
//                     {filteredMenu.map((item) => (
//                         <li key={item.label}>
//                             {item.dropdown ? (
//                                 <>
//                                     <div
//                                         className={`flex items-center justify-between px-4 py-3 mx-2 rounded-lg cursor-pointer transition-all duration-200 ${isItemActive(item)
//                                             ? "bg-red-400 text-white font-semibold shadow-md"
//                                             : "text-blue-100 hover:bg-red-500 hover:text-white"
//                                             }`}
//                                         onClick={() => toggleDropdown(item.label)}
//                                     >
//                                         <div className="flex items-center">
//                                             {item.icon}
//                                             {item.label}
//                                         </div>
//                                         {openDropdown === item.label ? (
//                                             <ChevronUp size={20} />
//                                         ) : (
//                                             <ChevronDown size={20} />
//                                         )}
//                                     </div>
//                                     {openDropdown === item.label && (
//                                         <ul className="ml-6 space-y-1">
//                                             {item.dropdown
//                                                 .filter((subItem) =>
//                                                     subItem.label.toLowerCase().includes(searchTerm.toLowerCase())
//                                                 )
//                                                 .map((subItem) => (
//                                                     <li key={subItem.label}>
//                                                         <div
//                                                             className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${location.pathname === subItem.path ||
//                                                                 (subItem.relatedPaths &&
//                                                                     subItem.relatedPaths.includes(location.pathname))
//                                                                 ? "text-blue-400  font-semibold shadow-md"
//                                                                 : " hover:bg-red-500 hover:text-white"
//                                                                 }`}
//                                                             onClick={subItem.onClick}
//                                                         >
//                                                             {subItem.label}
//                                                         </div>
//                                                     </li>
//                                                 ))}
//                                         </ul>
//                                     )}
//                                 </>
//                             ) : (
//                                 <div
//                                     className={`flex items-center px-4 py-3 mx-2 rounded-lg cursor-pointer transition-all duration-200 ${isItemActive(item)
//                                         ? "bg-red-400 text-white font-semibold shadow-md"
//                                         : "text-blue-100 hover:bg-red-500 hover:text-white"
//                                         }`}
//                                     onClick={item.onClick}
//                                 >
//                                     {item.icon}
//                                     {item.label}
//                                 </div>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             </nav>
//             <div className="p-4 border-t border-blue-400 text-center text-blue-200">
//                 <small>© 2025 Your Company</small>
//             </div>
//             <style>
//                 {`
//                 nav {
//                     overflow-y: auto;
//                     scrollbar-width: none; /* Firefox */
//                     -ms-overflow-style: none; /* IE and Edge */
//                 }
//                 nav::-webkit-scrollbar {
//                     width: 0; /* Chrome, Safari, Edge */
//                 }
//                 nav:hover {
//                     scrollbar-width: thin; /* Firefox */
//                     scrollbar-color: rgba(255, 255, 255, 0.4) transparent; /* Firefox */
//                 }
//                 nav:hover::-webkit-scrollbar {
//                     width: 6px; /* Chrome, Safari, Edge */
//                 }
//                 nav:hover::-webkit-scrollbar-track {
//                     background: transparent;
//                 }
//                 nav:hover::-webkit-scrollbar-thumb {
//                     background: rgba(255, 255, 255, 0.4);
//                     border-radius: 10px;
//                 }
//                 `}
//             </style>
//         </div>
//     );
// };

// export default Sidebar;


import React, { useState, useEffect } from "react";
import { X, Home, Users, LogOut, Newspaper, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Sidebar = () => {
    const [user, setUser] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // Retrieve user data from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate("/login");
        }
    }, [navigate]);

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    // Toggle dropdown
    const toggleDropdown = (menu) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    };

    const isAdmin = user?.role === "ADMIN" || user?.role === "Admin" || user?.role === "admin";

    // Define menu items with dropdowns
    const menuItems = [
        { path: "/dashboard", label: "Home", icon: <Home size={20} className="mr-3" /> },
        ...(isAdmin
            ? [
                {
                    path: "/usermanagement",
                    label: "User Management",
                    icon: <Users size={20} className="mr-3" />,
                },
            ]
            : []),
        {
            label: "Journal Info",
            icon: <Newspaper size={20} className="mr-3" />,
            dropdown: [
                { path: "/disciplines", label: "Disciplines", relatedPaths: ["/addnewdisciplines"] },
                { path: "/journalissues", label: "Journal Issues" },
                { path: "/journals", label: "Journals" },
                { path: "/editorial", label: "Editorial Board" },
                { path: "/apc", label: "APC" },
            ],
        },
        {
            label: "Articles",
            icon: <Newspaper size={20} className="mr-3" />,
            dropdown: [
                { path: "/affiliation", label: "Affiliations" },
                { path: "/author", label: "Author" },
                { path: "/articles", label: "Articles" },
            ],
        },
        { path: "/callforpapers", label: "CallforPapers", icon: <Newspaper size={20} className="mr-3" /> },
        { path: "/memberships", label: "Fellow Memberships", icon: <Newspaper size={20} className="mr-3" /> },
        { path: "/awards", label: "Awards", icon: <Newspaper size={20} className="mr-3" /> },
        { path: "/joinus", label: "joinus", icon: <Newspaper size={20} className="mr-3" /> },
        { path: "/joineditorial", label: "JoinEditorialBoard", icon: <Newspaper size={20} className="mr-3" /> },
        { path: "/articlesubmission", label: "Articlesubmission", icon: <Newspaper size={20} className="mr-3" /> },
                 { path: "/impactfactorstab", label: "Impact Factors", icon: <Newspaper size={20} className="mr-3" /> },
        { path: "/contact", label: "Contact", icon: <Newspaper size={20} className="mr-3" /> },
        { path: "/login", label: "Logout", icon: <LogOut size={20} className="mr-3" />, onClick: handleLogout },
    ];

    // Filter menu items based on search term
    const filteredMenu = menuItems.filter((item) => {
        if (item.label.toLowerCase().includes(searchTerm.toLowerCase())) return true;
        if (item.dropdown) {
            return item.dropdown.some((subItem) =>
                subItem.label.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return false;
    });

    // Determine if a menu item or its sub-item is active
    const isItemActive = (item) => {
        if (item.path && location.pathname === item.path) return true;
        if (item.dropdown) {
            return item.dropdown.some(
                (subItem) =>
                    location.pathname === subItem.path ||
                    (subItem.relatedPaths && subItem.relatedPaths.includes(location.pathname))
            );
        }
        return false;
    };

    return (
        <div className="fixed inset-y-0 left-0 top-12 w-64 bg-gradient-to-b from-gray-700 to-cyan-950 text-white shadow-lg z-30 flex flex-col">
            <div className="p-4 border-b border-blue-400">
                <h2 className="text-xl font-semibold tracking-wide">Dashboard</h2>
                <button className="md:hidden absolute top-4 right-4">
                    <X size={24} />
                </button>
            </div>
            <div className="px-4 pt-4">
                <input
                    type="text"
                    placeholder="Search Menus..."
                    className="w-full px-3 py-2 bg-gray-800 text-white border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <nav className="flex-grow mt-4 overflow-y-auto">
                <ul className="space-y-1">
                    {filteredMenu.map((item) => (
                        <li key={item.label}>
                            {item.dropdown ? (
                                <>
                                    <div
                                        className={`flex items-center justify-between px-4 py-3 mx-2 rounded-lg cursor-pointer transition-all duration-200 ${isItemActive(item)
                                                ? "bg-red-400 text-white font-semibold shadow-md"
                                                : "text-blue-100 hover:bg-red-500 hover:text-white"
                                            }`}
                                        onClick={() => toggleDropdown(item.label)}
                                    >
                                        <div className="flex items-center">
                                            {item.icon}
                                            {item.label}
                                        </div>
                                        {openDropdown === item.label ? (
                                            <ChevronUp size={20} />
                                        ) : (
                                            <ChevronDown size={20} />
                                        )}
                                    </div>
                                    {openDropdown === item.label && (
                                        <ul className="ml-6 space-y-1">
                                            {item.dropdown
                                                .filter((subItem) =>
                                                    subItem.label.toLowerCase().includes(searchTerm.toLowerCase())
                                                )
                                                .map((subItem) => (
                                                    <li key={subItem.label}>
                                                        <Link
                                                            to={subItem.path}
                                                            rel="noopener noreferrer"
                                                            className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${location.pathname === subItem.path ||
                                                                    (subItem.relatedPaths &&
                                                                        subItem.relatedPaths.includes(location.pathname))
                                                                    ? "text-blue-400 font-semibold shadow-md"
                                                                    : "hover:bg-red-500 hover:text-white"
                                                                }`}
                                                        >
                                                            {subItem.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                        </ul>
                                    )}
                                </>
                            ) : (
                                <div
                                    className={`flex items-center px-4 py-3 mx-2 rounded-lg cursor-pointer transition-all duration-200 ${isItemActive(item)
                                            ? "bg-red-400 text-white font-semibold shadow-md"
                                            : "text-blue-100 hover:bg-red-500 hover:text-white"
                                        }`}
                                >
                                    {item.onClick ? (
                                        <div onClick={item.onClick} className="flex items-center w-full">
                                            {item.icon}
                                            {item.label}
                                        </div>
                                    ) : (
                                        <Link
                                            to={item.path}
                                            rel="noopener noreferrer"
                                            className="flex items-center w-full"
                                        >
                                            {item.icon}
                                            {item.label}
                                        </Link>
                                    )}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="p-4 border-t border-blue-400 text-center text-blue-200">
                <small>© 2025 Your Company</small>
            </div>
            <style>
                {`
                nav {
                    overflow-y: auto;
                    scrollbar-width: none; /* Firefox */
                    -ms-overflow-style: none; /* IE and Edge */
                }
                nav::-webkit-scrollbar {
                    width: 0; /* Chrome, Safari, Edge */
                }
                nav:hover {
                    scrollbar-width: thin; /* Firefox */
                    scrollbar-color: rgba(255, 255, 255, 0.4) transparent; /* Firefox */
                }
                nav:hover::-webkit-scrollbar {
                    width: 6px; /* Chrome, Safari, Edge */
                }
                nav:hover::-webkit-scrollbar-track {
                    background: transparent;
                }
                nav:hover::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.4);
                    border-radius: 10px;
                }
                `}
            </style>
        </div>
    );
};

export default Sidebar;