
import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Navbar from "../frontend/navbar";
import Footer from "../frontend/footer";
// import Space from "../../assets/herologo3.jpg";
import { FaFacebook, FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import defaultImage from "../../assets/defaultprofile.jpg"; // Add a default image file






Chart.register(...registerables);

const UniversityProfile = () => {
    const { affName } = useParams();
    const location = useLocation();
    const currentPath = location.pathname.split("/").filter(Boolean);

    const [university, setUniversity] = useState(null);
    const [articles, setArticles] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [journals, setJournals] = useState({});
    const [articleDetails, setArticleDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);


    const BASE_URL = "https://iassrd.com:8081/api/v1";


    useEffect(() => {
        // Decode the URL-encoded name and remove spaces
        const decodedAffName = decodeURIComponent(affName).replace(/\s+/g, '');
        console.log("University Name from params (combined):", decodedAffName);

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            if (!decodedAffName || decodedAffName.trim() === "") {
                setError("Invalid university name.");
                setIsLoading(false);
                return;
            }

            try {
                // Fetch all affiliations to find the matching affId
                const affiliationsRes = await axios.get(`${BASE_URL}/affiliations`);
                console.log("Affiliations response:", affiliationsRes.data);
                if (!affiliationsRes.data.success) {
                    throw new Error(affiliationsRes.data.message || "Error fetching affiliations.");
                }

                const affiliationsData = affiliationsRes.data.data;
                // Find affiliation by affName with spaces removed (case-insensitive)
                const targetAff = affiliationsData.find((aff) =>
                    aff.affName.replace(/\s+/g, '').toLowerCase() === decodedAffName.toLowerCase()
                );

                if (!targetAff) {
                    throw new Error("University not found.");
                }

                const affId = targetAff.affId;
                console.log("Found affId:", affId);

                // Fetch university details using the affId
                let affiliationRes;
                try {
                    console.log(`Attempting GET ${BASE_URL}/affiliations/${affId}`);
                    affiliationRes = await axios.get(`${BASE_URL}/affiliations/${affId}`);
                } catch (err) {
                    if (err.response?.status === 405) {
                        console.warn(`GET failed with 405, trying POST ${BASE_URL}/affiliations/${affId}`);
                        affiliationRes = await axios.post(`${BASE_URL}/affiliations/${affId}`);
                    } else {
                        throw err;
                    }
                }
                if (!affiliationRes.data.success || !affiliationRes.data.data?.length) {
                    throw new Error(affiliationRes.data.message || "Affiliation not found.");
                }
                const affiliationData = affiliationRes.data.data[0];
                console.log("Affiliation Data:", affiliationData);
                setUniversity(affiliationData);

                // Fetch authors
                const authorsRes = await axios.get(`${BASE_URL}/authors`);
                if (!authorsRes.data.success) {
                    throw new Error(authorsRes.data.message || "Error fetching authors.");
                }
                const authorsData = authorsRes.data.data;

                const affiliationAuthors = authorsData.filter(author => {
                    const hasValidId = author.authorId !== undefined && author.authorId !== null;
                    const matchesAffiliation = author.university?.trim().toLowerCase() === affiliationData.affName?.trim().toLowerCase();
                    return hasValidId && matchesAffiliation;
                });
                console.log("Filtered Authors:", affiliationAuthors);
                setAuthors(affiliationAuthors);

                const authorIds = affiliationAuthors.map(author => String(author.authorId));
                console.log("Author IDs:", authorIds);

                // Fetch articles
                const articlesRes = await axios.get(`${BASE_URL}/articles`);
                if (!articlesRes.data.success) {
                    throw new Error(articlesRes.data.message || "Error fetching articles.");
                }
                const articlesData = articlesRes.data.data;
                console.log("Articles Data:", articlesData);

                const affiliationArticles = articlesData.filter(article => {
                    if (!article.authorIds) return false;
                    const articleAuthorIds = article.authorIds.split(",").map(id => id.trim());
                    return articleAuthorIds.some(id => authorIds.includes(id));
                });
                console.log("Filtered Articles:", affiliationArticles);
                setArticles(affiliationArticles);
                setFilteredArticles(affiliationArticles);

                // Fetch journals
                const journalsRes = await axios.get(`${BASE_URL}/journals`);
                if (!journalsRes.data.success) {
                    throw new Error(journalsRes.data.message || "Error fetching journals.");
                }
                const journalsData = journalsRes.data.data;
                console.log("Journals Data:", journalsData);

                const journalMap = {};
                journalsData.forEach(journal => {
                    journalMap[journal.journalId] = {
                        name: journal.journalName || journal.name || "Unknown Journal",
                        abbreviation: journal.abbreviation || journal.abbrevation || "N/A",
                    };
                });
                console.log("Journal Map:", journalMap);
                setJournals(journalMap);

                const articleDetails = affiliationArticles.map(article => {
                    const articleAuthors = affiliationAuthors.filter(author =>
                        article.authorIds?.split(",").map(id => id.trim()).includes(String(author.authorId))
                    );

                    return {
                        articleTitle: article.articleTitle || "Untitled",
                        authors: articleAuthors.length > 0
                            ? articleAuthors
                                .map(author => `${author.firstName || ""} ${author.lastName || ""}`)
                                .filter(name => name.trim() !== "")
                                .join(", ")
                            : "Unknown Author",
                        journalName: journalMap[article.journalId]?.name || "Unknown Journal",
                        journalAbbreviation: journalMap[article.journalId]?.abbreviation || "N/A",
                        volume: article.volume || "N/A",
                        issue: article.issue || "N/A",
                        year: article.year || "N/A",
                        id: article.articleId || null,
                        articleKey: article.articleKey || article.articleId || null,
                    };
                });
                setArticleDetails(articleDetails);
                console.log("Article Details:", articleDetails);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message || "Failed to load data. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [affName]);

    useEffect(() => {
        if (searchQuery) {
            const filtered = articles.filter(article =>
                (article.articleTitle || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                (article.authors || "").toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredArticles(filtered);
        } else {
            setFilteredArticles(articles);
        }
    }, [searchQuery, articles]);

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

    if (!university) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col">
                <Navbar />
                <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <p className="text-center text-gray-500 text-lg">No affiliation found.</p>
                </div>
                <Footer />
            </div>
        );
    }

    const articlesByYear = {};
    articles.forEach(article => {
        const year = article.year || "Unknown";
        articlesByYear[year] = (articlesByYear[year] || 0) + 1;
    });

    const chartLabels = Object.keys(articlesByYear);
    const chartData = Object.values(articlesByYear);

    const articlesByYearData = {
        labels: chartLabels,
        datasets: [
            {
                label: "Documents Published Year Wise",
                data: chartData,
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
        ],
    };

    const articlesPieChartData = {
        labels: chartLabels,
        datasets: [
            {
                data: chartData,
                backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)", "rgba(255, 206, 86, 0.6)"],
            },
        ],
    };

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
            <div className={`min-h-screen px-[90px] bg-gray-100 flex flex-col ${isSearchOpen ? 'mt-[160px]' : 'mt-[80px]'}`}>

                <div
                    className="w-auto mx-10 h-48 bg-cover bg-right bg-no-repeat box-border"
                    style={{
                        // backgroundImage: `url(${Space})`,
                    }}
                >

                    <div className="flex  flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8">
                        <p className=" text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-700 font-IBM">
                            {university.affName || "Unknown"}
                        </p>
                        <h1 className="mt-3 text-lg sm:text-xl text-gray-700 max-w-2xl  ">
                            Affiliation Profile
                        </h1>
                    </div>
                </div>
                <main className="flex-grow  mx-4 md:mx-0 py-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex flex-col gap-6">

                            {/* Affiliation Details */}
                            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                <div className="flex flex-col sm:flex-row items-start gap-6">
                                    <div className="flex-grow">
                                        <h2 className="text-2xl font-semibold text-gray-800 ">
                                            {university.affName || "Unknown"}
                                        </h2>
                                        {university.address && (
                                            <p className="text-gray-700 mb-2">
                                                {/* <strong className="font-medium">Location:</strong>{" "} */}
                                                {university.address}, {university.country || "N/A"}
                                            </p>
                                        )}
                                        {university.website && (
                                            <p className="text-gray-700 mb-2">
                                                <strong className="font-medium">Website:</strong>{" "}
                                                <a
                                                    href={university.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 hover:underline"
                                                >
                                                    {university.website}
                                                </a>
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex-shrink-0">
                                        {university.logo ? (
                                            <img
                                                src={`https://iassrd.com:8081${university.logo}`}
                                                alt={university.affName || "Affiliation"}
                                                className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded shadow-md border border-gray-200"
                                                onError={(e) => (e.target.src = defaultImage)} />
                                        ) : (
                                            <img
                                                src={defaultImage}
                                                alt="Default Author"
                                                className="w-32 h-32 text-cover rounded-full shadow-md border border-gray-200"
                                            />
                                        )}
                                    </div>
                                    <div className="flex-shrink-0 bg-blue-100 p-8 rounded-lg">
                                        <h1 className="text-lg font-semibold text-gray-800 mb-2">Social Share</h1>
                                        {(() => {
                                            const shareUrl = `${window.location.origin}/universities/${encodeURIComponent(university.affName || "unknown").replace(/\s+/g, '')}`;
                                            const shareMessage = `Check out ${university.affName || "this university"}'s profile on our platform! ${shareUrl}`;
                                            return (
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
                                            );
                                        })()}
                                    </div>
                                </div>
                            </div>

                            {/* Charts Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Documents Published Year Wise</h3>
                                    <div className="w-full h-64">
                                        <Bar data={articlesByYearData} options={{ maintainAspectRatio: false }} />
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Percentage of Articles Published</h3>
                                    <div className="w-full h-64">
                                        <Pie data={articlesPieChartData} options={{ maintainAspectRatio: false }} />
                                    </div>
                                </div>
                            </div>

                            {/* Articles Table */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <h3 className="text-lg font-semibold text-gray-800 p-4 border-b border-gray-200">Articles Published</h3>
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">S.No</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Article Title</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Authors</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Journal Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Year</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Volume</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Issue</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {articleDetails.length > 0 ? (
                                            articleDetails.map((article, index) => (
                                                <tr key={article.id || index} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                                                    <td className="px-6 py-4 text-sm">
                                                        <a
                                                            href={`/articles/volume_${article.volume}/issue_${article.issue}/${article.articleKey}`}
                                                            className="text-blue-600 hover:text-blue-800 hover:underline"
                                                        >
                                                            {article.articleTitle}
                                                        </a>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{article.authors}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{article.journalName}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{article.year}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{article.volume}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{article.issue}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                                                    No articles found.
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

export default UniversityProfile;
