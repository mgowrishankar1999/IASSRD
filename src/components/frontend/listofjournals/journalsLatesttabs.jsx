import React, { useState, useEffect } from "react";
import { FaDownload, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const JournalArticlesTabs = ({ journalId }) => {
    const [activeTab, setActiveTab] = useState("Recently Published");
    const [articles, setArticles] = useState([]);
    const [journals, setJournals] = useState({});
    const [authors, setAuthors] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedAbstracts, setExpandedAbstracts] = useState({});

    // Helper function to format author display
    const formatAuthor = (author, authorId) => {
        if (!author) {
            console.warn(`No author data found for authorId: ${authorId}`);
            return `Author ID: ${authorId}`;
        }
        const parts = [];
        if (author.fullName && author.fullName.trim()) {
            parts.push(author.fullName.trim());
        }
        if (author.university && author.university.trim()) {
            parts.push(author.university.trim());
        }
        if (author.country && author.country.trim()) {
            parts.push(author.country.trim());
        }
        return parts.length > 0 ? parts.join(", ") : `Author ID: ${authorId}`;
    };

    // Toggle abstract expansion for a specific article
    const toggleAbstract = (articleId) => {
        setExpandedAbstracts((prev) => ({
            ...prev,
            [articleId]: !prev[articleId],
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch articles
                const articlesResponse = await fetch("https://iassrd.com:8081/api/v1/articles");
                if (!articlesResponse.ok) {
                    throw new Error(`Articles HTTP error! Status: ${articlesResponse.status}`);
                }
                const articlesData = await articlesResponse.json();
                let articlesArray = [];
                if (Array.isArray(articlesData)) {
                    articlesArray = articlesData;
                } else if (articlesData && Array.isArray(articlesData.data)) {
                    articlesArray = articlesData.data;
                } else {
                    throw new Error("Unexpected articles response format");
                }

                // Filter articles by journalId
                const filteredByJournal = articlesArray.filter(
                    (article) => article.journalId === journalId
                );

                // Fetch journals
                const journalsResponse = await fetch("https://iassrd.com:8081/api/v1/journals");
                if (!journalsResponse.ok) {
                    throw new Error(`Journals HTTP error! Status: ${journalsResponse.status}`);
                }
                const journalsData = await journalsResponse.json();
                let journalsArray = [];
                if (Array.isArray(journalsData)) {
                    journalsArray = journalsData;
                } else if (journalsData && Array.isArray(journalsData.data)) {
                    journalsArray = journalsData.data;
                } else {
                    throw new Error("Unexpected journals response format");
                }
                const journalsMap = journalsArray.reduce((acc, journal) => {
                    acc[journal.journalId] = {
                        journalName: journal.journalName,
                        abbrevation: journal.abbrevation,
                    };
                    return acc;
                }, {});

                // Fetch authors
                const authorsResponse = await fetch("https://iassrd.com:8081/api/v1/authors");
                if (!authorsResponse.ok) {
                    throw new Error(`Authors HTTP error! Status: ${authorsResponse.status}`);
                }
                const authorsData = await authorsResponse.json();
                let authorsArray = [];
                if (Array.isArray(authorsData)) {
                    authorsArray = authorsData;
                } else if (authorsData && Array.isArray(authorsData.data)) {
                    authorsArray = authorsData.data;
                } else {
                    throw new Error("Unexpected authors response format");
                }
                const authorsMap = authorsArray.reduce((acc, author) => {
                    if (!author.authorId) {
                        console.warn("Author missing authorId:", author);
                        return acc;
                    }
                    acc[author.authorId] = {
                        fullName: author.fullName || "",
                        university: author.university || "",
                        country: author.country || "",
                    };
                    return acc;
                }, {});

                setArticles(filteredByJournal);
                setJournals(journalsMap);
                setAuthors(authorsMap);
                setLoading(false);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message);
                setArticles([]);
                setLoading(false);
            }
        };

        fetchData();
    }, [journalId]);

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-600">Error: {error}</div>;
    }

    // Filter and sort articles based on active tab
    const filteredArticles = [...articles].sort((a, b) => {
        if (activeTab === "Recently Published") {
            return new Date(b.dateOfPublication) - new Date(a.dateOfPublication);
        } else if (activeTab === "Most Viewed") {
            return b.views - a.views;
        } else if (activeTab === "Most Downloaded") {
            return b.downloads - a.downloads;
        } else if (activeTab === "Most Cited") {
            return b.citation - a.citation;
        }
        return 0;
    }).slice(0, 5);

    return (
        <>
            <div className="flex items-center space-x-6 py-[15px] overflow-x-auto">
                {["Recently Published", "Most Viewed", "Most Downloaded", "Most Cited"].map((discipline) => (
                    <button
                        key={discipline}
                        className={`px-4 h-[35px] font-semibold text-[18px] transition-colors duration-300 whitespace-nowrap
              ${activeTab === discipline ? "border-b-2 border-blue-500 text-blue-500" : "text-stone-700 transition-transform duration-200 ease-in-out hover:-translate-y-[1px] hover:text-blue-500 border-b-2 border-stone-600 hover:border-blue-500 "}`}
                        onClick={() => setActiveTab(discipline)}
                    >
                        {discipline}
                    </button>
                ))}
            </div>

            {filteredArticles.length === 0 ? (
                <div className="text-center text-gray-600 py-6">This issue is currently awaiting publication. New and engaging articles will be available here soon.</div>
            ) : (
                <>
                    {filteredArticles.map((article, index) => (
                        <div
                            key={article.articleId}
                            className={` pb-6 mt-4  ${index === filteredArticles.length - 1 ? "border-b-0" : ""} mb-1`}
                        >
                            <div className="flex items-center space-x-3 mb-2 ">
                                <span className="text-sm font-medium text-indigo-600">Research Article</span>
                                <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                    Open Access
                                </span>
                            </div>
                            <h2 className="text-xl font-bold hover:text-red-700 text-title transition-colors duration-300 mb-2">
                                <Link
                                    to={`/articles/volume_${article.volume}/issue_${article.issue}/${article.articleKey}`}
                                    className="hover:underline"
                                >
                                    {article.articleTitle}
                                </Link>
                            </h2>
                            <div className="flex items-center space-x-2 mb-2">
                                {article.authorIds.split(",").map((authorId, idx) => {
                                    const trimmedAuthorId = authorId.trim();
                                    const author = authors[trimmedAuthorId];
                                    return (
                                        <span key={idx} className="text-base text-authortitle">
                                            {formatAuthor(author, trimmedAuthorId)}
                                            {idx < article.authorIds.split(",").length - 1 ? "," : ""}
                                        </span>
                                    );
                                })}
                            </div>
                            <p className="text-sm text-gray-600 mb-1">
                                <Link
                                    to={`/journal/${journals[article.journalId]?.abbrevation || article.journalId}`}
                                    className="text-indigo-600 hover:underline font-bold italic"
                                >
                                    {journals[article.journalId]?.journalName || `Journal ID: ${article.journalId}`}
                                </Link>
                                ,
                                {/* <Link
                                    to={`/journal/${journals[article.journalId]?.abbrevation || "abbrevation"}/volume_${article.volume}/issue_${article.issue}`}
                                    className="text-indigo-600 hover:underline ml-1"
                                >
                                    Volume {article.volume}, Issue {article.issue}
                                </Link>{" "}
                                {article.monthFrom} - {article.monthTo} {article.year} */}
                                <Link
                                    to={`/journal/${journals[article.journalId]?.abbrevation || "abbrevation"}/volume_${article.volume}/issue_${article.issue}`}
                                    className="text-indigo-600 hover:underline ml-1"
                                >
                                    Volume {article.volume}, Issue {article.issue}
                                </Link>{", "}
                                ({article.monthFrom} - {article.monthTo}) {article.year}
                                <span className="ml-2">Pages: {article.pageFrom}-{article.pageTo}</span>
                            </p>
                            {article.doi && (
                                <p className="text-sm text-gray-600 mb-1">
                                    DOI: <span className="text-indigo-600">{article.doi}</span>
                                </p>
                            )}
                            {article.dateOfPublication && (
                                <p className="font-bold text-gray-600 mb-2">
                                    Article ID: {article.articleKey} Published: {article.dateOfPublication}
                                </p>
                            )}
                            {article.abstractText && (
                                <div className="text-sm text-gray-700 mb-4">
                                    <span className="font-medium">Abstract: </span>
                                    <p
                                        className={`text-justify ${expandedAbstracts[article.articleId] ? "" : "line-clamp-2"}`}
                                    >
                                        {article.abstractText.replace(/<[^>]+>/g, "")}
                                    </p>
                                    <button
                                        onClick={() => toggleAbstract(article.articleId)}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-1"
                                    >
                                        {expandedAbstracts[article.articleId] ? "View Less" : "More"}
                                    </button>
                                </div>
                            )}
                            <div className="flex space-x-4">
                                <a
                                    href={`https://iassrd.com${article.articleFile}`}
                                    target="_blank"
                                    className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
                                    download
                                >
                                    <FaDownload />
                                    <span>Download PDF</span>
                                </a>
                                <Link
                                    to={`/articles/volume_${article.volume}/issue_${article.issue}/${article.articleKey}`}
                                    className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
                                >
                                    <FaEye />
                                    <span>View Online</span>
                                </Link>
                            </div>
                            <div class={` ${index === filteredArticles.length - 1 ? "border-b-0" : "border-b border-stone-600  mt-2"}`}></div>
                        </div>
                    ))}
                </>
            )}
        </>
    );
};

export default JournalArticlesTabs;