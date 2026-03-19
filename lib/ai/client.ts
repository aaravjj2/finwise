import Anthropic from '@anthropic-ai/sdk';

if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error('ANTHROPIC_API_KEY environment variable is not set');
}

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const CHAT_MODEL = 'claude-sonnet-4-20250514';
export const ANALYSIS_MODEL = 'claude-sonnet-4-20250514';

export const DEFAULT_MAX_TOKENS = 1024;
export const SCAM_ANALYSIS_MAX_TOKENS = 512;
