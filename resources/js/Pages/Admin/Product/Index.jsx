import EmptyDataGrid from "@/Components/EmptyDataGrid";
import IconWithTooltip from "@/Components/IconWithTooltip";
import LinkDataCell from "@/Components/LinkDataCell";
import StatusCard from "@/Components/StatusCard";
import Layout from "@/Layouts/Admin/Layout";
import { router, usePage } from "@inertiajs/react";
import {
    AddOutlined,
    CancelOutlined,
    CheckCircleOutline,
    DeleteOutline,
    EditOutlined,
    StarBorderOutlined,
    StoreOutlined,
} from "@mui/icons-material";
import { Button, Switch } from "@mui/material";
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
        valueGetter: (v) => parseInt(v),
        valueFormatter: (v) => new Intl.NumberFormat().format(v),
        align: "right",
    },
    {
        field: "stock_quantity",
        headerName: "Quantity",
        valueGetter: (v) => parseInt(v),
        valueFormatter: (v) => new Intl.NumberFormat().format(v),
        align: "right",
    },
    {
        field: "unit",
        headerName: "Unit",
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
        field: "is_active",
        headerName: "Active",
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
        field: "created_at",
        headerName: "Created",
        valueGetter: (v) => new Date(v),
        valueFormatter: (v) => v.toLocaleDateString("en-UK"),
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
                        router.visit(`/admin/products/${params.row.slug}/edit`)
                    }
                />
                {/* <IconWithTooltip
                    icon={<DeleteOutline />}
                    title="delete"
                    color="red"
                    onClick={() => {
                        const yes = confirm(
                            "Are you sure you want to delete this product?"
                        );
                        if (yes) router.delete(`/admin/products/${params.id}`);
                    }}
                /> */}
            </div>
        ),
    },
];

function Index({ products, count }) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (toast.success) toast.success(flash.success);
        if (toast.error) toast.error(flash.error);
    });

    return (
        <>
            <div className="grid grid-cols-4 gap-5 mb-5">
                <StatusCard
                    title={"Total Products"}
                    value={count["total"]}
                    icon={<StoreOutlined />}
                />
                <StatusCard
                    title={"Active Products"}
                    value={count["active"]}
                    icon={<CheckCircleOutline />}
                />
                <StatusCard
                    title={"Featured Products"}
                    value={count["featured"]}
                    icon={<StarBorderOutlined />}
                />
                <StatusCard
                    title={"Out of Stock"}
                    value={count["empty"]}
                    icon={<CancelOutlined />}
                    color="red"
                />
            </div>
            <div className="flex mb-5">
                <Button
                    className="ms-auto rounded bg-green-600 text-white hover:bg-green-700"
                    onClick={() => router.visit("/admin/products/create")}
                >
                    <AddOutlined />
                    Add New Product
                </Button>
            </div>
            <DataGrid
                rows={products}
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

Index.layout = (page) => <Layout children={page} title={"Product List"} />;

export default Index;
