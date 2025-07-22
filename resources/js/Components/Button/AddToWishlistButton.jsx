import { router } from "@inertiajs/react";

export default function AddToWishlistButton({ productId, children }) {
    const toggleItem = () => {
        router.post(
            "/wishlist/toggle",
            {
                product_id: productId,
                _method: "post",
            },
            {
                preserveScroll: true,
            }
        );
    };

    return (
        <div onClick={toggleItem} className="cursor-pointer">
            {children}
        </div>
    );
}
