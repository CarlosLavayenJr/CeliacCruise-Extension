"use client";

import dynamic from "next/dynamic";

// Dynamically load FloorPlan with SSR disabled
const FloorPlan = dynamic(() => import("./FloorPlan"), { ssr: false });

const FloorPlanWrapper: React.FC = () => {
    return <FloorPlan />;
};

export default FloorPlanWrapper;
