import CartUpdateButton from "@/Components/Button/CartUpdateButton";
import IconButton from "@/Components/Button/IconButton";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import RemoveFromCartButton from "@/Components/Button/RemoveFromCartButton";
import Container from "@/Components/Common/Container";
import LinkText from "@/Components/Common/LinkText";
import Price from "@/Components/Common/Price";
import Layout from "@/Layouts/Web/Layout";
import { formatNumber } from "@/utils/formatHelper";
import { Head, router } from "@inertiajs/react";
import { ArrowRight, ShoppingCart, Trash2, Truck } from "lucide-react";

function CartPage({ cart }) {
    const cartItems = cart || [];
    const subtotal = cart?.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );
    const shipping = 0;
    const total = subtotal + shipping;

    return (
        <>
            <Head title="Your Cart" />
            <Container className="px-10 py-10">
                <h2 className="mb-10 text-xl font-bold">Your Shopping Cart</h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {cartItems.length > 0 ? (
                            <div className="rounded-xl border overflow-hidden">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.product.id}
                                        className="p-5 flex gap-5 border-b last:border-0 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex-shrink-0">
                                            <img
                                                src={item.product.image.path}
                                                alt={item.product.name}
                                                className="w-28 h-28 rounded-lg object-cover border"
                                            />
                                        </div>

                                        <div className="flex-1 flex flex-col gap-2">
                                            <div className="flex justify-between items-center">
                                                <LinkText
                                                    href={`/products/${item.product.slug}`}
                                                >
                                                    {item.product.name}
                                                </LinkText>

                                                <RemoveFromCartButton
                                                    productId={item.product.id}
                                                >
                                                    <IconButton className="text-red-600">
                                                        <Trash2 />
                                                    </IconButton>
                                                </RemoveFromCartButton>
                                            </div>

                                            <LinkText
                                                href={`/collections/${item.product.category.slug}`}
                                                className="text-sm"
                                            >
                                                {item.product.category.name}
                                            </LinkText>

                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                <Price
                                                    value={item.product.price}
                                                    className="font-semibold"
                                                />

                                                <div className="flex items-center gap-4">
                                                    <CartUpdateButton
                                                        productId={
                                                            item.product.id
                                                        }
                                                        quantity={item.quantity}
                                                        stock={
                                                            item.product.stock
                                                        }
                                                        className="border rounded-lg"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center py-16 rounded-xl border">
                                <div className="p-4 rounded-full mb-5">
                                    <ShoppingCart className="h-12 w-12 text-gray-400" />
                                </div>
                                <h3 className="text-2xl font-medium text-gray-900">
                                    Your cart is empty
                                </h3>
                                <p className="mt-2 text-gray-600 max-w-md">
                                    Looks like you haven't added any items to
                                    your cart yet
                                </p>
                                <div className="mt-8">
                                    <PrimaryButton
                                        onClick={() =>
                                            router.visit("/collections")
                                        }
                                        className="px-8 py-3"
                                    >
                                        Browse Our Products
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </PrimaryButton>
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="rounded-xl border p-5 sticky top-24">
                            <h2 className="text-lg font-semibold mb-5">
                                Order Summary
                            </h2>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span>
                                        Subtotal ({cartItems.length}{" "}
                                        {cartItems.length === 1
                                            ? "item"
                                            : "items"}
                                        )
                                    </span>
                                    <span className="font-medium text-gray-900">
                                        <Price value={subtotal} />
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Shipping
                                    </span>
                                    <span className="font-medium text-gray-900">
                                        {shipping > 0 ? (
                                            <Price value={shipping} />
                                        ) : (
                                            "Free"
                                        )}
                                    </span>
                                </div>

                                <div className="pt-4 border-t flex justify-between text-lg">
                                    <span className="font-semibold">Total</span>
                                    <span className="font-bold">
                                        K{formatNumber(total)}
                                    </span>
                                </div>
                            </div>

                            <PrimaryButton
                                className={`w-full mt-5 py-3 flex justify-center ${
                                    cartItems.length === 0
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                                onClick={() =>
                                    cartItems.length > 0 &&
                                    router.visit("/checkout")
                                }
                                disabled={cartItems.length === 0}
                            >
                                Proceed to Checkout
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </PrimaryButton>

                            <div className="mt-5 flex items-center gap-2 text-sm">
                                <Truck className="w-4 h-4" />
                                <span>Free shipping on orders</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

CartPage.layout = (page) => <Layout children={page} />;

export default CartPage;
