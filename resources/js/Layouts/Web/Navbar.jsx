import { Link, usePage } from "@inertiajs/react";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

function useScrollDirection() {
    const lastScrollTop = useRef(0);
    const [direction, setDirection] = useState("up");

    useEffect(() => {
        const handleScroll = () => {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > lastScrollTop.current && st > 100) {
                setDirection("down");
            } else {
                setDirection("up");
            }
            lastScrollTop.current = st <= 0 ? 0 : st;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return direction;
}

function Navbar() {
    const page = usePage();
    const categories = page.props.categories;
    const scrollDirection = useScrollDirection();
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const navbarRef = useRef(null);

    const [maxHeight, setMaxHeight] = useState("auto");
    useEffect(() => {
        if (navbarRef.current) {
            const height = navbarRef.current.scrollHeight;
            setMaxHeight(`${height}px`);
        }
    }, [categories]);

    return (
        <nav
            ref={navbarRef}
            className={clsx(
                "sticky h-16 top-0 z-50 w-full transition-all duration-300",
                "bg-green-700 text-white shadow-lg"
                // scrollDirection === "down"
                //     ? "-translate-y-full"
                //     : "translate-y-0"
            )}
            style={{ maxHeight }}
        >
            <div className="container mx-auto px-2">
                {/* Main Categories - Horizontal Scroll */}
                <div className="flex overflow-x-auto overflow-y-hidden py-2 hide-scrollbar">
                    <div className="flex space-x-1 min-w-max">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="relative group flex-shrink-0"
                                onMouseEnter={() =>
                                    setActiveSubmenu(category.id)
                                }
                                onMouseLeave={() => setActiveSubmenu(null)}
                            >
                                <Link
                                    href={`/categories/${category.slug}`}
                                    className={clsx(
                                        "block px-3 py-2 text-sm font-medium whitespace-nowrap",
                                        "hover:bg-green-800 rounded-md transition-colors duration-200",
                                        activeSubmenu === category.id
                                            ? "bg-green-800"
                                            : ""
                                    )}
                                >
                                    {category.name}
                                </Link>

                                {/* Subcategories Dropdown */}
                                {category.children?.length > 0 && (
                                    <div
                                        className={clsx(
                                            "absolute left-0 mt-0 w-56 origin-top-left z-50",
                                            "bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5",
                                            "transition-all duration-200 transform",
                                            activeSubmenu === category.id
                                                ? "opacity-100 scale-100 z-10"
                                                : "opacity-0 scale-95 pointer-events-none"
                                        )}
                                    >
                                        <div className="py-1">
                                            {category.children.map((child) => (
                                                <Link
                                                    key={child.id}
                                                    href={`/categories/${child.slug}`}
                                                    className={clsx(
                                                        "block px-4 py-2 text-sm",
                                                        "text-gray-700 hover:bg-green-50",
                                                        "transition-colors duration-150"
                                                    )}
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx="true">{`
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </nav>
    );
}

export default Navbar;
