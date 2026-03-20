/**
 * Mock scam analyzer for FinWise when no Anthropic API key is available.
 * Uses rule-based pattern matching to detect scam indicators.
 */

export interface ScamAnalysisResult {
  risk_level: 'low' | 'medium' | 'high' | 'very_high';
  risk_score: number; // 0-100
  red_flags: Array<{ flag: string; explanation: string }>;
  legitimate_indicators: string[];
  recommendation: string;
  summary: string;
}

interface RedFlag {
  pattern: RegExp;
  flag: string;
  explanation: string;
  score: number;
}

const RED_FLAG_PATTERNS: RedFlag[] = [
  {
    pattern: /guaranteed\s*(return|profit|income|earning)|no\s*risk|risk[\s-]*free/i,
    flag: 'Guaranteed returns promised',
    explanation: 'No legitimate investment can guarantee profits. All investments carry risk, and anyone promising otherwise is likely running a scam.',
    score: 40
  },
  {
    pattern: /(pay|fee|upfront|advance).{0,30}(loan|receive|get|money)|before\s*(you\s*)?(receive|get)/i,
    flag: 'Upfront fee required',
    explanation: 'Legitimate lenders NEVER require you to pay money upfront to receive a loan. This is the #1 sign of loan fraud.',
    score: 50
  },
  {
    pattern: /(\d{2,3})\s*%\s*(monthly|per\s*month|weekly|per\s*week)/i,
    flag: 'Extremely high interest rate',
    explanation: 'Monthly rates above 10% translate to over 120% APR, which is predatory lending. Legitimate microfinance typically charges 20-40% APR.',
    score: 35
  },
  {
    pattern: /limited\s*time|act\s*now|expires?\s*(soon|today|tomorrow)|urgent|immediately|don'?t\s*miss/i,
    flag: 'High-pressure urgency tactics',
    explanation: 'Legitimate financial offers don\'t pressure you to act immediately. Scammers create false urgency to prevent you from doing research.',
    score: 20
  },
  {
    pattern: /no\s*(physical\s*)?address|no\s*office|online\s*only|whatsapp\s*only/i,
    flag: 'No verifiable business address',
    explanation: 'Legitimate financial companies have physical addresses and are registered with regulators. Being "online only" or "WhatsApp only" is suspicious.',
    score: 15
  },
  {
    pattern: /send\s*(money|bitcoin|crypto)\s*to|wire\s*transfer|western\s*union\s*to/i,
    flag: 'Unusual payment method requested',
    explanation: 'Scammers often request untraceable payment methods like wire transfers or cryptocurrency. Legitimate companies use standard banking.',
    score: 25
  },
  {
    pattern: /double\s*your\s*money|multiply|(\d+)x\s*(return|profit)|forex\s*trading\s*guaranteed/i,
    flag: 'Unrealistic profit claims',
    explanation: 'Claims of doubling your money or guaranteed trading profits are classic scam language. Real investments don\'t promise specific returns.',
    score: 45
  },
  {
    pattern: /secret|exclusive|vip|selected|chosen|lucky\s*winner/i,
    flag: 'Exclusive/secret opportunity language',
    explanation: 'Scammers make you feel special to lower your guard. Legitimate opportunities don\'t need to be "secret" or "exclusive."',
    score: 15
  },
  {
    pattern: /no\s*(credit\s*)?check|bad\s*credit\s*ok|everyone\s*approved/i,
    flag: 'No credit check claims',
    explanation: 'While some legitimate microfinance serves those with limited credit history, promises of "no credit check" combined with other red flags suggest a scam.',
    score: 10
  },
  {
    pattern: /government\s*grant|free\s*money|stimulus|inheritance|lottery/i,
    flag: 'Free money claims',
    explanation: 'No one gives away free money. Government grant scams and fake inheritance notices are extremely common fraud tactics.',
    score: 35
  }
];

const LEGITIMATE_PATTERNS = [
  {
    pattern: /registered|licensed|regulated|central\s*bank|financial\s*authority/i,
    indicator: 'Mentions regulatory registration'
  },
  {
    pattern: /apr\s*\d+%|annual\s*percentage|interest\s*rate\s*clearly/i,
    indicator: 'Clear interest rate disclosure'
  },
  {
    pattern: /terms\s*and\s*conditions|contract|agreement|read\s*carefully/i,
    indicator: 'Mentions formal documentation'
  },
  {
    pattern: /customer\s*service|support\s*line|call\s*us|visit\s*our\s*branch/i,
    indicator: 'Provides contact channels'
  },
  {
    pattern: /collateral|credit\s*history|income\s*verification|employment/i,
    indicator: 'Standard lending requirements mentioned'
  }
];

function getRiskLevel(score: number): 'low' | 'medium' | 'high' | 'very_high' {
  if (score <= 25) return 'low';
  if (score <= 50) return 'medium';
  if (score <= 75) return 'high';
  return 'very_high';
}

