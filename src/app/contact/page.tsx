import ContactForm from "@/components/forms/ContactForm";
import FadeInSection from "@/components/motion/FadeInSection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MagicBackground from "@/components/ui/magic-background";
import { ArrowLeft, GithubIcon, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
    return (
        <MagicBackground variant="grid" intensity="medium">
            <div className="min-h-screen py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <FadeInSection>
                        <div className="mb-12">
                            <Button variant="link" asChild className="text-blue-600 hover:text-blue-800 p-0 mb-6">
                                <Link href="/">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Về trang chủ
                                </Link>
                            </Button>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">Liên hệ</h1>
                            <p className="text-lg text-gray-600 max-w-3xl">
                                Có dự án thú vị? Muốn thảo luận về công nghệ? Hoặc đơn giản chỉ muốn
                                nói chuyện? Hãy liên hệ với tôi! Tôi luôn sẵn sàng kết nối và hợp tác.
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
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Thông tin liên hệ</h2>

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
                                                    Phản hồi trong vòng 24 giờ
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
                                                <h3 className="text-lg font-medium text-gray-900">Điện thoại</h3>
                                                <p className="text-gray-600">+84 326817280</p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Thứ 2 - Thứ 6, 9:00 - 18:00
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
                                                <h3 className="text-lg font-medium text-gray-900">Địa chỉ</h3>
                                                <p className="text-gray-600">
                                                    Da Nang City, Vietnam
                                                </p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Có thể làm việc remote hoặc on-site
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="bg-white rounded-lg shadow-lg p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Kết nối với tôi</h2>

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
                                            <strong>Lưu ý:</strong> Tôi thường phản hồi email trong vòng 24 giờ.
                                            Đối với các dự án urgent, hãy gọi điện trực tiếp.
                                        </p>
                                    </div>
                                </div>

                                {/* FAQ */}
                                <div className="bg-white rounded-lg shadow-lg p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Câu hỏi thường gặp</h2>

                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-medium text-gray-900 mb-2">
                                                Bạn có nhận freelance projects không?
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Có, tôi có nhận các dự án freelance phù hợp với schedule và expertise.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="font-medium text-gray-900 mb-2">
                                                Thời gian thực hiện dự án thường là bao lâu?
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Tùy thuộc vào scope và complexity. Dự án nhỏ: 1-2 tuần, dự án lớn: 1-3 tháng.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="font-medium text-gray-900 mb-2">
                                                Công nghệ nào bạn chuyên về?
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                React, Next.js, TypeScript, Node.js, và các technologies trong modern web stack.
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
