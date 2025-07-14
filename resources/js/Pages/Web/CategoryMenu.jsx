import IconButton from "@/Components/Button/IconButton";
import LinkText from "@/Components/Common/LinkText";
import {
    Avatar,
    Collapse,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@mui/material";
import { Minus, Plus } from "lucide-react";
import { Fragment, useState } from "react";

function CategoryMenu({ categories }) {
    const [current, setCurrent] = useState(false);
    const open = Boolean(current);

    const handleOpen = (id) => setCurrent((prev) => (prev === id ? null : id));

    const goTo = (slug) => `/collections/${slug}`;

    const exists = categories.length > 0;

    if (!exists) return null;

    return (
        <List className="p-0 overflow-hidden rounded-xl border">
            {categories?.map((category) => (
                <Fragment key={category.id}>
                    <ListItem className="border-b p-5" key={category.id}>
                        <ListItemAvatar>
                            <Avatar src={category.image} variant="square" />
                        </ListItemAvatar>
                        <ListItemText>
                            <LinkText href={goTo(category.slug)}>
                                {category.name}
                            </LinkText>
                        </ListItemText>
                        {category?.children?.length > 0 && (
                            <IconButton onClick={() => handleOpen(category.id)}>
                                {current === category.id ? <Minus /> : <Plus />}
                            </IconButton>
                        )}
                    </ListItem>

                    {category?.children?.length > 0 && (
                        <Collapse in={current === category.id}>
                            <List className="p-0">
                                {category.children.map((child) => (
                                    <ListItem
                                        key={child.id}
                                        className="border-b p-5 ps-8"
                                    >
                                        <ListItemAvatar>
                                            <Avatar
                                                src={child.image}
                                                variant="square"
                                            />
                                        </ListItemAvatar>
                                        <ListItemText>
                                            <LinkText href={goTo(child.slug)}>
                                                {child.name}
                                            </LinkText>
                                        </ListItemText>
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    )}
                </Fragment>
            ))}
        </List>
    );
}

export default CategoryMenu;
