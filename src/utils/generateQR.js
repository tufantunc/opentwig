const QRCode = require('qrcode');

module.exports = async function(url) {
    const svgString = await QRCode.toString(url, { type: 'svg' });
    
    // Remove the white background fill from the SVG
    const svgWithoutBackground = svgString.replace(/fill="#ffffff"/g, 'fill="transparent"');
    
    return svgWithoutBackground;
}