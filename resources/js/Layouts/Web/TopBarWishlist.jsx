import IconButton from "@/Components/Button/IconButton";
import { router, usePage } from "@inertiajs/react";
import { Badge } from "@mui/material";
import { Heart } from "lucide-react";

function TopBarWishlist() {
    const { wishlistCount } = usePage().props || 0;

    const goToWishlist = () => router.visit("/wishlist");

    return (
        <Badge badgeContent={wishlistCount} color="error" showZero>
            <IconButton onClick={goToWishlist}>
                <Heart />
            </IconButton>
        </Badge>
    );
}

export default TopBarWishlist;
