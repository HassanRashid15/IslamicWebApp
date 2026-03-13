import React from 'react';
import { useAzkhar } from '../../../contexts/AzkharContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui';

const DailyAzkharDisplay = () => {
    const { selectedAzkhars } = useAzkhar();

    if (!selectedAzkhars || selectedAzkhars.length === 0) {
        return null;
    }

    return (
        <div className="mb-8">
            <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-emerald-800 flex items-center gap-2">
                        <span className="text-2xl">📿</span>
                        Your Daily Remembrance
                        <span className="text-sm bg-emerald-600 text-white px-2 py-1 rounded-full">
                            {selectedAzkhars.length} selected
                        </span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {selectedAzkhars.map((azkhar) => (
                            <div
                                key={azkhar.id}
                                className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-emerald-200 hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
                            >
                                <div className="mb-3">
                                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-semibold">
                                        {azkhar.category}
                                    </span>
                                </div>
                                
                                <div className="text-right mb-3" dir="rtl">
                                    <p className="text-lg md:text-xl text-emerald-900 font-amiri leading-relaxed">
                                        {azkhar.arabic}
                                    </p>
                                </div>

                                <div className="w-8 h-0.5 bg-emerald-300/50 mx-auto mb-2"></div>

                                <p className="text-sm text-emerald-700/80 italic text-center mb-2">
                                    {azkhar.transliteration}
                                </p>

                                <p className="text-sm text-gray-700 text-center leading-relaxed">
                                    "{azkhar.english}"
                                </p>

                                <div className="mt-3 p-2 bg-emerald-50/50 rounded-lg border border-emerald-200/50">
                                    <p className="text-xs text-emerald-600 text-center">
                                        <span className="font-semibold">Benefit:</span> {azkhar.benefit}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-6 text-center">
                        <p className="text-sm text-emerald-700/70 italic">
                            "Those who have believed and whose hearts are assured by the remembrance of Allah." 
                            <span className="block text-xs mt-1">- Surah Ar-Ra'd 13:28</span>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DailyAzkharDisplay;
