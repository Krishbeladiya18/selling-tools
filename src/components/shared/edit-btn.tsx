import EditIcon from "@/assets/svg/edit.svg";

interface EditBtnProps {
  size?: number;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const EditBtn = ({ size = 26, onClick }: EditBtnProps) => {
  return (
    <button
      type="button"
      className="bg-app-edit flex justify-center items-center rounded-full hover:cursor-pointer"
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <img src={EditIcon} alt="Edit" />
    </button>
  );
};
