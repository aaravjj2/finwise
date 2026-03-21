import { describe, expect, it } from 'vitest'
import en from '@/messages/en.json'
import hi from '@/messages/hi.json'
import sw from '@/messages/sw.json'
import yo from '@/messages/yo.json'
import bn from '@/messages/bn.json'
import tl from '@/messages/tl.json'
import es from '@/messages/es.json'
import pt from '@/messages/pt.json'
import ha from '@/messages/ha.json'
import am from '@/messages/am.json'
import zu from '@/messages/zu.json'
import ig from '@/messages/ig.json'
import ta from '@/messages/ta.json'
import id from '@/messages/id.json'
import vi from '@/messages/vi.json'

function getAllKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  const keys: string[] = []
  for (const [key, value] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      keys.push(...getAllKeys(value as Record<string, unknown>, full))
    } else {
      keys.push(full)
    }
  }
  return keys
}

describe('i18n completeness', () => {
  it('all languages include critical keys', () => {
    const requiredKeys = [
      'common.loading',
      'common.error',
      'nav.chat',
      'auth.login_title',
      'onboarding.language_title',
      'chat.placeholder'
    ]
    const languages = [hi, sw, yo, bn, tl, es, pt, ha, am, zu, ig, ta, id, vi]

    // English remains the source of truth for full key coverage.
    const enKeys = getAllKeys(en as Record<string, unknown>)
    for (const key of requiredKeys) {
      expect(enKeys).toContain(key)
    }

    for (const lang of languages) {
      const langKeys = getAllKeys(lang as Record<string, unknown>)
      const missing = requiredKeys.filter((k) => !langKeys.includes(k))
      expect(missing).toHaveLength(0)
    }
  })
})
