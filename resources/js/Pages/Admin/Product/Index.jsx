import PrimaryButton from "@/Components/Button/PrimaryButton";
import CustomDataGrid from "@/Components/Common/CustomDataGrid";
import DataCell from "@/Components/Common/DataCell";
import IconWithTooltip from "@/Components/IconWithTooltip";
import ProductImages from "@/Components/Image/ProductImages";
import StatusCard from "@/Components/StatusCard";
import Layout from "@/Layouts/Admin/Layout";
import { formatNumber, getDate } from "@/utils/formatHelper";
import { router, usePage } from "@inertiajs/react";
import {
    AddOutlined,
    CancelOutlined,
    CheckCircleOutline,
    EditOutlined,
    HomeOutlined,
    StarBorderOutlined,
    StoreOutlined,
    VisibilityOutlined,
    WidgetsOutlined,
} from "@mui/icons-material";
import {
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Switch,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function Index({ products, count }) {
    const [openDetails, setOpenDetails] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const { flash } = usePage().props;

    useEffect(() => {
        if (toast.success) toast.success(flash.success);
        if (toast.error) toast.error(flash.error);
    }, [flash]);

    return (
        <>
            <div className="grid grid-cols-4 gap-5 mb-5">
                <StatusCard
                    title={"Total Products"}
                    value={count["total"]}
                    icon={<StoreOutlined />}
                />
                <StatusCard
                    title={"Active Products"}
                    value={count["active"]}
                    icon={<CheckCircleOutline />}
                />
                <StatusCard
                    title={"Featured Products"}
                    value={count["featured"]}
                    icon={<StarBorderOutlined />}
                />
                <StatusCard
                    title={"Out of Stock"}
                    value={count["empty"]}
                    icon={<CancelOutlined />}
                    color="red"
                />
            </div>

            <div className="flex mb-5">
                <PrimaryButton
                    className="ms-auto"
                    onClick={() => router.visit("/admin/products/create")}
                >
                    <AddOutlined />
                    Add New Product
                </PrimaryButton>
            </div>

            <CustomDataGrid
                rows={products}
                columns={getColumns(products, (product) => {
                    setCurrentProduct(product);
                    setOpenDetails(true);
                })}
            />

            {currentProduct && (
                <Dialog
                    open={openDetails}
                    onClose={() => setOpenDetails(false)}
                    maxWidth="lg"
                    fullWidth
                >
                    <DialogTitle className="p-5 flex gap-5 items-center text-lg">
                        {currentProduct.name}
                        <Chip
                            color={
                                currentProduct.is_active ? "primary" : "default"
                            }
                            label={
                                currentProduct.is_active ? "Active" : "Inactive"
                            }
                        />
                        <Chip
                            variant="outlined"
                            color={
                                currentProduct.stock > 5
                                    ? "primary"
                                    : currentProduct.stock > 0
                                    ? "warning"
                                    : "error"
                            }
                            label={
                                currentProduct.stock > 5
                                    ? "In Stock"
                                    : currentProduct.stock > 0
                                    ? "Low Stock"
                                    : "Out of Stock"
                            }
                        />
                    </DialogTitle>
                    <DialogContent
                        dividers
                        className="p-5 grid gap-5 grid-cols-2"
                    >
                        <div className="col-span-1 overflow-hidden">
                            <ProductImages images={currentProduct.images} />
                        </div>
                        <div className="col-span-1 grid grid-cols-2 gap-5 self-start overflow-hidden">
                            <div className="col-span-2">
                                <p className="font-bold opacity-70 mb-1">
                                    Name
                                </p>
                                <p className="text-wrap">
                                    {currentProduct.name}
                                </p>
                            </div>
                            <div>
                                <p className="font-bold opacity-70 mb-1">
                                    Category
                                </p>
                                <p className="text-wrap">
                                    {currentProduct.category.name}
                                </p>
                            </div>
                            <div>
                                <p className="font-bold opacity-70 mb-1">
                                    Slug
                                </p>
                                <p className="text-wrap">
                                    {currentProduct.slug}
                                </p>
                            </div>
                            <div>
                                <p className="font-bold opacity-70 mb-1">
                                    Price
                                </p>
                                <p>K{formatNumber(currentProduct.price)}</p>
                            </div>
                            <div>
                                <p className="font-bold opacity-70 mb-1">
                                    Stock
                                </p>
                                <p>
                                    {formatNumber(currentProduct.stock)}{" "}
                                    <span className="text-sm">
                                        {currentProduct.unit}
                                    </span>
                                </p>
                            </div>
                            <div>
                                <p className="font-bold opacity-70 mb-1">
                                    Created At
                                </p>
                                <p>{getDate(currentProduct.created_at)}</p>
                            </div>
                            <div>
                                <p className="font-bold opacity-70 mb-1">
                                    Last Updated At
                                </p>
                                <p>{getDate(currentProduct.updated_at)}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="font-bold opacity-70 mb-1">
                                    Description
                                </p>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: currentProduct.description,
                                    }}
                                ></p>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions className="p-5">
                        <PrimaryButton
                            onClick={() => {
                                setOpenDetails(false);
                            }}
                            variant="text"
                            className="min-w-auto"
                        >
                            Close
                        </PrimaryButton>
                        <PrimaryButton
                            startIcon={<EditOutlined />}
                            onClick={() => {
                                router.visit(
                                    `/admin/products/${currentProduct.slug}/edit`
                                );
                                setOpenDetails(false);
                            }}
                        >
                            Edit Category
                        </PrimaryButton>
                    </DialogActions>
                </Dialog>
            )}

            <ToastContainer />
        </>
    );
}

