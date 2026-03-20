/**
 * Mock TTS layer for FinWise when no ElevenLabs API key is available.
 * Returns null for audio URLs - UI should gracefully handle this by hiding play buttons.
 */

/**
 * Get mock audio URL for text-to-speech.
 * In mock mode, this always returns null. The UI should hide audio playback
 * controls when receiving a null URL.
 *
 * @param _text - The text to convert to speech (unused in mock mode)
 * @returns null - No audio available in mock mode
 */
export function getMockAudioUrl(_text: string): null {
  return null;
}

/**
 * Check if TTS is available (has valid API key)
 * @returns boolean indicating if real TTS is available
 */
export function isTTSAvailable(): boolean {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  return !!apiKey && apiKey !== 'mock' && apiKey !== 'placeholder-key';
}
