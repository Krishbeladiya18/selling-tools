import { X } from "lucide-react";


interface CloseBtnProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const CloseBtn = ({ onClick }: CloseBtnProps) => {
  return (
    <button
      className="w-6 h-6 flex justify-center items-center rounded-full hover:bg-accent transition duration-200 hover:cursor-pointer"
      onClick={onClick}
    >
      <X size={20} />
    </button>
  );
};
