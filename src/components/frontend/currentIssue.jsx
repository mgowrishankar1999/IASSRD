// import React, { useState, useEffect, useContext } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../frontend/navbar";
// import Footer from "../frontend/footer";
// import Sidebar from "../../components/common/frontendSidebar";
// import JournalContext from "../../components/common/journalContext";
// import { FaDownload, FaEye } from "react-icons/fa";

// const BASE_URL = "https://iassrd.com:8081/api/v1";

// const CurrentIssue = () => {
//     const { journalAbbrevation } = useParams();
//     const { journals, loading: contextLoading, error: contextError } = useContext(JournalContext);
//     const [isSearchOpen, setIsSearchOpen] = useState(false);
//     const [articles, setArticles] = useState([]);
//     const [journal, setJournal] = useState(null);
//     const [authors, setAuthors] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [expandedAbstracts, setExpandedAbstracts] = useState({});

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);

//                 // Wait for JournalContext to finish loading
//                 if (contextLoading) {
//                     console.log("CurrentIssue - Waiting for JournalContext to load...");
//                     return;
//                 }

//                 if (contextError) {
//                     throw new Error(`JournalContext error: ${contextError}`);
//                 }

//                 // Find journal from JournalContext with case-insensitive matching
//                 let matchedJournal = Array.isArray(journals)
//                     ? journals.find(
//                         (j) =>
//                             (j.abbrevation &&
//                                 j.abbrevation.toLowerCase() === journalAbbrevation.toLowerCase()) ||
//                             (j.journalKey &&
//                                 j.journalKey.toLowerCase() === journalAbbrevation.toLowerCase())
//                     )
//                     : null;

//                 // Fallback: Fetch journals directly if not found in context or context is empty
//                 if (!matchedJournal && (!journals || journals.length === 0)) {
//                     console.log("CurrentIssue - Journals not found in context, fetching directly...");
//                     try {
//                         const journalsResponse = await axios.get(`${BASE_URL}/journals`);
//                         const journalsData = journalsResponse.data.data || [];
//                         matchedJournal = journalsData.find(
//                             (j) =>
//                                 (j.abbrevation &&
//                                     j.abbrevation.toLowerCase() === journalAbbrevation.toLowerCase()) ||
//                                 (j.journalKey &&
//                                     j.journalKey.toLowerCase() === journalAbbrevation.toLowerCase())
//                         );
//                         if (!matchedJournal) {
//                             throw new Error(
//                                 `Journal not found for abbreviation or key: ${journalAbbrevation}`
//                             );
//                         }
//                     } catch (apiError) {
//                         throw new Error(`Failed to fetch journals: ${apiError.message}`);
//                     }
//                 }

//                 if (!matchedJournal) {
//                     throw new Error(`Journal not found for abbreviation: ${journalAbbrevation}`);
//                 }

//                 console.log("CurrentIssue - Found journal:", matchedJournal);
//                 setJournal(matchedJournal);

//                 // Fetch articles and authors
//                 const [articlesRes, authorsRes] = await Promise.all([
//                     axios.get(`${BASE_URL}/articles`),
//                     axios.get(`${BASE_URL}/authors`),
//                 ]);

//                 const articlesData = articlesRes.data.data || [];
//                 const authorsData = authorsRes.data.data || [];

//                 // Create authors map
//                 const authorsMap = authorsData.reduce((acc, author) => {
//                     acc[author.authorId] = {
//                         fullName: author.fullName,
//                         university: author.university,
//                         country: author.country,
//                     };
//                     return acc;
//                 }, {});

//                 setAuthors(authorsMap);

//                 // Filter articles by journalId
//                 const filteredArticles = articlesData.filter(
//                     (article) =>
//                         article.journalId.toString() === matchedJournal.journalId.toString()
//                 );

//                 console.log("CurrentIssue - Fetched Articles:", filteredArticles);

//                 if (filteredArticles.length === 0) {
//                     throw new Error("No articles found for this journal.");
//                 }

