import DeleteIcon from "@/assets/svg/delete.svg";

interface DeleteBtnProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const DeleteBtn = ({ onClick }: DeleteBtnProps) => {
  return (
    <button
      className="w-[26px] h-[26px] bg-app-delete flex justify-center items-center rounded-full hover:cursor-pointer"
      onClick={onClick}
    >
      <img src={DeleteIcon} alt="Delete" />
    </button>
  );
};
