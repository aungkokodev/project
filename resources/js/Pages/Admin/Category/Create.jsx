import FormFieldGroup from "@/Components/FormFieldGroup";
import FormFieldWithLabel from "@/Components/FormFieldWithLabel";
import FormImageInput from "@/Components/FormImageInput";
import FormSelect from "@/Components/FormSelect";
import Layout from "@/Layouts/Admin/Layout";
import { router, useForm } from "@inertiajs/react";
import { Button, MenuItem, TextField } from "@mui/material";

function Create({ categories }) {
    const { data, setData, errors } = useForm({
        name: "",
        description: "",
        parent_id: "",
        image: "",
    });

    const handleSubmit = () => {
        router.post("/admin/categories", data);
    };

    return (
        <div className="grid gap-5 grid-cols-[1fr_2fr]">
            <div>
                <FormFieldGroup
                    title={"Category Image"}
                    className={"pe-5 pb-5"}
                >
                    <FormImageInput
                        showImage={Boolean(data.image)}
                        src={data.image && URL.createObjectURL(data.image)}
                        onClose={() => setData("image", "")}
                        onChange={(e) => setData("image", e.target.files[0])}
                    />
                </FormFieldGroup>
            </div>
            <div className="flex flex-col gap-5">
                <FormFieldGroup title={"Category Information"}>
                    <FormFieldWithLabel label={"Category Name"}>
                        <TextField
                            size="small"
                            className="flex-1"
                            placeholder="Category Name"
                            required
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
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
                        />
                    </FormFieldWithLabel>
                    <FormFieldWithLabel label={"Parent Category"}>
                        <FormSelect
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
                        </FormSelect>
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
