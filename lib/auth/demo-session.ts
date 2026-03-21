export interface DemoUserSession {
  id: string
  name: string
  language: string
  country: string
  is_demo: boolean
}

export function createDemoSession(language = 'en', country = 'NG'): DemoUserSession {
  const demoUser: DemoUserSession = {
    id: `demo-${crypto.randomUUID()}`,
    name: 'Demo User',
    language,
    country,
    is_demo: true
  }

  localStorage.setItem('finwise_demo_user', JSON.stringify(demoUser))
  return demoUser
}

export function getDemoSession(): DemoUserSession | null {
  const stored = localStorage.getItem('finwise_demo_user')
  if (!stored) return null

  try {
    return JSON.parse(stored) as DemoUserSession
  } catch {
    return null
  }
}
