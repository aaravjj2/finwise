import { getMockResponse } from './mock-responses'

interface OllamaMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export class AIClient {
  private readonly ollamaUrl: string | null
  private readonly model: string

  constructor() {
    this.ollamaUrl = process.env.OLLAMA_BASE_URL || null
    this.model = process.env.OLLAMA_MODEL || 'llama3.2:3b'
  }

  async isOllamaAvailable(): Promise<boolean> {
    if (!this.ollamaUrl) return false
    try {
      const res = await fetch(`${this.ollamaUrl}/api/tags`, {
        signal: AbortSignal.timeout(2000)
      })
      return res.ok
    } catch {
      return false
    }
  }

  async *streamChat(messages: OllamaMessage[], language: string): AsyncGenerator<string> {
    const useOllama = await this.isOllamaAvailable()

    if (useOllama && this.ollamaUrl) {
      const res = await fetch(`${this.ollamaUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: this.model,
          messages,
          stream: true,
          options: { temperature: 0.7, num_predict: 512 }
        })
      })

      if (!res.ok || !res.body) {
        throw new Error(`Ollama request failed with status ${res.status}`)
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const lines = decoder.decode(value).split('\n').filter(Boolean)
        for (const line of lines) {
          try {
            const json = JSON.parse(line) as { message?: { content?: string } }
            if (json.message?.content) {
              yield json.message.content
            }
          } catch {
            // Ignore malformed chunks.
          }
        }
      }
      return
    }

    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')
    const fullResponse = getMockResponse(lastUserMessage?.content || '', language)
    const words = fullResponse.split(' ')
    const simulateLatency = process.env.NODE_ENV !== 'test'

    for (const word of words) {
      yield `${word} `
      if (simulateLatency) {
        await new Promise((resolve) => setTimeout(resolve, 30 + Math.random() * 40))
      }
    }
  }
}

export const aiClient = new AIClient()
