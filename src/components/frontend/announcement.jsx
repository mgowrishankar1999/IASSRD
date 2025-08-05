// import React from "react";

// const Announcement = () => {


//     return (
//         <>
//             <div class='px-[80px] pt-[30px] bg-gray-50 max-h-[380px]'>
//                 <div class='flex justify-between'>
//                     <p class='text-2xl text-gray-700 font-medium mb-[20px]'>Announcements</p>
//                     <p class='text-lg font-bold text-gray-700 '>View more</p>
//                 </div>

//             </div>
//         </>
//     )
// }

// export default Announcement


// import React from "react";
// import { FaArrowRightLong } from "react-icons/fa6";

// const Announcement = () => {
//     const announcements = [
//         {
//             title: "Call for Papers",
//             // heading: "Call for Papers",
//             content:
//                 "We are delighted to announce the appointment of.",
//         },
//         {
//             title: "Join as Editor",
//             // heading: "Join as Editor",
//             content:
//                 "Research and Development (IASSRD) is a leading publisher of 55 open-access, peer-reviewed journals in the fields of Social and Sciences. Our mission is to provide a platform for researchers, academics and professionals",
//         },
//         {
//             title: "Join as Memeber",
//             // heading: "Join as Memeber",
//             content:
//                 "The International Academy for Social Sciences Research and Development (IASSRD) is dedicated to fostering innovation and collaboration in social sciences. Our fellow membership program connects researchers, academics, and professionals worldwide.",
//         },
//     ];

//     return (
//         <div className="px-[80px] py-[30px] bg-gray-50 max-h-[380px] ">
//             <div className="flex justify-between items-center mb-[20px]">
//                 <p className="text-2xl text-gray-700 font-medium">Announcements</p>
//                 <div className="flex items-center space-x-2 group">
//                     {/* <p className="text-lg font-bold text-gray-700 cursor-pointer group-hover:text-blue-600">
//                         View more
//                     </p> */}
//                     {/* <FaArrowRightLong className="text-gray-700 hover:text-blue-600 cursor-pointer  group-hover:text-blue-600" /> */}
//                 </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {announcements.map((announcement, index) => (
//                     <div
//                         key={index}
//                         className="bg-white group  max-h-[320px] border-t-4 border-blue-800 !rounded p-4 rounded  hover:shadow-md transition-shadow duration-200"
//                     >
//                         <h3 className="  text-red-500 text-[14px] font-semibold mb-2 ">
//                             {announcement.title}
//                         </h3>

//                         <div class='flex flex-col items-center justify-between h-[140px] '>


//                             {/* <h4 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-blue-700 cursor-pointer">
//                             {announcement.heading}
//                         </h4> */}
//                             <p className="text-gray-700 text-sm leading-relaxed">
//                                 {announcement.content}
//                             </p>
//                             <button onClick={() => alert('sdfdf')} class='text-blue-600 hover:text-blue-700 hover:underline'>Learn More</button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Announcement;

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import JournalContext from "../common/journalContext";

const Announcement = () => {
    const [callForPapersUrl, setCallForPapersUrl] = useState('');
    const { journals, loading: contextLoading, error: contextError } = useContext(JournalContext);
    const [loading, setLoading] = useState(contextLoading);
    const [error, setError] = useState(contextError);
    const [issueMonth , setIssueMonth] = useState('');
    const [issueYear, setIssueYear] = useState(''); 

    useEffect(() => {
        const fetchCallForPapers = async () => {
            try {
                const response = await fetch('https://iassrd.com:8081/api/v1/call-for-papers');
                const data = await response.json();
                console.log(data);
                if (data.success && data.data.length > 0) {
                    const filePath = data.data[0].file;
                    setCallForPapersUrl(`https://iassrd.com/uploads${filePath}`);
                    setIssueMonth(data.data[0].issueMonth);
                    setIssueYear(data.data[0].issueYear);
                }
            } catch (error) {
                console.error('Error fetching call for papers:', error);
            }
        };

        fetchCallForPapers();
    }, []);

    const handleCallForPapers = () => {
        if (callForPapersUrl) {
            window.open(callForPapersUrl, '_blank');
        }
    };

    const announcements = [
        {
            title: "Call for Papers",
            content:
                "We are delighted to announce the call for papers for our upcoming journal issue. Submit your original research by the deadline to contribute to advancing social sciences. Our peer-reviewed process ensures high-quality publications.",
            action: "button",
        },
        {
            title: "Join as Editor",
            content:
                `The International Academy for Social Sciences Research and Development (IASSRD) is a leading publisher of ${journals?.length} open-access, peer-reviewed journals in the fields of Social and Sciences. Our mission is to provide a platform for researchers, academics, and professionals.`,
            path: "/joinus-editorial",
            action: "link",
        },
        {
            title: "Join as Member",
            content:
                "The International Academy for Social Sciences Research and Development (IASSRD) is dedicated to fostering innovation and collaboration in social sciences. Our fellow membership program connects researchers, academics, and professionals worldwide.",
            path: "/joinus-fellowmember",
            action: "link",
        },
    ];

    return (
        <div className="px-[80px] py-[30px] bg-gray-50 max-h-[380px]">
            <div className="flex justify-between items-center mb-[20px]">
                <p className="text-2xl text-gray-700 font-medium">Announcements</p>
                <div className="flex items-center space-x-2 group">
                    {/* <p className="text-lg font-bold text-gray-700 cursor-pointer group-hover:text-blue-600">
                        View more
                    </p> */}
                    {/* <FaArrowRightLong className="text-gray-700 hover:text-blue-600 cursor-pointer group-hover:text-blue-600" /> */}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {announcements.map((announcement, index) => (
                    <div
                        key={index}
                        className="bg-white group max-h-[320px] border-t-4 border-blue-800 rounded p-4 hover:shadow-md transition-shadow duration-200"
                    >
                        <h3 className="text-red-500 text-[16px] font-semibold mb-2">
                            {announcement.title}
                        </h3>
                        <div className="flex flex-col items-center justify-between h-[140px]">
                            <p className="text-gray-700 text-sm leading-relaxed">
                                {announcement.content}
                            </p>
                            {announcement.action === "button" ? (
                                <button
                                    onClick={handleCallForPapers}
                                    disabled={!callForPapersUrl}
                                    className={`text-white px-2  py-1 bg-blue-500 hover:text-gray-100 rounded ${!callForPapersUrl ? 'opacity-100 cursor-not-allowed' : ''
                                        }`}
                                >
                                    Call for Paper {issueMonth && issueYear ? `${issueMonth} ${issueYear}` : ''}
                                </button>
                            ) : (
                                <Link
                                    to={announcement.path}
                                    className="text-blue-600 hover:text-blue-700 hover:underline"
                                >
                                    Learn More
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Announcement;