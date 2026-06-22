import { getHomeMatchedDay } from "@hooks/homeMatchedDay";

describe("getHomeMatchedDay", () => {
  it("기준일 주변 5일과 월·요일 라벨을 반환한다", () => {
    const result = getHomeMatchedDay(new Date(2026, 5, 1)); // 2026-06-01 월요일

    expect(result.selectedDate).toBe(1);
    expect(result.monthLabel).toBe("6월");
    expect(result.weekdayLabel).toBe("월요일");
    expect(result.arcDates).toEqual([30, 31, 1, 2, 3]);
  });
});
