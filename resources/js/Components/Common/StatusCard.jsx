import clsx from "clsx";

function StatusCard({ title, value, icon, className }) {
    return (
        <div className="p-5 flex gap-5 items-start border rounded-xl bg-white">
            <div className="w-full">
                <div className="mb-1">{title}</div>
                <div className="font-bold text-2xl">{value}</div>
            </div>
            <div
                className={clsx(
                    "p-2.5 rounded-full text-green-600 bg-green-50",
                    className
                )}
            >
                {icon}
            </div>
        </div>
    );
}

export default StatusCard;
