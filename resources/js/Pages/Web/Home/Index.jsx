import Layout from "@/Layouts/Web/Layout";
import { Head } from "@inertiajs/react";
import {
    FavoriteBorderOutlined,
    ShoppingCartOutlined,
} from "@mui/icons-material";
import { Avatar, Rating } from "@mui/material";

function Index({ products, categories }) {
    console.log(products, categories);

    return (
        <div className="px-4 py-8">
            <Head title="Homepage" />
            HomePage
            <ul className="grid grid-cols-6 gap-4 max-w-7xl mx-auto">
                {products.map((p, i) => (
                    <li
                        key={i}
                        className="border bg-white rounded-lg flex flex-col gap-2 relative shadow-sm"
                    >
                        <div className="overflow-hidden">
                            <Avatar
                                src={p.image}
                                className="w-full h-auto transition-all"
                                variant="square"
                            />{" "}
                            {/* <div className="flex justify-end gap-2 text-slate-600 mt-auto absolute bottom-4 right-4">
                                <FavoriteBorderOutlined />
                                <ShoppingCartOutlined />
                            </div> */}
                        </div>
                        <div className="p-4 flex flex-col gap-2">
                            <p className="text-slate-900 hover:text-green-800 cursor-pointer mb-auto line-clamp-2">
                                {p.name}
                            </p>
                            <p className="text-sm text-slate-600 truncate hover:text-slate-800 cursor-pointer">
                                {p.category.name}
                            </p>
                            <div>
                                <Rating
                                    readOnly
                                    value={Math.floor(Math.random() * 5)}
                                />
                                {/* <p className="text-xs text-slate-600">
                                ({Math.floor(Math.random() * 200)} reviews)
                            </p> */}
                            </div>
                            <p className="text-sm text-green-600 font-bold">
                                K{p.price}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

Index.layout = (page) => <Layout children={page} />;

export default Index;
