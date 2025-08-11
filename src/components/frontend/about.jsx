import { useState, useEffect , useContext } from 'react';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';
import JournalContext from "../common/journalContext";


function Aboutus() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const navigate = useNavigate();
    const { journals, loading: contextLoading, error: contextError } = useContext(JournalContext);
    console.log(journals.length)


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
                <title>Journals - IASSRD</title>
                <meta name="description" content="Browse our collection of journals and disciplines" />
            </Helmet>
            <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
            {isSearchOpen && (
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10"
                    aria-hidden="true"
                ></div>
            )}
            <div className={`px-[80px] py-[30px] ${isSearchOpen ? "mt-[160px]" : "mt-[80px]"}`}>
                <div className="flex">
                    <div className="w-[25vw] mr-4">
                        <p className="text-3xl text-gray-800 font-bold mb-1">About Us</p>
                        <p className="border-t border-gray-400 mb-4"></p>
                        {/* {/* <p className="text-gray-800 text-lg font-bold">Menu</p> */}
                        <ul className="mt-1 space-y-2">
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
                        <h1 className="text-2xl text-gray-800 font-semibold">About IASSRD</h1>
                        <p className="text-[16px] font-normal text-gray-800 pt-4 text-justify">
                            The <strong>International Academy for Social Sciences Research and Development (IASSRD)</strong> is a global academic consortium committed to promoting innovation, scholarship, and interdisciplinary collaboration in the broad fields of social sciences and humanities. Established to bridge global academic communities, IASSRD serves as a dynamic platform for researchers, scholars, and professionals to engage in impactful knowledge exchange and to foster evidence-based solutions for societal development. Through our diverse initiatives, we facilitate high-quality research publications, organize international conferences and workshops, and build strong networks that connect academia, policy, and practice.
                        </p>
                        <h1 className="text-2xl text-gray-800 font-semibold mt-4">Our Mission</h1>
                        <div>
                            <p className="text-[17px] text-gray-800 pt-2">At IASSRD, our mission is to advance the frontiers of social science research and its application to real-world challenges by:</p>
                            <ul className="mt-1 list-disc pl-3" style={{ listStylePosition: 'inside' }}>
                                <li>Facilitating the dissemination of high-quality, peer-reviewed social science research</li>
                                <li>Advancing open-access publication models to enhance global knowledge sharing</li>
                                <li>Organizing international seminars, workshops, and conferences in social sciences</li>
                                <li>Fostering interdisciplinary partnerships and educational progress in social studies</li>
                            </ul>
                        </div>
                        <p className="text-gray-800 text-[17px] pt-4">We are dedicated to uniting social science disciplines with practical insight, thereby empowering global communities and enriching policy and decision-making processes.</p>
                        <h1 className="text-2xl text-gray-800 font-semibold mt-4">Our Journals</h1>
                        <p className="pt-3 text-[17px] text-gray-800 font-normal text-justify">IASSRD publishes a distinguished collection of {journals?.length} double-blind, peer-reviewed, open-access journals covering both traditional and contemporary themes in social sciences and related fields. Since our founding in 2020, our journals have become a reputable venue for global researchers to disseminate new findings, theoretical contributions, and empirical studies.</p>
                        <p className="text-gray-800 font-bold pt-2">Subject Areas Include:</p>
                        <ul className="mt-1 list-disc pl-3" style={{ listStylePosition: 'inside' }}>
                            <li>Sociology and Social Policy</li>
                            <li>Education and Pedagogy</li>
                            <li>Economics and Development Studies</li>
                            <li>Political Science and International Relations</li>
                            <li>Psychology and Behavioral Studies</li>
                            <li>Law and Human Rights</li>
                            <li>Media and Communication</li>
                            <li>Gender Studies</li>
                            <li>Anthropology and Cultural Studies</li>
                            <li>Public Administration and Governance</li>
                            <li>Environmental and Sustainability Studies</li>
                            <li>History and Philosophy</li>
                        </ul>
                        <h1 className="text-2xl text-gray-800 font-semibold mt-4">Indexing and Recognition</h1>
                        <p className="text-[17px] text-gray-800 pt-3">All IASSRD journals are indexed in reputable academic directories and citation platforms to ensure broad visibility, credibility, and impact:</p>
                        <ul className="mt-1 list-disc pl-3" style={{ listStylePosition: 'inside' }}>
                            <li>Google Scholar</li>
                            <li>ResearchGate</li>
                            <li>Crossref (DOI assigned to every article)</li>
                            <li>Scholar9</li>
                        </ul>
                        <p className="text-[17px] text-gray-800 pt-3">We follow a strict double-blind peer-review policy to maintain scholarly excellence and uphold research ethics across all our publications.</p>
                        <h1 className="text-2xl text-gray-800 font-semibold mt-4">Submit Your Article</h1>
                        <p className="text-[17px] text-gray-800 pt-3">Share your research with a global audience. Submit your manuscript through our online portal:</p>
                        <p className="text-[17px] text-blue-600 hover:underline pt-2">
                            <a href="https://iassrd.com/submitarticle" target="_blank" rel="noopener noreferrer">https://iassrd.com/submitarticle</a>
                        </p>
                        <h1 className="text-2xl text-gray-800 font-semibold mt-4">Join as a Reviewer</h1>
                        <p className="text-[17px] text-gray-800 pt-3">Peer reviewers are essential to the scholarly ecosystem. IASSRD invites experienced researchers and academics to become reviewers and contribute to maintaining the quality of our journals.</p>
                        <p className="text-gray-800 font-bold pt-2">Reviewer Benefits:</p>
                        <ul className="mt-1 list-disc pl-3" style={{ listStylePosition: 'inside' }}>
                            <li>Official Reviewer Certificate</li>
                            <li>Priority consideration for editorial board roles</li>
                            <li>Early access to groundbreaking research</li>
                        </ul>
                        <p className="text-[17px] text-blue-600 hover:underline pt-2">
                            <a href="https://iassrd.com/joinus-editorial" target="_blank" rel="noopener noreferrer">Become a Reviewer</a>
                        </p>
                        <h1 className="text-2xl text-gray-800 font-semibold mt-4">Fellow Membership</h1>
                        <p className="text-[17px] text-gray-800 pt-3 text-justify">The IASSRD Fellow Membership honors individuals who have made outstanding contributions to the advancement of social sciences. Fellows are recognized as leaders in their fields and are granted opportunities to shape the academy’s future directions.</p>
                        <p className="text-gray-800 font-bold pt-2">Fellow Membership Benefits:</p>
                        <ul className="mt-1 list-disc pl-3" style={{ listStylePosition: 'inside' }}>
                            <li>International recognition as an IASSRD Fellow</li>
                            <li>Access to exclusive research networks and projects</li>
                            <li>Fellowship certificate and profile listing on the IASSRD website</li>
                        </ul>
                        <p className="text-[17px] text-blue-600 hover:underline pt-2">
                            <a href="https://iassrd.com/joinus-fellowmember" target="_blank" rel="noopener noreferrer">Apply for Fellowship</a>
                        </p>
                        <h1 className="text-2xl text-gray-800 font-semibold mt-4">Engage with Us</h1>
                        <p className="text-[17px] text-gray-800 pt-3 text-justify">We welcome scholars, students, educators, and professionals from around the world to engage with IASSRD. Whether you are looking to publish your work, attend insightful academic events, collaborate on projects, or serve on editorial boards, we provide the platform and support to elevate your academic journey.</p>
                        <p className="text-[17px] text-gray-800 pt-3">For inquiries regarding publication, membership, or collaborations, please contact us:</p>
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

export default Aboutus;