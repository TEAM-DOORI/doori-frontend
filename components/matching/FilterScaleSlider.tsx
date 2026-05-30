import { useCallback, useMemo, useRef, useState } from "react";
import {
  PanResponder,
  Pressable,
  View,
  type LayoutChangeEvent,
} from "react-native";

import { MATCHING_SCALE_STEP_COUNT } from "../../types/matching-filter";
import type { MatchingScaleStep } from "../../types/matching-filter";
import { useScaledStyles } from "../../hooks";
import { Text } from "../typography";
import {
  createFilterScaleSliderStyles,
  getFilterScaleSliderMetrics,
} from "./_styles/FilterScaleSlider.styles";

const MAX_STEP = MATCHING_SCALE_STEP_COUNT - 1;

type FilterScaleSliderProps = {
  /** 3개 라벨 — 단계 0, 2, 4에만 표시 */
  labels: readonly [string, string, string];
  value: MatchingScaleStep;
  onChange: (value: MatchingScaleStep) => void;
};

function ratioToValue(ratio: number): MatchingScaleStep {
  const step = Math.round(ratio * MAX_STEP);
  return Math.max(0, Math.min(MAX_STEP, step)) as MatchingScaleStep;
}

function labelIndexForStep(step: MatchingScaleStep): 0 | 1 | 2 | null {
  if (step === 0) return 0;
  if (step === 2) return 1;
  if (step === 4) return 2;
  return null;
}

function accessibilityLabelForStep(
  step: MatchingScaleStep,
  labels: readonly [string, string, string]
) {
  if (step <= 1) return labels[0];
  if (step === 2) return labels[1];
  if (step === 3) return labels[1];
  return labels[2];
}

export function FilterScaleSlider({
  labels,
  value,
  onChange,
}: FilterScaleSliderProps) {
  const styles = useScaledStyles(createFilterScaleSliderStyles);
  const metrics = useScaledStyles(getFilterScaleSliderMetrics);
  const [travelWidth, setTravelWidth] = useState(0);
  const thumbSize = metrics.thumbSize;
  const trackRef = useRef<View>(null);
  const trackMetrics = useRef({ pageX: 0, width: 1 });

  const measureTrack = useCallback(() => {
    trackRef.current?.measureInWindow((pageX, _y, width) => {
      trackMetrics.current = { pageX, width: Math.max(width, 1) };
    });
  }, []);

  const updateFromPageX = useCallback(
    (pageX: number) => {
      const { pageX: trackX, width } = trackMetrics.current;
      const localX = pageX - trackX;
      const ratio = Math.max(0, Math.min(1, localX / width));
      onChange(ratioToValue(ratio));
    },
    [onChange]
  );

  const handleAccessibilityStep = useCallback(
    (direction: "increment" | "decrement") => {
      const next =
        direction === "increment"
          ? Math.min(MAX_STEP, value + 1)
          : Math.max(0, value - 1);
      onChange(next as MatchingScaleStep);
    },
    [onChange, value]
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_evt, gesture) =>
          Math.abs(gesture.dx) > Math.abs(gesture.dy),
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: (evt) => updateFromPageX(evt.nativeEvent.pageX),
        onPanResponderMove: (evt) => updateFromPageX(evt.nativeEvent.pageX),
      }),
    [updateFromPageX]
  );

  const handleTrackLayout = (event: LayoutChangeEvent) => {
    setTravelWidth(event.nativeEvent.layout.width);
    measureTrack();
  };

  const thumbTravel = Math.max(travelWidth - thumbSize, 0);
  const thumbLeft = (value / MAX_STEP) * thumbTravel;
  const steps = Array.from(
    { length: MATCHING_SCALE_STEP_COUNT },
    (_, step) => step as MatchingScaleStep
  );

  return (
    <View style={styles.root}>
      <View style={styles.trackWrap}>
        <View
          ref={trackRef}
          style={styles.trackArea}
          onLayout={handleTrackLayout}
          accessibilityRole="adjustable"
          accessibilityValue={{
            min: 0,
            max: MAX_STEP,
            now: value,
            text: accessibilityLabelForStep(value, labels),
          }}
          accessibilityActions={[
            { name: "increment", label: "값 증가" },
            { name: "decrement", label: "값 감소" },
          ]}
          onAccessibilityAction={(event) => {
            if (event.nativeEvent.actionName === "increment") {
              handleAccessibilityStep("increment");
              return;
            }
            if (event.nativeEvent.actionName === "decrement") {
              handleAccessibilityStep("decrement");
            }
          }}
          {...panResponder.panHandlers}>
          <View style={styles.track} />
          <View style={[styles.thumb, { left: thumbLeft }]} />
        </View>
      </View>

      <View style={styles.labelsRow}>
        {steps.map((step) => {
          const labelIdx = labelIndexForStep(step);
          const label = labelIdx !== null ? labels[labelIdx] : null;
          const active = value === step;
          const cellAlign =
            step === 0
              ? "flex-start"
              : step === MAX_STEP
                ? "flex-end"
                : "center";

          return (
            <Pressable
              key={step}
              style={[styles.labelCell, { alignItems: cellAlign }]}
              onPress={() => onChange(step)}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              accessibilityLabel={label ?? `단계 ${step + 1}`}>
              {label ? (
                <Text
                  weight={active ? "semiBold" : "medium"}
                  numberOfLines={1}
                  style={[
                    styles.label,
                    step === 0 && styles.labelLeft,
                    step === 2 && styles.labelCenter,
                    step === MAX_STEP && styles.labelRight,
                    active && styles.labelActive,
                  ]}>
                  {label}
                </Text>
              ) : (
                <View style={styles.labelPlaceholder} />
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
