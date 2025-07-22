import { router } from "@inertiajs/react";
import { Minus, Plus } from "lucide-react";
import IconButton from "./IconButton";

function CartUpdateButton({ productId, quantity, stock }) {
    const updateQuantity = (qty) => {
        if (qty < 1) return;
        if (qty > stock) return;

        router.post(
            "/cart/update",
            {
                product_id: productId,
                quantity: qty,
                _method: "post",
            },
            {
                preserveScroll: true,
            }
        );
    };

    return (
        <div className="flex gap-2.5 items-center border rounded-lg">
            <IconButton
                className="w-auto h-auto px-3 py-1.5"
                disabled={quantity <= 1 ? true : false}
                onClick={() => updateQuantity(quantity - 1)}
            >
                <Minus />
            </IconButton>
            <span>{quantity}</span>
            <IconButton
                className="w-auto h-auto px-3 py-1.5"
                disabled={quantity >= stock ? true : false}
                onClick={() => updateQuantity(quantity + 1)}
            >
                <Plus />
            </IconButton>
        </div>
    );
}

export default CartUpdateButton;
