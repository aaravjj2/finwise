import { describe, expect, it, vi } from 'vitest'

vi.mock('@/app/api/v1/_lib/auth', () => {
  return {
    verifyApiKey: vi.fn(async () => ({
      ok: true,
      key: {
        id: 'key_1',
        organization_name: 'Test Org',
        key_hash: 'hash',
        key_prefix: 'fw_live_',
        tier: 'starter',
        requests_per_hour: 100,
        total_requests: 0,
      },
    })),
    okResponse: (data: unknown) => Response.json({ success: true, data }),
    errorResponse: (status: number, error: string) => Response.json({ success: false, error }, { status }),
  }
})

import { POST as assessPost } from '@/app/api/v1/assess/route'
import { POST as assignPost } from '@/app/api/v1/assign/route'
import { GET as scoreGet } from '@/app/api/v1/score/[phone]/route'
import { GET as progressGet } from '@/app/api/v1/progress/[phone]/route'

describe('b2b API routes', () => {
  it('assess returns literacy score and recommendations', async () => {
    const req = new Request('http://localhost/api/v1/assess', {
      method: 'POST',
      body: JSON.stringify({ phone: '+2348012345678' }),
      headers: { 'content-type': 'application/json' },
    })

    const res = await assessPost(req)
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body.success).toBe(true)
    expect(typeof body.data.literacy_score).toBe('number')
    expect(Array.isArray(body.data.recommended_modules)).toBe(true)
  })

  it('assign validates payload', async () => {
    const invalidReq = new Request('http://localhost/api/v1/assign', {
      method: 'POST',
      body: JSON.stringify({ phone: '1', modules: [] }),
      headers: { 'content-type': 'application/json' },
    })

    const invalidRes = await assignPost(invalidReq)
    expect(invalidRes.status).toBe(400)

    const validReq = new Request('http://localhost/api/v1/assign', {
      method: 'POST',
      body: JSON.stringify({ phone: '+2348012345678', modules: ['savings-basics'] }),
      headers: { 'content-type': 'application/json' },
    })

    const validRes = await assignPost(validReq)
    expect(validRes.status).toBe(200)
    const body = await validRes.json()
    expect(body.data.assigned).toEqual(['savings-basics'])
  })

  it('score and progress endpoints return deterministic payloads', async () => {
    const scoreRes = await scoreGet(new Request('http://localhost/api/v1/score/123'), {
      params: { phone: encodeURIComponent('+254712345678') },
    })
    expect(scoreRes.status).toBe(200)

    const scoreBody = await scoreRes.json()
    expect(typeof scoreBody.data.literacy_score).toBe('number')

    const progressRes = await progressGet(new Request('http://localhost/api/v1/progress/123'), {
      params: { phone: encodeURIComponent('+254712345678') },
    })
    expect(progressRes.status).toBe(200)

    const progressBody = await progressRes.json()
    expect(Array.isArray(progressBody.data.completed)).toBe(true)
    expect(Array.isArray(progressBody.data.pending)).toBe(true)
  })
})
