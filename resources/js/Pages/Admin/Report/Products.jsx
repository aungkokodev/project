import Layout from "@/Layouts/Admin/Layout";

import {
    BarChart,
    PieChart,
    LineChart,
    ScatterChart,
    SparkLineChart,
} from "@mui/x-charts";
import {
    Inventory,
    Category,
    Star,
    LocalOffer,
    Timeline,
    StackedBarChart,
    ShowChart,
    PieChart as PieChartIcon,
    Equalizer,
    TrendingUp,
    Warning,
} from "@mui/icons-material";
import {
    Card,
    CardHeader,
    CardContent,
    Select,
    MenuItem,
    Divider,
    Chip,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    Box,
    Avatar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    LinearProgress,
} from "@mui/material";
import { useState } from "react";

const ProductReportPage = () => {
    const [timeRange, setTimeRange] = useState("last_30_days");
    const [chartView, setChartView] = useState("bar");

    // Mock data for product reports
    const productData = {
        inventory: [
            { category: "Fertilizers", count: 125, lowStock: 15 },
            { category: "Seeds", count: 89, lowStock: 8 },
            { category: "Tools", count: 76, lowStock: 12 },
            { category: "Irrigation", count: 54, lowStock: 5 },
        ],
        salesPerformance: [
            {
                product: "Organic Fertilizer 5kg",
                sales: 12500,
                units: 250,
                growth: 12.5,
            },
            {
                product: "Seedling Trays (50pc)",
                sales: 8500,
                units: 170,
                growth: 8.2,
            },
            {
                product: "Garden Hose 50m",
                sales: 7500,
                units: 150,
                growth: 5.7,
            },
            { product: "Pruning Shears", sales: 6200, units: 124, growth: 3.8 },
            {
                product: "Watering Can 10L",
                sales: 4800,
                units: 96,
                growth: 2.1,
            },
        ],
        categorySales: [
            { category: "Fertilizers", sales: 35000, percentage: 35 },
            { category: "Seeds", sales: 25000, percentage: 25 },
            { category: "Tools", sales: 20000, percentage: 20 },
            { category: "Irrigation", sales: 15000, percentage: 15 },
            { category: "Other", sales: 5000, percentage: 5 },
        ],
        stockMovement: [
            { month: "Jan", incoming: 120, outgoing: 85 },
            { month: "Feb", incoming: 95, outgoing: 78 },
            { month: "Mar", incoming: 110, outgoing: 92 },
            { month: "Apr", incoming: 105, outgoing: 88 },
            { month: "May", incoming: 130, outgoing: 115 },
            { month: "Jun", incoming: 125, outgoing: 108 },
        ],
        productRatings: [
            { product: "Organic Fertilizer 5kg", rating: 4.7, reviews: 128 },
            { product: "Seedling Trays (50pc)", rating: 4.5, reviews: 95 },
            { product: "Garden Hose 50m", rating: 4.3, reviews: 87 },
            { product: "Pruning Shears", rating: 4.6, reviews: 76 },
            { product: "Watering Can 10L", rating: 4.2, reviews: 64 },
        ],
        lowStock: [
            { product: "Compost Bin 50L", current: 5, min: 20 },
            { product: "Garden Gloves L", current: 8, min: 25 },
            { product: "Seed Starter Kit", current: 12, min: 30 },
            { product: "Spray Bottle 1L", current: 18, min: 40 },
        ],
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header and Filters */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <Typography variant="h4" className="font-bold text-gray-800">
                    Product Reports
                </Typography>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <Select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="bg-white min-w-[200px]"
                        size="small"
                    >
                        <MenuItem value="last_7_days">
                            <div className="flex items-center gap-2">
                                <Timeline fontSize="small" />
                                Last 7 Days
                            </div>
                        </MenuItem>
                        <MenuItem value="last_30_days">
                            <div className="flex items-center gap-2">
                                <Equalizer fontSize="small" />
                                Last 30 Days
                            </div>
                        </MenuItem>
                        <MenuItem value="this_quarter">
                            <div className="flex items-center gap-2">
                                <TrendingUp fontSize="small" />
                                This Quarter
                            </div>
                        </MenuItem>
                        <MenuItem value="this_year">
                            <div className="flex items-center gap-2">
                                <ShowChart fontSize="small" />
                                This Year
                            </div>
                        </MenuItem>
                    </Select>

                    <ToggleButtonGroup
                        value={chartView}
                        exclusive
                        onChange={(e, newView) => setChartView(newView)}
                        size="small"
                    >
                        <ToggleButton value="bar" aria-label="bar chart">
                            <StackedBarChart fontSize="small" />
                        </ToggleButton>
                        <ToggleButton value="line" aria-label="line chart">
                            <ShowChart fontSize="small" />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <Card className="shadow-sm border border-gray-200">
                    <CardHeader
                        title="Total Products"
                        avatar={<Inventory className="text-blue-500" />}
                    />
                    <CardContent>
                        <Typography variant="h4" className="font-bold">
                            342
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            className="mt-1"
                        >
                            Across 5 categories
                        </Typography>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border border-gray-200">
                    <CardHeader
                        title="Low Stock"
                        avatar={<Warning className="text-orange-500" />}
                    />
                    <CardContent>
                        <Typography variant="h4" className="font-bold">
                            12
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            className="mt-1"
                        >
                            Needs replenishment
                        </Typography>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border border-gray-200">
                    <CardHeader
                        title="Top Category"
                        avatar={<Category className="text-green-500" />}
                    />
                    <CardContent>
                        <Typography variant="h4" className="font-bold">
                            Fertilizers
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            className="mt-1"
                        >
                            35% of total sales
                        </Typography>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border border-gray-200">
                    <CardHeader
                        title="Avg. Rating"
                        avatar={<Star className="text-yellow-500" />}
                    />
                    <CardContent>
                        <Typography variant="h4" className="font-bold">
                            4.5
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            className="mt-1"
                        >
                            From 450 reviews
                        </Typography>
                    </CardContent>
                </Card>
            </div>

            {/* Main Product Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Sales by Category */}
                <Card className="shadow-sm border border-gray-200">
                    <CardHeader
                        title="Sales by Category"
                        subheader={`Percentage of total sales`}
                        avatar={<PieChartIcon className="text-purple-500" />}
                    />
                    <CardContent className="h-[400px]">
                        <PieChart
                            series={[
                                {
                                    data: productData.categorySales.map(
                                        (item) => ({
                                            value: item.percentage,
                                            label: item.category,
                                            color: [
                                                "#4CAF50",
                                                "#2196F3",
                                                "#9C27B0",
                                                "#FF9800",
                                                "#F44336",
                                            ][
                                                productData.categorySales.indexOf(
                                                    item
                                                )
                                            ],
                                        })
                                    ),
                                    highlightScope: {
                                        faded: "global",
                                        highlighted: "item",
                                    },
                                    faded: {
                                        innerRadius: 30,
                                        additionalRadius: -30,
                                        color: "gray",
                                    },
                                    innerRadius: 50,
                                    outerRadius: 120,
                                    paddingAngle: 5,
                                    cornerRadius: 5,
                                },
                            ]}
                        />
                    </CardContent>
                </Card>

                {/* Inventory by Category */}
                <Card className="shadow-sm border border-gray-200">
                    <CardHeader
                        title="Inventory Overview"
                        subheader={`Current stock levels`}
                        avatar={<Inventory className="text-blue-500" />}
                    />
                    <CardContent className="h-[400px]">
                        {chartView === "bar" ? (
                            <BarChart
                                xAxis={[
                                    {
                                        data: productData.inventory.map(
                                            (item) => item.category
                                        ),
                                        scaleType: "band",
                                    },
                                ]}
                                series={[
                                    {
                                        data: productData.inventory.map(
                                            (item) => item.count
                                        ),
                                        label: "In Stock",
                                        color: "#4CAF50",
                                    },
                                    {
                                        data: productData.inventory.map(
                                            (item) => item.lowStock
                                        ),
                                        label: "Low Stock",
                                        color: "#FF9800",
                                    },
                                ]}
                            />
                        ) : (
                            <LineChart
                                xAxis={[
                                    {
                                        data: productData.inventory.map(
                                            (item) => item.category
                                        ),
                                        scaleType: "band",
                                    },
                                ]}
                                series={[
                                    {
                                        data: productData.inventory.map(
                                            (item) => item.count
                                        ),
                                        label: "In Stock",
                                        color: "#4CAF50",
                                        area: false,
                                    },
                                    {
                                        data: productData.inventory.map(
                                            (item) => item.lowStock
                                        ),
                                        label: "Low Stock",
                                        color: "#FF9800",
                                    },
                                ]}
                            />
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Product Performance Table */}
            <Card className="shadow-sm border border-gray-200 mb-6">
                <CardHeader
                    title="Top Performing Products"
                    subheader={`By sales volume`}
                    avatar={<Star className="text-yellow-500" />}
                />
                <CardContent>
                    <TableContainer component={Paper} elevation={0}>
                        <Table>
                            <TableHead>
                                <TableRow className="bg-gray-50">
                                    <TableCell>Product</TableCell>
                                    <TableCell align="right">
                                        Sales (K)
                                    </TableCell>
                                    <TableCell align="right">
                                        Units Sold
                                    </TableCell>
                                    <TableCell align="right">Growth</TableCell>
                                    <TableCell align="right">Rating</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {productData.salesPerformance.map(
                                    (product, index) => (
                                        <TableRow key={index} hover>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <Avatar className="w-8 h-8 mr-2 bg-blue-100 text-blue-600">
                                                        {index + 1}
                                                    </Avatar>
                                                    {product.product}
                                                </div>
                                            </TableCell>
                                            <TableCell align="right">
                                                K{product.sales}
                                            </TableCell>
                                            <TableCell align="right">
                                                {product.units}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Chip
                                                    label={`${product.growth}%`}
                                                    size="small"
                                                    color={
                                                        product.growth > 0
                                                            ? "success"
                                                            : "error"
                                                    }
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <div className="flex items-center justify-end">
                                                    <Star
                                                        className="text-yellow-500 mr-1"
                                                        fontSize="small"
                                                    />
                                                    {product.rating}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Stock Movement */}
                <Card className="shadow-sm border border-gray-200">
                    <CardHeader
                        title="Stock Movement"
                        subheader={`Monthly incoming vs outgoing`}
                        avatar={<TrendingUp className="text-green-500" />}
                    />
                    <CardContent className="h-[350px]">
                        <BarChart
                            xAxis={[
                                {
                                    data: productData.stockMovement.map(
                                        (item) => item.month
                                    ),
                                    scaleType: "band",
                                },
                            ]}
                            series={[
                                {
                                    data: productData.stockMovement.map(
                                        (item) => item.incoming
                                    ),
                                    label: "Incoming",
                                    color: "#4CAF50",
                                },
                                {
                                    data: productData.stockMovement.map(
                                        (item) => item.outgoing
                                    ),
                                    label: "Outgoing",
                                    color: "#2196F3",
                                },
                            ]}
                        />
                    </CardContent>
                </Card>

                {/* Low Stock Alerts */}
                <Card className="shadow-sm border border-gray-200">
                    <CardHeader
                        title="Low Stock Alerts"
                        subheader={`Needs immediate attention`}
                        avatar={<Warning className="text-red-500" />}
                    />
                    <CardContent>
                        <div className="space-y-4">
                            {productData.lowStock.map((product, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-center mb-1">
                                        <Typography
                                            variant="body1"
                                            className="font-medium"
                                        >
                                            {product.product}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="error"
                                        >
                                            {product.current}/{product.min}
                                        </Typography>
                                    </div>
                                    <LinearProgress
                                        variant="determinate"
                                        value={
                                            (product.current / product.min) *
                                            100
                                        }
                                        color="error"
                                    />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Product Ratings */}
                <Card className="shadow-sm border border-gray-200">
                    <CardHeader
                        title="Top Rated Products"
                        subheader={`Customer satisfaction`}
                        avatar={<Star className="text-yellow-500" />}
                    />
                    <CardContent className="h-[350px]">
                        <ScatterChart
                            series={[
                                {
                                    data: productData.productRatings.map(
                                        (item) => ({
                                            x: item.rating,
                                            y: item.reviews,
                                            id: item.product,
                                        })
                                    ),
                                    label: "Products",
                                    color: "#FF9800",
                                    valueFormatter: (value) =>
                                        `${value.id} (${value.x}★, ${value.y} reviews)`,
                                },
                            ]}
                            xAxis={[
                                {
                                    label: "Rating",
                                    min: 4,
                                    max: 5,
                                },
                            ]}
                            yAxis={[
                                {
                                    label: "Reviews Count",
                                },
                            ]}
                            tooltip={{ trigger: "item" }}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ProductReportPage;
ProductReportPage.layout = (page) => <Layout children={page} />;
