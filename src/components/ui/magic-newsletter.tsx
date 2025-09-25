"use client";

import { NewsletterSubscription } from "@/components/ui/newsletter-subscription";
import React from "react";

interface MagicNewsletterProps {
    variant?: "default" | "portfolio" | "store" | "bio";
    firstName?: string;
    className?: string;
    customConfig?: {
        title?: React.ReactNode;
        description?: React.ReactNode;
        action?: string;
    };
}

export function MagicNewsletter({
    variant = "default",
    firstName = "Selene",
    className = "",
    customConfig
}: MagicNewsletterProps) {

    const getVariantConfig = () => {
        switch (variant) {
            case "portfolio":
                return {
                    title: customConfig?.title || <>Subscribe to <strong>{firstName}&apos;s</strong> Newsletter</>,
                    description: customConfig?.description || "I occasionally write about design, technology, and share thoughts on the intersection of creativity and engineering.",
                    action: customConfig?.action || "https://your-mailchimp-url.com",
                };

            case "store":
                return {
                    title: customConfig?.title || <>Sign up and enjoy <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-mono">10%</span> off</>,
                    description: customConfig?.description || "Get notified about new product drops and exclusive offers delivered straight to your inbox.",
                    action: customConfig?.action || "https://your-mailchimp-url.com",
                };

            case "bio":
                return {
                    title: customConfig?.title || <>Stay Connected with <strong>{firstName}</strong></>,
                    description: customConfig?.description || "Get updates on new content, projects, and thoughts on design and development.",
                    action: customConfig?.action || "https://your-mailchimp-url.com",
                };

            default:
                return {
                    title: customConfig?.title || "Subscribe to Newsletter",
                    description: customConfig?.description || "Stay updated with the latest news and insights.",
                    action: customConfig?.action || "https://your-mailchimp-url.com",
                };
        }
    };

    const config = getVariantConfig();

    return (
        <NewsletterSubscription
            title={config.title}
            description={config.description}
            action={config.action}
            className={className}
            showEffects={true}
        />
    );
}
