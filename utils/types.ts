export type TestPhase = 'idle' | 'ping' | 'download' | 'upload' | 'complete' | 'error';

export interface SpeedTestResult {
  id: string;
  timestamp: number;
  ping: number;       // ms
  download: number;   // Mbps
  upload: number;     // Mbps
}

export interface SpeedTestState {
  phase: TestPhase;
  currentSpeed: number;
  pingResult: number | null;
  downloadResult: number | null;
  uploadResult: number | null;
  error: string | null;
}

export type SpeedTestAction =
  | { type: 'START_TEST' }
  | { type: 'SET_PHASE'; phase: TestPhase }
  | { type: 'SET_CURRENT_SPEED'; speed: number }
  | { type: 'SET_PING_RESULT'; ping: number }
  | { type: 'SET_DOWNLOAD_RESULT'; download: number }
  | { type: 'SET_UPLOAD_RESULT'; upload: number }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'RESET' };
