import { Link, router } from "@inertiajs/react";
import {
    FavoriteBorderOutlined,
    GrassOutlined,
    PersonOutline,
    SearchOutlined,
    ShoppingBagOutlined,
} from "@mui/icons-material";

function Header() {
    return (
        <header className="h-16 p-5 flex gap-5 items-center">
            <h1
                className="flex gap-2.5 items-center text-lg font-bold me-auto cursor-pointer"
                onClick={() => router.visit("/")}
            >
                <GrassOutlined className="w-10 h-10 text-green-600" />
                <span>Agri Supply</span>
            </h1>
            <SearchOutlined />
            <FavoriteBorderOutlined />
            <Link href={"/login"}>
                <PersonOutline />
            </Link>
            <ShoppingBagOutlined />
        </header>
    );
}

export default Header;
