import { Avatar } from "@mui/material";

function DataCell({ text, url, avatar, avatarVariant = "square", ...props }) {
    return (
        <div className="h-full flex gap-2 items-center" {...props}>
            {avatar && <Avatar src={avatar} variant={avatarVariant} />}
            <p>{text}</p>
        </div>
    );
}

export default DataCell;
