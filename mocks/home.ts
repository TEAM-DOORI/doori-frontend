// 홈 화면 mock 데이터 — API 연동 시점에 삭제 예정
import type { ImageSourcePropType } from "react-native";

export type Roommate = {
  id: string;
  name: string;
  matchRate: number;
  traits: [string, string, string];
  profile: ImageSourcePropType;
};

export const USER_NAME = "선우";
export const USER_TRAITS: [string, string, string] = [
  "야행성",
  "비흡연",
  "깔끔한",
];

const profile = require("../assets/images/home/profile-1.png");

export const ROOMMATES: Roommate[] = [
  { id: "1", name: "김가람1", matchRate: 98, traits: ["야행성", "비흡연", "깔끔한"], profile },
  { id: "2", name: "김가람2", matchRate: 98, traits: ["야행성", "비흡연", "깔끔한"], profile },
  { id: "3", name: "김가람3", matchRate: 98, traits: ["야행성", "비흡연", "깔끔한"], profile },
  { id: "4", name: "김가람4", matchRate: 98, traits: ["야행성", "비흡연", "깔끔한"], profile },
  { id: "5", name: "김가람5", matchRate: 98, traits: ["야행성", "비흡연", "깔끔한"], profile },
  { id: "6", name: "김가람6", matchRate: 98, traits: ["야행성", "비흡연", "깔끔한"], profile },
];
