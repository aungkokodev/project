import Container from "@/Components/Common/Container";
import Logo from "@/Components/Common/Logo";
import TopBarAccount from "@/Layouts/Web/TopBarAccount";
import TopBarCart from "./TopBarCart";
import TopBarWishlist from "./TopBarWishlist";

function TopBar() {
    return (
        <header className="sticky top-0 z-50 bg-white shadow">
            <Container className="h-16 px-10 flex gap-5 items-center">
                <div className="me-auto">
                    <Logo />
                </div>
                <TopBarAccount />
                <TopBarWishlist />
                <TopBarCart />
            </Container>
        </header>
    );
}

export default TopBar;
