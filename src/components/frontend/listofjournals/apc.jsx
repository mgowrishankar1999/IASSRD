// import React from "react";
// import Navbar from "../navbar";
// import Footer from "../footer";
// import Sidebar from "../../common/frontendSidebar";
// import { useState, useEffect } from "react";
// import JournalContext from "../../common/journalContext";
// import { useParams } from "react-router-dom";
// import { useContext } from "react";

// const Apc = () => {

//     // for navbar--------
//     const [isSearchOpen, setIsSearchOpen] = useState(false);
//     const { journalAbbrevation } = useParams();


//     const { journals, loading: contextLoading, error: contextError } = useContext(JournalContext);
//     console.log('journals array:', journals);


//     const journal = Array.isArray(journals) ? journals.find((j) => j.abbrevation === journalAbbrevation) : null;
//     console.log('Found journal:', journal);

//     const [loading, setLoading] = useState(contextLoading);
//     const [error, setError] = useState(contextError);


//     useEffect(() => {
//         if (!contextLoading && !contextError && !journal) {
//             setError(`Journal not found for abbreviation: ${journalAbbrevation}`);
//         }
//     }, [contextLoading, contextError, journal, journalAbbrevation]);
//     return (

//         <>
//             <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />


//             <div className={`px-[80px] py-[30px] ${isSearchOpen ? "mt-[160px]" : "mt-[80px]"}`}>
//                 <div className="flex mt-8">
//                     <Sidebar
//                         journalAbbreviation={journalAbbrevation}
//                         dynamicProps={journal}
//                     />

//                     <div className="w-[75vw] ps-6  h-auto">
//                         <p className="text-3xl text-blue-800 font-bold mb-5 ">{journal?.journalName} </p>
//                         <p class='border-b border-gray-300 mb-8'></p>
//                         <p className="text-xl text-gray-700 font-semibold mb-8">Article Processing Charges</p>

//                     </div>


//                 </div>
//             </div>
//             <Footer />
//         </>

//     )
// }

// export default Apc



import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../navbar";
import Footer from "../footer";
import Sidebar from "../../common/frontendSidebar";
import JournalContext from "../../common/journalContext";

const Apc = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { journalAbbrevation } = useParams();
    const { journals, loading: contextLoading, error: contextError } = useContext(JournalContext);
    const journal = Array.isArray(journals) ? journals.find((j) => j.abbrevation === journalAbbrevation) : null;
    const [apcData, setApcData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApcData = async () => {
            if (!journal) {
                setError(`Journal not found for abbreviation: ${journalAbbrevation}`);
                setLoading(false);
                return;
            }

            try {
                const apcResponse = await fetch("https://iassrd.com:8081/api/v1/apcs");
                if (!apcResponse.ok) {
                    throw new Error(`APC HTTP error! Status: ${apcResponse.status}`);
                }
                const apcData = await apcResponse.json();
                let apcArray = Array.isArray(apcData) ? apcData : apcData?.data || [];
                if (!Array.isArray(apcArray)) {
                    throw new Error("Unexpected APC response format");
                }

                // Filter APC data for the specific journal
                const filteredApc = apcArray.filter((apc) => apc.journalId === journal.journalId);
                setApcData(filteredApc);
                setLoading(false);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message);
                setApcData([]);
                setLoading(false);
            }
        };

        if (!contextLoading && !contextError && journal) {
            fetchApcData();
        } else if (!contextLoading && !journal) {
            setError(`Journal not found for abbreviation: ${journalAbbrevation}`);
            setLoading(false);
        }
    }, [contextLoading, contextError, journal, journalAbbrevation]);

    if (loading || contextLoading) {
        return <div>Loading...</div>;
    }

    if (error || contextError) {
        return (
            <div className="text-center py-10 text-red-600" role="alert">
                Error: {error || contextError}
            </div>
        );
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
            <div className={`px-[80px] py-[30px] ${isSearchOpen ? "mt-[160px]" : "mt-[80px]"}`}>
                <div className="flex mt-8">
                    <Sidebar journalAbbreviation={journalAbbrevation} dynamicProps={journal} />
                    <div className="w-[75vw] ps-6 h-auto">
                        <p className="text-3xl text-blue-800 font-bold mb-5">{journal?.journalName}</p>
                        <p className="border-b border-gray-300 mb-8"></p>
                        <p className="text-xl text-gray-700 font-semibold mb-8">Article Processing Charges</p>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                                <thead>
                                    <tr className="bg-indigo-600">
                                        <th
                                            scope="col"
                                            className="px-4 py-3 text-left text-sm font-semibold text-white border-b border-indigo-700 bg-indigo-600"
                                        >
                                            S.No
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-sm font-semibold text-white border-b border-indigo-700 bg-indigo-700"
                                        >
                                            Name of the Journal
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-sm font-semibold text-white border-b border-indigo-700 bg-indigo-600"
                                        >
                                            Indexing Details
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-sm font-semibold text-white border-b border-indigo-700 bg-indigo-800"
                                        >
                                            APC for Authors (Online Only)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {apcData.map((apc, index) => (
                                        <tr
                                            key={apc.apcId}
                                            className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-indigo-50 transition-colors`}
                                        >
                                            <td className="px-4 py-2 text-sm text-gray-800 border-b border-gray-300 font-medium">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-2 text-sm text-indigo-600 border-b border-gray-300 hover:underline">
                                                <Link
                                                    to={`/journal/${journalAbbrevation}`}
                                                    className="text-indigo-600 hover:underline"
                                                    aria-label={`Visit ${journal?.journalName || "journal"}`}
                                                >
                                                    {journal?.journalName || ""}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-2 text-sm text-gray-700 border-b border-gray-300 italic">
                                                {apc.indexing2 || "N/A"}
                                            </td>
                                            <td className="px-6 py-2 text-sm text-gray-800 border-b border-gray-300 font-semibold">
                                                {apc.apcPrice || "N/A"} USD
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Apc;