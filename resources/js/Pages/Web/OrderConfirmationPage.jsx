import PrimaryButton from "@/Components/Button/PrimaryButton";
import Container from "@/Components/Common/Container";
import Layout from "@/Layouts/Web/Layout";
import { formatNumber } from "@/utils/formatHelper";
import { Head, router } from "@inertiajs/react";
import { CheckCircle2, Clock, MapPin, Phone, Truck, User } from "lucide-react";

function OrderConfirmationPage({ order }) {
    return (
        <>
            <Head title="Order Confirmation" />
            <Container className="px-10 py-10">
                <div className="text-center mb-10">
                    <CheckCircle2 className="mx-auto h-16 w-16 text-green-600" />
                    <h1 className="text-2xl font-bold text-gray-800 mt-4">
                        Order Placed Successfully!
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Your agricultural supplies are on the way to your home
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                        Order #:{" "}
                        <span className="font-medium">
                            {order.order_number}
                        </span>
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                        <Truck className="text-green-600" />
                        Delivery Progress
                    </h2>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div
                                className={`p-2 rounded-full ${
                                    order.status === "processing"
                                        ? "bg-green-100 text-green-600"
                                        : "bg-gray-100"
                                }`}
                            >
                                <Clock className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-medium">
                                    Preparing Your Order
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    In progress
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div
                                className={`p-2 rounded-full ${
                                    order.status === "shipped"
                                        ? "bg-green-100 text-green-600"
                                        : "bg-gray-100"
                                }`}
                            >
                                <Truck className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-medium">Order Delivery</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Will update when shipped
                                </p>
                                {order.notes && (
                                    <p className="text-sm bg-yellow-50 p-2 mt-2 rounded">
                                        <span className="font-medium">
                                            Your instructions:
                                        </span>{" "}
                                        {order.notes}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                        <MapPin className="text-green-600" />
                        Delivery Address
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">
                                Recipient
                            </h3>
                            <p className="mt-1 flex items-center">
                                <User /> {order.shipping_address.fullname}
                            </p>
                            <p className="text-gray-600 flex items-center">
                                <Phone />
                                {order.shipping_address.phone ??
                                    order.user.phone}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">
                                Address
                            </h3>
                            <p className="mt-1">
                                {order.shipping_address.street},{" "}
                                {order.shipping_address.city},{" "}
                                {order.shipping_address.state}
                            </p>
                            <p className="text-gray-600">
                                {order.shipping_address.zip_code},{" "}
                                {order.shipping_address.country}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                        Your Agricultural Items
                    </h2>
                    <div className="divide-y divide-gray-200">
                        {order.items.map((item) => (
                            <div
                                key={item.id}
                                className="py-4 flex justify-between items-center"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.product.image.path}
                                        alt={item.product.name}
                                        className="w-16 h-16 object-cover rounded border"
                                    />
                                    <div>
                                        <p className="font-medium">
                                            {item.product.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {item.product.category?.name}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p>
                                        K{formatNumber(item.price)} ×{" "}
                                        {item.quantity}
                                    </p>
                                    <p className="font-medium">
                                        K
                                        {formatNumber(
                                            item.price * item.quantity
                                        )}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-200 pt-4 mt-4">
                        <div className="flex justify-between py-2">
                            <span>Subtotal</span>
                            <span>K{formatNumber(+order.total_amount)}</span>
                        </div>
                        {/* <div className="flex justify-between py-2">
                                <span>Shipping</span>
                                <span>K{formatNumber(order.shipping_fee)}</span>
                            </div> */}
                        <div className="flex justify-between py-2 font-bold text-lg">
                            <span>Total</span>
                            <span>K{formatNumber(+order.total_amount)}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <PrimaryButton
                        className="flex-1 max-w-md"
                        as="a"
                        onClick={() => router.visit("/collections")}
                    >
                        Continue Shopping
                    </PrimaryButton>
                    {/* <PrimaryButton
                        className="flex-1 max-w-md"
                        variant="outline"
                        as="a"
                        onClick={() => router.visit(`/orders/${order.id}`)}
                    >
                        View Order Details
                    </PrimaryButton> */}
                </div>
            </Container>
        </>
    );
}

OrderConfirmationPage.layout = (page) => <Layout children={page} />;

export default OrderConfirmationPage;
