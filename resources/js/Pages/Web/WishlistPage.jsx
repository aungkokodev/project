import AddToCartButton from "@/Components/Button/AddToCartButton";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import RemoveFromWishlistButton from "@/Components/Button/RemoveFromWishlistButton";
import Container from "@/Components/Common/Container";
import LinkText from "@/Components/Common/LinkText";
import Layout from "@/Layouts/Web/Layout";
import { formatNumber } from "@/utils/formatHelper";
import { Head, router } from "@inertiajs/react";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

function WishlistPage({ wishlist }) {
    return (
        <>
            <Head title="Wishlist" />
            <Container className="px-10 py-10">
                <h1 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                    <Heart className="w-8 h-8 text-red-500" />
                    Your Wishlist
                </h1>

                {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {wishlist.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-lg shadow overflow-hidden"
                            >
                                <div className="relative">
                                    <img
                                        src={item.image?.path}
                                        alt={item.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-red-50">
                                        <RemoveFromWishlistButton id={item.id}>
                                            <Trash2 className="w-5 h-5 text-gray-600 hover:text-red-500" />
                                        </RemoveFromWishlistButton>
                                    </button>
                                </div>
                                <div className="flex flex-col p-5 gap-1">
                                    <LinkText
                                        href={`/products/${item.slug}`}
                                        className="font-medium text-gray-900"
                                    >
                                        {item.name}
                                    </LinkText>
                                    <LinkText
                                        href={`/collections/${item.category.slug}`}
                                        className="text-sm text-gray-500 mb-2"
                                    >
                                        {item.category.name}
                                    </LinkText>
                                    <div className="flex items-center justify-between mt-4">
                                        <p className="font-bold text-lg">
                                            K{formatNumber(item.price)}
                                        </p>
                                        <div className="flex gap-2">
                                            <AddToCartButton id={item.id}>
                                                <PrimaryButton
                                                    size="sm"
                                                    disabled={
                                                        !item.stock_quantity > 0
                                                    }
                                                    className="flex items-center gap-1"
                                                >
                                                    <ShoppingCart className="w-4 h-4" />
                                                    Add to Cart
                                                </PrimaryButton>
                                            </AddToCartButton>
                                        </div>
                                    </div>
                                    {!item.stock_quantity > 0 && (
                                        <p className="text-xs text-red-500 mt-2">
                                            Out of stock
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-10 flex flex-col gap-5 items-center rounded-xl border">
                        <Heart className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="text-lg font-medium text-gray-900">
                            Your wishlist is empty
                        </h3>
                        <p className="text-gray-500">
                            Save your favorite items here
                        </p>
                        <PrimaryButton
                            onClick={() => router.visit("/collections")}
                        >
                            Browse Products
                        </PrimaryButton>
                    </div>
                )}
            </Container>
        </>
    );
}

WishlistPage.layout = (page) => <Layout children={page} />;
export default WishlistPage;
