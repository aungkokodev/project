import { router, usePage } from "@inertiajs/react";
import { User } from "lucide-react";
import IconButton from "../../Components/Button/IconButton";

function TopBarAccount() {
    const { auth } = usePage().props;
    const role = auth?.user?.role ?? null;

    const path =
        role === "customer"
            ? route("profile")
            : role === "admin"
            ? route("admin.dashboard")
            : route("login");

    const goTo = () => router.visit(path);

    return (
        <IconButton onClick={goTo}>
            <User />
        </IconButton>
    );
}

export default TopBarAccount;
