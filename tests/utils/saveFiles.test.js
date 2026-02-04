import { describe, it, expect } from 'vitest';

describe('saveFiles', () => {
    it('should be a function', () => {
        const saveFiles = require('../../src/utils/saveFiles');
        expect(typeof saveFiles).toBe('function');
    });

    it('should accept 5 parameters', () => {
        const saveFiles = require('../../src/utils/saveFiles');
        const params = saveFiles.length;
        expect(params).toBe(5);
    });
});
