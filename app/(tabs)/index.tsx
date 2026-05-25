import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { memo, useCallback, useEffect, useRef } from "react";
import { Animated, Easing, FlatList, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "../../components/typography";
import { ROOMMATES, USER_NAME, USER_TRAITS, type Roommate } from "../../mocks/home";
import {
  CARD_GAP,
  CARD_RAISE,
  CARD_WIDTH,
  COLORS,
  styles,
} from "./index.styles";

const SNAP = CARD_WIDTH + CARD_GAP;
const AUTO_SLIDE_INTERVAL = 3000;
const SLIDE_ANIM_DURATION = 700;

function Header() {
  return (
    <View style={styles.header}>
      <Image
        source={require("../../assets/images/logo/DOORI.png")}
        style={styles.logo}
        contentFit="contain"
        accessibilityLabel="DOORI 로고"
      />
      <View accessibilityElementsHidden importantForAccessibility="no">
        <Feather name="bell" size={styles.bell.width} color="#1A3262" />
      </View>
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
}: {
  traits: readonly [string, string, string];
  tone: "light" | "primary";
}) {
  return (
    <View style={tone === "light" ? styles.topChipsRow : styles.cardChipsRow}>
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
  onPress: (id: string) => void;
}) {
  const handlePress = useCallback(() => onPress(item.id), [onPress, item.id]);

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
        onPress={handlePress}
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

function RoommateCarousel() {
  const router = useRouter();
  const scrollX = useRef(new Animated.Value(0)).current;
  const listRef = useRef<FlatList<Roommate>>(null);
  const currentIndex = useRef(0);
  const isDragging = useRef(false);

  // 자동 슬라이드 + cleanup
  useEffect(() => {
    let activeAnim: Animated.CompositeAnimation | null = null;
    let activeValue: Animated.Value | null = null;
    let activeListenerId: string | null = null;

    const cleanupActive = () => {
      activeAnim?.stop();
      if (activeValue && activeListenerId !== null) {
        activeValue.removeListener(activeListenerId);
      }
      activeAnim = null;
      activeValue = null;
      activeListenerId = null;
    };

    const timer = setInterval(() => {
      if (isDragging.current) return;
      const next = Math.min(currentIndex.current + 1, ROOMMATES.length - 1);
      if (next === currentIndex.current) return;

      cleanupActive();

      const startOffset = currentIndex.current * SNAP;
      currentIndex.current = next;

      const value = new Animated.Value(startOffset);
      const listenerId = value.addListener(({ value: v }) => {
        listRef.current?.scrollToOffset({ offset: v, animated: false });
      });
      const anim = Animated.timing(value, {
        toValue: next * SNAP,
        duration: SLIDE_ANIM_DURATION,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: false,
      });

      activeAnim = anim;
      activeValue = value;
      activeListenerId = listenerId;

      anim.start(() => {
        value.removeListener(listenerId);
        if (activeValue === value) {
          activeAnim = null;
          activeValue = null;
          activeListenerId = null;
        }
      });
    }, AUTO_SLIDE_INTERVAL);

    return () => {
      clearInterval(timer);
      cleanupActive();
    };
  }, []);

  const handleCardPress = useCallback(
    (id: string) => {
      // TODO: 룸메이트 상세 라우트 생성 후 typed routes로 교체
      router.push(`/roommate/${id}` as never);
    },
    [router],
  );

  const handleScrollBeginDrag = useCallback(() => {
    isDragging.current = true;
  }, []);

  const finalizeCarouselScroll = useCallback(
    (e: { nativeEvent: { contentOffset: { x: number } } }) => {
      isDragging.current = false;
      currentIndex.current = Math.round(e.nativeEvent.contentOffset.x / SNAP);
    },
    [],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Roommate; index: number }) => {
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
          <RoommateCard item={item} onPress={handleCardPress} />
        </Animated.View>
      );
    },
    [scrollX, handleCardPress],
  );

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: SNAP,
      offset: SNAP * index,
      index,
    }),
    [],
  );

  return (
    <View style={styles.carouselWrap}>
      <Animated.FlatList
        // Animated.FlatList의 ref 타입이 정확히 FlatList<T>로 추론되지 않아 캐스팅
        ref={listRef as unknown as React.Ref<Animated.FlatList<Roommate>>}
        data={ROOMMATES}
        horizontal
        keyExtractor={(item: Roommate) => item.id}
        showsHorizontalScrollIndicator={false}
        snapToInterval={SNAP}
        decelerationRate="fast"
        contentContainerStyle={styles.carouselContent}
        initialScrollIndex={0}
        getItemLayout={getItemLayout}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={finalizeCarouselScroll}
        onMomentumScrollEnd={finalizeCarouselScroll}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
        windowSize={5}
        removeClippedSubviews={false}
        renderItem={renderItem}
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
