const sharp = require('sharp');
const readImageAsBase64 = require('./readImageAsBase64');

module.exports = async function({name, content, avatar}) {
    const avatarInfo = avatar && avatar.path ? readImageAsBase64(avatar.path) : { isSvg: false, content: '' };

    // If avatar is SVG, we'll inline the markup and use a clipPath to make it circular.
    // For raster images, keep using a data URI in an <image> element.
    let avatarElement = '';
    let avatarDefs = '';

    if (avatarInfo && avatarInfo.isSvg && avatarInfo.content) {
        // Ensure the inlined SVG has a root <svg> — if not, wrap it.
        let inlined = avatarInfo.content.trim();
        if (!/^<svg[\s>]/i.test(inlined)) {
            inlined = `<svg xmlns=\"http://www.w3.org/2000/svg\">${inlined}</svg>`;
        }

        // Give the inlined SVG an id so we can reference it with <use>
        // Remove any existing id attributes to avoid collisions
        inlined = inlined.replace(/\s(id=\"[^\"]*\")/ig, '');
        const symbolId = 'avatar-svg';

        // Put the avatar SVG inside a <g> with an id inside <defs>
        avatarDefs = `<defs><clipPath id="avatar-clip"><circle cx="48" cy="48" r="48"/></clipPath><g id="${symbolId}">${inlined}</g></defs>`;

        // Use a foreignObject to render the SVG content into a 96x96 box and clip it
        // Some renderers don't allow referencing inline <svg> via <use> with complex markup, so use <g> directly
        avatarElement = `<g transform="translate(504,267)"><svg x="0" y="0" width="96" height="96" viewBox="0 0 96 96" preserveAspectRatio="xMidYMid slice" clip-path="url(#avatar-clip)">${inlined}</svg></g>`;

    } else if (avatarInfo && avatarInfo.content) {
        // Raster image data URI
        avatarElement = `<image href="${avatarInfo.content}" x="504" y="267" width="96" height="96" clip-path="circle(48px at 48px 48px)"/>`;
    }

    const svg = `
        <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <style>
                    .name-text { 
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        font-weight: 700; 
                        font-size: 22px; 
                        fill: #fdfdfd; 
                    }
                    .content-text { 
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        font-size: 14px; 
                        fill: #fdfdfd; 
                    }
                </style>
            </defs>
            ${avatarDefs}

            <!-- Background -->
            <rect width="1200" height="630" fill="#2d2d2d"/>

            <!-- Avatar circle background -->
            <circle cx="552" cy="315" r="48" fill="#dedede"/>

            <!-- Avatar image (if provided) -->
            ${avatarElement}

            <!-- Text content -->
            <text x="660" y="300" class="name-text">${escapeXml(name)}</text>
            <text x="660" y="325" class="content-text">${escapeXml(content)}</text>
        </svg>
    `;

    // Convert SVG to JPG
    const jpgBuffer = await sharp(Buffer.from(svg))
        .jpeg({ quality: 90 })
        .toBuffer();
    return jpgBuffer;
}

// Minimal XML escaping for text nodes
function escapeXml(unsafe) {
    if (!unsafe) return '';
    return String(unsafe)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}