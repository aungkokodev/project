// import EmptyDataGrid from "@/Components/EmptyDataGrid";
// import LinkDataCell from "@/Components/LinkDataCell";
// import Layout from "@/Layouts/Admin/Layout";
// import { router, usePage } from "@inertiajs/react";
// import { Drawer, Rating, Switch } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { useEffect, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";

// const columns = [
//     {
//         field: "id",
//         headerName: "#",
//         width: 64,
//     },
//     {
//         field: "order_number",
//         headerName: "Order Number",
//         flex: 1,
//     },
//     {
//         field: "user",
//         headerName: "Customer",
//         valueGetter: (v) => v.name,
//         renderCell: ({ row }) => (
//             <LinkDataCell
//                 text={row.user.name}
//                 url={`/admin/users/${row.user.id}`}
//                 avatar={row.user.avatar}
//                 avatarVariant="circle"
//             />
//         ),
//         flex: 2,
//     },
//     {
//         field: "total_amount",
//         headerName: "Amount",
//         align: "right",
//     },
//     {
//         field: "status",
//         headerName: "Status",
//     },
//     {
//         field: "payment_method",
//         headerName: "Method",
//     },
//     {
//         field: "created_at",
//         headerName: "Date",
//         valueFormatter: (v) =>
//             new Date(v).toLocaleDateString("en-US", {
//                 day: "2-digit",
//                 month: "2-digit",
//                 year: "numeric",
//                 hour12: true,
//                 hour: "2-digit",
//                 minute: "2-digit",
//             }),
//         flex: 1,
//     },
// ];

// function Index({ orders }) {
//     const { flash } = usePage().props;
//     console.log(orders);
//     useEffect(() => {
//         if (toast.success) toast.success(flash.success);
//     }, [flash.success]);

//     return (
//         <>
//             <DataGrid
//                 rows={orders}
//                 columns={columns}
//                 showToolbar
//                 disableColumnMenu
//                 sortingOrder={["asc", "desc"]}
//                 pageSizeOptions={[7, 10, 25, 50, 100]}
//                 initialState={{
//                     pagination: { paginationModel: { page: 0, pageSize: 7 } },
//                 }}
//                 slots={{ noRowsOverlay: EmptyDataGrid }}
//                 className="text-inherit px-5 rounded-lg"
//             />
//             <ToastContainer />
//         </>
//     );
// }

// Index.layout = (page) => <Layout children={page} title={"Orders"} />;

