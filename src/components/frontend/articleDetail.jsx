




// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Helmet, HelmetProvider } from 'react-helmet-async';
// import Navbar from './navbar';
// import cover1 from '../../assets/cover1.jpg';
// import Sidebar from '../common/frontendSidebar';
// import Footer from './footer';
// import { AiFillEdit } from "react-icons/ai";
// import { FaUserEdit } from "react-icons/fa";
// import { IoMdArrowDropdown } from "react-icons/io";

// import { useParams, Link } from 'react-router-dom';

// // const BASE_URL = 'https://iassrd.com:8081/api/v1';
// const BASE_URL = 'https://iassrd.com:8081/api/v1';


// function Articledetail() {

//     const { volume, issue, articleKey } = useParams(); // Extract URL params
//     const cleanedVolume = volume.replace('volume_', '');
//     const cleanedIssue = issue.replace('issue_', '');

//     const [journalName, setJournalName] = useState(''); // State for journal name
//     const [journalAbbrevation, setJournalAbbrevation] = useState(''); // State for journal abbreviation
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isSearchOpen, setIsSearchOpen] = useState(false);
//     const [isDropdownopen, setIsDropdownopen] = useState(false);

//     const [article, setArticle] = useState(null)

//     // Toggle dropdown state
//     const handleDropdown = () => {
//         setIsDropdownopen((prev) => !prev);
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true);

//                 // Fetch articles
//                 const articlesResponse = await axios.get(`${BASE_URL}/articles`);
//                 if (!articlesResponse.data.success || !Array.isArray(articlesResponse.data.data)) {
//                     throw new Error('Invalid articles response format');
//                 }

//                 const matchedArticle = articlesResponse.data.data.find(
//                     (a) => String(a.articleKey) === articleKey &&
//                         String(a.volume) === cleanedVolume &&
//                         String(a.issue) === cleanedIssue
//                 );
//                 setArticle(matchedArticle)
//                 console.log(article)

//                 if (!matchedArticle) {
//                     throw new Error(`Article not found for articleKey: ${articleKey}, volume: ${cleanedVolume}, issue: ${cleanedIssue}`);
//                 }

//                 // Fetch journals
//                 const journalsResponse = await axios.get(`${BASE_URL}/journals`);
//                 if (!journalsResponse.data.success || !Array.isArray(journalsResponse.data.data)) {
//                     throw new Error('Invalid journals response format');
//                 }

//                 console.log(journalsResponse)

//                 const matchedJournal = journalsResponse.data.data.find(
//                     (journal) => journal.journalId === matchedArticle.journalId
//                 );
//                 console.log(matchedJournal)

//                 if (matchedJournal) {
//                     setJournalName(matchedJournal.journalName);
//                     setJournalAbbrevation(matchedJournal.abbrevation);
//                 } else {
//                     throw new Error(`No journal found for journalId: ${matchedArticle.journalId}`);
//                 }

//                 // Fetch authors
//                 const authorsResponse = await axios.get(`${BASE_URL}/authors`);
//                 console.log("Authors API response:", authorsResponse.data);

//                 if (!authorsResponse.data.success || !Array.isArray(authorsResponse.data.data)) {
//                     throw new Error("Failed to fetch authors or invalid response");
//                 }

//                 const authorsData = authorsResponse.data.data;

//                 // Map authorIds to author details
//                 const authorIds = matchedArticle.authorIds
//                     ? matchedArticle.authorIds.split(",").map((id) => id.trim())
//                     : [];
//                 console.log("Author IDs:", authorIds);

//                 const articleAuthors = authorIds
//                     .map((id) => authorsData.find((author) => author.authorId === parseInt(id)))
//                     .filter((author) => author)
//                     .map((author) => ({
//                         authorId: author.authorId,
//                         name: author.fullName,
//                         institution: `${author.university}${author.country ? `, ${author.country}` : ""}`,
//                     }));
//                 console.log("Article authors:", articleAuthors);

//                 // Clean and sanitize abstract
//                 const cleanHtml = (html) => {
//                     if (!html || typeof html !== "string") {
//                         return "<p>Abstract not available.</p>";
//                     }

//                     let normalizedHtml = html.replace(/\s+/g, " ").trim();

//                     // Handle line breaks: convert single \n to <br> if not part of a paragraph structure
//                     if (normalizedHtml.includes("\n") && !normalizedHtml.includes("<p>")) {
//                         normalizedHtml = normalizedHtml.replace(/\n/g, "<br>");
//                     }

//                     // Split into paragraphs based on double newlines or <p> tags
//                     const paragraphs = normalizedHtml.split(/<\/?p\s*>/i).filter((p) => p.trim());
//                     const processedContent = paragraphs
//                         .map((paragraph) => {
//                             const lines = paragraph.split("\n").filter((line) => line.trim());
//                             return lines.length > 0 ? `<p class="mb-4">${lines.join("<br>")}</p>` : "";
//                         })
//                         .join("");

//                     return sanitizeHtml(processedContent, {
//                         allowedTags: ["p", "br"],
//                         allowedAttributes: {},
//                     });
//                 };

//             } catch (err) {
//                 setError(`Error fetching data: ${err.message}`);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [articleKey, cleanedVolume, cleanedIssue]);

//     if (loading) {
//         return <div className="text-center py-10">Loading...</div>;
//     }

//     if (error) {
//         return <div className="text-center py-10 text-red-600">Error: {error}</div>;
//     }


