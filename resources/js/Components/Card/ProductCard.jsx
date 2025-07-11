import { formatNumber } from "@/utils/formatHelper";
import { Link } from "@inertiajs/react";
import {
    FavoriteBorderOutlined,
    ShoppingCartOutlined,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import clsx from "clsx";
import AddToCartButton from "../Button/AddToCartButton";

function ProductCard({ product, bagde }) {
    const image = product.images?.find((image) => image.is_default)?.path;
    const hasStock = product.stock_quantity > 0;

    return (
        <div className="h-full flex flex-col items-start gap-2.5 p-5 bg-white border rounded-xl hover:shadow-lg group relative overflow-hidden transition-all duration-200 ease-in-out ">
            <Link href={`/products/${product.slug}`}>
                <div className="overflow-hidden w-full aspect-square relative">
                    <Avatar
                        src={image}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        variant="square"
                    />
                    {!hasStock && (
                        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                            <span className="bg-red-600 text-white px-2 py-1 rounded-md text-xs font-medium">
                                Out of Stock
                            </span>
                        </div>
                    )}
                </div>
            </Link>

            <Link href={`/products/${product.slug}`}>
                <p className="font-bold hover:text-green-600 hover:underline">
                    {product.name}
                </p>
            </Link>

            <Link href={`/categories/${product.category.slug}`}>
                <p className="text-sm hover:text-green-800 hover:underline">
                    {product.category.name}
                </p>
            </Link>

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
                    <FavoriteBorderOutlined className="text-lg" />
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
