import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Image } from "expo-image";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { vs } from "../../constants";
import { Text } from "../typography";
import { PlusMenu } from "./PlusMenu";
import { styles } from "./TabBar.styles";

// onLayout 측정 전에 사용되는 합리적 기본 높이 (콘텐츠 + safe area 추정)
const DEFAULT_TAB_BAR_HEIGHT = vs(80);

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
    label: "MY",
  },
} as const;

type TabKey = keyof typeof TAB_ICONS;

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const [menuOpen, setMenuOpen] = useState(false);
  const [tabBarHeight, setTabBarHeight] = useState(DEFAULT_TAB_BAR_HEIGHT);

  const renderTab = (route: (typeof state.routes)[number], index: number) => {
    const isFocused = state.index === index;
    const tabKey = route.name as TabKey;
    const iconData = TAB_ICONS[tabKey];

    const onPress = () => {
      setMenuOpen(false);
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name, route.params);
      }
    };

    return (
      <Pressable
        key={route.key}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={
          descriptors[route.key].options.tabBarAccessibilityLabel ??
          iconData.label
        }
        testID={descriptors[route.key].options.tabBarButtonTestID}
        onPress={onPress}
        onLongPress={() =>
          navigation.emit({ type: "tabLongPress", target: route.key })
        }
        style={styles.tabButton}
      >
        <Image
          source={isFocused ? iconData.active : iconData.inactive}
          style={styles.icon}
          contentFit="contain"
        />
        <Text style={styles.label}>{iconData.label}</Text>
      </Pressable>
    );
  };

  const mid = Math.ceil(state.routes.length / 2);

  return (
    <View
      style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, 10) }]}
      onLayout={(e) => setTabBarHeight(e.nativeEvent.layout.height)}
    >
      {/* PlusMenu: 탭바 컨텐츠보다 먼저 렌더 → 자동으로 뒤에 배치 */}
      {menuOpen && (
        <>
          <Pressable style={styles.menuBackdrop} onPress={() => setMenuOpen(false)} />
          <View
            style={[styles.menuContainer, { bottom: tabBarHeight }]}
            pointerEvents="box-none"
          >
            <PlusMenu onItemPress={() => setMenuOpen(false)} />
          </View>
        </>
      )}

      <View style={styles.tabContainer}>
        <View style={styles.tabGroup}>
          {state.routes.slice(0, mid).map((route, i) => renderTab(route, i))}
        </View>
        <View style={styles.plusSlot} />
        <View style={styles.tabGroup}>
          {state.routes.slice(mid).map((route, i) => renderTab(route, i + mid))}
        </View>
      </View>

      <Pressable
        style={styles.plusButton}
        accessibilityRole="button"
        accessibilityLabel="추가"
        onPress={() => setMenuOpen((v) => !v)}
      >
        <Image
          source={require("../../app/(tabs)/assets/tabbar/plus-tab.png")}
          style={styles.plusCircle}
          contentFit="contain"
        />
      </Pressable>
    </View>
  );
}
