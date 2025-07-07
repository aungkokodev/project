import { usePage } from "@inertiajs/react";
import clsx from "clsx";
import { useEffect, useRef } from "react";

function useScrollDirection() {
    const lastScrollTop = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const st = window.pageYOffset || document.documentElement.scrollTop;

            if (st > lastScrollTop.current) {
                console.log("Scrolling down");
            } else if (st < lastScrollTop.current) {
                console.log("Scrolling up");
            }

            lastScrollTop.current = st <= 0 ? 0 : st; // for mobile bounce
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
}

function Navbar() {
    const page = usePage();
    const categories = page.props.categories;

    return (
        <nav
            className={clsx(
                "h-16 p-4 flex gap-4 items-center bg-green-600 text-white  top-0 z-50"
            )}
        >
            {categories.map((category) => (
                <div className="relative">
                    <span>{category.name}</span>
                    {/* <div className="absolute flex flex-col gap-4 bottom-0 left-0 translate-y-full bg-white text-slate-500">
                        {category.children.map((c) => (
                            <div>{c.name}</div>
                        ))}
                    </div> */}
                </div>
            ))}
        </nav>
    );
}

export default Navbar;
