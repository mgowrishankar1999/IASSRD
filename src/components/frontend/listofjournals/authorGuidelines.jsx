
// import React, { useState, useEffect, useContext } from "react";
// import { Link, useParams } from "react-router-dom";
// import Navbar from "../navbar";
// import Footer from "../footer";
// import Sidebar from "../../common/frontendSidebar";
// import JournalContext from "../../common/journalContext";

// const AuthorGuideLines = () => {
//     const [isSearchOpen, setIsSearchOpen] = useState(false);
//     const { journalAbbrevation } = useParams();
//     const { journals, loading: contextLoading, error: contextError } = useContext(JournalContext);
//     const journal = Array.isArray(journals) ? journals.find((j) => j.abbrevation === journalAbbrevation) : null;
//     const [apcData, setApcData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchApcData = async () => {
//             if (!journal) {
//                 setError(`Journal not found for abbreviation: ${journalAbbrevation}`);
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 const apcResponse = await fetch("https://iassrd.com:8081/api/v1/apcs");
//                 if (!apcResponse.ok) {
//                     throw new Error(`APC HTTP error! Status: ${apcResponse.status}`);
//                 }
//                 const apcData = await apcResponse.json();
//                 let apcArray = Array.isArray(apcData) ? apcData : apcData?.data || [];
//                 if (!Array.isArray(apcArray)) {
//                     throw new Error("Unexpected APC response format");
//                 }

//                 // Filter APC data for the specific journal
//                 const filteredApc = apcArray.filter((apc) => apc.journalId === journal.journalId);
//                 setApcData(filteredApc);
//                 setLoading(false);
//             } catch (err) {
//                 console.error("Fetch error:", err);
//                 setError(err.message);
//                 setApcData([]);
//                 setLoading(false);
//             }
//         };

//         if (!contextLoading && !contextError && journal) {
//             fetchApcData();
//         } else if (!contextLoading && !journal) {
//             setError(`Journal not found for abbreviation: ${journalAbbrevation}`);
//             setLoading(false);
//         }
//     }, [contextLoading, contextError, journal, journalAbbrevation]);

//     if (loading || contextLoading) {
//         return <div>Loading...</div>;
//     }

//     if (error || contextError) {
//         return (
//             <div className="text-center py-10 text-red-600" role="alert">
//                 Error: {error || contextError}
//             </div>
//         );
//     }

//     return (
//         <>
//             <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
//             <div className={`px-[80px] py-[30px] ${isSearchOpen ? "mt-[160px]" : "mt-[80px]"}`}>
//                 <div className="flex mt-8">
//                     <Sidebar journalAbbreviation={journalAbbrevation} dynamicProps={journal} />
//                     <div className="w-[75vw] ps-6 h-auto">
//                         <p className="text-3xl text-blue-800 font-bold mb-5">{journal?.journalName}</p>
//                         <p className="border-b border-gray-300 mb-8"></p>
//                         <p className="text-xl text-gray-700 font-semibold mb-8">Author Guidelines</p>

//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default AuthorGuideLines;




