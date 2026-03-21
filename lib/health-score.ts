export interface DashboardScoreData {
  monthlyIncome: number
  monthlyExpenses: number
  activeSavingsGoals: number
  entriesThisMonth: number
  lessonsCompleted: number
}

export function calculateHealthScore(data: DashboardScoreData): number {
  let score = 0

  const savings = data.monthlyIncome - data.monthlyExpenses
  const savingsRate = data.monthlyIncome > 0 ? savings / data.monthlyIncome : 0
  score += Math.min(30, Math.max(0, Math.round(savingsRate * 100)))

  score += data.activeSavingsGoals > 0 ? 20 : 0
  score += Math.min(20, data.entriesThisMonth * 2)
  score += Math.min(30, data.lessonsCompleted * 5)

  return Math.max(0, Math.min(100, score))
}
