const htmlMinifier = require('html-minifier');

module.exports = function(config, theme) {
    let html = theme(config);
    
    if (config.minify) {
        const minifiedHtml = htmlMinifier.minify(html, {
            removeComments: true,
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true
        });
        html = minifiedHtml;
    }
    
    // Add created by comment after minification
    const createdByComment = '<!-- Created by OpenTwig 🌿 - https://github.com/tufantunc/opentwig -->';
    html = createdByComment + '\n' + html;
    
    return html;
}