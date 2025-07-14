import clsx from "clsx";

function IconButton(props) {
    return (
        <button
            {...props}
            className={clsx(
                "w-6 h-6 hover:cursor-pointer hover:text-green-600 active:text-green-800 transition-colors disabled:hover:text-gray-600 disabled:cursor-not-allowed",
                props.className
            )}
        />
    );
}

export default IconButton;
