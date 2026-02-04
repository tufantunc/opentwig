# OpenTwig Agent Guidelines

This file provides guidelines for agentic coding assistants working on the OpenTwig codebase.

## Build / Lint / Test Commands

```bash
# Run the CLI tool
npm start

# Run a single test file
npm test -- src/utils/parseArgs.test.js

# Run tests matching a pattern
npm test -- -t "should validate"

# Run tests once (CI mode)
npm run test:run

# Run tests with coverage
npm run test:coverage

# Start live preview mode
npm run live

# CLI options
npm start -- --help
npm start -- --init
```

## Project Overview

OpenTwig is a Node.js CLI tool that generates static "link in bio" pages. Uses CommonJS modules. Generates HTML, CSS, QR codes, and Open Graph images from JSON config.

**Core technologies:** Node.js (v14+), CommonJS, PostCSS, Sharp, Vitest

## Code Style Guidelines

### Module System
- **Use CommonJS exclusively** - no ES6 imports/exports
- Import: `const module = require('./path/to/module');`
- Export: `module.exports = functionName;` or `module.exports = { name, value };`
- Main entry point includes shebang: `#! /usr/bin/env node` and `'use strict';`

### File Organization
- **Single function per file** preferred in `src/utils/`
- Use descriptive filenames in camelCase (e.g., `buildPage.js`)
- Utilities in `src/utils/`, constants in `src/constants.js`
- Theme structure: `theme/{themeName}/index.js`, `style.css`, `components/`

### Naming Conventions
- **Variables/Functions**: camelCase (`const buildPage = async (config) => {}`)
- **Constants**: UPPER_SNAKE_CASE (`const OUTPUT_FILES = { HTML: 'index.html' }`)
- **Files**: camelCase for JS files (e.g., `loadConfig.js`)

### Code Patterns

**Function exports:**
```javascript
module.exports = async function(config) {
    // implementation
};
```

**Async/await with error handling:**
```javascript
const buildPage = async (config) => {
    try {
        const theme = loadTheme(config);
        return { html: await generateHTML(config, theme), theme };
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
- Prefix error messages with context from `src/constants.js`

### Security
- Always escape HTML output using `escapeHTML()` utility
- Always escape XML for OG images using `escapeXml()` utility
- Validate config fields in `configDefaults.js`
- Sanitize all user-generated content

### Documentation
- Add JSDoc comments for functions with @param and @returns
- Add module-level docstrings describing purpose

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

### File Paths
- Use `path.join()` for path construction
- Use `path.dirname(require.main.filename)` for package directory (NPX compatibility)
- Use `process.cwd()` for current working directory
- Check file existence with `fs.existsSync()` before operations

## Testing Guidelines

Tests use Vitest with ESM imports for test utilities and CommonJS require for modules:

```javascript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('functionName', () => {
    it('should do something', () => {
        const module = require('./module');
        expect(result).toBe(expected);
    });
});
```

## Key Files Reference

- `src/index.js` - Main CLI entry point
- `src/constants.js` - Centralized constants
- `src/utils/` - Utility functions (one function per file)
- `theme/` - Theme templates
- `src/live-ui/` - Live editor UI

## Output Files

All generated files go to `dist/`:
- `index.html` - Main page
- `style.css` - Processed CSS
- `avatar.{ext}` - User avatar
- `og-image.jpg` - Open Graph image
- `qr.svg` - QR code

## When Making Changes

1. **Always read the file first** - Use the Read tool before editing
2. **Follow existing patterns** - Mimic code style and structure
3. **Test thoroughly** - Run `npm run test:run` after changes
4. **Add JSDoc comments** - Document new functions
5. **Keep it simple** - One function per file, focused responsibilities
