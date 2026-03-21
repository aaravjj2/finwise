import { describe, it, expect } from 'vitest';
import { calculateLoanPayment, calculateAPR, assessLoanFairness, convertRateToAPR } from '@/lib/loan-calculator';

describe('Loan Calculator', () => {
  describe('calculateLoanPayment', () => {
    it('calculates correct monthly payment for standard loan', () => {
      const result = calculateLoanPayment(1000, 2, 12);

      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.totalCost).toBeGreaterThan(1000);
      expect(result.totalInterest).toBeGreaterThan(0);
    });

    it('calculates zero interest loan correctly', () => {
      const result = calculateLoanPayment(1200, 0, 12);

      expect(result.monthlyPayment).toBe(100);
      expect(result.totalCost).toBe(1200);
      expect(result.totalInterest).toBe(0);
    });

    it('handles small loan amounts', () => {
      const result = calculateLoanPayment(100, 5, 6);

      expect(result.monthlyPayment).toBeGreaterThan(16);
      expect(result.totalCost).toBeGreaterThan(100);
    });

    it('handles large loan amounts', () => {
      const result = calculateLoanPayment(10000, 1.5, 24);

      expect(result.monthlyPayment).toBeGreaterThan(0);
      expect(result.totalCost).toBeGreaterThan(10000);
    });
  });

  describe('calculateAPR', () => {
    it('converts monthly rate to APR correctly', () => {
      const apr = calculateAPR(2);

      // 2% monthly should be roughly 26.8% APR (compounded)
      expect(apr).toBeGreaterThan(24);
      expect(apr).toBeLessThan(30);
    });

    it('handles zero rate', () => {
      const apr = calculateAPR(0);
      expect(apr).toBe(0);
    });

    it('handles high monthly rates', () => {
      const apr = calculateAPR(10);

      // 10% monthly is very high - predatory
      expect(apr).toBeGreaterThan(100);
    });
  });

  describe('convertRateToAPR', () => {
    it('converts weekly rates to annual percentage', () => {
      expect(convertRateToAPR(5, 'week')).toBe(260);
    });

    it('converts monthly rates to annual percentage', () => {
      expect(convertRateToAPR(2, 'month')).toBe(24);
    });

    it('converts daily rates to annual percentage', () => {
      expect(convertRateToAPR(1, 'day')).toBe(365);
    });
  });

  describe('assessLoanFairness', () => {
    it('marks low APR as good', () => {
      expect(assessLoanFairness(20, 'NG')).toBe('good');
      expect(assessLoanFairness(25, 'IN')).toBe('good');
    });

    it('marks moderate APR as fair', () => {
      expect(assessLoanFairness(45, 'NG')).toBe('fair');
    });

    it('marks high APR as expensive', () => {
      expect(assessLoanFairness(55, 'NG')).toBe('expensive');
    });

    it('marks very high APR as predatory', () => {
      expect(assessLoanFairness(70, 'NG')).toBe('predatory');
      expect(assessLoanFairness(100, 'IN')).toBe('predatory');
    });
  });
});
