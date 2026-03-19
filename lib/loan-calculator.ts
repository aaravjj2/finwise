export interface LoanResult {
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  apr: number;
}

export function calculateLoanPayment(
  principal: number,
  monthlyRate: number,
  termMonths: number
): LoanResult {
  const rate = monthlyRate / 100;

  // Monthly payment using amortization formula
  // P × [r(1+r)^n] / [(1+r)^n - 1]
  let monthlyPayment: number;
  let totalCost: number;

  if (rate === 0) {
    monthlyPayment = principal / termMonths;
    totalCost = principal;
  } else {
    const factor = Math.pow(1 + rate, termMonths);
    monthlyPayment = principal * (rate * factor) / (factor - 1);
    totalCost = monthlyPayment * termMonths;
  }

  const totalInterest = totalCost - principal;
  const apr = calculateAPR(monthlyRate);

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    apr: Math.round(apr * 10) / 10,
  };
}

export function calculateAPR(monthlyRate: number): number {
  // Simple conversion: monthly rate × 12
  // For more accurate: (1 + monthlyRate)^12 - 1
  const rate = monthlyRate / 100;
  const effectiveAnnualRate = Math.pow(1 + rate, 12) - 1;
  return effectiveAnnualRate * 100;
}

export function assessLoanFairness(apr: number, country: string): 'good' | 'fair' | 'expensive' | 'predatory' {
  // Regional fair rate benchmarks (approximate)
  const benchmarks: Record<string, number> = {
    NG: 35, // Nigeria
    KE: 30, // Kenya
    IN: 25, // India
    BD: 30, // Bangladesh
    PH: 30, // Philippines
    MX: 35, // Mexico
    BR: 40, // Brazil
  };

  const benchmark = benchmarks[country] || 35;

  if (apr <= benchmark) return 'good';
  if (apr <= benchmark * 1.5) return 'fair';
  if (apr <= 60) return 'expensive';
  return 'predatory';
}

export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
