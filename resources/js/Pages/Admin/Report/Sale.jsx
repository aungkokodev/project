import { Head } from "@inertiajs/react";
import {
    MonetizationOn,
    ShoppingBasket,
    TrendingUp,
    BarChart,
    PieChart,
    CalendarToday,
    Download,
} from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Divider,
    Grid,
    IconButton,
    Paper,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
// import { Chart } from "@/Components/Chart";
import Layout from "@/Layouts/Admin/Layout";

const salesData = {
    totalRevenue: 45280.5,
    totalOrders: 1243,
    avgOrderValue: 364.2,
    monthlyTrend: [
        { month: "Jan", revenue: 6850, orders: 210 },
        { month: "Feb", revenue: 7200, orders: 225 },
        { month: "Mar", revenue: 8950, orders: 245 },
        { month: "Apr", revenue: 10200, orders: 280 },
        { month: "May", revenue: 12050, orders: 283 },
    ],
    topProducts: [
        { id: 1, name: "Organic Tomato Seeds", revenue: 8450, units: 420 },
        { id: 2, name: "NPK Fertilizer 10-10-10", revenue: 7620, units: 380 },
        { id: 3, name: "Potting Soil Mix", revenue: 6890, units: 345 },
    ],
    categories: [
        { name: "Seeds", value: 42 },
        { name: "Fertilizers", value: 33 },
        { name: "Tools", value: 15 },
        { name: "Others", value: 10 },
    ],
};

SalesInsights.layout = (page) => <Layout children={page} />;

export default function SalesInsights() {
    const theme = useTheme();

    const revenueChartData = {
        labels: salesData.monthlyTrend.map((item) => item.month),
        datasets: [
            {
                label: "Revenue (K)",
                data: salesData.monthlyTrend.map((item) => item.revenue / 1000),
                borderWidth: 2,
                borderRadius: 4,
                barPercentage: 0.6,
            },
        ],
    };

    const categoryChartData = {
        labels: salesData.categories.map((item) => item.name),
        datasets: [
            {
                data: salesData.categories.map((item) => item.value),
                backgroundColor: [],
                borderWidth: 0,
            },
        ],
    };

    return (
        <>
            <Head title="Sales Insights" />
            <Box sx={{ p: 3 }}>
                {/* Header */}
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={4}
                >
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        color="text.primary"
                    >
                        Sales Performance
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<Download />}
                        sx={{
                            bgcolor: "background.paper",
                            color: "text.primary",
                            "&:hover": { bgcolor: "action.hover" },
                        }}
                    >
                        Export Report
                    </Button>
                </Stack>

                {/* KPI Cards */}
                <Grid container spacing={3} mb={4}>
                    <Grid item xs={12} md={4}>
                        <MetricCard
                            icon={<MonetizationOn />}
                            title="Total Revenue"
                            value={`K${salesData.totalRevenue.toLocaleString()}`}
                            trend="↑ 12.5%"
                            color="primary"
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <MetricCard
                            icon={<ShoppingBasket />}
                            title="Total Orders"
                            value={salesData.totalOrders.toLocaleString()}
                            trend="↑ 8.2%"
                            color="info"
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <MetricCard
                            icon={<TrendingUp />}
                            title="Avg. Order Value"
                            value={`K${salesData.avgOrderValue.toFixed(2)}`}
                            trend="↑ 4.1%"
                            color="success"
                        />
                    </Grid>
                </Grid>

                {/* Charts Row */}
                <Grid container spacing={3} mb={4}>
                    <Grid item xs={12} md={8}>
                        <ChartCard
                            title="Monthly Revenue Trend"
                            icon={<BarChart />}
                            height={350}
                        >
                            {/* <Chart type="bar" data={revenueChartData} /> */}
                        </ChartCard>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <ChartCard
                            title="Revenue by Category"
                            icon={<PieChart />}
                            height={350}
                        >
                            {/* <Chart type="doughnut" data={categoryChartData} /> */}
                        </ChartCard>
                    </Grid>
                </Grid>

                {/* Top Products */}
                <Card elevation={0}>
                    <CardHeader
                        title="Top Performing Products"
                        action={
                            <IconButton>
                                <CalendarToday />
                            </IconButton>
                        }
                        sx={{}}
                    />
                    <Box sx={{ p: 2 }}>
                        <Grid container spacing={3}>
                            {salesData.topProducts.map((product) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    key={product.id}
                                >
                                    <ProductPerformanceCard product={product} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Card>
            </Box>
        </>
    );
}

// Reusable Components
function MetricCard({ icon, title, value, trend, color = "primary" }) {
    const theme = useTheme();
    return (
        <Card
            elevation={0}
            sx={{
                height: "100%",
            }}
        >
            <CardContent>
                <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                    <Avatar
                        sx={{
                            bgcolor: `${color}.light`,
                            color: `${color}.dark`,
                        }}
                    >
                        {icon}
                    </Avatar>
                    <Typography variant="subtitle2" color="text.secondary">
                        {title}
                    </Typography>
                </Stack>
                <Stack direction="row" alignItems="baseline" spacing={1}>
                    <Typography variant="h4" fontWeight="bold">
                        {value}
                    </Typography>
                    <Chip label={trend} size="small" color={color} />
                </Stack>
            </CardContent>
        </Card>
    );
}

function ChartCard({ title, icon, children, height }) {
    return (
        <Card
            elevation={0}
            sx={{
                height: "100%",
            }}
        >
            <CardHeader
                title={title}
                avatar={
                    <Avatar sx={{ bgcolor: "action.selected" }}>{icon}</Avatar>
                }
            />
            <CardContent sx={{ height, p: 2 }}>{children}</CardContent>
        </Card>
    );
}

function ProductPerformanceCard({ product }) {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                borderRadius: 2,
            }}
        >
            <Stack spacing={1}>
                <Typography variant="subtitle1" fontWeight="medium">
                    {product.name}
                </Typography>
                <Divider />
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                        Revenue:
                    </Typography>
                    <Typography fontWeight="medium">
                        K{product.revenue.toLocaleString()}
                    </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                        Units Sold:
                    </Typography>
                    <Typography fontWeight="medium">{product.units}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                        Avg. Price:
                    </Typography>
                    <Typography fontWeight="medium">
                        K{(product.revenue / product.units).toFixed(2)}
                    </Typography>
                </Stack>
            </Stack>
        </Paper>
    );
}
