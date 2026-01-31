import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Use happy-dom for faster DOM simulation
    environment: 'happy-dom',
    
    // Enable global test APIs (describe, it, expect)
    globals: true,
    
    // Setup files to run before tests
    setupFiles: ['./tests/vitest-setup.js'],
    
    // Test file patterns - co-located with components
    include: [
      'components/**/*.test.js',
      'components/**/*.spec.js'
    ],
    
    // Exclude patterns
    exclude: [
      'node_modules',
      'dist',
      '.idea',
      '.git',
      '.cache'
    ],
    
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      include: [
        'components/**/*.js'
      ],
      exclude: [
        'components/index.js',
        'components/shared.js',
        'tests/**/*',
        '**/*.test.js',
        '**/*.config.js'
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 70,
        statements: 80
      }
    },
    
    // Test timeout
    testTimeout: 5000,
    
    // Enable verbose output
    verbose: true,
    
    // Isolate tests for clean state
    isolate: true,
    
    // Retry failed tests (useful for flaky DOM tests)
    retry: 1
  },
  
  resolve: {
    // Ensure browser conditions are used for imports
    conditions: ['browser'],
    
    // Alias for cleaner imports
    alias: {
      '@components': '/components',
      '@tests': '/tests'
    }
  },
  
  // ESBuild configuration
  esbuild: {
    target: 'es2020',
    format: 'esm'
  }
});
