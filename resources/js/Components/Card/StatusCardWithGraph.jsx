import { TrendingDownOutlined, TrendingUpOutlined } from "@mui/icons-material";
import { areaElementClasses, SparkLineChart } from "@mui/x-charts";
import clsx from "clsx";

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

function StatusCardWithGraph({
    title,
    value,
    label,
    change,
    data = [],
    xData = [],
    type = "line",
    id,
}) {
    const color = change >= 0 ? "green" : "red";

    const colorClass =
        change >= 0
            ? "text-green-600 bg-green-50 border-green-600"
            : "text-red-600 border-red-600 bg-red-50";

    const yMax = Math.max(...data) * 1.3;
    const yMin = -yMax * 0.2;
    return (
        <div className="flex flex-col gap-1 p-5 border rounded-xl bg-white">
            <div className="flex justify-between items-center">
                <div>{title}</div>
                <div
                    className={change >= 0 ? "text-green-600" : "text-red-600"}
                >
                    {change >= 0 ? (
                        <TrendingUpOutlined />
                    ) : (
                        <TrendingDownOutlined />
                    )}
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">{value}</div>
                <div
                    className={clsx(
                        "text-xs px-2.5 py-0.5 border rounded-full",
                        colorClass
                    )}
                >
                    {change}%
                </div>
            </div>
            <div className="text-xs text-slate-400">{label}</div>
            <div className="h-16 relative">
                <SparkLineChart
                    plotType={type}
                    data={data}
                    color={color}
                    area
                    showTooltip
                    showHighlight
                    curve="natural"
                    yAxis={{ min: yMin, max: yMax }}
                    xAxis={{
                        scaleType: type === "bar" ? "band" : "point",
                        data: xData,
                        valueFormatter: (value) =>
                            new Date(value).toLocaleString("en-EU", {
                                month: "long",
                                day: "numeric",
                            }),
                    }}
                    sx={{
                        width: "100%",
                        [`& .${SparkLineChart.root}`]: {
                            padding: 0,
                        },
                        [`& .${areaElementClasses.root}`]: {
                            fill: `url(#area-gradient-${id})`,
                        },
                    }}
                >
                    <AreaGradient color={color} id={`area-gradient-${id}`} />
                </SparkLineChart>
            </div>
        </div>
    );
}

export default StatusCardWithGraph;
