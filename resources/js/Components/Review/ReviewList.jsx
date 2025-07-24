import { Avatar, Rating } from "@mui/material";

function ReviewList({ reviews }) {
    const exists = reviews?.length > 0;

    if (!exists)
        return (
            <div className="text-center py-8 text-gray-500">
                No reviews yet. Be the first to review!
            </div>
        );

    return (
        <div>
            {reviews
                .sort((p, c) => new Date(c.updated_at) - new Date(p.updated_at))
                .map((review) => (
                    <div
                        key={review.id}
                        className="py-5 space-y-2.5 border-b last:border-0"
                    >
                        <div className="flex gap-2.5">
                            <Avatar src={review.user.avatar} />
                            <div>
                                <p className="font-medium">
                                    {review.user.name}
                                </p>
                                <span className="flex items-center gap-2.5">
                                    <Rating
                                        readOnly
                                        size="small"
                                        value={review.rating}
                                    />
                                    <span className="text-xs text-gray-400">
                                        {new Date(
                                            review.created_at
                                        ).toLocaleDateString("en-UK")}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div>{review.comment}</div>
                    </div>
                ))}
        </div>
    );
}

export default ReviewList;
