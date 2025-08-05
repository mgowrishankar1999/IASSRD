// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Helmet, HelmetProvider } from 'react-helmet-async';
// import Navbar from '../navbar';
// import cover1 from '../../../assets/cover1.jpg';
// import cover2 from '../../../assets/cover2.jpg';
// import Footer from '../footer';

// const BASE_URL = 'https://iassrd.com:8081/api/v1';

// function Listofjournals() {
//     const [disciplines, setDisciplines] = useState([]);
//     const [journals, setJournals] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [expanded, setExpanded] = useState({});
//     const [selectedDisciplineId, setSelectedDisciplineId] = useState(null);
//     const [disname, setDisname] = useState();

//     // for navbar--------
//     const [isSearchOpen, setIsSearchOpen] = useState(false);





//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true);
//                 // Fetch disciplines
//                 const disciplinesResponse = await axios.get(`${BASE_URL}/disciplines`, {
//                     headers: {
//                         // Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
//                     },
//                 });
//                 console.log('Disciplines API Response:', disciplinesResponse.data);
//                 if (disciplinesResponse.data.success) {
//                     const disciplinesData = disciplinesResponse.data.data || [];
//                     setDisciplines(disciplinesData);
//                     // Log discipline IDs and names for debugging
//                     console.log('Discipline Data:', disciplinesData.map(d => ({
//                         id: d.id || d.disciplineId,
//                         name: d.disciplineName || d.name
//                     })));
//                 } else {
//                     setError('Failed to fetch disciplines: Invalid response format');
//                 }

//                 // Fetch journals
//                 const journalsResponse = await axios.get(`${BASE_URL}/journals`, {
//                     headers: {
//                         // Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
//                     },
//                 });
//                 console.log('Journals API Response:', journalsResponse.data);
//                 if (journalsResponse.data.success) {
//                     const journalsData = journalsResponse.data.data || [];
//                     setJournals(journalsData);
//                     // Log journal IDs and disciplineIds for debugging
//                     console.log('Journal Data:', journalsData.map(j => ({
//                         id: j.id,
//                         name: j.journalName,
//                         disciplineId: j.disciplineId || j.discipline_id
//                     })));
//                 } else {
//                     setError((prev) => (prev ? `${prev}; Failed to fetch journals` : 'Failed to fetch journals'));
//                 }
//             } catch (err) {
//                 setError(`Error fetching data: ${err.message}`);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     // Log selected discipline and filtered journals for debugging
//     useEffect(() => {
//         console.log('Selected Discipline ID:', selectedDisciplineId);
//         console.log('Filtered Journals:', filteredJournals);
//     }, [selectedDisciplineId]);

//     // Sort disciplines alphabetically by name or disciplineName
//     const sortedDisciplines = [...disciplines].sort((a, b) =>
//         (a.disciplineName || a.name || '').localeCompare(b.disciplineName || b.name || '')
//     );

//     // Toggle expanded state for each journal
//     const handleSeeMore = (id) => {
//         setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
//     };

//     // Handle discipline selection
//     const handleDisciplineSelect = (id) => {
//         if (id === undefined) {
//             console.error('Discipline ID is undefined. Check API response for correct ID property.');
//             return;
//         }
//         setSelectedDisciplineId(id === selectedDisciplineId ? null : id);
//         console.log('Selected Discipline ID:', id);
//     };


//     // Filter journals based on selected discipline
//     const filteredJournals = selectedDisciplineId
//         ? journals.filter(journal => {
//             if (!journal.disciplineId && !journal.discipline_id) {
//                 console.warn(`Journal ${journal.journalName} has no disciplineId or discipline_id`);
//                 return false;
//             }
//             const journalDisciplineId = journal.disciplineId || journal.discipline_id;
//             return String(journalDisciplineId) === String(selectedDisciplineId);
//         })
//         : journals;

//     // Group journals by initial letter
//     const groupedJournals = filteredJournals.reduce((acc, journal) => {
//         const letter = journal.journalName ? journal.journalName.charAt(0).toUpperCase() : 'I';
//         acc[letter] = acc[letter] || [];
//         acc[letter].push(journal);
//         return acc;
//     }, {});



//     const disciplineName = disciplines.find(
//         (dis) => (dis.id || dis.disciplineId) === selectedDisciplineId
//     )?.disciplineName || 'All Journals';
//     console.log('Selected Discipline Name:', disciplineName);


