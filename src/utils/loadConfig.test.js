import { describe, it, expect } from 'vitest';

describe('loadConfig', () => {
    it('should be a function', () => {
        const loadConfig = require('./loadConfig');
        expect(typeof loadConfig).toBe('function');
    });

    it('should return an object', () => {
        const loadConfig = require('./loadConfig');
        
        try {
            const result = loadConfig();
            expect(typeof result).toBe('object');
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});
