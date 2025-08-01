
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./footer";
import Navbar from "./navbar";
import Loader from "../common/forntendSpinner";

const APC = () => {
    const [apcData, setApcData] = useState([]);
    const [journals, setJournals] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const apcResponse = await fetch("https://iassrd.com:8081/api/v1/apcs");
                if (!apcResponse.ok) {
                    throw new Error(`APC HTTP error! Status: ${apcResponse.status}`);
                }
                const apcData = await apcResponse.json();
                let apcArray = Array.isArray(apcData) ? apcData : apcData?.data || [];
                if (!Array.isArray(apcArray)) {
                    throw new Error("Unexpected APC response format");
                }

                const journalsResponse = await fetch("https://iassrd.com:8081/api/v1/journals");
                if (!journalsResponse.ok) {
                    throw new Error(`Journals HTTP error! Status: ${journalsResponse.status}`);
                }
                const journalsData = await journalsResponse.json();
                let journalsArray = Array.isArray(journalsData) ? journalsData : journalsData?.data || [];
                if (!Array.isArray(journalsArray)) {
                    throw new Error("Unexpected journals response format");
                }
                const journalsMap = journalsArray.reduce((acc, journal) => {
                    acc[journal.journalId] = {
                        journalName: journal.journalName,
                        abbrevation: journal.abbrevation,
                    };
                    return acc;
                }, {});

                setApcData(apcArray);
                setJournals(journalsMap);
                setLoading(false);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message);
                setApcData([]);
                setLoading(false);
            }
        };

        fetchData();

        // Manual head tag management
        document.title = "Article Processing Charges (APC) - IASSRD Journals";
        const metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        metaDescription.content =
            "Explore Article Processing Charges (APC) for IASSRD journals as of May 31, 2025, including costs for Indian and foreign authors, and indexing in Google Scholar.";
        document.head.appendChild(metaDescription);

        const metaKeywords = document.createElement("meta");
        metaKeywords.name = "keywords";
        metaKeywords.content =
            "article processing charges, APC, IASSRD journals, open access publishing, Google Scholar, ResearchGate, publication fees, May 2025";
        document.head.appendChild(metaKeywords);

        const metaRobots = document.createElement("meta");
        metaRobots.name = "robots";
        metaRobots.content = "index, follow";
        document.head.appendChild(metaRobots);

        const metaAuthor = document.createElement("meta");
        metaAuthor.name = "author";
        metaAuthor.content = "IASSRD";
        document.head.appendChild(metaAuthor);

        const metaCharset = document.createElement("meta");
        metaCharset.setAttribute("charset", "UTF-8");
        document.head.appendChild(metaCharset);

        const metaViewport = document.createElement("meta");
        metaViewport.name = "viewport";
        metaViewport.content = "width=device-width, initial-scale=1.0";
        document.head.appendChild(metaViewport);

        const linkCanonical = document.createElement("link");
        linkCanonical.rel = "canonical";
        linkCanonical.href = "https://iassrd.com/apcs";
        document.head.appendChild(linkCanonical);

        // Open Graph tags
        const ogTitle = document.createElement("meta");
        ogTitle.setAttribute("property", "og:title");
        ogTitle.content = "Article Processing Charges (APC) - IASSRD Journals";
        document.head.appendChild(ogTitle);

        const ogDescription = document.createElement("meta");
        ogDescription.setAttribute("property", "og:description");
        ogDescription.content = metaDescription.content;
        document.head.appendChild(ogDescription);

        const ogType = document.createElement("meta");
        ogType.setAttribute("property", "og:type");
        ogType.content = "website";
        document.head.appendChild(ogType);

        const ogUrl = document.createElement("meta");
        ogUrl.setAttribute("property", "og:url");
        ogUrl.content = typeof window !== "undefined" ? window.location.href : "https://iassrd.com/apcs";
        document.head.appendChild(ogUrl);

        const ogImage = document.createElement("meta");
        ogImage.setAttribute("property", "og:image");
        ogImage.content = "https://iassrd.com/apc-image.jpg";
        document.head.appendChild(ogImage);

        const ogImageAlt = document.createElement("meta");
        ogImageAlt.setAttribute("property", "og:image:alt");
        ogImageAlt.content = "APC Details for IASSRD Journals";
        document.head.appendChild(ogImageAlt);

        // Twitter Card tags
        const twitterCard = document.createElement("meta");
        twitterCard.name = "twitter:card";
        twitterCard.content = "summary_large_image";
        document.head.appendChild(twitterCard);

        const twitterTitle = document.createElement("meta");
        twitterTitle.setAttribute("property", "twitter:title");
        twitterTitle.content = "Article Processing Charges (APC) - IASSRD Journals";
        document.head.appendChild(twitterTitle);

        const twitterDescription = document.createElement("meta");
        twitterDescription.setAttribute("property", "twitter:description");
        twitterDescription.content = metaDescription.content;
        document.head.appendChild(twitterDescription);

        const twitterImage = document.createElement("meta");
        twitterImage.setAttribute("property", "twitter:image");
        twitterImage.content = "https://iassrd.com/apc-image.jpg";
        document.head.appendChild(twitterImage);

        const twitterImageAlt = document.createElement("meta");
        twitterImageAlt.setAttribute("property", "twitter:image:alt");
        twitterImageAlt.content = "APC Details for IASSRD Journals";
        document.head.appendChild(twitterImageAlt);

        // Structured data (JSON-LD)
        const pageSchema = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Article Processing Charges (APC) - IASSRD Journals",
            description: metaDescription.content,
            url: typeof window !== "undefined" ? window.location.href : "https://iassrd.com/apc",
            publisher: {
                "@type": "Organization",
                name: "IASSRD",
                url: "https://iassrd.com",
            },
            mainEntity: {
                "@type": "ItemList",
                name: "Journal APC Details",
                itemListElement: apcData.map((apc, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    item: {
                        "@type": "CreativeWork",
                        name: journals[apc.journalId]?.journalName || "Unknown Journal",
                        url: `/journals/${journals[apc.journalId]?.abbrevation || ""}`,
                        offers: [
                            {
                                "@type": "Offer",
                                price: apc.apcPrice?.split(" / ")[0] || "N/A",
                                priceCurrency: "INR",
                                availability: "https://schema.org/InStock",
                                validFrom: "2025-01-01",
                                description: "APC for Indian Authors (Online Only)",
                            },
                            {
                                "@type": "Offer",
                                price: apc.apcPrice?.split(" / ")[1] || "N/A",
                                priceCurrency: "USD",
                                availability: "https://schema.org/InStock",
                                validFrom: "2025-01-01",
                                description: "APC for Foreign Authors (Online Only)",
                            },
                        ],
                    },
                })),
            },
        };

        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(pageSchema);
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(metaDescription);
            document.head.removeChild(metaKeywords);
            document.head.removeChild(metaRobots);
            document.head.removeChild(metaAuthor);
            document.head.removeChild(metaCharset);
            document.head.removeChild(metaViewport);
            document.head.removeChild(linkCanonical);
            document.head.removeChild(ogTitle);
            document.head.removeChild(ogDescription);
            document.head.removeChild(ogType);
            document.head.removeChild(ogUrl);
            document.head.removeChild(ogImage);
            document.head.removeChild(ogImageAlt);
            document.head.removeChild(twitterCard);
            document.head.removeChild(twitterTitle);
            document.head.removeChild(twitterDescription);
            document.head.removeChild(twitterImage);
            document.head.removeChild(twitterImageAlt);
            document.head.removeChild(script);
        };
    }, [apcData, journals]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="text-center py-10 text-red-600" role="alert">
                Error: {error}
            </div>
        );
    }

    return (
        <>
            <Navbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
            {isSearchOpen && (
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10"
                    aria-hidden="true"
                ></div>
            )}
            <main className={`bg-gradient-to-b from-gray-50 to-white md:px-[90px]  ${isSearchOpen ? 'mt-[185px]' : 'mt-[95px]'}`}>
                <div>
                    {/* <nav aria-label="Breadcrumb" className="mb-6 text-gray-500 text-sm mt-20">
                        <ol className="list-none inline-flex items-center space-x-1">
                            <li className="inline-flex items-center">
                                <Link to="/" className="text-blue-600 hover:underline">
                                    Home
                                </Link>
                            </li>
                            <li className="inline-flex items-center">
                                <span className="mx-1">›</span>
                                <span>Article Processing Charges (APC)</span>
                            </li>
                        </ol>
                    </nav> */}

                    <h1 className="text-3xl font-bold text-gray-900 mb-5">Article Processing Charges (APC)</h1>

                    <section aria-labelledby="introduction-heading">
                        <h2 id="introduction-heading" className="sr-only">Introduction to APC</h2>
                        <p className="text-gray-700 text-base mb-5">
                            International Academy for Social Sciences Research and Development (IASSRD) follows a fully open access
                            publishing model under the terms of the Creative Commons Attribution 4.0 License. All articles published in
                            our journals are immediately and permanently free to access by everyone. This is made possible by an article
                            processing charge (APC) collected from authors' institutes or research funding bodies to cover the costs
                            associated with various publishing services. APC details updated as of May 31, 2025.
                        </p>
                    </section>

                    <section aria-labelledby="apc-components-heading">
                        <h2 id="apc-components-heading" className="sr-only">APC Components</h2>
                        <ul className="list-disc pl-6 text-gray-700 text-base mb-5">
                            <li>
                                <strong>Editorial Work:</strong> This includes peer review, administrative support, content commissioning,
                                and journal development.
                            </li>
                            <li>
                                <strong>Technical Infrastructure and Innovation:</strong> This involves the development, maintenance, and
                                operation of our online journal systems and websites.
                            </li>
                            <li>
                                <strong>Article Production:</strong> This process includes the formatting and markup of articles and their
                                inclusion in indexing services in Google Scholar, ResearchGate, and Academia.
                            </li>
                            <li>
                                <strong>Marketing:</strong> Ensuring that readers and authors are aware of the work published in our
                                journals is crucial, hence marketing is a key component of our expenses.
                            </li>
                            <li>
                                <strong>Customer Service:</strong> Our team is always ready to respond to authors and readers, maintaining
                                a high standard of customer service.
                            </li>
                        </ul>
                    </section>

                    <section aria-labelledby="apc-transparency-heading">
                        <h2 id="apc-transparency-heading" className="sr-only">APC Transparency</h2>
                        <p className="text-gray-700 text-base mb-5">
                            The amount of the APC varies depending on the journal in which the article is published. Some journals may
                            have higher APCs due to the volume of submissions they receive. International Academy for Social Sciences
                            Research and Development (IASSRD) is committed to making publication costs as clear as possible. Therefore,
                            each journal's APC is transparently displayed on its website.
                        </p>
                    </section>

                    <section aria-labelledby="apc-table-heading">
                        <h2 id="apc-table-heading" className="text-xl font-semibold text-gray-800 mb-6">
                            Journal APC Details
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                                <thead>
                                    <tr className="bg-indigo-600">
                                        <th
                                            scope="col"
                                            className="px-4 py-3 text-left text-sm font-semibold text-white border-b border-indigo-700 bg-indigo-600"
                                        >
                                            S.No
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-sm font-semibold text-white border-b border-indigo-700 bg-indigo-700"
                                        >
                                            Name of the Journal
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-sm font-semibold text-white border-b border-indigo-700 bg-indigo-600"
                                        >
                                            Indexing Details
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-sm font-semibold text-white border-b border-indigo-700 bg-indigo-800"
                                        >
                                            APC for Authors (Online Only)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {apcData.map((apc, index) => {
                                        const [indianPrice, foreignPrice] = apc.apcPrice?.split(" / ") || ["N/A", "N/A"];
                                        return (
                                            <tr
                                                key={apc.apcId}
                                                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-indigo-50 transition-colors`}
                                            >
                                                <td className="px-4 py-2 text-sm text-gray-800 border-b border-gray-300 font-medium">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-2 text-sm text-indigo-600 border-b border-gray-300 hover:underline">
                                                    <Link
                                                        to={`/journal/${journals[apc.journalId]?.abbrevation || ""}`}
                                                        className="text-indigo-600 hover:underline"
                                                        aria-label={`Visit ${journals[apc.journalId]?.journalName || "journal"}`}
                                                    >
                                                        {journals[apc.journalId]?.journalName || ""}
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-2 text-sm text-gray-700 border-b border-gray-300 italic">
                                                    {apc.indexing2 || "N/A"}
                                                </td>
                                                <td className="px-6 py-2 text-sm text-gray-800 border-b border-gray-300 font-semibold">
                                                    {apc.apcPrice} USD
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section aria-labelledby="visit-journals-heading">
                        <h2 id="visit-journals-heading" className="sr-only">Explore More Journals</h2>
                        <p className="text-gray-700 text-base mb-8 mt-8">
                            <Link
                                to="/journals"
                                className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-300"
                                aria-label="Visit the list of journals covered by IASSRD"
                            >
                                Visit List of Journals Covered
                            </Link>
                        </p>
                    </section>

                    <section aria-labelledby="faq-heading">
                        <h2 id="faq-heading" className="text-xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
                        <h3 className="text-lg font-semibold text-blue-700 mb-2">What is an Article Processing Charge (APC)?</h3>
                        <p className="text-gray-700 text-base mb-4">
                            An APC is a fee charged to authors to cover the costs of open access publishing, including editorial work,
                            article production, and indexing.
                        </p>
                        <h3 className="text-lg font-semibold text-blue-700 mb-2">Are there any discounts or waivers available?</h3>
                        <p className="text-gray-700 text-base">
                            IASSRD offers waivers or discounts for authors from low-income countries. Contact us at{" "}
                            <a
                                href="mailto:info@iassrd.com"
                                className="text-indigo-600 hover:underline"
                                aria-label="Email info@iassrd.com for APC waiver inquiries"
                            >
                                info@iassrd.com
                            </a>{" "}
                            for more details.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default APC;