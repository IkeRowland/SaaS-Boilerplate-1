import type { Mailgun } from 'mailgun.js';

export const mailgunConfig = {
  username: 'api',
  key: process.env.MAILGUN_API_KEY!,
} satisfies Parameters<Mailgun['client']>[0];

export const mailgunDomain = process.env.MAILGUN_DOMAIN!;
export const defaultFromEmail
  = process.env.MAILGUN_FROM_EMAIL || `noreply@${mailgunDomain}`;
