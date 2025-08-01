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
            heading: "Energy Research Journal welcomes new Editor-in-Chief",
            content:
                "We are delighted to announce that Dr. Erdem Cuce has joined Energy Research Journal as the new Editor-in-Chief. Dr. Cuce is a distinguished researcher in sustainable energy technologies, with over 200 scientific publications and a legacy of impactful contributions to the field.",
        },
        {
            title: "Announcement",
            heading: "SGAMR 2020 Award Winners",
            content:
                "It is with great pleasure that we announce the SGAMR Annual Awards 2020. This award is given annually to Researchers and Reviewers of International Journal of Structural Glass and Advanced Materials Research (SGAMR) who have shown innovative contributions and promising research, as well as others who have excelled in their Editorial duties.",
        },
        {
            title: "Announcement",
            heading: "Special Issue on Neuroinflammation and COVID-19 Announced",
            content:
                'This special issue "Neuroinflammation and COVID-19" aims to provide a space for debate in the face of the growing evidence on the affectation of the nervous system by COVID-19, supported by original studies and case series.',
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