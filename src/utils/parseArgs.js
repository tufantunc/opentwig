const showHelp = require('./showHelp');
const createSampleConfig = require('./createSampleConfig');
const CONSTANTS = require('../constants');

module.exports = function parseArgs() {
    const args = process.argv.slice(2);
    
    for (const arg of args) {
        if (CONSTANTS.CLI_OPTIONS.HELP.includes(arg)) {
            showHelp();
            process.exit(0);
        } else if (CONSTANTS.CLI_OPTIONS.INIT.includes(arg)) {
            createSampleConfig();
            process.exit(0);
        } else if (CONSTANTS.CLI_OPTIONS.VALIDATE.includes(arg)) {
            require('../../validateConfig.js')();
            process.exit(0);
        } else {
            console.error(`${CONSTANTS.MESSAGES.UNKNOWN_OPTION} ${arg}`);
            console.error(CONSTANTS.MESSAGES.USE_HELP);
            process.exit(1);
        }
    }
};
