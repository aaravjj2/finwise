const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  NGN: '₦',
  KES: 'KSh',
  INR: '₹',
  BDT: '৳',
  PHP: '₱',
  IDR: 'Rp',
  VND: '₫',
  MXN: '$',
  BRL: 'R$',
  PEN: 'S/',
  COP: '$',
  ETB: 'Br',
  ZAR: 'R',
  TZS: 'TSh',
  UGX: 'USh',
  GHS: '₵',
  PKR: '₨',
};

const COUNTRY_CURRENCIES: Record<string, string> = {
  NG: 'NGN',
  KE: 'KES',
  IN: 'INR',
  BD: 'BDT',
  PH: 'PHP',
  ID: 'IDR',
  VN: 'VND',
  MX: 'MXN',
  BR: 'BRL',
  PE: 'PEN',
  CO: 'COP',
  ET: 'ETB',
  ZA: 'ZAR',
  TZ: 'TZS',
  UG: 'UGX',
  GH: 'GHS',
  PK: 'PKR',
};

export function getCurrencyForCountry(countryCode: string): string {
  return COUNTRY_CURRENCIES[countryCode] || 'USD';
}

export function getCurrencySymbol(currency: string): string {
  return CURRENCY_SYMBOLS[currency] || currency;
}

export function formatCurrency(amount: number, currency: string, locale = 'en-US'): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    // Fallback for unsupported currencies
    const symbol = getCurrencySymbol(currency);
    return `${symbol}${amount.toLocaleString(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  }
}

export function formatCompactCurrency(amount: number, currency: string, locale = 'en-US'): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      notation: 'compact',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(amount);
  } catch {
    const symbol = getCurrencySymbol(currency);
    return `${symbol}${formatCompactNumber(amount)}`;
  }
}

function formatCompactNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export function parseCurrencyInput(value: string): number {
  // Remove all non-numeric characters except decimal point
  const cleaned = value.replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}
