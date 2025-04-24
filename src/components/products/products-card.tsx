import { useAppDispatch } from "@/hooks/redux";
import { DeleteBtn } from "../shared/delete-btn";
import { EditBtn } from "../shared/edit-btn";
import { memo } from "react";
import { Products } from "@/types/products";
import { openDeleteModal, openModifyProductModal } from "@/store/slices/modelSlices";

interface ProductCardProps {
  data: Products;
}

export const ProductRow = memo(({ data }: ProductCardProps) => {
  const { id, name, category } = data;

  const dispatch = useAppDispatch();

  const editProduct = () => {
    dispatch(openModifyProductModal(data));
  };

  const deleteProduct = () => {
    dispatch(openDeleteModal({ name: "product", id }));
  };

  return (
    <div className="flex justify-between items-center py-2 px-3">
      <div className="flex-1 flex items-center gap-1.5">
        <span className="font-semibold">{name}</span>
        <span className="font-semibold text-xl -mt-[3px]">-</span>
        <span className="font-semibold">{category.name}</span>
      </div>

      <div className="flex gap-3">
        <EditBtn onClick={editProduct} />
        <DeleteBtn onClick={deleteProduct} />
      </div>
    </div>
  );
});
