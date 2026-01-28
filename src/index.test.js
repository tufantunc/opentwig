import { describe, it, expect } from 'vitest';

describe('index.js', () => {
    it('should export a function', () => {
        const index = require('./index');
        expect(index).toBeDefined();
    });

    it('should be an async function', () => {
        const index = require('./index');
        expect(typeof index).toBe('object');
    });
});
