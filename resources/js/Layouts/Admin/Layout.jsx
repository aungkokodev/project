import { Head, usePage } from "@inertiajs/react";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

// Done
function Layout({ children, title }) {
    console.log("layout render");

    return (
        <div className="w-screen h-dvh overflow-hidden grid grid-cols-[240px_1fr] bg-white text-slate-600">
            <Head title={title} />
            <Sidebar />
            <div className="overflow-auto">
                <Topbar title={title} />
                <main className="p-10 min-h-[calc(100vh-128px)]">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default Layout;
