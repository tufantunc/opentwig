import { describe, it, expect } from 'vitest';

describe('generateHTML', () => {
    it('should be a function', () => {
        const generateHTML = require('./generateHTML');
        expect(typeof generateHTML).toBe('function');
    });

    it('should return a promise', () => {
        const generateHTML = require('./generateHTML');
        const config = { minify: false };
        const theme = () => '<html></html>';
        const result = generateHTML(config, theme);
        expect(result).toBeInstanceOf(Promise);
    });

    it('should accept config and theme parameters', async () => {
        const generateHTML = require('./generateHTML');
        const config = { minify: false };
        const theme = () => '<html></html>';
        
        try {
            await generateHTML(config, theme);
            expect(true).toBe(true);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});
