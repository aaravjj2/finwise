import { describe, expect, it } from 'vitest'
import { POST } from '@/app/api/chat/route'

describe('chat api', () => {
  it('returns streaming response for valid input', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'How do I save money?', language: 'en' })
    })

    const res = await POST(req)
    expect(res.ok).toBe(true)
    expect(res.headers.get('content-type')).toContain('text/plain')

    const text = await res.text()
    expect(text.length).toBeGreaterThan(50)
  })

  it('returns 400 for malformed JSON', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'not json'
    })

    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 400 for empty message', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: '' })
    })

    const res = await POST(req)
    expect(res.status).toBe(400)
  })
})
