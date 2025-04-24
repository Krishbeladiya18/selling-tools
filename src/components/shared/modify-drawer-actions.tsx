import { CONSTANTS } from "@/utils/constants";
import { Button } from "../ui/button";
import React, { memo } from "react";
import { Spinner } from "../ui/spinner";

interface ModifyDrawerActionsProps {
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
  onSave: React.MouseEventHandler<HTMLButtonElement>;
  cancelChild?: React.ReactNode;
  actionChild: React.ReactNode;
  actionDisabled?: boolean;
  isLoading?: boolean;
}

export const ModifyDrawerActions = memo(
  ({ onCancel, onSave, cancelChild, actionChild, actionDisabled = false, isLoading = false }: ModifyDrawerActionsProps) => {
    return (
      <>
        <Button variant="outline" className="flex-1 rounded-full select-none" onClick={onCancel}>
          {cancelChild || CONSTANTS.CANCEL}
        </Button>
        <Button className="flex-1 rounded-full select-none" disabled={actionDisabled || isLoading} onClick={onSave}>
          {isLoading ? <Spinner /> : actionChild}
        </Button>
      </>
    );
  }
);
