/**
 * Default configuration values for OpenTwig
 * This centralizes all default settings to make them easier to maintain
 */

const DEFAULT_CONFIG = {
    // Theme settings
    theme: 'default',
    
    // Page settings
    title: 'OpenTwig 🌿',
    minify: true,
    
    // Content settings
    name: 'Your Name',
    content: 'Hello World! Here is my bio.',
    url: 'https://links.yourwebsite.com',
    
    // Avatar settings
    avatar: {
        path: './avatar.png'
    },
    
    // Links settings
    links: [],
    footerLinks: [],
    
    // Share settings
    share: {
        title: 'Your Name - opentwig 🌿',
        url: 'https://links.yourwebsite.com',
        text: 'Share'
    }
};

/**
 * Sample configuration for --init command
 * This provides a more complete example with sample data
 */
const SAMPLE_CONFIG = {
    theme: 'default',
    url: 'https://links.yourwebsite.com',
    title: 'Your Name - opentwig 🌿',
    name: 'Your Name',
    content: 'Hello World! Here is my bio.',
    minify: true,
    avatar: {
        path: 'avatar.png'
    },
    links: [
        {
            url: 'https://twitter.com',
            title: 'Twitter'
        },
        {
            url: 'https://instagram.com',
            title: 'Instagram'
        },
        {
            url: 'https://linkedin.com',
            title: 'LinkedIn'
        },
        {
            url: 'https://github.com',
            title: 'GitHub'
        },
        {
            url: 'https://youtube.com',
            title: 'YouTube'
        }
    ],
    footerLinks: [
        {
            title: 'Contact',
            url: 'mailto:mail@mail.com'
        },
        {
            title: 'Privacy',
            content: 'When you visit a website, it may store or retrieve information on your browser, mostly in the form of cookies. But its not violating your privacy.'
        }
    ],
    share: {
        title: 'Your Name - opentwig 🌿',
        url: 'https://links.yourwebsite.com',
        text: 'Share'
    }
};

/**
 * Apply default values to a configuration object
 * @param {Object} config - The configuration object to apply defaults to
 * @returns {Object} - Configuration with defaults applied
 */
const applyDefaults = (config) => {
    const result = { ...config };
    
    // Apply defaults for each key
    Object.keys(DEFAULT_CONFIG).forEach(key => {
        if (result[key] === undefined || result[key] === null) {
            result[key] = DEFAULT_CONFIG[key];
        }
    });
    
    // Special handling for nested objects
    if (result.avatar && typeof result.avatar === 'object') {
        result.avatar = { ...DEFAULT_CONFIG.avatar, ...result.avatar };
    } else if (!result.avatar) {
        result.avatar = { ...DEFAULT_CONFIG.avatar };
    }
    
    if (result.share && typeof result.share === 'object') {
        result.share = { ...DEFAULT_CONFIG.share, ...result.share };
    } else if (!result.share) {
        result.share = { ...DEFAULT_CONFIG.share };
    }
    
    return result;
};

module.exports = {
    DEFAULT_CONFIG,
    SAMPLE_CONFIG,
    applyDefaults
};
