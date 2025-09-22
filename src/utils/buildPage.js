/**
 * Build page components
 * Centralizes the page building logic for better organization
 */

const loadTheme = require('./loadTheme');
const generateHTML = require('./generateHTML');
const processCSS = require('./processCSS');
const generateOGImage = require('./generateOGImage');
const generateQR = require('./generateQR');

/**
 * Build all page components from configuration
 * @param {Object} config - The configuration object
 * @returns {Promise<Object>} - Object containing all generated components
 */
const buildPage = async (config) => {
    try {
        // Load theme
        const theme = loadTheme(config);
        
        // Generate HTML
        const html = await generateHTML(config, theme);
        
        // Process CSS (async)
        const css = await processCSS(config);
        
        // Generate OG Image (async)
        const ogImage = await generateOGImage(config);
        
        // Generate QR Code (async)
        const qrImage = await generateQR(config.url);
        
        return {
            html,
            css,
            ogImage,
            qrImage,
            theme
        };
    } catch (error) {
        throw new Error(`Failed to build page: ${error.message}`);
    }
};

module.exports = buildPage;
