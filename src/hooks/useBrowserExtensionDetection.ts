'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to detect if browser extensions are modifying the DOM
 * This helps prevent hydration mismatches caused by extensions
 */
export function useBrowserExtensionDetection() {
  const [hasExtensions, setHasExtensions] = useState(false);

  useEffect(() => {
    // Check for common extension attributes/modifications
    const checkExtensions = () => {
      const body = document.body;
      const html = document.documentElement;

      // Common extension attributes
      const extensionAttributes = [
        'cz-shortcut-listen', // ColorZilla
        'data-new-gr-c-s-check-loaded', // Grammarly
        'data-gr-ext-installed', // Grammarly
        'spellcheck-ext', // Various spell checkers
        'translate', // Google Translate
        'adblock-detected', // Ad blockers
      ];

      // Check if any extension attributes exist
      const hasExtensionAttributes = extensionAttributes.some(attr =>
        body.hasAttribute(attr) || html.hasAttribute(attr)
      );

      // Check for extension-added elements
      const hasExtensionElements = document.querySelector('[id*="extension"], [class*="extension"], [data-extension]') !== null;

      setHasExtensions(hasExtensionAttributes || hasExtensionElements);
    };

    // Initial check
    checkExtensions();

    // Periodic check for dynamically added extensions
    const interval = setInterval(checkExtensions, 1000);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  return hasExtensions;
}
