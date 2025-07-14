import { User } from "lucide-react";
import IconButton from "../../Components/Button/IconButton";
import { router, usePage } from "@inertiajs/react";

function TopBarAccount() {
    const { auth } = usePage().props;

    let role = null;

    if (auth?.user) {
        role = auth.user.role;
    }

    const path =
        role === "customer"
            ? route("user.profile")
            : role === "admin"
            ? route("admin.dashboard")
            : route("login");

    const goTo = () => {
        router.visit(path);
    };

    return (
        <IconButton onClick={goTo}>
            <User />
        </IconButton>
    );
}

export default TopBarAccount;
