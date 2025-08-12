// import Navbar from "./navbar";
// import Footer from "./footer";
// import Sidebar from "../common/frontendSidebar";
// import React, { useState, useContext, useEffect } from 'react';
// import JournalContext from "../common/journalContext";
// import { useParams } from "react-router-dom";


// const Archive = () => {

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
//                         <p className="text-xl text-gray-700 font-semibold mb-8">Archives</p>

//                         <div class='my-6'>

//                             <p class='text-2xl font-bold text-gray-700'>2025 - Volume 18</p>
//                             <div class='flex space-x-8 my-4 '>

//                                 <p class='text-blue-600 hover:underline'>
//                                     Issue 1
//                                 </p>
//                                 <p class='text-blue-600 hover:underline'>
//                                     Issue 2
//                                 </p>
//                             </div>
//                             <div class='border-b text-gray-700 '></div>
//                         </div>
//                         <div class='my-6'>

//                             <p class='text-2xl font-bold text-gray-700'>2024 - Volume 14</p>
//                             <div class='flex space-x-8 my-4 '>

//                                 <p class='text-blue-600 hover:underline'>
//                                     Issue 1
//                                 </p>
//                                 <p class='text-blue-600 hover:underline'>
//                                     Issue 2
//                                 </p>
//                             </div>
//                             <div class='border-b text-gray-700 '></div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>

//     )
// }

// export default Archive










// import Navbar from "./navbar";
// import Footer from "./footer";
// import Sidebar from "../common/frontendSidebar";
// import React, { useState, useContext, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import JournalContext from "../common/journalContext";
// import axios from "axios";

// const Archive = () => {
//     const [isSearchOpen, setIsSearchOpen] = useState(false);
//     const { journalAbbrevation } = useParams();
//     const navigate = useNavigate();
//     const { journals, loading: contextLoading, error: contextError } = useContext(JournalContext);

//     const journal = Array.isArray(journals)
//         ? journals.find((j) => j.abbrevation === journalAbbrevation || j.journalKey === journalAbbrevation)
//         : null;

//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [issues, setIssues] = useState([]);
//     const [selectedIssueData, setSelectedIssueData] = useState(null);

//     useEffect(() => {
//         console.log("JournalContext State:", { journals, contextLoading, contextError, journalAbbrevation, journal });

//         const fetchIssues = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 if (!journal) {
//                     throw new Error(`Journal not found for abbreviation: ${journalAbbrevation}`);
//                 }
//                 const journalId = journal.journalId;

//                 const issuesResponse = await axios.get("https://iassrd.com:8081/api/v1/journal-issues", {
//                     headers: { "Content-Type": "application/json" },
//                 });

//                 const issuesData = issuesResponse.data.data || issuesResponse.data || [];
//                 if (!Array.isArray(issuesData)) {
//                     throw new Error("Unexpected response format: issuesData is not an array.");
//                 }

//                 const filteredIssues = issuesData.filter(
//                     (issue) => issue.journalsId.toString() === journalId.toString()
//                 );

//                 console.log("Fetched Issues in Archive:", filteredIssues);
//                 setIssues(filteredIssues);
//                 setLoading(false);
//             } catch (err) {
//                 console.error("Error fetching issues:", err);
//                 let errorMessage = "Failed to load issues.";
//                 if (err.response) {
//                     errorMessage = `Failed to load issues: Server responded with status ${err.response.status}.`;
//                 } else if (err.request) {
//                     errorMessage = "Failed to load issues: No response received from the server. Please check your network connection.";
//                 } else {
//                     errorMessage = `Failed to load issues: ${err.message}`;
//                 }
//                 setError(errorMessage);
//                 setLoading(false);
//             }
//         };

//         if (!contextLoading && !contextError && journal) {
//             fetchIssues();
//         } else if (!contextLoading && !journal) {
//             setError(`Journal not found for abbreviation: ${journalAbbrevation}`);
//             setLoading(false);
//         } else {
//             setLoading(contextLoading);
//             setError(contextError);
//         }
//     }, [contextLoading, contextError, journals, journalAbbrevation, journal]);

