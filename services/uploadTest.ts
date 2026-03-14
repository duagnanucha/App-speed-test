import { UPLOAD_URL, UPLOAD_SIZE_BYTES, UPLOAD_CHUNKS } from '@/utils/constants';
import { bytesPerSecToMbps } from '@/utils/formatSpeed';

function generateRandomData(size: number): Blob {
  const buffer = new ArrayBuffer(size);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < size; i += 4096) {
    const end = Math.min(i + 4096, size);
    for (let j = i; j < end; j++) {
      view[j] = Math.random() * 256;
    }
  }
  return new Blob([buffer]);
}

export async function uploadTest(
  signal: AbortSignal,
  onProgress?: (speedMbps: number) => void,
): Promise<number> {
  const speeds: number[] = [];

  for (let i = 0; i < UPLOAD_CHUNKS; i++) {
    if (signal.aborted) throw new Error('Test cancelled');

    const data = generateRandomData(UPLOAD_SIZE_BYTES);

    const start = Date.now();
    try {
      await fetch(UPLOAD_URL, {
        method: 'POST',
        body: data,
        signal,
      });
      const elapsed = (Date.now() - start) / 1000;
      const bytesPerSec = UPLOAD_SIZE_BYTES / elapsed;
      const mbps = bytesPerSecToMbps(bytesPerSec);
      speeds.push(mbps);
      onProgress?.(mbps);
    } catch (e: any) {
      if (e.name === 'AbortError') throw new Error('Test cancelled');
      continue;
    }
  }

  if (speeds.length === 0) {
    throw new Error('Upload test failed — no successful attempts');
  }

  const avg = speeds.reduce((sum, v) => sum + v, 0) / speeds.length;
  return Math.round(avg * 100) / 100;
}
