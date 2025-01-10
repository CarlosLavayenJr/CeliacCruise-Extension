import FloorPlanWrapper from "./components/FloorPlanWrapper";

export default function Home() {
    return (
        <div className="flex flex-col items-center min-h-screen bg-blue-50">
            <h1 className="text-4xl font-extrabold my-8 text-gray-800">
                Cruise Deck Room Picker
            </h1>
            {/* Use the wrapper to load the FloorPlan */}
            <FloorPlanWrapper />
        </div>
    );
}
