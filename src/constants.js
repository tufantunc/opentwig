    /**
     * Constants for OpenTwig
     * Centralized constants to avoid magic strings and improve maintainability
     */

    const CONSTANTS = {
        // File paths
        CONFIG_FILE: 'config.json',
        OUTPUT_DIR: 'dist',
        
        // Output files
        OUTPUT_FILES: {
            HTML: 'index.html',
            CSS: 'style.css',
            AVATAR: 'avatar.png',
            OG_IMAGE: 'og-image.jpg',
            QR_CODE: 'qr.svg'
        },
        
        // Supported themes
        SUPPORTED_THEMES: ['default', 'dark', 'minimal', 'colorful'],
        DEFAULT_THEME: 'default',
        
        // CLI options
        CLI_OPTIONS: {
            HELP: ['--help', '-h'],
            INIT: ['--init', '-i'],
            VALIDATE: ['--validate-config'] 
        },
        
        // Messages
        MESSAGES: {
            CONFIG_NOT_FOUND: 'Config file not found',
            CONFIG_EXISTS: 'config.json already exists. Use --force to overwrite.',
            CONFIG_CREATED: 'Sample config.json created successfully!',
            CONFIG_EDIT_INSTRUCTIONS: 'Edit config.json with your information and run "npx opentwig" to generate your page.',
            PAGE_GENERATED: '🎉 Page generated successfully!',
            SHOWCASE_REMINDER: '🌟 Don\'t forget to add your site in showcase: https://github.com/tufantunc/opentwig',
            UNKNOWN_OPTION: 'Unknown option:',
            USE_HELP: 'Use --help for usage information.',
            ERROR_PREFIX: '❌ Error:',
            SUCCESS_PREFIX: '✅',
            WARNING_PREFIX: '⚠️',
            INFO_PREFIX: 'ℹ️'
        },
        
        // URLs
        GITHUB_URL: 'https://github.com/tufantunc/opentwig',
        
        // Default values
        DEFAULT_TITLE: 'OpenTwig 🌿',
        DEFAULT_NAME: 'Your Name',
        DEFAULT_CONTENT: 'Hello World! Here is my bio.',
        DEFAULT_URL: 'https://links.yourwebsite.com',
        
        // Required fields for validation
        REQUIRED_FIELDS: ['url', 'name']
    };

    module.exports = CONSTANTS;
