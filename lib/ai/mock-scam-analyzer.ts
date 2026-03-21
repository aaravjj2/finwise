export interface ScamAnalysisResult {
  risk_level: 'low' | 'medium' | 'high' | 'very_high'
  risk_score: number
  red_flags: Array<{ flag: string; explanation: string }>
  legitimate_indicators: string[]
  recommendation: string
  summary: string
}

export function analyzeScamRisk(text: string): ScamAnalysisResult {
  const t = text.toLowerCase()
  const red_flags: ScamAnalysisResult['red_flags'] = []
  const legitimate_indicators: string[] = []
  let score = 0

  if (/guaranteed|no risk|100% safe|sure profit/.test(t)) {
    red_flags.push({
      flag: 'Guaranteed returns or risk-free claims',
      explanation:
        'No legitimate investment or loan can guarantee returns. This language is used to attract victims who do not know that all finance carries risk.'
    })
    score += 35
  }

  if (
    /pay.*fee|upfront.*fee|processing fee|registration fee|admin fee|send.*first|transfer.*first/.test(t) &&
    /loan|receive|get|approved|release|funds/.test(t)
  ) {
    red_flags.push({
      flag: 'Fee required before receiving money',
      explanation:
        'This is the most common loan scam pattern. Legitimate lenders deduct fees from the loan disbursement and never ask you to send money first in order to receive money.'
    })
    score += 55
  }

  if (/limited time|act now|expires|24 hours|today only|urgent|last chance/.test(t)) {
    red_flags.push({
      flag: 'Artificial time pressure',
      explanation:
        'Creating urgency prevents you from thinking carefully, consulting others, or verifying the company. Legitimate financial institutions do not pressure you to decide immediately.'
    })
    score += 20
  }

  if (/\d+%\s*(per|a|every)\s*(day|week|month)/.test(t)) {
    const match = t.match(/(\d+(?:\.\d+)?)\s*%\s*(?:per|a|every)\s*(day|week|month)/)
    if (match?.[1] && match?.[2]) {
      const rate = Number.parseFloat(match[1])
      const period = match[2]
      const aprMap: Record<string, number> = { day: 365, week: 52, month: 12 }
      const apr = rate * (aprMap[period] || 12)
      if (apr > 100) {
        red_flags.push({
          flag: `Interest rate of ${rate}% per ${period} = ${apr.toFixed(0)}% APR`,
          explanation:
            `Annual Percentage Rate above 100% is predatory lending. In many countries, legal limits are far lower. At ${apr.toFixed(0)}% APR, a $100 loan can cost $${apr.toFixed(0)} in yearly interest.`
        })
        score += 35
      }
    }
  }

  const hasAddress = /\d+\s+\w+\s+(street|road|avenue|lane|blvd|plaza|house)/i.test(text)
  const hasRegNumber = /reg(?:istration)?\s*(?:no|number|#)[\s:]*[A-Z0-9]{5,}/i.test(text)

  if (!hasAddress && !hasRegNumber) {
    red_flags.push({
      flag: 'No verifiable physical address or registration number',
      explanation:
        'Every legitimate financial institution has a license or registration number that can be checked with the regulator.'
    })
    score += 20
  }

  if (/whatsapp|telegram|dm me|message me|chat.*privately/.test(t) && /loan|invest|money|fund/.test(t)) {
    red_flags.push({
      flag: 'Requests communication on private messaging apps',
      explanation:
        'Moving financial transactions to private chat apps removes audit trails and makes fraud harder to dispute.'
    })
    score += 25
  }

  if (hasRegNumber) {
    legitimate_indicators.push('Contains what appears to be a registration number (verify on the official regulator website)')
    score -= 10
  }
  if (/central bank|cbn|rbi|bank of ghana|bangko sentral|bank negara/i.test(text)) {
    legitimate_indicators.push('References a recognized regulatory body (verify independently)')
    score -= 10
  }
  if (hasAddress) {
    legitimate_indicators.push('Includes a physical address (verify before transacting)')
    score -= 5
  }

  score = Math.max(0, Math.min(100, score))

  const risk_level: ScamAnalysisResult['risk_level'] =
    score >= 75 ? 'very_high' : score >= 50 ? 'high' : score >= 25 ? 'medium' : 'low'

  const recommendationMap: Record<ScamAnalysisResult['risk_level'], string> = {
    very_high:
      'Do NOT proceed. Do not send any money. Block this contact. If you already sent money, report to your national financial crimes authority immediately.',
    high:
      'Stop and verify before doing anything. Do not send money until you have independently confirmed this company is registered with your national financial regulator.',
    medium:
      'Proceed with caution. Get everything in writing. Verify registration independently. Never pay a fee before receiving funds.',
    low:
      'This appears relatively low risk, but always get terms in writing and verify registration before signing anything.'
  }

  const summaryMap: Record<ScamAnalysisResult['risk_level'], string> = {
    very_high: `This offer has ${red_flags.length} serious red flags and scores ${score}/100. It matches known scam patterns closely.`,
    high: `This offer has ${red_flags.length} warning signs and scores ${score}/100. Independent verification is essential before proceeding.`,
    medium: `This offer has ${red_flags.length} caution flags and scores ${score}/100. It may be legitimate but requires careful verification.`,
    low: `This offer appears relatively low risk (${score}/100) with ${red_flags.length} minor concerns. Standard due diligence applies.`
  }

  return {
    risk_level,
    risk_score: score,
    red_flags,
    legitimate_indicators,
    recommendation: recommendationMap[risk_level],
    summary: summaryMap[risk_level]
  }
}
