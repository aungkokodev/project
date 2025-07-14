import { formatNumber } from "@/utils/formatHelper";
import {
    Favorite,
    FavoriteBorderOutlined,
    ShoppingCartOutlined,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import clsx from "clsx";
import AddToCartButton from "../Button/AddToCartButton";
import AddToWishlistButton from "../Button/AddToWishlistButton";
import LinkText from "../Common/LinkText";

function ProductCard({ product, wishlist }) {
    const hasStock = product.stock_quantity > 0;

    const goToCategory = (slug) => `/collections/${slug}`;
    const goToProduct = (slug) => `/products/${slug}`;

    return (
        <div className="h-full flex flex-col items-start gap-2.5 p-5 bg-white border rounded-xl hover:shadow-lg group overflow-hidden transition-all duration-200 ease-in-out relative">
            {product?.is_featured ? (
                <div className="absolute top-5 left-5 z-30 bg-green-100 border border-green-600 px-2 py-0.5 rounded-full text-xs text-green-600">
                    Featured
                </div>
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

            <LinkText preserveScroll={false} href={goToProduct(product.slug)}>
                <p className="font-bold hover:text-green-600 hover:underline">
                    {product.name}
                </p>
            </LinkText>

            <LinkText
                preserveScroll={false}
                href={goToCategory(product.category.slug)}
            >
                <p className="text-sm hover:text-green-800 hover:underline">
                    {product.category.name}
                </p>
            </LinkText>

            <div className="w-full flex items-center justify-between">
                <div>
                    <p className="font-bold">K{formatNumber(product.price)}</p>
                    {product.compare_at_price && (
                        <p className="text-xs text-gray-400 line-through">
                            K{formatNumber(product.compare_at_price)}
                        </p>
                    )}
                </div>
                <span
                    className={clsx(
                        "text-xs py-1 px-2 rounded-full",
                        hasStock
                            ? "text-green-600 bg-green-100"
                            : "text-red-600 bg-red-100"
                    )}
                >
                    {hasStock ? "In Stock" : "Out of Stock"}
                </span>
            </div>

            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-green-50 text-gray-600 hover:text-green-600 transition-colors">
                    <AddToWishlistButton id={product.id}>
                        {wishlist?.some((id) => id === product.id) ? (
                            <Favorite className="text-lg text-red-600 opacity-100" />
                        ) : (
                            <FavoriteBorderOutlined className="text-lg" />
                        )}
                    </AddToWishlistButton>
                </button>
                {hasStock && (
                    <button className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-green-50 text-gray-600 hover:text-green-600 transition-colors">
                        <AddToCartButton id={product.id}>
                            <ShoppingCartOutlined className="text-lg" />
                        </AddToCartButton>
                    </button>
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
