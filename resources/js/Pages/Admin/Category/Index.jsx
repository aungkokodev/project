import EmptyDataGrid from "@/Components/EmptyDataGrid";
import IconWithTooltip from "@/Components/IconWithTooltip";
import LinkDataCell from "@/Components/LinkDataCell";
import Layout from "@/Layouts/Admin/Layout";
import { router, usePage } from "@inertiajs/react";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const columns = [
    {
        field: "id",
        headerName: "#",
        width: 64,
        renderCell: (params) =>
            params.api.getAllRowIds().indexOf(params.id) + 1,
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
        field: "actions",
        headerName: "Actions",
        renderCell: (params) => (
            <div className="flex gap-1 items-center justify-center">
                <IconWithTooltip
                    icon={<EditOutlined />}
                    title="edit"
                    color="green"
                    onClick={() =>
                        router.visit(
                            `/admin/categories/${params.row.slug}/edit`
                        )
                    }
                />
                <IconWithTooltip
                    icon={<DeleteOutline />}
                    title="delete"
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

function Index({ categories }) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (toast.success) toast.success(flash.success);
    }, [flash.success]);

    return (
        <>
            <div className="flex gap-5 mb-5">
                <Button
                    className="px-5 py-2.5 rounded-lg bg-green-600 text-white ms-auto hover:bg-green-700"
                    onClick={() => router.visit("/admin/categories/create")}
                >
                    Add New Category
                </Button>
            </div>
            <DataGrid
                rows={categories}
                columns={columns}
                showToolbar
                disableColumnMenu
                sortingOrder={["asc", "desc"]}
                pageSizeOptions={[6, 10, 25, 50, 100]}
                initialState={{
                    pagination: { paginationModel: { page: 0, pageSize: 6 } },
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
