import { ChevronRight } from "@mui/icons-material";
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import LinkText from "./LinkText";

function Breadcrumbs({ data }) {
    const last = data?.length - 1;

    return (
        <div>
            <MuiBreadcrumbs separator={<ChevronRight />}>
                {data?.length > 0 &&
                    data.map((link, i) =>
                        i === last ? (
                            <p key={i} className="flex gap-2 items-center">
                                {link.icon}
                                {link.label}
                            </p>
                        ) : (
                            <LinkText
                                key={i}
                                href={link.url}
                                className="flex gap-2 items-center"
                            >
                                {link.icon}
                                {link.label}
                            </LinkText>
                        )
                    )}
            </MuiBreadcrumbs>
        </div>
    );
}

export default Breadcrumbs;
