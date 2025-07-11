function StatusCard({ title, value, icon }) {
    return (
        <div className="flex gap-5 items-start p-5 border rounded-lg">
            <div className="w-full">
                <div className="mb-1">{title}</div>
                <div className="font-bold text-2xl">{value}</div>
            </div>
            <div className={"p-2.5 rounded-full text-green-600 bg-green-50"}>
                {icon}
            </div>
        </div>
    );
}

export default StatusCard;
