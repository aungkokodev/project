import Layout from "@/Layouts/Admin/Layout";
import { TabContext, TabPanel } from "@mui/lab";
import { Avatar, Divider, Tab, Tabs } from "@mui/material";
import { useState } from "react";

function Show({ category }) {
    const [tab, setTab] = useState("details");

    return (
        <div className="grid gap-5 grid-cols-[1fr_2fr]">
            <Avatar
                src={category.image}
                className="w-full h-auto border rounded-lg"
            />
            <div className="w-full py-5 px-10 border rounded-lg">
                <TabContext value={tab}>
                    <Tabs value={tab}>
                        <Tab value={"details"} label={"Details"} />
                    </Tabs>
                    <Divider />
                    <TabPanel value={"details"} className="px-5 py-0">
                        <div className="flex py-5">
                            <p className="font-bold w-40">Category Name</p>
                            <p>{category.name}</p>
                        </div>
                        <Divider />
                        <div className="flex py-5">
                            <p className="font-bold w-40">Parent Category</p>
                            <p>{category.parent?.name || "NULL"}</p>
                        </div>
                        <Divider />
                        <div className="flex py-5">
                            <p className="font-bold w-40">Description</p>
                            <p>{category.description}</p>
                        </div>
                    </TabPanel>
                </TabContext>
            </div>
        </div>
    );
}

Show.layout = (page) => <Layout children={page} title={"Category Details"} />;

export default Show;
