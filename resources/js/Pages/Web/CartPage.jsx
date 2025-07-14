import IconButton from "@/Components/Button/IconButton";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import Container from "@/Components/Common/Container";
import LinkText from "@/Components/Common/LinkText";
import Layout from "@/Layouts/Web/Layout";
import { formatNumber } from "@/utils/formatHelper";
import { Head, router } from "@inertiajs/react";
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

function CartPage({ cart }) {
    const cartItems = cart || [];

    const subtotal = cart?.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    const shipping = 0;
    const total = subtotal + shipping;

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

    const goToCheckout = () => "/checkout";

    return (
        <>
            <Head title="Cart" />
            <Container className="px-10 py-10">
                <h1 className="text-xl font-bold text-gray-600 mb-5 flex items-center gap-2">
                    Your Shopping Cart
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {cartItems.length > 0 ? (
                            <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.product.id}
                                        className="p-4 flex flex-col sm:flex-row gap-4"
                                    >
                                        <img
                                            src={item.product.image.path}
                                            alt={item.product.name}
                                            className="w-24 h-24 object-cover rounded-lg border"
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <div className="flex gap-1 flex-col">
                                                    <LinkText
                                                        href={`/products/${item.product.slug}`}
                                                        className="font-medium text-gray-900"
                                                    >
                                                        {item.product.name}
                                                    </LinkText>
                                                    <LinkText
                                                        href={`/collections/${item.product.category?.slug}`}
                                                        className="text-sm text-gray-500"
                                                    >
                                                        {
                                                            item.product
                                                                ?.category?.name
                                                        }
                                                    </LinkText>
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
                                            <div className="mt-4 flex items-center justify-between">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="flex gap-5 items-center border rounded-lg">
                                                        <IconButton
                                                            className="w-auto h-auto px-2 py-1"
                                                            disable={
                                                                item.quantity <=
                                                                1
                                                                    ? "true"
                                                                    : "false"
                                                            }
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.product
                                                                        .id,
                                                                    item.quantity -
                                                                        1
                                                                )
                                                            }
                                                        >
                                                            <Minus />
                                                        </IconButton>
                                                        <span>
                                                            {item.quantity}
                                                        </span>
                                                        <IconButton
                                                            className="w-auto h-auto px-2 py-1"
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.product
                                                                        .id,
                                                                    item.quantity +
                                                                        1
                                                                )
                                                            }
                                                        >
                                                            <Plus />
                                                        </IconButton>
                                                    </div>
                                                </div>
                                                <p className="font-medium">
                                                    K
                                                    {formatNumber(
                                                        item.product.price *
                                                            item.quantity
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-5 items-center text-center py-12 bg-white rounded-lg shadow">
                                <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-lg font-medium text-gray-900">
                                    Shopping cart is empty
                                </h3>
                                <p className="mt-1 text-gray-500">
                                    Start shopping to add items to your cart
                                </p>
                                <div className="mt-5">
                                    <PrimaryButton
                                        onClick={() =>
                                            router.visit("/collections")
                                        }
                                    >
                                        Browse Products
                                    </PrimaryButton>
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">
                                Order Summary
                            </h2>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Subtotal
                                    </span>
                                    <span className="font-medium">
                                        K{formatNumber(subtotal)}
                                    </span>
                                </div>
                                {/* <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Shipping
                                    </span>
                                    <span className="font-medium">
                                        K{shipping}
                                    </span>
                                </div> */}
                                <div className="border-t border-gray-200 pt-4 flex justify-between">
                                    <span className="font-medium">Total</span>
                                    <span className="font-bold text-lg">
                                        K{formatNumber(total)}
                                    </span>
                                </div>
                            </div>
                            <PrimaryButton className="w-full mt-6 flex justify-center">
                                Proceed to Checkout
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

CartPage.layout = (page) => <Layout children={page} />;

export default CartPage;
