import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BackBtn = () => {
  const navigate = useNavigate();

  const navigateToBack = () => {
    navigate(-1);
  };

  return (
    <button
      className="w-6 h-6 flex justify-center items-center rounded-full hover:bg-accent transition duration-200 hover:cursor-pointer"
      onClick={navigateToBack}
    >
      <ChevronLeft size={20} />
    </button>
  );
};
