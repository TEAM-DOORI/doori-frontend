import { Tabs } from 'expo-router';
import React from 'react';
import { TabBar } from '../../components/navigation/TabBar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: '커뮤니티',
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: '채팅',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: '설정',
        }}
      />
    </Tabs>
  );
}
