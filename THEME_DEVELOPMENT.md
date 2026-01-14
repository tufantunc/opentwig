# Theme Development Guide

This guide will help you create custom themes for OpenTwig. Themes control the visual appearance of generated "link in bio" pages.

## Theme Structure

A theme consists of two main files in a directory under `theme/`:

```
theme/my-theme/
├── index.js          # Theme template (HTML generation)
├── style.css         # Theme styles (CSS)
└── components/       # Optional: Custom components
    ├── avatar.js
    ├── link.js
    ├── footer-link.js
    ├── share-button.js
    └── qr.js
```

## Creating a Simple Theme

### Step 1: Create Theme Directory

Create a new directory for your theme:
```bash
mkdir theme/my-theme
cd theme/my-theme
```

### Step 2: Create index.js (Template)

The `index.js` file exports a function that generates the HTML structure. You can either:

**Option A: Create a custom template**
```javascript
const escapeHTML = require('../../src/utils/escapeHTML');
const { avatar } = require('./components/avatar');
const { link } = require('./components/link');

module.exports = function(config) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHTML(config.title)}</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        ${avatar(config)}
        <h1>${escapeHTML(config.name)}</h1>
        ${config.content ? `<p class="bio">${escapeHTML(config.content)}</p>` : ''}
        <div class="links">
            ${config.links.map(link).join('')}
        </div>
    </div>
</body>
</html>`;
};
```

**Option B: Reuse the default template** (recommended for CSS-only themes)
```javascript
module.exports = require('../default/index.js');
```

### Step 3: Create style.css

Define your theme's visual styling:
```css
/* Basic CSS Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Container */
.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 40px 20px;
    text-align: center;
    font-family: Arial, sans-serif;
}

/* Avatar */
.avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 20px;
}

/* Links */
.link {
    display: block;
    background: #fff;
    color: #000;
    padding: 15px 20px;
    margin: 10px 0;
    text-decoration: none;
    border-radius: 8px;
    border: 2px solid #000;
    transition: all 0.3s ease;
}

.link:hover {
    background: #000;
    color: #fff;
}
```

### Step 4: Register Your Theme

Add your theme name to the `SUPPORTED_THEMES` array in `src/constants.js`:

```javascript
const SUPPORTED_THEMES = ['default', 'dark', 'minimal', 'colorful', 'my-theme'];
```

### Step 5: Test Your Theme

1. Create or edit a `config.json` file:
```json
{
    "theme": "my-theme",
    "url": "https://example.com",
    "name": "Your Name",
    "content": "Your bio",
    "links": [
        {"url": "https://twitter.com", "title": "Twitter"},
        {"url": "https://github.com", "title": "GitHub"}
    ]
}
```

2. Generate your page:
```bash
npm start
```

3. View the result in `dist/index.html`

## Theme Components

Themes can include custom components in the `components/` directory. Components are small, reusable functions that generate HTML fragments.

### Available Components (from default theme)

#### avatar.js
```javascript
module.exports = function(config) {
    if (!config.avatar) return '';
    return `<img src="avatar.png" alt="${escapeHTML(config.name)}" class="avatar">`;
};
```

#### link.js
```javascript
module.exports = function(linkConfig) {
    return `<a href="${linkConfig.url}" target="_blank" rel="noopener" class="link">
        <span>${escapeHTML(linkConfig.title)}</span>
    </a>`;
};
```

#### footer-link.js
```javascript
module.exports = function(link) {
    if (link.content) {
        return `<button class="footer-link" data-title="${escapeHTML(link.title)}">
            ${escapeHTML(link.title)}
        </button>`;
    }
    return `<a href="${link.url}" class="footer-link" target="_blank" rel="noopener">
        ${escapeHTML(link.title)}
    </a>`;
};
```

#### share-button.js
```javascript
module.exports = function(config) {
    if (!config.share) return '';
    return `<button class="share-button" onclick="sharePage()">
        ${escapeHTML(config.share.text || 'Share')}
    </button>
    <script>
        function sharePage() {
            if (navigator.share) {
                navigator.share({
                    title: '${escapeHTML(config.share.title)}',
                    url: '${escapeHTML(config.share.url)}'
                });
            }
        }
    </script>`;
};
```

#### qr.js
```javascript
module.exports = function(config) {
    return `<img src="qr.svg" alt="QR Code" class="qr-code">`;
};
```

#### dialog.js
```javascript
module.exports = function(link) {
    return `<dialog id="dialog-${escapeHTML(link.title)}">
        <div class="dialog-content">
            <h2>${escapeHTML(link.title)}</h2>
            <p>${escapeHTML(link.content)}</p>
            <button onclick="this.closest('dialog').close()">Close</button>
        </div>
    </dialog>`;
};
```

## Theme Best Practices

### 1. Use escapeHTML()
Always escape user-generated content to prevent XSS attacks:
```javascript
const escapeHTML = require('../../src/utils/escapeHTML');

