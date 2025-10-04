# Contributing to OpenTwig 🌿

Thank you for your interest in contributing to OpenTwig! This guide will help you get started as a contributor to our open source project.


## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Project Structure](#project-structure)
- [Code Style Guide](#code-style-guide)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Community Guidelines](#community-guidelines)

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/opentwig.git
   cd opentwig
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/tufantunc/opentwig.git
   ```

## 🛠️ Development Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

2. Test the CLI tool:
   ```bash
   npm start -- --help
   ```

3. Create a test config and try building:
   ```bash
   npm start -- --init
   npm start
   ```

## 🤝 How to Contribute

### Types of Contributions

We welcome various types of contributions:

#### 🐛 **Bug Fixes**
- Fix issues labeled `bug`
- Improve error handling
- Fix typos in documentation

#### ✨ **New Features**
- Add new themes
- Implement new CLI commands
- Add support for new image formats
- Enhance existing functionality

#### 📚 **Documentation**
- Improve README sections
- Add code comments
- Create tutorials or guides
- Translate documentation

#### 🎨 **Themes & Styling**
- Create new themes
- Improve existing theme designs
- Add responsive improvements
- Fix accessibility issues

#### 🔧 **Development Experience**
- Add tests
- Improve build process
- Add linting/formatting
- Update dependencies

### Good First Issues

Look for issues with these labels:
- `good first issue` - Perfect for newcomers
- `documentation` - Documentation improvements
- `theme` - Theme-related work

## 📁 Project Structure

```
opentwig/
├── src/
│   ├── index.js              # Main CLI entry point
│   ├── constants.js          # App constants
│   └── utils/                # Core utilities
│       ├── buildPage.js      # Page building logic
│       ├── generateHTML.js   # HTML generation
│       ├── generateOGImage.js # Open Graph images
│       ├── generateQR.js     # QR code generation
│       ├── processCSS.js     # CSS processing
│       └── ...
├── theme/
│   ├── default/              # Default theme
│   │   ├── index.js         # Theme template
│   │   ├── style.css        # Theme styles
│   │   └── components/      # Reusable components
│   ├── dark/                # Dark theme
│   ├── minimal/             # Minimal theme
│   ├── colorful/            # Colorful theme
│   └── azure/               # Azure theme
└── dist/                    # Generated output (gitignored)
```

### Key Files Explained

- **`src/index.js`**: Main CLI entry point, handles argument parsing
- **`src/utils/buildPage.js`**: Orchestrates the page building process
- **`theme/*/index.js`**: Theme-specific HTML templates
- **`theme/*/style.css`**: Theme-specific CSS styles
- **`theme/*/components/`**: Reusable component templates

## 💻 Code Style Guide

### JavaScript
- Use ES6+ features where appropriate
- Follow camelCase for variables and functions
- Use meaningful variable names
- Add JSDoc comments for functions
- Keep functions small and focused

### CSS
- Use consistent indentation (2 spaces)
- Use semantic class names
- Follow mobile-first responsive design
- Use CSS custom properties for theming
- Optimize for performance

### File Organization
- One function per file when possible
- Keep utility files focused
- Use clear, descriptive filenames

### Example Code Style

```javascript
/**
 * Generates QR code for the given URL
 * @param {string} url - The URL to encode
 * @returns {string} SVG QR code string
 */
function generateQRCode(url) {
  const qrOptions = {
    type: 'svg',
    width: 200,
    margin: 2
  };
  
  return QrCode.generate(url, qrOptions);
}
```

## 🧪 Testing

Before submitting a pull request:

1. **Test CLI functionality**:
   ```bash
   npm start -- --init
   npm start
   ```

2. **Test different themes**:
   ```bash
   # Edit config.json to test different themes
   npm start
   ```

3. **Check output files**:
   - Verify HTML is valid
   - Check CSS renders correctly
   - Ensure images are processed properly

4. **Test edge cases**:
   - Empty config
   - Missing avatar
   - Long text content
   - Various image formats

## 📝 Pull Request Process

1. **Create a branch** from main:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** 

3. **Test thoroughly**

4. **Commit with clear messages**:
   ```bash
   git commit -m "feat: add new theme for better UX"
   git commit -m "docs: improve setup instructions"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**

### PR Guidelines

- Use descriptive titles
- Link related issues
- Add screenshots for UI changes
- Describe testing performed
- Keep PRs focused and small when possible

### PR Title Format
- `feat:` New features
- `fix:` Bug fixes  
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

## 🐛 Reporting Bugs

Found a bug? Help us fix it!

### Before Reporting
1. Check existing issues
2. Test with latest version
3. Try to reproduce consistently

### Bug Report Template
```markdown
**Bug Description**
Brief description of the bug

**Steps to Reproduce**
1. Run `npx opentwig --init`
2. Edit config.json with...
3. Run `npx opentwig`
4. See error...

**Expected Behavior**
What should happen instead

**Environment**
- Node.js version:
- Operating System:
- npm version:

**Additional Context**
Screenshots, error messages, etc.
```

## 💡 Suggesting Features

We love feature suggestions! 

### Enhancement Guidelines
1. Check existing issues first
2. Describe the use case clearly
3. Consider backward compatibility
4. Think about implementation complexity

## 🌍 Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and different skill levels
- Focus on constructive feedback
- Respect different opinions and approaches

### Getting Help

- Use GitHub Discussions for questions
- Check existing issues and PRs
- Read documentation thoroughly
- Be patient for responses

## 🎉 Recognition

Contributors will be:
- Listed in the project README (if desired)
- Mentioned in release notes for significant contributions
- Given priority in code reviews and feedback

## 📞 Contact

Questions? Feel free to:
- Open an issue
- Start a discussion
- Contact maintainers

Thank you for contributing to OpenTwig! 🚀
