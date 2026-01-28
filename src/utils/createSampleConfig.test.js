import { describe, it, expect } from 'vitest';

describe('createSampleConfig', () => {
    it('should be a function', () => {
        const createSampleConfig = require('./createSampleConfig');
        expect(typeof createSampleConfig).toBe('function');
    });

    it('should not accept parameters', () => {
        const createSampleConfig = require('./createSampleConfig');
        const params = createSampleConfig.length;
        expect(params).toBe(0);
    });
});
