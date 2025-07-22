import AddToCartButton from "@/Components/Button/AddToCartButton";
import IconButton from "@/Components/Button/IconButton";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import RemoveFromWishlistButton from "@/Components/Button/RemoveFromWishlistButton";
import Container from "@/Components/Common/Container";
import LinkText from "@/Components/Common/LinkText";
import Price from "@/Components/Common/Price";
import Layout from "@/Layouts/Web/Layout";
import { Head, router, usePage } from "@inertiajs/react";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

function WishlistPage({ wishlist }) {
    const { cart = [] } = usePage().props;

    const getStock = (productId) =>
        cart.find((item) => item.product.id == productId)?.product?.stock || 1;

    const getQty = (productId) =>
        cart.find((item) => item.product.id == productId)?.quantity || 0;

    return (
        <>
            <Head title="Wishlist" />
            <Container className="px-10 py-10">
                <h2 className="text-xl font-bold mb-10 flex items-center gap-2">
                    Your Wishlist
                </h2>

                {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {wishlist.map((item) => (
                            <div
                                key={item.id}
                                className="p-5 rounded-xl border flex flex-col gap-2 overflow-hidden relative h-full"
                            >
                                <div className="relative">
                                    <img
                                        src={item.image?.path}
                                        alt={item.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <RemoveFromWishlistButton
                                        productId={item.id}
                                    >
                                        <IconButton className="absolute top-0 right-0 text-red-600">
                                            <Trash2 />
                                        </IconButton>
                                    </RemoveFromWishlistButton>
                                </div>
                                <LinkText
                                    href={`/products/${item.slug}`}
                                    className="font-semibold"
                                >
                                    {item.name}
                                </LinkText>
                                <LinkText
                                    href={`/collections/${item.category.slug}`}
                                    className="text-sm"
                                >
                                    {item.category.name}
                                </LinkText>
                                <span className="font-semibold mb-auto">
                                    <Price value={item.price} />
                                </span>
                                <AddToCartButton
                                    productId={item.id}
                                    disabled={item.stock <= 0}
                                >
                                    <PrimaryButton
                                        disabled={
                                            item.stock <= 0 ||
                                            getQty(item.id) >= getStock(item.id)
                                                ? true
                                                : false
                                        }
                                        className="flex items-center gap-2 min-w-auto w-full "
                                    >
                                        <ShoppingCart />
                                        Add to Cart
                                    </PrimaryButton>
                                </AddToCartButton>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-10 flex flex-col gap-5 items-center rounded-xl border">
                        <Heart className="mx-auto h-12 w-12" />
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