//                 // Determine the latest issue
//                 const latestIssue = filteredArticles.reduce(
//                     (latest, article) => {
//                         const articleYear = parseInt(article.year || "0", 10);
//                         const articleVolume = parseInt(article.volume || "0", 10);
//                         const articleIssue = parseInt(article.issue || "0", 10);
//                         const latestYear = parseInt(latest.year || "0", 10);
//                         const latestVolume = parseInt(latest.volume || "0", 10);
//                         const latestIssueNum = parseInt(latest.issue || "0", 10);

//                         if (
//                             articleYear > latestYear ||
//                             (articleYear === latestYear && articleVolume > latestVolume) ||
//                             (articleYear === latestYear &&
//                                 articleVolume === latestVolume &&
//                                 articleIssue > latestIssueNum)
//                         ) {
//                             return {
//                                 year: article.year,
//                                 volume: article.volume,
//                                 issue: article.issue,
//                             };
//                         }
//                         return latest;
//                     },
//                     { year: "0", volume: "0", issue: "0" }
//                 );

//                 console.log("CurrentIssue - Latest Issue:", latestIssue);

//                 // Filter articles for the latest issue
//                 const latestArticles = filteredArticles.filter(
//                     (article) =>
//                         article.year === latestIssue.year &&
//                         article.volume === latestIssue.volume &&
//                         article.issue === latestIssue.issue
//                 );

//                 // Validate and set articles
//                 if (latestArticles.length > 0) {
//                     latestArticles.forEach((article) => {
//                         if (article.authorIds) {
//                             const authorIdsArray = article.authorIds
//                                 .split(",")
//                                 .map((id) => id.trim())
//                                 .filter((id) => id);
//                             authorIdsArray.forEach((id) => {
//                                 if (!authorsMap[id]) {
//                                     console.warn(`Author ID ${id} not found in authorsMap`);
//                                 }
//                             });
//                         } else {
//                             console.warn(`No authorIds found in article ${article.articleId}`);
//                         }
//                     });
//                     setArticles(latestArticles);
//                 } else {
//                     throw new Error("No articles found for the latest issue.");
//                 }

//                 setLoading(false);
//             } catch (err) {
//                 console.error("CurrentIssue - Error fetching data:", err);
//                 setError(err.message || "Failed to load articles.");
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [journalAbbrevation, journals, contextLoading, contextError]);

//     const formatDate = (dateString) => {
//         if (!dateString) return "N/A";
//         const date = new Date(dateString);
//         return date.toLocaleDateString("en-GB", {
//             day: "numeric",
//             month: "long",
//             year: "numeric",
//         });
//     };

//     const truncateAbstract = (text) => {
//         if (!text) return "";
//         const cleanText = text.replace(/<[^>]+>/g, "");
//         if (cleanText.length <= 200) return cleanText;
//         return cleanText.substring(0, 200) + "...";
//     };

//     const formatAuthor = (author, authorId) => {
//         if (!author || !author.fullName) {
//             console.warn(`Author data missing for authorId: ${authorId}`);
//             return "Unknown Author";
//         }
//         const parts = [];
//         if (author.fullName && author.fullName.trim()) {
//             parts.push(author.fullName.trim());
//         }
//         if (author.university && author.university.trim()) {
//             parts.push(author.university.trim());
//         }
//         if (author.country && author.country.trim()) {
//             parts.push(author.country.trim());
//         }
//         return parts.length > 0 ? parts.join(", ") : "Unknown Author";
//     };

//     const handleDownload = async (article) => {
//         if (!article || !article.articleFile) {
//             console.error("Article or article file is missing.");
//             alert("Unable to download: Article or file is missing.");
//             return;
//         }

//         const fileUrl = `https://iassrd.com${article.articleFile}`;

//         try {
//             const newWindow = window.open(fileUrl, "_blank");
//             if (!newWindow) {
//                 console.warn("Window opening was blocked or failed. Prompting manual download.");
//                 alert("Pop-up blocked. Please allow pop-ups or download the file manually.");
//                 const link = document.createElement("a");
//                 link.href = fileUrl;
//                 link.download = "";
//                 document.body.appendChild(link);
//                 link.click();
//                 document.body.removeChild(link);
//             }

