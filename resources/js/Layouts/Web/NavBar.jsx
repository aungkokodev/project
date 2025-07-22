import Container from "@/Components/Common/Container";
import LinkText from "@/Components/Common/LinkText";
import { Link, usePage } from "@inertiajs/react";
import { Avatar } from "@mui/material";
import { useRef, useState } from "react";

function NavBar() {
    const { categories = [] } = usePage().props;
    const [current, setCurrent] = useState(null);
    const [menuPosition, setMenuPosition] = useState({ left: 0 });
    const navRef = useRef(null);

    const subCategories = categories.find((c) => c.id === current);

    const handleMouseEnter = (e, category) => {
        setCurrent(category.id);
        const rect = e.target.getBoundingClientRect();
        const navRect = navRef.current.getBoundingClientRect();
        setMenuPosition({ left: rect.left - navRect.left });
    };

    const goTo = (slug) => `/collections/${slug}`;

    return (
        <nav
            ref={navRef}
            className="bg-green-600 relative"
            onMouseLeave={() => setCurrent(null)}
            onClick={() => setCurrent(null)}
        >
            <Container className="px-6 md:px-10">
                <div className="h-16 flex gap-6 items-center text-nowrap overflow-x-auto hide-scrollbar relative z-40">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={goTo(category.slug)}
                            onMouseEnter={(e) => handleMouseEnter(e, category)}
                            className="h-full flex items-center text-white hover:text-gray-100 transition-colors"
                        >
                            {category.name}
                            {category.children?.length > 0 && (
                                <span className="ms-1">&#x2304;</span>
                            )}
                        </Link>
                    ))}
                </div>

                {subCategories?.children?.length > 0 && (
                    <div
                        className="absolute top-full bg-white shadow-lg rounded-b-md overflow-hidden z-30"
                        style={{ left: `${menuPosition.left}px` }}
                        onMouseLeave={() => setCurrent(null)}
                    >
                        {subCategories.children.map((child) => (
                            <LinkText
                                key={child.id}
                                href={goTo(child.slug)}
                                className="min-w-fit flex items-center gap-2.5 px-5 py-2.5 hover:bg-gray-100 transition-colors"
                            >
                                <Avatar src={child.image} variant="square" />
                                <span className="text-nowrap">
                                    {child.name}
                                </span>
                            </LinkText>
                        ))}
                    </div>
                )}
            </Container>
        </nav>
    );
}

export default NavBar;
