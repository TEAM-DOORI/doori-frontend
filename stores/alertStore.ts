import { create } from "zustand";

import type { CustomAlertProps } from "@components/common/CustomAlert";

export type ShowAlertOptions = {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

type AlertStoreState = {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirmAction?: () => void;
  onCancelAction?: () => void;
  showAlert: (options: ShowAlertOptions) => void;
  hideAlert: () => void;
  handleConfirm: () => void;
  handleCancel: () => void;
  getAlertProps: () => CustomAlertProps;
};

const INITIAL_VISIBLE_STATE = {
  visible: false,
  title: "알림",
  message: "",
  confirmText: undefined,
  cancelText: undefined,
  onConfirmAction: undefined,
  onCancelAction: undefined,
} as const;

export const useAlertStore = create<AlertStoreState>((set, get) => ({
  ...INITIAL_VISIBLE_STATE,

  showAlert: (options) => {
    set({
      visible: true,
      title: options.title ?? "알림",
      message: options.message,
      confirmText: options.confirmText,
      cancelText: options.cancelText,
      onConfirmAction: options.onConfirm,
      onCancelAction: options.onCancel,
    });
  },

  hideAlert: () => {
    set((prev) => ({
      ...prev,
      visible: false,
    }));
  },

  handleConfirm: () => {
    const { onConfirmAction } = get();
    try {
      onConfirmAction?.();
    } finally {
      get().hideAlert();
    }
  },

  handleCancel: () => {
    const { onCancelAction } = get();
    try {
      onCancelAction?.();
    } finally {
      get().hideAlert();
    }
  },

  getAlertProps: () => {
    const state = get();
    return {
      visible: state.visible,
      title: state.title,
      message: state.message,
      confirmText: state.confirmText,
      cancelText: state.cancelText,
      onConfirm: state.handleConfirm,
      onCancel: state.handleCancel,
    };
  },
}));

export function useGlobalAlert() {
  const showAlert = useAlertStore((state) => state.showAlert);
  const hideAlert = useAlertStore((state) => state.hideAlert);

  return { showAlert, hideAlert };
}
