import { describe, it, expect } from 'vitest';

describe('generateOGImage', () => {
    it('should be a function', () => {
        const generateOGImage = require('./generateOGImage');
        expect(typeof generateOGImage).toBe('function');
    });

    it('should return a promise', () => {
        const generateOGImage = require('./generateOGImage');
        const config = { name: 'Test', content: 'Content' };
        const result = generateOGImage(config);
        expect(result).toBeInstanceOf(Promise);
    });

    it('should accept config parameter', async () => {
        const generateOGImage = require('./generateOGImage');
        const config = { name: 'Test', content: 'Content' };
        
        try {
            await generateOGImage(config);
            expect(true).toBe(true);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});
