// // import React from "react";
// // import Navbar from "./navbar";
// // import Footer from "./footer";
// // import Sidebar from "../common/frontendSidebar";
// // import { useState, useEffect } from "react";
// // import JournalContext from "../common/journalContext";
// // import { useParams } from "react-router-dom";
// // import { useContext } from "react";

// // const ArchiveMaincontent = () => {

// //     // for navbar--------
// //     const [isSearchOpen, setIsSearchOpen] = useState(false);
// //     const { journalAbbrevation } = useParams();


// //     const { journals, loading: contextLoading, error: contextError } = useContext(JournalContext);
// //     console.log('journals array:', journals);


// //     const journal = Array.isArray(journals) ? journals.find((j) => j.abbrevation === journalAbbrevation) : null;
// //     console.log('Found journal:', journal);

// //     const [loading, setLoading] = useState(contextLoading);
// //     const [error, setError] = useState(contextError);


// //     useEffect(() => {
// //         if (!contextLoading && !contextError && !journal) {
// //             setError(`Journal not found for abbreviation: ${journalAbbrevation}`);
// //         }
// //     }, [contextLoading, contextError, journal, journalAbbrevation]);
// //     return (

// //         <>
// //             <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />


// //             <div className={`px-[80px] py-[30px] ${isSearchOpen ? "mt-[160px]" : "mt-[80px]"}`}>
// //                 <div className="flex mt-8">
// //                     <Sidebar
// //                         journalAbbreviation={journalAbbrevation}
// //                         dynamicProps={journal}
// //                     />

// //                     <div className="w-[75vw] ps-6  h-auto">
// //                         <p className="text-3xl text-blue-800 font-bold mb-5 ">{journal?.journalName} </p>
// //                         <p class='border-b border-gray-300 mb-8'></p>
// //                         <p className="text-xl text-gray-700 font-semibold mb-8">Archives</p>

// //                     </div>
// //                     <div
// //                         key={article.articleId}
// //                         className={` pb-6 mt-4 px-[80px] ${index === filteredArticles.length - 1 ? "border-b-0" : ""} mb-1`}
// //                     >
// //                         <div className="flex items-center space-x-3 mb-2 ">
// //                             <span className="text-sm font-medium text-indigo-600">Research Article</span>
// //                             <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
// //                                 Open Access
// //                             </span>
// //                         </div>
// //                         <h2 className="text-xl font-bold hover:text-red-700 text-title transition-colors duration-300 mb-2">
// //                             <Link
// //                                 to={`/articles/volume_${article.volume}/issue_${article.issue}/${article.articleKey}`}
// //                                 className="hover:underline"
// //                             >
// //                                 {article.articleTitle}
// //                             </Link>
// //                         </h2>
// //                         <div className="flex items-center space-x-2 mb-2">
// //                             {article.authorIds.split(",").map((authorId, idx) => {
// //                                 const trimmedAuthorId = authorId.trim();
// //                                 const author = authors[trimmedAuthorId];
// //                                 return (
// //                                     <span key={idx} className="text-base text-authortitle">
// //                                         {formatAuthor(author, trimmedAuthorId)}
// //                                         {idx < article.authorIds.split(",").length - 1 ? "," : ""}
// //                                     </span>
// //                                 );
// //                             })}
// //                         </div>
// //                         <p className="text-sm text-gray-600 mb-1">
// //                             <Link
// //                                 to={`/journals/${journals[article.journalId]?.abbrevation || article.journalId}`}
// //                                 className="text-indigo-600 hover:underline font-bold italic"
// //                             >
// //                                 {journals[article.journalId]?.journalName || `Journal ID: ${article.journalId}`}
// //                             </Link>
// //                             ,
// //                             <Link
// //                                 to={`/journals/${journals[article.journalId]?.abbrevation || "abbrevation"}/volume_${article.volume}/issue_${article.issue}`}
// //                                 className="text-indigo-600 hover:underline ml-1"
// //                             >
// //                                 Volume {article.volume}, Issue {article.issue}
// //                             </Link>{" "}
// //                             {article.monthFrom} - {article.monthTo} {article.year}
// //                             <span className="ml-2">Pages: {article.pageFrom}-{article.pageTo}</span>
// //                         </p>
// //                         {article.doi && (
// //                             <p className="text-sm text-gray-600 mb-1">
// //                                 DOI: <span className="text-indigo-600">{article.doi}</span>
// //                             </p>
// //                         )}
// //                         {article.dateOfPublication && (
// //                             <p className="font-bold text-gray-600 mb-2">
// //                                 Article ID: {article.articleKey} Published: {article.dateOfPublication}
// //                             </p>
// //                         )}
// //                         {article.abstractText && (
// //                             <div className="text-sm text-gray-700 mb-4">
// //                                 <span className="font-medium">Abstract: </span>
// //                                 <p
// //                                     className={`${expandedAbstracts[article.articleId] ? "" : "line-clamp-2"}`}
// //                                 >
// //                                     {article.abstractText.replace(/<[^>]+>/g, "")}
// //                                 </p>
// //                                 <button
// //                                     onClick={() => toggleAbstract(article.articleId)}
// //                                     className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-1"
// //                                 >
// //                                     {expandedAbstracts[article.articleId] ? "View Less" : "More"}
// //                                 </button>
// //                             </div>
// //                         )}
// //                         <div className="flex space-x-4">
// //                             <a
// //                                 href={`https://iassrd.com:8081${article.articleFile}`}
// //                                 className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
// //                                 download
// //                             >
// //                                 <FaDownload />
// //                                 <span>Download PDF</span>
// //                             </a>
// //                             <Link
// //                                 to={`/articles/volume_${article.volume}/issue_${article.issue}/${article.articleKey}`}
// //                                 className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
// //                             >
// //                                 <FaEye />
// //                                 <span>View Online</span>
// //                             </Link>
// //                         </div>
// //                         <div class={` ${index === filteredArticles.length - 1 ? "border-b-0" : "border-b border-stone-600  mt-2"}`}></div>
// //                     </div>


