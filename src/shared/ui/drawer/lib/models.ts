interface ICloseButton {
  closeButton?: boolean;
  closeButtonClassName?: string;
}

export interface IDrawerProps extends ICloseButton {
  children: React.ReactNode;
  onClose(value: boolean): void;
  isOpen: boolean;
}
