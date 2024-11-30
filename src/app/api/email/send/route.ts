import { NextResponse } from 'next/server';
import { emailService } from '@/lib/email-service';

export async function POST(req: Request) {
  try {
    const { to, template, templateVars } = await req.json();

    const sent = await emailService.sendEmail({
      to,
      template,
      templateVars: {
        appName: 'Your SaaS',
        ...templateVars,
      },
    });

    if (!sent) {
      return new NextResponse('Failed to send email', { status: 500 });
    }

    return new NextResponse('Email sent successfully', { status: 200 });
  } catch (error) {
    console.error('Email API error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
} 