// //                 </div>
// //             </div>
// //             <Footer />
// //         </>

// //     )
// // }

// // export default ArchiveMaincontent








// import Navbar from "./navbar";
// import Footer from "./footer";
// import Sidebar from "../common/frontendSidebar";
// import React, { useState, useContext, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import JournalContext from "../common/journalContext";
// import axios from "axios";
// import { FaDownload, FaEye } from "react-icons/fa";

// // Placeholder for formatAuthor (implement as needed)
// const formatAuthor = (author, authorId) => {
//     return author ? `${author.firstName} ${author.lastName}` : `Author ID: ${authorId}`;
// };

// const ArchiveMaincontent = () => {
//     const [isSearchOpen, setIsSearchOpen] = useState(false);
//     const { journalAbbrevation, volume, issue } = useParams();
//     const { journals, loading: contextLoading, error: contextError } = useContext(JournalContext);

//     const journal = Array.isArray(journals)
//         ? journals.find((j) => j.abbrevation === journalAbbrevation || j.journalKey === journalAbbrevation)
//         : null;

//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [articles, setArticles] = useState([]);
//     const [authors, setAuthors] = useState({});
//     const [expandedAbstracts, setExpandedAbstracts] = useState({});
//     const [year, setYear] = useState(null);

//     useEffect(() => {
//         console.log("JournalContext State:", { journals, contextLoading, contextError, journalAbbrevation, journal, volume, issue });

//         const fetchArticlesAndYear = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 if (!journal) {
//                     throw new Error(`Journal not found for abbreviation: ${journalAbbrevation}`);
//                 }
//                 const journalId = journal.journalId;

//                 // Clean volume and issue by removing prefixes
//                 const cleanVolume = volume.replace("volume_", "");
//                 const cleanIssue = issue.replace("issue_", "");

//                 console.log("Cleaned Parameters:", { cleanVolume, cleanIssue });

//                 // Fetch articles (assumed endpoint)
//                 const articlesResponse = await axios.get("https://iassrd.com:8081/api/v1/articles", {
//                     headers: { "Content-Type": "application/json" },
//                 });

