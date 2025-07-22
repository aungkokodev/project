import PrimaryButton from "@/Components/Button/PrimaryButton";
import Layout from "@/Layouts/Web/Layout";
import { Head, router } from "@inertiajs/react";

function MergeChoice() {
    const handleChoice = (action) => {
        router.post("/merge-choice/resolve", { action });
    };

    return (
        <div className="max-w-xl mx-auto p-10 space-y-5">
            <Head title="Merge" />
            <h1 className="text-xl font-bold">Cart & Wishlist Conflict</h1>
            <p>Choose how you'd like to resolve conflicting items:</p>

            <div className="space-y-5">
                <PrimaryButton
                    onClick={() => handleChoice("merge")}
                    className="w-full"
                >
                    🔄 Merge Both (recommended)
                </PrimaryButton>

                <PrimaryButton
                    onClick={() => handleChoice("use_session")}
                    className="w-full"
                >
                    ♻️ Keep Current (Session) Data
                </PrimaryButton>

                <PrimaryButton
                    onClick={() => handleChoice("keep_db")}
                    className="w-full"
                >
                    📦 Keep My Account Data
                </PrimaryButton>
            </div>
        </div>
    );
}

MergeChoice.layout = (page) => <Layout children={page} />;

export default MergeChoice;
