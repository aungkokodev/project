import { Link, router, usePage } from "@inertiajs/react";
import {
    FavoriteBorderOutlined,
    GrassOutlined,
    PersonOutline,
    SearchOutlined,
    ShoppingBagOutlined,
} from "@mui/icons-material";
import { Badge, Drawer } from "@mui/material";
import { useState } from "react";

import { ShoppingCart, X } from "lucide-react";

const CartDrawer = ({ cartOpen, setCartOpen, cart }) => {
    const removeItem = (productId) => {
        router.post(
            route("cart.remove"),
            { product_id: productId },
            {
                preserveScroll: true,
                onSuccess: () => {
                    // Optional: Show toast notification
                },
            }
        );
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity > 0) {
            router.post(
                route("cart.update"),
                {
                    product_id: productId,
                    quantity: newQuantity,
                },
                {
                    preserveScroll: true,
                }
            );
        }
    };
    console.log(cart);

    return (
        <Drawer
            open={cartOpen}
            onClose={() => setCartOpen(false)}
            className="relative z-50"
            anchor="right"
        >
            <div className="w-full sm:w-96 h-full bg-white flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        <h2 className="text-lg font-semibold">Your Cart</h2>
                        {cart.length > 0 && (
                            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                                {cart.reduce(
                                    (total, item) => total + item.quantity,
                                    0
                                )}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={() => setCartOpen(false)}
                        className="p-1 rounded-full hover:bg-gray-100"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500">
                            <ShoppingCart className="w-12 h-12 mb-4 text-gray-300" />
                            <p className="text-lg">Your cart is empty</p>
                            <button
                                onClick={() => setCartOpen(false)}
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div
                                    key={item.product_id}
                                    className="flex gap-4 p-3 border rounded-lg"
                                >
                                    <img
                                        src={
                                            item.product?.image?.path ||
                                            "/placeholder-product.jpg"
                                        }
                                        alt={item.product?.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <h3 className="font-medium">
                                                {item.product?.name ||
                                                    "Product"}
                                            </h3>
                                            <button
                                                onClick={() =>
                                                    removeItem(item.product_id)
                                                }
                                                className="text-gray-400 hover:text-red-500"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <p className="text-gray-600 mb-2">
                                            ${item.product?.price}
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.product_id,
                                                        item.quantity - 1
                                                    )
                                                }
                                                className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.product_id,
                                                        item.quantity + 1
                                                    )
                                                }
                                                className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="border-t p-4">
                        <div className="flex justify-between mb-4">
                            <span className="font-medium">Subtotal</span>
                            <span className="font-semibold">
                                $
                                {cart
                                    .reduce(
                                        (sum, item) =>
                                            sum +
                                            (item.product?.price || 0) *
                                                item.quantity,
                                        0
                                    )
                                    .toFixed(2)}
                            </span>
                        </div>
                        <Link
                            // href={route("checkout")}
                            className="block w-full py-3 px-4 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700"
                        >
                            Proceed to Checkout
                        </Link>
                        <button
                            onClick={() => setCartOpen(false)}
                            className="mt-2 w-full py-2 px-4 text-center text-blue-600 hover:text-blue-800"
                        >
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </Drawer>
    );
};

function Header() {
    const { auth, cart } = usePage().props;

    const [cartOpen, setCartOpen] = useState(false);
    let role = null;

    if (auth?.user) role = auth.user.role;
    const accountUrl = !role
        ? "/l"
        : role === "admin"
        ? "/admin/dashboard"
        : "/profile";

    const cartCount = cart?.reduce((c, i) => c + i.quantity, 0) || 0;

    console.log(cart);
    return (
        <header className="h-16 p-5 flex gap-5 items-center">
            <h1
                className="flex gap-2.5 items-center text-lg font-bold me-auto cursor-pointer"
                onClick={() => router.visit("/")}
            >
                <GrassOutlined className="w-10 h-10 text-green-600" />
                <span className="text-2xl mt-1">Agri Supply</span>
            </h1>
            <SearchOutlined />
            <Link href={accountUrl}>
                <PersonOutline />
            </Link>
            <Badge badgeContent={0} showZero color="error">
                <FavoriteBorderOutlined />
            </Badge>
            <Badge badgeContent={cartCount} showZero color="error">
                <ShoppingBagOutlined onClick={() => setCartOpen(true)} />
            </Badge>
            <CartDrawer
                cart={cart}
                cartOpen={cartOpen}
                setCartOpen={setCartOpen}
            />
        </header>
    );
}

export default Header;
