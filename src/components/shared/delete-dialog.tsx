import React from "react";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CONSTANTS } from "@/utils/constants";
import { Spinner } from "../ui/spinner";

interface DeleteDialogProps {
  open: boolean;
  onClose: () => any;
  title: string;
  message: string;
  onDelete: () => any;
  actionChild?: React.ReactNode;
  isLoading?: boolean;
}

export const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, onClose, title, message, onDelete, actionChild, isLoading = false }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      {/* Dialog Content */}
      <DialogContent className="w-[90%] max-w-[350px]">
        <DialogHeader>
          <DialogTitle className="font-semibold">{title}</DialogTitle>
        </DialogHeader>

        {/* Warning Message */}
        <div className="font-medium text-destructive">
          <p>{message}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <DialogClose asChild>
            <Button variant="outlineDestructive">{CONSTANTS.CANCEL}</Button>
          </DialogClose>
          <Button variant="destructive" onClick={onDelete}>
            {isLoading ? <Spinner /> : actionChild || CONSTANTS.DELETE}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
