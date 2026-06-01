import { Image } from "expo-image";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "@components/typography";
import { vs } from "@constants";
import { useOnboardingCompleteContent } from "@/contexts/ProfileSetupContext";
import { useNavigateOnce } from "@hooks/useNavigateOnce";
import { useScaledStyles } from "@hooks/useScaledStyles";
import { createOnboardingCompleteStyles } from "./_styles/_onboarding-complete.styles";

export default function OnboardingCompleteScreen() {
  const { dismissTo } = useNavigateOnce();
  const insets = useSafeAreaInsets();
  const styles = useScaledStyles(createOnboardingCompleteStyles);
  const content = useOnboardingCompleteContent();

  const footerPaddingBottom = Math.max(insets.bottom + vs(20), vs(32));
  const footerStyle = [styles.footer, { paddingBottom: footerPaddingBottom }];

  const handleStart = () => {
    dismissTo("/(tabs)");
  };

  return (
      <View style={styles.screen}>
        <View style={styles.content}>
          <Text
            weight='bold'
            style={styles.title}
            numberOfLines={1}>
            {content.title}
          </Text>
          <View style={styles.descriptionBlock}>
            {content.descriptionLines.map((line) => (
              <Text
                key={line}
                weight='regular'
                style={styles.descriptionLine}>
                {line}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.illustrationWrap}>
          <Image
            source={
              content.imageUrl ? { uri: content.imageUrl } : content.imageSource
            }
            style={styles.illustration}
            contentFit='contain'
            accessibilityLabel='온보딩 완료 일러스트'
          />
        </View>

        <View style={styles.spacer} />

        <View style={footerStyle}>
          <Pressable
            style={({ pressed }) => [
              styles.startButton,
              pressed && styles.startButtonPressed,
            ]}
            onPress={handleStart}
            accessibilityRole='button'
            accessibilityLabel='시작하기'>
            <Text
              weight='bold'
              style={styles.startButtonText}>
              시작하기
            </Text>
          </Pressable>
        </View>
      </View>
  );
}
