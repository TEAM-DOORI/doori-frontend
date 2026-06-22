const KOREAN_WEEKDAYS = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
] as const;

export type HomeMatchedDayView = {
  monthLabel: string;
  weekdayLabel: string;
  selectedDate: number;
  /** 선택일 기준 전전일 ~ 후후일 (총 5개) */
  arcDates: readonly [number, number, number, number, number];
};

/** 룸메 있음 홈 아크 날짜 표시용 — 기준일(기본: 오늘) 주변 5일 */
export function getHomeMatchedDay(referenceDate: Date = new Date()): HomeMatchedDayView {
  const month = referenceDate.getMonth() + 1;
  const arcDates = [-2, -1, 0, 1, 2].map((offset) => {
    const date = new Date(referenceDate);
    date.setDate(referenceDate.getDate() + offset);
    return date.getDate();
  }) as [number, number, number, number, number];

  return {
    monthLabel: `${month}월`,
    weekdayLabel: KOREAN_WEEKDAYS[referenceDate.getDay()],
    selectedDate: referenceDate.getDate(),
    arcDates,
  };
}
