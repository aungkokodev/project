import Footer from "./Footer";
import NavBar from "./NavBar";
import TopBar from "./TopBar";

function Layout({ children }) {
    return (
        <div className="w-full min-h-dvh bg-white text-gray-600">
            <TopBar />
            <NavBar />
            <main className="min-h-[calc(100vh-192px)]">{children}</main>
            <Footer />
        </div>
    );
}

export default Layout;
