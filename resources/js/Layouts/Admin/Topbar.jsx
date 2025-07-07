import { Link, usePage } from "@inertiajs/react";
import { Breadcrumbs } from "@mui/material";

// Done
function Topbar({ title }) {
    const page = usePage();

    return (
        <div className="h-16 px-10 flex gap-10 items-center border-b sticky top-0 z-50 bg-white">
            {title && <h1 className="font-bold text-lg">{title}</h1>}
            <Breadcrumbs className="text-inherit">
                {generateBreadcrumbs(page.url)}
            </Breadcrumbs>
        </div>
    );
}

function generateBreadcrumbs(url) {
    const prefix = "/admin";
    const paths = url
        .split("/")
        .filter((v) => v)
        .slice(1);

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    if (paths.length < 2) return null;

    return paths.map((path, index) => {
        const route = `${prefix}/${paths.slice(0, index + 1).join("/")}`;
        const isLast = index === paths.length - 1;
        const isFirst = index === 0;

        return isLast ? (
            <div key={index} className="text-slate-900">
                {isFirst ? capitalize(path) : path}
            </div>
        ) : (
            <Link key={index} href={route}>
                {isFirst ? capitalize(path) : path}
            </Link>
        );
    });
}

export default Topbar;
