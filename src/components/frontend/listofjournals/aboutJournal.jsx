// import React from "react";
// import Navbar from "../navbar";
// import Footer from "../footer";
// import Sidebar from "../../common/frontendSidebar";
// import { useState , useEffect} from "react";
// import JournalContext from "../../common/journalContext";
// import { useParams } from "react-router-dom";
// import { useContext } from "react";


// const Aboutjournal = () => {

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
//                         <p className="text-xl text-gray-700 font-semibold mb-8">About the Journal</p>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>

//     )
// }

// export default Aboutjournal



import React from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import Sidebar from "../../common/frontendSidebar";
import { useState, useEffect } from "react";
import JournalContext from "../../common/journalContext";
import { useParams } from "react-router-dom";
import { useContext } from "react";

// Helper function to decode Unicode escape sequences
const decodeHtml = (html) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = html.replace(/\\u003C/g, "<").replace(/\\u003E/g, ">");
  return textarea.value;
};

const Aboutjournal = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { journalAbbrevation } = useParams();
  const { journals, loading: contextLoading, error: contextError } = useContext(JournalContext);

  const journal = Array.isArray(journals) ? journals.find((j) => j.abbrevation === journalAbbrevation) : null;

  const [loading, setLoading] = useState(contextLoading);
  const [error, setError] = useState(contextError);

  useEffect(() => {
    if (!contextLoading && !contextError && !journal) {
      setError(`Journal not found for abbreviation: ${journalAbbrevation}`);
    }
  }, [contextLoading, contextError, journal, journalAbbrevation]);

  // Decode the about content for rendering
  const decodedAbout = journal?.about ? decodeHtml(journal.about) : "";

  return (
    <>
      <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10"
          aria-hidden="true"
        ></div>
      )}
      <div className={`px-[80px] py-[30px] ${isSearchOpen ? "mt-[140px]" : "mt-[60px]"}`}>
        <div className="flex mt-8">
          <Sidebar journalAbbreviation={journalAbbrevation} dynamicProps={journal} />
          <div className="w-[75vw] ps-6 h-auto">
            <p className="text-3xl text-blue-800 font-bold mb-5">{journal?.journalName}</p>
            <p className="border-b border-gray-300 mb-8"></p>
            <p className="text-xl text-gray-700 font-semibold mb-8">About the Journal</p>
            <div
              className="text-gray-700 about-content"
              dangerouslySetInnerHTML={{ __html: decodedAbout }}
            />
          </div>
        </div>
      </div>
      <style>
        {`
          .about-content a {
            color: blue;
            text-decoration: underline;
          }
          .about-content a:hover {
            text-decoration: underline;
            color: darkblue;
          }
        `}
      </style>
      <Footer />
    </>
  );
};

export default Aboutjournal;