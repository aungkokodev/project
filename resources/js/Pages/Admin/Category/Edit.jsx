import FormFieldGroup from "@/Components/Input/FormFieldGroup";
import FormFieldWithLabel from "@/Components/Input/FormFieldWithLabel";
import FormImageInput from "@/Components/Input/FormImageInput";
import Select from "@/Components/Input/Select";
import TextField from "@/Components/Input/TextField";
import Layout from "@/Layouts/Admin/Layout";
import { useForm } from "@inertiajs/react";
import { Button, MenuItem } from "@mui/material";

function Edit({ category, categories }) {
    const { data, setData, errors, setError, post } = useForm({
        name: category.name,
        description: category.description,
        parent_id: category.parent_id || "",
        image: category.image,
    });

    const handleSubmit = () => {
        post(`/admin/categories/${category.id}`);
        // const formData = new FormData();
        // formData.append("name", data.name);
        // formData.append("description", data.description);
        // formData.append("parent_id", data.parent_id);
        // formData.append("image", data.image);
        // formData.append("_method", "PUT");
        // router.post(`/admin/categories/${category.id}`, formData);
    };

    return (
        <div className="grid grid-cols-[1fr_2fr] gap-5">
            <div>
                <FormFieldGroup
                    title={"Category Image"}
                    className={"pr-5 pb-5"}
                >
                    <FormImageInput
                        showImage={Boolean(data.image)}
                        src={
                            typeof data.image === "string"
                                ? data.image
                                : URL.createObjectURL(data.image)
                        }
                        onClose={() => setData("image", "")}
                        onChange={(e) => {
                            setData("image", e.target.files[0]);
                            setError("image", "");
                        }}
                        error={!!errors.image}
                        helperText={errors.image}
                    />
                </FormFieldGroup>
            </div>
            <div className="flex gap-5 flex-col">
                <FormFieldGroup title={"Category Information"}>
                    <FormFieldWithLabel label={"Category Name"}>
                        <TextField
                            size="small"
                            className="flex-1"
                            placeholder="Category Name"
                            required
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                    </FormFieldWithLabel>
                    <FormFieldWithLabel label={"Description"}>
                        <TextField
                            size="small"
                            className="flex-1"
                            placeholder="Description"
                            required
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            error={!!errors.description}
                            helperText={errors.description}
                        />
                    </FormFieldWithLabel>
                    <FormFieldWithLabel label={"Parent Category"}>
                        <Select
                            size="small"
                            className="flex-1"
                            value={data.parent_id}
                            onChange={(e) =>
                                setData("parent_id", e.target.value)
                            }
                            error={!!errors.parent_id}
                            helperText={errors.parent_id}
                        >
                            <MenuItem value={""}>No Parent</MenuItem>
                            {categories.map((category) => (
                                <MenuItem value={category.id} key={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormFieldWithLabel>
                </FormFieldGroup>
                <Button
                    className="px-5 py-2.5 ms-auto rounded-lg bg-green-600 text-white hover:bg-green-700"
                    onClick={handleSubmit}
                >
                    Update Category
                </Button>
            </div>
        </div>
    );
}

Edit.layout = (page) => <Layout children={page} title={"Edit Category"} />;

export default Edit;
