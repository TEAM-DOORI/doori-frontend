import { Pressable, View } from "react-native";

import type { ChatFilter } from "@/types/chat";
import { Text } from "@components/typography";
import { styles } from "./ChatCategoryTabs.styles";

const TABS: { id: ChatFilter; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "roommate", label: "룸메 매칭" },
  { id: "delivery", label: "배달메이트" },
];

type Props = {
  active: ChatFilter;
  onChange: (tab: ChatFilter) => void;
};

export function ChatCategoryTabs({ active, onChange }: Props) {
  return (
    <View style={styles.container}>
      {TABS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <Pressable
            key={id}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onChange(id)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
          >
            <Text
              weight={isActive ? "semiBold" : "medium"}
              style={[styles.label, isActive && styles.labelActive]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