import React, { useRef, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import sanitizeHtml from "sanitize-html";
import Navbar from "../navbar"; // Ensure this component exists in your project
import Footer from "../footer"; // Ensure this component exists in your project
import Sidebar from "../../common/frontendSidebar"; // Import the new Sidebar component
import { FaBars, FaTimes } from "react-icons/fa";

const AuthorGuidelines = () => {
    const { journalAbbrevation } = useParams();

    const [journal, setJournal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isSearchOpen, setIsSearchOpen] = useState(false);


    // References for scrolling to sections
    const generalRequirementsRef = useRef(null);
    const manuscriptStructureRef = useRef(null);
    const formattingGuidelinesRef = useRef(null);
    const abstractKeywordsRef = useRef(null);
    const authorInformationRef = useRef(null);
    const figuresTablesRef = useRef(null);
    const referencingStyleRef = useRef(null);
    const submissionTypesRef = useRef(null);
    const ethicalConsiderationsRef = useRef(null);
    const permissionsCopyrightRef = useRef(null);
    const fundingDisclosureRef = useRef(null);
    const languageEditingRef = useRef(null);
    const plagiarismOriginalityRef = useRef(null);
    const reviewProcessRef = useRef(null);
    const articleChargesRef = useRef(null);
    const submissionChecklistRef = useRef(null);
    const publicationEthicsRef = useRef(null);
    const authorshipChangesRef = useRef(null);
    const contactInformationRef = useRef(null);
    const needHelpRef = useRef(null);
    const submissionProcessRef = useRef(null);

    // Sanitize HTML to enforce IBM Plex Sans
    const cleanHtml = (html) => {
        return sanitizeHtml(html, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(["h1", "h2", "h3", "span", "a"]),
            allowedAttributes: {
                "*": ["class"],
                a: ["href", "class"],
            },
            transformTags: {
                "*": (tagName, attribs) => ({
                    tagName,
                    attribs: {
                        ...attribs,
                        style: `font-family: 'IBM Plex Sans', Arial, sans-serif;`,
                    },
                }),
            },
        });
    };

    // Fetch journal data from API
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const journalResponse = await fetch("https://iassrd.com:8081/api/v1/journals");
                if (!journalResponse.ok) {
                    throw new Error(`Journal HTTP error! Status: ${journalResponse.status}`);
                }
                const journalData = await journalResponse.json();
                console.log("Fetched journal:", journalData);

                const matchedJournal = journalData.data.find(
                    (j) => j.abbrevation === journalAbbrevation
                );
                console.log("Matched journal:", matchedJournal);

                if (!matchedJournal) {
                    throw new Error("No journal found for the provided abbreviation");
                }

                setJournal(matchedJournal);
                setLoading(false);
            } catch (err) {
                console.error("Journal fetch error:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        if (journalAbbrevation) {
            fetchData();
        } else {
            setError("No journal abbreviation provided in URL");
            setLoading(false);
        }
    }, [journalAbbrevation]);

    // Toggle mobile menu
    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Handle window resize for mobile detection
    useEffect(() => {
        const handleResize = () => {
            const newIsMobile = window.innerWidth < 768;
            setIsMobile(newIsMobile);
            if (!newIsMobile) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Slide-in animation for mobile menu
    const slideInFromLeft = `
    @keyframes slideInFromLeft {
      from {
        transform: translateX(-100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;

    // Handle loading and error states
    if (error) {
        return <div className="text-center text-red-500 py-10">{error}</div>;
    }
    if (loading) {
        return <div className="text-center text-gray-500 py-10">Loading...</div>;
    }
    if (!journal) {
        return <div className="text-center text-gray-500 py-10">No journal data available.</div>;
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
            <div className={`bg-white mx-4 md:mx-10 mb-4 ${isSearchOpen ? "mt-[160px]" : "mt-[80px]"}`}>
                <header className="px-6 py-3">
                    {/* <nav className="text-sm text-gray-500">
                        <Link to="/" className="hover:underline">
                            Home
                        </Link>{" "}
                        / <span className="text-teal-600">Author Guidelines</span>
                    </nav> */}
                </header>

                <div className="flex flex-col md:flex-row">
                    <aside
                        className={`md:w-1/4 transition-transform duration-300 ease-in-out ${isMobile
                            ? isMobileMenuOpen
                                ? "absolute top-0 left-0 z-50 backdrop-blur-sm animate-slideInFromLeft"
                                : "hidden"
                            : "block"
                            }`}
                    >
                        <style>{slideInFromLeft}</style>
                        <Sidebar journalAbbrevation={journal.abbrevation} dynamicProps={journal} />
                    </aside>

                    <main className={`w-full md:w-3/4 px-4 transition-all duration-300 ${isMobile && isMobileMenuOpen ? "ml-0" : "ml-14"}`}>
                        <section className="mb-7 font-IBM">
                            <p className="text-3xl text-blue-800 font-bold mb-3">{journal?.journalName}</p>
                            <p className="border-b border-gray-300 mb-4"></p>
                            <p className="text-3xl text-gray-800 font-bold mb-1 ">Author Guidelines</p>
                            {/* <h2 className="text-xl font-bold text-gray-800 mb-3 font-IBM">
                                Author Guidelines - IASSRD Journals
                            </h2> */}
                            <div
                                className="text-gray-600 text-md text-justify mb-4 font-IBM"
                                dangerouslySetInnerHTML={{
                                    __html: cleanHtml(`
                    <p>Welcome to the Author Guidelines for journals published by the International Academy of Science, Social Science, Research and Development (IASSRD). We are honored that you are considering submitting your work to our esteemed journals. To ensure that your submission adheres to the highest standards of quality and professionalism, please follow these detailed guidelines.</p>
                  `),
                                }}
                            />

                            <h2 ref={generalRequirementsRef} className="text-xl font-bold text-gray-800 mb-2 font-IBM">
                                General Submission Requirements
                            </h2>
                            <div
                                className="text-gray-600 text-md text-justify mb-3 font-IBM"
                                dangerouslySetInnerHTML={{
                                    __html: cleanHtml(`
                    <ul class="list-disc pl-5">
                      <li><strong>Language:</strong> Manuscripts must be submitted in English, using clear and high-quality academic language.</li>
                      <li><strong>Format:</strong> Submissions must be in Microsoft Word format (.doc or .docx).</li>
                      <li><strong>Originality:</strong> All submissions must be original and not previously published or under consideration elsewhere.</li>
                      <li><strong>Plagiarism:</strong> Manuscripts will undergo plagiarism checks. Plagiarized submissions will be rejected.</li>
                      <li><strong>Ethics:</strong> Research involving human subjects must comply with the Declaration of Helsinki, with informed consent obtained where applicable.</li>
                    </ul>
                  `),
                                }}
                            />

                            <h2 ref={manuscriptStructureRef} className="text-xl font-bol d text-gray-800 mb-2 font-IBM">
                                Manuscript Structure
                            </h2>
                            <div
                                className="text-gray-600 text-md text-justify mb-3 font-IBM"
                                dangerouslySetInnerHTML={{
                                    __html: cleanHtml(`
                    <p>Your manuscript should adhere to the following structure for clarity and consistency:</p>
                    <ol class="list-decimal pl-5">
                      <li><strong>Title:</strong> Concise and reflective of the article’s content, avoiding abbreviations.</li>
                      <li><strong>Author Information:</strong> Include full names, institutional affiliations, city, country, and email addresses for all authors, with the corresponding author clearly indicated.</li>
                      <li><strong>Keywords:</strong> Provide 4-6 keywords for indexing purposes.</li>
                      <li><strong>Abstract:</strong> A summary of up to 350 words outlining the purpose, methodology, results, and conclusions.</li>
                      <li><strong>Introduction:</strong> State the research problem, background, and study significance.</li>
                      <li><strong>Literature Review:</strong> Review relevant scholarly works that form the foundation of your research.</li>
                      <li><strong>Methodology:</strong> Detail the methods, tools, models, or approaches used in the study.</li>
                      <li><strong>Results/Findings:</strong> Present findings logically, using tables, figures, or statistical data as needed.</li>
                      <li><strong>Conclusion:</strong> Summarize key findings, their implications, and suggest future research directions.</li>
                      <li><strong>Statements and Declarations:</strong> Include funding sources, conflicts of interest, and acknowledgments.</li>
                      <li><strong>References:</strong> Cite all sources in APA 7th edition format.</li>
                    </ol>
                  `),
                                }}
                            />

                            <h2 ref={formattingGuidelinesRef} className="text-xl font-bold text-gray-800 mb-2 font-IBM">
                                Formatting Guidelines
                            </h2>
                            <div
                                className="text-gray-600 text-md text-justify mb-3 font-IBM"
                                dangerouslySetInnerHTML={{
                                    __html: cleanHtml(`
                    <ul class="list-disc pl-5">
                      <li><strong>Font:</strong> Use Times New Roman, size 12 for body text.</li>
                      <li><strong>Line Spacing:</strong> Set to 1.5 line spacing.</li>
                      <li><strong>Margins:</strong> Use 1-inch (2.54 cm) margins on all sides.</li>
                      <li><strong>Headings:</strong> Use bold for headings and subheadings.</li>
                      <li><strong>Paragraphs:</strong> Indent the first line of each paragraph by 0.5 inches.</li>
                      <li><strong>Figures and Tables:</strong> Place near their first mention in the text, with clear captions.</li>
                    </ul>
                  `),
                                }}
                            />

                            <h2 ref={abstractKeywordsRef} className="text-xl font-bold text-gray-800 mb-2 font-IBM">
                                Abstract and Keywords
                            </h2>
                            <div
                                className="text-gray-600 text-md text-justify mb-3 font-IBM"
                                dangerouslySetInnerHTML={{
                                    __html: cleanHtml(`
                    <ul class="list-disc pl-5">
                      <li>The abstract should summarize the article’s key points in no more than 350 words, covering objectives, methods, results, and conclusions.</li>
                      <li><strong>Keywords:</strong> List 4-6 keywords immediately after the abstract for searchability and indexing.</li>
                    </ul>
                  `),
                                }}
                            />

                            <h2 ref={authorInformationRef} className="text-xl font-bold text-gray-800 mb-2 font-IBM">
                                Author Information
                            </h2>
                            <div
                                className="text-gray-600 text-md text-justify mb-3 font-IBM"
                                dangerouslySetInnerHTML={{
                                    __html: cleanHtml(`
                    <p>Include the following for each author:</p>
                    <ul class="list-disc pl-5">
                      <li><strong>Full Name:</strong> Complete names of all authors.</li>
                      <li><strong>Affiliation:</strong> Institution, department, city, and country.</li>
                      <li><strong>Corresponding Author:</strong> Email address of the corresponding author.</li>
                      <li><strong>ORCID (if available):</strong> 16-digit ORCID ID.</li>
                    </ul>
                  `),
                                }}
                            />

                            <h2 ref={figuresTablesRef} className="text-xl font-bold text-gray-800 mb-2 font-IBM">
                                Figures, Tables, and Illustrations
                            </h2>
                            <div
                                className="text-gray-600 text-md text-justify mb-3 font-IBM"
                                dangerouslySetInnerHTML={{
                                    __html: cleanHtml(`
                    <ul class="list-disc pl-5">
                      <li>Figures and tables must be high quality, with images at least 300 dpi.</li>
                      <li>Provide clear captions describing the content.</li>
                      <li>Number figures and tables sequentially (e.g., Figure 1, Table 1) and reference them in the text (e.g., "As shown in Figure 1").</li>
                      <li>Use clear labels and legible fonts in graphs and charts.</li>
                    </ul>
                  `),
                                }}
                            />

                            <h2 ref={referencingStyleRef} className="text-xl font-bold text-gray-800 mb-2 font-IBM">
                                Referencing Style
                            </h2>
                            <div
                                className="text-gray-600 text-md text-justify mb-3 font-IBM"
                                dangerouslySetInnerHTML={{
                                    __html: cleanHtml(`
                    <ul class="list-disc pl-5">
                      <li>Use APA 7th edition style for all references and citations.</li>
                      <li>In-text citations should include the author’s last name and year (e.g., Smith, 2023).</li>
                      <li>List references alphabetically at the end of the manuscript, including DOIs where available.</li>
                    </ul>
                  `),
                                }}
                            />

                            <h2 ref={submissionTypesRef} className="text-xl font-bold text-gray-800 mb-2 font-IBM">
                                Types of Submissions
                            </h2>
                            <div
                                className="text-gray-600 text-md text-justify mb-3 font-IBM"
                                dangerouslySetInnerHTML={{
                                    __html: cleanHtml(`
                    <p>IASSRD journals accept the following submission types:</p>
                    <ul class="list-disc pl-5">
                      <li><strong>Full-Length Research Articles:</strong> Original research presenting new findings.</li>
                      <li><strong>Review Articles:</strong> Comprehensive reviews of specific topics or fields.</li>
                      <li><strong>Book Reviews:</strong> Critical evaluations of books relevant to science, social science, or research and development.</li>
                      <li><strong>Discussion Notes:</strong> Short commentaries on recent trends or issues.</li>
                      <li><strong>Articles in Translation:</strong> Translations of significant works relevant to the field.</li>
                    </ul>
                  `),
                                }}
                            />

                            <h2 ref={ethicalConsiderationsRef} className="text-xl font-bold text-gray-800 mb-2 font-IBM">
                                Ethical Considerations
                            </h2>
                            <div
                                className="text-gray-600 text-md text-justify mb-3 font-IBM"
                                dangerouslySetInnerHTML={{
                                    __html: cleanHtml(`
                    <ul class="list-disc pl-5">
                      <li>Research involving human subjects or data must comply with applicable ethical standards, including the Declaration of Helsinki.</li>
                      <li>Obtain approval from an ethics committee and state this in the manuscript.</li>
                      <li>Secure informed consent from all study participants.</li>
                    </ul>
                  `),
                                }}
                            />

                            <h2 ref={permissionsCopyrightRef} className="text-xl font-bold text-gray-800 mb-2 font-IBM">
                                Permissions and Copyright
                            </h2>
                            <div
                                className="text-gray-600 text-md text-justify mb-3 font-IBM"
                                dangerouslySetInnerHTML={{
                                    __html: cleanHtml(`
                    <ul class="list-disc pl-5">
                      <li>Authors must obtain permissions for any third-party content (e.g., images, tables, or text) included in the manuscript.</li>
                      <li>Ensure appropriate licenses for software, questionnaires, or scales used.</li>
                      <li>Authors will sign an Assignment of Copyright form upon manuscript acceptance.</li>
                    </ul>
                  `),
                                }}
                            />

                            <h2 ref={fundingDisclosureRef} className="text-xl font-bold text-gray-800 mb-2 font-IBM">
                                Funding and Conflict of Interest Disclosure
                            </h2>
                            <div
                                className="text-gray-600 text-md text-justify mb-3 font-IBM"
                                dangerouslySetInnerHTML={{
                                    __html: cleanHtml(`
                    <ul class="list-disc pl-5">
                      <li>Declare all funding sources and financial support received.</li>
                      <li>Disclose any conflicts of interest or state, “The authors declare no conflict of interest.”</li>
                    </ul>
                  `),
                                }}
                            />

                            <h2 ref={languageEditingRef} className="text-xl font-bold text-gray-800 mb-2 font-IBM">
                                Language and Editing
                            </h2>
                            <div
                                className="text-gray-600 text-md text-justify mb-3 font-IBM"
                                dangerouslySetInnerHTML={{
                                    __html: cleanHtml(`
                    <p>To ensure clarity and readability:</p>
                    <ul class="list-disc pl-5">
                      <li>Use grammar-check tools or seek assistance from colleagues proficient in English.</li>
                      <li>Professional language editing services are optional but recommended.</li>
                      <li>Accepted manuscripts will undergo professional copyediting.</li>
                    </ul>
                  `),
                                }}
                            />

                            <h2 ref={plagiarismOriginalityRef} className="text-xl font-bold text-gray-800 mb-2 font-IBM">
                                Plagiarism and Originality
                            </h2>
                            <div
                                className="text-gray-600 text-md text-justify mb-3 font-IBM"
                                dangerouslySetInnerHTML={{
                                    __html: cleanHtml(`
                    <p>All manuscripts are subject to plagiarism checks using advanced software. Submissions with significant similarity to existing works will be rejected.</p>
                  `),
                                }}
                            />

                            <h2 ref={reviewProcessRef} className="text-xl font-bold text-gray-800 mb-2 font-IBM">
                                Review and Revision Process
                            </h2>
                            <div
                                className="text-gray-600 text-md text-justify mb-3 font-IBM"
                                dangerouslySetInnerHTML={{
                                    __html: cleanHtml(`
                    <ul class="list-disc pl-5">
                      <li>Manuscripts undergo a double-blind peer-review process.</li>
                      <li>Authors will receive reviewer feedback and must revise their manuscript accordingly.</li>
                      <li>Submit revised manuscripts within the editor-specified timeline.</li>
                    </ul>
                  `),
                                }}
                            />

                            <h2 ref={articleChargesRef} className="text-xl font-bold text-gray-800 mb-2 font-IBM">
                                Article Processing Charges
                            </h2>
                            <div
                                className="text-gray-600 text-md text-justify mb-3 font-IBM"
                                dangerouslySetInnerHTML={{
                                    __html: cleanHtml(`
                    <ul class="list-disc pl-5">
                      <li>An Article Processing Charge (APC) is required upon manuscript acceptance. Visit the <a href="/journal/${journal.abbrevation}/apc" class="text-blue-600 hover:underline">APC section</a> for details.</li>
                      <li>The APC covers peer review, editing, and publication costs.</li>
                    </ul>
                  `),
                                }}
                            />

                            <h2 ref={submissionChecklistRef} className="text-xl font-bold text-gray-800 mb-2 font-IBM">
                                Final Submission Checklist
                            </h2>
                            <div
                                className="text-gray-600 text-md text-justify mb-3 font-IBM"
                                dangerouslySetInnerHTML={{
                                    __html: cleanHtml(`
                    <p>Before submission, ensure:</p>
                    <ul class="list-disc pl-5">
                      <li>Compliance with formatting and structure guidelines.</li>
                      <li>Abstract is within 350 words and includes relevant keywords.</li>
                      <li>Inclusion of all figures, tables, and references.</li>
                      <li>Citations and references follow APA 7th edition format.</li>
                    </ul>
                  `),
                                }}
                            />

                            <h2 ref={publicationEthicsRef} className="text-xl font-bold text-gray-800 mb-2 font-IBM">
                                Publication Ethics and Standards
                            </h2>
                            <div
                                className="text-gray-600 text-md text-justify mb-3 font-IBM"
                                dangerouslySetInnerHTML={{
                                    __html: cleanHtml(`
                    <p>IASSRD adheres to high ethical standards, promoting transparency, integrity, and academic honesty. Detected misconduct will result in manuscript rejection and may impact future submissions.</p>
                  `),
                                }}
                            />

                            <h2 ref={authorshipChangesRef} className="text-xl font-bold text-gray-800 mb-2 font-IBM">
                                Changes in Authorship
                            </h2>
                            <div
                                className="text-gray-600 text-md text-justify mb-3 font-IBM"
                                dangerouslySetInnerHTML={{
                                    __html: cleanHtml(`
                    <p>Authorship changes post-submission must follow COPE guidelines, with a signed letter from all original authors explaining the change.</p>
                  `),
                                }}
                            />

                            <h2 ref={contactInformationRef} className="text-xl font-bold text-gray-800 mb-2 font-IBM">
                                Contact Information
                            </h2>
                            <div
                                className="text-gray-600 text-md text-justify mb-3 font-IBM"
                                dangerouslySetInnerHTML={{
                                    __html: cleanHtml(`
                    <p>For assistance, contact the Managing Editor at <a href="mailto:iassrd.editor@gmail.com" class="text-blue-600 hover:underline">iassrd.editor@gmail.com</a>.</p>
                  `),
                                }}
                            />

                            <h2 ref={needHelpRef} className="text-xl font-bold text-gray-800 mb-2 font-IBM">
                                Need Help?
                            </h2>
                            <div
                                className="text-gray-600 text-md text-justify mb-3 font-IBM"
                                dangerouslySetInnerHTML={{
                                    __html: cleanHtml(`
                    <p>For questions about the submission process, contact our editorial team at <a href="mailto:iassrd.editor@gmail.com" class="text-blue-600 hover:underline">iassrd.editor@gmail.com</a>. We are here to support you.</p>
                  `),
                                }}
                            />

                            <h2 ref={submissionProcessRef} className="text-xl font-bold text-gray-800 mb-2 font-IBM">
                                How to Submit Your Manuscript
                            </h2>
                            <div
                                className="text-gray-600 text-md text-justify mb-3 font-IBM"
                                dangerouslySetInnerHTML={{
                                    __html: cleanHtml(`
                    <p>Submit your manuscript via one of the following methods:</p>
                    <ul class="list-disc pl-5">
                      <li><strong>Online Portal:</strong> Use our online submission portal.</li>
                      <li><strong>Email:</strong> Send your manuscript in MS Word format to <a href="mailto:iassrd.editor@gmail.com" class="text-blue-600 hover:underline">iassrd.editor@gmail.com</a>.</li>
                    </ul>
                    <p>Adhering to these guidelines ensures a streamlined review and publication process. Thank you for contributing to advancing research with IASSRD!</p>
                  `),
                                }}
                            />
                        </section>
                    </main>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AuthorGuidelines;