Index.layout = (page) => (
    <Layout
        children={page}
        title="Products"
        breadcrumbs={[
            {
                label: "Dashboard",
                url: "/admin/dashboard",
                icon: <HomeOutlined />,
            },
            {
                label: "Products",
                url: "/admin/products",
                icon: <WidgetsOutlined />,
            },
        ]}
    />
);

export default Index;

function getColumns(data, onDetails) {
    return [
        {
            field: "id",
            headerName: "#",
            valueGetter: (id) => data.findIndex((item) => item.id == id) + 1,
            width: 64,
        },
        {
            field: "name",
            headerName: "Product",
            renderCell: ({ row }) => (
                <DataCell
                    text={row.name}
                    avatar={row.images?.find((img) => img.is_default)?.path}
                />
            ),
            flex: 1,
        },
        {
            field: "category",
            headerName: "Category",
            valueGetter: (v) => v.name,
            renderCell: ({ row }) => (
                <DataCell
                    text={row.category.name}
                    url={`/admin/categories/${row.category.slug}`}
                />
            ),
            flex: 1,
        },
        {
            field: "price",
            headerName: "Price",
            valueGetter: (v) => parseInt(v),
            valueFormatter: (v) => formatNumber(v),
        },
        {
            field: "stock",
            headerName: "Stock",
            valueGetter: (v) => parseInt(v),
            valueFormatter: (v) => formatNumber(v),
        },
        {
            field: "unit",
            headerName: "Unit",
        },
        {
            field: "is_featured",
            headerName: "Featured",
            renderCell: (params) => (
                <Switch
                    color="success"
                    checked={Boolean(params.value)}
                    onClick={() =>
                        router.put(
                            `/admin/products/${params.row.id}/featured`,
                            {
                                is_featured: !params.row.is_featured,
                            }
                        )
                    }
                />
            ),
        },
        {
            field: "is_active",
            headerName: "Active",
            renderCell: (params) => (
                <Switch
                    color="success"
                    checked={Boolean(params.value)}
                    onClick={() =>
                        router.put(`/admin/products/${params.row.id}/status`, {
                            is_active: !params.row.is_active,
                        })
                    }
                />
            ),
        },
        {
            field: "created_at",
            headerName: "Created",
            valueGetter: (v) => new Date(v),
            valueFormatter: (v) => v.toLocaleDateString("en-UK"),
        },
        {
            field: "actions",
            headerName: "Actions",
            renderCell: ({ row }) => (
                <div className="flex gap-1 items-center justify-center">
                    <IconWithTooltip
                        icon={<VisibilityOutlined />}
                        title="View Details"
                        onClick={() => onDetails(row)}
                    />
                    <IconWithTooltip
                        icon={<EditOutlined />}
                        title="Edit"
                        color="green"
                        onClick={() =>
                            router.visit(`/admin/products/${row.slug}/edit`)
                        }
                    />
                    {/* <IconWithTooltip
                    icon={<DeleteOutline />}
                    title="delete"
                    color="red"
                    onClick={() => {
                        const yes = confirm(
                            "Are you sure you want to delete this product?"
                        );
                        if (yes) router.delete(`/admin/products/${params.id}`);
                    }}
                /> */}
                </div>
            ),
        },
    ];
}
