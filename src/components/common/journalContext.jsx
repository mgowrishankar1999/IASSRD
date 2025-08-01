// src/context/JournalContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const JournalContext = createContext();

export const JournalProvider = ({ children }) => {
    const [journals, setJournals] = useState([]); // Changed from {} to []
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const BASE_URL = "https://iassrd.com:8081/api/v1";

    useEffect(() => {
        const fetchJournals = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${BASE_URL}/journals`);
                console.log('API Response:', response.data); // Debug log to inspect response
                if (!response.data.success || !Array.isArray(response.data.data)) {
                    throw new Error("Invalid journals response format");
                }
                const journalsArray = response.data.data;
                setJournals(journalsArray);
                setLoading(false);
            } catch (err) {
                setError(`Error fetching journals: ${err.message}`);
                setLoading(false);
            }
        };

        fetchJournals();
    }, []);

    console.log('journals in context:', journals); // Debug log to verify journals

    return (
        <JournalContext.Provider value={{ journals, loading, error }}>
            {children}
        </JournalContext.Provider>
    );
};

export default JournalContext;