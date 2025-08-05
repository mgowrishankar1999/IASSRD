
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';

function EditorialPolicy() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const navigate = useNavigate();

    // Static menu items for the sidebar
    const menuItems = [
        { name: 'About Us', path: '/about-us' },
        { name: 'Open Access', path: '/open-access' },
        // { name: 'Authors', path: '/authors' },
        { name: 'Reviewers', path: '/joinus-editorial' },
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
                <title>Editorial Board Policy - IASSRD</title>
                <meta name="description" content="Learn about IASSRD's Editorial Board Policy, outlining the structure, responsibilities, and ethical standards for our scholarly journals." />
            </Helmet>
            <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
            {isSearchOpen && (
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10"
                    aria-hidden="true"
                ></div>
            )}
            <div className={`px-[80px] py-[18px] ${isSearchOpen ? "mt-[160px]" : "mt-[80px]"}`}>
                <div className="flex">
                    <div className="w-[25vw] mr-4">
                <p className="text-3xl text-gray-800 font-bold mb-1">Editorial Board Policy</p>
                        <p className="border-t border-gray-400 mb-4"></p>
                        {/* {/* <p className="text-gray-800 text-lg font-bold">Menu</p> */} 
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
                        {/* <p className="border-t border-gray-400 mb-4"></p> */}
                        <h1 className="text-2xl text-gray-800 font-semibold">Editorial Board Policy</h1>
                        <p className="text-[17px] font-normal text-gray-800 pt-4 text-justify">
                            The <strong>International Academy for Social Sciences Research and Development (IASSRD)</strong> is committed to advancing rigorous, high-impact research through its suite of open-access, peer-reviewed journals. The Editorial Board is the cornerstone of this mission—ensuring academic excellence, ethical standards, and the relevance of all published content within the fields of social sciences and humanities. This policy outlines the structure, responsibilities, and expectations of the Editorial Board in support of IASSRD’s vision.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">Mission and Purpose</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            The Editorial Board’s primary purpose is to oversee and maintain the scholarly integrity and editorial quality of all IASSRD journals. Board members play a strategic and operational role in ensuring that:
                        </p>
                        <ul className="mt-1 list-disc pl-3" style={{ listStylePosition: 'inside' }}>
                            <li>All manuscripts undergo rigorous peer review</li>
                            <li>Ethical standards are strictly followed</li>
                            <li>The journal remains aligned with its academic scope and vision</li>
                        </ul>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Members also help shape the journal’s direction by recommending special issues, contributing content, and promoting scholarly engagement within their fields.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">Composition of the Editorial Board</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            The Editorial Board consists of respected scholars, researchers, and professionals with expertise across diverse domains within the social sciences. Appointments are made based on demonstrated academic excellence, research contributions, and commitment to scholarly publishing.
                        </p>
                        <p className="text-gray-800 font-bold pt-2">Selection Criteria Include:</p>
                        <ul className="mt-1 list-disc pl-3" style={{ listStylePosition: 'inside' }}>
                            <li>Subject Expertise: Recognized authority in relevant social science disciplines</li>
                            <li>Academic Reputation: Proven record of scholarly publications and contributions</li>
                            <li>Dedication: Willingness to actively engage in editorial responsibilities</li>
                            <li>Ethical Integrity: Adherence to academic honesty and transparency in publication</li>
                        </ul>
                        <p className="text-[17px] text-gray-800 pt-3">
                            IASSRD values diversity and inclusivity in Board composition, seeking balanced representation across disciplines, geographies, and perspectives.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">Roles and Responsibilities</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Editorial Board members are entrusted with the following duties:
                        </p>
                        <ul className="mt-1 list-disc pl-3" style={{ listStylePosition: 'inside' }}>
                            <li>Manuscript Evaluation: Provide feedback on submissions or recommend qualified peer reviewers. Ensure evaluations are based on originality, clarity, methodological rigor, and relevance.</li>
                            <li>Decision-Making: Participate in final publication decisions in coordination with the Editor-in-Chief and associate editors.</li>
                            <li>Strategic Input: Recommend themes, special issues, or emerging research areas to maintain the journal’s relevance and impact.</li>
                            <li>Ethical Oversight: Ensure all submissions comply with publication ethics regarding plagiarism, conflicts of interest, and data integrity.</li>
                            <li>Peer Review Coordination: Ensure timely and quality peer reviews through appropriate reviewer selection and oversight.</li>
                            <li>Promotion and Outreach: Promote the journal within academic circles and encourage quality manuscript submissions.</li>
                        </ul>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">Editorial Review Process</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Each manuscript undergoes the following review flow:
                        </p>
                        <ol className="mt-1 list-decimal pl-3" style={{ listStylePosition: 'inside' }}>
                            <li>Initial Screening – Editorial staff or the Editor-in-Chief screens the submission for scope and format compliance.</li>
                            <li>Peer Review – Qualified reviewers evaluate the manuscript on scholarly merit, originality, clarity, and ethical standards.</li>
                            <li>Editorial Decision – Based on reviewer reports, the Editorial Board, under the guidance of the Editor-in-Chief, decides to accept, revise, or reject the manuscript.</li>
                        </ol>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Board members are responsible for maintaining objectivity, timeliness, and fairness throughout this process.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">Ethical Standards</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            All Editorial Board members are expected to uphold the highest standards of publication ethics. They must:
                        </p>
                        <ul className="mt-1 list-disc pl-3" style={{ listStylePosition: 'inside' }}>
                            <li>Maintain Confidentiality: Respect the privacy of authors and reviewers throughout the editorial process.</li>
                            <li>Avoid Conflicts of Interest: Recuse themselves from handling manuscripts where personal, financial, or professional bias may exist.</li>
                            <li>Ensure Academic Integrity: Vigilantly monitor for unethical practices such as plagiarism, falsified data, and improper authorship.</li>
                        </ul>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">Tenure and Appointment</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Board members are typically appointed for a renewable term of two to three years. Reappointments are based on performance, engagement, and continued expertise in the relevant fields. New members may be nominated by the Editor-in-Chief in consultation with senior editorial leadership.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">Meetings and Communication</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Editorial Board members engage in regular communication with the editorial team through:
                        </p>
                        <ul className="mt-1 list-disc pl-3" style={{ listStylePosition: 'inside' }}>
                            <li>Email updates and policy briefings</li>
                            <li>Virtual meetings to discuss journal performance and upcoming initiatives</li>
                            <li>Collaborative platforms for reviewing submissions and monitoring editorial timelines</li>
                        </ul>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">Performance Evaluation</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Board members are periodically assessed based on:
                        </p>
                        <ul className="mt-1 list-disc pl-3" style={{ listStylePosition: 'inside' }}>
                            <li>Quality and timeliness of reviews</li>
                            <li>Participation in editorial decisions</li>
                            <li>Engagement in journal activities (e.g., special issues, promotions)</li>
                            <li>Responsiveness and adherence to ethical responsibilities</li>
                        </ul>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Constructive feedback is welcomed and used to refine the editorial process.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">Resignation and Removal</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Editorial Board members may resign at any time by notifying the editorial office in writing. Members who consistently fail to fulfill their responsibilities or violate editorial policies may be removed at the discretion of the Editor-in-Chief, following a review process.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">Conclusion</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            The Editorial Board is instrumental to the scholarly impact, credibility, and operational success of IASSRD journals. This policy provides clarity and guidance to ensure that all members contribute effectively to the Academy’s mission of advancing research in the social sciences.
                        </p>
                        <p className="text-[17px] text-gray-800 pt-3">
                            For editorial queries or applications to join the Editorial Board, contact:
                        </p>
                        <p className="text-gray-800 font-bold pt-2">Email:</p>
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

export default EditorialPolicy;