//     return (
//         <HelmetProvider>
//             <Helmet>
//                 <title>Journals - ISCSITR</title>
//                 <meta name="description" content="Browse our collection of journals and disciplines" />
//             </Helmet>
//             <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
//             <div className={`px-[80px]  py-[30px] ${isSearchOpen ? "mt-[160px]" : "mt-[80px]"}`}>
//                 <p className="text-3xl text-gray-800 font-bold mb-8">Journals</p>
//                 <div className="flex    ">
//                     <div className="w-[25vw] mr-4 ">
//                         <p className="border-t border-gray-400 mb-4"></p>
//                         {loading && <p className="text-gray-600 mt-2">Loading subjects...</p>}
//                         {error && <p className="text-red-600 mt-2">Error: {error}</p>}
//                         <p className="text-gray-800 text-lg font-bold">Subject</p>
//                         {sortedDisciplines.length > 0 && (
//                             <ul className="mt-2 space-y-2">
//                                 {sortedDisciplines.map((discipline) => (
//                                     <li
//                                         key={discipline.id || discipline.disciplineId}
//                                         className={`p-2 bg-white shadow-sm rounded text-md cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-102 hover:-translate-x-1 ${selectedDisciplineId === (discipline.id || discipline.disciplineId) ? 'bg-blue-100' : 'hover:bg-gray-100 hover:text-blue-600'}`}
//                                         onClick={() => handleDisciplineSelect(discipline.id || discipline.disciplineId)}
//                                     >
//                                         {discipline.disciplineName || discipline.name || 'Unnamed discipline'}
//                                     </li>
//                                 ))}
//                             </ul>
//                         )}
//                         {!loading && !error && sortedDisciplines.length === 0 && (
//                             <p className="text-gray-600 mt-2">No subjects found.</p>
//                         )}
//                     </div>
//                     <div className="w-[75%] h-full">
//                         <p className="border-t border-gray-400 mb-4"></p>
//                         {loading && <p className="text-gray-600 mt-2">Loading journals...</p>}
//                         {error && <p className="text-red-600 mt-2">Error: {error}</p>}
//                         {!loading && !error && selectedDisciplineId && filteredJournals.length === 0 && (
//                             <p className="text-gray-600 mt-2">No journals found for the selected subject.</p>
//                         )}
//                         {Object.keys(groupedJournals).length > 0 && (
//                             <>
//                                 {Object.entries(groupedJournals).map(([letter, journalGroup], groupIndex) => (
//                                     <div key={letter}>
//                                         {/* <p className="mt-6 text-3xl font-bold text-gray-800">{letter}</p> */}
//                                         <p className="mt-6 text-2xl font-bold text-gray-800 mb-2">{disciplineName}</p>
//                                         {journalGroup.map((journal, index) => {
//                                             const aboutHtml = journal.about || '<p>No description available</p>';
//                                             const isExpanded = expanded[journal.id || `${letter}-${index}`] || false;

//                                             const tempDiv = document.createElement('div');
//                                             tempDiv.innerHTML = aboutHtml;
//                                             const plainText = tempDiv.textContent || tempDiv.innerText || '';
//                                             const lines = plainText.split('\n').filter(line => line.trim());

//                                             const displayLines = isExpanded ? lines : lines.slice(0, 2);
//                                             const hasMore = lines.length > 2;

//                                             return (
//                                                 <div key={journal.id || `${letter}-${index}`}>
//                                                     <div className="flex items-center space-x-6 h-auto">
//                                                         <div className="w-1/4 my-6">
//                                                             <img
//                                                                 className="w-[160px] h-[190px] object-cover"
//                                                                 src={index === 0 && groupIndex === 0 ? cover1 : cover2}
//                                                                 alt={journal.journalName || 'Journal cover'}
//                                                             />
//                                                         </div>
//                                                         <div className="w-full">
//                                                             <p className="text-title font-bold text-lg hover:text-red-600 hover:underline cursor-pointer">
//                                                                 {journal.journalName || 'Unnamed journal'}
//                                                             </p>
//                                                             <p className="text-gray-500 text-xs font-medium">
//                                                                 ISSN: {journal.issnPrint || 'N/A'} (print) | ISSN: {journal.issnOnline || 'N/A'} (Online)
//                                                             </p>
//                                                             <div className="w-full text-justify text-gray-950 text-[15px] mt-3">
//                                                                 {displayLines.map((line, i) => (
//                                                                     <p key={i}>{line}</p>
//                                                                 ))}
//                                                                 {hasMore && (
//                                                                     <p
//                                                                         className="text-sky-600 text-sm mt-2 cursor-pointer hover:text-red-600 hover:underline"
//                                                                         onClick={() => handleSeeMore(journal.id || `${letter}-${index}`)}
//                                                                     >
//                                                                         {isExpanded ? 'See Less' : 'See More'}
//                                                                     </p>
//                                                                 )}
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                     <div className={` ${index === journalGroup.length - 1 ? 'border-b-0' : 'border-b mt-5'}`}></div>
//                                                 </div>
//                                             );
//                                         })}
//                                     </div>
//                                 ))}
//                             </>
//                         )}
//                         {!loading && !error && journals.length === 0 && (
//                             <p className="text-gray-600 mt-2">No journals found.</p>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </HelmetProvider>
//     );
// }

// export default Listofjournals;














// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Helmet, HelmetProvider } from 'react-helmet-async';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../navbar';
// import cover1 from '../../../assets/cover1.jpg';
// import cover2 from '../../../assets/cover2.jpg';
// import Footer from '../footer';

// const BASE_URL = 'https://iassrd.com:8081/api/v1';

