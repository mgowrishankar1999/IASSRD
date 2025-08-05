

import React, { useEffect, useState, useMemo } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Navbar from "./navbar";
import Footer from "./footer";
// import Space from "../../assets/herologo3.jpg";

Chart.register(...registerables);

const CountryProfile = () => {
    const { name } = useParams();
    const location = useLocation();
    const currentPath = location.pathname.split("/").filter(Boolean);

    const [authors, setAuthors] = useState([]);
    const [articles, setArticles] = useState([]);
    const [journals, setJournals] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [isSearchOpen, setIsSearchOpen] = useState('')

    const BASE_URL = "https://iassrd.com:8081/api/v1";
    const authorIds = useMemo(
        () =>
            Array.isArray(location.state?.authorIds)
                ? location.state.authorIds.filter(id => id != null).map(id => String(id))
                : [],
        [location.state?.authorIds]
    );

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                if (!name?.trim()) {
                    throw new Error("Invalid country name.");
                }
                console.log("Fetching data for country:", name);
                console.log("Author IDs:", authorIds);

                const authorsRes = await axios.get(`${BASE_URL}/authors`, { timeout: 5000 });
                console.log("Authors response:", authorsRes.data);
                if (!authorsRes.data.success) {
                    throw new Error(authorsRes.data.message || "Error fetching authors.");
                }
                const authorsData = authorsRes.data.data || [];

                const filteredAuthors = authorIds.length > 0
                    ? authorsData.filter(author => author.authorId != null && authorIds.includes(String(author.authorId)))
                    : authorsData.filter(author => author.country?.trim().toLowerCase() === name.trim().toLowerCase());

                if (filteredAuthors.length === 0) {
                    throw new Error("No authors found for this country.");
                }

                const authorIdsFiltered = filteredAuthors
                    .filter(author => author.authorId != null)
                    .map(author => String(author.authorId));

                const articlesRes = await axios.get(`${BASE_URL}/articles`, { timeout: 5000 });
                console.log("Articles response:", articlesRes.data);
                if (!articlesRes.data.success) {
                    throw new Error(articlesRes.data.message || "Error fetching articles.");
                }
                const articlesData = articlesRes.data.data || [];

                const filteredArticlesData = articlesData.filter(article =>
                    article.authorIds
                        ?.split(",")
                        .map(id => id.trim())
                        .some(id => authorIdsFiltered.includes(id))
                );

                const journalsRes = await axios.get(`${BASE_URL}/journals`, { timeout: 5000 });
                console.log("Journals response:", journalsRes.data);
                if (!journalsRes.data.success) {
                    throw new Error(journalsRes.data.message || "Error fetching journals.");
                }
                const journalsData = journalsRes.data.data || [];

                const journalMap = {};
                journalsData.forEach(journal => {
                    if (journal.journalId != null) {
                        journalMap[journal.journalId] = {
                            name: journal.journalName || journal.name || "Unknown Journal",
                            abbreviation: journal.abbreviation || journal.abbrevation || "N/A",
                        };
                    }
                });

                setAuthors(filteredAuthors);
                setArticles(filteredArticlesData);
                setJournals(journalMap);
                setFilteredArticles(filteredArticlesData);
            } catch (err) {
                console.error("Error fetching data:", err);
                console.error("Error details:", err.response?.data);
                setError(err.message || "Failed to load data. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [name, authorIds]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchQuery) {
                const filtered = articles.filter(article =>
                    (article.articleTitle || article.title || "").toLowerCase().includes(searchQuery.toLowerCase())
                );
                setFilteredArticles(filtered);
            } else {
                setFilteredArticles(articles);
            }
        }, 300);

        return () => clearTimeout(handler);
    }, [searchQuery, articles]);

    // Compute unique institutions
    const totalInstitutions = useMemo(() => {
        const institutions = authors
            .map(author => author.university || author.affiliation || null)
            .filter(university => university?.trim())
            .map(university => university.trim().toLowerCase());
        return new Set(institutions).size;
    }, [authors]);

    const articlesByYearData = useMemo(() => {
        const articlesByYear = articles.reduce((acc, article) => {
            const year = article.year || "Unknown";
            acc[year] = (acc[year] || 0) + 1;
            return acc;
        }, {});

        return {
            labels: Object.keys(articlesByYear),
            datasets: [
                {
                    label: "Articles by Year",
                    data: Object.values(articlesByYear),
                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
                },
            ],
        };
    }, [articles]);

    const totalAuthors = authors.length;
    const totalArticles = articles.length;
    const totalJournals = new Set(articles.map(article => article.journalId)).size;

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
            <div className={`min-h-screen flex flex-col ${isSearchOpen ? 'mt-[160px]' : 'mt-[80px]'}`}>

                <main className="md:mx-10 mx-4 py-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex flex-col gap-6">

                            {/* Country Details */}
                            <div className="flex flex-row gap-6">
                                <div className="w-1/2 bg-gray-50 rounded-lg p-6 border border-gray-200">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{name}</h2>
                                    <p className="text-gray-700 mb-2">
                                        <strong className="font-medium">Total Articles and Journals:</strong> {totalArticles} Articles and  {totalJournals} Journals
                                    </p>
                                    {/* <p className="text-gray-700 mb-2">
                                    <strong className="font-medium">Total Journals:</strong> {totalJournals}
                                </p> */}
                                    <p className="text-gray-700 mb-2">
                                        <strong className="font-medium">Total Authors:</strong> {totalAuthors}
                                    </p>
                                    <p className="text-gray-700 mb-2">
                                        <strong className="font-medium">Total Institutions:</strong> {totalInstitutions}
                                    </p>
                                </div>
                                {/* Chart */}
                                <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Articles by Year</h3>
                                    <div className="w-full h-64">
                                        <Bar data={articlesByYearData} options={{ maintainAspectRatio: false }} />
                                    </div>
                                </div>
                            </div>
                            {/* Articles Table */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <h3 className="text-lg font-semibold text-gray-800 p-4 border-b border-gray-200">Articles Published</h3>
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                S.No
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Article Title
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Journal Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Volume / Issue
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Publication Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {articles.length > 0 ? (
                                            articles.map((article, index) => (
                                                <tr key={article.articleId || index} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                                                    <td className="px-6 py-4 text-sm">
                                                        <Link
                                                            to={`/articles/volume_${article.volume}/issue_${article.issue}/${article.articleKey}`}
                                                            state={{ id: article.articleId }}
                                                            className="text-blue-600 hover:text-blue-800 hover:underline"
                                                        >
                                                            {article.articleTitle || article.title || "Untitled"}
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                        {journals[article.journalId]?.name || "Unknown Journal"}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                        {article.volume || "N/A"} / {article.issue || "N/A"}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                        <p>{article.dateOfPublication || "N/A"}</p>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
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
                <Footer />
            </div>
        </>
    );
};

export default CountryProfile;
