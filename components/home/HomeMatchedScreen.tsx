import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "@components/typography";
import { hs } from "@constants";
import { gradient } from "@constants/colors";
import {
  HOME_MATCHED_CHORES,
  HOME_MATCHED_DAY_SUMMARY,
  HOME_MATCHED_STATUS,
  type HomeChoreItem,
  type HomeStatusCard,
} from "@/mocks/home-with-roommate";
import { getHomeMatchedDay } from "@hooks/homeMatchedDay";
import { MATCHED_COLORS, styles } from "./HomeMatchedScreen.styles";

type Props = {
  onDevBack?: () => void;
};

function Header() {
  return (
    <View style={styles.header}>
      <Image
        source={require("../../assets/images/logo/DOORI.png")}
        style={styles.logo}
        contentFit="contain"
        accessibilityLabel="DOORI 로고"
      />
      <View style={styles.headerActions}>
        <Pressable
          style={styles.headerIconHit}
          accessibilityRole="button"
          accessibilityLabel="알림"
        >
          <Image
            source={require("../../assets/images/home/matched/bell-02.png")}
            style={styles.headerBellIcon}
            contentFit="contain"
          />
        </Pressable>
        <Pressable
          style={styles.headerIconHit}
          accessibilityRole="button"
          accessibilityLabel="메뉴"
        >
          <Feather name="more-vertical" size={hs(24)} color={MATCHED_COLORS.timeText} />
        </Pressable>
      </View>
    </View>
  );
}

function StatusCard({ card }: { card: HomeStatusCard }) {
  const isSelf = card.variant === "self";
  const cardStyle = isSelf ? styles.statusCardSelf : styles.statusCardRoommate;
  const wrapStyle = isSelf ? undefined : styles.statusCardRoommateWrap;

  return (
    <View style={wrapStyle}>
      <View style={cardStyle}>
        <Image source={card.avatar} style={styles.statusAvatar} contentFit="cover" />
        <View style={styles.statusTextWrap}>
          <Text weight="bold" style={styles.statusName}>
            {card.name}
          </Text>
          <Text weight="medium" style={styles.statusMessage}>
            {card.message}
          </Text>
        </View>
      </View>
    </View>
  );
}

function ChoreRow({ item, showDivider }: { item: HomeChoreItem; showDivider: boolean }) {
  return (
    <>
      <View style={styles.choreRow}>
        <Image source={item.icon} style={styles.choreIcon} contentFit="contain" />
        <View style={styles.choreBody}>
          <Text weight="medium" style={styles.choreTitle}>
            {item.title}
          </Text>
          <Text weight="medium" style={styles.choreTime}>
            {item.time}
          </Text>
        </View>
        <Text weight="medium" style={styles.choreAssignee}>
          {item.assignee}
        </Text>
      </View>
      {showDivider ? <View style={styles.choreDivider} /> : null}
    </>
  );
}

function ChoreList() {
  return (
    <View style={styles.choreList}>
      {HOME_MATCHED_CHORES.map((item, index) => (
        <ChoreRow
          key={item.id}
          item={item}
          showDivider={index < HOME_MATCHED_CHORES.length - 1}
        />
      ))}
    </View>
  );
}

function ArcDatesRow({
  arcDates,
  selectedDate,
}: {
  arcDates: readonly [number, number, number, number, number];
  selectedDate: number;
}) {
  const [leftFar, leftNear, , rightNear, rightFar] = arcDates;

  return (
    <View style={styles.arcDatesRow}>
      <Text weight="regular" style={[styles.arcDateSide, styles.arcDateLeftFar]}>
        {leftFar}
      </Text>
      <Text weight="regular" style={[styles.arcDateSide, styles.arcDateLeftNear]}>
        {leftNear}
      </Text>
      <Text weight="semiBold" style={styles.arcDateCenter}>
        {selectedDate}
      </Text>
      <Text weight="regular" style={[styles.arcDateSide, styles.arcDateRightNear]}>
        {rightNear}
      </Text>
      <Text weight="regular" style={[styles.arcDateSide, styles.arcDateRightFar]}>
        {rightFar}
      </Text>
    </View>
  );
}

function SchedulePanel() {
  const day = getHomeMatchedDay();

  return (
    <View style={styles.scheduleSection}>
      <ArcDatesRow arcDates={day.arcDates} selectedDate={day.selectedDate} />
      <View style={styles.arcPanel}>
        <View style={styles.arcPanelContent}>
          <View style={styles.monthWeekWrap}>
            <Text weight="bold" style={styles.monthLabel}>
              {day.monthLabel}
            </Text>
            <Text weight="medium" style={styles.weekdayLabel}>
              {day.weekdayLabel}
            </Text>
          </View>

          <Text weight="medium" style={styles.daySummary}>
            {HOME_MATCHED_DAY_SUMMARY}
          </Text>

          <ChoreList />
        </View>

        <LinearGradient
          colors={["rgba(149,164,210,0)", "rgba(149,164,210,0.5)"]}
          locations={[0, 1]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.listBottomFade}
          pointerEvents="none"
        />
      </View>
    </View>
  );
}

export function HomeMatchedScreen({ onDevBack }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={[...gradient.background.colors]}
      locations={[...gradient.background.locations]}
      start={gradient.background.start}
      end={gradient.background.end}
      style={styles.root}
    >
      <View style={[styles.safeArea, { paddingTop: insets.top }]}>
        {__DEV__ && onDevBack ? (
          <Pressable
            style={styles.devToggle}
            onPress={onDevBack}
            accessibilityRole="button"
            accessibilityLabel="룸메 없음 홈으로 돌아가기 (개발용)"
          >
            <Text weight="medium" style={styles.devToggleText}>
              DEV · 룸메 없음
            </Text>
          </Pressable>
        ) : null}

        <View style={styles.screen}>
          <Header />
          <View style={styles.statusSection}>
            {HOME_MATCHED_STATUS.map((card) => (
              <StatusCard key={card.variant} card={card} />
            ))}
          </View>
          <SchedulePanel />
        </View>
      </View>
    </LinearGradient>
  );
}
