import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SpeedTestResult } from '@/utils/types';
import { HISTORY_STORAGE_KEY } from '@/utils/constants';

export function useTestHistory() {
  const [history, setHistory] = useState<SpeedTestResult[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);
      if (data) {
        setHistory(JSON.parse(data));
      }
    } catch {
      // ignore read errors
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const addResult = useCallback(async (result: SpeedTestResult) => {
    const updated = [result, ...history];
    setHistory(updated);
    await AsyncStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  }, [history]);

  const clearHistory = useCallback(async () => {
    setHistory([]);
    await AsyncStorage.removeItem(HISTORY_STORAGE_KEY);
  }, []);

  return { history, loading, addResult, clearHistory, refreshHistory: loadHistory };
}
