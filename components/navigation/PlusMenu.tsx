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

const ITEM_LAYOUTS: ItemLayout[] = [
  { id: "roommate", x: hs(49.5) - ITEM_WIDTH / 2, bottom: vs(8) },
  { id: "status", x: hs(121.5) - ITEM_WIDTH / 2, top: vs(8) },
  { id: "log", x: hs(197.5) - ITEM_WIDTH / 2, bottom: vs(8) },
];

// 스태거 순서: 가운데 → 양옆 동시
const STAGGER_DELAY = [60, 0, 60] as const;

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

    // 아이템 스태거: 중앙(idx=1) → 좌우(idx=0,2)
    const order = [1, 0, 2];
    order.forEach((idx, step) => {
      setTimeout(() => {
        Animated.spring(itemAnims[idx], {
          toValue: 1,
          useNativeDriver: true,
          damping: 18,
          stiffness: 320,
          mass: 0.7,
        }).start();
      }, step * 60);
    });
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
