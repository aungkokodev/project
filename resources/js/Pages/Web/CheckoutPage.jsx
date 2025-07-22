import PrimaryButton from "@/Components/Button/PrimaryButton";
import Container from "@/Components/Common/Container";
import Price from "@/Components/Common/Price";
import Select from "@/Components/Input/Select";
import TextField from "@/Components/Input/TextField";
import Layout from "@/Layouts/Web/Layout";
import { formatNumber } from "@/utils/formatHelper";
import { Head, useForm } from "@inertiajs/react";
import { Checkbox, MenuItem, Radio } from "@mui/material";
import {
    ArrowRight,
    Banknote,
    CheckCircle,
    ChevronDown,
    CreditCard,
    MapPin,
    Plus,
    Tags,
    Truck,
    Wallet,
} from "lucide-react";
import { useState } from "react";

function CheckoutPage({ cart, addresses, defaultAddress }) {
    const defaultId = defaultAddress?.id || addresses?.[0]?.id || "";
    const [showForm, setShowForm] = useState(addresses.length === 0);

    const { data, setData, errors, post, processing } = useForm({
        address_id: defaultId,
        payment_method: "bank_transfer",
        full_name: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zip_code: "",
        country: "Myanmar",
        is_default: false,
        delivery_notes: "",
        cart_items: cart,
    });

    const subtotal = cart?.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );
    const shippingFee = 0;
    const total = subtotal + shippingFee;

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/checkout/process");
    };

    const toggleForm = () => {
        showForm
            ? setData("address_id", defaultId)
            : setData("address_id", null);
        setShowForm(!showForm);
    };

    const paymentMethods = [
        {
            id: "bank_transfer",
            name: "Bank Transfer",
            icon: <Banknote />,
            description: "Direct bank transfer",
        },
        {
            id: "mobile_money",
            name: "Mobile Money",
            icon: <CreditCard />,
            description: "Pay via Mobile Money",
        },
        {
            id: "cod",
            name: "Cash on Delivery",
            icon: <Wallet />,
            description: "Pay when items arrive",
        },
    ];

    return (
        <>
            <Head title="Checkout" />
            <Container className="px-10 py-10">
                <h1 className="text-xl font-bold text-gray-800 mb-2">
                    Complete Your Order
                </h1>
                <div className="text-sm mb-10">
                    Review your items and delivery information
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="space-y-10 lg:col-span-2">
                        <div className="p-5 rounded-xl border overflow-hidden">
                            <div className="mb-5 flex items-center gap-2.5">
                                <div className="p-2 rounded-full bg-green-50 text-green-600">
                                    <MapPin />
                                </div>
                                <h2 className="font-medium text-gray-800">
                                    Delivery Information
                                </h2>
                            </div>

                            <div>
                                {addresses.length > 0 && !showForm ? (
                                    <div className="space-y-3">
                                        <Select
                                            value={data.address_id}
                                            onChange={(e) =>
                                                setData(
                                                    "address_id",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full"
                                        >
                                            {addresses.map((addr) => (
                                                <MenuItem
                                                    key={addr.id}
                                                    value={addr.id}
                                                >
                                                    {addr.label
                                                        ? `${addr.label}: `
                                                        : ""}
                                                    {addr.street}, {addr.city}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <TextField
                                            label="Delivery Instructions (Optional)"
                                            placeholder="e.g. Leave at farm gate"
                                            value={data.delivery_notes}
                                            onChange={(e) =>
                                                setData(
                                                    "delivery_notes",
                                                    e.target.value
                                                )
                                            }
                                            multiline
                                            rows={3}
                                            className="w-full col-span-full"
                                        />
                                        <PrimaryButton
                                            variant="text"
                                            onClick={toggleForm}
                                            className="text-sm ps-0 min-w-auto"
                                        >
                                            <Plus size={16} /> Add new address
                                        </PrimaryButton>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <TextField
                                            required
                                            autoFocus
                                            type="text"
                                            label="Full Name"
                                            placeholder="Steve"
                                            value={data.full_name}
                                            onChange={(e) =>
                                                setData(
                                                    "full_name",
                                                    e.target.value
                                                )
                                            }
                                            error={!!errors.full_name}
                                            helperText={errors.full_name}
                                        />
                                        <TextField
                                            required
                                            type="tel"
                                            label="Phone"
                                            placeholder="97 123 4567"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData("phone", e.target.value)
                                            }
                                            error={!!errors.phone}
                                            helperText={errors.phone}
                                        />
                                        <TextField
                                            required
                                            type="text"
                                            label="Street Address"
                                            placeholder="123 Main Road"
                                            value={data.street}
                                            onChange={(e) =>
                                                setData(
                                                    "street",
                                                    e.target.value
                                                )
                                            }
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
                                            onChange={(e) =>
                                                setData("city", e.target.value)
                                            }
                                            error={!!errors.city}
                                            helperText={errors.city}
                                        />
                                        <TextField
                                            required
                                            type="text"
                                            label="State"
                                            placeholder="Yangon"
                                            value={data.state}
                                            onChange={(e) =>
                                                setData("state", e.target.value)
                                            }
                                            error={!!errors.state}
                                            helperText={errors.state}
                                        />
                                        <TextField
                                            type="text"
                                            label="ZIP Code (Optional)"
                                            placeholder="10101"
                                            value={data.zip_code}
                                            onChange={(e) =>
                                                setData(
                                                    "zip_code",
                                                    e.target.value
                                                )
                                            }
                                            error={!!errors.zip_code}
                                            helperText={errors.zip_code}
                                        />
                                        <Select
                                            required
                                            value={data.country}
                                            onChange={(e) =>
                                                setData(
                                                    "country",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <MenuItem value="Myanmar">
                                                Myanmar
                                            </MenuItem>
                                        </Select>
                                        <TextField
                                            label="Delivery Instructions (Optional)"
                                            placeholder="e.g. Leave at farm gate"
                                            value={data.delivery_notes}
                                            onChange={(e) =>
                                                setData(
                                                    "delivery_notes",
                                                    e.target.value
                                                )
                                            }
                                            multiline
                                            rows={3}
                                            className="col-span-full"
                                        />
                                        <label className="col-span-full">
                                            <Checkbox
                                                checked={data.is_default}
                                                onChange={(e) =>
                                                    setData(
                                                        "is_default",
                                                        e.target.checked
                                                    )
                                                }
                                                className="p-0"
                                            />
                                            <span className="ml-2 text-sm text-gray-600">
                                                Save as default address
                                            </span>
                                        </label>
                                        {addresses.length > 0 && (
                                            <PrimaryButton
                                                variant="text"
                                                onClick={toggleForm}
                                                className="text-sm min-w-auto col-span-full ps-0 place-self-start"
                                            >
                                                ← Back to saved addresses
                                            </PrimaryButton>
                                        )}
                                    </div>
                                )}
                                {errors.address_id && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.address_id}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="p-5 rounded-xl border overflow-hidden">
                            <div className="mb-5 flex items-center gap-2.5">
                                <div className="p-2 rounded-full bg-green-50 text-green-600">
                                    <Wallet />
                                </div>
                                <h2 className="font-medium text-gray-800">
                                    Payment Method
                                </h2>
                            </div>

                            <div className="space-y-5">
                                {paymentMethods.map((method) => (
                                    <label
                                        key={method.id}
                                        className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                                            data.payment_method === method.id
                                                ? "border-green-500 "
                                                : "border-gray-200 hover:border-gray-300"
                                        }`}
                                    >
                                        <div
                                            className={`mt-0.5 flex-shrink-0 ${
                                                data.payment_method ===
                                                method.id
                                                    ? "text-green-600"
                                                    : "text-gray-400"
                                            }`}
                                        >
                                            {method.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <span className="flex flex-col">
                                                    <span className="font-medium">
                                                        {method.name}
                                                    </span>
                                                    <span className="text-sm">
                                                        {method.description}
                                                    </span>
                                                </span>
                                                <Radio
                                                    name="payment_method"
                                                    value={method.id}
                                                    checked={
                                                        data.payment_method ===
                                                        method.id
                                                    }
                                                    onChange={() =>
                                                        setData(
                                                            "payment_method",
                                                            method.id
                                                        )
                                                    }
                                                    className="p-0 text-green-600 focus:ring-green-500"
                                                />
                                            </div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="space-y-5 sticky top-24">
                            <div className="rounded-xl border p-5">
                                <div className="mb-5 flex items-center gap-2.5">
                                    <div className="text-green-600">
                                        <Truck />
                                    </div>
                                    <h2 className="font-medium text-gray-800">
                                        Order Summary
                                    </h2>
                                </div>

                                <div className="space-y-5">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Subtotal
                                        </span>
                                        <span className="font-medium">
                                            <Price value={subtotal} />
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Shipping
                                        </span>
                                        <span className="font-medium">
                                            <Price value={shippingFee} />
                                        </span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-4 flex justify-between">
                                        <span className="font-medium">
                                            Total
                                        </span>
                                        <span className="font-bold text-lg text-green-600">
                                            <Price value={total} />
                                        </span>
                                    </div>
                                </div>

                                <PrimaryButton
                                    type="submit"
                                    className="w-full mt-6 flex justify-center items-center py-3"
                                    disabled={processing}
                                    onClick={handleSubmit}
                                >
                                    {processing ? (
                                        "Processing..."
                                    ) : (
                                        <>
                                            Confirm Order
                                            <ArrowRight className="ml-2 w-5 h-5" />
                                        </>
                                    )}
                                </PrimaryButton>

                                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span>Secure checkout</span>
                                </div>
                            </div>

                            <div className="p-5 rounded-xl border">
                                <div className="mb-5 flex items-center gap-2.5">
                                    <div className="text-green-600">
                                        <Tags />
                                    </div>
                                    <h2 className="font-medium text-gray-800">
                                        Your Items
                                    </h2>
                                </div>
                                <div className="space-y-5">
                                    {cart?.map((item) => (
                                        <div
                                            key={item.product.id}
                                            className="flex items-start gap-2.5"
                                        >
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={
                                                        item.product.image.path
                                                    }
                                                    alt={item.product.name}
                                                    className="w-16 h-16 object-cover rounded-lg border"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-800 line-clamp-1">
                                                    {item.product.name}
                                                </h4>
                                                <p className="text-sm">
                                                    {
                                                        item.product.category
                                                            ?.name
                                                    }
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium">
                                                    K
                                                    {formatNumber(
                                                        item.product.price *
                                                            item.quantity
                                                    )}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

CheckoutPage.layout = (page) => <Layout children={page} />;
export default CheckoutPage;
