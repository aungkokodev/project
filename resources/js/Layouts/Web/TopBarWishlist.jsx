import IconButton from "@/Components/Button/IconButton";
import { router, usePage } from "@inertiajs/react";
import { Badge } from "@mui/material";
import { Heart } from "lucide-react";

function TopBarWishlist() {
    const { wishlist = [] } = usePage().props;

    const goToWishlist = () => router.visit("/wishlist");

    return (
        <Badge badgeContent={wishlist.length} color="success" showZero>
            <IconButton onClick={goToWishlist}>
                <Heart />
            </IconButton>
        </Badge>
    );
}

export default TopBarWishlist;
