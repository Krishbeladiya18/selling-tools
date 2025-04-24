import { FC } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { INFO_MSG, SUCCESS_MSG, WARNING_MSG } from "@/utils/messages";
import { useDeleteCategoryMutation } from "@/api/category";
import { DeleteDialog } from "../shared/delete-dialog";
import toast from "react-hot-toast";
import { closeDeleteModal } from "@/store/slices/modelSlices";

interface DeleteCategoryDialogProps {
  refetchCategories: () => void;
}

export const DeleteCategoryDialog: FC<DeleteCategoryDialogProps> = ({ refetchCategories }) => {
  const { name, id } = useAppSelector((state) => state.modal.deleteModal);

  const [deleteCategoryApi, { isLoading: deleteCategoryLoading }] = useDeleteCategoryMutation();
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(closeDeleteModal());
  };

  const deleteCategory = async () => {
    await deleteCategoryApi(id).unwrap();
    toast.success(SUCCESS_MSG.CATEGORY_DELETED);
    refetchCategories(); 
    closeModal();
  };

  return (
    <DeleteDialog
      open={name === "category"}
      onClose={closeModal}
      title={INFO_MSG.DELETE_CATEGORY}
      message={WARNING_MSG.DELETE_CATEGORY}
      onDelete={deleteCategory}
      isLoading={deleteCategoryLoading}
    />
  );
};
