"use client";

import { MagicNewsletter } from "@/components/ui/magic-newsletter";
import { NewsletterSubscription } from "@/components/ui/newsletter-subscription";

export default function NewsletterExample() {
    return (
        <div className="max-w-4xl mx-auto p-8 space-y-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Newsletter Subscription Components</h1>
                <p className="text-muted-foreground text-lg">
                    Clone of Magic Portfolio&apos;s newsletter design with various configurations
                </p>
            </div>

            {/* Magic Portfolio Style */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Magic Portfolio Style</h2>
                <MagicNewsletter variant="portfolio" firstName="Selene" />
            </div>

            {/* Magic Store Style */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Magic Store Style</h2>
                <MagicNewsletter variant="store" />
            </div>

            {/* Magic Bio Style */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Magic Bio Style</h2>
                <MagicNewsletter variant="bio" firstName="Tai" />
            </div>

            {/* Custom Configuration */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Custom Configuration</h2>
                <NewsletterSubscription
                    title={<>Join <span className="text-primary">Tai&apos;s</span> Developer Community</>}
                    description="Get exclusive tutorials, code snippets, and insights on modern web development. No spam, just pure value."
                    showEffects={true}
                    className="border border-primary/20"
                />
            </div>

            {/* Without Effects */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Simple Version (No Effects)</h2>
                <NewsletterSubscription
                    title="Clean Newsletter"
                    description="A simple, clean newsletter subscription form without background effects."
                    showEffects={false}
                />
            </div>

            {/* Setup Instructions */}
            <div className="mt-12 p-6 bg-muted rounded-lg">
                <h3 className="text-lg font-semibold mb-3">🚀 Quick Setup Guide</h3>
                <div className="space-y-4 text-sm">
                    <div>
                        <h4 className="font-semibold text-primary mb-2">1. Mailchimp Integration:</h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                            <li>Create a Mailchimp account and audience</li>
                            <li>Go to Audience → Signup forms → Embedded forms</li>
                            <li>Copy the form action URL</li>
                            <li>Update <code>action</code> prop in your component</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-primary mb-2">2. Customization Options:</h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                            <li>Use <code>MagicNewsletter</code> for pre-built variants</li>
                            <li>Use <code>NewsletterSubscription</code> for full customization</li>
                            <li>Edit <code>/src/lib/newsletter-config.ts</code> for global settings</li>
                            <li>Modify background effects in the component</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-primary mb-2">3. Usage Examples:</h4>
                        <pre className="bg-background p-3 rounded border text-xs overflow-x-auto">
                            <code>{`// Basic Magic Portfolio Style
<MagicNewsletter variant="portfolio" firstName="Your Name" />

// Store/E-commerce Style
<MagicNewsletter variant="store" />

// Fully Custom
<NewsletterSubscription
  title="Custom Title"
  description="Custom description"
  action="your-mailchimp-url"
  showEffects={true}
/>`}</code>
                        </pre>
                    </div>
                </div>
            </div>

            {/* Features List */}
            <div className="mt-8 p-6 bg-muted rounded-lg">
                <h3 className="text-lg font-semibold mb-3">✨ Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <ul className="space-y-1">
                        <li>• 🎨 Magic Portfolio inspired design</li>
                        <li>• 📱 Fully responsive</li>
                        <li>• ✉️ Real-time email validation</li>
                        <li>• 🔄 Loading states & animations</li>
                    </ul>
                    <ul className="space-y-1">
                        <li>• ✅ Success confirmation</li>
                        <li>• 🎯 Mailchimp ready</li>
                        <li>• ⚙️ Highly customizable</li>
                        <li>• 🔧 TypeScript support</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
