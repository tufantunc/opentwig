import { describe, it, expect } from 'vitest';
import { DEFAULT_CONFIG, SAMPLE_CONFIG, applyDefaults } from '../../src/utils/configDefaults';

describe('configDefaults', () => {
  describe('DEFAULT_CONFIG', () => {
    it('should have default theme set to default', () => {
      expect(DEFAULT_CONFIG.theme).toBe('default');
    });

    it('should have default title', () => {
      expect(DEFAULT_CONFIG.title).toBe('OpenTwig 🌿');
    });

    it('should have default minify set to true', () => {
      expect(DEFAULT_CONFIG.minify).toBe(true);
    });

    it('should have empty links array', () => {
      expect(DEFAULT_CONFIG.links).toEqual([]);
    });

    it('should have empty footerLinks array', () => {
      expect(DEFAULT_CONFIG.footerLinks).toEqual([]);
    });

    it('should have share object with required fields', () => {
      expect(DEFAULT_CONFIG.share).toHaveProperty('title');
      expect(DEFAULT_CONFIG.share).toHaveProperty('url');
      expect(DEFAULT_CONFIG.share).toHaveProperty('text');
    });
  });

  describe('SAMPLE_CONFIG', () => {
    it('should have theme property', () => {
      expect(SAMPLE_CONFIG).toHaveProperty('theme');
    });

    it('should have links array with 5 items', () => {
      expect(SAMPLE_CONFIG.links).toHaveLength(5);
    });

    it('should have footerLinks array with 2 items', () => {
      expect(SAMPLE_CONFIG.footerLinks).toHaveLength(2);
    });

    it('should have avatar property', () => {
      expect(SAMPLE_CONFIG).toHaveProperty('avatar');
      expect(SAMPLE_CONFIG.avatar).toHaveProperty('path');
    });
  });

  describe('applyDefaults', () => {
    it('should apply defaults for missing keys', () => {
      const config = { url: 'https://example.com', name: 'Test' };
      const result = applyDefaults(config);
      expect(result.theme).toBe('default');
      expect(result.title).toBe('OpenTwig 🌿');
    });

    it('should not override existing values', () => {
      const config = { url: 'https://example.com', name: 'Test', theme: 'dark' };
      const result = applyDefaults(config);
      expect(result.theme).toBe('dark');
    });

    it('should handle empty config object', () => {
      const result = applyDefaults({});
      expect(result.theme).toBe('default');
      expect(result.links).toEqual([]);
    });

    it('should merge share object deeply', () => {
      const config = { share: { url: 'https://custom.com' } };
      const result = applyDefaults(config);
      expect(result.share.url).toBe('https://custom.com');
      expect(result.share.title).toBe(DEFAULT_CONFIG.share.title);
    });

    it('should handle share as null', () => {
      const config = { share: null };
      const result = applyDefaults(config);
      expect(result.share).toEqual(DEFAULT_CONFIG.share);
    });

    it('should preserve undefined values', () => {
      const config = { avatar: undefined };
      const result = applyDefaults(config);
      expect(result).toHaveProperty('avatar', undefined);
    });
  });
});
