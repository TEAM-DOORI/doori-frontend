import { type Href, useRouter } from "expo-router";
import { useCallback, useRef } from "react";

/** 더블탭 시 동일 화면이 중복 push 되는 것을 방지 */
export function useNavigateOnce() {
  const router = useRouter();
  const lockRef = useRef(false);

  const push = useCallback(
    (href: Href) => {
      if (lockRef.current) {
        return;
      }
      lockRef.current = true;
      router.push(href);
    },
    [router],
  );

  const replace = useCallback(
    (href: Href) => {
      if (lockRef.current) {
        return;
      }
      lockRef.current = true;
      router.replace(href);
    },
    [router],
  );

  const dismissTo = useCallback(
    (href: Href) => {
      if (lockRef.current) {
        return;
      }
      lockRef.current = true;
      router.dismissTo(href);
    },
    [router],
  );

  return { push, replace, dismissTo };
}
