import { Head, Link, router } from "@inertiajs/react";
import {
    CheckCircle2,
    ChevronLeft,
    Clock,
    MapPin,
    Printer,
    Truck,
} from "lucide-react";
import Container from "@/Components/Common/Container";
import Layout from "@/Layouts/Web/Layout";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import { formatNumber } from "@/utils/formatHelper";

// Mock Data - Replace with real data from your backend
const mockOrder = {
    id: "AGRI-ORD-2023-4567",
    status: "shipped",
    date: "2023-11-25T14:30:00Z",
    estimated_delivery: "Nov 28, 2023",
    payment_method: "mobile_money",
    payment_status: "paid",
    subtotal: 1245.5,
    shipping_fee: 50.0,
    total: 1295.5,
    farming_type: "open_field",
    farming_type_label: "Open Field Farm",
    farm_name: "Green Valley Farms",
    delivery_notes: "Leave with farm manager - storage shed behind main house",

    user: {
        name: "John Farmer",
        email: "john@greenvalley.com",
        phone: "+260 97 123 4567",
        address: "Farm Block 12, Lusaka, Zambia",
    },

    items: [
        {
            id: 1,
            product: {
                id: 101,
                name: "NPK 10-20-10 Fertilizer",
                category: { name: "Fertilizers" },
                price: 245.5,
                image: { path: "/images/products/fertilizer-npk.jpg" },
                specifications: {
                    weight: "50kg bag",
                    composition: "Nitrogen 10%, Phosphorus 20%, Potassium 10%",
                },
            },
            quantity: 3,
            price: 245.5,
        },
        {
            id: 2,
            product: {
                id: 205,
                name: "Maize Seed (Drought-Resistant)",
                category: { name: "Seeds" },
                price: 120.0,
                image: { path: "/images/products/maize-seed.jpg" },
                specifications: {
                    germination_rate: "95%",
                    planting_season: "Rainy season",
                },
            },
            quantity: 5,
            price: 120.0,
        },
    ],
};

