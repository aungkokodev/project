import PrimaryButton from "@/Components/Button/PrimaryButton";
import { getDate } from "@/utils/formatHelper";
import { EditOutlined } from "@mui/icons-material";
import {
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";

function Show({ category, open, setOpen, setOpenEdit }) {
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle className="p-5 flex gap-5 items-center text-lg">
                {category.name}
                <Chip
                    color="primary"
                    label={category.parent ? "Sub Category" : "Main Category"}
                />
            </DialogTitle>
            <DialogContent dividers className="p-5 grid gap-5 grid-cols-3">
                <div className="col-span-1 aspect-square border rounded-xl overflow-hidden">
                    <img src={category.image} />
                </div>
                <div className="col-span-2 grid grid-cols-2 gap-5 self-start">
                    <div className="col-span-2">
                        <p className="font-bold opacity-70 mb-1">Name</p>
                        <p>{category.name}</p>
                    </div>
                    <div>
                        <p className="font-bold opacity-70 mb-1">Slug</p>
                        <p>{category.slug}</p>
                    </div>
                    <div>
                        <p className="font-bold opacity-70 mb-1">
                            Products Count
                        </p>
                        <p>{category.products_count}</p>
                    </div>
                    <div>
                        <p className="font-bold opacity-70 mb-1">Created At</p>
                        <p>{getDate(category.created_at)}</p>
                    </div>
                    <div>
                        <p className="font-bold opacity-70 mb-1">
                            Last Updated At
                        </p>
                        <p>{getDate(category.updated_at)}</p>
                    </div>
                    {category.parent && (
                        <div>
                            <p className="font-bold opacity-70 mb-1">
                                Parent Category
                            </p>
                            <p>{category.parent.name}</p>
                        </div>
                    )}
                    {!category.parent && (
                        <div>
                            <p className="font-bold opacity-70 mb-1">
                                Sub Categories Count
                            </p>
                            <p>{category.children.length}</p>
                        </div>
                    )}
                </div>
            </DialogContent>
            <DialogActions className="p-5">
                <PrimaryButton
                    onClick={() => setOpen(false)}
                    variant="text"
                    className="min-w-auto"
                >
                    Close
                </PrimaryButton>
                <PrimaryButton
                    startIcon={<EditOutlined />}
                    onClick={() => {
                        setOpen(false);
                        setOpenEdit(true);
                    }}
                >
                    Edit Category
                </PrimaryButton>
            </DialogActions>
        </Dialog>
    );
}

export default Show;
