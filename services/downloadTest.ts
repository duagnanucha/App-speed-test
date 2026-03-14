import { DOWNLOAD_URL, DOWNLOAD_CHUNKS } from '@/utils/constants';
import { bytesPerSecToMbps } from '@/utils/formatSpeed';

export async function downloadTest(
  signal: AbortSignal,
  onProgress?: (speedMbps: number) => void,
): Promise<number> {
  const speeds: number[] = [];

  for (let i = 0; i < DOWNLOAD_CHUNKS; i++) {
    if (signal.aborted) throw new Error('Test cancelled');

    const cacheBust = `&cachebust=${Date.now()}`;
    const url = DOWNLOAD_URL + cacheBust;

    const start = Date.now();
    try {
      const response = await fetch(url, { signal, cache: 'no-store' });
      const blob = await response.blob();
      const elapsed = (Date.now() - start) / 1000; // seconds
      const bytesPerSec = blob.size / elapsed;
      const mbps = bytesPerSecToMbps(bytesPerSec);
      speeds.push(mbps);
      onProgress?.(mbps);
    } catch (e: any) {
      if (e.name === 'AbortError') throw new Error('Test cancelled');
      continue;
    }
  }

  if (speeds.length === 0) {
    throw new Error('Download test failed — no successful attempts');
  }

  const avg = speeds.reduce((sum, v) => sum + v, 0) / speeds.length;
  return Math.round(avg * 100) / 100;
}
