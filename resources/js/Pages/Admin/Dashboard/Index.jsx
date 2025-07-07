// Temp

import Layout from "@/Layouts/Admin/Layout";
import { TrendingDownOutlined, TrendingUpOutlined } from "@mui/icons-material";
import { LinearProgress } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import { areaElementClasses, SparkLineChart } from "@mui/x-charts";
import { pieArcClasses, PieChart, pieClasses } from "@mui/x-charts/PieChart";
import { rainbowSurgePalette } from "@mui/x-charts/colorPalettes";
import { DataGrid } from "@mui/x-data-grid";
import { range } from "@mui/x-data-grid/internals";
import clsx from "clsx";

const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
        field: "age",
        headerName: "Age",
        type: "number",
        width: 90,
    },
    {
        field: "fullName",
        headerName: "Full name",
        description: "This column has a value getter and is not sortable.",
        sortable: false,
        width: 160,
        valueGetter: (value, row) =>
            `${row.firstName || ""} ${row.lastName || ""}`,
    },
];

const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

function DataTable() {
    return (
        <Paper sx={{ width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: { paginationModel: { page: 0, pageSize: 10 } },
                }}
                rowSelection={false}
            />
        </Paper>
    );
}

function AreaGradient({ color, id }) {
    return (
        <defs>
            <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
        </defs>
    );
}

function StatusCard2(props) {
    const isIncreased = props.percent > 1;
    const color = isIncreased ? "gray" : "gray";
    const yMin = 0;
    const yMax = Math.max(...props.data) * 1.5;

    return (
        <div className="bg-white p-4 rounded-md border shadow-sm flex flex-col gap-1 transition-all">
            <div className="flex justify-between items-center text-gray-600">
                <span className="me-4">{props.title}</span>
                <span
                    className={clsx(
                        "me-3",
                        isIncreased ? "text-green-500" : "text-red-500"
                    )}
                >
                    {isIncreased ? (
                        <TrendingUpOutlined />
                    ) : (
                        <TrendingDownOutlined />
                    )}
                </span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{props.amount}</span>
                <span
                    className={clsx(
                        "text-xs px-3 py-1 border rounded-full",
                        isIncreased
                            ? "text-gray-500 bg-gray-100 border-gray-500"
                            : "text-gray-500 bg-gray-100 border-gray-500"
                    )}
                >
                    {props.percent}%
                </span>
            </div>
            <div className="text-xs text-gray-600">Last {props.days} days</div>
            <div>
                <SparkLineChart
                    data={props.data}
                    color={color}
                    area
                    showTooltip
                    showHighlight
                    className="h-48 w-full m-0"
                    yAxis={{ min: yMin, max: yMax }}
                    xAxis={{
                        scaleType: "point",
                        data: range(1, props.days + 1),
                    }}
                    sx={{
                        [`& .${areaElementClasses.root}`]: {
                            fill: `url(#area-gradient-${props.id})`,
                        },
                    }}
                >
                    <AreaGradient
                        color={color}
                        id={`area-gradient-${props.id}`}
                    />
                </SparkLineChart>
            </div>
        </div>
    );
}

function StatusCard(props) {
    const isIncreased = props.percent > 1;
    const color = isIncreased ? "green" : "red";
    const yMin = 0;
    const yMax = Math.max(...props.data) * 1.5;

    return (
        <div className="bg-white p-4 rounded-md border shadow-sm flex flex-col gap-1 transition-all">
            <div className="flex justify-between items-center text-gray-600">
                <span className="me-4">{props.title}</span>
                <span
                    className={clsx(
                        "me-3",
                        isIncreased ? "text-green-500" : "text-red-500"
                    )}
                >
                    {isIncreased ? (
                        <TrendingUpOutlined />
                    ) : (
                        <TrendingDownOutlined />
                    )}
                </span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{props.amount}</span>
                <span
                    className={clsx(
                        "text-xs px-3 py-1 border rounded-full",
                        isIncreased
                            ? "text-green-500 bg-green-100 border-green-500"
                            : "text-red-500 bg-red-100 border-red-500"
                    )}
                >
                    {props.percent}%
                </span>
            </div>
            <div className="text-xs text-gray-600">Last {props.days} days</div>
            <div>
                <SparkLineChart
                    data={props.data}
                    color={color}
                    area
                    showTooltip
                    showHighlight
                    className="h-16 w-full m-0"
                    yAxis={{ min: yMin, max: yMax }}
                    xAxis={{
                        scaleType: "point",
                        data: range(1, props.days + 1),
                    }}
                    sx={{
                        [`& .${areaElementClasses.root}`]: {
                            fill: `url(#area-gradient-${props.id})`,
                        },
                    }}
                >
                    <AreaGradient
                        color={color}
                        id={`area-gradient-${props.id}`}
                    />
                </SparkLineChart>
            </div>
        </div>
    );
}

