


// import React, { useState, useEffect, useContext } from 'react';
// import { useSearchParams, useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import { FaDownload, FaEye } from 'react-icons/fa';
// import Navbar from './navbar';
// import Footer from './footer';
// import JournalContext from '../common/journalContext';

// // Custom debounce hook
// function useDebounce(value, delay) {
//     const [debouncedValue, setDebouncedValue] = useState(value);

//     useEffect(() => {
//         const handler = setTimeout(() => {
//             setDebouncedValue(value);
//         }, delay);

//         return () => {
//             clearTimeout(handler);
//         };
//     }, [value, delay]);

//     return debouncedValue;
// }

// const BASE_URL = 'https://iassrd.com:8081/api/v1';

// const SearchResults = () => {
//     const { journals: contextJournals, setJournals } = useContext(JournalContext) || {};
//     const [searchParams] = useSearchParams();
//     const navigate = useNavigate();
//     const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
//     const debouncedSearchQuery = useDebounce(searchQuery, 500);
//     const [selectedJournal, setSelectedJournal] = useState('');
//     const [articles, setArticles] = useState([]);
//     const [authorsMap, setAuthorsMap] = useState({});
//     const [journalsMap, setJournalsMap] = useState({});
//     const [localJournals, setLocalJournals] = useState(contextJournals || []);
//     const [expandedAbstracts, setExpandedAbstracts] = useState({});
//     const [isSearchOpen, setIsSearchOpen] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);

//     // Format author name or fallback to ID
//     const formatAuthor = (author, authorId) => {
//         return author ? author : `Author ID: ${authorId}`;
//     };

//     // Toggle abstract visibility
//     const toggleAbstract = (articleId) => {
//         setExpandedAbstracts((prev) => ({
//             ...prev,
//             [articleId]: !prev[articleId],
//         }));
//     };

//     // Update localJournals and journalsMap when contextJournals changes
//     useEffect(() => {
//         if (contextJournals && contextJournals.length > 0) {
//             setLocalJournals(contextJournals);
//             setJournalsMap(
//                 contextJournals.reduce((acc, journal) => {
//                     acc[journal.journalId] = {
//                         journalName: journal.journalName,
//                         abbrevation: journal.abbrevation || journal.journalId,
//                     };
//                     return acc;
//                 }, {})
//             );
//         }
//     }, [contextJournals]);

//     // Fetch data when debounced search query or selected journal changes
//     useEffect(() => {
//         const fetchData = async () => {
//             setIsLoading(true);
//             setError(null);
//             try {
//                 // Fetch journals if not available
//                 let journalsToUse = localJournals;
//                 if (!journalsToUse || journalsToUse.length === 0) {
//                     const journalsResponse = await axios.get(`${BASE_URL}/journals`);
//                     const journalsData = journalsResponse.data.data || [];
//                     if (!Array.isArray(journalsData)) {
//                         throw new Error('Journals API did not return an array');
//                     }
//                     journalsToUse = journalsData.map((journal) => ({
//                         journalId: journal.journalId,
//                         journalName: journal.journalName || journal.name,
//                         abbrevation: journal.abbrevation || journal.journalId,
//                     }));
//                     const newJournalsMap = journalsToUse.reduce((acc, journal) => {
//                         acc[journal.journalId] = {
//                             journalName: journal.journalName,
//                             abbrevation: journal.abbrevation,
//                         };
//                         return acc;
//                     }, {});
//                     setJournalsMap(newJournalsMap);
//                     try {
//                         if (typeof setJournals === 'function') {
//                             setJournals(journalsToUse);
//                         } else {
//                             console.warn('setJournals is not a function; using local state instead');
//                             setLocalJournals(journalsToUse);
//                         }
//                     } catch (err) {
//                         console.error('Error setting journals in context:', err);
//                         setLocalJournals(journalsToUse);
//                     }
//                 }

//                 // Fetch authors
//                 const authorsResponse = await axios.get(`${BASE_URL}/authors`);
//                 const authorsData = authorsResponse.data.data || [];
//                 const authorsMapping = authorsData.reduce((acc, author) => {
//                     acc[author.authorId] = author.fullName;
//                     return acc;
//                 }, {});
//                 setAuthorsMap(authorsMapping);

//                 // Fetch articles
//                 const articlesResponse = await axios.get(`${BASE_URL}/articles`);
//                 let articlesData = articlesResponse.data.data || [];

