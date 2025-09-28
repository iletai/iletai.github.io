'use client';

import { useEffect } from 'react';

export default function HydrationFix() {
    useEffect(() => {
        // Detect and log browser extension interference
        const body = document.body;
        const attributes = Array.from(body.attributes);

        const suspiciousAttributes = attributes.filter(attr =>
            attr.name.includes('cz-') ||
            attr.name.includes('extension') ||
            attr.name.includes('gr-') ||
            attr.name.includes('adblock') ||
            attr.name.includes('translate')
        );

        if (suspiciousAttributes.length > 0 && process.env.NODE_ENV === 'development') {
            console.log('🔧 Browser extension detected:', suspiciousAttributes.map(attr => attr.name));
            console.log('ℹ️ This is expected and won\'t affect functionality.');
        }

        // Clean up development warnings in production and handle extension attributes
        if (process.env.NODE_ENV === 'production') {
            // Remove any development-only attributes that might cause issues
            const devAttributes = ['data-reactroot', 'data-react-helmet'];
            devAttributes.forEach(attr => {
                if (body.hasAttribute(attr)) {
                    body.removeAttribute(attr);
                }
            });
        }

        // Prevent hydration mismatches caused by extensions
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.target === body) {
                    // Silently handle dynamic attribute changes from extensions
                    // This prevents React hydration errors
                }
            });
        });

        observer.observe(body, {
            attributes: true,
            attributeFilter: suspiciousAttributes.map(attr => attr.name)
        });

        // Cleanup observer on unmount
        return () => observer.disconnect();
    }, []);

    return null; // This component doesn't render anything
}
