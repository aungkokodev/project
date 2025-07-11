import EmptyDataGrid from "@/Components/EmptyDataGrid";
import LinkDataCell from "@/Components/LinkDataCell";
import StatusCard from "@/Components/StatusCard";
import Layout from "@/Layouts/Admin/Layout";
import { router, usePage } from "@inertiajs/react";
import {
    BlockOutlined,
    FiberNewOutlined,
    FlagOutlined,
    RateReviewOutlined,
} from "@mui/icons-material";
import { Rating, Switch } from "@mui/material";
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
        renderCell: ({ value }) => <LinkDataCell text={value} />,
        flex: 1,
    },
    {
        field: "is_flagged",
        headerName: "Flagged",
        renderCell: ({ row, value }) => (
            <Switch
                color="success"
                checked={Boolean(value)}
                onClick={() =>
                    router.put(`/admin/reviews/${row.id}/flagged`, {
                        is_flagged: !row.is_flagged,
                    })
                }
            />
        ),
    },
    {
        field: "is_blocked",
        headerName: "Blocked",
        renderCell: ({ row, value }) => (
            <Switch
                color="success"
                checked={Boolean(value)}
                onClick={() =>
                    router.put(`/admin/reviews/${row.id}/blocked`, {
                        is_blocked: !row.is_blocked,
                    })
                }
            />
        ),
    },
];

function Index({ reviews, count }) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (toast.success) toast.success(flash.success);
    }, [flash.success]);

    return (
        <>
            <div className="grid grid-cols-4 gap-5 mb-5">
                <StatusCard
                    title={"Total Reviews"}
                    value={count["total"]}
                    icon={<RateReviewOutlined />}
                />
                <StatusCard
                    title={"Recet Reviews"}
                    value={count["recent"]}
                    icon={<FiberNewOutlined />}
                />
                <StatusCard
                    title={"Flagged"}
                    value={count["flagged"]}
                    icon={<FlagOutlined />}
                />
                <StatusCard
                    title={"Blocked"}
                    value={count["blocked"]}
                    icon={<BlockOutlined />}
                />
            </div>
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
            <ToastContainer />
        </>
    );
}

Index.layout = (page) => <Layout children={page} title={"Customer Reviews"} />;

export default Index;
