import { usePage } from "@inertiajs/react";
import {
    AddShoppingCartOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
} from "@mui/icons-material";
import { Avatar, Chip, Rating } from "@mui/material";
import clsx from "clsx";
import AddToCartButton from "../Button/AddToCartButton";
import AddToWishlistButton from "../Button/AddToWishlistButton";
import IconButton from "../Button/IconButton";
import LinkText from "../Common/LinkText";
import Price from "../Common/Price";

function ProductCard({ product }) {
    const { wishlist = [] } = usePage().props;

    const hasStock = product.stock > 0;
    const hasWishlist = (productId) =>
        wishlist.some((product) => product.id == productId);

    const goToCategory = (slug) => `/collections/${slug}`;
    const goToProduct = (slug) => `/products/${slug}`;

    return (
        <div className="h-full flex flex-col items-start gap-2.5 p-5 bg-white border rounded-xl hover:shadow-lg group overflow-hidden transition-all duration-200 ease-in-out relative">
            {product.is_featured ? (
                <Chip
                    label="Seller's Choice"
                    variant="outlined"
                    size="small"
                    color="primary"
                    className="absolute top-5 left-5 z-10 text-xs bg-green-50"
                />
            ) : null}

            <LinkText preserveScroll={false} href={goToProduct(product.slug)}>
                <div className="overflow-hidden w-full aspect-square relative">
                    <Avatar
                        src={product.image.path}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        variant="square"
                    />
                    {!hasStock && (
                        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                            <span className="text-red-600 border bg-white/50 border-red-600 px-4 py-1 rounded text-xs font-medium -rotate-12">
                                Out of Stock
                            </span>
                        </div>
                    )}
                </div>
            </LinkText>

            <LinkText
                preserveScroll={false}
                href={goToProduct(product.slug)}
                className="font-bold"
            >
                {product.name}
            </LinkText>

            <LinkText
                preserveScroll={false}
                href={goToCategory(product.category.slug)}
                className="text-sm"
            >
                {product.category.name}
            </LinkText>

            <div className="w-full flex items-center justify-between mt-auto">
                <Price value={product.price} className="font-bold" />
                <span
                    className={clsx(
                        "text-xs py-1 px-2 rounded-full",
                        hasStock
                            ? "text-green-600 bg-green-50"
                            : "text-red-600 bg-red-50"
                    )}
                >
                    {hasStock ? "In Stock" : "Out of Stock"}
                </span>
            </div>

            <div className="flex items-center gap-2.5 text-xs">
                <Rating
                    size="small"
                    value={+product?.reviews_avg_rating}
                    precision={0.5}
                    readOnly
                />
                <span>({product?.reviews_count} reviews)</span>
            </div>

            <div className="absolute top-5 right-5">
                {hasWishlist(product.id) && (
                    <FavoriteOutlined className="text-green-600" />
                )}
            </div>

            <div className="absolute top-5 right-5 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <AddToWishlistButton productId={product.id}>
                    <IconButton>
                        {hasWishlist(product.id) ? (
                            <FavoriteBorderOutlined className="text-green-600" />
                        ) : (
                            <FavoriteBorderOutlined />
                        )}
                    </IconButton>
                </AddToWishlistButton>
                {hasStock && (
                    <AddToCartButton productId={product.id}>
                        <IconButton>
                            <AddShoppingCartOutlined />
                        </IconButton>
                    </AddToCartButton>
                )}
            </div>
        </div>
    );
}

export default ProductCard;
