import EmptyDataGrid from "@/Components/EmptyDataGrid";
import LinkDataCell from "@/Components/LinkDataCell";
import Layout from "@/Layouts/Admin/Layout";
import { router, usePage } from "@inertiajs/react";
import { Drawer, Rating, Switch } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function Index({ reviews }) {
    const { flash } = usePage().props;

    const [current, setCurrent] = useState(null);

    useEffect(() => {
        if (toast.success) toast.success(flash.success);
    }, [flash.success]);

    const columns = [
        {
            field: "id",
            headerName: "#",
            width: 64,
        },
        {
            field: "user",
            headerName: "Customer",
            valueGetter: (v) => v.name,
            renderCell: ({ row }) => (
                <LinkDataCell
                    text={row.user.name}
                    url={`/admin/users/${row.user.id}`}
                    avatar={row.user.avatar}
                    avatarVariant="circle"
                />
            ),
            flex: 1,
        },
        {
            field: "product",
            headerName: "Product",
            valueGetter: (v) => v.name,
            renderCell: ({ row }) => (
                <LinkDataCell
                    text={row.product.name}
                    url={`/admin/products/${row.product.slug}`}
                    avatar={row.product.images.find((i) => i.is_default).path}
                />
            ),
            flex: 1,
        },
        {
            field: "rating",
            headerName: "Rating",
            renderCell: ({ value }) => (
                <div className="h-full flex items-center">
                    <Rating value={value} readOnly />
                </div>
            ),
            flex: 1,
        },
        {
            field: "comment",
            headerName: "Comment",
            renderCell: ({ value, id }) => (
                <LinkDataCell text={value} onClick={() => setCurrent(id)} />
            ),
            flex: 1,
        },
        {
            field: "is_active",
            headerName: "Status",
            renderCell: ({ row, value }) => (
                <Switch
                    color="success"
                    checked={Boolean(value)}
                    onClick={() =>
                        router.put(`/admin/reviews/${row.id}/status`, {
                            is_active: !row.is_active,
                        })
                    }
                />
            ),
        },
    ];

    return (
        <>
            <DataGrid
                rows={reviews}
                columns={columns}
                showToolbar
                disableColumnMenu
                sortingOrder={["asc", "desc"]}
                pageSizeOptions={[7, 10, 25, 50, 100]}
                initialState={{
                    pagination: { paginationModel: { page: 0, pageSize: 7 } },
                }}
                slots={{ noRowsOverlay: EmptyDataGrid }}
                className="text-inherit px-5 rounded-lg"
            />
            <Drawer
                open={Boolean(current)}
                onClose={() => setCurrent(null)}
                anchor="right"
            ></Drawer>
            <ToastContainer />
        </>
    );
}

Index.layout = (page) => <Layout children={page} title={"Customer Reviews"} />;

export default Index;
