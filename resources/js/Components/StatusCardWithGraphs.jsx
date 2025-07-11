import { areaElementClasses, BarChart, LineChart } from "@mui/x-charts";

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

function StatusCardWithGraphs({ type, title, label, data, id }) {
    const color = "gray";

    return (
        <div className="flex flex-col gap-1 p-5 border rounded-lg">
            <div>{title}</div>
            <div className="text-xs text-slate-400">{label}</div>
            <div className="h-64">
                {type === "line" ? (
                    <LineChart
                        xAxis={data?.map((d) => ({
                            data: d.map((_, i) => i + 1),
                            label: data.label,
                        }))}
                        series={data?.map((d) => ({
                            data: d.map((i) => parseInt(i.total)),
                            area: true,
                        }))}
                        color={color}
                        curve="natural"
                        sx={{
                            width: "100%",
                            [`& .${LineChart.root}`]: {
                                padding: 0,
                            },
                            [`& .${areaElementClasses.root}`]: {
                                fill: `url(#area-gradient-${id})`,
                            },
                        }}
                    >
                        <AreaGradient
                            color={color}
                            id={`area-gradient-${id}`}
                        />
                    </LineChart>
                ) : (
                    <BarChart
                        xAxis={data?.map((d) => ({
                            data: d.map((i) => i.date),
                        }))}
                        series={data?.map((d) => ({
                            data: d.map((i) => parseInt(i.total)),
                            area: true,
                        }))}
                        color={color}
                        curve="natural"
                        sx={{
                            width: "100%",
                            [`& .${LineChart.root}`]: {
                                padding: 0,
                            },
                            [`& .${areaElementClasses.root}`]: {
                                fill: `url(#area-gradient-${id})`,
                            },
                        }}
                    >
                        <AreaGradient
                            color={color}
                            id={`area-gradient-${id}`}
                        />
                    </BarChart>
                )}
            </div>
        </div>
    );
}

export default StatusCardWithGraphs;
