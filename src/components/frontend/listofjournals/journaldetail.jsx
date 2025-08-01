







// import React, { useState, useContext, useEffect } from 'react';
// import { Helmet, HelmetProvider } from 'react-helmet-async';
// import Navbar from '../navbar';
// import Footer from '../footer';
// import Sidebar from '../../common/frontendSidebar';
// import { useParams } from 'react-router-dom';
// import JournalContext from "../../common/journalContext"; // Adjust path as needed

// const JournalDetail = () => {
//     const [isSearchOpen, setIsSearchOpen] = useState(false);
//     const { journalAbbrevation } = useParams();
//     console.log('journalAbbrevation:', journalAbbrevation);

//     // Access journal data from context
//     const { journals, loading: contextLoading, error: contextError } = useContext(JournalContext);
//     console.log('journals array:', journals); // Debug log to verify array content

//     // Filter the specific journal data from the array with safeguard
//     const journal = Array.isArray(journals) ? journals.find((j) => j.abbrevation === journalAbbrevation) : null;
//     console.log('Found journal:', journal); // Debug log to verify the filtered result

//     const [loading, setLoading] = useState(contextLoading);
//     const [error, setError] = useState(contextError);

//     // Use useEffect to handle error setting after render
//     useEffect(() => {
//         if (!contextLoading && !contextError && !journal) {
//             setError(`Journal not found for abbreviation: ${journalAbbrevation}`);
//         }
//     }, [contextLoading, contextError, journal, journalAbbrevation]);

//     return (
//         <HelmetProvider>
//             <Helmet>
//                 <title>{journal?.journalName || 'Journal Detail'} - IASSRD</title>
//                 <meta name="description" content={journal?.aimandscope || 'Journal details'} />
//             </Helmet>
//             <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
//             <div className={`px-[80px] py-[30px] ${isSearchOpen ? 'mt-[160px]' : 'mt-[80px]'}`}>
//                 <div className="flex mt-8">
//                     <Sidebar
//                         journalAbbreviation={journalAbbrevation}
//                         dynamicProps={journal}
//                     />
//                     <div className="w-[75vw] ps-6 h-auto">
//                         <p className="text-3xl text-blue-800 font-bold mb-5">
//                             {journal?.journalName}
//                         </p>
//                         <p className="border-b border-gray-300 mb-8"></p>
//                         <p className="text-xl text-gray-700 font-semibold mb-8">Journal Detail</p>
//                         {error && <p className="text-red-600 mb-4">{error}</p>}
//                         {journal && (
//                             <div className="text-gray-950 text-[15px]">

//                                 {journal.issnPrint ?

//                                     <p className="mb-4">
//                                         <span className="font-semibold">ISSN (Print):</span> {journal.issnPrint || 'N/A'}
//                                     </p>
//                                     : null
//                                 }
//                                 {
//                                     journal.issnOnline ?

//                                         <p className="mb-4">
//                                             <span className="font-semibold">ISSN (Online):</span> {journal.issnOnline || 'N/A'}
//                                         </p>
//                                         : null

//                                 }

//                                 {
//                                     journal.abbrevation ?

//                                         <p className="mb-4">
//                                             <span className="font-semibold">Abbreviation:</span> {journal.abbrevation || 'N/A'}
//                                         </p>
//                                         : null
//                                 }

//                                 {


//                                     journal.journalKey ?

//                                         <p className="mb-4">
//                                             <span className="font-semibold">Journal Key:</span> {journal.journalKey || 'N/A'}
//                                         </p>
//                                         : null
//                                 }

//                                 {

//                                     journal.doi ?

//                                         <p className="mb-4">
//                                             <span className="font-semibold">DOI:</span> {journal.doi || 'N/A'}
//                                         </p>
//                                         :
//                                         null
//                                 }
//                                 {
//                                     journal.publicationFrequency ?

//                                         <p className="mb-4">
//                                             <span className="font-semibold">Publication Frequency:</span> {journal.publicationFrequency || 'N/A'}
//                                         </p>
//                                         :
//                                         null
//                                 }



//                                 <p className="mb-4">
//                                     <span className="font-semibold">Aim and Scope:</span>
//                                 </p>
//                                 <div
//                                     className="text-justify"
//                                     dangerouslySetInnerHTML={{ __html: journal.aimandscope || '<p>No aim and scope available</p>' }}
//                                 />
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </HelmetProvider>
//     );
// };

// export default JournalDetail;



