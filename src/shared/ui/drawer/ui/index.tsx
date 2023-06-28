import { Dialog } from "@headlessui/react";
import { CloseXButton } from "../../button";
import { useRef } from "react";
import { IDrawerProps } from "../lib";

export const Drawer = ({ children, isOpen, onClose }: IDrawerProps) => {
  const ref = useRef(null);
  return (
    <Dialog
      unmount={false}
      open={isOpen}
      initialFocus={ref}
      onClose={onClose}
      className="fixed inset-0 z-30 overflow-y-auto"
    >
      <div className="relative flex h-screen w-full">
        <Dialog.Overlay className="fixed inset-0 z-40 bg-[#344054]/60 backdrop-blur" />

        <Dialog.Panel
          ref={ref}
          as="div"
          className="z-50 flex w-full max-w-[311px] flex-col justify-between overflow-hidden bg-white px-1.5 sm:max-w-[70%]"
        >
          {children}
        </Dialog.Panel>
      </div>
      <CloseXButton
        onClick={() => onClose(false)}
        className="absolute right-2 top-3 z-50 self-center  text-white"
        variant="gray"
        size="lg"
      />
    </Dialog>
  );
};