// function Listofjournals() {
//     const [disciplines, setDisciplines] = useState([]);
//     const [journals, setJournals] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [expanded, setExpanded] = useState({});
//     const [selectedDisciplineId, setSelectedDisciplineId] = useState(null);
//     const [disname, setDisname] = useState();
//     const [isSearchOpen, setIsSearchOpen] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true);
//                 const disciplinesResponse = await axios.get(`${BASE_URL}/disciplines`, {
//                     headers: {},
//                 });
//                 console.log('Disciplines API Response:', disciplinesResponse.data);
//                 if (disciplinesResponse.data.success) {
//                     const disciplinesData = disciplinesResponse.data.data || [];
//                     setDisciplines(disciplinesData);
//                     console.log('Discipline Data:', disciplinesData.map(d => ({
//                         id: d.id || d.disciplineId,
//                         name: d.disciplineName || d.name
//                     })));
//                 } else {
//                     setError('Failed to fetch disciplines: Invalid response format');
//                 }

//                 const journalsResponse = await axios.get(`${BASE_URL}/journals`, {
//                     headers: {},
//                 });
//                 console.log('Journals API Response:', journalsResponse.data);
//                 if (journalsResponse.data.success) {
//                     const journalsData = journalsResponse.data.data || [];
//                     setJournals(journalsData);
//                     console.log('Journal Data:', journalsData.map(j => ({
//                         id: j.journalId,
//                         name: j.journalName,
//                         abbrevation: j.abbrevation || 'N/A',
//                         disciplineId: j.disciplineId || j.discipline_id
//                     })));
//                 } else {
//                     setError((prev) => (prev ? `${prev}; Failed to fetch journals` : 'Failed to fetch journals'));
//                 }
//             } catch (err) {
//                 setError(`Error fetching data: ${err.message}`);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     useEffect(() => {
//         console.log('Selected Discipline ID:', selectedDisciplineId);
//         console.log('Filtered Journals:', filteredJournals);
//     }, [selectedDisciplineId]);

//     const sortedDisciplines = [...disciplines].sort((a, b) =>
//         (a.disciplineName || a.name || '').localeCompare(b.disciplineName || b.name || '')
//     );

//     const handleSeeMore = (id) => {
//         setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
//     };

//     const handleDisciplineSelect = (id) => {
//         if (id === undefined) {
//             console.error('Discipline ID is undefined. Check API response for correct ID property.');
//             return;
//         }
//         setSelectedDisciplineId(id === selectedDisciplineId ? null : id);
//         console.log('Selected Discipline ID:', id);
//     };

//     const filteredJournals = selectedDisciplineId
//         ? journals.filter(journal => {
//             if (!journal.disciplineId && !journal.discipline_id) {
//                 console.warn(`Journal ${journal.journalName} has no disciplineId or discipline_id`);
//                 return false;
//             }
//             const journalDisciplineId = journal.disciplineId || journal.discipline_id;
//             return String(journalDisciplineId) === String(selectedDisciplineId);
//         })
//         : journals;

//     const groupedJournals = filteredJournals.reduce((acc, journal) => {
//         const letter = journal.journalName ? journal.journalName.charAt(0).toUpperCase() : 'I';
//         acc[letter] = acc[letter] || [];
//         acc[letter].push(journal);
//         return acc;
//     }, {});

//     const disciplineName = disciplines.find(
//         (dis) => (dis.id || dis.disciplineId) === selectedDisciplineId
//     )?.disciplineName || 'All Journals';
//     console.log('Selected Discipline Name:', disciplineName);

//     // Helper function to get a valid abbrevation
//     const getJournalAbbrevation = (journal) => {
//         const abbr = journal.abbrevation;
//         if (!abbr) {
//             console.warn(`No abbrevation found for journal: ${journal.journalName}. Navigation skipped.`);
//             return null; // Prevent navigation if abbrevation is missing
//         }
//         return abbr;
//     };

//     return (
//         <HelmetProvider>
//             <Helmet>
//                 <title>Journals - ISCSITR</title>
//                 <meta name="description" content="Browse our collection of journals and disciplines" />
//             </Helmet>
//             <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
//             <div className={`px-[80px] py-[30px] ${isSearchOpen ? "mt-[160px]" : "mt-[80px]"}`}>
//                 <p className="text-3xl text-gray-800 font-bold mb-8">Journals</p>
//                 <div className="flex">
//                     <div className="w-[25vw] mr-4">
//                         <p className="border-t border-gray-400 mb-4"></p>
//                         {loading && <p className="text-gray-600 mt-2">Loading subjects...</p>}
//                         {error && <p className="text-red-600 mt-2">Error: {error}</p>}
//                         <p className="text-gray-800 text-lg font-bold">Subject</p>
//                         {sortedDisciplines.length > 0 && (
//                             <ul className="mt-2 space-y-2">
//                                 {sortedDisciplines.map((discipline) => (
//                                     <li
//                                         key={discipline.id || discipline.disciplineId}
//                                         className={`p-2 bg-white shadow-sm rounded text-md cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-102 hover:-translate-x-1 ${selectedDisciplineId === (discipline.id || discipline.disciplineId) ? 'bg-blue-100' : 'hover:bg-gray-100 hover:text-blue-600'}`}
//                                         onClick={() => handleDisciplineSelect(discipline.id || discipline.disciplineId)}
//                                     >
//                                         {discipline.disciplineName || discipline.name || 'Unnamed discipline'}
//                                     </li>
//                                 ))}
//                             </ul>
//                         )}
//                         {!loading && !error && sortedDisciplines.length === 0 && (
//                             <p className="text-gray-600 mt-2">No subjects found.</p>
//                         )}
//                     </div>
//                     <div className="w-[75%] h-full">
//                         <p className="border-t border-gray-400 mb-4"></p>
//                         {loading && <p className="text-gray-600 mt-2">Loading journals...</p>}
//                         {error && <p className="text-red-600 mt-2">Error: {error}</p>}
//                         {!loading && !error && selectedDisciplineId && filteredJournals.length === 0 && (
//                             <p className="text-gray-600 mt-2">No journals found for the selected subject.</p>
//                         )}
//                         {Object.keys(groupedJournals).length > 0 && (
//                             <>
//                                 {Object.entries(groupedJournals).map(([letter, journalGroup], groupIndex) => (
//                                     <div key={letter}>
//                                         <p className="mt-6 text-2xl font-bold text-gray-800 mb-2">{disciplineName}</p>
//                                         {journalGroup.map((journal, index) => {
//                                             const aboutHtml = journal.about || '<p>No description available</p>';
//                                             const isExpanded = expanded[journal.journalId || `${letter}-${index}`] || false;

