# Contributing to FinWise

Thank you for your interest in contributing to FinWise! We're building an AI-powered financial literacy platform for the 1.4 billion unbanked adults worldwide.

## 🌟 How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/aaravjj2/finwise/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Environment details (OS, browser, Node version)

### Suggesting Features

1. Check [existing feature requests](https://github.com/aaravjj2/finwise/issues?q=is%3Aissue+label%3Aenhancement)
2. Create a new issue with the `enhancement` label
3. Describe:
   - The problem you're solving
   - Your proposed solution
   - Alternative approaches considered
   - Impact on users

### Code Contributions

#### Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/finwise.git
   cd finwise
   ```

2. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

3. **Set up development environment**
   ```bash
   npm install
   cp .env.example .env.local
   # Fill in your environment variables
   ```

4. **Make your changes**
   - Write clean, maintainable code
   - Follow the existing code style
   - Add tests for new features
   - Update documentation

5. **Test your changes**
   ```bash
   npm run lint        # Check code style
   npm test            # Run unit tests
   npm run build       # Verify build works
   ```

6. **Commit with conventional commits**
   ```bash
   git commit -m "feat: add loan comparison feature"
   git commit -m "fix: resolve currency formatting bug"
   git commit -m "docs: update API documentation"
   ```

7. **Push and create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

## 📋 Development Guidelines

### Code Style

- **TypeScript**: Use strict mode, no `any` types
- **React**: Functional components with hooks
- **Naming**:
  - Components: PascalCase (`ChatContainer.tsx`)
  - Files: kebab-case for utilities (`loan-calculator.ts`)
  - Variables: camelCase
- **Imports**: Organize by external → internal → relative
- **Comments**: Write clear, concise comments for complex logic

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting, missing semicolons, etc.
refactor: code restructuring
test: adding tests
chore: updating build tasks, package manager configs, etc.
```

### Testing Requirements

- **Unit tests** for all utility functions
- **Component tests** for complex UI logic
- **E2E tests** for critical user flows
- Maintain **>80% code coverage**

```bash
# Run tests before committing
npm test -- --run
```

### TypeScript Guidelines

```typescript
// ✅ Good
interface UserProfile {
  id: string;
  name: string;
  country: string;
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

// ❌ Avoid
function doSomething(data: any) { // Don't use 'any'
  // ...
}
```

### React Best Practices

```typescript
// ✅ Use functional components
export function ChatInput({ onSend }: ChatInputProps): JSX.Element {
  const [message, setMessage] = useState('');

  return (
    <form onSubmit={handleSubmit}>
      {/* ... */}
    </form>
  );
}

// ✅ Extract complex logic to custom hooks
function useChat(conversationId?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  // ...
  return { messages, sendMessage, isLoading };
}

// ❌ Avoid class components
class OldComponent extends React.Component { /* ... */ }
```

### Internationalization (i18n)

When adding UI text:

1. Add to `messages/en.json`
2. Use `useTranslations` hook
3. Submit PR with English text (translations will follow)

```typescript
// In component
const t = useTranslations('chat');

// In template
<button>{t('send_button')}</button>

// In messages/en.json
{
  "chat": {
    "send_button": "Send"
  }
}
```

## 🏗️ Project Architecture

### Key Directories

- `app/` - Next.js App Router pages and API routes
- `components/` - Reusable UI components
- `lib/` - Core business logic and utilities
- `hooks/` - Custom React hooks
- `types/` - TypeScript type definitions
- `supabase/` - Database migrations and seeds

### State Management

- **Server state**: TanStack Query (React Query)
- **Client state**: Zustand for global state
- **Form state**: React Hook Form (if added)

### API Routes

Place API routes in `app/api/`:
```typescript
// app/api/example/route.ts
export async function POST(req: Request): Promise<Response> {
  // Validate input
  // Process request
  // Return response
}
```

## 🧪 Testing Strategy

### Unit Tests (Vitest)

Test utility functions and hooks:

```typescript
// tests/unit/loan-calculator.test.ts
import { describe, it, expect } from 'vitest';
import { calculateAPR } from '@/lib/loan-calculator';

describe('calculateAPR', () => {
  it('calculates APR correctly', () => {
    const result = calculateAPR(1000, 50, 12);
    expect(result).toBeCloseTo(60.0, 1);
  });
});
```

### E2E Tests (Playwright)

Test critical user flows:

```typescript
// tests/e2e/login.spec.ts
import { test, expect } from '@playwright/test';

test('user can log in with phone number', async ({ page }) => {
  await page.goto('/en/login');
  await page.fill('[placeholder="Phone number"]', '+1234567890');
  await page.click('button:has-text("Send Code")');
  // ...
});
```

## 🌍 Translations

Help translate FinWise to more languages!

1. Copy `messages/en.json` to `messages/[locale].json`
2. Translate all strings
3. Update `i18n.ts` to include the new locale
4. Test the UI in the new language

Priority languages:
- Tagalog (tl)
- Spanish (es)
- Portuguese (pt)
- Hausa (ha)
- Amharic (am)

## 📝 Documentation

### Adding Documentation

- **API changes**: Update relevant README sections
- **New features**: Add usage examples
- **Configuration**: Update `.env.example`

### Documentation Files

- `README.md` - Main project documentation
- `CONTRIBUTING.md` - This file
- `docs/` - Additional documentation (API, architecture, etc.)

## 🔍 Code Review Process

### What Reviewers Look For

- ✅ Code follows style guidelines
- ✅ Tests pass and coverage maintained
- ✅ No console errors or warnings
- ✅ Accessible UI (keyboard navigation, screen readers)
- ✅ Mobile-responsive design
- ✅ Performance considerations
- ✅ Security best practices

### Checklist Before PR

- [ ] Code builds without errors (`npm run build`)
- [ ] All tests pass (`npm test -- --run`)
- [ ] Linting passes (`npm run lint`)
- [ ] TypeScript compiles (`npx tsc --noEmit`)
- [ ] Tested on mobile viewport
- [ ] Documentation updated
- [ ] Conventional commit messages

## 🤝 Community

- **Questions?** Open a [Discussion](https://github.com/aaravjj2/finwise/discussions)
- **Bug reports** → [Issues](https://github.com/aaravjj2/finwise/issues)
- **Feature requests** → [Issues with enhancement label](https://github.com/aaravjj2/finwise/issues?q=is%3Aissue+label%3Aenhancement)

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of:
- Experience level
- Gender identity and expression
- Sexual orientation
- Disability
- Personal appearance
- Body size
- Race
- Ethnicity
- Age
- Religion
- Nationality

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Gracefully accept constructive criticism
- Focus on what's best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Trolling, insulting/derogatory comments, personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

## 🎯 Priority Areas

We especially welcome contributions in:

1. **Translations** - Help reach more languages
2. **Voice Features** - Improve TTS/STT for low-bandwidth areas
3. **Offline Mode** - Enhance offline functionality
4. **Financial Tools** - Add calculators, comparisons, etc.
5. **Learning Content** - Create additional modules and lessons
6. **Accessibility** - Improve screen reader support
7. **Performance** - Optimize for low-end devices

## 🚀 First-Time Contributors

New to open source? Look for issues labeled `good first issue`:

```
https://github.com/aaravjj2/finwise/labels/good%20first%20issue
```

We're here to help you succeed!

## 📞 Questions?

- Create a [Discussion](https://github.com/aaravjj2/finwise/discussions)
- Mention `@aaravjj2` in your PR/issue

---

Thank you for contributing to financial inclusion! 🌍💚
