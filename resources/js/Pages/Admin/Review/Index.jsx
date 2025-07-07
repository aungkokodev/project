import IconWithTooltip from "@/Components/IconWithTooltip";
import Layout from "@/Layouts/Admin/Layout";
import { FolderOffOutlined, LaunchOutlined } from "@mui/icons-material";
import { Avatar, Rating, Switch } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function EmptyData() {
    return (
        <div className="flex gap-2 flex-col items-center justify-center p-4">
            <FolderOffOutlined className="w-10 h-10" />
            <p>No reviews</p>
        </div>
    );
}

const columns = [
    { field: "id", headerName: "#", width: 64 },
    {
        field: "user",
        headerName: "Customer",
        valueGetter: (v) => v.name,
        renderCell: (p) => (
            <div className="flex gap-2 items-center">
                <Avatar src={p.row.user.avatar} />
                <span>{p.value}</span>
            </div>
        ),
        flex: 1,
    },
    {
        field: "product",
        headerName: "Product",
        valueGetter: (v) => v.name,
        renderCell: (p) => (
            <div className="flex gap-2 items-center">
                <Avatar src={p.row.product.image} variant="square" />
                <span>{p.value}</span>
            </div>
        ),
        flex: 1,
    },
    {
        field: "rating",
        headerName: "Rating",
        renderCell: (p) => (
            <div className="flex h-full items-center">
                <Rating value={p.value} readOnly />
            </div>
        ),
        flex: 1,
    },
    {
        field: "comment",
        headerName: "Comment",
        flex: 1,
    },
    {
        field: "is_active",
        headerName: "Show",
        renderCell: (p) => (
            <div className="flex h-full items-center">
                <Switch checked={Boolean(p.value)} color="success" />
            </div>
        ),
    },
    // {
    //     field: "actions",
    //     headerName: "Actions",
    //     renderCell: () => (
    //         <div className="flex gap-1 items-center justify-center">
    //             <IconWithTooltip icon={<LaunchOutlined />} title="view" />
    //         </div>
    //     ),
    // },
];

function Index({ reviews }) {
    return (
        <div>
            <DataGrid
                rows={reviews}
                columns={columns}
                showToolbar
                disableColumnMenu
                pageSizeOptions={[8, 10, 25, 50, 100]}
                initialState={{
                    pagination: { paginationModel: { page: 0, pageSize: 8 } },
                }}
                slots={{ noRowsOverlay: EmptyData }}
                className="text-inherit px-4 rounded-lg"
            />
        </div>
    );
}

Index.layout = (page) => <Layout children={page} />;

export default Index;
