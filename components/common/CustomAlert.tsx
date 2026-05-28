import { Modal, Pressable, StyleSheet, View } from "react-native";

import { fs, hs, ms, vs } from "../../constants";
import { colorStyle } from "../../constants/colors";
import { Text } from "../typography";

export type CustomAlertProps = {
  visible: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

export function CustomAlert({
  visible,
  title = "알림",
  message,
  confirmText = "확인",
  cancelText,
  onConfirm,
  onCancel,
}: CustomAlertProps) {
  const hasCancel = typeof cancelText === "string" && typeof onCancel === "function";

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onConfirm}>
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <Text weight="bold" style={styles.title}>
            {title}
          </Text>
          <Text weight="regular" style={styles.message}>
            {message}
          </Text>

          <View style={styles.buttonRow}>
            {hasCancel && (
              <Pressable
                style={({ pressed }) => [styles.cancelButton, pressed && styles.pressed]}
                onPress={onCancel}
                accessibilityRole="button"
                accessibilityLabel={cancelText}
              >
                <Text weight="semiBold" style={styles.cancelText}>
                  {cancelText}
                </Text>
              </Pressable>
            )}

            <Pressable
              style={({ pressed }) => [styles.confirmButton, pressed && styles.pressed]}
              onPress={onConfirm}
              accessibilityRole="button"
              accessibilityLabel={confirmText}
            >
              <Text weight="semiBold" style={styles.confirmText}>
                {confirmText}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(21, 23, 27, 0.4)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: hs(24),
  },
  container: {
    width: "100%",
    maxWidth: hs(320),
    backgroundColor: "#FFFFFF",
    borderRadius: ms(16),
    paddingHorizontal: hs(20),
    paddingTop: vs(20),
    paddingBottom: vs(16),
  },
  title: {
    fontSize: fs(20),
    lineHeight: fs(28),
    color: colorStyle.Main_Text,
    letterSpacing: -0.6,
    textAlign: "center",
  },
  message: {
    marginTop: vs(10),
    fontSize: fs(15),
    lineHeight: fs(22),
    color: colorStyle.S05,
    letterSpacing: -0.45,
    textAlign: "center",
  },
  buttonRow: {
    marginTop: vs(18),
    flexDirection: "row",
    gap: hs(8),
  },
  cancelButton: {
    flex: 1,
    height: vs(46),
    borderRadius: ms(12),
    backgroundColor: colorStyle.S01,
    borderWidth: 1,
    borderColor: colorStyle.S03,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButton: {
    flex: 1,
    height: vs(46),
    borderRadius: ms(12),
    backgroundColor: colorStyle.Sub3,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelText: {
    fontSize: fs(16),
    lineHeight: fs(22),
    color: colorStyle.S05,
    letterSpacing: -0.48,
  },
  confirmText: {
    fontSize: fs(16),
    lineHeight: fs(22),
    color: colorStyle.Main_Text,
    letterSpacing: -0.48,
  },
  pressed: {
    opacity: 0.85,
  },
});
