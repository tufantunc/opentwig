const path = require('path');
const cwd = process.cwd();
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const minify = require('postcss-minify');

module.exports = async function(config) {
    // Check if the theme has a style.css file
    const cssPath = path.join(cwd, 'theme', config.theme, 'style.css');

    const hasCss = fs.existsSync(cssPath);
    if (!hasCss) {
        return null;
    }

    // Read and process CSS using promises to avoid callback scoping issues
    const cssInput = await fs.promises.readFile(cssPath, 'utf8');
    const cleaner  = postcss([ autoprefixer({ add: false }) ]);
    const processors = [ autoprefixer ];
    if (config.minify) {
        processors.push(minify);
    }
    const prefixer = postcss(processors);
    const result = await cleaner.process(cssInput, { from: cssPath }).then(function(cleaned) { return prefixer.process(cleaned.css, { from: cssPath }) });
    const css = result.css;

    return css;
}