import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('parseArgs', () => {
  let originalArgv;
  let mockExit;
  let mockConsoleLog;
  let mockConsoleError;

  beforeEach(() => {
    originalArgv = process.argv;
    mockExit = vi.spyOn(process, 'exit').mockImplementation(() => {});
    mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
    mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    process.argv = originalArgv;
    vi.restoreAllMocks();
  });

  it('should exit with code 0 when --help is passed', async () => {
    process.argv = ['node', 'opentwig', '--help'];
    const showHelpMock = vi.fn();
    vi.doMock('./showHelp', () => showHelpMock);
    const parseArgs = (await import('./parseArgs')).default;
    parseArgs();
    expect(process.exit).toHaveBeenCalledWith(0);
  });

  it('should exit with code 0 when -h is passed', async () => {
    process.argv = ['node', 'opentwig', '-h'];
    const showHelpMock = vi.fn();
    vi.doMock('./showHelp', () => showHelpMock);
    const parseArgs = (await import('./parseArgs')).default;
    parseArgs();
    expect(process.exit).toHaveBeenCalledWith(0);
  });

  it('should exit with code 0 when --init is passed', async () => {
    process.argv = ['node', 'opentwig', '--init'];
    const createSampleConfigMock = vi.fn();
    vi.doMock('./createSampleConfig', () => createSampleConfigMock);
    const parseArgs = (await import('./parseArgs')).default;
    parseArgs();
    expect(process.exit).toHaveBeenCalledWith(0);
  });

  it('should exit with code 0 when -i is passed', async () => {
    process.argv = ['node', 'opentwig', '-i'];
    const createSampleConfigMock = vi.fn();
    vi.doMock('./createSampleConfig', () => createSampleConfigMock);
    const parseArgs = (await import('./parseArgs')).default;
    parseArgs();
    expect(process.exit).toHaveBeenCalledWith(0);
  });

  it('should exit with code 0 when --validate-config is passed', async () => {
    process.argv = ['node', 'opentwig', '--validate-config'];
    const validateConfigMock = vi.fn();
    vi.doMock('../../validateConfig.js', () => validateConfigMock);
    const parseArgs = (await import('./parseArgs')).default;
    parseArgs();
    expect(process.exit).toHaveBeenCalledWith(0);
  });

  it('should exit with code 1 and show error for unknown option', async () => {
    process.argv = ['node', 'opentwig', '--unknown'];
    const parseArgs = (await import('./parseArgs')).default;
    parseArgs();
    expect(process.exit).toHaveBeenCalledWith(1);
    expect(mockConsoleError).toHaveBeenCalledWith(
      'Unknown option: --unknown'
    );
    expect(mockConsoleError).toHaveBeenCalledWith(
      'Use --help for usage information.'
    );
  });
});
