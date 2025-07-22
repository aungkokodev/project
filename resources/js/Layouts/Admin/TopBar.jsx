import Breadcrumbs from "@/Components/Common/Breadcrumbs";
import LinkText from "@/Components/Common/LinkText";
import { Store } from "lucide-react";

function TopBar({ breadcrumbs }) {
    return (
        <div className="h-16 px-10 flex gap-5 items-center bg-white">
            <Breadcrumbs data={breadcrumbs} />
            {/* <LinkText href="/" className="ms-auto">
                <Store className="cursor-pointer" />
            </LinkText> */}
        </div>
    );
}

export default TopBar;
