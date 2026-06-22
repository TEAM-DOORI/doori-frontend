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

export const HOME_MATCHED_DAY_SUMMARY = "오늘은 선우님이 청소하는 날이에요!";

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