//             const nextDownloadCount = parseInt(article.downloads || 0) + 1;

//             await axios.patch(
//                 `${BASE_URL}/articles/${article.articleId}/update-downloads`,
//                 null,
//                 {
//                     params: { downloads: nextDownloadCount },
//                     headers: { "Content-Type": "application/json" },
//                 }
//             );
//         } catch (error) {
//             console.error("Error updating download count:", error);
//             alert("An error occurred while updating the download count. The file should still download.");
//         }
//     };

//     const toggleAbstract = (articleId) => {
//         setExpandedAbstracts((prev) => ({
//             ...prev,
//             [articleId]: !prev[articleId],
//         }));
//     };

//     if (loading || contextLoading) {
//         return <div className="text-center py-10 text-gray-600">Loading...</div>;
//     }

//     if (error || contextError) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
//                 <div className="text-center text-red-600 text-lg font-medium">
//                     {error || contextError}
//                 </div>
//             </div>
//         );
//     }

//     if (!journal || articles.length === 0) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
//                 <div className="text-center text-red-600 text-lg font-medium">
//                     No journal or articles found.
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <>
//             <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
//             <div className={`px-[80px] py-[30px] ${isSearchOpen ? "mt-[160px]" : "mt-[80px]"}`}>
//                 <header className="px-6 py-4">
//                     <nav className="text-sm text-gray-500">
//                         <Link to="/" className="hover:underline">
//                             Home
//                         </Link>{" "}
//                         / <span className="text-teal-600">Current Issue</span>
//                     </nav>
//                 </header>
//                 <div className="flex mt-8">
//                     <Sidebar journalAbbrevation={journalAbbrevation} dynamicProps={journal} />
//                     <div className="w-[75vw] ps-6 h-auto">
//                         <p className="text-3xl text-blue-800 font-bold mb-5">{journal?.journalName}</p>
//                         <p className="border-b border-gray-300 mb-8"></p>
//                         <p className="text-xl text-gray-700 font-semibold mb-8">
//                             Current Issue: Volume {articles[0]?.volume}, Issue {articles[0]?.issue},{" "}
//                             {articles[0]?.monthFrom} - {articles[0]?.monthTo} {articles[0]?.year}
//                         </p>
//                         <div className="bg-gradient-to-b from-gray-50 to-white min-h-[400px] py-6 px-8">
//                             {articles.map((article, index) => (
//                                 <div
//                                     key={article.articleId}
//                                     className={`pb-6 mt-4 ${index === articles.length - 1 ? "border-b-0" : "border-b border-stone-600"
//                                         } mb-1`}
//                                 >
//                                     <div className="flex items-center space-x-3 mb-2">
//                                         <span className="text-sm font-medium text-indigo-600">
//                                             {article.articleType || "Research Article"}
//                                         </span>
//                                         <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
//                                             Open Access
//                                         </span>
//                                     </div>
//                                     <h2 className="text-xl font-bold hover:text-red-700 transition-colors duration-300 mb-2">
//                                         <Link
//                                             to={`/articles/volume_${article.volume}/issue_${article.issue}/${article.articleKey}`}
//                                             className="hover:underline"
//                                         >
//                                             {article.articleTitle}
//                                         </Link>
//                                     </h2>
//                                     <div className="flex items-center space-x-2 mb-2">
//                                         {article.authorIds?.split(",").map((authorId, idx) => {
//                                             const trimmedAuthorId = authorId.trim();
//                                             const author = authors[trimmedAuthorId];
//                                             return (
//                                                 <span key={idx} className="text-base text-gray-800">
//                                                     {formatAuthor(author, trimmedAuthorId)}
//                                                     {idx < article.authorIds.split(",").length - 1 ? "," : ""}
//                                                 </span>
//                                             );
//                                         })}
//                                     </div>
//                                     <p className="text-sm text-gray-600 mb-1">
//                                         <Link
//                                             to={`/journal/${journalAbbrevation}`}
//                                             className="text-indigo-600 hover:underline font-bold italic"
//                                         >
//                                             {journal?.journalName || `Journal ID: ${article.journalId}`}
//                                         </Link>
//                                         ,{" "}
//                                         <Link
//                                             to={`/journal/${journalAbbrevation}/volume_${article.volume}/issue_${article.issue}`}
//                                             className="text-indigo-600 hover:underline ml-1"
//                                         >
//                                             Volume {article.volume}, Issue {article.issue}
//                                         </Link>{" "}
//                                         {article.monthFrom} - {article.monthTo} {article.year}
//                                         <span className="ml-2">
//                                             Pages: {article.pageFrom}-{article.pageTo}
//                                         </span>
//                                     </p>
//                                     {article.doi && (
//                                         <p className="text-sm text-gray-600 mb-1">
//                                             DOI: <span className="text-indigo-600">{article.doi}</span>
//                                         </p>
//                                     )}
//                                     {article.dateOfPublication && (
//                                         <p className="font-bold text-gray-600 mb-2">
//                                             Article ID: {article.articleKey} Published:{" "}
//                                             {formatDate(article.dateOfPublication)}
//                                         </p>
//                                     )}
//                                     {article.abstractText && (
//                                         <p className="text-sm text-gray-700 mb-4">
//                                             <span className="font-medium">Abstract: </span>
//                                             {expandedAbstracts[article.articleId] ? (
//                                                 <>
//                                                     {article.abstractText.replace(/<[^>]+>/g, "")}
//                                                     <button
//                                                         onClick={() => toggleAbstract(article.articleId)}
//                                                         className="text-indigo-600 hover:text-indigo-800 ml-2 text-sm"
//                                                     >
//                                                         Read Less
//                                                     </button>
//                                                 </>
//                                             ) : (
//                                                 <>
//                                                     {truncateAbstract(article.abstractText)}
//                                                     {article.abstractText.replace(/<[^>]+>/g, "").length > 200 && (
//                                                         <button
//                                                             onClick={() => toggleAbstract(article.articleId)}
//                                                             className="text-indigo-600 hover:text-indigo-800 ml-2 text-sm"
//                                                         >
//                                                             Read More
//                                                         </button>
//                                                     )}
//                                                 </>
//                                             )}
//                                         </p>
//                                     )}
//                                     <div className="flex space-x-4">
//                                         <button
//                                             onClick={() => handleDownload(article)}
//                                             className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
//                                         >
//                                             <FaDownload />
//                                             <span>Download PDF</span>
//                                         </button>
//                                         <Link
//                                             to={`/articles/volume_${article.volume}/issue_${article.issue}/${article.articleKey}`}
//                                             className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
//                                         >
//                                             <FaEye />
//                                             <span>View Online</span>
//                                         </Link>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default CurrentIssue;















