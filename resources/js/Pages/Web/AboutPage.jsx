import { Head, Link } from "@inertiajs/react";
import Container from "@/Components/Common/Container";
import Layout from "@/Layouts/Web/Layout";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import { ArrowRight, Users, Leaf, Target, Globe, Award } from "lucide-react";

function AboutPage() {
    return (
        <div className="bg-white">
            <Head title="About Us" />

            <section className="relative py-20 bg-gradient-to-r from-green-800/90 to-green-600/90 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/storage/assets/farm-about.jpg')] bg-cover bg-center mix-blend-overlay opacity-20" />
                <Container className="relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Our Story
                    </h1>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto">
                        Dedicated to providing quality farm supplies to small
                        farmers since 2010
                    </p>
                </Container>
            </section>

            <section className="py-16 bg-gray-50">
                <Container className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Target className="text-green-600" />
                            <span className="text-sm font-semibold text-green-600">
                                OUR MISSION
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Empowering Small Farms
                        </h2>
                        <p className="text-gray-600 mb-6">
                            At FarmSupply, we believe that small farms are the
                            backbone of sustainable agriculture. Our mission is
                            to provide affordable, high-quality supplies that
                            help small farmers thrive.
                        </p>
                        <p className="text-gray-600 mb-8">
                            Founded by farmers for farmers, we understand the
                            challenges you face and are committed to offering
                            solutions that make your work easier and more
                            productive.
                        </p>
                        <PrimaryButton onClick={() => router.visit("/contact")}>
                            Get in Touch
                            <ArrowRight className="ml-2" />
                        </PrimaryButton>
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-lg">
                        <img
                            src="/storage/assets/farm-team.jpg"
                            alt="Our team"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </Container>
            </section>

            <section className="py-16 bg-white">
                <Container>
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Leaf className="text-green-600" />
                            <span className="text-sm font-semibold text-green-600">
                                OUR VALUES
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">
                            What We Stand For
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: (
                                    <Leaf
                                        className="text-green-600"
                                        size={32}
                                    />
                                ),
                                title: "Sustainability",
                                description:
                                    "We source eco-friendly products and promote sustainable farming practices.",
                            },
                            {
                                icon: (
                                    <Users
                                        className="text-green-600"
                                        size={32}
                                    />
                                ),
                                title: "Community",
                                description:
                                    "We support local farming communities through education and partnerships.",
                            },
                            {
                                icon: (
                                    <Award
                                        className="text-green-600"
                                        size={32}
                                    />
                                ),
                                title: "Quality",
                                description:
                                    "Every product in our catalog meets strict quality standards.",
                            },
                            {
                                icon: (
                                    <Globe
                                        className="text-green-600"
                                        size={32}
                                    />
                                ),
                                title: "Accessibility",
                                description:
                                    "We make quality farm supplies accessible to everyone.",
                            },
                        ].map((value, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-md transition-shadow"
                            >
                                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="py-16 bg-gray-50">
                <Container>
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Users className="text-green-600" />
                            <span className="text-sm font-semibold text-green-600">
                                OUR TEAM
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">
                            Meet The Farmers Behind FarmSupply
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Our team brings decades of combined farming
                            experience to help you find the right products
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                name: "Sarah Johnson",
                                role: "Founder & CEO",
                                bio: "Third-generation farmer with 20+ years experience in organic farming.",
                                image: "/storage/assets/team-1.jpg",
                            },
                            {
                                name: "Michael Chen",
                                role: "Product Specialist",
                                bio: "Agricultural engineer focused on sustainable farming solutions.",
                                image: "/storage/assets/team-2.jpg",
                            },
                            {
                                name: "Emma Rodriguez",
                                role: "Customer Support",
                                bio: "Farm manager turned customer advocate.",
                                image: "/storage/assets/team-3.jpg",
                            },
                            {
                                name: "David Wilson",
                                role: "Operations Manager",
                                bio: "Supply chain expert ensuring you get products on time.",
                                image: "/storage/assets/team-4.jpg",
                            },
                        ].map((member, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
                            >
                                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-green-50">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    {member.name}
                                </h3>
                                <p className="text-green-600 font-medium mb-3">
                                    {member.role}
                                </p>
                                <p className="text-gray-600 text-sm">
                                    {member.bio}
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="py-16 bg-gradient-to-r from-green-700 to-green-600 text-white">
                <Container className="text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to Grow With Us?
                    </h2>
                    <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                        Join our community of farmers who trust us for their
                        farm supplies
                    </p>
                    <div className="flex gap-4 justify-center">
                        <PrimaryButton
                            onClick={() => router.visit("/collections")}
                            className="px-8 py-3 text-lg bg-white text-green-700 hover:bg-gray-100"
                        >
                            Shop Now
                            <ArrowRight className="ml-2" />
                        </PrimaryButton>
                        <Link
                            href="/contact"
                            className="px-6 py-3 text-lg border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors"
                        >
                            Contact Us
                        </Link>
                    </div>
                </Container>
            </section>
        </div>
    );
}

AboutPage.layout = (page) => <Layout children={page} />;

export default AboutPage;
