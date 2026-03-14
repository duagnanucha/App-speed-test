import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import Speedometer, {
  Arc,
  Needle,
  Progress,
  Marks,
  Indicator,
} from 'react-native-cool-speedometer';
import { COLORS, GAUGE_MAX } from '@/utils/constants';
import { formatSpeed } from '@/utils/formatSpeed';

interface SpeedGaugeProps {
  value: number;
  maxValue?: number;
}

export default function SpeedGauge({ value, maxValue = GAUGE_MAX }: SpeedGaugeProps) {
  const { width } = useWindowDimensions();
  const gaugeSize = Math.min(width * 0.7, 300);

  return (
    <View style={styles.container}>
      <Speedometer
        value={value}
        max={maxValue}
        angle={250}
        fontFamily="SpaceMono"
        width={gaugeSize}
        height={gaugeSize * 0.65}
        accentColor={COLORS.accent}
      >
        <Arc color={COLORS.surface} arcWidth={12} />
        <Progress
          arcWidth={12}
          color={COLORS.accent}
        />
        <Marks
          step={maxValue / 10}
          lineColor={COLORS.textSecondary}
          fontSize={10}
          lineSize={8}
          numbersRadius={15}
        />
        <Needle
          baseWidth={4}
          baseOffset={20}
          color={COLORS.white}
          circleRadius={12}
          circleColor={COLORS.accent}
        />
        <Indicator
          fontSize={0}
          fixValue={false}
        />
      </Speedometer>
      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>{formatSpeed(value)}</Text>
        <Text style={styles.unitText}>Mbps</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueContainer: {
    alignItems: 'center',
    marginTop: -20,
  },
  valueText: {
    fontSize: 48,
    fontWeight: '700',
    color: COLORS.white,
    fontFamily: 'SpaceMono',
  },
  unitText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: -4,
  },
});
