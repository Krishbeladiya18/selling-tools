
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { INFO_MSG, WARNING_MSG } from "@/utils/messages";
import { DeleteDialog } from "../shared/delete-dialog";
import { CONSTANTS } from "@/utils/constants";
import { closeDeleteModal } from "@/store/slices/modelSlices";

interface DeleteOrderProductDialogProps {
  removeProduct: (id: number) => any;
}

export const DeleteOrderProductDialog = ({ removeProduct }: DeleteOrderProductDialogProps) => {
  const { name, id } = useAppSelector((state) => state.modal.deleteModal);

  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(closeDeleteModal());
  };

  const deleteProduct = () => {
    if (id) removeProduct(id);

    closeModal();
  };

  return (
    <DeleteDialog
      open={name === "order-product"}
      onClose={closeModal}
      title={INFO_MSG.DELETE_ORDER_PRODUCT}
      message={WARNING_MSG.DELETE_ORDER_PRODUCT}
      onDelete={deleteProduct}
      actionChild={CONSTANTS.REMOVE}
    />
  );
};
