export interface RemittanceProvider {
  name: string
  fee_pct: number
  min_fee: number
  delivery: string
  mobile_money: boolean
}

export interface RemittanceCorridor {
  from: string
  to: string
  providers: RemittanceProvider[]
}

export const REMITTANCE_CORRIDORS: RemittanceCorridor[] = [
  {
    from: 'NG',
    to: 'GB',
    providers: [
      { name: 'Wise', fee_pct: 0.6, min_fee: 0.5, delivery: '1 business day', mobile_money: false },
      { name: 'WorldRemit', fee_pct: 1.5, min_fee: 2, delivery: '1-2 hours', mobile_money: true },
      { name: 'Western Union', fee_pct: 3.9, min_fee: 3, delivery: 'Minutes', mobile_money: false },
      { name: 'MoneyGram', fee_pct: 4.2, min_fee: 3.5, delivery: 'Minutes', mobile_money: false }
    ]
  },
  {
    from: 'IN',
    to: 'US',
    providers: [
      { name: 'Wise', fee_pct: 0.5, min_fee: 0.5, delivery: '1-2 days', mobile_money: false },
      { name: 'Remitly', fee_pct: 0.7, min_fee: 1, delivery: 'Minutes', mobile_money: false },
      { name: 'Xoom', fee_pct: 2.1, min_fee: 2.5, delivery: '1-3 days', mobile_money: false },
      { name: 'Western Union', fee_pct: 3.5, min_fee: 3, delivery: 'Minutes', mobile_money: false }
    ]
  }
]

export function calculateRecipientAmount(amount: number, provider: RemittanceProvider): number {
  const fee = Math.max(provider.min_fee, amount * (provider.fee_pct / 100))
  return Number((amount - fee).toFixed(2))
}

export function sortProvidersByRecipientGets(amount: number, providers: RemittanceProvider[]): RemittanceProvider[] {
  return [...providers].sort((a, b) => calculateRecipientAmount(amount, b) - calculateRecipientAmount(amount, a))
}

export function calculateAnnualSavingsBySwitching(amount: number, expensive: RemittanceProvider, cheap: RemittanceProvider): number {
  const monthlySavings = calculateRecipientAmount(amount, cheap) - calculateRecipientAmount(amount, expensive)
  return Number((monthlySavings * 12).toFixed(2))
}
