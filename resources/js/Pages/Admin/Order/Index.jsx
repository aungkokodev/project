import CustomDataGrid from "@/Components/Common/CustomDataGrid";
import DataCell from "@/Components/Common/DataCell";
import StatusCard from "@/Components/Common/StatusCard";
import Layout from "@/Layouts/Admin/Layout";
import { formatNumber, getDate } from "@/utils/formatHelper";
import {
    AccessTimeOutlined,
    CancelOutlined,
    CheckCircleOutlined,
    EditOutlined,
    HomeOutlined,
    HourglassEmptyOutlined,
    LocalShippingOutlined,
    ShoppingCartOutlined,
    TodayOutlined,
    VisibilityOutlined,
} from "@mui/icons-material";
import { Chip, MenuItem } from "@mui/material";

function Index({ orders, counts }) {
    const [openDetails, setOpenDetails] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);
    console.log(counts);
    return (
        <>
            <div className="grid grid-cols-4 gap-5 mb-5">
                <StatusCard
                    title="Today"
                    value={counts.today}
                    icon={<TodayOutlined />}
                />
                <StatusCard
                    title="Pending"
                    value={counts.pending}
                    icon={<HourglassEmptyOutlined />}
                />
                <StatusCard
                    title="Shipped"
                    value={counts.shipped}
                    icon={<LocalShippingOutlined />}
                />
                <StatusCard
                    title="Cancelled"
                    value={counts.cancelled}
                    icon={<CancelOutlined />}
                />
            </div>

            <CustomDataGrid
                rows={orders}
                columns={getColumns(
                    orders,
                    (order) => {
                        setCurrentOrder(order);
                        setOpenDetails(true);
                    },
                    (order) => {
                        setCurrentOrder(order);
                        setOpenEdit(true);
                    }
                )}
            />

            {currentOrder && (
                <OrderDetailModal
                    order={currentOrder}
                    open={openDetails}
                    onClose={() => setOpenDetails(false)}
                />
            )}

            {currentOrder && (
                <OrderEditModal
                    order={currentOrder}
                    open={openEdit}
                    onClose={() => setOpenEdit(false)}
                />
            )}
        </>
    );
}

Index.layout = (page) => (
    <Layout
        children={page}
        title="Orders"
        breadcrumbs={[
            {
                label: "Dashboard",
                url: "/admin/dashboard",
                icon: <HomeOutlined />,
            },
            {
                label: "Orders",
                url: "/admin/orders",
                icon: <ShoppingCartOutlined />,
            },
        ]}
    />
);

export default Index;

function getColumns(orders, onDetails, onEdit) {
    return [
        {
            field: "id",
            headerName: "#",
            width: 64,
            valueGetter: (id) =>
                orders.findIndex((order) => order.id == id) + 1,
        },
        {
            field: "order_number",
            headerName: "Order Number",
            flex: 0.5,
        },
        {
            field: "user",
            headerName: "Customer",
            flex: 1,
            valueGetter: (v) => v.name,
            renderCell: ({ row }) => (
                <DataCell
                    text={row.user.name}
                    url={`/admin/users/${row.user.id}`}
                    avatar={row.user.avatar || "no avatar"}
                    avatarVariant="circle"
                />
            ),
        },
        {
            field: "total_amount",
            headerName: "Total",
            flex: 0.5,
            valueGetter: (value) => parseInt(value),
            valueFormatter: (value) => formatNumber(value),
        },
        {
            field: "payment_method",
            headerName: "Payment Method",
            flex: 0.5,
        },
        {
            field: "payment_status",
            headerName: "Payment Status",
            flex: 0.5,
        },
        {
            field: "status",
            headerName: "Order Status",
            flex: 0.5,
            renderCell: ({ row }) => (
                <Chip
                    label={row.status}
                    variant="outlined"
                    color={
                        row.status === "pending"
                            ? "warning"
                            : row.status === "shipped"
                            ? "info"
                            : row.status === "delivered"
                            ? "success"
                            : "error"
                    }
                    icon={
                        row.status === "pending" ? (
                            <AccessTimeOutlined fontSize="small" />
                        ) : row.status === "shipped" ? (
                            <LocalShippingOutlined />
                        ) : row.status === "delivered" ? (
                            <CheckCircleOutlined />
                        ) : (
                            <CancelOutlined />
                        )
                    }
                />
            ),
        },
        {
            field: "created_at",
            headerName: "Order At",
            valueFormatter: (value) => getDate(value),
        },
        {
            field: "actions",
            headerName: "Actions",
            renderCell: ({ row }) => (
                <div className="flex gap-1 items-center justify-center">
                    <IconWithTooltip
                        icon={<VisibilityOutlined />}
                        title="View Details"
                        onClick={() => onDetails(row)}
                    />
                    <IconWithTooltip
                        icon={<EditOutlined />}
                        title="Edit"
                        color="green"
                        onClick={() => onEdit(row)}
                    />
                </div>
            ),
        },
    ];
}

