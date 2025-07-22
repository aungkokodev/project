import { router } from "@inertiajs/react";

function RemoveFromCartButton({ productId, children }) {
    const removeItem = () => {
        router.post(
            "/cart/remove",
            { product_id: productId, _method: "post" },
            { preserveScroll: true }
        );
    };

    return (
        <div onClick={removeItem} className="cursor-pointer">
            {children}
        </div>
    );
}

export default RemoveFromCartButton;
