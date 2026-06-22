import type { ImageSourcePropType } from "react-native";

export type HomeStatusCard = {
  name: string;
  message: string;
  avatar: ImageSourcePropType;
  variant: "self" | "roommate";
};

export type HomeChoreItem = {
  id: string;
  title: string;
  time: string;
  assignee: string;
  icon: ImageSourcePropType;
};

export type HomeMatchedDay = {
  monthLabel: string;
  weekdayLabel: string;
  selectedDate: number;
  arcDates: readonly number[];
  summary: string;
};

const statusSelfAvatar = require("../assets/images/home/matched/status-self.png");
const statusRoommateAvatar = require("../assets/images/home/matched/status-roommate.png");
const choreSweepIcon = require("../assets/images/home/matched/chore-sweep.png");
const choreTrashIcon = require("../assets/images/home/matched/chore-trash.png");

export const HOME_MATCHED_STATUS: readonly [HomeStatusCard, HomeStatusCard] = [
  {
    variant: "self",
    name: "내 룸메 OOO",
    message: "오늘은 과제중이에요 ✏️",
    avatar: statusSelfAvatar,
  },
  {
    variant: "roommate",
    name: "김선우",
    message: "잠시 외출했어요",
    avatar: statusRoommateAvatar,
  },
];

export const HOME_MATCHED_DAY: HomeMatchedDay = {
  monthLabel: "3월",
  weekdayLabel: "수요일",
  selectedDate: 14,
  arcDates: [12, 13, 14, 15, 16],
  summary: "오늘은 선우님이 청소하는 날이에요!",
};

export const HOME_MATCHED_CHORES: readonly HomeChoreItem[] = [
  {
    id: "sweep",
    title: "바닥 청소하기",
    time: "12:00",
    assignee: "선우",
    icon: choreSweepIcon,
  },
  {
    id: "trash",
    title: "쓰레기 버리기",
    time: "16:00",
    assignee: "가람",
    icon: choreTrashIcon,
  },
];