//                                             const tempDiv = document.createElement('div');
//                                             tempDiv.innerHTML = aboutHtml;
//                                             const plainText = tempDiv.textContent || tempDiv.innerText || '';
//                                             const lines = plainText.split('\n').filter(line => line.trim());

//                                             const displayLines = isExpanded ? lines : lines.slice(0, 2);
//                                             const hasMore = lines.length > 2;
//                                             const journalAbbrevation = getJournalAbbrevation(journal);

//                                             return (
//                                                 <div key={journal.journalId || `${letter}-${index}`}>
//                                                     <div className="flex items-center space-x-6 h-auto">
//                                                         <div className="w-1/4 my-6">
//                                                             <img
//                                                                 className="w-[160px] h-[190px] object-cover cursor-pointer"
//                                                                 src={index === 0 && groupIndex === 0 ? cover1 : cover2}
//                                                                 alt={journal.journalName || 'Journal cover'}
//                                                                 onClick={() => journalAbbrevation && navigate(`/journal/${journalAbbrevation}`)}
//                                                             />
//                                                         </div>
//                                                         <div className="w-full">
//                                                             <p
//                                                                 className="text-sky-600 font-medium text-lg hover:text-red-600 hover:underline cursor-pointer"
//                                                                 onClick={() => journalAbbrevation && navigate(`/journal/${journalAbbrevation}`)}
//                                                             >
//                                                                 {journal.journalName || 'Unnamed journal'}
//                                                             </p>
//                                                             <p className="text-gray-500 text-xs font-medium">
//                                                                 ISSN: {journal.issnPrint || 'N/A'} (print) | ISSN: {journal.issnOnline || 'N/A'} (Online)
//                                                             </p>
//                                                             <div className="w-full text-justify text-gray-950 text-[15px] mt-3">
//                                                                 {displayLines.map((line, i) => (
//                                                                     <p key={i}>{line}</p>
//                                                                 ))}
//                                                                 {hasMore && (
//                                                                     <p
//                                                                         className="text-sky-600 text-sm mt-2 cursor-pointer hover:text-red-600 hover:underline"
//                                                                         onClick={() => handleSeeMore(journal.journalId || `${letter}-${index}`)}
//                                                                     >
//                                                                         {isExpanded ? 'See Less' : 'See More'}
//                                                                     </p>
//                                                                 )}
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                     <div className={` ${index === journalGroup.length - 1 ? 'border-b-0' : 'border-b mt-5'}`}></div>
//                                                 </div>
//                                             );
//                                         })}
//                                     </div>
//                                 ))}
//                             </>
//                         )}
//                         {!loading && !error && journals.length === 0 && (
//                             <p className="text-gray-600 mt-2">No journals found.</p>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </HelmetProvider>
//     );
// }

// export default Listofjournals;






// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Helmet, HelmetProvider } from 'react-helmet-async';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../navbar';
// import cover1 from '../../../assets/cover1.jpg';
// import cover2 from '../../../assets/cover2.jpg';
// import Footer from '../footer';
// import { AiFillEdit } from 'react-icons/ai';
// import { FaUserEdit } from 'react-icons/fa';
// import { IoMdArrowDropdown } from 'react-icons/io';

// const BASE_URL = 'https://iassrd.com:8081/api/v1'; // Updated base URL

// function Listofjournals() {
//     const [disciplines, setDisciplines] = useState([]);
//     const [journals, setJournals] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [expanded, setExpanded] = useState({});
//     const [selectedDisciplineId, setSelectedDisciplineId] = useState(null);
//     const [disname, setDisname] = useState();
//     const [isSearchOpen, setIsSearchOpen] = useState(false);
//     const navigate = useNavigate();