import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../frontend/navbar";
import Footer from "../frontend/footer";
import Sidebar from "../../components/common/frontendSidebar";
import JournalContext from "../../components/common/journalContext";
import { FaDownload, FaEye } from "react-icons/fa";

const BASE_URL = "https://iassrd.com:8081/api/v1";

const CurrentIssue = () => {
    const { journalAbbrevation } = useParams();
    const { journals, loading: contextLoading, error: contextError } = useContext(JournalContext);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [articles, setArticles] = useState([]);
    const [journal, setJournal] = useState(null);
    const [authors, setAuthors] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedAbstracts, setExpandedAbstracts] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Wait for JournalContext to finish loading
                if (contextLoading) {
                    console.log("CurrentIssue - Waiting for JournalContext to load...");
                    return;
                }

                if (contextError) {
                    throw new Error(`JournalContext error: ${contextError}`);
                }

                // Find journal from JournalContext with case-insensitive matching
                let matchedJournal = Array.isArray(journals)
                    ? journals.find(
                        (j) =>
                            (j.abbrevation &&
                                j.abbrevation.toLowerCase() === journalAbbrevation.toLowerCase()) ||
                            (j.journalKey &&
                                j.journalKey.toLowerCase() === journalAbbrevation.toLowerCase())
                    )
                    : null;

                // Fallback: Fetch journals directly if not found in context or context is empty
                if (!matchedJournal && (!journals || journals.length === 0)) {
                    console.log("CurrentIssue - Journals not found in context, fetching directly...");
                    try {
                        const journalsResponse = await axios.get(`${BASE_URL}/journals`);
                        const journalsData = journalsResponse.data.data || [];
                        matchedJournal = journalsData.find(
                            (j) =>
                                (j.abbrevation &&
                                    j.abbrevation.toLowerCase() === journalAbbrevation.toLowerCase()) ||
                                (j.journalKey &&
                                    j.journalKey.toLowerCase() === journalAbbrevation.toLowerCase())
                        );
                        if (!matchedJournal) {
                            throw new Error(
                                `Journal not found for abbreviation or key: ${journalAbbrevation}`
                            );
                        }
                    } catch (apiError) {
                        throw new Error(`Failed to fetch journals: ${apiError.message}`);
                    }
                }

                if (!matchedJournal) {
                    throw new Error(`Journal not found for abbreviation: ${journalAbbrevation}`);
                }

                console.log("CurrentIssue - Found journal:", matchedJournal);
                setJournal(matchedJournal);

                // Fetch articles and authors
                const [articlesRes, authorsRes] = await Promise.all([
                    axios.get(`${BASE_URL}/articles`),
                    axios.get(`${BASE_URL}/authors`),
                ]);

                const articlesData = articlesRes.data.data || [];
                const authorsData = authorsRes.data.data || [];

                // Create authors map
                const authorsMap = authorsData.reduce((acc, author) => {
                    acc[author.authorId] = {
                        fullName: author.fullName,
                        university: author.university,
                        country: author.country,
                    };
                    return acc;
                }, {});

                setAuthors(authorsMap);

                // Filter articles by journalId
                const filteredArticles = articlesData.filter(
                    (article) =>
                        article.journalId.toString() === matchedJournal.journalId.toString() &&
                        article.dateOfPublication // Ensure dateOfPublication exists
                );

                console.log("CurrentIssue - Fetched Articles:", filteredArticles);

                if (filteredArticles.length === 0) {
                    throw new Error("No articles found for this journal with valid publication dates.");
                }

                // Determine the latest issue based on dateOfPublication
                const latestArticle = filteredArticles.reduce(
                    (latest, article) => {
                        const articleDate = article.dateOfPublication
                            ? new Date(article.dateOfPublication)
                            : new Date(0); // Fallback to epoch if date is missing
                        const latestDate = latest.dateOfPublication
                            ? new Date(latest.dateOfPublication)
                            : new Date(0);

                        if (isNaN(articleDate.getTime())) {
                            console.warn(
                                `Invalid dateOfPublication for article ${article.articleId}: ${article.dateOfPublication}`
                            );
                            return latest;
                        }

                        return articleDate > latestDate
                            ? {
                                dateOfPublication: article.dateOfPublication,
                                volume: article.volume,
                                issue: article.issue,
                            }
                            : latest;
                    },
                    { dateOfPublication: null, volume: "0", issue: "0" }
                );

                if (!latestArticle.dateOfPublication) {
                    throw new Error("No articles with valid publication dates found.");
                }

                console.log("CurrentIssue - Latest Article:", latestArticle);

                // Filter articles for the latest issue (same volume and issue)
                const latestArticles = filteredArticles.filter(
                    (article) =>
                        article.volume === latestArticle.volume &&
                        article.issue === latestArticle.issue
                );

                // Validate and set articles
                if (latestArticles.length > 0) {
                    latestArticles.forEach((article) => {
                        if (article.authorIds) {
                            const authorIdsArray = article.authorIds
                                .split(",")
                                .map((id) => id.trim())
                                .filter((id) => id);
                            authorIdsArray.forEach((id) => {
                                if (!authorsMap[id]) {
                                    console.warn(`Author ID ${id} not found in authorsMap`);
                                }
                            });
                        } else {
                            console.warn(`No authorIds found in article ${article.articleId}`);
                        }
                    });
                    setArticles(latestArticles);
                } else {
                    throw new Error("No articles found for the latest issue.");
                }

                setLoading(false);
            } catch (err) {
                console.error("CurrentIssue - Error fetching data:", err);
                setError(err.message || "Failed to load articles.");
                setLoading(false);
            }
        };

        fetchData();
    }, [journalAbbrevation, journals, contextLoading, contextError]);

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "Invalid Date";
        return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const truncateAbstract = (text) => {
        if (!text) return "";
        const cleanText = text.replace(/<[^>]+>/g, "");
        if (cleanText.length <= 200) return cleanText;
        return cleanText.substring(0, 200) + "...";
    };

    const formatAuthor = (author, authorId) => {
        if (!author || !author.fullName) {
            console.warn(`Author data missing for authorId: ${authorId}`);
            return "Unknown Author";
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
        return parts.length > 0 ? parts.join(", ") : "Unknown Author";
    };

    const handleDownload = async (article) => {
        if (!article || !article.articleFile) {
            console.error("Article or article file is missing.");
            alert("Unable to download: Article or file is missing.");
            return;
        }

        const fileUrl = `https://iassrd.com${article.articleFile}`;

        try {
            const newWindow = window.open(fileUrl, "_blank");
            if (!newWindow) {
                console.warn("Window opening was blocked or failed. Prompting manual download.");
                alert("Pop-up blocked. Please allow pop-ups or download the file manually.");
                const link = document.createElement("a");
                link.href = fileUrl;
                link.download = "";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

            const nextDownloadCount = parseInt(article.downloads || 0) + 1;

            await axios.patch(
                `${BASE_URL}/articles/${article.articleId}/update-downloads`,
                null,
                {
                    params: { downloads: nextDownloadCount },
                    headers: { "Content-Type": "application/json" },
                }
            );
        } catch (error) {
            console.error("Error updating download count:", error);
            alert("An error occurred while updating the download count. The file should still download.");
        }
    };

    const toggleAbstract = (articleId) => {
        setExpandedAbstracts((prev) => ({
            ...prev,
            [articleId]: !prev[articleId],
        }));
    };

    if (loading || contextLoading) {
        return <div className="text-center py-10 text-gray-600">Loading...</div>;
    }

    if (error || contextError) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
                <div className="text-center text-red-600 text-lg font-medium">
                    {error || contextError}
                </div>
            </div>
        );
    }

    if (!journal || articles.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
                <div className="text-center text-red-600 text-lg font-medium">
                    No journal or articles found.
                </div>
            </div>
        );
    }

    return (
        <>
        {}
            <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
            <div className={`px-[80px] py-[30px] ${isSearchOpen ? "mt-[140px]" : "mt-[60px]"}`}>
                {/* <header className="px-6 py-4">
                    <nav className="text-sm text-gray-500">
                        <Link to="/" className="hover:underline">
                            Home
                        </Link>{" "}
                        / <span className="text-teal-600">Current Issue</span>
                    </nav>
                </header> */}
                <div className="flex mt-8">
                    <Sidebar journalAbbrevation={journalAbbrevation} dynamicProps={journal} />
                    <div className="w-[75vw] ps-6 h-auto">
                        <p className="text-3xl text-blue-800 font-bold mb-5">{journal?.journalName}</p>
                        <p className="border-b border-gray-300 mb-8"></p>
                        <p className="text-xl text-gray-700 font-semibold mb-8">
                            Current Issue: Volume {articles[0]?.volume}, Issue {articles[0]?.issue},{" "}
                            {articles[0]?.monthFrom} - {articles[0]?.monthTo} {articles[0]?.year}
                        </p>
                        <div className="bg-gradient-to-b from-gray-50 to-white min-h-[400px] py-6 px-8">
                            {articles.map((article, index) => (
                                <div
                                    key={article.articleId}
                                    className={`pb-6 mt-4 ${index === articles.length - 1 ? "border-b-0" : "border-b border-stone-600"
                                        } mb-1`}
                                >
                                    <div className="flex items-center space-x-3 mb-2">
                                        <span className="text-sm font-medium text-indigo-600">
                                            {article.articleType || "Research Article"}
                                        </span>
                                        <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                            Open Access
                                        </span>
                                    </div>
                                    <h2 className="text-xl font-bold hover:text-red-700 transition-colors duration-300 mb-2">
                                        <Link
                                            to={`/articles/volume_${article.volume}/issue_${article.issue}/${article.articleKey}`}
                                            className="hover:underline"
                                        >
                                            {article.articleTitle}
                                        </Link>
                                    </h2>
                                    <div className="flex items-center space-x-2 mb-2">
                                        {article.authorIds?.split(",").map((authorId, idx) => {
                                            const trimmedAuthorId = authorId.trim();
                                            const author = authors[trimmedAuthorId];
                                            return (
                                                <span key={idx} className="text-base text-gray-800">
                                                    {formatAuthor(author, trimmedAuthorId)}
                                                    {idx < article.authorIds.split(",").length - 1 ? "," : ""}
                                                </span>
                                            );
                                        })}
                                    </div>
                                    <p className="text-sm text-gray-600 mb-1">
                                        <Link
                                            to={`/journal/${journalAbbrevation}`}
                                            className="text-indigo-600 hover:underline font-bold italic"
                                        >
                                            {journal?.journalName || `Journal ID: ${article.journalId}`}
                                        </Link>
                                        ,{" "}
                                        <Link
                                            to={`/journal/${journalAbbrevation}/volume_${article.volume}/issue_${article.issue}`}
                                            className="text-indigo-600 hover:underline ml-1"
                                        >
                                            Volume {article.volume}, Issue {article.issue}
                                        </Link>{" "}
                                        {article.monthFrom} - {article.monthTo} {article.year}
                                        <span className="ml-2">
                                            Pages: {article.pageFrom}-{article.pageTo}
                                        </span>
                                    </p>
                                    {article.doi && (
                                        <p className="text-sm text-gray-600 mb-1">
                                            DOI: <span className="text-indigo-600">{article.doi}</span>
                                        </p>
                                    )}
                                    {article.dateOfPublication && (
                                        <p className="font-bold text-gray-600 mb-2">
                                            Article ID: {article.articleKey} Published:{" "}
                                            {formatDate(article.dateOfPublication)}
                                        </p>
                                    )}
                                    {article.abstractText && (
                                        <p className="text-sm text-gray-700 mb-4">
                                            <span className="font-medium">Abstract: </span>
                                            {expandedAbstracts[article.articleId] ? (
                                                <>
                                                    {article.abstractText.replace(/<[^>]+>/g, "")}
                                                    <button
                                                        onClick={() => toggleAbstract(article.articleId)}
                                                        className="text-indigo-600 hover:text-indigo-800 ml-2 text-sm"
                                                    >
                                                        Read Less
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    {truncateAbstract(article.abstractText)}
                                                    {article.abstractText.replace(/<[^>]+>/g, "").length > 200 && (
                                                        <button
                                                            onClick={() => toggleAbstract(article.articleId)}
                                                            className="text-indigo-600 hover:text-indigo-800 ml-2 text-sm"
                                                        >
                                                            Read More
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                        </p>
                                    )}
                                    <div className="flex space-x-4">
                                        <button
                                            onClick={() => handleDownload(article)}
                                            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
                                        >
                                            <FaDownload />
                                            <span>Download PDF</span>
                                        </button>
                                        <Link
                                            to={`/articles/volume_${article.volume}/issue_${article.issue}/${article.articleKey}`}
                                            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
                                        >
                                            <FaEye />
                                            <span>View Online</span>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CurrentIssue;