function OrderEditModal({ order, open, onClose }) {
    const { data, setData, errors, setErrors, reset, processing, post } =
        useForm({
            status: "",
            payment_status: "",
            admin_notes: "",
        });

    useEffect(() => {
        setData({
            status: order.status,
            payment_status: order.payment_status,
            admin_notes: order.admin_notes || "",
        });
    }, [order]);

    const handleCancel = () => {
        reset();
        onClose();
    };

    const handleSubmit = () => {
        post(`/admin/orders/${order.id}`, {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm">
            <DialogTitle className="p-5 text-lg">
                Edit Order #{order.order_number}
            </DialogTitle>
            <DialogContent dividers className="p-5 space-y-5">
                <div>
                    <label>Order Status</label>
                    <Select
                        className="w-full"
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                    >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="shipped">Shipped</MenuItem>
                        <MenuItem value="delivered">Delivered</MenuItem>
                        <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                </div>
                <div>
                    <label>Payment Status</label>
                    <Select
                        className="w-full"
                        value={data.payment_status}
                        onChange={(e) =>
                            setData("payment_status", e.target.value)
                        }
                    >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="paid">Paid</MenuItem>
                    </Select>
                </div>
                <div>
                    <label>Admin Note</label>
                    <TextField
                        multiline
                        rows={3}
                        value={data.admin_notes}
                        onChange={(e) => setData("admin_notes", e.target.value)}
                        className="w-full"
                    />
                </div>
            </DialogContent>
            <DialogActions className="p-5">
                <PrimaryButton
                    variant="outlined"
                    onClick={handleCancel}
                    disabled={processing}
                >
                    Cancel
                </PrimaryButton>
                <PrimaryButton onClick={handleSubmit} disabled={processing}>
                    Save Changes
                </PrimaryButton>
            </DialogActions>
        </Dialog>
    );
}

import PrimaryButton from "@/Components/Button/PrimaryButton";
import IconWithTooltip from "@/Components/IconWithTooltip";
import Select from "@/Components/Input/Select";
import TextField from "@/Components/Input/TextField";
import { router, useForm } from "@inertiajs/react";
import {
    AccessTime,
    CheckCircle,
    Close,
    Email,
    Home,
    LocalShipping,
    MonetizationOn,
    Payment,
    Person,
    Phone,
    Print,
    Receipt,
} from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Step,
    StepLabel,
    Stepper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
const OrderDetailModal = ({ order, open, onClose }) => {
    const [activeTab, setActiveTab] = useState(0);

    const steps = [
        {
            label: "Order Placed",
            icon: <Receipt fontSize="small" />,
            date: order.created_at,
            completed: true,
        },
        {
            label: "Payment",
            icon: <MonetizationOn fontSize="small" />,
            date: order.payment_status === "paid" ? order.updated_at : null,
            completed: order.payment_status === "paid",
        },
        {
            label: "Processing",
            icon: <AccessTime fontSize="small" />,
            date: order.status !== "pending" ? order.updated_at : null,
            completed: ["shipped", "delivered"].includes(order.status),
        },
        {
            label: "Shipped",
            icon: <LocalShipping fontSize="small" />,
            date: order.shipped_at,
            completed: ["shipped", "delivered"].includes(order.status),
        },
        {
            label: "Delivered",
            icon: <CheckCircle fontSize="small" />,
            date: order.delivered_at,
            completed: order.status === "delivered",
        },
    ];

    const activeStep = steps.findIndex((step) => !step.completed) - 1;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{ sx: { borderRadius: 3 } }}
        >
            <DialogTitle className="flex items-center justify-between bg-gray-50">
                <div className="flex items-center gap-3">
                    <Receipt color="primary" />
                    <div>
                        <Typography variant="h6">
                            Order #{order.order_number}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {getDate(order.created_at)}
                        </Typography>
                    </div>
                    <Chip
                        label={order.status}
                        color={
                            order.status === "delivered"
                                ? "success"
                                : order.status === "shipped"
                                ? "info"
                                : order.status === "cancelled"
                                ? "error"
                                : "warning"
                        }
                        size="small"
                    />
                </div>
                <IconButton onClick={onClose} size="small">
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers className="space-y-4">
                <Box sx={{ width: "100%", py: 2 }}>
                    <Stepper
                        activeStep={activeStep >= 0 ? activeStep : steps.length}
                        alternativeLabel
                    >
                        {steps.map((step, index) => (
                            <Step key={step.label} completed={step.completed}>
                                <StepLabel
                                    icon={
                                        <Avatar
                                            sx={{
                                                width: 24,
                                                height: 24,
                                                bgcolor: step.completed
                                                    ? "primary.main"
                                                    : "action.disabledBackground",
                                                color: step.completed
                                                    ? "primary.contrastText"
                                                    : "action.disabled",
                                            }}
                                        >
                                            {step.icon}
                                        </Avatar>
                                    }
                                >
                                    <Typography variant="caption">
                                        {step.label}
                                    </Typography>
                                    {step.date && (
                                        <Typography
                                            variant="caption"
                                            display="block"
                                        >
                                            {getDate(step.date)}
                                        </Typography>
                                    )}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>

                <Tabs
                    value={activeTab}
                    onChange={(e, newValue) => setActiveTab(newValue)}
                    variant="fullWidth"
                >
                    <Tab
                        label="Order Items"
                        icon={<Receipt fontSize="small" />}
                    />
                    <Tab label="Customer" icon={<Person fontSize="small" />} />
                    <Tab
                        label="Shipping"
                        icon={<LocalShipping fontSize="small" />}
                    />
                    <Tab label="Payment" icon={<Payment fontSize="small" />} />
                </Tabs>

                <Box sx={{ pt: 2 }}>
                    {activeTab === 0 && (
                        <TableContainer component={Paper} elevation={0}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell align="right">
                                            Price
                                        </TableCell>
                                        <TableCell align="center">
                                            Qty
                                        </TableCell>
                                        <TableCell align="right">
                                            Total
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.items.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar
                                                        src={
                                                            item.product.image
                                                                ?.path
                                                        }
                                                        alt={item.product.name}
                                                        variant="rounded"
                                                        sx={{
                                                            width: 48,
                                                            height: 48,
                                                        }}
                                                    />
                                                    <div>
                                                        <Typography fontWeight="medium">
                                                            {item.product.name}
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                        >
                                                            {
                                                                item.product
                                                                    .category
                                                                    ?.name
                                                            }
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell align="right">
                                                K{formatNumber(item.price)}
                                            </TableCell>
                                            <TableCell align="center">
                                                {item.quantity}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                className="font-medium"
                                            >
                                                K
                                                {formatNumber(
                                                    item.price * item.quantity
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell rowSpan={3} />
                                        <TableCell colSpan={2}>
                                            Subtotal
                                        </TableCell>
                                        <TableCell align="right">
                                            K
                                            {formatNumber(
                                                order.items.reduce(
                                                    (sum, item) =>
                                                        sum +
                                                        item.price *
                                                            item.quantity,
                                                    0
                                                )
                                            )}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={2}>
                                            Shipping
                                        </TableCell>
                                        <TableCell align="right">
                                            {order.shipping_cost
                                                ? `K${formatNumber(
                                                      order.shipping_cost
                                                  )}`
                                                : "Free"}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell
                                            colSpan={2}
                                            className="font-medium"
                                        >
                                            Total
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            className="font-medium"
                                        >
                                            K{formatNumber(order.total_amount)}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}

                    {activeTab === 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Paper elevation={0} className="p-4">
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    className="font-medium"
                                >
                                    Customer Information
                                </Typography>
                                <List dense>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Person color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={order.user.name}
                                            secondary="Customer Name"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Email color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={order.user.email}
                                            secondary="Email Address"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Phone color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                order.user.phone ||
                                                "Not provided"
                                            }
                                            secondary="Phone Number"
                                        />
                                    </ListItem>
                                </List>
                            </Paper>

                            <Paper elevation={0} className="p-4">
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    className="font-medium"
                                >
                                    Order Notes
                                </Typography>
                                {order.notes ? (
                                    <Typography
                                        variant="body2"
                                        className="whitespace-pre-line"
                                    >
                                        {order.notes}
                                    </Typography>
                                ) : (
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        No customer notes
                                    </Typography>
                                )}

                                {order.admin_notes && (
                                    <>
                                        <Divider sx={{ my: 2 }} />
                                        <Typography
                                            variant="subtitle2"
                                            gutterBottom
                                            className="font-medium"
                                        >
                                            Admin Notes
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            className="whitespace-pre-line"
                                        >
                                            {order.admin_notes}
                                        </Typography>
                                    </>
                                )}
                            </Paper>
                        </div>
                    )}

                    {activeTab === 2 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Paper elevation={0} className="p-4">
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    className="font-medium"
                                >
                                    Shipping Address
                                </Typography>
                                <List dense>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Person color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                order.shipping_address.fullname
                                            }
                                            secondary="Recipient Name"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Home color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={`${order.shipping_address.street}, ${order.shipping_address.city}`}
                                            secondary="Address"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Phone color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                order.shipping_address.phone
                                            }
                                            secondary="Contact Number"
                                        />
                                    </ListItem>
                                </List>
                            </Paper>

                            <Paper elevation={0} className="p-4">
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    className="font-medium"
                                >
                                    Shipping Details
                                </Typography>
                                <List dense>
                                    <ListItem>
                                        <ListItemText
                                            primary="Shipping Method"
                                            secondary={
                                                order.shipping_method ||
                                                "Standard Shipping"
                                            }
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="Shipping Cost"
                                            secondary={
                                                order.shipping_cost
                                                    ? `K${formatNumber(
                                                          order.shipping_cost
                                                      )}`
                                                    : "Free"
                                            }
                                        />
                                    </ListItem>
                                    {order.shipped_at && (
                                        <ListItem>
                                            <ListItemText
                                                primary="Shipped On"
                                                secondary={getDate(
                                                    order.shipped_at
                                                )}
                                            />
                                        </ListItem>
                                    )}
                                    {order.tracking_number && (
                                        <ListItem>
                                            <ListItemText
                                                primary="Tracking Number"
                                                secondary={
                                                    <Button
                                                        variant="text"
                                                        size="small"
                                                        onClick={() =>
                                                            window.open(
                                                                `https://tracking.service.com/${order.tracking_number}`
                                                            )
                                                        }
                                                    >
                                                        {order.tracking_number}
                                                    </Button>
                                                }
                                            />
                                        </ListItem>
                                    )}
                                </List>
                            </Paper>
                        </div>
                    )}

                    {activeTab === 3 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Paper elevation={0} className="p-4">
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    className="font-medium"
                                >
                                    Payment Information
                                </Typography>
                                <List dense>
                                    <ListItem>
                                        <ListItemText
                                            primary="Payment Method"
                                            secondary={
                                                <Chip
                                                    label={order.payment_method.replace(
                                                        /_/g,
                                                        " "
                                                    )}
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            }
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="Payment Status"
                                            secondary={
                                                <Chip
                                                    label={order.payment_status}
                                                    size="small"
                                                    color={
                                                        order.payment_status ===
                                                        "paid"
                                                            ? "success"
                                                            : "warning"
                                                    }
                                                />
                                            }
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="Amount Paid"
                                            secondary={`K${formatNumber(
                                                order.total_amount
                                            )}`}
                                        />
                                    </ListItem>
                                    {order.payment_reference && (
                                        <ListItem>
                                            <ListItemText
                                                primary="Reference Number"
                                                secondary={
                                                    order.payment_reference
                                                }
                                            />
                                        </ListItem>
                                    )}
                                </List>
                            </Paper>

                            <Paper elevation={0} className="p-4">
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    className="font-medium"
                                >
                                    Billing Address
                                </Typography>
                                {order.billing_address ? (
                                    <List dense>
                                        <ListItem>
                                            <ListItemText
                                                primary={
                                                    order.billing_address
                                                        .fullname
                                                }
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary={
                                                    order.billing_address.street
                                                }
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary={`${order.billing_address.city}, ${order.billing_address.state}`}
                                            />
                                        </ListItem>
                                    </List>
                                ) : (
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Same as shipping address
                                    </Typography>
                                )}
                            </Paper>
                        </div>
                    )}
                </Box>
            </DialogContent>

            <DialogActions className="bg-gray-50">
                <Button variant="contained" onClick={onClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};
