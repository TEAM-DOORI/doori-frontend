import type { Chat } from "@/types/chat";

const sampleProfile = require("@assets/images/chat/chat-profile.png");
const sampleFood = require("@assets/images/chat/sample-food.png");

export const CHATS: Chat[] = [
  {
    id: "1",
    category: "roommate",
    title: "임서현",
    lastMessage: "안녕하세요!",
    timestamp: "5일 전",
    unreadCount: 4,
    avatar: {
      variant: "single",
      source: sampleProfile,
      isOnline: true,
    },
  },
  {
    id: "2",
    category: "roommate",
    title: "박지우",
    lastMessage: "룸메 아직 안 구하셨나요?",
    timestamp: "일주일 전",
    unreadCount: 2,
    avatar: {
      variant: "single",
      source: sampleProfile,
    },
  },
  {
    id: "3",
    category: "roommate",
    title: "박지우",
    lastMessage: "룸메 아직 안 구하셨나요?",
    timestamp: "일주일 전",
    unreadCount: 2,
    avatar: {
      variant: "single",
      source: sampleProfile,
      isOnline: true,
    },
  },
  {
    id: "4",
    category: "delivery",
    title: "같이 엽떡 드실 분~",
    lastMessage: "주문하고 오면 다시 연락드릴게요!",
    timestamp: "마감",
    unreadCount: 2,
    avatar: {
      variant: "group",
      foodImage: sampleFood,
      members: [sampleProfile, sampleProfile, sampleProfile],
    },
  },
  {
    id: "5",
    category: "roommate",
    title: "박지우",
    lastMessage: "네 확인했습니다!",
    timestamp: "마감",
    closed: true,
    avatar: {
      variant: "single",
      source: sampleProfile,
      isOnline: true,
    },
  },
];