//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//     const handleDropdown = () => {
//         setIsDropdownOpen((prev) => !prev);
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true);
//                 const disciplinesResponse = await axios.get(`${BASE_URL}/disciplines`, {
//                     headers: {},
//                 });
//                 console.log('Disciplines API Response:', disciplinesResponse.data);
//                 if (disciplinesResponse.data.success) {
//                     const disciplinesData = disciplinesResponse.data.data || [];
//                     setDisciplines(disciplinesData);
//                     console.log('Discipline Data:', disciplinesData.map(d => ({
//                         id: d.id || d.disciplineId,
//                         name: d.disciplineName || d.name
//                     })));
//                 } else {
//                     setError('Failed to fetch disciplines: Invalid response format');
//                 }

//                 const journalsResponse = await axios.get(`${BASE_URL}/journals`, {
//                     headers: {},
//                 });
//                 console.log('Journals API Response:', journalsResponse.data);
//                 if (journalsResponse.data.success) {
//                     const journalsData = journalsResponse.data.data || [];
//                     setJournals(journalsData);
//                     console.log('Journal Data:', journalsData.map(j => ({
//                         id: j.journalId,
//                         name: j.journalName,
//                         abbrevation: j.abbrevation || 'N/A',
//                         disciplineId: j.disciplineId || j.discipline_id
//                     })));
//                 } else {
//                     setError((prev) => (prev ? `${prev}; Failed to fetch journals` : 'Failed to fetch journals'));
//                 }
//             } catch (err) {
//                 setError(`Error fetching data: ${err.message}`);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     useEffect(() => {
//         console.log('Selected Discipline ID:', selectedDisciplineId);
//         console.log('Filtered Journals:', filteredJournals);
//     }, [selectedDisciplineId]);

//     const sortedDisciplines = [...disciplines].sort((a, b) =>
//         (a.disciplineName || a.name || '').localeCompare(b.disciplineName || b.name || '')
//     );

//     const handleSeeMore = (id) => {
//         setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
//     };

//     const handleDisciplineSelect = (id) => {
//         if (id === undefined) {
//             console.error('Discipline ID is undefined. Check API response for correct ID property.');
//             return;
//         }
//         setSelectedDisciplineId(id === selectedDisciplineId ? null : id);
//         console.log('Selected Discipline ID:', id);
//     };

//     const filteredJournals = selectedDisciplineId
//         ? journals.filter(journal => {
//             if (!journal.disciplineId && !journal.discipline_id) {
//                 console.warn(`Journal ${journal.journalName} has no disciplineId or discipline_id`);
//                 return false;
//             }
//             const journalDisciplineId = journal.disciplineId || journal.discipline_id;
//             return String(journalDisciplineId) === String(selectedDisciplineId);
//         })
//         : journals;

//     const groupedJournals = filteredJournals.reduce((acc, journal) => {
//         const letter = journal.journalName ? journal.journalName.charAt(0).toUpperCase() : 'I';
//         acc[letter] = acc[letter] || [];
//         acc[letter].push(journal);
//         return acc;
//     }, {});

//     const disciplineName = disciplines.find(
//         (dis) => (dis.id || dis.disciplineId) === selectedDisciplineId
//     )?.disciplineName || 'All Journals';
//     console.log('Selected Discipline Name:', disciplineName);

//     // Helper function to get a valid abbrevation
//     const getJournalAbbrevation = (journal) => {
//         const abbr = journal.abbrevation;
//         if (!abbr) {
//             console.warn(`No abbrevation found for journal: ${journal.journalName}. Navigation skipped.`);
//             return null; // Prevent navigation if abbrevation is missing
//         }
//         return abbr;
//     };

//     return (
//         <HelmetProvider>
//             <Helmet>
//                 <title>Journals - IASSRD</title>
//                 <meta name="description" content="Browse our collection of journals and disciplines" />
//             </Helmet>
//             <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
//             <div className={`px-[80px] py-[30px] ${isSearchOpen ? "mt-[160px]" : "mt-[70px]"}`}>
//                 <p className="text-3xl text-gray-800 font-bold fixed z-10">Journals</p>
//                 <div className="flex">
//                     {/* <div className="w-[25vw] mr-4">
//                         <p className="border-t border-gray-400 mb-4"></p>
//                         {loading && <p className="text-gray-600 mt-2">Loading subjects...</p>}
//                         {error && <p className="text-red-600 mt-2">Error: {error}</p>}
//                         <p className="text-gray-800 text-lg font-bold">Subject</p>
//                         {sortedDisciplines.length > 0 && (
//                             <ul className="mt-2 space-y-2">
//                                 {sortedDisciplines.map((discipline) => (
//                                     <li
//                                         key={discipline.id || discipline.disciplineId}
//                                         className={`p-2 bg-white shadow-sm rounded text-md cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-102 hover:-translate-x-1 ${selectedDisciplineId === (discipline.id || discipline.disciplineId) ? 'bg-blue-100' : 'hover:bg-gray-100 hover:text-blue-600'}`}
//                                         onClick={() => handleDisciplineSelect(discipline.id || discipline.disciplineId)}
//                                     >
//                                         {discipline.disciplineName || discipline.name || 'Unnamed discipline'}
//                                     </li>
//                                 ))}
//                             </ul>
//                         )}
//                         {!loading && !error && sortedDisciplines.length === 0 && (
//                             <p className="text-gray-600 mt-2">No subjects found.</p>
//                         )}
//                     </div> */}


