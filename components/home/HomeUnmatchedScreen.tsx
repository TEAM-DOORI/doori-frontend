import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HomeRoommateCarousel } from "@components/home/HomeRoommateCarousel";
import { Text } from "@components/typography";
import { USER_NAME, USER_TRAITS } from "@/mocks/home";
import { COLORS, styles } from "../../app/(tabs)/index.styles";
import { styles as matchedStyles } from "./HomeMatchedScreen.styles";

type Props = {
  onDevShowMatched?: () => void;
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
      <Text weight="medium" style={isPrimary ? styles.chipPrimaryText : styles.chipLightText}>
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

export function HomeUnmatchedScreen({ onDevShowMatched }: Props) {
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
        {__DEV__ && onDevShowMatched ? (
          <Pressable
            style={matchedStyles.devToggle}
            onPress={onDevShowMatched}
            accessibilityRole="button"
            accessibilityLabel="룸메 있음 홈 미리보기 (개발용)"
          >
            <Text weight="medium" style={matchedStyles.devToggleText}>
              DEV · 룸메 있음
            </Text>
          </Pressable>
        ) : null}

        <Header />
        <View>
          <MatchTitle />
          <TraitChipRow traits={USER_TRAITS} tone="light" />
          <HeroCharacter />
        </View>
        <HomeRoommateCarousel />
      </View>
    </LinearGradient>
  );
}
