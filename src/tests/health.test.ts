import { describe, expect, it } from 'vitest';

import { GET } from '@/app/api/health/route';

describe('Health Check API', () => {
  it('should return healthy status', async () => {
    const response = await GET();
    const responseData = await (response as unknown as Response).json();

    expect((response as unknown as Response).status).toBe(200);
    expect(responseData.status).toBe('healthy');
    expect(responseData.services.database).toBe('connected');
  });
});
