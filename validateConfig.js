const fs = require('fs');

function validateConfig(config) {
    const errors = [];

   
    if (!config.name || typeof config.name !== 'string') {
        errors.push('The "name" field is required and must be a string.');
    }
    if (!config.version || typeof config.version !== 'string') {
        errors.push('The "version" field is required and must be a string.');
    }



    return errors;
}

function main() {
    try {
        const raw = fs.readFileSync('config.json', 'utf-8');
        const config = JSON.parse(raw);
        const errors = validateConfig(config);

        if (errors.length > 0) {
            console.error('Validation errors in config.json:');
            errors.forEach(e => console.error('- ' + e));
            process.exit(1);
        } else {
            console.log('config.json is valid!');
        }
    } catch (err) {
        console.error('Failed to read or validate config.json:', err.message);
        process.exit(1);
    }
}

main();
