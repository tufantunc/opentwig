/**
 * Leaf favicon SVG for OpenTwig
 * Used across all themes
 */

const LEAF_FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`;

/**
 * Get favicon as data URI for embedding in HTML
 * @returns {string} Data URI for favicon
 */
function getFaviconDataURI() {
    const base64 = Buffer.from(LEAF_FAVICON_SVG).toString('base64');
    return `data:image/svg+xml;base64,${base64}`;
}

module.exports = {
    LEAF_FAVICON_SVG,
    getFaviconDataURI
};