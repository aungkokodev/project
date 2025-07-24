import clsx from "clsx";

function IconButton({ className, ...props }) {
    return (
        <button
            {...props}
            className={clsx(
                "className='w-6 h-6 cursor-pointer hover:text-green-600 active:brightness-50 transition disabled:cursor-not-allowed disabled:opacity-25",
                className
            )}
        />
    );
}

export default IconButton;
