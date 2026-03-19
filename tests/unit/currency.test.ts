import { describe, it, expect } from 'vitest';
import {
  getCurrencyForCountry,
  getCurrencySymbol,
  formatCurrency,
  formatCompactCurrency,
  parseCurrencyInput,
} from '@/lib/currency';

describe('Currency Utils', () => {
  describe('getCurrencyForCountry', () => {
    it('returns correct currency for Nigeria', () => {
      expect(getCurrencyForCountry('NG')).toBe('NGN');
    });

    it('returns correct currency for Kenya', () => {
      expect(getCurrencyForCountry('KE')).toBe('KES');
    });

    it('returns correct currency for India', () => {
      expect(getCurrencyForCountry('IN')).toBe('INR');
    });

    it('returns USD for unknown country', () => {
      expect(getCurrencyForCountry('XX')).toBe('USD');
    });
  });

  describe('getCurrencySymbol', () => {
    it('returns correct symbol for NGN', () => {
      expect(getCurrencySymbol('NGN')).toBe('₦');
    });

    it('returns correct symbol for USD', () => {
      expect(getCurrencySymbol('USD')).toBe('$');
    });

    it('returns correct symbol for INR', () => {
      expect(getCurrencySymbol('INR')).toBe('₹');
    });

    it('returns currency code for unknown currency', () => {
      expect(getCurrencySymbol('XYZ')).toBe('XYZ');
    });
  });

  describe('formatCurrency', () => {
    it('formats USD correctly', () => {
      const result = formatCurrency(1234.56, 'USD');
      expect(result).toContain('1,234');
    });

    it('formats whole numbers without decimals', () => {
      const result = formatCurrency(1000, 'USD');
      expect(result).toContain('1,000');
    });

    it('handles zero amount', () => {
      const result = formatCurrency(0, 'USD');
      expect(result).toContain('0');
    });
  });

  describe('formatCompactCurrency', () => {
    it('formats thousands with K', () => {
      const result = formatCompactCurrency(5000, 'USD');
      expect(result).toContain('5');
      expect(result).toContain('K');
    });

    it('formats millions with M', () => {
      const result = formatCompactCurrency(2500000, 'USD');
      expect(result).toContain('2.5');
      expect(result).toContain('M');
    });
  });

  describe('parseCurrencyInput', () => {
    it('parses clean number string', () => {
      expect(parseCurrencyInput('1234.56')).toBe(1234.56);
    });

    it('parses string with currency symbol', () => {
      expect(parseCurrencyInput('$1,234.56')).toBe(1234.56);
    });

    it('parses string with commas', () => {
      expect(parseCurrencyInput('1,234,567')).toBe(1234567);
    });

    it('returns 0 for invalid input', () => {
      expect(parseCurrencyInput('abc')).toBe(0);
    });

    it('returns 0 for empty string', () => {
      expect(parseCurrencyInput('')).toBe(0);
    });
  });
});
