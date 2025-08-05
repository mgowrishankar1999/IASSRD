import { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';

function TermsAndConditions() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const navigate = useNavigate();

    // Static menu items for the sidebar
    const menuItems = [
        { name: 'About Us', path: '/about-us' },
        { name: 'Open Access', path: '/open-access' },
        // // { name: 'Authors', path: '/authors' },
        { name: 'Reviewers', path: '/joinus-editorial' },
        { name: 'Editorial Policy', path: '/editorial-policy' },
        { name: 'APC', path: '/apcs' },
        // // { name: 'Our Policies', path: '/policies' },
        { name: 'Publication Ethics', path: '/publication-ethics' },
        { name: 'Terms and Conditions', path: '/terms-and-conditions' },
        { name: 'Privacy Policy', path: '/privacy-policy' },
        { name: 'Why Publish with Us?', path: '/whypublishwithus' },
        { name: 'Contact Us', path: '/contactus' }
    ];

    return (
        <HelmetProvider>
            <Helmet>
                <title>Terms and Conditions - IASSRD</title>
                <meta name="description" content="Review the Terms and Conditions of the International Academy for Social Sciences Research and Development (IASSRD)" />
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
                <p className="text-3xl text-gray-800 font-bold mb-1">Terms and Conditions</p>
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
                        <h1 className="text-2xl text-gray-800 font-semibold">International Academy for Social Sciences Research and Development (IASSRD) Terms and Conditions</h1>
                        <h1 className="text-2xl text-gray-800 font-semibold mt-4">Order Processing</h1>
                        <p className="text-[16px] font-normal text-gray-800 pt-4 text-justify">
                            Orders will be initiated upon receipt of the complete subscription payment and acceptance of these terms and conditions.
                        </p>
                        <ul className="mt-1 list-disc pl-3" style={{ listStylePosition: 'inside' }}>
                            <li>Indian libraries and institutions must submit orders on their official institutional letterhead.</li>
                            <li>Students must provide valid proof of their institutional affiliation.</li>
                            <li>Print editions will be dispatched directly by IASSRD.</li>
                        </ul>
                        <h1 className="text-2xl text-gray-800 font-semibold mt-4">Subscription and Access</h1>
                        <p className="text-[16px] font-normal text-gray-800 pt-4 text-justify">
                            To subscribe or renew your subscription, please contact us at <a href="mailto:iassrd.editor@gmail.com" className="text-blue-600 hover:underline">iassrd.editor@gmail.com</a>. IASSRD retains the right to amend subscription policies, with the Chief Editor's decision being final.
                        </p>
                        <h1 className="text-2xl text-gray-800 font-semibold mt-4">Content Usage</h1>
                        <p className="text-[16px] font-normal text-gray-800 pt-4 text-justify">
                            All website content, including design elements, layout, text, images, and programs, is owned by IASSRD and is protected under copyright and intellectual property laws.
                        </p>
                        <ul className="mt-1 list-disc pl-3" style={{ listStylePosition: 'inside' }}>
                            <li>Reproducing, distributing, modifying, or creating derivative works without explicit permission is prohibited.</li>
                            <li>Personal and non-commercial use is permitted, provided copyright notices remain intact.</li>
                            <li>Systematic collection of content to form databases or directories without approval is strictly prohibited.</li>
                        </ul>
                        <h1 className="text-2xl text-gray-800 font-semibold mt-4">Automated Access and Data Collection</h1>
                        <p className="text-[16px] font-normal text-gray-800 pt-4 text-justify">
                            The use of automated systems (robots, spiders, crawlers, etc.) to index, download, or extract site content without authorization is prohibited.
                        </p>
                        <h1 className="text-2xl text-gray-800 font-semibold mt-4">Prohibited Content and Usage</h1>
                        <p className="text-[16px] font-normal text-gray-800 pt-4 text-justify">
                            The publication or distribution of content that is unlawful, infringing, defamatory, abusive, hateful, profane, or harmful via this site is strictly prohibited. IASSRD reserves the right to remove any inappropriate content and take necessary corrective action.
                        </p>
                        <h1 className="text-2xl text-gray-800 font-semibold mt-4">Editorial Board Membership</h1>
                        <p className="text-[16px] font-normal text-gray-800 pt-4 text-justify">
                            Editorial board members must submit a minimum of 6–8 papers annually. Non-compliance with this requirement may lead to membership revision or termination by the Managing Editor.
                        </p>
                        <h1 className="text-2xl text-gray-800 font-semibold mt-4">Copyright</h1>
                        <p className="text-[16px] font-normal text-gray-800 pt-4 text-justify">
                            The print version of our journals is considered the definitive version.
                        </p>
                        <ul className="mt-1 list-disc pl-3" style={{ listStylePosition: 'inside' }}>
                            <li>Unauthorized copying, saving, or printing of content is restricted.</li>
                            <li>Commercial reuse of any content without explicit authorization from IASSRD is strictly prohibited.</li>
                            <li>All copyrights remain solely with IASSRD.</li>
                        </ul>
                        <h1 className="text-2xl text-gray-800 font-semibold mt-4">Contact Us</h1>
                        <p className="text-[16px] font-normal text-gray-800 pt-4 text-justify">
                            For further inquiries, contact us at <a href="mailto:iassrd.editor@gmail.com" className="text-blue-600 hover:underline">iassrd.editor@gmail.com</a>.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </HelmetProvider>
    );
}

export default TermsAndConditions;