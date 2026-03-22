-- FinWise Lesson Content Seed Data
-- English content for all lessons

-- ===========================================
-- Savings Basics Module - Lesson Content
-- ===========================================

-- Why Save Money?
INSERT INTO lesson_content (lesson_id, language, title, content)
SELECT l.id, 'en', 'Why Save Money?',
'## The Power of Saving

Saving money is one of the most important financial habits you can develop. Even small amounts, saved regularly, can grow into something significant over time.

### Why Does Saving Matter?

**1. Protection Against Emergencies**
Life is unpredictable. Your phone might break, you might get sick, or your business might have a slow month. Without savings, these events can become crises. With savings, they become manageable challenges.

**2. Freedom to Make Choices**
When you have savings, you can say "no" to a bad loan. You can take time to find the right job. You can invest in an opportunity when it appears. Savings give you options.

**3. Building Wealth Over Time**
Every wealthy person started by spending less than they earned. The difference between what you earn and what you spend is the foundation of all wealth.

### The 10% Rule

A simple rule used around the world: save 10% of everything you earn. If you earn ₦50,000, save ₦5,000. If you earn $100, save $10.

This might seem hard at first, but it becomes automatic over time. Many people find they don''t even miss the money after a few months.

### Start Where You Are

You don''t need to save a lot to start. Even ₦500 or $5 per week adds up. The habit matters more than the amount. Once you build the habit, you can increase the amount.'
FROM lessons l
JOIN learning_modules m ON l.module_id = m.id
WHERE m.slug = 'savings-basics' AND l.slug = 'why-save';

-- Where to Keep Your Savings
INSERT INTO lesson_content (lesson_id, language, title, content)
SELECT l.id, 'en', 'Where to Keep Your Savings',
'## Safe Places for Your Money

Where you keep your savings matters almost as much as how much you save. The wrong place can cost you money or put your savings at risk.

### Option 1: Bank Savings Account

**Pros:**
- Your money is protected by deposit insurance
- Earns a small amount of interest
- Easy to access when needed
- Protected from theft

**Cons:**
- May have minimum balance requirements
- Some banks charge monthly fees
- Interest rates are often low

**Best for:** Long-term savings and emergency funds

### Option 2: Mobile Money Account

**Pros:**
- Easy to open with just a phone
- No minimum balance
- Can save directly from phone
- Available in remote areas

**Cons:**
- Transaction fees add up
- Limited interest earnings
- Risk of fraud via SIM swaps

**Best for:** Short-term savings and daily transactions

### Option 3: Savings Groups (Chama/Esusu/Paluwagan)

**Pros:**
- Social accountability helps you save
- No fees
- Build community trust
- Larger payouts at intervals

**Cons:**
- Risk if members don''t pay
- Fixed amount requirements
- Less flexibility

**Best for:** Goal-based savings with a community

### The Hidden Cost of Cash at Home

Keeping cash at home feels safe, but it has hidden costs:
- Inflation reduces its value over time
- Risk of theft or fire
- Too easy to spend
- Earns nothing

### Our Recommendation

Use a combination: a bank account for emergency fund, mobile money for convenience, and a savings group for specific goals.'
FROM lessons l
JOIN learning_modules m ON l.module_id = m.id
WHERE m.slug = 'savings-basics' AND l.slug = 'where-to-save';

-- Building a Savings Habit
INSERT INTO lesson_content (lesson_id, language, title, content)
SELECT l.id, 'en', 'Building a Savings Habit',
'## Making Saving Automatic

The secret to successful saving isn''t willpower—it''s making saving automatic so you don''t have to think about it.

### Pay Yourself First

Most people try to save what''s left after spending. This doesn''t work because there''s never anything left.

**The better approach:** Save first, then spend what''s left.

When you receive income:
1. Immediately move your savings amount to a separate account
2. Pay your essential bills
3. Use whatever remains for other spending

### The Envelope Method

If you deal mostly in cash, try the envelope method:

1. Get several envelopes
2. Label them: Rent, Food, Transport, Savings, Emergency
3. When you get paid, divide cash into envelopes
4. Only spend from each envelope for its purpose
5. Never borrow from the Savings envelope

