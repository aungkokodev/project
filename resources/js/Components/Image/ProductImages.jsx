import clsx from "clsx";
import { useState } from "react";

function ProductImages({ images }) {
    const mainImage = images?.find((img) => img.is_default);
    const [current, setCurrent] = useState(null);

    const currentImage = images?.find((img) => img.id === current);
    const handleClick = (id) => setCurrent(id);

    return (
        <div>
            <img
                src={currentImage ? currentImage?.path : mainImage?.path}
                className="w-full x-auto border rounded-xl aspect-square"
            />
            <div className="grid gap-5 grid-cols-4 mt-5">
                {images.map((image) => (
                    <img
                        key={image.id}
                        src={image.path}
                        className={clsx(
                            "w-full h-auto aspect-square border rounded-lg hover:border-green-600",
                            image.id === (current || mainImage?.id)
                                ? "opacity-100"
                                : "opacity-40"
                        )}
                        onClick={() => handleClick(image.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProductImages;
