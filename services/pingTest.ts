import { PING_URL, PING_ATTEMPTS } from '@/utils/constants';

export async function pingTest(
  signal: AbortSignal,
  onProgress?: (pingMs: number) => void,
): Promise<number> {
  const results: number[] = [];

  for (let i = 0; i < PING_ATTEMPTS; i++) {
    if (signal.aborted) throw new Error('Test cancelled');

    const start = Date.now();
    try {
      await fetch(PING_URL, {
        method: 'HEAD',
        cache: 'no-store',
        signal,
      });
    } catch (e: any) {
      if (e.name === 'AbortError') throw new Error('Test cancelled');
      // Network error — skip this attempt
      continue;
    }
    const elapsed = Date.now() - start;
    results.push(elapsed);
    onProgress?.(elapsed);
  }

  if (results.length === 0) {
    throw new Error('Ping test failed — no successful attempts');
  }

  // Remove highest and lowest if we have enough samples
  if (results.length > 2) {
    results.sort((a, b) => a - b);
    results.shift();
    results.pop();
  }

  const avg = results.reduce((sum, v) => sum + v, 0) / results.length;
  return Math.round(avg);
}
