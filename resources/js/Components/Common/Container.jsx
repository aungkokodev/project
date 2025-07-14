import clsx from "clsx";

function Container({ className, children, ...props }) {
    return (
        <div {...props} className={clsx("container mx-auto px-5", className)}>
            {children}
        </div>
    );
}

export default Container;
