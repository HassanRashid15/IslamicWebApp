import React from 'react';
import { useAzkhar } from '../../../contexts/AzkharContext';

const AzkharResetButton = () => {
    const { resetDailyAzkhar } = useAzkhar();

    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset your daily azkhar selection? This will show the azkhar modal again on your next visit.')) {
            resetDailyAzkhar();
            window.location.reload();
        }
    };

    return (
        <button
            onClick={handleReset}
            className="fixed bottom-4 right-4 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-emerald-700 transition-colors text-sm z-40"
            title="Reset Daily Azkhar"
        >
            Reset Azkhar
        </button>
    );
};

export default AzkharResetButton;
