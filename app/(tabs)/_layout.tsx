import React from 'react';
import { Text } from 'react-native';
import { Tabs } from 'expo-router';
import { COLORS } from '@/utils/constants';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.textDim,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.card,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          letterSpacing: 0.5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Speed Test',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>⚡</Text>,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'History',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>📊</Text>,
        }}
      />
    </Tabs>
  );
}
