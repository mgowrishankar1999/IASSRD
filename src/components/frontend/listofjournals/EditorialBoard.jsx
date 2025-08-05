import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../navbar";
import Footer from "../footer";
import Sidebar from "../../common/frontendSidebar";
import JournalContext from "../../common/journalContext";
import defaultimage from "../../../assets/defaultprofile.jpg";

const EditorialBoard = () => {
    const { journalAbbrevation } = useParams();
    const { journals, loading: contextLoading, error: contextError } = useContext(JournalContext);
    const journal = Array.isArray(journals) ? journals.find((j) => j.abbrevation === journalAbbrevation) : null;
    const [editors, setEditors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        const fetchEditorialBoard = async () => {
            if (!journal) {
                setError(`Journal not found for abbreviation: ${journalAbbrevation}`);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("https://iassrd.com:8081/api/v1/editorial-board");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                let editorArray = Array.isArray(data) ? data : data?.data || [];
                if (!Array.isArray(editorArray)) {
                    throw new Error("Unexpected editorial board response format");
                }

                // Filter editors for the specific journal
                const filteredEditors = editorArray.filter((editor) => editor.journalId === journal.journalId);
                setEditors(filteredEditors);
                setLoading(false);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message);
                setEditors([]);
                setLoading(false);
            }
        };

        if (!contextLoading && !contextError && journal) {
            fetchEditorialBoard();
        } else if (!contextLoading && !journal) {
            setError(`Journal not found for abbreviation: ${journalAbbrevation}`);
            setLoading(false);
        }
    }, [contextLoading, contextError, journal, journalAbbrevation]);

    // Separate Editorial Board Members (Editor-in-Chief) and Reviewers
    const editorialBoardMembers = editors.filter((editor) => editor.editorType === "Editor-in-Chief");
    const reviewers = editors.filter((editor) => editor.editorType !== "Editor-in-Chief");

    if (loading || contextLoading) {
        return <div className="flex justify-center items-center min-h-screen bg-gray-100">Loading...</div>;
    }

    if (error || contextError) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="text-center p-5 text-red-600 text-base" role="alert">
                    Error: {error || contextError}
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
            {isSearchOpen && (
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10"
                    aria-hidden="true"
                ></div>
            )}
            <div className={`px-[80px] py-[15px] ${isSearchOpen ? "mt-[140px]" : "mt-[60px]"} bg-gradient-to-br from-gray-50 to-white min-h-screen`}>
                <div className="flex mt-8">
                    <Sidebar journalAbbreviation={journalAbbrevation} dynamicProps={journal} />
                    <div className="w-[75vw] ps-6 h-auto">
                        <p className="text-3xl text-blue-800 font-bold mb-5">{journal?.journalName}</p>
                        <p className="border-b border-gray-300 mb-8"></p>

                        {/* Breadcrumb */}
                        {/* <div className="text-sm text-gray-600 mb-6 flex flex-wrap items-center space-x-2">
                            <Link to="/" className="hover:text-blue-600 transition-colors duration-200">Home</Link>
                            <span className="text-gray-400">/</span>
                            <Link to="/journals" className="hover:text-blue-600 transition-colors duration-200">Journals</Link>
                            <span className="text-gray-400">/</span>
                            <Link to={`/journal/${journalAbbrevation}`} className="hover:text-blue-600 transition-colors duration-200">
                                {journal ? journal.journalName : journalAbbrevation}
                            </Link>
                            <span className="text-gray-400">/</span>
                            <span className="text-gray-800 font-medium">Editorial Team</span>
                        </div> */}

                        {/* Editorial Board Members Section */}
                        <div className="flex items-center justify-between mb-8 border-b-2 border-blue-200 pb-4">
                            <h2 className="text-2xl font-bold uppercase text-gray-800">Editorial Board Members</h2>
                            <Link
                                to="/joinus-editorial"
                                className="border border-red-600 text-red-600 font-bold px-4 py-1 rounded hover:bg-red-600 hover:text-white transition"
                            >
                                JOIN
                            </Link>
                        </div>

                        {editorialBoardMembers.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 mb-12">
                                {editorialBoardMembers.map((editor) => (
                                    <div
                                        key={editor.memberId}
                                        className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex items-center space-x-4"
                                    >
                                        <img
                                            src={editor.profilePhoto ? `https://iassrd.com/uploads${editor.profilePhoto}` : defaultimage}
                                            alt={`${editor.editorName}'s profile`}
                                            className="w-20 h-20 rounded-full object-cover border-2 border-blue-100"
                                            onError={(e) => { e.target.src = defaultimage; }}
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {editor.prefix} {editor.editorName}
                                            </h3>
                                            <p className="text-sm text-gray-600 mt-1">{editor.editorAffiliation}</p>
                                            <div className="mt-3 flex space-x-4">
                                                {editor.orcidLink && (
                                                    <a href={editor.orcidLink} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 transition-colors">
                                                        <span className="text-sm">ORCID</span>
                                                    </a>
                                                )}
                                                {editor.googleScholarProfile && (
                                                    <a href={editor.googleScholarProfile} target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-800 transition-colors">
                                                        <span className="text-sm">Google Scholar</span>
                                                    </a>
                                                )}
                                                {editor.researchGateProfile && (
                                                    <a href={editor.researchGateProfile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">
                                                        <span className="text-sm">ResearchGate</span>
                                                    </a>
                                                )}
                                                {editor.linkedin && (
                                                    <a href={editor.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:text-blue-900 transition-colors">
                                                        <span className="text-sm">LinkedIn</span>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 text-center text-sm mb-12">No Editorial Board Members found.</p>
                        )}

                        {/* Reviewers Section */}
                        {reviewers.length > 0 && (
                            <div>
                                <h3 className="text-2xl font-bold uppercase text-gray-800 mb-6 border-b-2 border-blue-200 pb-2">
                                    Reviewers
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {reviewers.map((reviewer) => (
                                        <div
                                            key={reviewer.memberId}
                                            className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex items-center space-x-4"
                                        >
                                            <img
                                                src={reviewer.profilePhoto ? `https://iassrd.com/uploads${reviewer.profilePhoto}` : defaultimage}
                                                alt={`${reviewer.editorName}'s profile`}
                                                className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                                                onError={(e) => { e.target.src = defaultimage; }}
                                            />
                                            <div className="flex-1">
                                                <h3 className="text-base font-semibold text-gray-900">
                                                    {reviewer.prefix} {reviewer.editorName}
                                                </h3>
                                                <p className="text-xs text-gray-600 mt-1">{reviewer.editorAffiliation}</p>
                                                <div className="mt-3 flex space-x-4">
                                                    {reviewer.orcidLink && (
                                                        <a href={reviewer.orcidLink} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 transition-colors">
                                                            <span className="text-sm">ORCID</span>
                                                        </a>
                                                    )}
                                                    {reviewer.googleScholarProfile && (
                                                        <a href={reviewer.googleScholarProfile} target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-800 transition-colors">
                                                            <span className="text-sm">Google Scholar</span>
                                                        </a>
                                                    )}
                                                    {reviewer.researchGateProfile && (
                                                        <a href={reviewer.researchGateProfile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">
                                                            <span className="text-sm">ResearchGate</span>
                                                        </a>
                                                    )}
                                                    {reviewer.linkedin && (
                                                        <a href={reviewer.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:text-blue-900 transition-colors">
                                                            <span className="text-sm">LinkedIn</span>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default EditorialBoard;