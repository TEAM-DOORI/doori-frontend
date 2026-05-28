import { createContext, useContext, type ReactNode } from "react";

import { CustomAlert } from "./CustomAlert";
import { useCustomAlert } from "./useCustomAlert";

type ShowAlertOptions = {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

type GlobalAlertContextValue = {
  showAlert: (options: ShowAlertOptions) => void;
  hideAlert: () => void;
};

const GlobalAlertContext = createContext<GlobalAlertContextValue | null>(null);

export function GlobalAlertProvider({ children }: { children: ReactNode }) {
  const { showAlert, hideAlert, alertProps } = useCustomAlert();

  return (
    <GlobalAlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      <CustomAlert {...alertProps} />
    </GlobalAlertContext.Provider>
  );
}

export function useGlobalAlert() {
  const context = useContext(GlobalAlertContext);

  if (!context) {
    throw new Error("useGlobalAlert must be used within GlobalAlertProvider");
  }

  return context;
}