### Small Daily Savings

Can''t save a large amount at once? Try daily micro-savings:

- ₦200 per day = ₦6,000 per month = ₦72,000 per year
- $2 per day = $60 per month = $720 per year

Many mobile money apps let you set up automatic daily transfers.

### Track Your Progress

What gets measured gets managed. Use a simple notebook or app to track:
- Date
- Amount saved
- Running total
- Notes (what you''re saving for)

Seeing your total grow is motivating and keeps you on track.

### Celebrate Milestones

When you reach savings milestones (first ₦10,000, first $100, etc.), celebrate! Not by spending your savings, but by acknowledging your achievement. This positive reinforcement makes the habit stick.'
FROM lessons l
JOIN learning_modules m ON l.module_id = m.id
WHERE m.slug = 'savings-basics' AND l.slug = 'building-habit';

-- Your Emergency Fund
INSERT INTO lesson_content (lesson_id, language, title, content)
SELECT l.id, 'en', 'Your Emergency Fund',
'## Your Financial Safety Net

An emergency fund is money set aside specifically for unexpected events. It''s the foundation of financial security.

### What Counts as an Emergency?

**Real emergencies:**
- Medical bills
- Urgent home repairs
- Job loss
- Family crisis
- Essential equipment breaking

**Not emergencies:**
- Sales or "limited offers"
- Wanting something new
- Planned expenses you forgot about
- Lifestyle upgrades

### How Much Do You Need?

**Starter goal:** One month of essential expenses
This covers rent, food, transport, and utilities for one month.

**Standard goal:** Three months of essential expenses
This gives you time to recover from most setbacks.

**Strong position:** Six months of essential expenses
This provides security even through extended job loss.

### Building Your Emergency Fund

Start with the starter goal. Calculate your monthly essentials:
- Rent/housing: _____
- Food: _____
- Transport: _____
- Utilities: _____
- Essential medicine: _____
- **Total: _____**

This is your first target. Divide by 6 to get a monthly savings goal to reach it in 6 months.

### Where to Keep It

Your emergency fund should be:
- **Accessible:** You can get it within 1-2 days
- **Separate:** Not mixed with spending money
- **Safe:** In a bank or trusted institution

A basic savings account is perfect. You don''t need high returns—you need reliability.

### The Rule: Touch It Only for Emergencies

Many people save for emergencies, then spend it on non-emergencies. Protect your fund:
- Keep it in a separate account
- Make it slightly inconvenient to access
- Ask yourself: "Is this a true emergency?" before withdrawing'
FROM lessons l
JOIN learning_modules m ON l.module_id = m.id
WHERE m.slug = 'savings-basics' AND l.slug = 'emergency-fund';

-- Savings Quiz (placeholder content)
INSERT INTO lesson_content (lesson_id, language, title, content)
SELECT l.id, 'en', 'Savings Quiz',
'## Test Your Knowledge

Let''s see what you''ve learned about saving money!

This quiz will test your understanding of:
- Why saving matters
- Where to keep your savings
- How to build savings habits
- Emergency fund basics

**Ready?** Click "Start Quiz" to begin.

Good luck!'
FROM lessons l
JOIN learning_modules m ON l.module_id = m.id
WHERE m.slug = 'savings-basics' AND l.slug = 'savings-quiz';

-- ===========================================
-- Smart Borrowing Module - Lesson Content
-- ===========================================

-- Understanding Interest
INSERT INTO lesson_content (lesson_id, language, title, content)
SELECT l.id, 'en', 'Understanding Interest',
'## The True Cost of Borrowing

Interest is the cost of borrowing money. Understanding it is the difference between a loan that helps you and one that traps you.

### Simple vs. Compound Interest

**Simple Interest:** Calculated only on the original amount borrowed.
- Borrow ₦100,000 at 2% monthly simple interest
- Interest each month: ₦2,000
- After 12 months: ₦24,000 total interest

