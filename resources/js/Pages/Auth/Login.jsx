import PrimaryButton from "@/Components/Button/PrimaryButton";
import TextField from "@/Components/Input/TextField";
import Layout from "@/Layouts/Web/Layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Checkbox } from "@mui/material";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="h-[calc(100vh-192px)] flex items-center justify-center p-5">
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="w-xs mx-auto space-y-5">
                <h2 className="font-bold text-2xl text-center text-slate-800">
                    LOGIN
                </h2>

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
                    autoFocus={true}
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

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span>Remember me</span>
                    </label>
                    {/* {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="rounded-md text-sm underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Forgot your password?
                        </Link>
                    )} */}
                </div>

                <PrimaryButton
                    type="submit"
                    className="w-full py-3.5"
                    disabled={processing}
                >
                    Log in
                </PrimaryButton>

                <p className="text-sm text-center">
                    Not a member?{" "}
                    <Link href={route("register")} className="underline">
                        Sign up now
                    </Link>
                </p>
            </form>
        </div>
    );
}

Login.layout = (page) => <Layout children={page} />;
