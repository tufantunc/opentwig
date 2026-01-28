import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('parseArgs', () => {
    let originalArgv;
    let mockExit;
    let mockConsoleLog;
    let mockConsoleError;
    let mockShowHelp;
    let mockCreateSampleConfig;
    let mockValidateConfig;

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

    it('should output help text with OpenTwig branding', () => {
        process.argv = ['node', 'index.js', '--help'];
        const parseArgs = require('./parseArgs');
        parseArgs();

        expect(mockConsoleLog).toHaveBeenCalled();
        const output = mockConsoleLog.mock.calls[0][0];
        expect(output).toContain('OpenTwig');
        expect(output).toContain('--help');
    });

    it('should output help with usage information', () => {
        process.argv = ['node', 'index.js', '--help'];
        const parseArgs = require('./parseArgs');
        parseArgs();

        expect(mockConsoleLog).toHaveBeenCalled();
        const output = mockConsoleLog.mock.calls[0][0];
        expect(output).toContain('USAGE');
        expect(output).toContain('npx opentwig');
    });

    it('should include examples', () => {
        process.argv = ['node', 'index.js', '--help'];
        const parseArgs = require('./parseArgs');
        parseArgs();

        expect(mockConsoleLog).toHaveBeenCalled();
        const output = mockConsoleLog.mock.calls[0][0];
        expect(output).toContain('EXAMPLES');
    });

    it('should exit with code 0 when --help is passed', () => {
        process.argv = ['node', 'index.js', '--help'];
        const parseArgs = require('./parseArgs');
        parseArgs();

        expect(mockExit).toHaveBeenCalledWith(0);
    });

    it('should include --port option in help', () => {
        process.argv = ['node', 'index.js', '--help'];
        const parseArgs = require('./parseArgs');
        parseArgs();

        expect(mockConsoleLog).toHaveBeenCalled();
        const output = mockConsoleLog.mock.calls[0][0];
        expect(output).toContain('--port');
        expect(output).toContain('-p');
    });

    it('should include examples with --port', () => {
        process.argv = ['node', 'index.js', '--help'];
        const parseArgs = require('./parseArgs');
        parseArgs();

        expect(mockConsoleLog).toHaveBeenCalled();
        const output = mockConsoleLog.mock.calls[0][0];
        expect(output).toContain('--live --port 3001');
        expect(output).toContain('-p 9000');
    });

    it('should parse --port argument correctly', () => {
        process.argv = ['node', 'index.js', '--live', '--port', '8080'];
        const parseArgs = require('./parseArgs');
        const result = parseArgs();

        expect(result.mode).toBe('live');
        expect(result.port).toBe(8080);
    });

    it('should parse -p argument correctly', () => {
        process.argv = ['node', 'index.js', '--live', '-p', '9000'];
        const parseArgs = require('./parseArgs');
        const result = parseArgs();

        expect(result.mode).toBe('live');
        expect(result.port).toBe(9000);
    });

    it('should return null port when not specified', () => {
        process.argv = ['node', 'index.js', '--live'];
        const parseArgs = require('./parseArgs');
        const result = parseArgs();

        expect(result.mode).toBe('live');
        expect(result.port).toBeNull();
    });

    it('should validate port number is valid', () => {
        process.argv = ['node', 'index.js', '--live', '--port', '3000'];
        const parseArgs = require('./parseArgs');
        const result = parseArgs();

        expect(result.port).toBe(3000);
    });

    it('should validate port number is valid (min)', () => {
        process.argv = ['node', 'index.js', '--live', '--port', '1'];
        const parseArgs = require('./parseArgs');
        const result = parseArgs();

        expect(result.port).toBe(1);
    });

    it('should validate port number is valid (max)', () => {
        process.argv = ['node', 'index.js', '--live', '--port', '65535'];
        const parseArgs = require('./parseArgs');
        const result = parseArgs();

        expect(result.port).toBe(65535);
    });

    it('should reject invalid port number (too low)', () => {
        process.argv = ['node', 'index.js', '--live', '--port', '0'];
        const parseArgs = require('./parseArgs');
        const result = parseArgs();

        expect(result.port).toBe(1);
    });

    it('should validate port number is valid (max)', () => {
        process.argv = ['node', 'index.js', '--live', '--port', '65535'];
        const parseArgs = require('./parseArgs');
        const result = parseArgs();

        expect(result.port).toBe(65535);
    });

    it('should reject invalid port number (too high)', () => {
        process.argv = ['node', 'index.js', '--live', '--port', '99999'];
        const parseArgs = require('./parseArgs');
        parseArgs();

        expect(mockConsoleError).toHaveBeenCalledWith('Invalid port number: 99999');
        expect(mockExit).toHaveBeenCalledWith(1);
    });

    it('should reject invalid port number (NaN)', () => {
        process.argv = ['node', 'index.js', '--live', '--port', 'abc'];
        const parseArgs = require('./parseArgs');
        parseArgs();

        expect(mockConsoleError).toHaveBeenCalledWith('Invalid port number: abc');
        expect(mockExit).toHaveBeenCalledWith(1);
    });

    it('should reject invalid port number (too high)', () => {
        process.argv = ['node', 'index.js', '--live', '--port', '99999'];
        const parseArgs = require('./parseArgs');
        parseArgs();

        expect(mockConsoleError).toHaveBeenCalledWith('Invalid port number: 99999');
        expect(mockExit).toHaveBeenCalledWith(1);
    });

    it('should reject invalid port number (NaN)', () => {
        process.argv = ['node', 'index.js', '--live', '--port', 'abc'];
        const parseArgs = require('./parseArgs');
        parseArgs();

        expect(mockConsoleError).toHaveBeenCalledWith('Invalid port number: abc');
        expect(mockExit).toHaveBeenCalledWith(1);
    });
});
