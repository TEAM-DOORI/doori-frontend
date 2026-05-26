import { useCallback, useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  FlatList,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import type { Roommate } from "../../mocks/home";

const AUTO_SLIDE_INTERVAL = 3000;
const SLIDE_ANIM_DURATION = 700;

type RoommateCarouselProps = {
  data: readonly Roommate[];
  snap: number;
  cardRaise: number;
  listHeight: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
  nestedScrollEnabled?: boolean;
  /** true면 마지막 카드 다음 1번 카드(offset 0)로 순환 */
  loop?: boolean;
  onCenterIndexChange?: (index: number) => void;
  renderCard: (item: Roommate, index: number) => React.ReactNode;
};

export function RoommateCarousel({
  data,
  snap,
  cardRaise,
  listHeight,
  contentContainerStyle,
  nestedScrollEnabled,
  loop = false,
  onCenterIndexChange,
  renderCard,
}: RoommateCarouselProps) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const listRef = useRef<FlatList<Roommate>>(null);
  const currentIndex = useRef(0);
  const isDragging = useRef(false);

  const syncCenterIndex = useCallback(
    (offsetX: number) => {
      const index = Math.round(offsetX / snap);
      const clamped = Math.max(0, Math.min(index, data.length - 1));
      if (currentIndex.current !== clamped) {
        currentIndex.current = clamped;
      }
      onCenterIndexChange?.(clamped);
    },
    [data.length, onCenterIndexChange, snap],
  );

  useEffect(() => {
    onCenterIndexChange?.(0);
  }, [onCenterIndexChange]);

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

    const scrollToIndex = (index: number, animated: boolean) => {
      const offset = index * snap;
      listRef.current?.scrollToOffset({ offset, animated });
      scrollX.setValue(offset);
      currentIndex.current = index;
      onCenterIndexChange?.(index);
    };

    const timer = setInterval(() => {
      if (isDragging.current || data.length === 0) return;

      const atEnd = currentIndex.current >= data.length - 1;
      const next = loop && atEnd ? 0 : Math.min(currentIndex.current + 1, data.length - 1);

      if (next === currentIndex.current) return;

      cleanupActive();

      if (loop && atEnd && next === 0) {
        scrollToIndex(0, false);
        return;
      }

      const startOffset = currentIndex.current * snap;
      currentIndex.current = next;

      const value = new Animated.Value(startOffset);
      const listenerId = value.addListener(({ value: v }) => {
        listRef.current?.scrollToOffset({ offset: v, animated: false });
      });
      const anim = Animated.timing(value, {
        toValue: next * snap,
        duration: SLIDE_ANIM_DURATION,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: false,
      });

      activeAnim = anim;
      activeValue = value;
      activeListenerId = listenerId;

      anim.start(({ finished }) => {
        value.removeListener(listenerId);
        if (finished) {
          scrollX.setValue(next * snap);
          onCenterIndexChange?.(next);
        }
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
  }, [data.length, loop, onCenterIndexChange, snap, scrollX]);

  const handleScrollBeginDrag = useCallback(() => {
    isDragging.current = true;
  }, []);

  const finalizeCarouselScroll = useCallback(
    (e: { nativeEvent: { contentOffset: { x: number } } }) => {
      isDragging.current = false;
      syncCenterIndex(e.nativeEvent.contentOffset.x);
    },
    [syncCenterIndex],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Roommate; index: number }) => {
      const center = index * snap;
      const quarter = snap * 0.25;
      const inputRange = [
        center - snap,
        center - quarter,
        center,
        center + quarter,
        center + snap,
      ];
      const sideLift = cardRaise;
      const midLift = cardRaise * 0.4;
      const translateY = scrollX.interpolate({
        inputRange,
        outputRange: [sideLift, midLift, 0, midLift, sideLift],
        extrapolate: "clamp",
      });
      return (
        <Animated.View style={{ transform: [{ translateY }] }}>
          {renderCard(item, index)}
        </Animated.View>
      );
    },
    [snap, cardRaise, scrollX, renderCard],
  );

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: snap,
      offset: snap * index,
      index,
    }),
    [snap],
  );

  return (
    <Animated.FlatList
      ref={listRef as unknown as React.Ref<Animated.FlatList<Roommate>>}
      data={data}
      horizontal
      nestedScrollEnabled={nestedScrollEnabled}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      snapToInterval={snap}
      decelerationRate="fast"
      style={{ height: listHeight }}
      contentContainerStyle={contentContainerStyle}
      {...(data.length > 0 ? { initialScrollIndex: 0 as const } : {})}
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
  );
}
