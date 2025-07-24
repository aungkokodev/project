import { Card, CardContent, CardHeader } from "@mui/material";
import clsx from "clsx";

function StatusCardWithHeader({
    title,
    subheader,
    avatar,
    children,
    className,
    action,
}) {
    return (
        <Card
            className={clsx(
                "p-5 border rounded-xl overflow-hidden shadow-none",
                className
            )}
        >
            <CardHeader
                title={title}
                subheader={subheader}
                avatar={avatar}
                action={action}
                className="p-0 mb-5"
            />
            <CardContent className="h-96 p-0">{children}</CardContent>
        </Card>
    );
}

export default StatusCardWithHeader;
