import PrimaryButton from "@/Components/Button/PrimaryButton";
import CustomDataGrid from "@/Components/Common/CustomDataGrid";
import DataCell from "@/Components/Common/DataCell";
import IconWithTooltip from "@/Components/IconWithTooltip";
import StatusCard from "@/Components/StatusCard";
import Layout from "@/Layouts/Admin/Layout";
import { formatNumber, getDate } from "@/utils/formatHelper";
import { router, usePage } from "@inertiajs/react";
import {
    AddOutlined,
    CategoryOutlined,
    DeleteOutline,
    EditOutlined,
    FiberNewOutlined,
    HomeOutlined,
    LayersOutlined,
    SubdirectoryArrowRightOutlined,
    VisibilityOutlined,
} from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Create from "./Create";
import Edit from "./Edit";
import Show from "./Show";

function Index({ main_categories, sub_categories, counts }) {
    const [activeTab, setActiveTab] = useState("main");
    const [currentCategory, setCurrentCategory] = useState(null);
    const [openDetails, setOpenDetails] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const { flash } = usePage().props;

    useEffect(() => {
        if (toast.success) toast.success(flash.success);
        if (toast.error) toast.error(flash.error);
    }, [flash]);

    return (
        <>
            <div className="grid grid-cols-4 gap-5 mb-5">
                <StatusCard
                    title={"Total Categories"}
                    value={counts["total"]}
                    icon={<CategoryOutlined />}
                />
                <StatusCard
                    title={"Main Categories"}
                    value={counts["main"]}
                    icon={<LayersOutlined />}
                />
                <StatusCard
                    title={"Sub Categories"}
                    value={counts["sub"]}
                    icon={<SubdirectoryArrowRightOutlined />}
                />
                <StatusCard
                    title={"New This Week"}
                    value={counts["new"]}
                    icon={<FiberNewOutlined />}
                />
            </div>

            <TabContext value={activeTab}>
                <TabList
                    onChange={(_, value) => setActiveTab(value)}
                    className="border-b"
                >
                    <Tab
                        value="main"
                        label={`Main Categories (${counts.main})`}
                        disableRipple
                    />
                    <Tab
                        value="sub"
                        label={`Sub Categories (${counts.sub})`}
                        disableRipple
                    />
                </TabList>

                <TabPanel value="main" className="p-0 pt-5">
                    <PrimaryButton
                        className="ms-auto mb-5"
                        onClick={() => setOpenCreate(true)}
                    >
                        <AddOutlined />
                        Add New Category
                    </PrimaryButton>
                    <CustomDataGrid
                        rows={main_categories}
                        columns={getColumns(
                            main_categories,
                            (data) => {
                                setCurrentCategory(data);
                                setOpenDetails(true);
                            },
                            (data) => {
                                setCurrentCategory(data);
                                setOpenEdit(true);
                            },
                            true
                        )}
                    />
                </TabPanel>

                <TabPanel value="sub" className="p-0 pt-5">
                    <PrimaryButton
                        className="ms-auto mb-5"
                        onClick={() => setOpenCreate(true)}
                    >
                        <AddOutlined />
                        Add New Sub Category
                    </PrimaryButton>
                    <CustomDataGrid
                        rows={sub_categories}
                        columns={getColumns(
                            sub_categories,
                            (data) => {
                                setCurrentCategory(data);
                                setOpenDetails(true);
                            },
                            (data) => {
                                setCurrentCategory(data);
                                setOpenEdit(true);
                            },
                            false
                        )}
                    />
                </TabPanel>
            </TabContext>

            <ToastContainer />

            {currentCategory && (
                <Show
                    open={openDetails}
                    setOpen={setOpenDetails}
                    category={currentCategory}
                    setOpenEdit={setOpenEdit}
                />
            )}
            <Create
                open={openCreate}
                setOpen={setOpenCreate}
                categories={main_categories}
                isMain={activeTab === "main"}
            />
            {currentCategory && (
                <Edit
                    open={openEdit}
                    setOpen={setOpenEdit}
                    category={currentCategory}
                    categories={main_categories}
                    isMain={activeTab === "main"}
                />
            )}
        </>
    );
}

Index.layout = (page) => (
    <Layout
        children={page}
        title="Categories"
        breadcrumbs={[
            {
                label: "Dashboard",
                url: "/admin/dashboard",
                icon: <HomeOutlined />,
            },
            {
                label: "Categories",
                url: "/admin/categories",
                icon: <LayersOutlined />,
            },
        ]}
    />
);

export default Index;

function getColumns(data, onDetails, onEdit, isMain) {
    return [
        {
            field: "id",
            headerName: "#",
            valueGetter: (id) => data.findIndex((item) => item.id == id) + 1,
            width: 64,
        },
        {
            field: "name",
            headerName: "Category",
            valueGetter: (value) => value,
            renderCell: ({ row }) => (
                <DataCell text={row.name} avatar={row.image} />
            ),
            flex: 1,
        },
        isMain
            ? {
                  field: "children",
                  headerName: "Sub Categories",
                  valueGetter: (value) => value?.length,
                  renderCell: ({ row }) =>
                      row?.children ? (
                          <DataCell text={row.children.length} />
                      ) : (
                          ""
                      ),
              }
            : {
                  field: "parent",
                  headerName: "Parent Category",
                  valueGetter: (value) => value?.name,
                  flex: 1,
              },
        {
            field: "products_count",
            headerName: "Products",
            valueFormatter: (value) => formatNumber(value),
        },
        {
            field: "created_at",
            headerName: "Created At",
            valueFormatter: (value) => getDate(value),
        },
        {
            field: "actions",
            headerName: "Actions",
            renderCell: ({ row }) => (
                <div className="flex gap-1 items-center justify-center">
                    <IconWithTooltip
                        icon={<VisibilityOutlined />}
                        title="View Details"
                        onClick={() => onDetails(row)}
                    />
                    <IconWithTooltip
                        icon={<EditOutlined />}
                        title="Edit"
                        color="green"
                        onClick={() => onEdit(row)}
                    />
                    <IconWithTooltip
                        icon={<DeleteOutline />}
                        title="Delete"
                        color="red"
                        onClick={() => {
                            const yes = confirm(
                                "Are you sure you want to delete this category?"
                            );
                            if (yes)
                                router.delete(`/admin/categories/${row.id}`);
                        }}
                    />
                </div>
            ),
        },
    ];
}