import React, { useState, useContext, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Navbar from '../navbar';
import Footer from '../footer';
import Sidebar from '../../common/frontendSidebar';
import { useParams } from 'react-router-dom';
import JournalContext from "../../common/journalContext";
import JournalArticlesTabs from '../listofjournals/journalsLatesttabs';
import Academia from '../../../assets/academia.png'
import Google from '../../../assets/google.png'
import Researchgate from '../../../assets/researchgate.png'
import SDB from '../../../assets/sdb.png'

const JournalDetail = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { journalAbbrevation } = useParams();


    const { journals, loading: contextLoading, error: contextError } = useContext(JournalContext);
    console.log('journals array:', journals);


    const journal = Array.isArray(journals) ? journals.find((j) => j.abbrevation === journalAbbrevation) : null;
    console.log('Found journal:', journal);

    const [loading, setLoading] = useState(contextLoading);
    const [error, setError] = useState(contextError);


    useEffect(() => {
        if (!contextLoading && !contextError && !journal) {
            setError(`Journal not found for abbreviation: ${journalAbbrevation}`);
        }
    }, [contextLoading, contextError, journal, journalAbbrevation]);

    return (
        <HelmetProvider>
            <Helmet>
                <title>{journal?.journalName || 'Journal Detail'} - IASSRD</title>
                <meta name="description" content={journal?.aimandscope || 'Journal details'} />
            </Helmet>
            <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
            {isSearchOpen && (
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10"
                    aria-hidden="true"
                ></div>
            )}
            <div className={`px-[80px] py-[30px] ${isSearchOpen ? 'mt-[160px]' : 'mt-[80px]'}`}>
                <div className="flex mt-3">
                    <Sidebar
                        journalAbbreviation={journalAbbrevation}
                        dynamicProps={journal}
                    />
                    <div className="w-[75vw] ps-6 h-auto">
                        <p className="text-3xl text-blue-800 font-bold mb-5">
                            {journal?.journalName}
                        </p>
                        <p className="border-b border-gray-300 mb-8"></p>
                        {/* <p className="text-xl text-gray-700 font-semibold mb-4">Journal Detail's</p> */}
                        {error && <p className="text-red-600 mb-4">{error}</p>}
                        {journal && (
                            <>
                                <div className="text-gray-950 text-[15px] flex items-center justify-between ">
                                    <section>
                                        {journal.issnPrint && (
                                            <p className="mb-4">
                                                <span className="font-semibold">ISSN (Print):</span> {journal.issnPrint}
                                            </p>
                                        )}
                                        {journal.issnOnline && (
                                            <p className="mb-4">
                                                <span className="font-semibold">ISSN (Online):</span> {journal.issnOnline}
                                            </p>
                                        )}
                                        {/* {journal.abbrevation && (
                                            <p className="mb-4">
                                                <span className="font-semibold">Abbreviation:</span> {journal.abbrevation}
                                            </p>
                                        )} */}
                                        {journal.journalKey && (
                                            <p className="mb-4">
                                                <span className="font-semibold">Journal ID:</span> {journal.journalKey}
                                            </p>
                                        )}
                                        {journal.doi && (
                                            <p className="mb-4">
                                                <span className="font-semibold">DOI:</span> {journal.doi}
                                            </p>
                                        )}
                                        {/* {journal.publicationFrequency && (
                                            <p className="mb-4">
                                                <span className="font-semibold">Publication Frequency:</span> {journal.publicationFrequency}
                                            </p>
                                        )} */}

                                    </section>
                                    {/* <section>


                                        <div class='flex flex-col space-y-3'>
                                            <img class='h-12' src={Google} />
                                            <img class='h-12' src={Researchgate} />
                                            <img class='h-12 bg-white p-2' src={Academia} />
                                            <img class='h-12' src={SDB} />
                                        </div>
                                    </section> */}

                                </div>
                                <p className="mb-4">
                                    <span className="font-semibold">Aim and Scope:</span>
                                </p>
                                <div
                                    className="text-justify"
                                    dangerouslySetInnerHTML={{ __html: journal.aimandscope || '<p>No aim and scope available</p>' }}
                                />
                            </>
                        )}
                        {journal?.length   && <JournalArticlesTabs journalId={journal.journalId} />}
                        {/* <p className="text-xl text-gray-700 font-semibold mt-8 mb-4">Journal Articles</p> */}
                    </div>
                </div>
            </div>
            <Footer />
        </HelmetProvider>
    );
};

export default JournalDetail;


