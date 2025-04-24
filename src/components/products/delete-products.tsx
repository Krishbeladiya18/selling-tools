
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { INFO_MSG, SUCCESS_MSG, WARNING_MSG } from "@/utils/messages";
import { useDeleteProductMutation } from "@/api/product";
import { DeleteDialog } from "../shared/delete-dialog";
import { closeDeleteModal } from "@/store/slices/modelSlices";
import toast from "react-hot-toast";
interface ModifyProductDrawerProps {
    refetchProducts: () => void;
}

export const DeleteProductDialog = ({ refetchProducts }: ModifyProductDrawerProps) => {
    const { name, id } = useAppSelector((state) => state.modal.deleteModal);

    const [deleteProductApi, { isLoading: deleteProductLoading }] = useDeleteProductMutation();

    const dispatch = useAppDispatch();

    const closeModal = () => {
        dispatch(closeDeleteModal());
    };

    const deleteProduct = async () => {
        await deleteProductApi(id).unwrap();
        toast.success(SUCCESS_MSG.PRODUCT_DELETED);
        refetchProducts();
        closeModal();

    };

    return (
        <DeleteDialog
            open={name === "product"}
            onClose={closeModal}
            title={INFO_MSG.DELETE_PRODUCT}
            message={WARNING_MSG.DELETE_PRODUCT}
            onDelete={deleteProduct}
            isLoading={deleteProductLoading}
        />
    );
};