//                 const articlesData = articlesResponse.data.data || articlesResponse.data || [];
//                 if (!Array.isArray(articlesData)) {
//                     throw new Error("Unexpected response format: articlesData is not an array.");
//                 }

//                 console.log("Fetched Articles Data:", articlesData);

//                 const filteredArticles = articlesData.filter(
//                     (article) =>
//                         article.journalId.toString() === journalId.toString() &&
//                         article.volume.toString() === cleanVolume &&
//                         article.issue.toString() === cleanIssue
//                 );

//                 console.log("Filtered Articles:", filteredArticles);
//                 setArticles(filteredArticles);

//                 // Extract year from articles if available
//                 if (filteredArticles.length > 0 && filteredArticles[0].year) {
//                     setYear(filteredArticles[0].year);
//                 } else {
//                     // Fallback: Fetch year from issues API
//                     const issuesResponse = await axios.get("https://iassrd.com:8081/api/v1/journal-issues", {
//                         headers: { "Content-Type": "application/json" },
//                     });

//                     const issuesData = issuesResponse.data.data || issuesResponse.data || [];
//                     if (!Array.isArray(issuesData)) {
//                         throw new Error("Unexpected response format: issuesData is not an array.");
//                     }

//                     const matchingIssue = issuesData.find(
//                         (issue) =>
//                             issue.journalsId.toString() === journalId.toString() &&
//                             issue.volumeNo.toString() === cleanVolume &&
//                             issue.issueNo.toString() === cleanIssue
//                     );

//                     if (matchingIssue && matchingIssue.year) {
//                         setYear(matchingIssue.year);
//                     } else {
//                         setYear("Unknown");
//                     }
//                 }

//                 // Fetch authors (assumed endpoint; adjust if authors are in JournalContext)
//                 const authorsResponse = await axios.get("https://iassrd.com:8081/api/v1/authors", {
//                     headers: { "Content-Type": "application/json" },
//                 });

//                 const authorsData = authorsResponse.data.data || authorsResponse.data || [];
//                 const authorsMap = authorsData.reduce((acc, author) => {
//                     acc[author.authorId] = author;
//                     return acc;
//                 }, {});
//                 setAuthors(authorsMap);

//                 setLoading(false);
//             } catch (err) {
//                 console.error("Error fetching articles or year:", err);
//                 let errorMessage = "Failed to load articles.";
//                 if (err.response) {
//                     errorMessage = `Failed to load articles: Server responded with status ${err.response.status}.`;
//                 } else if (err.request) {
//                     errorMessage = "Failed to load articles: No response received from the server. Please check your network connection.";
//                 } else {
//                     errorMessage = `Failed to load articles: ${err.message}`;
//                 }
//                 setError(errorMessage);
//                 setLoading(false);
//             }
//         };

//         if (!contextLoading && !contextError && journal) {
//             fetchArticlesAndYear();
//         } else if (!contextLoading && !journal) {
//             setError(`Journal not found for abbreviation: ${journalAbbrevation}`);
//             setLoading(false);
//         } else {
//             setLoading(contextLoading);
//             setError(contextError);
//         }
//     }, [contextLoading, contextError, journals, journalAbbrevation, journal, volume, issue]);

//     const toggleAbstract = (articleId) => {
//         setExpandedAbstracts((prev) => ({
//             ...prev,
//             [articleId]: !prev[articleId],
//         }));
//     };

//     // Clean volume and issue for display
//     const displayVolume = volume.replace("volume_", "");
//     const displayIssue = issue.replace("issue_", "");

