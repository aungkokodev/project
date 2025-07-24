import IconButton from "@/Components/Button/IconButton";
import { router, usePage } from "@inertiajs/react";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { Badge } from "@mui/material";

function TopBarWishlist() {
    const { wishlist = [] } = usePage().props;

    const goToWishlist = () => router.visit("/wishlist");

    return (
        <Badge badgeContent={wishlist.length} color="success" showZero>
            <IconButton onClick={goToWishlist}>
                <FavoriteBorderOutlined />
            </IconButton>
        </Badge>
    );
}

export default TopBarWishlist;
