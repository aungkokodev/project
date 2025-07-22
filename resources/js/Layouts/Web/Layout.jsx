import Footer from "./Footer";
import NavBar from "./NavBar";
import TopBar from "./TopBar";

function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-600">
            <TopBar />
            <NavBar />
            <main className="flex-1 min-h-screen">{children}</main>
            <Footer />
        </div>
    );
}

export default Layout;
