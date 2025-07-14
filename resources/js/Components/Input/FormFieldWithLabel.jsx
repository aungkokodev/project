function FormFieldWithLabel({ label, children }) {
    return (
        <div className="flex gap-5 items-start">
            <label className="w-40 text-sm">{label}</label>
            {children}
        </div>
    );
}

export default FormFieldWithLabel;
