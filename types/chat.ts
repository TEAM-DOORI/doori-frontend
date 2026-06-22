import type { ImageSourcePropType } from "react-native";

export type ChatCategory = "roommate" | "delivery";

export type SingleAvatar = {
  variant: "single";
  source: ImageSourcePropType;
  isOnline?: boolean;
};

export type GroupAvatar = {
  variant: "group";
  /** 배달 그룹의 중앙 음식 이미지 */
  foodImage: ImageSourcePropType;
  /** 하단 멤버 아바타 — 3개 권장. 그 이상은 추후 +N 표시로 확장 */
  members: readonly ImageSourcePropType[];
};

export type ChatAvatarData = SingleAvatar | GroupAvatar;

export type Chat = {
  id: string;
  category: ChatCategory;
  /** 1:1이면 상대 이름, 그룹이면 모임 제목 */
  title: string;
  lastMessage: string;
  /** 표시용 문자열 ("5일 전", "마감" 등). 추후 API 연동 시 Date + 포맷터로 교체 */
  timestamp: string;
  unreadCount?: number;
  /** "마감" 상태 — 전체 행 opacity 0.4 처리 */
  closed?: boolean;
  avatar: ChatAvatarData;
};

export type ChatFilter = "all" | ChatCategory;

// ─── 채팅방(메시지) 관련 타입 ───────────────────────────────────────────────

export type MessageSender = "me" | "other";

export type MessageReaction = {
  emoji: "heart";
  count: number;
};

export type ChatMessage = {
  id: string;
  sender: MessageSender;
  text: string;
  /** 표시용 문자열 ("10:00"). 추후 Date + 포맷터로 교체 */
  timestamp: string;
  /** 미열람 수 — sender === "me"일 때만 의미 있음 */
  unreadBy?: number;
  reactions?: readonly MessageReaction[];
};

export type ChatTimelineItem =
  | { kind: "message"; data: ChatMessage }
  | { kind: "date"; label: string };
