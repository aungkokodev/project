import Layout from "@/Layouts/Web/Layout";
import { Link } from "@inertiajs/react";

const ProductListing = ({ products }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-green-800">
                    Our Fresh Produce
                </h2>
                <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition">
                        Categories
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
                        Featured
                    </button>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

const ProductCard = ({ product }) => {
    const defaultImage =
        product.images.find((img) => img.is_default) || product.images[0];

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            {/* Product Image */}
            <div className="relative h-auto aspect-square overflow-hidden">
                <img
                    src={defaultImage?.path || "/placeholder-product.jpg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
                {product.is_featured && (
                    <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                        Featured
                    </span>
                )}
                <span className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {product.category.name}
                </span>
            </div>

            {/* Product Info */}
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-1">
                            {product.name}
                        </h3>
                        <p className="text-gray-500 text-sm mb-2 line-clamp-1">
                            {product.description}
                        </p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                        {product.unit}
                    </span>
                </div>
                {/* Price and Stock */}
                <div className="flex justify-between items-center mt-3">
                    <div>
                        <span className="text-xl font-bold text-green-700">
                            ${product.price}
                        </span>
                        {product.stock_quantity > 0 ? (
                            <span className="ml-2 text-sm text-green-600">
                                In Stock
                            </span>
                        ) : (
                            <span className="ml-2 text-sm text-red-600">
                                Out of Stock
                            </span>
                        )}
                    </div>
                    <span className="text-xs text-gray-500">
                        {product.stock_quantity} available
                    </span>
                </div>
                {/* Action Buttons */}
                <div className="mt-4 flex space-x-2">
                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                        Add
                    </button>
                    <Link
                        href={`/products/${product.slug}`}
                        className="flex-1 border border-green-600 text-green-600 hover:bg-green-50 py-2 px-4 rounded-lg transition flex items-center justify-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                        </svg>
                        View
                    </Link>
                </div>{" "}
            </div>
        </div>
    );
};

function Index({ products }) {
    console.log(products);
    return (
        <div className="">
            <ProductListing products={products} />
        </div>
    );
}

Index.layout = (page) => <Layout children={page} />;

export default Index;
