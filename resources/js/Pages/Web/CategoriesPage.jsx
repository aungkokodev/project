import ProductCard from "@/Components/Card/ProductCard";
import Breadcrumbs from "@/Components/Common/Breadcrumbs";
import Container from "@/Components/Common/Container";
import Select from "@/Components/Input/Select";
import TextField from "@/Components/Input/TextField";
import Layout from "@/Layouts/Web/Layout";
import { Head, router } from "@inertiajs/react";
import { HomeOutlined, SearchOutlined } from "@mui/icons-material";
import { InputAdornment, MenuItem, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import CategoryMenu from "./CategoryMenu";

function SortMenu({ value, onChange }) {
    return (
        <Select
            onChange={onChange}
            value={value}
            size="small"
            className="w-50 text-inherit"
        >
            <MenuItem className="py-2" value="newest">
                Newest
            </MenuItem>
            <MenuItem className="py-2" value="oldest">
                Oldest
            </MenuItem>
            <MenuItem className="py-2" value="name_asc">
                Name (A-Z)
            </MenuItem>
            <MenuItem className="py-2" value="name_desc">
                Name (Z-A)
            </MenuItem>
            <MenuItem className="py-2" value="price_asc">
                Price (Low to High)
            </MenuItem>
            <MenuItem className="py-2" value="price_desc">
                Price (High to Low)
            </MenuItem>
        </Select>
    );
}

function CategoriesPage({
    categories,
    products,
    sort,
    search,
    currentCategory,
}) {
    const slug = currentCategory?.slug;

    const [searchInput, setSearchInput] = useState(search);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchInput !== search) {
                router.get(
                    `/collections${slug ? `/${slug}` : ""}`,
                    {
                        search: searchInput,
                        sort: sort,
                        page: products.current_page,
                    },
                    {
                        preserveScroll: true,
                        preserveState: true,
                    }
                );
            }
        }, 700);

        return () => clearTimeout(timeout);
    }, [searchInput]);

    const handleSortChange = (e) => {
        router.get(
            `/collections${slug ? `/${slug}` : ""}`,
            {
                search: search,
                sort: e.target.value,
                page: products.current_page,
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    const handleSearchChange = (e) => {
        router.get(
            `/collections${slug ? `/${slug}` : ""}`,
            {
                search: e.target.value,
                sort: sort,
                page: products.current_page,
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    const handlePageChange = (_, page) => {
        router.get(
            `/collections${slug ? `/${slug}` : ""}`,
            {
                search: search,
                sort: sort,
                page: page,
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    return (
        <Container className="py-5 grid grid-cols-4">
            <Head title="Category" />

            <div className="lg:h-16 p-5 col-span-full flex flex-col items-start gap-5 lg:flex-row lg:items-center">
                <Breadcrumbs data={getBreadcrumbsData(currentCategory)} />
                <div className="lg:ms-auto">{products.total} Products</div>
                <TextField
                    size="small"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="rounded-xl"
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchOutlined />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <SortMenu value={sort} onChange={handleSortChange} />
            </div>

            <div>
                <div className="p-5 hidden lg:block sticky top-24">
                    <CategoryMenu categories={categories} />
                </div>
            </div>

            <div className="col-span-full lg:col-span-3 p-5">
                {products.data?.length > 0 ? (
                    <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        {products.data.map((product) => (
                            <ProductCard product={product} key={product.id} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center p-5">Nothing Found</p>
                )}
                <div className="mt-5 flex justify-center">
                    {products.total > products.per_page && (
                        <Pagination
                            size="large"
                            shape="rounded"
                            variant="outlined"
                            count={products.last_page}
                            page={products.current_page}
                            onChange={handlePageChange}
                        />
                    )}
                </div>
            </div>
        </Container>
    );
}

CategoriesPage.layout = (page) => <Layout children={page} />;

export default CategoriesPage;

function getBreadcrumbsData(category) {
    const data = [
        { label: "Home", url: "/", icon: <HomeOutlined size="20" /> },
        { label: "All", url: "/collections" },
    ];

    if (!category) return data;

    if (category.parent)
        data.push({
            label: category.parent.name,
            url: `/collections/${category.parent.slug}`,
        });

    data.push({
        label: category.name,
        url: `/collections/${category.slug}`,
    });

    return data;
}
