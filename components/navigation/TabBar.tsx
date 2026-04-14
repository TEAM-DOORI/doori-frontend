import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Image, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "../typography";
import { styles } from "./TabBar.styles";

const TAB_ICONS = {
  index: {
    active: require("../../app/(tabs)/assets/tabbar/tab-home-active.png"),
    inactive: require("../../app/(tabs)/assets/tabbar/tab-home-active.png"),
    label: "홈",
  },
  community: {
    active: require("../../app/(tabs)/assets/tabbar/tab-community-inactive.png"),
    inactive: require("../../app/(tabs)/assets/tabbar/tab-community-inactive.png"),
    label: "커뮤니티",
  },
  chat: {
    active: require("../../app/(tabs)/assets/tabbar/tab-chat-inactive.png"),
    inactive: require("../../app/(tabs)/assets/tabbar/tab-chat-inactive.png"),
    label: "채팅",
  },
  settings: {
    active: require("../../app/(tabs)/assets/tabbar/tab-settings-inactive.png"),
    inactive: require("../../app/(tabs)/assets/tabbar/tab-settings-inactive.png"),
    label: "설정",
  },
} as const;

type TabKey = keyof typeof TAB_ICONS;

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const tabKey = route.name as TabKey;
          const iconData = TAB_ICONS[tabKey];

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole='button'
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={
                descriptors[route.key].options.tabBarAccessibilityLabel ??
                iconData.label
              }
              testID={descriptors[route.key].options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}>
              <Image
                source={isFocused ? iconData.active : iconData.inactive}
                style={styles.icon}
              />
              <Text style={styles.label}>{iconData.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
