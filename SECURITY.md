# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are
currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of OpenTwig seriously. If you discover a security vulnerability, please report it to us responsibly.

### How to Report

Please **do not** create a public GitHub issue for security vulnerabilities. Instead:

1. **Email us directly**: [tufan@tufantunc.com](mailto:tufan@tufantunc.com)
2. **Subject line**: Include "SECURITY" in the subject
3. **Include details**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fixes (if any)

### What to Expect

- **Acknowledgement**: We'll acknowledge your report within 48 hours
- **Assessment**: We'll investigate and assess the vulnerability
- **Resolution**: We'll work on a fix and keep you updated
- **Disclosure**: After fixing, we'll coordinate disclosure timing with you

### Security Best Practices

When reporting security issues:

1. **Don't exploit**: Don't attempt to exploit the vulnerability on production systems
2. **Be responsible**: Give us reasonable time to fix before public disclosure
3. **Be detailed**: Provide as much detail as possible about the issue
4. **Be patient**: Complex security issues may take time to properly address

## Security Considerations

OpenTwig is a static site generator, which reduces many security risks. However, please note:

- **Static files**: OpenTwig generates static HTML/CSS files with no server-side processing
- **Dependencies**: Keep dependencies updated via regular updates
- **Configuration**: Review configuration files for sensitive information
- **Assets**: Ensure uploaded images and content don't contain malicious code

## Thank You

We appreciate security researchers helping keep OpenTwig secure. Contributors who report valid security vulnerabilities will be acknowledged in our security advisories (unless they prefer to remain anonymous).
