-- FinWise Quiz Seed Data
-- Three-question quizzes per lesson

INSERT INTO quizzes (lesson_id, questions)
SELECT
  l.id,
  jsonb_build_array(
    jsonb_build_object(
      'id', l.slug || '-q1',
      'question', 'What is the most important first step in this lesson topic?',
      'options', jsonb_build_array('Ignore the details', 'Understand total cost and risk', 'Borrow more than needed', 'Skip written terms'),
      'correct_index', 1,
      'explanation', 'Strong financial choices start by understanding the real cost, terms, and risks before acting.'
    ),
    jsonb_build_object(
      'id', l.slug || '-q2',
      'question', 'Which choice best protects your financial stability?',
      'options', jsonb_build_array('Use informal shortcuts', 'Rely on luck', 'Plan ahead with records and buffers', 'Sign first and ask later'),
      'correct_index', 2,
      'explanation', 'Planning, keeping records, and maintaining a small buffer reduce avoidable financial shocks.'
    ),
    jsonb_build_object(
      'id', l.slug || '-q3',
      'question', 'What should you do before committing to a financial product?',
      'options', jsonb_build_array('Compare alternatives and read terms', 'Accept the first offer', 'Only trust verbal promises', 'Hide important information'),
      'correct_index', 0,
      'explanation', 'Comparing alternatives and reviewing full terms helps you avoid hidden fees and bad offers.'
    )
  )
FROM lessons l
ON CONFLICT (lesson_id) DO UPDATE
SET questions = EXCLUDED.questions;
