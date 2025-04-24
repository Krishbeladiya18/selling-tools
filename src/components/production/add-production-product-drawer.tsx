import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { AddedProductionProduct } from "@/types/production";
import { Products } from "@/types/products";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CommonModifyDrawer } from "../shared/common-modify-drawer";
import { ERROR_MSG, INFO_MSG } from "@/utils/messages";
import { CONSTANTS } from "@/utils/constants";
import { closeAddProductionProductModal } from "@/store/slices/modelSlices";
import { useForm } from "react-hook-form";
import { AddProductionProductForm, addProductionProductSchema } from "@/schemas/production";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { CommonResourceSelectMenu } from "../shared/form/common-select-menu";
import { LABELS, PLACEHOLDERS } from "@/utils/form";
import { ORDER_FIELDS } from "@/utils/form-fields";
import { CommonNumericField } from "../shared/form/common-number-field";
import toast from "react-hot-toast";

interface AddProductionProductDrawerProps {
    productsData: Products[];
    addedProduct: AddedProductionProduct | null;
    addProduct: (data: AddedProductionProduct) => any;
    isLoading?: boolean;
}

export const AddProductionProductDrawer = ({
    productsData,
    addedProduct,
    addProduct,
    isLoading = false
}: AddProductionProductDrawerProps) => {

    const { open } = useAppSelector((state) => state.modal.addProductionProduct);

    const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

    const dispatch = useAppDispatch();

    const products = useMemo(() => productsData.map((p: Products) => ({ id: p.id, label: p.name })) || [], [productsData]);
    const closeDrawer = () => {
        setSelectedProduct(null);
        addProductionProductForm.reset();

        dispatch(closeAddProductionProductModal());
    };

    const addProductionProductForm = useForm<AddProductionProductForm>({
        resolver: zodResolver(addProductionProductSchema),
        defaultValues: { quantity: "", price: "" }
    })

    useEffect(() => {
        if (addedProduct) {
          setSelectedProduct(addedProduct.id);
    
          addProductionProductForm.setValue("quantity", addedProduct.quantity.toString());
        }
      }, [open, addedProduct]);
      
    useEffect(() => {
        addProductionProductForm.setValue("price", productsData.find((p) => p.id === selectedProduct)?.price?.toString() || "");
    }, [selectedProduct]);

    const handleProductSelect = useCallback((pId: number) => {
        setSelectedProduct(pId);
    }, []);

    const handleSave = async () => {
        if (!selectedProduct) return toast.error(ERROR_MSG.SELECT_PRODUCT);
    
        const values = addProductionProductForm.getValues();
    
        const productDetails = productsData.find((p) => p.id === selectedProduct);
    
        if (productDetails) {
          const quantity = Number(values.quantity);
          const price = Number(values.price);
    
          const payload: AddedProductionProduct = {
            id: productDetails.id,
            name: productDetails.name,
            quantity,
            price,
            totalAmount: quantity * price,
          };
    
          addProduct(payload);
    
          closeDrawer();
        }
      };

    const submitForm = () => {
        addProductionProductForm.handleSubmit(handleSave)();
    };

    return (
        <>
            <CommonModifyDrawer
                open={open}
                onClose={closeDrawer}
                title={addedProduct ? INFO_MSG.EDIT_PRODUCT : INFO_MSG.ADD_PRODUCT}
                actionChild={addedProduct ? CONSTANTS.SAVE : CONSTANTS.ADD}
                onSave={submitForm}
            >
                <Form {...addProductionProductForm}>
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
                                control={addProductionProductForm.control}
                                readOnly={f.readOnly}
                            />
                        ))}
                    </form>
                </Form>

            </CommonModifyDrawer>

        </>
    )
}