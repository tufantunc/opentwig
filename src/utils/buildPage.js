const loadTheme = require('./loadTheme');
const generateHTML = require('./generateHTML');
const processCSS = require('./processCSS');
const generateOGImage = require('./generateOGImage');
const generateQR = require('./generateQR');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

/**
 * Processes the avatar image in memory.
 * - Resizes standard images into a buffer.
 * - Identifies SVGs and GIFs to be copied later.
 * @param {string} avatarPath - The path to the source avatar image.
 * @returns {Promise<Object|null>} - An object with the image data/path and final filename.
 */
async function processAvatar(avatarPath) {
    const ext = path.extname(avatarPath).toLowerCase();
    const resizableExtensions = ['.png', '.jpg', '.jpeg', '.webp'];
    const copyableExtensions = ['.svg', '.gif'];

    if (resizableExtensions.includes(ext)) {
        // For standard images, resize and return the data buffer and a new fixed filename
        const data = await sharp(avatarPath)
            .resize(96, 96, { fit: 'cover' })
            .png()
            .toBuffer();
        return { data: data, filename: 'avatar.png' };
    } else if (copyableExtensions.includes(ext)) {
        // For SVGs/GIFs, return the original path and filename so it can be copied later
        return { sourcePath: avatarPath, filename: path.basename(avatarPath) };
    }
    return null; // Return null if the extension is not supported
}

/**
 * Build all page components from configuration and return them as an object.
 * @param {Object} config - The configuration object.
 * @returns {Promise<Object>} - An object containing all generated asset data.
 */
const buildPage = async (config) => {
    try {
        const theme = loadTheme(config);
        const css = await processCSS(config);
        const ogImage = await generateOGImage(config);
        const qrImage = await generateQR(config.url);

        let avatarAsset = null;
        // Process avatar in memory if it exists
        if (config.avatar && config.avatar.path && fs.existsSync(config.avatar.path)) {
            avatarAsset = await processAvatar(config.avatar.path);
        }

        // Determine the correct avatar filename to pass to the HTML generator
        const avatarFilenameForHtml = avatarAsset ? avatarAsset.filename : null;
        const html = await generateHTML(config, theme, avatarFilenameForHtml);

        // Return a single object containing all generated assets
        return {
            html,
            css,
            ogImage,
            qrImage,
            avatarAsset // This object contains the data/path and filename
        };
    } catch (error) {
        throw new Error(`Failed to build page assets: ${error.message}`);
    }
};

module.exports = buildPage;
