// // import React from "react";
// // import Navbar from "./navbar";

// // const Home = () => {
// //     return (
// //         <>
// //             <Navbar />
// //             <div className="h-[70vh] bg-hero mt-[90px] px-[80px] text-center">
// //                 <div class='pt-[60px] pb-[20px] text-5xl font-thin text-white'>
// //                     Once In Blue Moon
// //                 </div>
// //             </div>
// //         </>
// //     );
// // };

// // export default Home;


// import React, { useState } from "react";
// import Navbar from "./navbar";

// const Home = () => {
//     const [isSearchOpen, setIsSearchOpen] = useState(false);

//     return (
//         <>
//             <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
//             <div
//                 className={`h-[70vh] bg-hero ${isSearchOpen ? "mt-[180px] " : "mt-[90px]"} px-[80px] text-center`}
//                 role="region"
//                 aria-label="Hero section"
//             >
//                 <div className="pt-[60px] pb-[25px] text-5xl font-thin text-white">
//                     Once In Blue Moon
//                 </div>
//                 <p class='text-xl text-white font-normal'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore id ut natus ab itaque, atque est enim</p>
//                 <div class='flex space-x-4 justify-center my-12'>
//                     <button class='min-h-[25px] bg-green-600 py-[10px] px-[20px] font-medium text-white hover:bg-green-700'>Submit Your Article</button>
//                     <button class='min-h-[25px] border text-white hover:text-red-500 font-medium py-[10px] px-[20px] '> Browse our Journals</button>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Home;



// import React, { useState } from "react";
// import Navbar from "./navbar";

// import cover1 from '../../assets/cover1.jpg'
// import cover2 from '../../assets/cover2.jpg'
// import cover3 from '../../assets/cover3.jpg'

// const Home = () => {
//   const [isSearchOpen, setIsSearchOpen] = useState(false);

//   return (
//     <>
//       <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
//       <div
//         className={`h-[70vh] bg-hero ${isSearchOpen ? "mt-[180px]" : "mt-[90px]"} px-[80px] text-center text-white`}
//         role="region"
//         aria-label="Hero section"
//       >
//         <div className="pt-[60px] pb-[25px]">
//           <h1 className="text-5xl font-thin">Your Partner in Research Excellence</h1>
//           <p className="text-xl font-normal mt-4">
//             A leader in scientific publishing with over 10,000 articles published in 30+ open access journals
//           </p>
//           <div className="flex justify-center space-x-4 mt-8">
//             <button className="bg-green-600 py-2 px-4 font-medium text-white hover:bg-green-700">
//               Submit Your Article
//             </button>
//             <button className="border border-white py-2 px-4 font-medium text-white hover:text-red-500">
//               Browse our Journals
//             </button>
//           </div>
//         </div>
//         <div className="flex justify-center space-x-6 mt-14">

//           <img
//             src={cover1}
//             alt="Structural Materials & Advanced Research"
//             className="w-[170px] h-48 object-full"
//           />
//           <img
//             src={cover3}
//             alt="Structural Materials & Advanced Research"
//             className="w-[170px] h-48 object-cover"
//           />
//           <img
//             src={cover2}
//             alt="Structural Materials & Advanced Research"
//             className="w-[170px] h-48 object-cover"
//           />
//           <img
//             src={cover3}
//             alt="Structural Materials & Advanced Research"
//             className="w-[170px] h-48 object-cover"
//           />
//           <img
//             src={cover2}
//             alt="Structural Materials & Advanced Research"
//             className="w-[170px] h-48 object-cover"
//           />
//           <img
//             src={cover3}
//             alt="Structural Materials & Advanced Research"
//             className="w-[170px] h-48 object-cover"
//           />
//           <img
//             src={cover1}
//             alt="Structural Materials & Advanced Research"
//             className="w-[170px] h-48 object-cover"
//           />
//           <img
//             src={cover3}
//             alt="Current Research in Medicine"
//             className="w-[170px] h-48 object-cover"
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;



