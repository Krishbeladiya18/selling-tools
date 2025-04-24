
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { ERROR_MSG, INFO_MSG } from "@/utils/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ORDER_FIELDS } from "@/utils/form-fields";
import { Form } from "../ui/form";
import { CONSTANTS } from "@/utils/constants";
import { CommonResourceSelectMenu } from "../shared/form/common-select-menu";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LABELS, PLACEHOLDERS } from "@/utils/form";
import { Products } from "@/types/products";
import { AddOrderProductForm, addOrderProductSchema } from "@/schemas/order";
import { AddedOrderProduct } from "@/types/order";
import { CommonModifyDrawer } from "../shared/common-modify-drawer";
import { CommonNumericField } from "../shared/form/common-number-field";
import { closeAddOrderProductModal } from "@/store/slices/modelSlices";
import toast from "react-hot-toast";

interface AddOrderProductDrawerProps {
  productsData: Products[];
  addProduct: (data: AddedOrderProduct) => any;
  isLoading?: boolean;
}

export const AddOrderProductDrawer = ({ productsData, addProduct, isLoading = false }: AddOrderProductDrawerProps) => {
  const { open } = useAppSelector((state) => state.modal.addOrderProduct);

  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const dispatch = useAppDispatch();

  const products = useMemo(() => productsData.map((p: Products) => ({ id: p.id, label: p.name })) || [], [productsData]);

  const addOrderProductForm = useForm<AddOrderProductForm>({
    resolver: zodResolver(addOrderProductSchema),
    defaultValues: { quantity: "", price: "" },
  });

  const closeDrawer = () => {
    setSelectedProduct(null);
    addOrderProductForm.reset();

    dispatch(closeAddOrderProductModal());
  };

  const handleProductSelect = useCallback((pId: number) => {
    setSelectedProduct(pId);
  }, []);

  useEffect(() => {
    addOrderProductForm.setValue("price", productsData.find((p) => p.id === selectedProduct)?.price?.toString() || "");
  }, [selectedProduct]);

  const handleSave = async () => {
    if (!selectedProduct) return toast.error(ERROR_MSG.SELECT_PRODUCT);

    const values = addOrderProductForm.getValues();

    const productDetails = productsData.find((p) => p.id === selectedProduct);

    if (productDetails) {
      const quantity = Number(values.quantity);
      const price = Number(values.price);

      const payload: AddedOrderProduct = {
        id: productDetails.id,
        name: productDetails.name,
        quantity,
        price,
        total: quantity * price,
      };

      addProduct(payload);

      closeDrawer();
    }
  };

  const submitForm = () => {
    addOrderProductForm.handleSubmit(handleSave)();
  };

  return (
    <CommonModifyDrawer open={open} onClose={closeDrawer} title={INFO_MSG.ADD_PRODUCT} actionChild={CONSTANTS.ADD} onSave={submitForm}>
      <Form {...addOrderProductForm}>
        <form id={CONSTANTS.PRODUCT_FORM} className="w-full flex flex-col gap-y-4">
          <CommonResourceSelectMenu
            data={products}
            value={selectedProduct ? String(selectedProduct) : undefined}
            label={LABELS.PRODUCT}
            placeholder={PLACEHOLDERS.PRODUCT}
            onChange={handleProductSelect}
            readOnly={isLoading}
            noDataMessgae={INFO_MSG.NO_PRODUCT_FOUND}
          />

          {ORDER_FIELDS.map((f) => (
            <CommonNumericField
              key={f.name}
              name={f.name}
              label={f.label}
              placeholder={f.placeholder}
              control={addOrderProductForm.control}
              readOnly={f.readOnly}
            />
          ))}
        </form>
      </Form>
    </CommonModifyDrawer>
  );
};
