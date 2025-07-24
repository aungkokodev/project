import AddToCartButton from "@/Components/Button/AddToCartButton";
import AddToWishlistButton from "@/Components/Button/AddToWishlistButton";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import Breadcrumbs from "@/Components/Common/Breadcrumbs";
import Container from "@/Components/Common/Container";
import LinkText from "@/Components/Common/LinkText";
import Price from "@/Components/Common/Price";
import ProductImages from "@/Components/Image/ProductImages";
import ReviewForm from "@/Components/Review/ReviewForm";
import ReviewList from "@/Components/Review/ReviewList";
import Layout from "@/Layouts/Web/Layout";
import { Head, usePage } from "@inertiajs/react";
import {
    Favorite,
    FavoriteBorderOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
} from "@mui/icons-material";
import { Rating } from "@mui/material";

function ProductPage({ product }) {
    const { cart = [], wishlist = [] } = usePage().props;

    const hasWishlist = wishlist.some((item) => item.id == product.id);

    const quantity =
        cart.find((item) => item.product.id == product.id)?.quantity || 0;

    const disabled =
        product.stock <= 0 || quantity >= product.stock ? true : false;

    return (
        <Container className="py-5 grid grid-cols-2">
            <Head title="Product" />

            <div className="h-16 p-5 col-span-full">
                <Breadcrumbs data={getBreadcrumbsData(product)} />
            </div>

            <div className="p-5">
                <ProductImages images={product?.images} />
            </div>

            <div className="p-5 space-y-5">
                <h2 className="font-bold text-xl">{product.name}</h2>
                <div className="flex gap-2.5 items-center">
                    <Rating
                        readOnly
                        precision={0.5}
                        value={+product?.reviews_avg_rating}
                    />
                    <span className="text-sm">
                        ({product?.reviews_count} reviews)
                    </span>
                </div>
                <div className="grid grid-cols-[80px_1fr] gap-5">
                    <h3 className="font-bold">Category</h3>
                    <LinkText href={`/collections/${product.category.slug}`}>
                        {product.category.name}
                    </LinkText>
                </div>
                <div className="grid grid-cols-[80px_1fr] gap-5">
                    <h3 className="font-bold">Stock</h3>
                    <p>
                        {product.stock}{" "}
                        <span className="text-sm">({product.unit})</span>
                    </p>
                </div>
                <div className="grid grid-cols-[80px_1fr] gap-5">
                    <h3 className="font-bold">Price</h3>
                    <Price value={product.price} />
                </div>
                <div className="flex gap-5">
                    <AddToCartButton productId={product.id} disabled={disabled}>
                        <PrimaryButton disabled={disabled}>
                            <ShoppingCartOutlined />
                            Add To Cart
                        </PrimaryButton>
                    </AddToCartButton>
                    <AddToWishlistButton productId={product.id}>
                        <PrimaryButton variant="outlined">
                            {hasWishlist ? (
                                <Favorite />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                            {hasWishlist ? "Remove From" : "Add To"} Wishlist
                        </PrimaryButton>
                    </AddToWishlistButton>
                </div>
                <div className="space-y-2.5">
                    <h3 className="font-bold">Description</h3>
                    <p
                        className="whitespace-pre-line"
                        dangerouslySetInnerHTML={{
                            __html: product.description,
                        }}
                    />
                </div>
            </div>
            <div className="col-span-full p-5">
                <h3 className="font-bold py-5">Reviews</h3>
                <ReviewForm productId={product.id} />
                <ReviewList reviews={product?.reviews} />
            </div>
        </Container>
    );
}

ProductPage.layout = (page) => <Layout children={page} />;

export default ProductPage;

function getBreadcrumbsData(product) {
    const data = [
        { label: "Home", url: "/", icon: <HomeOutlined size="20" /> },
        { label: "All", url: "/collections" },
    ];

    if (!product) return data;

    const category = product.category;

    if (category.parent)
        data.push({
            label: category.parent.name,
            url: `/collections/${category.parent.slug}`,
        });

    data.push({
        label: category.name,
        url: `/collections/${category.slug}`,
    });

    data.push({
        label: product.name,
        url: `/products/${product.slug}`,
    });

    return data;
}
