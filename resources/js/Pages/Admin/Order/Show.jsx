import { Head, Link } from "@inertiajs/react";
import {
    ArrowBack,
    LocalShipping,
    CheckCircle,
    AccessTime,
    Payment,
    Receipt,
    Print,
    Download,
    Edit,
    Call,
    Email,
    Map,
    Info,
} from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Card,
    Chip,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import Container from "@/Components/Common/Container";
import Layout from "@/Layouts/Admin/Layout";

// Mock data - replace with your API data
const order = {
    id: "AG-2023-4567",
    customer: {
        name: "John Farmer",
        email: "john@example.com",
        phone: "+260 97 123 4567",
        avatar: "/avatars/1.jpg",
        address: "123 Farm Road, Lusaka, Zambia",
    },
    date: "2023-11-25T14:30:00Z",
    items: [
        {
            id: 101,
            name: "NPK 10-20-10 Fertilizer",
            image: "/products/fertilizer.jpg",
            price: 45.0,
            quantity: 2,
            category: "Fertilizers",
            specifications: {
                weight: "50kg bag",
                composition: "Nitrogen 10%, Phosphorus 20%, Potassium 10%",
            },
        },
        {
            id: 205,
            name: "Tomato Seeds (Drought-Resistant)",
            image: "/products/tomato-seeds.jpg",
            price: 11.1,
            quantity: 5,
            category: "Seeds",
            specifications: {
                germination: "95%",
                season: "All-season",
            },
        },
    ],
    subtotal: 145.5,
    shipping: 50.0,
    total: 195.5,
    status: "processing",
    payment_method: "mobile_money",
    payment_status: "paid",
    shipping_method: "farm_delivery",
    delivery_notes: "Leave at the storage shed behind main house",
    tracking_number: "FARM-789456123",
};

const statusConfig = {
    processing: {
        icon: <AccessTime color="info" />,
        label: "Processing",
        color: "info",
    },
    shipped: {
        icon: <LocalShipping color="warning" />,
        label: "Shipped",
        color: "warning",
    },
    delivered: {
        icon: <CheckCircle color="success" />,
        label: "Delivered",
        color: "success",
    },
};

Show.layout = (page) => <Layout children={page} />;

