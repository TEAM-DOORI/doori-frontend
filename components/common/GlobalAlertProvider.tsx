import type { ReactNode } from "react";

import { CustomAlert } from "@components/common/CustomAlert";
import { useAlertStore } from "@/stores/alertStore";

export function GlobalAlertProvider({ children }: { children: ReactNode }) {
  const visible = useAlertStore((state) => state.visible);
  const title = useAlertStore((state) => state.title);
  const message = useAlertStore((state) => state.message);
  const confirmText = useAlertStore((state) => state.confirmText);
  const cancelText = useAlertStore((state) => state.cancelText);
  const handleConfirm = useAlertStore((state) => state.handleConfirm);
  const handleCancel = useAlertStore((state) => state.handleCancel);

  return (
    <>
      {children}
      <CustomAlert
        visible={visible}
        title={title}
        message={message}
        confirmText={confirmText}
        cancelText={cancelText}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}

export { useGlobalAlert } from "@/stores/alertStore";
