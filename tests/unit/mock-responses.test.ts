import { describe, expect, it } from 'vitest'
import { getMockResponse } from '@/lib/ai/mock-responses'

describe('getMockResponse', () => {
  it('returns savings response for savings keywords', () => {
    const response = getMockResponse('How do I open a savings account?', 'en')
    expect(response.toLowerCase()).toContain('savings account')
    expect(response.toLowerCase()).toContain('interest')
  })

  it('returns loan response with APR conversion when weekly rate provided', () => {
    const response = getMockResponse('I got a loan offer at 5% per week', 'en')
    expect(response).toContain('260%')
    expect(response.toLowerCase()).toContain('apr')
  })

  it('returns budget response with 50/30/20', () => {
    const response = getMockResponse('Help me build a budget', 'en')
    expect(response).toContain('50%')
    expect(response).toContain('30%')
    expect(response).toContain('20%')
  })

  it('returns scam response with red flag guidance', () => {
    const response = getMockResponse('This seems like a scam', 'en')
    expect(response.toLowerCase()).toContain('warning')
    expect(response.toLowerCase()).toContain('scam')
  })

  it('returns fallback for unknown questions', () => {
    const response = getMockResponse('Can you explain inflation index weighting?', 'en')
    expect(response.toLowerCase()).toContain('which country')
  })

  it('always returns a non-empty response under 800 words', () => {
    const response = getMockResponse('hello', 'en')
    expect(response.trim().length).toBeGreaterThan(0)
    expect(response.split(/\s+/).length).toBeLessThan(800)
  })
})
