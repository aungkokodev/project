import PrimaryButton from "@/Components/Button/PrimaryButton";
import ProductCard from "@/Components/Card/ProductCard";
import Container from "@/Components/Common/Container";
import Layout from "@/Layouts/Web/Layout";
import { Head, Link, router } from "@inertiajs/react";
import { Avatar, Rating } from "@mui/material";
import { ArrowRight } from "lucide-react";

function HomePage({
    categories,
    featured,
    bestSelling,
    topRated,
    newArrivals,
    happyCustomers,
    wishlistProductIds,
}) {
    const goToCategory = (slug) => `/collections/${slug}`;

    return (
        <div>
            <Head title="Home" />

            <section className="h-[calc(100vh-128px)] bg-green-700 bg-[url(/storage/assets/hero.jpg)] bg-center bg-cover">
                <Container className="h-full flex flex-col gap-10 items-center justify-center">
                    <h1 className="font-bold text-5xl text-white text-center drop-shadow-lg">
                        Quality Supplies for Small Farms
                    </h1>
                    <p className="text-white text-center text-xl drop-shadow-lg">
                        Everything your small farm needs, all in one place.
                    </p>
                    <PrimaryButton onClick={() => router.visit("collections")}>
                        Browse Products
                        <ArrowRight />
                    </PrimaryButton>
                </Container>
            </section>

            <section>
                <Container className="py-5">
                    <h2 className="font-bold text-xl text-center mb-5">
                        SHOP BY CATEGORY
                    </h2>
                    <div className="flex gap-5 lg:justify-center pb-4 overflow-x-auto hide-scrollbar">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={goToCategory(category.slug)}
                                preserveScroll
                                preserveState
                                className="flex-shrink-0 w-1/2 md:w-1/4 lg:w-1/8 flex flex-col gap-3 items-center p-4 border shadow-sm border-gray-100 rounded-xl bg-white hover:shadow-md transition-all duration-200 group"
                            >
                                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-green-50 transition-colors">
                                    <Avatar
                                        src={category.image}
                                        className="w-12 h-12 object-contain transition-transform group-hover:scale-110"
                                    />
                                </div>

                                <p className="text-sm text-center text-gray-700 group-hover:text-green-600 transition-colors group-hover:underline">
                                    {category.name}
                                </p>
                            </Link>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="bg-green-50">
                <Container className="py-5">
                    <h2 className="font-bold text-xl mb-5">
                        Featured Products
                    </h2>
                    <div className="flex gap-5 overflow-x-auto pb-4 hide-scrollbar">
                        {featured.map((p) => (
                            <div
                                key={p.id}
                                className="flex-shrink-0 w-[calc(16.69%-17px)] min-w-[200px]"
                            >
                                <ProductCard
                                    product={p}
                                    wishlist={wishlistProductIds}
                                />
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <section>
                <Container className="py-5">
                    <h2 className="font-bold text-xl mb-5">
                        Best Selling Products
                    </h2>
                    <div className="flex gap-5 overflow-x-auto pb-4 hide-scrollbar">
                        {bestSelling.map((p) => (
                            <div
                                key={p.id}
                                className="flex-shrink-0 w-[calc(16.69%-17px)] min-w-[200px]"
                            >
                                <ProductCard
                                    product={p}
                                    wishlist={wishlistProductIds}
                                />
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="bg-green-50">
                <Container className="py-5">
                    <h2 className="font-bold text-xl mb-5">
                        Top Rated Products
                    </h2>
                    <div className="flex gap-5 overflow-x-auto pb-4 hide-scrollbar">
                        {topRated.map((p) => (
                            <div
                                key={p.id}
                                className="flex-shrink-0 w-[calc(16.69%-17px)] min-w-[200px]"
                            >
                                <ProductCard
                                    product={p}
                                    wishlist={wishlistProductIds}
                                />
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <section>
                <Container className="py-5">
                    <h2 className="font-bold text-xl mb-5">
                        New Arrival Products
                    </h2>
                    <div className="flex gap-5 overflow-x-auto pb-4 hide-scrollbar">
                        {newArrivals.map((p) => (
                            <div
                                key={p.id}
                                className="flex-shrink-0 w-[calc(16.69%-17px)] min-w-[200px]"
                            >
                                <ProductCard
                                    product={p}
                                    wishlist={wishlistProductIds}
                                />
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <section>
                <Container className="py-5">
                    <h2 className="font-bold text-xl mb-5">
                        Tursted by Customers
                    </h2>
                    <div className="flex gap-5 overflow-x-auto pb-5 hide-scrollbar">
                        {happyCustomers.slice(0, 4).map((r) => (
                            <div
                                key={r.id}
                                className="flex-shrink-0 w-[calc(25%-15px)] min-w-[200px] border p-5 rounded-2xl bg-white"
                            >
                                <Rating
                                    value={r.rating}
                                    size="small"
                                    readOnly
                                />
                                <div className="line-clamp-3 my-2.5 text-balance">
                                    {r.comment}
                                </div>
                                <div className="flex gap-2.5 items-center">
                                    <Avatar
                                        src={r.user.avatar}
                                        className="w-10 h-10"
                                    />
                                    <p className="font-bold text-sm">
                                        {r.user.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
        </div>
    );
}

HomePage.layout = (page) => <Layout children={page} />;

export default HomePage;