function getRecommendation(riskLevel: string, redFlags: Array<{ flag: string }>): string {
  switch (riskLevel) {
    case 'very_high':
      return 'DO NOT proceed with this offer. This shows multiple signs of being a scam. Do not send any money or share personal information. Report this to your local financial regulator.';
    case 'high':
      return 'Be very cautious. This offer has several concerning signs. Before proceeding, verify the company with your country\'s financial regulator. Never pay upfront fees for a loan.';
    case 'medium':
      return 'Proceed with caution. While this might be legitimate, there are some concerning elements. Verify the company is registered and get everything in writing before agreeing to anything.';
    case 'low':
      return 'This appears relatively safe, but always verify independently. Check that the company is registered, understand all terms, and never feel pressured to make quick decisions.';
    default:
      return 'Always verify any financial offer independently before proceeding.';
  }
}

function getSummary(riskLevel: string, flagCount: number): string {
  switch (riskLevel) {
    case 'very_high':
      return `This offer shows ${flagCount} major red flags and is very likely a scam. Protect yourself by avoiding it completely.`;
    case 'high':
      return `This offer has ${flagCount} concerning indicators. There's a significant chance this is fraudulent or predatory.`;
    case 'medium':
      return `This offer has ${flagCount} points of concern. More investigation is recommended before proceeding.`;
    case 'low':
      return `This offer shows few warning signs. However, always verify independently and read all terms carefully.`;
    default:
      return `Analysis based on ${flagCount} identified factors.`;
  }
}

/**
 * Analyze text for scam indicators using rule-based pattern matching.
 * Provides realistic analysis even without AI API access.
 *
 * @param text - The offer text to analyze
 * @returns ScamAnalysisResult with risk assessment
 */
export function analyzeScamRisk(text: string): ScamAnalysisResult {
  const normalizedText = text.toLowerCase();
  let riskScore = 0;
  const redFlags: Array<{ flag: string; explanation: string }> = [];
  const legitimateIndicators: string[] = [];

  // Check for red flags
  for (const pattern of RED_FLAG_PATTERNS) {
    if (pattern.pattern.test(text)) {
      riskScore += pattern.score;
      redFlags.push({
        flag: pattern.flag,
        explanation: pattern.explanation
      });
    }
  }

  // Step 1 spec: if interest is mentioned and the parsed rate is > 60%, add a red flag.
  const rateMatch = text.match(/(\d+(?:\.\d+)?)\s*%/);
  if (rateMatch && rateMatch[1]) {
    const rate = parseFloat(rateMatch[1]);
    const mentionsInterest = /interest|apr|annual\s*percentage\s*rate/i.test(text);
    if (mentionsInterest && rate > 60) {
      riskScore += 35;
      redFlags.push({
        flag: `Interest rate of ${rate}% mentioned`,
        explanation: `A rate of ${rate}% is extremely high. Legitimate microfinance typically charges 20-40% APR. This could be predatory lending.`
      });
    }
  }

  // Check for legitimate indicators
  for (const pattern of LEGITIMATE_PATTERNS) {
    if (pattern.pattern.test(text)) {
      legitimateIndicators.push(pattern.indicator);
      riskScore -= 10; // Reduce risk for each legitimate indicator
    }
  }

  // Step 1 spec: no address OR no clear company name pattern should raise concern.
  const hasNoAddressClaim = /no\s*address|without\s*address|no\s*physical\s*address/i.test(normalizedText);
  const hasCompanyNamePattern = /\b(bank|microfinance|finance|financial|cooperative|ltd|limited|inc|llc|plc|corp|company)\b/i.test(text);
  if (hasNoAddressClaim || !hasCompanyNamePattern) {
    riskScore += 15;
    redFlags.push({
      flag: 'Missing verifiable company identity',
      explanation: 'A legitimate financial provider should clearly show a company identity and a verifiable address before asking for money.'
    });
  }

  // Ensure score stays within bounds
  riskScore = Math.max(0, Math.min(100, riskScore));

  const riskLevel = getRiskLevel(riskScore);

  return {
    risk_level: riskLevel,
    risk_score: riskScore,
    red_flags: redFlags,
    legitimate_indicators: legitimateIndicators,
    recommendation: getRecommendation(riskLevel, redFlags),
    summary: getSummary(riskLevel, redFlags.length)
  };
}

/**
 * Get common scams for a specific country
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @returns Array of common scam descriptions
 */
export function getCommonScams(countryCode: string): string[] {
  // These are universal scams common across emerging markets
  const commonScams = [
    'Advance fee loan scams — You\'re asked to pay a "processing fee" before receiving a loan that never arrives',
    'Pyramid schemes disguised as "investment clubs" or "savings groups" promising high returns for recruiting others',
    'Fake government grant programs asking for personal information or small "registration fees"',
    'Romance scams where online contacts ask for emergency money transfers',
    'Fake job offers requiring upfront payment for "training materials" or "registration"'
  ];

  // Add country-specific context
  const countrySpecific: Record<string, string[]> = {
    NG: ['BVN harvesting scams — Never share your Bank Verification Number with unofficial sources'],
    KE: ['Fake M-Pesa promotions — Safaricom never asks you to send money to receive prizes'],
    IN: ['UPI fraud calls — Banks never ask for your UPI PIN over the phone'],
    PH: ['Fake overseas job agencies — Verify agencies with POEA before paying any fees'],
    BD: ['bKash lottery scams — Mobile money providers don\'t run lotteries requiring payments']
  };

  return [...commonScams, ...(countrySpecific[countryCode] || [])];
}
