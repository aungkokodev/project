import clsx from "clsx";
import { useState } from "react";

function ProductImages({ images }) {
    const mainImage = images?.find((img) => img.is_default);
    const [current, setCurrent] = useState(null);

    const currentImage = images?.find((img) => img.id === current);
    const handleClick = (id) => setCurrent(id);

    return (
        <div className="grid grid-cols-5 gap-5 w-full">
            <div className="col-span-1 grid grid-rows-4 gap-5">
                {images.map((image) => (
                    <img
                        key={image.id}
                        src={image.path}
                        className={clsx(
                            "w-full h-full object-cover border rounded-lg cursor-pointer hover:border-green-600",
                            image.id === (current || mainImage?.id)
                                ? "opacity-100 border-gray-200"
                                : "opacity-40"
                        )}
                        onClick={() => handleClick(image.id)}
                    />
                ))}
            </div>

            <div className="col-span-4">
                <img
                    src={currentImage ? currentImage?.path : mainImage?.path}
                    className="w-full h-full object-cover border rounded-xl"
                />
            </div>
        </div>
    );
}

export default ProductImages;