//     // Group issues by year and volume
//     const groupedByYear = Object.entries(
//         issues.reduce((acc, issue) => {
//             if (!acc[issue.year]) acc[issue.year] = {};
//             if (!acc[issue.year][issue.volumeNo]) acc[issue.year][issue.volumeNo] = [];
//             acc[issue.year][issue.volumeNo].push({
//                 issue: issue.issueNo,
//                 months: `${issue.fromMonth}-${issue.toMonth}`,
//             });
//             return acc;
//         }, {})
//     )
//         .sort((a, b) => b[0] - a[0]) // Sort years descending
//         .map(([year, volumes]) => ({
//             year,
//             volumes: Object.entries(volumes)
//                 .sort((a, b) => b[0] - a[0]) // Sort volumes descending
//                 .map(([volume, issueList]) => ({
//                     volumeNumber: volume,
//                     issues: issueList.sort((a, b) => a.issue.localeCompare(b.issue)), // Sort issues
//                 })),
//         }));

//     // Handle issue selection
//     const handleIssueSelect = (issueData) => {
//         console.log("Issue Selected:", issueData);
//         setSelectedIssueData(issueData);
//         navigate(`/journal/${journalAbbrevation}/volume_${issueData.volume}/issue_${issueData.issue}`);
//     };

//     return (
//         <>
//             <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />

//             <div
//                 className={`px-[80px] py-[30px] ${isSearchOpen ? "mt-[160px]" : "mt-[80px]"
//                     }`}
//             >
//                 <div className="flex mt-8">
//                     <Sidebar
//                         journalAbbreviation={journalAbbrevation}
//                         dynamicProps={journal}
//                     />

//                     <div className="w-[75vw] ps-6 h-auto">
//                         <p className="text-3xl text-blue-800 font-bold mb-5">
//                             {journal?.journalName || "Journal"}
//                         </p>
//                         <div className="border-b border-gray-300 mb-8"></div>
//                         <p className="text-xl text-gray-700 font-semibold mb-8">Archives</p>

//                         {loading ? (
//                             <p className="text-gray-600">Loading...</p>
//                         ) : error ? (
//                             <p className="text-red-600">{error}</p>
//                         ) : groupedByYear.length === 0 ? (
//                             <p className="text-gray-600">No issues found for this journal.</p>
//                         ) : (
//                             groupedByYear.map((yearData, yearIdx) => (
//                                 <div key={yearIdx} className="my-6">
//                                     {yearData.volumes.map((volumeData, volumeIdx) => (
//                                         <div key={`${yearIdx}-${volumeIdx}`} className="mb-4">
//                                             <p className="text-2xl font-bold text-gray-700">
//                                                 {yearData.year} - Volume {volumeData.volumeNumber}
//                                             </p>
//                                             <div className="flex space-x-8 my-4">
//                                                 {volumeData.issues.map((issue, idx) => (
//                                                     <button
//                                                         key={idx}
//                                                         className="text-blue-600 hover:underline"
//                                                         onClick={() =>
//                                                             handleIssueSelect({
//                                                                 year: yearData.year,
//                                                                 volume: volumeData.volumeNumber,
//                                                                 issue: issue.issue,
//                                                                 months: issue.months,
//                                                                 articles: [], // Add articles if available
//                                                             })
//                                                         }
//                                                     >
//                                                         Issue {issue.issue} {issue.months}
//                                                     </button>
//                                                 ))}
//                                             </div>
//                                             <div className="border-b border-gray-300"></div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default Archive;




import Navbar from "./navbar";
import Footer from "./footer";
import Sidebar from "../common/frontendSidebar";
import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import JournalContext from "../common/journalContext";
import axios from "axios";

