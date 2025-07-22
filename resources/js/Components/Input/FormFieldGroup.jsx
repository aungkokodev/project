import clsx from "clsx";

function FormFieldGroup({ title, children, className }) {
    return (
        <div className="border rounded-lg bg-white">
            <div className="p-5 border-b font-bold">{title}</div>
            <div
                className={clsx(
                    "p-5 pb-10 pe-20 flex gap-5 flex-col",
                    className
                )}
            >
                {children}
            </div>
        </div>
    );
}

export default FormFieldGroup;
