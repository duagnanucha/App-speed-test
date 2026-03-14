export const COLORS = {
  background: '#1a1a2e',
  surface: '#16213e',
  card: '#0f3460',
  accent: '#00d4ff',
  accentDim: '#0097b2',
  green: '#00e676',
  yellow: '#ffea00',
  orange: '#ff9100',
  red: '#ff1744',
  white: '#ffffff',
  textPrimary: '#ffffff',
  textSecondary: '#a0a0b0',
  textDim: '#6a6a7a',
};

export const PING_URL = 'https://speed.cloudflare.com/__down?bytes=0';
export const DOWNLOAD_URL = 'https://speed.cloudflare.com/__down?bytes=10000000';
export const UPLOAD_URL = 'https://speed.cloudflare.com/__up';

export const PING_ATTEMPTS = 5;
export const DOWNLOAD_CHUNKS = 3;
export const UPLOAD_SIZE_BYTES = 2 * 1024 * 1024; // 2MB per chunk
export const UPLOAD_CHUNKS = 3;

export const GAUGE_MAX = 200; // Mbps

export const HISTORY_STORAGE_KEY = '@speed_test_history';
