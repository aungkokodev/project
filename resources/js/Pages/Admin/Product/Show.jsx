import Layout from "@/Layouts/Admin/Layout";
import { Avatar } from "@mui/material";
// resources/js/Pages/Admin/Products/Show.tsx
import { Head, Link } from "@inertiajs/react";
import { TabContext, TabPanel } from "@mui/lab";
import {
    Box,
    Button,
    Chip,
    Divider,
    Grid,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Tabs,
    Typography,
} from "@mui/material";
import { useState } from "react";
import clsx from "clsx";

function ProductShow({ product, stats }) {
    const [tabValue, setTabValue] = useState("details");

    return (
        <>
            <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}
            >
                <Typography variant="h4" component="h1">
                    {product.name}
                    <Chip
                        label={product.status}
                        color={
                            product.status === "active" ? "success" : "error"
                        }
                        sx={{ ml: 2 }}
                    />
                </Typography>

                <div>
                    <Button
                        component={Link}
                        variant="contained"
                        color="primary"
                        sx={{ mr: 2 }}
                    >
                        Edit Product
                    </Button>
                    <Button variant="outlined" color="error">
                        Delete
                    </Button>
                </div>
            </Box>

            <Grid container spacing={3}>
                {/* Left Column - Images */}
                <Grid item xs={12} md={5}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Box sx={{ mb: 2 }}>
                            <Avatar
                                src={`/storage/${product.image}`}
                                variant="rounded"
                                sx={{ width: "100%", height: 300 }}
                            />
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6" gutterBottom>
                            Additional Images
                        </Typography>
                        <Grid container spacing={1}>
                            {product.images.map((image) => (
                                <Grid item key={image.id} xs={4}>
                                    <Avatar
                                        src={`/storage/${image.path}`}
                                        variant="rounded"
                                        sx={{ width: "100%", height: 100 }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Grid>

                {/* Right Column - Details */}
                <Grid item xs={12} md={7}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <TabContext value={tabValue}>
                            <Box
                                sx={{ borderBottom: 1, borderColor: "divider" }}
                            >
                                <Tabs
                                    onChange={(e, newValue) =>
                                        setTabValue(newValue)
                                    }
                                >
                                    <Tab label="Details" value="details" />
                                    <Tab label="Inventory" value="inventory" />
                                    <Tab label="Sales" value="sales" />
                                </Tabs>
                            </Box>

                            <TabPanel value="details">
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <strong>SKU</strong>
                                            </TableCell>
                                            <TableCell>{product.sku}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <strong>Category</strong>
                                            </TableCell>
                                            <TableCell>
                                                <Link>
                                                    {product.category.name}
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <strong>Price</strong>
                                            </TableCell>
                                            <TableCell>
                                                ${product.price}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <strong>Stock</strong>
                                            </TableCell>
                                            <TableCell>
                                                {product.stock_quantity}{" "}
                                                {product.unit}
                                                <Chip
                                                    label={
                                                        product.stock_quantity >
                                                        0
                                                            ? "In Stock"
                                                            : "Out of Stock"
                                                    }
                                                    color={
                                                        product.stock_quantity >
                                                        0
                                                            ? "success"
                                                            : "error"
                                                    }
                                                    size="small"
                                                    sx={{ ml: 1 }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <strong>Description</strong>
                                            </TableCell>
                                            <TableCell>
                                                <Typography whiteSpace="pre-wrap">
                                                    {product.description}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TabPanel>

                            <TabPanel value="inventory">
                                {/* Inventory management content */}
                            </TabPanel>

                            <TabPanel value="sales">
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <Paper
                                            sx={{ p: 2, textAlign: "center" }}
                                        >
                                            <Typography variant="h6">
                                                Total Orders
                                            </Typography>
                                            <Typography variant="h4">
                                                {stats.orders_count}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Paper
                                            sx={{ p: 2, textAlign: "center" }}
                                        >
                                            <Typography variant="h6">
                                                Total Revenue
                                            </Typography>
                                            <Typography variant="h4">
                                                ${stats.total_revenue}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Paper
                                            sx={{ p: 2, textAlign: "center" }}
                                        >
                                            <Typography variant="h6">
                                                Avg Rating
                                            </Typography>
                                            <Typography variant="h4">
                                                {stats.average_rating
                                                    ? stats.average_rating
                                                    : "N/A"}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </TabPanel>
                        </TabContext>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}
function Show({ product }) {
    const [currentImage, setCurrentImage] = useState(0);
    const [currentTab, setCurrentTab] = useState("details");

    console.log(product);

    return (
        <div>
            {/* <h2 className="text-2xl font-bold pb-4">{product.name}</h2> */}
            <div className="grid gap-4 grid-cols-[1fr_2fr]">
                <div>
                    <Avatar
                        src={product.images[currentImage].path}
                        className="w-full h-auto border rounded-lg"
                    />
                    <div className="grid gap-4 grid-cols-4 mt-4">
                        {product.images?.map((image, i) => (
                            <div className="relative">
                                <Avatar
                                    src={image.path}
                                    className={clsx(
                                        "w-full h-auto border rounded-lg"
                                    )}
                                />
                                <div
                                    className={clsx(
                                        "absolute top-0 left-0 w-full h-full bg-white opacity-0 border",
                                        currentImage == i ? "" : "opacity-60"
                                    )}
                                    onClick={() => {
                                        setCurrentImage(i);
                                    }}
                                ></div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-4 border rounded-lg bg-white">
                    <TabContext value={currentTab}>
                        <Tabs
                            onChange={(e, current) => setCurrentTab(current)}
                            className="border-b font-bold text-slate-700"
                        >
                            <Tab label={"Details"} value={"details"} />
                            <Tab label={"Inventory"} value={"inventory"} />
                            <Tab label={"Sales"} value={"sales"} />
                        </Tabs>
                        <TabPanel value={"details"}>
                            <div className="flex flex-col gap-4 ">
                                <div className="flex gap-4 pb-4 border-b">
                                    <p className="w-20">Status</p>
                                    <p className="text-slate-500">
                                        <Chip
                                            label={
                                                product.is_active
                                                    ? "Active"
                                                    : "Inactive"
                                            }
                                            variant="outlined"
                                            color={
                                                product.is_active
                                                    ? "success"
                                                    : "warning"
                                            }
                                        />
                                    </p>
                                </div>
                                <div className="flex gap-4 pb-4 border-b">
                                    <p className="w-20">Name</p>
                                    <p className="text-slate-500">
                                        {product.name}
                                    </p>
                                </div>
                                <div className="flex gap-4 pb-4 border-b">
                                    <p className="w-20">Category</p>
                                    <p className="text-slate-500">
                                        {product.category.name}
                                    </p>
                                </div>
                                <div className="flex gap-4 pb-4 border-b">
                                    <p className="w-20">Price</p>
                                    <p className="text-slate-500">
                                        {product.price}
                                    </p>
                                </div>
                                <div className="flex gap-4 pb-4 border-b">
                                    <p className="w-20">Stock</p>
                                    <p className="text-slate-500">
                                        {product.stock_quantity}{" "}
                                        <span className="me-4">
                                            {product.unit}
                                        </span>
                                        <Chip
                                            className={
                                                product.stock_quantity > 0
                                                    ? "bg-green-600 text-white"
                                                    : "bg-red-600 text-white"
                                            }
                                            label={
                                                product.stock_quantity > 0
                                                    ? "In Stock"
                                                    : "Out of Stock"
                                            }
                                        ></Chip>
                                    </p>
                                </div>
                                <div className="flex gap-4 pb-4 border-b">
                                    <p className="w-20">Description</p>
                                    <p
                                        className="text-slate-500"
                                        dangerouslySetInnerHTML={{
                                            __html: product.description,
                                        }}
                                    ></p>
                                </div>
                            </div>
                        </TabPanel>
                    </TabContext>
                </div>
            </div>
            {/* <ProductShow product={product} stats={{}} />; */}
        </div>
    );
}

Show.layout = (page) => <Layout children={page} title="Product Details" />;

export default Show;
