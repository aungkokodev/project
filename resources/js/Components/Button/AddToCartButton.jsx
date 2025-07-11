import { router } from "@inertiajs/react";

export default function AddToCartButton({ id, children }) {
    const addToCart = () => {
        router.post(
            "/cart",
            {
                product_id: id,
                quantity: 1,
                _method: "post",
            },
            {
                preserveScroll: true,
                onSuccess: () => {},
                onError: () => {},
            }
        );
    };

    return <div onClick={addToCart}>{children}</div>;
}
