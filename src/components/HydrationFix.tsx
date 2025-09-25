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

        if (suspiciousAttributes.length > 0) {
            console.log('🔧 Browser extension detected:', suspiciousAttributes.map(attr => attr.name));
            console.log('ℹ️ This is normal and won\'t affect functionality. The suppressHydrationWarning prevents React errors.');
        }

        // Clean up development warnings in production
        if (process.env.NODE_ENV === 'production') {
            // Remove any development-only attributes that might cause issues
            const devAttributes = ['data-reactroot', 'data-react-helmet'];
            devAttributes.forEach(attr => {
                if (body.hasAttribute(attr)) {
                    body.removeAttribute(attr);
                }
            });
        }
    }, []);

    return null; // This component doesn't render anything
}
