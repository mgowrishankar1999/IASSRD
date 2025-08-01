// import React, { useEffect, useState } from "react";
// import { User, FileText, Book, Users } from "lucide-react";
// import Sidebar from "../admin/sidebar";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//     const [user, setUser] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         console.log(storedUser)
//         if (storedUser) {
//             setUser(JSON.parse(storedUser));
//         } else {
//             navigate("/login");
//         }
//     }, [navigate]);

//     if (!user) {
//         return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
//     }

//     const isAdmin = user.role === "Admin";

//     return (
//         <div className="flex flex-col h-screen">
//             <Sidebar />
//             <header className="fixed top-0 left-0 w-full bg-blue-900 text-white py-4 px-6 flex items-center justify-between z-40">
//                 <h1 className="text-xl font-semibold">
//                     International Academy for Social Sciences Research and Development
//                 </h1>
//                 <div className="flex items-center space-x-4">
//                     <span className="text-sm">Hi {user.user_name}</span>
//                     <User size={20} />
//                 </div>
//             </header>

//             <div className="flex flex-1 pt-20">

//                 <main className="flex-1 p-6 bg-gray-100 overflow-y-auto ml-64">
//                     <div className="mb-6">
//                         <h2 className="text-2xl font-semibold text-gray-900">Welcome, {user.userName}</h2>
//                         <p className="text-gray-600">
//                             {isAdmin
//                                 ? "Manage your users, articles, and journals here."
//                                 : "View your articles, journals, and more."}
//                         </p>
//                     </div>

//                     {isAdmin && (
//                         <section className="bg-white p-6 rounded-lg shadow-md">
//                             <h3 className="text-lg font-semibold text-gray-900 mb-4">User Management</h3>
//                             <div className="overflow-x-auto">
//                                 <table className="min-w-full border-collapse">
//                                     <thead>
//                                         <tr className="bg-gray-200">
//                                             <th className="px-4 py-2 text-left text-gray-700">ID</th>
//                                             <th className="px-4 py-2 text-left text-gray-700">Name</th>
//                                             <th className="px-4 py-2 text-left text-gray-700">Email</th>
//                                             <th className="px-4 py-2 text-left text-gray-700">Role</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         <tr className="border-t">
//                                             <td className="px-4 py-2">1</td>
//                                             <td className="px-4 py-2">John Doe</td>
//                                             <td className="px-4 py-2">john@example.com</td>
//                                             <td className="px-4 py-2">Admin</td>
//                                         </tr>
//                                         <tr className="border-t">
//                                             <td className="px-4 py-2">2</td>
//                                             <td className="px-4 py-2">Jane Smith</td>
//                                             <td className="px-4 py-2">jane@example.com</td>
//                                             <td className="px-4 py-2">User</td>
//                                         </tr>
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </section>
//                     )}

//                     <section className="mt-6 bg-white p-6 rounded-lg shadow-md">
//                         <h3 className="text-lg font-semibold text-gray-900 mb-4">Articles</h3>
//                         <p className="text-gray-600">Manage your articles here.</p>
//                     </section>

//                     <section className="mt-6 bg-white p-6 rounded-lg shadow-md">
//                         <h3 className="text-lg font-semibold text-gray-900 mb-4">Journals</h3>
//                         <p className="text-gray-600">Manage your journals here.</p>
//                     </section>

//                     <section className="mt-6 bg-white p-6 rounded-lg shadow-md">
//                         <h3 className="text-lg font-semibold text-gray-900 mb-4">Authors</h3>
//                         <p className="text-gray-600">Manage your authors here.</p>
//                     </section>
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;


