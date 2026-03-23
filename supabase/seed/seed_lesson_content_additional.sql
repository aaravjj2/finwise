-- Additional FinWise Lesson Content Seed Data
-- Adds English content for the remaining 20 lessons

-- ===========================================
-- Sending Money Home Module
-- ===========================================
INSERT INTO lesson_content (lesson_id, language, title, content)
SELECT l.id, 'en', 'Why Remittances Need a Plan',
'## Send With Purpose

Remittances can build long-term stability when they are planned, not reactive. Agree in advance on a monthly target, emergency rules, and how progress will be tracked.

### Practical Tip
Set a fixed transfer day and use reminders. Consistency helps families budget and reduces panic transfers with high fees.'
FROM lessons l
JOIN learning_modules m ON l.module_id = m.id
WHERE m.slug = 'sending-money-home' AND l.slug = 'why-remit'
ON CONFLICT (lesson_id, language) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

INSERT INTO lesson_content (lesson_id, language, title, content)
SELECT l.id, 'en', 'Understanding Provider Fees',
'## The Fee Stack

Every transfer has a fee stack: transfer fee, exchange markup, receiving charges, and withdrawal costs. Cheap advertised fees can hide expensive exchange rates.

### Practical Tip
Compare at least three providers and calculate receiver-side amount, not just sender-side fee.'
FROM lessons l
JOIN learning_modules m ON l.module_id = m.id
WHERE m.slug = 'sending-money-home' AND l.slug = 'provider-fees'
ON CONFLICT (lesson_id, language) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

INSERT INTO lesson_content (lesson_id, language, title, content)
SELECT l.id, 'en', 'Exchange Rates That Matter',
'## Rate Quality

A 1-2% exchange-rate gap can cost more than the visible transfer fee. Always check the mid-market rate and compare what your provider offers.

### Practical Tip
Track one currency pair weekly so you can recognize when a rate is unusually poor.'
FROM lessons l
JOIN learning_modules m ON l.module_id = m.id
WHERE m.slug = 'sending-money-home' AND l.slug = 'exchange-rates'
ON CONFLICT (lesson_id, language) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

INSERT INTO lesson_content (lesson_id, language, title, content)
SELECT l.id, 'en', 'Safe Transfer Habits',
'## Protect Every Transfer

Use trusted apps, verify recipient details twice, and avoid public Wi-Fi for financial actions. Keep transaction receipts and screenshots for dispute handling.

### Practical Tip
Start with a small test transfer when using a new provider or recipient account.'
FROM lessons l
JOIN learning_modules m ON l.module_id = m.id
WHERE m.slug = 'sending-money-home' AND l.slug = 'safe-transfers'
ON CONFLICT (lesson_id, language) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

INSERT INTO lesson_content (lesson_id, language, title, content)
SELECT l.id, 'en', 'Remittance Quiz',
'## Check Your Skills

You will answer three practical questions about fees, exchange rates, and transfer safety. Aim for 70% or higher to pass this module quiz.'
FROM lessons l
JOIN learning_modules m ON l.module_id = m.id
WHERE m.slug = 'sending-money-home' AND l.slug = 'remittance-quiz'
ON CONFLICT (lesson_id, language) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

-- ===========================================
-- Protecting Your Money Module
-- ===========================================
INSERT INTO lesson_content (lesson_id, language, title, content)
SELECT l.id, 'en', 'Spotting Scams Early',
'## Scam Patterns

Scammers create urgency, secrecy, and emotional pressure. If someone says "act now" and "do not tell anyone," stop and verify before sending money.

### Practical Tip
Pause for 10 minutes and verify with an independent source before any payment.'
FROM lessons l
JOIN learning_modules m ON l.module_id = m.id
WHERE m.slug = 'protecting-your-money' AND l.slug = 'spotting-scams'
ON CONFLICT (lesson_id, language) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

INSERT INTO lesson_content (lesson_id, language, title, content)
SELECT l.id, 'en', 'Password Safety Basics',
'## Strong Access Control

Use unique passwords for finance accounts, enable 2FA, and never share one-time codes. Reused passwords turn one leak into many account takeovers.

### Practical Tip
Use passphrases with 4-5 unrelated words and store them in a password manager.'
FROM lessons l
JOIN learning_modules m ON l.module_id = m.id
WHERE m.slug = 'protecting-your-money' AND l.slug = 'password-safety'
ON CONFLICT (lesson_id, language) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

INSERT INTO lesson_content (lesson_id, language, title, content)
SELECT l.id, 'en', 'Mobile Money Security',
'## SIM and Device Risks

Protect your SIM with a PIN, lock your phone, and call your provider immediately if your line stops working unexpectedly. SIM swap attacks can drain wallets quickly.

### Practical Tip
Set lower daily transaction limits if your provider supports it.'
FROM lessons l
JOIN learning_modules m ON l.module_id = m.id
WHERE m.slug = 'protecting-your-money' AND l.slug = 'mobile-money-security'
ON CONFLICT (lesson_id, language) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

INSERT INTO lesson_content (lesson_id, language, title, content)
SELECT l.id, 'en', 'Family Fraud and Boundaries',
'## Safe Support

Helping family is important, but unclear boundaries can cause financial harm. Agree on limits, timelines, and repayment expectations in writing.

### Practical Tip
Use shared notes or messages to document all borrowing agreements, even inside family.'
FROM lessons l
JOIN learning_modules m ON l.module_id = m.id
WHERE m.slug = 'protecting-your-money' AND l.slug = 'family-fraud'
ON CONFLICT (lesson_id, language) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

INSERT INTO lesson_content (lesson_id, language, title, content)
SELECT l.id, 'en', 'Protection Quiz',
'## Check Your Skills

