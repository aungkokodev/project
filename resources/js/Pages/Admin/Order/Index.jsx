import EmptyDataGrid from "@/Components/EmptyDataGrid";
import LinkDataCell from "@/Components/LinkDataCell";
import Layout from "@/Layouts/Admin/Layout";
import { router, usePage } from "@inertiajs/react";
import { Drawer, Rating, Switch } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const columns = [
    {
        field: "id",
        headerName: "#",
        width: 64,
    },
    {
        field: "order_number",
        headerName: "Order Number",
        flex: 1,
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
        flex: 2,
    },
    {
        field: "total_amount",
        headerName: "Amount",
        align: "right",
    },
    {
        field: "status",
        headerName: "Status",
    },
    {
        field: "payment_method",
        headerName: "Method",
    },
    {
        field: "created_at",
        headerName: "Date",
        valueFormatter: (v) =>
            new Date(v).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour12: true,
                hour: "2-digit",
                minute: "2-digit",
            }),
        flex: 1,
    },
];

function Index({ orders }) {
    const { flash } = usePage().props;
    console.log(orders);
    useEffect(() => {
        if (toast.success) toast.success(flash.success);
    }, [flash.success]);

    return (
        <>
            <DataGrid
                rows={orders}
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
            <ToastContainer />
        </>
    );
}

Index.layout = (page) => <Layout children={page} title={"Orders"} />;

export default Index;
