import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface LessonContentData {
  moduleSlug: string;
  lessonSlug: string;
  title: string;
  content: string;
}

const lessonContent: LessonContentData[] = [
  // Savings Basics Module
  {
    moduleSlug: 'savings-basics',
    lessonSlug: 'why-save',
    title: 'Why Save Money?',
    content: `## The Power of Saving

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

This might seem hard at first, but it becomes automatic over time. Many people find they don't even miss the money after a few months.

### Start Where You Are

You don't need to save a lot to start. Even ₦500 or $5 per week adds up. The habit matters more than the amount. Once you build the habit, you can increase the amount.`
  },
  {
    moduleSlug: 'savings-basics',
    lessonSlug: 'where-to-save',
    title: 'Where to Keep Your Savings',
    content: `## Safe Places for Your Money

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
- Risk if members don't pay
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

Use a combination: a bank account for emergency fund, mobile money for convenience, and a savings group for specific goals.`
  },
  {
    moduleSlug: 'savings-basics',
    lessonSlug: 'building-habit',
    title: 'Building a Savings Habit',
    content: `## Making Saving Automatic

The secret to successful saving isn't willpower—it's making saving automatic so you don't have to think about it.

### Pay Yourself First

Most people try to save what's left after spending. This doesn't work because there's never anything left.

**The better approach:** Save first, then spend what's left.

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

Can't save a large amount at once? Try daily micro-savings:

- ₦200 per day = ₦6,000 per month = ₦72,000 per year
- $2 per day = $60 per month = $720 per year

Many mobile money apps let you set up automatic daily transfers.

### Track Your Progress

What gets measured gets managed. Use a simple notebook or app to track:
- Date
- Amount saved
- Running total
- Notes (what you're saving for)

Seeing your total grow is motivating and keeps you on track.

### Celebrate Milestones

When you reach savings milestones (first ₦10,000, first $100, etc.), celebrate! Not by spending your savings, but by acknowledging your achievement.`
  },
  {
    moduleSlug: 'savings-basics',
    lessonSlug: 'emergency-fund',
    title: 'Your Emergency Fund',
    content: `## Your Financial Safety Net

An emergency fund is money set aside specifically for unexpected events. It's the foundation of financial security.

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
- Rent/housing
- Food
- Transport
- Utilities
- Essential medicine

This is your first target. Divide by 6 to get a monthly savings goal to reach it in 6 months.

### Where to Keep It

Your emergency fund should be:
- **Accessible:** You can get it within 1-2 days
- **Separate:** Not mixed with spending money
- **Safe:** In a bank or trusted institution

A basic savings account is perfect. You don't need high returns—you need reliability.

### The Rule: Touch It Only for Emergencies

Many people save for emergencies, then spend it on non-emergencies. Protect your fund by keeping it in a separate account.`
  },
  {
    moduleSlug: 'savings-basics',
    lessonSlug: 'savings-quiz',
    title: 'Savings Quiz',
    content: `## Test Your Knowledge

Let's see what you've learned about saving money!

This quiz will test your understanding of:
- Why saving matters
- Where to keep your savings
- How to build savings habits
- Emergency fund basics

**Ready?** The quiz will begin when you click Start Quiz.

Good luck!`
  },
  // Smart Borrowing Module
  {
    moduleSlug: 'smart-borrowing',
    lessonSlug: 'understanding-interest',
    title: 'Understanding Interest',
    content: `## The True Cost of Borrowing

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

**Always ask:** "What is the total amount I will repay?"`
  },
  {
    moduleSlug: 'smart-borrowing',
    lessonSlug: 'good-vs-bad-debt',
    title: 'Good Debt vs Bad Debt',
    content: `## Not All Debt Is Equal

Debt is a tool. Like any tool, it can build or destroy depending on how you use it.

### Good Debt: Investments in Your Future

Good debt helps you earn more money or build valuable assets.

**Examples of potentially good debt:**
- Education loan that increases your earning power
- Business loan that generates profit
- Equipment that lets you work more efficiently
- Inventory for a profitable business

**The test:** Will this loan help me earn more than I pay in interest?

### Bad Debt: Consumption That Doesn't Pay Back

Bad debt is borrowing for things that don't generate income or value.

**Examples of bad debt:**
- Borrowing for a celebration or party
- Loans for clothes or electronics you don't need
- Paying for vacations with credit
- Borrowing to lend to others

**The test:** Will I have anything valuable after I finish paying?

### The Worst Debt: Debt to Pay Debt

Taking a new loan to pay an old loan is a dangerous spiral. Each time you do this:
- You pay more fees
- Your total debt grows
- You become more trapped

### The 20% Rule

Never let your total debt payments exceed 20% of your monthly income. Beyond this, you risk financial stress and default.`
  },
  {
    moduleSlug: 'smart-borrowing',
    lessonSlug: 'reading-loan-terms',
    title: 'Reading Loan Terms',
    content: `## What Lenders Don't Want You to Know

Every legitimate loan comes with terms and conditions. Understanding them protects you from costly surprises.

### Key Terms to Understand

**Principal:** The amount you're borrowing

**Interest Rate:** The percentage charged for borrowing
- Ask: Is this monthly or yearly?
- Ask: Simple or compound?

**APR:** Annual Percentage Rate - the true yearly cost

**Tenure/Term:** How long you have to repay

**Processing Fee:** One-time fee for setting up the loan

### Hidden Costs to Watch For

**Early repayment penalties:** Some lenders charge you for paying early!

**Late payment fees:** What happens if you're 1 day late? 1 week?

**Compounding penalties:** Do late fees also earn interest?

**Mandatory insurance:** Is this a good deal or overpriced?

### Red Flags in Loan Agreements

🚩 **No written agreement** - Never borrow without documentation
🚩 **Blank spaces** - Never sign forms with empty fields
🚩 **Verbal promises not in writing** - If it's not written, it doesn't count
🚩 **Pressure to sign immediately** - Good lenders give you time to read
🚩 **Taking your ID or documents** - This is often illegal

### Questions to Ask Every Lender

1. What is the total amount I will repay?
2. What is the APR?
3. What are ALL the fees?
4. What happens if I miss a payment?
5. Can I pay early without penalty?`
  },
  {
    moduleSlug: 'smart-borrowing',
    lessonSlug: 'microloan-options',
    title: 'Microloan Options',
    content: `## Finding Safe, Affordable Loans

When you need to borrow, choosing the right lender is crucial. The difference between a good and bad lender can be thousands in savings.

### Types of Lenders

**Commercial Banks**
- Lowest rates (often 15-30% APR)
- Require documentation and credit history
- Best for larger, longer-term loans

**Microfinance Institutions (MFIs)**
- Moderate rates (20-50% APR)
- Designed for people without bank history
- Good for first-time borrowers

**Mobile Lending Apps**
- Fast approval (minutes to hours)
- High rates (often 100-400% APR)
- Use only for genuine emergencies

**Informal Lenders (Loan Sharks)**
- Extremely high rates (often 300%+ APR)
- Aggressive collection tactics
- **Avoid if possible**

### How to Find a Good MFI

1. **Check registration:** Licensed with your country's financial regulator
2. **Read reviews:** What do other borrowers say?
3. **Compare rates:** Get quotes from at least 3 lenders
4. **Ask about fees:** Get the TOTAL cost, not just interest
5. **Understand repayment:** Weekly? Monthly? What's realistic for you?

### Before You Apply

**Gather documents:**
- ID (national ID, passport)
- Proof of income (pay stubs, bank statements)
- Proof of address (utility bill, lease)
- References (personal or business)`
  },
  {
    moduleSlug: 'smart-borrowing',
    lessonSlug: 'borrowing-quiz',
    title: 'Smart Borrowing Quiz',
    content: `## Test Your Knowledge

Let's see what you've learned about borrowing money wisely!

This quiz will test your understanding of:
- Interest rates and APR
- Good debt vs bad debt
- Reading loan terms
- Finding safe lenders

**Ready?** The quiz will begin when you click Start Quiz.

Good luck!`
  }
];

