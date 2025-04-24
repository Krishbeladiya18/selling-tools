import React from "react";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { ModifyDrawerActions } from "./modify-drawer-actions";
import { CloseBtn } from "./close-btn";

interface CommonModifyDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  cancelChild?: React.ReactNode;
  actionChild: React.ReactNode;
  onCancel?: () => void;
  onSave: () => void;
  isLoading?: boolean;
}

export const CommonModifyDrawer = ({
  open,
  onClose,
  title,
  children,
  onCancel,
  onSave,
  cancelChild,
  actionChild,
  isLoading = false,
}: CommonModifyDrawerProps) => {
  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent style={{ borderRadius: "12px 12px 0 0" }}>
        {/* Header */}
        <DrawerHeader className="flex flex-row justify-between py-3">
          <DrawerTitle className="font-bold">{title}</DrawerTitle>
          <CloseBtn onClick={onClose} />
        </DrawerHeader>

        {/* Body */}
        <div className="overflow-y-auto px-4 py-2">{children}</div>

        {/* Navbar */}
        <DrawerFooter className="flex flex-row gap-3 pt-6">
          <ModifyDrawerActions
            onCancel={onCancel || onClose}
            onSave={onSave}
            cancelChild={cancelChild}
            actionChild={actionChild}
            isLoading={isLoading}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
