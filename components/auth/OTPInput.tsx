'use client';

import { useState, useRef, useEffect, type KeyboardEvent, type ClipboardEvent } from 'react';
import { useTranslations } from 'next-intl';

interface OTPInputProps {
  onSubmit: (otp: string) => void;
  onResend: () => void;
  onExpire?: () => void;
  loading?: boolean;
  length?: number;
}

export function OTPInput({
  onSubmit,
  onResend,
  onExpire,
  loading = false,
  length = 6,
}: OTPInputProps): JSX.Element {
  const t = useTranslations('auth');
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [expiresIn, setExpiresIn] = useState(600);
  const [expired, setExpired] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
    setCanResend(true);
    return undefined;
  }, [countdown]);

  useEffect(() => {
    if (expired) return undefined;

    if (expiresIn > 0) {
      const timer = setTimeout(() => setExpiresIn((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }

    setExpired(true);
    onExpire?.();
    return undefined;
  }, [expiresIn, expired, onExpire]);

  function handleChange(index: number, value: string): void {
    if (expired) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    const otpString = newOtp.join('');
    if (otpString.length === length) {
      onSubmit(otpString);
    }
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>): void {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (pastedData) {
      const newOtp = [...otp];
      pastedData.split('').forEach((char, i) => {
        newOtp[i] = char;
      });
      setOtp(newOtp);
      if (pastedData.length === length) {
        onSubmit(pastedData);
      } else {
        inputRefs.current[pastedData.length]?.focus();
      }
    }
  }

  function handleResend(): void {
    if (!canResend) return;
    setCanResend(false);
    setCountdown(60);
    setExpiresIn(600);
    setExpired(false);
    setOtp(Array(length).fill(''));
    inputRefs.current[0]?.focus();
    onResend();
  }

  const minutes = Math.floor(expiresIn / 60);
  const seconds = expiresIn % 60;

  return (
    <div className="space-y-4">
      <p className="text-center text-xs text-neutral-500 dark:text-neutral-400">
        {expired ? 'Code expired' : `Code expires in ${minutes}:${seconds.toString().padStart(2, '0')}`}
      </p>

      <div className="flex justify-center gap-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={loading || expired}
            className="h-14 w-12 rounded-lg border-2 border-neutral-300 bg-white text-center text-2xl font-semibold text-neutral-900 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
          />
        ))}
      </div>

      <div className="text-center">
        {canResend ? (
          <button
            type="button"
            onClick={handleResend}
            className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            {t('resend_code')}
          </button>
        ) : (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {t('resend_countdown', { seconds: countdown })}
          </p>
        )}
      </div>

      {loading && (
        <div className="flex justify-center">
          <svg className="h-6 w-6 animate-spin text-primary-500" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      )}
    </div>
  );
}
