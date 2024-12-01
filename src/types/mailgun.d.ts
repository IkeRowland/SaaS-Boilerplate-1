declare module 'mailgun.js' {
  import type { Buffer } from 'node:buffer';

  import type FormData from 'form-data';

  type MailgunClient = {
    messages: {
      create: (
        domain: string,
        data: {
          to: string | string[];
          from: string;
          subject: string;
          html?: string;
          text?: string;
          attachments?: Array<{
            filename: string;
            data: Buffer | string;
            contentType?: string;
          }>;
        },
      ) => Promise<{ id: string; message: string }>;
    };
  };

  export default class Mailgun {
    constructor(formData: typeof FormData);
    client(config: { username: string; key: string }): MailgunClient;
  }
}