//                 // Apply filters
//                 let filteredArticles = articlesData.filter((article) => {
//                     const titleMatch = (article.articleTitle || '').toLowerCase().includes(debouncedSearchQuery.toLowerCase());
//                     const journalMatch = journalsToUse.some(
//                         (journal) =>
//                             journal.journalId === article.journalId &&
//                             journal.journalName.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
//                     );
//                     const authorMatch = article.authorIds?.split(',').some((authorId) =>
//                         (authorsMapping[authorId] || '').toLowerCase().includes(debouncedSearchQuery.toLowerCase())
//                     );
//                     return titleMatch || journalMatch || authorMatch;
//                 });

//                 // Filter by selected journal
//                 if (selectedJournal) {
//                     filteredArticles = filteredArticles.filter(
//                         (article) => article.journalId === selectedJournal.journalId
//                     );
//                 }

//                 setArticles(filteredArticles);
//             } catch (err) {
//                 setError(err.message);
//                 // Fallback to static journal list
//                 const fallbackJournals = [
//                     { journalId: '1', journalName: 'American Journal of Agricultural and Biological Sciences', abbrevation: 'AJABS' },
//                     { journalId: '2', journalName: 'American Journal of Animal and Veterinary Sciences', abbrevation: 'AJAVS' },
//                     { journalId: '3', journalName: 'American Journal of Applied Sciences', abbrevation: 'AJAS' },
//                 ];
//                 setLocalJournals(fallbackJournals);
//                 setJournalsMap(
//                     fallbackJournals.reduce((acc, journal) => {
//                         acc[journal.journalId] = {
//                             journalName: journal.journalName,
//                             abbrevation: journal.abbrevation,
//                         };
//                         return acc;
//                     }, {})
//                 );
//                 if (typeof setJournals === 'function') {
//                     setJournals(fallbackJournals);
//                 }
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         if (debouncedSearchQuery.trim() || selectedJournal) {
//             fetchData();
//         } else {
//             setArticles([]);
//             setIsLoading(false);
//         }
//     }, [debouncedSearchQuery, selectedJournal, localJournals, setJournals]);

//     // Handle search submission
//     const handleSearch = (e) => {
//         e.preventDefault();
//         if (searchQuery.trim()) {
//             navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
//         }
//     };

//     return (
//         <>
//             <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />

//             <div className={`flex   py-6 px-[80px] ${isSearchOpen ? 'mt-[185px]' : 'mt-[95px] '}`}>
//                 {/* Filter Section */}
//                 <div className="w-1/4 p-4  max-h-[600px]">
//                     <h2 className="text-xl font-semibold mb-4">Search</h2>
//                     <form onSubmit={handleSearch}>
//                         <input
//                             type="text"
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             placeholder="Search by title, journal, or author..."
//                             className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                         />
//                     </form>

//                     <div className="mb-4 max-h-[450px] overflow-y-auto">
//                         <label className="block text-sm font-medium mb-1">By Journal</label>
//                         {isLoading ? (
//                             <p className="text-sm text-gray-600">Loading journals...</p>
//                         ) : error ? (
//                             <p className="text-sm text-red-600">Error: {error}</p>
//                         ) : localJournals.length > 0 ? (
//                             localJournals.map((journal) => (
//                                 <div key={journal.journalId} className="flex items-center mb-1">
//                                     <input
//                                         type="checkbox"
//                                         checked={selectedJournal && selectedJournal.journalId === journal.journalId}
//                                         onChange={() =>
//                                             setSelectedJournal(
//                                                 selectedJournal && selectedJournal.journalId === journal.journalId ? '' : journal
//                                             )
//                                         }
//                                         className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500"
//                                     />
//                                     <span className="text-sm text-gray-700">{journal.journalName}</span>
//                                 </div>
//                             ))
//                         ) : (
//                             <p className="text-sm text-gray-600">No journals available</p>
//                         )}
//                     </div>
//                 </div>

//                 {/* Results Section */}
//                 <div className="w-3/4 p-6  bg-white shadow-md ml-4">
//                     <h2 className="text-xl font-semibold text-gray-800 mb-4 ">Results</h2>
//                     {isLoading ? (
//                         <div className="text-center">
//                             <svg
//                                 className="animate-spin h-6 w-6 text-indigo-600 mx-auto"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <circle
//                                     className="opacity-25"
//                                     cx="12"
//                                     cy="12"
//                                     r="10"
//                                     stroke="currentColor"
//                                     strokeWidth="4"
//                                 ></circle>
//                                 <path
//                                     className="opacity-75"
//                                     fill="currentColor"
//                                     d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
//                                 ></path>
//                             </svg>
//                             <p className="text-sm text-gray-600 mt-2">Loading results...</p>
//                         </div>
//                     ) : error ? (
//                         <p className="text-sm text-red-600 text-center">Error: {error}</p>
//                     ) : !debouncedSearchQuery && !selectedJournal ? (
//                         <p className="text-sm text-gray-600 text-center">
//                             Enter a search query or select a journal to view results
//                         </p>
//                     ) : articles.length > 0 ? (
//                         articles.map((article, index) => (
//                             <div
//                                 key={article.articleId}
//                                 className={`pb-6 mt-4 px-[80px] ${index === articles.length - 1 ? 'border-b-0' : ''} mb-1`}
//                             >
//                                 <div className="flex items-center space-x-3 mb-2">
//                                     <span className="text-sm font-medium text-indigo-600">Research Article</span>
//                                     {article.openAccess && (
//                                         <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
//                                             Open Access
//                                         </span>
//                                     )}
//                                 </div>
//                                 <h2 className="text-xl font-bold text-gray-800 hover:text-red-700 transition-colors duration-300 mb-2">
//                                     <Link
//                                         to={`/articles/volume_${article.volume || 'N/A'}/issue_${article.issue || 'N/A'}/${article.articleKey || article.articleId}`}
//                                         className="hover:underline"
//                                     >
//                                         {article.articleTitle || 'Untitled Article'}
//                                     </Link>
//                                 </h2>
//                                 <div className="flex items-center space-x-2 mb-2">
//                                     {article.authorIds && typeof article.authorIds === 'string' ? (
//                                         article.authorIds.split(',').map((authorId, idx) => {
//                                             const trimmedAuthorId = authorId.trim();
//                                             const author = authorsMap[trimmedAuthorId];
//                                             return (
//                                                 <span key={idx} className="text-base text-gray-600">
//                                                     {formatAuthor(author, trimmedAuthorId)}
//                                                     {idx < article.authorIds.split(',').length - 1 ? ',' : ''}
//                                                 </span>
//                                             );
//                                         })
//                                     ) : (
//                                         <span className="text-base text-gray-600">No authors available</span>
//                                     )}
//                                 </div>
//                                 <p className="text-sm text-gray-600 mb-1">
//                                     <Link
//                                         to={`/journal/${journalsMap[article.journalId]?.abbrevation || article.journalId}`}
//                                         className="text-indigo-600 hover:underline font-bold italic"
//                                     >
//                                         {journalsMap[article.journalId]?.journalName || `Journal ID: ${article.journalId}`}
//                                     </Link>
//                                     {article.volume && article.issue && (
//                                         <>
//                                             ,
//                                             <Link
//                                                 to={`/journal/${journalsMap[article.journalId]?.abbrevation || 'N/A'}/volume_${article.volume}/issue_${article.issue}`}
//                                                 className="text-indigo-600 hover:underline ml-1"
//                                             >
//                                                 Volume {article.volume}, Issue {article.issue}
//                                             </Link>
//                                         </>
//                                     )}
//                                     {article.monthFrom && article.monthTo && article.year && (
//                                         <span className="ml-1">
//                                             {article.monthFrom} - {article.monthTo} {article.year}
//                                         </span>
//                                     )}
//                                     {article.pageFrom && article.pageTo && (
//                                         <span className="ml-2">Pages: {article.pageFrom}-{article.pageTo}</span>
//                                     )}
//                                 </p>
//                                 {article.doi && (
//                                     <p className="text-sm text-gray-600 mb-1">
//                                         DOI: <span className="text-indigo-600">{article.doi}</span>
//                                     </p>
//                                 )}
//                                 {article.dateOfPublication && (
//                                     <p className="font-bold text-gray-600 mb-2">
//                                         Article ID: {article.articleKey || article.articleId} Published: {article.dateOfPublication}
//                                     </p>
//                                 )}
//                                 {article.abstractText && (
//                                     <div className="text-sm text-gray-700 mb-4">
//                                         <span className="font-medium">Abstract: </span>
//                                         <p className={`${expandedAbstracts[article.articleId] ? '' : 'line-clamp-2'}`}>
//                                             {article.abstractText.replace(/<[^>]+>/g, '')}
//                                         </p>
//                                         <button
//                                             onClick={() => toggleAbstract(article.articleId)}
//                                             className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-1"
//                                         >
//                                             {expandedAbstracts[article.articleId] ? 'View Less' : 'More'}
//                                         </button>
//                                     </div>
//                                 )}
//                                 <div className="flex space-x-4">
//                                     {article.articleFile && (
//                                         <a
//                                             href={`${BASE_URL}${article.articleFile}`}
//                                             className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
//                                             download
//                                         >
//                                             <FaDownload />
//                                             <span>Download PDF</span>
//                                         </a>
//                                     )}
//                                     <Link
//                                         to={`/articles/volume_${article.volume || 'N/A'}/issue_${article.issue || 'N/A'}/${article.articleKey || article.articleId}`}
//                                         className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
//                                     >
//                                         <FaEye />
//                                         <span>View Online</span>
//                                     </Link>
//                                 </div>
//                                 <div
//                                     className={`${index === articles.length - 1 ? 'border-b-0' : 'border-b border-stone-600 mt-2'}`}
//                                 ></div>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-sm text-gray-600 text-center">No results found</p>
//                     )}
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default SearchResults;






import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaDownload, FaEye } from 'react-icons/fa';
import Navbar from './navbar';
import Footer from './footer';
import JournalContext from '../common/journalContext';

