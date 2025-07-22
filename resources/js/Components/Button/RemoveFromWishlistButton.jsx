import { router } from "@inertiajs/react";

export default function RemoveFromWishlistButton({ productId, children }) {
    const removeItem = () => {
        router.post(
            "/wishlist/remove",
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
        <div onClick={removeItem} className="cursor-pointer">
            {children}
        </div>
    );
}
