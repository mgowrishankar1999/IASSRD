
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';

function WhyPublish() {
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
                <title>Why Publish with Us - IASSRD</title>
                <meta name="description" content="Discover the benefits of publishing with IASSRD, including global reach, rigorous peer review, and open-access visibility for social sciences research." />
            </Helmet>
            <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
            {isSearchOpen && (
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10"
                    aria-hidden="true"
                ></div>
            )}
            <div className={`px-[80px] py-[22px] ${isSearchOpen ? "mt-[160px]" : "mt-[80px]"}`}>
                <div className="flex">
                    <div className="w-[25vw] mr-4">
                        <p className="text-3xl text-gray-800 font-bold mb-1">Why Publish with Us?</p>
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
                        {/* <p className="border-t border-gray-400 mb-4"></p> */}
                        <h1 className="text-2xl text-gray-800 font-semibold">Why Publish with Us?</h1>
                        <p className="text-[17px] font-normal text-gray-800 pt-4 text-justify">
                            The <strong>International Academy for Social Sciences Research and Development (IASSRD)</strong> is a leading global platform dedicated to advancing knowledge, scholarly communication, and impactful research in the social sciences and humanities. By publishing with IASSRD, you join a vibrant international community of researchers, educators, and policy thinkers committed to fostering interdisciplinary dialogue and societal progress.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">Global Reach and Academic Impact</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            All IASSRD journals are open-access, ensuring your work is freely available to scholars, educators, practitioners, and policymakers around the world. Our platform attracts wide readership from academic institutions, NGOs, government bodies, and research centers—maximizing your paper’s visibility, engagement, and real-world impact.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">Rigorous Double-Blind Peer Review</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            We maintain a robust double-blind peer review process to ensure the credibility, scholarly merit, and ethical standards of every published article. Expert reviewers evaluate submissions for originality, methodological soundness, theoretical contribution, and relevance—helping you refine and elevate your work to meet the highest academic standards.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">Timely and Transparent Publication Process</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            We value academic timeliness and strive for swift publication turnaround without compromising quality. Once your article is accepted, it is published in the upcoming issue with minimal delay, enabling you to share your findings quickly with the global academic community.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">Dedicated Editorial Support</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Our experienced editorial team is committed to guiding authors through every step of the publication process—from formatting and compliance checks to revision support and copyediting. You receive constructive feedback and professional assistance to ensure your work is publication-ready.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">Fully Open Access – No Subscription Barriers</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            IASSRD is proud to offer a fully open-access publishing model, enabling unrestricted access to all published content. Your research is free to read, download, and cite—ensuring maximum exposure without the constraints of paywalls or institutional access.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">Diverse Subject Coverage and Interdisciplinary Platforms</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            With journals covering a broad range of disciplines—sociology, education, political science, psychology, economics, gender studies, law, communication, and more—IASSRD provides a comprehensive platform for both specialized and interdisciplinary research. Whether you’re contributing theoretical insights or applied solutions, we offer a suitable publication avenue.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">Strong Indexing and Discoverability</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Our journals are indexed in Google Scholar, ResearchGate, Crossref (DOI), and Scholar9, making your work searchable, citable, and academically visible. Indexed visibility enhances your research profile and opens opportunities for future citations, collaborations, and recognition.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">Trusted Reputation and Ethical Standards</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            IASSRD is recognized as a credible academic publisher with a commitment to ethical research, transparency, and editorial integrity. Authors benefit from being associated with a trusted institution that values academic freedom and responsible scholarship.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">Networking and Collaboration Opportunities</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Publishing with IASSRD gives you access to a growing network of international scholars, editors, and practitioners. Engage with leading voices in your discipline, collaborate on future research, and participate in conferences, thematic issues, and special projects that advance both your career and your field.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">Retain Your Rights</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Authors publishing with IASSRD retain copyright of their work while benefiting from wide dissemination. This allows you to control how your research is shared and used while reaching global audiences through our platform.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">Join Us Today!</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Publishing with IASSRD means contributing to the global advancement of knowledge in the social sciences. Whether you're an early-career researcher or an established academic, we provide a professional, supportive, and high-impact publishing experience.
                        </p>
                        <p className="text-[17px] text-blue-600 hover:underline pt-2">
                            <a href="https://iassrd.com/submitarticle" target="_blank" rel="noopener noreferrer">Submit Your Manuscript: https://iassrd.com/submitarticle</a>
                        </p>
                        <p className="text-gray-800 font-bold pt-2">Contact:</p>
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

export default WhyPublish;