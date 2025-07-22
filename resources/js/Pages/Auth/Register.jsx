import PrimaryButton from "@/Components/Button/PrimaryButton";
import TextField from "@/Components/Input/TextField";
import Layout from "@/Layouts/Web/Layout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <div className="h-[calc(100vh-192px)] flex items-center justify-center p-5">
            <Head title="Register" />

            <form onSubmit={submit} className="w-xs mx-auto space-y-5">
                <h2 className="font-bold text-2xl text-center text-slate-800">
                    REGISTER
                </h2>

                <TextField
                    required
                    id="name"
                    type="name"
                    name="name"
                    label="Name"
                    className="w-full"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    helperText={errors.name}
                    error={errors.name}
                    autoFocus={true}
                />

                <TextField
                    required
                    id="email"
                    type="email"
                    name="email"
                    label="Email"
                    className="w-full"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    helperText={errors.email}
                    error={errors.email}
                />

                <TextField
                    required
                    id="password"
                    type="password"
                    name="password"
                    label="Password"
                    className="w-full"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    helperText={errors.password}
                    error={errors.password}
                />

                <TextField
                    required
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    label="Confirm Password"
                    className="w-full"
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                    helperText={errors.password_confirmation}
                    error={errors.password_confirmation}
                />

                <PrimaryButton
                    type="submit"
                    className="w-full py-3.5"
                    disabled={processing}
                >
                    Register
                </PrimaryButton>

                <p className="text-sm text-center">
                    Already registered?{" "}
                    <Link href={route("login")} className="underline">
                        Login now
                    </Link>
                </p>
            </form>
        </div>
    );
}

Register.layout = (page) => <Layout children={page} />;
