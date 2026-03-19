import { describe, it, expect, vi } from 'vitest';
import { buildSystemPrompt } from '@/lib/ai/system-prompt';
import { buildMessageHistory, parseCardData } from '@/lib/ai/context-builder';
import { buildScamDetectionPrompt } from '@/lib/ai/tools';
import type { UserProfile, Message } from '@/types';

describe('AI System Prompt', () => {
  const mockUser: UserProfile = {
    id: 'test-id',
    phone: '+2341234567890',
    name: 'Amara',
    language: 'en',
    country: 'NG',
    literacy_level: 2,
    literacy_description: 'Basic',
    primary_goal: 'save_more',
    has_bank_account: false,
    monthly_income: 180,
    currency: 'NGN',
    onboarding_completed: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    completed_modules: ['savings-basics'],
    current_module: 'smart-borrowing',
    badges: [],
    financial_health_score: 45,
  };

  describe('buildSystemPrompt', () => {
    it('includes user name in prompt', () => {
      const prompt = buildSystemPrompt(mockUser);
      expect(prompt).toContain('Amara');
    });

    it('includes user country', () => {
      const prompt = buildSystemPrompt(mockUser);
      expect(prompt).toContain('NG');
    });

    it('includes literacy level', () => {
      const prompt = buildSystemPrompt(mockUser);
      expect(prompt).toContain('2/5');
    });

    it('includes bank account status', () => {
      const prompt = buildSystemPrompt(mockUser);
      expect(prompt).toContain('No');
    });

    it('includes safety rules', () => {
      const prompt = buildSystemPrompt(mockUser);
      expect(prompt).toContain('SAFETY RULES');
      expect(prompt).toContain('predatory');
    });

    it('includes completed modules', () => {
      const prompt = buildSystemPrompt(mockUser);
      expect(prompt).toContain('savings-basics');
    });

    it('works with minimal user data', () => {
      const minimalUser: UserProfile = {
        ...mockUser,
        name: null,
        primary_goal: null,
        completed_modules: [],
      };
      const prompt = buildSystemPrompt(minimalUser);
      expect(prompt).toContain('Friend');
    });
  });
});

describe('AI Context Builder', () => {
  describe('buildMessageHistory', () => {
    it('converts messages to API format', () => {
      const messages: Message[] = [
        {
          id: '1',
          conversation_id: 'conv-1',
          role: 'user',
          content: 'Hello',
          created_at: new Date().toISOString(),
          audio_url: null,
          card_data: null,
        },
        {
          id: '2',
          conversation_id: 'conv-1',
          role: 'assistant',
          content: 'Hi there!',
          created_at: new Date().toISOString(),
          audio_url: null,
          card_data: null,
        },
      ];

      const result = buildMessageHistory(messages);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ role: 'user', content: 'Hello' });
      expect(result[1]).toEqual({ role: 'assistant', content: 'Hi there!' });
    });

    it('handles empty array', () => {
      const result = buildMessageHistory([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('parseCardData', () => {
    it('parses card from message content', () => {
      const content = `Here are some institutions:

[CARD:institution-list]
{"items": [{"name": "Test Bank", "rate": "12%", "location": "Lagos", "contact": "+234"}]}
[/CARD]`;

      const result = parseCardData(content);

      expect(result.text).toContain('Here are some institutions');
      expect(result.card).not.toBeNull();
      expect(result.card?.type).toBe('institution-list');
    });

    it('returns null card for plain text', () => {
      const content = 'This is just plain text with no card.';

      const result = parseCardData(content);

      expect(result.text).toBe(content);
      expect(result.card).toBeNull();
    });

    it('handles malformed JSON in card', () => {
      const content = `[CARD:calculation]
      {invalid json}
      [/CARD]`;

      const result = parseCardData(content);

      expect(result.card).toBeNull();
    });
  });
});

describe('Scam Detection Prompt', () => {
  describe('buildScamDetectionPrompt', () => {
    it('includes the offer text', () => {
      const offer = 'Guaranteed 50% returns in 1 week!';
      const prompt = buildScamDetectionPrompt(offer, 'NG');

      expect(prompt).toContain(offer);
    });

    it('includes country context', () => {
      const prompt = buildScamDetectionPrompt('Test offer', 'KE');

      expect(prompt).toContain('KE');
    });

    it('lists common red flags', () => {
      const prompt = buildScamDetectionPrompt('Test offer', 'NG');

      expect(prompt).toContain('Guaranteed returns');
      expect(prompt).toContain('60% APR');
      expect(prompt).toContain('pay a fee to receive a loan');
    });

    it('specifies JSON response format', () => {
      const prompt = buildScamDetectionPrompt('Test offer', 'NG');

      expect(prompt).toContain('risk_level');
      expect(prompt).toContain('risk_score');
      expect(prompt).toContain('red_flags');
      expect(prompt).toContain('recommendation');
    });
  });
});
