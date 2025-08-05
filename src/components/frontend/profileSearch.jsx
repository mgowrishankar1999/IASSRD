
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import defaultJournalCover from "../../assets/herologo3.jpg";
import Navbar from "./navbar";
import Footer from "./footer";
// import Space from "../../assets/herologo3.jpg";

const ProfileSearch = () => {
    const [searchParams] = useSearchParams();
    const initialQuery = searchParams.get("query") || "";
    const [query, setQuery] = useState(initialQuery);
    const [authors, setAuthors] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [countries, setCountries] = useState([]);
    const [articles, setArticles] = useState([]);
    const [journalsMap, setJournalsMap] = useState({});
    const [activeTab, setActiveTab] = useState("Author");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const [hasSearched, setHasSearched] = useState(false);

    const [authorPage, setAuthorPage] = useState(1);
    const [universityPage, setUniversityPage] = useState(1);
    const [countryPage, setCountryPage] = useState(1);
    const itemsPerPage = 50;
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const [suggestions, setSuggestions] = useState([]);
    const [authorId, setAuthorId] = useState("");
    const BASE_URL = "https://iassrd.com:8081/api/v1";

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const authorsResponse = await axios.get(`${BASE_URL}/authors`);
                setAuthors(authorsResponse.data.data || []);

                const affiliationsResponse = await axios.get(`${BASE_URL}/affiliations`);
                setUniversities(affiliationsResponse.data.data || []);

                const articlesResponse = await axios.get(`${BASE_URL}/articles`);
                setArticles(articlesResponse.data.data || []);

                const journalsResponse = await axios.get(`${BASE_URL}/journals`);
                const journalsData = journalsResponse.data.data || [];
                const journalsMapping = journalsData.reduce((acc, journal) => {
                    acc[journal.journalId] = {
                        journalName: journal.journalName,
                        abbreviation: journal.abbreviation || journal.abbrevation || "N/A",
                    };
                    return acc;
                }, {});
                setJournalsMap(journalsMapping);

                const uniqueCountries = [...new Set(authorsResponse.data.data.map((author) => author.country).filter(Boolean))];
                setCountries(uniqueCountries.map((country) => ({ country })));
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load search results. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setSuggestions([]);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);

        if (!newQuery.trim()) {
            setSuggestions([]);
            return;
        }

        if (activeTab === "Author") {
            const filteredAuthors = authors.filter((author) =>
                `${author.firstName} ${author.lastName}`.toLowerCase().includes(newQuery.toLowerCase())
            );
            setSuggestions(filteredAuthors);
        } else if (activeTab === "University") {
            const filteredUniversities = universities.filter((university) =>
                university.affName.toLowerCase().includes(newQuery.toLowerCase())
            );
            setSuggestions(filteredUniversities);
        } else if (activeTab === "Country") {
            const filteredCountries = countries.filter((country) =>
                country.country.toLowerCase().includes(newQuery.toLowerCase())
            );
            setSuggestions(filteredCountries);
        }
    };

    const handleSuggestionClick = (item) => {
        const newQuery = activeTab === "Author"
            ? `${item.firstName} ${item.lastName}`
            : item.affName || item.country;
        setQuery(newQuery);
        setSuggestions([]);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim() || authorId.trim()) {
            setHasSearched(true); // Set hasSearched to true when search is executed
            setAuthorPage(1);
            setUniversityPage(1);
            setCountryPage(1);
            navigate(`/profile-search?query=${encodeURIComponent(query)}&authorId=${encodeURIComponent(authorId)}`);
        }
    };

    const getFilteredAuthors = () => {
        if (!hasSearched) return []; // Return empty array if no search has been performed
        return authors.filter(
            (author) =>
                (!query.trim() ||
                    `${author.firstName} ${author.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
                    (author.designation || "").toLowerCase().includes(query.toLowerCase()) ||
                    (author.university || "").toLowerCase().includes(query.toLowerCase())) &&
                (!authorId.trim() || author.authorId.toString() === authorId)
        );
    };

    const getFilteredUniversities = () => {
        if (!hasSearched) return []; // Return empty array if no search has been performed
        return universities.filter((university) =>
            university.affName.toLowerCase().includes(query.toLowerCase())
        );
    };

    const getFilteredCountries = () => {
        if (!hasSearched) return []; // Return empty array if no search has been performed
        return countries.filter((country) =>
            country.country.toLowerCase().includes(query.toLowerCase())
        );
    };

    const getPublicationCount = (authorId) => {
        return articles.filter((article) =>
            article.authorIds?.split(",").map((id) => id.trim()).includes(authorId.toString())
        ).length;
    };

    const getAffiliationPublicationCount = (affName) => {
        const affAuthors = authors.filter((author) =>
            author.university?.trim().toLowerCase() === affName.trim().toLowerCase()
        );
        const authorIds = affAuthors.map((author) => author.authorId.toString());
        return articles.filter((article) =>
            article.authorIds?.split(",").map((id) => id.trim()).some((id) => authorIds.includes(id))
        ).length;
    };

    const getCountryPublicationCount = (country) => {
        const countryAuthors = authors.filter((author) =>
            author.country?.trim().toLowerCase() === country.trim().toLowerCase()
        );
        const authorIds = countryAuthors.map((author) => author.authorId.toString());
        return articles.filter((article) =>
            article.authorIds?.split(",").map((id) => id.trim()).some((id) => authorIds.includes(id))
        ).length;
    };

    const getTabCount = (tab) => {
        switch (tab) {
            case "Author": return getFilteredAuthors().length;
            case "University": return getFilteredUniversities().length;
            case "Country": return getFilteredCountries().length;
            default: return 0;
        }
    };

    const paginateItems = (items, currentPage) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    };

    const getTotalPages = (items) => Math.ceil(items.length / itemsPerPage);

    const renderPagination = (currentPage, setPage, totalItems) => {
        const totalPages = getTotalPages(totalItems);
        if (totalPages <= 1) return null;

        const maxVisiblePages = 7;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        return (
            <div className="flex justify-center items-center space-x-2 mt-6">
                <button
                    onClick={() => setPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 text-gray-600 disabled:text-gray-300 hover:text-blue-600 transition-colors duration-200"
                >
                    <FaChevronLeft className="w-5 h-5" />
                </button>
                {startPage > 1 && (
                    <>
                        <button
                            onClick={() => setPage(1)}
                            className="px-4 py-2 rounded-full text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
                        >
                            1
                        </button>
                        {startPage > 2 && <span className="px-4 py-2 text-sm">...</span>}
                    </>
                )}
                {[...Array(endPage - startPage + 1)].map((_, index) => {
                    const pageNumber = startPage + index;
                    return (
                        <button
                            key={pageNumber}
                            onClick={() => setPage(pageNumber)}
                            className={`px-4 py-2 rounded-full text-sm font-medium ${currentPage === pageNumber
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                } transition-colors duration-200`}
                        >
                            {pageNumber}
                        </button>
                    );
                })}
                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <span className="px-4 py-2 text-sm">...</span>}
                        <button
                            onClick={() => setPage(totalPages)}
                            className="px-4 py-2 rounded-full text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
                        >
                            {totalPages}
                        </button>
                    </>
                )}
                <button
                    onClick={() => setPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 text-gray-600 disabled:text-gray-300 hover:text-blue-600 transition-colors duration-200"
                >
                    <FaChevronRight className="w-5 h-5" />
                </button>
            </div>
        );
    };

    const getAuthorArticles = (authorId) => {
        return articles.filter((article) =>
            article.authorIds?.split(",").map((id) => id.trim()).includes(authorId.toString())
        );
    };

    const getUniversityArticles = (affName) => {
        const affAuthors = authors.filter((author) =>
            author.university?.trim().toLowerCase() === affName.trim().toLowerCase()
        );
        const authorIds = affAuthors.map((author) => author.authorId.toString());
        return articles.filter((article) =>
            article.authorIds?.split(",").map((id) => id.trim()).some((id) => authorIds.includes(id)));
    };

    const getCountryArticles = (country) => {
        const countryAuthors = authors.filter((author) =>
            author.country?.trim().toLowerCase() === country.trim().toLowerCase()
        );
        const authorIds = countryAuthors.map((author) => author.authorId.toString());
        return articles.filter((article) =>
            article.authorIds?.split(",").map((id) => id.trim()).some((id) => authorIds.includes(id)));
    };

    const types = activeTab === 'Author' ? 'Author Search' :
        activeTab === 'University' ? 'University Search' :
            'Country Search';

    return (
        <>
            <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
            {isSearchOpen && (
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10"
                    aria-hidden="true"
                ></div>
            )}
            <div className={`min-h-screen md:mx-[90px] ${isSearchOpen ? 'mt-[160px]' : 'mt-[80px]'}`}>
                <div className="py-8">
                    <div className="w-full">
                        {/* Advanced Filters */}
                        <div className="mb-5 bg-white border border-gray-200 py-2 px-3 rounded-lg shadow-sm">
                            <div className="flex space-x-6 mb-6">
                                {["Author", "University", "Country"].map((tab) => (
                                    <label key={tab} className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            value={tab}
                                            checked={activeTab === tab}
                                            onChange={() => {
                                                setActiveTab(tab);
                                                setQuery("");
                                                setSuggestions([]);
                                                setAuthorId("");
                                                setAuthorPage(1);
                                                setUniversityPage(1);
                                                setCountryPage(1);
                                                setHasSearched(false); // Reset search state when switching tabs
                                            }}
                                            className="form-radio text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-lg font-medium font-IBM text-gray-700">
                                            {tab}
                                        </span>
                                    </label>
                                ))}
                            </div>

                            <div className="mb-6 relative ">
                                <form onSubmit={handleSearch} className="relative mx-auto">
                                    <div className="flex flex-col sm:flex-row gap-4 ">
                                        <input
                                            type="text"
                                            value={query}
                                            onChange={handleInputChange}
                                            onKeyPress={(e) => {
                                                if (e.key === "Enter") handleSearch(e);
                                            }}
                                            className={`${activeTab === "Author" ? 'md:w-1/2' : 'md:w-full'} py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
                                            placeholder={`Search by ${activeTab.toLowerCase()}....`}
                                        />
                                        {activeTab === "Author" && (
                                            <input
                                                type="text"
                                                value={authorId}
                                                onChange={(e) => setAuthorId(e.target.value)}
                                                className="md:w-1/2 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                                placeholder="Author ID"
                                            />
                                        )}
                                        {suggestions.length > 0 && (
                                            <ul
                                                ref={dropdownRef}
                                                className="absolute w-full sm:w-1/2 mt-[52px] bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto z-50"
                                            >
                                                {suggestions.map((item, index) => (
                                                    <li
                                                        key={index}
                                                        onClick={() => handleSuggestionClick(item)}
                                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                                                    >
                                                        {activeTab === "Author"
                                                            ? `${item.firstName} ${item.lastName}`
                                                            : item.affName || item.country}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </form>
                            </div>

                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={handleSearch}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors duration-200"
                                >
                                    <FaSearch className="mr-2" /> Search
                                </button>
                            </div>
                        </div>
                        <div className="flex space-x-4 border-b-2 border-gray-200 mb-8 overflow-x-auto">
                            <button
                                key={activeTab}
                                className="pb-3 px-4 text-sm font-medium transition-colors duration-200 border-b-2 border-blue-600 text-blue-600"
                            >
                                {activeTab === 'Author' ? "Total Authors" : activeTab === "University" ? `Total Universities` : "Total Countries"} ({getTabCount(activeTab)})
                            </button>
                        </div>
                        {error ? (
                            <p className="text-center text-red-600 text-lg">{error}</p>
                        ) : isLoading ? (
                            <p className="text-center text-gray-600 text-lg">Loading...</p>
                        ) : (
                            <div>
                                {hasSearched && (
                                    <>
                                        {activeTab === "Author" && getFilteredAuthors().length > 0 && (
                                            <div className="bg-white overflow-x-auto border border-gray-200 py-6 mb-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">S.No</th>
                                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Author Name</th>
                                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">University</th>
                                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Country</th>
                                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Publications</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                        {paginateItems(getFilteredAuthors(), authorPage).map((author, index) => (
                                                            <tr key={author.authorId} className="hover:bg-gray-50 transition-colors">
                                                                <td className="px-6 py-2 text-sm text-gray-900">{index + 1}</td>
                                                                <td className="px-6 py-2 text-sm">
                                                                    <Link
                                                                        to={`/author_profile/${encodeURIComponent(author.firstName.trim() + author.lastName.trim())}`}
                                                                        className=" text-blue-600 hover:underline"
                                                                    >
                                                                        {author.firstName} {author.lastName}
                                                                    </Link>
                                                                </td>
                                                                <td className="px-6 py-2 text-sm">
                                                                    <Link
                                                                        to={`/university_profile/${encodeURIComponent(author.university?.replace(/\s+/g, ''))}`}
                                                                        className="text-blue-600 hover:underline"
                                                                    >
                                                                        {author.university || "N/A"}
                                                                    </Link>
                                                                </td>
                                                                <td className="px-6 py-2 text-sm text-gray-900">{author.country || "N/A"}</td>
                                                                <td className="px-6 py-2 text-sm text-gray-900">{getPublicationCount(author.authorId)}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                {renderPagination(authorPage, setAuthorPage, getFilteredAuthors())}
                                            </div>
                                        )}
                                        {activeTab === "University" && getFilteredUniversities().length > 0 && (
                                            <div className="bg-white overflow-x-auto border border-gray-200 py-6 mb-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">S.No</th>
                                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">University Name</th>
                                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Address</th>
                                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Country</th>
                                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Publications</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                        {paginateItems(getFilteredUniversities(), universityPage).map((university, index) => (
                                                            <tr key={university.affId} className="hover:bg-gray-50 transition-colors">
                                                                <td className="px-6 py-2 text-sm text-gray-900">{index + 1}</td>
                                                                <td className="px-6 py-2 text-sm">
                                                                    <Link
                                                                        to={`/university_profile/${encodeURIComponent(university.affName.replace(/\s+/g, ''))}`}
                                                                        className="text-blue-600 hover:underline"
                                                                    >
                                                                        {university.affName}
                                                                    </Link>
                                                                </td>
                                                                <td className="px-6 py-2 text-sm text-gray-900">{university.address || "N/A"}</td>
                                                                <td className="px-6 py-2 text-sm text-gray-900">{university.country || "N/A"}</td>
                                                                <td className="px-6 py-2 text-sm text-gray-900">{getAffiliationPublicationCount(university.affName)}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                {renderPagination(universityPage, setUniversityPage, getFilteredUniversities())}
                                            </div>
                                        )}
                                        {activeTab === "Country" && getFilteredCountries().length > 0 && (
                                            <div className="bg-white overflow-x-auto border border-gray-200 py-6 mb-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th className="px-6 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">S.No</th>
                                                            <th className="px-6 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Country Name</th>
                                                            <th className="px-6 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Authors</th>
                                                            <th className="px-6 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Publications</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                        {paginateItems(getFilteredCountries(), countryPage).map((countryObj, index) => {
                                                            const country = countryObj.country;
                                                            const countryAuthors = authors.filter((author) =>
                                                                author.country?.trim().toLowerCase() === country.trim().toLowerCase()
                                                            );
                                                            return (
                                                                <tr key={country} className="hover:bg-gray-50 transition-colors">
                                                                    <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                                                                    <td className="px-6 py-4 text-sm">
                                                                        <Link
                                                                            to={`/country_profile/${encodeURIComponent(country)}`}
                                                                            state={{ authorIds: countryAuthors.map((author) => author.authorId.toString()) }}
                                                                            className="text-blue-600 hover:underline"
                                                                        >
                                                                            {country}
                                                                        </Link>
                                                                    </td>
                                                                    <td className="px-6 py-4 text-sm text-gray-900">{countryAuthors.length}</td>
                                                                    <td className="px-6 py-4 text-sm text-gray-900">{getCountryPublicationCount(country)}</td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                                {renderPagination(countryPage, setCountryPage, getFilteredCountries())}
                                            </div>
                                        )}
                                        {(getFilteredAuthors().length === 0 &&
                                            getFilteredUniversities().length === 0 &&
                                            getFilteredCountries().length === 0) && (
                                                <p className="text-center text-gray-600 text-lg bg-white border border-gray-200 p-4 rounded-lg">
                                                    No Results
                                                </p>
                                            )}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProfileSearch;