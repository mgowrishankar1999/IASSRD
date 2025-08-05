import { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';

function OpenAccess() {
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
                <title>Open Access - IASSRD</title>
                <meta name="description" content="Learn about the Open Access Policy of the International Academy for Social Sciences Research and Development (IASSRD)" />
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
                        <p className="text-3xl text-gray-800 font-bold mb-1">Open Access</p>
                        <p className="border-t border-gray-400 mb-4"></p>
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
                        <h1 className="text-2xl text-gray-800 font-semibold">International Academy for Social Sciences Research and Development (IASSRD) Open Access Policy</h1>
                        <p className="text-[16px] font-normal text-gray-800 pt-4 text-justify">
                            At IASSRD, we are dedicated to advancing the unrestricted dissemination of knowledge. Our Open Access initiative ensures that all scholarly work we publish is freely available to researchers, educators, students, practitioners, and the public without any subscription or access costs.
                        </p>
                        <h1 className="text-2xl text-gray-800 font-semibold mt-4">Understanding Open Access</h1>
                        <p className="text-[16px] font-normal text-gray-800 pt-4 text-justify">
                            Open Access (OA) involves providing free, unrestricted online access to peer-reviewed research articles. This model allows anyone with internet access to read, download, and distribute scholarly research without encountering financial or other barriers.
                        </p>
                        <h1 className="text-2xl text-gray-800 font-semibold mt-4">Our Commitment to Open Access</h1>
                        <ul className="mt-1 list-disc pl-3" style={{ listStylePosition: 'inside' }}>
                            <li>Facilitate global dissemination and exchange of knowledge.</li>
                            <li>Maximize the accessibility and impact of research outcomes.</li>
                            <li>Remove economic and technical barriers, supporting scientific and academic progress.</li>
                            <li>Foster interdisciplinary collaboration and innovation.</li>
                        </ul>
                        <h1 className="text-2xl text-gray-800 font-semibold mt-4">Benefits of Our Open Access Model</h1>
                        <ul className="mt-1 list-disc pl-3" style={{ listStylePosition: 'inside' }}>
                            <li><strong>Worldwide Visibility:</strong> Ensures extensive reach and increased recognition of your research.</li>
                            <li><strong>Enhanced Citation Impact:</strong> Open-access articles typically receive greater citation counts.</li>
                            <li><strong>Rapid Knowledge Exchange:</strong> Accelerates the dissemination and advancement of scientific findings.</li>
                            <li><strong>Inclusive Accessibility:</strong> Provides equal opportunities for researchers from developing regions and underfunded institutions.</li>
                        </ul>
                        <h1 className="text-2xl text-gray-800 font-semibold mt-4">Licensing and Copyright</h1>
                        <p className="text-[16px] font-normal text-gray-800 pt-4 text-justify">
                            All articles published through IASSRD’s open-access platform are licensed under the Creative Commons Attribution (CC BY) License. This license permits users to:
                        </p>
                        <ul className="mt-1 list-disc pl-3" style={{ listStylePosition: 'inside' }}>
                            <li><strong>Share</strong> — freely copy and distribute the material in any medium or format.</li>
                            <li><strong>Adapt</strong> — modify, remix, and build upon the work, including for commercial purposes.</li>
                        </ul>
                        <p className="text-[16px] font-normal text-gray-800 pt-4 text-justify">
                            Authors retain copyright ownership while granting IASSRD the rights for publication and distribution. Attribution to original authors and citation of sources are mandatory when using the published materials.
                        </p>
                        <h1 className="text-2xl text-gray-800 font-semibold mt-4">Transparent Pricing Policy</h1>
                        <ul className="mt-1 list-disc pl-3" style={{ listStylePosition: 'inside' }}>
                            <li>All content is accessible to readers without charge.</li>
                            <li>A modest Article Processing Charge (APC) applies to authors to cover peer review, editing, and publishing costs.</li>
                            <li>Fee waivers and discounts are available to authors from economically disadvantaged countries.</li>
                        </ul>
                        <h1 className="text-2xl text-gray-800 font-semibold mt-4">Open Access and Ethical Standards</h1>
                        <ul className="mt-1 list-disc pl-3" style={{ listStylePosition: 'inside' }}>
                            <li>Research Integrity</li>
                            <li>Robust Peer Review</li>
                            <li>Data Accuracy</li>
                            <li>Plagiarism Prevention</li>
                        </ul>
                        <h1 className="text-2xl text-gray-800 font-semibold mt-4">Support Open Access Publishing</h1>
                        <p className="text-[16px] font-normal text-gray-800 pt-4 text-justify">
                            By choosing IASSRD for your publication needs, you are contributing to the global mission of making academic research universally accessible. Open access publication empowers scholars, stimulates interdisciplinary cooperation, and advances innovation.
                        </p>
                        <p className="text-[16px] font-normal text-gray-800 pt-4 text-justify">
                            Knowledge is a public good. Research deserves openness. Partner with us to champion accessible and free scientific communication for all.
                        </p>
                        <h1 className="text-2xl text-gray-800 font-semibold mt-4">Contact Us</h1>
                        <p className="text-[16px] font-normal text-gray-800 pt-4 text-justify">
                            For further details, please contact us at <a href="mailto:iassrd.editor@gmail.com" className="text-blue-600 hover:underline">iassrd.editor@gmail.com</a>.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </HelmetProvider>
    );
}

export default OpenAccess;