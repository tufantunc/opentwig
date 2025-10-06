const fs = require('fs');
const CONSTANTS = require('./src/constants');

function validateConfig(config) {
    const errors = [];

    // Required fields
    CONSTANTS.REQUIRED_FIELDS.forEach(field => {
        if (!config[field] || typeof config[field] !== 'string') {
            errors.push(`The "${field}" field is required and must be a string.`);
        }
    });

    // Optional fields
    if (config.theme && !CONSTANTS.SUPPORTED_THEMES.includes(config.theme)) {
        errors.push(
            `Invalid theme "${config.theme}". Supported themes: ${CONSTANTS.SUPPORTED_THEMES.join(', ')}.`
        );
    }

    if (config.links && !Array.isArray(config.links)) {
        errors.push('The "links" field must be an array if provided.');
    }

    if (config.footerLinks && !Array.isArray(config.footerLinks)) {
        errors.push('The "footerLinks" field must be an array if provided.');
    }

    if (config.share && typeof config.share !== 'object') {
        errors.push('The "share" field must be an object if provided.');
    }

    return errors;
}

function main() {
    try {
        const raw = fs.readFileSync(CONSTANTS.CONFIG_FILE, 'utf-8');
        const config = JSON.parse(raw);
        const errors = validateConfig(config);

        if (errors.length > 0) {
            console.error(`${CONSTANTS.MESSAGES.ERROR_PREFIX} Validation errors in config.json:`);
            errors.forEach(e => console.error('- ' + e));
            process.exit(1);
        } else {
            console.log(`${CONSTANTS.MESSAGES.SUCCESS_PREFIX} config.json is valid!`);
        }
    } catch (err) {
        console.error(`${CONSTANTS.MESSAGES.ERROR_PREFIX} Failed to read or validate config.json:`, err.message);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = main;
