import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { COLORS } from '@/utils/constants';

interface SpeedTestButtonProps {
  isRunning: boolean;
  onPress: () => void;
}

export default function SpeedTestButton({ isRunning, onPress }: SpeedTestButtonProps) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.button,
        isRunning ? styles.stopButton : styles.goButton,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.buttonText}>{isRunning ? 'STOP' : 'GO'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  goButton: {
    backgroundColor: COLORS.accent,
  },
  stopButton: {
    backgroundColor: COLORS.red,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  buttonText: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 2,
  },
});
