import StatusCardWithHeader from "@/Components/Card/StatusCardWithHeader";
import LinkText from "@/Components/Common/LinkText";
import StatusCardWithGraph from "@/Components/StatusCardWithGraph";
import Layout from "@/Layouts/Admin/Layout";
import { formatNumber } from "@/utils/formatHelper";
import {
    BarChartOutlined,
    CalendarMonthOutlined,
    CalendarTodayOutlined,
    DateRangeOutlined,
    HomeOutlined,
    Inventory2Outlined,
    LayersOutlined,
    ShoppingCartOutlined,
    StarOutline,
    TimelineOutlined,
    TodayOutlined,
} from "@mui/icons-material";
import {
    Chip,
    LinearProgress,
    MenuItem,
    Select,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

function Index({
    sales,
    orders,
    customers,
    products,
    categorySales,
    inventory,
    recentOrders,
    topProducts,
}) {
    const [timeRange, setTimeRange] = useState("last_30_days");
    const [chartType, setChartType] = useState("line");

    const label =
        timeRange.charAt(0).toUpperCase() +
        timeRange.slice(1).split("_").join(" ");

    const ChartComponent = chartType === "line" ? LineChart : BarChart;

    const maxSales = Math.max(
        ...topProducts?.map((product) => product.sales_total || [])
    );

    return (
        <>
            <div className="flex gap-5 items-center mb-5">
                <h1 className="text-xl font-bold me-auto">
                    Dashboard Overview
                </h1>

                <Select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    size="small"
                    className="w-42"
                >
                    <MenuItem value="today">
                        <div className="flex items-center gap-2">
                            <TodayOutlined fontSize="small" />
                            Today
                        </div>
                    </MenuItem>
                    <MenuItem value="last_7_days">
                        <div className="flex items-center gap-2">
                            <DateRangeOutlined fontSize="small" />
                            Last 7 Days
                        </div>
                    </MenuItem>
                    <MenuItem value="last_30_days">
                        <div className="flex items-center gap-2">
                            <CalendarMonthOutlined fontSize="small" />
                            Last 30 Days
                        </div>
                    </MenuItem>
                    <MenuItem value="this_year">
                        <div className="flex items-center gap-2">
                            <CalendarTodayOutlined fontSize="small" />
                            This Year
                        </div>
                    </MenuItem>
                </Select>

                <ToggleButtonGroup
                    value={chartType}
                    onChange={(_, value) => {
                        if (value !== null) return setChartType(value);
                    }}
                    size="small"
                    exclusive
                >
                    <ToggleButton value="line">
                        <TimelineOutlined />
                    </ToggleButton>
                    <ToggleButton value="bar">
                        <BarChartOutlined />
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
                <StatusCardWithGraph
                    type={chartType}
                    id={"sales"}
                    title={"Sales"}
                    value={`K${formatNumber(sales[timeRange].total)}`}
                    label={label}
                    change={sales[timeRange].change}
                    data={sales[timeRange].daily?.map((v) => parseInt(v.total))}
                    xData={sales[timeRange].daily?.map((v) => new Date(v.date))}
                />
                <StatusCardWithGraph
                    type={chartType}
                    id={"orders"}
                    title={"Orders"}
                    value={orders[timeRange].total}
                    label={label}
                    change={orders[timeRange].change}
                    data={orders[timeRange].daily?.map((v) =>
                        parseInt(v.total)
                    )}
                    xData={orders[timeRange].daily?.map(
                        (v) => new Date(v.date)
                    )}
                />
                <StatusCardWithGraph
                    type={chartType}
                    id={"customers"}
                    title={"New Customers"}
                    value={customers[timeRange].total}
                    label={label}
                    change={customers[timeRange].change}
                    data={customers[timeRange].daily?.map((v) =>
                        parseInt(v.total)
                    )}
                    xData={customers[timeRange].daily?.map(
                        (v) => new Date(v.date)
                    )}
                />
                <StatusCardWithGraph
                    type={chartType}
                    id={"products"}
                    title={"Products Sold"}
                    value={products[timeRange].total}
                    label={label}
                    change={products[timeRange].change}
                    data={products[timeRange].daily?.map((v) =>
                        parseInt(v.total)
                    )}
                    xData={products[timeRange].daily?.map(
                        (v) => new Date(v.date)
                    )}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
                <StatusCardWithHeader
                    title="Sales By Category"
                    subheader="Last 12 months"
                    avatar={<LayersOutlined />}
                    className="lg:col-span-2"
                >
                    <ChartComponent
                        xAxis={[
                            {
                                data: categorySales.map((item) => item.date),
                                scaleType: "band",
                            },
                        ]}
                        series={Object.keys(categorySales[0].categories).map(
                            (categoryId) => ({
                                data: categorySales.map(
                                    (item) => item.categories[categoryId].total
                                ),
                                label: categorySales[0].categories[categoryId]
                                    .name,
                                showMark: false,
                            })
                        )}
                        slotProps={{
                            legend: {
                                direction: "row",
                                position: {
                                    vertical: "bottom",
                                    horizontal: "middle",
                                },
                            },
                        }}
                    />
                </StatusCardWithHeader>

                <StatusCardWithHeader
                    title="Inventory Status"
                    subheader="Current stock levels"
                    avatar={<Inventory2Outlined />}
                >
                    <PieChart
                        series={[
                            {
                                data: inventory,
                                innerRadius: 25,
                                outerRadius: 100,
                                paddingAngle: 5,
                                cornerRadius: 5,
                                highlightScope: {
                                    fade: "global",
                                    highlighted: "item",
                                },
                                faded: {
                                    innerRadius: 20,
                                    additionalRadius: -5,
                                    color: "gray",
                                },
                            },
                        ]}
                        slotProps={{
                            legend: {
                                direction: "horizontal",
                                position: {
                                    vertical: "bottom",
                                    horizontal: "middle",
                                },
                            },
                        }}
                    />
                </StatusCardWithHeader>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <StatusCardWithHeader
                    title="Recent Orders"
                    subheader="Latest transactions"
                    avatar={<ShoppingCartOutlined />}
                    action={
                        <LinkText href="/admin/orders" className="text-sm me-3">
                            View All
                        </LinkText>
                    }
                    className="lg:col-span-2"
                >
                    <DataGrid
                        columns={[
                            {
                                field: "order_number",
                                headerName: "Order Number",
                                headerClassName: "bg-gray-100 uppercase",
                                flex: 1,
                            },
                            {
                                field: "user",
                                headerName: "Customer",
                                headerClassName: "bg-gray-100 uppercase",
                                flex: 1,
                                valueGetter: (user) => user?.name,
                            },
                            {
                                field: "total_amount",
                                headerName: "Amount",
                                headerClassName: "bg-gray-100 uppercase",
                                flex: 1,
                                valueFormatter: (v) => `K${formatNumber(v)}`,
                            },
                            {
                                field: "status",
                                headerName: "Status",
                                headerClassName: "bg-gray-100 uppercase",
                                flex: 1,
                                renderCell: ({ value }) => (
                                    <Chip
                                        label={value}
                                        size="small"
                                        color={
                                            value === "pending"
                                                ? "warning"
                                                : value === "shipped"
                                                ? "info"
                                                : value === "delivered"
                                                ? "success"
                                                : "error"
                                        }
                                    />
                                ),
                            },
                        ]}
                        rows={recentOrders}
                        hideFooterPagination
                        disableColumnMenu
                        disableColumnSorting
                        disableRowSelectionOnClick
                        className="rounded-xl border-0"
                        sx={{}}
                    />
                </StatusCardWithHeader>

                <StatusCardWithHeader
                    title="Top Products"
                    subheader="By all time sales volume"
                    avatar={<StarOutline />}
                >
                    {topProducts?.map((product, index) => (
                        <div
                            className="flex items-start gap-2.5 mb-5"
                            key={product.id}
                        >
                            <div className="flex flex-col gap-1 flex-1">
                                <p className="text-sm font-bold">
                                    {product.name}
                                </p>
                                <div className="text-sm flex justify-between">
                                    <p>{product.sales_count} sold</p>
                                    <p className="font-bold">
                                        K{formatNumber(product.sales_total)}
                                    </p>
                                </div>
                                <LinearProgress
                                    variant="determinate"
                                    value={
                                        (product.sales_total / maxSales) * 100
                                    }
                                    className="w-full h-2 rounded-full"
                                />
                            </div>
                        </div>
                    ))}
                </StatusCardWithHeader>
            </div>
        </>
    );
}

Index.layout = (page) => (
    <Layout
        children={page}
        title={"Dashboard"}
        breadcrumbs={[
            {
                label: "Dashboard",
                url: "/admin/dashboard",
                icon: <HomeOutlined />,
            },
        ]}
    />
);

export default Index;
