import React from 'react';
import FloorPlanWrapper from './FloorPlanWrapper';

const CruisePage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <header className="bg-white shadow-sm">
                <div className="max-w-6xl mx-auto py-6 px-4">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            <span className="text-[#0072bc]">CELIAC CRUISE</span> BAHAMAS & FLORIDA
                        </h1>
                        <h2 className="text-xl text-gray-600">
                            Symphony of the Seas | Cape Liberty, NJ | July 13 - 20, 2025
                        </h2>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto py-8 px-4">
                <FloorPlanWrapper />
            </main>
        </div>
    );
};

export default CruisePage;