// import React, { useState, useEffect } from "react";
// import Navbar from "./navbar";
// import Announcement from "./announcement";
// import Latesttabs from "./latestTabs";
// import Footer from "./footer";
// import cover1 from "../../assets/cover1.jpg";
// import cover2 from "../../assets/cover2.jpg";
// import cover3 from "../../assets/cover3.jpg";
// import JournalContext from "../common/journalContext";
// import { useContext } from "react";



// const Home = () => {
//     const [isSearchOpen, setIsSearchOpen] = useState(false);
//     const [images, setImages] = useState([]);
//     const { journals, loading: contextLoading, error: contextError } = useContext(JournalContext);

//     console.log(journals)

//     // Static images array
//     const staticImages = [
//         { url: cover1, alt: "Structural Materials & Advanced Research" },
//         { url: cover2, alt: "Structural Materials & Advanced Research" },
//         { url: cover3, alt: "Structural Materials & Advanced Research" },
//         { url: cover1, alt: "Structural Materials & Advanced Research" },
//         { url: cover2, alt: "Structural Materials & Advanced Research" },
//         { url: cover3, alt: "Structural Materials & Advanced Research" },
//         { url: cover1, alt: "Structural Materials & Advanced Research" },
//         { url: cover3, alt: "Current Research in Medicine" },
//     ];

//     // Shuffle and select 8 images on component mount (page reload)
//     useEffect(() => {
//         const shuffleArray = (array) => {
//             const shuffled = [...array];
//             for (let i = shuffled.length - 1; i > 0; i--) {
//                 const j = Math.floor(Math.random() * (i + 1));
//                 [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//             }
//             return shuffled;
//         };
//         setImages(shuffleArray(staticImages).slice(0, 8));
//     }, []); // Empty dependency array ensures shuffle on page reload


//     return (
//         <>
//             <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
//             {isSearchOpen && (
//                 <div
//                     className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10"
//                     aria-hidden="true"
//                 ></div>
//             )}
//             <div
//                 className={`h-[70vh] w-full bg-hero flex flex-col justify-between ${isSearchOpen ? "mt-[180px]" : "mt-[90px]"} px-[80px] text-center text-white`}
//                 role="region"
//                 aria-label="Hero section"
//             >
//                 <div className="pt-[60px] pb-[25px] ">
//                     <h1 className="text-5xl font-thin">Your Partner in Research Excellence</h1>
//                     <p className="text-xl font-normal mt-4">
//                         A leader in scientific publishing with over 10,000 articles published in 30+ open access journals
//                     </p>
//                     <div className="flex justify-center space-x-4 mt-8">
//                         <a
//                             href="/submitarticle"
//                             className="bg-green-600 py-2 px-4 font-medium text-white hover:bg-green-700 rounded-md transition-all duration-300"
//                         >
//                             Submit Your Article
//                         </a>
//                         <a
//                             href="/journals"
//                             className="border border-white py-2 px-4 font-medium text-white hover:text-red-500 rounded-md transition-all duration-300"
//                         >
//                             Browse our Journals
//                         </a>
//                     </div>
//                 </div>
//                 <div className="flex justify-center space-x-6">
//                     {images.map((image, index) => (
//                         <img
//                             key={index}
//                             src={image.url}
//                             alt={image.alt}
//                             className=" cursor-pointer w-[150px] h-[170px] object-cover"
//                         />
//                     ))}
//                 </div>
//             </div>
//             <Announcement />
//             <Latesttabs />
//             <Footer />
//         </>
//     );
// };

// export default Home;



import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import JournalContext from "../common/journalContext";
import Navbar from "./navbar";
import Announcement from "./announcement";
import Latesttabs from "./latestTabs";
import Footer from "./footer";
import cover1 from "../../assets/cover1.jpg";
import cover2 from "../../assets/cover2.jpg";
import cover3 from "../../assets/cover3.jpg";



// Fallback images for journals without coverPage
const FALLBACK_IMAGES = [cover1, cover2, cover3];

