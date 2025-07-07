import { router } from "@inertiajs/react";
import { Avatar } from "@mui/material";

function LinkDataCell({ text, url, avatar, avatarVariant = "square" }) {
    return (
        <div
            className="h-full flex gap-2 items-center hover:cursor-pointer hover:text-green-600 hover:underline"
            onClick={() => router.visit(url)}
        >
            {avatar && <Avatar src={avatar} variant={avatarVariant} />}
            <p>{text}</p>
        </div>
    );
}

export default LinkDataCell;
