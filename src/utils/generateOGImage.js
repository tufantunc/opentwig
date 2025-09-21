const sharp = require('sharp');
const readImageAsBase64 = require('./readImageAsBase64');

module.exports = async function({name, content, avatar}) {
    const avatarBase64 = readImageAsBase64(avatar.path);
    // Create SVG with the same dimensions and styling as the original HTML
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
            
            <!-- Background -->
            <rect width="1200" height="630" fill="#2d2d2d"/>
            
            <!-- Avatar circle background -->
            <circle cx="552" cy="315" r="48" fill="#dedede"/>
            
            <!-- Avatar image (if provided) -->
            ${avatarBase64 ? `<image href="${avatarBase64}" x="504" y="267" width="96" height="96" clip-path="circle(48px at 48px 48px)"/>` : ''}
            
            <!-- Text content -->
            <text x="660" y="300" class="name-text">${name}</text>
            <text x="660" y="325" class="content-text">${content}</text>
        </svg>
    `;
    
    // Convert SVG to JPG
    const jpgBuffer = await sharp(Buffer.from(svg))
        .jpeg({ quality: 90 })
        .toBuffer();
    return jpgBuffer;
}