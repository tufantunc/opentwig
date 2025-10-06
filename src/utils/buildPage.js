/**
 * Build page components
 * Centralizes the page building logic for better organization
 */

const loadTheme = require('./loadTheme');
const generateHTML = require('./generateHTML');
const processCSS = require('./processCSS');
const generateOGImage = require('./generateOGImage');
const generateQR = require('./generateQR');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

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
        
        // Process avatar
        if (config.avatar && config.avatar.path) {
            await processAvatar(config.avatar.path, config.outputDir);
        }

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

async function processAvatar(avatarPath, outputDir) {
  const ext = path.extname(avatarPath).toLowerCase();
  const allowed = ['.png', '.jpg', '.jpeg', '.webp'];
  const skipResize = ['.svg', '.gif'];
  const outputAvatar = path.join(outputDir, 'avatar.png');

  if (allowed.includes(ext)) {
    await sharp(avatarPath)
      .resize(96, 96, { fit: 'cover' })
      .png()
      .toFile(outputAvatar);
  } else if (skipResize.includes(ext)) {
    fs.copyFileSync(avatarPath, path.join(outputDir, path.basename(avatarPath)));
  }
}

module.exports = buildPage;
