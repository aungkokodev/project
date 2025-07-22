import PrimaryButton from "@/Components/Button/PrimaryButton";
import FormFieldGroup from "@/Components/Input/FormFieldGroup";
import FormFieldWithLabel from "@/Components/Input/FormFieldWithLabel";
import FormImageInput from "@/Components/Input/FormImageInput";
import Select from "@/Components/Input/Select";
import TextField from "@/Components/Input/TextField";
import Layout from "@/Layouts/Admin/Layout";
import { router, useForm } from "@inertiajs/react";
import {
    EditOutlined,
    HomeOutlined,
    WidgetsOutlined,
} from "@mui/icons-material";
import { Divider, MenuItem } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Edit({ product, categories }) {
    const { data, setData, errors, setError, post } = useForm({
        name: product.name || "",
        category_id: product.category_id || "",
        unit: product.unit || "",
        price: product.price || 0,
        stock: product.stock || 0,
        defaultImage: product.images?.[0]?.path || "",
        additionalImages: product.images?.slice(1).map((v) => v?.path) || [],
        description: product.description || "",
        new_additionalImages: [],
        existing_additionalImages:
            product.images?.slice(1).map((v) => v?.path) || [],
    });

    const handleImageChange = (images) => {
        let oldData = [];
        let newData = [];

        setData("existing_additionalImages", []);
        setData("new_additionalImages", []);

        images.forEach((img, i) => {
            if (img instanceof File) {
                newData.push(img);
            } else {
                oldData.push(img);
            }
        });

        setData("existing_additionalImages", oldData);
        setData("new_additionalImages", newData);
    };

    const handleCancel = () => {
        router.visit("/admin/products");
    };

    const handleSubmit = () => {
        post(`/admin/products/${product.id}`);
    };

    return (
        <div className="grid grid-cols-[1fr_2fr] gap-5">
            <div>
                <FormFieldGroup
                    title={"Product Images"}
                    className={"pr-5 pb-5"}
                >
                    <FormImageInput
                        error={!!errors.defaultImage}
                        helperText={errors.defaultImage}
                        showImage={Boolean(data.defaultImage)}
                        src={
                            data.defaultImage &&
                            (typeof data.defaultImage === "string"
                                ? data.defaultImage
                                : URL.createObjectURL(data.defaultImage))
                        }
                        onClose={() => setData("defaultImage", null)}
                        onChange={(e) => {
                            setError("defaultImage", "");
                            setData("defaultImage", e.target.files[0]);
                        }}
                    />
                    <div className="grid grid-cols-3 gap-5">
                        <FormImageInput
                            error={!!errors["additionalImages.0"]}
                            helperText={errors["additionalImages.0"]}
                            showImage={Boolean(data.additionalImages[0])}
                            src={
                                data.additionalImages[0] &&
                                (typeof data.additionalImages[0] === "string"
                                    ? data.additionalImages[0]
                                    : URL.createObjectURL(
                                          data.additionalImages[0]
                                      ))
                            }
                            onClose={() => setData("additionalImages[0]", null)}
                            onChange={(e) => {
                                setData(
                                    "additionalImages[0]",
                                    e.target.files[0]
                                );
                                setError("additionalImages.0", "");
                                let images = data.additionalImages;
                                images[0] = e.target.files[0];
                                handleImageChange(images);
                            }}
                        />
                        <FormImageInput
                            error={!!errors["additionalImages.1"]}
                            helperText={errors["additionalImages.1"]}
                            showImage={Boolean(data.additionalImages[1])}
                            src={
                                data.additionalImages[1] &&
                                (typeof data.additionalImages[1] === "string"
                                    ? data.additionalImages[1]
                                    : URL.createObjectURL(
                                          data.additionalImages[1]
                                      ))
                            }
                            onClose={() => setData("additionalImages[1]", "")}
                            onChange={(e) => {
                                setData(
                                    "additionalImages[1]",
                                    e.target.files[0]
                                );
                                setError("additionalImages.1", "");
                                let images = data.additionalImages;
                                images[1] = e.target.files[0];
                                handleImageChange(images);
                                handleImageChange(images);
                            }}
                        />
                        <FormImageInput
                            error={!!errors["additionalImages.2"]}
                            helperText={errors["additionalImages.2"]}
                            showImage={Boolean(data.additionalImages[2])}
                            src={
                                data.additionalImages[2] &&
                                (typeof data.additionalImages[2] === "string"
                                    ? data.additionalImages[2]
                                    : URL.createObjectURL(
                                          data.additionalImages[2]
                                      ))
                            }
                            onClose={() => setData("additionalImages[2]", "")}
                            onChange={(e) => {
                                setData(
                                    "additionalImages[2]",
                                    e.target.files[0]
                                );
                                setError("additionalImages.2", "");
                                let images = data.additionalImages;
                                images[2] = e.target.files[0];
                                handleImageChange(images);
                                handleImageChange(images);
                            }}
                        />
                    </div>
                    <div className="text-red-800">
                        {errors.additionalImages && errors.additionalImages}
                    </div>
                </FormFieldGroup>
            </div>
            <div className="flex gap-5 flex-col">
                <FormFieldGroup title={"Product Information"}>
                    <FormFieldWithLabel label={"Product Name"}>
                        <TextField
                            error={!!errors.name}
                            helperText={errors.name}
                            size="small"
                            className="flex-1"
                            placeholder="Product Name"
                            required
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                    </FormFieldWithLabel>
                    <FormFieldWithLabel label={"Category"}>
                        <Select
                            error={!!errors.category_id}
                            helperText={errors.category_id}
                            size="small"
                            className="flex-1"
                            value={data.category_id}
                            onChange={(e) =>
                                setData("category_id", e.target.value)
                            }
                        >
                            {categories.map((category) => [
                                <MenuItem
                                    value={category.id}
                                    key={category.id}
                                    className="font-bold"
                                >
                                    {category.name}
                                </MenuItem>,
                                ...category.children?.map((child) => (
                                    <MenuItem value={child.id} key={child.id}>
                                        {child.name}
                                    </MenuItem>
                                )),
                                <Divider />,
                            ])}
                        </Select>
                    </FormFieldWithLabel>
                    <FormFieldWithLabel label={"Unit"}>
                        <TextField
                            error={!!errors.unit}
                            helperText={errors.unit}
                            size="small"
                            className="flex-1"
                            placeholder="Unit (eg. kg, L, package, bag)"
                            required
                            value={data.unit}
                            onChange={(e) => setData("unit", e.target.value)}
                        />
                    </FormFieldWithLabel>
                </FormFieldGroup>
                <FormFieldGroup title={"Product Price + Stock"}>
                    <FormFieldWithLabel label={"Price"}>
                        <TextField
                            error={!!errors.price}
                            helperText={errors.name}
                            size="small"
                            className="flex-1"
                            placeholder="0"
                            required
                            type="number"
                            value={data.price}
                            onChange={(e) => setData("price", e.target.value)}
                        />
                    </FormFieldWithLabel>
                    <FormFieldWithLabel label={"Quantity"}>
                        <TextField
                            error={!!errors.stock}
                            helperText={errors.stock}
                            size="small"
                            className="flex-1"
                            placeholder="0"
                            required
                            type="number"
                            value={data.stock}
                            onChange={(e) => setData("stock", e.target.value)}
                        />
                    </FormFieldWithLabel>
                </FormFieldGroup>
                <FormFieldGroup title={"Product Description"}>
                    <FormFieldWithLabel label={"Description"}>
                        <ReactQuill
                            theme="snow"
                            value={data.description}
                            onChange={(v) => setData("description", v)}
                            className="h-64 flex-1"
                        />
                    </FormFieldWithLabel>
                </FormFieldGroup>
                <div className="flex gap-5 justify-end">
                    <PrimaryButton onClick={handleCancel} variant="outlined">
                        Cancel
                    </PrimaryButton>
                    <PrimaryButton onClick={handleSubmit}>
                        Update Product
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
}

Edit.layout = (page) => (
    <Layout
        children={page}
        title="Edit Product"
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
            {
                label: "Edit",
                icon: <EditOutlined />,
            },
        ]}
    />
);

export default Edit;
