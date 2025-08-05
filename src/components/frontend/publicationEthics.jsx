
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';

function PublicationEthics() {
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
                <title>Publication Ethics - IASSRD</title>
                <meta name="description" content="Learn about IASSRD's commitment to ethical publishing standards and responsibilities for authors, reviewers, editors, and publishers." />
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
                <p className="text-3xl text-gray-800 font-bold mb-1">Publication Ethics</p>
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
                        <h1 className="text-2xl text-gray-800 font-semibold">Publication Ethics</h1>
                        <p className="text-[17px] font-normal text-gray-800 pt-4 text-justify">
                            The <strong>International Academy for Social Sciences Research and Development (IASSRD)</strong> is deeply committed to maintaining the highest standards of integrity and transparency in academic publishing. IASSRD upholds the ethical guidelines established by the Committee on Publication Ethics (COPE) and expects all participants in the publication process—authors, editors, reviewers, and the publisher—to adhere to these principles in both spirit and practice.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">Duties of Authors</h2>
                        <p className="text-gray-800 font-bold pt-2">Originality and Plagiarism:</p>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Authors must ensure that their work is entirely original. Any content, ideas, or text taken from other sources must be properly cited. Plagiarism, including self-plagiarism or unauthorized reproduction, is strictly prohibited.
                        </p>
                        <p className="text-gray-800 font-bold pt-2">Accuracy and Data Transparency:</p>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Authors are responsible for presenting honest, accurate, and verifiable research findings. Any fabrication, falsification, or misrepresentation of data is considered unethical.
                        </p>
                        <p className="text-gray-800 font-bold pt-2">Multiple or Redundant Submissions:</p>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Manuscripts submitted to IASSRD journals must not be under consideration elsewhere or previously published. Submitting the same work to more than one journal simultaneously is a violation of ethical standards.
                        </p>
                        <p className="text-gray-800 font-bold pt-2">Authorship and Contributions:</p>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Only individuals who have made substantial contributions to the research and writing process should be credited as authors. All contributors, affiliations, and funding sources must be clearly acknowledged.
                        </p>
                        <p className="text-gray-800 font-bold pt-2">Disclosure of Conflicts of Interest:</p>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Authors must disclose any financial, institutional, or personal relationships that might influence the content or interpretation of their manuscript.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">Duties of Reviewers</h2>
                        <p className="text-gray-800 font-bold pt-2">Confidentiality:</p>
                        <p className="text-[17px] text-gray-800 pt-3">
                            All manuscripts received for review must be treated as confidential documents. Reviewers may not share or disclose information without prior permission from the editorial team.
                        </p>
                        <p className="text-gray-800 font-bold pt-2">Constructive Evaluation:</p>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Reviews should be fair, objective, and constructive. Personal criticism or discriminatory remarks are inappropriate and will not be tolerated.
                        </p>
                        <p className="text-gray-800 font-bold pt-2">Conflict of Interest:</p>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Reviewers must avoid reviewing manuscripts where a conflict of interest exists due to personal, professional, or financial relationships with the authors or affiliated institutions.
                        </p>
                        <p className="text-gray-800 font-bold pt-2">Timeliness:</p>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Reviewers are expected to complete reviews within the agreed timeframe. If delays are anticipated, they should promptly inform the editorial office.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">Duties of Editors</h2>
                        <p className="text-gray-800 font-bold pt-2">Editorial Independence:</p>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Editorial decisions are based solely on academic merit, originality, and relevance to the journal’s scope—without regard to the author’s background, gender, ethnicity, political beliefs, or institutional affiliation.
                        </p>
                        <p className="text-gray-800 font-bold pt-2">Impartial Evaluation:</p>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Manuscripts are assessed impartially for scholarly quality, contribution to the field, and ethical integrity.
                        </p>
                        <p className="text-gray-800 font-bold pt-2">Confidentiality:</p>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Editors must maintain the confidentiality of submitted manuscripts and the identities of both authors and reviewers throughout the peer-review process.
                        </p>
                        <p className="text-gray-800 font-bold pt-2">Disclosure and Conflicts of Interest:</p>
                        <p className="text-[17px] text-gray-800 pt-3">
                            Editors should recuse themselves from handling manuscripts in which they have a conflict of interest and ensure an unbiased review process.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">Publisher Responsibilities</h2>
                        <p className="text-gray-800 font-bold pt-2">Ethical Oversight:</p>
                        <p className="text-[17px] text-gray-800 pt-3">
                            IASSRD ensures that all articles published meet international standards for ethical publishing and transparency.
                        </p>
                        <p className="text-gray-800 font-bold pt-2">Corrections and Retractions:</p>
                        <p className="text-[17px] text-gray-800 pt-3">
                            In cases of proven error or misconduct, the journal will issue appropriate corrections, expressions of concern, or retractions as necessary to maintain academic integrity.
                        </p>
                        <p className="text-gray-800 font-bold pt-2">Support for Ethical Conduct:</p>
                        <p className="text-[17px] text-gray-800 pt-3">
                            IASSRD actively promotes education and awareness of ethical research and publication practices among scholars and practitioners.
                        </p>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-4">Misconduct Policy</h2>
                        <p className="text-[17px] text-gray-800 pt-3">
                            IASSRD has a zero-tolerance policy for unethical practices. Allegations of misconduct—such as plagiarism, data manipulation, improper authorship, or nondisclosure of conflicts of interest—will be investigated thoroughly. Confirmed cases may result in retraction of the article, notification of affiliated institutions, and sanctions against the authors or reviewers involved.
                        </p>
                        <p className="text-[17px] text-gray-800 pt-3">
                            For ethics-related concerns or misconduct reporting, please contact:
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

export default PublicationEthics;

