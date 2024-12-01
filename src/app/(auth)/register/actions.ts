'use server';

import { siteConfig } from '@/config/site';
import { emailService } from '@/lib/email-service';

export async function sendWelcomeEmail(email: string, name: string) {
  return emailService.sendEmail({
    to: email,
    subject: `Welcome to ${siteConfig.name}!`,
    template: 'welcome',
    templateVars: {
      appName: siteConfig.name,
      name,
    },
  });
}
