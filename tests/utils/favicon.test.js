import { describe, it, expect } from 'vitest';

describe('favicon', () => {
    it('should export LEAF_FAVICON_SVG constant', () => {
        const favicon = require('../../src/utils/favicon');
        expect(favicon.LEAF_FAVICON_SVG).toBeDefined();
        expect(typeof favicon.LEAF_FAVICON_SVG).toBe('string');
        expect(favicon.LEAF_FAVICON_SVG).toContain('<svg');
        expect(favicon.LEAF_FAVICON_SVG).toContain('</svg>');
    });

    it('should export getFaviconDataURI function', () => {
        const favicon = require('../../src/utils/favicon');
        expect(typeof favicon.getFaviconDataURI).toBe('function');
    });

    it('should return valid data URI', () => {
        const { getFaviconDataURI } = require('../../src/utils/favicon');
        const dataURI = getFaviconDataURI();
        expect(dataURI).toMatch(/^data:image\/svg\+xml;base64,/);
    });

    it('should contain SVG content in base64', () => {
        const { getFaviconDataURI, LEAF_FAVICON_SVG } = require('../../src/utils/favicon');
        const dataURI = getFaviconDataURI();
        const expectedBase64 = Buffer.from(LEAF_FAVICON_SVG).toString('base64');
        expect(dataURI).toContain(expectedBase64);
    });
});