import AddToCartButton from "@/Components/Button/AddToCartButton";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import Breadcrumbs from "@/Components/Common/Breadcrumbs";
import Container from "@/Components/Common/Container";
import LinkText from "@/Components/Common/LinkText";
import ProductImages from "@/Components/Image/ProductImages";
import ReviewForm from "@/Components/Review/ReviewForm";
import ReviewList from "@/Components/Review/ReviewList";
import Layout from "@/Layouts/Web/Layout";
import { formatNumber } from "@/utils/formatHelper";
import { Head } from "@inertiajs/react";
import { Rating } from "@mui/material";
import { ShoppingCart } from "lucide-react";

function ProductPage({ product }) {
    const hasStock = product.stock_quantity > 0;

    return (
        <Container className="py-5 grid gap-10 grid-cols-3">
            <Head title="Product" />

            <div className="h-16 p-5 col-span-full">
                <Breadcrumbs data={getBreadcrumbsData(product)} />
            </div>

            <div className="col-span-full lg:col-span-1">
                <ProductImages images={product?.images} />
            </div>

            <div className="col-span-full lg:col-span-2 space-y-5">
                <h2 className="font-bold text-xl">{product.name}</h2>
                <div className="flex gap-2.5 items-center">
                    <Rating
                        readOnly
                        precision={0.5}
                        value={
                            product.reviews?.reduce(
                                (acc, review) => acc + review.rating,
                                0
                            ) / product.reviews?.length || 0
                        }
                    />
                    <span className="text-sm text-gray-500">
                        ({product.reviews?.length || 0} reviews)
                    </span>
                </div>
                <div className="flex gap-5">
                    {/* <CartUpdateButton max={product?.stock_quantity} /> */}
                    <AddToCartButton id={product.id}>
                        <PrimaryButton disabled={!hasStock ? true : false}>
                            <ShoppingCart />
                            Add To Cart
                        </PrimaryButton>
                    </AddToCartButton>
                </div>
                <div className="space-y-2.5">
                    <h3 className="font-bold text-gray-500">Category</h3>
                    <LinkText href={`/collections/${product.category.slug}`}>
                        {product.category.name}
                    </LinkText>
                </div>
                <div className="space-y-2.5">
                    <h3 className="font-bold text-gray-500">Price</h3>
                    <p className="font-bold text-green-600">
                        K{formatNumber(product.price)}
                    </p>
                </div>
                <div className="space-y-2.5">
                    <h3 className="font-bold text-gray-500">Description</h3>
                    <p
                        className="whitespace-pre-line"
                        dangerouslySetInnerHTML={{
                            __html: product.description,
                        }}
                    />
                </div>
            </div>
            <div className="col-span-full border-t">
                <h3 className="font-bold text-gray-500 py-5">Reviews</h3>
                <ReviewForm productId={product.id} />
                <ReviewList reviews={product?.reviews} />
            </div>
        </Container>
    );
}

ProductPage.layout = (page) => <Layout children={page} />;

export default ProductPage;

function getBreadcrumbsData(product) {
    const data = [{ label: "All", url: "/collections" }];

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
