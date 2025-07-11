// import Rating from "@/Components/Rating"; // You'll need to create this component
import Layout from "@/Layouts/Web/Layout";
import { Link, usePage } from "@inertiajs/react";
// resources/js/Components/Rating.jsx
import { useState } from "react";

function Rating({ value = 0, interactive = false, onChange }) {
    const [hover, setHover] = useState(0);
    const [rating, setRating] = useState(value);

    const displayValue = interactive ? hover || rating : value;

    return (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type={interactive ? "button" : "div"}
                    className={`${
                        star <= displayValue
                            ? "text-yellow-400"
                            : "text-gray-300"
                    } ${interactive ? "hover:text-yellow-500" : ""}`}
                    onMouseEnter={() => interactive && setHover(star)}
                    onMouseLeave={() => interactive && setHover(0)}
                    onClick={() => {
                        if (interactive) {
                            setRating(star);
                            onChange && onChange(star);
                        }
                    }}
                >
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                </button>
            ))}
        </div>
    );
}
export default function ProductDetail() {
    const { product } = usePage().props;
    const defaultImage =
        product.images.find((img) => img.is_default) || product.images[0];
    const activeReviews = product.reviews.filter((review) => review.is_active);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            {/* Breadcrumb Navigation */}
            <nav className="flex mb-6" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                        <Link
                            href="/"
                            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-green-600"
                        >
                            ပင်မစာမျက်နှာ
                        </Link>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg
                                className="w-3 h-3 mx-1 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <Link
                                href={`/categories/${product.category.slug}`}
                                className="ml-1 text-sm font-medium text-gray-700 hover:text-green-600 md:ml-2"
                            >
                                {product.category.name}
                            </Link>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg
                                className="w-3 h-3 mx-1 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                                {product.name}
                            </span>
                        </div>
                    </li>
                </ol>
            </nav>

            {/* Product Section */}
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                {/* Product Images */}
                <div className="mb-8 lg:mb-0">
                    <div className="bg-white rounded-lg overflow-hidden shadow-md mb-4">
                        <img
                            src={
                                defaultImage?.path || "/placeholder-product.jpg"
                            }
                            alt={product.name}
                            className="w-full h-96 object-contain"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {product.images.map((image) => (
                            <div
                                key={image.id}
                                className="bg-white rounded-md overflow-hidden shadow-sm cursor-pointer border-2 border-transparent hover:border-green-500"
                            >
                                <img
                                    src={image.path}
                                    alt={product.name}
                                    className="w-full h-20 object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {product.name}
                    </h1>

                    <div className="flex items-center mb-4">
                        <Rating
                            value={calculateAverageRating(product.reviews)}
                        />
                        <span className="ml-2 text-sm text-gray-600">
                            ({activeReviews.length} သုံးသပ်ချက်များ)
                        </span>
                    </div>

                    <div className="mb-6">
                        <span className="text-3xl font-bold text-green-700">
                            {product.price} ကျပ်
                        </span>
                        {product.stock_quantity > 0 ? (
                            <span className="ml-3 text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                လက်ကျန် {product.stock_quantity} {product.unit}
                            </span>
                        ) : (
                            <span className="ml-3 text-sm text-red-600 bg-red-100 px-2 py-1 rounded-full">
                                ပစ္စည်းကုန်နေပါသည်
                            </span>
                        )}
                    </div>

                    <div className="prose max-w-none mb-6">
                        <p
                            className="text-gray-700"
                            dangerouslySetInnerHTML={{
                                __html: product.description,
                            }}
                        >
                            {/* {product.description} */}
                        </p>
                    </div>

                    <div className="flex space-x-4 mb-8">
                        <div className="flex-1">
                            <label
                                htmlFor="quantity"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                အရေအတွက်
                            </label>
                            <select
                                id="quantity"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            >
                                {[
                                    ...Array(
                                        Math.min(10, product.stock_quantity)
                                    ).keys(),
                                ].map((i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md transition flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
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
                            ဈေးခြင်းထဲထည့်မည်
                        </button>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                        <h3 className="text-sm font-medium text-gray-900">
                            အမျိုးအစား
                        </h3>
                        <div className="mt-2">
                            <Link
                                href={`/categories/${product.category.slug}`}
                                className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
                            >
                                {product.category.name}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-16">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                    သုံးသပ်ချက်များ
                </h2>

                {activeReviews.length > 0 ? (
                    <div className="space-y-8">
                        {activeReviews.map((review) => (
                            <div
                                key={review.id}
                                className="bg-white p-6 rounded-lg shadow-sm"
                            >
                                <div className="flex items-start">
                                    <div className="shrink-0">
                                        <img
                                            src={
                                                review.user.avatar ||
                                                "/placeholder-user.jpg"
                                            }
                                            alt={review.user.name}
                                            className="h-10 w-10 rounded-full object-cover"
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <div className="flex items-center">
                                            <h4 className="text-sm font-bold text-gray-900">
                                                {review.user.name}
                                            </h4>
                                            <span className="ml-2 text-xs text-gray-500">
                                                {new Date(
                                                    review.created_at
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="mt-1">
                                            <Rating value={review.rating} />
                                        </div>
                                        <p className="mt-2 text-sm text-gray-600">
                                            {review.comment}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                        <p className="text-gray-500">
                            ဤထုတ်ကုန်အတွက် သုံးသပ်ချက်မရှိသေးပါ။
                        </p>
                    </div>
                )}

                {/* Review Form */}
                <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        သုံးသပ်ချက်ရေးသားရန်
                    </h3>
                    <form>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                အဆင့်သတ်မှတ်ခြင်း
                            </label>
                            <Rating interactive={true} />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="comment"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                သုံးသပ်ချက်
                            </label>
                            <textarea
                                id="comment"
                                rows={4}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                placeholder="သင့်သုံးသပ်ချက်ကို ဤနေရာတွင် ရေးသားပါ..."
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition"
                        >
                            သုံးသပ်ချက်တင်ပါ
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

ProductDetail.layout = (page) => <Layout children={page} />;
// Helper function to calculate average rating
function calculateAverageRating(reviews) {
    const activeReviews = reviews.filter((review) => review.is_active);
    if (activeReviews.length === 0) return 0;
    const sum = activeReviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / activeReviews.length;
}
