const fs = require('fs');
const path = require('path');
const { SAMPLE_CONFIG } = require('./configDefaults');
const CONSTANTS = require('../constants');

module.exports = function createSampleConfig() {
    const sampleConfig = SAMPLE_CONFIG;
    const configPath = path.join(process.cwd(), CONSTANTS.CONFIG_FILE);
    
    if (fs.existsSync(configPath)) {
        console.log(`${CONSTANTS.MESSAGES.WARNING_PREFIX}  ${CONSTANTS.MESSAGES.CONFIG_EXISTS}`);
        return;
    }

    try {
        fs.writeFileSync(configPath, JSON.stringify(sampleConfig, null, 4));
        console.log(`${CONSTANTS.MESSAGES.SUCCESS_PREFIX} ${CONSTANTS.MESSAGES.CONFIG_CREATED}`);
        console.log(`📝 ${CONSTANTS.MESSAGES.CONFIG_EDIT_INSTRUCTIONS}`);
    } catch (error) {
        console.error(`${CONSTANTS.MESSAGES.ERROR_PREFIX} creating config.json: ${error.message}`);
        process.exit(1);
    }
};
