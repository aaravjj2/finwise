-- FinWise Seed Data
-- Learning Modules and Institutions

-- ===========================================
-- Learning Modules
-- ===========================================
INSERT INTO learning_modules (slug, title_key, description_key, difficulty, estimated_minutes, icon_emoji, order_index, prerequisites) VALUES
  ('savings-basics', 'modules.savings_basics.title', 'modules.savings_basics.description', 1, 25, '🏦', 1, '{}'),
  ('smart-borrowing', 'modules.smart_borrowing.title', 'modules.smart_borrowing.description', 2, 30, '💳', 2, '{"savings-basics"}'),
  ('sending-money-home', 'modules.remittance.title', 'modules.remittance.description', 1, 20, '💸', 3, '{}'),
  ('protecting-your-money', 'modules.protection.title', 'modules.protection.description', 2, 25, '🛡️', 4, '{"savings-basics"}'),
  ('running-a-business', 'modules.business.title', 'modules.business.description', 3, 35, '🏪', 5, '{"savings-basics","smart-borrowing"}'),
  ('planning-your-future', 'modules.future.title', 'modules.future.description', 3, 40, '🌱', 6, '{"savings-basics","protecting-your-money"}');

-- ===========================================
-- Lessons for Savings Basics Module
-- ===========================================
INSERT INTO lessons (module_id, slug, title_key, order_index, estimated_minutes)
SELECT
  m.id,
  l.slug,
  l.title_key,
  l.order_index,
  l.estimated_minutes
FROM learning_modules m
CROSS JOIN (VALUES
  ('why-save', 'lessons.savings_basics.why_save.title', 1, 5),
  ('where-to-save', 'lessons.savings_basics.where_to_save.title', 2, 5),
  ('building-habit', 'lessons.savings_basics.building_habit.title', 3, 5),
  ('emergency-fund', 'lessons.savings_basics.emergency_fund.title', 4, 5),
  ('savings-quiz', 'lessons.savings_basics.quiz.title', 5, 5)
) AS l(slug, title_key, order_index, estimated_minutes)
WHERE m.slug = 'savings-basics';

-- ===========================================
-- Lessons for Smart Borrowing Module
-- ===========================================
INSERT INTO lessons (module_id, slug, title_key, order_index, estimated_minutes)
SELECT
  m.id,
  l.slug,
  l.title_key,
  l.order_index,
  l.estimated_minutes
FROM learning_modules m
CROSS JOIN (VALUES
  ('understanding-interest', 'lessons.smart_borrowing.understanding_interest.title', 1, 6),
  ('good-vs-bad-debt', 'lessons.smart_borrowing.good_vs_bad_debt.title', 2, 6),
  ('reading-loan-terms', 'lessons.smart_borrowing.reading_loan_terms.title', 3, 6),
  ('microloan-options', 'lessons.smart_borrowing.microloan_options.title', 4, 6),
  ('borrowing-quiz', 'lessons.smart_borrowing.quiz.title', 5, 6)
) AS l(slug, title_key, order_index, estimated_minutes)
WHERE m.slug = 'smart-borrowing';

-- ===========================================
-- Lessons for Sending Money Home Module
-- ===========================================
INSERT INTO lessons (module_id, slug, title_key, order_index, estimated_minutes)
SELECT
  m.id,
  l.slug,
  l.title_key,
  l.order_index,
  l.estimated_minutes
FROM learning_modules m
CROSS JOIN (VALUES
  ('why-remit', 'lessons.remittance.why_remit.title', 1, 4),
  ('provider-fees', 'lessons.remittance.provider_fees.title', 2, 4),
  ('exchange-rates', 'lessons.remittance.exchange_rates.title', 3, 4),
  ('safe-transfers', 'lessons.remittance.safe_transfers.title', 4, 4),
  ('remittance-quiz', 'lessons.remittance.quiz.title', 5, 4)
) AS l(slug, title_key, order_index, estimated_minutes)
WHERE m.slug = 'sending-money-home';

