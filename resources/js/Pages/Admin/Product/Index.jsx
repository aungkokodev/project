import EmptyDataGrid from "@/Components/EmptyDataGrid";
import IconWithTooltip from "@/Components/IconWithTooltip";
import LinkDataCell from "@/Components/LinkDataCell";
import Layout from "@/Layouts/Admin/Layout";
import { router, usePage } from "@inertiajs/react";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Button, Switch } from "@mui/material";
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
        headerName: "Product",
        renderCell: (params) => (
            <LinkDataCell
                text={params.value}
                url={`/admin/products/${params.row.slug}`}
                avatar={params.row.images?.find((img) => img.is_default)?.path}
            />
        ),
        flex: 1,
    },
    {
        field: "category",
        headerName: "Category",
        valueGetter: (v) => v.name,
        renderCell: (params) => (
            <LinkDataCell
                text={params.row.category.name}
                url={`/admin/categories/${params.row.category.slug}`}
            />
        ),
        flex: 1,
    },
    {
        field: "price",
        headerName: "Price",
        valueFormatter: (v) => new Intl.NumberFormat().format(v),
        align: "right",
    },
    {
        field: "stock_quantity",
        headerName: "Quantity",
        valueFormatter: (v) => new Intl.NumberFormat().format(v),
        align: "right",
    },
    {
        field: "unit",
        headerName: "Unit",
    },
    {
        field: "is_active",
        headerName: "Status",
        renderCell: (params) => (
            <Switch
                color="success"
                checked={Boolean(params.value)}
                onClick={() =>
                    router.put(`/admin/products/${params.row.id}/status`, {
                        is_active: !params.row.is_active,
                    })
                }
            />
        ),
    },
    {
        field: "is_featured",
        headerName: "Featured",
        renderCell: (params) => (
            <Switch
                color="success"
                checked={Boolean(params.value)}
                onClick={() =>
                    router.put(`/admin/products/${params.row.id}/featured`, {
                        is_featured: !params.row.is_featured,
                    })
                }
            />
        ),
    },
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
                        router.visit(`/admin/products/${params.row.slug}/edit`)
                    }
                />
                <IconWithTooltip
                    icon={<DeleteOutline />}
                    title="delete"
                    color="red"
                    onClick={() => {
                        const yes = confirm(
                            "Are you sure you want to delete this product?"
                        );
                        if (yes) router.delete(`/admin/products/${params.id}`);
                    }}
                />
            </div>
        ),
    },
];

function Index({ products }) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (toast.success) toast.success(flash.success);
    }, [flash.success]);

    return (
        <>
            <div className="flex gap-5 mb-5">
                <Button
                    className="px-5 py-2.5 rounded-lg bg-green-600 text-white ms-auto hover:bg-green-700"
                    onClick={() => router.visit("/admin/products/create")}
                >
                    Add New Product
                </Button>
            </div>
            <DataGrid
                rows={products}
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

Index.layout = (page) => <Layout children={page} title={"Product List"} />;

export default Index;
