
import React, { useState, useEffect } from "react";
import Navbar from '../frontend/navbar';
import Footer from '../frontend/footer';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from 'axios';
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
// import Space from "../../assets/herologo3.jpg";
import defaultImage from "../../assets/defaultprofile.jpg"; // Add a default image file
import { FaFacebook, FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

Chart.register(...registerables);

const AuthorProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { name } = useParams(); // Extract name from URL
    const [author, setAuthor] = useState(null);
    const [articles, setArticles] = useState([]);
    const [journals, setJournals] = useState({});
    const [disciplines, setDisciplines] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // const [viewersCount, setViewersCount] = useState(0); 
    const BASE_URL = "https://iassrd.com:8081/api/v1";
    console.log(name);

    useEffect(() => {
        const decodedName = decodeURIComponent(name).replace(/\s+/g, '');
        console.log("Author Name from params (no spaces):", decodedName);

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            if (!decodedName || decodedName.trim() === "") {
                setError("Invalid author name.");
                setIsLoading(false);
                return;
            }

            try {
                const authorsRes = await axios.get(`${BASE_URL}/authors`);
                console.log("Authors response:", authorsRes.data);
                if (!authorsRes.data.success) {
                    throw new Error(authorsRes.data.message || "Error fetching authors.");
                }

                const authorsData = authorsRes.data.data;
                const targetAuthor = authorsData.find((author) =>
                    `${author.firstName}${author.lastName}`.toLowerCase().replace(/\s+/g, '') === decodedName.toLowerCase()
                );

                if (!targetAuthor) {
                    throw new Error("Author not found.");
                }

                const authorId = targetAuthor.authorId;
                console.log("Found author ID:", authorId);

                const authorRes = await axios.get(`${BASE_URL}/authors/${authorId}`);
                console.log("Author response:", authorRes.data);
                if (!authorRes.data.success) {
                    throw new Error(authorRes.data.message || "Author not found.");
                }

                const authorData = authorRes.data.data;
                if (Array.isArray(authorData)) {
                    if (authorData.length === 0) {
                        throw new Error("No author data found.");
                    }
                    setAuthor(authorData[0]);

                } else {
                    setAuthor(authorData);

                }
                console.log("Set author:", authorData);

                const affiliationsRes = await axios.get(`${BASE_URL}/affiliations`);
                console.log("Affiliations response:", affiliationsRes.data);
                if (!affiliationsRes.data.success) {
                    throw new Error(affiliationsRes.data.message || "Error fetching affiliations.");
                }

                const articlesRes = await axios.get(`${BASE_URL}/articles`);
                console.log("Articles response:", articlesRes.data);
                if (!articlesRes.data.success) {
                    throw new Error(articlesRes.data.message || "Error fetching articles.");
                }
                const articlesData = articlesRes.data.data;
                const filteredArticles = articlesData.filter((article) =>
                    article.authorIds?.split(",").map((id) => id.trim()).includes(authorId.toString())
                );
                setArticles(filteredArticles);

                const journalsRes = await axios.get(`${BASE_URL}/journals`);
                console.log("Journals response:", journalsRes.data);
                if (!journalsRes.data.success) {
                    throw new Error(journalsRes.data.message || "Error fetching journals.");
                }
                const journalMap = {};
                journalsRes.data.data.forEach((journal) => {
                    journalMap[journal.journalId] = {
                        name: journal.journalName,
                        abbreviation: journal.abbrevation || "N/A",
                    };
                });
                setJournals(journalMap);

                const disciplinesRes = await axios.get(`${BASE_URL}/disciplines`);
                console.log("Disciplines response:", disciplinesRes.data);
                if (!disciplinesRes.data.success) {
                    throw new Error(disciplinesRes.data.message || "Error fetching disciplines.");
                }
                const disciplineMap = {};
                disciplinesRes.data.data.forEach((discipline) => {
                    disciplineMap[discipline.disciplineId] = discipline.disciplineName;
                });
                setDisciplines(disciplineMap);
            } catch (err) {
                console.error("Error fetching data:", err);
                console.error("Error details:", err.response?.data);
                if (err.response?.status === 400) {
                    setError("Invalid request. The author name may be incorrect or malformed.");
                } else if (err.response?.status === 404) {
                    setError("Author not found.");
                } else {
                    setError(err.message || "Failed to load data. Please try again later.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [name]);

    useEffect(() => {
        if (author?.authorId) {
            const updateViewersCount = async () => {
                const newCount = viewersCount + 1;
                try {
                    const response = await axios.post(`${BASE_URL}/authors/${author.authorId}`, {
                        profileViews: newCount,
                    });
                    // if (response.data.success) {
                    //     setViewersCount(newCount);
                    // }
                } catch (err) {
                    console.error("Error updating viewers count:", err);

                }
            };
            updateViewersCount();
        }
    }, [author?.authorId]);

    const getAffId = () => {
        const affiliation = affiliation.find((aff) => aff.affName === author?.university);
        return affiliation ? affiliation.affName : null;
    };

    const filteredArticles = articles.filter((article) =>
        article.articleTitle?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Aggregate papers published by year
    const papersPublishedByYearData = {
        labels: Array.from(new Set(articles.map((article) => {
            const date = new Date(article.dateOfPublication);
            return isNaN(date.getFullYear()) ? "Unknown" : date.getFullYear();
        }))).sort((a, b) => (a === "Unknown" ? 1 : b === "Unknown" ? -1 : a - b)),
        datasets: [{
            label: 'Papers Published',
            data: Array.from(new Set(articles.map((article) => {
                const date = new Date(article.dateOfPublication);
                return isNaN(date.getFullYear()) ? "Unknown" : date.getFullYear();
            }))).map(year => {
                return articles.filter(article => {
                    const date = new Date(article.dateOfPublication);
                    const articleYear = isNaN(date.getFullYear()) ? "Unknown" : date.getFullYear();
                    return articleYear === year;
                }).length;
            }),
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
        }],
    };

    const journalPublishedData = {
        labels: [...new Set(articles.map((article) => journals[article.journalId]?.abbreviation || "Unknown"))],
        datasets: [
            {
                data: [...new Set(articles.map((article) => journals[article.journalId]?.abbreviation || "Unknown"))].map(
                    (journal) => articles.filter((article) => journals[article.journalId]?.abbreviation === journal).length
                ),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const subjectPublishedData = {
        labels: [...new Set(articles.map((article) => disciplines[journals[article.journalId]?.disciplineId] || "Unknown"))],
        datasets: [
            {
                data: [...new Set(articles.map((article) => disciplines[journals[article.journalId]?.disciplineId] || "Unknown"))].map(
                    (subject) => articles.filter((article) => disciplines[journals[article.journalId]?.disciplineId] === subject).length
                ),
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            },
        ],
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col">
                <Navbar />
                <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex justify-center py-10">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col">
                <Navbar />
                <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <p className="text-center text-red-500 text-lg">{error}</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (!author) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col">
                <Navbar />
                <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <p className="text-center text-gray-500 text-lg">No author found.</p>
                </div>
                <Footer />
            </div>
        );
    }

    const shareUrl = `${window.location.origin}/authors/${encodeURIComponent(`${author.firstName}${author.lastName}`.replace(/\s+/g, ''))}`;
    const shareMessage = `Check out ${author.firstName} ${author.lastName}'s profile on our platform! ${shareUrl}`;


    console.log(author.authorId)

    // async function updateProfileViews() {
    //     try {
    //         const formDataToSend = new FormData();

    //         const authorData = {
    //             profileViews: parseInt( 10),
    //         }
    //         formDataToSend.append(
    //             "author",
    //             new Blob([JSON.stringify(authorData)], { type: "application/json" })
    //         );

    //         const response = await fetch(`${BASE_URL}/authors/${author.authorId}`, {
    //             method: "PUT",
    //             headers: {
    //                 // 'Content-Type' must NOT be set manually for multipart/form-data with fetch
    //             },
    //             body: formDataToSend,
    //         });

    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }

    //         const data = await response.json();
    //         console.log("Update success:", data.data);
    //     }
    //     catch (error) {
    //         console.error("Update failed:", error);
    //     }

    // }
    // updateProfileViews()
    return (
        <>
            <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
            {
                isSearchOpen && (
                    <div
                        className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10"
                        aria-hidden="true"
                    ></div>
                )
            }
            <div className={`min-h-screen bg-gray-100 flex flex-col px-[90px] ${isSearchOpen ? 'mt-[130px]' : 'mt-[50px]'}`}>
                <div
                    className=" mx-10 h-48 bg-cover bg-right bg-no-repeat box-border"
                // style={{ backgroundImage: `url(${Space})` }}
                >
                    <div className="flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8">
                        <p className=" text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 font-IBM">
                            {author?.firstName && author?.lastName
                                ? `${author.firstName} ${author.lastName}`
                                : "Name not available"}
                        </p>
                        <h1 className="mt-2 text-lg sm:text-xl text-gray-700 max-w-2xl ">
                            Author Profile
                        </h1>
                    </div>
                </div>
                <main className="flex-grow md:mx-0 mx-4 ">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex flex-col gap-6">
                            {/* Author Details */}
                            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                <div className="flex flex-row items-start gap-6">
                                    <div className="flex-grow">
                                        <h2 className="text-2xl font-semibold text-gray-800 mt-2">
                                            {author?.firstName && author?.lastName
                                                ? `${author.firstName} ${author.lastName}`
                                                : "Name not available"}
                                        </h2>
                                        {[
                                            author?.designation,
                                            author?.department,
                                            author?.university,
                                        ]
                                            .filter(Boolean)
                                            .length > 0 && (
                                                <p className="text-gray-700">
                                                    {[
                                                        author?.designation,
                                                        author?.department,
                                                        author?.university,
                                                    ]
                                                        .filter(Boolean)
                                                        .map((item, index, array) => (
                                                            <span key={index}>
                                                                {item}
                                                                {index < array.length - 1 && ", "}
                                                            </span>
                                                        ))}
                                                </p>
                                            )}
                                        {[
                                            author?.address && author?.country ? `${author.address.trim()}, ${author.country.trim()}` : author?.address || author?.country,
                                        ]
                                            .filter(Boolean)
                                            .length > 0 && (
                                                <p className="text-gray-700 mb-2">
                                                    {[
                                                        author?.address && author?.country ? `${author.address.trim()}, ${author.country.trim()}` : author?.address || author?.country,
                                                    ]
                                                        .filter(Boolean)
                                                        .map((item, index, array) => (
                                                            <span key={index}>
                                                                {item}
                                                            </span>
                                                        ))}
                                                </p>
                                            )}
                                        {author?.authorId && (
                                            <p className="text-gray-700 font-semibold">Author Id: {author?.authorId}</p>
                                        )}

                                        <p className="text-gray-700 font-semibold">Profile Views: 100</p>

                                    </div>
                                    <div className="flex-shrink-0">
                                        {author?.logo ? (
                                            <img
                                                src={`https://iassrd.com:8081${author.logo}`}
                                                alt={`${author?.firstName || "Author"} ${author?.lastName || ""}`}
                                                className="w-32 h-32 text-cover rounded-full shadow-md border border-gray-200"
                                                onError={(e) => (e.target.src = defaultImage)}
                                            />
                                        ) : (
                                            <img
                                                src={defaultImage}
                                                alt="Default Author"
                                                className="w-32 h-32 text-cover rounded-full shadow-md border border-gray-200"
                                            />
                                        )}
                                    </div>
                                    <div className="flex-shrink-0 bg-blue-100 p-10 rounded-lg">
                                        <h1 className="text-lg font-semibold text-gray-800 mb-2">Social Share</h1>
                                        <div className="flex space-x-4">
                                            <a
                                                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-green-500 hover:text-green-700"
                                            >
                                                <FaWhatsapp size={25} />
                                            </a>
                                            <a
                                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <FaFacebook size={25} />
                                            </a>
                                            <a
                                                href={`https://x.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-900 hover:text-gray-700"
                                            >
                                                <FaXTwitter size={25} />
                                            </a>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Charts Section */}
                            <div className="flex flex-row  font-IBM gap-2 ">
                                <div className="bg-white p-6 w-1/2 rounded-lg shadow-md ">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Papers Published</h3>
                                    <div className="h-64">
                                        <Bar
                                            data={papersPublishedByYearData}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: false,
                                                scales: {
                                                    y: {
                                                        beginAtZero: true,
                                                        title: {
                                                            display: true,
                                                            text: 'Number of Papers'
                                                        }
                                                    },
                                                    x: {
                                                        title: {
                                                            display: true,
                                                            text: 'Year'
                                                        }
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="bg-white p-6 w-1/2 rounded-lg shadow-md ">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Journal Published</h3>
                                    <div className="h-64">
                                        <Pie
                                            data={journalPublishedData}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: false,
                                            }}
                                        />
                                    </div>
                                </div>
                                {/* <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Subject Published</h3>
                                <div className="h-64">
                                    <Pie
                                        data={subjectPublishedData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                        }}
                                    />
                                </div>
                            </div> */}
                            </div>

                            {/* Articles Table */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden font-IBM">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">S.No</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Article Title</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Journal Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Volume / Issue</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Publication Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {articles.length > 0 ? (
                                            articles.map((article, index) => (
                                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                                                    <td className="px-6 py-4 text-sm">
                                                        <a
                                                            href={`/articles/volume_${article.volume}/issue_${article.issue}/${article.articleKey}`}
                                                            className="text-blue-600 hover:text-blue-800 hover:underline"
                                                        >
                                                            {article.articleTitle}
                                                        </a>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                        {journals[article.journalId]?.name || "Unknown Journal"}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                        {article.volume} / {article.issue}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                        {article.dateOfPublication || "N/A"}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                                    No articles found for this author.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default AuthorProfile;
