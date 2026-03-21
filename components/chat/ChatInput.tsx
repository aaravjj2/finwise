'use client';

import { useState, useRef, type KeyboardEvent, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { VoiceInput } from './VoiceInput';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps): JSX.Element {
  const t = useTranslations('chat');
  const [message, setMessage] = useState('');
  const [liveTranscript, setLiveTranscript] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(): void {
    if (!message.trim() || disabled) return;
    onSend(message.trim());
    setMessage('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>): void {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  function handleInput(): void {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }

  const handleVoiceTranscript = useCallback((transcript: string) => {
    const merged = `${message.trim()} ${transcript.trim()}`.trim();
    if (!merged) return;
    onSend(merged);
    setMessage('');
    setLiveTranscript('');
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [message, onSend]);

  return (
    <div>
      {liveTranscript && (
        <p className="mb-2 text-sm italic text-neutral-500 dark:text-neutral-400">{liveTranscript}</p>
      )}
    <div className="flex items-end gap-2">
      {/* Voice Input */}
      <VoiceInput
        onTranscript={handleVoiceTranscript}
        disabled={disabled}
      />

      <div className="relative flex-1">
        <textarea
          data-testid="chat-input"
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          placeholder={t('placeholder')}
          disabled={disabled}
          rows={1}
          className="w-full resize-none rounded-2xl border border-neutral-300 bg-white px-4 py-3 pr-12 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
        />
      </div>

      <button
        data-testid="send-button"
        onClick={handleSubmit}
        disabled={!message.trim() || disabled}
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-500 text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {disabled ? (
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        )}
      </button>
    </div>
    </div>
  );
}