//     return (
//         <HelmetProvider>
//             <Helmet>
//                 <title>Articles - ISCSITR</title>
//                 <meta name="description" content="Browse our collection of journals and disciplines" />
//             </Helmet>
//             <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
//             <div className={`px-[80px] py-[30px] ${isSearchOpen ? "mt-[160px]" : "mt-[80px]"}`}>
//                 <div className="flex mt-8">
//                     {/* <div className="w-[25vw] mr-4">
//                         <div className="w-full">
//                             <img className="w-[45%] h-[220px] object-cover" src={cover1} alt="Journal cover" />
//                         </div>
//                         <div className="w-full mt-8 flex flex-col space-y-2">
//                             <div className="h-[95px] flex flex-col bg-gray-100 justify-center px-4">
//                                 <p className="text-gray-600 text-md">Frequency: Continuous</p>
//                                 <p className="text-gray-600 text-md">ISSN: 1557-4989 (Print)</p>
//                                 <p className="text-gray-600 text-md">ISSN: 1557-4989 (Online)</p>
//                             </div>
//                             <ul className="space-y-2">
//                                 <li className="h-[46px] flex bg-green-500 hover:bg-green-600 justify-between items-center px-4 cursor-pointer">
//                                     <p className="text-white text-lg font-semibold ">Submit Your Article</p>
//                                     <p className="text-white text-lg"><AiFillEdit title="Submission" /></p>
//                                 </li>
//                                 <li className="h-[46px] flex bg-blue-700 hover:bg-blue-800 justify-between items-center px-4 cursor-pointer">
//                                     <p className="text-white text-lg font-semibold">Join As Editor</p>
//                                     <p className="text-white text-lg font-semibold"><FaUserEdit title="Editor" /></p>
//                                 </li>
//                                 <li className="h-[46px] flex bg-blue-700 hover:bg-blue-800 justify-between items-center px-4 cursor-pointer">
//                                     <p className="text-white text-lg font-semibold">Current</p>
//                                 </li>
//                                 <li className="h-[46px] flex bg-blue-700 hover:bg-blue-800 justify-between items-center px-4 cursor-pointer">
//                                     <p className="text-white text-lg font-semibold">Archive</p>
//                                 </li>
//                                 <li className="flex flex-col bg-blue-700 hover:bg-blue-800 cursor-pointer">
//                                     <div
//                                         className="h-[46px] flex justify-between items-center px-4"
//                                         onClick={handleDropdown}
//                                     >
//                                         <p className="text-white text-lg font-semibold">About</p>
//                                         <p className="text-white text-lg font-semibold">
//                                             <IoMdArrowDropdown
//                                                 size={25}
//                                                 className={`transition-transform duration-600 ${isDropdownopen ? 'rotate-180' : ''}`}
//                                             />
//                                         </p>
//                                     </div>
//                                     <ul
//                                         className={`overflow-hidden transition-all duration-300 ${isDropdownopen ? 'h-auto' : 'max-h-0'
//                                             }`}
//                                     >
//                                         <li className="h-[46px] flex bg-blue-700 hover:bg-blue-800 items-center px-4 border-t border-gray-500">
//                                             <p className="text-white text-sm font-medium ">About The Journal</p>
//                                         </li>
//                                         <li className="h-[46px] flex bg-blue-700 hover:bg-blue-800 items-center px-4 border-t border-gray-500">
//                                             <p className="text-white text-sm font-medium">APC</p>
//                                         </li>
//                                         <li className="h-[46px] flex bg-blue-700 hover:bg-blue-800 items-center px-4 border-t border-gray-500">
//                                             <p className="text-white text-sm font-medium">Author Guidelines</p>
//                                         </li>
//                                         <li className="h-[46px] flex bg-blue-700 hover:bg-blue-800 items-center px-4 border-t border-gray-500">
//                                             <p className="text-white text-sm font-medium">Editorial Board</p>
//                                         </li>
//                                     </ul>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div> */}
//                     {/* above code is also a side bar only but i did like separate component  */}


//                     <Sidebar journalAbbreviation={journalAbbrevation} />
//                     <div className="w-[75vw] ps-6  h-auto">
//                         <div class=''>
//                             <p className="text-3xl text-gray-800 font-bold mb-8">Article Detail</p>

//                             <div class='flex space-x-8 items-center '>
//                                 <p class='text-gray-700 font-medium text-md'>{article.articleType}</p>
//                                 <p class='text-red-500 font-medium text-lg cursor-pointer '>OPEN ACCESS</p>
//                             </div>
//                             <h1 id="paper-topic" className="text-2xl font-bold text-gray-900 my-2">
//                                 {/* {article.title} */}
//                                 {article.articleTitle}
//                             </h1>
//                             {/* <section id="authors" className="flex flex-col md:flex-row gap-4 mb-6">
//                                 {article.authors.map((author, index) => (
//                                     <div key={index} className="flex items-center gap-2">
//                                         <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
//                                             <span className="text-md text-teal-700 font-semibold">
//                                                 {author.name.charAt(0).toUpperCase()}
//                                             </span>
//                                         </div>
//                                         <div>
//                                             <p
//                                                 className={`font-semibold ${article.correspondingAuthor &&
//                                                     parseInt(article.correspondingAuthor) === author.authorId
//                                                     ? "text-red-600"
//                                                     : ""
//                                                     }`}
//                                             >
//                                                 {author.name}
//                                                 {article.correspondingAuthor &&
//                                                     parseInt(article.correspondingAuthor) === author.authorId
//                                                     ? " *"
//                                                     : ""}
//                                             </p>
//                                             <p className="text-sm text-gray-600">{author.institution}</p>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </section> */}

//                             {/* above code is dynamic code and this is static code for authors delay of apis using static */}
//                             <section id="authors" className="flex flex-col md:flex-row gap-6 my-6 ">
//                                 <div className="flex items-center gap-2">
//                                     <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
//                                         <span className="text-md text-teal-700 font-semibold">J</span>
//                                     </div>
//                                     <div>
//                                         <p className="font-semibold text-red-600">
//                                             John Doe *
//                                         </p>
//                                         <p className="text-sm text-gray-600">University of Example</p>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
//                                         <span className="text-md text-teal-700 font-semibold">J</span>
//                                     </div>
//                                     <div>
//                                         <p className="font-semibold">
//                                             Jane Smith
//                                         </p>
//                                         <p className="text-sm text-gray-600">Example Institute</p>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
//                                         <span className="text-md text-teal-700 font-semibold">A</span>
//                                     </div>
//                                     <div>
//                                         <p className="font-semibold">
//                                             Alice Johnson
//                                         </p>
//                                         <p className="text-sm text-gray-600">Research Center</p>
//                                     </div>
//                                 </div>
//                             </section>
//                             <p class='border-t border-gray-300'></p>


//                             <div class='my-5 w-full  flex '>
//                                 <section class=' w-[75%]'>
//                                     <p className="text-2xl text-gray-800 font-semibold mb-2 ">Abstract</p>


