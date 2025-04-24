import { ERROR_MSG, INFO_MSG, SUCCESS_MSG } from "@/utils/messages";
import { CommonModifyDrawer } from "../shared/common-modify-drawer";
import { CONSTANTS } from "@/utils/constants";
import {
    ModifyProductForm,
    modifyProductSchema,
} from "@/schemas/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useForm } from "react-hook-form";
import { closeModifyProductModal } from "@/store/slices/modelSlices";
import { useEffect, useMemo, useState } from "react";
import { Form } from "../ui/form";
import { CommonTextField } from "../shared/form/common-text-field";
import { PRODUCT_FIELDS } from "@/utils/form-fields";
import {
    useCreateProductMutation,
    useUpdateProductMutation,
} from "@/api/product";
import { CommonResourceSelectMenu } from "../shared/form/common-select-menu";
import { LABELS, PLACEHOLDERS } from "@/utils/form";
import { useGetCategoryQuery } from "@/api/category";
import { Category } from "@/types/category";
import { CommonNumericField } from "../shared/form/common-number-field";
import toast from "react-hot-toast";

interface ModifyProductDrawerProps {
    refetchProducts: () => void;
}

// Split fields
const PRODUCTS_TOP_FIELDs = PRODUCT_FIELDS.slice(0, 1);
const PRODUCTS_BOTTOM_FIELDS = PRODUCT_FIELDS.slice(1);

export const ModifyProductDrawer = ({ refetchProducts }: ModifyProductDrawerProps) => {
    const { open, data } = useAppSelector((state) => state.modal.modifyProduct);
    const dispatch = useAppDispatch();
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    const {
        data: categoriesData,
        isFetching: categoriesFetching,
    } = useGetCategoryQuery({});
    const [createProductApi, { isLoading: createProductLoading }] = useCreateProductMutation();
    const [updateProductApi, { isLoading: updateProductLoading }] = useUpdateProductMutation();

    const categories = useMemo(
        () =>
            categoriesData?.result?.map((c: Category) => ({
                id: c.id,
                label: c.name,
            })) || [],
        [categoriesData]
    );

    const modifyProductForm = useForm<ModifyProductForm>({
        resolver: zodResolver(modifyProductSchema),
        defaultValues: { name: "", price: "" },
    });

    const isEdit = !!data?.id;

    useEffect(() => {
        if (data) {
          modifyProductForm.setValue("name", data.name);
          modifyProductForm.setValue("price", String(data.price));
          modifyProductForm.setValue("category", data.category?.name || "");
    
          if (data.category?.id) {
            setSelectedCategory(data.category.id);
          }
        }
      }, [data]);
    const closeDrawer = () => {
        setSelectedCategory(null);
        modifyProductForm.reset();
        dispatch(closeModifyProductModal());
    };
    const handleSave = async () => {
        if (!selectedCategory) return toast.error(ERROR_MSG.SELECT_CATEGORY);

        const values = modifyProductForm.getValues();
        const payload = {
            ...values,
            price: Number(values.price),
            categoryId: selectedCategory,
        };

        try {
            if (isEdit) {
                await updateProductApi({ id: data.id, body: payload }).unwrap();
                toast.success(SUCCESS_MSG.PRODUCT_UPDATE);
            } else {
                await createProductApi(payload).unwrap();
                toast.success(SUCCESS_MSG.PRODUCT_CREATE);
            }

            refetchProducts();
            closeDrawer();
        } catch (error) {
            console.error("Error modifying product:", error);
        }
    };

    const submitForm = () => {
        modifyProductForm.handleSubmit(handleSave)();
      };

    return (
        <CommonModifyDrawer
            open={open}
            onClose={closeDrawer}
            title={isEdit ? INFO_MSG.EDIT_PRODUCT : INFO_MSG.ADD_PRODUCT}
            actionChild={isEdit ? CONSTANTS.UPDATE : CONSTANTS.ADD}
            onSave={submitForm}
            isLoading={createProductLoading || updateProductLoading}
        >
            <Form {...modifyProductForm}>
                <form
                    id={CONSTANTS.PRODUCT_FORM}
                    className="w-full flex flex-col gap-y-4"
                >
                    {PRODUCTS_TOP_FIELDs.map((f) => (
                        <CommonTextField
                            key={f.name}
                            name={f.name}
                            label={f.label}
                            placeholder={f.placeholder}
                            control={modifyProductForm.control}
                        />
                    ))}

                    <CommonResourceSelectMenu
                        data={categories}
                        value={selectedCategory ? String(selectedCategory) : undefined}
                        label={LABELS.CATEGORY}
                        placeholder={PLACEHOLDERS.CATEGORY}
                        onChange={(c) => setSelectedCategory(Number(c))}
                        readOnly={categoriesFetching}
                        noDataMessgae={INFO_MSG.NO_CATEGORY_FOUND}
                    />


                    {PRODUCTS_BOTTOM_FIELDS.map((f) => (
                        <CommonNumericField
                            key={f.name}
                            name={f.name}
                            label={f.label}
                            placeholder={f.placeholder}
                            control={modifyProductForm.control}
                        />
                    ))}
                </form>
            </Form>
        </CommonModifyDrawer>
    );
};
