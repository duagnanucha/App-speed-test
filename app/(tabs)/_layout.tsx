import React from 'react';
import { Platform, Text } from 'react-native';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '@/utils/constants';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 8);
  const TAB_BAR_HEIGHT = 52 + bottomPadding;

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
          height: TAB_BAR_HEIGHT,
          paddingBottom: bottomPadding,
          paddingTop: 8,
          ...(Platform.OS === 'web' ? {
            position: 'fixed' as const,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 100,
          } : {}),
        },
        ...(Platform.OS === 'web' ? {
          sceneStyle: { paddingBottom: TAB_BAR_HEIGHT },
        } : {}),
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
