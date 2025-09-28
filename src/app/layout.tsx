import HydrationFix from "@/components/HydrationFix";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageTransition from "@/components/motion/PageTransition";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Portfolio | Developer & Creator",
    description: "Portfolio website showcasing web development projects, blog posts, and technical expertise. Built with Next.js, TypeScript, and modern web technologies.",
    keywords: ["portfolio", "web development", "Next.js", "React", "TypeScript", "blog"],
    authors: [{ name: "Your Name" }],
    openGraph: {
        type: "website",
        locale: "vi_VN",
        url: "https://yoursite.com",
        title: "Portfolio | Developer & Creator",
        description: "Portfolio website showcasing web development projects and blog posts.",
        siteName: "Portfolio",
    },
    twitter: {
        card: "summary_large_image",
        title: "Portfolio | Developer & Creator",
        description: "Portfolio website showcasing web development projects and blog posts.",
        creator: "@yourusername",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vi" className={inter.variable} suppressHydrationWarning>
            <body className="font-inter antialiased bg-background text-foreground" suppressHydrationWarning={true}>
                <ThemeProvider>
                    <HydrationFix />
                    <Header />
                    <PageTransition>
                        <main className="min-h-screen pt-16">
                            {children}
                        </main>
                    </PageTransition>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