//                                     {/* <div
//                                     className="text-gray-700 text-justify leading-relaxed"
//                                     dangerouslySetInnerHTML={{ __html: article.abstract }}
//                                 /> */}

//                                     {/* the above code isdynamic code for to show abstarxct and this below code is static code for design  */}
//                                     <div
//                                         className="text-gray-700 font-medium text-justify leading-relaxed" >
//                                         Generative Artificial Intelligence (GAI) has evolved from a theoretical concept into a powerful creative partner in artistic, musical, and literary domains. With the rise of transformer-based architectures, diffusion models, and multimodal AI, machines can now compose symphonies, paint abstract works, and craft poetic narratives that mimic human expression. This paper provides a comprehensive review of state-of-the-art generative AI techniques up to and including early period, analyzing advancements, limitations, and interdisciplinary contributions. It also discusses key trends across literature, tools, and datasets and evaluates how these models perform when collaborating with human creators. The future scope of human-AI co-creation is also outlined.
//                                     </div>
//                                     {/* <section
//                                         id="article-info"
//                                         className="mt-8 border-l-4 border-blue-600 bg-gray-100 p-5 font-IBM leading-loose"
//                                     >
//                                         <h2 className="text-xl font-semibold mb-2">Article information</h2>
//                                         <span class='flex space-x-4>
//                                             <strong className="text-black">Journal Name:</strong>{" "}
//                                             <Link
//                                                 to={`/journals/${journalName}`}
//                                                 className="italic font-semibold text-blue-800 hover:underline"
//                                             >
//                                                 {article.journal || "Loading journal..."}
//                                             </Link>
//                                             <p>
//                                                 <strong>Volume (Issue):</strong> {article.volume} ({article.issue})
//                                             </p>
//                                         </span>
//                                         {article.doi !== "Not available" && article.doi !== "" && (
//                                             <p id="doi">
//                                                 <strong>DOI:</strong>{" "}
//                                                 <a
//                                                     href={article.doi}
//                                                     className="text-blue-600 hover:underline"
//                                                     target="_blank"
//                                                     rel="noopener noreferrer"
//                                                 >
//                                                     {article.doi}
//                                                 </a>
//                                             </p>
//                                         )}
//                                         <p>
//                                             <strong>Pages:</strong> {article.pages}
//                                         </p>
//                                         <p className="flex flex-wrap gap-x-6 gap-y-1">
//                                             {article?.received && !isNaN(new Date(article.received)) && (
//                                                 <span>
//                                                     <strong>RECEIVED:</strong>{" "}
//                                                     {new Date(article.received).toLocaleDateString("en-GB", {
//                                                         day: "2-digit",
//                                                         month: "long",
//                                                         year: "numeric",
//                                                     })}
//                                                 </span>
//                                             )}
//                                             {article?.acceptance && !isNaN(new Date(article.acceptance)) && (
//                                                 <span>
//                                                     <strong>ACCEPTED:</strong>{" "}
//                                                     {new Date(article.acceptance).toLocaleDateString("en-GB", {
//                                                         day: "2-digit",
//                                                         month: "long",
//                                                         year: "numeric",
//                                                     })}
//                                                 </span>
//                                             )}
//                                             {article?.published && !isNaN(new Date(article.published)) && (
//                                                 <span>
//                                                     <strong>PUBLISHED:</strong>{" "}
//                                                     {new Date(article.published).toLocaleDateString("en-GB", {
//                                                         day: "2-digit",
//                                                         month: "long",
//                                                         year: "numeric",
//                                                     })}
//                                                 </span>
//                                             )}
//                                         </p>
//                                         <p id="how-to-cite">
//                                             <strong>How to Cite:</strong> {article.howToCite}
//                                         </p>
//                                         <p id="copyright">
//                                             <strong>Copyright:</strong> © {new Date(article.published).getFullYear()} the Author(s).
//                                             This article is an open access article distributed under the terms and conditions of the
//                                             Creative Commons Attribution (CC-BY) 4.0 license (
//                                             <a
//                                                 href="https://creativecommons.org/licenses/by/4.0/"
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                                 className="text-blue-600 hover:underline"
//                                             >
//                                                 https://creativecommons.org/licenses/by/4.0/
//                                             </a>
//                                             ). Published by International Academy for Social Sciences Research and Development (IA)
//                                         </p>
//                                     </section> */}

//                                     {/* the above code is dynamic after api have to check and modify  below code is static  */}


//                                     <section
//                                         id="article-info"
//                                         className="mt-8 border-t-4 border-blue-600 bg-blue-50 p-5 font-IBM leading-loose"
//                                     >
//                                         <h2 className="text-xl font-semibold mb-2 text-gray-800">Article information</h2>
//                                         <span class='flex space-x-4'>
//                                             <strong className="text-black">Journal Name:</strong>{" "}
//                                             <span className="italic font-semibold text-blue-800 hover:underline">
//                                                 Journal of Advanced Research
//                                             </span>
//                                             <p>
//                                                 <strong>Volume (Issue):</strong> 15 (2)
//                                             </p>
//                                         </span>
//                                         <p id="doi">
//                                             <strong>DOI:</strong>{" "}
//                                             <a
//                                                 href="https://doi.org/10.1000/xyz123"
//                                                 className="text-blue-600 hover:underline"
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                             >
//                                                 https://doi.org/10.1000/xyz123
//                                             </a>
//                                         </p>
//                                         <p>
//                                             <strong>Pages:</strong> 120-135
//                                         </p>
//                                         <p className="flex flex-wrap gap-x-6 gap-y-1">
//                                             <span>
//                                                 <strong>Received:</strong> 15 March 2024
//                                             </span>
//                                             <span>
//                                                 <strong>Accepted:</strong> 20 May 2024
//                                             </span>
//                                             <span>
//                                                 <strong>Published:</strong> 25 June 2024
//                                             </span>
//                                         </p>
//                                         <p id="how-to-cite">
//                                             <strong>How to Cite:</strong> Smith J, Doe K. Advanced Research Techniques. J Adv Res. 2024;15(2):120-135.
//                                         </p>
//                                         <p id="copyright">
//                                             <strong>Copyright:</strong> © 2024 the Author(s). This article is an open access article distributed under the
//                                             terms and conditions of the Creative Commons Attribution (CC-BY) 4.0 license (
//                                             <a
//                                                 href="https://creativecommons.org/licenses/by/4.0/"
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                                 className="text-blue-600 hover:underline"
//                                             >
//                                                 https://creativecommons.org/licenses/by/4.0/
//                                             </a>
//                                             ). Published by International Academy for Social Sciences Research and Development (IASSRD)
//                                         </p>
//                                     </section>

