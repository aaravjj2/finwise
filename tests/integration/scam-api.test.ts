import { describe, expect, it } from 'vitest'
import { POST } from '@/app/api/scam-analyze/route'

describe('scam analyze api', () => {
  it('returns structured result', async () => {
    const req = new Request('http://localhost/api/scam-analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'Pay $150 upfront fee to receive your guaranteed loan' })
    })

    const res = await POST(req)
    expect(res.ok).toBe(true)

    const data = await res.json() as {
      risk_level: string
      risk_score: number
      red_flags: unknown[]
    }

    expect(['low', 'medium', 'high', 'very_high']).toContain(data.risk_level)
    expect(data.risk_score).toBeGreaterThanOrEqual(0)
    expect(data.risk_score).toBeLessThanOrEqual(100)
    expect(Array.isArray(data.red_flags)).toBe(true)
    expect(data.red_flags.length).toBeGreaterThan(0)
  })
})
