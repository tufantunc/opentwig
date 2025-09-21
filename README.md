# OpenTwig 🌿

OpenTwig is an open source personal link page generator that creates beautiful, customizable "link in bio" pages. Instead of relying on third-party services, users can define their configuration and instantly create a fully functional static site they own and control.

## ✨ Features

- 🎨 **Multiple Themes**: Choose from 4 built-in themes (default, dark, minimal, colorful)
- 📱 **Mobile Responsive**: Optimized for all devices with mobile-first design
- 🚀 **Fast & Lightweight**: Generates static HTML/CSS with minimal dependencies
- 🔗 **Easy Link Management**: Simple JSON configuration for all your links
- 🖼️ **Optional Avatar Support**: Custom profile pictures with automatic processing (completely optional)
- 📊 **Open Graph Images**: Auto-generated social media preview images
- 📱 **QR Code Generation**: Built-in QR codes for easy mobile sharing
- 🎭 **Modal Dialogs**: Support for rich content in footer links
- 📤 **Share Functionality**: Native Web Share API integration
- ⚡ **CSS Optimization**: Automatic CSS minification and autoprefixing
- 🛠️ **CLI Interface**: Simple command-line interface with helpful commands

## 🚀 Quick Start

### Installation & Usage

```bash
# Create a new project
npx opentwig --init

# Edit the generated config.json with your information
# Then generate your page
npx opentwig
```

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 📖 Configuration

OpenTwig uses a simple JSON configuration file (`config.json`) to define your page. Here's the complete configuration structure:

### With Avatar (Optional)
```json
{
  "theme": "default",
  "url": "https://links.yourwebsite.com",
  "title": "Your Name - opentwig 🌿",
  "name": "Your Name",
  "content": "Hello World! Here is my bio.",
  "minify": true,
  "avatar": {
    "path": "./avatar.png"
  },
  "links": [
    {
      "url": "https://twitter.com",
      "title": "Twitter"
    },
    {
      "url": "https://instagram.com",
      "title": "Instagram"
    }
  ],
  "footerLinks": [
    {
      "title": "Contact",
      "url": "mailto:mail@mail.com"
    },
    {
      "title": "Privacy",
      "content": "Your privacy policy content here..."
    }
  ],
  "share": {
    "title": "Your Name - opentwig 🌿",
    "url": "https://links.yourwebsite.com",
    "text": "Share"
  }
}
```

### Without Avatar (Minimal Configuration)
```json
{
  "theme": "default",
  "url": "https://links.yourwebsite.com",
  "title": "Your Name - opentwig 🌿",
  "name": "Your Name",
  "content": "Hello World! Here is my bio.",
  "minify": true,
  "links": [
    {
      "url": "https://twitter.com",
      "title": "Twitter"
    },
    {
      "url": "https://instagram.com",
      "title": "Instagram"
    }
  ],
  "footerLinks": [
    {
      "title": "Contact",
      "url": "mailto:mail@mail.com"
    }
  ],
  "share": {
    "title": "Your Name - opentwig 🌿",
    "url": "https://links.yourwebsite.com",
    "text": "Share"
  }
}
```

### Configuration Options

| Option | Type | Description |
|--------|------|-------------|
| `theme` | string | Theme name (`default`, `dark`, `minimal`, `colorful`) |
| `url` | string | Your page URL (for Open Graph and QR codes) |
| `title` | string | Page title (appears in browser tab) |
| `name` | string | Your display name |
| `content` | string | Bio/description text |
| `minify` | boolean | Enable CSS minification (default: `true`) |
| `avatar` | object | **Optional** Avatar image configuration |
| `avatar.path` | string | **Optional** Path to your avatar image (supports PNG, JPG, JPEG, WebP) |
| `links` | array | Array of link objects with `url` and `title` |
| `footerLinks` | array | Footer links (can be URLs or modal dialogs) |
| `share` | object | Web Share API configuration |

### 🖼️ Avatar Configuration

The avatar feature is completely optional. If you don't include the `avatar` object in your configuration, no avatar will be displayed on your page.

**Supported image formats:**
- PNG
- JPG/JPEG  
- WebP

**Avatar processing:**
- Images are automatically optimized and resized
- Processed avatar is saved as `avatar.png` in the output directory
- Original aspect ratio is preserved
- Images are compressed for optimal web performance

**Example avatar configuration:**
```json
{
  "avatar": {
    "path": "./my-photo.jpg"
  }
}
```

**Note:** If you don't want an avatar, simply omit the `avatar` object from your configuration entirely.

## 🎨 Themes

OpenTwig includes 4 beautiful themes:

- **Default**: Clean, modern design with subtle shadows and rounded corners
- **Dark**: Dark mode variant of the default theme
- **Minimal**: Simplified, minimalist design
- **Colorful**: Vibrant color scheme

All themes are mobile-responsive and include:
- Optional custom avatar display
- Link buttons with hover effects
- Modal dialogs for rich content
- QR code integration
- Share button functionality

## 🛠️ CLI Commands

```bash
# Show help information
npx opentwig --help

# Create sample config.json
npx opentwig --init

# Generate page from config.json
npx opentwig
```

## 📁 Output Files

OpenTwig generates the following files in the `dist/` directory:

- `index.html` - Main HTML page
- `style.css` - Processed and optimized CSS
- `avatar.png` - Processed avatar image *(only generated if avatar is configured)*
- `og-image.jpg` - Open Graph image for social sharing
- `qr.svg` - QR code for mobile sharing

## 🔧 Development

### Project Structure

```
opentwig/
├── src/
│   ├── index.js              # Main entry point
│   ├── constants.js          # Application constants
│   └── utils/                # Utility functions
│       ├── buildPage.js      # Page building logic
│       ├── generateHTML.js   # HTML generation
│       ├── generateOGImage.js # Open Graph image creation
│       ├── generateQR.js     # QR code generation
│       ├── processCSS.js     # CSS processing and optimization
│       └── ...
├── theme/
│   ├── default/              # Default theme
│   │   ├── index.js         # Theme template
│   │   ├── style.css        # Theme styles
│   │   └── components/      # Reusable components
│   ├── dark/                # Dark theme
│   ├── minimal/             # Minimal theme
│   └── colorful/            # Colorful theme
└── dist/                    # Generated output
```

### Key Features Implementation

- **Image Processing**: Uses Sharp for avatar and OG image processing
- **QR Code Generation**: Uses qrcode library for SVG QR codes
- **CSS Processing**: PostCSS with autoprefixer and minification
- **HTML Generation**: Component-based template system
- **Theme System**: Modular theme architecture with component support

## 🌐 Deployment

Since OpenTwig generates static files, you can deploy to any static hosting service:

- **GitHub Pages**: Push `dist/` folder to a repository
- **Netlify**: Drag and drop the `dist/` folder
- **Vercel**: Connect your repository
- **AWS S3**: Upload files to an S3 bucket
- **Any web server**: Upload the `dist/` folder to your server

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔗 Links

- [GitHub Repository](https://github.com/tufantunc/opentwig)
- [NPM Package](https://www.npmjs.com/package/opentwig)