//                                     {/* References */}
//                                     {/* <section id="reference" className="mt-6">
//                                         <h2 className="text-xl font-semibold mb-2">References</h2>
//                                         <ol className="text-gray-700 text-justify leading-relaxed">
//                                             {parseReferences(article.reference).map((ref, index) => {
//                                                 const decodeHtml = (html) => {
//                                                     const doc = new DOMParser().parseFromString(html, "text/html");
//                                                     return doc.documentElement.textContent;
//                                                 };
//                                                 let cleanRef = decodeHtml(ref);
//                                                 cleanRef = cleanRef.replace(/<[^>]+>/g, "");
//                                                 return (
//                                                     <li key={index} className="mb-2 whitespace-pre-wrap">
//                                                         {cleanRef}
//                                                     </li>
//                                                 );
//                                             })}
//                                         </ol>
//                                     </section> */}

//                                     {/*  the above cod eis dynamic for refernces and belo ione is statc  */}
//                                     <section id="reference" className="mt-6">
//                                         <h2 className="text-xl font-semibold mb-2">References</h2>
//                                         <ol className="text-gray-700 text-justify leading-relaxed">
//                                             <li className="mb-2 whitespace-pre-wrap">
//                                                 [1]    Smith, J. (2023). Advances in Computational Biology. Journal of Science, 45(3), 123-135.
//                                             </li>
//                                             <li className="mb-2 whitespace-pre-wrap">
//                                                 [2]    Doe, K., & Lee, M. (2022). Machine Learning Techniques. Technology Review, 28(4), 89-102.
//                                             </li>
//                                             <li className="mb-2 whitespace-pre-wrap">
//                                                 [3]    Brown, A. (2021). Environmental Impact Studies. Nature Studies, 15(2), 56-70.
//                                             </li>
//                                             <li className="mb-2 whitespace-pre-wrap">
//                                                 [4]    Taylor, R. (2020). Data Analysis Methods. Statistical Journal, 33(1), 200-215.
//                                             </li>
//                                             <li className="mb-2 whitespace-pre-wrap">
//                                                 [5]    Johnson, P. (2019). Renewable Energy Sources. Energy Research, 10(5), 300-320.
//                                             </li>
//                                             <li className="mb-2 whitespace-pre-wrap">
//                                                 [6]    Davis, L. (2024). Artificial Intelligence Applications. AI Monthly, 5(6), 150-165.
//                                             </li>
//                                             <li className="mb-2 whitespace-pre-wrap">
//                                                 [7]    Wilson, T. (2023). Biochemical Processes. Biology Today, 40(3), 80-95.
//                                             </li>
//                                         </ol>
//                                     </section>

//                                 </section>
//                                 <section class='w-[25%] ps-8 h-full'>

//                                     <div class='flex flex-wrap    justify-around gap-5 h-full '>

//                                         <div class='flex flex-col  items-center justify-center'>
//                                             <p class='text-4xl text-sky-500 font-semibold'>2,013</p>
//                                             <p class='text-gray-900 font-medium text-sm'>Views</p>
//                                         </div>
//                                         <div class='flex flex-col  items-center justify-center'>
//                                             <p class='text-3xl text-indigo-500 font-semibold'>1,458</p>
//                                             <p class='text-gray-900 font-medium text-sm'>Downloads</p>
//                                         </div>
//                                         <div class='flex flex-col  items-center justify-center'>
//                                             <p class='text-2xl text-red-500 font-semibold'>12</p>
//                                             <p class='text-gray-900 font-medium text-sm'>Citations</p>
//                                         </div>
//                                     </div>
//                                     <p class='border-t border-gray-300 my-5'></p>

//                                     <div class=' '>
//                                         <p className="text-xl text-gray-800 font-semibold my-2 ">Download</p>


//                                         <button className="w-full h-[40px] flex bg-green-500 hover:bg-green-600 justify-center items-center px-4 cursor-pointer">
//                                             <p className="text-white text-md font-semibold">PDF</p>
//                                             {/* <p className="text-white text-lg font-semibold"><FaUserEdit title="Editor" /></p> */}
//                                         </button>


//                                     </div>
//                                     <p class='border-t border-gray-300 my-5'></p>


//                                     <div className="">
//                                         <p className="text-xl text-gray-800 font-semibold my-2">Keywords</p>
//                                         <div className="flex flex-wrap gap-4">
//                                             <div className="py-1 px-2 rounded text-gray-600 font-medium bg-gray-100 hover:bg-gray-200 text-sm w-fit break-words">Critical Amino Acid</div>
//                                             <div className="py-1 px-2 rounded text-gray-600 font-medium bg-gray-100 hover:bg-gray-200 text-sm w-fit break-words">Nutrition Balancing</div>
//                                             <div className="py-1 px-2 rounded text-gray-600 font-medium bg-gray-100 hover:bg-gray-200 text-sm w-fit break-words">Maize Grade</div>
//                                             <div className="py-1 px-2 rounded text-gray-600 font-medium bg-gray-100 hover:bg-gray-200 text-sm w-fit break-words">Profit Margin</div>
//                                         </div>
//                                     </div>

//                                 </section>
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </HelmetProvider>
//     );
// }

// export default Articledetail;










