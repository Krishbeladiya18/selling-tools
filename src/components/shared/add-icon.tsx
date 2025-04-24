import { Plus } from "lucide-react";
import React from "react";

interface AddIconProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const AddIcon = ({ onClick }: AddIconProps) => {
  return (
    <button
      type="button"
      className="h-10 aspect-square shrink-0 bg-app-primary text-background flex justify-center items-center rounded-full hover:cursor-pointer"
      onClick={onClick}
    >
      <Plus size={22} />
    </button>
  );
};

interface AddSmIconProps extends AddIconProps {
  size?: number;
}

export const AddSmIcon = ({ size = 60, onClick }: AddSmIconProps) => {
  return (
    <button
      type="button"
      className="h-full aspect-square shrink-0 bg-app-primary text-background flex justify-center items-center rounded-full"
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <Plus size={20} />
    </button>
  );
};
