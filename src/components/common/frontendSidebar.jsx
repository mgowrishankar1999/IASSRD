
// import React, { useState } from 'react';
// import cover1 from '../../assets/cover1.jpg';
// import { AiFillEdit } from 'react-icons/ai';
// import { FaUserEdit } from 'react-icons/fa';
// import { IoMdArrowDropdown } from 'react-icons/io';

// const Sidebar = ({ journalAbbreviation, dynamicProps }) => {
//     console.log(journalAbbreviation);
//     console.log(dynamicProps);
//     const [isDropdownopen, setIsDropdownopen] = useState(false);

//     // Toggle dropdown state
//     const handleDropdown = () => {
//         setIsDropdownopen((prev) => !prev);
//     };

//     // Base URL for navigation
//     const commonUrl = journalAbbreviation ? `/journal/${journalAbbreviation}` : '#';

//     return (
//         <>
//             <div className="w-[25vw] mr-4">
//                 <div className="w-full">
//                     <div className="relative w-[55%] h-[230px] overflow-hidden ">
//                         <img
//                             className="absolute inset-0 w-full h-full object-contain transition-transform duration-1000 ease-in-out hover:scale-110 origin-center"
//                             src={`https://iassrd.com:8081${dynamicProps?.coverPage || cover1}`}
//                             alt="Journal image"
//                         />
//                     </div>
//                 </div>


//                 <div className="w-full mt-5 flex flex-col space-y-2">
//                     <div className="min-h-[95px] flex flex-col bg-gray-100 justify-center px-4">
//                         <p className="text-gray-700 text-md">{`Abbrevation : ${dynamicProps?.abbrevation || 'N/A'}`}</p>
//                         <p className="text-gray-700 text-md">{`Frequency : ${dynamicProps?.publicationFrequency || 'N/A'}`}</p>
//                         {dynamicProps?.issnOnline && (
//                             <p className="text-gray-700 text-md">{`ISSN: ${dynamicProps.issnOnline}`}</p>
//                         )}
//                         {dynamicProps?.issnPrint && (
//                             <p className="text-gray-700 text-md">{`ISSN: ${dynamicProps.issnPrint}`}</p>
//                         )}
//                     </div>
//                     <ul className="space-y-2">
//                         <li className="h-[46px] flex bg-green-500 hover:bg-green-600 justify-between items-center px-4 cursor-pointer">
//                             <p className="text-white text-lg font-semibold">Submit Your Article</p>
//                             <p className="text-white text-lg">
//                                 <AiFillEdit title="Submission" />
//                             </p>
//                         </li>
//                         <li className="h-[46px] flex bg-blue-700 hover:bg-blue-800 justify-between items-center px-4 cursor-pointer">
//                             <p className="text-white text-lg font-semibold">Join As Editor</p>
//                             <p className="text-white text-lg font-semibold">
//                                 <FaUserEdit title="Editor" />
//                             </p>
//                         </li>
//                         <li className="h-[46px] flex bg-blue-700 hover:bg-blue-800 justify-between items-center px-4 cursor-pointer">
//                             <p className="text-white text-lg font-semibold">Current</p>
//                         </li>
//                         <li className="h-[46px] flex bg-blue-700 hover:bg-blue-800 justify-between items-center px-4 cursor-pointer">
//                             <a
//                                 href={`${commonUrl}/archive`}
//                                 className="flex w-full h-full items-center text-white text-sm font-medium no-underline hover:underline"
//                                 target="_self"
//                                 rel="noopener noreferrer"
//                             >
//                                 <p className="text-white text-lg font-semibold">Archive</p>
//                             </a>
//                         </li>
//                         <li className="flex flex-col bg-blue-700 hover:bg-blue-800 cursor-pointer">
//                             <div
//                                 className="h-[46px] flex justify-between items-center px-4"
//                                 onClick={handleDropdown}
//                             >
//                                 <p className="text-white text-lg font-semibold">About</p>
//                                 <p className="text-white text-lg font-semibold">
//                                     <IoMdArrowDropdown
//                                         size={25}
//                                         className={`transition-transform duration-600 ${isDropdownopen ? 'rotate-180' : ''}`}
//                                     />
//                                 </p>
//                             </div>
//                             <ul
//                                 className={`overflow-hidden transition-all duration-300 ${isDropdownopen ? 'h-auto' : 'max-h-0'}`}
//                             >
//                                 <li className="h-[46px] flex bg-blue-700 hover:bg-blue-800 items-center px-4 border-t border-gray-500">
//                                     <a
//                                         href={`${commonUrl}/aboutjournal`}
//                                         className="flex w-full h-full items-center text-white text-sm font-medium no-underline hover:underline"
//                                         target="_self"
//                                         rel="noopener noreferrer"
//                                     >
//                                         <p className="text-white text-sm font-medium">About The Journal</p>
//                                     </a>
//                                 </li>
//                                 <li className="h-[46px] flex bg-blue-700 hover:bg-blue-800 items-center px-4 border-t border-gray-500">
//                                     <a
//                                         href={`${commonUrl}/apc`}
//                                         className="flex w-full h-full items-center text-white text-sm font-medium no-underline hover:underline"
//                                         target="_self"
//                                         rel="noopener noreferrer"
//                                     >
//                                         <p className="text-white text-sm font-medium">APC</p>
//                                     </a>
//                                 </li>
//                                 <li className="h-[46px] flex bg-blue-700 hover:bg-blue-800 items-center px-4 border-t border-gray-500">
//                                     <a
//                                         href={`${commonUrl}/author-guidelines`}
//                                         className="flex w-full h-full items-center text-white text-sm font-medium no-underline hover:underline"
//                                         target="_self"
//                                         rel="noopener noreferrer"
//                                     >
//                                         <p className="text-white text-sm font-medium">Author Guidelines</p>
//                                     </a>
//                                 </li>
//                                 <li className="h-[46px] flex bg-blue-700 hover:bg-blue-800 items-center px-4 border-t border-gray-500">
//                                     <a
//                                         href={`${commonUrl}/editorial-board`}
//                                         className="flex w-full h-full items-center text-white text-sm font-medium no-underline hover:underline"
//                                         target="_self"
//                                         rel="noopener noreferrer"
//                                     >
//                                         <p className="text-white text-sm font-medium">Editorial Board</p>
//                                     </a>
//                                 </li>
//                             </ul>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Sidebar;



