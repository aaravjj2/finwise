type Topic = 'savings' | 'loans' | 'budget' | 'remittance' | 'scam' | 'default'

const FOLLOW_UP_SUGGESTIONS: Record<Topic, string[]> = {
  savings: [
    'What is the best savings account for beginners?',
    'How much should I save?',
    'What if I can only save a little?'
  ],
  loans: [
    'How do I find a safe lender?',
    'What documents do I need?',
    "What happens if I can't repay?"
  ],
  budget: ['How do I track spending?', 'What should I cut first?', 'How do I budget with irregular income?'],
  remittance: ['Which service has the lowest fees?', 'How long does transfer take?', 'Is mobile money safe?'],
  scam: ['How do I verify a lender?', 'What if I already paid?', 'How do I report this?'],
  default: ['Tell me more', 'Can you give me an example?', 'What should I do next?']
};

function detectTopic(message: string): Topic {
  const msg = message.toLowerCase();
  if (/save|savings|account|bank|deposit|money/.test(msg)) return 'savings';
  if (/loan|borrow|lend|credit|debt|interest/.test(msg)) return 'loans';
  if (/budget|spend|spending|expenses|income|afford/.test(msg)) return 'budget';
  if (/send|transfer|remit|family|home|abroad|western union|m-pesa/.test(msg)) return 'remittance';
  if (/scam|fraud|fake|suspicious|too good|guaranteed|upfront fee/.test(msg)) return 'scam';
  return 'default';
}

export function getFollowUpSuggestions(message: string): string[] {
  return FOLLOW_UP_SUGGESTIONS[detectTopic(message)]
}

