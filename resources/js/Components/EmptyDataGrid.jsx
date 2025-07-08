import { FolderOffOutlined } from "@mui/icons-material";

function EmptyDataGrid({ text = "No data" }) {
    return (
        <div className="flex gap-2 flex-col items-center justify-center p-4">
            <FolderOffOutlined className="w-10 h-10" />
            <p>{text}</p>
        </div>
    );
}

export default EmptyDataGrid;
