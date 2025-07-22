import { usePage } from "@inertiajs/react";
import { Avatar, Rating } from "@mui/material";
import clsx from "clsx";
import { Heart, ShoppingBagIcon } from "lucide-react";
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
                <Price value={product.price} className="font-semibold" />
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
                    <Heart className="text-green-600" />
                )}
            </div>

            <div className="absolute top-5 right-5 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <AddToWishlistButton productId={product.id}>
                    <IconButton>
                        {hasWishlist(product.id) ? (
                            <Heart className="text-green-600" />
                        ) : (
                            <Heart />
                        )}
                    </IconButton>
                </AddToWishlistButton>
                {hasStock && (
                    <AddToCartButton productId={product.id}>
                        <IconButton>
                            <ShoppingBagIcon />
                        </IconButton>
                    </AddToCartButton>
                )}
            </div>

            {product.discount_percent > 0 && (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                    -{product.discount_percent}%
                </div>
            )}
        </div>
    );
}

export default ProductCard;
