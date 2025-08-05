import { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';

function PrivacyPolicy() {
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
                <title>Privacy Policy - IASSRD</title>
                <meta name="description" content="Read the Privacy Policy of the International Academy for Social Sciences Research and Development (IASSRD)" />
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
                <p className="text-3xl text-gray-800 font-bold mb-1">Privacy Policy</p>
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
                        <h1 className="text-2xl text-gray-800 font-semibold">International Academy for Social Sciences Research and Development (IASSRD) Privacy Policy</h1>
                        <p className="text-[16px] font-normal text-gray-800 pt-4 text-justify">
                            At IASSRD, we prioritize your privacy and are dedicated to safeguarding your personal data. This Privacy Policy clarifies the types of information we collect, how we utilize it, and the measures we take to ensure its security.
                        </p>
                        <h1 className="text-2xl text-gray-800 font-semibold mt-4">Information We Collect</h1>
                        <p className="text-[16px] font-normal text-gray-800 pt-4 text-justify">
                            When interacting with our website or creating a user account, we may collect the following personal details:
                        </p>
                        <ul className="mt-1 list-disc pl-3" style={{ listStylePosition: 'inside' }}>
                            <li>Full Name</li>
                            <li>Email Address</li>
                            <li>Institutional Affiliation and Academic Qualification</li>
                            <li>Research Interests and Professional Position</li>
                        </ul>
                        <h1 className="text-2xl text-gray-800 font-semibold mt-4">How We Use Your Information</h1>
                        <p className="text-[16px] font-normal text-gray-800 pt-4 text-justify">
                            The information collected helps us to:
                        </p>
                        <ul className="mt-1 list-disc pl-3" style={{ listStylePosition: 'inside' }}>
                            <li>Enhance and personalize your experience on our website</li>
                            <li>Address your inquiries efficiently</li>
                            <li>Provide timely updates about our latest publications, services, and events (you may opt-out anytime)</li>
                            <li>Protect against fraud and ensure the security of our platform</li>
                        </ul>
                        <h1 className="text-2xl text-gray-800 font-semibold mt-4">External Links</h1>
                        <p className="text-[16px] font-normal text-gray-800 pt-4 text-justify">
                            Our site might include links to external websites. Please be aware that once you leave our site, the privacy policies of these third-party websites apply.
                        </p>
                        <h1 className="text-2xl text-gray-800 font-semibold mt-4">Policy Amendments</h1>
                        <p className="text-[16px] font-normal text-gray-800 pt-4 text-justify">
                            IASSRD reserves the right to modify this Privacy Policy at any given time without prior notification. We encourage regular visits to this page to stay informed about any updates.
                        </p>
                        <h1 className="text-2xl text-gray-800 font-semibold mt-4">Contact Us</h1>
                        <p className="text-[16px] font-normal text-gray-800 pt-4 text-justify">
                            For any questions or concerns about this Privacy Policy, please contact us at:
                        </p>
                        <p className="text-[16px] text-blue-600 hover:underline pt-2">
                            <a href="mailto:iassrd.editor@gmail.com" className="text-blue-600 hover:underline">iassrd.editor@gmail.com</a>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </HelmetProvider>
    );
}

export default PrivacyPolicy;