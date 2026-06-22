import type { ChatTimelineItem } from "@/types/chat";

export const MESSAGES_BY_CHAT_ID: Record<string, ChatTimelineItem[]> = {
  "1": [
    { kind: "date", label: "2026년 05월 21일" },
    {
      kind: "message",
      data: {
        id: "m1",
        sender: "other",
        text: "안녕하세요! 혹시 아직 룸메이트 구하고 계신가요?",
        timestamp: "14:20",
        unreadBy: 3,
      },
    },
    {
      kind: "message",
      data: {
        id: "m2",
        sender: "me",
        text: "네 맞아요! 혹시 어느 학교 다니세요?",
        timestamp: "14:35",
      },
    },
    {
      kind: "message",
      data: {
        id: "m3",
        sender: "other",
        text: "저는 한국대학교 3학년이에요 😊\n전공은 컴퓨터공학이고요!",
        timestamp: "14:37",
        unreadBy: 2,
      },
    },
    {
      kind: "message",
      data: {
        id: "m4",
        sender: "me",
        text: "오 저도 한국대예요!\n반갑네요 ㅎㅎ",
        timestamp: "14:40",
      },
    },
    {
      kind: "message",
      data: {
        id: "m5",
        sender: "other",
        text: "정말요?? 완전 반가워요 🎉",
        timestamp: "14:41",
        reactions: [{ emoji: "heart", count: 1 }],
      },
    },
    { kind: "date", label: "2026년 05월 23일" },
    {
      kind: "message",
      data: {
        id: "m6",
        sender: "other",
        text: "안녕하세요! 아직 룸메 못 구하셨다면\n같이 해보고 싶어 연락드렸어요!",
        timestamp: "10:00",
        reactions: [{ emoji: "heart", count: 1 }],
      },
    },
    {
      kind: "message",
      data: {
        id: "m7",
        sender: "me",
        text: "아하! 안녕하세요",
        timestamp: "10:01",
      },
    },
    {
      kind: "message",
      data: {
        id: "m8",
        sender: "me",
        text: "혹시 원하시는 입주 시기가 어떻게 되세요?",
        timestamp: "10:02",
      },
    },
    {
      kind: "message",
      data: {
        id: "m9",
        sender: "other",
        text: "저는 7월 초부터 가능해요!\n학교 근처면 더 좋고요 😄",
        timestamp: "10:05",
        unreadBy: 1,
      },
    },
    {
      kind: "message",
      data: {
        id: "m10",
        sender: "me",
        text: "저도 딱 그때 맞아요.\n학교에서 도보 10분 거리 원룸 보고 있는데 같이 보러 가실래요?",
        timestamp: "10:07",
      },
    },
    {
      kind: "message",
      data: {
        id: "m11",
        sender: "other",
        text: "좋아요! 언제가 편하세요?",
        timestamp: "10:08",
        unreadBy: 2,
      },
    },
    {
      kind: "message",
      data: {
        id: "m12",
        sender: "me",
        text: "이번 주 토요일 오후 어때요?",
        timestamp: "10:10",
        unreadBy: 1,
      },
    },
  ],
  "2": [
    { kind: "date", label: "2026년 05월 22일" },
    {
      kind: "message",
      data: {
        id: "m1",
        sender: "other",
        text: "룸메 아직 안 구하셨나요?\n저도 찾고 있어서요!",
        timestamp: "18:00",
      },
    },
    {
      kind: "message",
      data: {
        id: "m2",
        sender: "me",
        text: "아직 못 구했어요. 어떤 조건 원하세요?",
        timestamp: "18:15",
        unreadBy: 2,
      },
    },
  ],
};
