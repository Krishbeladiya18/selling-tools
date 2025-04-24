import { FC, useEffect } from "react";
import { ModifyCategoryForm, modifyCategorySchema } from "@/schemas/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CommonModifyDrawer } from "../shared/common-modify-drawer";
import { INFO_MSG, SUCCESS_MSG } from "@/utils/messages";
import { CONSTANTS } from "@/utils/constants";
import { CATEGORY_FIELDS } from "@/utils/form-fields";
import { CommonTextField } from "../shared/form/common-text-field";
import { Form } from "../ui/form";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { closeModifyCategoryModal } from "@/store/slices/modelSlices";
import { useCreateCategoryMutation, useUpdateCategoryMutation } from "@/api/category";


interface ModifyCategoryDrawerProps {
  refetchCategories: () => void; 
}

const ModifyCategoryDrawer: FC<ModifyCategoryDrawerProps> = ({ refetchCategories }) => {
  const { open, data } = useAppSelector((state) => state.modal.modifyCategory);
  const dispatch = useAppDispatch();

  const modifyCategoryForm = useForm<ModifyCategoryForm>({
    resolver: zodResolver(modifyCategorySchema),
    defaultValues: { name: "" },
  });

  const [createCategoryApi, { isLoading: createCategoryLoading }] = useCreateCategoryMutation();
  const [updateCategoryApi, { isLoading: updateCategoryLoading }] = useUpdateCategoryMutation();

  const createCategory = async (body: any) => {
    await createCategoryApi(body).unwrap();
    toast.success(SUCCESS_MSG.CATEGORY_CREATE);
    refetchCategories();
    closeDrawer();
  };

  const updateCategory = async (id: number, body: any) => {
    await updateCategoryApi({ id, body }).unwrap();
    toast.success(SUCCESS_MSG.CATEGORY_UPDATE);
    refetchCategories(); 
    closeDrawer();
  };

  const isEdit = !!data?.id;

  useEffect(() => {
    if (data?.name) modifyCategoryForm.setValue("name", data.name);
  }, [data]);

  const closeDrawer = () => {
    modifyCategoryForm.reset();
    dispatch(closeModifyCategoryModal());
  };

  const handleSave = async () => {
    const values = modifyCategoryForm.getValues();
    if (isEdit) updateCategory(data?.id, values);
    else createCategory(values);
  };

  const submitForm = () => {
    modifyCategoryForm.handleSubmit(handleSave)();
  };

  return (
    <CommonModifyDrawer
      open={open}
      onClose={closeDrawer}
      title={isEdit ? INFO_MSG.EDIT_CATEGORY : INFO_MSG.ADD_CATEGORY}
      actionChild={isEdit ? CONSTANTS.UPDATE : CONSTANTS.ADD}
      onSave={submitForm}
      isLoading={createCategoryLoading || updateCategoryLoading}
    >
      <Form {...modifyCategoryForm}>
        <form id={CONSTANTS.CATEGORY_FORM} className="w-full flex flex-col gap-y-4">
          {CATEGORY_FIELDS.map((f) => (
            <CommonTextField
              key={f.name}
              name={f.name}
              label={f.label}
              placeholder={f.placeholder}
              control={modifyCategoryForm.control}
            />
          ))}
        </form>
      </Form>
    </CommonModifyDrawer>
  );
};

export default ModifyCategoryDrawer;
