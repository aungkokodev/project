import FormFieldGroup from "@/Components/Input/FormFieldGroup";
import FormFieldWithLabel from "@/Components/Input/FormFieldWithLabel";
import FormImageInput from "@/Components/Input/FormImageInput";
import Select from "@/Components/Input/Select";
import TextField from "@/Components/Input/TextField";
import Layout from "@/Layouts/Admin/Layout";
import { useForm } from "@inertiajs/react";
import { Button, Divider, MenuItem } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Create({ categories }) {
    const { data, setData, errors, setError, post } = useForm({
        name: "",
        category_id: "",
        unit: "",
        price: "",
        stock_quantity: "",
        images: [],
        description: "",
    });

    const handleSubmit = () => {
        post("/admin/products");
    };

    return (
        <div className="grid grid-cols-[1fr_2fr] gap-5">
            <div>
                <FormFieldGroup
                    title={"Product Images"}
                    className={"pr-5 pb-5"}
                >
                    <FormImageInput
                        showImage={Boolean(data.images[0])}
                        src={
                            data.images[0] &&
                            URL.createObjectURL(data.images[0])
                        }
                        onClose={() => setData("images[0]", "")}
                        onChange={(e) => {
                            setData("images[0]", e.target.files[0]);
                            setError("images", "");
                            setError("images.0", "");
                        }}
                        error={!!errors.images || !!errors["images.0"]}
                        helperText={errors.images || errors["images.0"]}
                    />
                    <div className="grid grid-cols-3 gap-5">
                        <FormImageInput
                            showImage={Boolean(data.images[1])}
                            src={
                                data.images[1] &&
                                URL.createObjectURL(data.images[1])
                            }
                            onClose={() => setData("images[1]", "")}
                            onChange={(e) => {
                                setData("images[1]", e.target.files[0]);
                                setError("images.1", "");
                            }}
                            error={!!errors["images.1"]}
                            helperText={errors["images.1"]}
                        />
                        <FormImageInput
                            showImage={Boolean(data.images[2])}
                            src={
                                data.images[2] &&
                                URL.createObjectURL(data.images[2])
                            }
                            onClose={() => setData("images[2]", "")}
                            onChange={(e) => {
                                setData("images[2]", e.target.files[0]);
                                setError("images.2", "");
                            }}
                            error={!!errors["images.2"]}
                            helperText={errors["images.2"]}
                        />
                        <FormImageInput
                            showImage={Boolean(data.images[3])}
                            src={
                                data.images[3] &&
                                URL.createObjectURL(data.images[3])
                            }
                            onClose={() => setData("images[3]", "")}
                            onChange={(e) => {
                                setData("images[3]", e.target.files[0]);
                                setError("images.3", "");
                            }}
                            error={!!errors["images.3"]}
                            helperText={errors["images.3"]}
                        />
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
                            helperText={errors.price}
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
                            error={!!errors.stock_quantity}
                            helperText={errors.stock_quantity}
                            size="small"
                            className="flex-1"
                            placeholder="0"
                            required
                            type="number"
                            value={data.stock_quantity}
                            onChange={(e) =>
                                setData("stock_quantity", e.target.value)
                            }
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

                <Button
                    className="px-5 py-2.5 rounded-lg bg-green-600 text-white ms-auto hover:bg-green-700"
                    onClick={handleSubmit}
                >
                    Create Product
                </Button>
            </div>
        </div>
    );
}

Create.layout = (page) => <Layout children={page} title={"Create Product"} />;

export default Create;