// import React, { useState } from 'react';
// import cover1 from '../../assets/cover1.jpg';
// import { AiFillEdit } from 'react-icons/ai';
// import { FaUserEdit } from 'react-icons/fa';
// import { IoMdArrowDropdown } from 'react-icons/io';
// import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// const Sidebar = ({ dynamicProps }) => {
//     const { journalAbbrevation } = useParams();
//     console.log(journalAbbrevation);
//     console.log(dynamicProps);
//     const [isDropdownopen, setIsDropdownopen] = useState(false);

//     const handleDropdown = () => {
//         setIsDropdownopen((prev) => !prev);
//     };

//     const commonUrl = `/journal/${journalAbbrevation}` ;

//     return (
//         <>
//             <div className="w-[25vw] mr-4">
//                 <div className="w-full">
//                     <div className="relative w-[55%] h-[230px] overflow-hidden ">
//                         <img
//                             className="absolute inset-0 w-full h-full object-contain transition-transform duration-1000 ease-in-out hover:scale-110 origin-center"
//                             src={`https://iassrd.com:8081${dynamicProps?.coverPage || cover1}`}
//                             alt="Journal image"
//                         />
//                     </div>
//                 </div>

//                 <div className="w-full mt-5 flex flex-col space-y-2">
//                     <div className="min-h-[95px] flex flex-col bg-gray-100 justify-center px-4">
//                         <p className="text-gray-700 text-md">{`Abbrevation: ${dynamicProps?.abbrevation || 'N/A'}`}</p>
//                         <p className="text-gray-700 text-md">{`Frequency: ${dynamicProps?.publicationFrequency || 'N/A'}`}</p>
//                         {dynamicProps?.issnOnline && (
//                             <p className="text-gray-700 text-md">{`ISSN: ${dynamicProps.issnOnline}`}</p>
//                         )}
//                         {dynamicProps?.issnPrint && (
//                             <p className="text-gray-700 text-md">{`ISSN: ${dynamicProps.issnPrint}`}</p>
//                         )}
//                     </div>
//                     <ul className="space-y-2">
//                         <li className="h-[46px] flex bg-green-500 hover:bg-green-600 justify-between items-center px-4 cursor-pointer">
//                             <p className="text-white text-lg font-semibold">Submit Your Article</p>
//                             <p className="text-white text-lg">
//                                 <AiFillEdit title="Submission" />
//                             </p>
//                         </li>
//                         <li className="h-[46px] flex bg-blue-700 hover:bg-blue-800 justify-between items-center px-4 cursor-pointer">
//                             <p className="text-white text-lg font-semibold">Join As Editor</p>
//                             <p className="text-white text-lg font-semibold">
//                                 <FaUserEdit title="Editor" />
//                             </p>
//                         </li>
//                         <li className="h-[46px] flex bg-blue-700 hover:bg-blue-800 justify-between items-center px-4 cursor-pointer">
//                             <p className="text-white text-lg font-semibold">Current</p>
//                         </li>
//                         <li className="h-[46px] flex bg-blue-700 hover:bg-blue-800 justify-between items-center px-4 cursor-pointer">
//                             <Link
//                                 to={`${commonUrl}/archive`}
//                                 className="flex w-full h-full items-center text-white text-sm font-medium no-underline hover:underline"
//                             >
//                                 <p className="text-white text-lg font-semibold">Archive</p>
//                             </Link>
//                         </li>
//                         <li className="flex flex-col bg-blue-700 hover:bg-blue-800 cursor-pointer">
//                             <div
//                                 className="h-[46px] flex justify-between items-center px-4"
//                                 onClick={handleDropdown}
//                             >
//                                 <p className="text-white text-lg font-semibold">About</p>
//                                 <p className="text-white text-lg font-semibold">
//                                     <IoMdArrowDropdown
//                                         size={25}
//                                         className={`transition-transform duration-600 ${isDropdownopen ? 'rotate-180' : ''}`}
//                                     />
//                                 </p>
//                             </div>
//                             <ul
//                                 className={`overflow-hidden transition-all duration-300 ${isDropdownopen ? 'h-auto' : 'max-h-0'}`}
//                             >
//                                 <li className="h-[46px] flex bg-blue-700 hover:bg-blue-800 items-center px-4 border-t border-gray-500">
//                                     <Link
//                                         to={`${commonUrl}/aboutjournal`}
//                                         className="flex w-full h-full items-center text-white text-sm font-medium no-underline hover:underline"
//                                     >
//                                         <p className="text-white text-sm font-medium">About The Journal</p>
//                                     </Link>
//                                 </li>
//                                 <li className="h-[46px] flex bg-blue-700 hover:bg-blue-800 items-center px-4 border-t border-gray-500">
//                                     <Link
//                                         to={`${commonUrl}/apc`}
//                                         className="flex w-full h-full items-center text-white text-sm font-medium no-underline hover:underline"
//                                     >
//                                         <p className="text-white text-sm font-medium">APC</p>
//                                     </Link>
//                                 </li>
//                                 <li className="h-[46px] flex bg-blue-700 hover:bg-blue-800 items-center px-4 border-t border-gray-500">
//                                     <Link
//                                         to={`${commonUrl}/author-guidelines`}
//                                         className="flex w-full h-full items-center text-white text-sm font-medium no-underline hover:underline"
//                                     >
//                                         <p className="text-white text-sm font-medium">Author Guidelines</p>
//                                     </Link>
//                                 </li>
//                                 <li className="h-[46px] flex bg-blue-700 hover:bg-blue-800 items-center px-4 border-t border-gray-500">
//                                     <Link
//                                         to={`${commonUrl}/editorial-board`}
//                                         className="flex w-full h-full items-center text-white text-sm font-medium no-underline hover:underline"
//                                     >
//                                         <p className="text-white text-sm font-medium">Editorial Board</p>
//                                     </Link>
//                                 </li>
//                             </ul>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Sidebar;



