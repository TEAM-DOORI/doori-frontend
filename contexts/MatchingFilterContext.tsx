import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  DEFAULT_MATCHING_FILTERS,
  type MatchingFilters,
} from "../types/matching-filter";

type MatchingFilterContextValue = {
  filters: MatchingFilters;
  setFilters: (next: MatchingFilters) => void;
  updateFilters: (patch: Partial<MatchingFilters>) => void;
  resetFilters: () => void;
};

const MatchingFilterContext = createContext<MatchingFilterContextValue | null>(
  null
);

export function MatchingFilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<MatchingFilters>(
    DEFAULT_MATCHING_FILTERS
  );

  const updateFilters = useCallback((patch: Partial<MatchingFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_MATCHING_FILTERS);
  }, []);

  const value = useMemo(
    () => ({ filters, setFilters, updateFilters, resetFilters }),
    [filters, updateFilters, resetFilters]
  );

  return (
    <MatchingFilterContext.Provider value={value}>
      {children}
    </MatchingFilterContext.Provider>
  );
}

export function useMatchingFilters() {
  const ctx = useContext(MatchingFilterContext);
  if (!ctx) {
    throw new Error("useMatchingFilters must be used within MatchingFilterProvider");
  }
  return ctx;
}
