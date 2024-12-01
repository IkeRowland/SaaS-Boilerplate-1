import { defineConfig } from 'checkly';
import { RetryStrategyBuilder } from 'checkly/constructs';

const retryStrategy = RetryStrategyBuilder.fixedStrategy({
  baseBackoffSeconds: 60,
  maxRetries: 3,
  sameRegion: true,
});

const config = defineConfig({
  projectName: 'SaaS-Boilerplate',
  logicalId: 'saas-boilerplate-monitoring',
  repoUrl: 'https://github.com/your-org/saas-boilerplate',
  checks: {
    locations: ['us-east-1', 'eu-west-1'],
    tags: ['website', 'api'],
    runtimeId: '2023.09',
    browserChecks: {
      retryStrategy,
      frequency: Frequency.EVERY_24H,
      testMatch: '**/tests/e2e/**/*.check.e2e.ts',
    },
    apiChecks: {
      retryStrategy,
    },
  },
  cli: {
    runLocation: 'eu-west-1',
    reporters: ['list'],
  },
  environmentVariables: {
    ENVIRONMENT: 'production',
    PRODUCTION_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://your-production-url.com',
  },
  alertChannels: {
    email: [
      {
        address: process.env.ALERT_EMAIL_ADDRESS || 'alerts@your-domain.com',
        sendDegraded: true,
        sendFailure: true,
        sendRecovery: true,
        sslExpiry: true,
        sslExpiryThreshold: 30,
      },
    ],
  },
});

export default config;
