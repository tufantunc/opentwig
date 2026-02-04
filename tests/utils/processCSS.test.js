import { describe, it, expect } from 'vitest';

describe('processCSS', () => {
    it('should be a function', () => {
        const processCSS = require('../../src/utils/processCSS');
        expect(typeof processCSS).toBe('function');
    });

    it('should accept config parameter', () => {
        const processCSS = require('../../src/utils/processCSS');
        const params = processCSS.length;
        expect(params).toBe(1);
    });
});
