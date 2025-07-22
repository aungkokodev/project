import CustomDataGrid from "@/Components/Common/CustomDataGrid";
import DataCell from "@/Components/Common/DataCell";
import StatusCard from "@/Components/StatusCard";
import Layout from "@/Layouts/Admin/Layout";
import { router } from "@inertiajs/react";
import {
    CancelOutlined,
    CheckCircleOutline,
    FiberNewOutlined,
    HomeOutlined,
    RateReviewOutlined,
    StarOutline,
    TimelapseOutlined,
} from "@mui/icons-material";
import { Chip, Rating, Switch } from "@mui/material";

function Index({ reviews, count }) {
    return (
        <>
            <div className="grid grid-cols-4 gap-5 mb-5">
                <StatusCard
                    title={"Total Reviews"}
                    value={count["total"]}
                    icon={<RateReviewOutlined />}
                />
                <StatusCard
                    title={"Pending"}
                    value={count["pending"]}
                    icon={<TimelapseOutlined />}
                />
                <StatusCard
                    title={"Approved"}
                    value={count["approved"]}
                    icon={<CheckCircleOutline />}
                />
                <StatusCard
                    title={"New This Week"}
                    value={count["recent"]}
                    icon={<FiberNewOutlined />}
                />
            </div>
            <CustomDataGrid rows={reviews} columns={getColumns(reviews)} />
        </>
    );
}

Index.layout = (page) => (
    <Layout
        children={page}
        title={"Customer Reviews"}
        breadcrumbs={[
            {
                label: "Dashboard",
                url: "/admin/dashboard",
                icon: <HomeOutlined />,
            },
            {
                label: "Reviews",
                url: "/admin/reviews",
                icon: <StarOutline />,
            },
        ]}
    />
);

export default Index;

function getColumns(data) {
    return [
        {
            field: "id",
            headerName: "#",
            valueGetter: (id) =>
                data.findIndex((review) => review.id == id) + 1,
            width: 64,
        },
        {
            field: "product",
            headerName: "Product",
            valueGetter: (product) => product.name,
            renderCell: ({ row }) => (
                <DataCell
                    text={row.product.name}
                    avatar={row.product.images.find((i) => i.is_default).path}
                />
            ),
            flex: 1,
        },
        {
            field: "user",
            headerName: "Customer",
            valueGetter: (user) => user.name,
            renderCell: ({ row }) => (
                <DataCell
                    text={row.user.name}
                    avatar={row.user?.avatar || ""}
                    avatarVariant="circle"
                />
            ),
            flex: 1,
        },
        {
            field: "comment",
            headerName: "Comment",
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
            flex: 0.5,
        },
        {
            field: "is_reviewed",
            headerName: "Viewed by Admin",
            renderCell: ({ row, value }) => (
                <Chip
                    variant="outlined"
                    label={value ? "Checked" : "Not Checked"}
                    color={value ? "success" : "warning"}
                    icon={
                        value ? (
                            <CheckCircleOutline fontSize="small" />
                        ) : (
                            <CancelOutlined fontSize="small" />
                        )
                    }
                />
            ),
            flex: 0.5,
        },
        {
            field: "is_approved",
            headerName: "Approved",
            renderCell: ({ row, value }) => (
                <Switch
                    color="success"
                    checked={Boolean(value)}
                    onClick={() =>
                        router.put(`/admin/reviews/${row.id}/approved`, {
                            is_approved: !row.is_approved,
                        })
                    }
                />
            ),
        },
        {
            field: "created_at",
            headerName: "Created At",
            valueFormatter: (v) => new Date(v).toLocaleDateString("en-UK"),
        },
    ];
}
