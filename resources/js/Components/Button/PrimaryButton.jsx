import { Button } from "@mui/material";
import clsx from "clsx";

function PrimaryButton({
    children,
    className,
    variant = "contained",
    ...props
}) {
    return (
        <Button
            disableRipple
            {...props}
            variant={variant}
            className={clsx(
                "min-w-[200px] gap-2.5 flex items-center justify-center px-5 py-2.5 shadow-none rounded-lg hover:cursor-pointer hover:brightness-90 active:brightness-110 disabled:pointer-events-none disabled:cursor-not-allowed",
                className
            )}
        >
            {children}
        </Button>
    );
}

export default PrimaryButton;
