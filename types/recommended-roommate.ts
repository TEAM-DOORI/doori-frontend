import type { Roommate } from "../mocks/home";

export type RecommendedRoommate = Roommate & {
  matchSummary: string;
};
