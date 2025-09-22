const htmlMinifier = require('html-minifier-terser');

module.exports = async function(config, theme) {
    let html = theme(config);
    
    if (config.minify) {
        const minifiedHtml = await htmlMinifier.minify(html, {
            removeComments: true,
            collapseWhitespace: true,
            minifyCSS: true,
        });
        html = minifiedHtml;
    }
    
    // Add created by comment after minification
    const createdByComment = '<!-- Created by OpenTwig 🌿 - https://github.com/tufantunc/opentwig -->';
    html = createdByComment + '\n' + html;
    
    return html;
}