import { router } from "@inertiajs/react";

function Logo() {
    const goHome = () => router.visit("/");

    return (
        <div className="w-32 hover:cursor-pointer" onClick={goHome}>
            <img src="/storage/assets/logo.png" className="w-full h-full" />
        </div>
    );
}

export default Logo;
