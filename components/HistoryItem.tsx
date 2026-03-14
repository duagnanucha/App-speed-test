import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { SpeedTestResult } from '@/utils/types';
import { COLORS } from '@/utils/constants';
import { formatSpeed, formatPing } from '@/utils/formatSpeed';

interface HistoryItemProps {
  item: SpeedTestResult;
}

export default function HistoryItem({ item }: HistoryItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.date}>
        {format(new Date(item.timestamp), 'dd MMM yyyy  HH:mm')}
      </Text>
      <View style={styles.row}>
        <View style={styles.metric}>
          <Text style={styles.label}>PING</Text>
          <Text style={styles.value}>{formatPing(item.ping)} <Text style={styles.unit}>ms</Text></Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.label}>DOWNLOAD</Text>
          <Text style={styles.value}>{formatSpeed(item.download)} <Text style={styles.unit}>Mbps</Text></Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.label}>UPLOAD</Text>
          <Text style={styles.value}>{formatSpeed(item.upload)} <Text style={styles.unit}>Mbps</Text></Text>
        </View>
      </View>
    </View>
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
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metric: {
    alignItems: 'center',
    flex: 1,
  },
  label: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.textDim,
    letterSpacing: 1,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
  },
  unit: {
    fontSize: 10,
    fontWeight: '400',
    color: COLORS.textSecondary,
  },
});
