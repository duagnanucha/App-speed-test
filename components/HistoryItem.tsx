import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { format } from 'date-fns';
import { SpeedTestResult } from '@/utils/types';
import { COLORS } from '@/utils/constants';
import { formatSpeed, formatPing } from '@/utils/formatSpeed';

interface HistoryItemProps {
  item: SpeedTestResult;
  index?: number;
}

export default function HistoryItem({ item, index = 0 }: HistoryItemProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <Text style={styles.date}>
        {format(new Date(item.timestamp), 'dd MMM yyyy  HH:mm')}
      </Text>
      <View style={styles.row}>
        <View style={styles.metric}>
          <Text style={styles.label}>PING</Text>
          <View style={styles.valueRow}>
            <Text style={styles.value}>{formatPing(item.ping)}</Text>
            <Text style={styles.unit}> ms</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.metric}>
          <Text style={styles.label}>DOWNLOAD</Text>
          <View style={styles.valueRow}>
            <Text style={styles.value}>{formatSpeed(item.download)}</Text>
            <Text style={styles.unit}> Mbps</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.metric}>
          <Text style={styles.label}>UPLOAD</Text>
          <View style={styles.valueRow}>
            <Text style={styles.value}>{formatSpeed(item.upload)}</Text>
            <Text style={styles.unit}> Mbps</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
  },
  date: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metric: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textDim,
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.white,
  },
  unit: {
    fontSize: 11,
    fontWeight: '400',
    color: COLORS.textSecondary,
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: COLORS.card,
  },
});
