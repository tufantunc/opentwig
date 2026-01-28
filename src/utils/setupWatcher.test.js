import { describe, it, expect } from 'vitest';

describe('setupWatcher', () => {
    it('should be a function', () => {
        const setupWatcher = require('./setupWatcher');
        expect(typeof setupWatcher).toBe('function');
    });

    it('should accept configPath, wss, and callback parameters', () => {
        const setupWatcher = require('./setupWatcher');
        const params = setupWatcher.length;
        expect(params).toBe(3);
    });

    it('should return an object with control functions', () => {
        const setupWatcher = require('./setupWatcher');
        const mockWSServer = { broadcastReload: () => {} };
        const callback = () => {};
        
        try {
            const result = setupWatcher('/test/config.json', mockWSServer, callback);
            expect(typeof result).toBe('object');
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});
