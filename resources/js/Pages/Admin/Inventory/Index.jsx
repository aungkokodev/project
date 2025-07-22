import Layout from "@/Layouts/Admin/Layout";
import {
    Inventory,
    Search,
    Add,
    FilterList,
    FileDownload,
    MoreVert,
    Edit,
    Delete,
    Visibility,
    LocalShipping,
    Warning,
    CheckCircle,
} from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    LinearProgress,
    ListItemIcon,
    Menu,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";

const Index = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Mock inventory data
    const inventoryData = [
        {
            id: "P-1001",
            name: "Organic Fertilizer 5kg",
            category: "Fertilizers",
            stock: 125,
            lowStockThreshold: 20,
            price: 50,
            status: "in_stock",
            lastUpdated: "2023-06-15",
        },
        {
            id: "P-1002",
            name: "Seedling Trays (50pc)",
            category: "Planting",
            stock: 89,
            lowStockThreshold: 30,
            price: 40,
            status: "low_stock",
            lastUpdated: "2023-06-14",
        },
        {
            id: "P-1003",
            name: "Garden Hose 50m",
            category: "Irrigation",
            stock: 45,
            lowStockThreshold: 15,
            price: 75,
            status: "in_stock",
            lastUpdated: "2023-06-10",
        },
        {
            id: "P-1004",
            name: "Pruning Shears",
            category: "Tools",
            stock: 12,
            lowStockThreshold: 10,
            price: 25,
            status: "low_stock",
            lastUpdated: "2023-06-12",
        },
        {
            id: "P-1005",
            name: "Watering Can 10L",
            category: "Watering",
            stock: 0,
            lowStockThreshold: 5,
            price: 30,
            status: "out_of_stock",
            lastUpdated: "2023-06-08",
        },
        {
            id: "P-1006",
            name: "Compost Bin 50L",
            category: "Composting",
            stock: 32,
            lowStockThreshold: 15,
            price: 65,
            status: "in_stock",
            lastUpdated: "2023-06-05",
        },
        {
            id: "P-1007",
            name: "Garden Gloves (Pair)",
            category: "Safety",
            stock: 56,
            lowStockThreshold: 20,
            price: 15,
            status: "in_stock",
            lastUpdated: "2023-06-01",
        },
    ];

    // Filter inventory based on search term
    const filteredInventory = inventoryData.filter(
        (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Handle menu actions
    const handleMenuOpen = (event, product) => {
        setAnchorEl(event.currentTarget);
        setSelectedProduct(product);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedProduct(null);
    };

    // Status chip component
    const StatusChip = ({ status }) => {
        switch (status) {
            case "in_stock":
                return <Chip label="In Stock" color="success" size="small" />;
            case "low_stock":
                return <Chip label="Low Stock" color="warning" size="small" />;
            case "out_of_stock":
                return <Chip label="Out of Stock" color="error" size="small" />;
            default:
                return <Chip label="Unknown" size="small" />;
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <Typography variant="h4" className="font-bold text-gray-800">
                    Inventory Management
                </Typography>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Add />}
                    >
                        Add New Product
                    </Button>
                    <Button variant="outlined" startIcon={<FileDownload />}>
                        Export
                    </Button>
                </div>
            </div>

            {/* Summary Cards */}
            <Grid container spacing={3} className="mb-6">
                <Grid item xs={12} sm={6} md={3}>
                    <Card className="shadow-sm border border-gray-200">
                        <CardContent>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                className="mb-2"
                            >
                                Total Products
                            </Typography>
                            <Typography variant="h4" className="font-bold">
                                {inventoryData.length}
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={100}
                                color="primary"
                                className="mt-2"
                            />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card className="shadow-sm border border-gray-200">
                        <CardContent>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                className="mb-2"
                            >
                                In Stock
                            </Typography>
                            <Typography variant="h4" className="font-bold">
                                {
                                    inventoryData.filter(
                                        (item) => item.status === "in_stock"
                                    ).length
                                }
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={
                                    (inventoryData.filter(
                                        (item) => item.status === "in_stock"
                                    ).length /
                                        inventoryData.length) *
                                    100
                                }
                                color="success"
                                className="mt-2"
                            />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card className="shadow-sm border border-gray-200">
                        <CardContent>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                className="mb-2"
                            >
                                Low Stock
                            </Typography>
                            <Typography variant="h4" className="font-bold">
                                {
                                    inventoryData.filter(
                                        (item) => item.status === "low_stock"
                                    ).length
                                }
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={
                                    (inventoryData.filter(
                                        (item) => item.status === "low_stock"
                                    ).length /
                                        inventoryData.length) *
                                    100
                                }
                                color="warning"
                                className="mt-2"
                            />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card className="shadow-sm border border-gray-200">
                        <CardContent>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                className="mb-2"
                            >
                                Out of Stock
                            </Typography>
                            <Typography variant="h4" className="font-bold">
                                {
                                    inventoryData.filter(
                                        (item) => item.status === "out_of_stock"
                                    ).length
                                }
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={
                                    (inventoryData.filter(
                                        (item) => item.status === "out_of_stock"
                                    ).length /
                                        inventoryData.length) *
                                    100
                                }
                                color="error"
                                className="mt-2"
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Inventory Table */}
            <Card className="shadow-sm border border-gray-200">
                <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <TextField
                        placeholder="Search products..."
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        className="w-full sm:w-64"
                    />

                    <div className="flex gap-2">
                        <Button variant="outlined" startIcon={<FilterList />}>
                            Filters
                        </Button>
                    </div>
                </div>

                <Divider />

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow className="bg-gray-50">
                                <TableCell>Product ID</TableCell>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell align="center">
                                    Stock Level
                                </TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">
                                    Last Updated
                                </TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {filteredInventory
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((product) => (
                                    <TableRow key={product.id} hover>
                                        <TableCell>{product.id}</TableCell>
                                        <TableCell>
                                            <Typography fontWeight="medium">
                                                {product.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            {product.category}
                                        </TableCell>
                                        <TableCell align="center">
                                            <div className="flex flex-col items-center">
                                                <Typography fontWeight="medium">
                                                    {product.stock} /{" "}
                                                    {product.lowStockThreshold}
                                                </Typography>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={
                                                        (product.stock /
                                                            (product.lowStockThreshold *
                                                                2)) *
                                                        100
                                                    }
                                                    color={
                                                        product.status ===
                                                        "in_stock"
                                                            ? "success"
                                                            : product.status ===
                                                              "low_stock"
                                                            ? "warning"
                                                            : "error"
                                                    }
                                                    className="w-full mt-1"
                                                    style={{ height: 6 }}
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell align="center">
                                            <StatusChip
                                                status={product.status}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            K{product.price}
                                        </TableCell>
                                        <TableCell align="right">
                                            {product.lastUpdated}
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                onClick={(e) =>
                                                    handleMenuOpen(e, product)
                                                }
                                            >
                                                <MoreVert />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredInventory.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>

            {/* Action Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                        <Visibility fontSize="small" />
                    </ListItemIcon>
                    View Details
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                        <Edit fontSize="small" />
                    </ListItemIcon>
                    Edit Product
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                        <LocalShipping fontSize="small" />
                    </ListItemIcon>
                    Restock
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleMenuClose} className="text-red-500">
                    <ListItemIcon>
                        <Delete fontSize="small" color="error" />
                    </ListItemIcon>
                    Delete
                </MenuItem>
            </Menu>

            {/* Low Stock Alert */}
            {inventoryData.filter(
                (item) =>
                    item.status === "low_stock" ||
                    item.status === "out_of_stock"
            ).length > 0 && (
                <Card className="shadow-sm border border-orange-200 bg-orange-50 mt-6">
                    <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-3">
                            <Warning className="text-orange-500" />
                            <div>
                                <Typography
                                    variant="subtitle1"
                                    className="font-medium"
                                >
                                    Low Stock Alert
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {
                                        inventoryData.filter(
                                            (item) =>
                                                item.status === "low_stock"
                                        ).length
                                    }{" "}
                                    products are low on stock and
                                    {
                                        inventoryData.filter(
                                            (item) =>
                                                item.status === "out_of_stock"
                                        ).length
                                    }{" "}
                                    are out of stock
                                </Typography>
                            </div>
                        </div>
                        <Button
                            variant="outlined"
                            color="warning"
                            startIcon={<LocalShipping />}
                        >
                            Process Restock
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

Index.layout = (page) => <Layout children={page} />;

export default Index;