//     return (
//         <>
//             <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
//             <div
//                 className={`px-[80px] py-[30px] ${isSearchOpen ? "mt-[140px]" : "mt-[50px]"}`}
//             >
//                 <div className="flex mt-8">
//                     <Sidebar
//                         journalAbbrevation={journalAbbrevation}
//                         dynamicProps={journal}
//                     />
//                     <div className="w-[75vw] ps-6 h-auto">
//                         <p className="text-3xl text-blue-800 font-bold mb-5">
//                             {journal?.journalName || "Journal"}
//                         </p>
//                         <div className="border-b border-gray-300 mb-8"></div>
//                         <p className="text-xl text-gray-700 font-semibold mb-8">
//                             Volume {displayVolume}, Issue {displayIssue}, {year || "Loading..."}
//                         </p>
//                         {loading ? (
//                             <p className="text-gray-600">Loading...</p>
//                         ) : error ? (
//                             <p className="text-red-600">{error}</p>
//                         ) : articles.length === 0 ? (
//                             <p className="text-gray-600">No articles found for this issue.</p>
//                         ) : (
//                             articles.map((article, index) => (
//                                 <div
//                                     key={article.articleId}
//                                     className={`pb-6 mt-4 ${index === articles.length - 1 ? "border-b-0" : ""
//                                         } mb-1`}
//                                 >
//                                     <div className="flex items-center space-x-3 mb-2">
//                                         <span className="text-sm font-medium text-indigo-600">Research Article</span>
//                                         <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
//                                             Open Access
//                                         </span>
//                                     </div>
//                                     <h2 className="text-xl font-bold hover:text-red-700 text-title transition-colors duration-300 mb-2">
//                                         <Link
//                                             to={`/articles/volume_${article.volume}/issue_${article.issue}/${article.articleKey}`}
//                                             className="hover:underline"
//                                         >
//                                             {article.articleTitle}
//                                         </Link>
//                                     </h2>
//                                     <div className="flex items-center space-x-2 mb-2">
//                                         {article.authorIds.split(",").map((authorId, idx) => {
//                                             const trimmedAuthorId = authorId.trim();
//                                             const author = authors[trimmedAuthorId];
//                                             return (
//                                                 <span key={idx} className="text-base text-authortitle">
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
//                                         ,
//                                         <Link
//                                             to={`/journal/${journalAbbrevation}/volume_${article.volume}/issue_${article.issue}`}
//                                             className="text-indigo-600 hover:underline ml-1"
//                                         >
//                                             Volume {article.volume}, Issue {article.issue}
//                                         </Link>{" "}
//                                         {article.monthFrom} - {article.monthTo} {article.year}
//                                         <span className="ml-2">Pages: {article.pageFrom}-{article.pageTo}</span>
//                                     </p>
//                                     {article.doi && (
//                                         <p className="text-sm text-gray-600 mb-1">
//                                             DOI: <span className="text-indigo-600">{article.doi}</span>
//                                         </p>
//                                     )}
//                                     {article.dateOfPublication && (
//                                         <p className="font-bold text-gray-600 mb-2">
//                                             Article ID: {article.articleKey} Published: {article.dateOfPublication}
//                                         </p>
//                                     )}
//                                     {/* {article.abstractText && (
//                     <div className="text-sm text-gray-700 mb-4">
//                       <span className="font-medium">Abstract: </span>
//                       <p
//                         className={`${expandedAbstracts[article.articleId] ? "" : "line-clamp-2"}`}
//                       >
//                         {article.abstractText.replace(/<[^>]+>/g, "")}
//                       </p>
//                       <button
//                         onClick={() => toggleAbstract(article.articleId)}
//                         className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-1"
//                       >
//                         {expandedAbstracts[article.articleId] ? "View Less" : "More"}
//                       </button>
//                     </div>
//                   )} */}
//                                     <div className="flex space-x-4">
//                                         <a
//                                             href={`https://iassrd.com:8081${article.articleFile}`}
//                                             className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
//                                             download
//                                         >
//                                             <FaDownload />
//                                             <span>Download PDF</span>
//                                         </a>
//                                         <Link
//                                             to={`/articles/volume_${article.volume}/issue_${article.issue}/${article.articleKey}`}
//                                             className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
//                                         >
//                                             <FaEye />
//                                             <span>View Online</span>
//                                         </Link>
//                                     </div>
//                                     <div
//                                         className={`${index === articles.length - 1 ? "border-b-0" : "border-b border-stone-600 mt-2"
//                                             }`}
//                                     ></div>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default ArchiveMaincontent;

