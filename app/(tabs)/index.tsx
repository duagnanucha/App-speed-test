import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar } from 'react-native';
import SpeedGauge from '@/components/SpeedGauge';
import SpeedTestButton from '@/components/SpeedTestButton';
import TestProgress from '@/components/TestProgress';
import ResultsSummary from '@/components/ResultsSummary';
import { useSpeedTest } from '@/hooks/useSpeedTest';
import { COLORS } from '@/utils/constants';

export default function SpeedTestScreen() {
  const { state, isRunning, startTest, stopTest, resetTest } = useSpeedTest();

  const gaugeValue =
    state.phase === 'ping' ? 0 :
    state.phase === 'download' || state.phase === 'upload' ? state.currentSpeed :
    state.phase === 'complete' ? (state.downloadResult ?? 0) :
    0;

  const handlePress = () => {
    if (isRunning) {
      stopTest();
    } else if (state.phase === 'complete' || state.phase === 'error') {
      resetTest();
      setTimeout(startTest, 100);
    } else {
      startTest();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <Text style={styles.title}>Speed Test</Text>

      <View style={styles.gaugeContainer}>
        <SpeedGauge value={gaugeValue} />
      </View>

      {(isRunning || state.phase === 'complete') && (
        <View style={styles.progressContainer}>
          <TestProgress phase={state.phase} />
        </View>
      )}

      {state.phase === 'error' && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{state.error}</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <SpeedTestButton isRunning={isRunning} onPress={handlePress} />
      </View>

      <View style={styles.resultsContainer}>
        <ResultsSummary
          ping={state.pingResult}
          download={state.downloadResult}
          upload={state.uploadResult}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'center',
    marginTop: 16,
    letterSpacing: 1,
  },
  gaugeContainer: {
    alignItems: 'center',
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
  },
  progressContainer: {
    marginBottom: 16,
  },
  errorContainer: {
    marginHorizontal: 40,
    marginBottom: 12,
    padding: 12,
    backgroundColor: 'rgba(255,23,68,0.15)',
    borderRadius: 12,
  },
  errorText: {
    color: COLORS.red,
    textAlign: 'center',
    fontSize: 13,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  resultsContainer: {
    marginBottom: 24,
  },
});
