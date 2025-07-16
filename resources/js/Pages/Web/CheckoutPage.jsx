import { Head, useForm, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {
    ArrowRight,
    MapPin,
    Truck,
    Wallet,
    Plus,
    CheckCircle,
    CreditCard,
    Banknote,
    ChevronDown,
} from "lucide-react";
import Container from "@/Components/Common/Container";
import Layout from "@/Layouts/Web/Layout";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import { formatNumber } from "@/utils/formatHelper";

function CheckoutPage({ cart, addresses, defaultAddress }) {
    const { error, flash } = usePage().props;
    const defaultId = defaultAddress?.id || addresses?.[0]?.id || "";
    const [showForm, setShowForm] = useState(addresses.length === 0);
    const [expandedSection, setExpandedSection] = useState("address");

    const { data, setData, errors, post, processing } = useForm({
        address_id: defaultId,
        payment_method: "bank_transfer",
        full_name: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
        is_default: false,
        delivery_notes: "",
        cart_items: cart,
    });

    const subtotal = cart?.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );
    const shippingFee = 50;
    const total = subtotal + shippingFee;

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/checkout/process");
    };

    const toggleForm = () => {
        showForm
            ? setData("address_id", null)
            : setData("address_id", defaultId);
        setShowForm(!showForm);
    };

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const paymentMethods = [
        {
            id: "bank_transfer",
            name: "Bank Transfer",
            icon: <Banknote className="w-5 h-5" />,
            description: "Direct bank transfer",
        },
        {
            id: "mobile_money",
            name: "Mobile Money",
            icon: <CreditCard className="w-5 h-5" />,
            description: "Pay via MTN/Airtel Money",
        },
        {
            id: "cod",
            name: "Cash on Delivery",
            icon: <Wallet className="w-5 h-5" />,
            description: "Pay when items arrive",
        },
    ];

    useEffect(() => {
        if (flash.success) console.log(flash.success);
        if (flash.error) console.log(flash.error);
    });

    return (
        <>
            <Head title="Checkout" />
            <Container className="px-4 py-8 md:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Complete Your Order
                    </h1>
                    <div className="text-sm text-gray-500 mb-8">
                        Review your items and delivery information
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Address Section */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div
                                    className="flex items-center justify-between p-5 cursor-pointer"
                                    onClick={() => toggleSection("address")}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-full bg-green-50 text-green-600">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <h2 className="font-medium text-gray-900">
                                            Delivery Information
                                        </h2>
                                    </div>
                                    <ChevronDown
                                        className={`w-5 h-5 text-gray-400 transition-transform ${
                                            expandedSection === "address"
                                                ? "rotate-180"
                                                : ""
                                        }`}
                                    />
                                </div>

                                {expandedSection === "address" && (
                                    <div className="px-5 pb-5">
                                        {addresses.length > 0 && !showForm ? (
                                            <div className="space-y-3">
                                                <select
                                                    value={data.address_id}
                                                    onChange={(e) =>
                                                        setData(
                                                            "address_id",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border-gray-200 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-3"
                                                >
                                                    {addresses.map((addr) => (
                                                        <option
                                                            key={addr.id}
                                                            value={addr.id}
                                                        >
                                                            {addr.label
                                                                ? `${addr.label}: `
                                                                : ""}
                                                            {addr.street},{" "}
                                                            {addr.city}
                                                        </option>
                                                    ))}
                                                </select>
                                                <button
                                                    type="button"
                                                    className="text-sm text-green-600 hover:text-green-800 flex items-center gap-1.5 mt-2"
                                                    onClick={toggleForm}
                                                >
                                                    <Plus className="w-4 h-4" />{" "}
                                                    Add new address
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Full Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="w-full border-gray-200 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-3"
                                                        placeholder="John Farmer"
                                                        value={data.full_name}
                                                        onChange={(e) =>
                                                            setData(
                                                                "full_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        className="w-full border-gray-200 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-3"
                                                        placeholder="+260 97 123 4567"
                                                        value={data.phone}
                                                        onChange={(e) =>
                                                            setData(
                                                                "phone",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Street Address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="w-full border-gray-200 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-3"
                                                        placeholder="123 Farm Road"
                                                        value={data.street}
                                                        onChange={(e) =>
                                                            setData(
                                                                "street",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        City
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="w-full border-gray-200 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-3"
                                                        placeholder="Lusaka"
                                                        value={data.city}
                                                        onChange={(e) =>
                                                            setData(
                                                                "city",
                                                                e.target.value
                                                            )
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
                                                        className="w-full border-gray-200 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-3"
                                                        placeholder="Lusaka Province"
                                                        value={data.state}
                                                        onChange={(e) =>
                                                            setData(
                                                                "state",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        ZIP Code
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="w-full border-gray-200 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-3"
                                                        placeholder="10101"
                                                        value={data.zip_code}
                                                        onChange={(e) =>
                                                            setData(
                                                                "zip_code",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Country
                                                    </label>
                                                    <select
                                                        className="w-full border-gray-200 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-3"
                                                        value={data.country}
                                                        onChange={(e) =>
                                                            setData(
                                                                "country",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    >
                                                        <option value="">
                                                            Select Country
                                                        </option>
                                                        <option value="Zambia">
                                                            Zambia
                                                        </option>
                                                        <option value="Other">
                                                            Other
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Delivery Instructions
                                                        (Optional)
                                                    </label>
                                                    <textarea
                                                        className="w-full border-gray-200 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-3"
                                                        placeholder="e.g. Leave at farm gate"
                                                        value={
                                                            data.delivery_notes
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "delivery_notes",
                                                                e.target.value
                                                            )
                                                        }
                                                        rows={2}
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-500 focus:ring-green-500"
                                                            checked={
                                                                data.is_default
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_default",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                        <span className="ml-2 text-sm text-gray-600">
                                                            Save as default
                                                            address
                                                        </span>
                                                    </label>
                                                </div>
                                                {addresses.length > 0 && (
                                                    <button
                                                        type="button"
                                                        className="text-sm text-gray-600 hover:text-gray-800 md:col-span-2 text-left"
                                                        onClick={toggleForm}
                                                    >
                                                        ← Back to saved
                                                        addresses
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                        {errors.address_id && (
                                            <p className="mt-2 text-sm text-red-600">
                                                {errors.address_id}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Payment Section */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div
                                    className="flex items-center justify-between p-5 cursor-pointer"
                                    onClick={() => toggleSection("payment")}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-full bg-blue-50 text-blue-600">
                                            <Wallet className="w-5 h-5" />
                                        </div>
                                        <h2 className="font-medium text-gray-900">
                                            Payment Method
                                        </h2>
                                    </div>
                                    <ChevronDown
                                        className={`w-5 h-5 text-gray-400 transition-transform ${
                                            expandedSection === "payment"
                                                ? "rotate-180"
                                                : ""
                                        }`}
                                    />
                                </div>

                                {expandedSection === "payment" && (
                                    <div className="px-5 pb-5 space-y-4">
                                        {paymentMethods.map((method) => (
                                            <label
                                                key={method.id}
                                                className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                                                    data.payment_method ===
                                                    method.id
                                                        ? "border-green-500 bg-green-50"
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
                                                        <span className="font-medium">
                                                            {method.name}
                                                        </span>
                                                        <input
                                                            type="radio"
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
                                                            className="text-green-600 focus:ring-green-500"
                                                        />
                                                    </div>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {method.description}
                                                    </p>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                                    <Truck className="text-green-600" />
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
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Shipping
                                        </span>
                                        <span className="font-medium">
                                            K{formatNumber(shippingFee)}
                                        </span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-4 flex justify-between">
                                        <span className="font-medium">
                                            Total
                                        </span>
                                        <span className="font-bold text-lg text-green-600">
                                            K{formatNumber(total)}
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

                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h3 className="font-medium text-gray-900 mb-3">
                                    Your Items
                                </h3>
                                <div className="space-y-4">
                                    {cart?.map((item) => (
                                        <div
                                            key={item.product.id}
                                            className="flex items-start gap-4"
                                        >
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={
                                                        item.product.image.path
                                                    }
                                                    alt={item.product.name}
                                                    className="w-14 h-14 object-cover rounded-lg border border-gray-200"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium text-gray-800 line-clamp-1">
                                                    {item.product.name}
                                                </h4>
                                                <p className="text-xs text-gray-500">
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

// import { Head, router, usePage } from "@inertiajs/react";
// import { ArrowRight, MapPin, Truck, Wallet } from "lucide-react";
// import Container from "@/Components/Common/Container";
// import Layout from "@/Layouts/Web/Layout";
// import PrimaryButton from "@/Components/Button/PrimaryButton";
// import { formatNumber } from "@/utils/formatHelper";

// function CheckoutPage({ cart, defaultAddress, addresses }) {
//     const { errors } = usePage().props;
//     const subtotal = cart?.reduce(
//         (sum, item) => sum + item.product.price * item.quantity,
//         0
//     );
//     const shippingFee = 50; // Default shipping or calculate based on farmer's location
//     const total = subtotal + shippingFee;

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         router.post("/checkout/process");
//     };

//     console.log(defaultAddress, addresses);

//     return (
//         <>
//             <Head title="Checkout" />
//             <Container className="px-10 py-10">
//                 <h1 className="text-xl font-bold text-gray-600 mb-5">
//                     Complete Your Purchase
//                 </h1>

//                 <form onSubmit={handleSubmit}>
//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                         {/* Left Column - Farmer Details */}
//                         <div className="lg:col-span-2 space-y-6">
//                             {/* Delivery Section */}
//                             <div className="bg-white rounded-lg shadow p-6">
//                                 <div className="flex items-center gap-2 mb-4">
//                                     <MapPin className="text-green-600" />
//                                     <h2 className="font-medium text-gray-900">
//                                         Delivery Information
//                                     </h2>
//                                 </div>

//                                 <div className="space-y-4">
//                                     <div className="grid grid-cols-2 gap-4">
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                                 Farm Name
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 name="farm_name"
//                                                 className="w-full border-gray-300 rounded-md shadow-sm"
//                                                 required
//                                             />
//                                         </div>
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                                 Farming Type
//                                             </label>
//                                             <select
//                                                 name="farming_type"
//                                                 className="w-full border-gray-300 rounded-md shadow-sm"
//                                                 required
//                                             >
//                                                 <option value="">
//                                                     Select...
//                                                 </option>
//                                                 <option value="open_field">
//                                                     Open Field
//                                                 </option>
//                                                 <option value="greenhouse">
//                                                     Greenhouse
//                                                 </option>
//                                                 <option value="hydroponic">
//                                                     Hydroponic
//                                                 </option>
//                                             </select>
//                                         </div>
//                                     </div>

//                                     {/* Agri-specific field */}
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                                             Delivery Instructions (Optional)
//                                         </label>
//                                         <textarea
//                                             name="delivery_notes"
//                                             rows={2}
//                                             className="w-full border-gray-300 rounded-md shadow-sm"
//                                             placeholder="e.g. 'Leave at storage shed behind main house'"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Payment Section */}
//                             <div className="bg-white rounded-lg shadow p-6">
//                                 <div className="flex items-center gap-2 mb-4">
//                                     <Wallet className="text-green-600" />
//                                     <h2 className="font-medium text-gray-900">
//                                         Payment Method
//                                     </h2>
//                                 </div>

//                                 <div className="space-y-3">
//                                     <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
//                                         <input
//                                             type="radio"
//                                             name="payment_method"
//                                             value="bank_transfer"
//                                             className="text-green-600"
//                                             defaultChecked
//                                         />
//                                         <span>Bank Transfer</span>
//                                     </label>

//                                     <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
//                                         <input
//                                             type="radio"
//                                             name="payment_method"
//                                             value="cod"
//                                             className="text-green-600"
//                                         />
//                                         <span>Cash on Delivery (Cash)</span>
//                                     </label>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Right Column - Order Summary */}
//                         <div className="space-y-6">
//                             <div className="bg-white rounded-lg shadow p-6">
//                                 <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
//                                     <Truck className="text-green-600" />
//                                     Order Summary
//                                 </h2>

//                                 <div className="space-y-4">
//                                     <div className="flex justify-between">
//                                         <span className="text-gray-600">
//                                             Subtotal
//                                         </span>
//                                         <span>K{formatNumber(subtotal)}</span>
//                                     </div>

//                                     <div className="flex justify-between">
//                                         <span className="text-gray-600">
//                                             Shipping
//                                         </span>
//                                         <span>
//                                             K{formatNumber(shippingFee)}
//                                         </span>
//                                     </div>

//                                     <div className="border-t border-gray-200 pt-4 flex justify-between">
//                                         <span className="font-medium">
//                                             Total
//                                         </span>
//                                         <span className="font-bold text-lg">
//                                             K{formatNumber(total)}
//                                         </span>
//                                     </div>
//                                 </div>

//                                 <PrimaryButton
//                                     type="submit"
//                                     className="w-full mt-6 flex justify-center"
//                                 >
//                                     Place Order
//                                     <ArrowRight className="ml-2 w-5 h-5" />
//                                 </PrimaryButton>
//                             </div>

//                             {/* Order Items Mini-Review */}
//                             <div className="bg-white rounded-lg shadow p-6">
//                                 <h3 className="font-medium text-gray-900 mb-3">
//                                     Your Items
//                                 </h3>
//                                 <div className="space-y-3">
//                                     {cart?.map((item) => (
//                                         <div
//                                             key={item.product.id}
//                                             className="flex justify-between"
//                                         >
//                                             <div className="flex items-center gap-2">
//                                                 <img
//                                                     src={
//                                                         item.product.image.path
//                                                     }
//                                                     alt={item.product.name}
//                                                     className="w-10 h-10 object-cover rounded border"
//                                                 />
//                                                 <span className="text-sm">
//                                                     {item.product.name} ×{" "}
//                                                     {item.quantity}
//                                                 </span>
//                                             </div>
//                                             <span className="text-sm font-medium">
//                                                 K
//                                                 {formatNumber(
//                                                     item.product.price *
//                                                         item.quantity
//                                                 )}
//                                             </span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </form>
//             </Container>
//         </>
//     );
// }

// CheckoutPage.layout = (page) => <Layout children={page} />;
// export default CheckoutPage;
