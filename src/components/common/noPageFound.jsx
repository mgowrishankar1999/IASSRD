import React, { useState } from "react";
import Navbar from "../frontend/navbar";
import Footer from '../frontend/footer'
import NopageFound from '../../assets/desk.png';



const noPageFound = () => {

    const [isSearchOpen, setIsSearchOpen] = useState(false);


    return (

        <>
            <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
            {isSearchOpen && (
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10"
                    aria-hidden="true"
                ></div>
            )}
            <div className={`px-[70px]  ${isSearchOpen ? 'mt-[150px]' : 'mt-[50px]'}`}>
                <div className="flex  items-center justify-around h-[80vh]">
                    <div >
                        <h1 className="text-6xl text-start font-bold text-center text-gray-700 mb-6 leading-tight">Oops! <br></br>Something’s Missing
                            <span class='text-red-500 text-7xl     '> :( </span>
                        </h1>
                        <p className="text-xl text-center text-gray-600 mb-6 text-start">The link you followed isn’t working. Please check the address or head back home. </p>

                    </div>
                    <div>
                        <img src={NopageFound} alt="404 Not Found" className="w-full h-auto max-w-lg mx-auto " />
                    </div>
                </div>            </div>
            <Footer />


        </>
    )
}


export default noPageFound;