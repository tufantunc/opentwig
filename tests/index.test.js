import { describe, it, expect } from 'vitest';

describe('index.js', () => {
    it('should export a function', () => {
        const index = require('../src/index');
        expect(index).toBeDefined();
    });

    it('should be an async function', () => {
        const index = require('../src/index');
        expect(typeof index).toBe('object');
    });
});
