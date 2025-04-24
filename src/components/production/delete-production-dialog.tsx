
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { INFO_MSG, SUCCESS_MSG, WARNING_MSG } from "@/utils/messages";
import { useDeleteProductionMutation } from "@/api/production";
import { DeleteDialog } from "../shared/delete-dialog";
import { setRefetchProduction } from "@/store/slices/refetchSlice";
import toast from "react-hot-toast";
import { closeDeleteModal } from "@/store/slices/modelSlices";
export const DeleteProductionDialog = () => {
  const { name, id } = useAppSelector((state) => state.modal.deleteModal);

  const [deleteProductionApi, { isLoading: deleteProductionLoading }] = useDeleteProductionMutation();

  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(closeDeleteModal());
  };

  const refetchProductions = () => {
    dispatch(setRefetchProduction(true));
  };

  const deleteProduction = async () => {
      await deleteProductionApi(id).unwrap();

      toast.success(SUCCESS_MSG.PRODUCTION_DELETED);
      refetchProductions();

      closeModal();
  };

  return (
    <DeleteDialog
      open={name === "production"}
      onClose={closeModal}
      title={INFO_MSG.DELETE_PRODUCTION}
      message={WARNING_MSG.DELETE_PRODUCTION}
      onDelete={deleteProduction}
      isLoading={deleteProductionLoading}
    />
  );
};
