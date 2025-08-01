import React from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import Sidebar from "../../common/frontendSidebar";
import { useState } from "react";

const Aimandscope = () => {

    // for navbar--------
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    return (

        <>
            <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />


            <div className={`px-[80px] py-[30px] ${isSearchOpen ? "mt-[160px]" : "mt-[80px]"}`}>
                <div className="flex mt-8">
                    <Sidebar />


                    <div className="w-[75vw] ps-6  h-auto">
                        <p className="text-3xl text-blue-800 font-bold mb-5 ">International Journal of Data Engineering (IASSRD-IJDE) </p>
                        <p class='border-b border-gray-300 mb-8'></p>
                        <p className="text-xl text-gray-700 font-semibold mb-8">Aim and Scope</p>

                    </div>


                </div>
            </div>
            <Footer />
        </>

    )
}

export default Aimandscope