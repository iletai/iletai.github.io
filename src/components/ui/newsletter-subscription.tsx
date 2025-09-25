"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

interface NewsletterSubscriptionProps {
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: string;
    className?: string;
    showEffects?: boolean;
}

export function NewsletterSubscription({
    title = "Subscribe to Newsletter",
    description = "I occasionally write about design, technology, and share thoughts on the intersection of creativity and engineering.",
    action = "https://your-mailchimp-url.com",
    className = "",
    showEffects = true,
}: NewsletterSubscriptionProps) {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email) {
            setError("Please enter your email address");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        setIsSubmitting(true);

        try {
            // If action URL is provided, submit to that endpoint
            if (action !== "https://your-mailchimp-url.com") {
                const formData = new FormData();
                formData.append("EMAIL", email);

                await fetch(action, {
                    method: "POST",
                    body: formData,
                    mode: "no-cors", // Required for Mailchimp
                });
            }

            setIsSubmitted(true);
            setEmail("");
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <Card className={`relative overflow-hidden p-8 md:p-12 ${className}`}>
                {/* Background Effects - Success State */}
                {showEffects && (
                    <>
                        {/* Success Gradient Background */}
                        <div
                            className="absolute inset-0 opacity-50"
                            style={{
                                background: `linear-gradient(135deg,
                  hsl(var(--primary) / 0.1) 0%,
                  hsl(142 76% 36% / 0.1) 25%,
                  transparent 50%,
                  hsl(142 76% 36% / 0.05) 75%,
                  hsl(var(--primary) / 0.1) 100%)`
                            }}
                        />

                        {/* Dot Pattern */}
                        <div
                            className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage: `radial-gradient(circle at 2px 2px, hsl(142 76% 36% / 0.3) 1px, transparent 0)`,
                                backgroundSize: '32px 32px',
                            }}
                        />

                        {/* Radial Mask Effect */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: `radial-gradient(ellipse 600px 400px at 50% 50%, transparent 0%, transparent 40%, hsl(var(--background) / 0.8) 100%)`,
                            }}
                        />
                    </>
                )}

                <div className="relative z-10 text-center">
                    <div className="mb-4">
                        <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                            <svg
                                className="w-8 h-8 text-green-600 dark:text-green-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                            Thank you for subscribing!
                        </h3>
                        <p className="text-muted-foreground">
                            You&apos;ll receive an email confirmation shortly.
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => setIsSubmitted(false)}
                        className="mt-4"
                    >
                        Subscribe another email
                    </Button>
                </div>
            </Card>
        );
    }

    return (
        <Card className={`relative overflow-hidden p-8 md:p-12 ${className}`}>
            {/* Background Effects - Magic Portfolio Style */}
            {showEffects && (
                <>
                    {/* Main Gradient Background */}
                    <div
                        className="absolute inset-0 opacity-50"
                        style={{
                            background: `linear-gradient(135deg,
                hsl(var(--primary) / 0.1) 0%,
                hsl(var(--primary) / 0.05) 25%,
                transparent 50%,
                hsl(var(--accent) / 0.05) 75%,
                hsl(var(--accent) / 0.1) 100%)`
                        }}
                    />

                    {/* Dot Pattern with Magic Portfolio styling */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary) / 0.3) 1px, transparent 0)`,
                            backgroundSize: '32px 32px',
                            backgroundPosition: '0 0, 16px 16px',
                        }}
                    />

                    {/* Radial Mask Effect */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `radial-gradient(ellipse 800px 600px at 50% 0%, transparent 0%, transparent 40%, hsl(var(--background) / 0.8) 100%)`,
                        }}
                    />

                    {/* Subtle overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
                </>
            )}

            <div className="relative z-10">
                <div className="max-w-md mx-auto text-center">
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                        {title}
                    </h3>
                    <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                        {description}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1"
                                disabled={isSubmitting}
                            />
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="sm:w-auto w-full"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg
                                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        Subscribing...
                                    </>
                                ) : (
                                    "Subscribe"
                                )}
                            </Button>
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm mt-2">{error}</p>
                        )}

                        <p className="text-xs text-muted-foreground mt-4">
                            By subscribing, you agree to receive updates. You can unsubscribe at any time.
                        </p>
                    </form>
                </div>
            </div>
        </Card>
    );
}
