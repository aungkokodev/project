import Layout from "@/Layouts/Admin/Layout";

function Index() {
    return <div className="">Customer Page</div>;
}

Index.layout = (page) => <Layout children={page} />;

export default Index;
