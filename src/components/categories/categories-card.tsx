
import { useAppDispatch } from "@/hooks/redux";
import { DeleteBtn } from "../shared/delete-btn";
import { EditBtn } from "../shared/edit-btn";
import { Category } from "@/types/category";
import { memo } from "react";
import { openDeleteModal, openModifyCategoryModal } from "@/store/slices/modelSlices";

interface CategoryCardProps {
  data: Category;
}

export const CategoryRow = memo(({ data }: CategoryCardProps) => {
  const { id, name } = data;
  const dispatch = useAppDispatch();

  const editCategory = () => {
    dispatch(openModifyCategoryModal({ id, name }));
  };

  const deleteCategory = () => {
    dispatch(openDeleteModal({ name: "category", id }));
  };

  return (
    <div className="flex justify-between items-center py-2 px-3">
      <h4 className="font-semibold">{name}</h4>

      <div className="flex gap-3">
        <EditBtn onClick={editCategory} />
        <DeleteBtn onClick={deleteCategory} />
      </div>
    </div>
  );
});
