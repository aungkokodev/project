import { Head } from "@inertiajs/react";
import Footer from "./Footer";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

function Layout({ children, title, breadcrumbs }) {
    return (
        <div className="w-screen h-dvh overflow-hidden grid grid-cols-[240px_1fr] bg-white text-gray-600">
            <Head title={title} />
            <SideBar />
            <div className="overflow-auto">
                <TopBar breadcrumbs={breadcrumbs} />
                <main className="p-10 pt-0 min-h-[calc(100vh-128px)]">
                    <div className="p-10 rounded-xl bg-gray-50">{children}</div>
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default Layout;