// export default Index;
import { Head, Link } from "@inertiajs/react";
import {
    LocalShippingOutlined,
    CheckCircleOutline,
    CancelOutlined,
    AccessTimeOutlined,
    FilterListOutlined,
    SearchOutlined,
    PrintOutlined,
    DownloadOutlined,
} from "@mui/icons-material";
import {
    Avatar,
    Badge,
    Button,
    Chip,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import Container from "@/Components/Common/Container";
import Layout from "@/Layouts/Admin/Layout";
import { useState } from "react";

// Mock data - replace with real API calls
const orders = [
    {
        id: "AG-2023-4567",
        customer: { name: "John Farmer", avatar: "/avatars/1.jpg" },
        date: "2023-11-25",
        items: [
            { product: "NPK Fertilizer 10-20-10", quantity: 2 },
            { product: "Tomato Seeds", quantity: 5 },
        ],
        total: 145.5,
        status: "processing",
        payment: "mobile_money",
        shipping: "farm_delivery",
    },
    {
        id: "AG-2023-4568",
        customer: { name: "Urban Gardener", avatar: "/avatars/2.jpg" },
        date: "2023-11-24",
        items: [{ product: "Potting Soil 5kg", quantity: 3 }],
        total: 75.0,
        status: "shipped",
        payment: "credit_card",
        shipping: "urban_delivery",
    },
    {
        id: "AG-2023-4569",
        customer: { name: "Greenhouse Coop", avatar: "/avatars/3.jpg" },
        date: "2023-11-23",
        items: [
            { product: "Grow Lights", quantity: 1 },
            { product: "Hydroponic Nutrients", quantity: 2 },
        ],
        total: 320.0,
        status: "delivered",
        payment: "harvest_credit",
        shipping: "bulk_delivery",
    },
];

const statusColors = {
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-yellow-100 text-yellow-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
};

const statusIcons = {
    processing: <AccessTimeOutlined fontSize="small" />,
    shipped: <LocalShippingOutlined fontSize="small" />,
    delivered: <CheckCircleOutline fontSize="small" />,
    cancelled: <CancelOutlined fontSize="small" />,
};

export default function OrderManagementPage({ orders }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <Head title="Order Management" />
            <Container className="px-4 py-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <Typography
                        variant="h5"
                        component="h1"
                        className="font-bold"
                    >
                        Agricultural Orders
                    </Typography>

                    <div className="flex gap-3 w-full md:w-auto">
                        <TextField
                            size="small"
                            placeholder="Search orders..."
                            InputProps={{
                                startAdornment: (
                                    <SearchOutlined
                                        fontSize="small"
                                        className="text-gray-400 mr-2"
                                    />
                                ),
                            }}
                            className="bg-white flex-1"
                        />

                        <Button
                            variant="outlined"
                            startIcon={<FilterListOutlined />}
                            className="whitespace-nowrap"
                        >
                            Filters
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {[
                        { label: "Today", value: 12, trend: "↑ 2%" },
                        { label: "Processing", value: 8, trend: "↓ 1%" },
                        { label: "Shipped", value: 15, trend: "↑ 5%" },
                        { label: "Revenue", value: "K 3,450", trend: "↑ 12%" },
                    ].map((stat, index) => (
                        <Paper key={index} className="p-4 rounded-lg shadow-sm">
                            <div className="flex justify-between">
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    {stat.label}
                                </Typography>
                                <Chip
                                    label={stat.trend}
                                    size="small"
                                    className="text-xs"
                                />
                            </div>
                            <Typography variant="h6" className="mt-1 font-bold">
                                {stat.value}
                            </Typography>
                        </Paper>
                    ))}
                </div>

                {/* Orders Table */}
                <Paper className="rounded-lg shadow-sm overflow-hidden">
                    <TableContainer>
                        <Table>
                            <TableHead className="bg-gray-50">
                                <TableRow>
                                    <TableCell>Order ID</TableCell>
                                    <TableCell>Customer</TableCell>
                                    <TableCell>Items</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Total</TableCell>
                                    <TableCell>Payment Method</TableCell>
                                    <TableCell>Payment Status</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((order) => (
                                        <TableRow key={order.id} hover>
                                            <TableCell>
                                                <Link
                                                    href={`/admin/orders/${order.id}`}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    {order.id}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Avatar
                                                        src={order.user.avatar}
                                                        className="w-8 h-8"
                                                    />
                                                    <span>
                                                        {order.user.name}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    {order.items.map(
                                                        (item, i) => (
                                                            <span
                                                                key={i}
                                                                className="text-sm"
                                                            >
                                                                {
                                                                    item.product
                                                                        .name
                                                                }{" "}
                                                                ×{" "}
                                                                {item.quantity}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>{order.date}</TableCell>
                                            <TableCell>
                                                K{order.total}
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={order?.payment_method?.replace(
                                                        "_",
                                                        " "
                                                    )}
                                                    size="small"
                                                    className="capitalize"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={order?.payment_status?.replace(
                                                        "_",
                                                        " "
                                                    )}
                                                    size="small"
                                                    className="capitalize"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    icon={
                                                        statusIcons[
                                                            order.status
                                                        ]
                                                    }
                                                    label={order.status}
                                                    className={`capitalize ${
                                                        statusColors[
                                                            order.status
                                                        ]
                                                    }`}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-1">
                                                    <IconButton size="small">
                                                        <PrintOutlined fontSize="small" />
                                                    </IconButton>
                                                    <IconButton size="small">
                                                        <DownloadOutlined fontSize="small" />
                                                    </IconButton>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={orders.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Container>
        </>
    );
}
OrderManagementPage.layout = (page) => <Layout children={page} />;
