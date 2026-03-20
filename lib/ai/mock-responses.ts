/**
 * Mock AI responses for FinWise when no Anthropic API key is available.
 * Pattern-matches user messages and returns realistic, warm Maya-voiced responses.
 */

const FOLLOW_UP_SUGGESTIONS: Record<string, string[]> = {
  savings: [
    "What's the best savings account for beginners?",
    "How much should I save?",
    "What if I can only save a little?"
  ],
  loans: [
    "How do I find a safe lender?",
    "What documents do I need?",
    "What happens if I can't repay?"
  ],
  budget: [
    "How do I track my spending?",
    "What expenses should I cut first?",
    "How do I budget with irregular income?"
  ],
  remittance: [
    "Which service has the lowest fees?",
    "How long does a transfer take?",
    "Is mobile money safe for sending?"
  ],
  scam: [
    "How do I verify if a company is legitimate?",
    "What should I do if I was scammed?",
    "How do I report a scam?"
  ]
};

function detectTopic(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (/open\s*account|first\s*account|how\s*to\s*bank|documents?/i.test(lowerMessage)) {
    return 'bank_account';
  }
  if (/mobile\s*money|m-pesa|bkash|gcash|airtel|mtn/i.test(lowerMessage)) {
    return 'mobile_money';
  }
  if (/scam|fraud|fake|suspicious|too\s*good|guaranteed|upfront\s*fee/i.test(lowerMessage)) {
    return 'scam';
  }
  if (/loan|borrow|lend|credit|debt|interest/i.test(lowerMessage)) {
    return 'loans';
  }
  if (/budget|spend|spending|expenses|income|afford/i.test(lowerMessage)) {
    return 'budget';
  }
  if (/send|transfer|remit|family|home|abroad|western\s*union|m-pesa/i.test(lowerMessage)) {
    return 'remittance';
  }
  if (/save|savings|deposit|bank|account|money/i.test(lowerMessage)) {
    return 'savings';
  }

  return 'default';
}

const DEFAULT_SUGGESTIONS: string[] = [
  "Tell me more",
  "Can you give me an example?",
  "What should I do next?"
];

export function getFollowUpSuggestions(message: string): string[] {
  const topic = detectTopic(message);
  const suggestions = FOLLOW_UP_SUGGESTIONS[topic];
  return suggestions ?? DEFAULT_SUGGESTIONS;
}

export function getMockResponse(message: string, _language: string = 'en'): string {
  const lowerMessage = message.toLowerCase();

  if (/open\s*account|first\s*account|how\s*to\s*bank|documents?/i.test(lowerMessage)) {
    return `Opening your first account is a strong step, and it is usually simpler than people expect. A basic checklist is: a government-issued ID, proof of address (like a utility bill or letter), and sometimes a small initial deposit.

Many banks now support mobile account opening, so you may only need your phone number and an ID photo to begin. If one bank asks for too much paperwork, try another registered bank or microfinance institution because requirements can differ.

Would you like me to help you prepare a one-page checklist for your exact country before you visit?`;
  }

  if (/mobile\s*money|m-pesa|bkash|gcash|airtel|mtn/i.test(lowerMessage)) {
    return `Mobile money is like a bank account attached to your phone number. You can send, receive, save, and pay bills without going to a bank branch.

It is safe and widely used across many countries, and it is usually free to receive money. You should still protect your account by never sharing your PIN and checking agent details before cashing in or out.

Would you like a simple step-by-step guide for sending your first mobile money transfer safely?`;
  }

  if (/scam|fraud|fake|suspicious|too\s*good|guaranteed|upfront\s*fee/i.test(lowerMessage)) {
    return `You are asking the right question, and that can protect your money. Watch for these five red flags: guaranteed returns, paying a fee to receive a loan, pressure to act immediately, no physical address or registration number, and interest rate not clearly stated.

If even one of these appears, pause before paying anything. Always verify the company with your country's financial regulator and ask for full written terms in plain language.

Do you want to paste the exact offer text here so I can help you check it line by line?`;
  }

  if (/loan|borrow|lend|credit|debt|interest/i.test(lowerMessage)) {
    return `Great question. Formal loans from banks or registered microfinance groups are often around 20-40% APR, while informal moneylenders can be 100-400% APR, which becomes very expensive very quickly.

APR means annual percentage rate, or the total yearly cost of borrowing. If you borrow $100 for one year at 20% APR, you repay $120 total. That is why checking the APR first is one of the most important safety steps.

My advice is to check with a registered microfinance institution before accepting any private offer. Would you like help comparing two loan offers side by side?`;
  }

  if (/budget|spend|spending|expenses|income|afford/i.test(lowerMessage)) {
    return `A simple budget can reduce stress fast. Try the adapted 50/30/20 rule: about 50% for needs like food, rent, and transport, 30% for wants, and 20% for savings.

If your income is irregular, use one rule that always works: save a fixed amount on every payday, no matter how small. Consistency matters more than size, because the habit protects you during hard weeks.

Would you like me to build a starter budget using your real weekly income and expenses?`;
  }

  if (/send|transfer|remit|family|home|abroad|western\s*union|m-pesa/i.test(lowerMessage)) {
    return `You can often save a lot on remittances by comparing providers first. Fees usually range from 1% to 10%, depending on the company, corridor, and payout method.

Mobile money services are often the cheapest option, and comparison sites like Send Money Home can help you quickly spot better rates. When trying any new service, send a small test amount first before sending a larger transfer.

Would you like me to help compare options for your exact sending and receiving countries?`;
  }

  if (/save|savings|deposit|bank|account|money/i.test(lowerMessage)) {
    return `A savings account is like a locked box at the bank - safer than cash at home, and the bank pays you a small amount just for keeping your money there.

That small payment is called interest, which means your balance can grow over time even when you are not adding much. Most banks also offer basic savings accounts with no minimum balance, so you can start small and build gradually.

Would you like me to show you how much your savings could grow with a small weekly deposit?`;
  }

  return `I am happy to help, and you are in the right place. If you share a little more detail about your situation, I can give practical steps that fit your income, country, and goals.

You can also start with one of these: How do I open a bank account? Is this loan offer safe? How do I send money home cheaply?

Which one should we tackle first?`;
}

export function getGreeting(name: string, _language: string = 'en'): string {
  const hour = new Date().getHours();
  let timeGreeting = 'Hello';

  if (hour < 12) {
    timeGreeting = 'Good morning';
  } else if (hour < 17) {
    timeGreeting = 'Good afternoon';
  } else {
    timeGreeting = 'Good evening';
  }

  return `${timeGreeting}, ${name}! I'm Maya, your financial coach. What would you like to learn about today?`;
}

export const STARTER_PROMPTS = [
  "How do I open a bank account?",
  "Is this loan offer safe?",
  "How do I save money each month?",
  "How can I send money home cheaply?",
  "What is interest and how does it work?",
  "Help me make a budget"
];