import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import Navbar from './navbar';
import Sidebar from '../common/frontendSidebar';
import Footer from './footer';
import sanitizeHtml from 'sanitize-html';
import { FaFacebook, FaLinkedin, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

function Articledetail() {
    const { volume, issue, articleKey } = useParams();
    const cleanedVolume = volume.replace('volume_', '');
    const cleanedIssue = issue.replace('issue_', '');

    const [journalName, setJournalName] = useState('');
    const [journalAbbrevation, setJournalAbbrevation] = useState('');
    const [article, setArticle] = useState(null);
    const [authors, setAuthors] = useState([]);
    const [viewCount, setViewCount] = useState(null);
    const [downloadCount, setDownloadCount] = useState(null);
    const [shareCount, setShareCount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // for sidebar
    const [journalProps, setJournalProps] = useState('')

    const BASE_URL = 'https://iassrd.com:8081/api/v1';
    const SITE_URL = 'https://iassrd.com';

    // Increment view count
    const incrementViewCount = async (articleId, currentViews) => {
        try {
            const nextViewCount = (currentViews || 0) + 1;
            setViewCount(nextViewCount);
            await axios.patch(
                `${BASE_URL}/articles/${articleId}/update-views`,
                null,
                {
                    params: { views: nextViewCount },
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        } catch (err) {
            console.error('Error incrementing view count:', err);
        }
    };

    // Increment download count
    const handleDownload = async () => {
        if (!article || !article.articleFile) {
            alert('Unable to download: Article or file is missing.');
            return;
        }
        const fileUrl = `${SITE_URL}${article.articleFile}`;
        try {
            window.open(fileUrl, '_blank');
            const nextDownloadCount = (downloadCount || 0) + 1;
            setDownloadCount(nextDownloadCount);
            await axios.patch(
                `${BASE_URL}/articles/${article.articleId}/update-downloads`,
                null,
                {
                    params: { downloads: nextDownloadCount },
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        } catch (error) {
            console.error('Error during download:', error);
            alert('An error occurred while updating the download count.');
        }
    };

    // Increment share count
    const incrementShareCount = async (articleId, currentShareCount) => {
        try {
            const nextShareCount = (currentShareCount || 0) + 1;
            setShareCount(nextShareCount);
            await axios.patch(
                `${BASE_URL}/articles/${articleId}/update-share-count`,
                null,
                {
                    params: { shareCount: nextShareCount },
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        } catch (error) {
            console.error('Error updating share count:', error);
        }
    };

    // Handle social sharing
    const handleSocialShare = (platform) => {
        incrementShareCount(article.articleId, shareCount);
        console.log(`Sharing on ${platform}`);
    };

    // Parse references
    const parseReferences = (referenceText) => {
        const cleanedText = referenceText?.replace(/<\/?p>/g, '').trim() || '';
        return cleanedText.split('\n').filter((ref) => ref.trim() !== '');
    };

    // Clean and sanitize HTML
    const cleanHtml = (html) => {
        if (!html || typeof html !== 'string') {
            return '<p>Abstract not available.</p>';
        }
        let normalizedHtml = html.replace(/\s+/g, ' ').trim();
        if (normalizedHtml.includes('\n') && !normalizedHtml.includes('<p>')) {
            normalizedHtml = normalizedHtml.replace(/\n/g, '<br>');
        }
        const paragraphs = normalizedHtml.split(/<\/?p\s*>/i).filter((p) => p.trim());
        const processedContent = paragraphs
            .map((paragraph) => {
                const lines = paragraph.split('\n').filter((line) => line.trim());
                return lines.length > 0 ? `<p class="mb-4">${lines.join('<br>')}</p>` : '';
            })
            .join('');
        return sanitizeHtml(processedContent, {
            allowedTags: ['p', 'br'],
            allowedAttributes: {},
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch articles
                const articlesResponse = await axios.get(`${BASE_URL}/articles`);
                if (!articlesResponse.data.success || !Array.isArray(articlesResponse.data.data)) {
                    throw new Error('Invalid articles response format');
                }

                const matchedArticle = articlesResponse.data.data.find(
                    (a) =>
                        String(a.articleKey) === articleKey &&
                        String(a.volume) === cleanedVolume &&
                        String(a.issue) === cleanedIssue
                );

                if (!matchedArticle) {
                    throw new Error(
                        `Article not found for articleKey: ${articleKey}, volume: ${cleanedVolume}, issue: ${cleanedIssue}`
                    );
                }

                // Fetch journals
                const journalsResponse = await axios.get(`${BASE_URL}/journals`);
                if (!journalsResponse.data.success || !Array.isArray(journalsResponse.data.data)) {
                    throw new Error('Invalid journals response format');
                }

                const matchedJournal = journalsResponse.data.data.find(
                    (journal) => journal.journalId === matchedArticle.journalId
                );

                if (matchedJournal) {
                    setJournalName(matchedJournal.journalName);
                    setJournalAbbrevation(matchedJournal.abbrevation);
                    setJournalProps(matchedJournal);
                    console.log('Updated journalProps:', matchedJournal);
                } else {
                    throw new Error(`No journal found for journalId: ${matchedArticle.journalId}`);
                }
                console.log(journalProps)

                // Fetch authors
                const authorsResponse = await axios.get(`${BASE_URL}/authors`);
                if (!authorsResponse.data.success || !Array.isArray(authorsResponse.data.data)) {
                    throw new Error('Failed to fetch authors or invalid response');
                }

                const authorsData = authorsResponse.data.data;
                const authorIds = matchedArticle.authorIds
                    ? matchedArticle.authorIds.split(',').map((id) => id.trim())
                    : [];
                const articleAuthors = authorIds
                    .map((id) => authorsData.find((author) => author.authorId === parseInt(id)))
                    .filter((author) => author)
                    .map((author) => ({
                        authorId: author.authorId,
                        name: author.fullName,
                        institution: `${author.university}${author.country ? `, ${author.country}` : ''}`,
                    }));

                // Format article data
                const formattedArticle = {
                    articleId: matchedArticle.articleId,
                    articleFile: matchedArticle.articleFile || '',
                    title: matchedArticle.articleTitle || 'Untitled Article',
                    authors: articleAuthors,
                    abstract: cleanHtml(matchedArticle.abstractText),
                    reference: matchedArticle.reference || '',
                    journal: matchedJournal ? matchedJournal.journalName : 'Unknown Journal',
                    volume: matchedArticle.volume || 'N/A',
                    issue: matchedArticle.issue || 'N/A',
                    doi: matchedArticle.doi || 'Not available',
                    pages:
                        matchedArticle.pageFrom && matchedArticle.pageTo
                            ? `${matchedArticle.pageFrom}-${matchedArticle.pageTo}`
                            : 'Not specified',
                    published: matchedArticle.dateOfPublication || 'Not specified',
                    acceptance: matchedArticle.dateOfAcceptance || 'Not specified',
                    received: matchedArticle.dateOfReceived || 'Not specified',
                    copyright: matchedArticle.copyright || 'Not specified',
                    openAccess: matchedArticle.copyright ? matchedArticle.copyright : 'Not specified',
                    howToCite: `${articleAuthors
                        .map((a) => a.name)
                        .join(', ')}. (${new Date(matchedArticle.dateOfPublication).getFullYear()}). ${matchedArticle.articleTitle
                        }. ${matchedJournal ? matchedJournal.journalName : 'Unknown Journal'}, ${matchedArticle.volume
                        }(${matchedArticle.issue}), ${matchedArticle.pageFrom}-${matchedArticle.pageTo}. ${matchedArticle.doi || ''
                        }`,
                    views: matchedArticle.views || 0,
                    downloads: matchedArticle.downloads || 0,
                    shareCount: matchedArticle.shareCount || 0,
                    totalCitations: matchedArticle.citation || 0,
                    keywords: matchedArticle.keywords
                        ? matchedArticle.keywords.split(',').map((kw) => kw.trim())
                        : [],
                    correspondingAuthor: matchedArticle.correspondingAuthor,
                    articleType: matchedArticle.articleType || 'Research Article',
                };

                setArticle(formattedArticle);
                setAuthors(articleAuthors);
                setViewCount(matchedArticle.views || 0);
                setDownloadCount(matchedArticle.downloads || 0);
                setShareCount(matchedArticle.shareCount || 0);
                incrementViewCount(matchedArticle.articleId, matchedArticle.views || 0);

                setLoading(false);
            } catch (err) {
                setError(`Error fetching data: ${err.message}`);
                setLoading(false);
            }
        };

        fetchData();
    }, [articleKey, cleanedVolume, cleanedIssue]);

    // if (loading) {
    //     return <div className="text-center py-10">Loading...</div>;
    // }

    // if (error) {
    //     return <div className="text-center py-10 text-red-600">Error: {error}</div>;
    // }

    // // if (!article) {
    // //     return <div className="text-center py-10">Article not found. Please check the URL parameters.</div>;
    // // }
    // if (!article || !journalAbbrevation || !journalProps) {
    //     return <div className="text-center py-10">Article or journal data not found. Please check the URL parameters.</div>;
    // }

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }
    if (error) {
        return <div className="text-center py-10 text-red-600">Error: {error}</div>;
    }
    if (!article || !journalAbbrevation || !journalProps) {
        return <div className="text-center py-10">Article or journal data not found. Please check the URL parameters.</div>;
    }



    const canonicalUrl = `${SITE_URL}/articles/${journalAbbrevation}/volume_${article.volume}_issue_${article.issue}/${article.articleKey}`;
    const encodedUrl = encodeURIComponent(canonicalUrl);
    const metaDescription =
        article.abstract.replace(/<[^>]+>/g, '').length > 160
            ? `${article.abstract.replace(/<[^>]+>/g, '').substring(0, 157)}...`
            : article.abstract.replace(/<[^>]+>/g, '');

    return (
        <HelmetProvider>
            <Helmet>
                <title>{`${article.title} | ${article.journal}`}</title>
                <meta name="description" content={metaDescription} />
                <meta name="keywords" content={article.keywords.join(', ')} />
                <meta name="generator" content="IASSRD Publishing System" />
                <meta name="gs_meta_revision" content="1.1" />
                <meta name="citation_journal_title" content={article.journal} />
                <meta name="citation_journal_abbrev" content={journalAbbrevation} />
                {article.authors.map((author, index) => (
                    <meta key={`citation_author_${index}`} name="citation_author" content={author.name} />
                ))}
                {article.authors.map((author, index) => (
                    <meta
                        key={`citation_author_institution_${index}`}
                        name="citation_author_institution"
                        content={author.institution}
                    />
                ))}
                <meta name="citation_title" content={article.title} />
                <meta name="citation_language" content="en" />
                {article.published !== 'Not specified' && (
                    <meta
                        name="citation_date"
                        content={new Date(article.published).toLocaleDateString('en-CA')}
                    />
                )}
                <meta name="citation_volume" content={article.volume} />
                <meta name="citation_issue" content={article.issue} />
                <meta name="citation_firstpage" content={article.pages.split('-')[0] || ''} />
                <meta name="citation_lastpage" content={article.pages.split('-')[1] || ''} />
                {article.doi !== 'Not available' && <meta name="citation_doi" content={article.doi} />}
                <meta name="citation_pdf_url" content={`${SITE_URL}${article.articleFile}`} />
                <meta name="citation_abstract_html_url" content={canonicalUrl} />
                <meta name="citation_abstract" content={article.abstract.replace(/<[^>]+>/g, '')} />
                {article.keywords.map((keyword, index) => (
                    <meta key={`citation_keywords_${index}`} name="citation_keywords" content={keyword} />
                ))}
                {parseReferences(article.reference).map((ref, index) => (
                    <meta
                        key={`citation_reference_${index}`}
                        name="citation_reference"
                        content={ref.replace(/<[^>]+>/g, '')}
                    />
                ))}
                <meta name="robots" content="index, follow" />
                <link rel="schema.DC" href="http://purl.org/dc/elements/1.1/" />
                {article.authors.map((author, index) => (
                    <meta
                        key={`DC.Creator.PersonalName_${index}`}
                        name="DC.Creator.PersonalName"
                        content={author.name}
                    />
                ))}
                {article.published !== 'Not specified' && (
                    <meta
                        name="DC.Date.created"
                        scheme="ISO8601"
                        content={new Date(article.published).toISOString().split('T')[0]}
                    />
                )}
                {article.received !== 'Not specified' && (
                    <meta
                        name="DC.Date.dateSubmitted"
                        scheme="ISO8601"
                        content={new Date(article.received).toISOString().split('T')[0]}
                    />
                )}
                {article.published !== 'Not specified' && (
                    <meta
                        name="DC.Date.issued"
                        scheme="ISO8601"
                        content={new Date(article.published).toISOString().split('T')[0]}
                    />
                )}
                {article.published !== 'Not specified' && (
                    <meta
                        name="DC.Date.modified"
                        scheme="ISO8601"
                        content={new Date(article.published).toISOString().split('T')[0]}
                    />
                )}
                <meta name="DC.Description" content={article.abstract.replace(/<[^>]+>/g, '')} />
                <meta name="DC.Format" scheme="IMT" content="application/pdf" />
                <meta name="DC.Identifier" content={article.articleKey} />
                <meta name="DC.Identifier.pageNumber" content={article.pages} />
                <meta name="DC.Identifier.URI" content={canonicalUrl} />
                <meta name="DC.Language" scheme="ISO639-1" content="en" />
                <meta
                    name="DC.Rights"
                    content={`Copyright (c) ${new Date(article.published).getFullYear()} IASSRD`}
                />
                <meta name="DC.Source" content={article.journal} />
                <meta name="DC.Source.Issue" content={article.issue} />
                <meta name="DC.Source.Volume" content={article.volume} />
                <meta name="DC.Source.URI" content={`https://iassrd.com/journals/${journalAbbrevation}`} />
                {article.keywords.map((keyword, index) => (
                    <meta key={`DC.Subject_${index}`} name="DC.Subject" content={keyword} />
                ))}
                <meta name="DC.Title" content={article.title} />
                <meta name="DC.Type" content="Text.Serial.Journal" />
                <meta name="DC.Type.articleType" content={article.articleType} />
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content="IASSRD Journals" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={article.title} />
                <meta name="twitter:description" content={metaDescription} />
                <meta name="twitter:url" content={canonicalUrl} />
                <link rel="canonical" href={canonicalUrl} />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'ScholarlyArticle',
                            headline: article.title,
                            author: article.authors.map((author) => ({
                                '@type': 'Person',
                                name: author.name,
                                affiliation: { '@type': 'Organization', name: author.institution },
                            })),
                            datePublished:
                                article.published !== 'Not specified'
                                    ? new Date(article.published).toISOString()
                                    : undefined,
                            dateReceived:
                                article.received !== 'Not specified'
                                    ? new Date(article.received).toISOString()
                                    : undefined,
                            dateAccepted:
                                article.acceptance !== 'Not specified'
                                    ? new Date(article.acceptance).toISOString()
                                    : undefined,
                            isPartOf: {
                                '@type': 'PublicationIssue',
                                issueNumber: article.issue,
                                isPartOf: {
                                    '@type': 'PublicationVolume',
                                    volumeNumber: article.volume,
                                    isPartOf: {
                                        '@type': 'Periodical',
                                        name: article.journal,
                                        issn: journalAbbrevation,
                                    },
                                },
                            },
                            pageStart: article.pages.split('-')[0] || undefined,
                            pageEnd: article.pages.split('-')[1] || undefined,
                            keywords: article.keywords.join(', '),
                            abstract: article.abstract.replace(/<[^>]+>/g, ''),
                            url: canonicalUrl,
                            identifier: article.doi !== 'Not available' ? article.doi : article.articleKey,
                            publisher: {
                                '@type': 'Organization',
                                name: 'International Academy for Social Sciences Research and Development (IASSRD)',
                            },
                            license: 'https://creativecommons.org/licenses/by/4.0/',
                            citation: parseReferences(article.reference).map((ref) => ({
                                '@type': 'CreativeWork',
                                name: ref.replace(/<[^>]+>/g, ''),
                            })),
                        }),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'BreadcrumbList',
                            itemListElement: [
                                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://iassrd.com' },
                                {
                                    '@type': 'ListItem',
                                    position: 2,
                                    name: 'Journals',
                                    item: `https://iassrd.com/journals/${journalAbbrevation}`,
                                },
                                {
                                    '@type': 'ListItem',
                                    position: 3,
                                    name: `Vol. ${article.volume} No. ${article.issue}`,
                                    item: canonicalUrl,
                                },
                            ],
                        }),
                    }}
                />
            </Helmet>
            <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
            {isSearchOpen && (
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10"
                    aria-hidden="true"
                ></div>
            )}
            <div className={`px-[80px] py-[30px] ${isSearchOpen ? 'mt-[160px]' : 'mt-[80px]'}`}>
                <div className="flex mt-8">
                    {/* <Sidebar journalAbbreviation={journalAbbrevation} dynamicProps={journalProps} /> */}
                    <Sidebar journalAbbrevation={journalAbbrevation} dynamicProps={journalProps} />
                    <div className="w-[75vw] ps-6 h-auto">
                        {/* <p className="text-3xl text-gray-800 font-bold mb-8">Article Detail</p> */}
                        <div className="flex space-x-8 items-center">
                            <p className="text-gray-700 font-medium text-md">{article.articleType}</p>
                            <p className="text-red-500 font-medium text-lg cursor-pointer">OPEN ACCESS</p>
                        </div>
                        <h1 id="paper-topic" className="text-2xl font-bold text-gray-900 my-2">
                            {article.title}
                        </h1>
                        <section id="authors" className="flex flex-col md:flex-row gap-6 my-6">
                            {article.authors.map((author, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                        <span className="text-md text-teal-700 font-semibold">
                                            {author.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <p
                                            className={`font-semibold ${article.correspondingAuthor &&
                                                parseInt(article.correspondingAuthor) === author.authorId
                                                ? 'text-red-600'
                                                : ''
                                                }`}
                                        >
                                            {author.name}
                                            {article.correspondingAuthor &&
                                                parseInt(article.correspondingAuthor) === author.authorId
                                                ? ' *'
                                                : ''}
                                        </p>
                                        <p className="text-sm text-gray-600">{author.institution}</p>
                                    </div>
                                </div>
                            ))}
                        </section>
                        <p className="border-t border-gray-300"></p>
                        <div className="my-5 w-full flex">
                            <section className="w-[75%]">
                                <p className="text-2xl text-gray-800 font-semibold mb-2">Abstract</p>
                                <div
                                    className="text-gray-700 font-medium text-justify leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: article.abstract }}
                                />
                                <section
                                    id="article-info"
                                    className="mt-8 border-t-4 border-blue-600 bg-blue-50 p-5 font-IBM leading-loose"
                                >
                                    <h2 className="text-xl italic font-semibold mb-2 text-gray-800">Article information</h2>
                                    <span className=" space-x-2">
                                        <strong className="text-black">Journal Name:</strong>
                                        <Link
                                            to={`/journal/${journalAbbrevation}`}
                                            className="italic font-semibold text-blue-800 hover:underline"
                                        >
                                            {article.journal || 'Loading journal...'}
                                        </Link>
                                    </span>
                                    <p>
                                        <strong>Volume (Issue):</strong> {article.volume} ({article.issue})
                                    </p>
                                    {article.doi !== 'Not available' && article.doi !== '' && (
                                        <p id="doi">
                                            <strong>DOI:</strong>{' '}
                                            <a
                                                href={article.doi}
                                                className="text-blue-600 hover:underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {article.doi}
                                            </a>
                                        </p>
                                    )}
                                    <p>
                                        <strong>Pages:</strong> {article.pages}
                                    </p>
                                    <p className="flex flex-wrap gap-x-6 gap-y-1">
                                        {article?.received && !isNaN(new Date(article.received)) && (
                                            <span>
                                                <strong>RECEIVED:</strong>{' '}
                                                {new Date(article.received).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </span>
                                        )}
                                        {article?.acceptance && !isNaN(new Date(article.acceptance)) && (
                                            <span>
                                                <strong>ACCEPTED:</strong>{' '}
                                                {new Date(article.acceptance).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </span>
                                        )}
                                        {article?.published && !isNaN(new Date(article.published)) && (
                                            <span>
                                                <strong>PUBLISHED:</strong>{' '}
                                                {new Date(article.published).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </span>
                                        )}
                                    </p>
                                    <p id="how-to-cite">
                                        <strong>How to Cite:</strong> {article.howToCite}
                                    </p>
                                    <p id="copyright">
                                        <strong>Copyright:</strong> © {new Date(article.published).getFullYear()} the
                                        Author(s). This article is an open access article distributed under the terms and
                                        conditions of the Creative Commons Attribution (CC-BY) 4.0 license (
                                        <a
                                            href="https://creativecommons.org/licenses/by/4.0/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            https://creativecommons.org/licenses/by/4.0/
                                        </a>
                                        ). Published by International Academy for Social Sciences Research and Development (IASSRD)
                                    </p>
                                </section>
                                <section id="reference" className="mt-6">
                                    <h2 className="text-xl font-semibold mb-2">References</h2>
                                    <ol className="text-gray-700 text-justify leading-relaxed">
                                        {parseReferences(article.reference).map((ref, index) => {
                                            const decodeHtml = (html) => {
                                                const doc = new DOMParser().parseFromString(html, 'text/html');
                                                return doc.documentElement.textContent;
                                            };
                                            let cleanRef = decodeHtml(ref);
                                            cleanRef = cleanRef.replace(/<[^>]+>/g, '');
                                            return (
                                                <li key={index} className="mb-2 whitespace-pre-wrap">
                                                    {cleanRef}
                                                </li>
                                            );
                                        })}
                                    </ol>
                                </section>
                            </section>
                            <section className="w-[25%] ps-8 h-full">
                                <div className="flex flex-wrap justify-around gap-5 h-full">
                                    <div className="flex flex-col items-center justify-center">
                                        <p className="text-4xl text-sky-500 font-semibold">{viewCount}</p>
                                        <p className="text-gray-900 font-medium text-sm">Views</p>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <p className="text-3xl text-indigo-500 font-semibold">{downloadCount}</p>
                                        <p className="text-gray-900 font-medium text-sm">Downloads</p>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <p className="text-2xl text-red-500 font-semibold">{article.totalCitations}</p>
                                        <p className="text-gray-900 font-medium text-sm">Citations</p>
                                    </div>
                                </div>
                                <p className="border-t border-gray-300 my-5"></p>
                                <div>
                                    <p className="text-xl text-gray-800 font-semibold my-2">Download</p>
                                    <button
                                        onClick={handleDownload}
                                        className="w-full h-[40px] flex bg-green-500 hover:bg-green-600 justify-center items-center px-4 cursor-pointer"
                                    >
                                        <p className="text-white text-md font-semibold">PDF</p>
                                    </button>
                                </div>
                                <p className="border-t border-gray-300 my-5"></p>
                                <div>
                                    <p className="text-xl text-gray-800 font-semibold my-2">Share</p>
                                    <div className="flex justify-around mb-2 p-2">
                                        <a
                                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => handleSocialShare('Facebook')}
                                            className="text-blue-600"
                                        >
                                            <FaFacebook size={30} />
                                        </a>
                                        <a
                                            href={`https://twitter.com/intent/tweet?url=${encodedUrl}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => handleSocialShare('Twitter')}
                                            className="text-black"
                                        >
                                            <FaXTwitter size={30} />
                                        </a>
                                        <a
                                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => handleSocialShare('LinkedIn')}
                                            className="text-blue-800"
                                        >
                                            <FaLinkedin size={30} />
                                        </a>
                                        <a
                                            href={`https://api.whatsapp.com/send?text=${encodedUrl}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => handleSocialShare('WhatsApp')}
                                            className="text-green-500"
                                        >
                                            <FaWhatsapp size={30} />
                                        </a>
                                        <a
                                            href={`mailto:?subject=Check out this article&body=${encodedUrl}`}
                                            onClick={() => handleSocialShare('Email')}
                                            className="text-gray-600"
                                        >
                                            <FaEnvelope size={30} />
                                        </a>
                                    </div>
                                </div>
                                <p className="border-t border-gray-300 my-5"></p>
                                <div>
                                    <p className="text-xl text-gray-800 font-semibold my-2">Keywords</p>
                                    <div className="flex flex-wrap gap-4">
                                        {article.keywords.length > 0 ? (
                                            article.keywords.map((keyword, index) => (
                                                <div
                                                    key={index}
                                                    className="py-1 px-2 rounded text-gray-600 font-medium bg-gray-100 hover:bg-gray-200 text-sm w-fit break-words"
                                                >
                                                    {keyword}
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-700">Not specified</p>
                                        )}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </HelmetProvider>
    );
}

export default Articledetail;