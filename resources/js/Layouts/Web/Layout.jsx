import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";

function Layout({ children }) {
    return (
        <div className="w-full min-h-dvh bg-slate-50 text-slate-700">
            <Header />
            <Navbar />
            <main className="min-h-[calc(100vh-192px)]">{children}</main>
            <Footer />
        </div>
    );
}

export default Layout;
