// import React from "react";

// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 text-white py-6 px-[80px]">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center flex-col md:flex-row">
//           {/* <div className="mb-4 md:mb-0">
//             <p>© 2025 International Academy for Social Sciences Research and Development. All rights reserved.</p>
//             <p className="mt-1">Contact us: info@iasrd.org | Phone: +1-800-123-4567</p>
//           </div> */}
//           <div className="flex flex-col  space-y-2 md:space-y-0 md:space-x-6">
//             <a href="/" className="text-gray-600 hover:text-blue-700">Home</a>
//             <a href="/about" className="text-gray-600 hover:text-blue-700">About</a>
//             <a href="/contact" className="text-gray-600 hover:text-blue-700">Contact</a>
//             <a href="/privacy" className="text-gray-600 hover:text-blue-700">Privacy Policy</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



import React from 'react';
import Iassrdlogo from '../../assets/iassrdlogo.png'

const Footer = () => {
    return (

        <>

            <footer className="bg-gray-200 h-[55vh] px-[80px] py-4">

                <div class='flex text-center items-center mb-2 justify-center  '>
                    <div>
                        <a href="/">

                            <img class='object-contain h-20 w-24 rounded' src={Iassrdlogo} alt='iassrd Logo' />
                        </a>
                    </div>

                    <div class='text-center  mt-3 text-3xl font-bold text-gray-700'>International Academy for Social Sciences
                        Research and Development
                    </div>
                </div>
                {/* <p class='border-t mt-5 border-gray-300'></p> */}

                <div className=" border-y  border-gray-300  flex  justify-between mt-4 py-10">
                    <div class='border-r border-gray-300 pl-3 pr-10'>
                        <h3 className="text-blue-700 font-bold text-xl mb-2">| <span class='text-xl font-bold text-gray-800'>Publish with Us</span></h3>
                        <ul className="text-gray-500 space-y-2 text-md font-medium">
                            <li><a href="/journal" className="text-gray-600 hover:text-blue-700">- Journals</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-blue-700">- Open Access Policy</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-blue-700">- About Us</a></li>
                            <li><a href="/contactus" className="text-gray-600 hover:text-blue-700">- Contact Us</a></li>
                            {/* <li><a href="#" className="text-gray-600 hover:text-blue-700">- Research Topic Policy</a></li> */}
                        </ul>
                    </div>
                    <div class='border-r border-gray-300 pl-4 pr-10'>
                        <h3 className="text-blue-700 font-bold text-xl mb-2">| <span class='text-xl font-bold text-gray-800 '>Resources for</span></h3>
                        <ul className="text-gray-500 space-y-2 text-md font-medium ">
                            <li><a href="#" className=" text-gray-600 hover:text-blue-700">- Authors</a></li>
                            <li><a href="#" className=" text-gray-600 hover:text-blue-700">- Reviewers</a></li>
                            <li><a href="#" className=" text-gray-600 hover:text-blue-700">- Editors</a></li>
                            <li><a href="#" className=" text-gray-600 hover:text-blue-700">- Subscribers</a></li>
                            {/* <li><a href="#" className=" text-gray-600 hover:text-blue-700">- For Subscribers</a></li> */}
                        </ul>
                    </div>
                    <div class='border-r border-gray-300 pl-4 pr-10'>
                        {/* <h3 className="text-blue-700 font-bold">| Follow Us</h3> */}
                        <h3 className="text-blue-700 font-bold text-xl mb-2">| <span class='text-xl font-bold text-gray-800 '>Publishing Standards</span></h3>

                        <ul className="text-gray-500 space-y-2 text-md font-medium ">
                            <li><a href="#" className=" text-gray-600 hover:text-blue-700">- Our Policies</a></li>
                            <li><a href="#" className=" text-gray-600 hover:text-blue-700">- Publication Ethics</a></li>
                            <li><a href="#" className=" text-gray-600 hover:text-blue-700">- Terms and Conditions</a></li>
                            <li><a href="#" className=" text-gray-600 hover:text-blue-700">- Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        {/* <h3 className="text-blue-700 font-bold">Contact Us <span className="text-blue-700">✔</span></h3> */}
                        <h3 className="text-blue-700 font-bold text-xl mb-2">| <span class='text-xl font-bold text-gray-800 '>Connect</span></h3>
                        <div className="flex  flex-col justify-between items-center  space-y-4">
                            <a href="#"><img src="https://img.icons8.com/ios-filled/50/000000/mail.png" alt="Email" className="w-6 h-6" /></a>
                            <a href="#"><img src="https://img.icons8.com/ios-filled/50/000000/marker.png" alt="Location" className="w-6 h-6" /></a>
                            <a href="#"><img src="https://img.icons8.com/ios-filled/50/000000/phone.png" alt="Phone" className="w-6 h-6" /></a>
                        </div>
                    </div>
                </div>
            </footer>
            <div class=' flex  py-4  justify-center items-center space-x-2 font-semibold bg-gray-200'>
                <p className="text-center text-gray-700 text-sm md:text-[16px] ">©  IASSRD 2025 All rights reserved (Chennai , Tamilnadu, India)</p>
                <p className="text-center text-gray-700 text-sm md:text-[16px] mt-1"> </p>
            </div>
        </>
    );
};

export default Footer;