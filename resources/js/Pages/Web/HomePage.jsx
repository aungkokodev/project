import PrimaryButton from "@/Components/Button/PrimaryButton";
import ProductCard from "@/Components/Card/ProductCard";
import Container from "@/Components/Common/Container";
import Layout from "@/Layouts/Web/Layout";
import { Head, Link, router } from "@inertiajs/react";
import {
    ArrowForward,
    BoltOutlined,
    StarOutline,
    UpdateOutlined,
    WorkspacePremiumOutlined,
} from "@mui/icons-material";
import { Avatar, Rating } from "@mui/material";

function HomePage({
    categories,
    featured,
    topRated,
    newArrivals,
    happyCustomers,
}) {
    const goToCategory = (slug) => `/collections/${slug}`;

    return (
        <div>
            <Head title="Home" />

            <section className="relative h-[90vh] overflow-hidden bg-green-700 bg-[url('/storage/assets/hero.jpg')] bg-cover bg-center">
                <Container className="h-full flex flex-col gap-10 items-center justify-center text-center relative px-5">
                    <h1 className="font-bold text-4xl text-white leading-tight">
                        Empowering Small Farms, Every Day
                    </h1>
                    <p className="text-white text-xl">
                        Affordable, reliable supplies to help your farm grow.
                        <br />
                        Quality products, fair prices, and support you can
                        trust.
                    </p>

                    <PrimaryButton onClick={() => router.visit("/collections")}>
                        Browse Products
                        <ArrowForward className="ml-2" />
                    </PrimaryButton>
                </Container>
            </section>

            <section>
                <Container className="py-10 px-10">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">
                            Shop By Category
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Explorpe our wide range of farm supplies organized
                            by category for easy browsing
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
                        {categories.slice(0, 6).map((category) => (
                            <Link
                                key={category.id}
                                href={goToCategory(category.slug)}
                                preserveScroll
                                preserveState
                                className="group border flex flex-col items-center p-6 rounded-xl transition-all duration-300 hover:shadow-md"
                            >
                                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Avatar
                                        src={category.image}
                                        className="w-14 h-14 object-contain"
                                    />
                                </div>
                                <p className="text-center font-medium text-gray-800 group-hover:text-green-600 transition-colors">
                                    {category.name}
                                </p>
                            </Link>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="bg-gray-50">
                <Container className="px-10 py-10">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <BoltOutlined className="text-green-600" />
                                <span className="text-sm font-semibold text-green-600">
                                    FEATURED
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                Featured Products
                            </h2>
                        </div>
                        {/* <Link
                            href="/collections"
                            className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                        >
                            View all <ArrowRight />
                        </Link> */}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
                        {featured.map((p) => (
                            <ProductCard
                                key={p.id}
                                product={p}
                                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            />
                        ))}
                    </div>
                </Container>
            </section>

            <section>
                <Container className="px-10 py-10">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <WorkspacePremiumOutlined className="text-green-600" />
                                <span className="text-sm font-semibold text-green-600">
                                    TOP RATED
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                Top Rated Products
                            </h2>
                        </div>
                        {/* <Link
                            href="/collections"
                            className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                        >
                            View all <ArrowRight />
                        </Link> */}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
                        {topRated.map((p) => (
                            <ProductCard
                                key={p.id}
                                product={p}
                                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            />
                        ))}
                    </div>
                </Container>
            </section>

            <section className="bg-gray-50">
                <Container className="px-10 py-10">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <UpdateOutlined className="text-green-600" />
                                <span className="text-sm font-semibold text-green-600">
                                    NEW
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                New Arrivals
                            </h2>
                        </div>
                        {/* <Link
                            href="/collections"
                            className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                        >
                            View all <ArrowRight />
                        </Link> */}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
                        {newArrivals.map((p) => (
                            <ProductCard
                                key={p.id}
                                product={p}
                                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            />
                        ))}
                    </div>
                </Container>
            </section>

            <section className="bg-white">
                <Container className="px-10 py-10">
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <StarOutline className="text-green-600" size={20} />
                            <span className="text-sm font-semibold text-green-600">
                                REVIEWS
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">
                            Trusted by Customers
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Hear what our customers say about our supplies
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {happyCustomers.slice(0, 4).map((r) => (
                            <div
                                key={r.id}
                                className="bg-white border border-gray-200 p-6 rounded-2xl hover:shadow-md transition-shadow"
                            >
                                <Rating
                                    value={r.rating}
                                    size="small"
                                    readOnly
                                    precision={0.5}
                                />
                                <div className="my-4 text-gray-700 italic">
                                    "{r.comment}"
                                </div>
                                <div className="flex gap-3 items-center">
                                    <Avatar
                                        src={r.user.avatar}
                                        className="w-10 h-10"
                                    />
                                    <div>
                                        <p className="font-bold text-sm">
                                            {r.user.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Customer
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="bg-gray-50">
                <Container className="flex flex-col items-center gap-5 px-10 py-10 text-center">
                    <h2 className="text-2xl font-bold">
                        Ready to Upgrade Your Farm?
                    </h2>
                    <p className="text-lg max-w-2xl">
                        Join our satisfied customers who trust us for their farm
                        supplies
                    </p>
                    <PrimaryButton onClick={() => router.visit("/collections")}>
                        Shop Now
                        <ArrowForward />
                    </PrimaryButton>
                </Container>
            </section>
        </div>
    );
}

HomePage.layout = (page) => <Layout children={page} />;

export default HomePage;
