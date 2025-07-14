import EmptyDataGrid from "@/Components/EmptyDataGrid";
import IconWithTooltip from "@/Components/IconWithTooltip";
import LinkDataCell from "@/Components/LinkDataCell";
import StatusCard from "@/Components/StatusCard";
import Layout from "@/Layouts/Admin/Layout";
import { router, usePage } from "@inertiajs/react";
import {
    AddOutlined,
    CategoryOutlined,
    DeleteOutline,
    EditOutlined,
    FiberNewOutlined,
    LayersOutlined,
    SubdirectoryArrowRightOutlined,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const columns = [
    {
        field: "id",
        headerName: "#",
        width: 64,
    },
    {
        field: "name",
        headerName: "Category",
        renderCell: (params) => (
            <LinkDataCell
                text={params.value}
                url={`/admin/categories/${params.row.slug}`}
                avatar={params.row.image}
            />
        ),
        flex: 1,
    },
    {
        field: "parent",
        headerName: "Parent Category",
        renderCell: (params) =>
            params.value && (
                <LinkDataCell
                    text={params.value.name}
                    url={`/admin/categories/${params.row.parent.slug}`}
                />
            ),
        flex: 1,
    },
    { field: "description", headerName: "Description", flex: 1 },
    {
        field: "created_at",
        headerName: "Created At",
        valueFormatter: (v) => new Date(v).toLocaleDateString("en-UK"),
    },
    {
        field: "actions",
        headerName: "Actions",
        renderCell: (params) => (
            <div className="flex gap-1 items-center justify-center">
                <IconWithTooltip
                    icon={<EditOutlined />}
                    title="Edit"
                    color="green"
                    onClick={() =>
                        router.visit(
                            `/admin/categories/${params.row.slug}/edit`
                        )
                    }
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
                            router.delete(`/admin/categories/${params.id}`);
                    }}
                />
            </div>
        ),
    },
];

function Index({ categories, count }) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (toast.success) toast.success(flash.success);
        if (toast.error) toast.error(flash.error);
    });

    return (
        <>
            <div className="grid grid-cols-4 gap-5 mb-5">
                <StatusCard
                    title={"Total Categories"}
                    value={count["total"]}
                    icon={<CategoryOutlined />}
                />
                <StatusCard
                    title={"Main Categories"}
                    value={count["main"]}
                    icon={<LayersOutlined />}
                />
                <StatusCard
                    title={"Sub Categories"}
                    value={count["sub"]}
                    icon={<SubdirectoryArrowRightOutlined />}
                />
                <StatusCard
                    title={"New Categories"}
                    value={count["new"]}
                    icon={<FiberNewOutlined />}
                />
            </div>
            <div className="flex mb-5">
                <Button
                    className="ms-auto rounded bg-green-600 text-white hover:bg-green-700"
                    onClick={() => router.visit("/admin/categories/create")}
                >
                    <AddOutlined />
                    Add New Category
                </Button>
            </div>
            <DataGrid
                rows={categories}
                columns={columns}
                showToolbar
                disableColumnMenu
                sortingOrder={["asc", "desc"]}
                pageSizeOptions={[10, 25, 50, 100]}
                initialState={{
                    pagination: { paginationModel: { page: 0, pageSize: 10 } },
                }}
                slots={{ noRowsOverlay: EmptyDataGrid }}
                className="text-inherit px-5 rounded-lg"
            />
            <ToastContainer />
        </>
    );
}

Index.layout = (page) => <Layout children={page} title={"Category List"} />;

export default Index;
