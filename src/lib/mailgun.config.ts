import type { MailgunClientOptions } from 'mailgun.js';

if (!process.env.MAILGUN_API_KEY) {
  throw new Error('MAILGUN_API_KEY is not set');
}

if (!process.env.MAILGUN_DOMAIN) {
  throw new Error('MAILGUN_DOMAIN is not set');
}

export const mailgunConfig: MailgunClientOptions = {
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
  url: 'https://api.eu.mailgun.net', // or 'https://api.mailgun.net' for US
};

export const mailgunDomain = process.env.MAILGUN_DOMAIN;
export const defaultFromEmail = process.env.MAILGUN_FROM_EMAIL || `noreply@${mailgunDomain}`; 