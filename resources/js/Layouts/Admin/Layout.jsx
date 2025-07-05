import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

// Done
function Layout({ children }) {
    return (
        <div className="w-screen h-screen overflow-hidden grid grid-cols-[240px_1fr] bg-slate-50 text-slate-700">
            <Sidebar />
            <div className="overflow-auto">
                <Topbar />
                <main className="pb-8 px-8 min-h-[calc(100vh-128px)]">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default Layout;
