import {
    Mail as MailIcon,
    X as XIcon
} from "lucide-react";
import Link from "next/link";
import { SiGithub, SiLinkedin } from "react-icons/si";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">iletai</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Personal portfolio website, sharing knowledge and web development experience.
                            Built with Next.js, TypeScript and Tailwind CSS.
                        </p>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/projects" className="text-gray-400 hover:text-white transition-colors">
                                    Projects
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Connect</h3>
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com/iletai"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="GitHub"
                            >
                                <SiGithub className="h-5 w-5" />
                            </a>
                            <a
                                href="https://linkedin.com/in/iletai"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="LinkedIn"
                            >
                                <SiLinkedin className="h-5 w-5" />
                            </a>
                            <a
                                href="https://x.com/tailqt"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="X (formerly Twitter)"
                            >
                                <XIcon className="h-5 w-5" />
                            </a>
                            <a
                                href="mailto:iletai@hotmail.com"
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="Email"
                            >
                                <MailIcon className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div className="mt-4 sm:mt-0">
                            <p className="text-gray-400 text-sm">
                                Copyright © {currentYear} iletai. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