export default function Show() {
    return (
        <>
            <Head title={`Order #${order.id}`} />
            <Container className="px-4 py-6">
                {/* Header */}
                <Stack direction="row" alignItems="center" spacing={2} mb={4}>
                    <IconButton component={Link} href="/admin/orders">
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h4" fontWeight="bold">
                        Order #{order.id}
                    </Typography>
                    <Chip
                        icon={statusConfig[order.status].icon}
                        label={statusConfig[order.status].label}
                        color={statusConfig[order.status].color}
                        sx={{ ml: 2 }}
                    />
                    <Box flexGrow={1} />
                    <Button
                        startIcon={<Print />}
                        variant="outlined"
                        size="small"
                    >
                        Print
                    </Button>
                    <Button
                        startIcon={<Download />}
                        variant="outlined"
                        size="small"
                    >
                        Export
                    </Button>
                </Stack>

                <Grid container spacing={3}>
                    {/* Left Column - Order Items */}
                    <Grid item xs={12} md={8}>
                        <Card sx={{ p: 3, mb: 3 }}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                fontWeight="bold"
                            >
                                Agricultural Products
                            </Typography>
                            <List disablePadding>
                                {order.items.map((item, index) => (
                                    <div key={item.id}>
                                        <ListItem
                                            alignItems="flex-start"
                                            sx={{ py: 2 }}
                                        >
                                            <ListItemIcon
                                                sx={{ minWidth: 72, mr: 2 }}
                                            >
                                                <Avatar
                                                    src={item.image}
                                                    variant="rounded"
                                                    sx={{
                                                        width: 56,
                                                        height: 56,
                                                    }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Link
                                                        href={`/admin/products/${item.id}`}
                                                        className="hover:underline"
                                                    >
                                                        <Typography fontWeight="medium">
                                                            {item.name}
                                                        </Typography>
                                                    </Link>
                                                }
                                                secondary={
                                                    <>
                                                        <Typography variant="body2">
                                                            {item.category} •{" "}
                                                            {item.specifications
                                                                .weight ||
                                                                item
                                                                    .specifications
                                                                    .season}
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            K
                                                            {item.price.toFixed(
                                                                2
                                                            )}{" "}
                                                            × {item.quantity} =
                                                            K
                                                            {(
                                                                item.price *
                                                                item.quantity
                                                            ).toFixed(2)}
                                                        </Typography>
                                                    </>
                                                }
                                            />
                                        </ListItem>
                                        {index < order.items.length - 1 && (
                                            <Divider />
                                        )}
                                    </div>
                                ))}
                            </List>
                        </Card>

                        {/* Delivery Notes */}
                        {order.delivery_notes && (
                            <Card sx={{ p: 3, mb: 3 }}>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                    mb={2}
                                >
                                    <Info color="info" />
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="bold"
                                    >
                                        Delivery Instructions
                                    </Typography>
                                </Stack>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        bgcolor: "warning.light",
                                        p: 2,
                                        borderRadius: 1,
                                    }}
                                >
                                    {order.delivery_notes}
                                </Typography>
                            </Card>
                        )}
                    </Grid>

                    {/* Right Column - Order Summary */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{ p: 3, mb: 3 }}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                fontWeight="bold"
                            >
                                Order Summary
                            </Typography>
                            <Stack spacing={1.5} mb={3}>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Typography variant="body2">
                                        Subtotal:
                                    </Typography>
                                    <Typography fontWeight="medium">
                                        K{order.subtotal.toFixed(2)}
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Typography variant="body2">
                                        Shipping:
                                    </Typography>
                                    <Typography fontWeight="medium">
                                        K{order.shipping.toFixed(2)}
                                    </Typography>
                                </Stack>
                                <Divider />
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="bold"
                                    >
                                        Total:
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="bold"
                                    >
                                        K{order.total.toFixed(2)}
                                    </Typography>
                                </Stack>
                            </Stack>

                            <Divider sx={{ my: 2 }} />

                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                fontWeight="bold"
                            >
                                Payment Information
                            </Typography>
                            <Stack spacing={1} mb={3}>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Typography variant="body2">
                                        Method:
                                    </Typography>
                                    <Typography
                                        fontWeight="medium"
                                        textTransform="capitalize"
                                    >
                                        {order.payment_method.replace("_", " ")}
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Typography variant="body2">
                                        Status:
                                    </Typography>
                                    <Chip
                                        label={order.payment_status}
                                        size="small"
                                        color={
                                            order.payment_status === "paid"
                                                ? "success"
                                                : "warning"
                                        }
                                    />
                                </Stack>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Typography variant="body2">
                                        Date:
                                    </Typography>
                                    <Typography variant="body2">
                                        {new Date(
                                            order.date
                                        ).toLocaleDateString()}
                                    </Typography>
                                </Stack>
                            </Stack>

                            <Divider sx={{ my: 2 }} />

                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                fontWeight="bold"
                            >
                                Shipping Information
                            </Typography>
                            <Stack spacing={1}>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Typography variant="body2">
                                        Method:
                                    </Typography>
                                    <Typography
                                        fontWeight="medium"
                                        textTransform="capitalize"
                                    >
                                        {order.shipping_method.replace(
                                            "_",
                                            " "
                                        )}
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    <Typography variant="body2">
                                        Tracking:
                                    </Typography>
                                    <Typography variant="body2">
                                        {order.tracking_number ||
                                            "Not available"}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Card>

                        {/* Customer Card */}
                        <Card sx={{ p: 3 }}>
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                                mb={2}
                            >
                                <Avatar
                                    src={order.customer.avatar}
                                    sx={{ width: 56, height: 56 }}
                                />
                                <div>
                                    <Typography fontWeight="bold">
                                        {order.customer.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Customer
                                    </Typography>
                                </div>
                            </Stack>

                            <List disablePadding>
                                <ListItem disableGutters>
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <Email fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={order.customer.email}
                                    />
                                </ListItem>
                                <ListItem disableGutters>
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <Call fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={order.customer.phone}
                                    />
                                </ListItem>
                                <ListItem disableGutters>
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <Map fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={order.customer.address}
                                    />
                                </ListItem>
                            </List>

                            <Stack direction="row" spacing={1} mt={3}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    startIcon={<Email />}
                                    size="small"
                                >
                                    Message
                                </Button>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    startIcon={<Edit />}
                                    size="small"
                                    component={Link}
                                    href={`/admin/users/${order.customer.id}`}
                                >
                                    Profile
                                </Button>
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>

                {/* Action Buttons */}
                <Stack direction="row" spacing={2} mt={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<LocalShipping />}
                    >
                        Update Shipping
                    </Button>
                    <Button variant="outlined" color="error">
                        Cancel Order
                    </Button>
                    <Button variant="outlined">Create Return</Button>
                </Stack>
            </Container>
        </>
    );
}
