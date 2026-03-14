import React from 'react';
import { StyleSheet, FlatList, SafeAreaView, Text, Pressable, Alert, View } from 'react-native';
import { useTestHistory } from '@/hooks/useTestHistory';
import HistoryItem from '@/components/HistoryItem';
import EmptyHistory from '@/components/EmptyHistory';
import { COLORS } from '@/utils/constants';

export default function HistoryScreen() {
  const { history, clearHistory, refreshHistory } = useTestHistory();

  const handleClear = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to delete all test results?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: clearHistory },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
        {history.length > 0 && (
          <Pressable onPress={handleClear} style={styles.clearButton}>
            <Text style={styles.clearText}>Clear All</Text>
          </Pressable>
        )}
      </View>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HistoryItem item={item} />}
        ListEmptyComponent={EmptyHistory}
        contentContainerStyle={history.length === 0 ? styles.emptyList : styles.list}
        onRefresh={refreshHistory}
        refreshing={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.white,
    letterSpacing: 1,
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(255,23,68,0.15)',
  },
  clearText: {
    color: COLORS.red,
    fontSize: 13,
    fontWeight: '600',
  },
  list: {
    paddingVertical: 8,
  },
  emptyList: {
    flex: 1,
  },
});
