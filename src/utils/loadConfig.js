const path = require('path');
const cwd = process.cwd();
const fs = require('fs');
const { applyDefaults } = require('./configDefaults');
const CONSTANTS = require('../constants');

module.exports = function() {
    const configPath = path.join(cwd, CONSTANTS.CONFIG_FILE);
    if (!fs.existsSync(configPath)) {
        console.error(`${CONSTANTS.MESSAGES.CONFIG_NOT_FOUND}: ${configPath}`);
        process.exit(1);
    }
    
    // Use fs.readFileSync instead of require to avoid caching issues
    const configContent = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configContent);
    
    // Apply default values to the loaded configuration
    return applyDefaults(config);
}