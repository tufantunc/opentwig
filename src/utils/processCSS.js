const path = require('path');
const cwd = process.cwd();
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const minify = require('postcss-minify');

module.exports = async function(config) {
    // Try package directory first (for NPX), then current directory (for local dev)
    const packageDir = path.dirname(require.main.filename);
    const currentDir = process.cwd();
    
    const cssPaths = [
        path.join(packageDir, '..', 'theme', config.theme, 'style.css'), // NPX package
        path.join(currentDir, 'theme', config.theme, 'style.css')         // Local development
    ];
    
    const cssPath = cssPaths.find(p => fs.existsSync(p));
    
    if (!cssPath) {
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