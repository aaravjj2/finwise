'use client';

import { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  text: string;
  autoPlay?: boolean;
}

export function AudioPlayer({ text, autoPlay = false }: AudioPlayerProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (autoPlay && text) {
      playAudio();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, autoPlay]);

  async function playAudio(): Promise<void> {
    if (isLoading) return;

    if (audioRef.current && audioUrlRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate audio');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      audioUrlRef.current = audioUrl;

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => {
        setError('Failed to play audio');
        setIsPlaying(false);
      };

      await audio.play();
      setIsPlaying(true);
    } catch {
      setError('Failed to generate audio');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={playAudio}
      disabled={isLoading}
      className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
        isPlaying
          ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
          : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-600'
      } disabled:cursor-not-allowed disabled:opacity-50`}
      title={error || (isPlaying ? 'Pause' : 'Play')}
    >
      {isLoading ? (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : isPlaying ? (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
        </svg>
      ) : (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
}
