export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html: string;
  text: string;
}

export interface EmailAttachment {
  filename: string;
  data: Buffer | string;
  contentType?: string;
}

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  template?: string;
  templateVars?: Record<string, unknown>;
  attachments?: EmailAttachment[];
  from?: string;
  replyTo?: string;
} 