function PieChartCard() {
    const theme = useTheme();
    const palette = rainbowSurgePalette(theme.palette.mode);
    const data1 = [
        { label: "Group A", value: 400 },
        { label: "Group B", value: 300 },
        { label: "Group C", value: 300 },
        { label: "Group D", value: 200 },
    ];

    const data2 = [
        { label: "A1", value: 100, color: palette[0] },
        { label: "A2", value: 300, color: palette[0] },
        { label: "B1", value: 100, color: palette[1] },
        { label: "B2", value: 80, color: palette[1] },
        { label: "B3", value: 40, color: palette[1] },
        { label: "B4", value: 30, color: palette[1] },
        { label: "B5", value: 50, color: palette[1] },
        { label: "C1", value: 100, color: palette[2] },
        { label: "C2", value: 200, color: palette[2] },
        { label: "D1", value: 150, color: palette[3] },
        { label: "D2", value: 50, color: palette[3] },
    ];

    const settings = {
        series: [
            {
                innerRadius: 0,
                outerRadius: 80,
                data: data1,
                highlightScope: { fade: "global", highlight: "item" },
            },
            {
                id: "outer",
                innerRadius: 100,
                outerRadius: 120,
                data: data2,
                highlightScope: { fade: "global", highlight: "item" },
            },
        ],
        height: 300,
        hideLegend: true,
    };

    return (
        <PieChart
            {...settings}
            sx={{
                [`.${pieClasses.series}[data-series="outer"] .${pieArcClasses.root}`]:
                    {
                        opacity: 0.6,
                    },
            }}
        />
    );
}

function Index() {
    const totalSale = "2342K";

    return (
        <div className="flex flex-col gap-4">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <StatusCard
                    title="Sales"
                    amount={totalSale}
                    percent={-32}
                    days={30}
                    data={[
                        14, 14, 13, 15, 19, 13, 12, 13, 13, 14, 18, 14, 16, 14,
                        15, 17, 19, 20, 19, 15, 11, 15, 12, 16, 11, 16, 20, 15,
                        19, 17,
                    ]}
                    id="sale-status"
                />
                <StatusCard
                    title="Sales"
                    amount={totalSale}
                    percent={22}
                    days={30}
                    data={[
                        14, 14, 13, 15, 19, 13, 12, 13, 13, 14, 18, 14, 16, 14,
                        15, 17, 19, 20, 19, 15, 11, 15, 12, 16, 11, 16, 20, 15,
                        19, 17,
                    ]}
                    id="b-status"
                />
                <StatusCard
                    title="Sales"
                    amount={totalSale}
                    percent={-32}
                    days={30}
                    data={[
                        14, 14, 13, 15, 19, 13, 12, 13, 13, 14, 18, 14, 16, 14,
                        15, 17, 19, 20, 19, 15, 11, 15, 12, 16, 11, 16, 20, 15,
                        19, 17,
                    ]}
                    id="c-status"
                />
                <StatusCard
                    title="Sales"
                    amount={totalSale}
                    percent={-32}
                    days={30}
                    data={[
                        14, 14, 13, 15, 19, 13, 12, 13, 13, 14, 18, 14, 16, 14,
                        15, 17, 19, 20, 19, 15, 11, 15, 12, 16, 11, 16, 20, 15,
                        19, 17,
                    ]}
                    id="d-status"
                />
            </div>
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                <StatusCard2
                    title="Sales"
                    amount={totalSale}
                    percent={-32}
                    days={30}
                    data={[
                        14, 14, 13, 15, 19, 13, 12, 13, 13, 14, 18, 14, 16, 14,
                        15, 17, 19, 20, 19, 15, 11, 15, 12, 16, 11, 16, 20, 15,
                        19, 17,
                    ]}
                    id="e-status"
                />
                <StatusCard2
                    title="Sales"
                    amount={totalSale}
                    percent={-32}
                    days={30}
                    data={[
                        14, 14, 13, 15, 19, 13, 12, 13, 13, 14, 18, 14, 16, 14,
                        15, 17, 19, 20, 19, 15, 11, 15, 12, 16, 11, 16, 20, 15,
                        19, 17,
                    ]}
                    id="f-status"
                />
            </div>
            <div className="grid gap-4 grid-cols-3">
                <div className="col-span-2">
                    <DataTable />
                </div>
                <div className="border rounded-lg shadow-lg py-4 px-8 bg-white">
                    <div>Top Selling Product</div>
                    <PieChartCard />
                    <div>Product A</div>
                    <LinearProgress
                        variant="buffer"
                        value={70}
                        className="h-3 rounded-full mb-2 "
                    />
                    <div>Product A</div>
                    <LinearProgress
                        variant="buffer"
                        value={40}
                        className="h-3 rounded-full mb-2 "
                    />
                    <div>Product A</div>
                    <LinearProgress
                        variant="buffer"
                        value={35}
                        className="h-3 rounded-full mb-2 "
                    />
                    <div>Product A</div>
                    <LinearProgress
                        variant="buffer"
                        value={10}
                        className="h-3 rounded-full mb-2 "
                    />
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => <Layout children={page} title={"Dashboard"} />;

export default Index;