// Reusable Testimonial Card Component
const TestimonialCard = ({ testimonial }) => (
    <div className="testimonial-card mb-3">
        <Link to={`/journal/${testimonial.journalAbbrevation}`}>
            <img src={testimonial.image} alt={testimonial.alt} className="cursor-pointer object-contain transition-transform duration-1000 ease-in-out hover:scale-110 origin-center" />
        </Link>
        <p>{testimonial.quote}</p>
        <h4>{testimonial.author}</h4>
    </div>
);

// Testimonial Carousel Component
const TestimonialCarousel = ({ testimonials }) => {

    console.log(testimonials)
    const scrollContainerRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);

    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);

    return (
        <div
            className="relative w-full overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={scrollContainerRef}
        >
            <style>
                {`
          @keyframes scrollTestimonials {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .scroll-container {
            display: flex;
            width: fit-content;
            animation: scrollTestimonials 230s linear infinite;
          }
          .scroll-container.paused {
            animation-play-state: paused;
          }
          .testimonial-card {
            flex: 0 0 auto;
            width: 150px;
            height:100%;
            margin-right: 30px;
            margin 
            background: rgba(255, 255, 255, 0.9);
            color: #333;
            text-align: left;
          }
          .testimonial-card img {
            width: 100%;
            object-fit: center;
            border-radius: 4px;
        
          }
        //   .testimonial-card p {
        //     font-size: 14px;
        //     margin: 10px 0;
        //   }
        //   .testimonial-card h4 {
        //     font-size: 16px;
        //     font-weight: bold;
        //     margin: 0;
        //   }
        `}
            </style>
            <div className={`scroll-container ${isPaused ? "paused" : ""}`}>
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                    <TestimonialCard key={index} testimonial={testimonial} />
                ))}
            </div>
        </div>
    );
};

// Hero Section Component
const HeroSection = ({ isSearchOpen, testimonials }) => (
    <div
        className={`h-[64vh] w-full  bg-hero flex flex-col justify-between ${isSearchOpen ? "mt-[180px]" : "mt-[90px]"
            } px-[80px] text-center text-white`}
        role="region"
        aria-label="Hero section"
    >
        <div className="pt-[30px] pb-[25px] mb-3">
            <h1 className="text-5xl font-thin">Advancing Research Globally</h1>
            <p className="text-xl font-normal mt-4">
              Over 10,000 published articles across 30+ open-access journals dedicated to academic excellence.
            </p>
            <div className="flex justify-center space-x-4 mt-8">
                <a
                    href="/submitarticle"
                    className="bg-green-600 py-2 px-4 font-medium text-white hover:bg-green-700 rounded-md transition-all duration-300"
                >
                    Submit Your Article
                </a>
                <a
                    href="/journal"
                    className="border border-white py-2 px-4 font-medium text-white hover:text-red-500 rounded-md transition-all duration-300"
                >
                    Browse our Journals
                </a>
            </div>
        </div>
        <TestimonialCarousel testimonials={testimonials} />
    </div>
);

// Main Home Component
const Home = () => {
    const { journals } = useContext(JournalContext) || { journals: [] };
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [testimonials, setTestimonials] = useState([]);

    // Generate testimonials from journal data
    useEffect(() => {
        const shuffleArray = (array) => {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        };

        // Map journals to testimonials
        const generatedTestimonials = journals.map((journal, index) => ({
            image: journal.coverPage
                ? `https://iassrd.com:8081${journal.coverPage}`
                : FALLBACK_IMAGES[index % FALLBACK_IMAGES.length],
            // quote: journal.journalName,
            // author: TESTIMONIAL_CONTENT[index % TESTIMONIAL_CONTENT.length].author,
            journalAbbrevation: journal.abbrevation,
            // alt: journal.title || "Journal Cover",
        }));

        setTestimonials(shuffleArray(generatedTestimonials));
    }, [journals]);

    return (
        <>
            <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
            {isSearchOpen && (
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10"
                    aria-hidden="true"
                ></div>
            )}
            <HeroSection isSearchOpen={isSearchOpen} testimonials={testimonials} />
            <Announcement />
            <Latesttabs />
            <Footer />
        </>
    );
};

export default Home;