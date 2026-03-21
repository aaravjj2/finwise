import { describe, expect, it } from 'vitest'
import { calculateHealthScore } from '@/lib/health-score'

describe('calculateHealthScore', () => {
  it('returns 0 for no income baseline with no activity', () => {
    const score = calculateHealthScore({
      monthlyIncome: 0,
      monthlyExpenses: 0,
      activeSavingsGoals: 0,
      entriesThisMonth: 0,
      lessonsCompleted: 0
    })
    expect(score).toBe(0)
  })

  it('adds 20 points when has active goals', () => {
    const score = calculateHealthScore({
      monthlyIncome: 100,
      monthlyExpenses: 100,
      activeSavingsGoals: 1,
      entriesThisMonth: 0,
      lessonsCompleted: 0
    })
    expect(score).toBe(20)
  })

  it('caps lesson contribution at 30 points', () => {
    const score = calculateHealthScore({
      monthlyIncome: 100,
      monthlyExpenses: 100,
      activeSavingsGoals: 0,
      entriesThisMonth: 0,
      lessonsCompleted: 6
    })
    expect(score).toBe(30)
  })

  it('caps total score at 100', () => {
    const score = calculateHealthScore({
      monthlyIncome: 1000,
      monthlyExpenses: 0,
      activeSavingsGoals: 2,
      entriesThisMonth: 20,
      lessonsCompleted: 20
    })
    expect(score).toBe(100)
  })

  it('never goes below zero', () => {
    const score = calculateHealthScore({
      monthlyIncome: 100,
      monthlyExpenses: 1000,
      activeSavingsGoals: 0,
      entriesThisMonth: 0,
      lessonsCompleted: 0
    })
    expect(score).toBeGreaterThanOrEqual(0)
  })
})
