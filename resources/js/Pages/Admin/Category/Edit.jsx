import PrimaryButton from "@/Components/Button/PrimaryButton";
import FormImageInput from "@/Components/Input/FormImageInput";
import Select from "@/Components/Input/Select";
import TextField from "@/Components/Input/TextField";
import Layout from "@/Layouts/Admin/Layout";
import { useForm } from "@inertiajs/react";
import { SaveOutlined } from "@mui/icons-material";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
} from "@mui/material";
import { useEffect } from "react";

function Edit({ category, categories, open, setOpen, isMain }) {
    const {
        data,
        setData,
        errors,
        setError,
        clearErrors,
        post,
        reset,
        setDefaults,
    } = useForm({
        name: "",
        parent_id: "",
        image: "",
    });

    const handleClose = () => {
        reset();
        setDefaults({
            name: category.name,
            parent_id: category.parent_id || "",
            image: category.image,
        });
        clearErrors();
        setOpen(false);
    };

    const handleSubmit = () => {
        const url = isMain
            ? `/admin/maincategories/${category.id}`
            : `/admin/subcategories/${category.id}`;
        post(url, {
            onSuccess: handleClose,
        });
    };

    useEffect(() => {
        if (open) {
            setData({
                name: category.name,
                parent_id: category.parent_id || "",
                image: category.image,
            });
            clearErrors();
        }
    }, [category, open]);

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={open}
            onClose={() => setOpen(false)}
            keepMounted={false}
        >
            <DialogTitle className="p-5 flex gap-5 items-center text-lg">
                {isMain ? "Edit Main Category" : "Edit Sub Category"}
            </DialogTitle>

            <DialogContent dividers className="p-5 grid gap-5 grid-cols-3">
                <div className="col-span-1">
                    <label className="block mb-2.5">Image</label>
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
                </div>
                <div className="col-span-2 space-y-2.5">
                    <div>
                        <label className="block mb-2.5">Category Name</label>
                        <TextField
                            required
                            className="w-full"
                            placeholder="Category Name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                    </div>
                    {!isMain && (
                        <div>
                            <label className="block mb-2.5">
                                Parent Category
                            </label>
                            <Select
                                required
                                className="w-full"
                                value={data.parent_id}
                                onChange={(e) =>
                                    setData("parent_id", e.target.value)
                                }
                                error={!!errors.parent_id}
                                helperText={errors.parent_id}
                            >
                                {categories.map((category) => (
                                    <MenuItem
                                        value={category.id}
                                        key={category.id}
                                    >
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    )}
                </div>
            </DialogContent>

            <DialogActions className="p-5">
                <PrimaryButton
                    onClick={handleClose}
                    variant="text"
                    className="min-w-auto"
                >
                    Close
                </PrimaryButton>
                <PrimaryButton
                    startIcon={<SaveOutlined />}
                    onClick={handleSubmit}
                >
                    Update Category
                </PrimaryButton>
            </DialogActions>
        </Dialog>
    );
}

export default Edit;