// Custom debounce hook
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

const BASE_URL = 'https://iassrd.com:8081/api/v1';
const SITE_URL = 'https://iassrd.com';


const SearchResults = () => {
    const { journals: contextJournals, setJournals } = useContext(JournalContext) || {};
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const [selectedJournal, setSelectedJournal] = useState('');
    const [articles, setArticles] = useState([]);
    const [authorsMap, setAuthorsMap] = useState({});
    const [journalsMap, setJournalsMap] = useState({});
    const [localJournals, setLocalJournals] = useState(contextJournals || []);
    const [expandedAbstracts, setExpandedAbstracts] = useState({});
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 15;

    // Format author name or fallback to ID
    const formatAuthor = (author, authorId) => {
        return author ? author : `Author ID: ${authorId}`;
    };

    // Toggle abstract visibility
    const toggleAbstract = (articleId) => {
        setExpandedAbstracts((prev) => ({
            ...prev,
            [articleId]: !prev[articleId],
        }));
    };

    // Update localJournals and journalsMap when contextJournals changes
    useEffect(() => {
        if (contextJournals && contextJournals.length > 0) {
            setLocalJournals(contextJournals);
            setJournalsMap(
                contextJournals.reduce((acc, journal) => {
                    acc[journal.journalId] = {
                        journalName: journal.journalName,
                        abbrevation: journal.abbrevation || journal.journalId,
                    };
                    return acc;
                }, {})
            );
        }
    }, [contextJournals]);

    // Fetch data when debounced search query or selected journal changes
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Fetch journals if not available
                let journalsToUse = localJournals;
                if (!journalsToUse || journalsToUse.length === 0) {
                    const journalsResponse = await axios.get(`${BASE_URL}/journals`);
                    const journalsData = journalsResponse.data.data || [];
                    if (!Array.isArray(journalsData)) {
                        throw new Error('Journals API did not return an array');
                    }
                    journalsToUse = journalsData.map((journal) => ({
                        journalId: journal.journalId,
                        journalName: journal.journalName || journal.name,
                        abbrevation: journal.abbrevation || journal.journalId,
                    }));
                    const newJournalsMap = journalsToUse.reduce((acc, journal) => {
                        acc[journal.journalId] = {
                            journalName: journal.journalName,
                            abbrevation: journal.abbrevation,
                        };
                        return acc;
                    }, {});
                    setJournalsMap(newJournalsMap);
                    try {
                        if (typeof setJournals === 'function') {
                            setJournals(journalsToUse);
                        } else {
                            console.warn('setJournals is not a function; using local state instead');
                            setLocalJournals(journalsToUse);
                        }
                    } catch (err) {
                        console.error('Error setting journals in context:', err);
                        setLocalJournals(journalsToUse);
                    }
                }

                // Fetch authors
                const authorsResponse = await axios.get(`${BASE_URL}/authors`);
                const authorsData = authorsResponse.data.data || [];
                const authorsMapping = authorsData.reduce((acc, author) => {
                    acc[author.authorId] = author.fullName;
                    return acc;
                }, {});
                setAuthorsMap(authorsMapping);

                // Fetch articles
                const articlesResponse = await axios.get(`${BASE_URL}/articles`);
                let articlesData = articlesResponse.data.data || [];

                // Apply filters
                let filteredArticles = articlesData.filter((article) => {
                    const titleMatch = (article.articleTitle || '').toLowerCase().includes(debouncedSearchQuery.toLowerCase());
                    const journalMatch = journalsToUse.some(
                        (journal) =>
                            journal.journalId === article.journalId &&
                            journal.journalName.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
                    );
                    const authorMatch = article.authorIds?.split(',').some((authorId) =>
                        (authorsMapping[authorId] || '').toLowerCase().includes(debouncedSearchQuery.toLowerCase())
                    );
                    return titleMatch || journalMatch || authorMatch;
                });

                // Filter by selected journal
                if (selectedJournal) {
                    filteredArticles = filteredArticles.filter(
                        (article) => article.journalId === selectedJournal.journalId
                    );
                }

                setArticles(filteredArticles);
                setCurrentPage(1); // Reset to first page on new search
            } catch (err) {
                setError(err.message);
                // Fallback to static journal list
                const fallbackJournals = [
                    { journalId: '1', journalName: 'American Journal of Agricultural and Biological Sciences', abbrevation: 'AJABS' },
                    { journalId: '2', journalName: 'American Journal of Animal and Veterinary Sciences', abbrevation: 'AJAVS' },
                    { journalId: '3', journalName: 'American Journal of Applied Sciences', abbrevation: 'AJAS' },
                ];
                setLocalJournals(fallbackJournals);
                setJournalsMap(
                    fallbackJournals.reduce((acc, journal) => {
                        acc[journal.journalId] = {
                            journalName: journal.journalName,
                            abbrevation: journal.abbrevation,
                        };
                        return acc;
                    }, {})
                );
                if (typeof setJournals === 'function') {
                    setJournals(fallbackJournals);
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (debouncedSearchQuery.trim() || selectedJournal) {
            fetchData();
        } else {
            setArticles([]);
            setIsLoading(false);
        }
    }, [debouncedSearchQuery, selectedJournal, localJournals, setJournals]);

    // Handle search submission
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
            setCurrentPage(1); // Reset to first page on new search
        }
    };

    // Pagination logic
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
    const totalPages = Math.ceil(articles.length / articlesPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
    };

    return (
        <>
            <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
            {isSearchOpen && (
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10"
                    aria-hidden="true"
                ></div>
            )}

            <div className={`flex py-6 px-[80px] ${isSearchOpen ? 'mt-[185px]' : 'mt-[95px]'}`}>
                {/* Filter Section */}
                <div className="w-1/4 p-4 max-h-[600px]">
                    <h2 className="text-xl font-semibold mb-4">Search</h2>
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by title, journal, or author..."
                            className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </form>

                    <div className="mb-4 max-h-[450px] overflow-y-auto">
                        <label className="block text-sm font-medium mb-1">By Journal</label>
                        {isLoading ? (
                            <p className="text-sm text-gray-600">Loading journals...</p>
                        ) : error ? (
                            <p className="text-sm text-red-600">Error: {error}</p>
                        ) : localJournals.length > 0 ? (
                            localJournals.map((journal) => (
                                <div key={journal.journalId} className="flex items-center mb-1">
                                    <input
                                        type="checkbox"
                                        checked={selectedJournal && selectedJournal.journalId === journal.journalId}
                                        onChange={() =>
                                            setSelectedJournal(
                                                selectedJournal && selectedJournal.journalId === journal.journalId ? '' : journal
                                            )
                                        }
                                        className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span className="text-sm text-gray-700">{journal.journalName}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-600">No journals available</p>
                        )}
                    </div>
                </div>

                {/* Results Section */}
                <div className="w-3/4 p-6 bg-white shadow-md ml-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Results</h2>
                    {isLoading ? (
                        <div className="text-center">
                            <svg
                                className="animate-spin h-6 w-6 text-indigo-600 mx-auto"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
                                ></path>
                            </svg>
                            <p className="text-sm text-gray-600 mt-2">Loading results...</p>
                        </div>
                    ) : error ? (
                        <p className="text-sm text-red-600 text-center">Error: {error}</p>
                    ) : !debouncedSearchQuery && !selectedJournal ? (
                        <p className="text-sm text-gray-600 text-center">
                            Enter a search query or select a journal to view results
                        </p>
                    ) : currentArticles.length > 0 ? (
                        <>
                            {currentArticles.map((article, index) => (
                                <div
                                    key={article.articleId}
                                    className={`pb-6 mt-4 px-[80px] ${index === currentArticles.length - 1 ? 'border-b-0' : ''} mb-1`}
                                >
                                    <div className="flex items-center space-x-3 mb-2">
                                        <span className="text-sm font-medium text-indigo-600">Research Article</span>
                                        {article.openAccess && (
                                            <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                                Open Access
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800 hover:text-red-700 transition-colors duration-300 mb-2">
                                        <Link
                                            to={`/articles/volume_${article.volume || 'N/A'}/issue_${article.issue || 'N/A'}/${article.articleKey || article.articleId}`}
                                            className="hover:underline"
                                        >
                                            {article.articleTitle || 'Untitled Article'}
                                        </Link>
                                    </h2>
                                    <div className="flex items-center space-x-2 mb-2">
                                        {article.authorIds && typeof article.authorIds === 'string' ? (
                                            article.authorIds.split(',').map((authorId, idx) => {
                                                const trimmedAuthorId = authorId.trim();
                                                const author = authorsMap[trimmedAuthorId];
                                                return (
                                                    <span key={idx} className="text-base text-gray-600">
                                                        {formatAuthor(author, trimmedAuthorId)}
                                                        {idx < article.authorIds.split(',').length - 1 ? ',' : ''}
                                                    </span>
                                                );
                                            })
                                        ) : (
                                            <span className="text-base text-gray-600">No authors available</span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600 mb-1">
                                        <Link
                                            to={`/journal/${journalsMap[article.journalId]?.abbrevation || article.journalId}`}
                                            className="text-indigo-600 hover:underline font-bold italic"
                                        >
                                            {journalsMap[article.journalId]?.journalName || `Journal ID: ${article.journalId}`}
                                        </Link>
                                        {article.volume && article.issue && (
                                            <>
                                                ,
                                                <Link
                                                    to={`/journal/${journalsMap[article.journalId]?.abbrevation || 'N/A'}/volume_${article.volume}/issue_${article.issue}`}
                                                    className="text-indigo-600 hover:underline ml-1"
                                                >
                                                    Volume {article.volume}, Issue {article.issue}
                                                </Link>
                                            </>
                                        )}
                                        {article.monthFrom && article.monthTo && article.year && (
                                            <span className="ml-1">
                                                {article.monthFrom} - {article.monthTo} {article.year}
                                            </span>
                                        )}
                                        {article.pageFrom && article.pageTo && (
                                            <span className="ml-2">Pages: {article.pageFrom}-{article.pageTo}</span>
                                        )}
                                    </p>
                                    {article.doi && (
                                        <p className="text-sm text-gray-600 mb-1">
                                            DOI: <span className="text-indigo-600">{article.doi}</span>
                                        </p>
                                    )}
                                    {article.dateOfPublication && (
                                        <p className="font-bold text-gray-600 mb-2">
                                            Article ID: {article.articleKey || article.articleId} Published: {article.dateOfPublication}
                                        </p>
                                    )}
                                    {article.abstractText && (
                                        <div className="text-sm text-gray-700 mb-4">
                                            <span className="font-medium">Abstract: </span>
                                            <p className={`${expandedAbstracts[article.articleId] ? '' : 'line-clamp-2'}`}>
                                                {article.abstractText.replace(/<[^>]+>/g, '')}
                                            </p>
                                            <button
                                                onClick={() => toggleAbstract(article.articleId)}
                                                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-1"
                                            >
                                                {expandedAbstracts[article.articleId] ? 'View Less' : 'More'}
                                            </button>
                                        </div>
                                    )}
                                    <div className="flex space-x-4">
                                        {article.articleFile && (
                                            <a
                                                href={`${SITE_URL}${article.articleFile}`}
                                                target="_blank"
                                                className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
                                                download
                                            >
                                                <FaDownload />
                                                <span>Download PDF</span>
                                            </a>
                                        )}
                                        <Link
                                            to={`/articles/volume_${article.volume || 'N/A'}/issue_${article.issue || 'N/A'}/${article.articleKey || article.articleId}`}
                                            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
                                        >
                                            <FaEye />
                                            <span>View Online</span>
                                        </Link>
                                    </div>
                                    <div
                                        className={`${index === currentArticles.length - 1 ? 'border-b-0' : 'border-b border-stone-600 mt-2'}`}
                                    ></div>
                                </div>
                            ))}
                            {/* Pagination Controls */}
                            <div className="flex justify-center mt-6 space-x-2">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                                >
                                    Previous
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => paginate(page)}
                                        className={`px-4 py-2 rounded ${currentPage === page ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="text-sm text-gray-600 text-center">No results found</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SearchResults;