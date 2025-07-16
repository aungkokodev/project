import Layout from "@/Layouts/Web/Layout";
import { router } from "@inertiajs/react";

function MergeChoice() {
    const handleChoice = (action) => {
        router.post("/merge-choice/resolve", { action });
    };

    return (
        <div className="max-w-xl mx-auto p-8 space-y-6">
            <h1 className="text-2xl font-bold">Cart & Wishlist Conflict</h1>
            <p className="text-gray-600">
                Choose how you'd like to resolve conflicting items:
            </p>

            <div className="space-y-4">
                <button
                    onClick={() => handleChoice("merge")}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                >
                    🔄 Merge Both (recommended)
                </button>

                <button
                    onClick={() => handleChoice("use_session")}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    ♻️ Keep Current (Session) Data
                </button>

                <button
                    onClick={() => handleChoice("keep_db")}
                    className="w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
                >
                    📦 Keep My Account Data
                </button>
            </div>
        </div>
    );
}

MergeChoice.layout = (page) => <Layout children={page} />;

export default MergeChoice;
