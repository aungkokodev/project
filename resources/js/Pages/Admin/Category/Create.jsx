import FormFieldGroup from "@/Components/Input/FormFieldGroup";
import FormFieldWithLabel from "@/Components/Input/FormFieldWithLabel";
import FormImageInput from "@/Components/Input/FormImageInput";
import Select from "@/Components/Input/Select";
import TextField from "@/Components/Input/TextField";
import Layout from "@/Layouts/Admin/Layout";
import { useForm } from "@inertiajs/react";
import { Button, MenuItem } from "@mui/material";

function Create({ categories }) {
    const { data, setData, errors, setError, post } = useForm({
        name: "",
        description: "",
        parent_id: "",
        image: "",
    });

    const handleSubmit = () => {
        post("/admin/categories");
    };

    return (
        <div className="grid gap-5 grid-cols-[1fr_2fr]">
            <div>
                <FormFieldGroup
                    title={"Category Image"}
                    className={"pr-5 pb-5"}
                >
                    <FormImageInput
                        showImage={Boolean(data.image)}
                        src={data.image && URL.createObjectURL(data.image)}
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
            <div className="flex flex-col gap-5">
                <FormFieldGroup title={"Category Information"}>
                    <FormFieldWithLabel label={"Category Name"}>
                        <TextField
                            required
                            size="small"
                            className="flex-1"
                            placeholder="Category Name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                    </FormFieldWithLabel>
                    <FormFieldWithLabel label={"Description"}>
                        <TextField
                            required
                            size="small"
                            className="flex-1"
                            placeholder="Description"
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
                    Create Category
                </Button>
            </div>
        </div>
    );
}

Create.layout = (page) => <Layout children={page} title={"Create Category"} />;

export default Create;