//                     {/*------------------------------------------------------------------ the above code is for disciplines by filterations later due to changes i commented and added side bar in plac eos thar functionality -------------------------------------------- */}

//                     {/* sidebar */}

//                     <div className={`w-[25%] mr-6 font-sans fixed  ${isSearchOpen ? "top-[230px]" : "top-[150px]"}`}>
//                         <div className="w-full flex flex-col space-y-3 p-4 bg-gray-50 shadow-lg rounded-lg min-h-[40vh]  overflow-y-auto">
//                             <ul className="space-y-2">
//                                 <li className="h-9 flex bg-green-600 hover:bg-green-700 justify-between items-center px-4 rounded-md cursor-pointer transition-colors duration-200">
//                                     <p className="text-white text-base font-medium">Submit Your Article</p>
//                                     <p className="text-white text-lg">
//                                         <AiFillEdit title="Submission" />
//                                     </p>
//                                 </li>
//                                 <li className="flex flex-col bg-blue-500 rounded-md cursor-pointer transition-all duration-200">
//                                     <div
//                                         className="h-9 flex justify-between items-center px-4 hover:bg-blue-600 rounded-md"
//                                         onClick={handleDropdown}
//                                     >
//                                         <p className="text-white text-base font-medium">About</p>
//                                         <p className="text-white text-lg">
//                                             <IoMdArrowDropdown
//                                                 size={20}
//                                                 className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
//                                             />
//                                         </p>
//                                     </div>
//                                     <ul
//                                         className={`overflow-hidden transition-all duration-300 ease-in-out ${isDropdownOpen ? 'h-full opacity-100' : 'max-h-0 opacity-0'
//                                             }`}
//                                     >
//                                         <li className="h-10 flex hover:bg-blue-600 items-center px-4 border-t border-gray-200">
//                                             <p className="text-white text-sm font-medium">About Us</p>
//                                         </li>
//                                         <li className="h-10 flex hover:bg-blue-600 items-center px-4 border-t border-gray-200">
//                                             <p className="text-white text-sm font-medium">Journals</p>
//                                         </li>
//                                         <li className="h-10 flex hover:bg-blue-600 items-center px-4 border-t border-gray-200">
//                                             <p className="text-white text-sm font-medium">Open Access Policy</p>
//                                         </li>
//                                         <li className="h-10 flex hover:bg-blue-600 items-center px-4 border-t border-gray-200">
//                                             <p className="text-white text-sm font-medium">Contact Us</p>
//                                         </li>

//                                     </ul>
//                                 </li>
//                                 <li className="h-9 flex bg-blue-500 hover:bg-blue-600 justify-between items-center px-4 rounded-md cursor-pointer transition-colors duration-200">
//                                     <p className="text-white text-base font-medium">Our Policies</p>
//                                     <p className="text-white text-lg">
//                                         <FaUserEdit title="Editor" />
//                                     </p>
//                                 </li>
//                                 <li className="h-9 flex bg-blue-500 hover:bg-blue-600 justify-between items-center px-4 rounded-md cursor-pointer transition-colors duration-200">
//                                     <p className="text-white text-base font-medium">Publication Ethics</p>
//                                 </li>
//                                 <li className="h-9 flex bg-blue-500 hover:bg-blue-600 justify-between items-center px-4 rounded-md cursor-pointer transition-colors duration-200">
//                                     <p className="text-white text-base font-medium">Terms and Conditions</p>
//                                 </li>
//                                 <li className="h-9 flex bg-blue-500 hover:bg-blue-600 justify-between items-center px-4 rounded-md cursor-pointer transition-colors duration-200">
//                                     <p className="text-white text-base font-medium">Privacy Policy</p>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                     <div className=" ml-[27vw] mt-4  w-[75%] h-full">
//                         <p className=" mb-4"></p>
//                         {loading && <p className="text-gray-600 mt-2">Loading journals...</p>}
//                         {error && <p className="text-red-600 mt-2">Error: {error}</p>}
//                         {!loading && !error && selectedDisciplineId && filteredJournals.length === 0 && (
//                             <p className="text-gray-600 mt-2">No journals found for the selected subject.</p>
//                         )}
//                         {Object.keys(groupedJournals).length > 0 && (
//                             <>
//                                 {Object.entries(groupedJournals).map(([letter, journalGroup], groupIndex) => (
//                                     <div key={letter}>
//                                         {/* <p className="mt-6 text-2xl font-bold text-gray-800 mb-2">{disciplineName}</p> */}
//                                         {journalGroup.map((journal, index) => {
//                                             const aboutHtml = journal.about || '<p>No description available</p>';
//                                             const isExpanded = expanded[journal.journalId || `${letter}-${index}`] || false;

//                                             const tempDiv = document.createElement('div');
//                                             tempDiv.innerHTML = aboutHtml;
//                                             const plainText = tempDiv.textContent || tempDiv.innerText || '';
//                                             const lines = plainText.split('\n').filter(line => line.trim());

