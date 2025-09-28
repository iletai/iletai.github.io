import ContactForm from "@/components/forms/ContactForm";
import FadeInSection from "@/components/motion/FadeInSection";
import { Card } from "@/components/ui/card";
import MagicBackground from "@/components/ui/magic-background";
import { GithubIcon, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";

export default function ContactPage() {
    return (
        <MagicBackground variant="grid" intensity="medium">
            <div className="min-h-screen pt-32 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <FadeInSection>
                        <div className="mb-12">
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Contact</h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
                                Have an exciting project? Want to discuss technology? Or simply want to chat?
                                Feel free to reach out! I&apos;m always ready to connect and collaborate.
                            </p>
                        </div>
                    </FadeInSection>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <FadeInSection delay={0.2} direction="left">
                            <Card className="p-8">
                                <ContactForm />
                            </Card>
                        </FadeInSection>

                        {/* Contact Information */}
                        <FadeInSection delay={0.4} direction="right">
                            <div className="space-y-8">
                                {/* Contact Details */}
                                <div className="bg-white rounded-lg shadow-lg p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

                                    <div className="space-y-6">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-100">
                                                    <Mail className="h-5 w-5 text-blue-600" />
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-lg font-medium text-gray-900">Email</h3>
                                                <p className="text-gray-600">iletai@hotmail.com</p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Response within 24 hours
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-green-100">
                                                    <Phone className="h-5 w-5 text-green-600" />
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                                                <p className="text-gray-600">+84 326817280</p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Monday - Friday, 9:00 - 18:00
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-100">
                                                    <MapPin className="h-5 w-5 text-purple-600" />
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-lg font-medium text-gray-900">Location</h3>
                                                <p className="text-gray-600">
                                                    Da Nang City, Vietnam
                                                </p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Available for remote or on-site work
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="bg-white rounded-lg shadow-lg p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Connect with me</h2>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <a
                                            href="https://github.com/iletai"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <GithubIcon className="h-6 w-6 text-gray-600 group-hover:text-gray-900" />
                                            <span className="ml-2 text-sm font-medium text-gray-600 group-hover:text-gray-900">
                                                GitHub
                                            </span>
                                        </a>

                                        <a
                                            href="https://linkedin.com/in/iletai"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-blue-50 transition-colors group"
                                        >
                                            <Linkedin className="h-6 w-6 text-gray-600 group-hover:text-blue-600" />
                                            <span className="ml-2 text-sm font-medium text-gray-600 group-hover:text-blue-600">
                                                LinkedIn
                                            </span>
                                        </a>

                                        <a
                                            href="https://twitter.com/tailqt"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-blue-50 transition-colors group"
                                        >
                                            <Twitter className="h-6 w-6 text-gray-600 group-hover:text-blue-500" />
                                            <span className="ml-2 text-sm font-medium text-gray-600 group-hover:text-blue-500">
                                                Twitter
                                            </span>
                                        </a>
                                    </div>

                                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                        <p className="text-sm text-blue-800">
                                            <strong>Note:</strong> I usually respond to emails within 24 hours.
                                            For urgent projects, please call directly.
                                        </p>
                                    </div>
                                </div>

                                {/* FAQ */}
                                <div className="bg-white rounded-lg shadow-lg p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-medium text-gray-900 mb-2">
                                                Do you take freelance projects?
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Yes, I accept freelance projects that fit my schedule and expertise.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="font-medium text-gray-900 mb-2">
                                                How long does project implementation usually take?
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Depends on scope and complexity. Small projects: 1-2 weeks, large projects: 1-3 months.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="font-medium text-gray-900 mb-2">
                                                What technologies do you specialize in?
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                React, Next.js, TypeScript, Node.js, and modern web stack technologies.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </div>
        </MagicBackground>
    );
}
