'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { ScamAnalysis } from '@/types';

export default function ScamDetectorPage(): JSX.Element {
  const t = useTranslations('tools');
  const [offer, setOffer] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScamAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleAnalyze(): Promise<void> {
    if (!offer.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/scam-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offer: offer.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze');
      }

      const data = await response.json();
      setResult(data);
    } catch {
      setError(t('analysis_error'));
    } finally {
      setLoading(false);
    }
  }

  const riskColors: Record<string, string> = {
    low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    high: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    very_high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-white">
        {t('scam_detector')}
      </h1>
      <p className="mb-6 text-neutral-600 dark:text-neutral-400">{t('scam_detector_desc')}</p>

      {/* Input */}
      <div className="mb-6 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
        <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {t('paste_offer')}
        </label>
        <textarea
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
          placeholder={t('offer_placeholder')}
          rows={6}
          className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
        />
        <button
          onClick={handleAnalyze}
          disabled={loading || !offer.trim()}
          className="mt-4 w-full rounded-lg bg-primary-500 px-4 py-3 font-medium text-white hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? t('analyzing') : t('analyze')}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="space-y-4">
          {/* Risk level */}
          <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                {t('risk_level')}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${
                  riskColors[result.risk_level]
                }`}
              >
                {result.risk_level.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            {/* Risk score bar */}
            <div className="mb-2">
              <div className="h-4 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                <div
                  className={`h-full transition-all duration-500 ${
                    result.risk_score >= 75
                      ? 'bg-red-500'
                      : result.risk_score >= 50
                        ? 'bg-orange-500'
                        : result.risk_score >= 25
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                  }`}
                  style={{ width: `${result.risk_score}%` }}
                />
              </div>
              <p className="mt-1 text-right text-sm text-neutral-500">{result.risk_score}/100</p>
            </div>

            <p className="text-neutral-700 dark:text-neutral-300">{result.summary}</p>
          </div>

          {/* Red flags */}
          {result.red_flags.length > 0 && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-red-700 dark:text-red-400">
                <span>🚩</span>
                {t('red_flags')} ({result.red_flags.length})
              </h3>
              <ul className="space-y-2">
                {result.red_flags.map((flag, index) => (
                  <li key={index} className="text-sm">
                    <p className="font-medium text-red-800 dark:text-red-300">{flag.flag}</p>
                    <p className="text-red-700 dark:text-red-400">{flag.explanation}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Legitimate indicators */}
          {result.legitimate_indicators.length > 0 && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-green-700 dark:text-green-400">
                <span>✅</span>
                {t('legitimate_signs')}
              </h3>
              <ul className="space-y-1">
                {result.legitimate_indicators.map((indicator, index) => (
                  <li key={index} className="text-sm text-green-700 dark:text-green-400">
                    • {indicator}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommendation */}
          <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
            <h3 className="mb-2 font-semibold text-neutral-900 dark:text-white">
              {t('recommendation')}
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300">{result.recommendation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
