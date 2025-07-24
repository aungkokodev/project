import IconButton from "@/Components/Button/IconButton";
import { default as PrimaryButton } from "@/Components/Button/PrimaryButton";
import Container from "@/Components/Common/Container";
import LinkText from "@/Components/Common/LinkText";
import FormImageInput from "@/Components/Input/FormImageInput";
import Select from "@/Components/Input/Select";
import TextField from "@/Components/Input/TextField";
import Layout from "@/Layouts/Web/Layout";
import { formatNumber, getDate } from "@/utils/formatHelper";
import { Head, router, useForm } from "@inertiajs/react";
import { DeleteOutline } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
    Avatar,
    Box,
    Checkbox,
    Chip,
    MenuItem,
    Rating,
    Tab,
} from "@mui/material";
import {
    ChevronDown,
    ChevronRight,
    LogOut,
    MapPin,
    Package,
    Pencil,
    Star,
    X,
} from "lucide-react";
import { useState } from "react";

function ProfilePage({ user }) {
    const [editingAddress, setEditingAddress] = useState(null);

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

    const handleReviewDelete = (reviewId) => {
        if (confirm("Delete this review?")) {
            router.delete(`/reviews/${reviewId}`, {
                preserveScroll: true,
                onSuccess: () => router.reload(),
            });
        }
    };

    const { addresses = [], orders = [], reviews = [] } = user;

    const [editProfile, setEditProfile] = useState(false);
    const { data, setData, errors, post, reset } = useForm({
        name: user.name,
        email: user.email,
        avatar: user.avatar || "",
    });

    const logout = () => router.post("/logout");

    const updateProfile = () =>
        post(`/profile/${user.id}`, {
            onSuccess: () => setEditProfile(false),
        });

    const handleEditProfile = () => {
        if (editProfile) reset();

        setEditProfile(!editProfile);
    };

    const [activeTab, setActiveTab] = useState("orders");

    const [expandedOrder, setExpandedOrder] = useState(null);

    return (
        <Container className="px-10 py-10 space-y-5">
            <Head title="My Profile" />

            <div className="flex gap-5 items-center">
                <div className="relative">
                    {editProfile ? (
                        <div className="w-16 h-16">
                            <FormImageInput
                                className="rounded-full"
                                src={
                                    typeof data.avatar == "string"
                                        ? data.avatar
                                        : URL.createObjectURL(data.avatar)
                                }
                                showImage={data.avatar}
                                onChange={(e) =>
                                    setData("avatar", e.target.files[0])
                                }
                                onClose={() => setData("avatar", "")}
                                error={!!errors.avatar}
                                helperText={errors.avatar}
                            />
                        </div>
                    ) : (
                        <Avatar className="w-16 h-16" src={user.avatar} />
                    )}
                </div>
                <div>
                    <h2 className="text-lg font-bold">{user.name}</h2>
                    <p>{user.email}</p>
                </div>
                <div className="flex gap-5 ms-auto">
                    <PrimaryButton
                        className="min-w-auto bg-gray-100 text-gray-500"
                        onClick={handleEditProfile}
                    >
                        {editProfile ? <X /> : <Pencil />}
                        {editProfile ? "Cancel" : "Edit Profile"}
                    </PrimaryButton>
                    <PrimaryButton
                        className="min-w-auto bg-red-700"
                        onClick={logout}
                    >
                        <LogOut />
                        Logout
                    </PrimaryButton>
                </div>
            </div>

            {editProfile && (
                <div className="p-5 border rounded-xl flex gap-5">
                    <TextField
                        required
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        label="Name"
                        placeholder="Your name"
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <TextField
                        required
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        label="Email"
                        placeholder="Your email"
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <PrimaryButton onClick={updateProfile}>
                        Save Changes
                    </PrimaryButton>
                </div>
            )}

            <TabContext value={activeTab}>
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                    }}
                >
                    <TabList onChange={(e, value) => setActiveTab(value)}>
                        <Tab
                            value="orders"
                            label="My Orders"
                            icon={<Package />}
                            iconPosition="start"
                            disableRipple
                        />
                        <Tab
                            value="reviews"
                            label="My Reveiws"
                            icon={<Star />}
                            iconPosition="start"
                            disableRipple
                        />
                        <Tab
                            value="addresses"
                            label="Addresses"
                            icon={<MapPin />}
                            iconPosition="start"
                            disableRipple
                        />
                    </TabList>
                </Box>

                <TabPanel value="orders" className="p-0">
                    {orders.length === 0 ? (
                        <div className="border rounded-xl p-10 flex flex-col gap-2.5 items-center">
                            <Package size={48} />
                            <p className="font-bold text-lg">No orders yet</p>
                            <p>Your order history will appear here</p>
                        </div>
                    ) : (
                        orders.map((order) => (
                            <div
                                className="mb-5 border rounded-xl"
                                key={order.id}
                            >
                                <div
                                    className="p-5 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
                                    onClick={() =>
                                        setExpandedOrder(
                                            expandedOrder === order.id
                                                ? null
                                                : order.id
                                        )
                                    }
                                >
                                    <div>
                                        <div className="flex gap-5">
                                            <p className="font-bold">
                                                Order #{order.order_number}
                                            </p>
                                            <Chip
                                                label={order.status}
                                                color={
                                                    order.status === "pending"
                                                        ? "warning"
                                                        : order.status ===
                                                          "shipped"
                                                        ? "info"
                                                        : order.status ===
                                                          "delivered"
                                                        ? "primary"
                                                        : "error"
                                                }
                                                size="small"
                                                variant="outlined"
                                            />
                                            {order?.admin_notes && (
                                                <p className="text-sm opacity-80">
                                                    {order.admin_notes}
                                                </p>
                                            )}
                                        </div>
                                        <p className="font-light text-sm text-gray-500">
                                            {getDate(order.created_at)} • K
                                            {formatNumber(order.total_amount)}
                                        </p>
                                    </div>

                                    {expandedOrder === order.id ? (
                                        <ChevronDown />
                                    ) : (
                                        <ChevronRight />
                                    )}
                                </div>
                                {expandedOrder === order.id && (
                                    <div className="border-t p-5">
                                        <div className="mb-5">
                                            <h4 className="font-bold">Items</h4>
                                            <ul className="divide-y">
                                                {order.items.map((item) => (
                                                    <li
                                                        key={item.id}
                                                        className="py-5 flex justify-between"
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <img
                                                                src={
                                                                    item.product
                                                                        .image
                                                                        .path
                                                                }
                                                                alt={
                                                                    item.product
                                                                        .name
                                                                }
                                                                className="w-16 h-16 object-cover rounded-lg border"
                                                            />
                                                            <div>
                                                                <p className="font-medium">
                                                                    {
                                                                        item
                                                                            .product
                                                                            .name
                                                                    }
                                                                </p>
                                                                <p className="text-sm">
                                                                    K
                                                                    {formatNumber(
                                                                        item.price
                                                                    )}{" "}
                                                                    x
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
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h4 className="font-medium text-gray-700 mb-2">
                                                    Shipping Address
                                                </h4>
                                                {order.shipping_address ? (
                                                    <>
                                                        <p>
                                                            {
                                                                order
                                                                    .shipping_address
                                                                    .fullname
                                                            }
                                                        </p>
                                                        <p>
                                                            {
                                                                order
                                                                    .shipping_address
                                                                    .phone
                                                            }
                                                        </p>
                                                        <p>
                                                            {
                                                                order
                                                                    .shipping_address
                                                                    .street
                                                            }
                                                        </p>
                                                        <p>
                                                            {
                                                                order
                                                                    .shipping_address
                                                                    .city
                                                            }
                                                            ,{" "}
                                                            {
                                                                order
                                                                    .shipping_address
                                                                    .state
                                                            }
                                                        </p>
                                                        <p>
                                                            {
                                                                order
                                                                    .shipping_address
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
                                                            Payment pending
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        {order.status === "pending" && (
                                            <div className="flex justify-end">
                                                <PrimaryButton
                                                    onClick={() =>
                                                        handleCancelOrder(
                                                            order.id
                                                        )
                                                    }
                                                    className="bg-gray-600"
                                                >
                                                    <X className="w-5 h-5" />
                                                    Cancel Order
                                                </PrimaryButton>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </TabPanel>
                <TabPanel value="reviews" className="p-0">
                    {reviews.length === 0 ? (
                        <div className="border rounded-xl p-10 flex flex-col gap-2.5 items-center">
                            <Star size={48} />
                            <p className="font-bold text-lg">No reviews yet</p>
                            <p> Your reviews will appear here</p>
                        </div>
                    ) : (
                        reviews.map((review) => (
                            <div
                                key={review.id}
                                className="p-5 mb-5 border rounded-xl space-y-2"
                            >
                                <div className="flex justify-between items-center">
                                    <LinkText
                                        href={`/products/${review.product.slug}`}
                                        className="font-bold"
                                    >
                                        {review.product.name}
                                    </LinkText>
                                    <span className="flex items-center gap-5">
                                        <Rating
                                            value={review.rating}
                                            readOnly
                                        />
                                        <IconButton
                                            onClick={() =>
                                                handleReviewDelete(review.id)
                                            }
                                        >
                                            <DeleteOutline className="hover:text-red-800" />
                                        </IconButton>
                                    </span>
                                </div>
                                <p>{review.comment}</p>
                                <span className="text-xs opacity-50">
                                    Reviewed on {getDate(review.updated_at)}
                                </span>
                            </div>
                        ))
                    )}
                </TabPanel>
                <TabPanel value="addresses" className="p-0">
                    {/* <PrimaryButton className="ms-auto mb-5">
                        <Plus />
                        Add New Address
                    </PrimaryButton> */}
                    {addresses.length === 0 ? (
                        <div className="border rounded-xl p-10 flex flex-col gap-2.5 items-center">
                            <MapPin size={48} />
                            <p className="font-bold text-lg">
                                No saved addresses
                            </p>
                            <p> Add an address for faster checkout</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {addresses.map((address) => (
                                <div
                                    key={address.id}
                                    className="p-5 border rounded-xl"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="font-medium flex items-center gap-2">
                                            {address.label ||
                                                "Shipping Address"}
                                            {!!address.is_default && (
                                                <Chip
                                                    label={"Default"}
                                                    color="primary"
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            )}
                                        </h3>
                                        <div className="flex gap-2">
                                            <IconButton
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
                                            </IconButton>
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
                                            <p>{address.fullname}</p>
                                            <p className="mb-2">
                                                {address.phone}
                                            </p>
                                            <p>{address.street}</p>
                                            <p>
                                                {address.city}, {address.state}
                                            </p>
                                            <p>
                                                {address.country}{" "}
                                                {address.zip_code}
                                            </p>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </TabPanel>
            </TabContext>
        </Container>
    );
}

function AddressEditForm({ address, onCancel, onSuccess }) {
    const { data, setData, errors, post } = useForm({
        fullname: address.fullname || "",
        phone: address.phone || "",
        street: address.street || "",
        city: address.city || "",
        state: address.state || "",
        zip_code: address.zip_code || "",
        country: address.country || "",
        is_default: address.is_default,
        label: address.label || "",
        type: "shipping",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/addresses/${address.id}/update`, { onSuccess });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <TextField
                    autoFocus
                    type="text"
                    label="Address Label"
                    placeholder="Home Address"
                    value={data.label}
                    onChange={(e) => setData("label", e.target.value)}
                    error={!!errors.label}
                    helperText={errors.label}
                    className="col-span-full"
                />
                <TextField
                    required
                    type="text"
                    label="Full Name"
                    placeholder="Steve"
                    value={data.fullname}
                    onChange={(e) => setData("fullname", e.target.value)}
                    error={!!errors.full_name}
                    helperText={errors.fullname}
                />
                <TextField
                    required
                    type="tel"
                    label="Phone"
                    placeholder="97 123 4567"
                    value={data.phone}
                    onChange={(e) => setData("phone", e.target.value)}
                    error={!!errors.phone}
                    helperText={errors.phone}
                />
                <TextField
                    required
                    type="text"
                    label="Street Address"
                    placeholder="123 Main Road"
                    value={data.street}
                    onChange={(e) => setData("street", e.target.value)}
                    error={!!errors.street}
                    helperText={errors.street}
                    className="col-span-full"
                />
                <TextField
                    required
                    type="text"
                    label="City"
                    placeholder="Yangon"
                    value={data.city}
                    onChange={(e) => setData("city", e.target.value)}
                    error={!!errors.city}
                    helperText={errors.city}
                />
                <TextField
                    required
                    type="text"
                    label="State"
                    placeholder="Yangon"
                    value={data.state}
                    onChange={(e) => setData("state", e.target.value)}
                    error={!!errors.state}
                    helperText={errors.state}
                />
                <TextField
                    type="text"
                    label="ZIP Code (Optional)"
                    placeholder="10101"
                    value={data.zip_code}
                    onChange={(e) => setData("zip_code", e.target.value)}
                    error={!!errors.zip_code}
                    helperText={errors.zip_code}
                />
                <Select
                    required
                    value={data.country}
                    onChange={(e) => setData("country", e.target.value)}
                >
                    <MenuItem value="Myanmar">Myanmar</MenuItem>
                </Select>
                <label className="col-span-full">
                    <Checkbox
                        checked={!!data.is_default}
                        onChange={(e) =>
                            setData("is_default", e.target.checked)
                        }
                        className="p-0"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                        Save as default address
                    </span>
                </label>
            </div>
            <div className="flex justify-end gap-3 mt-6">
                <PrimaryButton variant="outlined" onClick={onCancel}>
                    Cancel
                </PrimaryButton>
                <PrimaryButton type="submit">Save Changes</PrimaryButton>
            </div>
        </form>
    );
}

ProfilePage.layout = (page) => <Layout children={page} />;
export default ProfilePage;
