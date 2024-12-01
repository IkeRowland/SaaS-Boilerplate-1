import { Buffer } from 'node:buffer';
import crypto from 'node:crypto';

export function verifySignature(payload: string, signature: string): boolean {
  const hmac = crypto.createHmac(
    'sha256',
    process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!,
  );
  const digest = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest),
  );
}
