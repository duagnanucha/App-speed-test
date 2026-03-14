export function bytesPerSecToMbps(bytesPerSec: number): number {
  return (bytesPerSec * 8) / (1024 * 1024);
}

export function formatSpeed(mbps: number): string {
  if (mbps < 1) return mbps.toFixed(2);
  if (mbps < 10) return mbps.toFixed(1);
  return Math.round(mbps).toString();
}

export function formatPing(ms: number): string {
  return Math.round(ms).toString();
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}
