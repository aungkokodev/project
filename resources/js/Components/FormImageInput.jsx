import { AddOutlined, CloseOutlined } from "@mui/icons-material";
import { Avatar, Button, styled } from "@mui/material";
import clsx from "clsx";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

function FormImageInput({
    src,
    showImage,
    onClose,
    onChange,
    className,
    ...props
}) {
    if (showImage)
        return (
            <div className="relative">
                <Avatar
                    variant="square"
                    src={src}
                    {...props}
                    className={clsx(
                        "w-full h-auto aspect-square border rounded",
                        className
                    )}
                />
                <CloseOutlined
                    className="w-5 h-5 absolute top-1 right-1 hover:cursor-pointer hover:text-slate-800"
                    onClick={onClose}
                />
            </div>
        );

    return (
        <Button
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            disableRipple
            className={clsx(
                "w-full p-0 h-auto aspect-square border-gray-300 text-slate-600 hover:text-slate-800 hover:border-gray-800 ",
                className
            )}
        >
            <AddOutlined />
            <VisuallyHiddenInput
                type="file"
                onChange={onChange}
                accept="image/*"
            />
        </Button>
    );
}

export default FormImageInput;