const Archive = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { journalAbbrevation } = useParams();
  const navigate = useNavigate();
  const { journals, loading: contextLoading, error: contextError } = useContext(JournalContext);

  const journal = Array.isArray(journals)
    ? journals.find((j) => j.abbrevation === journalAbbrevation || j.journalKey === journalAbbrevation)
    : null;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    // console.log("JournalContext State:", { journals, contextLoading, contextError, journalAbbrevation, journal });

    const fetchIssues = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!journal) {
          throw new Error(`Journal not found for abbreviation: ${journalAbbrevation}`);
        }
        const journalId = journal.journalId;

        const issuesResponse = await axios.get("https://iassrd.com:8081/api/v1/journal-issues", {
          headers: { "Content-Type": "application/json" },
        });

        const issuesData = issuesResponse.data.data || issuesResponse.data || [];
        if (!Array.isArray(issuesData)) {
          throw new Error("Unexpected response format: issuesData is not an array.");
        }

        const filteredIssues = issuesData.filter(
          (issue) => issue.journalsId.toString() === journalId.toString()
        );

        // console.log("Fetched Issues in Archive:", filteredIssues);
        setIssues(filteredIssues);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching issues:", err);
        let errorMessage = "Failed to load issues.";
        if (err.response) {
          errorMessage = `Failed to load issues: Server responded with status ${err.response.status}.`;
        } else if (err.request) {
          errorMessage = "Failed to load issues: No response received from the server. Please check your network connection.";
        } else {
          errorMessage = `Failed to load issues: ${err.message}`;
        }
        setError(errorMessage);
        setLoading(false);
      }
    };

    if (!contextLoading && !contextError && journal) {
      fetchIssues();
    } else if (!contextLoading && !journal) {
      setError(`Journal not found for abbreviation: ${journalAbbrevation}`);
      setLoading(false);
    } else {
      setLoading(contextLoading);
      setError(contextError);
    }
  }, [contextLoading, contextError, journals, journalAbbrevation, journal]);

  // Group issues by year and volume
  const groupedByYear = Object.entries(
    issues.reduce((acc, issue) => {
      if (!acc[issue.year]) acc[issue.year] = {};
      if (!acc[issue.year][issue.volumeNo]) acc[issue.year][issue.volumeNo] = [];
      acc[issue.year][issue.volumeNo].push({
        issue: issue.issueNo,
        months: `${issue.fromMonth}-${issue.toMonth}`,
      });
      return acc;
    }, {})
  )
    .sort((a, b) => b[0] - a[0])
    .map(([year, volumes]) => ({
      year,
      volumes: Object.entries(volumes)
        .sort((a, b) => b[0] - a[0])
        .map(([volume, issueList]) => ({
          volumeNumber: volume,
          issues: issueList.sort((a, b) => a.issue.localeCompare(b.issue)),
        })),
    }));

  // Handle issue selection
  const handleIssueSelect = (year, volume, issue, months) => {
    // console.log("Issue Selected:", { year, volume, issue, months });
    navigate(`/journal/${journalAbbrevation}/volume_${volume}/issue_${issue}`);
  };

  return (
    <>
      <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
      <div
        className={`px-[80px] py-[30px] ${isSearchOpen ? "mt-[140px]" : "mt-[50px]"}`}
      >
        <div className="flex mt-8">
          <Sidebar
            journalAbbrevation={journalAbbrevation}
            dynamicProps={journal}
          />
          <div className="w-[75vw] ps-6 h-auto">
            <p className="text-3xl text-blue-800 font-bold mb-5">
              {journal?.journalName || "Journal"}
            </p>
            <div className="border-b border-gray-300 mb-8"></div>
            <p className="text-xl text-gray-700 font-semibold mb-8">Archives</p>
            {loading ? (
              <p className="text-gray-600">Loading...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : groupedByYear.length === 0 ? (
              <p className="text-gray-600">No issues found for this journal.</p>
            ) : (
              groupedByYear.map((yearData, yearIdx) => (
                <div key={yearIdx} className="my-6">
                  {yearData.volumes.map((volumeData, volumeIdx) => (
                    <div key={`${yearIdx}-${volumeIdx}`} className="mb-4">
                      <p className="text-2xl font-bold text-gray-700">
                        {yearData.year} - Volume {volumeData.volumeNumber}
                      </p>
                      <div className="flex space-x-8 my-4">
                        {volumeData.issues.map((issue, idx) => (
                          <button
                            key={idx}
                            className="text-blue-600 hover:underline"
                            onClick={() =>
                              handleIssueSelect(
                                yearData.year,
                                volumeData.volumeNumber,
                                issue.issue,
                                issue.months
                              )
                            }
                          >
                            Issue {issue.issue} {issue.months}
                          </button>
                        ))}
                      </div>
                      <div className="border-b border-gray-300"></div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Archive;