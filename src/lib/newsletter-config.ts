export const newsletterConfig = {
  // Mailchimp configuration
  mailchimp: {
    action: 'https://your-mailchimp-url.com/subscribe/post?parameters', // Replace with your Mailchimp embed form URL
    effects: {
      mask: {
        cursor: false,
        x: 50,
        y: 0,
        radius: 100
      },
      gradient: {
        display: true,
        x: 50,
        y: -25,
        width: 100,
        height: 100,
        tilt: 0,
        colorStart: 'accent-background-strong',
        colorEnd: 'static-transparent',
        opacity: 50
      },
      dots: {
        display: true,
        size: 2,
        color: 'brand-on-background-weak',
        opacity: 20
      },
      lines: {
        display: false,
        color: 'neutral-alpha-weak',
        opacity: 100
      },
      grid: {
        display: false,
        color: 'neutral-alpha-weak',
        opacity: 100,
        width: 'var(--static-space-32)',
        height: 'var(--static-space-32)'
      }
    }
  },

  // Newsletter content configuration
  newsletter: {
    display: true,
    title: "Subscribe to Newsletter",
    description: "I occasionally write about design, technology, and share thoughts on the intersection of creativity and engineering.",
  },

  // Personalized configuration example (can be used with person data)
  getPersonalizedConfig: (firstName: string = "Selene") => ({
    display: true,
    title: `Subscribe to ${firstName}'s Newsletter`,
    description: "I occasionally write about design, technology, and share thoughts on the intersection of creativity and engineering.",
  })
};

// Export individual configs for easier access
export const { mailchimp, newsletter } = newsletterConfig;
