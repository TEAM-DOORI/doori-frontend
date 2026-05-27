import { Image } from "expo-image";
import { useEffect, useRef } from "react";
import { Animated, Pressable } from "react-native";
import { hs, vs } from "../../constants";
import { Text } from "../typography";
import { ITEM_WIDTH, styles } from "./PlusMenu.styles";

const ITEMS = [
  {
    id: "roommate",
    label: "룸메 찾기",
    image: require("../../app/(tabs)/assets/tabbar/search-tab.png"),
  },
  {
    id: "status",
    label: "상태 공유",
    image: require("../../app/(tabs)/assets/tabbar/star-tab.png"),
  },
  {
    id: "log",
    label: "로그",
    image: require("../../app/(tabs)/assets/tabbar/book-tab.png"),
  },
] as const;

type ItemId = (typeof ITEMS)[number]["id"];

type ItemLayout = { id: string; x: number; top?: number; bottom?: number };

// 아치(244×122) 내부 좌표 (Figma node 1015:8267 기준)
// x = figma_centerX - archLeft(75) - itemWidth/2
const ITEM_LAYOUTS: ItemLayout[] = [
  { id: "roommate", x: hs(49.5) - ITEM_WIDTH / 2, bottom: vs(8) },
  { id: "status",   x: hs(121.5) - ITEM_WIDTH / 2, top: vs(8) },
  { id: "log",      x: hs(197.5) - ITEM_WIDTH / 2, bottom: vs(8) },
];

// 아이템 등장 순서: 중앙(idx=1) → 좌(idx=0), 우(idx=2)
const ITEM_ENTER_ORDER = [1, 0, 2] as const;
const STAGGER_INTERVAL_MS = 60;

type Props = {
  onItemPress?: (id: ItemId) => void;
};

export function PlusMenu({ onItemPress }: Props) {
  const archAnim = useRef(new Animated.Value(0)).current;
  const itemAnims = useRef(ITEMS.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // 아치 먼저 슬라이드업
    Animated.spring(archAnim, {
      toValue: 1,
      useNativeDriver: true,
      damping: 22,
      stiffness: 280,
      mass: 0.8,
    }).start();

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    ITEM_ENTER_ORDER.forEach((idx, step) => {
      timeouts.push(
        setTimeout(() => {
          Animated.spring(itemAnims[idx], {
            toValue: 1,
            useNativeDriver: true,
            damping: 18,
            stiffness: 320,
            mass: 0.7,
          }).start();
        }, step * STAGGER_INTERVAL_MS),
      );
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [archAnim, itemAnims]);

  return (
    <Animated.View
      style={[
        styles.archBg,
        {
          opacity: archAnim,
          transform: [
            {
              translateY: archAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [vs(40), 0],
              }),
            },
          ],
        },
      ]}
    >
      {ITEMS.map((item, idx) => {
        const layout = ITEM_LAYOUTS[idx];
        const anim = itemAnims[idx];
        return (
          <Animated.View
            key={item.id}
            style={[
              styles.itemWrap,
              {
                bottom: layout.bottom,
                top: layout.top,
                left: layout.x,
                opacity: anim,
                transform: [
                  {
                    scale: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1],
                    }),
                  },
                  {
                    translateY: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [vs(12), 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Pressable
              onPress={() => onItemPress?.(item.id)}
              accessibilityRole="button"
              accessibilityLabel={item.label}
              style={styles.itemPressable}
            >
              <Image
                source={item.image}
                style={styles.icon}
                contentFit="contain"
              />
              <Text weight="medium" style={styles.label}>
                {item.label}
              </Text>
            </Pressable>
          </Animated.View>
        );
      })}
    </Animated.View>
  );
}
