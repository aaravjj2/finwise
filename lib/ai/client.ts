import Anthropic from '@anthropic-ai/sdk';

// Allow builds without API key (for CI/CD), but fail at runtime if needed
const apiKey = process.env.ANTHROPIC_API_KEY || 'placeholder-key';

export const anthropic = new Anthropic({
  apiKey,
});

// Check for valid API key at runtime
export function ensureApiKey(): void {
  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'placeholder-key') {
    throw new Error('ANTHROPIC_API_KEY environment variable is not set');
  }
}

export const CHAT_MODEL = 'claude-sonnet-4-20250514';
export const ANALYSIS_MODEL = 'claude-sonnet-4-20250514';

export const DEFAULT_MAX_TOKENS = 1024;
export const SCAM_ANALYSIS_MAX_TOKENS = 512;
