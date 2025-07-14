import PrimaryButton from "@/Components/Button/PrimaryButton";
import TextField from "@/Components/Input/TextField";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { Rating } from "@mui/material";
import { LogIn } from "lucide-react";

function ReviewForm({ productId }) {
    const page = usePage();
    const auth = page.props.auth;

    const { data, setData, post, errors, reset } = useForm({
        product_id: productId,
        rating: 1,
        comment: "",
    });

    return (
        <div className="p-5 flex gap-5 flex-col bg-gray-50 rounded-lg">
            {auth?.user ? (
                <>
                    <p>Write a review</p>
                    <Rating
                        value={data.rating}
                        onChange={(e) =>
                            setData("rating", parseInt(e.target.value))
                        }
                    />
                    <TextField
                        required
                        multiline
                        rows={3}
                        label="comment"
                        value={data.comment}
                        onChange={(e) => setData("comment", e.target.value)}
                        error={errors.comment}
                        helperText={errors.comment}
                    />
                    <PrimaryButton
                        className="self-start"
                        onClick={() =>
                            post("/reviews", {
                                preserveScroll: true,
                                onSuccess: () => {
                                    setData("rating", 1);
                                    setData("comment", "");
                                },
                            })
                        }
                    >
                        Submit Review
                    </PrimaryButton>
                </>
            ) : (
                <>
                    <p>
                        Please{" "}
                        <Link
                            href={"/login"}
                            className="font-semibold underline"
                        >
                            login
                        </Link>{" "}
                        to leave a review
                    </p>
                    <PrimaryButton
                        onClick={() => router.visit("/login")}
                        className="w-50 inline-flex items-center justify-center gap-2"
                    >
                        <LogIn className="w-4 h-4" />
                        Login
                    </PrimaryButton>
                </>
            )}
        </div>
    );
}

export default ReviewForm;
