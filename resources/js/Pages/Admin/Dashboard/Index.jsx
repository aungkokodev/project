import Layout from "@/Layouts/Admin/Layout";

function Index() {
    console.log("dashboard render");

    return <div className="">Dashboard Page</div>;
}

Index.layout = (page) => <Layout children={page} />;

export default Index;
