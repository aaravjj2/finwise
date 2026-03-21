import { describe, expect, it } from 'vitest'
import {
  REMITTANCE_CORRIDORS,
  calculateAnnualSavingsBySwitching,
  calculateRecipientAmount,
  sortProvidersByRecipientGets
} from '@/lib/data/remittance'

describe('remittance helpers', () => {
  it('calculates recipient amount with percentage or min fee', () => {
    const provider = REMITTANCE_CORRIDORS[0]!.providers[0]!
    const recipient = calculateRecipientAmount(100, provider)
    expect(recipient).toBeLessThan(100)
    expect(recipient).toBeGreaterThan(0)
  })

  it('sorts providers by recipient amount descending', () => {
    const providers = REMITTANCE_CORRIDORS[0]!.providers
    const sorted = sortProvidersByRecipientGets(100, providers)
    const first = calculateRecipientAmount(100, sorted[0]!)
    const last = calculateRecipientAmount(100, sorted[sorted.length - 1]!)
    expect(first).toBeGreaterThanOrEqual(last)
  })

  it('calculates annual savings by switching providers', () => {
    const providers = REMITTANCE_CORRIDORS[0]!.providers
    const expensive = providers.find((p) => p.name === 'MoneyGram') ?? providers[0]!
    const cheap = providers.find((p) => p.name === 'Wise') ?? providers[0]!
    const savings = calculateAnnualSavingsBySwitching(100, expensive, cheap)
    expect(savings).toBeGreaterThan(0)
  })
})
