import { describe, it, expect } from 'vitest';

describe('readImageAsBase64', () => {
    it('should be a function', () => {
        const readImageAsBase64 = require('./readImageAsBase64');
        expect(typeof readImageAsBase64).toBe('function');
    });

    it('should accept file path parameter', () => {
        const readImageAsBase64 = require('./readImageAsBase64');
        const params = readImageAsBase64.length;
        expect(params).toBe(1);
    });
});