async function seedLessonContent() {
  console.log('Starting lesson content seed...');

  // First, get all modules and lessons
  const { data: modules, error: modError } = await supabase
    .from('learning_modules')
    .select('id, slug');

  if (modError) {
    console.error('Error fetching modules:', modError);
    return;
  }

  console.log(`Found ${modules?.length || 0} modules`);

  const { data: lessons, error: lessonError } = await supabase
    .from('lessons')
    .select('id, slug, module_id');

  if (lessonError) {
    console.error('Error fetching lessons:', lessonError);
    return;
  }

  console.log(`Found ${lessons?.length || 0} lessons`);

  // Create a map for quick lookup
  const moduleMap = new Map(modules?.map(m => [m.slug, m.id]) || []);
  const lessonMap = new Map(
    lessons?.map(l => {
      const moduleSlug = modules?.find(m => m.id === l.module_id)?.slug;
      return [`${moduleSlug}:${l.slug}`, l.id];
    }) || []
  );

  console.log('Module map:', Object.fromEntries(moduleMap));
  console.log('Lesson map keys:', Array.from(lessonMap.keys()));

  // Insert lesson content
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const content of lessonContent) {
    const key = `${content.moduleSlug}:${content.lessonSlug}`;
    const lessonId = lessonMap.get(key);

    if (!lessonId) {
      console.log(`Skipping ${key} - lesson not found in database`);
      skipCount++;
      continue;
    }

    // Check if content already exists
    const { data: existing } = await supabase
      .from('lesson_content')
      .select('id')
      .eq('lesson_id', lessonId)
      .eq('language', 'en')
      .single();

    if (existing) {
      console.log(`Updating ${key}...`);
      const { error } = await supabase
        .from('lesson_content')
        .update({
          title: content.title,
          content: content.content
        })
        .eq('id', existing.id);

      if (error) {
        console.error(`Error updating ${key}:`, error);
        errorCount++;
      } else {
        successCount++;
      }
    } else {
      console.log(`Inserting ${key}...`);
      const { error } = await supabase
        .from('lesson_content')
        .insert({
          lesson_id: lessonId,
          language: 'en',
          title: content.title,
          content: content.content
        });

      if (error) {
        console.error(`Error inserting ${key}:`, error);
        errorCount++;
      } else {
        successCount++;
      }
    }
  }

  console.log(`\nSeed complete!`);
  console.log(`Success: ${successCount}`);
  console.log(`Skipped: ${skipCount}`);
  console.log(`Errors: ${errorCount}`);
}

seedLessonContent().catch(console.error);
