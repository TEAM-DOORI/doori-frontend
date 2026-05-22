import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { memo, useCallback, useEffect, useRef } from "react";
import { Animated, Easing, FlatList, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "../../components/typography";
import {
  CARD_GAP,
  CARD_RAISE,
  CARD_WIDTH,
  COLORS,
  styles,
} from "./index.styles";

type Roommate = {
  id: string;
  name: string;
  matchRate: number;
  traits: [string, string, string];
  profile: any;
};

const USER_NAME = "선우";
const USER_TRAITS: [string, string, string] = ["야행성", "비흡연", "깔끔한"];

const ROOMMATES: Roommate[] = [
  {
    id: "1",
    name: "김가람1",
    matchRate: 98,
    traits: ["야행성", "비흡연", "깔끔한"],
    profile: require("../../assets/images/home/profile-1.png"),
  },
  {
    id: "2",
    name: "김가람2",
    matchRate: 98,
    traits: ["야행성", "비흡연", "깔끔한"],
    profile: require("../../assets/images/home/profile-1.png"),
  },
  {
    id: "3",
    name: "김가람3",
    matchRate: 98,
    traits: ["야행성", "비흡연", "깔끔한"],
    profile: require("../../assets/images/home/profile-1.png"),
  },
  {
    id: "4",
    name: "김가람4",
    matchRate: 98,
    traits: ["야행성", "비흡연", "깔끔한"],
    profile: require("../../assets/images/home/profile-1.png"),
  },
  {
    id: "5",
    name: "김가람5",
    matchRate: 98,
    traits: ["야행성", "비흡연", "깔끔한"],
    profile: require("../../assets/images/home/profile-1.png"),
  },
  {
    id: "6",
    name: "김가람6",
    matchRate: 98,
    traits: ["야행성", "비흡연", "깔끔한"],
    profile: require("../../assets/images/home/profile-1.png"),
  },
];

function Header() {
  return (
    <View style={styles.header}>
      <Image
        source={require("../../assets/images/logo/DOORI.png")}
        style={styles.logo}
        contentFit="contain"
        accessibilityLabel="DOORI 로고"
      />
      <Pressable accessibilityRole="button" accessibilityLabel="알림">
        <Feather name="bell" size={styles.bell.width} color="#1A3262" />
      </Pressable>
    </View>
  );
}

function MatchTitle() {
  return (
    <View style={styles.titleWrap}>
      <Text style={styles.titleLine}>
        <Text weight="extraBold" style={[styles.titleLine, styles.titleName]}>
          {USER_NAME}
        </Text>
        <Text weight="bold" style={styles.titleLine}>
          님과 딱 맞는
        </Text>
      </Text>
      <Text weight="bold" style={styles.titleLine}>
        룸메이트를 발견했어요
      </Text>
    </View>
  );
}

function TraitChip({
  label,
  tone,
}: {
  label: string;
  tone: "light" | "primary";
}) {
  const isPrimary = tone === "primary";
  return (
    <View style={isPrimary ? styles.chipPrimary : styles.chipLight}>
      <Text
        weight="medium"
        style={isPrimary ? styles.chipPrimaryText : styles.chipLightText}
      >
        {label}
      </Text>
    </View>
  );
}

function TraitChipRow({
  traits,
  tone,
  style,
}: {
  traits: [string, string, string];
  tone: "light" | "primary";
  style?: any;
}) {
  return (
    <View
      style={[
        tone === "light" ? styles.topChipsRow : styles.cardChipsRow,
        style,
      ]}
    >
      {traits.map((t) => (
        <TraitChip key={t} label={t} tone={tone} />
      ))}
    </View>
  );
}

function HeroCharacter() {
  return (
    <View style={styles.heroWrap} pointerEvents="none">
      <Image
        source={require("../../assets/images/home/home-character.png")}
        style={styles.hero}
        contentFit="contain"
        accessibilityLabel="DOORI 캐릭터"
      />
    </View>
  );
}

const RoommateCard = memo(function RoommateCard({
  item,
  onPress,
}: {
  item: Roommate;
  onPress: () => void;
}) {
  return (
    <LinearGradient
      colors={[COLORS.cardGradientFrom, "rgba(255,255,255,0)"]}
      locations={[0.55, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.cardGradient}
    >
      <Image source={item.profile} style={styles.profile} contentFit="cover" />
      <Text weight="semiBold" style={styles.name}>
        {item.name}
      </Text>
      <Text weight="semiBold" style={styles.matchRate}>
        나와의 매칭률 {item.matchRate}%
      </Text>
      <TraitChipRow traits={item.traits} tone="primary" />
      <Pressable
        style={({ pressed }) => [styles.cta, pressed && { opacity: 0.9 }]}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`${item.name} 룸메 보러가기`}
      >
        <Text weight="semiBold" style={styles.ctaText}>
          룸메 보러가기
        </Text>
      </Pressable>
    </LinearGradient>
  );
});

const SNAP = CARD_WIDTH + CARD_GAP;
const AUTO_SLIDE_INTERVAL = 3000;

function RoommateCarousel() {
  const router = useRouter();
  const scrollX = useRef(new Animated.Value(0)).current;
  const listRef = useRef<FlatList>(null);
  const currentIndex = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isDragging.current) return;
      const next = Math.min(currentIndex.current + 1, ROOMMATES.length - 1);
      if (next === currentIndex.current) return;

      const startOffset = currentIndex.current * SNAP;
      currentIndex.current = next;

      const anim = new Animated.Value(startOffset);
      const id = anim.addListener(({ value }) => {
        listRef.current?.scrollToOffset({ offset: value, animated: false });
      });
      Animated.timing(anim, {
        toValue: next * SNAP,
        duration: 700,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: false,
      }).start(() => anim.removeListener(id));
    }, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const handlePress = useCallback(
    (id: string) => {
      router.push(`/roommate/${id}` as never);
    },
    [router],
  );

  return (
    <View style={styles.carouselWrap}>
      <Animated.FlatList
        ref={listRef as any}
        data={ROOMMATES}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        snapToInterval={SNAP}
        decelerationRate="fast"
        contentContainerStyle={styles.carouselContent}
        initialScrollIndex={0}
        getItemLayout={(_, index) => ({
          length: SNAP,
          offset: SNAP * index,
          index,
        })}
        onScrollBeginDrag={() => {
          isDragging.current = true;
        }}
        onMomentumScrollEnd={(e) => {
          isDragging.current = false;
          currentIndex.current = Math.round(e.nativeEvent.contentOffset.x / SNAP);
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
        windowSize={5}
        removeClippedSubviews={false}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * SNAP,
            index * SNAP,
            (index + 1) * SNAP,
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [CARD_RAISE, 0, CARD_RAISE],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              style={[styles.cardOuter, { transform: [{ translateY }] }]}
            >
              <RoommateCard item={item} onPress={() => handlePress(item.id)} />
            </Animated.View>
          );
        }}
      />
    </View>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={[COLORS.bgTop, COLORS.bgBottom]}
      locations={[0, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.root}
    >
      <View style={[styles.safeArea, { paddingTop: insets.top }]}>
        <Header />
        <View>
          <MatchTitle />
          <TraitChipRow traits={USER_TRAITS} tone="light" />
          <HeroCharacter />
        </View>
        <RoommateCarousel />
      </View>
    </LinearGradient>
  );
}
