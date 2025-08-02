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


import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const Announcement = () => {
    const announcements = [
        {
            title: "Announcement",
            heading: "New Editor-in-Chief for Journal of Social Science Research",
            content:
                "We are delighted to announce the appointment of Dr. Amara Singh as the new Editor-in-Chief of the Journal of Social Science Research. Dr. Singh is a renowned scholar in cultural sociology, with over 180 peer-reviewed publications and significant contributions to understanding social identity dynamics.",
        },
        {
            title: "Announcement",
            heading: "2021 Social Impact Research Awards",
            content:
                "The International Journal of Sociology and Social Policy is proud to announce the recipients of the 2021 Social Impact Research Awards. These awards honor researchers and reviewers who have demonstrated exceptional innovation and commitment to advancing knowledge in areas such as social inequality, community development, and policy analysis.",
        },
        {
            title: "Announcement",
            heading: "Special Issue on Digital Societies and Social Change",
            content:
                "The Journal of Contemporary Social Issues invites submissions for a special issue on 'Digital Societies and Social Change.' This issue aims to explore the impact of digital technologies on social structures and behaviors, encouraging original research, theoretical papers, and case studies on digital transformation in society.",
        },
    ];

    return (
        <div className="px-[80px] py-[30px] bg-gray-50 max-h-[380px] ">
            <div className="flex justify-between items-center mb-[20px]">
                <p className="text-2xl text-gray-700 font-medium">Announcements</p>
                <div className="flex items-center space-x-2 group">
                    <p className="text-lg font-bold text-gray-700 cursor-pointer group-hover:text-blue-600">
                        View more
                    </p>
                    <FaArrowRightLong className="text-gray-700 hover:text-blue-600 cursor-pointer  group-hover:text-blue-600" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {announcements.map((announcement, index) => (
                    <div
                        key={index}
                        className="bg-white group  max-h-[320px] border-t-4 border-blue-800 !rounded p-4 rounded  hover:shadow-md transition-shadow duration-200"
                    >
                        <h3 className="  text-red-500 text-[14px] font-semibold mb-2 ">
                            {announcement.title}
                        </h3>
                        <h4 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-blue-700 cursor-pointer">
                            {announcement.heading}
                        </h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                            {announcement.content}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Announcement;