-- ===========================================
-- Lessons for Protecting Your Money Module
-- ===========================================
INSERT INTO lessons (module_id, slug, title_key, order_index, estimated_minutes)
SELECT
  m.id,
  l.slug,
  l.title_key,
  l.order_index,
  l.estimated_minutes
FROM learning_modules m
CROSS JOIN (VALUES
  ('spotting-scams', 'lessons.protection.spotting_scams.title', 1, 5),
  ('password-safety', 'lessons.protection.password_safety.title', 2, 5),
  ('mobile-money-security', 'lessons.protection.mobile_money_security.title', 3, 5),
  ('family-fraud', 'lessons.protection.family_fraud.title', 4, 5),
  ('protection-quiz', 'lessons.protection.quiz.title', 5, 5)
) AS l(slug, title_key, order_index, estimated_minutes)
WHERE m.slug = 'protecting-your-money';

-- ===========================================
-- Lessons for Running a Business Module
-- ===========================================
INSERT INTO lessons (module_id, slug, title_key, order_index, estimated_minutes)
SELECT
  m.id,
  l.slug,
  l.title_key,
  l.order_index,
  l.estimated_minutes
FROM learning_modules m
CROSS JOIN (VALUES
  ('business-budget', 'lessons.business.business_budget.title', 1, 7),
  ('pricing-basics', 'lessons.business.pricing_basics.title', 2, 7),
  ('cashflow-tracking', 'lessons.business.cashflow_tracking.title', 3, 7),
  ('inventory-control', 'lessons.business.inventory_control.title', 4, 7),
  ('business-quiz', 'lessons.business.quiz.title', 5, 7)
) AS l(slug, title_key, order_index, estimated_minutes)
WHERE m.slug = 'running-a-business';

-- ===========================================
-- Lessons for Planning Your Future Module
-- ===========================================
INSERT INTO lessons (module_id, slug, title_key, order_index, estimated_minutes)
SELECT
  m.id,
  l.slug,
  l.title_key,
  l.order_index,
  l.estimated_minutes
FROM learning_modules m
CROSS JOIN (VALUES
  ('goal-setting', 'lessons.future.goal_setting.title', 1, 8),
  ('retirement-basics', 'lessons.future.retirement_basics.title', 2, 8),
  ('insurance-basics', 'lessons.future.insurance_basics.title', 3, 8),
  ('family-plan', 'lessons.future.family_plan.title', 4, 8),
  ('future-quiz', 'lessons.future.quiz.title', 5, 8)
) AS l(slug, title_key, order_index, estimated_minutes)
WHERE m.slug = 'planning-your-future';

-- ===========================================
-- Badges
-- ===========================================
INSERT INTO badges (slug, name_key, description_key, icon_emoji) VALUES
  ('first-step', 'badges.first_step', 'badges.first_step_desc', '👣'),
  ('saver', 'badges.saver', 'badges.saver_desc', '💰'),
  ('borrower', 'badges.borrower', 'badges.borrower_desc', '📚'),
  ('protector', 'badges.protector', 'badges.protector_desc', '🛡️'),
  ('entrepreneur', 'badges.entrepreneur', 'badges.entrepreneur_desc', '🏪'),
  ('scholar', 'badges.scholar', 'badges.scholar_desc', '🎓'),
  ('streak-7', 'badges.streak_7', 'badges.streak_7_desc', '🔥'),
  ('streak-30', 'badges.streak_30', 'badges.streak_30_desc', '⭐');

