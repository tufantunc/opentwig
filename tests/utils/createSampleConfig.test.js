import { describe, it, expect } from 'vitest';

describe('createSampleConfig', () => {
    it('should be a function', () => {
        const createSampleConfig = require('../../src/utils/createSampleConfig');
        expect(typeof createSampleConfig).toBe('function');
    });

    it('should not accept parameters', () => {
        const createSampleConfig = require('../../src/utils/createSampleConfig');
        const params = createSampleConfig.length;
        expect(params).toBe(0);
    });
});
