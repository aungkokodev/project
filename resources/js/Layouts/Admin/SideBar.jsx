import { Link, usePage } from "@inertiajs/react";
import {
    DashboardCustomizeOutlined,
    DashboardOutlined,
    ExpandLess,
    ExpandMore,
    GrassOutlined,
    LayersOutlined,
    LeaderboardOutlined,
    LogoutOutlined,
    ShoppingCartOutlined,
    StarOutline,
    WidgetsOutlined,
} from "@mui/icons-material";
import {
    Avatar,
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Tooltip,
} from "@mui/material";
import clsx from "clsx";
// import { ChevronDown, ChevronUp, LogOut } from "lucide-react";
import { useReducer, useState } from "react";

function LinkOrDiv({ onClick, href, children }) {
    return href ? (
        <Link href={href}>{children}</Link>
    ) : (
        <div onClick={onClick}>{children}</div>
    );
}

function NavItem({ menu }) {
    const [open, toggle] = useReducer((s) => !s, false);

    const page = usePage();

    function activeStyle(url) {
        return page.url.startsWith(url) ? "bg-green-600 text-white" : "";
    }

    function parentActiveStyle(urls) {
        if (!urls) return "";

        if (urls.some((url) => page.url.startsWith(url)) && !open)
            return "bg-green-600 text-white";
        else return "";
    }

    return (
        <>
            <LinkOrDiv href={menu.url} onClick={toggle}>
                <ListItemButton
                    className={clsx(
                        "rounded-lg transition-all",
                        activeStyle(menu.url),
                        parentActiveStyle(menu.children?.map((c) => c.url))
                    )}
                >
                    <ListItemIcon className="min-w-8 text-inherit">
                        {menu.icon}
                    </ListItemIcon>
                    <ListItemText>
                        <span className="text-sm">{menu.text}</span>
                    </ListItemText>
                    {menu.children && (open ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
            </LinkOrDiv>

            {menu.children && (
                <Collapse in={open}>
                    <List className="py-0 ps-4">
                        {menu.children.map((child, index) => (
                            <Link key={index} href={child.url}>
                                <ListItemButton
                                    className={clsx(
                                        "rounded-lg transition-all",
                                        activeStyle(child.url)
                                    )}
                                >
                                    <ListItemIcon className="min-w-8 text-inherit">
                                        {child.icon}
                                    </ListItemIcon>
                                    <ListItemText>
                                        <span className="text-sm">
                                            {child.text}
                                        </span>
                                    </ListItemText>
                                </ListItemButton>
                            </Link>
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );
}

function Profile() {
    const page = usePage();
    const user = page.props.auth.user;

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
    const handleMenuClose = (link) => {
        setAnchorEl(null);
    };

    return (
        <div className="w-full h-16 flex gap-2 items-center px-4 absolute left-0 bottom-0 border-t bg-gray-50">
            <Avatar src={user.avatar} />
            <div className="me-auto">
                <p className="font-bold truncate">{user.name}</p>
                <p className="text-xs truncate">{user.email}</p>
            </div>
            <div
                className="py-1.5 hover:text-red-800 hover:cursor-pointer"
                onClick={handleMenuOpen}
                id="account-options"
                aria-controls={openMenu ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
            >
                <Tooltip title="Logout" arrow>
                    <Link href="/logout" method="post">
                        <LogoutOutlined />
                    </Link>
                </Tooltip>
            </div>

            {/* <Menu
                open={openMenu}
                anchorEl={anchorEl}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                slotProps={{
                    root: {
                        "aria-hidden": false,
                    },
                }}
                id="account-menu"
                aria-labelledby="account-options"
            >
                <Link href="/admin/profile">
                    <MenuItem onClick={handleMenuClose}>
                        <ListItemIcon>
                            <UserCircle />
                        </ListItemIcon>
                        <ListItemText>Profile</ListItemText>
                    </MenuItem>
                </Link>
                <Link href="/logout" method="post">
                    <MenuItem onClick={handleMenuClose}>
                        <ListItemIcon>
                            <LogOut />
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </MenuItem>
                </Link>
            </Menu> */}
        </div>
    );
}

function SideBar() {
    return (
        <div className="h-full bg-gray-50 border-r relative">
            <header className="h-16 px-10 flex gap-2 items-center border-b">
                <GrassOutlined className="text-green-600" />
                <span className="font-bold text-lg mt-1">Agri Supply</span>
            </header>

            <nav className="h-[calc(100vh-128px)] overflow-y-auto">
                <List className="p-5">
                    {getNavItems().map((menu, index) => (
                        <NavItem menu={menu} key={index} />
                    ))}
                </List>
            </nav>

            <Profile />
        </div>
    );
}

export default SideBar;

function getNavItems() {
    return [
        {
            text: "Dashboard",
            icon: <DashboardOutlined fontSize="small" />,
            url: "/admin/dashboard",
        },
        {
            text: "Products",
            icon: <DashboardCustomizeOutlined fontSize="small" />,
            children: [
                {
                    text: "Categories",
                    icon: <LayersOutlined fontSize="small" />,
                    url: "/admin/categories",
                },
                {
                    text: "Products",
                    icon: <WidgetsOutlined fontSize="small" />,
                    url: "/admin/products",
                },
                // {
                //     text: "Inventory",
                //     icon: <Inventory2Outlined fontSize="small" />,
                //     url: "/admin/inventory",
                // },
                {
                    text: "Reviews",
                    icon: <StarOutline fontSize="small" />,
                    url: "/admin/reviews",
                },
            ],
        },
        // {
        //     text: "Customers",
        //     icon: <PeopleOutline fontSize="small" />,
        //     url: "/admin/customers",
        // },
        {
            text: "Orders",
            icon: <ShoppingCartOutlined fontSize="small" />,
            url: "/admin/orders",
        },
        {
            text: "Reports",
            icon: <LeaderboardOutlined fontSize="small" />,
            url: "/admin/insights/sales",
            // children: [
            // {
            //     text: "Sales",
            //     icon: <TrendingUpOutlined fontSize="small" />,
            //     url: "/admin/insights/sales",
            // },
            // {
            //     text: "Product",
            //     icon: <PieChartOutline fontSize="small" />,
            //     url: "/admin/insights/products",
            // },
            // {
            //     text: "Customer",
            //     icon: <PieChartOutline fontSize="small" />,
            //     url: "/admin/insights/customers",
            // },
            // ],
        },
    ];
}
