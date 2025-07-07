import { Tooltip } from "@mui/material";
import clsx from "clsx";

function IconWithTooltip({ title, icon, color = "slate", ...props }) {
    return (
        <span
            {...props}
            className={clsx(
                `cursor-pointer text-${color}-600 hover:text-${color}-700 hover:scale-110 transition-all`,
                props.className
            )}
        >
            <Tooltip title={title} placement="top" arrow>
                {icon}
            </Tooltip>
        </span>
    );
}

export default IconWithTooltip;
