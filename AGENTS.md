# OpenTwig Agent Guidelines

This file provides guidelines for agentic coding assistants working on the OpenTwig codebase.

## Build / Lint / Test Commands

```bash
# Run the CLI tool
npm start
# or: node src/index.js

# CLI options
npm start -- --help           # Show help information
npm start -- --init           # Create sample config.json
npm start -- --validate-config  # Validate config.json

# Test Open Graph image generation
npm run test-og

# Note: This project does not have automated tests, linting, or type checking configured.
# Manual testing involves creating a config.json and running npm start.
```

## Project Overview

OpenTwig is a Node.js CLI tool that generates static "link in bio" pages. It uses CommonJS modules and generates HTML, CSS, QR codes, and Open Graph images from a JSON configuration file.

**Core technologies:** Node.js (v14+), CommonJS, PostCSS, Sharp, qrcode, html-minifier-terser

## Code Style Guidelines

### Module System
- **Use CommonJS exclusively** - no ES6 imports/exports
- Import: `const moduleName = require('./path/to/module');`
- Export: `module.exports = functionName;` or `module.exports = { name, value };`
- Main entry point includes shebang: `#! /usr/bin/env node`

### File Organization
- **Single function per file** preferred in `src/utils/`
- Use descriptive filenames in camelCase (e.g., `buildPage.js`, `generateQR.js`)
- Theme structure: `theme/{themeName}/index.js`, `style.css`, `components/`
- Utilities in `src/utils/`, constants in `src/constants.js`

### Naming Conventions
- **Variables/Functions**: camelCase (`const buildPage = async (config) => {}`)
- **Constants**: UPPER_SNAKE_CASE (`const OUTPUT_FILES = { HTML: 'index.html' }`)
- **Files**: camelCase for JS files (e.g., `loadConfig.js`)
- **Destructured params**: Use descriptive names (`function({title, url, name})`)

### Code Patterns

**Function exports:**
```javascript
// Pattern: Immediately export a function
module.exports = async function(config) {
    // implementation
};
```

**Async/await:**
```javascript
const buildPage = async (config) => {
    try {
        const theme = loadTheme(config);
        const html = await generateHTML(config, theme);
        return { html, theme };
    } catch (error) {
        throw new Error(`Failed to build page: ${error.message}`);
    }
};
```

**Template literals for HTML:**
```javascript
module.exports = function({title, name}) {
    return `<!DOCTYPE html>
        <html>
            <head><title>${escapeHTML(title)}</title></head>
            <body><h1>${escapeHTML(name)}</h1></body>
        </html>`;
};
```

### Error Handling
- Always use try-catch for async functions
- Log errors with `console.error()`
- Use `process.exit(1)` on fatal errors, `process.exit(0)` on success
- Prefix error messages with context (e.g., `ERROR_PREFIX`)
- Centralize error messages in `src/constants.js`

```javascript
try {
    const result = await someAsyncOperation();
    return result;
} catch (error) {
    throw new Error(`Operation failed: ${error.message}`);
}
```

### Security
- Always escape HTML output using `escapeHTML()` utility
- Always escape XML for OG images using `escapeXml()`
- Validate config fields in `configDefaults.js`
- Sanitize all user-generated content

### Documentation
- Add JSDoc comments for functions with @param and @returns
- Add module-level docstrings describing purpose
- Comment non-obvious logic
- Example:
```javascript
/**
 * Load theme configuration from theme directory
 * @param {Object} config - User configuration object
 * @returns {Function} Theme template function
 */
module.exports = function(config) { ... };
```

### Formatting
- **JavaScript**: 4-space indentation
- **CSS**: 2-space indentation
- Use meaningful variable names
- Keep functions focused and small
- Prefer template literals over string concatenation
- No trailing whitespace

### Constants
Centralize all constants in `src/constants.js`:
- File paths and names
- CLI options
- Messages (ERROR_PREFIX, SUCCESS_PREFIX, etc.)
- Default values
- Configuration validation requirements

### Component Pattern (Themes)
Theme components in `theme/*/components/` export functions:
```javascript
module.exports = function({link}) {
    return `<a href="${link.url}" target="_blank" rel="noopener">
        <span>${link.title}</span>
    </a>`;
};
```

### File Paths
- Use `path.join()` for path construction
- Use `path.dirname(require.main.filename)` for package directory (NPX compatibility)
- Use `process.cwd()` for current working directory
- Check file existence with `fs.existsSync()` before operations

## Key Files Reference

- `src/index.js` - Main CLI entry point with argument parsing
- `src/constants.js` - Centralized constants
- `src/utils/loadConfig.js` - Load and validate config.json
- `src/utils/buildPage.js` - Orchestrate page generation
- `src/utils/generateHTML.js` - HTML generation with minification
- `src/utils/processCSS.js` - CSS processing with PostCSS
- `src/utils/generateOGImage.js` - Open Graph image generation
- `src/utils/generateQR.js` - QR code generation
- `src/utils/saveFiles.js` - Save all output files to dist/
- `src/utils/configDefaults.js` - Default values and validation
- `theme/*/index.js` - Theme-specific HTML templates
- `validateConfig.js` - Config validation utility

## Output Files

All generated files go to `dist/` directory:
- `index.html` - Main page
- `style.css` - Processed CSS
- `avatar.{ext}` - User avatar (if configured)
- `og-image.jpg` - Open Graph preview image
- `qr.svg` - QR code

## Testing Approach

Since there's no automated test suite:
1. Manual test by running `npm start -- --init` and `npm start`
2. Verify `dist/` output files are generated correctly
3. Test all themes by modifying config.json
4. Test edge cases: missing avatar, empty config, long text
5. Verify HTML is valid (open in browser)
6. Check CSS renders correctly
7. Confirm images are processed properly

## When Making Changes

1. **Always read the file first** - Use the Read tool before editing
2. **Follow existing patterns** - Mimic code style and structure
3. **Test thoroughly** - Manual testing after changes
4. **Add JSDoc comments** - Document new functions
5. **Update constants** if needed - Add new constants to `src/constants.js`
6. **Keep it simple** - One function per file, focused responsibilities
