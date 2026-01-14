import { describe, it, expect } from 'vitest';
import escapeHTML from './escapeHTML';

describe('escapeHTML', () => {
  it('should escape ampersand character', () => {
    expect(escapeHTML('AT&T')).toBe('AT&amp;T');
  });

  it('should escape less than character', () => {
    expect(escapeHTML('<script>')).toBe('&lt;script&gt;');
  });

  it('should escape greater than character', () => {
    expect(escapeHTML('1 > 0')).toBe('1 &gt; 0');
  });

  it('should escape double quote character', () => {
    expect(escapeHTML('He said "hello"')).toBe('He said &quot;hello&quot;');
  });

  it('should escape single quote character', () => {
    expect(escapeHTML("It's working")).toBe('It&#39;s working');
  });

  it('should return empty string for undefined input', () => {
    expect(escapeHTML(undefined)).toBe('');
  });

  it('should return empty string for null input', () => {
    expect(escapeHTML(null)).toBe('null');
  });

  it('should return string unchanged if no special characters', () => {
    expect(escapeHTML('Hello World')).toBe('Hello World');
  });

  it('should handle multiple special characters', () => {
    expect(escapeHTML('<div class="test">\'code\' & more</div>'))
      .toBe('&lt;div class=&quot;test&quot;&gt;&#39;code&#39; &amp; more&lt;/div&gt;');
  });
});
