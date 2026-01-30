import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  // Test files pattern
  files: 'tests/integration/**/*.test.js',
  
  // Browsers to test in
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    playwrightLauncher({ product: 'firefox' })
    // Uncomment to test in WebKit (Safari)
    // playwrightLauncher({ product: 'webkit' })
  ],
  
  // Enable test coverage
  coverage: true,
  
  // Coverage configuration
  coverageConfig: {
    reportDir: 'coverage-integration',
    reporters: ['lcov', 'text-summary'],
    threshold: {
      statements: 70,
      branches: 60,
      functions: 70,
      lines: 70
    },
    exclude: [
      'tests/**/*',
      'node_modules/**/*',
      '**/*.test.js',
      '**/*.config.js'
    ]
  },
  
  // Node resolution for imports
  nodeResolve: true,
  
  // Test framework configuration
  testFramework: {
    config: {
      timeout: 5000,
      retries: 1
    }
  },
  
  // Plugins (if needed)
  plugins: [],
  
  // Middleware (if needed for serving assets)
  middleware: [],
  
  // Test groups for selective testing
  groups: [
    {
      name: 'a11y',
      files: 'tests/integration/**/*.a11y.test.js'
    },
    {
      name: 'visual',
      files: 'tests/integration/**/*.visual.test.js'
    }
  ],
  
  // Filter browser logs
  filterBrowserLogs: (log) => {
    // Filter out common non-error logs
    if (log.type === 'warning') return false;
    return true;
  }
};