//                                             const displayLines = isExpanded ? lines : lines.slice(0, 2);
//                                             const hasMore = lines.length > 2;
//                                             const journalAbbrevation = getJournalAbbrevation(journal);

//                                             return (
//                                                 <div key={journal.journalId || `${letter}-${index}`}>
//                                                     <div className="flex items-center space-x-6 h-auto">
//                                                         <div className="w-1/4 my-6">
//                                                             <img
//                                                                 className="w-[180px] h-[230px] object-contain cursor-pointer"
//                                                                 src={`https://iassrd.com:8081${journal.coverPage}`}
//                                                                 alt={journal.journalName || 'Journal cover'}
//                                                                 onClick={() => journalAbbrevation && navigate(`/journal/${journalAbbrevation}`)}
//                                                             />
//                                                         </div>
//                                                         <div className="w-full">
//                                                             <p
//                                                                 className="text-title font-bold text-lg hover:text-red-600 hover:underline cursor-pointer"
//                                                                 onClick={() => journalAbbrevation && navigate(`/journal/${journalAbbrevation}`)}
//                                                             >
//                                                                 {journal.journalName || 'Unnamed journal'}
//                                                             </p>
//                                                             <p className="text-gray-500 text-xs font-medium">
//                                                                 ISSN: {journal.issnPrint || 'N/A'} (print) | ISSN: {journal.issnOnline || 'N/A'} (Online)
//                                                             </p>
//                                                             <div className="w-full text-justify text-gray-950 text-[15px] mt-3">
//                                                                 {displayLines.map((line, i) => (
//                                                                     <p key={i}>{line}</p>
//                                                                 ))}
//                                                                 {hasMore && (
//                                                                     <p
//                                                                         className="text-sky-600 text-sm mt-2 cursor-pointer hover:text-red-600 hover:underline"
//                                                                         onClick={() => handleSeeMore(journal.journalId || `${letter}-${index}`)}
//                                                                     >
//                                                                         {isExpanded ? 'See Less' : 'See More'}
//                                                                     </p>
//                                                                 )}
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                     <div className={` ${index === journalGroup.length - 1 ? 'border-b-0' : 'border-b mt-5'}`}></div>
//                                                 </div>
//                                             );
//                                         })}
//                                     </div>
//                                 ))}
//                             </>
//                         )}
//                         {!loading && !error && journals.length === 0 && (
//                             <p className="text-gray-600 mt-2">No journals found.</p>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </HelmetProvider>
//     );
// }

// export default Listofjournals;







import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar';
import cover1 from '../../../assets/cover1.jpg';
import cover2 from '../../../assets/cover2.jpg';
import Footer from '../footer';

const BASE_URL = 'https://iassrd.com:8081/api/v1'; // Updated base URL