**Compound Interest:** Calculated on the amount borrowed PLUS accumulated interest.
- Borrow ₦100,000 at 2% monthly compound interest
- Month 1: ₦2,000 interest
- Month 2: Interest on ₦102,000 = ₦2,040
- After 12 months: ₦26,824 total interest

Compound interest grows faster and is common with credit cards and informal lenders.

### APR: The Number That Matters

APR (Annual Percentage Rate) is the true yearly cost of a loan, including fees.

**How to calculate monthly rate to APR:**
- 5% per month × 12 = 60% APR
- 10% per week × 52 = 520% APR (extremely predatory!)
- 1% per month × 12 = 12% APR (reasonable for formal lenders)

### The "Small Percentage" Trap

Lenders often quote rates that sound small:
- "Only 5% per month!" = 60% per year
- "Just 2% per week!" = 104% per year
- "A small 8% processing fee!" = Hidden cost added to your loan

**Always ask:** "What is the total amount I will repay?"

### Example: Two Loan Offers

**Loan A:** ₦100,000 at 3% monthly for 12 months
- Monthly payment: ₦10,500
- Total repayment: ₦126,000
- Total interest: ₦26,000

**Loan B:** ₦100,000 at 25% APR for 12 months
- Monthly payment: ₦9,500
- Total repayment: ₦114,000
- Total interest: ₦14,000

Loan B costs less even though Loan A advertised a smaller number!'
FROM lessons l
JOIN learning_modules m ON l.module_id = m.id
WHERE m.slug = 'smart-borrowing' AND l.slug = 'understanding-interest';

-- Good vs Bad Debt
INSERT INTO lesson_content (lesson_id, language, title, content)
SELECT l.id, 'en', 'Good Debt vs Bad Debt',
'## Not All Debt Is Equal

Debt is a tool. Like any tool, it can build or destroy depending on how you use it.

### Good Debt: Investments in Your Future

Good debt helps you earn more money or build valuable assets.

**Examples of potentially good debt:**
- Education loan that increases your earning power
- Business loan that generates profit
- Equipment that lets you work more efficiently
- Inventory for a profitable business

**The test:** Will this loan help me earn more than I pay in interest?

### Bad Debt: Consumption That Doesn''t Pay Back

Bad debt is borrowing for things that don''t generate income or value.

**Examples of bad debt:**
- Borrowing for a celebration or party
- Loans for clothes or electronics you don''t need
- Paying for vacations with credit
- Borrowing to lend to others

**The test:** Will I have anything valuable after I finish paying?

### The Worst Debt: Debt to Pay Debt

Taking a new loan to pay an old loan is a dangerous spiral. Each time you do this:
- You pay more fees
- Your total debt grows
- You become more trapped

If you''re in this situation, stop borrowing and focus on paying down what you owe.

### When Borrowing Makes Sense

Ask these questions before any loan:
1. **Is this a need or a want?**
2. **Can I afford the monthly payments?**
3. **What is the total cost including interest and fees?**
4. **Will this loan help me earn money?**
5. **What happens if I can''t pay?**

If you can''t answer all five confidently, don''t borrow.

### The 20% Rule

Never let your total debt payments exceed 20% of your monthly income. Beyond this, you risk financial stress and default.'
FROM lessons l
JOIN learning_modules m ON l.module_id = m.id
WHERE m.slug = 'smart-borrowing' AND l.slug = 'good-vs-bad-debt';

-- Reading Loan Terms
INSERT INTO lesson_content (lesson_id, language, title, content)
SELECT l.id, 'en', 'Reading Loan Terms',
'## What Lenders Don''t Want You to Know

Every legitimate loan comes with terms and conditions. Understanding them protects you from costly surprises.

### Key Terms to Understand

**Principal:** The amount you''re borrowing

**Interest Rate:** The percentage charged for borrowing
- Ask: Is this monthly or yearly?
- Ask: Simple or compound?

**APR:** Annual Percentage Rate - the true yearly cost

**Tenure/Term:** How long you have to repay

**Processing Fee:** One-time fee for setting up the loan
- Often 1-5% of the loan amount
- Deducted from what you receive