function OrderDetailsPage() {
    const order = mockOrder; // Replace with prop from backend

    return (
        <>
            <Head title={`Order #${order.id}`} />
            <Container className="px-4 py-8 sm:px-6 lg:px-8">
                {/* Back + Print Header */}
                <div className="flex justify-between items-center mb-6">
                    <Link
                        href="/orders"
                        className="flex items-center text-green-600 hover:text-green-800"
                    >
                        <ChevronLeft className="h-5 w-5" />
                        <span className="ml-1">Back to Orders</span>
                    </Link>
                    <button
                        onClick={() => window.print()}
                        className="flex items-center text-gray-500 hover:text-gray-700"
                    >
                        <Printer className="h-5 w-5 mr-1" />
                        Print
                    </button>
                </div>

                {/* Order Status Card */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <div className="flex flex-col sm:flex-row justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                Order #{order.id}
                            </h1>
                            <p className="text-gray-500 mt-1">
                                Placed on{" "}
                                {new Date(order.date).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="mt-4 sm:mt-0">
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium 
                ${
                    order.status === "shipped"
                        ? "bg-green-100 text-green-800"
                        : order.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                }`}
                            >
                                {order.status.toUpperCase()}
                            </span>
                        </div>
                    </div>

                    {/* Delivery Progress */}
                    <div className="mt-8 space-y-6">
                        <div className="flex items-start gap-4">
                            <div
                                className={`p-2 rounded-full ${
                                    [
                                        "processing",
                                        "shipped",
                                        "delivered",
                                    ].includes(order.status)
                                        ? "bg-green-100 text-green-600"
                                        : "bg-gray-100"
                                }`}
                            >
                                <CheckCircle2 className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-medium">Order Confirmed</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    {new Date(order.date).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div
                                className={`p-2 rounded-full ${
                                    ["shipped", "delivered"].includes(
                                        order.status
                                    )
                                        ? "bg-green-100 text-green-600"
                                        : "bg-gray-100"
                                }`}
                            >
                                <Truck className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-medium">Shipped</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    {order.status === "shipped"
                                        ? `Estimated delivery: ${order.estimated_delivery}`
                                        : "Preparing your agricultural supplies"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Order Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Products List */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">
                                Agricultural Products
                            </h2>
                            <div className="divide-y divide-gray-200">
                                {order.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="py-4 flex flex-col sm:flex-row justify-between"
                                    >
                                        <div className="flex items-start gap-4">
                                            <img
                                                src={item.product.image.path}
                                                alt={item.product.name}
                                                className="w-16 h-16 object-cover rounded border"
                                            />
                                            <div>
                                                <Link
                                                    href={`/products/${item.product.id}`}
                                                    className="font-medium hover:text-green-600"
                                                >
                                                    {item.product.name}
                                                </Link>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {item.product.category.name}
                                                </p>
                                                {/* Agri-specific specs */}
                                                <div className="mt-2 text-sm">
                                                    {item.product.specifications
                                                        ?.weight && (
                                                        <p>
                                                            Weight:{" "}
                                                            {
                                                                item.product
                                                                    .specifications
                                                                    .weight
                                                            }
                                                        </p>
                                                    )}
                                                    {item.product.specifications
                                                        ?.composition && (
                                                        <p>
                                                            Composition:{" "}
                                                            {
                                                                item.product
                                                                    .specifications
                                                                    .composition
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 sm:mt-0 text-right">
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
                        </div>

                        {/* Farm Delivery Info */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                                <MapPin className="text-green-600" />
                                Farm Delivery Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">
                                        Farm Name
                                    </h3>
                                    <p className="mt-1">{order.farm_name}</p>
                                    <p className="text-gray-600 capitalize">
                                        {order.farming_type.replace("_", " ")}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">
                                        Contact
                                    </h3>
                                    <p className="mt-1">{order.user.phone}</p>
                                    <p className="text-gray-600">
                                        {order.user.email}
                                    </p>
                                </div>
                            </div>
                            {order.delivery_notes && (
                                <div className="mt-4">
                                    <h3 className="text-sm font-medium text-gray-500">
                                        Special Instructions
                                    </h3>
                                    <p className="mt-1 bg-yellow-50 p-2 rounded">
                                        {order.delivery_notes}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Summary */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">
                                Order Summary
                            </h2>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Subtotal
                                    </span>
                                    <span>K{formatNumber(order.subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Shipping
                                    </span>
                                    <span>
                                        K{formatNumber(order.shipping_fee)}
                                    </span>
                                </div>
                                <div className="border-t border-gray-200 pt-4 flex justify-between">
                                    <span className="font-medium">Total</span>
                                    <span className="font-bold text-lg">
                                        K{formatNumber(order.total)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">
                                Payment Method
                            </h2>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-50 rounded-full">
                                    {order.payment_method === "mobile_money" ? (
                                        <svg
                                            className="h-6 w-6 text-green-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            {/* Mobile money icon */}
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                            />
                                        </svg>
                                    ) : (
                                        <Wallet className="h-6 w-6 text-green-600" />
                                    )}
                                </div>
                                <div>
                                    <p className="font-medium capitalize">
                                        {order.payment_method.replace("_", " ")}
                                    </p>
                                    <p className="text-sm text-gray-500 capitalize">
                                        {order.payment_status}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Continue Shopping */}
                        <PrimaryButton
                            as="a"
                            onClick={() => router.visit("/collections")}
                            className="w-full flex justify-center"
                        >
                            Continue Shopping
                        </PrimaryButton>

                        {/* Support Contact */}
                        <div className="text-center text-sm text-gray-500 mt-4">
                            <p>Need help with your order?</p>
                            <Link
                                href="/contact"
                                className="text-green-600 hover:text-green-800"
                            >
                                Contact our farm support
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

OrderDetailsPage.layout = (page) => <Layout children={page} />;

export default OrderDetailsPage;
