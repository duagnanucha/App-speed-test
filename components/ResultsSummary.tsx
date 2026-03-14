import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/utils/constants';
import { formatSpeed, formatPing } from '@/utils/formatSpeed';

interface ResultsSummaryProps {
  ping: number | null;
  download: number | null;
  upload: number | null;
}

function ResultCard({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardUnit}>{unit}</Text>
    </View>
  );
}

export default function ResultsSummary({ ping, download, upload }: ResultsSummaryProps) {
  return (
    <View style={styles.container}>
      <ResultCard
        label="PING"
        value={ping !== null ? formatPing(ping) : '—'}
        unit="ms"
      />
      <ResultCard
        label="DOWNLOAD"
        value={download !== null ? formatSpeed(download) : '—'}
        unit="Mbps"
      />
      <ResultCard
        label="UPLOAD"
        value={upload !== null ? formatSpeed(upload) : '—'}
        unit="Mbps"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.white,
  },
  cardUnit: {
    fontSize: 11,
    color: COLORS.textDim,
    marginTop: 2,
  },
});
