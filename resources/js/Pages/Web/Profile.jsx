import PrimaryButton from "@/Components/Button/PrimaryButton";
import Container from "@/Components/Common/Container";
import Layout from "@/Layouts/Web/Layout";
import { Head, router } from "@inertiajs/react";
import { Avatar } from "@mui/material";
import { Edit, LogOut, Mail } from "lucide-react";

function Profile({ user, reviews }) {
    console.log(reviews);

    return (
        <>
            <Head title="Profile" />
            <Container className="py-10 px-10">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-xl font-bold text-gray-900">Profile</h1>
                    <PrimaryButton
                        onClick={() => router.post(route("logout"))}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </PrimaryButton>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row gap-6 items-start">
                            <div className="relative">
                                <Avatar
                                    src={user.avatar}
                                    className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"
                                ></Avatar>
                                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow border border-gray-200 hover:bg-gray-50">
                                    <Edit className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>

                            <div className="flex-1 space-y-4">
                                <div className="grid grid-cols-1 gap-5">
                                    <h2 className="text-2xl font-semibold text-gray-900">
                                        {user.name}
                                    </h2>
                                    <p className="text-gray-500">
                                        Member since{" "}
                                        {new Date(
                                            user.created_at
                                        ).toLocaleString("en-UK", {
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5 text-gray-400" />
                                        <span>{user.email}</span>
                                    </div>
                                    {/* <div className="flex items-center gap-3">
                                        <Phone className="w-5 h-5 text-gray-400" />
                                        <span>{user.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin className="w-5 h-5 text-gray-400" />
                                        <span>{user.address}</span>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 grid grid-cols-2 divide-x divide-gray-100">
                        <div className="p-4 text-center">
                            <p className="text-sm text-gray-500">Orders</p>
                            <p className="text-xl font-semibold">{0}</p>
                        </div>
                        <div className="p-4 text-center">
                            <p className="text-sm text-gray-500">Reviews</p>
                            <p className="text-xl font-semibold">
                                {reviews?.length || 0}
                            </p>
                        </div>
                    </div>
                </div>

                {/* <div className="mt-8 grid gap-6 sm:grid-cols-2">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-lg font-semibold mb-4">
                                Account Settings
                            </h3>
                            <div className="space-y-3">
                                <PrimaryButton
                                    variant="outline"
                                    className="w-full justify-start"
                                >
                                    Change Password
                                </PrimaryButton>
                                <PrimaryButton
                                    variant="outline"
                                    className="w-full justify-start"
                                >
                                    Update Email
                                </PrimaryButton>
                                <PrimaryButton
                                    variant="outline"
                                    className="w-full justify-start"
                                >
                                    Notification Preferences
                                </PrimaryButton>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-lg font-semibold mb-4">
                                Quick Links
                            </h3>
                            <div className="space-y-3">
                                <PrimaryButton
                                    variant="outline"
                                    className="w-full justify-start"
                                >
                                    Order History
                                </PrimaryButton>
                                <PrimaryButton
                                    variant="outline"
                                    className="w-full justify-start"
                                >
                                    Saved Payment Methods
                                </PrimaryButton>
                                <PrimaryButton
                                    variant="outline"
                                    className="w-full justify-start"
                                >
                                    Address Book
                                </PrimaryButton>
                            </div>
                        </div>
                    </div> */}
            </Container>
        </>
    );
}

Profile.layout = (page) => <Layout children={page} />;
export default Profile;
