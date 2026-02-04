import { describe, it, expect, vi } from 'vitest';

describe('showHelp', () => {
  it('should output help text with OpenTwig branding', () => {
    const mockLog = vi.spyOn(console, 'log').mockImplementation(() => {});
    const showHelp = require('../../src/utils/showHelp');
    showHelp();
    expect(mockLog).toHaveBeenCalled();
    const output = mockLog.mock.calls[0][0];
    expect(output).toContain('OpenTwig');
    expect(output).toContain('--help');
    expect(output).toContain('--init');
  });

  it('should include usage information', () => {
    const mockLog = vi.spyOn(console, 'log').mockImplementation(() => {});
    const showHelp = require('../../src/utils/showHelp');
    showHelp();
    const output = mockLog.mock.calls[0][0];
    expect(output).toContain('USAGE');
    expect(output).toContain('npx opentwig');
  });

  it('should include examples', () => {
    const mockLog = vi.spyOn(console, 'log').mockImplementation(() => {});
    const showHelp = require('../../src/utils/showHelp');
    showHelp();
    const output = mockLog.mock.calls[0][0];
    expect(output).toContain('EXAMPLES');
    expect(output).toContain('--init');
  });
});