import Navbar from "./navbar";
import Footer from "./footer";
import Sidebar from "../common/frontendSidebar";
import React, { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import JournalContext from "../common/journalContext";
import axios from "axios";
import { FaDownload, FaEye } from "react-icons/fa";

// Placeholder for formatAuthor (implement as needed)
const formatAuthor = (author, authorId) => {
    return author ? `${author.firstName} ${author.lastName}` : `Author ID: ${authorId}`;
};

const ArchiveMaincontent = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { journalAbbrevation, volume, issue } = useParams();
    const { journals, loading: contextLoading, error: contextError } = useContext(JournalContext);

    const journal = Array.isArray(journals)
        ? journals.find((j) => j.abbrevation === journalAbbrevation || j.journalKey === journalAbbrevation)
        : null;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [articles, setArticles] = useState([]);
    const [authors, setAuthors] = useState({});
    const [expandedAbstracts, setExpandedAbstracts] = useState({});
    const [year, setYear] = useState(null);

    useEffect(() => {
        console.log("JournalContext State:", { journals, contextLoading, contextError, journalAbbrevation, journal, volume, issue });

        const fetchArticlesAndYear = async () => {
            setLoading(true);
            setError(null);
            try {
                if (!journal) {
                    throw new Error(`Journal not found for abbreviation: ${journalAbbrevation}`);
                }
                const journalId = journal.journalId;

                // Clean volume and issue by removing prefixes
                const cleanVolume = volume.replace("volume_", "");
                const cleanIssue = issue.replace("issue_", "");

                console.log("Cleaned Parameters:", { cleanVolume, cleanIssue });

                // Fetch articles (assumed endpoint)
                const articlesResponse = await axios.get("https://iassrd.com:8081/api/v1/articles", {
                    headers: { "Content-Type": "application/json" },
                });

                const articlesData = articlesResponse.data.data || articlesResponse.data || [];
                if (!Array.isArray(articlesData)) {
                    throw new Error("Unexpected response format: articlesData is not an array.");
                }

                console.log("Fetched Articles Data:", articlesData);

                const filteredArticles = articlesData.filter(
                    (article) =>
                        article.journalId.toString() === journalId.toString() &&
                        article.volume.toString() === cleanVolume &&
                        article.issue.toString() === cleanIssue
                );

                console.log("Filtered Articles:", filteredArticles);
                setArticles(filteredArticles);

                // Extract year from articles if available
                if (filteredArticles.length > 0 && filteredArticles[0].year) {
                    setYear(filteredArticles[0].year);
                } else {
                    // Fallback: Fetch year from issues API
                    const issuesResponse = await axios.get("https://iassrd.com:8081/api/v1/journal-issues", {
                        headers: { "Content-Type": "application/json" },
                    });

                    const issuesData = issuesResponse.data.data || issuesResponse.data || [];
                    if (!Array.isArray(issuesData)) {
                        throw new Error("Unexpected response format: issuesData is not an array.");
                    }

                    const matchingIssue = issuesData.find(
                        (issue) =>
                            issue.journalsId.toString() === journalId.toString() &&
                            issue.volumeNo.toString() === cleanVolume &&
                            issue.issueNo.toString() === cleanIssue
                    );

                    if (matchingIssue && matchingIssue.year) {
                        setYear(matchingIssue.year);
                    } else {
                        setYear("Unknown");
                    }
                }

                // Fetch authors (assumed endpoint; adjust if authors are in JournalContext)
                const authorsResponse = await axios.get("https://iassrd.com:8081/api/v1/authors", {
                    headers: { "Content-Type": "application/json" },
                });

                const authorsData = authorsResponse.data.data || authorsResponse.data || [];
                const authorsMap = authorsData.reduce((acc, author) => {
                    acc[author.authorId] = author;
                    return acc;
                }, {});
                setAuthors(authorsMap);

                setLoading(false);
            } catch (err) {
                console.error("Error fetching articles or year:", err);
                let errorMessage = "Failed to load articles.";
                if (err.response) {
                    errorMessage = `Failed to load articles: Server responded with status ${err.response.status}.`;
                } else if (err.request) {
                    errorMessage = "Failed to load articles: No response received from the server. Please check your network connection.";
                } else {
                    errorMessage = `Failed to load articles: ${err.message}`;
                }
                setError(errorMessage);
                setLoading(false);
            }
        };

        if (!contextLoading && !contextError && journal) {
            fetchArticlesAndYear();
        } else if (!contextLoading && !journal) {
            setError(`Journal not found for abbreviation: ${journalAbbrevation}`);
            setLoading(false);
        } else {
            setLoading(contextLoading);
            setError(contextError);
        }
    }, [contextLoading, contextError, journals, journalAbbrevation, journal, volume, issue]);

    const toggleAbstract = (articleId) => {
        setExpandedAbstracts((prev) => ({
            ...prev,
            [articleId]: !prev[articleId],
        }));
    };

    // Clean volume and issue for display
    const displayVolume = volume.replace("volume_", "");
    const displayIssue = issue.replace("issue_", "");

    return (
        <>
            <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
            <div
                className={`px-[80px] py-[30px] ${isSearchOpen ? "mt-[160px]" : "mt-[80px]"}`}
            >
                <div className="flex mt-8">
                    <Sidebar
                        journalAbbrevation={journalAbbrevation}
                        dynamicProps={journal}
                    />
                    <div className="w-[75vw] ps-6 h-auto">
                        <p className="text-3xl text-blue-800 font-bold mb-5">
                            {journal?.journalName || "Journal"}
                        </p>
                        <div className="border-b border-gray-300 mb-8"></div>
                        {/* <p className="text-xl text-gray-700 font-semibold mb-8">
                            Volume {displayVolume}, Issue {displayIssue}, {articles.length > 0 ? `${articles[0].monthFrom} - ${articles[0].monthTo}` : "Loading..."}, {year || "Loading..."}
                        </p> */}
                        <p className="text-xl text-gray-700 font-semibold mb-8">
                            Volume {displayVolume}, Issue {displayIssue}
                            {articles.length > 0 && articles[0].monthFrom && articles[0].monthTo && (
                                <>, {articles[0].monthFrom} - {articles[0].monthTo}</>
                            )}
                            {year && `, ${year}`}
                        </p>

                        {loading ? (
                            <p className="text-gray-600">Loading...</p>
                        ) : error ? (
                            <p className="text-red-600">{error}</p>
                        ) : articles.length === 0 ? (
                            <p className="text-gray-600">No articles found for this issue.</p>
                        ) : (
                            articles.map((article, index) => (
                                <div
                                    key={article.articleId}
                                    className={`pb-6 mt-4 ${index === articles.length - 1 ? "border-b-0" : ""
                                        } mb-1`}
                                >
                                    <div className="flex items-center space-x-3 mb-2">
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
                                            to={`/journal/${journalAbbrevation}`}
                                            className="text-indigo-600 hover:underline font-bold italic"
                                        >
                                            {journal?.journalName || `Journal ID: ${article.journalId}`}
                                        </Link>
                                        ,
                                        <Link
                                            to={`/journal/${journalAbbrevation}/volume_${article.volume}/issue_${article.issue}`}
                                            className="text-indigo-600 hover:underline ml-1"
                                        >
                                            Volume {article.volume}, Issue {article.issue}
                                        </Link>{" "}
                                        {article.monthFrom} - {article.monthTo} {article.year}
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
                                    {/* {article.abstractText && (
                    <div className="text-sm text-gray-700 mb-4">
                      <span className="font-medium">Abstract: </span>
                      <p
                        className={`${expandedAbstracts[article.articleId] ? "" : "line-clamp-2"}`}
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
                  )} */}
                                    <div className="flex space-x-4">
                                        <a
                                            href={`https://iassrd.com${article.articleFile}`}
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
                                    <div
                                        className={`${index === articles.length - 1 ? "border-b-0" : "border-b border-stone-600 mt-2"
                                            }`}
                                    ></div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ArchiveMaincontent;