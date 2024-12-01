import { NextResponse } from 'next/server';

import { emailService } from '@/lib/email-service';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { to, template, templateVars } = body;

    if (!to || !template) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const success = await emailService.sendEmail({
      to,
      subject: 'Important Message',
      template,
      templateVars,
    });

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
