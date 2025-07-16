import IconButton from "@/Components/Button/IconButton";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import LinkText from "@/Components/Common/LinkText";
import { formatNumber } from "@/utils/formatHelper";
import { router, usePage } from "@inertiajs/react";
import { Badge, Drawer } from "@mui/material";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { useState } from "react";

function TopBarCart() {
    const { cart } = usePage().props;

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let count = 0;
    let total = 0;

    const exists = cart && cart.length > 0;

    if (exists) {
        count = cart.reduce((c, i) => c + i.quantity, 0);
        total = cart.reduce(
            (c, i) => c + parseInt(i.product.price) * i.quantity,
            0
        );
    }

    const removeItem = (id) => {
        router.post("/cart/remove", {
            product_id: id,
            _method: "post",
        });
    };

    const updateQuantity = (id, qty) => {
        router.post("/cart/update", {
            product_id: id,
            quantity: qty,
            _method: "post",
        });
    };

    const goToCheckout = () => {
        setOpen(false);
        router.visit("/checkout");
    };

    const goToCart = () => {
        setOpen(false);
        router.visit("/cart");
    };

    const goToProduct = (slug) => `/products/${slug}`;

    return (
        <>
            <Badge badgeContent={count} showZero color="error">
                <IconButton onClick={handleOpen}>
                    <ShoppingCart />
                </IconButton>
            </Badge>

            <Drawer open={open} onClose={handleClose} anchor="right">
                <div className="w-xs md:w-sm lg:w-md h-full flex flex-col bg-white">
                    <div className="h-16 px-5 flex gap-5 items-center border-b">
                        <h2>Shopping Cart</h2>
                        <span className="me-auto text-gray-600">{count}</span>
                        <IconButton onClick={handleClose}>
                            <X />
                        </IconButton>
                    </div>
                    <div className="flex-1 overflow-y-auto p-5">
                        {exists ? (
                            <div className="space-y-5">
                                {cart.map((item) => (
                                    <div
                                        className="flex gap-5 p-5 border rounded-lg"
                                        key={item.product.id}
                                    >
                                        <img
                                            src={item.product?.image?.path}
                                            alt={item.product.name}
                                            className="w-16 h-16 object-cover"
                                        />
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="flex justify-between">
                                                <LinkText
                                                    href={goToProduct(
                                                        item.product?.slug
                                                    )}
                                                    className={"font-bold"}
                                                >
                                                    {item.product.name}
                                                </LinkText>
                                            </div>
                                            <div className="flex items-center gap-2.5">
                                                <p className="me-auto">
                                                    K
                                                    {formatNumber(
                                                        item.product.price
                                                    )}
                                                </p>
                                                <div className="flex gap-5 items-center border rounded-lg">
                                                    <IconButton
                                                        className="w-auto h-auto px-2 py-1"
                                                        disable={
                                                            item.quantity <= 1
                                                                ? "true"
                                                                : "false"
                                                        }
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.product.id,
                                                                item.quantity -
                                                                    1
                                                            )
                                                        }
                                                    >
                                                        <Minus />
                                                    </IconButton>
                                                    <span>{item.quantity}</span>
                                                    <IconButton
                                                        className="w-auto h-auto px-2 py-1"
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.product.id,
                                                                item.quantity +
                                                                    1
                                                            )
                                                        }
                                                    >
                                                        <Plus />
                                                    </IconButton>
                                                </div>
                                                <IconButton
                                                    className={
                                                        "hover:text-red-600 active:text-red-800 text-gray-400"
                                                    }
                                                    onClick={() =>
                                                        removeItem(
                                                            item.product.id
                                                        )
                                                    }
                                                >
                                                    <Trash2 />
                                                </IconButton>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-full flex flex-col gap-5 items-center justify-center">
                                <ShoppingCart className="w-20 h-20 text-gray-300" />
                                <p className="text-gray-500">
                                    Shopping cart is empty
                                </p>
                                <PrimaryButton onClick={handleClose}>
                                    Continue Shopping
                                </PrimaryButton>
                            </div>
                        )}
                    </div>

                    {exists && (
                        <div className="space-y-5 p-5 border-t">
                            <div className="flex justify-between font-bold">
                                <p>Subtotal</p>
                                <p>K{formatNumber(total)}</p>
                            </div>
                            <PrimaryButton
                                className="block w-full"
                                onClick={goToCheckout}
                            >
                                Proceed to Checkout
                            </PrimaryButton>
                            <PrimaryButton
                                variant="text"
                                className="block w-full"
                                onClick={goToCart}
                            >
                                View Cart
                            </PrimaryButton>
                        </div>
                    )}
                </div>
            </Drawer>
        </>
    );
}

export default TopBarCart;
