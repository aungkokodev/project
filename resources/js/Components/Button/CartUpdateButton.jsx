import { Minus, Plus } from "lucide-react";
import IconButton from "./IconButton";
import { useState } from "react";

function CartUpdateButton({ id, quantity }) {
    const [count, setCount] = useState();

    return (
        <div className="flex gap-5 items-center border rounded-lg">
            <IconButton className="w-auto h-auto px-3 py-1.5">
                <Minus />
            </IconButton>
            <span>{count}</span>
            <IconButton className="w-auto h-auto px-3 py-1.5">
                <Plus />
            </IconButton>
        </div>
    );
}

export default CartUpdateButton;
