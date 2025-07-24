import PrimaryButton from "@/Components/Button/PrimaryButton";
import CardWithHeader from "@/Components/Card/CardWithHeader";
import Container from "@/Components/Common/Container";
import Price from "@/Components/Common/Price";
import Layout from "@/Layouts/Web/Layout";
import { formatNumber } from "@/utils/formatHelper";
import { Head, router } from "@inertiajs/react";
import {
    CheckCircleOutline,
    FmdGoodOutlined,
    LocalShippingOutlined,
    SellOutlined,
} from "@mui/icons-material";

function OrderConfirmationPage({ order }) {
    return (
        <>
            <Head title="Order Confirmation" />
            <Container className="px-10 py-10">
                <div className="text-center mb-10 space-y-2.5">
                    <CheckCircleOutline className="mx-auto h-16 w-16 text-green-600" />
                    <h1 className="text-xl font-bold">
                        Order Placed Successfully!
                    </h1>
                    <p>
                        Your agricultural supplies are on the way to your home
                    </p>
                    <p className="text-sm">
                        Order #:{" "}
                        <span className="font-bold">{order.order_number}</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <CardWithHeader
                        title="Order Progress"
                        icon={<LocalShippingOutlined />}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <h3 className="font-bold opacity-80 mb-1">
                                    Order Status
                                </h3>
                                <p>Preparing your Order</p>
                            </div>
                            <div>
                                <h3 className="font-bold opacity-80 mb-1">
                                    Your Instruction
                                </h3>
                                <p>
                                    {order.notes
                                        ? order.notes
                                        : "No Instructions"}
                                </p>
                            </div>
                        </div>
                    </CardWithHeader>

                    <CardWithHeader
                        title="Delivery Address"
                        icon={<FmdGoodOutlined />}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <h3 className="font-bold opacity-80 mb-1">
                                    Recipient
                                </h3>
                                <p>{order.shipping_address.fullname}</p>
                                <p>{order.shipping_address.phone}</p>
                            </div>
                            <div>
                                <h3 className="font-bold opacity-80 mb-1">
                                    Address
                                </h3>
                                <p>
                                    {order.shipping_address.street},{" "}
                                    {order.shipping_address.city},{" "}
                                    {order.shipping_address.state}
                                </p>
                                <p>
                                    {order.shipping_address.zip_code},{" "}
                                    {order.shipping_address.country}
                                </p>
                            </div>
                        </div>
                    </CardWithHeader>

                    <div className="lg:col-span-full">
                        <CardWithHeader
                            title="Your Agricultural Items"
                            icon={<SellOutlined />}
                        >
                            <div className="divide-y">
                                {order.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex justify-between items-start"
                                    >
                                        <div className="flex items-start gap-5">
                                            <img
                                                src={item.product.image.path}
                                                alt={item.product.name}
                                                className="w-16 h-16 object-cover rounded border"
                                            />
                                            <div>
                                                <p className="font-bold">
                                                    {item.product.name}
                                                </p>
                                                <p className="text-sm">
                                                    {
                                                        item.product.category
                                                            ?.name
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">
                                                <Price
                                                    value={
                                                        item.price *
                                                        item.quantity
                                                    }
                                                />
                                            </p>
                                            <p className="space-x-1">
                                                <Price value={item.price} />
                                                <span>×</span>
                                                <span>{item.quantity}</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-gray-200 pt-4 mt-4">
                                {/* <div className="flex justify-between mb-5">
                                    <span>Subtotal</span>
                                    <Price value={order.total_amount} />
                                </div> */}
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>
                                        <Price value={order.total_amount} />
                                    </span>
                                </div>
                            </div>
                        </CardWithHeader>
                    </div>

                    <PrimaryButton
                        className="col-span-full ms-auto w-md"
                        onClick={() => router.visit("/collections")}
                    >
                        Continue Shopping
                    </PrimaryButton>
                </div>
            </Container>
        </>
    );
}

OrderConfirmationPage.layout = (page) => <Layout children={page} />;

export default OrderConfirmationPage;
