#! /usr/bin/env node
'use strict';

const loadConfig = require('./utils/loadConfig');
const saveFiles = require('./utils/saveFiles');
const parseArgs = require('./utils/parseArgs');
const buildPage = require('./utils/buildPage');
const CONSTANTS = require('./constants');
const startLiveServer = require('./utils/startLiveServer');

/**
 * Main application function with proper error handling
 */
const main = async () => {
    try {
        // Parse CLI arguments first
        const args = parseArgs();
        
        // Check if live mode is requested
        if (args.mode === 'live') {
            await startLiveServer(args.port);
            return;
        }
        
        // Load and validate configuration
        const config = loadConfig();
        
        // Build all page components
        const { html, css, ogImage, qrImage } = await buildPage(config);
        
        // Save all generated files
        saveFiles(html, css, config.avatar, ogImage, qrImage);
        
        // Success message
        console.log(CONSTANTS.MESSAGES.PAGE_GENERATED);
        console.log(CONSTANTS.MESSAGES.SHOWCASE_REMINDER);
        
    } catch (error) {
        console.error(`${CONSTANTS.MESSAGES.ERROR_PREFIX} ${error.message}`);
        process.exit(1);
    }
};

main();
