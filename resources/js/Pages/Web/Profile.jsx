import { Head, Link, usePage, router } from "@inertiajs/react";
import { useState } from "react";
import {
    UserCircle,
    MapPin,
    Package,
    Star,
    Pencil,
    Trash2,
    X,
    Check,
    ChevronDown,
    ChevronRight,
    Plus,
    LogOut,
} from "lucide-react";
import Layout from "@/Layouts/Web/Layout";
import Container from "@/Components/Common/Container";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import DangerButton from "@/Components/Button/PrimaryButton";

function ProfilePage({ user }) {
    const { addresses = [], orders = [], reviews = [] } = user;
    const [activeTab, setActiveTab] = useState("orders");
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [editingAddress, setEditingAddress] = useState(null);
    const [editProfile, setEditProfile] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        phone: user.phone,
    });

    const handleCancelOrder = (orderId) => {
        if (confirm("Are you sure you want to cancel this order?")) {
            router.post(
                `/orders/${orderId}/cancel`,
                {},
                {
                    preserveScroll: true,
                    onSuccess: () => router.reload(),
                }
            );
        }
    };

    const handleDeleteAddress = (addressId) => {
        if (confirm("Delete this address?")) {
            router.delete(`/addresses/${addressId}`, {
                preserveScroll: true,
                onSuccess: () => router.reload(),
            });
        }
    };

    const handleUpdateProfile = () => {
        router.patch("/profile", formData, {
            preserveScroll: true,
            onSuccess: () => setEditProfile(false),
        });
    };

    return (
        <>
            <Head title="My Profile" />
            <Container className="px-4 py-8 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Profile Header */}
                    <div className="flex flex-col md:flex-row gap-6 mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                                <UserCircle className="w-14 h-14 text-gray-400" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">
                                    {user.name}
                                </h1>
                                <p className="text-gray-600">{user.email}</p>
                            </div>
                        </div>
                        <div className="md:ml-auto flex items-start gap-5">
                            <button
                                onClick={() => setEditProfile(!editProfile)}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
                            >
                                <Pencil className="w-5 h-5" />
                                <span>
                                    {editProfile ? "Cancel" : "Edit Profile"}
                                </span>
                            </button>
                            <button
                                onClick={() => router.post("/logout")}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>

                    {/* Edit Profile Form */}
                    {editProfile && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                            <h2 className="text-lg font-semibold mb-4">
                                Edit Profile
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                phone: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={() => setEditProfile(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <PrimaryButton onClick={handleUpdateProfile}>
                                    Save Changes
                                </PrimaryButton>
                            </div>
                        </div>
                    )}

                    {/* Navigation Tabs */}
                    <div className="border-b border-gray-200 mb-8">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                onClick={() => setActiveTab("orders")}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === "orders"
                                        ? "border-green-500 text-green-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <Package className="w-5 h-5" />
                                    My Orders
                                </div>
                            </button>
                            <button
                                onClick={() => setActiveTab("addresses")}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === "addresses"
                                        ? "border-green-500 text-green-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5" />
                                    Addresses
                                </div>
                            </button>
                            <button
                                onClick={() => setActiveTab("reviews")}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === "reviews"
                                        ? "border-green-500 text-green-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5" />
                                    My Reviews
                                </div>
                            </button>
                        </nav>
                    </div>

                    {/* Orders Tab */}
                    {activeTab === "orders" && (
                        <div className="space-y-4">
                            {orders.length === 0 ? (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                                    <Package className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                                        No orders yet
                                    </h3>
                                    <p className="text-gray-500 mb-4">
                                        Your order history will appear here
                                    </p>
                                    <PrimaryButton as="a" href="/collections">
                                        Start Shopping
                                    </PrimaryButton>
                                </div>
                            ) : (
                                orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                                    >
                                        <div
                                            className="flex items-center justify-between p-5 cursor-pointer"
                                            onClick={() =>
                                                setExpandedOrder(
                                                    expandedOrder === order.id
                                                        ? null
                                                        : order.id
                                                )
                                            }
                                        >
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <h3 className="font-medium">
                                                        Order #
                                                        {order.order_number}
                                                    </h3>
                                                    <span
                                                        className={`px-2 py-1 text-xs rounded-full ${
                                                            order.status ===
                                                            "completed"
                                                                ? "bg-green-100 text-green-800"
                                                                : order.status ===
                                                                  "cancelled"
                                                                ? "bg-red-100 text-red-800"
                                                                : "bg-yellow-100 text-yellow-800"
                                                        }`}
                                                    >
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {new Date(
                                                        order.created_at
                                                    ).toLocaleDateString()}{" "}
                                                    • K{order.total_amount}
                                                </p>
                                            </div>
                                            {expandedOrder === order.id ? (
                                                <ChevronDown className="w-5 h-5 text-gray-400" />
                                            ) : (
                                                <ChevronRight className="w-5 h-5 text-gray-400" />
                                            )}
                                        </div>

                                        {expandedOrder === order.id && (
                                            <div className="border-t border-gray-200 p-5">
                                                <div className="mb-4">
                                                    <h4 className="font-medium text-gray-700 mb-2">
                                                        Items
                                                    </h4>
                                                    <ul className="divide-y divide-gray-200">
                                                        {order.items.map(
                                                            (item) => (
                                                                <li
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    className="py-3 flex justify-between"
                                                                >
                                                                    <div className="flex items-start gap-3">
                                                                        <img
                                                                            src={
                                                                                item
                                                                                    .product
                                                                                    .image
                                                                            }
                                                                            alt={
                                                                                item
                                                                                    .product
                                                                                    .name
                                                                            }
                                                                            className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                                                                        />
                                                                        <div>
                                                                            <p className="font-medium">
                                                                                {
                                                                                    item
                                                                                        .product
                                                                                        .name
                                                                                }
                                                                            </p>
                                                                            <p className="text-sm text-gray-500">
                                                                                Qty:{" "}
                                                                                {
                                                                                    item.quantity
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <p className="font-medium">
                                                                        K
                                                                        {item.price *
                                                                            item.quantity}
                                                                    </p>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                    <div className="bg-gray-50 p-4 rounded-lg">
                                                        <h4 className="font-medium text-gray-700 mb-2">
                                                            Shipping Address
                                                        </h4>
                                                        {order.address ? (
                                                            <>
                                                                <p>
                                                                    {
                                                                        order
                                                                            .address
                                                                            .full_name
                                                                    }
                                                                </p>
                                                                <p>
                                                                    {
                                                                        order
                                                                            .address
                                                                            .street
                                                                    }
                                                                </p>
                                                                <p>
                                                                    {
                                                                        order
                                                                            .address
                                                                            .city
                                                                    }
                                                                    ,{" "}
                                                                    {
                                                                        order
                                                                            .address
                                                                            .state
                                                                    }
                                                                </p>
                                                                <p>
                                                                    {
                                                                        order
                                                                            .address
                                                                            .country
                                                                    }
                                                                </p>
                                                            </>
                                                        ) : (
                                                            <p className="text-gray-500">
                                                                No address saved
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="bg-gray-50 p-4 rounded-lg">
                                                        <h4 className="font-medium text-gray-700 mb-2">
                                                            Payment
                                                        </h4>
                                                        <p className="capitalize">
                                                            {order.payment_method.replace(
                                                                "_",
                                                                " "
                                                            )}
                                                        </p>
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            {order.payment_status ===
                                                            "paid" ? (
                                                                <span className="text-green-600">
                                                                    Paid on{" "}
                                                                    {new Date(
                                                                        order.updated_at
                                                                    ).toLocaleDateString()}
                                                                </span>
                                                            ) : (
                                                                <span className="text-yellow-600">
                                                                    Payment
                                                                    pending
                                                                </span>
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>

                                                {order.status === "pending" && (
                                                    <div className="flex justify-end">
                                                        <DangerButton
                                                            onClick={() =>
                                                                handleCancelOrder(
                                                                    order.id
                                                                )
                                                            }
                                                            className="flex items-center gap-2"
                                                        >
                                                            <X className="w-5 h-5" />
                                                            Cancel Order
                                                        </DangerButton>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* Addresses Tab */}
                    {activeTab === "addresses" && (
                        <div className="space-y-4">
                            <div className="flex justify-end">
                                <PrimaryButton
                                    as="a"
                                    href="/addresses/new"
                                    className="flex items-center gap-2"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add New Address
                                </PrimaryButton>
                            </div>

                            {addresses.length === 0 ? (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                                    <MapPin className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                                        No saved addresses
                                    </h3>
                                    <p className="text-gray-500">
                                        Add an address for faster checkout
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {addresses.map((address) => (
                                        <div
                                            key={address.id}
                                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="font-medium flex items-center gap-2">
                                                    {address.label ||
                                                        "Shipping Address"}
                                                    {address.is_default && (
                                                        <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                                                            Default
                                                        </span>
                                                    )}
                                                </h3>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() =>
                                                            setEditingAddress(
                                                                editingAddress ===
                                                                    address.id
                                                                    ? null
                                                                    : address.id
                                                            )
                                                        }
                                                        className="text-gray-500 hover:text-gray-700"
                                                    >
                                                        <Pencil className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteAddress(
                                                                address.id
                                                            )
                                                        }
                                                        className="text-gray-500 hover:text-red-500"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>

                                            {editingAddress === address.id ? (
                                                <AddressEditForm
                                                    address={address}
                                                    onCancel={() =>
                                                        setEditingAddress(null)
                                                    }
                                                    onSuccess={() => {
                                                        setEditingAddress(null);
                                                        router.reload();
                                                    }}
                                                />
                                            ) : (
                                                <>
                                                    <p>{address.full_name}</p>
                                                    <p>{address.street}</p>
                                                    <p>
                                                        {address.city},{" "}
                                                        {address.state}
                                                    </p>
                                                    <p>
                                                        {address.country}{" "}
                                                        {address.zip_code}
                                                    </p>
                                                    <p className="mt-2 text-sm text-gray-500">
                                                        {address.phone}
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Reviews Tab */}
                    {activeTab === "reviews" && (
                        <div className="space-y-4">
                            {reviews.length === 0 ? (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                                    <Star className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                                        No reviews yet
                                    </h3>
                                    <p className="text-gray-500">
                                        Your reviews will appear here
                                    </p>
                                </div>
                            ) : (
                                reviews.map((review) => (
                                    <div
                                        key={review.id}
                                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-5"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-medium">
                                                {review.product.name}
                                            </h3>
                                            <div className="flex items-center gap-1 text-yellow-500">
                                                {[...Array(5)].map((_, i) =>
                                                    i < review.rating ? (
                                                        <Star
                                                            key={i}
                                                            className="w-4 h-4 fill-current"
                                                        />
                                                    ) : (
                                                        <Star
                                                            key={i}
                                                            className="w-4 h-4"
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-3">
                                            {review.comment}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Reviewed on{" "}
                                            {new Date(
                                                review.created_at
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </Container>
        </>
    );
}

// Address Edit Form Component
function AddressEditForm({ address, onCancel, onSuccess }) {
    const [formData, setFormData] = useState({
        full_name: address.full_name,
        street: address.street,
        city: address.city,
        state: address.state,
        zip_code: address.zip_code,
        country: address.country,
        phone: address.phone,
        is_default: address.is_default,
        label: address.label || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.patch(`/addresses/${address.id}`, formData, {
            onSuccess: () => onSuccess(),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Label (Home, Work, etc.)
                    </label>
                    <input
                        type="text"
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500"
                        value={formData.label}
                        onChange={(e) =>
                            setFormData({ ...formData, label: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500"
                        value={formData.full_name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                full_name: e.target.value,
                            })
                        }
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                    </label>
                    <input
                        type="text"
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500"
                        value={formData.street}
                        onChange={(e) =>
                            setFormData({ ...formData, street: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            City
                        </label>
                        <input
                            type="text"
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500"
                            value={formData.city}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    city: e.target.value,
                                })
                            }
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            State/Province
                        </label>
                        <input
                            type="text"
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500"
                            value={formData.state}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    state: e.target.value,
                                })
                            }
                            required
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            ZIP/Postal Code
                        </label>
                        <input
                            type="text"
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500"
                            value={formData.zip_code}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    zip_code: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Country
                        </label>
                        <select
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500"
                            value={formData.country}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    country: e.target.value,
                                })
                            }
                            required
                        >
                            <option value="">Select Country</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                    </label>
                    <input
                        type="tel"
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500"
                        value={formData.phone}
                        onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                    />
                </div>
                <div>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-500 focus:ring-green-500"
                            checked={formData.is_default}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    is_default: e.target.checked,
                                })
                            }
                        />
                        <span className="ml-2 text-sm text-gray-600">
                            Set as default address
                        </span>
                    </label>
                </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <PrimaryButton type="submit">Save Changes</PrimaryButton>
            </div>
        </form>
    );
}

ProfilePage.layout = (page) => <Layout children={page} />;
export default ProfilePage;

// import PrimaryButton from "@/Components/Button/PrimaryButton";
// import Container from "@/Components/Common/Container";
// import Layout from "@/Layouts/Web/Layout";
// import { Head, router } from "@inertiajs/react";
// import { Avatar } from "@mui/material";
// import { Edit, LogOut, Mail, MapPin, Phone } from "lucide-react";

// function Profile({ user, reviews }) {
//     console.log(user);

//     return (
//         <>
//             <Head title="Profile" />
//             <Container className="py-10 px-10">
//                 <div className="flex justify-between items-center mb-8">
//                     <h1 className="text-xl font-bold text-gray-900">Profile</h1>
//                     <PrimaryButton
//                         onClick={() => router.post(route("logout"))}
//                         className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
//                     >
//                         <LogOut className="w-5 h-5" />
//                         Logout
//                     </PrimaryButton>
//                 </div>

//                 <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//                     <div className="p-6 sm:p-8">
//                         <div className="flex flex-col sm:flex-row gap-6 items-start">
//                             <div className="relative">
//                                 <Avatar
//                                     src={user.avatar}
//                                     className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"
//                                 ></Avatar>
//                                 <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow border border-gray-200 hover:bg-gray-50">
//                                     <Edit className="w-4 h-4 text-gray-600" />
//                                 </button>
//                             </div>

//                             <div className="flex-1 space-y-4">
//                                 <div className="grid grid-cols-1 gap-5">
//                                     <h2 className="text-2xl font-semibold text-gray-900">
//                                         {user.name}
//                                     </h2>
//                                     <p className="text-gray-500">
//                                         Member since{" "}
//                                         {new Date(
//                                             user.created_at
//                                         ).toLocaleString("en-UK", {
//                                             month: "long",
//                                             year: "numeric",
//                                         })}
//                                     </p>
//                                     <div className="flex items-center gap-3">
//                                         <Mail className="w-5 h-5 text-gray-400" />
//                                         <span>{user.email}</span>
//                                     </div>
//                                     <div className="flex items-center gap-3">
//                                         <Phone className="w-5 h-5 text-gray-400" />
//                                         <span>{user?.phone}</span>
//                                     </div>
//                                     <div className="flex items-center gap-3">
//                                         <MapPin className="w-5 h-5 text-gray-400" />
//                                         <span>{user?.address}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="border-t border-gray-100 grid grid-cols-2 divide-x divide-gray-100">
//                         <div className="p-4 text-center">
//                             <p className="text-sm text-gray-500">Orders</p>
//                             <p className="text-xl font-semibold">
//                                 {user.orders?.length || 0}
//                             </p>
//                         </div>
//                         <div className="p-4 text-center">
//                             <p className="text-sm text-gray-500">Reviews</p>
//                             <p className="text-xl font-semibold">
//                                 {user.reviews?.length || 0}
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* <div className="mt-8 grid gap-6 sm:grid-cols-2">
//                         <div className="bg-white p-6 rounded-xl shadow-sm">
//                             <h3 className="text-lg font-semibold mb-4">
//                                 Account Settings
//                             </h3>
//                             <div className="space-y-3">
//                                 <PrimaryButton
//                                     variant="outline"
//                                     className="w-full justify-start"
//                                 >
//                                     Change Password
//                                 </PrimaryButton>
//                                 <PrimaryButton
//                                     variant="outline"
//                                     className="w-full justify-start"
//                                 >
//                                     Update Email
//                                 </PrimaryButton>
//                                 <PrimaryButton
//                                     variant="outline"
//                                     className="w-full justify-start"
//                                 >
//                                     Notification Preferences
//                                 </PrimaryButton>
//                             </div>
//                         </div>

//                         <div className="bg-white p-6 rounded-xl shadow-sm">
//                             <h3 className="text-lg font-semibold mb-4">
//                                 Quick Links
//                             </h3>
//                             <div className="space-y-3">
//                                 <PrimaryButton
//                                     variant="outline"
//                                     className="w-full justify-start"
//                                 >
//                                     Order History
//                                 </PrimaryButton>
//                                 <PrimaryButton
//                                     variant="outline"
//                                     className="w-full justify-start"
//                                 >
//                                     Saved Payment Methods
//                                 </PrimaryButton>
//                                 <PrimaryButton
//                                     variant="outline"
//                                     className="w-full justify-start"
//                                 >
//                                     Address Book
//                                 </PrimaryButton>
//                             </div>
//                         </div>
//                     </div> */}
//             </Container>
//         </>
//     );
// }

// Profile.layout = (page) => <Layout children={page} />;
// export default Profile;
