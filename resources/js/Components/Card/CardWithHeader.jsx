function CardWithHeader({ title, icon, children }) {
    return (
        <div className="rounded-xl border p-5 bg-white">
            <div className="mb-5 flex items-center gap-2.5">
                <span className="text-green-600">{icon}</span>
                <h2 className="font-bold">{title}</h2>
            </div>
            {children}
        </div>
    );
}

export default CardWithHeader;
