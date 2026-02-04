import { describe, it, expect } from 'vitest';

describe('buildPage', () => {
    it('should be a function', () => {
        const buildPage = require('../../src/utils/buildPage');
        expect(typeof buildPage).toBe('function');
    });

    it('should accept config parameter', () => {
        const buildPage = require('../../src/utils/buildPage');
        const params = buildPage.length;
        expect(params).toBe(1);
    });
});
