import { Head, Link, router } from "@inertiajs/react";
import Container from "@/Components/Common/Container";
import Layout from "@/Layouts/Web/Layout";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import { ArrowRight, Mail, Phone, MapPin, Clock } from "lucide-react";

function ContactPage() {
    return (
        <div className="bg-white">
            <Head title="Contact Us" />

            <section className="relative py-20 bg-gradient-to-r from-green-800/90 to-green-600/90 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/storage/assets/farm-contact.jpg')] bg-cover bg-center mix-blend-overlay opacity-20" />
                <Container className="relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Contact Us
                    </h1>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto">
                        We're here to help with any questions about our products
                    </p>
                </Container>
            </section>

            <section className="py-16">
                <Container className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Send Us a Message
                        </h2>
                        <form className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="subject"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="How can we help?"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="Your message..."
                                ></textarea>
                            </div>
                            <PrimaryButton
                                type="submit"
                                className="w-full justify-center py-3"
                            >
                                Send Message
                                <ArrowRight className="ml-2" />
                            </PrimaryButton>
                        </form>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Contact Information
                        </h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-green-50 rounded-full">
                                    <Mail className="text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Email
                                    </h3>
                                    <p className="text-gray-600">
                                        support@farmsupply.com
                                    </p>
                                    <p className="text-gray-600">
                                        sales@farmsupply.com
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-green-50 rounded-full">
                                    <Phone className="text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Phone
                                    </h3>
                                    <p className="text-gray-600">
                                        +1 (800) 555-1234
                                    </p>
                                    <p className="text-gray-600">
                                        Mon-Fri: 8am-6pm EST
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-green-50 rounded-full">
                                    <MapPin className="text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Address
                                    </h3>
                                    <p className="text-gray-600">
                                        123 Farm Supply Road
                                    </p>
                                    <p className="text-gray-600">
                                        Agricultural City, FC 12345
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-green-50 rounded-full">
                                    <Clock className="text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Business Hours
                                    </h3>
                                    <p className="text-gray-600">
                                        Monday - Friday: 9am - 6pm
                                    </p>
                                    <p className="text-gray-600">
                                        Saturday: 10am - 4pm
                                    </p>
                                    <p className="text-gray-600">
                                        Sunday: Closed
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 rounded-xl overflow-hidden shadow-md">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215209132828!2d-73.9878446845938!3d40.7484404793279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjQiTiA3M8KwNTknMTAuNyJX!5e0!3m2!1sen!2sus!4v1623861234567!5m2!1sen!2sus"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                title="Our Location"
                            ></iframe>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="py-16 bg-gray-50">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Common questions about our products and services
                        </p>
                    </div>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {[
                            {
                                question: "What payment methods do you accept?",
                                answer: "We accept all major credit cards, PayPal, and farm supply purchase orders.",
                            },
                            {
                                question: "What is your return policy?",
                                answer: "We offer a 30-day return policy for most unused items. Some agricultural supplies may have different policies.",
                            },
                            {
                                question: "Do you offer bulk discounts?",
                                answer: "Yes, we offer quantity discounts for most products. Contact our sales team for pricing.",
                            },
                            {
                                question: "How long does shipping take?",
                                answer: "Most orders ship within 1-2 business days. Delivery times vary by location but typically take 3-5 business days.",
                            },
                        ].map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-sm"
                            >
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    {faq.question}
                                </h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
        </div>
    );
}

ContactPage.layout = (page) => <Layout children={page} />;

export default ContactPage;
