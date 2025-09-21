const path = require('path');
const fs = require('fs');

module.exports = function(config) {
    // Try package directory first (for NPX), then current directory (for local dev)
    const packageDir = path.dirname(require.main.filename);
    const currentDir = process.cwd();
    
    const themePaths = [
        path.join(packageDir, '..', 'theme', config.theme, 'index.js'), // NPX package
        path.join(currentDir, 'theme', config.theme, 'index.js')         // Local development
    ];
    
    const themePath = themePaths.find(p => fs.existsSync(p));
    
    if (!themePath) {
        console.error(`Theme '${config.theme}' not found in any of these locations:`);
        themePaths.forEach(p => console.error(`  - ${p}`));
        process.exit(1);
    }

    return require(themePath);
}