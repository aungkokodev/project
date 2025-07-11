import ProductCard from "@/Components/Card/ProductCard";
import Layout from "@/Layouts/Web/Layout";
import { router, usePage } from "@inertiajs/react";
import { AddOutlined, RemoveOutlined } from "@mui/icons-material";
import {
    Collapse,
    Divider,
    List,
    ListItemIcon,
    ListItemText,
    MenuItem,
} from "@mui/material";
import { Fragment, useState } from "react";

function Category({ category, products }) {
    const page = usePage();
    const categories = page.props.categories;

    const [open, setOpen] = useState(false);

    return (
        <div className="container h-full mx-auto p-5 grid grid-cols-4">
            <div className="p-5">
                <List className="p-0">
                    {categories.map((category) => (
                        <Fragment key={category.id}>
                            <MenuItem
                                disableRipple
                                onClick={() =>
                                    router.visit(
                                        `/categories/${category.slug}`,
                                        {
                                            preserveScroll: true,
                                            preserveState: true,
                                        }
                                    )
                                }
                                className="py-5"
                            >
                                <ListItemText>{category.name}</ListItemText>
                                {category.children.length > 0 && (
                                    <ListItemIcon
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpen(!open);
                                        }}
                                    >
                                        {open ? (
                                            <RemoveOutlined />
                                        ) : (
                                            <AddOutlined />
                                        )}
                                    </ListItemIcon>
                                )}
                            </MenuItem>
                            <Divider className="m-0" />
                            {category.children.length > 0 && (
                                <Collapse in={open}>
                                    <List className="p-0">
                                        {category.children.map((category) => (
                                            <Fragment key={category.id}>
                                                <MenuItem
                                                    key={category.id}
                                                    disableRipple
                                                    className="py-5 ps-10"
                                                    onClick={() =>
                                                        router.visit(
                                                            `/categories/${category.slug}`
                                                        )
                                                    }
                                                >
                                                    <ListItemText>
                                                        {category.name}
                                                    </ListItemText>
                                                </MenuItem>
                                                <Divider className="m-0" />
                                            </Fragment>
                                        ))}
                                    </List>
                                </Collapse>
                            )}
                        </Fragment>
                    ))}
                </List>
            </div>
            <div className="col-span-3 p-5">
                <h1 className="mb-5">{category.name}</h1>
                <div className="grid grid-cols-4 gap-5">
                    {products.map((product) => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}

Category.layout = (page) => <Layout children={page} />;

export default Category;
