# Utility Functions API Reference

This document provides detailed API documentation for all utility functions in OpenTwig.

## Table of Contents

- [Build Pipeline](#build-pipeline)
- [Configuration](#configuration)
- [Theme Management](#theme-management)
- [Content Generation](#content-generation)
- [File Operations](#file-operations)
- [Utilities](#utilities)
- [CLI Utilities](#cli-utilities)

---

## Build Pipeline

### buildPage()

**Location:** `src/utils/buildPage.js`

Orchestrates the entire page building process by calling all generation functions.

```javascript
const buildPage = async (config) => { ... }
```

**Parameters:**
- `config` (Object) - The configuration object

**Returns:** `Promise<Object>` - Object containing:
- `html` (String) - Generated HTML
- `css` (String) - Processed CSS (or null if not found)
- `ogImage` (Buffer) - Open Graph image buffer (JPG)
- `qrImage` (String) - QR code SVG string
- `theme` (Function) - Theme template function

**Throws:** `Error` - If any step in the build process fails

**Example:**
```javascript
const config = loadConfig();
const { html, css, ogImage, qrImage, theme } = await buildPage(config);
```

---

## Configuration

### loadConfig()

**Location:** `src/utils/loadConfig.js`

Loads the configuration file from the current working directory and applies default values.

```javascript
const loadConfig = () => { ... }
```

**Parameters:** None

**Returns:** `Object` - Configuration object with defaults applied

**Exits:** Process exits with code 1 if `config.json` is not found

**Example:**
```javascript
const config = loadConfig();
console.log(config.theme); // 'default'
console.log(config.name);  // 'Your Name'
```

### applyDefaults()

**Location:** `src/utils/configDefaults.js`

Applies default values to a configuration object. Avatar has special handling with no defaults.

```javascript
const applyDefaults = (config) => { ... }
```

**Parameters:**
- `config` (Object) - The configuration object to apply defaults to

**Returns:** `Object` - Configuration with defaults applied

**Example:**
```javascript
const partialConfig = { theme: 'dark', name: 'John Doe' };
const fullConfig = applyDefaults(partialConfig);
// fullConfig now includes all default values for missing fields
```

### DEFAULT_CONFIG

**Location:** `src/utils/configDefaults.js`

Object containing all default configuration values.

```javascript
const DEFAULT_CONFIG = {
    theme: 'default',
    title: 'OpenTwig 🌿',
    minify: true,
    name: 'Your Name',
    content: 'Hello World! Here is my bio.',
    url: 'https://links.yourwebsite.com',
    links: [],
    footerLinks: [],
    share: {
        title: 'Your Name - opentwig 🌿',
        url: 'https://links.yourwebsite.com',
        text: 'Share'
    }
};
```

### SAMPLE_CONFIG

**Location:** `src/utils/configDefaults.js`

Complete sample configuration used by the `--init` command.

```javascript
const SAMPLE_CONFIG = {
    theme: 'default',
    url: 'https://links.yourwebsite.com',
    title: 'Your Name - opentwig 🌿',
    name: 'Your Name',
    content: 'Hello World! Here is my bio.',
    minify: true,
    avatar: {
        path: 'avatar.png'
    },
    links: [...],
    footerLinks: [...],
    share: { ... }
};
```

---

## Theme Management

### loadTheme()

**Location:** `src/utils/loadTheme.js`

Loads the theme template function from the theme directory. Handles both NPX package and local development paths.

```javascript
const loadTheme = (config) => { ... }
```

**Parameters:**
- `config` (Object) - Configuration object containing `theme` property

**Returns:** `Function` - Theme template function that accepts `config` and returns HTML string

**Exits:** Process exits with code 1 if theme is not found

**Example:**
```javascript
const theme = loadTheme({ theme: 'dark' });
const html = theme(config);
```

---

## Content Generation

### generateHTML()

**Location:** `src/utils/generateHTML.js`

Generates HTML by calling the theme template function and optionally minifies the output.

```javascript
const generateHTML = async (config, theme) => { ... }
```

**Parameters:**
- `config` (Object) - Configuration object
- `theme` (Function) - Theme template function

**Returns:** `Promise<String>` - Generated HTML string

**Example:**
```javascript
const html = await generateHTML(config, theme);
console.log(html); // '<!DOCTYPE html>...'
```

### generateOGImage()

**Location:** `src/utils/generateOGImage.js`

Generates an Open Graph preview image (1200x630 JPG) with avatar and text content.

```javascript
const generateOGImage = async ({ name, content, avatar }) => { ... }
```

**Parameters:**
- `name` (String) - Display name
- `content` (String) - Bio/description text
- `avatar` (Object, optional) - Avatar configuration with `path` property

**Returns:** `Promise<Buffer>` - JPG image buffer

**Example:**
```javascript
const ogImage = await generateOGImage({
    name: 'John Doe',
    content: 'Developer & Creator',
    avatar: { path: './avatar.jpg' }
});
```

**Notes:**
- Supports SVG and raster avatar images (PNG, JPG, JPEG, WebP)
- Automatically resizes and positions avatar in a circular clip
- Uses dark gray background (#2d2d2d) with light text
- Quality set to 90% for JPG compression

### generateQR()

**Location:** `src/utils/generateQR.js`

Generates a QR code SVG for the given URL. Removes white background for transparency.

```javascript
const generateQR = async (url) => { ... }
```

**Parameters:**
- `url` (String) - URL to encode in QR code

**Returns:** `Promise<String>` - QR code SVG string

**Example:**
```javascript
const qrCode = await generateQR('https://example.com');
console.log(qrCode); // '<svg>...</svg>'
```

### processCSS()

**Location:** `src/utils/processCSS.js`

Processes theme CSS with PostCSS, autoprefixer, and optional minification.

```javascript
const processCSS = async (config) => { ... }
```

**Parameters:**
- `config` (Object) - Configuration object containing `theme` and `minify` properties

**Returns:** `Promise<String|null>` - Processed CSS string, or null if CSS file not found

**Example:**
```javascript
const css = await processCSS({ theme: 'dark', minify: true });
console.log(css); // 'body{background:#1a1a1a;color:#fff}...'
```

**Notes:**
- Checks both NPX package path and local development path
- Uses autoprefixer to add vendor prefixes
- Minifies CSS if `config.minify` is true
- Returns null silently if CSS file doesn't exist

---

## File Operations

### saveFiles()

**Location:** `src/utils/saveFiles.js`

Saves all generated files to the `dist/` directory.

```javascript
const saveFiles = (html, css, avatar, ogImage, qrImage) => { ... }
```

**Parameters:**
- `html` (String) - Generated HTML content
- `css` (String, optional) - Processed CSS content
- `avatar` (Object, optional) - Avatar configuration with `path` property
- `ogImage` (Buffer) - Open Graph image buffer
- `qrImage` (String) - QR code SVG string

**Returns:** `undefined`

**Creates:**
- `dist/` directory if it doesn't exist
- `dist/index.html` - Main HTML page
- `dist/style.css` - Processed CSS (if provided)
- `dist/avatar.{ext}` - Avatar image with original extension (if configured and file exists)
- `dist/og-image.jpg` - Open Graph image
- `dist/qr.svg` - QR code

**Example:**
```javascript
saveFiles(
    html,           // Generated HTML
    css,            // Processed CSS
    config.avatar,  // Avatar config
    ogImage,        // OG image buffer
    qrImage         // QR code SVG
);
```

### readImageAsBase64()

**Location:** `src/utils/readImageAsBase64.js`

Reads an image file and returns it as base64-encoded string (for raster images) or raw SVG markup (for SVG files).

```javascript
const readImageAsBase64 = (imagePath) => { ... }
```

**Parameters:**
- `imagePath` (String) - Path to image file

**Returns:** `Object` - Object with properties:
- `isSvg` (Boolean) - True if file is SVG, false otherwise
- `content` (String) - Base64 data URI (raster) or raw SVG markup (SVG)

**Throws:** `Error` - If file doesn't exist, isn't readable, or has unsupported format

**Example:**
```javascript
const avatarInfo = readImageAsBase64('./avatar.jpg');
console.log(avatarInfo.isSvg);    // false
console.log(avatarInfo.content);  // 'data:image/jpeg;base64,/9j/4AAQSkZJRg...'

const svgInfo = readImageAsBase64('./logo.svg');
console.log(svgInfo.isSvg);       // true
console.log(svgInfo.content);    // '<svg xmlns="http://www.w3.org/2000/svg">...'
```

**Supported formats:** PNG, JPG, JPEG, GIF, WebP, SVG

---

## Utilities

### escapeHTML()

**Location:** `src/utils/escapeHTML.js`

Escapes HTML special characters to prevent XSS attacks.

```javascript
const escapeHTML = (str) => { ... }
```

**Parameters:**
- `str` (String) - String to escape

**Returns:** `String` - Escaped string

**Example:**
```javascript
const safe = escapeHTML('<script>alert("xss")</script>');
console.log(safe); // '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
```

**Escaped characters:**
- `&` → `&amp;`
- `<` → `&lt;`
- `>` → `&gt;`
- `"` → `&quot;`
- `'` → `&#39;`

---

## CLI Utilities

### parseArgs()

**Location:** `src/utils/parseArgs.js`

Parses command-line arguments and returns the action to perform.

```javascript
const parseArgs = () => { ... }
```

**Parameters:** None (uses `process.argv`)

**Returns:** `Object` - Object with properties:
- `action` (String) - One of `'help'`, `'init'`, `'validate-config'`, or `'build'`

**Example:**
```javascript
const args = parseArgs();
if (args.action === 'help') {
    showHelp();
}
```

**Supported arguments:**
- `--help` or `-h`: Show help
- `--init` or `-i`: Create sample config
- `--validate-config` or `-v`: Validate configuration
- No arguments: Build page

### showHelp()

**Location:** `src/utils/showHelp.js`

Displays help information about OpenTwig usage.

```javascript
const showHelp = () => { ... }
```

**Parameters:** None

**Returns:** `undefined`

**Example:**
```javascript
showHelp();
```

**Output:**
```
OpenTwig 🌿 - Open Source Link Page Generator

Usage:
  npx opentwig              Generate page from config.json
  npx opentwig --init       Create sample config.json
  npx opentwig --help       Show this help message
  npx opentwig --validate-config  Validate config.json

For more information, visit: https://github.com/tufantunc/opentwig
```

### createSampleConfig()

**Location:** `src/utils/createSampleConfig.js`

Creates a sample `config.json` file in the current directory.

```javascript
const createSampleConfig = () => { ... }
```

**Parameters:** None

**Returns:** `undefined`

**Side effects:**
- Creates `config.json` file in current working directory
- Logs success message
- Exits process with code 0

**Example:**
```javascript
createSampleConfig();
```

---

## Constants

**Location:** `src/constants.js`

Centralized constants used throughout the application.

```javascript
const CONSTANTS = {
    CONFIG_FILE: 'config.json',
    OUTPUT_DIR: 'dist',
    OUTPUT_FILES: {
        HTML: 'index.html',
        CSS: 'style.css',
        OG_IMAGE: 'og-image.jpg',
        QR_IMAGE: 'qr.svg'
    },
    SUPPORTED_THEMES: ['default', 'dark', 'minimal', 'colorful'],
    MESSAGES: {
        ERROR_PREFIX: 'ERROR: ',
        SUCCESS_PREFIX: '✅ ',
        CONFIG_NOT_FOUND: 'Configuration file not found',
        BUILD_SUCCESS: 'Page built successfully!',
        BUILD_FAILED: 'Failed to build page'
    }
};
```

---

## Error Handling

Most functions follow these error handling patterns:

### Async Functions
```javascript
try {
    const result = await someAsyncFunction();
    return result;
} catch (error) {
    throw new Error(`Context: ${error.message}`);
}
```

### Sync Functions with Exit
```javascript
if (!fs.existsSync(path)) {
    console.error(`${CONSTANTS.MESSAGES.ERROR_PREFIX}File not found: ${path}`);
    process.exit(1);
}
```

### Errors that Should Be Handled
- Missing `config.json` file
- Invalid theme name
- Avatar file not found
- Invalid image format
- CSS file not found (handled silently, returns null)

---

## Usage Examples

### Complete Build Workflow
```javascript
const loadConfig = require('./src/utils/loadConfig');
const buildPage = require('./src/utils/buildPage');
const saveFiles = require('./src/utils/saveFiles');

async function build() {
    try {
        const config = loadConfig();
        const { html, css, ogImage, qrImage } = await buildPage(config);
        saveFiles(html, css, config.avatar, ogImage, qrImage);
        console.log('✅ Page built successfully!');
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
}

build();
```

### Custom Build with Specific Components
```javascript
const generateHTML = require('./src/utils/generateHTML');
const generateOGImage = require('./src/utils/generateOGImage');
const generateQR = require('./src/utils/generateQR');

async function customBuild(config, theme) {
    const html = await generateHTML(config, theme);
    const ogImage = await generateOGImage({
        name: config.name,
        content: config.content,
        avatar: config.avatar
    });
    const qrImage = await generateQR(config.url);

    return { html, ogImage, qrImage };
}
```

---

## See Also

- [Theme Development Guide](THEME_DEVELOPMENT.md) - How to create custom themes
- [Contributing Guide](CONTRIBUTING.md) - Contribution guidelines
- [README](README.md) - Main project documentation
- [AGENTS.md](AGENTS.md) - Agent coding guidelines
