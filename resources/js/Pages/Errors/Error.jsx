import Layout from "@/Layouts/Web/Layout";
import { Head, Link, router, usePage, useRemember } from "@inertiajs/react";

export default function Error({ status, message }) {
    const errorMessages = {
        401: "Unauthorized",
        403: "Forbidden",
        404: "Page Not Found",
        419: "Page Expired",
        429: "Too Many Requests",
        500: "Server Error",
        503: "Service Unavailable",
    };

    const title = errorMessages[status] || "Error";
    const description = message || errorMessages[status] || "An error occurred";

    const page = usePage();
    return (
        <div className="min-h-[calc(100vh-192px)] flex flex-col items-center justify-center p-4">
            <Head title="Page Not Found" />
            <div className="max-w-md w-full bg-white p-8 rounded-lg">
                <h1 className="text-9xl font-bold text-center text-gray-300 mb-4">
                    {status}
                </h1>
                <h2 className="text-2xl font-semibold text-center mb-6">
                    {title}
                </h2>
                url
                <p className="text-gray-600 mb-8 text-center">{description}</p>
                <div className="text-center">
                    <button
                        onClick={() => router.get(page.props.backUrl)}
                        className="me-5 cursor-pointer inline-block px-6 py-3 border border-green-600 text-slate-800 bg-transparent rounded-lg hover:border-green-700 transition"
                    >
                        Back
                    </button>
                    <Link
                        href="/"
                        className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

Error.layout = (page) => <Layout children={page} />;
