const showHelp = require('./showHelp');
const createSampleConfig = require('./createSampleConfig');
const CONSTANTS = require('../constants');

module.exports = function parseArgs() {
    const args = process.argv.slice(2);
    const parsedArgs = {
        mode: 'build',
        port: null
    };

    let i = 0;
    while (i < args.length) {
        const arg = args[i];
        
        if (CONSTANTS.CLI_OPTIONS.HELP.includes(arg)) {
            showHelp();
            process.exit(0);
        } else if (CONSTANTS.CLI_OPTIONS.INIT.includes(arg)) {
            createSampleConfig();
            process.exit(0);
        } else if (CONSTANTS.CLI_OPTIONS.VALIDATE.includes(arg)) {
            require('../../validateConfig.js')();
            process.exit(0);
        } else if (CONSTANTS.CLI_OPTIONS.LIVE.includes(arg)) {
            parsedArgs.mode = 'live';
        } else if (CONSTANTS.CLI_OPTIONS.PORT.includes(arg)) {
            if (i + 1 < args.length) {
                const portValue = args[i + 1];
                const portNum = parseInt(portValue);
                if (!isNaN(portNum) && portNum > 0 && portNum < 65536) {
                    parsedArgs.port = portNum;
                } else {
                    console.error(`${CONSTANTS.MESSAGES.ERROR_PREFIX} Invalid port number: ${portValue}. Please use a port between 1 and 65535.`);
                    process.exit(1);
                }
                i += 2;
                continue;
            } else {
                console.error(`${CONSTANTS.MESSAGES.ERROR_PREFIX} Port option requires a value. Usage: --port <PORT> or -p <PORT>`);
                process.exit(1);
            }
        } else {
            console.error(`${CONSTANTS.MESSAGES.UNKNOWN_OPTION} ${arg}`);
            console.error(CONSTANTS.MESSAGES.USE_HELP);
            process.exit(1);
        }
        i++;
    }

    return parsedArgs;
};
