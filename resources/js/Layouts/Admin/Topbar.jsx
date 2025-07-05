import { Link, usePage } from "@inertiajs/react";
import { Breadcrumbs } from "@mui/material";

// Done
function Topbar() {
    const page = usePage();

    return (
        <div className="h-16 px-8 flex gap-8 items-center">
            <h1 className="font-bold text-lg">{getPageName(page.component)}</h1>
            <Breadcrumbs className="text-inherit text-xs">
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

function getPageName(path) {
    return path.split("/")[1];
}

export default Topbar;
