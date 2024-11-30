import formData from 'form-data';
import Mailgun from 'mailgun.js';
import type { EmailOptions } from '@/types/email';
import { mailgunConfig, mailgunDomain, defaultFromEmail } from './mailgun.config';

const mailgun = new Mailgun(formData);
const mg = mailgun.client(mailgunConfig);

export class EmailService {
  private static instance: EmailService;
  private templates: Map<string, EmailOptions>;

  private constructor() {
    this.templates = new Map();
    this.initializeTemplates();
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  private initializeTemplates() {
    // Welcome email template
    this.templates.set('welcome', {
      subject: 'Welcome to {{appName}}!',
      html: `
        <h1>Welcome to {{appName}}!</h1>
        <p>Hi {{name}},</p>
        <p>Thanks for signing up. We're excited to have you on board!</p>
        <p>Best regards,<br>The {{appName}} Team</p>
      `,
      text: `
        Welcome to {{appName}}!
        
        Hi {{name}},
        
        Thanks for signing up. We're excited to have you on board!
        
        Best regards,
        The {{appName}} Team
      `,
    });

    // Password reset template
    this.templates.set('password-reset', {
      subject: 'Reset your password',
      html: `
        <h1>Password Reset Request</h1>
        <p>Hi {{name}},</p>
        <p>Click the link below to reset your password:</p>
        <p><a href="{{resetLink}}">Reset Password</a></p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Best regards,<br>The {{appName}} Team</p>
      `,
      text: `
        Password Reset Request
        
        Hi {{name}},
        
        Click the link below to reset your password:
        {{resetLink}}
        
        If you didn't request this, please ignore this email.
        
        Best regards,
        The {{appName}} Team
      `,
    });
  }

  private replaceTemplateVars(content: string, vars: Record<string, unknown>): string {
    return content.replace(/\{\{(\w+)\}\}/g, (match, key) => 
      String(vars[key] || match)
    );
  }

  private async processTemplate(
    templateId: string,
    vars: Record<string, unknown>
  ): Promise<{ subject: string; html: string; text: string }> {
    const template = this.templates.get(templateId);
    if (!template) {
      throw new Error(`Template ${templateId} not found`);
    }

    return {
      subject: this.replaceTemplateVars(template.subject, vars),
      html: this.replaceTemplateVars(template.html || '', vars),
      text: this.replaceTemplateVars(template.text || '', vars),
    };
  }

  public async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      let messageData: EmailOptions = {
        to: options.to,
        from: options.from || defaultFromEmail,
        subject: options.subject,
        html: options.html,
        text: options.text,
      };

      // If template is specified, process it
      if (options.template) {
        const processed = await this.processTemplate(
          options.template,
          options.templateVars || {}
        );
        messageData = {
          ...messageData,
          ...processed,
        };
      }

      // Send email using Mailgun
      await mg.messages.create(mailgunDomain, {
        ...messageData,
        attachments: options.attachments,
      });

      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }
}

// Export singleton instance
export const emailService = EmailService.getInstance(); 