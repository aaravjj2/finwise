export function buildScamDetectionPrompt(offer: string, country: string): string {
  return `You are a financial fraud analyst specializing in emerging market scams.

Analyze this financial offer or message from someone in ${country}:

"${offer}"

Identify ALL red flags present. Common red flags include:
- Guaranteed returns (no legitimate investment guarantees returns)
- Pressure to act immediately or "limited time only"
- Interest rates above 60% APR annually
- Requirement to pay a fee to receive a loan
- Vague company identity or no registration number
- Unusual payment methods requested
- Promises that sound too good to be true
- Requests for unusual personal information

Respond ONLY with this JSON structure, no other text:
{
  "risk_level": "low" | "medium" | "high" | "very_high",
  "risk_score": 0-100,
  "red_flags": [
    { "flag": "description", "explanation": "why this is suspicious" }
  ],
  "legitimate_indicators": ["any legitimate signs"],
  "recommendation": "what the user should do",
  "summary": "1-2 sentence plain language explanation"
}`;
}

export function buildLoanAnalysisPrompt(
  principal: number,
  interestRate: number,
  term: number,
  fees: number,
  country: string
): string {
  return `Analyze this loan offer for a borrower in ${country}:

Principal: ${principal}
Stated Interest Rate: ${interestRate}%
Term: ${term} months
Additional Fees: ${fees}

Calculate:
1. True APR (including all fees)
2. Total cost of the loan
3. Monthly payment amount
4. Whether this is a fair rate for the region

Respond ONLY with this JSON structure:
{
  "true_apr": number,
  "total_cost": number,
  "monthly_payment": number,
  "total_interest": number,
  "assessment": "good" | "fair" | "expensive" | "predatory",
  "explanation": "plain language explanation",
  "recommendation": "what the user should do"
}`;
}
