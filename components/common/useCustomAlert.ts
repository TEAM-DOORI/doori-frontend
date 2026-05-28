import { useCallback, useMemo, useState } from "react";

import type { CustomAlertProps } from "./CustomAlert";

type AlertOptions = {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

type AlertState = {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirmAction?: () => void;
  onCancelAction?: () => void;
};

const INITIAL_STATE: AlertState = {
  visible: false,
  title: "알림",
  message: "",
};

export function useCustomAlert() {
  const [alertState, setAlertState] = useState<AlertState>(INITIAL_STATE);

  const hideAlert = useCallback(() => {
    setAlertState((prev) => ({
      ...prev,
      visible: false,
    }));
  }, []);

  const showAlert = useCallback((options: AlertOptions) => {
    setAlertState({
      visible: true,
      title: options.title ?? "알림",
      message: options.message,
      confirmText: options.confirmText,
      cancelText: options.cancelText,
      onConfirmAction: options.onConfirm,
      onCancelAction: options.onCancel,
    });
  }, []);

  const handleConfirm = useCallback(() => {
    try {
      alertState.onConfirmAction?.();
    } finally {
      hideAlert();
    }
  }, [alertState.onConfirmAction, hideAlert]);

  const handleCancel = useCallback(() => {
    try {
      alertState.onCancelAction?.();
    } finally {
      hideAlert();
    }
  }, [alertState.onCancelAction, hideAlert]);

  const alertProps = useMemo<CustomAlertProps>(
    () => ({
      visible: alertState.visible,
      title: alertState.title,
      message: alertState.message,
      confirmText: alertState.confirmText,
      cancelText: alertState.cancelText,
      onConfirm: handleConfirm,
      onCancel: alertState.cancelText ? handleCancel : undefined,
    }),
    [alertState, handleCancel, handleConfirm],
  );

  return {
    showAlert,
    hideAlert,
    alertProps,
  };
}
