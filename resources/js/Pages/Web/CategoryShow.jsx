import ProductCard from "@/Components/Card/ProductCard";
import Breadcrumbs from "@/Components/Common/Breadcrumbs";
import Container from "@/Components/Common/Container";
import Layout from "@/Layouts/Web/Layout";
import CategoryMenu from "./CategoryMenu";

function CategoryShow({ categories, products }) {
    return (
        <Container className="py-5 grid grid-cols-4">
            <div className="p-5 col-span-full">
                <Breadcrumbs />
            </div>

            <div className="p-5 hidden lg:block">
                <CategoryMenu categories={categories} />
            </div>

            <div className="col-span-full lg:col-span-3 p-5">
                <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {products?.map((product) => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                </div>
            </div>
        </Container>
    );
}

CategoryShow.layout = (page) => <Layout children={page} />;

export default CategoryShow;
