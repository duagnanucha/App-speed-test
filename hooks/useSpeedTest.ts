import { useRef, useCallback } from 'react';
import { useSpeedTestContext } from '@/context/SpeedTestContext';
import { pingTest } from '@/services/pingTest';
import { downloadTest } from '@/services/downloadTest';
import { uploadTest } from '@/services/uploadTest';
import { SpeedTestResult } from '@/utils/types';
import { generateId } from '@/utils/formatSpeed';
import { useTestHistory } from './useTestHistory';

export function useSpeedTest() {
  const { state, dispatch } = useSpeedTestContext();
  const abortControllerRef = useRef<AbortController | null>(null);
  const { addResult } = useTestHistory();

  const startTest = useCallback(async () => {
    const controller = new AbortController();
    abortControllerRef.current = controller;
    const { signal } = controller;

    try {
      // Phase 1: Ping
      dispatch({ type: 'START_TEST' });

      const ping = await pingTest(signal, (ms) => {
        dispatch({ type: 'SET_CURRENT_SPEED', speed: ms });
      });
      dispatch({ type: 'SET_PING_RESULT', ping });

      // Phase 2: Download
      dispatch({ type: 'SET_PHASE', phase: 'download' });

      const download = await downloadTest(signal, (mbps) => {
        dispatch({ type: 'SET_CURRENT_SPEED', speed: mbps });
      });
      dispatch({ type: 'SET_DOWNLOAD_RESULT', download });

      // Phase 3: Upload
      dispatch({ type: 'SET_PHASE', phase: 'upload' });

      const upload = await uploadTest(signal, (mbps) => {
        dispatch({ type: 'SET_CURRENT_SPEED', speed: mbps });
      });
      dispatch({ type: 'SET_UPLOAD_RESULT', upload });

      // Complete
      dispatch({ type: 'SET_PHASE', phase: 'complete' });

      const result: SpeedTestResult = {
        id: generateId(),
        timestamp: Date.now(),
        ping,
        download,
        upload,
      };
      await addResult(result);
    } catch (e: any) {
      if (e.message === 'Test cancelled') {
        dispatch({ type: 'RESET' });
      } else {
        dispatch({ type: 'SET_ERROR', error: e.message || 'Test failed' });
      }
    } finally {
      abortControllerRef.current = null;
    }
  }, [dispatch, addResult]);

  const stopTest = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  const resetTest = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, [dispatch]);

  const isRunning = ['ping', 'download', 'upload'].includes(state.phase);

  return { state, isRunning, startTest, stopTest, resetTest };
}
