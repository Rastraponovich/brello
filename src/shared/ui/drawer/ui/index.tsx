import { useRef } from "react";

import { type IDrawerProps } from "../lib";

import { Dialog } from "@headlessui/react";
import { CloseXButton } from "shared/ui/button";

export const Drawer = ({ children, isOpen, onClose }: IDrawerProps) => {
  const ref = useRef(null);
  return (
    <Dialog
      open={isOpen}
      unmount={false}
      onClose={onClose}
      initialFocus={ref}
      className="fixed inset-0 z-30 overflow-y-auto"
    >
      <div className="relative flex h-screen w-full">
        <Dialog.Overlay className="fixed inset-0 z-40 bg-[#344054]/60 backdrop-blur" />

        <Dialog.Panel
          as="div"
          ref={ref}
          className="z-50 flex w-full max-w-[311px] flex-col justify-between overflow-hidden bg-white px-1.5 sm:max-w-[70%]"
        >
          {children}
        </Dialog.Panel>
      </div>
      <CloseXButton
        size="lg"
        variant="gray"
        onClick={() => onClose(false)}
        className="absolute right-2 top-3 z-50 self-center  text-white"
      />
    </Dialog>
  );
};
