import StatusCardWithHeader from "@/Components/Card/StatusCardWithHeader";
import CustomDataGrid from "@/Components/Common/CustomDataGrid";
import DataCell from "@/Components/Common/DataCell";
import StatusCard from "@/Components/Common/StatusCard";
import Layout from "@/Layouts/Admin/Layout";
import { formatNumber } from "@/utils/formatHelper";
import { router } from "@inertiajs/react";
import {
    AddBoxOutlined,
    HomeOutlined,
    LayersOutlined,
    LeaderboardOutlined,
    MonetizationOnOutlined,
    PaymentOutlined,
    PercentOutlined,
    PersonOutline,
    ShoppingCartOutlined,
    StarBorderOutlined,
    TrendingUpOutlined,
    WidgetsOutlined,
} from "@mui/icons-material";
import { Rating } from "@mui/material";
import { LineChart, PieChart } from "@mui/x-charts";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

function Sales({
    filters,
    metrics,
    sales,
    top_categories,
    top_products,
    top_customers,
    ...props
}) {
    const [startDate, setStartDate] = useState(
        dayjs(new Date()).subtract(1, "month")
    );
    const [endDate, setEndDate] = useState(dayjs(new Date()));
    const [chartType, setChartType] = useState("line");

    const timeLabel = `${startDate.format("D MMM YY")} - ${endDate.format(
        "D MMM YY"
    )}`;

    useEffect(() => {
        if (startDate && endDate && dayjs(startDate).isBefore(endDate)) {
            router.get(
                "/admin/insights/sales",
                {
                    start_date: dayjs(startDate).format("YYYY-MM-DD"),
                    end_date: dayjs(endDate).format("YYYY-MM-DD"),
                },
                { preserveScroll: true, preserveState: true }
            );
        }
    }, [startDate, endDate]);

    return (
        <>
            <div className="flex gap-5 items-center mb-5">
                <h1 className="text-xl font-bold me-auto">Reports</h1>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <label>Start Date:</label>
                    <DatePicker
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                        maxDate={endDate}
                        slotProps={{
                            textField: { size: "small" },
                        }}
                        className="w-40"
                    />

                    <label>End Date:</label>
                    <DatePicker
                        value={endDate}
                        onChange={(newValue) => setEndDate(newValue)}
                        minDate={startDate}
                        slotProps={{
                            textField: { size: "small" },
                        }}
                        className="w-40"
                    />
                </LocalizationProvider>

                {/* <ToggleButtonGroup
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
                </ToggleButtonGroup> */}
            </div>

            <div className="grid grid-cols-4 gap-5 mb-5">
                <StatusCard
                    title="Sales"
                    value={"K" + formatNumber(metrics.total_sales)}
                    icon={<TrendingUpOutlined />}
                />
                <StatusCard
                    title="Orders Delivered"
                    value={formatNumber(metrics.total_orders)}
                    icon={<ShoppingCartOutlined />}
                />
                <StatusCard
                    title="Order Cancel Rate"
                    value={formatNumber(metrics.cancel_rate) + "%"}
                    icon={<PercentOutlined />}
                />
                <StatusCard
                    title="Product Sold"
                    value={formatNumber(metrics.total_quantity)}
                    icon={<AddBoxOutlined />}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
                <StatusCardWithHeader
                    title="Total Sales"
                    subheader={timeLabel}
                    avatar={<MonetizationOnOutlined />}
                    className="col-span-full"
                >
                    <LineChart
                        xAxis={[
                            {
                                data: sales.map((item) => item.date),
                                scaleType: "band",
                            },
                        ]}
                        series={[
                            {
                                data: sales.map((item) =>
                                    parseInt(item.total / 1000)
                                ),
                                valueFormatter: (value) =>
                                    value ? value + "K" : 0,
                                label: "Sales",
                                showMark: false,
                            },
                        ]}
                    />
                </StatusCardWithHeader>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
                <StatusCardWithHeader
                    title="Order Status"
                    subheader={timeLabel}
                    avatar={<ShoppingCartOutlined />}
                >
                    <PieChart
                        series={[
                            {
                                data: Object.keys(metrics.status_counts).map(
                                    (key) => {
                                        const value =
                                            metrics.status_counts[key];
                                        return {
                                            label: key,
                                            value: value,
                                            color:
                                                key === "pending"
                                                    ? "orange"
                                                    : key === "shipped"
                                                    ? "blue"
                                                    : key === "delivered"
                                                    ? "green"
                                                    : "red",
                                        };
                                    }
                                ),
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
                <StatusCardWithHeader
                    title="Top Categories"
                    subheader={timeLabel}
                    avatar={<LayersOutlined />}
                    className="col-span-2"
                >
                    <CustomDataGrid
                        rows={top_categories}
                        showToolbar={false}
                        hideFooter={true}
                        initialState={{
                            pagination: null,
                        }}
                        columns={[
                            {
                                field: "id",
                                headerName: "#",
                                valueGetter: (id) =>
                                    top_categories?.findIndex(
                                        (c) => c.id === id
                                    ) + 1,
                                width: 64,
                            },
                            {
                                field: "name",
                                headerName: "Category Name",
                                renderCell: ({ row }) => (
                                    <DataCell
                                        avatar={row.image}
                                        text={row.name}
                                    />
                                ),
                                flex: 1,
                            },
                            // {
                            //     field: "sales_count",
                            //     headerName: "Sales Count",
                            //     valueFormatter: (value) => formatNumber(value),
                            // },
                            {
                                field: "sales_amount",
                                headerName: "Sales",
                                valueFormatter: (value) => formatNumber(value),
                            },
                        ]}
                    />
                </StatusCardWithHeader>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
                <StatusCardWithHeader
                    title="Top Products"
                    subheader={timeLabel}
                    avatar={<WidgetsOutlined />}
                    className="col-span-2"
                >
                    <CustomDataGrid
                        rows={top_products}
                        showToolbar={false}
                        hideFooter={true}
                        initialState={{
                            pagination: null,
                        }}
                        columns={[
                            {
                                field: "id",
                                headerName: "#",
                                valueGetter: (id) =>
                                    top_products?.findIndex(
                                        (c) => c.id === id
                                    ) + 1,
                                width: 64,
                            },
                            {
                                field: "name",
                                headerName: "Product Name",
                                renderCell: ({ row }) => (
                                    <DataCell
                                        avatar={row.image?.path}
                                        text={row.name}
                                    />
                                ),
                                flex: 1,
                            },
                            {
                                field: "sales_count",
                                headerName: "Sales Count",
                                valueFormatter: (value) => formatNumber(value),
                            },
                            {
                                field: "sales_amount",
                                headerName: "Sales",
                                valueFormatter: (value) => formatNumber(value),
                            },
                            // {
                            //     field: "reviews_count",
                            //     headerName: "Review Count",
                            //     valueFormatter: (value) => formatNumber(value),
                            // },
                            {
                                field: "reviews_avg_rating",
                                headerName: "Avg Rating",
                                valueFormatter: (value) => formatNumber(value),
                                renderCell: ({ row, value }) => (
                                    <div>
                                        <Rating
                                            value={+value}
                                            precision={0.5}
                                            readOnly
                                        />
                                    </div>
                                ),
                                flex: 0.5,
                            },
                        ]}
                    />
                </StatusCardWithHeader>
                <StatusCardWithHeader
                    title="Rating Status"
                    subheader={timeLabel}
                    avatar={<StarBorderOutlined />}
                >
                    <PieChart
                        series={[
                            {
                                data: Object.keys(metrics.rating_counts).map(
                                    (key) => {
                                        const value =
                                            metrics.rating_counts[key];
                                        return {
                                            label: key + " stars",
                                            value: value,
                                        };
                                    }
                                ),
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
                {/* <StatusCardWithHeader
                    title="Payment Methods"
                    subheader={timeLabel}
                    avatar={<PaymentOutlined />}
                >
                    <PieChart
                        series={[
                            {
                                data: Object.keys(metrics.payment_methods).map(
                                    (key) => {
                                        const value =
                                            metrics.payment_methods[key];
                                        return {
                                            label: key,
                                            value: value,
                                        };
                                    }
                                ),
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
                </StatusCardWithHeader> */}
                <StatusCardWithHeader
                    title="Top Customers"
                    subheader={timeLabel}
                    avatar={<PersonOutline />}
                    className="col-span-full"
                >
                    <CustomDataGrid
                        rows={top_customers}
                        showToolbar={false}
                        hideFooter={true}
                        initialState={{
                            pagination: null,
                        }}
                        columns={[
                            {
                                field: "id",
                                headerName: "#",
                                valueGetter: (id) =>
                                    top_customers?.findIndex(
                                        (c) => c.id === id
                                    ) + 1,
                                width: 64,
                            },
                            {
                                field: "name",
                                headerName: "Customer Name",
                                renderCell: ({ row }) => (
                                    <DataCell
                                        avatar={row.avatar || "no image"}
                                        text={row.name}
                                        avatarVariant="circle"
                                    />
                                ),
                                flex: 1,
                            },
                            {
                                field: "total_orders",
                                headerName: "Total Order",
                                valueFormatter: (value) => formatNumber(value),
                            },
                            {
                                field: "cancelled_orders",
                                headerName: "Cancelled Order",
                                valueFormatter: (value) => formatNumber(value),
                            },
                            {
                                field: "total_spent",
                                headerName: "Total Spent",
                                valueFormatter: (value) => formatNumber(value),
                            },
                            {
                                field: "avg_rating",
                                headerName: "Avg Rating",
                                renderCell: ({ row, value }) => (
                                    <div>
                                        <Rating
                                            value={+value}
                                            precision={0.5}
                                            readOnly
                                        />
                                    </div>
                                ),
                                flex: 0.5,
                            },
                        ]}
                    />
                </StatusCardWithHeader>
            </div>
        </>
    );
}

Sales.layout = (page) => (
    <Layout
        children={page}
        title="Reports"
        breadcrumbs={[
            {
                label: "Dashboard",
                url: "/admin/dashboard",
                icon: <HomeOutlined />,
            },
            {
                label: "Reports",
                url: "/admin/insights/sales",
                icon: <LeaderboardOutlined />,
            },
        ]}
    />
);

export default Sales;
