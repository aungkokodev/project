import Layout from "@/Layouts/Web/Layout";

function CategoryList({ category, products }) {
    console.log(category, products);

    return <div>category list</div>;
}

CategoryList.layout = (page) => <Layout children={page} />;

export default CategoryList;
