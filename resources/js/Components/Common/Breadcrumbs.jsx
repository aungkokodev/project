import { usePage } from "@inertiajs/react";
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import { Home } from "lucide-react";
import LinkText from "./LinkText";
import { ChevronRight } from "@mui/icons-material";

function Breadcrumbs({ data }) {
    return (
        <div>
            <MuiBreadcrumbs separator={<ChevronRight />}>
                <LinkText href={"/"} className="flex gap-2.5 items-center">
                    <Home />
                    <span>Home</span>
                </LinkText>
                {data?.length > 0 &&
                    data.map((link, i) => (
                        <LinkText key={i} href={link.url}>
                            {link.label}
                        </LinkText>
                    ))}
            </MuiBreadcrumbs>
        </div>
    );
}

export default Breadcrumbs;
