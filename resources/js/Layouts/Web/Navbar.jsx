import { Link, usePage } from "@inertiajs/react";
import { Avatar } from "@mui/material";
import { useState, useRef } from "react";

function Navbar() {
    const page = usePage();
    const [current, setCurrent] = useState(null);
    const [menuPosition, setMenuPosition] = useState({ left: 0 });
    const navRef = useRef(null);

    const categories = page.props.categories || [];
    const subCategories =
        categories.find((category) => category.id === current) || [];

    const handleMouseEnter = (e, category) => {
        setCurrent(category.id);
        const rect = e.target.getBoundingClientRect();
        const navRect = navRef.current.getBoundingClientRect();
        setMenuPosition({
            left: rect.left - navRect.left,
        });
    };

    return (
        <nav
            ref={navRef}
            className="px-5 bg-green-800 shadow-md sticky top-0 z-50"
            onMouseLeave={() => setCurrent(null)}
            onClick={() => setCurrent(null)}
        >
            <div className="h-16 flex items-center text-nowrap overflow-x-auto hide-scrollbar relative">
                {categories.map((category) => (
                    <Link
                        href={`/categories/${category.slug}`}
                        key={category.id}
                        onMouseEnter={(e) => handleMouseEnter(e, category)}
                        className="px-4 text-white whitespace-nowrap"
                    >
                        {category.name}
                    </Link>
                ))}
            </div>

            {subCategories?.children?.length > 0 && (
                <div
                    className="absolute top-full bg-white shadow-lg rounded-b-md py-2"
                    style={{
                        left: `${menuPosition.left}px`,
                    }}
                    onMouseLeave={() => setCurrent(null)}
                >
                    {subCategories.children.map((category) => (
                        <Link
                            href={`/categories/${category.slug}`}
                            key={category.id}
                            className="min-w-fit flex items-center gap-2.5 px-5 py-2.5 hover:bg-gray-100 transition-colors"
                        >
                            <Avatar src={category.image} variant="square" />
                            <span className="text-nowrap">{category.name}</span>
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}

export default Navbar;

// import { Link, usePage } from "@inertiajs/react";
// import { Avatar } from "@mui/material";
// import { useEffect, useRef, useState } from "react";

// function Navbar() {
//     const page = usePage();

//     const [current, setCurrent] = useState(null);
//     const anchor = useRef(null);
//     const child = useRef(null);

//     const categories = page.props.categories;

//     const subCategories =
//         categories.find((category) => category.id === current) || [];

//     useEffect(() => {
//         if (anchor) {
//             anchor.append(child);
//         }
//     }, []);

//     return (
//         <nav
//             className="px-5 bg-green-700 sticky top-0 z-50"
//             onMouseLeave={() => setCurrent(null)}
//             onClick={() => setCurrent(null)}
//         >
//             <div className="h-16 flex items-center text-nowrap relative overflow-x-auto hide-scrollbar ">
//                 {categories.map((category) => (
//                     <Link
//                         href={`/categories/${category.slug}`}
//                         key={category.id}
//                         onMouseEnter={(e) => {
//                             setCurrent(category.id);
//                             anchor.current = e.target;
//                         }}
//                         className="px-2.5 text-white "
//                     >
//                         {category.name}
//                     </Link>
//                 ))}
//             </div>
//             {subCategories?.children?.length > 0 && (
//                 <div
//                     className="w-auto p-5 bg-white shadow absolute bottom-0 left-0 translate-y-full"
//                     ref={child}
//                 >
//                     <div className="flex flex-col gap-5">
//                         {subCategories.children.map((category) => (
//                             <Link
//                                 href={`/categories/${category.slug}`}
//                                 key={category.id}
//                                 className="flex gap-2.5 items-center p-2.5 border rounded"
//                             >
//                                 <Avatar src={category.image} variant="square" />
//                                 {category.name}
//                             </Link>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </nav>
//     );
// }

// export default Navbar;
