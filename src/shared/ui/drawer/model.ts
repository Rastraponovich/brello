import type { ReactNode } from "react";

interface CloseButtonProps {
  closeButton?: boolean;
  closeButtonClassName?: string;
}

export interface DrawerProps extends CloseButtonProps {
  children: ReactNode;
  onClose(value: boolean): void;
  isOpen: boolean;
}
