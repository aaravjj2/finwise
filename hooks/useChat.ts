'use client';

import { useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Message, CardData } from '@/types';
import { parseCardData } from '@/lib/ai/context-builder';

interface UseChatOptions {
  conversationId?: string;
  initialMessages?: Message[];
}

interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  conversationId: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearError: () => void;
}

export function useChat({ conversationId: initialConvId, initialMessages = [] }: UseChatOptions = {}): UseChatReturn {
  const router = useRouter();
  const params = useParams();
  const locale = typeof params.locale === 'string' ? params.locale : 'en';

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(initialConvId || null);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      setIsLoading(true);
      setError(null);

      // Add user message to UI immediately
      const userMessage: Message = {
        id: `temp-${Date.now()}`,
        conversation_id: conversationId || '',
        role: 'user',
        content,
        created_at: new Date().toISOString(),
        audio_url: null,
        card_data: null,
      };

      setMessages((prev) => [...prev, userMessage]);

      // Create placeholder for assistant message
      const assistantMessage: Message = {
        id: `temp-${Date.now() + 1}`,
        conversation_id: conversationId || '',
        role: 'assistant',
        content: '',
        created_at: new Date().toISOString(),
        audio_url: null,
        card_data: null,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: content,
            conversationId,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to send message');
        }

        const newConvId = response.headers.get('X-Conversation-Id');
        if (newConvId && !conversationId) {
          setConversationId(newConvId);
          router.replace(`/${locale}/chat/${newConvId}`);
        }

        // Stream the response
        const reader = response.body?.getReader();
        if (!reader) throw new Error('No response body');

        const decoder = new TextDecoder();
        let fullContent = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          fullContent += chunk;

          // Update the assistant message with streamed content
          setMessages((prev) => {
            const updated = [...prev];
            const lastIndex = updated.length - 1;
            if (lastIndex >= 0 && updated[lastIndex]?.role === 'assistant') {
              updated[lastIndex] = {
                ...updated[lastIndex]!,
                content: fullContent,
              };
            }
            return updated;
          });
        }

        // Parse card data after streaming completes
        const { card } = parseCardData(fullContent);
        if (card) {
          setMessages((prev) => {
            const updated = [...prev];
            const lastIndex = updated.length - 1;
            if (lastIndex >= 0 && updated[lastIndex]?.role === 'assistant') {
              updated[lastIndex] = {
                ...updated[lastIndex]!,
                card_data: card as CardData,
              };
            }
            return updated;
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        // Remove the placeholder assistant message on error
        setMessages((prev) => prev.slice(0, -1));
      } finally {
        setIsLoading(false);
      }
    },
    [conversationId, isLoading, locale, router]
  );

  const clearError = useCallback(() => setError(null), []);

  return {
    messages,
    isLoading,
    error,
    conversationId,
    sendMessage,
    clearError,
  };
}
