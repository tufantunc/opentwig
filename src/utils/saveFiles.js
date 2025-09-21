const path = require('path');
const cwd = process.cwd();
const fs = require('fs');

module.exports = function(html, css, avatar,ogImage, qrImage) {
    // Ensure output directory exists
    const distDir = path.join(cwd, 'dist');
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
    }

    // Write the generated HTML
    fs.writeFileSync(path.join(distDir, 'index.html'), html);

    // Write the generated CSS
    if (css) {
        fs.writeFileSync(path.join(distDir, 'style.css'), css);
    }

    if (avatar != null && avatar.path) {
        fs.copyFileSync(path.join(cwd, avatar.path), path.join(distDir, 'avatar.png'));
    }

    // Write the generated OG Image
    fs.writeFileSync(path.join(distDir, 'og-image.jpg'), ogImage);

    // Write the generated QR Image
    fs.writeFileSync(path.join(distDir, 'qr.svg'), qrImage);
}