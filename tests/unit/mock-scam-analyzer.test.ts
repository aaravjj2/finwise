import { describe, expect, it } from 'vitest'
import { analyzeScamRisk } from '@/lib/ai/mock-scam-analyzer'

describe('analyzeScamRisk', () => {
  it('flags advance fee scams as very high risk', () => {
    const result = analyzeScamRisk('Pay a processing fee first to receive your guaranteed loan approval today')
    expect(result.risk_level).toBe('very_high')
    expect(result.risk_score).toBeGreaterThanOrEqual(75)
  })

  it('flags guaranteed returns as high risk or above', () => {
    const result = analyzeScamRisk('Guaranteed returns with no risk and sure profit')
    expect(['high', 'very_high']).toContain(result.risk_level)
  })

  it('keeps normal formal offer in low or medium risk', () => {
    const result = analyzeScamRisk('Registered lender. 24% annual interest. Office at 12 Main Road. Call +2348012345678')
    expect(['low', 'medium']).toContain(result.risk_level)
  })

  it('keeps score between 0 and 100', () => {
    const result = analyzeScamRisk('random text')
    expect(result.risk_score).toBeGreaterThanOrEqual(0)
    expect(result.risk_score).toBeLessThanOrEqual(100)
  })

  it('returns red flags array', () => {
    const result = analyzeScamRisk('act now guaranteed return pay fee first')
    expect(Array.isArray(result.red_flags)).toBe(true)
    expect(result.red_flags.length).toBeGreaterThan(0)
  })
})
