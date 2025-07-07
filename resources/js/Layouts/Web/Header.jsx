import { Link } from "@inertiajs/react";
import {
    FavoriteBorderOutlined,
    GrassOutlined,
    PersonOutline,
    SearchOutlined,
    ShoppingBagOutlined,
} from "@mui/icons-material";

function Header() {
    return (
        <header className="h-16 p-4 flex gap-4 items-center">
            <h1 className="flex gap-2 items-center text-lg font-bold me-auto">
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
