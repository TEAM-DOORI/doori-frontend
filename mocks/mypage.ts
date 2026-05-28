// 마이페이지 mock 데이터 — API 연동 시 교체 예정

export const MY_PAGE_USER = {
  name: "김연수",
  school: "홍익대학교",
} as const;

export type MyPageMenuItem = {
  id: string;
  label: string;
};

export type MyPageMenuSection = {
  id: string;
  title: string;
  items: MyPageMenuItem[];
};

export const MY_PAGE_MENU_SECTIONS: MyPageMenuSection[] = [
  {
    id: "coordination",
    title: "조율 히스토리",
    items: [
      { id: "manner-temp", label: "나의 매너 온도" },
      { id: "roommate-badge", label: "나의 룸메 뱃지" },
    ],
  },
  {
    id: "residence",
    title: "거주 이력",
    items: [
      { id: "archive", label: "공동 거주 아카이브" },
      { id: "roommates", label: "함께한 룸메이트" },
    ],
  },
  {
    id: "settings",
    title: "설정",
    items: [
      { id: "notifications", label: "알림 설정" },
      { id: "settlement-account", label: "정산 계좌 관리" },
    ],
  },
];
