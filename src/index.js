#! /usr/bin/env node
'use strict';

const loadConfig = require('./utils/loadConfig');
const saveFiles = require('./utils/saveFiles');
const parseArgs = require('./utils/parseArgs');
const buildPage = require('./utils/buildPage');
const CONSTANTS = require('./constants');

/**
 * Main application function with proper error handling
 */
const main = async () => {
    try {
        // Parse CLI arguments first
        parseArgs();
        
        // Load and validate configuration
        const config = loadConfig();
        
        // Build all page components
        const { html, css, ogImage, qrImage } = await buildPage(config);
        
        // Save all generated files
        saveFiles(html, css, config.avatar, ogImage, qrImage);
        
        // Success message
        console.log(CONSTANTS.MESSAGES.PAGE_GENERATED);
        
    } catch (error) {
        console.error(`${CONSTANTS.MESSAGES.ERROR_PREFIX} ${error.message}`);
        process.exit(1);
    }
};

main();
