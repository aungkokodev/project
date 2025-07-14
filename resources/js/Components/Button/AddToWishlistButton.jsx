import { router } from "@inertiajs/react";

export default function AddToWishlistButton({ id, children }) {
    const addToWishlist = () => {
        router.post(
            "/wishlist/toggle",
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
        <div onClick={addToWishlist} className="cursor-pointer">
            {children}
        </div>
    );
}
