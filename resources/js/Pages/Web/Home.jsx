import ProductCard from "@/Components/Card/ProductCard";
import Layout from "@/Layouts/Web/Layout";
import { Head, Link, router } from "@inertiajs/react";
import { Avatar, Button, Rating } from "@mui/material";

function Index({
    categories,
    products,
    featured,
    bestSelling,
    topRated,
    newArrivals,
    happyCustomers,
}) {
    return (
        <div>
            <Head title="Home" />

            <section
                className={
                    "h-[calc(100vh-128px)] flex flex-col gap-10 items-center justify-center bg-[url(/storage/assets/hero.jpg)] bg-center bg-cover"
                }
            >
                <h1 className="font-bold text-5xl text-white">
                    Quality Supplies for Farming
                </h1>
                <Button
                    className="px-10 py-3 bg-green-800 rounded-lg text-white"
                    onClick={() => router.visit("/categories")}
                >
                    Shop Now →
                </Button>
            </section>

            <section className="py-10 container mx-auto">
                <h2 className="font-bold text-2xl text-center mb-5">
                    SHOP BY CATEGORY
                </h2>
                <div className="flex gap-4 pb-4 overflow-x-auto hide-scrollbar">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/categories/${category.slug}`}
                            className="flex-shrink-0 w-1/8 flex flex-col gap-3 items-center p-4 border shadow-sm border-gray-100 rounded-xl bg-white hover:shadow-md transition-all duration-200 group"
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
            </section>

            <div className="bg-slate-50">
                <section className="container mx-auto py-10">
                    <h2 className="font-bold text-2xl mb-5">
                        Featured Products
                    </h2>
                    <div className="flex gap-5 overflow-x-auto pb-4 hide-scrollbar">
                        {featured.map((p) => (
                            <div
                                key={p.id}
                                className="flex-shrink-0 w-[calc(16.69%-17px)] min-w-[200px]"
                            >
                                <ProductCard product={p} />
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <section className="container mx-auto py-10">
                <h2 className="font-bold text-2xl mb-5">
                    Best Selling Products
                </h2>
                <div className="flex gap-5 overflow-x-auto pb-4 hide-scrollbar">
                    {bestSelling.map((p) => (
                        <div
                            key={p.id}
                            className="flex-shrink-0 w-[calc(16.69%-17px)] min-w-[200px]"
                        >
                            <ProductCard product={p} />
                        </div>
                    ))}
                </div>
            </section>

            <div className="bg-slate-50">
                <section className="container mx-auto py-10">
                    <h2 className="font-bold text-2xl mb-5">
                        Top Rated Products
                    </h2>
                    <div className="flex gap-5 overflow-x-auto pb-4 hide-scrollbar">
                        {topRated.map((p) => (
                            <div
                                key={p.id}
                                className="flex-shrink-0 w-[calc(16.69%-17px)] min-w-[200px]"
                            >
                                <ProductCard product={p} />
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <section className="container mx-auto py-10">
                <h2 className="font-bold text-2xl mb-5">
                    New Arrival Products
                </h2>
                <div className="flex gap-5 overflow-x-auto pb-4 hide-scrollbar">
                    {newArrivals.map((p) => (
                        <div
                            key={p.id}
                            className="flex-shrink-0 w-[calc(16.69%-17px)] min-w-[200px]"
                        >
                            <ProductCard product={p} />
                        </div>
                    ))}
                </div>
            </section>

            <div className="bg-slate-50">
                <section className="container mx-auto py-10">
                    <h2 className="font-bold text-2xl mb-5">
                        Tursted by Customers
                    </h2>
                    <div className="flex gap-5 overflow-x-auto pb-5 hide-scrollbar">
                        {happyCustomers.slice(0, 4).map((r) => (
                            <div
                                key={r.id}
                                className="flex-shrink-0 w-[calc(25%-15px)] min-w-[200px] border p-5 rounded-2xl"
                            >
                                <Rating
                                    value={r.rating}
                                    size="small"
                                    readOnly
                                />
                                {/* <div >{r.created_at}</div> */}
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
                </section>
            </div>
        </div>
    );
}

Index.layout = (page) => <Layout children={page} />;

export default Index;
