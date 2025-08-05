
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';

function PeerReview() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const navigate = useNavigate();

    // Static menu items for the sidebar
    const menuItems = [
        { name: 'About Us', path: '/about-us' },
        { name: 'Open Access', path: '/open-access' },
        // { name: 'Authors', path: '/authors' },
        { name: 'Reviewers', path: '/joinus-editorial' },
        { name: 'Peer Review', path: '/peer-review' },
        { name: 'Editorial Policy', path: '/editorial-policy' },
        { name: 'APC', path: '/apcs' },
        // { name: 'Our Policies', path: '/policies' },
        { name: 'Publication Ethics', path: '/publication-ethics' },
        { name: 'Terms and Conditions', path: '/terms-and-conditions' },
        { name: 'Privacy Policy', path: '/privacy-policy' },
        { name: 'Why Publish with Us?', path: '/whypublishwithus' },

        { name: 'Contact Us', path: '/contactus' }
    ];

    return (
        <HelmetProvider>
            <Helmet>
                <title>Peer Review Process - IASSRD</title>
                <meta name="description" content="Learn about the rigorous peer review process for IASSRD journals, ensuring academic rigor and scholarly excellence." />
            </Helmet>
            <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
            {isSearchOpen && (
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10"
                    aria-hidden="true"
                ></div>
            )}
            <div className={`px-[80px] py-[30px] ${isSearchOpen ? "mt-[160px]" : "mt-[80px]"}`}>
                <p className="text-3xl text-gray-800 font-bold mb-8">Peer Review Process</p>
                <div className="flex">
                    <div className="w-[25vw] mr-4">
                        <p className="border-t border-gray-400 mb-4"></p>
                        {/* <p className="text-gray-800 text-lg font-bold">Menu</p> */}
                        <ul className="mt-2 space-y-2">
                            {menuItems.map((item, index) => (
                                <li
                                    key={index}
                                    className={`p-2 bg-white shadow-sm rounded text-md cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-102 hover:-translate-x-1 ${window.location.pathname === item.path ? 'bg-blue-100' : 'hover:bg-gray-100 hover:text-blue-600'}`}
                                    onClick={() => navigate(item.path)}
                                >
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-[75%] h-full">
                        <p className="border-t border-gray-400 mb-4"></p>
                        <h1 className="text-2xl text-gray-800 font-semibold">Peer Review Process – IASSRD Journals</h1>
                        <p className="text-[17px] font-normal text-gray-800 pt-4 text-justify">
                            The peer review process at the <strong>International Academy for Social Sciences Research and Development (IASSRD)</strong> is designed to uphold academic rigor, intellectual integrity, and scholarly excellence. Our structured double-blind review system ensures that every manuscript published through IASSRD journals meets the highest standards of research quality and relevance in the diverse fields of social sciences and humanities.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">1. Initial Submission Screening</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            All submitted manuscripts are first reviewed by the journal’s editorial office to verify compliance with submission guidelines, including format, structure, plagiarism checks, and relevance to the journal’s thematic scope. Only manuscripts that fulfill these preliminary requirements advance to the next stage.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">2. Editorial Evaluation</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            The Editor-in-Chief or designated Associate Editors conduct a preliminary evaluation of the manuscript. This step involves assessing:
                        </p>
                        <ul className="mt-1 list-disc pl-3" style={{ listStylePosition: 'inside' }}>
                            <li>The relevance of the topic to the journal's scope</li>
                            <li>Originality and theoretical contribution</li>
                            <li>Methodological soundness</li>
                            <li>Ethical compliance in research design and data use</li>
                        </ul>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Manuscripts that do not meet the journal’s expectations in these areas may be desk-rejected at this stage.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">3. Reviewer Assignment</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Manuscripts that pass the editorial evaluation are assigned to independent reviewers who are experts in the relevant subject area. Reviewers are carefully selected to ensure objectivity, domain expertise, and the absence of conflicts of interest.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">4. Double-Blind Peer Review</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Each manuscript undergoes a double-blind review process, where the identities of both authors and reviewers are kept anonymous to ensure impartiality. Reviewers are expected to evaluate the manuscript based on:
                        </p>
                        <ul className="mt-1 list-disc pl-3" style={{ listStylePosition: 'inside' }}>
                            <li>Theoretical Contribution: Does the manuscript add new insights or frameworks to the field?</li>
                            <li>Methodological Rigor: Are the research methods appropriate and applied correctly?</li>
                            <li>Argumentation and Clarity: Is the writing clear, well-organized, and logically presented?</li>
                            <li>Literature and Citation: Are references up-to-date, relevant, and properly cited?</li>
                            <li>Impact and Relevance: Does the study make a meaningful contribution to scholarship or practice?</li>
                        </ul>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Reviewers provide detailed feedback with recommendations for acceptance, revision, or rejection.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">5. Editorial Decision</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Based on reviewers' reports, the editorial team reaches one of the following decisions:
                        </p>
                        <ul className="mt-1 list-disc pl-3" style={{ listStylePosition: 'inside' }}>
                            <li>Accept: The paper is accepted without revisions.</li>
                            <li>Minor Revisions: The paper is accepted conditionally, subject to minor edits.</li>
                            <li>Major Revisions: The paper requires substantial changes and a second round of review.</li>
                            <li>Reject: The paper is not suitable for publication in its current form.</li>
                        </ul>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">6. Revisions and Resubmission</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Authors receiving revision requests are expected to revise the manuscript accordingly and provide a detailed response to reviewers, addressing each comment. Revised manuscripts are re-evaluated by the editorial team and, if necessary, sent for a second round of review.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">7. Final Decision and Acceptance</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            After all revisions are satisfactorily addressed, the editorial team makes a final publication decision. Accepted manuscripts proceed to the production phase.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">8. Publication</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Accepted papers undergo copyediting, proofreading, and formatting before being published in IASSRD's open-access journal platform, ensuring broad visibility and accessibility to global readers.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">Commitment to Academic Quality</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            IASSRD is dedicated to publishing research that advances knowledge and contributes to academic discourse in the social sciences. Our rigorous peer review process ensures credibility, relevance, and excellence in all published work. We believe in fostering a collaborative environment where reviewers and authors engage constructively to enhance the quality of scholarship.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">Join Our Editorial and Reviewer Community</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            If you are an experienced researcher or academic interested in contributing to the peer review process, we invite you to join our editorial board or reviewer panel.
                        </p>
                        <p className="text-[17px] text-blue-600 hover:underline pt-2">
                            <a href="https://iassrd.com/submitarticle" target="_blank" rel="noopener noreferrer">Editorial Application and Reviewer Sign-Up: https://iassrd.com/submitarticle</a>
                        </p>
                        <p className="text-gray-800 font-bold pt-2">Contact Us:</p>
                        <ul className="mt-1 list-disc pl-3" style={{ listStylePosition: 'inside' }}>
                            <li><a href="mailto:iassrd.editor@gmail.com" className="text-blue-600 hover:underline">iassrd.editor@gmail.com</a></li>
                        </ul>
                        <p className="text-gray-800 font-bold pt-2">Website:</p>
                        <ul className="mt-1 list-disc pl-3" style={{ listStylePosition: 'inside' }}>
                            <li><a href="https://www.iassrd.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.iassrd.com</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </HelmetProvider>
    );
}

export default PeerReview;
