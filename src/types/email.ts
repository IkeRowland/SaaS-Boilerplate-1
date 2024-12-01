import type { Buffer } from 'node:buffer';

export type EmailTemplate = {
  id: string;
  name: string;
  subject: string;
  html: string;
  text: string;
};

export type EmailAttachment = {
  filename: string;
  data: Buffer | string;
  contentType?: string;
};

export type EmailOptions = {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  template?: string;
  templateVars?: Record<string, unknown>;
  attachments?: EmailAttachment[];
  from?: string;
  replyTo?: string;
};
