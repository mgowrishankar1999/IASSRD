function Loader() {
    return (
        <>
            <style>
                {`
          .perspective-1000 {
            perspective: 1000px;
          }
          .animate-flip-page-1 {
            animation: flipPage 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
          .animate-flip-page-2 {
            animation: flipPage 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.4s;
          }
          .animate-flip-page-3 {
            animation: flipPage 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.8s;
          }
          @keyframes flipPage {
            0% { transform: rotateY(0deg); }
            50% { transform: rotateY(-180deg); }
            100% { transform: rotateY(0deg); }
          }
        `}
            </style>
            <div className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-90 z-50">
                {/* Book Container */}
                <div className="relative w-40 h-25 perspective-1000">
                    {/* Left Cover */}
                    <div className="absolute left-0 w-20 h-25 bg-black rounded-l-md shadow-lg">
                        <div className="absolute inset-1 bg-white opacity-10 rounded-l-sm"></div>
                        <p className="absolute top-4 left-2 text-white text-xs font-serif opacity-80">Journal Book</p>
                    </div>
                    {/* Pages */}
                    <div className="absolute right-0 w-20 h-25">
                        <div className="absolute w-20 h-25 bg-white shadow-md transform origin-left animate-flip-page-1 z-30">
                            <div className="w-full h-full bg-gradient-to-l from-gray-50 to-white flex items-center justify-start">
                                <p className="text-gray-600 text-[12px] font-serif rotate180 pl-2">Journals...</p>
                            </div>
                        </div>
                        <div className="absolute w-20 h-25 bg-white shadow-md transform origin-left animate-flip-page-2 z-20">
                            <div className="w-full h-full bg-gradient-to-l from-gray-50 to-white flex items-center justify-start">
                                <p className="text-gray-600 text-[12px] font-serif rotate180 pl-2">Articles...</p>
                            </div>
                        </div>
                        <div className="absolute w-20 h-25 bg-white shadow-md transform origin-left animate-flip-page-3 z-10">
                            <div className="w-full h-full bg-gradient-to-l from-gray-50 to-white flex items-center justify-start">
                                <p className="text-gray-600 text-[12px] font-serif rotate180 pl-2">Authors...</p>
                            </div>
                        </div>
                    </div>
                    {/* Right Cover */}
                    <div className="absolute right-0 w-20 h-25 bg-black rounded-r-md shadow-lg">
                        <p className="absolute bottom-4 right-2 text-white text-xs font-serif opacity-80">Journal Book</p>
                    </div>
                    {/* Spine */}
                    <div className="absolute left-1/2 w-1 h-25 bg-blue-900 transform -translate-x-1/2"></div>
                </div>
            </div>
        </>
    );
}

export default Loader;