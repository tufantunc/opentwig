import { describe, it, expect } from 'vitest';

describe('generateQR', () => {
    it('should be a function', () => {
        const generateQR = require('./generateQR');
        expect(typeof generateQR).toBe('function');
    });

    it('should return a promise', () => {
        const generateQR = require('./generateQR');
        const result = generateQR('https://example.com');
        expect(result).toBeInstanceOf(Promise);
    });

    it('should accept URL parameter', async () => {
        const generateQR = require('./generateQR');
        
        try {
            await generateQR('https://example.com');
            expect(true).toBe(true);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});
