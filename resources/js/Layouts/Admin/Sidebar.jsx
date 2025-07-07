import { Link, usePage } from "@inertiajs/react";
import {
    AccountCircleOutlined,
    CategoryOutlined,
    DashboardOutlined,
    GrassOutlined,
    Inventory2Outlined,
    KeyboardArrowDownOutlined,
    KeyboardArrowRightOutlined,
    LeaderboardOutlined,
    ListAltOutlined,
    LogoutOutlined,
    MoreVert,
    PersonOutline,
    ShoppingCartOutlined,
    StarBorderOutlined,
    TrendingUpOutlined,
    WidgetsOutlined,
} from "@mui/icons-material";
import {
    Avatar,
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
} from "@mui/material";
import clsx from "clsx";
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
                        "rounded-lg",
                        activeStyle(menu.url),
                        parentActiveStyle(menu.children?.map((c) => c.url))
                    )}
                >
                    <ListItemIcon className="min-w-8 text-inherit">
                        {menu.icon}
                    </ListItemIcon>
                    <ListItemText>{menu.text}</ListItemText>
                    {menu.children &&
                        (open ? (
                            <KeyboardArrowDownOutlined />
                        ) : (
                            <KeyboardArrowRightOutlined />
                        ))}
                </ListItemButton>
            </LinkOrDiv>

            {menu.children && (
                <Collapse in={open}>
                    <List className="py-0 ps-4">
                        {menu.children.map((child, index) => (
                            <Link key={index} href={child.url}>
                                <ListItemButton
                                    className={clsx(
                                        "rounded-lg",
                                        activeStyle(child.url)
                                    )}
                                >
                                    <ListItemIcon className="min-w-8 text-inherit">
                                        {child.icon}
                                    </ListItemIcon>
                                    <ListItemText>{child.text}</ListItemText>
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
        <div className="w-full h-16 flex gap-2 items-center px-4 absolute left-0 bottom-0 border-t bg-slate-100">
            <Avatar src={user.avatar} />
            <div className="me-auto">
                <p className="font-bold truncate">{user.name}</p>
                <p className="text-xs truncate">{user.email}</p>
            </div>
            <div
                className="py-1.5 border rounded hover:text-slate-800 hover:bg-slate-200 cursor-pointer"
                onClick={handleMenuOpen}
                id="account-options"
                aria-controls={openMenu ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
            >
                <MoreVert />
            </div>

            <Menu
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
                            <AccountCircleOutlined />
                        </ListItemIcon>
                        <ListItemText>Profile</ListItemText>
                    </MenuItem>
                </Link>
                <Link href="/logout" method="post">
                    <MenuItem onClick={handleMenuClose}>
                        <ListItemIcon>
                            <LogoutOutlined />
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </MenuItem>
                </Link>
            </Menu>
        </div>
    );
}

// Done
function Sidebar() {
    return (
        <div className="h-full bg-slate-100 border-r relative">
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

export default Sidebar;

function getNavItems() {
    return [
        {
            text: "Dashboard",
            icon: <DashboardOutlined />,
            url: "/admin/dashboard",
        },
        {
            text: "Products",
            icon: <ListAltOutlined />,
            children: [
                {
                    text: "Products",
                    icon: <WidgetsOutlined />,
                    url: "/admin/products",
                },
                {
                    text: "Categories",
                    icon: <CategoryOutlined />,
                    url: "/admin/categories",
                },
                {
                    text: "Reviews",
                    icon: <StarBorderOutlined />,
                    url: "/admin/reviews",
                },
                // {
                //     text: "Inventory",
                //     icon: <Inventory2Outlined />,
                //     url: "/admin/inventory",
                // },
            ],
        },
        {
            text: "Orders",
            icon: <ShoppingCartOutlined />,
            url: "/admin/orders",
        },
        {
            text: "Customers",
            icon: <PersonOutline />,
            url: "/admin/customers",
        },
        {
            text: "Reports",
            icon: <LeaderboardOutlined />,
            children: [
                {
                    text: "Sale",
                    icon: <TrendingUpOutlined />,
                    url: "/admin/reports/sales",
                },
                {
                    text: "Product",
                    icon: <WidgetsOutlined />,
                    url: "/admin/reports/products",
                },
                {
                    text: "Customer",
                    icon: <PersonOutline />,
                    url: "/admin/reports/customers",
                },
            ],
        },
    ];
}
