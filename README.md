# OpenTwig 🌿

[![npm version](https://img.shields.io/npm/v/opentwig.svg)](https://www.npmjs.com/package/opentwig)
[![npm downloads](https://img.shields.io/npm/dm/opentwig.svg)](https://www.npmjs.com/package/opentwig)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/opentwig.svg)](https://nodejs.org/)
[![GitHub stars](https://img.shields.io/github/stars/tufantunc/opentwig.svg)](https://github.com/tufantunc/opentwig/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/tufantunc/opentwig.svg)](https://github.com/tufantunc/opentwig/issues)
[![Coverage](https://img.shields.io/badge/Coverage-60%25-yellow)]()

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
- SVG

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
- **Dark**: Dark mode variant of the default theme with gradient backgrounds and glassmorphism effects
- **Minimal**: Simplified, minimalist design with flat styling
- **Colorful**: Vibrant color scheme with animated gradients and shimmer effects

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

### Development Setup

If you want to contribute to OpenTwig or customize it locally:

```bash
# Clone the repository
git clone https://github.com/tufantunc/opentwig.git
cd opentwig

# Install dependencies
npm install

# Test the CLI
npm start -- --help

# Create a sample config for testing
npm start -- --init

# Test the build process
npm start
```

### Project Structure

```
opentwig/
├── src/
│   ├── index.js              # Main CLI entry point
│   ├── constants.js          # Application constants
│   └── utils/                # Core utilities
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
├── .github/                 # GitHub templates
│   ├── ISSUE_TEMPLATE/      # Issue templates
│   └── pull_request_template.md # PR template
└── dist/                    # Generated output (gitignored)
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

## 🌟 Showcase

Check out these amazing websites created with OpenTwig! These examples showcase sites made with OpenTwig:

### Featured Sites

- **[Tufan Tunç - My Social Links](https://links.tufantunc.com)** - My social links, used default theme with avatar

### Submit Your Site

Have you created a website with OpenTwig? We'd love to showcase it! You can add your site to our showcase in two ways:

1. **Create an Issue** - Use our [showcase submission template](.github/ISSUE_TEMPLATE/showcase_submission.md)
2. **Submit a Pull Request** - Add your site directly to the showcase section in this README

#### Guidelines for Showcase Submissions

- ✅ Your site must be live and accessible
- ✅ Use OpenTwig to generate the site
- ✅ Keep descriptions concise (1-2 sentences max)

#### What We Look For

- Creative use of themes and customization
- Different use cases (personal, business, portfolio, etc.)
- Good examples of various configuration options
- Sites that inspire other users

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

## 🤝 Contributing

OpenTwig is open source and welcomes contributions from the community! 🎉

### Ways to Contribute

- 🐛 **Report bugs** using our [bug report template](.github/ISSUE_TEMPLATE/bug_report.md)
- ✨ **Suggest features** through our [feature request template](.github/ISSUE_TEMPLATE/feature_request.md)
- 📚 **Improve documentation** using our [documentation improvement template](.github/ISSUE_TEMPLATE/documentation_improvement.md)
- 🌟 **Submit to showcase** using our [showcase submission template](.github/ISSUE_TEMPLATE/showcase_submission.md)
- 🎨 **Create themes** - add new visual styles and layouts
- 🔧 **Fix issues** - tackle open issues and improve the codebase
- 🌍 **Translate** - help translate documentation and content

### Getting Started

1. **Read our [Contributing Guide](CONTRIBUTING.md)** - Complete guide for contributors
2. **Check our [Code of Conduct](CODE_OF_CONDUCT.md)** - Community guidelines
3. **Look for `good first issue` labels** - Perfect for newcomers
4. **Fork, code, and submit a PR** - Standard open source workflow

### Hacktoberfest 2025

🎃 This repository participates in **Hacktoberfest 2025**! 

- Look for issues with `hacktoberfest` and `good first issue` labels
- Follow our issue and PR templates
- Make meaningful contributions that benefit the project
- Review our [Contributing Guide](CONTRIBUTING.md) before starting

### Contributors

We appreciate all contributors! Contributors will be:
- Listed here (if desired)
- Mentioned in release notes for significant contributions
- Given priority for code reviews and feedback

## 🔗 Links

- [GitHub Repository](https://github.com/tufantunc/opentwig)
- [NPM Package](https://www.npmjs.com/package/opentwig)
- [Issues](https://github.com/tufantunc/opentwig/issues)
- [Discussions](https://github.com/tufantunc/opentwig/discussions)

## 🔧 Config.json Validation

You can validate your configuration file using the CLI option:
```bash
npx opentwig --validate-config
```                                 
### Available Commands               
- `--help` - Show usage information  
- `--init` - Create a sample config.json
- `--validate-config` - Validate the config.json file
- `build` - Compile the project files
- `start` - Run the project
- `test` - Execute the project tests
