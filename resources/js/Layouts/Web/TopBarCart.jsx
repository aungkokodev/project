import CartUpdateButton from "@/Components/Button/CartUpdateButton";
import IconButton from "@/Components/Button/IconButton";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import RemoveFromCartButton from "@/Components/Button/RemoveFromCartButton";
import LinkText from "@/Components/Common/LinkText";
import Price from "@/Components/Common/Price";
import { router, usePage } from "@inertiajs/react";
import {
    CloseOutlined,
    DeleteOutline,
    ShoppingCartCheckoutOutlined,
    ShoppingCartOutlined,
} from "@mui/icons-material";
import { Badge, Drawer } from "@mui/material";
import { useState } from "react";

function TopBarCart() {
    const { cart = [] } = usePage().props;
    const [open, setOpen] = useState(false);

    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce(
        (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
        0
    );

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const goToCheckout = () => {
        setOpen(false);
        router.visit("/checkout");
    };

    const goToCart = () => {
        setOpen(false);
        router.visit("/cart");
    };

    return (
        <>
            <Badge badgeContent={count} showZero color="success">
                <IconButton onClick={handleOpen}>
                    <ShoppingCartOutlined />
                </IconButton>
            </Badge>

            <Drawer open={open} onClose={handleClose} anchor="right">
                <div className="w-xs md:w-sm lg:w-md h-full flex flex-col bg-white text-gray-600">
                    <header className="h-16 px-5 flex gap-5 items-center border-b">
                        <IconButton onClick={goToCart}>
                            <ShoppingCartOutlined />
                        </IconButton>
                        <h2>Shopping Cart</h2>
                        <span className="me-auto">({count})</span>
                        <IconButton onClick={handleClose}>
                            <CloseOutlined />
                        </IconButton>
                    </header>

                    <main className="flex-1 overflow-y-auto p-5">
                        {count > 0 ? (
                            <div className="space-y-5">
                                {cart.map(({ product, quantity }) => (
                                    <div
                                        className="flex gap-5 p-5 border rounded-lg hover:bg-gray-50"
                                        key={product.id}
                                    >
                                        <img
                                            src={product?.image?.path}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover"
                                        />
                                        <div className="flex-1 flex flex-col gap-1 justify-between">
                                            <div className="flex items-start justify-between">
                                                <LinkText
                                                    href={`/products/${product.slug}`}
                                                    className="font-bold"
                                                >
                                                    {product.name}
                                                </LinkText>
                                                <RemoveFromCartButton
                                                    productId={product.id}
                                                >
                                                    <IconButton className="text-red-600 hover:text-red-800">
                                                        <DeleteOutline />
                                                    </IconButton>
                                                </RemoveFromCartButton>
                                            </div>
                                            <LinkText
                                                href={`/collections/${product.category?.slug}`}
                                                className="text-sm self-start"
                                            >
                                                {product.category?.name}
                                            </LinkText>
                                            <div className="flex items-center justify-between">
                                                <Price
                                                    value={product.price}
                                                    className="font-bold"
                                                />
                                                <CartUpdateButton
                                                    productId={product.id}
                                                    quantity={quantity}
                                                    stock={product.stock}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-full flex flex-col gap-5 items-center justify-center">
                                <ShoppingCartOutlined className="w-20 h-20 text-gray-300" />
                                <p>Shopping cart is empty</p>
                                <PrimaryButton onClick={handleClose}>
                                    Continue Shopping
                                </PrimaryButton>
                            </div>
                        )}
                    </main>

                    {count > 0 && (
                        <footer className="space-y-5 p-5 border-t">
                            <div className="flex justify-between font-bold">
                                <p>Subtotal</p>
                                <Price value={total} />
                            </div>
                            <PrimaryButton
                                className="block w-full"
                                onClick={goToCheckout}
                            >
                                <ShoppingCartCheckoutOutlined />
                                Proceed to Checkout
                            </PrimaryButton>
                            <PrimaryButton
                                variant="text"
                                className="block w-full"
                                onClick={goToCart}
                            >
                                View Cart
                            </PrimaryButton>
                        </footer>
                    )}
                </div>
            </Drawer>
        </>
    );
}

export default TopBarCart;
