import formData from 'form-data';
import Mailgun from 'mailgun.js';

import type { EmailOptions, EmailTemplate } from '@/types/email';

import { defaultFromEmail, mailgunConfig, mailgunDomain } from './mailgun.config';

const mailgun = new Mailgun(formData);
const mg = mailgun.client(mailgunConfig);

type ProcessedTemplate = {
  subject: string;
  html: string;
  text: string;
};

export class EmailService {
  private static instance: EmailService;
  private templates: Map<string, EmailTemplate>;

  private constructor() {
    this.templates = new Map();
    this.initializeTemplates();
  }

  private initializeTemplates() {
    // Welcome email template
    this.templates.set('welcome', {
      id: 'welcome',
      name: 'Welcome Email',
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
      id: 'password-reset',
      name: 'Password Reset',
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
    return content.replace(/\{\{(\w+)\}\}/g, (match, key) => String(vars[key] || match));
  }

  private async processTemplate(
    templateId: string,
    vars: Record<string, unknown>,
  ): Promise<ProcessedTemplate> {
    const template = this.templates.get(templateId);
    if (!template) {
      throw new Error(`Template ${templateId} not found`);
    }

    return {
      subject: this.replaceTemplateVars(template.subject, vars),
      html: this.replaceTemplateVars(template.html, vars),
      text: this.replaceTemplateVars(template.text, vars),
    };
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  public async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const messageData = {
        to: options.to,
        from: options.from || defaultFromEmail,
        subject: options.subject,
        html: options.html,
        text: options.text,
      };

      if (options.template) {
        const processed = await this.processTemplate(
          options.template,
          options.templateVars || {},
        );
        Object.assign(messageData, processed);
      }

      await mg.messages.create(mailgunDomain, {
        ...messageData,
        from: messageData.from!,
        attachments: options.attachments,
      });

      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }
}

export const emailService = EmailService.getInstance();
