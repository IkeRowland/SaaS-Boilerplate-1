import { emailService } from '@/lib/email-service';

export async function sendWelcomeEmail(user: { email: string; name: string }) {
  return emailService.sendEmail({
    to: user.email,
    template: 'welcome',
    templateVars: {
      appName: 'Your SaaS',
      name: user.name,
    },
  });
} 