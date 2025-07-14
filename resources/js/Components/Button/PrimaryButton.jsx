import clsx from "clsx";

function PrimaryButton({ children, className, variant = "solid", ...props }) {
    return (
        <button
            {...props}
            className={clsx(
                "min-w-[200px] flex gap-2.5 items-center justify-center px-5 py-3.5 rounded-lg hover:cursor-pointer disabled:bg-gray-600 disabled:hover:bg-gray-700 disabled:cursor-not-allowed",
                variant === "solid"
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : variant === "outline"
                    ? "bg-white text-green-600 border border-green-600 hover:border-green-700"
                    : "text-green-600 hover:text-green-700",
                className
            )}
        >
            {children}
        </button>
    );
}

export default PrimaryButton;
