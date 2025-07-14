import { router } from "@inertiajs/react";

export default function RemoveFromWishlistButton({ id, children }) {
    const removeFromWishlist = () => {
        router.post(
            "/wishlist/remove",
            {
                product_id: id,
                _method: "post",
            },
            {
                preserveScroll: true,
                onSuccess: () => {},
                onError: () => {},
            }
        );
    };

    return (
        <div onClick={removeFromWishlist} className="cursor-pointer">
            {children}
        </div>
    );
}
