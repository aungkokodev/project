import { router, usePage } from "@inertiajs/react";

export default function AddToCartButton({ productId, disabled, children }) {
    const { cart = [] } = usePage().props;

    const item = cart.find((item) => item.product.id == productId);

    let quantity = 0;
    let stock = 1;

    if (item) {
        quantity = item.quantity;
        stock = item.product.stock;
    }

    const isDisabled = quantity >= stock;

    const addItem = () => {
        router.post(
            "/cart/add",
            {
                product_id: productId,
                quantity: 1,
                _method: "post",
            },
            {
                preserveScroll: true,
            }
        );
    };

    return (
        <div
            onClick={isDisabled ? undefined : addItem}
            className={
                isDisabled || disabled
                    ? "pointer-events-none opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
            }
        >
            {children}
        </div>
    );
}
