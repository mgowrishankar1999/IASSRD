

import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import { FaBook, FaResearchgate, FaLinkedin, FaOrcid, FaGithub } from "react-icons/fa";
import { SiScopus, SiSsrn, SiAcademia } from "react-icons/si";
import { MdWeb } from "react-icons/md";
import defaultimage from "../../assets/defaultprofile.jpg";
import Loader from "../common/forntendSpinner";

const FellowMembership = () => {
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Fellow Members");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch members data and normalize membershipType
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://iassrd.com:8081/api/v1/memberships");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const membersArray = Array.isArray(data) ? data : data?.data || [];
        if (!Array.isArray(membersArray)) {
          throw new Error("Unexpected response format");
        }
        // Normalize membershipType and name
        const normalizedMembers = membersArray.map((member) => ({
          ...member,
          membershipType: member.membershipType?.trim() === "Honorary Fellow Membership"
            ? "Honorary Fellow Member"
            : member.membershipType?.trim() || "Unknown",
          name: member.name?.trim() || "Unknown",
        }));
        console.log("Normalized members:", normalizedMembers); // Debug: Log normalized data
        setMembers(normalizedMembers);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setMembers([]);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter members based on category and search query
  const filteredMembers = useMemo(() => {
    console.log("Filtering with category:", selectedCategory, "and search:", searchQuery); // Debug
    let result = [...members];

    // Filter by category (case-insensitive comparison)
    if (selectedCategory) {
      result = result.filter((member) => {
        const membershipType = (member.membershipType || "").toLowerCase();
        const category = selectedCategory.toLowerCase();
        console.log("Checking member:", member.name, "type:", membershipType, "against category:", category); // Debug
        return membershipType === category;
      });
    }

    // Filter by search query
    if (searchQuery) {
      result = result.filter((member) => {
        const name = (member.name || "").toLowerCase();
        const query = searchQuery.toLowerCase().trim();
        return name.includes(query);
      });
    }

    console.log("Filtered members:", result); // Debug
    return result;
  }, [members, selectedCategory, searchQuery]);

  // Handle category change
  const handleCategoryChange = (category) => {
    console.log("Selected category:", category); // Debug
    setSelectedCategory(category);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search on Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(e.target.value);
    }
  };

  // Validate URL
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return (
      <div className="text-center py-10 text-red-600 font-semibold" role="alert">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-8 px-6 sm:px-6 lg:px-24 bg-gradient-to-b from-gray-100 to-gray-50">
        <div className="max-w-8xl mx-auto mt-20">
          {/* Header and Search Bar */}
          <div className="bg-navbar-gradient from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">Fellow Memberships</h1>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:w-auto flex-1">
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-2 border-2 border-transparent bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-300"
                  aria-label="Search members by name"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* Category Buttons */}
          <nav className="mb-8 flex flex-wrap gap-3 justify-center" aria-label="Membership Categories">
            {[
              "Fellow Members",
              "Senior Fellow Member",
              "Executive Fellow Member",
              "Honorary Fellow Member",
              "Advisory Members",
            ].map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-5 py-2 rounded-lg shadow-md text-white font-semibold transition-all duration-300 transform hover:scale-105 ${selectedCategory === category
                  ? `bg-gradient-to-r from-blue-600 to-blue-800 from-${category === "Fellow Members"
                    ? "blue"
                    : category === "Advisory Members"
                      ? "green"
                      : category === "Senior Fellow Member"
                        ? "teal"
                        : category === "Executive Fellow Member"
                          ? "purple"
                          : category === "Honorary Fellow Member"
                            ? "pink"
                            : "blue"
                  }-600 to-${category === "Fellow Members"
                    ? "blue"
                    : category === "Advisory Members"
                      ? "green"
                      : category === "Senior Fellow Member"
                        ? "teal"
                        : category === "Executive Fellow Member"
                          ? "purple"
                          : category === "Honorary Fellow Member"
                            ? "pink"
                            : "blue"
                  }-800`
                  : "bg-indigo-500 hover:bg-indigo-600"
                  }`}
                aria-current={selectedCategory === category ? "true" : "false"}
              >
                {category}
              </button>

            ))}
            <Link
              to="/join"
              className="px-5 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 hover:scale-105 transition-all duration-300 font-semibold"
              aria-label="Join the membership program"
            >
              Join Us
            </Link>
          </nav>

          {/* Members List */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-labelledby="members-list-heading">
            <h2 id="members-list-heading" className="sr-only">Members List</h2>
            {filteredMembers.length === 0 ? (
              <div className="text-center text-gray-600 col-span-full font-medium py-8">
                No members found for the selected category or search query.
              </div>
            ) : (
              filteredMembers.map((member, index) => (
                <article
                  key={member.membershipId}
                  className={`border rounded-xl p-5 shadow-lg bg-white hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in ${index % 2 === 0 ? "border-indigo-200" : "border-teal-200"
                    }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={`https://iassrd.com/uploads${member.photo}`}
                      alt={`${member.name || "Member"}'s profile picture`}
                      className="w-24 h-24 object-cover rounded-full shadow-md border-2 border-indigo-100"
                      onError={(e) => {
                        e.target.src = defaultimage;
                      }}
                      loading="lazy"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-indigo-900 mb-1">{member.name}</h3>
                      <p className="text-sm text-gray-600 italic">Affiliation: {member.affiliation || "N/A"}</p>
                      <p className="text-sm font-semibold text-teal-700">Category: {member.membershipType}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {member.googleScholarLink && isValidUrl(member.googleScholarLink) && (
                          <a
                            href={member.googleScholarLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 transform hover:scale-110 transition-transform duration-200"
                            title="Google Scholar"
                            aria-label={`${member.name}'s Google Scholar Profile`}
                          >
                            <FaBook size={30} />
                          </a>
                        )}
                        {member.researchgateLink && isValidUrl(member.researchgateLink) && (
                          <a
                            href={member.researchgateLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-800 transform hover:scale-110 transition-transform duration-200"
                            title="ResearchGate"
                            aria-label={`${member.name}'s ResearchGate Profile`}
                          >
                            <FaResearchgate size={30} />
                          </a>
                        )}
                        {member.academiaLink && isValidUrl(member.academiaLink) && (
                          <a
                            href={member.academiaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 transform hover:scale-110 transition-transform duration-200"
                            title="Academia"
                            aria-label={`${member.name}'s Academia Profile`}
                          >
                            <SiAcademia size={30} />
                          </a>
                        )}
                        {member.orcid && isValidUrl(member.orcid) && (
                          <a
                            href={member.orcid}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-500 hover:text-green-700 transform hover:scale-110 transition-transform duration-200"
                            title="ORCID"
                            aria-label={`${member.name}'s ORCID Profile`}
                          >
                            <FaOrcid size={30} />
                          </a>
                        )}
                        {member.ssrn && isValidUrl(member.ssrn) && (
                          <a
                            href={member.ssrn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-600 hover:text-orange-800 transform hover:scale-110 transition-transform duration-200"
                            title="SSRN"
                            aria-label={`${member.name}'s SSRN Profile`}
                          >
                            <SiSsrn size={30} />
                          </a>
                        )}
                        {member.github && isValidUrl(member.github) && (
                          <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-800 hover:text-gray-900 transform hover:scale-110 transition-transform duration-200"
                            title="GitHub"
                            aria-label={`${member.name}'s GitHub Profile`}
                          >
                            <FaGithub size={30} />
                          </a>
                        )}
                        {member.institutionProfileLink && isValidUrl(member.institutionProfileLink) && (
                          <a
                            href={member.institutionProfileLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700 transform hover:scale-110 transition-transform duration-200"
                            title="Institution Profile"
                            aria-label={`${member.name}'s Institution Profile`}
                          >
                            <MdWeb size={30} />
                          </a>
                        )}
                        {member.scopusLink && isValidUrl(member.scopusLink) && (
                          <a
                            href={member.scopusLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-600 hover:text-red-800 transform hover:scale-110 transition-transform duration-200"
                            title="Scopus"
                            aria-label={`${member.name}'s Scopus Profile`}
                          >
                            <SiScopus size={30} />
                          </a>
                        )}
                        {member.wosLink && isValidUrl(member.wosLink) && (
                          <a
                            href={member.wosLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 hover:text-blue-900 transform hover:scale-110 transition-transform duration-200"
                            title="Web of Science / LinkedIn"
                            aria-label={`${member.name}'s Web of Science or LinkedIn Profile`}
                          >
                            <FaLinkedin size={30} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FellowMembership;