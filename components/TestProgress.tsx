import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TestPhase } from '@/utils/types';
import { COLORS } from '@/utils/constants';

interface TestProgressProps {
  phase: TestPhase;
}

const phases: { key: TestPhase; label: string }[] = [
  { key: 'ping', label: 'PING' },
  { key: 'download', label: 'DOWNLOAD' },
  { key: 'upload', label: 'UPLOAD' },
];

const phaseOrder = ['ping', 'download', 'upload'];

export default function TestProgress({ phase }: TestProgressProps) {
  const currentIndex = phaseOrder.indexOf(phase);
  const isComplete = phase === 'complete';

  return (
    <View style={styles.container}>
      {phases.map((p, index) => {
        const isActive = p.key === phase;
        const isDone = isComplete || (currentIndex >= 0 && index < currentIndex);

        return (
          <View key={p.key} style={styles.step}>
            <View
              style={[
                styles.dot,
                isActive && styles.activeDot,
                isDone && styles.doneDot,
              ]}
            >
              {isDone && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text
              style={[
                styles.label,
                isActive && styles.activeLabel,
                isDone && styles.doneLabel,
              ]}
            >
              {p.label}
            </Text>
            {index < phases.length - 1 && (
              <View
                style={[
                  styles.line,
                  (isDone || (currentIndex > index)) && styles.doneLine,
                ]}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 0,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    borderWidth: 2,
    borderColor: COLORS.textDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDot: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.accent,
  },
  doneDot: {
    borderColor: COLORS.green,
    backgroundColor: COLORS.green,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  label: {
    fontSize: 11,
    color: COLORS.textDim,
    marginLeft: 4,
    fontWeight: '600',
    letterSpacing: 1,
  },
  activeLabel: {
    color: COLORS.accent,
  },
  doneLabel: {
    color: COLORS.green,
  },
  line: {
    width: 30,
    height: 2,
    backgroundColor: COLORS.textDim,
    marginHorizontal: 6,
  },
  doneLine: {
    backgroundColor: COLORS.green,
  },
});
