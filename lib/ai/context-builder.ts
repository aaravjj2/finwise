import type { Message, CardData, CardType } from '@/types';
import type { MessageParam } from '@anthropic-ai/sdk/resources/messages';

export function buildMessageHistory(messages: Message[]): MessageParam[] {
  return messages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));
}

const validCardTypes: CardType[] = ['institution-list', 'calculation', 'checklist', 'comparison-table', 'budget'];

function isValidCardType(type: string): type is CardType {
  return validCardTypes.includes(type as CardType);
}

export function parseCardData(content: string): {
  text: string;
  card: CardData | null;
} {
  const cardRegex = /\[CARD:(\w+(?:-\w+)*)\]([\s\S]*?)\[\/CARD\]/;
  const match = content.match(cardRegex);

  if (!match) {
    return { text: content, card: null };
  }

  const type = match[1]!;
  const jsonStr = match[2]!.trim();
  const textWithoutCard = content.replace(cardRegex, '').trim();

  if (!isValidCardType(type)) {
    return { text: content, card: null };
  }

  try {
    const data = JSON.parse(jsonStr);
    return {
      text: textWithoutCard,
      card: { type, data },
    };
  } catch {
    return { text: content, card: null };
  }
}

export function formatUserContext(
  country: string,
  hasBankAccount: boolean,
  literacyLevel: number,
  primaryGoal: string | null
): string {
  const contextParts: string[] = [];

  if (country) {
    contextParts.push(`Location: ${country}`);
  }

  contextParts.push(`Has bank account: ${hasBankAccount ? 'Yes' : 'No'}`);
  contextParts.push(`Financial knowledge level: ${literacyLevel}/5`);

  if (primaryGoal) {
    contextParts.push(`Main goal: ${primaryGoal}`);
  }

  return contextParts.join(' | ');
}
