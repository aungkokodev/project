import { Link } from "@inertiajs/react";
import clsx from "clsx";

function LinkText({ href, children, className, ...props }) {
    return (
        <Link
            preserveScroll
            preserveState
            {...props}
            href={href}
            className={clsx(
                "hover:cursor-pointer hover:text-green-600 hover:underline",
                className
            )}
        >
            {children}
        </Link>
    );
}

export default LinkText;
