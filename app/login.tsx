import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BackgroundGradient } from "../components/layout/BackgroundGradient";
import { Text } from "../components/typography";
import { styles } from "./login.styles";

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const goToProfileSetup = () => {
    router.push("/onboarding/profile-setup");
  };

  const goToMain = () => {
    router.replace("/(tabs)");
  };

  return (
    <BackgroundGradient>
      <View style={[styles.safeArea, { paddingTop: insets.top }]}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: Math.max(insets.bottom, 16) },
          ]}
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.logoSection}>
              <Text
                weight='semiBold'
                style={styles.subtitle}>
                나에게 딱 맞는 룸메이트 찾기
              </Text>
              <Image
                source={require("../assets/images/logo/DOORI.png")}
                style={styles.logo}
                contentFit='contain'
                accessibilityLabel='DOORI 로고'
              />
            </View>

            <View style={styles.actionBlock}>
              <View
                style={styles.characterSection}
                pointerEvents='box-none'>
                <View
                  style={styles.speechGroup}
                  pointerEvents='none'>
                  <View style={styles.speechBubble}>
                    <Text
                      weight='medium'
                      style={styles.speechText}>
                      음모르겠다~
                    </Text>
                  </View>
                  <View style={styles.speechBubbleTail} />
                </View>
                <Image
                  source={require("../assets/images/login/loginCharactor.png")}
                  style={styles.character}
                  contentFit='contain'
                  accessibilityLabel='DOORI 캐릭터'
                  pointerEvents='none'
                />
              </View>

              <View style={styles.footer}>
                <Pressable
                  style={({ pressed }) => [
                    styles.primaryButton,
                    pressed && { opacity: 0.92 },
                  ]}
                  onPress={goToProfileSetup}
                  accessibilityRole='button'
                  accessibilityLabel='학교 이메일로 로그인하기'>
                  <Text
                    weight='semiBold'
                    style={styles.primaryButtonText}>
                    학교 이메일로 로그인하기
                  </Text>
                </Pressable>
                <Pressable
                  style={({ pressed }) => [
                    styles.secondaryButton,
                    pressed && { opacity: 0.92 },
                  ]}
                  onPress={goToMain}
                  accessibilityRole='button'
                  accessibilityLabel='회원가입하기'>
                  <Text
                    weight='medium'
                    style={styles.secondaryButtonText}>
                    회원가입하기
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </BackgroundGradient>
  );
}
