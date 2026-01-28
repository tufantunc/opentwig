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
npm start -- --live            # Start live preview with config editor

# Test Open Graph image generation
npm run test-og

# Run automated tests (Vitest)
npm test                    # Run tests in watch mode
npm run test:run            # Run tests once
npm run test:coverage       # Run tests with coverage report

# Start live preview mode
npm run live
```

## Project Overview

OpenTwig is a Node.js CLI tool that generates static "link in bio" pages. It uses CommonJS modules and generates HTML, CSS, QR codes, and Open Graph images from a JSON configuration file.

**Core technologies:** Node.js (v14+), CommonJS, PostCSS, Sharp, qrcode, html-minifier-terser, Express, WebSocket, Chokidar

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
- `src/constants.js` - Centralized constants (including LIVE_MODE settings)
- `src/utils/loadConfig.js` - Load and validate config.json
- `src/utils/buildPage.js` - Orchestrate page generation
- `src/utils/generateHTML.js` - HTML generation with minification
- `src/utils/processCSS.js` - CSS processing with PostCSS
- `src/utils/generateOGImage.js` - Open Graph image generation
- `src/utils/generateQR.js` - QR code generation
- `src/utils/saveFiles.js` - Save all output files to dist/
- `src/utils/configDefaults.js` - Default values and validation
- `src/utils/startLiveServer.js` - Live preview server (Express + WebSocket)
- `src/utils/websocketServer.js` - WebSocket connection management
- `src/utils/setupWatcher.js` - Config file change watcher
- `src/live-ui/index.html` - Live editor main page
- `src/live-ui/styles.css` - Live editor styles
- `src/live-ui/preview.js` - Preview iframe management
- `src/live-ui/editor.js` - Config editor logic
- `src/live-ui/sidebar.js` - Sidebar components and form rendering
- `theme/*/index.js` - Theme-specific HTML templates
- `validateConfig.js` - Config validation utility

## Output Files

All generated files go to `dist/` directory:
- `index.html` - Main page
- `style.css` - Processed CSS
- `avatar.{ext}` - User avatar (if configured)
- `og-image.jpg` - Open Graph preview image
- `qr.svg` - QR code

## Live Mode Architecture

### Overview
Live mode (`--live` flag) provides an interactive development environment with real-time preview and configuration editing.

### Components

**Backend (Node.js):**
- `startLiveServer.js` - Express server with WebSocket support
  - HTTP endpoints: `/api/config`, `/api/themes`, `/api/avatar`, `/api/validate`
  - Static file serving for `dist/` and `src/live-ui/`
  - File upload handling (multer)
- `websocketServer.js` - WebSocket server for real-time updates
  - Broadcast events: `reload`, `config-update`, `theme-change`
  - Client connection management
- `setupWatcher.js` - Config file watcher
  - Chokidar-based file watching
  - Debounced change detection
  - Auto rebuild on config changes

**Frontend (Vanilla JS):**
- `index.html` - Main editor page (Preview on left, Sidebar on right)
- `preview.js` - Preview iframe management and WebSocket client
- `editor.js` - Config API communication and auto-save
- `sidebar.js` - Dynamic form generation and event handling

### Features

**Editor Features:**
- Theme selection (default, dark, minimal, colorful)
- Profile editing (URL, name, bio, avatar upload)
- Links management (add, edit, delete, reorder)
- Footer links management (URL or modal content)
- Share settings configuration
- Advanced settings (minify CSS)
- Auto-save with debounce (500ms)
- Export config as JSON

**Real-time Updates:**
- Config changes → WebSocket broadcast → Preview reload
- File watcher → Rebuild → WebSocket broadcast
- Avatar upload → Save → Rebuild → Preview update

### Layout

```
┌─────────────────────────────────────────────┐
│  Header: OpenTwig Live Editor  [Save][Export] │
├──────────────────────────────┬──────────────┤
│                              │              │
│      Preview Iframe          │   Sidebar    │
│  (dist/index.html embedded) │              │
│                              │  - Theme     │
│                              │  - Profile   │
│                              │  - Links     │
│                              │  - Footer    │
│                              │  - Share     │
│                              │  - Advanced  │
│                              │              │
├──────────────────────────────┴──────────────┤
│  Status: Connected | Auto-save: ON         │
└─────────────────────────────────────────────┘
```

### WebSocket Events

**Server → Client:**
```json
{
  "type": "reload"
}

{
  "type": "config-update",
  "config": { ... }
}

{
  "type": "theme-change",
  "theme": "dark"
}
```

**API Endpoints:**

**GET /api/config**
- Returns current config from config.json
- Creates sample config if not exists

**POST /api/config**
- Accepts config JSON
- Validates and saves to config.json
- Triggers rebuild and WebSocket broadcast

**POST /api/avatar**
- Accepts multipart form data with avatar file
- Saves to working directory
- Returns file path

**GET /api/themes**
- Returns array of available theme names

**GET /api/validate?config=...**
- Validates config JSON
- Returns errors and warnings

**GET /api/status**
- Returns server status (connected clients, config path, etc.)

## Testing Approach

The project uses Vitest for automated testing:
1. Run `npm test` to run tests in watch mode
2. Run `npm run test:run` to run tests once
3. Run `npm run test:coverage` to run tests with coverage report

For manual testing:
1. Create a config.json using `npm start -- --init`
2. Run `npm start` to generate the page
3. Verify `dist/` output files are generated correctly
4. Test all themes by modifying config.json
5. Test edge cases: missing avatar, empty config, long text
6. Verify HTML is valid (open in browser)
7. Check CSS renders correctly
8. Confirm images are processed properly

## When Making Changes

1. **Always read the file first** - Use the Read tool before editing
2. **Follow existing patterns** - Mimic code style and structure
3. **Test thoroughly** - Manual testing after changes
4. **Add JSDoc comments** - Document new functions
5. **Update constants** if needed - Add new constants to `src/constants.js`
6. **Keep it simple** - One function per file, focused responsibilities
