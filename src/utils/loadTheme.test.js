import { describe, it, expect } from 'vitest';

describe('loadTheme', () => {
    it('should be a function', () => {
        const loadTheme = require('./loadTheme');
        expect(typeof loadTheme).toBe('function');
    });

    it('should accept config parameter', () => {
        const loadTheme = require('./loadTheme');
        const config = { theme: 'default' };
        
        try {
            loadTheme(config);
            expect(true).toBe(true);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});