import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import cover1 from '../../assets/cover1.jpg';
import { AiFillEdit } from 'react-icons/ai';
import { FaUserEdit } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';

const Sidebar = ({ journalAbbrevation: propJournalAbbrevation, dynamicProps }) => {
    const { journalAbbrevation: paramJournalAbbrevation } = useParams();
    const journalAbbrevation = propJournalAbbrevation || paramJournalAbbrevation;

    // console.log('Prop journalAbbrevation:', propJournalAbbrevation);
    // console.log('Param journalAbbrevation:', paramJournalAbbrevation);
    // console.log('Selected journalAbbrevation:', journalAbbrevation);
    // console.log('dynamicProps:', dynamicProps);

    const [isDropdownopen, setIsDropdownopen] = useState(true);

    const handleDropdown = () => {
        setIsDropdownopen((prev) => !prev);
    };

    const commonUrl = journalAbbrevation ? `/journal/${journalAbbrevation}` : '#';

    return (
        <>
            <div className="w-[25vw] mr-4">
                <div className="w-full">
                    <div className="relative w-[55%] h-[230px] overflow-hidden">
                        <img
                            className="absolute inset-0 w-full h-full object-contain transition-transform duration-1000 ease-in-out hover:scale-110 origin-center"
                            src={`https://iassrd.com:8081${dynamicProps?.coverPage || cover1}`}
                            alt="Journal image"
                        />
                    </div>
                </div>

                <div className="w-full mt-5 flex flex-col space-y-2">
                    {/* <div className="min-h-[95px] flex flex-col bg-gray-100 justify-center px-4">
                        <p className="text-gray-700 text-md">{`Abbrevation: ${dynamicProps?.abbrevation || 'N/A'}`}</p>
                        <p className="text-gray-700 text-md">{`Frequency: ${dynamicProps?.publicationFrequency || 'N/A'}`}</p>
                        {dynamicProps?.issnOnline && (
                            <p className="text-gray-700 text-md">{`ISSN: ${dynamicProps.issnOnline}`}</p>
                        )}
                        {dynamicProps?.issnPrint && (
                            <p className="text-gray-700 text-md">{`ISSN: ${dynamicProps.issnPrint}`}</p>
                        )}
                    </div> */}
                    <ul className="space-y-2">
                        <li className="h-[46px] flex bg-green-500 hover:bg-green-600 justify-between items-center px-4 cursor-pointer">
                            <Link
                                to={`/submitarticle`}
                                className="flex w-full h-full items-center text-white text-sm font-medium no-underline hover:underline"
                            >
                                <p className="text-white text-lg font-semibold">Submit Your Article</p>
                            </Link>
                            <p className="text-white text-lg">
                                <AiFillEdit title="Submission" />
                            </p>
                        </li>

                        <li className="h-[46px] flex bg-blue-700 hover:bg-blue-800 justify-between items-center px-4 cursor-pointer">
                            <Link
                                to={`${commonUrl}/currentissue`}
                                className="flex w-full h-full items-center text-white text-sm font-medium no-underline hover:underline"
                            >

                                <p className="text-white text-lg font-semibold">Current</p>
                            </Link>
                        </li>
                        <li className="h-[46px] flex bg-blue-700 hover:bg-blue-800 justify-between items-center px-4 cursor-pointer">
                            <Link
                                to={`${commonUrl}/archive`}
                                className="flex w-full h-full items-center text-white text-sm font-medium no-underline hover:underline"
                            >
                                <p className="text-white text-lg font-semibold">Archive</p>
                            </Link>
                        </li>
                        <li className="h-[46px] flex bg-blue-700 hover:bg-blue-800 items-center px-4 border-t border-gray-500">
                            <Link
                                to={`/joinus-editorial`}
                                className="flex w-full h-full items-center text-white text-sm font-medium no-underline hover:underline"
                            >
                                <p className="text-white text-lg font-medium">Join as Editor</p>
                            </Link>
                        </li>
                        <li className="flex flex-col bg-blue-700 hover:bg-blue-800 cursor-pointer">
                            <div
                                className="h-[46px] flex justify-between items-center px-4"
                                onClick={handleDropdown}
                            >
                                <p className="text-white text-lg font-semibold">About</p>
                                <p className="text-white text-lg font-semibold">
                                    <IoMdArrowDropdown
                                        size={25}
                                        className={`transition-transform duration-600 ${isDropdownopen ? 'rotate-180' : ''}`}
                                    />
                                </p>
                            </div>
                            <ul
                                className={`overflow-hidden transition-all duration-300 ${isDropdownopen ? 'h-auto' : 'max-h-0'}`}
                            >
                                <li className="h-[46px] flex bg-blue-700 hover:bg-blue-800 items-center px-4 border-t border-gray-500">
                                    <Link
                                        to={`${commonUrl}/aboutjournal`}
                                        className="flex w-full h-full items-center text-white text-sm font-medium no-underline hover:underline"
                                    >
                                        <p className="text-white text-sm font-medium">About The Journal</p>
                                    </Link>
                                </li>
                                <li className="h-[46px] flex bg-blue-700 hover:bg-blue-800 items-center px-4 border-t border-gray-500">
                                    <Link
                                        to={`${commonUrl}/apc`}
                                        className="flex w-full h-full items-center text-white text-sm font-medium no-underline hover:underline"
                                    >
                                        <p className="text-white text-sm font-medium">APC</p>
                                    </Link>
                                </li>
                                <li className="h-[46px] flex bg-blue-700 hover:bg-blue-800 items-center px-4 border-t border-gray-500">
                                    <Link
                                        to={`${commonUrl}/author-guidelines`}
                                        className="flex w-full h-full items-center text-white text-sm font-medium no-underline hover:underline"
                                    >
                                        <p className="text-white text-sm font-medium">Author Guidelines</p>
                                    </Link>
                                </li>
                                <li className="h-[46px] flex bg-blue-700 hover:bg-blue-800 items-center px-4 border-t border-gray-500">
                                    <Link
                                        to={`${commonUrl}/editorial-board`}
                                        className="flex w-full h-full items-center text-white text-sm font-medium no-underline hover:underline"
                                    >
                                        <p className="text-white text-sm font-medium">Editorial Board</p>
                                    </Link>
                                </li>
                                <li className="h-[46px] flex bg-blue-700 hover:bg-blue-800 items-center px-4 border-t border-gray-500">
                                    <Link
                                        to={`${commonUrl}/subjectarea`}
                                        className="flex w-full h-full items-center text-white text-sm font-medium no-underline hover:underline"
                                    >
                                        <p className="text-white text-sm font-medium">Subject Area</p>
                                    </Link>
                                </li>

                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Sidebar;