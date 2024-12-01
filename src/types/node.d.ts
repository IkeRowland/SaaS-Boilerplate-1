declare namespace NodeJS {
  type ProcessEnv = {
    NODE_ENV: 'development' | 'production' | 'test';
    MONGODB_URI: string;
    NEXT_PUBLIC_APP_URL: string;

    // Auth (Clerk)
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
    CLERK_SECRET_KEY: string;
    CLERK_JWT_KEY: string;

    // Payments
    STRIPE_SECRET_KEY: string;
    STRIPE_WEBHOOK_SECRET: string;
    STRIPE_PRICE_ID: string;
    LEMON_SQUEEZY_API_KEY: string;
    LEMON_SQUEEZY_WEBHOOK_SECRET: string;
    LEMON_SQUEEZY_STORE_ID: string;
    LEMON_SQUEEZY_VARIANT_ID: string;
    PAYSTACK_SECRET_KEY: string;
    PAYSTACK_PUBLIC_KEY: string;

    // Email
    MAILGUN_API_KEY: string;
    MAILGUN_DOMAIN: string;
    MAILGUN_FROM_EMAIL: string;

    // Analytics
    NEXT_PUBLIC_POSTHOG_KEY: string;
    NEXT_PUBLIC_POSTHOG_HOST: string;
    NEXT_PUBLIC_GA_MEASUREMENT_ID: string;

    // Docker
    DOCKER_MONGODB_PORT: string;
    DOCKER_APP_PORT: string;
  };
}

// Add Buffer to global scope
declare global {
  // eslint-disable-next-line no-var
  var Buffer: {
    from(str: string, encoding?: string): Buffer;
    alloc(size: number): Buffer;
    isBuffer(obj: any): boolean;
  } & { prototype: Buffer };

  interface Buffer {
    toString(encoding?: string): string;
    length: number;
  }
}

export {};