export function getMockResponse(message: string, _language: string = 'en'): string {
  const msg = message.toLowerCase();

  if (/sav|bank|account|deposit/.test(msg)) {
    return `A savings account is the safest place to store money outside your home.
Think of it like a locked granary - the bank keeps your money safe, and unlike
cash under a mattress, it cannot be stolen in a break-in or lost in a fire.

The bank also pays you a small amount just for keeping your money there. This is
called interest. If you deposit 5,000 Naira today at 5% annual interest, by next
year you will have 5,250 Naira without doing anything.

Most banks now allow you to open a basic savings account with just your national
ID and a small initial deposit - sometimes as little as 500 Naira or 50 Shillings.
Mobile money accounts like M-Pesa or bKash work similarly and require only your
phone number and ID.

Would you like me to help you find savings accounts available in your area,
or explain how to open one step by step?`;
  }

  if (/loan|borrow|lend|credit|debt|interest|repay/.test(msg)) {
    const pctMatch = msg.match(/(\d+(?:\.\d+)?)\s*%\s*(per\s*)?(week|month|day|year)/i);
    if (pctMatch?.[1] && pctMatch?.[3]) {
      const rate = Number.parseFloat(pctMatch[1]);
      const period = pctMatch[3].toLowerCase();
      const aprMap: Record<string, number> = { week: 52, month: 12, day: 365, year: 1 };
      const apr = rate * (aprMap[period] || 1);
      const isHighRisk = apr > 60;

      return `Let me calculate that for you. A rate of ${rate}% per ${period} equals
${apr.toFixed(0)}% per year - this is called the Annual Percentage Rate, or APR.

${isHighRisk
  ? `This rate is very high. At ${apr.toFixed(0)}% APR, if you borrow $100,
you would owe $${(100 * (1 + apr / 100)).toFixed(0)} after one year - just in interest.
Rates above 60% APR are often a sign of predatory lending.

Before accepting this offer, I strongly recommend checking with a registered
microfinance institution. Many offer loans at 20-40% APR with no collateral needed.
Would you like me to find microfinance institutions near you?`
  : `This rate of ${apr.toFixed(0)}% APR is within the normal range for microfinance
in emerging markets (typical range: 20-60% APR). Always confirm the total repayment
amount in writing before signing anything.`}`;
    }

    return `Borrowing money is normal and can help your family or business - but the
terms matter enormously. Here is what you need to know before taking any loan:

The most important number is the APR - Annual Percentage Rate. This tells you the
true yearly cost. A lender saying "5% per month" sounds small, but that is 60% APR.
For every 100,000 you borrow, you pay back 160,000 in a year.

Formal lenders - registered banks and microfinance institutions - charge 20-60% APR
and are regulated by the government. Informal moneylenders often charge 100-400% APR
and have no consumer protections.

Before borrowing, ask three questions: What is the total I will repay? What happens
if I miss a payment? Is this lender registered with the financial regulator?

Want me to help you evaluate a specific loan offer, or find registered lenders in your area?`;
  }

  if (/budget|spend|spending|expenses|income|afford|money.*month|month.*money/.test(msg)) {
    return `A budget is simply a plan for your money before you spend it. The most
practical framework for variable income earners is this:

Every time you receive income - whether it is a salary, market earnings, or a
payment - divide it immediately:

50% goes to needs: food, rent, transport, utilities, school fees.
30% goes to wants: anything that is not essential but makes life better.
20% goes to savings: moved to your savings account before you spend anything else.

The critical insight is to move your savings first, immediately when income arrives.
If you wait until the end of the month to save what is left, there is rarely
anything left.

For irregular income - common for farmers, traders, and daily earners - the rule
adjusts: save a fixed amount on every payday, not a percentage.

Would you like me to help you build a specific budget based on your income?`;
  }

  if (/send|transfer|remit|family|home|abroad|western union|moneygram|wise|mpesa|bkash/.test(msg)) {
    return `Sending money to family is one of the most important financial decisions
many people make each month. The fees vary dramatically between providers.

On a typical transfer of $100 from UK to Nigeria:
- Western Union charges about $3.90 (3.9%)
- Wise charges about $0.60 (0.6%)
- WorldRemit charges about $1.50 (1.5%)

Over a year of monthly transfers, switching from Western Union to Wise saves
approximately $40.

The key rule: always compare at least three services before sending. Rates change,
and the cheapest option varies by corridor.

Want me to compare current rates for a specific amount and corridor?`;
  }

  if (/scam|fraud|fake|suspicious|guarantee|upfront|too good|advance.*fee|fee.*loan/.test(msg)) {
    return `What you are describing has several characteristics I want to flag immediately.

The most reliable warning signs of a financial scam are:
1. Guaranteed returns or guaranteed loan approval
2. Pay a fee to receive money
3. Pressure to act immediately
4. No physical address or registration number
5. Interest rate not clearly stated in writing

If you want, paste the exact message or describe the offer in detail and I will
give you a specific assessment. Do not send any money until we review it together.`;
  }

  if (/open.*account|first.*account|how.*bank|document|id.*bank|bank.*id/.test(msg)) {
    return `Opening your first bank account is simpler than most people think.
Required documents in most countries are:
- Government-issued ID
- Proof of address
- A small initial deposit

Many banks now offer mobile account opening where you upload your ID and selfie.
You do not need formal employment to open a basic account.

Which country are you in? I can share a step-by-step checklist for your location.`;
  }

  if (/mobile money|mpesa|m-pesa|bkash|gcash|mtn|airtel|mobile.*banking/.test(msg)) {
    return `Mobile money is one of the most powerful financial tools for people without
traditional bank accounts.

A mobile money account is linked to your phone number. You can send, receive,
save, and pay bills without visiting a bank branch.

To register, visit an authorized agent with your national ID. Registration usually
takes less than 10 minutes.

Would you like a step-by-step guide to register in your country?`;
  }

  if (/insuranc|protect|cover|accident|health.*plan|medical/.test(msg)) {
    return `Insurance protects you from unexpected costs that can wipe out savings.

For most households, the most useful options are health insurance and micro-insurance.
These plans are designed to keep one emergency from becoming a long-term debt cycle.

Before buying, ask what is covered, what is excluded, and how claims are paid.
Only use providers that are registered with your national insurance regulator.

Want help finding options in your country?`;
  }

  return `That is a great question and I want to make sure I give you the most
helpful answer possible.

Could you share a bit more detail:
- Which country are you in?
- Is this about saving, borrowing, sending money, or protecting your money?
- Is this for personal use or for a business?

Common starting points:
- How do I start saving money each month?
- How do I open my first bank account?
- Is this loan offer safe?
- What is the cheapest way to send money home?

Tell me your situation in your own words and I will help.`;
}

export function getGreeting(name: string, _language: string = 'en'): string {
  const hour = new Date().getHours();
  if (hour < 12) {
    return `Good morning, ${name}! I'm Maya, your financial coach. What would you like to learn about today?`;
  }
  if (hour < 17) {
    return `Good afternoon, ${name}! I'm Maya, your financial coach. What would you like to learn about today?`;
  }
  return `Good evening, ${name}! I'm Maya, your financial coach. What would you like to learn about today?`;
}

export const STARTER_PROMPTS = [
  'How do I open a bank account?',
  'Is this loan offer safe?',
  'How do I save money each month?',
  'How can I send money home cheaply?',
  'What is interest and how does it work?',
  'Help me make a budget'
];