${escapeHTML(config.name)}
```

### 2. Responsive Design
Make your theme work well on mobile devices:
```css
@media (max-width: 600px) {
    .container {
        padding: 20px 15px;
    }
    .link {
        padding: 12px 15px;
    }
}
```

### 3. Accessibility
Include proper HTML attributes:
```html
<a href="..." target="_blank" rel="noopener" aria-label="${escapeHTML(link.title)}">
```

### 4. CSS Optimization
PostCSS will automatically:
- Add vendor prefixes
- Minify CSS (if `config.minify` is true)

### 5. Optional Features
Always check if optional features are configured before including them:
```javascript
${config.avatar ? avatar(config) : ''}
${config.content ? `<p>${escapeHTML(config.content)}</p>` : ''}
```

## Theme CSS Guidelines

### Required CSS Classes

While themes can vary in design, they should support these core classes for consistency:

```css
/* Main container */
.container { }

/* Avatar */
.avatar { }

/* Profile name */
.name { }

/* Bio/description */
.bio { }

/* Link buttons */
.link { }
.link:hover { }

/* Footer links */
.footer-link { }

/* Share button */
.share-button { }

/* QR code (desktop only) */
.qr-code { }

/* Modal dialog */
dialog { }
.dialog-content { }
```

### CSS Variables (Optional)

You can use CSS variables for easier theming:
```css
:root {
    --primary-color: #000;
    --secondary-color: #fff;
    --background-color: #f5f5f5;
    --text-color: #333;
}
```

## Examples

### Minimal Theme
Reuses default template with flat, simple CSS:
```javascript
module.exports = require('../default/index.js');
```

```css
.link {
    background: transparent;
    border: 1px solid #ccc;
    color: #333;
}
```

### Dark Theme
Reuses default template with dark colors:
```javascript
module.exports = require('../default/index.js');
```

```css
:root {
    --background-color: #1a1a1a;
    --text-color: #fff;
}
```

### Custom Layout Theme
Create a completely different layout in index.js:
```javascript
module.exports = function(config) {
    return `<!DOCTYPE html>
<html>
<head>
    <!-- custom layout -->
</head>
<body class="sidebar-layout">
    <!-- sidebar navigation -->
    <!-- main content area -->
</body>
</html>`;
};
```

## Testing Your Theme

1. Test with all configuration options (avatar, links, footer links, etc.)
2. Test on different screen sizes (mobile, tablet, desktop)
3. Test with long names/titles
4. Test with many links
5. Verify HTML validity (use https://validator.w3.org/)
6. Check accessibility (use https://wave.webaim.org/)

## Submitting Your Theme

If you'd like to contribute your theme to OpenTwig:

1. Follow the contributing guide in `CONTRIBUTING.md`
2. Ensure your theme includes:
   - Complete CSS styling
   - Responsive design
   - Accessibility considerations
   - JSDoc comments in index.js
3. Submit a pull request with your theme

## Resources

- **Default Theme**: `theme/default/` - Reference implementation
- **Dark Theme**: `theme/dark/` - Example of CSS-only customization
- **Minimal Theme**: `theme/minimal/` - Example of simplified styling
- **Colorful Theme**: `theme/colorful/` - Example of advanced CSS effects
- **Utility Functions**: `src/utils/` - Helper functions available for themes
