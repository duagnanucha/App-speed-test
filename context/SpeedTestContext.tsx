import React, { createContext, useContext, useReducer } from 'react';
import { SpeedTestState, SpeedTestAction } from '@/utils/types';

const initialState: SpeedTestState = {
  phase: 'idle',
  currentSpeed: 0,
  pingResult: null,
  downloadResult: null,
  uploadResult: null,
  error: null,
};

function reducer(state: SpeedTestState, action: SpeedTestAction): SpeedTestState {
  switch (action.type) {
    case 'START_TEST':
      return { ...initialState, phase: 'ping' };
    case 'SET_PHASE':
      return { ...state, phase: action.phase, currentSpeed: 0 };
    case 'SET_CURRENT_SPEED':
      return { ...state, currentSpeed: action.speed };
    case 'SET_PING_RESULT':
      return { ...state, pingResult: action.ping };
    case 'SET_DOWNLOAD_RESULT':
      return { ...state, downloadResult: action.download };
    case 'SET_UPLOAD_RESULT':
      return { ...state, uploadResult: action.upload };
    case 'SET_ERROR':
      return { ...state, phase: 'error', error: action.error };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

interface SpeedTestContextType {
  state: SpeedTestState;
  dispatch: React.Dispatch<SpeedTestAction>;
}

const SpeedTestContext = createContext<SpeedTestContextType>({
  state: initialState,
  dispatch: () => {},
});

export function SpeedTestProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SpeedTestContext.Provider value={{ state, dispatch }}>
      {children}
    </SpeedTestContext.Provider>
  );
}

export function useSpeedTestContext() {
  return useContext(SpeedTestContext);
}
