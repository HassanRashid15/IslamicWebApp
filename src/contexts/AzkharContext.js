import React, { createContext, useContext, useState, useEffect } from 'react';

const AzkharContext = createContext();

export const useAzkhar = () => {
    const context = useContext(AzkharContext);
    if (!context) {
        throw new Error('useAzkhar must be used within an AzkharProvider');
    }
    return context;
};

export const AzkharProvider = ({ children }) => {
    const [selectedAzkhars, setSelectedAzkhars] = useState([]);
    const [dailyAzkharCompleted, setDailyAzkharCompleted] = useState(false);

    useEffect(() => {
        // Load selected azkhars from localStorage on mount
        const stored = localStorage.getItem('selectedAzkhars');
        const dailyCompleted = localStorage.getItem('dailyAzkharShown');
        
        if (stored) {
            try {
                setSelectedAzkhars(JSON.parse(stored));
            } catch (error) {
                console.error('Error loading selected azkhars:', error);
            }
        }
        
        setDailyAzkharCompleted(!!dailyCompleted);
    }, []);

    const updateSelectedAzkhars = (azkhars) => {
        setSelectedAzkhars(azkhars);
        localStorage.setItem('selectedAzkhars', JSON.stringify(azkhars));
    };

    const markDailyCompleted = () => {
        setDailyAzkharCompleted(true);
        localStorage.setItem('dailyAzkharShown', 'true');
    };

    const resetDailyAzkhar = () => {
        setDailyAzkharCompleted(false);
        localStorage.removeItem('dailyAzkharShown');
        setSelectedAzkhars([]);
        localStorage.removeItem('selectedAzkhars');
    };

    const value = {
        selectedAzkhars,
        dailyAzkharCompleted,
        updateSelectedAzkhars,
        markDailyCompleted,
        resetDailyAzkhar
    };

    return (
        <AzkharContext.Provider value={value}>
            {children}
        </AzkharContext.Provider>
    );
};

export default AzkharContext;