**Insurance:** Some lenders require loan insurance
- Adds to your cost
- May or may not be optional

### Hidden Costs to Watch For

**Early repayment penalties:** Some lenders charge you for paying early!

**Late payment fees:** What happens if you''re 1 day late? 1 week?

**Compounding penalties:** Do late fees also earn interest?

**Mandatory insurance:** Is this a good deal or overpriced?

**"Processing" fees:** Are there multiple fees that add up?

### Red Flags in Loan Agreements

🚩 **No written agreement** - Never borrow without documentation
🚩 **Blank spaces** - Never sign forms with empty fields
🚩 **Verbal promises not in writing** - If it''s not written, it doesn''t count
🚩 **Pressure to sign immediately** - Good lenders give you time to read
🚩 **Taking your ID or documents** - This is often illegal

### Questions to Ask Every Lender

1. What is the total amount I will repay?
2. What is the APR?
3. What are ALL the fees?
4. What happens if I miss a payment?
5. Can I pay early without penalty?
6. Do you have a license/registration number?

**Write down the answers.** Honest lenders won''t mind.'
FROM lessons l
JOIN learning_modules m ON l.module_id = m.id
WHERE m.slug = 'smart-borrowing' AND l.slug = 'reading-loan-terms';

-- Microloan Options
INSERT INTO lesson_content (lesson_id, language, title, content)
SELECT l.id, 'en', 'Microloan Options',
'## Finding Safe, Affordable Loans

When you need to borrow, choosing the right lender is crucial. The difference between a good and bad lender can be thousands in savings.

### Types of Lenders

**Commercial Banks**
- Lowest rates (often 15-30% APR)
- Require documentation and credit history
- Longer approval process
- Best for larger, longer-term loans

**Microfinance Institutions (MFIs)**
- Moderate rates (20-50% APR)
- Designed for people without bank history
- Often use group lending models
- Good for first-time borrowers

**Mobile Lending Apps**
- Fast approval (minutes to hours)
- High rates (often 100-400% APR)
- Easy to access, easy to over-borrow
- Use only for genuine emergencies

**Informal Lenders (Loan Sharks)**
- Extremely high rates (often 300%+ APR)
- Aggressive collection tactics
- No legal protections
- **Avoid if possible**

### How to Find a Good MFI

1. **Check registration:** Licensed with your country''s financial regulator
2. **Read reviews:** What do other borrowers say?
3. **Compare rates:** Get quotes from at least 3 lenders
4. **Ask about fees:** Get the TOTAL cost, not just interest
5. **Understand repayment:** Weekly? Monthly? What''s realistic for you?

### The Group Lending Model

Many MFIs use group lending:
- You join a group of 5-20 borrowers
- Everyone guarantees each other''s loans
- If one person defaults, the group must pay
- This keeps rates lower but requires trust

**Pros:** Lower rates, built-in support network
**Cons:** Peer pressure, group liability

### Before You Apply

**Gather documents:**
- ID (national ID, passport)
- Proof of income (pay stubs, bank statements)
- Proof of address (utility bill, lease)
- References (personal or business)

**Know your numbers:**
- How much do you need? (Only borrow what you need)
- What can you afford monthly? (Be honest)
- What is the money for? (Lenders will ask)'
FROM lessons l
JOIN learning_modules m ON l.module_id = m.id
WHERE m.slug = 'smart-borrowing' AND l.slug = 'microloan-options';

-- Borrowing Quiz
INSERT INTO lesson_content (lesson_id, language, title, content)
SELECT l.id, 'en', 'Smart Borrowing Quiz',
'## Test Your Knowledge

Let''s see what you''ve learned about borrowing money wisely!

This quiz will test your understanding of:
- Interest rates and APR
- Good debt vs bad debt
- Reading loan terms
- Finding safe lenders

**Ready?** Click "Start Quiz" to begin.

Good luck!'
FROM lessons l
JOIN learning_modules m ON l.module_id = m.id
WHERE m.slug = 'smart-borrowing' AND l.slug = 'borrowing-quiz';