You will answer three practical questions about scam signals, password hygiene, and mobile money safety.'
FROM lessons l
JOIN learning_modules m ON l.module_id = m.id
WHERE m.slug = 'protecting-your-money' AND l.slug = 'protection-quiz'
ON CONFLICT (lesson_id, language) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

-- ===========================================
-- Running a Business Module
-- ===========================================
INSERT INTO lesson_content (lesson_id, language, title, content)
SELECT l.id, 'en', 'Business Budget Foundations',
'## Separate Personal and Business Money

A business budget starts by separating business cash from household spending. This reveals true profit and avoids hidden losses.

### Practical Tip
Use separate wallets/accounts and record every business transaction daily.'
FROM lessons l
JOIN learning_modules m ON l.module_id = m.id
WHERE m.slug = 'running-a-business' AND l.slug = 'business-budget'
ON CONFLICT (lesson_id, language) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

INSERT INTO lesson_content (lesson_id, language, title, content)
SELECT l.id, 'en', 'Pricing for Sustainability',
'## Price With Margin

Set prices that cover cost, overhead, and a target profit margin. Underpricing creates sales volume but can still destroy the business.

### Practical Tip
Review top-selling items monthly and update prices when input costs change.'
FROM lessons l
JOIN learning_modules m ON l.module_id = m.id
WHERE m.slug = 'running-a-business' AND l.slug = 'pricing-basics'
ON CONFLICT (lesson_id, language) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

INSERT INTO lesson_content (lesson_id, language, title, content)
SELECT l.id, 'en', 'Cashflow Tracking',
'## Cash In, Cash Out

Profit on paper is not enough. Track when money enters and leaves your business so you can avoid stock-outs and missed repayments.

### Practical Tip
Create a weekly cashflow forecast for the next four weeks.'
FROM lessons l
JOIN learning_modules m ON l.module_id = m.id
WHERE m.slug = 'running-a-business' AND l.slug = 'cashflow-tracking'
ON CONFLICT (lesson_id, language) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

INSERT INTO lesson_content (lesson_id, language, title, content)
SELECT l.id, 'en', 'Inventory Control Basics',
'## Inventory Discipline

Too much stock locks cash; too little loses sales. Track fast-moving items and reorder with a simple threshold system.

### Practical Tip
Set a minimum stock level and reorder point for every core item.'
FROM lessons l
JOIN learning_modules m ON l.module_id = m.id
WHERE m.slug = 'running-a-business' AND l.slug = 'inventory-control'
ON CONFLICT (lesson_id, language) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

INSERT INTO lesson_content (lesson_id, language, title, content)
SELECT l.id, 'en', 'Business Quiz',
'## Check Your Skills

You will answer three practical questions about budgeting, pricing, cashflow, and inventory.'
FROM lessons l
JOIN learning_modules m ON l.module_id = m.id
WHERE m.slug = 'running-a-business' AND l.slug = 'business-quiz'
ON CONFLICT (lesson_id, language) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

-- ===========================================
-- Planning Your Future Module
-- ===========================================
INSERT INTO lesson_content (lesson_id, language, title, content)
SELECT l.id, 'en', 'Goal Setting That Works',
'## From Wish to Plan

Use specific goals with deadline, amount, and weekly action. Vague goals are easy to postpone; clear goals are easier to execute.

### Practical Tip
Define one 3-month goal and automate a weekly transfer toward it.'
FROM lessons l
JOIN learning_modules m ON l.module_id = m.id
WHERE m.slug = 'planning-your-future' AND l.slug = 'goal-setting'
ON CONFLICT (lesson_id, language) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

INSERT INTO lesson_content (lesson_id, language, title, content)
SELECT l.id, 'en', 'Retirement Basics for Informal Workers',
'## Future Income Matters

Even if your work is informal, long-term savings vehicles and disciplined investing can build retirement security.

### Practical Tip
Start small and increase contributions after every income increase.'
FROM lessons l
JOIN learning_modules m ON l.module_id = m.id
WHERE m.slug = 'planning-your-future' AND l.slug = 'retirement-basics'
ON CONFLICT (lesson_id, language) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

INSERT INTO lesson_content (lesson_id, language, title, content)
SELECT l.id, 'en', 'Insurance Essentials',
'## Protect Against Big Losses

Insurance is not an investment; it transfers risk. Prioritize health and life cover first, then evaluate property or business coverage.

### Practical Tip
Read exclusions carefully before paying any premium.'
FROM lessons l
JOIN learning_modules m ON l.module_id = m.id
WHERE m.slug = 'planning-your-future' AND l.slug = 'insurance-basics'
ON CONFLICT (lesson_id, language) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

INSERT INTO lesson_content (lesson_id, language, title, content)
SELECT l.id, 'en', 'Family Financial Plan',
'## Shared Direction

A family financial plan reduces conflict and speeds progress. Review goals monthly, assign responsibilities, and agree on emergency rules.

### Practical Tip
Keep a one-page family money plan with income targets, debt plan, and safety fund milestones.'
FROM lessons l
JOIN learning_modules m ON l.module_id = m.id
WHERE m.slug = 'planning-your-future' AND l.slug = 'family-plan'
ON CONFLICT (lesson_id, language) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

INSERT INTO lesson_content (lesson_id, language, title, content)
SELECT l.id, 'en', 'Future Planning Quiz',
'## Check Your Skills

You will answer three practical questions on goals, insurance, and long-term financial planning.'
FROM lessons l
JOIN learning_modules m ON l.module_id = m.id
WHERE m.slug = 'planning-your-future' AND l.slug = 'future-quiz'
ON CONFLICT (lesson_id, language) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;
