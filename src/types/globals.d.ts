declare global {
  namespace NodeJS {
    type ProcessEnv = {
      MONGODB_URI: string;
      NEXT_PUBLIC_APP_URL: string;
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
      CLERK_SECRET_KEY: string;
      STRIPE_SECRET_KEY: string;
      STRIPE_WEBHOOK_SECRET: string;
      LEMON_SQUEEZY_API_KEY: string;
      LEMON_SQUEEZY_WEBHOOK_SECRET: string;
      PAYSTACK_SECRET_KEY: string;
      MAILGUN_API_KEY: string;
      MAILGUN_DOMAIN: string;
      MAILGUN_FROM_EMAIL?: string;
    };
  }
}

export {};
