"use client";

import React from 'react';
import FloorPlan from '@/app/components/FloorPlan';

const FloorPlanWrapper = () => {
    return (
        <div className="w-full bg-white rounded-lg shadow-lg p-6">
            {/* Room Categories Table */}
            <div className="mb-8 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[#0072bc] text-white">
                            <th className="px-6 py-3 text-left">CATEGORY</th>
                            <th className="px-6 py-3 text-left">PRICE</th>
                            <th className="px-6 py-3 text-left">AVAILABILITY</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 text-gray-500">Balcony</td>
                            <td className="px-6 py-4 text-[#0072bc]">$1,899</td>
                            <td className="px-6 py-4 text-gray-500">AVAILABLE</td>
                        </tr>
                        <tr className="bg-gray-50">
                            <td className="px-6 py-4 text-gray-500">Oceanview (Obstructed)</td>
                            <td className="px-6 py-4 text-[#0072bc]">$1,499</td>
                            <td className="px-6 py-4 text-gray-500">AVAILABLE</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 text-gray-500">Inside</td>
                            <td className="px-6 py-4 text-[#0072bc]">$1,399</td>
                            <td className="px-6 py-4 text-gray-500">AVAILABLE</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Floor Plan Viewer */}
            <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Deck Plans</h3>
                <FloorPlan />
            </div>

            {/* Booking Information */}
            <div className="mt-8 space-y-4 text-center text-gray-700">
                <p className="font-semibold">
                    A $250 per person deposit is due at time of booking. Deposits are non-refundable and non-transferrable.
                </p>
                <p className="font-semibold">
                    Final payment is due no later than 3/1/2025.
                </p>
                <p>
                    Secure your reservation today and one of our travel specialists will contact you to confirm your reservation as quickly as possible.
                </p>
            </div>
        </div>
    );
};

export default FloorPlanWrapper;