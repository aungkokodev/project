import {
    Add,
    Agriculture,
    ArrowDownward,
    ArrowUpward,
    AssignmentReturn,
    AttachMoney,
    CalendarToday,
    Email,
    LocalShipping,
    People,
    Warning,
} from "@mui/icons-material";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from "@mui/material";
import React from "react";

const Admin = () => {
    // Dummy Data
    const metrics = {
        smallCards: [
            {
                title: "30-Day Revenue",
                value: "$12,840",
                change: 12,
                isIncrease: true,
                icon: <AttachMoney color="success" fontSize="large" />,
                detail: "▲ $1,380 vs last 30 days",
            },
            {
                title: "New Customers",
                value: "142",
                change: 8,
                isIncrease: true,
                icon: <People color="info" fontSize="large" />,
                detail: "65% farmers, 35% retailers",
            },
            {
                title: "Low Stock Alerts",
                value: "7",
                change: 2,
                isIncrease: true,
                icon: <Warning color="warning" fontSize="large" />,
                detail: "Organic Fertilizer (3 left)",
            },
            {
                title: "Order Fulfillment",
                value: "2.1 days",
                change: -0.5,
                isIncrease: false,
                icon: <LocalShipping color="primary" fontSize="large" />,
                detail: "92% on-time completion",
            },
        ],
        largeCards: {
            seasonal: {
                title: "Seasonal Product Performance",
                topProduct: "Tomato Seeds",
                sales: "$3,200",
                change: 38,
                regions: [
                    { name: "Yangon", percent: 45 },
                    { name: "Mandalay", percent: 30 },
                    { name: "Shan", percent: 15 },
                ],
                trendData: [12, 19, 15, 27, 24, 38],
            },
            urgentActions: [
                {
                    title: "Farmer Payouts",
                    count: 3,
                    icon: <Agriculture />,
                    time: "2-4 days pending",
                },
                {
                    title: "Returns",
                    count: 5,
                    icon: <AssignmentReturn />,
                    time: "Oldest: 3 days",
                },
                {
                    title: "Support Tickets",
                    count: 12,
                    icon: <Email />,
                    time: "4 unresolved",
                },
            ],
        },
    };

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}
            >
                <Typography variant="h4" component="h1">
                    FarmConnect Dashboard
                </Typography>
                <Chip
                    icon={<CalendarToday />}
                    label={`Last 30 Days: ${new Date().toLocaleDateString()}`}
                    variant="outlined"
                />
            </Box>

            {/* 4 Small Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {metrics.smallCards.map((card, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card elevation={3}>
                            <CardContent>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Box>
                                        <Typography
                                            color="text.secondary"
                                            variant="subtitle2"
                                        >
                                            {card.title}
                                        </Typography>
                                        <Typography variant="h5" sx={{ mt: 1 }}>
                                            {card.value}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                mt: 1,
                                            }}
                                        >
                                            {card.isIncrease ? (
                                                <ArrowUpward
                                                    color="success"
                                                    fontSize="small"
                                                />
                                            ) : (
                                                <ArrowDownward
                                                    color="error"
                                                    fontSize="small"
                                                />
                                            )}
                                            <Typography
                                                variant="body2"
                                                color={
                                                    card.isIncrease
                                                        ? "success.main"
                                                        : "error.main"
                                                }
                                                sx={{ ml: 0.5 }}
                                            >
                                                {card.change}%
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ alignSelf: "center" }}>
                                        {card.icon}
                                    </Box>
                                </Box>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ mt: 1, display: "block" }}
                                >
                                    {card.detail}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* 2 Large Cards */}
            <Grid container spacing={3}>
                {/* Seasonal Performance Card */}
                <Grid item xs={12} md={6}>
                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                {metrics.largeCards.seasonal.title}
                            </Typography>
                            <Box sx={{ display: "flex", mt: 2 }}>
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="body1">
                                        <strong>Top Product:</strong>{" "}
                                        {metrics.largeCards.seasonal.topProduct}
                                    </Typography>
                                    <Typography variant="h5" sx={{ mt: 1 }}>
                                        {metrics.largeCards.seasonal.sales}
                                    </Typography>
                                    <Chip
                                        label={`▲ ${metrics.largeCards.seasonal.change}% vs last season`}
                                        color="success"
                                        size="small"
                                        sx={{ mt: 1 }}
                                    />

                                    <Typography
                                        variant="subtitle2"
                                        sx={{ mt: 2 }}
                                    >
                                        Regional Demand:
                                    </Typography>
                                    <List dense>
                                        {metrics.largeCards.seasonal.regions.map(
                                            (region, i) => (
                                                <ListItem key={i}>
                                                    <ListItemText
                                                        primary={region.name}
                                                        secondary={`${region.percent}% of sales`}
                                                    />
                                                </ListItem>
                                            )
                                        )}
                                    </List>
                                </Box>
                                <Box
                                    sx={{
                                        flex: 1,
                                        minHeight: "200px",
                                        background: "#f5f5f5",
                                        borderRadius: 1,
                                    }}
                                >
                                    {/* Placeholder for chart */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            height: "100%",
                                            alignItems: "flex-end",
                                            justifyContent: "space-around",
                                            px: 2,
                                        }}
                                    >
                                        {metrics.largeCards.seasonal.trendData.map(
                                            (value, i) => (
                                                <Box
                                                    key={i}
                                                    sx={{
                                                        width: 8,
                                                        height: `${value}%`,
                                                        bgcolor: "primary.main",
                                                        borderRadius:
                                                            "4px 4px 0 0",
                                                    }}
                                                />
                                            )
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Urgent Actions Card */}
                <Grid item xs={12} md={6}>
                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Urgent Actions Needed
                            </Typography>
                            <List>
                                {metrics.largeCards.urgentActions.map(
                                    (action, index) => (
                                        <React.Fragment key={index}>
                                            <ListItem
                                                secondaryAction={
                                                    <IconButton edge="end">
                                                        <Add />
                                                    </IconButton>
                                                }
                                            >
                                                <ListItemAvatar>
                                                    <Avatar
                                                        sx={{
                                                            bgcolor:
                                                                "action.selected",
                                                        }}
                                                    >
                                                        {action.icon}
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={`${action.count} ${action.title}`}
                                                    secondary={action.time}
                                                    primaryTypographyProps={{
                                                        fontWeight: "medium",
                                                    }}
                                                />
                                            </ListItem>
                                            {index <
                                                metrics.largeCards.urgentActions
                                                    .length -
                                                    1 && (
                                                <Divider
                                                    variant="inset"
                                                    component="li"
                                                />
                                            )}
                                        </React.Fragment>
                                    )
                                )}
                            </List>
                            <Box sx={{ mt: 2, textAlign: "right" }}>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Last updated:{" "}
                                    {new Date().toLocaleTimeString()}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

import { CheckCircle, ShoppingCart, Star } from "@mui/icons-material";

const AdminDashboard = () => {
    // Dummy data
    const stats = [
        {
            title: "Today's Orders",
            value: 24,
            change: 12,
            isIncrease: true,
            icon: <ShoppingCart color="primary" fontSize="large" />,
        },
        {
            title: "Revenue",
            value: "$1,850",
            change: 5,
            isIncrease: false,
            icon: <AttachMoney color="success" fontSize="large" />,
        },
        {
            title: "Active Customers",
            value: 142,
            change: 30,
            isIncrease: true,
            icon: <People color="info" fontSize="large" />,
        },
        {
            title: "Urgent Alerts",
            value: 3,
            change: 1,
            isIncrease: true,
            icon: <Warning color="warning" fontSize="large" />,
        },
    ];

    const orders = [
        { status: "Pending", count: 8, color: "warning" },
        { status: "Processing", count: 12, color: "info" },
        { status: "Shipped", count: 4, color: "secondary" },
    ];

    const activities = [
        {
            time: "10:02",
            customer: "Aung Win",
            action: "Ordered Fertilizer x3",
        },
        { time: "09:45", customer: "Hla Hla", action: "Submitted Return" },
        { time: "09:30", customer: "Ko Myat", action: "Account Created" },
    ];

    const products = [
        { name: "Organic Compost", stock: 5, status: "low" },
        { name: "Seed Pack A", stock: 142, status: "good" },
        { name: "Garden Tools Set", stock: 0, status: "out" },
    ];

    return (
        <Box sx={{ p: 3 }}>
            <Admin />
            {/* Header */}
            <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}
            >
                <Typography variant="h4">Admin Dashboard</Typography>
                <Chip
                    icon={<CheckCircle />}
                    label="Store: LIVE"
                    color="success"
                    variant="outlined"
                />
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {stats.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card>
                            <CardContent>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Box>
                                        <Typography
                                            color="text.secondary"
                                            gutterBottom
                                        >
                                            {stat.title}
                                        </Typography>
                                        <Typography
                                            variant="h5"
                                            component="div"
                                        >
                                            {stat.value}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                            color={
                                                stat.isIncrease
                                                    ? "success.main"
                                                    : "error.main"
                                            }
                                        >
                                            {stat.isIncrease ? (
                                                <ArrowUpward />
                                            ) : (
                                                <ArrowDownward />
                                            )}
                                            {stat.change}%{" "}
                                            {stat.isIncrease
                                                ? "increase"
                                                : "decrease"}
                                        </Typography>
                                    </Box>
                                    {stat.icon}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Order Management */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Order Management
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    mt: 2,
                                }}
                            >
                                {orders.map((order, index) => (
                                    <Box
                                        key={index}
                                        sx={{ textAlign: "center" }}
                                    >
                                        <Chip
                                            label={order.status}
                                            color={order.color}
                                            sx={{ mb: 1 }}
                                        />
                                        <Typography variant="h4">
                                            {order.count}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Customer Activity */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Recent Activity
                            </Typography>
                            <List>
                                {activities.map((activity, index) => (
                                    <React.Fragment key={index}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar
                                                    sx={{
                                                        bgcolor: "primary.main",
                                                    }}
                                                >
                                                    {activity.customer.charAt(
                                                        0
                                                    )}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={activity.action}
                                                secondary={`${activity.time} • ${activity.customer}`}
                                            />
                                        </ListItem>
                                        {index < activities.length - 1 && (
                                            <Divider
                                                variant="inset"
                                                component="li"
                                            />
                                        )}
                                    </React.Fragment>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Product Overview */}
            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                        }}
                    >
                        <Typography variant="h6">Product Overview</Typography>
                        <IconButton color="primary" aria-label="add product">
                            <Add />
                        </IconButton>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                Low Stock Warnings
                            </Typography>
                            <List>
                                {products
                                    .filter((p) => p.status === "low")
                                    .map((product, index) => (
                                        <ListItem key={index}>
                                            <ListItemText
                                                primary={product.name}
                                                secondary={`Only ${product.stock} left`}
                                            />
                                            <Chip
                                                label="Reorder"
                                                color="warning"
                                                size="small"
                                            />
                                        </ListItem>
                                    ))}
                            </List>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                Best Sellers
                            </Typography>
                            <List>
                                {products
                                    .filter((p) => p.status === "good")
                                    .map((product, index) => (
                                        <ListItem key={index}>
                                            <ListItemAvatar>
                                                <Star color="warning" />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={product.name}
                                                secondary={`${product.stock} in stock`}
                                            />
                                        </ListItem>
                                    ))}
                            </List>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AdminDashboard;