import React, { useState, useEffect, useRef } from "react";
import { User, FileText, Book, Users, Award, Edit, University } from "lucide-react";
import Sidebar from "../admin/sidebar";
import { useNavigate } from "react-router-dom";
import { Bar, Pie, Line } from 'react-chartjs-2';
import iscsitrlogo from '../../assets/iscsitrlogo.png'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
// import logoImage from '../../assets/logoijsrcsit.jpg'; // Adjust path as needed
// import Loader from "../Common/forntendSpinner";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement);

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [journals, setJournals] = useState([]);
    const [journalIssues, setJournalIssues] = useState([]);
    const [editorialBoard, setEditorialBoard] = useState([]);
    const [articles, setArticles] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [awards, setAwards] = useState([]);
    const [affiliations, setAffiliations] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [highlightedSection, setHighlightedSection] = useState(null);

    const journalsRef = useRef(null);
    const issuesRef = useRef(null);
    const editorialRef = useRef(null);
    const articlesRef = useRef(null);
    const authorsRef = useRef(null);
    const awardsRef = useRef(null);
    const affiliationsRef = useRef(null);
    const usersRef = useRef(null);

    const navigate = useNavigate();

    // Check user authentication and fetch data
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate("/login");
        }

        const fetchData = async () => {
            try {
                const endpoints = [
                    { url: 'https://iassrd.com:8081/api/v1/journals', setter: setJournals },
                    { url: 'https://iassrd.com:8081/api/v1/journal-issues', setter: setJournalIssues },
                    { url: 'https://iassrd.com:8081/api/v1/editorial-board', setter: setEditorialBoard },
                    { url: 'https://iassrd.com:8081/api/v1/articles', setter: setArticles },
                    { url: 'https://iassrd.com:8081/api/v1/authors', setter: setAuthors },
                    { url: 'https://iassrd.com:8081/api/v1/awards', setter: setAwards },
                    { url: 'https://iassrd.com:8081/api/v1/affiliations', setter: setAffiliations },
                    { url: 'https://iassrd.com:8081/api/v1/users', setter: setUsers }, // New endpoint for users
                ];

                const responses = await Promise.all(
                    endpoints.map(endpoint => fetch(endpoint.url).then(res => res.json()))
                );

                responses.forEach((data, index) => {
                    endpoints[index].setter(data.data || []);
                });

                setLoading(false);
            } catch (err) {
                setError('Failed to fetch data. Please try again later.');
                console.error(err);
                setLoading(false);
            }
        };

        if (storedUser) fetchData();
    }, [navigate]);

    // Helper function to group data by date
    const groupByDate = (data, dateField) => {
        const grouped = {};
        data.forEach(item => {
            if (!item[dateField]) return;
            const date = new Date(item[dateField]).toLocaleDateString();
            grouped[date] = (grouped[date] || 0) + 1;
        });
        return grouped;
    };

    // Chart data
    const journalsChartData = {
        labels: Object.keys(groupByDate(journals, 'createdDate')),
        datasets: [{
            label: 'Journals by Date',
            data: Object.values(groupByDate(journals, 'createdDate')),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }],
    };

    const issuesChartData = {
        labels: Object.keys(groupByDate(journalIssues, 'createdDate')),
        datasets: [{
            label: 'Issues by Date',
            data: Object.values(groupByDate(journalIssues, 'createdDate')),
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
        }],
    };

    const editorialChartData = {
        labels: Object.keys(groupByDate(editorialBoard, 'createdDate')),
        datasets: [{
            label: 'Editorial Members by Date',
            data: Object.values(groupByDate(editorialBoard, 'createdDate')),
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
        }],
    };

    const articlesChartData = {
        labels: Object.keys(groupByDate(articles, 'createdDate')),
        datasets: [{
            label: 'Articles by Date',
            data: Object.values(groupByDate(articles, 'createdDate')),
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
        }],
    };

    const authorsChartData = {
        labels: Object.keys(groupByDate(authors, 'createdDate')),
        datasets: [{
            label: 'Authors by Date',
            data: Object.values(groupByDate(authors, 'createdDate')),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
        }],
    };

    const awardsChartData = {
        labels: Object.keys(groupByDate(awards, 'createdDate')),
        datasets: [{
            label: 'Awards by Date',
            data: Object.values(groupByDate(awards, 'createdDate')),
            backgroundColor: 'rgba(255, 205, 86, 0.6)',
        }],
    };

    const affiliationsChartData = {
        labels: Object.keys(groupByDate(affiliations, 'createdDate')),
        datasets: [{
            label: 'Affiliations by Date',
            data: Object.values(groupByDate(affiliations, 'createdDate')),
            backgroundColor: 'rgba(34, 197, 94, 0.6)',
        }],
    };

    const usersChartData = {
        labels: Object.keys(groupByDate(users, 'createdDate')),
        datasets: [{
            label: 'Users by Date',
            data: Object.values(groupByDate(users, 'createdDate')),
            backgroundColor: 'rgba(128, 128, 128, 0.6)',
        }],
    };

    const statsChartData = {
        labels: ['Journals', 'Issues', 'Editorial', 'Articles', 'Authors', 'Awards', 'Affiliations', 'Users'],
        datasets: [{
            label: 'Total Counts',
            data: [
                journals.length,
                journalIssues.length,
                editorialBoard.length,
                articles.length,
                authors.length,
                awards.length,
                affiliations.length,
                users.length
            ],
            backgroundColor: [
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 205, 86, 0.6)',
                'rgba(34, 197, 94, 0.6)',
                'rgba(128, 128, 128, 0.6)',
            ],
        }],
    };

    const allInteractions = [
        ...journals.map(item => ({ type: 'Journal', createdDate: item.createdDate })),
        ...journalIssues.map(item => ({ type: 'Issue', createdDate: item.createdDate })),
        ...editorialBoard.map(item => ({ type: 'Editorial', createdDate: item.createdDate })),
        ...articles.map(item => ({ type: 'Article', createdDate: item.createdDate })),
        ...authors.map(item => ({ type: 'Author', createdDate: item.createdDate })),
        ...awards.map(item => ({ type: 'Award', createdDate: item.createdDate })),
        ...affiliations.map(item => ({ type: 'Affiliation', createdDate: item.createdDate })),
        ...users.map(item => ({ type: 'User', createdDate: item.createdDate })),
    ].filter(item => item.createdDate);

    const interactionsOverTimeChartData = {
        labels: Object.keys(groupByDate(allInteractions, 'createdDate')),
        datasets: [{
            label: 'Total Interactions Over Time',
            data: Object.values(groupByDate(allInteractions, 'createdDate')),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
        }],
    };

    const activityDistributionChartData = {
        labels: ['Journals', 'Issues', 'Editorial', 'Articles', 'Authors', 'Awards', 'Affiliations', 'Users'],
        datasets: [{
            label: 'Activity Distribution',
            data: [
                journals.length,
                journalIssues.length,
                editorialBoard.length,
                articles.length,
                authors.length,
                awards.length,
                affiliations.length,
                users.length
            ],
            backgroundColor: [
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 205, 86, 0.6)',
                'rgba(34, 197, 94, 0.6)',
                'rgba(128, 128, 128, 0.6)',
            ],
        }],
    };

    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);
    const recentInteractions = allInteractions.filter(item => new Date(item.createdDate) >= last30Days).length;

    const SummaryCard = ({ title, count, icon, color, sectionRef }) => {
        const handleClick = () => {
            sectionRef.current.scrollIntoView({ behavior: 'smooth' });
            setHighlightedSection(title);
            setTimeout(() => setHighlightedSection(null), 2000);
        };

        return (
            <div
                className={`p-4 rounded-lg shadow-md flex items-center space-x-4 ${color} text-white transform transition hover:scale-105 cursor-pointer`}
                onClick={handleClick}
            >
                <div className="text-2xl">{icon}</div>
                <div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-2xl">{count}</p>
                </div>
            </div>
        );
    };

    const handleAction = (section) => {
        const routes = {
            journals: '/journals',
            journalIssues: '/journalissues',
            editorialBoard: '/editorial',
            articles: '/articles',
            authors: '/authors',
            awards: '/awardslist',
            affiliations: '/affiliation',
            users: '/users',
        };
        navigate(routes[section] || '/dashboard');
    };

    if (loading || !user) {
        return (
            <div className="flex">
                <Sidebar />
                {/* <Loader /> */}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex">
                <Sidebar />
                <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center">
                    <div className="text-red-500">Error: {error}</div>
                </div>
            </div>
        );
    }

    const isAdmin = user.role === "Admin";

    return (
        <div className="flex min-h-screen bg-teal-50">
            <header className="fixed top-0 left-0 w-full bg-blue-900 text-white py-4 px-6 flex items-center justify-between z-40">
                <h1 className="text-xl font-semibold">
                    International Academy for Social Sciences Research and Development
                </h1>
                <div className="flex items-center space-x-4">
                    {/* <span className="text-sm">Hi {user?.user_name}</span> */}
                </div>
            </header>
            <Sidebar />
            <div className="flex-1 p-6 overflow-y-scroll mt-14 ml-64">
                <header className="flex justify-between items-center bg-gradient-to-r from-blue-900 to-teal-400 text-white p-4 rounded-xl mb-6 shadow-lg">
                    <div className="flex items-center space-x-4">
                        {/* <img src={iscsitrlogo} alt="IJSRCSIT Logo" className="h-20 w-20 mr-2" /> */}
                        <div>
                            <img src='' />
                            <a href="/" className="text-2xl font-extrabold tracking-wide text-teal-200">
                                IASSRD
                            </a>
                            <h1 className="text-2xl font-bold">Dashboard</h1>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm">Hi, {user.user_name}</span>
                        <User size={20} />
                    </div>
                </header>

                <div className="space-y-8">
                    {/* Summary Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <SummaryCard icon={<Book />} title="Journals" count={journals.length} color="bg-teal-500" sectionRef={journalsRef} />
                        <SummaryCard icon={<FileText />} title="Issues" count={journalIssues.length} color="bg-purple-500" sectionRef={issuesRef} />
                        <SummaryCard icon={<Edit />} title="Editorial" count={editorialBoard.length} color="bg-orange-500" sectionRef={editorialRef} />
                        <SummaryCard icon={<FileText />} title="Articles" count={articles.length} color="bg-red-500" sectionRef={articlesRef} />
                        <SummaryCard icon={<Users />} title="Authors" count={authors.length} color="bg-blue-500" sectionRef={authorsRef} />
                        <SummaryCard icon={<Award />} title="Awards" count={awards.length} color="bg-yellow-500" sectionRef={awardsRef} />
                        <SummaryCard icon={<University />} title="Affiliations" count={affiliations.length} color="bg-green-500" sectionRef={affiliationsRef} />
                        {isAdmin && (
                            <SummaryCard icon={<Users />} title="Users" count={users.length} color="bg-gray-500" sectionRef={usersRef} />
                        )}
                    </div>

                    {/* Statistics Overview */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Statistics Overview</h2>
                        <div style={{ height: '200px' }}>
                            <Bar data={statsChartData} options={{ maintainAspectRatio: false }} />
                        </div>
                    </div>

                    {/* Analytics Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Analytics</h2>
                        <div className="mb-4">
                            <p className="text-lg font-medium text-gray-700">
                                Total Interactions in Last 30 Days: <span className="text-teal-600">{recentInteractions}</span>
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div style={{ height: '150px' }}>
                                <Line data={interactionsOverTimeChartData} options={{ maintainAspectRatio: false }} />
                            </div>
                            <div style={{ height: '150px' }}>
                                <Pie data={activityDistributionChartData} options={{ maintainAspectRatio: false }} />
                            </div>
                        </div>
                    </div>

                    {/* Journals Section */}
                    <div ref={journalsRef} className={`bg-white p-6 rounded-lg shadow-md ${highlightedSection === 'Journals' ? 'ring-4 ring-teal-300' : ''}`}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Journals</h2>
                            <button onClick={() => handleAction('journals')} className="text-white w-20 h-10 bg-gray-500 hover:bg-blue-600 rounded transform transition hover:scale-95">Action</button>
                        </div>
                        <div style={{ height: '150px' }}>
                            <Bar data={journalsChartData} options={{ maintainAspectRatio: false }} />
                        </div>
                        <div className="flex space-x-4 overflow-x-auto pb-4 mt-4">
                            {journals.map(item => (
                                <div key={item.journalId} className="transform transition hover:scale-101 bg-gray-50 p-4 rounded-lg shadow-md min-w-[250px] flex-shrink-0">
                                    <center><Book /></center>
                                    <p className="font-semibold">{item.journalName}</p>
                                    <p className="text-sm text-gray-600">ISSN: {item.issnOnline}</p>
                                    <p className="text-xs text-gray-500">Created: {new Date(item.createdDate).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Issues Section */}
                    <div ref={issuesRef} className={`bg-white p-6 rounded-lg shadow-md ${highlightedSection === 'Issues' ? 'ring-4 ring-purple-300' : ''}`}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Journal Issues</h2>
                            <button onClick={() => handleAction('journalIssues')} className="text-white w-20 h-10 bg-gray-500 hover:bg-blue-600 rounded transform transition hover:scale-95">Action</button>
                        </div>
                        <div style={{ height: '150px' }}>
                            <Bar data={issuesChartData} options={{ maintainAspectRatio: false }} />
                        </div>
                        <div className="flex space-x-4 overflow-x-auto pb-4 mt-4">
                            {journalIssues.map(item => (
                                <div key={item.issueId} className="transform transition hover:scale-101 bg-gray-50 p-4 rounded-lg shadow-md min-w-[250px] flex-shrink-0">
                                    <center><FileText /></center>
                                    <p className="font-semibold">{item.title}</p>
                                    <p className="text-sm text-gray-600">Volume: {item.volumeNo}, Issue: {item.issueNo}</p>
                                    <p className="text-xs text-gray-500">Created: {new Date(item.createdDate).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Editorial Board Section */}
                    <div ref={editorialRef} className={`bg-white p-6 rounded-lg shadow-md ${highlightedSection === 'Editorial' ? 'ring-4 ring-orange-300' : ''}`}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Editorial Board</h2>
                            <button onClick={() => handleAction('editorialBoard')} className="text-white w-20 h-10 bg-gray-500 hover:bg-blue-600 rounded transform transition hover:scale-95">Action</button>
                        </div>
                        <div style={{ height: '150px' }}>
                            <Bar data={editorialChartData} options={{ maintainAspectRatio: false }} />
                        </div>
                        <div className="flex space-x-4 overflow-x-auto pb-4 mt-4">
                            {editorialBoard.map(item => (
                                <div key={item.memberId} className="transform transition hover:scale-101 bg-gray-50 p-4 rounded-lg shadow-md min-w-[250px] flex-shrink-0">
                                    <center><Edit /></center>
                                    <p className="font-semibold">{item.editorName}</p>
                                    <p className="text-sm text-gray-600">{item.editorAffiliation}</p>
                                    <p className="text-xs text-gray-500">Created: {new Date(item.createdDate).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Articles Section */}
                    <div ref={articlesRef} className={`bg-white p-6 rounded-lg shadow-md ${highlightedSection === 'Articles' ? 'ring-4 ring-red-300' : ''}`}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Articles</h2>
                            <button onClick={() => handleAction('articles')} className="text-white w-20 h-10 bg-gray-500 hover:bg-blue-600 rounded transform transition hover:scale-95">Action</button>
                        </div>
                        <div style={{ height: '150px' }}>
                            <Bar data={articlesChartData} options={{ maintainAspectRatio: false }} />
                        </div>
                        <div className="flex space-x-4 overflow-x-auto pb-4 mt-4">
                            {articles.map(item => (
                                <div key={item.articleId} className="transform transition hover:scale-101 bg-gray-50 p-4 rounded-lg shadow-md min-w-[250px] flex-shrink-0">
                                    <center><FileText /></center>
                                    <p className="font-semibold">{item.articleTitle}</p>
                                    <p className="text-sm text-gray-600">{item.articleKey}</p>
                                    <p className="text-xs text-gray-500">Created: {new Date(item.createdDate).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Authors Section */}
                    <div ref={authorsRef} className={`bg-white p-6 rounded-lg shadow-md ${highlightedSection === 'Authors' ? 'ring-4 ring-blue-300' : ''}`}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Authors</h2>
                            <button onClick={() => handleAction('authors')} className="text-white w-20 h-10 bg-gray-500 hover:bg-blue-600 rounded transform transition hover:scale-95">Action</button>
                        </div>
                        <div style={{ height: '150px' }}>
                            <Bar data={authorsChartData} options={{ maintainAspectRatio: false }} />
                        </div>
                        <div className="flex space-x-4 overflow-x-auto pb-4 mt-4">
                            {authors.map(item => (
                                <div key={item.authorId} className="transform transition hover:scale-101 bg-gray-50 p-4 rounded-lg shadow-md min-w-[250px] flex-shrink-0">
                                    <center><Users /></center>
                                    <p className="font-semibold">{item.firstName} {item.lastName}</p>
                                    <p className="text-sm text-gray-600">{item.designation}, {item.university}</p>
                                    <p className="text-xs text-gray-500">Created: {new Date(item.createdDate).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Awards Section */}
                    <div ref={awardsRef} className={`bg-white p-6 rounded-lg shadow-md ${highlightedSection === 'Awards' ? 'ring-4 ring-yellow-300' : ''}`}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Awards</h2>
                            <button onClick={() => handleAction('awards')} className="text-white w-20 h-10 bg-gray-500 hover:bg-blue-600 rounded transform transition hover:scale-95">Action</button>
                        </div>
                        <div style={{ height: '150px' }}>
                            <Bar data={awardsChartData} options={{ maintainAspectRatio: false }} />
                        </div>
                        <div className="flex space-x-4 overflow-x-auto pb-4 mt-4">
                            {awards.map(item => (
                                <div key={item.id} className="transform transition hover:scale-101 bg-gray-50 p-4 rounded-lg shadow-md min-w-[250px] flex-shrink-0">
                                    <center><Award /></center>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-gray-600">{item.awardType} - {item.affiliation}</p>
                                    <p className="text-xs text-gray-500">Created: {new Date(item.createdDate).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Affiliations Section */}
                    <div ref={affiliationsRef} className={`bg-white p-6 rounded-lg shadow-md ${highlightedSection === 'Affiliations' ? 'ring-4 ring-green-300' : ''}`}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Affiliations</h2>
                            <button onClick={() => handleAction('affiliations')} className="text-white w-20 h-10 bg-gray-500 hover:bg-blue-600 rounded transform transition hover:scale-95">Action</button>
                        </div>
                        <div style={{ height: '150px' }}>
                            <Bar data={affiliationsChartData} options={{ maintainAspectRatio: false }} />
                        </div>
                        <div className="flex space-x-4 overflow-x-auto pb-4 mt-4">
                            {affiliations.map(item => (
                                <div key={item.affId} className="transform transition hover:scale-101 bg-gray-50 p-4 rounded-lg shadow-md min-w-[250px] flex-shrink-0">
                                    <center><University /></center>
                                    <p className="font-semibold">{item.affName}</p>
                                    <p className="text-sm text-gray-600">{item.address}, {item.country}</p>
                                    <p className="text-xs text-gray-500">Papers Published: {item.papersPublished}</p>
                                    <p className="text-xs text-gray-500">Created: {new Date(item.createdDate).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Users Section (Admin Only) */}
                    {isAdmin && (
                        <div ref={usersRef} className={`bg-white p-6 rounded-lg shadow-md ${highlightedSection === 'Users' ? 'ring-4 ring-gray-300' : ''}`}>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">Users</h2>
                                <button onClick={() => handleAction('users')} className="text-white w-20 h-10 bg-gray-500 hover:bg-blue-600 rounded transform transition hover:scale-95">Action</button>
                            </div>
                            <div style={{ height: '150px' }}>
                                <Bar data={usersChartData} options={{ maintainAspectRatio: false }} />
                            </div>
                            <div className="overflow-x-auto mt-4">
                                <table className="min-w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="px-4 py-2 text-left text-gray-700">ID</th>
                                            <th className="px-4 py-2 text-left text-gray-700">Name</th>
                                            <th className="px-4 py-2 text-left text-gray-700">Email</th>
                                            <th className="px-4 py-2 text-left text-gray-700">Role</th>
                                            <th className="px-4 py-2 text-left text-gray-700">Created</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(item => (
                                            <tr key={item.userId} className="border-t">
                                                <td className="px-4 py-2">{item.userId}</td>
                                                <td className="px-4 py-2">{item.user_name}</td>
                                                <td className="px-4 py-2">{item.email}</td>
                                                <td className="px-4 py-2">{item.role}</td>
                                                <td className="px-4 py-2">{new Date(item.createdDate).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;