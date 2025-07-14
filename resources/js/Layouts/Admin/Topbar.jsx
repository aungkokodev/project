import LinkText from "@/Components/Common/LinkText";
import { Link } from "@inertiajs/react";
import { HomeOutlined } from "@mui/icons-material";
import { Breadcrumbs } from "@mui/material";
import { Store } from "lucide-react";

function Topbar({ title }) {
    return (
        <div className="h-16 px-10 flex gap-5 items-center border-b sticky top-0 z-50 bg-white">
            <LinkText href="/">
                <Store className="cursor-pointer" />
            </LinkText>
            {title && (
                <h1 className="font-bold text-lg w-40 truncate">{title}</h1>
            )}
            {/* <Breadcrumbs className="text-inherit text-sm">
                <Link href="/admin/dashboard" className="flex items-center">
                    <HomeOutlined fontSize="small" className="mr-1" />
                    <span>Dashboard</span>
                </Link>
                {generateBreadcrumbs(page.url)}
            </Breadcrumbs> */}
        </div>
    );
}

// function generateBreadcrumbs(url) {
//     const prefix = "/admin";
//     const paths = url
//         .split("/")
//         .filter((v) => v)
//         .slice(1);

//     const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

//     return paths.map((path, index) => {
//         const route = `${prefix}/${paths.slice(0, index + 1).join("/")}`;
//         const isLast = index === paths.length - 1;
//         const isFirst = index === 0;

//         return isLast ? (
//             <div key={index} className="text-slate-800">
//                 {isFirst ? capitalize(path) : path}
//             </div>
//         ) : (
//             <Link key={index} href={route}>
//                 {isFirst ? capitalize(path) : path}
//             </Link>
//         );
//     });
// }

export default Topbar;
