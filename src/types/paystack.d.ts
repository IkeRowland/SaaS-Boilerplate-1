declare module 'paystack' {
  export type PaystackTransactionOptions = {
    email: string;
    amount: number;
    userId: string;
    metadata?: Record<string, unknown>;
  };

  export type PaystackTransaction = {
    id: string;
    status: string;
    reference: string;
    amount: number;
    customer: {
      email: string;
      metadata?: Record<string, unknown>;
    };
  };

  export class Paystack {
    constructor(secretKey: string);
    transaction: {
      initialize: (options: PaystackTransactionOptions) => Promise<{
        status: boolean;
        data: {
          authorization_url: string;
          access_code: string;
          reference: string;
        };
      }>;
      verify: (reference: string) => Promise<{
        status: boolean;
        data: PaystackTransaction;
      }>;
    };
  }

  export default Paystack;
}
