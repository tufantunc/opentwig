module.exports = {
  test: {
    environment: 'node',
    include: ['**/*.test.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json'],
      exclude: ['node_modules/', 'dist/', '**/*.test.js', 'test-og.js']
    }
  }
};