function Listofjournals() {
    const [disciplines, setDisciplines] = useState([]);
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState({});
    const [selectedDisciplineId, setSelectedDisciplineId] = useState(null);
    const [disname, setDisname] = useState();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const disciplinesResponse = await axios.get(`${BASE_URL}/disciplines`, {
                    headers: {},
                });
                console.log('Disciplines API Response:', disciplinesResponse.data);
                if (disciplinesResponse.data.success) {
                    const disciplinesData = disciplinesResponse.data.data || [];
                    setDisciplines(disciplinesData);
                    console.log('Discipline Data:', disciplinesData.map(d => ({
                        id: d.id || d.disciplineId,
                        name: d.disciplineName || d.name
                    })));
                } else {
                    setError('Failed to fetch disciplines: Invalid response format');
                }

                const journalsResponse = await axios.get(`${BASE_URL}/journals`, {
                    headers: {},
                });
                console.log('Journals API Response:', journalsResponse.data);
                if (journalsResponse.data.success) {
                    const journalsData = journalsResponse.data.data || [];
                    setJournals(journalsData);
                    console.log('Journal Data:', journalsData.map(j => ({
                        id: j.journalId,
                        name: j.journalName,
                        abbrevation: j.abbrevation || 'N/A',
                        disciplineId: j.disciplineId || j.discipline_id
                    })));
                } else {
                    setError((prev) => (prev ? `${prev}; Failed to fetch journals` : 'Failed to fetch journals'));
                }
            } catch (err) {
                setError(`Error fetching data: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.log('Selected Discipline ID:', selectedDisciplineId);
        console.log('Filtered Journals:', filteredJournals);
    }, [selectedDisciplineId]);

    const sortedDisciplines = [...disciplines].sort((a, b) =>
        (a.disciplineName || a.name || '').localeCompare(b.disciplineName || b.name || '')
    );

    const handleSeeMore = (id) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleDisciplineSelect = (id) => {
        if (id === undefined) {
            console.error('Discipline ID is undefined. Check API response for correct ID property.');
            return;
        }
        setSelectedDisciplineId(id === selectedDisciplineId ? null : id);
        console.log('Selected Discipline ID:', id);
    };

    const filteredJournals = selectedDisciplineId
        ? journals.filter(journal => {
            if (!journal.disciplineId && !journal.discipline_id) {
                console.warn(`Journal ${journal.journalName} has no disciplineId or discipline_id`);
                return false;
            }
            const journalDisciplineId = journal.disciplineId || journal.discipline_id;
            return String(journalDisciplineId) === String(selectedDisciplineId);
        })
        : journals;

    const groupedJournals = filteredJournals.reduce((acc, journal) => {
        const letter = journal.journalName ? journal.journalName.charAt(0).toUpperCase() : 'I';
        acc[letter] = acc[letter] || [];
        acc[letter].push(journal);
        return acc;
    }, {});

    const disciplineName = disciplines.find(
        (dis) => (dis.id || dis.disciplineId) === selectedDisciplineId
    )?.disciplineName || 'All Journals';
    console.log('Selected Discipline Name:', disciplineName);

    // Helper function to get a valid abbrevation
    const getJournalAbbrevation = (journal) => {
        const abbr = journal.abbrevation;
        if (!abbr) {
            console.warn(`No abbrevation found for journal: ${journal.journalName}. Navigation skipped.`);
            return null; // Prevent navigation if abbrevation is missing
        }
        return abbr;
    };

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
        { name: 'Contact Us', path: '/contact-us' }
    ];


    return (
        <HelmetProvider>
            <Helmet>
                <title>Journals - IASSRD</title>
                <meta name="description" content="Browse our collection of journals and disciplines" />
            </Helmet>
            <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
            {isSearchOpen && (
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10"
                    aria-hidden="true"
                ></div>
            )}
            <div className={`px-[80px] py-[30px] ${isSearchOpen ? "mt-[160px]" : "mt-[80px]"}`}>
                <div className="flex">
                    <div className="w-[25vw] mr-4">
                <p className="text-3xl text-gray-800 font-bold mb-1">Journals</p>
                        <p className="border-t border-gray-400 mb-4"></p>
                        {/* {/* <p className="text-gray-800 text-lg font-bold">Menu</p> */} 
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
                        {loading && <p className="text-gray-600 mt-2">Loading journals...</p>}
                        {error && <p className="text-red-600 mt-2">Error: {error}</p>}
                        {!loading && !error && selectedDisciplineId && filteredJournals.length === 0 && (
                            <p className="text-gray-600 mt-2">No journals found for the selected subject.</p>
                        )}
                        {Object.keys(groupedJournals).length > 0 && (
                            <>
                                {Object.entries(groupedJournals).map(([letter, journalGroup], groupIndex) => (
                                    <div key={letter}>
                                        {/* <p className=" text-2xl font-bold text-gray-800 mb-2">{disciplineName}</p> */}
                                        {journalGroup.map((journal, index) => {
                                            const aboutHtml = journal.about || '<p>No description available</p>';
                                            const isExpanded = expanded[journal.journalId || `${letter}-${index}`] || false;

                                            const tempDiv = document.createElement('div');
                                            tempDiv.innerHTML = aboutHtml;
                                            const plainText = tempDiv.textContent || tempDiv.innerText || '';
                                            const lines = plainText.split('\n').filter(line => line.trim());

                                            const displayLines = isExpanded ? lines : lines.slice(0, 2);
                                            const hasMore = lines.length > 2;
                                            const journalAbbrevation = getJournalAbbrevation(journal);

                                            return (
                                                <div key={journal.journalId || `${letter}-${index}`}>
                                                    <div className="flex items-center space-x-6 h-auto">
                                                        <div className="w-1/4 my-6">
                                                            <img
                                                                className="w-[180px] h-[230px] object-contain cursor-pointer"
                                                                src={`https://iassrd.com:8081${journal.coverPage}`}
                                                                alt={journal.journalName || 'Journal cover'}
                                                                onClick={() => journalAbbrevation && navigate(`/journal/${journalAbbrevation}`)}
                                                            />
                                                        </div>
                                                        <div className="w-full">
                                                            <p
                                                                className="text-title font-bold text-lg hover:text-red-600 hover:underline cursor-pointer"
                                                                onClick={() => journalAbbrevation && navigate(`/journal/${journalAbbrevation}`)}
                                                            >
                                                                {journal.journalName || 'Unnamed journal'}
                                                            </p>
                                                            {(journal.issnPrint || journal.issnOnline) && (
                                                                <p className="text-gray-500 text-xs font-medium">
                                                                    ISSN: {journal.issnPrint || 'N/A'} (print) | ISSN: {journal.issnOnline || 'N/A'} (Online)
                                                                </p>
                                                            )}

                                                            <div className="w-full text-justify text-gray-950 text-[15px] mt-3">
                                                                {displayLines.map((line, i) => (
                                                                    <p key={i}>{line}</p>
                                                                ))}
                                                                {hasMore && (
                                                                    <p
                                                                        className="text-sky-600 text-sm mt-2 cursor-pointer hover:text-red-600 hover:underline"
                                                                        onClick={() => handleSeeMore(journal.journalId || `${letter}-${index}`)}
                                                                    >
                                                                        {isExpanded ? 'See Less' : 'See More'}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={` ${index === journalGroup.length - 1 ? 'border-b-0' : 'border-b mt-5'}`}></div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </>
                        )}
                        {!loading && !error && journals.length === 0 && (
                            <p className="text-gray-600 mt-2">No journals found.</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </HelmetProvider>
    );
}

export default Listofjournals;