-- ===========================================
-- Institutions (Sample Data)
-- ===========================================
INSERT INTO institutions (name, type, country_code, website, phone, interest_rate_min, interest_rate_max, accepts_first_time_borrowers, requires_collateral, description, verified) VALUES
  ('LAPO Microfinance Bank', 'microfinance', 'NG', 'https://laikipia.ac.ke', '+234-1-234-5678', 18.0, 36.0, true, false, 'One of Nigeria''s largest microfinance banks. Offers loans without collateral for first-time borrowers. Known for fair rates and financial literacy programs.', true),
  ('Kenya Women Microfinance Bank', 'microfinance', 'KE', 'https://kwftbank.co.ke', '+254-20-271-5122', 15.0, 30.0, true, false, 'Women-focused microfinance bank offering loans, savings, and financial education. Special programs for market vendors and small business owners.', true),
  ('BRAC', 'ngo', 'BD', 'https://www.brac.net', '+880-2-9881265', 12.0, 27.0, true, false, 'World''s largest NGO focused on poverty alleviation. Pioneered microcredit and offers comprehensive financial inclusion programs.', true),
  ('ASA Philippines', 'microfinance', 'PH', 'https://asaphilippines.com', '+63-2-8893-2232', 16.0, 32.0, true, false, 'Leading microfinance institution in the Philippines. Group lending model with weekly repayments and financial literacy training.', true),
  ('Bharat Financial Inclusion (SKS)', 'microfinance', 'IN', 'https://bharatfinancial.com', '+91-40-2330-4000', 14.0, 26.0, true, false, 'Major Indian microfinance institution serving rural women. Offers income-generating loans and insurance products.', true),
  ('Compartamos Banco', 'bank', 'MX', 'https://www.compartamos.com', '+52-55-5351-5100', 20.0, 45.0, true, false, 'Mexico''s first bank to focus on microfinance. Serves low-income entrepreneurs with small business loans.', true),
  ('BancoSol', 'bank', 'BO', 'https://www.bancosol.com.bo', '+591-2-248-7878', 12.0, 28.0, true, false, 'Bolivia''s pioneering commercial microfinance bank. Offers savings accounts, loans, and remittance services.', true),
  ('FINCA Uganda', 'microfinance', 'UG', 'https://finca.ug', '+256-414-340-424', 18.0, 35.0, true, false, 'Part of FINCA International, offering village banking loans. Group lending with progressive loan sizes based on repayment history.', true),
  ('Equity Bank', 'bank', 'KE', 'https://equitygroupholdings.com', '+254-763-063-000', 14.0, 24.0, true, true, 'Kenya''s largest bank by customer base. Mobile-first banking with USSD services that work on basic phones.', true),
  ('bKash', 'mobile_money', 'BD', 'https://www.bkash.com', '+880-1-711-178-247', NULL, NULL, true, false, 'Bangladesh''s leading mobile financial service. Enables payments, transfers, and savings via mobile phone without a bank account.', true);

-- ===========================================
-- Remittance Providers
-- ===========================================
INSERT INTO remittance_providers (name, send_countries, receive_countries, fee_percentage, flat_fee, exchange_rate_markup, transfer_time, website) VALUES
  ('WorldRemit', '{"US","GB","CA","AU"}', '{"NG","KE","GH","PH","IN","BD","PK"}', 1.5, 3.99, 1.0, '1-2 business days', 'https://www.worldremit.com'),
  ('Wise (TransferWise)', '{"US","GB","CA","AU","EU"}', '{"NG","KE","IN","PH","MX","BR"}', 0.5, 2.00, 0.3, '1-2 business days', 'https://wise.com'),
  ('Remitly', '{"US","GB","CA","AU"}', '{"PH","IN","MX","GT","HN"}', 1.0, 2.99, 0.8, 'Minutes to 3 days', 'https://www.remitly.com'),
  ('Western Union', '{"US","GB","CA","AU","EU"}', '{"NG","KE","GH","IN","PH","BD","MX"}', 3.0, 5.00, 2.0, 'Minutes to 5 days', 'https://www.westernunion.com'),
  ('M-PESA Global', '{"GB","US"}', '{"KE","TZ","UG","RW"}', 0.8, 1.50, 0.5, 'Instant', 'https://www.safaricom.co.ke/personal/m-pesa');
